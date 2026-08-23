import { Node, Stage } from "./Stage";
import { useLayout } from "./useLayout";
import { useStill } from "./useStill";

/**
 * LOOP — five stages on a ring that never ends. For social media management.
 *
 * THE CLAIM: social is not a campaign with a finish line. It is a cycle, and
 * the reason to pay monthly rather than once is that the last stage feeds the
 * first — what you learn changes what you plan. A ring says that structurally:
 * there is no leftmost box and no rightmost box, so the eye can never find a
 * beginning or an end to it.
 *
 * WHICH IS WHY THIS IS A RING AND THE PHOTOGRAPHY FIGURE IS A LINE. Both are
 * ordered stages and either could have been drawn either way. A shoot genuinely
 * ends — you deliver and you are done — and a line ends. Social genuinely does
 * not, and a ring does not. The shape is the part doing the arguing.
 *
 * OF THE SIX, THIS IS THE ONE THAT BARELY CHANGES ON A PHONE. A ring is square
 * by nature, so the portrait layout is the same figure with a tighter frame and
 * smaller cards rather than a rearrangement — which is lucky, because its five
 * labels are single words and stay legible at any size the ring will take.
 */

const LAYOUTS = {
  wide: {
    view: { w: 900, h: 660 },
    card: { w: 168, h: 112 },
    ring: { cx: 450, cy: 320, r: 240 },
    core: 2.1,
  },
  narrow: {
    view: { w: 660, h: 630 },
    card: { w: 208, h: 190 },
    /* THE BINDING CONSTRAINT IS NOT THE CHORD BETWEEN NEIGHBOURS, WHICH IS WHAT
       THE FIRST ATTEMPT SIZED AGAINST. Two boxes only overlap when they are
       close on *both* axes, so what matters is the horizontal gap between the
       top card and the two beside it: r·(cos18° − cos90°) = 0.951r, which has to
       clear the 208-unit card width. That puts the floor at r ≥ 219 — not the
       177 the straight-line chord suggests — and 228 leaves a little room. */
    ring: { cx: 330, cy: 330, r: 228 },
    core: 1.5,
  },
};

/* Five evenly around, starting at the top. */
const ANGLES = [-90, -18, 54, 126, 198];
const ORBIT = 16; /* seconds for one full turn — slow enough to read as a cycle */

const at = (ring, deg) => {
  const rad = (deg * Math.PI) / 180;
  return [ring.cx + ring.r * Math.cos(rad), ring.cy + ring.r * Math.sin(rad)];
};

/* A full circle as a path, because `mpath` follows a <path> and nothing else.
   Two half-arcs: SVG cannot express a complete ellipse in one arc command, as
   an arc whose start and end coincide is degenerate and simply does not draw. */
const ringPath = (r) =>
  `M ${r.cx} ${r.cy - r.r} A ${r.r} ${r.r} 0 1 1 ${r.cx} ${r.cy + r.r} ` +
  `A ${r.r} ${r.r} 0 1 1 ${r.cx} ${r.cy - r.r}`;

export default function Loop({ nodes }) {
  const still = useStill();
  const L = LAYOUTS[useLayout()];
  const items = nodes
    .slice(0, ANGLES.length)
    .map((n, i) => ({ ...n, deg: ANGLES[i], i }));

  return (
    <Stage view={L.view} kind="loop">
      <svg
        aria-hidden="true"
        className="fig-art"
        viewBox={`0 0 ${L.view.w} ${L.view.h}`}
        fill="none"
      >
        <defs>
          <path id="loop-ring" d={ringPath(L.ring)} />
          <radialGradient id="loop-glow">
            <stop
              offset="0%"
              stopColor="var(--color-coral-500)"
              stopOpacity="0.12"
            />
            <stop
              offset="100%"
              stopColor="var(--color-coral-500)"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        <circle
          cx={L.ring.cx}
          cy={L.ring.cy}
          r={L.ring.r * 0.7}
          fill="url(#loop-glow)"
        />
        <use
          href="#loop-ring"
          className="fig-line"
          vectorEffect="non-scaling-stroke"
        />

        {/* Direction markers between the stages. Without them a ring is
            ambiguous — it turns, but nothing says which way, and the cycle only
            makes its point if you can see that learning feeds planning rather
            than the reverse. Placed on the midpoints so they never collide with
            a card. */}
        {ANGLES.map((deg, i) => {
          const mid = deg + 36;
          const [x, y] = at(L.ring, mid);
          return (
            <path
              key={i}
              className="fig-arrow"
              d="M -5 -4.6 L 5 0 L -5 4.6 Z"
              transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${mid + 90})`}
            />
          );
        })}

        {!still && (
          <circle className="fig-pulse" r="6">
            <animateMotion dur={`${ORBIT}s`} repeatCount="indefinite">
              <mpath href="#loop-ring" />
            </animateMotion>
          </circle>
        )}

        {/* The centre names what the ring is: the same loop, going round again. */}
        <g
          className="fig-core-mark"
          transform={`translate(${L.ring.cx} ${L.ring.cy}) scale(${L.core}) translate(-12 -12)`}
        >
          <path d="M20 11.5a8 8 0 10-1.4 5.6" strokeWidth="1.5" />
          <path d="M20.4 4.6v5.2h-5.2" strokeWidth="1.5" />
        </g>
      </svg>

      {items.map((n) => {
        const [x, y] = at(L.ring, n.deg);
        return (
          <Node
            key={n.label}
            i={n.i}
            view={L.view}
            label={n.label}
            icon={n.icon}
            box={[x - L.card.w / 2, y - L.card.h / 2, L.card.w, L.card.h]}
          />
        );
      })}
    </Stage>
  );
}
