# Brand direction proposal - awaiting approval

**Status:** Stage 1 proposal. No paid generation, website implementation, or final `palette.md` has started.

## Recommended territory: Village Hearth

First Congregational Church should feel like a beloved Vermont institution with product-level clarity: historic and textured in identity, warm and contemporary in interface, and playful only where play helps someone feel welcome.

**Brand promise:** There's room for you here.

**Supporting line:** A town landmark. An open door.

**Positioning:** A historic, Open and Affirming church where worship, music, reflection, and everyday community life meet in the heart of St. Albans.

The public voice should sound neighborly, spiritually curious, specific, grateful, and quietly playful. It should welcome seekers, believers, and doubters without flattening the church's Christian identity.

## Why this territory is ownable

The church has unusually rich real material:

- a four-faced clock and bell serving the town since the 1890s, still hand-wound;
- an Eclectic Romanesque red-brick building beside Taylor Park;
- rare Tiffany and Lamb windows;
- an historic tracker organ and active music culture;
- a building repeatedly used as a community gathering place;
- an explicit Open and Affirming covenant;
- an intimate voice built around coffee, potlucks, volunteer gratitude, and honest spiritual inquiry.

The design should use Duolingo's transferable product principles - one obvious next action, short language, expressive feedback, useful character moments, and purposeful motion - without copying its owl, green, type, buttons, lesson path, streaks, or guilt mechanics. Worship attendance and giving must never become points, streaks, leaderboards, or scarcity games.

## Proposed palette: Bell & Hearth

| Color | Hex | Role |
| --- | --- | --- |
| Meetinghouse Paper | `#F7F1E4` | Main warm canvas, replacing sterile white |
| Spruce Ink | `#183B35` | Primary text, navigation, footer, and high-contrast surfaces |
| Hearth Brick | `#B4472D` | Primary action and historic-building signature |
| Taylor Green | `#5C8664` | Programs, community, landscape, and soft supporting surfaces |
| Chime Gold | `#E5B642` | Celebration, dates, small highlights, and motion moments |
| Tiffany Sky | `#6AAFC0` | Reflection, music, links on dark surfaces, and calm accents |

Accessibility roles are intentional: Spruce Ink on Meetinghouse Paper has approximately 10.9:1 contrast; white on Hearth Brick approximately 5.4:1; Chime Gold on Spruce Ink approximately 6.5:1. Taylor Green is a supporting color, not a small-text color. An inclusive rainbow may appear as a restrained Open and Affirming signal, not as six competing interface colors.

## Typography

- **Display:** [Fraunces](https://fonts.google.com/specimen/Fraunces) - warm, expressive, and historically aware without looking antique.
- **Body and interface:** [Atkinson Hyperlegible Next](https://fonts.google.com/specimen/Atkinson%2BHyperlegible%2BNext) - clear for a broad age range and practical for schedules, directions, forms, and bulletins.

Use sentence case, strong numerals, short paragraphs, and generous line spacing. Avoid ornate church-script fonts and an imitation of Duolingo's wordmark.

## Logo and mascot directions

### A. Welcome Chime - recommended

A compact clock-tower/bell silhouette whose lower Romanesque arch becomes an open doorway. The formal mark remains timeless and face-free; a related UI companion can gain two subtle eyes and a gentle clapper/clock motion for visitor help and confirmations.

### B. Open Arch

A bold Romanesque doorway built from the church's brick and terra-cotta geometry, with negative space suggesting light, welcome, and the town-facing entrance. Most timeless and architectural; least mascot-driven.

### C. Living Window

An original geometric window mark inspired by Tiffany jewel colors and handmade rosettes, resolving into a gathering of people around a quiet central cross. Most colorful and editorial; strongest for reflection and arts programming.

No direction should copy an actual Tiffany composition, the UCC logo, Duolingo's character proportions, or a generic clip-art steeple.

## The Welcome Chime companion

Working concept, not a final name: a small object companion derived from the real clock/bell rather than an animal mascot.

It may:

- point newcomers toward Sunday time, entrances, parking, and accessibility;
- appear during the optional `Save a Welcome` flow;
- give one quiet nod/chime after a successful RSVP;
- mark new announcements or seasonal events;
- celebrate a completed donation only after payment succeeds.

It should not appear in every section, speak in baby talk, pressure attendance, or turn giving into a game. The formal logo must work without the character face.

## Experience direction

### Home page

1. Real church/town photography with Sunday time and location immediately visible.
2. `Plan Your Visit`, `What's Happening`, and `Give` as the clear action hierarchy.
3. Upcoming events grouped as `This week`, `Coming up`, and `Later` rather than a tiny month grid.
4. Music, community programs, and authentic photo stories.
5. Clock, windows, organ, and building history.
6. Reflections plus selected Facebook highlights.

### Save a Welcome

A reassuring optional three-step visit flow:

1. Choose a Sunday or event.
2. Share party size and optional child/accessibility needs.
3. Choose a seating preference: front, middle, back, aisle, or accessible area.

This is a preference, not a ticket or guaranteed assigned pew. A literal seat map should be built only if staff will maintain it. Confirmation can include arrival time, entrances, directions, accessibility notes, add-to-calendar, and one small Chime animation.

### What's Happening

Import the public Mailchimp RSS feed into native cards for `Morning Reflection` and `From the Manse`. Curate selected Facebook photos or video posts manually and link back to Facebook. Do not use an unfiltered Facebook embed as the primary news experience, do not import commenter identities, and do not depend on expiring Facebook image URLs.

### Giving

Start with the church's hosted Givelify checkout. The page should clearly separate one-time and recurring giving, show verified fund options only, never invent impact claims, and place delight after a successful gift rather than before it.

## Lean asset plan

The photography core will use real church material. AI must not fabricate worshippers, children, staff, testimonials, or community events.

### Core pack

| Deliverable | Method | Placement | Paid generation |
| --- | --- | --- | --- |
| Three logo candidates | `gpt_image_2`, one transparent candidate per approved direction; final selection rebuilt as clean vector | Navigation, favicon, social avatar, print | 3 proposed jobs |
| Flagship hero still | Strong real exterior/Taylor Park photograph with approved crop and grade | Home hero and motion fallback | None |
| Four program heroes | Real worship, music, community, and history photographs in 16:9 and 1:1 crops | Program cards and landing pages | None |
| Three action stills | Real music-making, food/coffee service, and volunteer activity | Story modules and event promotion | None |
| Two detail stills | Real clock/bell/organ and window/woodwork details | History and quality-story sections | None |
| Two lifestyle stills | Real coffee hour/potluck and town-event images | Welcome and community sections | None |
| Five-second architectural loop plus poster | `seedance_2_0` from an approved real exterior or clock image; gentle clouds/leaves or bell movement, no architectural morphing | Optional home hero, with reduced-motion fallback | 1 optional proposed job |

Before production, ask the church for current original-resolution images of worship, musicians, volunteers, coffee hour, Pride/ecumenical worship, Church Street Celebration, and family activities.

### Brand-specific extras

| Extra | Website purpose | Method |
| --- | --- | --- |
| Formal clock badge + Chime UI states | Favicon, visitor helper, RSVP confirmation | Hand-built vector after logo selection |
| Romanesque arch frame | Section dividers and image masks | SVG/CSS |
| Tiffany-light wash | Quiet reflection and faith backgrounds | Subtle CSS/SVG using approved palette |
| Bell/sound-wave divider | Music pages and audio/video archive | SVG |
| Open and Affirming welcome band | Faith page and compact trust signal | Accessible gradient/stripe treatment |
| Taylor Park arrival illustration | Entrance, parking, and accessibility orientation | Simple custom map-style SVG |
| Event date tiles and seasonal stamps | Weekly event cards and social templates | CSS/vector templates |
| Photo crop and color-grade recipe | Visual consistency across old and new real images | Reusable editorial preset |

These extras have an actual placement and should not require paid Higgsfield generation.

## Reference lessons

Refero examples such as [Function](https://styles.refero.design/style/21b71be3-78a0-4681-a5b9-64cc4b40eb67), [In Common With](https://styles.refero.design/style/1f9089e1-4170-482f-b988-afe1124a70a9), and [Munro Partners](https://styles.refero.design/style/d2e327b2-1181-4203-82a6-2dc15a72078a) support a disciplined warm canvas, dark ink, one action color, editorial photography, and generous spacing. [Partiful](https://styles.refero.design/style/6db1057d-3457-4173-9184-df160415f060) and [Calendly](https://styles.refero.design/style/9946887b-ffa9-4276-af81-ae6352795afb) inform the RSVP hierarchy. Dribbble is useful for energy and composition only; its church concepts are not usability evidence and should not be copied.

The relevant Duolingo lesson is behavioral: [one obvious next step](https://blog.duolingo.com/new-duolingo-home-screen-design/), [purposeful consistency](https://blog.duolingo.com/core-tabs-redesign/), and [animation concentrated around meaningful milestones](https://blog.duolingo.com/streak-milestone-design-animation/).

## Approval gate

Approval is requested for:

1. `Village Hearth` as the overall direction.
2. `Bell & Hearth` as the proposed palette.
3. One logo route: A `Welcome Chime`, B `Open Arch`, or C `Living Window`.
4. The lean asset plan: three logo exploration jobs and one optional motion job, with all photography kept real.

After approval, save the final palette to `palette.md`, inspect Higgsfield's current CLI/model availability and credits, and report the exact cost of every proposed paid job. Generation still requires a separate explicit yes.
