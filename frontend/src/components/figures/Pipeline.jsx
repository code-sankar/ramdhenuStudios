import { Node, Stage } from "./Stage";
import { useStill } from "./useStill";

/**
 * PIPELINE — four stages on one spine. For photography and videography.
 *
 * THE CLAIM: the camera is one stage of four, and the three around it are where
 * the work actually is. People buy "a shoot" and are surprised by the brief and
 * the edit; a left-to-right spine says before you read a word that this is a
 * sequence with a shape, and that the shutter is not the beginning of it.
 *
 * THE MOTION IS THE ARGUMENT, LITERALLY. A frame travels the spine, and each
 * stage's port flares as it arrives — the ports are timed off the traveller's
 * own duration rather than given loops of their own, so the sequence is
 * mechanically correct rather than four things blinking near each other. Arrival
 * time is distance along the spine over total length, times the duration; if the
 * layout moves, the timings follow, because they are computed from it.
 */

const VIEW = { w: 1000, h: 280 };
const CARD = { w: 186, h: 132 };
const SPINE = { y: 214, x1: 60, x2: 940 };
const TRIP = 7; /* seconds end to end */

/* Evenly spaced along the spine, and the cards hang above their own port. */
const STOPS = [170, 403, 637, 870];

export default function Pipeline({ nodes }) {
  const still = useStill();
  const items = nodes
    .slice(0, STOPS.length)
    .map((n, i) => ({ ...n, x: STOPS[i], i }));
  const span = SPINE.x2 - SPINE.x1;

  return (
    <Stage view={VIEW} kind="pipeline">
      <svg
        aria-hidden="true"
        className="fig-art"
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        fill="none"
      >
        <defs>
          <path id="pipe-spine" d={`M ${SPINE.x1} ${SPINE.y} H ${SPINE.x2}`} />
        </defs>

        <use
          href="#pipe-spine"
          className="fig-line"
          vectorEffect="non-scaling-stroke"
        />

        {items.map((n) => (
          <g key={n.i} className="fig-wire" data-i={n.i}>
            {/* the stem from the card down to its stop on the spine */}
            <path
              className="fig-line"
              vectorEffect="non-scaling-stroke"
              d={`M ${n.x} 154 V ${SPINE.y}`}
            />
            <circle className="fig-port" cx={n.x} cy={SPINE.y} r="6">
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
                  begin={`${(((n.x - SPINE.x1) / span) * TRIP).toFixed(2)}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          </g>
        ))}

        {/* The traveller is a frame rather than a dot — it is the thing being
            shot, cut and delivered, and on a photography page a rectangle with
            an aperture in it says that at a glance. Centred on its own origin so
            `animateMotion` moves its middle and not its corner. */}
        {!still && (
          <g className="fig-pulse-g">
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
              <animateMotion
                dur={`${TRIP}s`}
                repeatCount="indefinite"
                rotate="0"
              >
                <mpath href="#pipe-spine" />
              </animateMotion>
            </g>
          </g>
        )}

        {/* DIRECTION HAS TO SURVIVE THE MOTION BEING SWITCHED OFF. A travelling
            frame says left-to-right beautifully and says nothing at all under
            `prefers-reduced-motion`, where a reader would be left with four
            cards on a bar and no reason to read them in any particular order.
            The chevrons are static and carry the sequence on their own. */}
        {[286, 520, 753].map((x) => (
          <path
            key={x}
            className="fig-arrow"
            d="M -5 -4.6 L 5 0 L -5 4.6 Z"
            transform={`translate(${x} ${SPINE.y})`}
          />
        ))}

        {/* The ends of the run, so the spine terminates rather than stopping. */}
        <circle
          className="fig-port"
          cx={SPINE.x1}
          cy={SPINE.y}
          r="4"
          opacity="0.5"
        />
        <circle
          className="fig-port"
          cx={SPINE.x2}
          cy={SPINE.y}
          r="4"
          opacity="0.5"
        />
      </svg>

      {items.map((n) => (
        <Node
          key={n.label}
          i={n.i}
          view={VIEW}
          label={n.label}
          icon={n.icon}
          box={[n.x - CARD.w / 2, 22, CARD.w, CARD.h]}
        />
      ))}
    </Stage>
  );
}
