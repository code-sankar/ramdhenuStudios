import { Node, Stage } from "./Stage";
import { useStill } from "./useStill";

/**
 * FUNNEL — four tiers, and most of what enters does not arrive. For performance
 * marketing.
 *
 * THE CLAIM, AND IT IS AN UNCOMFORTABLE ONE ON PURPOSE. Everyone selling ads
 * shows impressions. The honest picture is that impressions are the widest and
 * cheapest part of the shape and almost all of them fall away, and the only
 * number that pays a bill is at the narrow end. A funnel drawn with real
 * attrition — dots entering at the top and visibly *fewer* leaving the bottom —
 * makes a promise the page then has to keep, which is the right pressure to put
 * on a marketing page.
 *
 * THE PARTICLES ARE NOT DECORATION AND THEY ARE NOT UNIFORM. Seven enter across
 * the mouth; four fade out at the tiers where real traffic drops, and one runs
 * all the way through. Give them all the same opacity and the figure quietly
 * claims every impression converts, which is the exact lie the diagram exists to
 * avoid.
 */

const VIEW = { w: 1000, h: 580 };
const CARD = { w: 340, h: 96 };

/* Tier boundaries: y and the half-width of the funnel at that y. */
const TIERS = [
  { y: 60, hw: 190 },
  { y: 180, hw: 150 },
  { y: 300, hw: 108 },
  { y: 420, hw: 64 },
  { y: 540, hw: 26 },
];
const AXIS = 300; /* the funnel's centre line */

/* Each particle keeps its position as a *fraction* of the funnel's width rather
   than as a fixed offset, and that is not a refinement — the first version gave
   them absolute offsets and a quadratic curve, and they visibly fell straight
   through the sloped walls and out the side of the figure. A diagram about
   attrition cannot have its own contents leaking out of it.

   Holding the fraction constant and walking the tier boundaries means a
   particle is at the same relative position at every depth, so it is inside by
   construction at any funnel shape. `live` is how far down it survives; `1`
   runs the whole way. That distribution is the point — see the note above. */
const DROPS = [
  { f: -0.82, live: 0.3 },
  { f: -0.55, live: 0.62 },
  { f: -0.28, live: 1 },
  { f: 0, live: 1 },
  { f: 0.28, live: 0.66 },
  { f: 0.55, live: 0.34 },
  { f: 0.82, live: 0.28 },
];

/* The polyline a particle at fraction `f` falls down, boundary by boundary. */
const trail = (f) =>
  TIERS.map(
    (t, i) => `${i ? "L" : "M"} ${(AXIS + f * t.hw).toFixed(1)} ${t.y}`,
  ).join(" ");

export default function Funnel({ nodes }) {
  const still = useStill();
  const items = nodes.slice(0, 4).map((n, i) => ({ ...n, i }));

  return (
    <Stage view={VIEW} kind="funnel">
      <svg
        aria-hidden="true"
        className="fig-art"
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        fill="none"
      >
        {/* The tiers, each a shade stronger than the one above it: the shape
            narrows and the colour concentrates, which is the same statement made
            twice so it survives being skimmed. */}
        {TIERS.slice(0, -1).map((t, i) => {
          const b = TIERS[i + 1];
          return (
            <path
              key={i}
              className="fig-tier"
              opacity={0.14 + i * 0.09}
              d={`M ${AXIS - t.hw} ${t.y} L ${AXIS + t.hw} ${t.y} L ${AXIS + b.hw} ${b.y} L ${AXIS - b.hw} ${b.y} Z`}
            />
          );
        })}

        {/* Hairlines at each boundary, so the tiers read as four stages rather
            than one gradient. */}
        {TIERS.slice(1, -1).map((t, i) => (
          <path
            key={i}
            className="fig-line"
            vectorEffect="non-scaling-stroke"
            d={`M ${AXIS - t.hw} ${t.y} H ${AXIS + t.hw}`}
          />
        ))}

        {!still &&
          DROPS.map((d, i) => {
            const dur = 3.6 + (i % 4) * 0.5;
            return (
              <g key={i}>
                <circle className="fig-pulse" r="4">
                  <animateMotion
                    dur={`${dur}s`}
                    begin={`${(i * 0.42).toFixed(2)}s`}
                    repeatCount="indefinite"
                    path={trail(d.f)}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.85;0.85;0"
                    keyTimes={
                      d.live >= 1
                        ? "0;0.08;0.9;1"
                        : `0;0.08;${(d.live - 0.06).toFixed(2)};${d.live.toFixed(2)}`
                    }
                    dur={`${dur}s`}
                    begin={`${(i * 0.42).toFixed(2)}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}

        {/* Leader from each tier out to its label. */}
        {items.map((n) => {
          const t = TIERS[n.i];
          const b = TIERS[n.i + 1];
          const midY = (t.y + b.y) / 2;
          const midHw = (t.hw + b.hw) / 2;
          return (
            <g key={n.i} className="fig-wire" data-i={n.i}>
              <path
                className="fig-line"
                vectorEffect="non-scaling-stroke"
                d={`M ${AXIS + midHw} ${midY} H 580`}
              />
              <circle className="fig-port" cx={AXIS + midHw} cy={midY} r="5" />
              <circle className="fig-port" cx="580" cy={midY} r="5" />
            </g>
          );
        })}
      </svg>

      {items.map((n) => {
        const midY = (TIERS[n.i].y + TIERS[n.i + 1].y) / 2;
        return (
          <Node
            key={n.label}
            i={n.i}
            view={VIEW}
            label={n.label}
            icon={n.icon}
            box={[580, midY - CARD.h / 2, CARD.w, CARD.h]}
          />
        );
      })}
    </Stage>
  );
}
