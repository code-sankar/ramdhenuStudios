import { Node, Stage } from "./Stage";
import { useStill } from "./useStill";

/**
 * ANATOMY — six disciplines wired into one build. For the website service.
 *
 * THE CLAIM: these are not a menu. Design, front end, back end, search
 * groundwork, performance and the data layer are one object with six faces, and
 * buying four of them gets you nothing that runs. Everything terminates at the
 * same frame, and the travellers run *inward* — the work flows into the build.
 * Reverse them and the figure says the site emits six departments, which is not
 * what anyone is buying.
 *
 * The wires are orthogonal on purpose. A straight spoke reads as a relationship;
 * a right-angled run with a rounded corner reads as plumbing, which is the
 * closer metaphor for parts of one system than for six things pointing at a
 * seventh.
 */

const VIEW = { w: 1000, h: 720 };
const CARD = { w: 186, h: 132 };
const FRAME = { x: 352, y: 214, w: 296, h: 292 };

/* Every pair is symmetric about x = 500, which is worth preserving if anything
   moves: the figure reads as a system because it is balanced, and a diagram
   that is *nearly* symmetric reads as a mistake. */
const SLOTS = [
  { card: [52, 34], from: [238, 100], to: [420, FRAME.y] },
  { card: [762, 34], from: [762, 100], to: [580, FRAME.y] },
  { card: [14, 294], from: [200, 360], to: [FRAME.x, 360] },
  { card: [800, 294], from: [800, 360], to: [FRAME.x + FRAME.w, 360] },
  { card: [96, 554], from: [282, 620], to: [420, FRAME.y + FRAME.h] },
  { card: [718, 554], from: [718, 620], to: [580, FRAME.y + FRAME.h] },
];

/* Coprime-ish, and none a multiple of another, so the six only return to the
   same arrangement after their common multiple. */
const PULSE = [4.6, 5.3, 3.9, 6.1, 5.7, 4.3];

/* An L with a rounded corner: horizontal run, turn, drop. That order is what
   keeps every wire leaving its card sideways and arriving at the frame
   square-on. A level run needs no corner at all. */
function wire([x1, y1], [x2, y2], r = 15) {
  if (y1 === y2) return `M ${x1} ${y1} H ${x2}`;
  const sx = Math.sign(x2 - x1);
  const sy = Math.sign(y2 - y1);
  return `M ${x1} ${y1} H ${x2 - sx * r} Q ${x2} ${y1} ${x2} ${y1 + sy * r} V ${y2}`;
}

export default function Anatomy({ nodes }) {
  const still = useStill();
  const items = nodes
    .slice(0, SLOTS.length)
    .map((n, i) => ({ ...n, ...SLOTS[i], i }));

  return (
    <Stage view={VIEW} kind="anatomy">
      <svg
        aria-hidden="true"
        className="fig-art"
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        fill="none"
      >
        <defs>
          {items.map((n) => (
            <path key={n.i} id={`anatomy-w${n.i}`} d={wire(n.from, n.to)} />
          ))}
          <radialGradient id="anatomy-glow">
            <stop
              offset="0%"
              stopColor="var(--color-coral-500)"
              stopOpacity="0.14"
            />
            <stop
              offset="55%"
              stopColor="var(--color-coral-500)"
              stopOpacity="0.05"
            />
            <stop
              offset="100%"
              stopColor="var(--color-coral-500)"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        {/* The frame sits in a soft field, which stops it reading as one more
            card among seven. */}
        <ellipse
          cx={FRAME.x + FRAME.w / 2}
          cy={FRAME.y + FRAME.h / 2}
          rx={FRAME.w * 1.15}
          ry={FRAME.h * 1.1}
          fill="url(#anatomy-glow)"
        />

        {items.map((n) => (
          <g key={n.i} className="fig-wire" data-i={n.i}>
            <use
              href={`#anatomy-w${n.i}`}
              className="fig-line"
              vectorEffect="non-scaling-stroke"
            />
            <circle className="fig-port" cx={n.from[0]} cy={n.from[1]} r="6" />
            <circle className="fig-port" cx={n.to[0]} cy={n.to[1]} r="5" />
            {!still && (
              <circle className="fig-pulse" r="4.5">
                <animateMotion dur={`${PULSE[n.i]}s`} repeatCount="indefinite">
                  <mpath href={`#anatomy-w${n.i}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;0.9;0.9;0"
                  keyTimes="0;0.18;0.76;1"
                  dur={`${PULSE[n.i]}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        ))}

        {/* ── The build itself ──
            A browser drawn as the skeleton of a page rather than a picture of
            one: a realistic screenshot would date the moment a client's site
            changed. */}
        <g transform={`translate(${FRAME.x} ${FRAME.y})`}>
          <rect
            x="0.6"
            y="0.6"
            width={FRAME.w - 1.2}
            height={FRAME.h - 1.2}
            rx="15"
            className="fig-chrome"
            vectorEffect="non-scaling-stroke"
          />
          <g className="fig-ink">
            <circle cx="20" cy="22" r="3.6" opacity="0.5" />
            <circle cx="32" cy="22" r="3.6" opacity="0.36" />
            <circle cx="44" cy="22" r="3.6" opacity="0.24" />
            <rect x="60" y="17" width="204" height="10" rx="5" opacity="0.22" />
            <rect x="20" y="40" width="256" height="1" opacity="0.16" />
            <rect x="20" y="58" width="118" height="86" rx="7" opacity="0.2" />
            <circle cx="107" cy="82" r="10" opacity="0.34" />
            <path d="M28 132l24-30 20 24 14-16 24 22z" opacity="0.34" />
            <rect x="154" y="62" width="122" height="8" rx="4" opacity="0.3" />
            <rect x="154" y="79" width="104" height="8" rx="4" opacity="0.24" />
            <rect x="154" y="96" width="116" height="8" rx="4" opacity="0.24" />
            <rect
              x="154"
              y="118"
              width="74"
              height="20"
              rx="10"
              className="fig-solid"
            />
            {[20, 110, 200].map((x) => (
              <g key={x}>
                <rect
                  x={x}
                  y="162"
                  width="76"
                  height="92"
                  rx="8"
                  opacity="0.13"
                />
                <circle cx={x + 38} cy="188" r="10" opacity="0.26" />
                <rect
                  x={x + 14}
                  y="210"
                  width="48"
                  height="7"
                  rx="3.5"
                  opacity="0.24"
                />
                <rect
                  x={x + 22}
                  y="224"
                  width="32"
                  height="7"
                  rx="3.5"
                  opacity="0.18"
                />
              </g>
            ))}
          </g>
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
