/**
 * MOTION LANGUAGE
 * ---------------------------------------------------------------------------
 * Every animation on the site is composed from these primitives so timing and
 * easing stay consistent. Rules of the system:
 *
 *   • Entrances travel a short distance (16–28px) over 600–800ms on expo-out.
 *   • Micro-interactions are 180–260ms on a smooth curve.
 *   • Staggers are 60–80ms; nothing waits longer than ~400ms to start.
 *   • Nothing bounces, spins or slides in from off-screen.
 */

export const EASE_EXPO = [0.16, 1, 0.3, 1];
export const EASE_QUINT = [0.22, 1, 0.36, 1];
export const EASE_SMOOTH = [0.4, 0, 0.2, 1];

/** Standard viewport trigger: fire once, slightly before the element lands. */
export const viewport = { once: true, margin: "-12% 0px -10% 0px" };

/** Fade + rise. The default entrance for almost everything. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_EXPO },
  },
};

/** Same, but shorter travel — for text lines inside a heading block. */
export const fadeUpTight = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_EXPO },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE_SMOOTH } },
};

/** Media reveal: image settles from a slight scale-up behind a clip mask. */
export const mediaReveal = {
  hidden: { opacity: 0, scale: 1.06 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE_EXPO },
  },
};

/** Parent that staggers its children. `delay` offsets the whole group. */
export const stagger = (staggerChildren = 0.07, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Line that draws itself along its own length (process timeline, dividers). */
export const drawLine = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 1.1, ease: EASE_EXPO },
  },
};

/** Shared spring for pointer-driven motion (magnetic CTA, hero parallax). */
export const pointerSpring = { stiffness: 180, damping: 18, mass: 0.6 };
