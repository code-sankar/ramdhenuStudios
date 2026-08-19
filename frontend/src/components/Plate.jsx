/**
 * PLATE — what fills a figure until a real photograph exists.
 * ---------------------------------------------------------------------------
 * The Industry system runs every content photograph through `.duotone`, which
 * washes it into the steel accent. Where there is no photograph yet, dropping
 * in stock imagery would misrepresent the work — so the figure renders a drawn
 * spec-sheet plate instead: a square, hairline-framed object on the modular
 * grid, with a motif naming the discipline.
 *
 * A plate is a drawing, not a photograph, so it is never wrapped in `.duotone`
 * — that filter is for images with real tonal range, and flattens a line
 * drawing into a solid field.
 *
 * `tone="steel"` inverts it for use on the dark hero field.
 * Pass `image` on a project in /src/data/services.js and this steps aside.
 */

const motifs = {
  web: (
    <>
      <rect x="38" y="24" width="124" height="92" rx="2" />
      <path d="M38 40h124" />
      <circle cx="49" cy="32" r="2.4" />
      <circle cx="58" cy="32" r="2.4" />
      <path d="M52 54h44M52 66h64M52 78h34" />
      <rect x="52" y="90" width="30" height="12" rx="1" />
      <rect x="122" y="54" width="30" height="48" rx="1" />
    </>
  ),
  photography: (
    <>
      <circle cx="100" cy="70" r="34" />
      <circle cx="100" cy="70" r="21" />
      <path d="M100 36v20M134 70h-20M100 104V84M66 70h20" />
      <path d="M46 26h22M46 26v18M154 26h-22M154 26v18M46 114h22M46 114V96M154 114h-22M154 114V96" />
    </>
  ),
  social: (
    <>
      <rect x="34" y="30" width="60" height="80" rx="2" />
      <rect x="106" y="18" width="60" height="80" rx="2" />
      <path d="M34 58h60M106 46h60" />
      <circle cx="49" cy="44" r="5" />
      <circle cx="121" cy="32" r="5" />
      <path d="M46 72h36M46 84h24M118 60h36M118 72h24" />
    </>
  ),
  marketing: (
    <>
      <path d="M34 110h132" />
      <path d="M40 96l28-20 26 14 30-38 34-22" />
      <path d="M132 30h26v26" />
      <circle cx="68" cy="76" r="4" />
      <circle cx="94" cy="90" r="4" />
      <circle cx="124" cy="52" r="4" />
    </>
  ),
  local: (
    <>
      <path d="M100 118s-38-32-38-58a38 38 0 1 1 76 0c0 26-38 58-38 58Z" />
      <circle cx="100" cy="58" r="15" />
      <path d="M34 100h30M136 100h30" />
    </>
  ),
  branding: (
    <>
      <rect x="60" y="20" width="80" height="100" rx="2" />
      <path d="M78 96V44h20a13 13 0 0 1 0 26H78M96 70l18 26" />
      <path d="M46 44h-14M46 70h-14M46 96h-14M168 44h-14M168 70h-14M168 96h-14" />
    </>
  ),
};

const tones = {
  paper: {
    ground: "var(--color-surface)",
    rule: "var(--color-divider)",
    ink: "var(--color-accent-600)",
  },
  steel: {
    ground: "var(--color-accent-800)",
    rule: "color-mix(in srgb, var(--color-bg) 14%, transparent)",
    ink: "var(--color-accent-300)",
  },
};

export default function Plate({ motif, label, tone = "paper" }) {
  const scheme = tones[tone] ?? tones.paper;

  return (
    <div
      role="img"
      aria-label={label}
      style={{
        position: "absolute",
        inset: 0,
        background: scheme.ground,
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
      }}
    >
      {/* The modular grid, drawn faintly — the ground a spec sheet sits on. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(to right, ${scheme.rule} 1px, transparent 1px), linear-gradient(to bottom, ${scheme.rule} 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      />
      <svg
        viewBox="0 0 200 140"
        fill="none"
        aria-hidden="true"
        stroke={scheme.ink}
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ position: "relative", width: "84%", height: "auto" }}
      >
        {motifs[motif] ?? motifs.web}
      </svg>
    </div>
  );
}
