import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";

import Icon from "./Icon";
import ParticleMark from "./ParticleMark";
import { duration, ease } from "../lib/motion";
import { brand, disciplines, socials } from "../data/site";

/**
 * HERO — the coral field, with the brand monogram made of moving bubbles.
 *
 * THE COMPOSITION:
 *   the field      flat coral, edge to edge. Flat on purpose — a gradient
 *                  behind the particle cloud turns the cloud into noise.
 *   the mark       <ParticleMark/>, centre-right, huge and half off the grid
 *   the copy       eyebrow · headline · one action, hard left
 *   the rail       disciplines bottom-left, socials bottom-centre
 *
 * ONE ACTION, NOT TWO. The old hero offered "Start a Project" and "See our
 * work" side by side, which splits the decision at exactly the moment the
 * visitor has the least information to split it with. The field gets one
 * button; the work is a nav item and the whole second section.
 *
 * THE ENTRANCE RUNS ON A CLOCK, NOT ON SCROLL. Everything here is above the
 * fold on load, so `whileInView` would fire it all in the same frame.
 */

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (at = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: duration.long, ease: ease.out, delay: at },
  }),
};

export default function Hero({ showAvailability = true }) {
  const reduced = useReducedMotion();
  const at = (seconds) => (reduced ? 0 : seconds);

  return (
    <section
      id="/"
      className="hero field-coral grain relative box-border flex min-h-[100svh] flex-col justify-center overflow-hidden pt-[clamp(96px,15vh,150px)] pb-[clamp(88px,12vh,120px)]"
    >
      {/* The mark. Oversized and pushed right so the headline crosses it —
          the type and the glyph should occupy one space, not sit side by side.
          Its bubbles rise and recycle continuously; see ParticleMark.
          Hidden below md: at 390px it would sit directly under the headline
          and turn it into texture. */}
      <ParticleMark className="pointer-events-none absolute top-1/2 right-[-6%] hidden h-[min(92vh,860px)] w-[min(58vw,860px)] -translate-y-1/2 md:block" />

      <div className="shell relative z-[2] flex flex-col gap-[clamp(20px,3.4vw,38px)]">
        {showAvailability && (
          <motion.p
            className="m-0 text-[13.5px] tracking-[0.02em] text-white"
            variants={rise}
            custom={at(0.12)}
            initial="hidden"
            animate="show"
          >
            We will take care of your digital presence
          </motion.p>
        )}

        <motion.h1
          className="display m-0 max-w-[15ch] text-[clamp(44px,7.4vw,104px)] leading-[1.06] tracking-[-0.02em] text-white"
          variants={rise}
          custom={at(0.24)}
          initial="hidden"
          animate="show"
        >
          A step towards digital presence
        </motion.h1>

        <motion.div
          className="flex flex-wrap items-center gap-3"
          variants={rise}
          custom={at(0.4)}
          initial="hidden"
          animate="show"
        >
          {/* White pill on coral — the reference's one hero action, and the
              highest-contrast object the field can hold. */}
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-[30px] py-[15px] font-display text-[15px] tracking-[0.01em] text-coral-700 no-underline shadow-sm transition duration-200 hover:-translate-y-px hover:shadow-md"
          >
            <Icon name="plus" size={15} strokeWidth={2} />
            Start a Project
          </Link>
          <Link
            to="/work/"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-[28px] py-[15px] font-display text-[15px] text-white no-underline transition duration-200 hover:border-white hover:bg-white/12"
          >
            See our work
          </Link>
        </motion.div>
      </div>

      {/* ── The bottom rail: what we deliver, and where to find us ── */}
      <motion.div
        className="shell relative z-[2] mt-12 flex flex-wrap items-end justify-between gap-5 md:absolute md:inset-x-0 md:bottom-[clamp(20px,3.4vh,38px)] md:mt-0"
        variants={rise}
        custom={at(0.56)}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[12.5px] tracking-[0.06em] text-white uppercase">
            We deliver:
          </span>
          {disciplines.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/35 px-[14px] py-[6px] font-display text-[12px] tracking-[0.04em] text-white uppercase"
            >
              {item}
            </span>
          ))}
        </div>

        <ul className="m-0 flex list-none items-center gap-2 p-0">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 text-white transition duration-200 hover:bg-white hover:text-coral-700"
              >
                <Icon name={social.icon} size={16} />
              </a>
            </li>
          ))}
        </ul>
      </motion.div>

      <span className="sr-only" hidden>
        {brand.tagline}
      </span>
    </section>
  );
}
