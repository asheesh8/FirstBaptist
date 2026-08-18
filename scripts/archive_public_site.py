#!/usr/bin/env python3
"""Archive public pages, text, images, and documents from the church website.

The script starts from the site's public XML sitemap, saves each listed page,
extracts readable text and media references, downloads original media where
possible, and writes machine-readable manifests for later content migration.
"""

from __future__ import annotations

import csv
import hashlib
import html
import json
import mimetypes
import os
import re
import shutil
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import asdict, dataclass, field
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable


BASE_URL = "https://firstcongregationalstalbans.org"
SITEMAP_URL = f"{BASE_URL}/sitemap.xml"
OUTPUT_ROOT = Path("research/source-scrape")
USER_AGENT = (
    "Mozilla/5.0 (compatible; FirstCongregationalContentArchive/1.0; "
    "+https://firstcongregationalstalbans.org/)"
)
PAGE_WORKERS = 6
ASSET_WORKERS = 6
TIMEOUT_SECONDS = 35
RETRIES = 2

IMAGE_EXTENSIONS = {
    ".avif",
    ".gif",
    ".jpeg",
    ".jpg",
    ".png",
    ".svg",
    ".webp",
}
DOCUMENT_EXTENSIONS = {
    ".csv",
    ".doc",
    ".docx",
    ".odt",
    ".pdf",
    ".ppt",
    ".pptx",
    ".rtf",
    ".txt",
    ".xls",
    ".xlsx",
}
ALLOWED_MEDIA_HOSTS = {
    "firstcongregationalstalbans.org",
    "firstcongregationalstalbans.wordpress.com",
    "firstcongregationalstalbans.files.wordpress.com",
    "i0.wp.com",
    "i1.wp.com",
    "i2.wp.com",
}


def log(message: str) -> None:
    print(message, flush=True)


def request_bytes(url: str) -> tuple[bytes, str, str]:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    last_error: Exception | None = None
    for attempt in range(RETRIES + 1):
        try:
            with urllib.request.urlopen(request, timeout=TIMEOUT_SECONDS) as response:
                return (
                    response.read(),
                    response.headers.get_content_type(),
                    response.geturl(),
                )
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError) as exc:
            last_error = exc
            if attempt < RETRIES:
                time.sleep(0.6 * (attempt + 1))
    raise RuntimeError(f"Unable to fetch {url}: {last_error}")


def clean_url(raw_url: str, base_url: str) -> str | None:
    if not raw_url:
        return None
    value = html.unescape(raw_url.strip())
    if value.startswith(("data:", "blob:", "javascript:", "mailto:", "tel:")):
        return None
    absolute = urllib.parse.urljoin(base_url, value)
    parsed = urllib.parse.urlsplit(absolute)
    if parsed.scheme not in {"http", "https"}:
        return None
    return urllib.parse.urlunsplit(
        (parsed.scheme, parsed.netloc.lower(), parsed.path, parsed.query, "")
    )


def canonical_media_url(url: str) -> str:
    """Prefer the original upload over WordPress image-proxy transformations."""
    parsed = urllib.parse.urlsplit(url)
    host = parsed.netloc.lower()
    path = parsed.path
    if host in {"i0.wp.com", "i1.wp.com", "i2.wp.com"}:
        prefix = "/firstcongregationalstalbans.org/"
        if path.startswith(prefix):
            path = "/" + path[len(prefix) :]
            return urllib.parse.urlunsplit(("https", "firstcongregationalstalbans.org", path, "", ""))
    return urllib.parse.urlunsplit((parsed.scheme, host, path, "", ""))


def path_extension(url: str) -> str:
    return Path(urllib.parse.urlsplit(url).path).suffix.lower()


def looks_like_image(url: str) -> bool:
    return path_extension(url) in IMAGE_EXTENSIONS


def looks_like_document(url: str) -> bool:
    return path_extension(url) in DOCUMENT_EXTENSIONS


def safe_segment(value: str, fallback: str = "index") -> str:
    cleaned = re.sub(r"[^a-zA-Z0-9._-]+", "-", value).strip("-.")
    return cleaned[:140] or fallback


def page_local_base(url: str) -> Path:
    parsed = urllib.parse.urlsplit(url)
    segments = [safe_segment(segment) for segment in parsed.path.split("/") if segment]
    if not segments:
        segments = ["home"]
    return OUTPUT_ROOT / "pages" / Path(*segments)


def media_local_path(url: str, kind: str, content_type: str = "") -> Path:
    parsed = urllib.parse.urlsplit(url)
    host = safe_segment(parsed.netloc)
    segments = [safe_segment(segment) for segment in parsed.path.split("/") if segment]
    if not segments:
        segments = [hashlib.sha256(url.encode()).hexdigest()[:16]]
    filename = segments[-1]
    if not Path(filename).suffix and content_type:
        extension = mimetypes.guess_extension(content_type.split(";", 1)[0].strip()) or ""
        filename += extension
        segments[-1] = filename
    path = OUTPUT_ROOT / "assets" / kind / host / Path(*segments)
    if len(str(path)) > 235:
        suffix = Path(filename).suffix
        filename = f"{safe_segment(Path(filename).stem)[:80]}-{hashlib.sha256(url.encode()).hexdigest()[:12]}{suffix}"
        path = OUTPUT_ROOT / "assets" / kind / host / filename
    return path


class PageParser(HTMLParser):
    def __init__(self, page_url: str) -> None:
        super().__init__(convert_charrefs=True)
        self.page_url = page_url
        self.title_parts: list[str] = []
        self.text_parts: list[str] = []
        self.images: set[str] = set()
        self.documents: set[str] = set()
        self.links: set[str] = set()
        self._skip_depth = 0
        self._in_title = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = {key.lower(): value or "" for key, value in attrs}
        tag = tag.lower()
        if tag in {"script", "style", "noscript", "svg"}:
            self._skip_depth += 1
        if tag == "title":
            self._in_title = True

        if tag == "img":
            for key in ("src", "data-src", "data-lazy-src", "data-original"):
                candidate = clean_url(attr_map.get(key, ""), self.page_url)
                if candidate:
                    self.images.add(canonical_media_url(candidate))
            for key in ("srcset", "data-srcset"):
                for item in attr_map.get(key, "").split(","):
                    candidate = clean_url(item.strip().split(" ", 1)[0], self.page_url)
                    if candidate:
                        self.images.add(canonical_media_url(candidate))

        if tag == "meta":
            property_name = (attr_map.get("property") or attr_map.get("name", "")).lower()
            if property_name in {"og:image", "twitter:image", "twitter:image:src"}:
                candidate = clean_url(attr_map.get("content", ""), self.page_url)
                if candidate:
                    self.images.add(canonical_media_url(candidate))

        if tag == "a":
            candidate = clean_url(attr_map.get("href", ""), self.page_url)
            if candidate:
                self.links.add(candidate)
                if looks_like_document(candidate):
                    self.documents.add(candidate)

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag in {"script", "style", "noscript", "svg"} and self._skip_depth:
            self._skip_depth -= 1
        if tag == "title":
            self._in_title = False
        if tag in {
            "article",
            "blockquote",
            "br",
            "div",
            "footer",
            "h1",
            "h2",
            "h3",
            "h4",
            "header",
            "li",
            "main",
            "nav",
            "p",
            "section",
            "tr",
        }:
            self.text_parts.append("\n")

    def handle_data(self, data: str) -> None:
        if self._skip_depth:
            return
        value = re.sub(r"\s+", " ", data).strip()
        if not value:
            return
        if self._in_title:
            self.title_parts.append(value)
        self.text_parts.append(value)

    @property
    def title(self) -> str:
        return re.sub(r"\s+", " ", " ".join(self.title_parts)).strip()

    @property
    def text(self) -> str:
        value = " ".join(self.text_parts)
        value = re.sub(r"[ \t]+", " ", value)
        value = re.sub(r" *\n *", "\n", value)
        value = re.sub(r"\n{3,}", "\n\n", value)
        return value.strip() + "\n"


@dataclass
class PageRecord:
    url: str
    last_modified: str = ""
    status: str = "pending"
    content_type: str = ""
    final_url: str = ""
    title: str = ""
    local_html: str = ""
    local_text: str = ""
    images: list[str] = field(default_factory=list)
    documents: list[str] = field(default_factory=list)
    error: str = ""


@dataclass
class AssetRecord:
    url: str
    kind: str
    status: str = "pending"
    content_type: str = ""
    final_url: str = ""
    local_path: str = ""
    bytes: int = 0
    sha256: str = ""
    error: str = ""


def parse_sitemap(xml_bytes: bytes) -> tuple[list[PageRecord], dict[str, dict[str, str]]]:
    root = ET.fromstring(xml_bytes)
    namespace = {
        "sm": "http://www.sitemaps.org/schemas/sitemap/0.9",
        "img": "http://www.google.com/schemas/sitemap-image/1.1",
    }
    pages: list[PageRecord] = []
    sitemap_images: dict[str, dict[str, str]] = {}
    for url_node in root.findall("sm:url", namespace):
        location = url_node.findtext("sm:loc", default="", namespaces=namespace).strip()
        if not location:
            continue
        pages.append(
            PageRecord(
                url=location,
                last_modified=url_node.findtext(
                    "sm:lastmod", default="", namespaces=namespace
                ).strip(),
            )
        )
        for image_node in url_node.findall("img:image", namespace):
            image_url = image_node.findtext("img:loc", default="", namespaces=namespace).strip()
            if not image_url:
                continue
            sitemap_images[canonical_media_url(image_url)] = {
                "title": image_node.findtext(
                    "img:title", default="", namespaces=namespace
                ).strip(),
                "caption": image_node.findtext(
                    "img:caption", default="", namespaces=namespace
                ).strip(),
                "source_page": location,
            }
    unique_pages = {record.url: record for record in pages}
    return list(unique_pages.values()), sitemap_images


def archive_page(record: PageRecord) -> PageRecord:
    try:
        body, content_type, final_url = request_bytes(record.url)
        record.content_type = content_type
        record.final_url = final_url
        base = page_local_base(record.url)
        html_path = base.with_suffix(".html")
        text_path = base.with_suffix(".txt")
        html_path.parent.mkdir(parents=True, exist_ok=True)
        html_path.write_bytes(body)
        record.local_html = str(html_path)

        if "html" in content_type:
            source = body.decode("utf-8", errors="replace")
            parser = PageParser(final_url)
            parser.feed(source)
            text_path.write_text(parser.text, encoding="utf-8")
            record.local_text = str(text_path)
            record.title = parser.title
            record.images = sorted(parser.images)
            record.documents = sorted(parser.documents)
        record.status = "downloaded"
    except Exception as exc:  # keep the archive moving when one legacy page fails
        record.status = "error"
        record.error = str(exc)
    return record


def archive_asset(url: str, kind: str) -> AssetRecord:
    record = AssetRecord(url=url, kind=kind)
    parsed = urllib.parse.urlsplit(url)
    if parsed.netloc.lower() not in ALLOWED_MEDIA_HOSTS:
        record.status = "skipped-host"
        return record
    try:
        body, content_type, final_url = request_bytes(url)
        local_path = media_local_path(url, kind, content_type)
        local_path.parent.mkdir(parents=True, exist_ok=True)
        local_path.write_bytes(body)
        record.status = "downloaded"
        record.content_type = content_type
        record.final_url = final_url
        record.local_path = str(local_path)
        record.bytes = len(body)
        record.sha256 = hashlib.sha256(body).hexdigest()
    except Exception as exc:
        record.status = "error"
        record.error = str(exc)
    return record


def write_json(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def write_csv(path: Path, rows: Iterable[dict[str, object]]) -> None:
    rows = list(rows)
    path.parent.mkdir(parents=True, exist_ok=True)
    if not rows:
        path.write_text("", encoding="utf-8")
        return
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def main() -> int:
    if OUTPUT_ROOT.exists():
        shutil.rmtree(OUTPUT_ROOT)
    OUTPUT_ROOT.mkdir(parents=True)

    log(f"Fetching sitemap: {SITEMAP_URL}")
    sitemap_bytes, _, _ = request_bytes(SITEMAP_URL)
    (OUTPUT_ROOT / "sitemap.xml").write_bytes(sitemap_bytes)
    pages, sitemap_images = parse_sitemap(sitemap_bytes)
    log(f"Sitemap contains {len(pages)} unique pages and {len(sitemap_images)} images")

    archived_pages: list[PageRecord] = []
    with ThreadPoolExecutor(max_workers=PAGE_WORKERS) as executor:
        futures = [executor.submit(archive_page, page) for page in pages]
        for index, future in enumerate(as_completed(futures), start=1):
            archived_pages.append(future.result())
            if index % 25 == 0 or index == len(futures):
                log(f"Archived pages: {index}/{len(futures)}")

    image_urls = set(sitemap_images)
    document_urls: set[str] = set()
    for page in archived_pages:
        image_urls.update(
            canonical_media_url(url)
            for url in page.images
            if looks_like_image(canonical_media_url(url))
        )
        document_urls.update(page.documents)

    asset_jobs = [(url, "images") for url in sorted(image_urls)]
    asset_jobs += [(url, "documents") for url in sorted(document_urls)]
    archived_assets: list[AssetRecord] = []
    with ThreadPoolExecutor(max_workers=ASSET_WORKERS) as executor:
        futures = [executor.submit(archive_asset, url, kind) for url, kind in asset_jobs]
        for index, future in enumerate(as_completed(futures), start=1):
            archived_assets.append(future.result())
            if index % 25 == 0 or index == len(futures):
                log(f"Archived assets: {index}/{len(futures)}")

    archived_pages.sort(key=lambda item: item.url)
    archived_assets.sort(key=lambda item: (item.kind, item.url))
    page_rows = [asdict(record) for record in archived_pages]
    asset_rows = [asdict(record) for record in archived_assets]
    write_json(OUTPUT_ROOT / "pages.json", page_rows)
    write_json(OUTPUT_ROOT / "assets.json", asset_rows)
    write_json(OUTPUT_ROOT / "sitemap-images.json", sitemap_images)
    write_csv(
        OUTPUT_ROOT / "pages.csv",
        (
            {
                **{key: value for key, value in asdict(record).items() if key not in {"images", "documents"}},
                "image_count": len(record.images),
                "document_count": len(record.documents),
            }
            for record in archived_pages
        ),
    )
    write_csv(OUTPUT_ROOT / "assets.csv", (asdict(record) for record in archived_assets))

    page_success = sum(record.status == "downloaded" for record in archived_pages)
    asset_success = sum(record.status == "downloaded" for record in archived_assets)
    total_bytes = sum(record.bytes for record in archived_assets)
    duplicate_groups: dict[str, list[str]] = {}
    for record in archived_assets:
        if record.sha256:
            duplicate_groups.setdefault(record.sha256, []).append(record.url)
    duplicates = [urls for urls in duplicate_groups.values() if len(urls) > 1]
    summary = {
        "archived_at_utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "source": BASE_URL,
        "pages_total": len(archived_pages),
        "pages_downloaded": page_success,
        "pages_failed": len(archived_pages) - page_success,
        "sitemap_images": len(sitemap_images),
        "assets_total": len(archived_assets),
        "assets_downloaded": asset_success,
        "assets_not_downloaded": len(archived_assets) - asset_success,
        "image_assets": sum(record.kind == "images" for record in archived_assets),
        "document_assets": sum(record.kind == "documents" for record in archived_assets),
        "downloaded_bytes": total_bytes,
        "duplicate_asset_groups": len(duplicates),
        "errors": {
            "pages": [asdict(record) for record in archived_pages if record.status == "error"],
            "assets": [
                asdict(record)
                for record in archived_assets
                if record.status not in {"downloaded"}
            ],
        },
    }
    write_json(OUTPUT_ROOT / "summary.json", summary)
    write_json(OUTPUT_ROOT / "duplicate-assets.json", duplicates)
    log(json.dumps(summary, indent=2))
    return 0 if page_success else 1


if __name__ == "__main__":
    sys.exit(main())
