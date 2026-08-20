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
  data/            all copy — site.js, services.js, industries.js,
                   testimonials.js, legal.js, plus seo.js (the head every
                   route carries), analytics.js and booking.js (both off
                   until configured)
  lib/
    track.js         send an event, safely, whether or not analytics is on
  pages/
    HomePage.jsx     hero → about → services → testimonials → faq → contact
    ServicePage.jsx  the template behind every /services/<slug>/
    IndustryPage.jsx the template behind every /industries/<slug>/
    NotFoundPage.jsx unknown paths, and unknown slugs
  components/
    Layout.jsx       skip link · header · <main> · footer, worn by every page
    Seo.jsx          writes the route's head — title, canonical, JSON-LD
    Analytics.jsx    loads the provider, counts a pageview per route
    BookCall.jsx     the Cal.com embed, loaded on intent like the video
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
`/industries/:slug` → `IndustryPage`, anything else → `NotFoundPage`. Sections
follow the artboard: **Hero → About → Services → Testimonials → Contact.**

## Before this goes live

Nothing on this site fakes what the agency hasn't earned yet. Everything unproven
is flagged in place, and each flag is a one-line change in `src/data/`. The full
checklist lives at the top of `src/data/site.js`.

| What | Where | To publish |
|---|---|---|
| Contact details | `site.js` → `contact` | Real phone, WhatsApp number, email, studio address |
| Social profiles | `site.js` → `socials` | Replace the `#` hrefs |
| Live domain | `site.js` → `siteUrl` | Canonical URLs, OG tags, structured data and the sitemap all derive from it; `robots.txt` names it too |
| Example projects | `services.js` → each project's `placeholder` | Real permissioned work, then drop that project's flag — one at a time |
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
