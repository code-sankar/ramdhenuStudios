# Ramdhenu — a step towards digital presence

Marketing site for Ramdhenu, a digital agency for local businesses. React + Vite,
built to the **Industry** design system exported from Claude Design.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview
npm run lint
```

## The design system

`src/styles/industry.css` is the exported Industry stylesheet, shipped **verbatim**
as the single source of truth for colour, type, spacing, radius and elevation.
`src/styles/INDUSTRY-README.md` is its authoring guide — read it before changing
anything visual. The short version:

| | |
|---|---|
| Ground | `--color-bg` `#f2f2f3` paper, `--color-surface` for recessed bands |
| Field | `--color-accent-900` `#1d2d3d` steel — hero and contact, type reversed out |
| Accent | `--color-accent` `#5980a6`, one steel ramp, no second hue |
| Type | Barlow Condensed 600 headings over Barlow body |
| Objects | square corners, hairline borders, `+` registration marks at each corner |
| Icons | Lucide geometry at stroke-width 1.5 |

Two rules from the guide the code depends on:

- **Take every value from a token.** No hex codes, font names or raw pixel values
  that `var(--color-*)`, `var(--font-*)`, `var(--space-*)` or `var(--radius-*)`
  already carry. `src/styles/app.css` is the page layer and introduces none of
  its own.
- **A framed element never drops its marks.** `<Blueprint>` owns the border and
  all four corner marks together, so the frame can't be rendered without them.

Tailwind was removed when the system landed: its utility scale would be a second,
competing set of tokens, which is exactly what the guide warns against.

## Structure

```
src/
  styles/
    industry.css   the design system, exported verbatim — source of truth
    app.css        page layer: layout and sections, composed from DS tokens
    fonts.css      self-hosted Barlow / Barlow Condensed @font-face rules
  data/            all copy — site.js, services.js, testimonials.js
  components/
    Blueprint.jsx  the wireframe frame + its four registration marks
    Plate.jsx      drawn spec-sheet figure, stands in for absent photography
    Icon.jsx       the Lucide glyphs actually used, inline
    Reveal.jsx     one short scroll entrance, reused everywhere
    Header · Hero · About · Services · Testimonials · Contact · Footer
```

Sections follow the artboard: **Hero → About → Services → Testimonials → Contact.**

## Before this goes live

Three things are deliberately marked as unfinished rather than faked. Each is a
one-line change in `src/data/`.

| What | Where | To publish |
|---|---|---|
| Example projects | `services.js` → `PROJECTS_ARE_PLACEHOLDER` | Replace with real permissioned work, then set the flag to `false` to drop the "Sample" note |
| Placeholder quotes | `testimonials.js` → `TESTIMONIALS_ARE_PLACEHOLDER` | Swap in permissioned quotes, add photos, set the flag to `false` |
| Contact details | `site.js` → `contact` | Real phone, email, studio address |

The About stats (`site.js` → `stats`) describe how the team is built — six
disciplines, one point of contact, 48h first response — rather than claiming
project volume the agency hasn't earned yet. They're true on day one and need no
disclaimer.

### Adding real photography

Figures render a drawn blueprint plate until a photograph exists. Drop the file in
`src/assets/work/` and set `image` on the project:

```js
project: {
  image: new URL("../assets/work/greenwood-resort.jpg", import.meta.url).href,
}
```

The component then swaps the plate for the photo and applies the system's
`.duotone` wash automatically. Duotone is only ever applied to real photographs —
it flattens a line drawing into a solid field.

## Type

Barlow and Barlow Condensed are served from `public/fonts` (Latin + Latin-Extended,
~144 KB) rather than the Google Fonts CDN the design system imports by default:
one less DNS + TLS handshake before first paint, no third-party request from a
visitor's browser, and the type still renders offline.

## Accessibility

Keyboard focus uses the system's 2px accent `:focus-visible` ring throughout. The
services accordion is a real `button` with `aria-expanded` / `aria-controls`; the
testimonial rail is `aria-live="polite"` and its autoplay suspends on hover and on
focus, and stands down entirely under `prefers-reduced-motion` — which also flattens
every transition on the page.
