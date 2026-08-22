/**
 * MOTION
 * ===========================================================================
 * The tokens every animation on the site is built from. One file, so nothing
 * anywhere is a magic number and the whole system can be retimed from here.
 *
 * THE BRIEF — revised for Prism, and the revision is deliberate.
 *
 * The original doctrine here was written for Industry, a wireframe: square
 * corners, hairlines, one accent. It banned overshoot, cursor-reactive light
 * and anything that drew the eye to the motion itself, on the grounds that a
 * schematic that bounces is a schematic nobody believes.
 *
 * That was right for a schematic. Prism is not one. The rebrand's whole claim
 * is that light is the brand — so light that never moves undercuts it, and the
 * ban has to be re-drawn rather than quietly ignored:
 *
 *   What belongs        content arriving on the grid (short travel, ease-out);
 *                       hairlines drawing themselves in; layered planes at
 *                       different rates; the prism field drifting; a headline
 *                       resolving word by word; light responding to a cursor
 *                       on a device that has one.
 *
 *   What still does not  spring bounce on body content, 3D card tilt, letter
 *                       scrambles, scroll-jacking, entrance animation on
 *                       anything a visitor is trying to read a second time,
 *                       and parallax large enough to notice as an effect.
 *
 * The line between the two lists is the same as it always was: motion that
 * makes the page feel alive stays, motion that makes the page about itself
 * goes. Overshoot moved across that line only for *chrome* — the nav pill, a
 * menu opening — where a little life reads as responsiveness. Body copy still
 * arrives flat.
 *
 * DISTANCE IS STILL THE BUDGET. Content travels no further than 24px. The one
 * exception is the hero headline, which is allowed 0.9s and a blur because it
 * plays once per visit and is the only thing on screen while it does.
 */

/** Seconds. `base` is the default for anything entering the viewport. */
export const duration = {
  micro: 0.16, // hovers, presses — perceptible, not watchable
  short: 0.28, // route change, small state flips
  base: 0.45, // a block arriving
  long: 0.7, // a section's own entrance
  hero: 0.9, // the headline resolving. Once per visit, alone on screen.
};

/**
 * `out` is the house curve — a fast start that settles, already used by the
 * original Reveal. Everything shares it so the whole page feels like one hand.
 */
export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  /* A small overshoot, for chrome only — see the brief. The `1.4` is tuned to
     be felt rather than seen: past about 1.6 a nav pill starts to wobble. */
  outBack: [0.34, 1.4, 0.64, 1],
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

  /* ONE WORD OF THE HEADLINE.
     Rises out of its own overflow box while a blur clears — the word reads as
     coming into focus rather than sliding in, which is the difference between
     a title sequence and a carousel. The blur is the expensive part and the
     reason this is used on roughly eight words and nowhere else. */
  word: {
    hidden: { opacity: 0, y: "0.92em", filter: "blur(12px)" },
    show: {
      opacity: 1,
      y: "0em",
      filter: "blur(0px)",
      transition: { duration: duration.hero, ease: ease.out },
    },
  },

  /* Chrome arriving — a menu panel, the nav pill. Allowed its small overshoot
     because it is a surface responding to a press, not content being read. */
  pop: {
    hidden: { opacity: 0, y: -8, scale: 0.97 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: duration.short, ease: ease.outBack },
    },
    exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.16, ease: ease.out } },
  },
};

/** The parent of a staggered list. Holds no visual state of its own. */
export const listContainer = (interval = stagger.base) => ({
  hidden: {},
  show: { transition: { staggerChildren: interval } },
});
