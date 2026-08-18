# Logo exploration review

## Decision

Use Candidate A as the conceptual foundation, but do not ship any generated PNG as the church logo. The production proof is the locally rebuilt `Welcome Chime` vector in `logo/refined/`.

## Why

- **A** connects most directly to the real building: rounded Romanesque opening, town clock, and bell. At 32px, however, its connected clock and bell become a little person/robot, and the raster geometry is inconsistent.
- **B** is balanced but reads as a flower, medical cross, controller, or compass before it reads as this church.
- **C** communicates an open door at full size but becomes a rocket—especially at favicon size.

## Refinement choices

- Kept A's Romanesque outer arch and clock-tower specificity.
- Kept C's generous sense of an open entrance.
- Removed the literal bell, door fins, floor oval, clock hands, and connected body-like structure.
- Moved the four-point clock into the masonry crown with a clear gap above the doorway.
- Added a restrained Hearth Brick welcome mat as the sole lower accent.
- Rebuilt all geometry with exact flat brand colors and true transparency.
- Created dedicated favicon and one-color variants instead of shrinking the full drawing blindly.

This proof is suitable for brand-direction approval and interface prototyping. A final trademark/conflict search and church-leadership signoff still belong before public launch.

## Final technical review

- The refined mark no longer reads as a robot, rocket, or cross.
- The favicon uses a simplified gold clock disc and was verified at both 32px and 16px.
- A compact header lockup omits the descriptor line that became illegible at ordinary navigation widths.
- The one-color artwork uses compound vector geometry rather than an SVG mask for more dependable vendor output.
- Horizontal wordmarks remain live-text layout proofs until the approved fonts are outlined for print.
