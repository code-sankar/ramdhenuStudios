import { Node, Stage } from "./Stage";
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
 * five-ish ordered stages and either could have been drawn either way. A shoot
 * genuinely ends — you deliver and you are done — and a line ends. Social
 * genuinely does not, and a ring does not. The shape is the part of each figure
 * doing the arguing; the labels are only naming what it argues about.
 *
 * The ring passes behind the cards rather than between them, so it reads as one
 * continuous thread the stages are strung on rather than as five separate hops.
 */

const VIEW = { w: 900, h: 660 };
const CARD = { w: 168, h: 112 };
const RING = { cx: 450, cy: 320, r: 240 };
const ORBIT = 16; /* seconds for one full turn — slow enough to read as a cycle */

/* Five evenly around, starting at the top. */
const ANGLES = [-90, -18, 54, 126, 198];

const at = (deg) => {
  const rad = (deg * Math.PI) / 180;
  return [RING.cx + RING.r * Math.cos(rad), RING.cy + RING.r * Math.sin(rad)];
};

/* A full circle as a path, because `mpath` follows a <path> and nothing else.
   Two half-arcs: SVG cannot express a complete ellipse in one arc command, as
   an arc whose start and end coincide is degenerate and simply does not draw. */
const RING_PATH =
  `M ${RING.cx} ${RING.cy - RING.r} ` +
  `A ${RING.r} ${RING.r} 0 1 1 ${RING.cx} ${RING.cy + RING.r} ` +
  `A ${RING.r} ${RING.r} 0 1 1 ${RING.cx} ${RING.cy - RING.r}`;

export default function Loop({ nodes }) {
  const still = useStill();
  const items = nodes
    .slice(0, ANGLES.length)
    .map((n, i) => ({ ...n, deg: ANGLES[i], i }));

  return (
    <Stage view={VIEW} kind="loop">
      <svg
        aria-hidden="true"
        className="fig-art"
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        fill="none"
      >
        <defs>
          <path id="loop-ring" d={RING_PATH} />
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
          cx={RING.cx}
          cy={RING.cy}
          r={RING.r * 0.7}
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
          const [x, y] = at(mid);
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
          transform={`translate(${RING.cx} ${RING.cy}) scale(2.1) translate(-12 -12)`}
        >
          <path d="M20 11.5a8 8 0 10-1.4 5.6" strokeWidth="1.5" />
          <path d="M20.4 4.6v5.2h-5.2" strokeWidth="1.5" />
        </g>
      </svg>

      {items.map((n) => {
        const [x, y] = at(n.deg);
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
