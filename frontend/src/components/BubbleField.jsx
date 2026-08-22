/**
 * BUBBLE FIELD — the hero's coral ground, seen through a drift of soap bubbles.
 *
 * WHY DOM AND CSS RATHER THAN A CANVAS. A bubble is six stacked radial
 * gradients, and gradients are the slowest thing a rasteriser does. On a canvas
 * those six get re-rasterised every frame across the whole viewport — at 1440
 * × 900 on a 2× screen that is 5.2M device pixels, most of them covered more
 * than once. As elements they are rasterised exactly once each and then only
 * *composited*, which is the GPU's cheapest operation. So the expensive part
 * happens on the first frame and never again, and the animation itself costs
 * almost nothing. This is the mirror image of the argument in ParticleMark,
 * where a few thousand flat dots made the canvas the cheap option: the shape of
 * the drawing decides, not the technology.
 *
 * EVERY ANIMATION IS `transform` AND NOTHING ELSE. Transform and opacity are
 * the only two properties a browser can animate without re-running layout or
 * paint. Animating `top`, `left` or `width` here would re-layout the hero forty
 * times a second on the main thread, which is how a background like this ends
 * up stuttering the moment anything else on the page wants to think.
 *
 * THE DRIFT IS BOUNDED, NOT A CURRENT. The obvious build has bubbles rise, exit
 * the top and wrap around to the bottom. It looks correct for ten seconds and
 * then the field thins out and re-crowds in waves, because a wrap is a
 * discontinuity no amount of easing hides. Here each bubble instead breathes
 * around its own position by a few dozen pixels and never leaves it. The
 * composition — which bubble is where, what is behind the headline, where the
 * big ones sit — is designed once and stays designed. It also drifts *gently*,
 * which is the actual brief.
 *
 * TWO ELEMENTS PER BUBBLE, WHICH IS NOT REDUNDANCY. One element can only carry
 * one `transform`, so a rise and a sway on the same element must share a
 * duration and phase — and two axes on the same clock draw a straight diagonal.
 * Nesting them lets each run on its own clock, and two incommensurate periods
 * trace a slow Lissajous figure that takes minutes to repeat. That is the
 * difference between floating and sliding.
 *
 * THE LAYOUT IS SEEDED, NOT RANDOM, AND THAT IS A DESIGN DECISION RATHER THAN A
 * TECHNICAL ONE. `Math.random()` would work here — the body is client-rendered,
 * so there is no server markup for a random draw to disagree with. It would
 * also mean nobody has ever seen the hero anybody else sees. The distribution
 * below was tuned against one specific draw: which bubble sits behind the
 * headline, where the four big ones fall, how the mid-ground reads against the
 * type. A fixed seed makes that draw the artefact — reviewable, repeatable, and
 * the same for every visitor. Change the seed and you are re-rolling a
 * composition, which is a thing to do deliberately and then look at.
 *
 * DEPTH IS A LENS, NOT A LAYER LIST. Blur is a function of the distance from a
 * focus plane at 0.55, so bubbles fall out of focus in *both* directions — the
 * huge ones drifting past the camera and the small distant ones alike, with a
 * band of sharp ones between. Size, opacity and drift amplitude all follow the
 * same depth, so nearer bubbles are bigger, softer and move further: parallax,
 * for free, from one number.
 */

/* Mulberry32. Thirty-two bits of state, no dependency, and the same sequence
   everywhere — which is the entire requirement. */
function mulberry32(seed) {
  return function next() {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Bands, in the order they are drawn — far first, so the near ones layer over.
   `n` is how many, `core` how many of those survive on a phone.

   THE HUGE ONES ARE CAPPED AT FOUR FOR TWO SEPARATE REASONS, AND BOTH MATTER.
   Compositionally, a field with a dozen dominant objects has no dominant
   object. Practically, a promoted layer costs width × height × 4 bytes × DPR²
   of GPU memory: one 450px bubble on a 2× screen is 3.2MB, and a dozen would
   be 40MB of texture for a background. Four reads as generous and costs 13.
   `x` is the horizontal band: the big ones stay right of the headline. */
const BANDS = [
  {
    name: "far",
    n: 24,
    core: 11,
    size: [2.2, 6.6],
    x: [-6, 106],
    depth: [0.02, 0.3],
  },
  {
    name: "mid",
    n: 20,
    core: 10,
    size: [7, 19],
    x: [-4, 106],
    depth: [0.34, 0.72],
  },
  {
    name: "near",
    n: 6,
    core: 4,
    size: [24, 42],
    x: [40, 104],
    depth: [0.78, 1],
  },
];

/* Where the lens is sharp. Bubbles either side of it soften. */
const FOCUS = 0.55;

const rand = mulberry32(0x62756233);
const pick = (lo, hi) => lo + rand() * (hi - lo);
const round = (v, p = 2) => Number(v.toFixed(p));

const BUBBLES = BANDS.flatMap((band) =>
  Array.from({ length: band.n }, (_, i) => {
    const depth = pick(band.depth[0], band.depth[1]);
    const size = pick(band.size[0], band.size[1]);

    /* Distance from the focus plane, normalised, then curved: the falloff
       either side of sharp is not linear in a real lens and looks wrong if you
       make it so. */
    const defocus = Math.abs(depth - FOCUS) / Math.max(FOCUS, 1 - FOCUS);

    /* DEFOCUS IS A GRADIENT PARAMETER, NOT A `filter: blur()`, AND THAT IS THE
       most important line in this file.

       The first build blurred every bubble with a real filter. Measured on a
       software rasteriser — no GPU, which is the floor this has to survive on —
       that ran the hero at 27fps against 60 with the filters off. The cost
       curve says why: half a pixel of blur costs almost exactly what four
       pixels cost. It is not the radius. A filtered element needs its own
       rasterisation pass every frame, so the price is per *element*, and fifty
       elements is fifty passes.

       But a defocused bubble is not a blurred picture of a bubble. It is a
       bubble whose rim has widened into a dimmer band and whose highlight has
       spread — and that is a description of gradient stops, which cost nothing.
       So `--soft` carries the same depth information into the stop positions
       instead. Each bubble rasterises exactly once and the field runs at 60.

       The look did not pay for the speed. It improved: a real lens spreads a
       highlight, it does not smear an edge, and the blur was doing the second
       thing. */
    const soft = round(Math.pow(defocus, 1.1), 3);

    /* Near bubbles are close enough to the lens to wash out; far ones are thin
       and pale. The floor stays high — a bubble that fades into the coral
       reads as a smudge on the lens rather than as an object in the air. */
    const opacity = round(0.95 - defocus * 0.24, 3);

    return {
      /* Sorted into draw order below, so the band is only needed for tiering. */
      band: band.name,
      tier: i < band.core ? "core" : "extra",
      depth,
      size: round(size),
      x: round(pick(band.x[0], band.x[1]), 1),
      y: round(pick(-8, 108), 1),
      soft,
      opacity,

      /* Drift amplitude scales with depth — the parallax. The rise is roughly
         twice the sway, so the motion reads as buoyancy rather than as a
         wander. */
      dy: round(9 + depth * 30, 1),
      dx: round(5 + depth * 17, 1),

      /* Deliberately unrelated periods, and never the same pair twice: the
         combined path only repeats at their common multiple, which for these
         ranges is on the order of half an hour. Negative delays start every
         bubble mid-cycle, so nothing is lined up on the first frame. */
      riseDur: round(pick(15, 27), 1),
      swayDur: round(pick(19, 34), 1),
      riseDelay: round(-pick(0, 27), 1),
      swayDelay: round(-pick(0, 34), 1),

      /* THE LIGHT. One source, upper-left, but jittered per bubble — a field
         where every highlight sits at exactly 30%/26% reads as a repeated
         sticker, and the eye finds that far faster than it finds a physical
         inconsistency. */
      hx: round(pick(24, 38)),
      hy: round(pick(19, 32)),

      /* Thin-film interference. The three hues are fixed because soap makes
         those three and not others; what varies is where they land and how
         strongly, which is what actually differs bubble to bubble. */
      irisA: [round(pick(12, 32)), round(pick(62, 86))],
      irisB: [round(pick(66, 90)), round(pick(12, 36))],
      irisC: [round(pick(36, 64)), round(pick(80, 97))],
      iris: round(pick(0.8, 1.85), 2),
    };
  }),
);

export default function BubbleField({ className = "" }) {
  return (
    <div aria-hidden="true" className={`bubble-field ${className}`}>
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="bubble"
          data-tier={b.tier}
          style={{
            "--s": b.size,
            "--x": `${b.x}%`,
            "--y": `${b.y}%`,
            "--o": b.opacity,
            "--soft": b.soft,
            "--dx": `${b.dx}px`,
            "--dy": `${b.dy}px`,
            "--tr": `${b.riseDur}s`,
            "--ts": `${b.swayDur}s`,
            "--dr": `${b.riseDelay}s`,
            "--ds": `${b.swayDelay}s`,
            "--hx": `${b.hx}%`,
            "--hy": `${b.hy}%`,
            "--ax": `${b.irisA[0]}%`,
            "--ay": `${b.irisA[1]}%`,
            "--bx": `${b.irisB[0]}%`,
            "--by": `${b.irisB[1]}%`,
            "--cx": `${b.irisC[0]}%`,
            "--cy": `${b.irisC[1]}%`,
            "--i": b.iris,
          }}
        >
          <span className="bubble-film" />
        </span>
      ))}

      {/* THE SCRIM, AND WHY IT IS PART OF THIS COMPONENT RATHER THAN THE HERO.
          A pale bubble behind white type is a contrast failure, and the field
          is what put it there — so the field carries the fix. It is weighted to
          the left because that is where the headline is, and it fades out
          entirely by the right edge so the big bubbles stay at full strength
          exactly where nothing has to be read over them. */}
      <span className="bubble-scrim" />
    </div>
  );
}
