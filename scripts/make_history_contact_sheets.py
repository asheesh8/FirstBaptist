#!/usr/bin/env python3
"""Combine rendered history PDF pages into legible overview sheets."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


SOURCE = Path("research/source-scrape/history-documents/rendered")
OUTPUT = Path("research/source-scrape/history-documents/contact-sheets")
COLS = 4
ROWS = 3
CELL_W = 330
CELL_H = 427
LABEL_H = 34
GAP = 16
MARGIN = 24


def main() -> None:
    files = sorted(SOURCE.glob("*/*.jpg"))
    per_sheet = COLS * ROWS
    pages = max(1, math.ceil(len(files) / per_sheet))
    font = ImageFont.load_default(size=16)
    title_font = ImageFont.load_default(size=22)
    OUTPUT.mkdir(parents=True, exist_ok=True)

    for sheet_index in range(pages):
        width = MARGIN * 2 + COLS * CELL_W + (COLS - 1) * GAP
        height = MARGIN * 2 + 42 + ROWS * (CELL_H + LABEL_H) + (ROWS - 1) * GAP
        canvas = Image.new("RGB", (width, height), "#F5F0E6")
        draw = ImageDraw.Draw(canvas)
        draw.text(
            (MARGIN, MARGIN),
            f"Historic source documents — sheet {sheet_index + 1} of {pages}",
            fill="#173B32",
            font=title_font,
        )
        batch = files[sheet_index * per_sheet : (sheet_index + 1) * per_sheet]
        for index, path in enumerate(batch):
            row, col = divmod(index, COLS)
            x = MARGIN + col * (CELL_W + GAP)
            y = MARGIN + 42 + row * (CELL_H + LABEL_H + GAP)
            with Image.open(path) as source:
                image = source.convert("RGB")
                image.thumbnail((CELL_W, CELL_H), Image.Resampling.LANCZOS)
            frame = Image.new("RGB", (CELL_W, CELL_H), "white")
            frame.paste(image, ((CELL_W - image.width) // 2, (CELL_H - image.height) // 2))
            canvas.paste(frame, (x, y))
            draw.text(
                (x, y + CELL_H + 8),
                f"{path.parent.name} / {path.name}",
                fill="#173B32",
                font=font,
            )
        output = OUTPUT / f"history-sheet-{sheet_index + 1:02d}.jpg"
        canvas.save(output, quality=90, optimize=True)
        print(output)


if __name__ == "__main__":
    main()
