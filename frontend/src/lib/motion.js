/**
 * MOTION
 * ===========================================================================
 * The tokens every animation on the site is built from. One file, so nothing
 * anywhere is a magic number and the whole system can be retimed from here.
 *
 * THE BRIEF, because it constrains everything below:
 *
 * Industry is a wireframe — square corners, hairlines, registration marks, one
 * accent. A design system that austere has an honest motion vocabulary and a
 * dishonest one, and picking the wrong one makes the whole page read as a
 * template rather than a studio's own work.
 *
 *   What belongs        content arriving on the grid (short travel, ease-out,
 *                       no overshoot), hairlines drawing themselves in, and
 *                       layered planes moving at different rates — which is
 *                       literally how an overlay on a technical drawing reads.
 *
 *   What does not       spring bounce, 3D tilt, rotation, scale-from-0.8 pops,
 *                       letter scrambles, cursor followers, scroll-jacking,
 *                       and parallax large enough to notice as an effect.
 *
 * The second list is not squeamishness. Every item on it draws attention to
 * the motion instead of to the work, and this site's job is to make a local
 * business owner trust the studio in about eight seconds.
 *
 * DISTANCE IS THE BUDGET. Nothing travels further than 24px and nothing runs
 * longer than 0.7s, so no animation can ever be the reason a visitor waits.
 */

/** Seconds. `base` is the default for anything entering the viewport. */
export const duration = {
  micro: 0.16, // hovers, presses — perceptible, not watchable
  short: 0.28, // route change, small state flips
  base: 0.45, // a block arriving
  long: 0.7, // the hero's own entrance, once per visit
};

/**
 * `out` is the house curve — a fast start that settles, already used by the
 * original Reveal. Everything shares it so the whole page feels like one hand.
 */
export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
};

/** Pixels of travel. Anything more starts to read as a slide, not a settle. */
export const travel = {
  sm: 10,
  md: 16,
  lg: 24,
};

/**
 * Seconds between siblings in a list.
 *
 * 0.06 is deliberate: fast enough that six rows finish in under half a second,
 * slow enough that the eye reads them as ordered rather than simultaneous.
 * Past about 0.12 a long list turns into a queue you wait for.
 */
export const stagger = {
  tight: 0.04,
  base: 0.06,
};

/** Fire once, slightly before the block is fully on screen. */
export const inView = { once: true, margin: "-10% 0px -8% 0px" };

/**
 * Entrance variants. `hidden`/`show` names are shared so a staggering parent
 * can drive any of them through framer's variant propagation.
 */
export const variants = {
  /* The default: rise and fade.
     `show` is a function so Reveal can pass its `delay` through framer's
     `custom` prop. Written as a plain object, the variant's own transition
     would win over the one on the component and every delay on the site would
     silently become zero — the blocks would still animate, just all at once,
     which is the failure you would never notice in review. */
  up: {
    hidden: { opacity: 0, y: travel.md },
    show: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: duration.base, ease: ease.out, delay },
    }),
  },
  /* For blocks where travel would fight a sticky or grid-locked position. */
  fade: {
    hidden: { opacity: 0 },
    show: (delay = 0) => ({
      opacity: 1,
      transition: { duration: duration.base, ease: ease.out, delay },
    }),
  },
  /* A list row — shorter travel, because it arrives alongside its siblings. */
  row: {
    hidden: { opacity: 0, y: travel.sm },
    show: { opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } },
  },
  /* A hairline drawing itself along its own axis. The system's own gesture. */
  rule: {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: duration.base, ease: ease.out } },
  },
};

/** The parent of a staggered list. Holds no visual state of its own. */
export const listContainer = (interval = stagger.base) => ({
  hidden: {},
  show: { transition: { staggerChildren: interval } },
});
