import { useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "motion/react";

import ParticleMark from "./ParticleMark";
import Reveal from "./Reveal";
import SectionIndex from "./ui/SectionIndex";
import { servicePath } from "../data/seo";
import { services } from "../data/services";
import { brand } from "../data/site";

/**
 * ORBIT — the six disciplines drawn as one system.
 *
 * WHY THIS SITS DIRECTLY UNDER THE SERVICES GRID, SHOWING THE SAME SIX.
 * The grid answers "what do you sell". It cannot answer "why buy them from one
 * place", because a list is six separate things by construction — the format
 * itself argues against the pitch. This is the same six read spatially: one
 * centre, one set of orbits, everything turning around the same brief. It is
 * the argument the grid cannot make, made in the one medium that can.
 *
 * THE GEOMETRY IS NOT DECORATION. Six nodes sit evenly around a circle and
 * three ellipses share that circle, each rotated so its long axis lands
 * exactly on one opposing pair. Every node is therefore the tip of an orbit
 * and no ellipse is floating — which is the difference between a diagram and
 * a doodle, and it is why the layout is computed rather than drawn by hand.
 * Change `services.js` and the whole figure re-solves itself.
 *
 * THE READ-OUT UNDER IT is the mega-menu's trick, and it is here for the same
 * reason: hovering a node explains the node. Without it a visitor gets a
 * pretty shape and six words. The default state names the centre rather than
 * sitting empty, so it reads as a caption on a touch device that will never
 * hover anything.
 *
 * MOTION. Three bubbles travel the orbits on coprime durations (17/23/29s) so
 * the figure never resolves into a repeating pose, and the mark at the centre
 * is the hero's own bubble cloud on a lighter palette. Everything else holds
 * still. Under `prefers-reduced-motion` the travellers are not rendered at all
 * — SMIL ignores the CSS that flattens the rest of the site's animation, so
 * this one has to be switched off in JavaScript.
 *
 * SIZING RUNS OFF ONE VARIABLE. `--orbit-r` is the node radius, and the
 * ellipses, the sphere, the mark and every label position are expressed
 * against it — so the figure is retuned for a 360px phone by changing one
 * number rather than eight.
 *
 * IT IS A LENGTH RATHER THAN A PERCENTAGE, WHICH IS NOT A DETAIL. A percentage
 * resolves against the container's width in `left` and against its height in
 * `top`, so a percentage radius is only a circle while the stage is exactly
 * square — and a square stage wastes a sixth of its height on nothing, because
 * the figure is only as tall as the ring plus two labels. A `clamp()` in
 * pixels stays a circle at any stage shape, which lets the stage be exactly as
 * tall as the figure needs.
 */

/* Degrees. The first discipline sits at the top and the rest run clockwise. */
const START = -90;
const STEP = 360 / services.length;

/* One ellipse per opposing pair, so all six nodes are an orbit's tip.
   Durations are deliberately coprime — on 18/24/30 the three travellers meet
   at the same three points every 360 seconds, and the eye finds that. */
const ORBITS = Array.from({ length: Math.floor(services.length / 2) }, (_, i) => ({
  rot: START + i * STEP,
  dur: `${17 + i * 6}s`,
  lead: i === 0,
}));

/* A full ellipse as a path rather than <ellipse>: <mpath> is only specified to
   follow a <path>, and the travellers ride the same geometry the stroke draws
   rather than a second copy of it that could drift.

   THE MINOR AXIS IS 108, NOT 76, AND THAT IS THE WHOLE COMPOSITION. An ellipse
   passes its own centre at exactly the minor radius, so a flatter ring is a
   ring that cuts through the middle of the figure — at 76 the bold orbit ran
   straight across the monogram and the two fought each other. 108 puts every
   waist at 0.54 of the node radius, outside the glyph and inside the sphere,
   which is the band where an orbit reads as passing behind something. */
const ORBIT_PATH = "M 0,200 A 200,108 0 1,0 400,200 A 200,108 0 1,0 0,200";

/* `calc()` will not take a leading minus inside a product on every engine, so
   the sign is folded into the operator instead of the coefficient. */
const at = (k) => `calc(50% ${k < 0 ? "-" : "+"} ${Math.abs(k).toFixed(4)} * var(--orbit-r))`;

/* Where a label goes relative to its node. The top and bottom nodes centre
   theirs above and below; everything else pushes it outward, away from the
   figure, so no label ever crosses an orbit. */
const LABEL_SIDE = {
  top: "bottom-[calc(100%-4px)] left-1/2 -translate-x-1/2 text-center",
  bottom: "top-[calc(100%-4px)] left-1/2 -translate-x-1/2 text-center",
  right: "left-[calc(100%-2px)] top-1/2 -translate-y-1/2 text-left",
  left: "right-[calc(100%-2px)] top-1/2 -translate-y-1/2 text-right",
};

const NODES = services.map((service, i) => {
  const deg = START + i * STEP;
  const rad = (deg * Math.PI) / 180;
  const cx = Math.cos(rad);
  const cy = Math.sin(rad);
  /* Rounded before the comparison: cos(-90°) is 6.1e-17, not 0, and an
     unrounded test would send the top label off to the right. */
  const flat = Math.abs(cx) < 0.001;
  return {
    service,
    left: at(cx),
    top: at(cy),
    side: flat ? (cy < 0 ? "top" : "bottom") : cx > 0 ? "right" : "left",
  };
});

export default function Orbit() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(null);
  const shown = active === null ? null : services[active];

  return (
    <section id="how-it-fits" className="section-y overflow-hidden bg-white">
      <div className="shell">
        <Reveal>
          <SectionIndex num="03" label="How it fits together" />
        </Reveal>

        <Reveal className="mb-[clamp(12px,2vw,24px)] max-w-[640px]">
          <h2 className="display mb-3 text-[clamp(32px,4vw,52px)]">Six disciplines, one centre</h2>
          <p className="text-muted m-0 text-base">
            Bought from six different suppliers, these six drift apart — the photographs do not
            match the site, and the ads point at a page the branding never agreed to. Run off one
            brief, by one team, they compound instead.
          </p>
        </Reveal>

        {/* ── The figure ──
            A square stage so the node circle stays a circle at every width,
            and one radius variable driving everything inside it. */}
        <Reveal delay={0.08} variant="fade">
          <div
            onMouseLeave={() => setActive(null)}
            className="relative mx-auto h-[calc(2*var(--orbit-r)+112px)] w-full [--orbit-r:clamp(92px,24vw,252px)]"
          >
            {/* The glow the sphere sits in. Blurred well past its own edge, so
                the field has no visible boundary to give the trick away. */}
            <div
              aria-hidden="true"
              className="orbit-glow absolute top-1/2 left-1/2 h-[calc(2.1*var(--orbit-r))] w-[calc(2.1*var(--orbit-r))] -translate-x-1/2 -translate-y-1/2 rounded-full"
            />

            {/* The sphere. A single off-centre highlight is what separates a
                sphere from a circle; the rest is one radial ramp. */}
            <div
              aria-hidden="true"
              className="orbit-sphere absolute top-1/2 left-1/2 h-[calc(1.5*var(--orbit-r))] w-[calc(1.5*var(--orbit-r))] -translate-x-1/2 -translate-y-1/2 rounded-full"
            />

            {/* The mark, inside the sphere: the hero's bubble cloud, repainted
                for a light ground. Coral reads as the body of it and white as
                the light catching the near side, over a frosted silhouette
                that holds the glyph's edges where the bubbles thin out. */}
            <ParticleMark
              colors={["#c4331f", "#e8492f", "#ffffff"]}
              silhouette={{ color: "#ffffff", alpha: 0.5 }}
              fit={0.94}
              className="pointer-events-none absolute top-1/2 left-1/2 h-[calc(1.12*var(--orbit-r))] w-[calc(1.12*var(--orbit-r))] -translate-x-1/2 -translate-y-1/2 sm:h-[calc(0.98*var(--orbit-r))] sm:w-[calc(0.98*var(--orbit-r))]"
            />

            {/* The orbits. `overflow-visible` because the stroke and the
                travellers sit exactly on the box edge, and the default would
                shave both. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 400 400"
              className="absolute top-1/2 left-1/2 h-[calc(2*var(--orbit-r))] w-[calc(2*var(--orbit-r))] -translate-x-1/2 -translate-y-1/2 overflow-visible"
            >
              <defs>
                <path id="orbit-ring" d={ORBIT_PATH} vectorEffect="non-scaling-stroke" />
              </defs>
              {ORBITS.map((orbit) => (
                <g key={orbit.rot} transform={`rotate(${orbit.rot} 200 200)`}>
                  <use
                    href="#orbit-ring"
                    fill="none"
                    stroke="var(--color-coral-500)"
                    strokeOpacity={orbit.lead ? 0.55 : 0.2}
                    strokeWidth={orbit.lead ? 1.4 : 1}
                  />
                  {/* One bubble making the round trip. Drawn last so it passes
                      over the other rings rather than under them. */}
                  <circle r="3.6" fill="var(--color-coral-500)" fillOpacity="0.85">
                    {!reduced && (
                      <animateMotion dur={orbit.dur} repeatCount="indefinite">
                        <mpath href="#orbit-ring" />
                      </animateMotion>
                    )}
                  </circle>
                </g>
              ))}
            </svg>

            {/* ── The nodes ──
                Real links, so the figure is navigable by keyboard and each
                node is a route rather than a label. The hit area is 44px even
                though the dot is 9px — the dot is the drawing, not the target
                — and it is written as `h-[44px]`, not `h-11`, because this
                project seeds Tailwind's spacing at 3.4px to match the Industry
                scale: `h-11` is 37px here, which is under the floor. */}
            {NODES.map(({ service, left, top, side }, i) => (
              <Link
                key={service.slug}
                to={servicePath(service.slug)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                data-active={active === i ? "true" : undefined}
                className="orbit-node absolute flex h-[44px] w-[44px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full no-underline"
                style={{ left, top }}
              >
                <span aria-hidden="true" className="orbit-dot" />
                <span
                  className={`absolute w-max max-w-[9ch] font-display text-[12px] leading-[1.25] tracking-[0.02em] sm:max-w-[13ch] sm:text-[13px] lg:text-[14px] ${LABEL_SIDE[side]}`}
                >
                  {service.short}
                </span>
              </Link>
            ))}
          </div>
        </Reveal>

        {/* ── The read-out ──
            Height is reserved rather than measured: without a floor, moving
            between a one-line and a two-line entry shunts the whole page. */}
        <Reveal
          delay={0.12}
          variant="fade"
          className="mx-auto mt-[clamp(20px,3vw,36px)] flex min-h-[112px] max-w-[54ch] flex-col items-center text-center"
        >
          <p className="mb-2 font-display text-[11.5px] tracking-[0.14em] text-coral-700 uppercase">
            {shown ? `${shown.num} — Service` : "At the centre"}
          </p>
          <h3 className="display mb-2.5 text-[clamp(19px,2.2vw,26px)] leading-[1.12]">
            {shown ? shown.title : brand.name}
          </h3>
          <p className="text-muted m-0 text-[15px] leading-[1.6]">
            {shown ? shown.blurb : brand.description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
