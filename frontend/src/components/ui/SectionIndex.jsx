import { motion, useReducedMotion } from "motion/react";

import { duration, ease, inView } from "../../lib/motion";

/**
 * The spec-sheet index that opens every section — the blueprint system's own
 * way of numbering a drawing.
 *
 * The rule between the number and the label draws itself along its own axis as
 * the section arrives. It is the one flourish on the page, and it is here
 * rather than anywhere else because a hairline extending is a gesture this
 * design system already owns: it is what a drawing does, not what a website
 * does to look busy. 34px of travel, once, and then it is furniture.
 *
 * `onSteel` inverts it for the dark field, where the paper-ground accent and
 * hairline are both too dark to read.
 */
export default function SectionIndex({ num, label, onSteel = false }) {
  const reduced = useReducedMotion();
  const rule = `h-px w-[34px] origin-left ${onSteel ? "bg-paper/30" : "bg-line"}`;

  return (
    <p className="mb-[clamp(28px,3.4vw,44px)] flex items-center gap-[14px]">
      <span
        className={`font-display text-[12px] tracking-[0.1em] ${
          onSteel ? "text-white/75" : "text-coral-700"
        }`}
      >
        {num}
      </span>

      {reduced ? (
        <span aria-hidden="true" className={rule} />
      ) : (
        <motion.span
          aria-hidden="true"
          className={rule}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={inView}
          transition={{ duration: duration.base, ease: ease.out, delay: 0.1 }}
        />
      )}

      {/* The label has to invert with the number. It did not, and every
          `onSteel` section shipped its label in steel-700 — a dark blue on the
          near-black field, measuring 3.1:1. */}
      <span
        className={`text-[12px] tracking-[0.12em] uppercase ${
          onSteel ? "text-white/75" : "text-coral-700"
        }`}
      >
        {label}
      </span>
    </p>
  );
}
