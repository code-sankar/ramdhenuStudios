import { motion } from "motion/react";

/**
 * A short, flat entrance — 16px of travel on an ease-out curve, fired once.
 * The Industry system is a wireframe; motion here is there to establish
 * reading order as a section arrives, not to perform.
 */
export default function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
