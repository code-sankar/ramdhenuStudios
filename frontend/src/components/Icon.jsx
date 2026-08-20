/**
 * ICONS — Lucide geometry at stroke-width 1.5, drawn inline.
 * The design system specifies Lucide at 1.5 throughout; these are the handful
 * of glyphs the page actually uses, so there's no icon dependency to ship.
 */

const paths = {
  plus: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
  arrowRight: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  calendar: (
    <>
      <rect width="18" height="18" x="3" y="4" rx="1" />
      <path d="M3 10h18M8 2v4M16 2v4" />
    </>
  ),
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronLeft: <path d="m15 18-6-6 6-6" />,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  menu: <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>,
  close: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
  whatsapp: (
    <>
      <path d="M3 21l1.65-4.8a9 9 0 1 1 3.4 3.3L3 21Z" />
      <path d="M9.2 9.1c-.35 1.7 2.9 5.2 4.9 5.4.7.07 1.35-.65 1.6-1.35l-1.9-1-.85.85c-.9-.4-1.85-1.35-2.2-2.3l.85-.8-.95-1.85c-.7.2-1.35.6-1.45 1.05Z" />
    </>
  ),
  instagram: (
    <>
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
};

export default function Icon({ name, size = 16, strokeWidth = 1.5, ...rest }) {
  const shape = paths[name];
  if (!shape) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {shape}
    </svg>
  );
}
