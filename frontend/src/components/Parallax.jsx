import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * PARALLAX — depth by separating planes, not by moving things around.
 * ===========================================================================
 * The hero is already three stacked layers: the blueprint grid, the aurora and
 * the scrim. Giving each its own rate as the field scrolls away is the one
 * parallax this design system actually asks for — an overlay drawing separating
 * from the sheet it sits on. It is not a scroll effect bolted onto a flat page.
 *
 * THE NUMBERS ARE SMALL ON PURPOSE. Displacement is tens of pixels across a
 * whole viewport of scrolling. You should register it as depth and never as
 * movement; if a visitor notices the parallax, it is too much.
 *
 * A positive distance lags behind the page and reads as further away; a
 * negative one leads and reads as nearer.
 *
 * WHERE IT DOES NOT RUN
 *   • `prefers-reduced-motion` — scroll-linked movement is the exact class of
 *     motion that triggers vestibular symptoms, so it is off, not reduced.
 *   • Under 768px — most of this site's audience is on a mid-range Android on
 *     mobile data. Scroll-linked transforms are the first thing to drop frames
 *     there, and a stuttering hero costs more than depth buys.
 *
 * Only `transform` is animated, so the whole thing stays on the compositor and
 * never touches layout.
 */

/** Desktop-width, and only while it stays that way. */
function useParallaxAllowed() {
  const reduced = useReducedMotion();
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return wide && !reduced;
}

export default function Parallax({
  children,
  distance = 40,
  fadeTo = null,
  target,
  offset = ["start start", "end start"],
  className,
  as = "div",
  ...rest
}) {
  const allowed = useParallaxAllowed();
  const Tag = motion[as] ?? motion.div;

  /* Hooks cannot be conditional, so the scroll subscription is always created
     and only its output is withheld. framer tears it down with the component. */
  const { scrollYProgress } = useScroll({ target, offset });
  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, fadeTo ?? 1]);

  return (
    <Tag
      className={className}
      style={allowed ? { y, opacity: fadeTo == null ? undefined : opacity } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
