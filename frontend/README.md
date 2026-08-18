# Ramdhenu Studios — Website

> **A step towards digital presence**
> Digital Growth Partner for Local Businesses

A production-ready marketing site built with **React 19 + Vite + Tailwind CSS v4 + Motion (Framer Motion)**.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build
npm run lint
```

---

## 1. Positioning

The site is not structured as a "web design company" brochure. Every section answers one
question in a buying journey, in order:

| Section | Question it answers |
| --- | --- |
| Hero | Who are they, and what do I get? |
| Trust strip | Why should I keep reading? |
| About | Who are they really — and why one team instead of five? |
| Services | What exactly do they do? |
| Our Work | Have they done good work? |
| Results | Does any of it move the business? |
| Process | How would this actually run? |
| Pricing | What does it cost? |
| Testimonials | Does anyone vouch for them? |
| Contact | How do I start? |

The underlying story is **Discovery → Trust → Enquiry → Customer → Growth**. It appears
literally three times: as the journey chips in About, as the convergence diagram
(five specialists → one growth outcome), and as the "Covers" meter on each pricing card.

> **Note on section order:** the brief listed *Why Ramdhenu* after *Services*. It runs
> before Services here so the header's `Home → About → Services` order never makes a nav
> link jump backwards, and so the "one team" argument primes the service list rather than
> explaining it after the fact. Swapping them back is a one-line change in `src/App.jsx`.

---

## 2. Design system

Everything below lives in **`src/index.css`** under `@theme`. Re-skinning the site is a
single-file job — no component hardcodes a colour, font or radius.

### Colour

A deliberately narrow palette: one navy ramp, one blue ramp, one cyan highlight, four text
steps. Nothing else.

| Token | Value | Used for |
| --- | --- | --- |
| `ink-950` | `#04060d` | Page ground |
| `ink-900` | `#070b16` | Recessed sections |
| `ink-850` / `ink-800` | `#0a101f` / `#0e1626` | Card surfaces |
| `volt-500` | `#1e7bff` | Primary action, active state |
| `volt-400` / `volt-300` | `#4da3ff` / `#8cc6ff` | Hover, icons, accents |
| `spark` | `#5ae4ff` | Gradient tips and glows **only** — never text |
| `mist-50` | `#f2f6ff` | Headings |
| `mist-200` | `#c2cee5` | Body |
| `mist-400` / `mist-500` / `mist-600` | | Muted → faint |
| `line` / `line-strong` / `line-volt` | white 7% / 14% / volt 35% | Hairlines |

Section rhythm comes from **value**, not hue: `ink-950` and `ink-900/40` alternate down the
page, separated by 1px hairlines.

### Typography

| Role | Family | Notes |
| --- | --- | --- |
| Display + UI | **Archivo** (variable 400–800) | Tight tracking, editorial at large sizes |
| Editorial accent | **Instrument Serif Italic** | Exactly one word per heading — never more |
| Labels, figures, eyebrows | **JetBrains Mono** | Uppercase, `0.16–0.22em` tracking |

Fluid display scale, clamped so it never overruns its column:

```
display-xl  clamp(2.6rem, 6.6vw, 5.75rem)   lh 0.94   ls -0.035em   — hero, final CTA
display-lg  clamp(2.25rem, 5.2vw, 4.25rem)  lh 0.98   ls -0.032em   — section headings
display-md  clamp(1.75rem, 3.4vw, 2.75rem)  lh 1.06   ls -0.028em
display-sm  clamp(1.375rem, 2.2vw, 1.75rem) lh 1.16   ls -0.022em
```

Fonts are **self-hosted** in `public/fonts` (Latin + Latin-Ext subsets, ~168 KB total). No
third-party font request, one less handshake before first paint. `src/fonts.css` holds the
`@font-face` rules; the two above-the-fold faces are preloaded in `index.html`.

### Spacing, grid, radius

- 4px base scale; section rhythm `py-20 lg:py-28`.
- `shell` utility = `max-width: 80rem` + `1.25 / 2 / 2.5rem` gutters. Every section body uses it.
- 12-column grid at `lg`, collapsing to 2-up and then 1-up.
- Radius is restrained on purpose: **buttons 6px, cards 10px, media/panels 14px, hero slab 20px.**
  Full rounding is reserved for pills, avatars and the growth hub.

### Elevation

Depth is a hairline plus a soft shadow — never a heavy frosted panel. Glassmorphism is used
in exactly three places: the scrolled header, the hero capability cards, and the enquiry form.

### Buttons

Three variants, so hierarchy is never ambiguous — `primary` (one per screen region, solid
volt + glow + magnetic pull), `secondary` (hairline ghost), `quiet` (text + arrow).

### Icons

One inline set in `src/components/ui/Icon.jsx`: 24×24 grid, 1.5 stroke, round caps, no
fills, no icon library dependency.

### Motion language

Defined once in `src/lib/motion.js`:

- **Entrances** travel 16–28px over 600–800ms on expo-out `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Micro-interactions** are 180–260ms on a smooth curve.
- **Staggers** are 60–90ms. Nothing waits longer than ~400ms to begin.
- Nothing bounces, spins, or slides in from off-screen.
- Scroll reveals fire **once** — content never re-animates on the way back up.

Motion that carries meaning rather than decoration:

- The **process rail** fills with scroll progress — it is literally the progress of an engagement.
- The **convergence threads** draw from five specialists into one growth hub.
- The **counters** count only when their tile is first seen.

`prefers-reduced-motion` is honoured globally in CSS *and* per-component in JS: parallax,
magnetic hover and counters resolve to their final state instead of animating. Hero parallax
is additionally gated to `min-width: 1024px`.

---

## 3. Project structure

```
src/
├── App.jsx                  section order + page-load fade
├── index.css                ← design system (@theme, base, utilities)
├── fonts.css                self-hosted @font-face rules
├── data/                    ← all copy lives here, not in components
│   ├── site.js              brand, nav, contact, socials  ⚠️ placeholders
│   ├── services.js          6 services, 5 value props, industries
│   ├── projects.js          portfolio + filters           ⚠️ placeholders
│   ├── results.js           metrics                       ⚠️ illustrative
│   ├── process.js           6 steps + growth journey
│   ├── pricing.js           3 packages + journey coverage
│   └── testimonials.js      quotes                        ⚠️ placeholders
├── lib/
│   ├── motion.js            shared variants, easings, viewport config
│   ├── hooks.js             useScrolled, useActiveSection, useMediaQuery, …
│   └── utils.js             cn()
└── components/
    ├── brand/Logo.jsx       R/D monogram + wordmark
    ├── ui/                  Button, Icon, Reveal, Counter, SectionHeading,
    │                        ProjectCover, Atmosphere
    ├── layout/              Header, Footer
    └── sections/            Hero, TrustStrip, About, Services, Work,
                             Results, Process, Pricing, Testimonials, Contact
```

---

## 4. Before you go live

Four things are stand-ins. Each is flagged in code so nothing ships pretending to be real.

### 4.1 The logo

`src/components/brand/Logo.jsx` contains a faithful stand-in built to the brief: an R/D
monogram where a single shared stem carries a solid white R nested inside a gradient D bowl
(a quiet nod to *ramdhenu* — rainbow — kept inside the brand's blue ramp).

To use the official artwork, drop it at `src/assets/logo.svg` and swap the `<svg>` inside
`<Monogram />` for an `<img>`. Every surface renders `<Logo />`, so nothing else changes.
Also regenerate `public/favicon.svg` and `public/og-image.png` to match.

### 4.2 Contact details — `src/data/site.js`

Phone, WhatsApp number, email, address and social URLs are placeholders. The location
(Dibrugarh, Assam) was inferred from the example client list — **please confirm it.**

### 4.3 Portfolio imagery — `src/data/projects.js`

`image: null` on every project. Rather than fill a case-study grid with stock photos, each
card renders a designed brand cover with a category-specific motif (aperture, wireframe,
monogram plate, content feed, performance curve). To publish a real project:

```js
image: new URL("../assets/work/bamboo-kitchen.jpg", import.meta.url).href
```

The cover component steps aside automatically. Set `PROJECTS_ARE_PLACEHOLDER = false` to
remove the "Sample" note once the grid holds real, permissioned client work.

### 4.4 Results and testimonials

`RESULTS_ARE_ILLUSTRATIVE` and `TESTIMONIALS_ARE_PLACEHOLDER` both default to `true`, which
renders a visible note in each section. This is deliberate: unverified numbers and invented
quotes must not read as proven claims.

The results section is built so verified and illustrative figures can coexist — add
`verified: true` and a `source` string to a metric and that tile promotes itself to a
confirmed result. Flip each flag to `false` once every entry in the file is real.

### 4.5 The enquiry form

`src/components/sections/Contact.jsx` has **no backend**. It composes the enquiry and hands
it to WhatsApp, with a "email it instead" fallback — so it works from day one with no
server, and enquiries land somewhere the team already reads.

To store submissions instead, replace `handleSubmit` with a POST to your endpoint
(Formspree, a serverless function, a CRM webhook). Nothing else in the component changes.

---

## 5. Accessibility & performance notes

- Semantic landmarks throughout; a skip link; every icon `aria-hidden` with text alternatives.
- Visible `:focus-visible` ring in brand blue on every interactive element.
- Portfolio filters are a real `tablist`; the pricing journey meter carries an `aria-label`.
- Body text sits at `mist-200` on `ink-950` (≈13:1). De-emphasised heading halves use
  `mist-400` (≈6:1) rather than the faintest step.
- No layout-shifting webfont swap: `font-display: swap` with preloaded above-the-fold faces.
- One shared fixed background layer (`Atmosphere`) instead of per-section gradients.
- Scroll listeners are passive and rAF-throttled; section tracking uses `IntersectionObserver`.
