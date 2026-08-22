import { motion, useReducedMotion } from "motion/react";

import { ease, stagger, variants } from "../lib/motion";

/**
 * KINETIC HEADLINE — the hero title resolving word by word.
 *
 * Each word rises out of its own clipped box while a blur clears, staggered
 * left to right, line by line. The effect is a title coming into focus rather
 * than text sliding in.
 *
 * THREE THINGS MAKE THIS SAFE TO SHIP:
 *
 *   The real sentence is always in the DOM. The animated words are marked
 *   aria-hidden and a visually-hidden copy carries the actual text, so a
 *   screen reader hears one heading rather than eight disconnected words —
 *   which is what per-word splitting does to assistive tech if you let it.
 *
 *   `overflow: clip` on the mask, not `hidden`. `hidden` on an inline-block
 *   establishes a scroll container, and Safari will happily scroll a word a
 *   fraction of a pixel and leave it there. `clip` cannot scroll.
 *
 *   Reduced motion renders the plain heading, no wrappers at all.
 *
 * `lines` is an array of strings. A word may be marked for the spectrum by
 * wrapping it in braces: "Digital {Presence}".
 */

/* Braces mark the one word the gradient picks out. Splitting on the delimiter
   rather than parsing keeps this a two-line function with no state. */
function parseWord(raw) {
  const accent = raw.startsWith("{") && raw.endsWith("}");
  return { text: accent ? raw.slice(1, -1) : raw, accent };
}

export default function KineticHeadline({ lines, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  const plain = lines.map((line) => line.replace(/[{}]/g, "")).join(" ");

  if (reduced) {
    return <h1 className={className}>{plain}</h1>;
  }

  /* Counts every word before this line so the stagger runs continuously across
     line breaks — restarting the delay per line makes the second line arrive
     under the first instead of after it. */
  let index = 0;

  return (
    <h1 className={className}>
      <span className="sr-only">{plain}</span>

      <span aria-hidden="true">
        {lines.map((line) => (
          <span key={line} className="block">
            {line.split(" ").map((raw) => {
              const { text, accent } = parseWord(raw);
              const at = index++;
              return (
                <span
                  key={`${text}-${at}`}
                  /* The mask. inline-block so it can clip; the trailing space
                     is a real space in the flow, not a margin, so the line
                     wraps and justifies the way text is supposed to. */
                  style={{ display: "inline-block", overflow: "clip", verticalAlign: "bottom" }}
                >
                  <motion.span
                    style={{ display: "inline-block", willChange: "transform, filter" }}
                    variants={variants.word}
                    initial="hidden"
                    animate="show"
                    transition={{
                      delay: delay + at * stagger.base * 1.6,
                      ease: ease.out,
                    }}
                    className={accent ? "prism-text" : undefined}
                  >
                    {text}
                  </motion.span>
                  {" "}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </h1>
  );
}
