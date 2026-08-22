import { Node, Stage } from "./Stage";
import { useStill } from "./useStill";

/**
 * CATCHMENT — one pin, a radius, and the searches that arrive inside it. For
 * Google Business management.
 *
 * THE CLAIM: this service is not about a website at all, it is about being the
 * result when somebody a few streets away searches for what you sell. That is a
 * geographic argument, so it gets the one figure on the site with a map in it.
 *
 * TWO MOTIONS, DELIBERATELY OPPOSED, BECAUSE THE STORY HAS TWO HALVES. The rings
 * push outward — that is the listing reaching further as it is kept up. The
 * tokens run inward along the spokes — those are the searches arriving because
 * it did. One direction alone tells half of it: outward only looks like
 * broadcasting into nothing, inward only looks like luck.
 *
 * The rings are `r` and `opacity` on three circles rather than a scale
 * transform, which keeps their stroke a true hairline the whole way out. A
 * scaled circle grows its stroke with it and arrives looking like a doughnut.
 */

const VIEW = { w: 900, h: 620 };
const CARD = { w: 180, h: 118 };
const PIN = { x: 450, y: 300 };
const SWEEP = 4.8; /* seconds for a ring to travel out and fade */

/* Four corners, each with the port where its spoke meets it — always the corner
   nearest the pin, so no spoke ever crosses a card. */
const SLOTS = [
  { card: [48, 52], port: [228, 170] },
  { card: [672, 52], port: [672, 170] },
  { card: [48, 450], port: [228, 450] },
  { card: [672, 450], port: [672, 450] },
];

export default function Catchment({ nodes }) {
  const still = useStill();
  const items = nodes
    .slice(0, SLOTS.length)
    .map((n, i) => ({ ...n, ...SLOTS[i], i }));

  return (
    <Stage view={VIEW} kind="catchment">
      <svg
        aria-hidden="true"
        className="fig-art"
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        fill="none"
      >
        <defs>
          {items.map((n) => (
            /* Drawn port → pin, so a traveller following it runs inward. */
            <path
              key={n.i}
              id={`catch-s${n.i}`}
              d={`M ${n.port[0]} ${n.port[1]} L ${PIN.x} ${PIN.y}`}
            />
          ))}
          <radialGradient id="catch-glow">
            <stop
              offset="0%"
              stopColor="var(--color-coral-500)"
              stopOpacity="0.16"
            />
            <stop
              offset="70%"
              stopColor="var(--color-coral-500)"
              stopOpacity="0.04"
            />
            <stop
              offset="100%"
              stopColor="var(--color-coral-500)"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        <circle cx={PIN.x} cy={PIN.y} r="250" fill="url(#catch-glow)" />

        {/* The reach. Three rings a third of a cycle apart, so there is always
            one mid-flight and the coverage reads as continuous rather than as a
            thing that happens every five seconds. */}
        {!still &&
          [0, 1, 2].map((i) => (
            <circle
              key={i}
              className="fig-ring"
              cx={PIN.x}
              cy={PIN.y}
              r="40"
              vectorEffect="non-scaling-stroke"
            >
              <animate
                attributeName="r"
                values="40;262"
                dur={`${SWEEP}s`}
                begin={`${((i * SWEEP) / 3).toFixed(2)}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0.55;0"
                keyTimes="0;0.15;1"
                dur={`${SWEEP}s`}
                begin={`${((i * SWEEP) / 3).toFixed(2)}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        {/* Something has to be there when the rings are not, or a reduced-motion
            reader gets a pin floating in space with no catchment at all. */}
        {still && (
          <>
            <circle
              className="fig-ring"
              cx={PIN.x}
              cy={PIN.y}
              r="110"
              opacity="0.4"
            />
            <circle
              className="fig-ring"
              cx={PIN.x}
              cy={PIN.y}
              r="186"
              opacity="0.26"
            />
            <circle
              className="fig-ring"
              cx={PIN.x}
              cy={PIN.y}
              r="248"
              opacity="0.14"
            />
          </>
        )}

        {items.map((n) => (
          <g key={n.i} className="fig-wire" data-i={n.i}>
            <use
              href={`#catch-s${n.i}`}
              className="fig-line"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              className="fig-port"
              cx={n.port[0]}
              cy={n.port[1]}
              r="5.5"
            />
            {!still && (
              <circle className="fig-pulse" r="4.5">
                <animateMotion
                  dur={`${5.2 + n.i * 0.7}s`}
                  repeatCount="indefinite"
                >
                  <mpath href={`#catch-s${n.i}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;0.9;0.9;0"
                  keyTimes="0;0.16;0.78;1"
                  dur={`${5.2 + n.i * 0.7}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        ))}

        {/* The pin. Solid, and the only solid object in the figure, so the eye
            lands on it before it reads a single label. */}
        <g
          transform={`translate(${PIN.x} ${PIN.y}) scale(2.6) translate(-12 -13)`}
        >
          <path
            className="fig-solid"
            d="M12 23s7.4-7 7.4-12.4a7.4 7.4 0 10-14.8 0C4.6 16 12 23 12 23z"
          />
          <circle cx="12" cy="10.6" r="2.7" fill="#fff" />
        </g>
      </svg>

      {items.map((n) => (
        <Node
          key={n.label}
          i={n.i}
          view={VIEW}
          label={n.label}
          icon={n.icon}
          box={[n.card[0], n.card[1], CARD.w, CARD.h]}
        />
      ))}
    </Stage>
  );
}
