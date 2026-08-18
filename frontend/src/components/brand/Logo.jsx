import { cn } from "../../lib/utils";

/**
 * RAMDHENU STUDIOS — brand lockup
 * ---------------------------------------------------------------------------
 * The mark is an R/D monogram: a single shared stem carries the R (solid,
 * white) nested inside the D (gradient bowl). The gradient sweep is a quiet
 * nod to "Ramdhenu" — rainbow — expressed inside the brand's blue ramp rather
 * than as literal spectrum colour.
 *
 * ⚠️  SWAPPING IN THE OFFICIAL LOGO
 * This is a faithful stand-in built to the brief's description. To use the
 * real artwork, drop it at /src/assets/logo.svg and replace the <svg> in
 * <Monogram /> with:  <img src={logo} alt="" className={...} />
 * Nothing else in the app needs to change — every surface renders <Logo />.
 */

export function Monogram({ className, id = "brand" }) {
  return (
    <svg
      viewBox="0 0 46 48"
      fill="none"
      aria-hidden="true"
      className={cn("h-9 w-auto", className)}
    >
      <defs>
        <linearGradient id={`${id}-arc`} x1="10" y1="44" x2="42" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0a5bd6" />
          <stop offset="50%" stopColor="#1e7bff" />
          <stop offset="100%" stopColor="#5ae4ff" />
        </linearGradient>
      </defs>

      {/* D — the outer bowl, sharing the R's stem. Thinner weight so it reads
          as the frame rather than competing with the R. */}
      <path
        d="M8 5H20A19 19 0 0 1 20 43H8"
        stroke={`url(#${id}-arc)`}
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* R — stem, bowl and leg, nested inside the D */}
      <g stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-mist-50">
        <path d="M8 5V43" />
        <path d="M8 5H15A8.5 8.5 0 0 1 15 22H8" />
        <path d="M14.5 22L22 38" />
      </g>
    </svg>
  );
}

/**
 * Full lockup. `compact` drops the wordmark to the monogram alone (used by the
 * mobile header); `size` scales the whole lockup as one unit.
 */
export default function Logo({ compact = false, size = "md", className }) {
  const scale = {
    sm: { mark: "h-7", name: "text-[0.9rem]", sub: "text-[0.5rem]" },
    md: { mark: "h-9", name: "text-[1.075rem]", sub: "text-[0.5625rem]" },
    lg: { mark: "h-12", name: "text-[1.4rem]", sub: "text-[0.6875rem]" },
  }[size];

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Monogram className={scale.mark} />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display font-extrabold uppercase tracking-[-0.02em] text-mist-50",
              scale.name,
            )}
          >
            Ramdhenu
          </span>
          <span
            className={cn(
              "mt-1 font-mono font-medium uppercase tracking-[0.42em] text-mist-500",
              scale.sub,
            )}
          >
            Studios
          </span>
        </span>
      )}
    </span>
  );
}
