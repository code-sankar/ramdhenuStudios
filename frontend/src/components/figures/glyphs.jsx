/**
 * The figure glyphs, kept out of Icon.jsx on purpose. That file documents itself
 * as the Lucide set the site actually uses in its interface; these are drawing,
 * used in one place each, and folding twenty-odd of them in would turn a short
 * honest list into a sprite sheet nobody reads.
 *
 * They still obey the design system's icon rule, because they sit beside real
 * Lucide icons on the same pages: 24px box, 1.5 stroke, round caps and joins,
 * no fills. A glyph drawn to a different weight reads as a different family
 * even when nobody can say why.
 */
export const GLYPHS = {
  /* ── the build ── */
  design: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="15" width="6" height="6" rx="1.5" />
      <rect x="15" y="3" width="6" height="6" rx="1.5" />
      <path d="M13 13l8 3.2-3.4 1.3L16.3 21z" />
    </>
  ),
  frontend: (
    <>
      <path d="M8.5 8.5L5 12l3.5 3.5" />
      <path d="M15.5 8.5L19 12l-3.5 3.5" />
      <path d="M13.4 5.5l-2.8 13" />
    </>
  ),
  backend: (
    <>
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M7 7h.01M7 17h.01" />
    </>
  ),
  seo: (
    <>
      <path d="M12 3l7 3v5.5c0 4.2-2.9 7.6-7 8.5-4.1-.9-7-4.3-7-8.5V6z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  performance: (
    <>
      <path d="M4.2 17a9 9 0 1115.6 0" />
      <path d="M12 13.5l4-4" />
      <circle cx="12" cy="14.4" r="1.4" />
    </>
  ),
  data: (
    <>
      <ellipse cx="8.5" cy="5.4" rx="5" ry="2.4" />
      <path d="M3.5 5.4v7c0 1.33 2.24 2.4 5 2.4s5-1.07 5-2.4v-7" />
      <path d="M13.5 8.6h2.6a1.8 1.8 0 001.8-1.8V6.2" />
      <path d="M13.5 12.4h2.6a1.8 1.8 0 011.8 1.8v.6" />
      <circle cx="17.9" cy="4.6" r="1.6" />
      <circle cx="17.9" cy="16.4" r="1.6" />
    </>
  ),

  /* ── the shoot ── */
  brief: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 3.5h8v3H8z" />
      <path d="M8 11h8M8 15h5" />
    </>
  ),
  camera: (
    <>
      <path d="M3 8.5A2 2 0 015 6.5h2.2l1.4-2h6.8l1.4 2H19a2 2 0 012 2V18a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <circle cx="12" cy="13" r="3.6" />
    </>
  ),
  edit: (
    <>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2.2" />
      <circle cx="9" cy="17" r="2.2" />
    </>
  ),
  deliver: (
    <>
      <path d="M3.5 7.6L12 3.5l8.5 4.1v8.8L12 20.5l-8.5-4.1z" />
      <path d="M3.5 7.6L12 11.7l8.5-4.1M12 11.7v8.8" />
    </>
  ),

  /* ── the cycle ── */
  plan: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
      <path d="M8 14h3" />
    </>
  ),
  create: (
    <>
      <path d="M4 20l1-4.2 10-10a2.1 2.1 0 013 3l-10 10z" />
      <path d="M13.5 6.5l3 3" />
    </>
  ),
  publish: (
    <>
      <path d="M20.5 3.5L10.5 13.5" />
      <path d="M20.5 3.5l-6.4 17-3.6-7-7-3.6z" />
    </>
  ),
  listen: (
    <>
      <path d="M20.5 15.5a2 2 0 01-2 2h-11L3.5 21.5v-15a2 2 0 012-2h13a2 2 0 012 2z" />
      <path d="M8 9h8M8 13h5" />
    </>
  ),
  learn: (
    <>
      <path d="M3.5 20.5h17" />
      <path d="M6.5 17V11M11 17V6.5M15.5 17v-4M20 17V9" />
    </>
  ),

  /* ── the funnel ── */
  reach: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3.2" />
    </>
  ),
  click: (
    <>
      <path d="M5.5 4.5l4.6 15 2.4-6.1 6.1-2.4z" />
      <path d="M13.6 13.6L19 19" />
    </>
  ),
  enquiry: (
    <>
      <path d="M20.5 14a2 2 0 01-2 2h-9L5 19.5V6a2 2 0 012-2h11.5a2 2 0 012 2z" />
      <path d="M9 10h7" />
    </>
  ),
  customer: (
    <>
      <circle cx="10" cy="8" r="3.6" />
      <path d="M3.5 20a6.5 6.5 0 0113 0" />
      <path d="M16.5 12.5l2 2 3.5-3.6" />
    </>
  ),

  /* ── the catchment ── */
  profile: (
    <>
      <path d="M4 9.5V19a1.5 1.5 0 001.5 1.5h13A1.5 1.5 0 0020 19V9.5" />
      <path d="M3 9.5l1.6-5A1.5 1.5 0 016 3.5h12a1.5 1.5 0 011.4 1l1.6 5a2.6 2.6 0 01-4.5 1.8 2.6 2.6 0 01-4.5 0 2.6 2.6 0 01-4.5 0A2.6 2.6 0 013 9.5z" />
    </>
  ),
  photos: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="9" cy="10" r="1.8" />
      <path d="M4 17l5-4.5 4 3.5 3-2.5 4 3.5" />
    </>
  ),
  reviews: (
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9-5.3-2.9-5.3 2.9 1.1-5.9L3.5 9.7l5.9-.8z" />
  ),
  posts: (
    <>
      <path d="M4 9.5h3l7-4v13l-7-4H4a1.5 1.5 0 01-1.5-1.5v-2A1.5 1.5 0 014 9.5z" />
      <path d="M17.5 8.5a5 5 0 010 7" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s7-6.2 7-11.2a7 7 0 10-14 0c0 5 7 11.2 7 11.2z" />
      <circle cx="12" cy="10" r="2.8" />
    </>
  ),

  /* ── the identity ── */
  logo: (
    <>
      <path d="M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3.5a8.5 8.5 0 000 17c1.2 0 1.9-.8 1.9-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.1 0-1 .8-1.8 1.8-1.8h1.4a4.4 4.4 0 004.4-4.4c0-3.7-3.8-6.7-8.5-6.7z" />
      <circle cx="8" cy="10" r="1.1" />
      <circle cx="12" cy="7.5" r="1.1" />
      <circle cx="16" cy="10" r="1.1" />
    </>
  ),
  type: (
    <>
      <path d="M3.5 18l5-12 5 12M5.4 14h6.2" />
      <path d="M20.5 18v-5.6a2.6 2.6 0 00-5.2 0" />
      <path d="M20.5 15.6h-2.8a2 2 0 100 4c1.6 0 2.8-1.1 2.8-2.6" />
    </>
  ),
  signage: (
    <>
      <rect x="3" y="4" width="18" height="9" rx="1.8" />
      <path d="M12 13v7.5M8.5 20.5h7" />
      <path d="M7.5 8h9" />
    </>
  ),
  print: (
    <>
      <rect x="2.5" y="6" width="19" height="8" rx="1.8" />
      <path d="M6.5 6V3.5h11V6" />
      <rect x="6.5" y="14" width="11" height="6.5" rx="1.2" />
    </>
  ),
  social: (
    <>
      <circle cx="18" cy="5.5" r="2.6" />
      <circle cx="6" cy="12" r="2.6" />
      <circle cx="18" cy="18.5" r="2.6" />
      <path d="M8.4 10.7l7.2-3.9M8.4 13.3l7.2 3.9" />
    </>
  ),
};
