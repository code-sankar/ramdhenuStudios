import { GLYPHS } from "./glyphs";

/**
 * STAGE — the plumbing every service figure shares.
 *
 * Six service pages each get a diagram, and they are deliberately six different
 * diagrams rather than one diagram with six sets of nouns. A hub with spokes
 * says "these ship together"; a funnel says "most of this falls away"; a ring
 * says "this never finishes". Those are different claims, and the services make
 * different claims. Reskinning one figure six times would say nothing six
 * times, and a visitor moving between two service pages would see it.
 *
 * What they do share is everything that is not the argument: the coordinate
 * system, the cards, the way motion is switched off, and what happens when the
 * screen is too narrow for a drawing. That lives here so a new figure is a
 * layout and a claim, not another copy of the scaffolding.
 *
 * THE ASPECT RATIO COMES FROM THE viewBox, WHICH RETIRES THE ONE FRAGILE PART
 * OF THE FIRST BUILD. Cards are HTML positioned in percentages; wires are SVG
 * positioned in viewBox units. Those are the same distance only while the box's
 * proportions are fixed, so the ratio is load-bearing — and in the first
 * version it lived in the stylesheet while the viewBox lived in the component,
 * two numbers a hundred lines apart that had to agree or every wire detached
 * from its card. `Stage` now derives the ratio from the `view` it is given, so
 * there is one number and it cannot disagree with itself.
 */

/* Percentage converters. A figure hands these its own viewBox and gets back the
   two functions that place HTML on top of SVG. */
const pctOf = (view) => ({
  x: (v) => `${((v / view.w) * 100).toFixed(3)}%`,
  y: (v) => `${((v / view.h) * 100).toFixed(3)}%`,
});

export function Stage({ view, kind, children }) {
  return (
    <div
      className="fig-stage"
      data-kind={kind}
      style={{ aspectRatio: `${view.w} / ${view.h}` }}
    >
      {children}
    </div>
  );
}

/**
 * A labelled card. `box` is [x, y, w, h] in the figure's own viewBox units, so a
 * figure never converts anything itself.
 *
 * The label is real text in real HTML rather than SVG `<text>` — it is the only
 * content in the figure, it has to reflow when the drawing is dropped on a
 * phone, and SVG text does not hyphenate, wrap or respond to the reader's font
 * settings.
 */
export function Node({ label, icon, box, view, i }) {
  const pct = pctOf(view);
  const [x, y, w, h] = box;
  return (
    <div
      className="fig-node"
      data-i={i}
      style={{
        left: pct.x(x),
        top: pct.y(y),
        width: pct.x(w),
        height: pct.y(h),
      }}
    >
      <span className="fig-badge" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          strokeWidth="1.5"
        >
          {GLYPHS[icon] ?? GLYPHS.design}
        </svg>
      </span>
      <span className="fig-label">{label}</span>
    </div>
  );
}
