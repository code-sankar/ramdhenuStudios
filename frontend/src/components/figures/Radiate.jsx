import { Node, Stage } from "./Stage";
import { useLayout } from "./useLayout";
import { useStill } from "./useStill";

/**
 * RADIATE — one identity, six surfaces it has to survive. For graphic design and
 * branding.
 *
 * THE CLAIM: a logo is not the deliverable. What is bought is a decision made
 * once at the centre and then held on a shopfront, a menu, a phone screen and a
 * printed card — surfaces with nothing in common except that the same identity
 * has to work on all of them. Everything here points outward from one core,
 * because that is the direction the work travels.
 *
 * IT IS DELIBERATELY THE INVERSE OF THE WEBSITE FIGURE, AND THE TWO ARE DRAWN SO
 * THAT READS AT A GLANCE. That one gathers six disciplines inward into a build,
 * on right-angled runs, laid out on a rectangular grid. This one pushes one
 * decision outward onto six surfaces, on straight spokes, laid out on a circle.
 * Same node count, opposite claim — so if they shared a silhouette the second
 * page would look like the first page with the words swapped, and the argument
 * would be lost. Orthogonal versus radial, and inward versus outward, is the
 * whole difference and it is enough.
 *
 * ON A PHONE THE RING OPENS INTO A FAN. Six cards on a circle need as much
 * width as height and a phone has neither to spare; stretching the circle into
 * an ellipse was the first attempt and it put the top card through the shoulder
 * of the one below it, because on an ellipse the gap between neighbours is not
 * the same all the way round.
 *
 * So the portrait layout puts the core in the middle of two columns and runs a
 * straight spoke to each of six cards. It is still one thing radiating outward
 * — six spokes, one origin, every arrow pointing away — which is the claim. And
 * it is still not the website figure's portrait form, which hangs its cards off
 * a trunk descending from a frame at the top: a fan from a centre and a bus from
 * a head remain two different pictures.
 */

const LAYOUTS = {
  wide: {
    view: { w: 900, h: 700 },
    card: { w: 164, h: 108 },
    core: { x: 450, y: 350, r: 54 },
    coreScale: 2.5,
    /* Six evenly around a circle, starting at the top. */
    orbit: { rx: 260, ry: 260, angles: [-90, -30, 30, 90, 150, 210] },
  },
  narrow: {
    view: { w: 600, h: 790 },
    card: { w: 236, h: 160 },
    core: { x: 300, y: 430, r: 44 },
    coreScale: 2.0,
    /* Two columns, three rows, core between them. Left cards end at 246 and
       right ones start at 354, so the core's 88-unit width sits in the gap. */
    slots: [
      [10, 120],
      [354, 120],
      [10, 350],
      [354, 350],
      [10, 580],
      [354, 580],
    ],
  },
};

/* Both layouts are reduced to the same thing — the top-left corner of each card
   — so the spoke drawing below never has to know which one it is looking at. */
const slotsOf = (L) => {
  if (L.slots) return L.slots;
  return L.orbit.angles.map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return [
      L.core.x + L.orbit.rx * Math.cos(rad) - L.card.w / 2,
      L.core.y + L.orbit.ry * Math.sin(rad) - L.card.h / 2,
    ];
  });
};

/* A spoke runs from just outside the core to just short of the card, along the
   line joining their centres. Trimming both ends is what stops it disappearing
   under the core or butting into the card. */
const spoke = (L, [cx, cy]) => {
  const mx = cx + L.card.w / 2;
  const my = cy + L.card.h / 2;
  const dx = mx - L.core.x;
  const dy = my - L.core.y;
  const len = Math.hypot(dx, dy) || 1;
  const gapOut = L.core.r + 14;
  /* Stop at the card's own bounding box rather than a fixed distance, or the
     spokes to the near cards overshoot while the far ones fall short. */
  const gapIn = len - Math.min(L.card.w, L.card.h) / 2 - 12;
  return {
    x1: L.core.x + (dx / len) * gapOut,
    y1: L.core.y + (dy / len) * gapOut,
    x2: L.core.x + (dx / len) * gapIn,
    y2: L.core.y + (dy / len) * gapIn,
  };
};

export default function Radiate({ nodes }) {
  const still = useStill();
  const L = LAYOUTS[useLayout()];
  const slots = slotsOf(L);
  const items = nodes
    .slice(0, slots.length)
    .map((n, i) => ({ ...n, box: slots[i], i }));

  return (
    <Stage view={L.view} kind="radiate">
      <svg
        aria-hidden="true"
        className="fig-art"
        viewBox={`0 0 ${L.view.w} ${L.view.h}`}
        fill="none"
      >
        <defs>
          {items.map((n) => {
            const s = spoke(L, n.box);
            return (
              <path
                key={n.i}
                id={`rad-s${n.i}`}
                d={`M ${s.x1.toFixed(1)} ${s.y1.toFixed(1)} L ${s.x2.toFixed(1)} ${s.y2.toFixed(1)}`}
              />
            );
          })}
          <radialGradient id="rad-glow">
            <stop
              offset="0%"
              stopColor="var(--color-coral-500)"
              stopOpacity="0.18"
            />
            <stop
              offset="100%"
              stopColor="var(--color-coral-500)"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        <ellipse
          cx={L.core.x}
          cy={L.core.y}
          rx={L.view.w * 0.32}
          ry={L.view.h * 0.26}
          fill="url(#rad-glow)"
        />

        {items.map((n) => {
          const s = spoke(L, n.box);
          return (
            <g key={n.i} className="fig-wire" data-i={n.i}>
              <use
                href={`#rad-s${n.i}`}
                className="fig-line"
                vectorEffect="non-scaling-stroke"
              />
              <circle className="fig-port" cx={s.x2} cy={s.y2} r="5.5" />
              {!still && (
                <circle className="fig-pulse" r="4.5">
                  <animateMotion
                    dur={`${4.1 + n.i * 0.44}s`}
                    repeatCount="indefinite"
                  >
                    <mpath href={`#rad-s${n.i}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.9;0.9;0"
                    keyTimes="0;0.2;0.74;1"
                    dur={`${4.1 + n.i * 0.44}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* The core. A solid mark rather than an outline: it is the one fixed
            decision in a figure about variation, and it should look like it. */}
        <circle
          className="fig-core-disc"
          cx={L.core.x}
          cy={L.core.y}
          r={L.core.r}
        />
        <g
          transform={`translate(${L.core.x} ${L.core.y}) scale(${L.coreScale}) translate(-12 -12)`}
        >
          <path
            d="M12 3l7.8 4.5v9L12 21l-7.8-4.5v-9z"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="none"
          />
          <circle
            cx="12"
            cy="12"
            r="3"
            stroke="#fff"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
      </svg>

      {items.map((n) => (
        <Node
          key={n.label}
          i={n.i}
          view={L.view}
          label={n.label}
          icon={n.icon}
          box={[n.box[0], n.box[1], L.card.w, L.card.h]}
        />
      ))}
    </Stage>
  );
}
