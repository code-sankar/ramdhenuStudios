import { useReducedMotion } from "motion/react";

/**
 * ANATOMY — what a website is actually made of, drawn as a system.
 *
 * WHY THIS EARNS ITS PLACE ON THE SERVICE PAGE AND WOULD NOT ON THE HOME PAGE.
 * The prose above it says what we build. It cannot easily say that the six
 * things a website needs are not a menu you pick from — that the design, the
 * front end, the back end, the search groundwork, the performance work and the
 * data layer are one object with six faces, and buying four of them gets you
 * nothing that runs. A diagram says that in one glance, because the wires are
 * the argument: everything terminates at the same frame.
 *
 * THE GEOMETRY IS ONE COORDINATE SPACE, USED TWICE. The wires are SVG and the
 * cards are HTML — the wires because they are drawing, the cards because their
 * labels are content and text belongs in text. Those two have to line up to the
 * pixel at every width, which is normally where a diagram like this falls
 * apart: an SVG scales by its viewBox and a div scales by its container, and
 * the two agree at exactly one size.
 *
 * They agree at all sizes here because the stage has a locked aspect ratio. Once
 * width and height are tied together, a percentage of the stage and a unit of
 * the viewBox are the same distance, so both layers are generated from the one
 * `SLOTS` table below — the card gets `left: 5.2%`, the wire gets `M 238 …`, and
 * neither can drift from the other without someone editing the table.
 *
 * THE MOTION IS SIGNAL, NOT DECORATION. A dot travels each wire from its
 * discipline into the frame, on unrelated periods so the six never pulse
 * together. That direction is the whole point: the work flows into the build.
 * Reverse it and the diagram says the site emits six departments, which is not
 * what anyone is buying. Under `prefers-reduced-motion` the travellers are not
 * rendered at all — SMIL ignores the CSS that flattens the rest of the site's
 * animation, so it has to be switched off in JavaScript.
 *
 * HOVER IS CSS, NOT STATE, AND THAT IS A PERFORMANCE DECISION. Highlighting a
 * wire when its card is hovered is `:has()` in the stylesheet. Doing it with
 * `useState` — which is the obvious build, and what Orbit does — re-renders the
 * whole subtree on every mouse move between cards. Nothing is hidden behind the
 * hover, so there is no keyboard equivalent to provide: it re-states what the
 * wire already shows rather than revealing anything.
 */

/* One row per position, in reading order: top pair, middle pair, bottom pair.
   Units are the 1000 × 720 viewBox; the CSS percentages are derived from these
   at render, so this table is the single source for both layers.

   `card` is the box. `from` is where its wire leaves it, `to` where the wire
   meets the frame. Every pair is symmetric about x = 500, which is worth
   preserving if you move anything: the figure reads as a system because it is
   balanced, and a diagram that is nearly symmetric looks like a mistake. */
const CARD = { w: 186, h: 132 };
const FRAME = { x: 352, y: 214, w: 296, h: 292 };

const SLOTS = [
  { card: [52, 34], from: [238, 100], to: [420, FRAME.y] },
  { card: [762, 34], from: [762, 100], to: [580, FRAME.y] },
  { card: [14, 294], from: [200, 360], to: [FRAME.x, 360] },
  { card: [800, 294], from: [800, 360], to: [FRAME.x + FRAME.w, 360] },
  { card: [96, 554], from: [282, 620], to: [420, FRAME.y + FRAME.h] },
  { card: [718, 554], from: [718, 620], to: [580, FRAME.y + FRAME.h] },
];

/* Coprime-ish, and none of them a multiple of another: the six travellers only
   return to the same arrangement after their common multiple, which is long
   enough that the figure never reads as a loop. */
const PULSE = [4.6, 5.3, 3.9, 6.1, 5.7, 4.3];

const VIEW = { w: 1000, h: 720 };
const pctX = (v) => `${((v / VIEW.w) * 100).toFixed(3)}%`;
const pctY = (v) => `${((v / VIEW.h) * 100).toFixed(3)}%`;

/* An L with a rounded corner. Horizontal run first, then the turn, then the
   drop — which is the order that keeps every wire leaving its card sideways and
   arriving at the frame square-on, the two things that make a diagram read as
   plumbing rather than as string. A straight run needs no corner at all. */
function wire([x1, y1], [x2, y2], r = 15) {
  if (y1 === y2) return `M ${x1} ${y1} H ${x2}`;
  const sx = Math.sign(x2 - x1);
  const sy = Math.sign(y2 - y1);
  return `M ${x1} ${y1} H ${x2 - sx * r} Q ${x2} ${y1} ${x2} ${y1 + sy * r} V ${y2}`;
}

/* The six glyphs, drawn here rather than added to Icon.jsx. That file documents
   itself as the Lucide set the site actually uses, and six one-off diagram
   marks would dilute it into a sprite sheet. Same geometry as the rest of the
   system though — 24px box, 1.5 stroke, round caps. */
const GLYPHS = {
  design: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="15" width="6" height="6" rx="1.5" />
      <rect x="15" y="3" width="6" height="6" rx="1.5" />
      <path d="M13 13l8 3.2-3.4 1.3L16.3 21z" />
    </>
  ),
  frontend: (
    <>
      <path d="M8.5 8.5L5 12l3.5 3.5" />
      <path d="M15.5 8.5L19 12l-3.5 3.5" />
      <path d="M13.4 5.5l-2.8 13" />
    </>
  ),
  backend: (
    <>
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M7 7h.01M7 17h.01" />
    </>
  ),
  seo: (
    <>
      <path d="M12 3l7 3v5.5c0 4.2-2.9 7.6-7 8.5-4.1-.9-7-4.3-7-8.5V6z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  performance: (
    <>
      <path d="M4.2 17a9 9 0 1115.6 0" />
      <path d="M12 13.5l4-4" />
      <circle cx="12" cy="14.4" r="1.4" />
    </>
  ),
  data: (
    <>
      <ellipse cx="8.5" cy="5.4" rx="5" ry="2.4" />
      <path d="M3.5 5.4v7c0 1.33 2.24 2.4 5 2.4s5-1.07 5-2.4v-7" />
      <path d="M13.5 8.6h2.6a1.8 1.8 0 001.8-1.8V6.2" />
      <path d="M13.5 12.4h2.6a1.8 1.8 0 011.8 1.8v.6" />
      <circle cx="17.9" cy="4.6" r="1.6" />
      <circle cx="17.9" cy="16.4" r="1.6" />
    </>
  ),
};

export default function Anatomy({ nodes }) {
  const reduced = useReducedMotion();
  if (!nodes?.length) return null;

  const items = nodes
    .slice(0, SLOTS.length)
    .map((node, i) => ({ ...node, ...SLOTS[i], i }));

  return (
    <div className="anatomy">
      {/* ── The stage ──
          Aspect-locked, so the wires and the cards share one coordinate space.
          Below lg it stops being a stage at all: the wires are meaningless in a
          single column, so they go, and the six become an honest grid under the
          frame. See coral.css §8. */}
      <div className="anatomy-stage">
        {/* The wires, the travellers and the endpoint dots. Decorative — every
            word in the figure is in the cards, which are real text. */}
        <svg
          aria-hidden="true"
          className="anatomy-wires"
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

          {/* The frame sits in a soft field, which is what stops it reading as
              one more card among seven. */}
          <ellipse
            cx={FRAME.x + FRAME.w / 2}
            cy={FRAME.y + FRAME.h / 2}
            rx={FRAME.w * 1.15}
            ry={FRAME.h * 1.1}
            fill="url(#anatomy-glow)"
          />

          {items.map((n) => (
            <g key={n.i} className="anatomy-wire" data-i={n.i}>
              <use
                href={`#anatomy-w${n.i}`}
                className="anatomy-line"
                vectorEffect="non-scaling-stroke"
              />
              {/* Both ends terminate in a dot. A wire that just stops looks
                  unfinished; a wire that lands on a node looks connected. */}
              <circle
                className="anatomy-port"
                cx={n.from[0]}
                cy={n.from[1]}
                r="6"
              />
              <circle
                className="anatomy-port"
                cx={n.to[0]}
                cy={n.to[1]}
                r="5"
              />

              {!reduced && (
                <circle className="anatomy-pulse" r="4.5">
                  <animateMotion
                    dur={`${PULSE[n.i]}s`}
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href={`#anatomy-w${n.i}`} />
                  </animateMotion>
                  {/* Fades up off the card and down into the frame, so the
                      traveller arrives rather than vanishing mid-air. */}
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
        </svg>

        {/* ── The build itself ──
            A browser, drawn as the skeleton of a page rather than a picture of
            one: this is the thing the six disciplines are assembling, and a
            realistic screenshot would date the moment a client's site changed. */}
        <svg
          aria-hidden="true"
          className="anatomy-frame"
          viewBox="0 0 296 292"
          fill="none"
        >
          <rect
            x="0.6"
            y="0.6"
            width="294.8"
            height="290.8"
            rx="15"
            className="anatomy-chrome"
            vectorEffect="non-scaling-stroke"
          />
          <g className="anatomy-ink">
            <circle cx="20" cy="22" r="3.6" opacity="0.5" />
            <circle cx="32" cy="22" r="3.6" opacity="0.36" />
            <circle cx="44" cy="22" r="3.6" opacity="0.24" />
            <rect x="60" y="17" width="204" height="10" rx="5" opacity="0.22" />
            <rect x="20" y="40" width="256" height="1" opacity="0.16" />

            {/* hero block */}
            <rect x="20" y="58" width="118" height="86" rx="7" opacity="0.2" />
            <circle cx="107" cy="82" r="10" opacity="0.34" />
            <path d="M28 132l24-30 20 24 14-16 24 22z" opacity="0.34" />

            {/* copy + action */}
            <rect x="154" y="62" width="122" height="8" rx="4" opacity="0.3" />
            <rect x="154" y="79" width="104" height="8" rx="4" opacity="0.24" />
            <rect x="154" y="96" width="116" height="8" rx="4" opacity="0.24" />
            <rect
              x="154"
              y="118"
              width="74"
              height="20"
              rx="10"
              className="anatomy-cta"
            />

            {/* the three-up below the fold */}
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
        </svg>

        {/* ── The six ── */}
        {items.map((n) => (
          <div
            key={n.label}
            className="anatomy-node"
            data-i={n.i}
            style={{
              left: pctX(n.card[0]),
              top: pctY(n.card[1]),
              width: pctX(CARD.w),
              height: pctY(CARD.h),
            }}
          >
            <span className="anatomy-badge" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                strokeWidth="1.5"
              >
                {GLYPHS[n.icon] ?? GLYPHS.design}
              </svg>
            </span>
            <span className="anatomy-label">{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
