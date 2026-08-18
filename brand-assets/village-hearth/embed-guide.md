# Logo embed guide

No website files were edited in this branding stage.

## Recommended placement

- Standard desktop navigation: `logo/refined/welcome-chime-horizontal-compact.svg`.
- Wide mastheads and formal documents: `logo/refined/welcome-chime-horizontal.svg` with descriptor line.
- Narrow/mobile navigation: `logo/refined/welcome-chime-mark.svg`.
- Browser icon: `logo/refined/welcome-chime-favicon.svg`, with `welcome-chime-favicon-32.png` as a legacy fallback.
- Single-ink print, engraving, or sponsor strips: `logo/refined/welcome-chime-one-color.svg`.

## HTML

```html
<a class="site-brand" href="/" aria-label="First Congregational Church of St. Albans — home">
  <img
    src="/brand/welcome-chime-horizontal-compact.svg"
    alt="First Congregational Church of St. Albans"
    width="1480"
    height="360"
  />
</a>
```

```html
<link rel="icon" href="/brand/welcome-chime-favicon.svg" type="image/svg+xml" />
<link rel="icon" href="/brand/welcome-chime-favicon-32.png" sizes="32x32" />
<link rel="icon" href="/brand/welcome-chime-favicon-16.png" sizes="16x16" />
<link rel="shortcut icon" href="/brand/welcome-chime-favicon.ico" />
```

## Usage rules

- Preserve clear space equal to the gold clock's diameter on every side.
- Use the compact lockup for normal headers. Reserve the descriptor version for approximately 850 CSS pixels and wider.
- Do not display a horizontal lockup below 280 CSS pixels wide; switch to the standalone mark.
- Keep the mark at least 24 CSS pixels tall. Use the dedicated favicon below 40 pixels.
- Do not recolor individual pieces outside the approved palette, stretch the mark, add a drop shadow, or place copy inside the open doorway.
- On Meetinghouse Paper, use the standard mark. On dark surfaces, place it on a quiet Meetinghouse Paper patch or use a separately approved reversed variant.
- Logo motion should be limited to a gentle one-time clock/chime welcome; always honor `prefers-reduced-motion`.
