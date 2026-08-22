import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";

import Icon from "./Icon";
import KineticHeadline from "./KineticHeadline";
import Parallax from "./Parallax";
import PrismField from "./PrismField";
import { duration, ease } from "../lib/motion";
import { brand, disciplines } from "../data/site";

/**
 * HERO — the tagline over the living prism field.
 *
 * THE COMPOSITION, back to front:
 *   prism field    five drifting bodies of colour, grain, scrim  (prism.css)
 *   grid           the blueprint sheet, barely there             (app.css)
 *   content        eyebrow · headline · lede · actions
 *
 * The field and the grid move at different rates on scroll, so the hero has
 * depth as it leaves rather than sliding out as one flat plate. Total
 * separation across a full scroll-out is under 100px — enough to feel, not
 * enough to notice.
 *
 * THE ENTRANCE RUNS ON A CLOCK, NOT ON SCROLL. Everything above the fold
 * animates on mount with hand-set delays: the eyebrow at 0.15s, the headline
 * from 0.3s, the lede and actions behind it. `whileInView` would be wrong here
 * — the hero is already in view on load, so it would fire everything at once.
 */

/* One shared entrance for the pieces around the headline. Written once so the
   eyebrow, lede and actions cannot drift apart. */
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: (at = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: duration.long, ease: ease.out, delay: at },
  }),
};

export default function Hero({ showAvailability = true }) {
  const field = useRef(null);
  const reduced = useReducedMotion();

  /* Under reduced motion every delay collapses to zero and framer renders the
     `show` state immediately — no staggered reveal, but also no flash of
     invisible content, which is what `initial={false}` alone would give. */
  const at = (seconds) => (reduced ? 0 : seconds);

  return (
    <section
      ref={field}
      id="/"
      className="hero relative box-border flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink-950 pt-[clamp(48px,14vh,150px)] pb-[clamp(36px,7vh,72px)]"
    >
      {/* The field leads slightly and the grid lags, so the two planes separate
          as the hero scrolls away. */}
      <Parallax target={field} distance={-30} className="absolute inset-0 z-0" aria-hidden="true">
        <PrismField />
      </Parallax>
      <Parallax target={field} distance={76} className="hero__grid" aria-hidden="true" />

      <Parallax
        target={field}
        distance={44}
        fadeTo={0.4}
        className="shell relative z-[2] flex flex-col gap-[clamp(22px,4.4vw,54px)]"
      >
        {/* ── Eyebrow row: availability left, disciplines right ── */}
        <motion.div
          className="flex flex-wrap items-start justify-between gap-6"
          variants={rise}
          custom={at(0.15)}
          initial="hidden"
          animate="show"
        >
          {showAvailability && (
            <span className="glass inline-flex items-center gap-[9px] rounded-full px-[15px] py-[7px] text-[11px] tracking-[0.13em] text-paper/85 uppercase">
              <span className="hero__pulse" aria-hidden="true" />
              Digital agency — based in India
            </span>
          )}

          <ol className="flex list-none flex-col items-start gap-[10px] p-0 sm:items-end">
            {disciplines.map((item, i) => (
              <motion.li
                key={item}
                className="flex items-center gap-[11px] font-display text-[12.5px] tracking-[0.07em] text-paper/85 uppercase"
                variants={rise}
                custom={at(0.3 + i * 0.08)}
                initial="hidden"
                animate="show"
              >
                <span className="text-[10px] tracking-[0.1em] text-prism-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="h-px w-[26px] flex-none bg-paper/25" />
                {item}
              </motion.li>
            ))}
          </ol>
        </motion.div>

        {/* ── The headline. "Presence" is the word the spectrum picks out — it
              is the promise the whole page is selling. ── */}
        <KineticHeadline
          lines={["A Step Towards", "Digital {Presence}"]}
          delay={at(0.3)}
          className="display m-0 on-steel text-[clamp(46px,10.2vw,164px)] leading-[0.92] tracking-[-0.024em]"
        />

        {/* ── Lede + actions ── */}
        <motion.div
          className="flex flex-wrap items-end justify-between gap-7 border-t border-paper/15 pt-[clamp(22px,2.6vw,32px)]"
          variants={rise}
          custom={at(0.95)}
          initial="hidden"
          animate="show"
        >
          <p className="m-0 max-w-[440px] text-[15.5px] leading-[1.65] text-paper/75">
            Ramdhenu is a digital agency for local businesses that want more than a website —
            strategy, visuals and campaigns, working as one.
          </p>

          <div className="flex flex-none flex-wrap items-center gap-3 max-[400px]:w-full max-[400px]:*:flex-1 max-[400px]:*:justify-center">
            <Link
              to="/#contact"
              className="btn-prism inline-flex items-center gap-[9px] rounded-full px-[28px] py-[16px] font-display text-[15px] tracking-[0.01em] no-underline"
            >
              <Icon name="plus" size={15} strokeWidth={2} />
              Start a Project
            </Link>
            <Link
              to="/work/"
              className="inline-flex items-center gap-[9px] rounded-full border border-paper/20 px-[28px] py-[16px] font-display text-[15px] tracking-[0.01em] text-paper/85 no-underline transition duration-200 hover:border-paper/40 hover:bg-paper/8 hover:text-paper"
            >
              See our work
            </Link>
          </div>
        </motion.div>
      </Parallax>

      <span className="sr-only" hidden>
        {brand.tagline}
      </span>
    </section>
  );
}
