#!/usr/bin/env python3
"""Create labeled contact sheets for visually auditing the archived photos."""

from __future__ import annotations

import math
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


SOURCE = Path("research/source-scrape/assets/images")
OUTPUT = Path("research/source-scrape/contact-sheets")
COLS = 4
ROWS = 4
THUMB_W = 320
THUMB_H = 220
LABEL_H = 54
GAP = 16
MARGIN = 24


def display_label(path: Path) -> str:
    try:
        value = str(path.relative_to(SOURCE))
    except ValueError:
        value = path.name
    if "/wp-content/uploads/" in value:
        value = value.split("/wp-content/uploads/", 1)[1]
    return value


def render_sheet(paths: list[Path], page_number: int, total_pages: int) -> Path:
    width = MARGIN * 2 + COLS * THUMB_W + (COLS - 1) * GAP
    height = MARGIN * 2 + 42 + ROWS * (THUMB_H + LABEL_H) + (ROWS - 1) * GAP
    canvas = Image.new("RGB", (width, height), "#F5F0E6")
    draw = ImageDraw.Draw(canvas)
    font = ImageFont.load_default(size=16)
    title_font = ImageFont.load_default(size=22)
    draw.text(
        (MARGIN, MARGIN),
        f"Church source-photo audit — sheet {page_number} of {total_pages}",
        fill="#173B32",
        font=title_font,
    )

    for index, path in enumerate(paths):
        row, col = divmod(index, COLS)
        x = MARGIN + col * (THUMB_W + GAP)
        y = MARGIN + 42 + row * (THUMB_H + LABEL_H + GAP)
        frame = Image.new("RGB", (THUMB_W, THUMB_H), "#DED5C5")
        try:
            with Image.open(path) as source:
                image = ImageOps.exif_transpose(source).convert("RGB")
                image.thumbnail((THUMB_W, THUMB_H), Image.Resampling.LANCZOS)
                frame.paste(
                    image,
                    ((THUMB_W - image.width) // 2, (THUMB_H - image.height) // 2),
                )
        except Exception:
            ImageDraw.Draw(frame).text((16, 16), "Preview unavailable", fill="#7B2F27", font=font)
        canvas.paste(frame, (x, y))
        label = textwrap.shorten(display_label(path), width=74, placeholder="…")
        lines = textwrap.wrap(label, width=42)[:2]
        draw.multiline_text(
            (x, y + THUMB_H + 8),
            "\n".join(lines),
            fill="#173B32",
            font=font,
            spacing=2,
        )

    OUTPUT.mkdir(parents=True, exist_ok=True)
    output_path = OUTPUT / f"contact-sheet-{page_number:02d}.jpg"
    canvas.save(output_path, quality=90, optimize=True)
    return output_path


def main() -> None:
    paths = sorted(path for path in SOURCE.rglob("*") if path.is_file())
    per_page = COLS * ROWS
    total_pages = max(1, math.ceil(len(paths) / per_page))
    for page in range(total_pages):
        start = page * per_page
        output = render_sheet(paths[start : start + per_page], page + 1, total_pages)
        print(output)


if __name__ == "__main__":
    main()
