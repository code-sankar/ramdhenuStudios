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

## Styling: Tailwind on top of the Industry system

Tailwind generates the utilities; **Industry still owns the values.** `src/styles/theme.css`
is the bridge — every theme key is an alias onto a variable declared in
`industry.css`, so `bg-steel-900` and `.blueprint` read the same source and the
design-system export stays droppable-in, unmodified.

| Utility | resolves to | |
|---|---|---|
| `bg-paper` | `--color-bg` | the light ground |
| `bg-panel` | `--color-surface` | the recessed ground |
| `text-ink` | `--color-text` | body and headings |
| `bg-steel`, `text-steel-700`, … | `--color-accent*` | the one accent + its 100–900 ramp |
| `text-mute-500`, … | `--color-neutral-*` | the neutral ramp |
| `border-line` | `--color-divider` | hairlines |
| `font-display` / `font-sans` | `--font-heading` / `--font-body` | Barlow Condensed / Barlow |
| `p-4`, `gap-2`, … | `--space-4`, `--space-2` | see below |

Names are aliased rather than mirrored because Tailwind's own keys collide with
Industry's — `--color-surface`, `--radius-md` and `--shadow-lg` exist in both, and
mirroring would produce a circular `--x: var(--x)`.

**Spacing lines up exactly.** Tailwind builds its whole scale from one base, and
Industry's is a 0.85× density-adjusted 4px scale (3.4 / 6.8 / 10.2 / …), so
`--spacing: 3.4px` makes `p-4` resolve to precisely `--space-4`.

**Three namespaces are cleared, not aliased** — `--color-*`, `--radius-*` and
`--shadow-*` are set to `initial`. That makes the system's rules unbreakable from
markup: no stray `bg-emerald-500` in a strictly mono scheme, no `rounded-lg` when
the blueprint layer squares every component, and elevation only ever from the DS's
`.elev-sm/md/lg`.

### Two things that will bite you

**Cascade layers.** `industry.css` is imported *into the `components` layer*
(`@import "./industry.css" layer(components)`). Unlayered CSS beats any layer
regardless of specificity, so left unlayered the DS's `.btn` would silently
override `hidden`, and its bare `h1 { font-size: 42px }` would override
`text-[clamp(...)]`. Layering puts them in the right order: the system supplies
defaults, utilities override them.

**Font faces are imported explicitly** in `theme.css`. `industry.css` imports them
too, but that nested `@import` stops resolving once the file is pulled through
Tailwind's pipeline — and the failure is silent: the variables and computed
`font-family` still say "Barlow Condensed" while nothing is actually loaded.

### What stays in CSS

`src/styles/app.css` is down to the residue — things a utility cannot express:
layered gradients with masks (the hero aurora, its scrim, the field grid), the
`::after` / `::before` spectrum rules, parent-state selectors (`:has`), and the
logo's mask mechanics. It introduces no colour, font or spacing of its own.

The design system's own component classes — `.blueprint`, `.corner`, `.btn`,
`.tag`, `.input`, `.field`, `.dialog` — are used as-is rather than
reimplemented, which is what the system's guide asks for. Read
`src/styles/INDUSTRY-README.md` before changing anything visual. The short version:

| | |
|---|---|
| Ground | `--color-bg` `#f2f2f3` paper, `--color-surface` for recessed bands |
| Field | `--color-accent-900` `#1d2d3d` steel — hero and contact, type reversed out |
| Accent | `--color-accent` `#5980a6`, one steel ramp, no second hue |
| Type | Barlow Condensed 600 headings over Barlow body |
| Objects | square corners, hairline borders, `+` registration marks at each corner |
| Icons | Lucide geometry at stroke-width 1.5 |

One rule the code depends on: **a framed element never drops its marks.**
`<Blueprint>` owns the border and all four corner marks together, so the frame
can't be rendered without them.

## Structure

```
src/
  styles/
    theme.css      Tailwind + the token bridge onto Industry; imports the rest
    industry.css   the design system, exported verbatim — owns every value
    app.css        the residue: gradients, masks, :has(), pseudo-elements
    fonts.css      self-hosted Barlow / Barlow Condensed @font-face rules
  data/            all copy — site.js, services.js, testimonials.js, legal.js
                   plus seo.js, the head every route carries
  pages/
    HomePage.jsx     hero → about → services → testimonials → faq → contact
    ServicePage.jsx  the template behind every /services/<slug>/
    NotFoundPage.jsx unknown paths, and unknown slugs
  components/
    Layout.jsx       skip link · header · <main> · footer, worn by every page
    Seo.jsx          writes the route's head — title, canonical, JSON-LD
    ScrollManager.jsx  hash, top or restore, depending on the navigation
    Blueprint.jsx    the wireframe frame + its four registration marks
    Plate.jsx        drawn spec-sheet figure, stands in for absent photography
    Logo.jsx         the wordmark — swap in the official artwork here
    Icon.jsx         the Lucide glyphs actually used, inline
    Reveal.jsx       one short scroll entrance, reused everywhere
    ui/SectionIndex  the numbered spec-sheet index each section opens with
    EnquiryForm.jsx  the conversion point — validation + WhatsApp/POST delivery
    Dialog.jsx       the system's modal, made keyboard-safe
    LegalDialogs.jsx privacy + terms, opened from the footer
    Header · Hero · About · Services · Testimonials · Contact · Footer
```

Routing lives in `src/App.jsx`: `/` → `HomePage`, `/services/:slug` → `ServicePage`,
anything else → `NotFoundPage`. Sections follow the artboard:
**Hero → About → Services → Testimonials → Contact.**

## Before this goes live

Nothing on this site fakes what the agency hasn't earned yet. Everything unproven
is flagged in place, and each flag is a one-line change in `src/data/`. The full
checklist lives at the top of `src/data/site.js`.

| What | Where | To publish |
|---|---|---|
| Contact details | `site.js` → `contact` | Real phone, WhatsApp number, email, studio address |
| Social profiles | `site.js` → `socials` | Replace the `#` hrefs |
| Live domain | `site.js` → `siteUrl` | Canonical URLs, OG tags, structured data and the sitemap all derive from it; `robots.txt` names it too |
| Example projects | `services.js` → `PROJECTS_ARE_PLACEHOLDER` | Real permissioned work, then set the flag to `false` |
| Placeholder quotes | `testimonials.js` → `TESTIMONIALS_ARE_PLACEHOLDER` | Permissioned quotes and photos, then `false` |
| Legal copy | `legal.js` → `LEGAL_NEEDS_REVIEW` | Have both documents reviewed, then `false` |

The About stats (`site.js` → `stats`) describe how the team is built — six
disciplines, one point of contact, 48h first response — rather than claiming
project volume. They're true on day one and need no disclaimer.

## The enquiry form

The site funnels into one conversion point, and it works today with no backend:
the form validates, composes the enquiry and hands it to WhatsApp, with email as
a fallback. Both land somewhere the team already reads.

To store submissions instead, set `enquiry.endpoint` in `src/data/site.js` to a
URL that accepts a POST (Formspree, a serverless function, a CRM webhook). The
form then posts JSON and reports success inline; WhatsApp stays available as the
second path. Nothing else changes.

```js
export const enquiry = {
  endpoint: "https://formspree.io/f/xxxxxxxx",   // null → WhatsApp handoff
  whatsappGreeting: "Hi Ramdhenu, I'd like to talk about…",
};
```

## The logo

The official artwork ships **white-on-transparent**, which is right for the steel
hero but would disappear on the paper ground the header and footer sit on. So the
PNG is used as a **CSS mask filled with `currentColor`** rather than placed as an
`<img>`: one asset serves every ground, in the exact token colour of wherever it
lands, and it follows the palette if the system is ever retuned.

Two variants, because the lockup does not survive being shrunk:

| Variant | What | Used in |
|---|---|---|
| `mark` | the monogram alone — legible down to ~24px | header (beside the name), hero headline |
| `lockup` | mark + wordmark + tagline — needs ~56px of height before the tagline resolves | footer |

The header pairs the official mark with the name set in Barlow Condensed, the same
condensed grotesque the artwork's own wordmark uses. The hero locks the mark into
the headline where the artboard calls for a photograph — it belongs in that
sentence better than a stand-in image would, and it swaps out the moment a real
team shot exists.

```
src/assets/brand/          full-resolution originals, versioned, never shipped
  logo-mark-source.png       7500×7500
  logo-lockup-source.png     7500×3000
src/assets/               optimised derivatives the site imports
  logo-mark.png              1.6 MB → 10 KB
  logo-lockup.png            555 KB → 47 KB
public/                   favicons + share card, opaque steel tile
```

After replacing a source file, regenerate the derivatives:

```bash
node scripts/generate-brand-assets.mjs   # logo assets + favicons
node scripts/generate-og-image.mjs       # social share card
```

(Both drive headless Chromium; `playwright` is already a devDependency.)

Originals live in `src/assets/brand/` rather than `public/` deliberately —
anything in `public/` is copied verbatim into the build, so the 2.2 MB of
full-resolution artwork would ship to every visitor.

## Service pages

Each service is a page at `/services/<slug>/`, rendered by `src/pages/ServicePage.jsx`
from an entry in `src/data/services.js`. **Adding a service is one entry in that
file** — the route, the page, its head and its sitemap line all follow from it,
and there is nothing to regenerate.

The slug comes off the route, so the six pages are one component, not six files:

```jsx
const { slug } = useParams();
const service = serviceBySlug(slug);
```

A slug with no entry renders the 404 at that URL rather than redirecting, so the
address bar keeps saying what was asked for.

### The build still writes real files

`npm run build` runs `vite build` and then `scripts/generate-static-routes.mjs`,
which writes `dist/services/<slug>/index.html` for every service, plus
`dist/index.html`, `dist/404.html` and `dist/sitemap.xml`.

That step exists because two things about the old multi-page build were worth
keeping, and neither survives a plain single-page app:

**Deep links.** One `index.html` behind a client-side router needs a rewrite rule
on the host before `/services/photography-videography/` resolves to anything. A
real file at that path works on any static host, unconfigured. `dist/404.html`
covers hosts that want an explicit not-found document.

**Search.** These pages exist to rank for terms like "website design Guwahati".
One `index.html` for every URL means one title, one description and one set of
structured data for all six unless the crawler runs the JavaScript.

So each file is the built `index.html` with that route's head substituted into
the `<!--seo:start--> … <!--seo:end-->` slot. Nothing else differs between them.

## SEO

`src/data/seo.js` describes every route's head as data — title, description,
canonical, Open Graph and Twitter cards, and the JSON-LD blocks. Two things read
it, which is what stops the static head and the rendered one drifting apart:

| | |
|---|---|
| `src/components/Seo.jsx` | applies the head for the route React is showing, and swaps it on navigation |
| `scripts/generate-static-routes.mjs` | writes the same tags into each built HTML file |

Every tag either of them writes is stamped `data-seo`. That is how `<Seo>` knows
which tags are the route's: on a client-side navigation it removes exactly that
set and writes the next route's, so you never end up with two canonicals.

The home page carries `ProfessionalService` — the schema type that earns the
knowledge panel and Maps treatment a local agency depends on, which is the same
surface the Google Business service sells to clients. Each service page carries
`Service` (with its includes list as an offer catalog) and a `BreadcrumbList`.
The FAQ section renders its own `FAQPage` block from the questions on the page,
so that one cannot drift either.

`public/` holds `robots.txt` and the share card; `sitemap.xml` is generated into
`dist/` at build time. **The domain is set once**, in `src/data/site.js` →
`siteUrl` — everything above derives from it.

## The About video

`src/data/site.js` → `aboutVideo`. Set `id` to the YouTube video ID — the part
after `?v=` in the watch URL — and the slot goes live. Until then it renders a
drawn blueprint plate marked as a sample, the same way unpublished project work
does.

```js
export const aboutVideo = {
  id: "dQw4w9WgXcQ",                                              // required
  title: "Ramdhenu — who we are",                                 // used as the iframe title
  poster: new URL("../assets/about-poster.jpg", import.meta.url).href,
  caption: "A short introduction to the team…",
};
```

**It is a facade, not a bare iframe.** Dropping YouTube's embed straight into
the page costs roughly 1.5 MB of script and a dozen requests on *every* load,
whether or not anyone watches — on a mid-range phone that lands squarely on the
hero's LCP. Instead nothing loads until someone presses play: a local still plus
a play control, `preconnect` on hover so the handshakes happen during the moment
of intent, then the iframe mounts on click.

**Keep the poster local.** Export your own still at 1600×900 into `src/assets/`.
Do *not* point `poster` at `https://i.ytimg.com/…` — that is a third-party
request on every page load, and it would make the privacy policy's "nothing is
requested from YouTube unless you press play" untrue. The player itself uses
`youtube-nocookie.com`, so no cookie is set until a visitor chooses to watch.

If you ever swap the facade for a plain embed, update
`src/data/legal.js` → "The video on this page" to match.

## Adding real photography

Figures render a drawn blueprint plate until a photograph exists. Drop the file in
`src/assets/work/` and set `image` on the project:

```js
project: {
  image: new URL("../assets/work/greenwood-resort.jpg", import.meta.url).href,
}
```

The component then swaps the plate for the photo. Photographs render in true
colour inside the system's hairline frame and corner marks, fitted with
`object-contain` — the whole image stays visible rather than being cropped to
fill the box, so a shot's own composition survives the layout.

## Type

Barlow and Barlow Condensed are served from `public/fonts` (Latin + Latin-Extended,
~144 KB) rather than the Google Fonts CDN the design system imports by default:
one less DNS + TLS handshake before first paint, no third-party request from a
visitor's browser, and the type still renders offline.

## Accessibility

Keyboard focus uses the system's 2px accent `:focus-visible` ring throughout, and a
skip link is the first stop in the tab order.

- **Services index** — six ruled rows, each a plain link to the page behind it;
  no disclosure state to get stuck in.
- **Testimonial rail** — `aria-live="polite"`; autoplay suspends on hover and on
  focus, and stands down entirely under `prefers-reduced-motion`, which also
  flattens every transition on the page.
- **Enquiry form** — native inputs with real labels. Validation fires on submit
  rather than on every keystroke, errors are tied to their field with
  `aria-describedby` / `aria-invalid`, focus moves to the first field that failed,
  and the result is announced through `role="status"`.
- **Legal dialogs** — `role="dialog"` with `aria-modal`, Escape to close, focus
  moved in on open and returned to the trigger on close, and Tab trapped inside.
