# Village Hearth asset manifest

Generated and reviewed August 18, 2026.

## Paid batch summary

- Approved scope: Option A — three logo explorations only.
- Model: Higgsfield `gpt_image_2` / GPT Image 2.
- Settings: 1:1, 2K, high quality.
- Starting balance: **647.49 credits**.
- Actual spend: **21.00 credits**.
- Ending balance: **626.49 credits**.
- No retries, motion jobs, source uploads, or other paid jobs were created.

Exact prompts are preserved in [`logo/prompts.md`](logo/prompts.md).

## Higgsfield source explorations

| Candidate | Local file | Job identifier | Dimensions | Credits | Review status |
| --- | --- | --- | ---: | ---: | --- |
| A — Romanesque Chime | `logo/candidate-a-romanesque-chime.png` | `96341a99-80b9-4d14-95f3-398a619e50ad` | 2048×2048 | 7.00 | Strongest source concept; retained arch/clock logic, not the raw drawing |
| B — Four Bells | `logo/candidate-b-four-bells.png` | `bd4d970c-21e7-442a-8cd3-f42c3e63c3a5` | 2048×2048 | 7.00 | Reject as primary; reads as flower/cross/compass, possible secondary pattern reference only |
| C — Open-Door Bell | `logo/candidate-c-open-door-bell.png` | `3bf6f7f5-3ed5-4aac-9e90-180676630595` | 2048×2048 | 7.00 | Reject as primary; reads as a rocket, but its generous opening informed the refinement |

The source PNGs are RGB concept images without alpha transparency. They contain soft raster shading and some palette drift, so none is a production logo.

## Local inspection exports

The `candidate-*-favicon-test-32.png` files are unpaid 32px downscales used only to test silhouette clarity.

## Refined no-extra-credit direction

The refined `Welcome Chime` direction was rebuilt locally as flat vector geometry after inspecting the paid concepts. It retains the real church's rounded Romanesque architecture and four-faced town-clock cue, turns the center into an intentionally wide open doorway, and uses a small brick welcome mat rather than a literal bell/person/rocket construction.

| Asset | Format | Size | Alpha | Intended use |
| --- | --- | ---: | --- | --- |
| `logo/refined/welcome-chime-mark.svg` | SVG | Vector | Yes | Canonical standalone mark |
| `logo/refined/welcome-chime-mark-1024.png` | PNG | 1024×1024 | Yes | Large raster fallback/social use |
| `logo/refined/welcome-chime-mark-512.png` | PNG | 512×512 | Yes | Standard raster fallback |
| `logo/refined/welcome-chime-horizontal.svg` | SVG | Vector | Yes | Desktop/header lockup |
| `logo/refined/welcome-chime-horizontal-1800.png` | PNG | 1800×420 | Yes | Lockup preview/raster fallback |
| `logo/refined/welcome-chime-horizontal-compact.svg` | SVG | Vector | Yes | Standard website-header lockup without descriptor |
| `logo/refined/welcome-chime-horizontal-compact-1480.png` | PNG | 1480×360 | Yes | Compact lockup preview/raster fallback |
| `logo/refined/welcome-chime-favicon.svg` | SVG | Vector | Yes | Browser/app icon source |
| `logo/refined/welcome-chime-favicon-32.png` | PNG | 32×32 | Yes | 32px favicon check |
| `logo/refined/welcome-chime-favicon-16.png` | PNG | 16×16 | Yes | True 16px favicon check |
| `logo/refined/welcome-chime-favicon.ico` | ICO | 32×32 | Yes | Legacy browser fallback |
| `logo/refined/welcome-chime-one-color.svg` | SVG | Vector | Yes | One-color production source |
| `logo/refined/welcome-chime-one-color-512.png` | PNG | 512×512 | Yes | One-color raster fallback |

The refined assets cost **0 additional credits**. They use exact flat palette values and contain no generated texture, shadows, gradients, faces, cross, or borrowed Duolingo elements.

## Production note

The horizontal SVGs keep their wordmarks as live text so the name remains editable. Web use should load Fraunces and Atkinson Hyperlegible Next. The font files were not locally available during this pass, so these lockups are interface/layout proofs rather than outlined print masters. Before commercial print, outline the approved wordmark in a vector editor and have church leadership confirm the exact formal name and lockup. The standalone mark, favicon, and one-color geometry do not depend on fonts.
