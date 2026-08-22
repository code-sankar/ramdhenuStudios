import { useReducedMotion } from "motion/react";

/**
 * Every figure's motion is SMIL, and SMIL is the one thing on this site that
 * `prefers-reduced-motion` cannot reach from the stylesheet: app.css flattens
 * animations by setting `animation-duration: 0.001ms`, which sails straight past
 * a `<animateMotion>` and leaves the travellers running at full speed.
 *
 * So each figure asks this instead and renders no animation elements at all when
 * it answers true. A figure whose motion carried information — the catchment's
 * expanding rings are the only one — draws a still version of that information
 * rather than simply dropping it.
 *
 * It lives in its own file because a module that exports both components and
 * non-components breaks Fast Refresh, and Stage.jsx is where the components are.
 */
export function useStill() {
  return useReducedMotion();
}
