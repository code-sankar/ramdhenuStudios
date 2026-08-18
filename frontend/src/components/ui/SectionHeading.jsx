import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import { fadeUpTight, stagger, viewport } from "../../lib/motion";

/**
 * The standard section opener: mono eyebrow → display heading → supporting
 * line. Used by every section so vertical rhythm and type scale stay identical
 * down the page.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  size = "lg",
  className,
  children,
}) {
  const centered = align === "center";

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={stagger(0.09)}
      className={cn(
        "flex flex-col",
        centered ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && (
        <motion.div variants={fadeUpTight} className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-linear-to-r from-volt-500 to-volt-500/0" />
          <span className="eyebrow">{eyebrow}</span>
        </motion.div>
      )}

      <motion.h2
        variants={fadeUpTight}
        className={cn(
          "mt-5 max-w-3xl text-balance",
          size === "lg" ? "text-display-lg" : "text-display-md",
        )}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeUpTight}
          className={cn(
            "mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-mist-400",
            centered && "mx-auto",
          )}
        >
          {description}
        </motion.p>
      )}

      {children && <motion.div variants={fadeUpTight}>{children}</motion.div>}
    </motion.div>
  );
}
