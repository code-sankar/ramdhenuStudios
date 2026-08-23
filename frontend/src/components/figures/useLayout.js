import { useEffect, useState } from "react";

/**
 * Which geometry a figure should draw itself in.
 *
 * THE FIGURES USED TO VANISH BELOW 1024px AND THE REASONING WAS WRONG. The note
 * in the stylesheet said six wires converging on a centre "stops being an
 * argument" in a single column, so the drawing was dropped and the cards became
 * a plain grid. But that only ever justified dropping the *desktop layout* — it
 * did not follow that there should be no drawing, and the effect was that every
 * visitor on a phone, which for this site's audience is most of them, got the
 * list the diagram existed to improve on.
 *
 * A ring is not a landscape shape. Neither is a funnel or a spine. Each figure
 * has a portrait form that makes the same claim — a horizontal pipeline becomes
 * a vertical one, a hub keeps its centre and hangs its cards off a bus — so
 * each one now carries two geometries and picks between them here.
 *
 * THE BREAKPOINT IS 720px, NOT THE 1024 IT WAS, AND THAT IS ARITHMETIC RATHER
 * THAN TASTE. The landscape layouts are ~1000 units wide with 186-unit cards,
 * and the label inside a card is fixed at 15px because type does not scale with
 * an SVG viewBox. At a 720px stage a card is 134px wide against a 96px label
 * measure plus padding — the last width where the wide layout is still
 * comfortable. Below that the portrait geometry takes over, with its own larger
 * cards relative to the frame.
 */
const WIDE = "(min-width: 720px)";

export function useLayout() {
  const [mode, setMode] = useState(() =>
    typeof window !== "undefined" && window.matchMedia(WIDE).matches ? "wide" : "narrow",
  );

  useEffect(() => {
    const mq = window.matchMedia(WIDE);
    const onChange = (event) => setMode(event.matches ? "wide" : "narrow");
    /* Read once on mount as well: the first paint used the initial state, and a
       resize that happened between render and effect would otherwise be missed
       until the next one. */
    onChange(mq);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return mode;
}
