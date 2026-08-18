import { motion } from "motion/react";
import { fadeUp, viewport } from "../../lib/motion";

/**
 * Scroll-triggered entrance. Wraps any block so sections reveal on approach.
 * Fires once — content never re-animates on the way back up, which is where
 * scroll animation usually starts to feel gimmicky.
 */
export default function Reveal({
  children,
  delay = 0,
  variants = fadeUp,
  as = "div",
  className,
  ...rest
}) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={variants}
      transition={{ delay }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
