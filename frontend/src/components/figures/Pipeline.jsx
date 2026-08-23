import { Node, Stage } from "./Stage";
import { useLayout } from "./useLayout";
import { useStill } from "./useStill";

/**
 * PIPELINE — four stages on one spine. For photography and videography.
 *
 * THE CLAIM: the camera is one stage of four, and the three around it are where
 * the work actually is. People buy "a shoot" and are surprised by the brief and
 * the edit; a spine says before you read a word that this is a sequence with a
 * shape, and that the shutter is not the beginning of it.
 *
 * ON A PHONE THE SPINE TURNS NINETY DEGREES AND LOSES NOTHING. A sequence needs
 * a direction, not a compass bearing — a line running down a narrow screen with
 * the frame travelling top to bottom says exactly what the horizontal one says
 * on a laptop, and says it without shrinking four cards into a strip too small
 * to read. The cards alternate either side of the vertical spine so each has
 * half the width to itself rather than a quarter.
 *
 * THE MOTION IS THE ARGUMENT, LITERALLY. A frame travels the spine, and each
 * stage's port flares as it arrives — the ports are timed off the traveller's
 * own duration rather than given loops of their own, so the sequence is
 * mechanically correct rather than four things blinking near each other.
 * Arrival time is distance along the spine over total length, times the
 * duration; both layouts compute it from their own geometry, so neither can
 * drift out of step with its drawing.
 */

const TRIP = 7; /* seconds end to end */

const LAYOUTS = {
  wide: {
    view: { w: 1000, h: 280 },
    card: { w: 186, h: 132 },
    axis: "x",
    spine: { at: 214, from: 60, to: 940 },
    /* Distance along the spine for each stop, and where the card sits. */
    stops: [170, 403, 637, 870],
    cardAt: 22,
    stem: 154,
    arrows: [286, 520, 753],
  },
  narrow: {
    view: { w: 600, h: 930 },
    card: { w: 256, h: 150 },
    axis: "y",
    spine: { at: 300, from: 60, to: 870 },
    stops: [150, 370, 590, 810],
    /* Alternating sides: left card ends at 270, right card starts at 330. */
    sides: [14, 330, 14, 330],
    arrows: [260, 480, 700],
  },
};

export default function Pipeline({ nodes }) {
  const still = useStill();
  const L = LAYOUTS[useLayout()];
  const vertical = L.axis === "y";
  const items = nodes
    .slice(0, L.stops.length)
    .map((n, i) => ({ ...n, at: L.stops[i], i }));
  const span = L.spine.to - L.spine.from;

  /* One helper for both orientations, so the two layouts cannot describe the
     same wire differently. */
  const spinePath = vertical
    ? `M ${L.spine.at} ${L.spine.from} V ${L.spine.to}`
    : `M ${L.spine.from} ${L.spine.at} H ${L.spine.to}`;
  const portOf = (v) => (vertical ? [L.spine.at, v] : [v, L.spine.at]);
  const stemPath = (n) => {
    const [px, py] = portOf(n.at);
    if (!vertical) return `M ${px} ${L.stem} V ${py}`;
    /* The stem reaches sideways to whichever edge of the card faces the spine. */
    const left = L.sides[n.i] < L.spine.at;
    return `M ${left ? L.sides[n.i] + L.card.w : L.sides[n.i]} ${py} H ${px}`;
  };

  return (
    <Stage view={L.view} kind="pipeline">
      <svg
        aria-hidden="true"
        className="fig-art"
        viewBox={`0 0 ${L.view.w} ${L.view.h}`}
        fill="none"
      >
        <defs>
          <path id="pipe-spine" d={spinePath} />
        </defs>

        <use
          href="#pipe-spine"
          className="fig-line"
          vectorEffect="non-scaling-stroke"
        />

        {items.map((n) => {
          const [px, py] = portOf(n.at);
          return (
            <g key={n.i} className="fig-wire" data-i={n.i}>
              <path
                className="fig-line"
                vectorEffect="non-scaling-stroke"
                d={stemPath(n)}
              />
              <circle className="fig-port" cx={px} cy={py} r="6">
                {!still && (
                  /* Flares the instant the frame reaches it. `begin` is the
                     traveller's arrival time, and the value list spikes at the
                     very start of the cycle so the flare lands on arrival rather
                     than somewhere after it. */
                  <animate
                    attributeName="r"
                    values="11;6;6"
                    keyTimes="0;0.1;1"
                    dur={`${TRIP}s`}
                    begin={`${(((n.at - L.spine.from) / span) * TRIP).toFixed(2)}s`}
                    repeatCount="indefinite"
                  />
                )}
              </circle>
            </g>
          );
        })}

        {/* DIRECTION HAS TO SURVIVE THE MOTION BEING SWITCHED OFF. A travelling
            frame says which way beautifully and says nothing at all under
            `prefers-reduced-motion`, where a reader would be left with four
            cards on a bar and no reason to read them in any particular order.
            The chevrons are static and carry the sequence on their own. */}
        {L.arrows.map((v) => {
          const [x, y] = portOf(v);
          return (
            <path
              key={v}
              className="fig-arrow"
              d="M -5 -4.6 L 5 0 L -5 4.6 Z"
              transform={`translate(${x} ${y})${vertical ? " rotate(90)" : ""}`}
            />
          );
        })}

        {/* The traveller is a frame rather than a dot — it is the thing being
            shot, cut and delivered, and on a photography page a rectangle with
            an aperture in it says that at a glance. Centred on its own origin so
            `animateMotion` moves its middle and not its corner. */}
        {!still && (
          <g>
            <rect
              x="-11"
              y="-8"
              width="22"
              height="16"
              rx="3"
              className="fig-frame-mark"
            />
            <circle cx="0" cy="0" r="3.4" className="fig-frame-eye" />
            <animateMotion dur={`${TRIP}s`} repeatCount="indefinite" rotate="0">
              <mpath href="#pipe-spine" />
            </animateMotion>
          </g>
        )}

        {/* The ends of the run, so the spine terminates rather than stopping. */}
        {[L.spine.from, L.spine.to].map((v) => {
          const [x, y] = portOf(v);
          return (
            <circle
              key={v}
              className="fig-port"
              cx={x}
              cy={y}
              r="4"
              opacity="0.5"
            />
          );
        })}
      </svg>

      {items.map((n) => (
        <Node
          key={n.label}
          i={n.i}
          view={L.view}
          label={n.label}
          icon={n.icon}
          box={
            vertical
              ? [L.sides[n.i], n.at - L.card.h / 2, L.card.w, L.card.h]
              : [n.at - L.card.w / 2, L.cardAt, L.card.w, L.card.h]
          }
        />
      ))}
    </Stage>
  );
}
