import { brand } from "../data/site";

/**
 * LOGO
 * ===========================================================================
 * Today this renders the wordmark as live text — set in the system's heading
 * face, so it scales, stays crisp at any size, is selectable and readable to
 * screen readers, and costs no extra request.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  DROPPING IN THE OFFICIAL LOGO                                          │
 * │  1. Put the file at src/assets/logo.svg (SVG preferred — it stays sharp │
 * │     on any screen; a 2x PNG with transparency also works).              │
 * │  2. Uncomment the import and the <img> branch below.                    │
 * │  That is the only change needed. Every surface renders <Logo />, so the │
 * │  header, footer and any future page pick it up at once.                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * If the logo has a light and a dark variant, add `logoLight` alongside it and
 * switch on the `onDark` prop — the header sits on paper, the footer on paper,
 * and the hero field is steel.
 */

// import logo from "../assets/logo.svg";

export default function Logo({ className = "", onDark = false }) {
  // return (
  //   <img
  //     src={logo}
  //     alt={brand.name}
  //     className={`logo ${className}`.trim()}
  //     width={160}
  //     height={32}
  //   />
  // );

  return (
    <span className={`logo logo--text ${className}`.trim()} data-on-dark={onDark || undefined}>
      {brand.wordmark}
    </span>
  );
}
