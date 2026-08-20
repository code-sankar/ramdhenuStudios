import { motion, useReducedMotion } from "motion/react";

import { inView, variants } from "../lib/motion";

/**
 * REVEAL — one block arriving on the grid.
 *
 * A short, flat entrance fired once. The Industry system is a wireframe; motion
 * here establishes reading order as a section arrives, it does not perform.
 *
 * `as` matters more than it looks: this used to always render a <div>, which
 * meant wrapping a list row or a grid cell in one silently inserted a box that
 * broke the layout it was meant to animate. Pass the element the layout
 * actually needs.
 *
 * Under `prefers-reduced-motion` the content is rendered in its final state
 * with no animation at all — not a faster animation, none. app.css flattens
 * CSS transitions for the same reason; this is the JavaScript half of that.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  variant = "up",
  as = "div",
  ...rest
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      variants={variants[variant] ?? variants.up}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      {...rest}
    >
      {children}
    </Tag>
  );
}
