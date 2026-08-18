import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { useReducedMotion } from "../../lib/hooks";

/**
 * Counts up to `value` the first time it scrolls into view. Under reduced
 * motion the final figure is printed immediately — the number is information,
 * the animation is not.
 */
export default function Counter({ value, decimals = 0, prefix = "", suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [counted, setCounted] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setCounted,
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  const display = reduced ? value : counted;

  return (
    <span ref={ref} className="nums">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
