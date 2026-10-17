# First Congregational Church of St. Albans

A joyful, welcoming digital home for First Congregational Church of St. Albans,
Vermont. The experience uses the **Village Hearth** brand and its **Welcome
Chime** mark, with authentic, people-free photography from the church archive.

**Live:** https://first-baptist.vercel.app — the repository name is historical; the site is for First Congregational Church of St. Albans.

## What is included

- Sunday worship and first-visit information
- Optional three-step “Save a welcome” email planner
- Current event filtering across worship, music, community, and reflection
- Privacy-first archived service video that loads only after consent
- Church reflections, Facebook handoff, history, photo gallery, giving, and contact
- Responsive layouts with a mobile menu and visit bar
- Open Graph artwork, favicons, semantic HTML, keyboard support, and reduced motion

## Local development

Node.js `>=22.13.0` is required.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verify the build

```bash
npm test
npm run lint
```

`npm run build` creates the Vinext worker and then exports the public homepage to
`dist/client/index.html`. The exported folder keeps all React interactions while
remaining deployable as a static site.

## Deploy on Vercel

The included `vercel.json` selects the **Other** framework preset, runs the
project build, and serves `dist/client` as the output directory. Connect the
GitHub repository in Vercel and deploy from `main`; no environment variables are
required for this version.

Online giving continues on the church’s existing Givelify page. The visit planner
opens a visitor’s email app and does not store or transmit anything automatically.
