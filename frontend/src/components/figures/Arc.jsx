import { Node, Stage } from "./Stage";
import { useLayout } from "./useLayout";
import { useStill } from "./useStill";

/**
 * ARC — one beam in, four stages over, a spread on the far side.
 *
 * THE CLAIM: the distance between "I sent a message" and "this is live and
 * working" has a known shape, and you can see the whole of it from here. That
 * is the last thing standing between a reader and the form below it — not
 * price, which the FAQ handles, but the fear of agreeing to something with no
 * visible far end. A bow is the only shape that shows both ends at once.
 *
 * AND IT IS A BOW BECAUSE OF THE NAME. Ramdhenu is Assamese for rainbow, and
 * this is the one place on the site where that is allowed to mean something:
 * a single beam arrives, bends, and what lands on the other side is spread
 * rather than singular. Which is also the argument the rest of the site makes
 * in words — one brief in, six disciplines out — so the shape is carrying an
 * idea rather than decorating a list. The bands converge to one point at the
 * near foot and land at four separate points at the far one; that divergence
 * is the whole figure, and it survives with the motion switched off because it
 * is drawn into the geometry rather than performed by the travellers.
 *
 * THE OPENING RUN IS DASHED, and it is the most useful line in the drawing.
 * The bow is dashed while the engagement costs nothing and solid once it does,
 * so the point where money starts is a thing you can see without reading a
 * word. The two are one stroke cut in half — not two lines that could drift
 * apart — and where it is cut is worked out from the same `free` flags that
 * mark the stages in the key below. With two of four stages free the cut lands
 * on the summit; see `split`.
 *
 * BOTH GEOMETRIES SHARE `STOPS`, WHICH IS WHY THE PHONE VERSION CANNOT DRIFT.
 * A stop is a fraction along the bow, not a coordinate, so landscape and
 * portrait place their four stages from one set of four numbers and the split
 * between dashed and solid lands in the same place in both. What differs is
 * only where the cards go: on the bow when there is width for them, in a
 * column beside it when there is not — four 186-unit cards on an arc need
 * horizontal room the arc itself has already spent on a phone.
 */

/* Fraction along the bow, from the near foot. Shared by both layouts, and
   deliberately not evenly spaced. Pushed out to 0.14 and 0.86, the outer two
   cards sit low enough on the curve to clear the inner two vertically; pulled
   in to 0.35 and 0.65, the inner two leave 119 units of daylight at the top,
   which is what the crest is seen through. Evenly spaced they do neither: the
   pair either side of the summit close up into one block and the drawing loses
   the only point on it that means anything. */
const STOPS = [0.14, 0.35, 0.65, 0.86];

/* Spelled, not printed: the dimension's value is set in the same small caps as
   every other annotation on the drawing, and a numeral in a line of caps reads
   as a quantity being measured rather than as a count of stages. Indexed by how
   many stages are free, so it needs one more entry than there are stops. */
const COUNT = ["no", "one", "two", "three", "four"];

const TRIP = 9; /* seconds, beam and bow together */
const ENTRY = 0.22; /* the fraction of it the beam gets */

/* Four bands, fanning. Each springs from the same near foot and lands further
   out than the last, so `i` is both the band's index and how far it travels. */
const BANDS = 4;

/* THE VIEW IS CUT TO THE DRAWING, WHICH IS THE ONE MEASUREMENT WORTH BEING
   FUSSY ABOUT. `Stage` takes its aspect ratio from `view`, so every unit of
   empty box below the ground labels is real whitespace on the page between the
   figure and its caption — and a caption 80px adrift of the thing it captions
   reads as an unrelated sentence. Both heights end a little under the last
   label and nowhere else. */
const LAYOUTS = {
  wide: {
    view: { w: 1000, h: 524 },
    card: { w: 186, h: 132 },
    axis: "x",
    /* The baseline the bow stands on, and the run of it the beam arrives
       along. `at` is the line's fixed coordinate; the rest is its extent. */
    ground: { at: 460, from: 48, to: 952 },
    foot: 168,
    band: { rx: 336, ry: 306, dx: 14, dy: 30 },
    /* Where the two ground labels sit, in view units: [x, y, w]. */
    labels: { start: [48, 486, 260], end: [700, 486, 252] },
    /* A DIMENSION UNDER THE FREE RUN, WHICH IS LANDSCAPE'S ALONE. The bow
       encloses a lot of nothing on a laptop — the cards sit up on its
       shoulders and the ground is 60 units below them — and an empty half is
       an argument for making the figure smaller unless something is put in it.
       What goes in it is the drawing convention this whole design system is
       built on: a measured span, ticked at both ends, saying what the stretch
       it covers costs. Portrait has no such gap to fill and no width to spend,
       so it does without and loses nothing the dashes were not already
       saying. `y` is the line; the tick reaches `t` either side of it, and
       `drop` is how far under the summit the extension line starts. */
    measure: { y: 416, t: 8, label: 428, drop: 12 },
    column: null,
  },
  narrow: {
    view: { w: 600, h: 1216 },
    card: { w: 230, h: 170 },
    axis: "y",
    ground: { at: 88, from: 56, to: 1160 },
    foot: 120,
    band: { rx: 215, ry: 420, dx: 10, dy: 28 },
    labels: { start: [116, 44, 340], end: [116, 1148, 400] },
    measure: null,
    /* A phone has no room for cards on the curve, so they stack beside it and
       reach back to their stop with a stem. THE COLUMN'S LEFT EDGE IS WHAT CAPS
       THE BOW: the outermost band bulges to `ground.at + rx + 3·dx`, and past
       350 that crest arrives underneath the cards. The bow is flatter here than
       it is on a laptop for that reason and no other — portrait spends on the
       labels the width the curve would rather have. */
    column: { x: 350, w: 230 },
  },
};

/** Band `i`: its two radii and the centre it turns about. */
const bandOf = (L, i) => {
  const rx = L.band.rx + i * L.band.dx;
  const ry = L.band.ry + i * L.band.dy;
  const horizontal = L.axis === "x";
  return {
    rx,
    ry,
    /* The centre sits one radius along the baseline from the foot, which is
       what makes every band pass through the foot exactly. */
    cx: horizontal ? L.foot + rx : L.ground.at,
    cy: horizontal ? L.ground.at : L.foot + ry,
    horizontal,
  };
};

/**
 * A point `u` of the way along a band, `u` running 0 at the near foot to 1 at
 * the far one. It is the arc-length fraction to within a percent at these
 * radii, which is why the same number can place a card and time a traveller.
 */
const pointAt = (b, u) => {
  const t = Math.PI * u;
  return b.horizontal
    ? [b.cx - b.rx * Math.cos(t), b.cy - b.ry * Math.sin(t)]
    : [b.cx + b.rx * Math.sin(t), b.cy - b.ry * Math.cos(t)];
};

/**
 * The stretch of a band between two stops, as a path.
 *
 * THE LARGE-ARC FLAG IS ALWAYS 0 AND HAS TO BE. A whole band is a half turn, so
 * no stretch of one can exceed 180° and the minor arc is always the one meant.
 * Setting it from the fraction instead — which looks reasonable, since a run
 * covering 0.65 of a band covers more than half of it — asks for the *other*
 * way round the ellipse, and the closing run comes back as a 249° sweep that
 * leaves the frame entirely. It is 0 because of what a band is, not because of
 * how much of one a run covers.
 */
const arcPath = (b, from, to) => {
  const [x1, y1] = pointAt(b, from);
  const [x2, y2] = pointAt(b, to);
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${b.rx} ${b.ry} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
};

/** A run along the baseline, whichever way the baseline lies. */
const linePath = (L, from, to) =>
  L.axis === "x"
    ? `M ${from} ${L.ground.at} H ${to}`
    : `M ${L.ground.at} ${from} V ${to}`;

export default function Arc({ nodes, foot, commitAt = 0 }) {
  const still = useStill();
  const L = LAYOUTS[useLayout()];
  /**
   * Where the stroke stops being dashed.
   *
   * IT IS THE MIDPOINT BETWEEN THE LAST FREE STAGE AND THE FIRST PAID ONE, NOT
   * THE PAID ONE ITSELF, and with two free stages of four that puts it exactly
   * on the crest. Which is the truth of it: nothing is owed at the second stage
   * and something is owed at the third, so the moment it changes is the stretch
   * between them — and the summit, the one point on a bow the eye goes to
   * unprompted, turns out to be the one point in the engagement worth marking.
   * Landing the notation there is arithmetic rather than luck, but it is why
   * the stops are spaced to leave the top of the drawing clear.
   *
   * The two ends are real cases, not defensive padding: no free stage at all
   * gives a solid bow, every stage free gives a dashed one.
   */
  const split =
    commitAt < 0
      ? 1
      : commitAt === 0
        ? 0
        : (STOPS[commitAt - 1] + STOPS[Math.min(commitAt, STOPS.length - 1)]) / 2;
  const bands = Array.from({ length: BANDS }, (_, i) => bandOf(L, i));
  const lead = bands[0];

  const items = nodes.slice(0, STOPS.length).map((n, i) => {
    const [x, y] = pointAt(lead, STOPS[i]);
    return { ...n, i, port: [x, y] };
  });

  /* Where each band comes to rest. The near foot is one point for all four;
     these are four, and the gap between them is the figure's argument. */
  const landings = bands.map((b) => pointAt(b, 1));

  /* The summit — where the stroke changes, where the dimension ends, and where
     its extension line comes down from. Read off the bow rather than given its
     own numbers, so the three cannot part company when the stops move. */
  const [splitX, splitY] = pointAt(lead, split);

  const pct = {
    x: (v) => `${((v / L.view.w) * 100).toFixed(3)}%`,
    y: (v) => `${((v / L.view.h) * 100).toFixed(3)}%`,
  };

  /** Where a card sits: centred on its stop, or out in the column. */
  const boxOf = (n) =>
    L.column
      ? [L.column.x, n.port[1] - L.card.h / 2, L.column.w, L.card.h]
      : [n.port[0] - L.card.w / 2, n.port[1] - L.card.h / 2, L.card.w, L.card.h];

  return (
    <Stage view={L.view} kind="arc">
      <svg
        aria-hidden="true"
        className="fig-art"
        viewBox={`0 0 ${L.view.w} ${L.view.h}`}
        fill="none"
      >
        <defs>
          {/* Unstroked, and only ever followed: the travellers ride the same
              curve the two visible runs are cut from, so a dashed opening and
              a solid close can never disagree about where the bow is. */}
          {bands.map((b, i) => (
            <path key={i} id={`arc-b${i}`} d={arcPath(b, 0, 1)} />
          ))}
          <path id="arc-beam" d={linePath(L, L.ground.from, L.foot)} />
        </defs>

        {/* NO GRADIENT FIELD, WHICH IS THE ONE PLACE THIS FIGURE BREAKS WITH
            THE OTHERS. The hub and the catchment sit in a soft radial wash
            because each has a single subject at a single point to light. A bow
            has no centre — it is 670 units of curve and a gap — so the same
            ellipse lands as a pink stain under the cards with nothing beneath
            it to justify itself. The drawing is lifted with a drop-shadow on
            the art instead (coral.css), which lights the strokes rather than
            the space between them. */}
        {/* ── The ground, and the beam arriving along it ── */}
        <path
          className="fig-ground"
          vectorEffect="non-scaling-stroke"
          d={linePath(L, L.ground.from, L.ground.to)}
        />
        <use href="#arc-beam" className="fig-line" vectorEffect="non-scaling-stroke" />

        {/* ── The fan ──
            Drawn faintest first so the lead band, which carries the stages, is
            the one the eye settles on. */}
        {bands.slice(1).map((b, i) => (
          <path
            key={i}
            className="fig-band"
            vectorEffect="non-scaling-stroke"
            opacity={(0.34 - i * 0.09).toFixed(2)}
            d={arcPath(b, 0, 1)}
          />
        ))}

        {/* ── The lead band, cut in two at the point it starts costing money ──
            Heavier than the fan behind it: four arcs of the same weight is a
            texture, and the one carrying the stages has to read as the line the
            others are spreading away from. */}
        <path
          className="fig-line fig-lead fig-tentative"
          vectorEffect="non-scaling-stroke"
          d={arcPath(lead, 0, split)}
        />
        <path
          className="fig-line fig-lead"
          vectorEffect="non-scaling-stroke"
          d={arcPath(lead, split, 1)}
        />

        {/* ── The stages ──
            In the column layout each card reaches back to its own stop, which
            is the only thing keeping four boxes in a stack attached to a curve
            they are no longer sitting on. */}
        {items.map((n) => (
          <g key={n.i} className="fig-wire" data-i={n.i}>
            {L.column && (
              <path
                className="fig-line"
                vectorEffect="non-scaling-stroke"
                d={`M ${n.port[0].toFixed(1)} ${n.port[1].toFixed(1)} H ${L.column.x}`}
              />
            )}
            <circle className="fig-port" cx={n.port[0]} cy={n.port[1]} r="6">
              {/* Flares as the traveller reaches it. The time is read off the
                  stop itself, so a stage moved along the bow keeps its cue. */}
              {!still && (
                <animate
                  attributeName="r"
                  values="12;6;6"
                  keyTimes="0;0.08;1"
                  dur={`${TRIP}s`}
                  begin={`${(TRIP * (ENTRY + (1 - ENTRY) * STOPS[n.i])).toFixed(2)}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          </g>
        ))}

        {/* ── The measured span ──
            From the near foot to directly under the summit: exactly the
            stretch drawn dashed, so the dimension and the dash are two
            readings of one fact rather than two facts to keep in step. Both
            end where `split` does. */}
        {L.measure && split > 0 && (
          <path
            className="fig-measure-line"
            vectorEffect="non-scaling-stroke"
            d={
              `M ${L.foot} ${L.measure.y - L.measure.t} V ${L.measure.y + L.measure.t} ` +
              `M ${L.foot} ${L.measure.y} H ${splitX.toFixed(1)} ` +
              `M ${splitX.toFixed(1)} ${L.measure.y - L.measure.t} V ${L.measure.y + L.measure.t}`
            }
          />
        )}

        {/* THE EXTENSION LINE IS WHAT MAKES THE ABOVE A DIMENSION RATHER THAN AN
            UNDERLINE. Without it the measure is a stray rule near the ground and
            the summit is a dot in a gap; with it they are the same vertical, and
            the daylight the two top cards leave stops reading as a gap and
            starts reading as the axis the whole figure turns on. It only fits
            because that gap was sized for it — see STOPS.

            IT IS THE LIGHTEST STROKE IN THE FIGURE, which is not a hedge. On a
            drawing an extension line exists to be followed and then forgotten;
            at the weight of the dimension it annotates it stops pointing at the
            summit and starts dividing the bow into two halves. */}
        {L.measure && split > 0 && (
          <path
            className="fig-extension"
            vectorEffect="non-scaling-stroke"
            d={`M ${splitX.toFixed(1)} ${(splitY + L.measure.drop).toFixed(1)} V ${L.measure.y - L.measure.t}`}
          />
        )}

        {/* The summit, and the only mark on the bow that is not a stage: it is
            where the drawing changes stroke, so it is where the engagement
            starts costing money. Drawn after the runs so it caps them both. */}
        {split > 0 && split < 1 && (
          <circle
            className="fig-port"
            cx={splitX}
            cy={splitY}
            r="5"
          />
        )}

        {/* ── Where it lands ──
            Four marks, and the space between them is the point: what comes
            back from one brief is not one thing. They are drawn whether or not
            anything is moving, so the claim does not depend on the animation. */}
        {landings.map(([x, y], i) => (
          <circle
            key={i}
            className="fig-solid"
            cx={x}
            cy={y}
            r={i === 0 ? 6 : 5}
            opacity={(1 - i * 0.16).toFixed(2)}
          />
        ))}

        {/* The near foot. One mark, solid, because one message is all it is. */}
        <circle
          className="fig-solid"
          cx={L.axis === "x" ? L.foot : L.ground.at}
          cy={L.axis === "x" ? L.ground.at : L.foot}
          r="7"
        />

        {/* ── The travellers ──
            One arrives along the beam and hands over to four that leave the
            foot together and land apart. They share a cycle and a duration, so
            the fan opening is the paths diverging rather than four dots timed
            to look as though they do. `keyPoints` is what parks each one until
            its turn: motion is only spent on the stretch of the cycle it owns. */}
        {!still && (
          <>
            <circle className="fig-pulse" r="4.6">
              <animateMotion
                dur={`${TRIP}s`}
                repeatCount="indefinite"
                calcMode="linear"
                keyPoints="0;1;1"
                keyTimes={`0;${ENTRY};1`}
              >
                <mpath href="#arc-beam" />
              </animateMotion>
              <animate
                attributeName="opacity"
                dur={`${TRIP}s`}
                repeatCount="indefinite"
                values="0;0.9;0.9;0;0"
                keyTimes={`0;0.05;${(ENTRY - 0.03).toFixed(2)};${ENTRY};1`}
              />
            </circle>

            {bands.map((_, i) => (
              <circle key={i} className="fig-pulse" r={i === 0 ? 4.6 : 3.6}>
                <animateMotion
                  dur={`${TRIP}s`}
                  repeatCount="indefinite"
                  calcMode="linear"
                  keyPoints="0;0;1"
                  keyTimes={`0;${ENTRY};1`}
                >
                  <mpath href={`#arc-b${i}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  dur={`${TRIP}s`}
                  repeatCount="indefinite"
                  values={`0;0;${(0.9 - i * 0.15).toFixed(2)};${(0.9 - i * 0.15).toFixed(2)};0`}
                  keyTimes={`0;${ENTRY};${(ENTRY + 0.05).toFixed(2)};0.93;1`}
                />
              </circle>
            ))}
          </>
        )}
      </svg>

      {/* The two ends, named. Real text rather than SVG <text>: they wrap, they
          respond to the reader's font size, and they are the only words in the
          figure that are not on a card. */}
      {["start", "end"].map((end) => {
        const [x, y, w] = L.labels[end];
        return (
          <p
            key={end}
            className="fig-foot"
            data-end={end}
            style={{ left: pct.x(x), top: pct.y(y), width: pct.x(w) }}
          >
            {foot?.[end]}
          </p>
        );
      })}

      {/* What the measured span costs, which is nothing — the one fact on this
          page most likely to move somebody, set where a dimension's value goes
          on a drawing. `free` counts the stages rather than naming a number, so
          it cannot outlive the copy it describes. */}
      {L.measure && split > 0 && (
        <p
          className="fig-measure"
          style={{
            left: pct.x(L.foot),
            top: pct.y(L.measure.label),
            width: pct.x(splitX - L.foot),
          }}
        >
          {COUNT[commitAt]} {commitAt === 1 ? "stage" : "stages"}, no charge
        </p>
      )}

      {items.map((n) => (
        <Node
          key={n.label}
          i={n.i}
          view={L.view}
          label={n.label}
          icon={n.icon}
          box={boxOf(n)}
        />
      ))}
    </Stage>
  );
}
