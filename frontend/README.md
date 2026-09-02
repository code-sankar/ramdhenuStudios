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
  data/            all copy — site.js, services.js, industries.js, work.js,
                   testimonials.js, legal.js, plus seo.js (the head every
                   route carries), analytics.js and booking.js (both off
                   until configured)
  lib/
    track.js         send an event, safely, whether or not analytics is on
  pages/
    HomePage.jsx     hero → about → services → orbit → testimonials → faq → contact
    ServicePage.jsx  the template behind every /services/<slug>/
    IndustryPage.jsx the template behind every /industries/<slug>/
    WorkPage.jsx     every project in one filterable grid, at /work/
    ProjectPage.jsx  one case study, at /work/<slug>/
    NotFoundPage.jsx unknown paths, and unknown slugs
  components/
    Layout.jsx       skip link · header · <main> · footer, worn by every page
    Seo.jsx          writes the route's head — title, canonical, JSON-LD
    Analytics.jsx    loads the provider, counts a pageview per route
    BookCall.jsx     the Cal.com embed, loaded on intent like the video
    ScrollManager.jsx  hash, top or restore, depending on the navigation
    NavMenu.jsx      the header's dropdowns (services, industries) — accordion below lg
    Blueprint.jsx    the wireframe frame + its four registration marks
    Plate.jsx        drawn spec-sheet figure, stands in for absent photography
    Logo.jsx         the wordmark — swap in the official artwork here
    Icon.jsx         the Lucide glyphs actually used, inline
    Reveal.jsx       one short scroll entrance, reused everywhere
    BubbleField.jsx  the hero's drift of soap bubbles — 50 of them, CSS only
    figures/         one diagram per service page, plus the home page's bow
    ParticleMark.jsx the monogram as a body of rising bubbles (currently unused)
    Orbit.jsx        the six disciplines drawn as one system, on one centre
    Span.jsx         what happens after you get in touch, drawn end to end
    ui/SectionIndex  the numbered spec-sheet index each section opens with
    EnquiryForm.jsx  the conversion point — validation + WhatsApp/POST delivery
    Dialog.jsx       the system's modal, made keyboard-safe
    LegalDialogs.jsx privacy + terms, opened from the footer
    Header · Hero · About · Services · Testimonials · Faq · Contact · Footer
```

Routing lives in `src/App.jsx`: `/` → `HomePage`, `/services/:slug` → `ServicePage`,
`/industries/:slug` → `IndustryPage`, `/work` → `WorkPage`, `/work/:slug` →
`ProjectPage`, anything else → `NotFoundPage`. Sections follow the artboard:
**Hero → About → Services → Orbit → Testimonials → FAQ → Span → Contact.**

The hero's background is `BubbleField`: fifty soap bubbles drifting gently over
the coral, each one built from seven stacked radial gradients — rim, specular,
bloom, bounce, and the three thin-film interference hues soap actually makes.
Three things about it are worth knowing before changing it.

**No `filter: blur()`, anywhere, deliberately.** Depth of field is carried by
`--soft`, which widens and dims the rim's gradient stops instead. Measured on a
software rasteriser, real filters ran the hero at 27fps against 60 without them,
and the cost is per *element*, not per pixel of radius — half a pixel of blur
costs what four do. Reintroducing a filter here will halve the frame rate.

**Nothing animates but `transform`.** Two nested elements per bubble, so the rise
and the sway run on their own unrelated clocks and trace a path that takes
minutes to repeat. The drift is bounded — bubbles breathe around their placed
position rather than rising and wrapping, so the composition stays composed.

**The scrim is load-bearing, and it is mixed from `coral-700` on purpose.** White
on flat coral-500 is 4.61:1 — it passes AA with a tenth of a point to spare, so
the hero had no headroom for texture of any kind. A scrim in the field's own
colour can only restore that; a darker one adds contrast back. Every value in it
is the loosest that passed a measurement taken at the pixels glyphs actually
paint, sampled across the drift cycle at seven viewports. Lighten it and the
12px rail goes under AA. The numbers are in `coral.css` §2.1.

`src/components/figures/` holds one diagram per service page and one for the
home page's closing section, and they are deliberately seven different diagrams
rather than one diagram with seven sets of nouns:

| figure | shape | claim | page |
|---|---|---|---|
| `Anatomy` | hub, orthogonal, inward | these six ship together or nothing runs | websites |
| `Pipeline` | a line that ends | the camera is one stage of four | photo & video |
| `Loop` | a ring that does not end | a cycle, not a campaign | social |
| `Funnel` | narrowing tiers | most of the spend falls away | paid ads |
| `Catchment` | a pin and its radius | you, and everyone searching near you | Google Business |
| `Radiate` | spokes, outward | one decision, six surfaces | branding |
| `Arc` | a bow, converging then spread | you can see the far end from here | home (`Span`) |

A hub says "these belong together"; a funnel says "most of this is lost"; a ring
says "this never finishes". Those are different claims and the services make
different claims — reskinning one figure six times would say nothing six times,
and a visitor moving between two service pages would notice. `Radiate` and
`Anatomy` are the pair to watch: same node count, opposite argument, so one is
orthogonal-and-inward on a rectangular grid and the other radial-and-outward on a
circle. If they ever converge, the second page starts reading as the first with
the words swapped.

`Stage.jsx` carries everything that is *not* the argument — the coordinate
space, the cards, the reduced-motion gate — so a new figure is a layout and a
claim rather than another copy of the scaffolding. Which figure a page gets is
`figure.kind` in that service's own data.

**Every figure carries two geometries and picks between them at 720px** (see
`useLayout.js`). They used to vanish below 1024px instead, on the reasoning that
six wires converging on a centre stops being an argument in a single column.
That justified dropping the *landscape layout*; it did not follow that there
should be no drawing, and the effect was that every visitor on a phone — which
for this site's audience is most of them — got the list the diagram existed to
improve on. A ring is not a landscape shape. Neither is a funnel or a spine.

So the horizontal pipeline becomes a vertical one; the hub keeps its frame and
hangs its cards off a trunk; the branding circle opens into a fan between two
columns; the ring, the funnel and the catchment keep their shape and tighten.
The breakpoint is arithmetic rather than taste: at a 720px stage a landscape
card is 134px against a 96px label measure plus padding, the last width where it
is comfortable.

**Type is the constraint that sizes the portrait geometries**, because it does
not scale with an SVG viewBox — a card's contents have a fixed pixel height
while its box shrinks with the stage. Worst case is a 320px viewport, where the
stage is 280px: badge 30 + gap 6 + two lines of 12px + 12 of padding is 76px,
which is 27% of the stage. Every narrow card clears that. The check that catches
a regression is `scrollHeight > clientHeight` on a `.fig-node`, run at ten
widths from 320 to 1440.

Three things to know before editing one. **The stage's proportions are
load-bearing, not styling** — wires are SVG in viewBox units and cards are HTML
in percentages, the same distance only while the ratio is fixed. `Stage` derives
`aspect-ratio` from its own `view` for exactly this reason; do not put an
`aspect-ratio` for a figure in the stylesheet. **All motion is SMIL, which
`prefers-reduced-motion` cannot reach from CSS** — `animation-duration: 0.001ms`
sails straight past `<animateMotion>` — so every figure gates it in JS via
`useStill`, and a figure whose motion carries information draws a still version
instead of dropping it. **And the section numbers and band colours are
positional**, derived from the sections that actually render: hard-coded numbers
were one missing project away from printing 01, 02, 04, 05 on a live page.

`Span` is the last section before the form, and `Arc` is its figure. The FAQ
above it answers the objections a visitor can put into words; this answers the
one they cannot, which is what the far end of an engagement even looks like —
four named stages, the free ones marked, and the point where money starts drawn
rather than described. Three things about it are worth knowing.

**It is a bow because of the name.** Ramdhenu is Assamese for rainbow, and this
is the one place on the site where that is allowed to mean something: one beam
arrives at the near foot, bends, and lands on the far side as four separate
points rather than one. That divergence is the same argument the rest of the
site makes in words — one brief in, six disciplines out — and it is drawn into
the geometry rather than performed by the travellers, so it survives with the
motion switched off.

**The stroke changes at the summit, and that is arithmetic.** The bow is dashed
while the engagement costs nothing and solid afterwards, and the switch sits at
the midpoint between the last free stage and the first paid one. With two of
four stages free that midpoint is exactly the crest — the one point on a bow the
eye goes to unprompted turns out to be the one point in the engagement worth
marking. It is why `STOPS` spaces the middle two stages to leave 119 units of
daylight at the top: the summit has to be seen through the gap, and the
dimension's extension line has to come down through it.

**The free run is dimensioned, landscape only.** A bow encloses a lot of nothing
on a laptop, and what goes in it is the convention this whole design system is
built on — a measured span, ticked at both ends, with its value set where a
dimension's value goes. Both ends of it read from the same `free` flags in
`span.js` that put the "no charge" marks on the key below, so the drawing and
the caption cannot disagree about what is free. Portrait has no such gap and no
width to spend, so it does without and loses nothing the dashes were not
already saying.

`Orbit` is the one section that is not a list of anything. The services grid
above it can say what the six disciplines are but not why they belong in one
place — a list is six separate things by construction. So the same six are drawn
again as one figure: six nodes on a circle, three ellipses whose long axes land
exactly on the opposing pairs, and one lit sphere at the centre they all turn
around. The centre is deliberately empty — it held the brand mark for a while,
and a logo animation inside a diagram gives the section two subjects competing
for the same glance. The read-out below the figure names the centre in words
instead. Its geometry is computed from `services.js`, so adding or removing a
discipline re-solves the whole figure rather than needing it redrawn.

## Before this goes live

Nothing on this site fakes what the agency hasn't earned yet. Everything unproven
is flagged in place, and each flag is a one-line change in `src/data/`. The full
checklist lives at the top of `src/data/site.js`.

| What | Where | To publish |
|---|---|---|
| Contact details | `site.js` → `contact` | Real phone, WhatsApp number, email, studio address |
| Social profiles | `site.js` → `socials` | Instagram and Facebook are live; LinkedIn is still `#`. Anything left on `#` is dropped from the hero, rendered as an inert mark in the footer, and left out of the structured data's `sameAs` — a profile is only ever claimed once it exists |
| Live domain | `VITE_SITE_URL` in the host's environment | Canonical URLs, OG tags, structured data, the sitemap and robots.txt all derive from it. Unset, a Vercel deployment uses its own URL — see [Deploying](#deploying) |
| Example projects | `work.js` → each project's `placeholder` | Real permissioned work, then drop that project's flag — one at a time. Five remain, covering the disciplines with no real work yet |
| Project status | `work.js` → each real project's `stage` | Drop `stage` and fill `liveUrl` in the same edit, once a build is actually live |
| Placeholder quotes | `testimonials.js` → each quote's `placeholder` | A real name, role and permission, then drop that quote's flag |
| Analytics | `analytics.js` → `provider`, `siteId` | Off until set; turning it on rewrites the privacy policy's tracking line |
| Lead storage | `site.js` → `enquiry.endpoint` | Until set, enquiries go to WhatsApp and nothing is stored |
| Book a call | `booking.js` → `calLink` | Off until set; connect the calendar you actually use, or it offers slots you aren't free for |
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

## Dialogs

`Dialog` animates its own entrance and exit, which means **callers must keep it
mounted and toggle `open`.** A caller that writes `{isOpen && <Dialog open …/>}`,
or returns `null` when its own state clears, destroys the subtree in the same
frame the close is requested — the dialog will fade in and vanish instantly,
however much animation is declared inside it.

`LegalDialogs` had exactly that shape. It now renders one dialog per document
and lets each own its `open` flag, which is why both are always mounted: a
closed one renders `<AnimatePresence>` around nothing and costs no DOM, and
neither ever has to remember what it was showing a moment ago. The alternative —
one dialog plus a ref or an effect holding the last document through the close —
exists only to answer a question this shape never asks.

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

`sitemap.xml` and `robots.txt` are both generated into `dist/` at build time.
Neither is a file anyone edits: a `Sitemap:` line naming a hostname by hand is
one copy of a value that also lives in the canonical of every page, and the two
part company the first time the site is deployed somewhere else.

### The domain comes from the environment

Everything above — canonicals, `og:url`, the absolute URLs in the structured
data, the sitemap, the `Sitemap:` line — derives from one value, and that value
is resolved from the environment by `src/data/site-url.js`:

| | |
|---|---|
| `VITE_SITE_URL` | the custom domain, set explicitly. Always wins |
| Vercel's production URL | a production deployment with no custom domain set yet |
| Vercel's deployment URL | a preview, so its canonicals point at itself |
| `https://ramdhenu.studio` | local builds, and anything not on Vercel |

**Two processes have to agree on the answer**, which is why it is a function
rather than four `||`s at the point of use. `vite build` bakes it into the
bundle the browser runs; `generate-static-routes.mjs` is a separate Node
process that writes the same head into the HTML. `VERCEL_ENV` and `VERCEL_URL`
are not `VITE_` variables and never reach a bundle on their own, so
`vite.config.js` resolves both values and `define`s them — otherwise a crawler
would read one canonical out of the file and a visitor would get a different
one written over it on the first client-side navigation.

### Nothing but production is indexable

Every Vercel branch and pull request gets its own public URL, and left alone
those get crawled — a dozen copies of the same six service pages on a dozen
hostnames, competing with the real ones. That is the usual way a site with good
SEO ends up ranking its own staging build.

So a non-production build is marked twice: `noindex, nofollow` in every page's
head, applied in `headTags` where no route can forget it, and `Disallow: /` in
robots.txt. The two answer different questions — robots.txt stops the crawl,
the meta tag gets a page already in the index back out of it, and neither does
the other's job.

## Deploying

The app is in `frontend/` and the repo root is otherwise empty, so **the Vercel
project's Root Directory must be set to `frontend`** — the one setting this
deploy needs. Vercel then runs every command from inside `frontend/`, and
`vercel.json` at the repo root is picked up as the fallback config because there
is none in the root directory.

| | |
|---|---|
| Root Directory | `frontend` (Vercel dashboard → Settings → General) |
| Install | `npm ci` |
| Build | `npm run build` — Vite, then the route generator |
| Output | `dist` |
| Node | `22.x`, pinned in `package.json` → `engines` |

**EVERY PATH IN `vercel.json` IS RELATIVE TO `frontend/`, NOT TO THE REPO ROOT,
and getting that wrong is silent until it is fatal.** The first version of this
file read `cd frontend && npm ci` with an output of `frontend/dist`, written on
the assumption that Vercel runs from the repository root. It does not when a
Root Directory is set: the hop gets applied twice, and the build dies at
`cd: frontend: No such file or directory` before a single line of the app is
compiled — so the deploy that fails is not a broken site, it is the previous
site still being served. The tell in the log is Vercel reporting the `engines`
field, which only exists in `frontend/package.json`: if Vercel is reading that
as *the* package.json, `frontend/` is already the working directory and nothing
here may name it again.

The `headers` blocks are unaffected — their `source` patterns are request paths,
not filesystem paths.

**`engines.node` IS THE BUILD IMAGE, NOT A STATEMENT ABOUT THE CODE**, and it is
pinned to a major for that reason. It read `>=20.19` — the floor Vite 8 actually
requires — and Vercel warned, correctly, that an open-ended range follows every
new Node major as it is released. That is runtime changing under a site that is
otherwise reproducible, on a deploy nobody is watching, and the breakage would
surface on whatever push happened to come next rather than on the change that
caused it. `22.x` is the form Vercel documents, so there is no range resolution
to guess at either.

The code itself still runs on Node 20.19 and up; only the build image is fixed.
A contributor on 20.x sees one `EBADENGINE` warning from npm, which is a warning
and not a failure — `engine-strict` is off, the install completes and the dev
server runs. Move the pin when the project moves to a new LTS, which is then a
deliberate one-line change rather than something that happens on its own.

**Set `VITE_SITE_URL` to the real domain** once one is attached, as a
Production environment variable. Until then a production deployment falls back
to the `*.vercel.app` URL, which is right rather than merely harmless: the
canonicals point at the site that is actually serving them.

`trailingSlash: true` is not cosmetic. Every canonical this site emits ends in
a slash, and the route generator writes `services/<slug>/index.html`; without
it, `/services/website-design-development` and the same path with a slash are
two URLs serving one page, which is the definition of duplicate content. With
it, the first 308s to the second.

Deep links need no rewrite rule. Every route is a real file on disk, and
anything unknown falls through to `404.html` — which returns a genuine 404
*and* boots the app, so the visitor gets the branded not-found page rather than
the host's.

Static assets are served `immutable` for a year; Vite fingerprints everything
under `/assets`, and the fonts under `/fonts` are named by family, weight and
subset. HTML and the sitemap are `must-revalidate`, so a deploy is visible on
the next request rather than whenever a cache decides.

**There is no Content-Security-Policy header, and that is a decision.** The
boot splash is an inline `<script>` and an inline `<style>` in `index.html` —
both by necessity, since it has to paint before the bundle parses — so any CSP
that let the site run would need `'unsafe-inline'` for scripts and styles,
which is most of what a CSP is for. A policy that permits the thing it exists
to prevent is worse than none: it reads as protection in an audit and provides
none. `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and
`Permissions-Policy` are set, and all four do their whole job.

## Industry pages

A service page answers *"what is performance marketing?"*. An industry page
answers *"what would you do for my clinic?"* — which is what people actually
search, and what a generic services page answers badly.

Six live at `/industries/<slug>/`, rendered by `src/pages/IndustryPage.jsx` from
`src/data/industries.js`. They reuse the whole service-page apparatus: the same
router, the same `<Seo>`, the same static route generation, the same sitemap.
Adding one is a single entry in that file.

Each page is built to route **into** the services rather than compete with them.
`priority` lists service slugs in the order they matter for that trade, and the
sidebar renders them as ranked links:

```js
priority: ["photography-videography", "google-business-management", "social-media-management"],
```

The chips in the About section link to whichever industries have a page; the
rest stay plain text, so the home page never promises a page that doesn't exist.

Two details worth knowing before you edit the copy:

- **`plural` and `singular` are separate fields** from `name` and `short`,
  because a nav label does not survive being dropped into a sentence — you get
  "for most Restaurants businesses" otherwise.
- **Nothing on these pages claims a result**, quotes a figure or names a client.
  They describe how we'd approach a trade, which is true on day one. The moment
  one starts claiming outcomes we can't evidence, it stops being worth ranking.

## The nav dropdowns

Two nav items open a mega-menu: **Services** (the six disciplines) and
**Industries** (the six trades). Both are the same component,
`src/components/NavMenu.jsx`, rendered twice.

Their contents are built in `Header.jsx` from `services.js` and
`industries.js`, so neither menu can fall out of step with its data — `site.js`
only carries the *name* of the menu on the nav item:

```js
{ label: "Services",   id: "services", menu: "services"   },
{ label: "Work",       path: "/work/"                     },
{ label: "Industries",                 menu: "industries" },
```

That indirection is deliberate: `seo.js` imports `site.js`, so building hrefs
in `site.js` would need the route helpers back out of `seo.js` and close a
cycle. (`menu` used to be a boolean, back when one item had a dropdown.)

**Industries carries no `id`.** Its panel footer points at the industry chips
in the About section (`/#industries`), and if the nav item claimed that anchor
too, the scroll-spy would light up both "About" and "Industries" for one
section. Its highlight comes from `pathname.startsWith("/industries/")`
instead — which is also the only thing that can mark a *button* as current
across six pages it does not itself link to.

### One component, two vocabularies

Nothing inside `NavMenu` may name a service, so the two words that differ are
props:

| prop | Services | Industries |
|---|---|---|
| `kind` | `"Service"` | `"Industry"` — the read column's eyebrow, `01 — …` |
| `listLabel` | *(none)* | `"Where we usually start"` |

`listLabel` exists because the bullets under an industry are **service names**
taken from its `priority`, and three service names sitting unlabelled under an
industry heading read as part of the industry. What a service *includes* needs
no such heading.

The list's own layout follows its content rather than a flag: every line 18
characters or shorter and it becomes one wrapping row, otherwise two columns.
The shortest service bullet is 21 characters and the longest industry entry is
15, so services get columns and industries get a row — and a longer line added
later moves itself back into columns.

### The panel centres on the bar, not on its trigger

An 880px panel needs 440px of room either side of whatever it is centred on,
and the first trigger in a seven-item row does not have it — centred on
"Services" at 1280px it hung 52px off the left edge of the window. So
`NavMenu`'s wrapper is deliberately **not** positioned at `lg`, which leaves
the fixed `<header>` as the panel's containing block, and
`top: calc(100% + 14px)` is measured from the bar's own height. It cannot go
off-screen at any width.

Two consequences follow from that, and both are load-bearing.

**Nothing may wrap the panel in a transformed box.** A transformed element is a
containing block for absolutely positioned descendants, so while an outer
`motion.div` held `transform: matrix(…)` through the entrance, the panel was
positioned against *it* — a 100px inline box sitting at the trigger — and only
against the header once motion wrote `transform: none` on the last frame. The
panel faded in 52px off the left edge and then snapped 252px sideways into
place, every time it opened. The animated element and the positioned element
are now the same element, which is the only arrangement where that cannot
happen.

**It is centred by margins, not by a transform.** `inset-x-0` plus a fixed
width leaves the horizontal equation over-constrained, and the spec resolves
that by splitting the slack between two `auto` margins — centring with no
transform at all. It has to be that way round, because the element doing the
centring is also the one the entrance animates, and `-translate-x-1/2` and an
animated `y` would be fighting over the same property.

### Which menu is open, not whether one is

`Header` holds one slot and the last opener wins. Two dropdowns sharing a
boolean flicker: crossing from one trigger to the other opens the second and
*then* closes the first, and the bar would follow that close and go transparent
under an open panel. A close reported by a menu that is no longer the open one
is ignored, which is exactly what a slot gives you and a boolean cannot.

**One sheet is painted at a time.** Both panels open in the same box, so during
a handover the outgoing one spends its whole exit fade sitting exactly on top
of the incoming one, and two translucent white sheets render each other's text
— for a moment the menu shows six services and six industries at once. So the
header marks whichever menu is not the open one and its panel is cut rather
than faded (`[data-preempt]`, coral.css §3). The flag goes on the *wrapper*:
once `AnimatePresence` starts an exit it is replaying the element from the
render before removal, so a class on the panel itself arrives one render too
late.

It gates painting only, never state. A preempted menu still owns and clears its
own open-ness — the outside-`pointerdown` handler closes it the moment you
press the other trigger — so the two can never disagree about who is open, and
nothing can pop back when the winner closes.

Only the bar's copy of a dropdown reports its state. The drawer's copy is an
accordion inside a full-screen coral overlay, and `data-menu` turns the bar
white — so expanding it used to paint a white strip and a recoloured CTA across
the top of the drawer, and leave the bar stuck white after the drawer closed,
because the report has no unmount cleanup.

### The trigger is a button, not a link

That is the whole accessibility story. A link that also opens a menu has to
guess which one a click meant. A button that opens a menu is unambiguous — and
the destination the link used to point at survives as the first row inside
("All services"). **A trigger that swallows its own destination is a dead
end.**

| | |
|---|---|
| Click / Enter / Space | toggles |
| Escape | closes and returns focus to the trigger |
| Down from the trigger | opens and lands on the first item |
| Up / Down inside | move between items, wrapping |
| Focus leaving the control | closes |
| Click anywhere outside | closes (on `pointerdown`, so it beats the click underneath) |

Hover opens it too, but only behind `(hover: hover)` — a touch device never
gets a phantom open from a tap meant as a click. **Closing is delayed 140ms**
because the path from trigger to panel is diagonal, and a menu that vanishes
mid-reach is the single most common way this pattern is got wrong.

### Below lg it is not a dropdown

The header already collapses into a stacked panel on a phone, so the menu
becomes an inline accordion inside it. An absolutely positioned overlay in a
360px column would cover the nav it belongs to. Same component, same state,
different placement — `lg:absolute` versus static.

**That threshold moved from 768 to 1024 when Industries was added, and the
number is arithmetic rather than taste.** A 768px bar gives the link row 458px
between the lockup and the CTA; six items and their gaps already needed 461.
The seventh needs about 105 more, and no amount of tightening finds it. At
1024 there is 665px available against 566 needed — which itself only works
because the wider lockup and the "Available" chip now wait for `xl`; carrying
both at 1024 costs 84px and leaves 15. So 768–1023 gets the drawer, which is
what a tablet in portrait wants anyway.

### Open-ness is a path, not a boolean

`openAt` stores the pathname the menu was opened on, and `open` is derived
from `openAt === pathname`. A navigation therefore closes it **by derivation**,
rather than by an effect firing after the new page has already painted behind
it. That also keeps the component clear of `react-hooks/set-state-in-effect`.

## The work page

`/work/`, rendered by `src/pages/WorkPage.jsx` from `src/data/work.js` — every
project in one filterable grid, plus the closing ask every top-level page ends
on. Nav, footer, sitemap and the home Services section all link to it.

### One catalog, not one per service

`work.js` used to be six separate objects, each embedded as `project` inside
its service in `services.js`. It is a shared catalog now: every entry lists
which service slugs it demonstrates (`services: [slug, …]`), and two things
read it —

| | |
|---|---|
| `WorkPage.jsx` | the full grid at `/work/`, filterable by discipline |
| `ServicePage.jsx` | the one example in that service's own "The work" section |

A project proving more than one discipline — a shoot that also fed the social
calendar, a site built alongside a rebrand — is one entry with two slugs in
`services`, not two copies that can quietly drift apart. `workByService(slug)`
picks the representative example for a service page; `workCategories()` drives
the filter chips from whichever disciplines are actually represented, so a
chip never appears for a discipline the catalog has nothing to show.

### The page per project

Every project has one, at `/work/<slug>/`, built from `ProjectPage.jsx`.

This section used to say there should not be one — "six illustrative projects
do not justify six more pages of Sample disclaimers" — and ended "add a
dedicated case-study template later, once a project has earned one". The
objection was about what a search engine and a visitor would *find*, not about
the template being wrong, so it is answered rather than overruled: **a project
whose entry still carries `placeholder` gets `noindex, follow` and is left out
of the sitemap.** The template can be seen working now; nothing unearned is ever
filed. Drop `placeholder` and the page becomes indexable in the same commit that
makes it true, because the sitemap generator already skips any route whose head
carries `robots` — one flag, one mechanism, no second step to forget.

The page runs **brief → approach → shipped**, and that order is the argument.
Opening with what was made reads as a portfolio; opening with the problem the
client walked in with reads as a diagnosis, and the deliverables afterwards then
answer something. There is deliberately **no results section**: an outcome
nobody has agreed to be quoted on is a claim, and this site does not make claims
it cannot source.

### Real builds, samples, and telling them apart

The catalog holds two kinds of entry and the difference is the point of the
file.

**The first six are real builds.** Borghar Piyola, Mickey Mobile, North East
Academy, Kirtify, JusticeGuard and Chhimphei Chicken are working codebases with
working codebases, and each card's screenshot is that project's own home page
rendered from its own repository — built, served and captured, not mocked up
and not a stock frame. They are indexed and they appear in the sitemap.

**The rest still carry `placeholder: true`** and exist so the five disciplines
with no published work yet — photography, social, ads, Google Business,
branding — are not blank columns. They are marked "Sample" on the card,
banner-marked at the top of their own page, and `noindex`. Replacing one with
real permissioned work means dropping its flag; the reverse must never happen.

### `stage` and `liveUrl`

Two fields carry the honesty, and each answers a different question.

**`liveUrl` is set on five of the six.** A link is a claim that we built the
thing *and* that it is live, so it goes in only when both are true. Where the
field is null nothing renders — no placeholder URL, no "coming soon", no
disabled button, so there is no broken state to tidy up later. JusticeGuard is
the one without, and will stay that way: its brand is invented, so there is no
site to visit.

**`stage` is what stops silence doing the lying**, and it is not simply the
absence of a link. A card with a real screenshot and no status reads as
"launched", so an entry that is not carries a short one. Two of the five lost
theirs when they went live, because "Built · awaiting launch" was the whole of
what they were saying. The other three keep one because each is saying
something a URL does not answer — a site that is up but still carrying the
client's sample copy, a product deployed while still in development, a build
whose branding is not yet in place. **Drop a `stage` when it stops being true,
not when a link appears beside it.**

It renders as a labelled line on the card and as a banner on the case study, in
the same position the "Sample" banner uses, for the same reason: a status a
reader has to scroll to has already been read as the absence of one.

**There is deliberately no `repoUrl`, and it is not an oversight.** The cards
briefly carried a "View the code" link to each project's public repository, on
the reasoning that until a project is live a repository is the only proof it
exists — and for a studio selling development, better evidence than a
screenshot. That reasoning was about *this studio's* credibility and ignored
whose code it is. A client's build is the client's, a portfolio is a sales
surface rather than a source browser, and the visitor this page is written for
is a local business owner who will not read a repository and may reasonably
wonder why theirs would be published next. So the link came out, and the
external link on a card is the live site or nothing.

Do not reintroduce it. If a project ever wants its source shown, that is a
decision per client and per repository, not a field the catalog fills in by
default.

### Screenshots

`public/work/<slug>.webp`, 1400×1050 — the 4:3 the card and the case-study
plate are both built for, so nothing is cropped or letterboxed. They are
captured by building each project and photographing its own home page, which is
why they are worth having: a mockup proves nothing, and a real frame of a real
build is the only image on this site that is evidence. WebP at quality 0.82 puts
all six at 384 KB together — the same six as PNG were 4.4 MB, which is most of a
page-weight budget spent on a grid nobody has scrolled to yet.

`image` is written root-relative (`/work/x.webp`), which is right for the `<img>`
and **wrong for `og:image`, which cannot resolve a relative path** — a crawler
resolves it against nothing and the share card comes out blank. `seo.js`
absolutises it once, at that boundary; an entry pointing at a CDN already has a
scheme and passes through untouched.

### Filtering

Client-side, no route change — a `useState` and a plain filter.

**This used to be instant, deliberately, and the reasoning was half right.** The
note here said that `whileInView` fires once per element and that refiring it on
every chip click would mean fighting that lifecycle. That part is true, and it
is why the grid is no longer a `Stagger` at all. The conclusion drawn from it —
that the filter should therefore not animate — only followed while the grid
stayed inside a component built to reveal a list once.

The other half of the old note, that it was "an effect nobody would notice
mid-toggle", did not survive being measured. Pressing a chip took the grid from
six cards to one in a single frame with no transition: not an effect nobody
notices, a page that becomes a different page under the reader's hands.

So the grid is now `AnimatePresence` in `popLayout` mode with `layout` on each
card. `popLayout` takes leaving cards out of flow before the survivors move, so
the ones that remain slide to their new grid positions instead of jumping into
the gaps — without it the exits and the reflow fight each other and the result
is worse than no animation at all. Under `prefers-reduced-motion` the cards
leave the layout system entirely and only cross-fade, because a layout animation
is the one kind that cannot be shortened to nothing: a card crossing a column in
1ms is still a card crossing the screen.

Same placeholder discipline as everywhere else on the site: each project
carries its own `placeholder`, the card marks itself "Sample" individually,
and a summary note appears below the grid only while at least one entry still
needs replacing.

## The footer

It is the site map, not a repeat of the nav. The old one carried the seven nav
items and two legal documents, which meant it pointed at **none** of the six
service pages and none of the six industry pages — twelve of the twenty-one
routes, and the twelve that exist to rank. Services, Industries, Company and
Legal are built from `services.js`, `industries.js` and `nav`, so adding a
service or an industry puts it in the footer with no second edit.

**Four groups is also what makes the phone layout work.** They fall into a
two-by-two grid on a narrow screen; the old single column made a visitor scroll
past thirty stacked links to reach the copyright. Each row is a 44px target with
the text as its label, so a fingertip in a two-column list never lands in the gap
between two links.

**The brand block is its own row rather than a fifth column.** Beside the lists
it ran to twice their height, and a grid row is as tall as its tallest cell — so
a quarter of the footer sat empty to the right of Legal.

**It stays on the light ground deliberately.** Every page ends on a
`bg-char-900` block — contact at home, the CTA on every service, industry and
project page — so a dark footer would fuse with the one above it into a single
slab with no findable seam. The coral hairline at the top is the handoff.

The wordmark is an outline rather than a fill: solid, it was a large grey mass,
too faint to read as type and too big to read as anything else. The
`@supports` guard around `-webkit-text-stroke` is not optional — the stroke needs
`color: transparent` to show, and a browser with the second and not the first
would render nothing at all. Container and type are both sized off `vw` at the
same ratio so the same three-quarters of the letterform shows at every width.

## Analytics

Off until configured. Set `provider` and `siteId` in `src/data/analytics.js` and
the site starts counting; leave `provider: null` and nothing is requested from
anyone.

```js
export const analytics = {
  provider: "plausible",        // or "umami", or null
  siteId: "ramdhenu.studio",    // Plausible: the domain. Umami: the website ID.
  src: "",                      // only when self-hosting
};
```

Plausible and Umami are the two offered because both are cookieless: the privacy
policy stays short and there's no consent banner standing between a visitor and
the enquiry form. Google Analytics would change both.

**Both load their `manual` script variant, deliberately.** This is a client-side
router — a visitor who lands on the home page and clicks through three service
pages performs one document load and three route changes. An auto-tracking
script would record one pageview, making the pages built to rank look like they
get no traffic. `<Analytics>` sends a pageview per route change instead.

`legal.js` derives its tracking sentence from the same config, so the privacy
policy can't quietly go out of date when you switch a provider on.

### What's measured

| Event | Fired when | Properties |
|---|---|---|
| `Enquiry sent` | the form completes by any route | `via` (form/whatsapp/email), `service` |
| `Enquiry failed` | the POST rejects | `service` |
| `WhatsApp click` | any WhatsApp button | `from`, `service` / `industry` |
| `Phone click` | click-to-call in the contact panel or footer | `from` |

`track()` is always safe to call — it's a no-op when analytics is off, and calls
made before the script loads are queued and replayed, so the first pageview
isn't the one that gets lost.

### Storing enquiries

`enquiry.endpoint` in `src/data/site.js` is `null`, so the form composes the
message and hands it to WhatsApp — nothing is kept. Anyone who fills it in and
doesn't complete the handoff is a lead you have no record of. Set it to a URL
that accepts a POST and the form posts JSON and reports success inline:

```js
endpoint: "https://formspree.io/f/xxxxxxxx",
```

## Book a call

A Cal.com embed behind the contact panel's second button. **Off until
configured** — with `booking.calLink` empty the button does not render, so
nothing offers a booking that can't be made.

```js
// src/data/booking.js
calLink: "ramdhenu/intro",   // the part of https://cal.com/… after the slash
```

The step people skip is the third one: connect the calendar you actually use,
or Cal will happily offer slots you are busy for.

**It is a facade, like the video.** A scheduling widget is the same trade as a
YouTube iframe — dropped into the page it costs a third-party script and a run
of requests on every visit, paid for by everyone including the majority who
never book. So nothing reaches Cal.com until someone asks:

| | |
|---|---|
| At rest | a button, and no third-party request at all |
| On hover | `preconnect` to Cal's origins, so the handshakes happen during the moment of intent |
| On click | the dialog opens and the embed loads inside it |

It reuses `Dialog.jsx`, so Escape closes, focus is trapped and returns to the
button, and the backdrop dismisses — none of which Cal's own modal would let us
control.

**The fallback is not optional.** An ad blocker, a captive wifi portal or Cal
being down all end with a visitor staring at an empty box. The direct cal.com
link renders *before* the embed is requested and stays visible throughout, so
the booking can always be made. Verified by blocking the script: the dialog
falls back to a plain link and an explanation rather than a dead frame.

`legal.js` adds a "Booking a call" section to the privacy policy when — and
only when — `calLink` is set, the same way the tracking sentence follows the
analytics config. Cal.com is a third party and the policy has to say so once a
visitor's browser can reach it.

Events: `Booking opened` on click, `Call booked` on Cal's `bookingSuccessful`,
`Booking fallback` when someone uses the direct link instead.

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

## The service masthead field

Every `/services/<slug>/` masthead carries a spectrum photograph
(`public/service-hero-spectrum.jpg`). **The home hero deliberately does not** —
it keeps the drawn aurora. The two fields would compete, and the home page's
first screen is the one that must never be busy.

**Why a rainbow does not break a monochrome system.** Industry is steel plus one
accent, so a full-spectrum photograph ought to be foreign to it. It isn't,
because the system already runs `--spectrum` as its signature: the rule under
the header and the 2px edge closing the hero are both that same rainbow. The
photograph is that motif at scale, which is what makes it read as the site's own
rather than as stock.

**The technique is `mix-blend-mode: screen`, and it is doing real work.** The
source is neon on pure black. Screen maps black to transparent and keeps only
the light, so the steel ground survives underneath — no black rectangle dropped
into a steel section, no seam at the edges, and the field still reads as
`--color-accent-900`. Setting the same file as a plain `background-image` would
replace the field instead of lighting it.

### Contrast is the constraint

The masthead reverses a headline and a 16.5px lede out of the field, so the
numbers in `SERVICE MASTHEAD FIELD` (`app.css`) — image opacity, the mask ramp
and the veil stops — are **tested values, not taste**. They were tuned against
measured contrast, sampling the real rendered backdrop behind each run of text
with the glyphs hidden, on all six pages at three widths:

| | 360px | 768px | 1440px |
|---|---|---|---|
| measurements | 30 | 30 | 30 |
| below WCAG AA | 0 | 0 | 0 |

Worst case anywhere is the lede at 5.38:1 against a 4.5 requirement. If you
change any of those values, re-measure rather than eyeballing it — the failure
mode is a 16.5px lede sitting on a bright cyan line, which looks fine on a
designer's monitor and is unreadable on a phone in daylight.

One thing that fix surfaced: breadcrumb links were inheriting the design
system's accent link colour, which is **3.4:1 on the steel field and was failing
before this change**. They now use muted paper. Fixed on the industry mastheads
too, since it is the same markup and the same defect.

## The boot splash

A first-visit intro: `public/loadingVid.mp4` playing **full screen**, over the
steel ground, with a spectrum progress bar. Markup, styles and controller are
all inline in `index.html`.

**Not a React component, deliberately.** A component cannot paint until the
bundle has parsed, so a splash built that way shows the empty page first and
the intro second — backwards, and worse than no splash at all. Inline, it
paints on the first frame, before a byte of JavaScript runs. It costs ~5 KB
inline, and the build copies it into all 15 routes automatically.

### The film plays through

On a first visit the splash holds until the video **ends**, not until the app is
ready. That distinction is the whole feature: the app is typically ready at
~130ms, so anything keyed to readiness tears the splash down before the film
starts.

`object-fit: cover`, not `contain` — this one fills the screen. The site's rule
against cropping is about content photography, where the subject matters; a
full-bleed title card is the opposite case, and letterbox bars around it would
read as a broken embed.

### The film is a three-state lifecycle, not a boolean

This is the bug worth knowing about, because the obvious implementation has it:

```
app ready fires at   ~130ms
video `canplay` at   ~280ms
```

A boolean "is the film playing" is therefore **false at the exact moment the app
reports ready**, so the splash dismissed itself before the film began — every
time, on a fast connection. The state is `pending | playing | unavailable`
instead, and readiness is only *permission* to leave, never the reason:

| state | what app-ready does |
|---|---|
| `pending` | nothing — the film might still be coming |
| `playing` | nothing — we wait for `ended` |
| `unavailable` | dismisses immediately |

**`loop` is deliberately absent.** With it, `ended` never fires and the splash
would hold until the hard ceiling on every visit.

### It still cannot trap anyone

Every path out ends in `finish()`, and a hard ceiling fires regardless. Measured
in a browser, each ending with the page usable and scrolling restored:

| | outcome |
|---|---|
| film plays through | ~6.1s (5s film + fades) |
| video cannot be decoded | 1.5s |
| video 404s | 1.5s |
| video request hangs forever | 4.1s — bounded by the 3s grace window |
| `prefers-reduced-motion` | 1.6s, film never requested |
| Skip pressed | immediate |
| app never loads at all | the 11s ceiling |
| no JavaScript | `<noscript>` hides it — nothing could remove it |
| back/forward cache restore | dismissed on `pageshow` |

A **Skip** control fades in after 1.2s. A held splash with no way past it is
hostile, and it doubles as the manual escape hatch if playback stalls somewhere
untestable. It is why `#boot` is not `aria-hidden` as a whole — the decorative
parts opt out individually so the control stays reachable.

### Tuning

| | |
|---|---|
| `MIN_MS` (550) | below this the splash reads as a flicker |
| `GRACE_MS` (3000) | how long the film has to start before we stop waiting |
| `SKIP_AT` (1200) | when the Skip control appears |
| `HARD_MS` (11000) | absolute ceiling, whatever the network does |

Shows **once per session** (`sessionStorage`) — this is a client-side router,
and replaying it on every navigation would be friction. To remove the feature,
delete the `#boot` block from `index.html`; the `__ramdhenuReady` call in
`main.jsx` is already optional-called and will simply do nothing.

## The video is a bonus, never a dependency

This is the whole design. `loadingVid.mp4` is ~300 KB, which is about **6 seconds
on a slow 3G connection** — longer than the site itself needs to become usable.
A splash that waited for it would make the site slower in order to display a
message saying it is loading.

So nothing waits for it. The steel ground and the bar cost zero bytes and are up
immediately; the film fades in *only if* it decodes in time. Losing that race
costs the visitor nothing. The `<link rel="preload">` carries
`fetchpriority="low"` for the same reason: the film loads alongside the bundle
that actually makes the site work, never ahead of it.

### It can never trap anyone

Every path out ends in `finish()`, and the hard cap fires regardless of what
else happened. Verified in a browser, each case ending with the page usable and
scrolling restored:

| | outcome |
|---|---|
| video cannot be decoded | dismissed at 1.25s |
| video 404s | dismissed at 1.66s |
| video request hangs forever | dismissed at 1.51s |
| `prefers-reduced-motion` | dismissed, film never requested |
| app never loads at all | dismissed at the 6s cap |
| no JavaScript | `<noscript>` hides it — nothing could remove it |
| back/forward cache restore | dismissed on `pageshow` |

### The bar

It is the loading indicator proper. No browser API reports "app readiness", so
it eases toward 90% and **only completes on the real signal** from `main.jsx`
(`window.__ramdhenuReady`, fired after two frames — `render()` only schedules
the work, the second frame is the one the visitor sees). It indicates work
without ever claiming to be finished before it is.

### Tuning

Two constants at the top of the controller:

| | |
|---|---|
| `MIN_MS` (550) | below this the splash reads as a flicker |
| `MAX_MS` (6000) | absolute ceiling, whatever the network does |

It shows **once per session** (`sessionStorage`) — this is a client-side router,
and replaying it on every navigation would be friction. To remove the feature
entirely, delete the `#boot` block from `index.html`; the `__ramdhenuReady` call
in `main.jsx` is already optional-called and will simply do nothing.

**To make it hold for the full film** rather than tracking load, raise `MIN_MS`
to the video's duration. That is a deliberate trade: on a fast connection it
adds real waiting to a page that was ready.

## Motion

Every animation is built from `src/lib/motion.js` — durations, easings, travel
distances and stagger intervals in one file, so nothing anywhere is a magic
number and the whole system can be retimed from one place.

### The brief

Industry is a wireframe. A system that austere has an honest motion vocabulary
and a dishonest one, and picking wrong makes the page read as a template rather
than as a studio's own work.

| Belongs | Does not |
|---|---|
| content arriving on the grid — short travel, ease-out, no overshoot | spring bounce, 3D tilt, rotation, scale-from-0.8 pops |
| hairlines drawing themselves in | letter scrambles, cursor followers, scroll-jacking |
| layered planes at different rates | parallax large enough to notice as an effect |

The second column is not squeamishness. Every item on it draws attention to the
motion instead of to the work, and this site's job is to earn a local business
owner's trust in about eight seconds.

**Distance is the budget.** Nothing travels further than 24px and nothing runs
longer than 0.7s, so no animation can ever be the reason a visitor waits.

### The pieces

| | |
|---|---|
| `Reveal` | one block arriving. `as` sets the element, so wrapping a list row no longer injects a `<div>` that breaks the layout it was meant to animate |
| `Stagger` / `StaggerItem` | a list whose rows arrive in order, at 0.06s intervals |
| `Parallax` | scroll-linked depth, transform only |
| `SectionIndex` | the rule between number and label draws along its own axis |
| `Layout` | `<main>` fades in on route change |

Stagger is applied where sequence carries meaning — the services index, the four
process stages, the industry index — and nowhere else. Staggering every list
makes a page feel slow rather than considered.

### Parallax

The hero is already three stacked layers, so each gets its own rate as the field
scrolls away: the grid lags furthest (it is the sheet), the aurora leads
slightly (it is nearest), and the content lags and dims. Total separation across
a full scroll-out is under 100px — you should register it as depth and never as
movement.

**It does not run under `prefers-reduced-motion`** (scroll-linked movement is
the exact class that triggers vestibular symptoms — off, not reduced), **or
below 768px** (scroll-linked transforms are the first thing to drop frames on a
mid-range Android, and a stuttering hero costs more than depth buys).

### Two traps this codebase already fell into

**Variant transitions swallow `delay`.** A variant written as a plain object
with its own `transition` beats the `transition` prop on the component, so all
33 `<Reveal delay={…}>` call sites would silently animate at once. `up` and
`fade` are variant *functions* taking delay through framer's `custom` prop.

**Reduced motion has to be handled in JS too.** `app.css` flattens CSS
transitions, but framer animations are unaffected by that. Every motion
component checks `useReducedMotion()` and renders a plain element with no
animation at all.

### Measured

60fps through a full-page scroll with parallax running (frame time p50 and p95
both 16.7ms, zero frames over 32ms), CLS 0.0011, and no element left below
opacity 0.9 on any route after animations settle.

## Mobile

Most of this site's audience arrives on a mid-range Android on mobile data, so
the phone layout is the real one. Two things about this codebase make that
easier to get wrong than usual:

**Tailwind's numeric spacing is 0.85× here.** `--spacing: 3.4px` aligns the
scale with Industry's density-adjusted values, which means `h-11` is **37.4px,
not 44**, and `h-10` is 34. A touch minimum written as `min-h-11` silently
lands 15% short — write it as `min-h-[44px]`.

**The design system is sized for a mouse.** `industry.css` ships 36px icon
buttons, 12px field labels and 14px inputs. Those are overridden for phones in
the `MOBILE ERGONOMICS` block in `app.css` rather than by editing the export,
so the system stays droppable-in.

The one non-obvious fix in there: **inputs go to 16px below `md`.** iOS Safari
zooms the whole page when a focused field is under 16px and does not zoom back
out, leaving the visitor panning sideways halfway through the only form on the
site. 16px is a threshold, not a preference.

The hero is `min-h-[100svh]` — small-viewport height, so the primary CTA clears
the fold with the URL bar showing rather than hiding behind it. Verified on
360×640, 375×667, 360×800 and 390×844.

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
- **Touch targets** — buttons and icon buttons reach 44px below `md`; the
  remaining sub-40px targets are inline text links (breadcrumbs, an email
  address in a labelled row), all above the WCAG 2.2 AA 24×24 minimum.
