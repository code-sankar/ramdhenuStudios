import markSrc from "../assets/logo-mark.png";
import lockupSrc from "../assets/logo-lockup.png";
import { brand } from "../data/site";

/**
 * LOGO
 * ===========================================================================
 * The official artwork ships as white-on-transparent, which is right for the
 * steel field but would disappear on the paper ground the header and footer
 * sit on. So the PNG is used as a CSS mask and filled with `currentColor`
 * instead of being placed as an <img>: one asset serves every ground, in the
 * exact token colour of wherever it lands, and it follows the palette if the
 * system is ever retuned.
 *
 * Two variants, because the lockup does not survive being shrunk:
 *
 *   mark    the monogram alone. Legible down to ~24px, so it carries the
 *           header, paired with the name set in the system's heading face —
 *           the same condensed grotesque the artwork's own wordmark uses.
 *   lockup  the full artwork: mark, wordmark and tagline. Needs ~56px of
 *           height before the tagline resolves, so it is used in the footer
 *           where there is room for it to be read.
 *
 * Sources live in src/assets/brand/ at full resolution; the files imported
 * here are the optimised derivatives (1.6 MB → 10 KB, 555 KB → 47 KB).
 * Regenerate them with `node scripts/generate-brand-assets.mjs`.
 */
export default function Logo({ variant = "mark", className = "", withName = false }) {
  if (variant === "lockup") {
    return (
      <span
        role="img"
        aria-label={`${brand.name} Studios — ${brand.tagline}`}
        className={`logo h-[84px] w-[210px] [mask-position:left_center] [-webkit-mask-position:left_center] ${className}`.trim()}
        style={{ WebkitMaskImage: `url(${lockupSrc})`, maskImage: `url(${lockupSrc})` }}
      />
    );
  }

  /* When the name sits alongside it the mark is decorative, so it drops out
     of the accessibility tree and the name carries the label. */
  const mark = (
    <span
      aria-hidden={withName || undefined}
      role={withName ? undefined : "img"}
      aria-label={withName ? undefined : brand.name}
      className={`logo h-8 w-8 ${withName ? "" : className}`.trim()}
      style={{ WebkitMaskImage: `url(${markSrc})`, maskImage: `url(${markSrc})` }}
    />
  );

  if (!withName) return mark;

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      {mark}
      <span className="font-display text-[19px] leading-none tracking-[0.015em]">
        {brand.wordmark}
      </span>
    </span>
  );
}
