#!/usr/bin/env python3
"""Record dimensions and basic suitability signals for archived site images."""

from __future__ import annotations

import csv
import json
from pathlib import Path

from PIL import Image


SOURCE = Path("research/source-scrape/assets/images")
JSON_OUTPUT = Path("research/source-scrape/image-inventory.json")
CSV_OUTPUT = Path("research/source-scrape/image-inventory.csv")


def classify(width: int, height: int) -> str:
    longest = max(width, height)
    shortest = min(width, height)
    if longest >= 1800 and shortest >= 1000:
        return "strong-large"
    if longest >= 1200 and shortest >= 700:
        return "usable-medium"
    if longest >= 800 and shortest >= 450:
        return "limited"
    return "thumbnail-or-small"


def main() -> None:
    rows: list[dict[str, object]] = []
    for path in sorted(item for item in SOURCE.rglob("*") if item.is_file()):
        row: dict[str, object] = {
            "path": str(path),
            "filename": path.name,
            "status": "ok",
            "format": "",
            "width": 0,
            "height": 0,
            "megapixels": 0,
            "orientation": "",
            "suitability": "",
            "error": "",
        }
        try:
            with Image.open(path) as image:
                width, height = image.size
                row.update(
                    {
                        "format": image.format or "",
                        "width": width,
                        "height": height,
                        "megapixels": round(width * height / 1_000_000, 2),
                        "orientation": (
                            "landscape" if width > height else "portrait" if height > width else "square"
                        ),
                        "suitability": classify(width, height),
                    }
                )
        except Exception as exc:
            row["status"] = "error"
            row["error"] = str(exc)
        rows.append(row)

    JSON_OUTPUT.write_text(json.dumps(rows, indent=2) + "\n", encoding="utf-8")
    with CSV_OUTPUT.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)

    summary: dict[str, int] = {}
    for row in rows:
        key = str(row.get("suitability") or row.get("status"))
        summary[key] = summary.get(key, 0) + 1
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
