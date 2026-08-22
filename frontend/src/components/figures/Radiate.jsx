import { Node, Stage } from "./Stage";
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
 */

const VIEW = { w: 900, h: 700 };
const CARD = { w: 164, h: 108 };
const CORE = { x: 450, y: 350, r: 54 };
const RING = 260; /* how far out the cards sit */

const ANGLES = [-90, -30, 30, 90, 150, 210];
const at = (deg, r) => {
  const rad = (deg * Math.PI) / 180;
  return [CORE.x + r * Math.cos(rad), CORE.y + r * Math.sin(rad)];
};

export default function Radiate({ nodes }) {
  const still = useStill();
  const items = nodes
    .slice(0, ANGLES.length)
    .map((n, i) => ({ ...n, deg: ANGLES[i], i }));

  return (
    <Stage view={VIEW} kind="radiate">
      <svg
        aria-hidden="true"
        className="fig-art"
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        fill="none"
      >
        <defs>
          {items.map((n) => {
            /* Core edge → just short of the card, so every spoke is the same
               length and the figure reads as one decision applied evenly rather
               than as six relationships of differing strength. */
            const [x1, y1] = at(n.deg, CORE.r + 16);
            const [x2, y2] = at(n.deg, RING - 62);
            return (
              <path
                key={n.i}
                id={`rad-s${n.i}`}
                d={`M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)}`}
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

        <circle cx={CORE.x} cy={CORE.y} r={RING * 0.62} fill="url(#rad-glow)" />

        {items.map((n) => {
          const [px, py] = at(n.deg, RING - 62);
          return (
            <g key={n.i} className="fig-wire" data-i={n.i}>
              <use
                href={`#rad-s${n.i}`}
                className="fig-line"
                vectorEffect="non-scaling-stroke"
              />
              <circle className="fig-port" cx={px} cy={py} r="5.5" />
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
        <circle className="fig-core-disc" cx={CORE.x} cy={CORE.y} r={CORE.r} />
        <g
          transform={`translate(${CORE.x} ${CORE.y}) scale(2.5) translate(-12 -12)`}
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

      {items.map((n) => {
        const [x, y] = at(n.deg, RING);
        return (
          <Node
            key={n.label}
            i={n.i}
            view={VIEW}
            label={n.label}
            icon={n.icon}
            box={[x - CARD.w / 2, y - CARD.h / 2, CARD.w, CARD.h]}
          />
        );
      })}
    </Stage>
  );
}
