import { useEffect, useRef } from "react";

import markSrc from "../assets/logo-mark.png";

/**
 * PARTICLE MARK — the brand monogram as a body of continuously moving bubbles.
 *
 * THE SHAPE IS A CONTAINER, NOT A SET OF DESTINATIONS. The first version gave
 * every particle one fixed target inside the glyph and let it orbit a few
 * pixels around it. That assembles beautifully and is then, in effect, a still
 * image with a shimmer — after two seconds nothing is going anywhere.
 *
 * Here the glyph is a mask instead. Bubbles rise through it, swaying as they
 * go, and the moment one leaves the mask it is recycled to the bottom. The
 * logo stays perfectly legible because the mask is always full; what changes
 * is that the thing filling it is in constant motion. Nothing ever settles.
 *
 * WHY A CANVAS AND NOT DOM. A few thousand elements is a few thousand layout
 * boxes; the same points on a canvas is one. This is the one place on the site
 * where a canvas is the cheap option rather than the expensive one.
 *
 * THE COSTS, AND WHAT THEY BUY:
 *   • The loop is capped at ~45fps. At 60 it is indistinguishable here and
 *     burns a third more battery for it.
 *   • Density scales with the glyph's area and thins below 768px — a mid-range
 *     Android is the target device, not a laptop.
 *   • It stops when scrolled out of view (IntersectionObserver) and when the
 *     tab is hidden. An animation nobody is looking at should not be running.
 *   • The mask test is a flat Uint8Array lookup: one array index per bubble
 *     per frame, no allocation, no geometry.
 *   • Under `prefers-reduced-motion` it draws one static frame of the filled
 *     glyph and never starts a loop at all.
 *
 * It is decorative: `aria-hidden`, and the heading beside it carries meaning.
 */

/* Tuning. Named because each is a judgement, not a magic number. */
const FILL_STEP = 4; /* px between bubbles at rest density. Lower = denser. */
const ALPHA_FLOOR = 128; /* how opaque a source pixel must be to count as inside. */
const RISE_MIN = 0.85; /* px per frame. At 45fps this is ~38px/s… */
const RISE_MAX = 2.3; /* …up to ~104px/s, so the slowest and fastest visibly differ. */
const SWAY_MIN = 2.5; /* px of lateral drift. Below ~2 it reads as jitter. */
const SWAY_MAX = 7; /* an overhang past the stroke edge, so it stays small. */
const FADE_IN_FRAMES = 16; /* a recycled bubble ramps up rather than popping in. */
const ENTER_EASE = 0.055; /* how hard the opening assembly pulls a bubble home. */
const FRAME_MS = 1000 / 45;

export default function ParticleMark({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;

    let bubbles = [];
    let mask = null; /* Uint8Array, 1 = inside the glyph */
    let maskW = 0;
    let maskH = 0;
    let offsetX = 0;
    let offsetY = 0;
    let spawns = []; /* every inside point, subsampled — see build() */
    let raf = 0;
    let last = 0;
    let visible = true;
    let stopped = false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rand = (lo, hi) => lo + Math.random() * (hi - lo);

    /* Is this canvas-space point inside the glyph? */
    const inside = (x, y) => {
      const gx = (x - offsetX) | 0;
      const gy = (y - offsetY) | 0;
      if (gx < 0 || gy < 0 || gx >= maskW || gy >= maskH) return false;
      return mask[gy * maskW + gx] === 1;
    };

    /* Put a bubble back into the shape and start it over.
       On a recycle it drops to the floor of whichever stroke it landed in, so
       it rises through that stroke rather than materialising mid-air. The walk
       is bounded — a glyph has no unbroken run longer than its own height, and
       an unbounded loop here would be a hang waiting for a malformed mask. */
    const recycle = (b, firstRun) => {
      const seed = spawns[(Math.random() * spawns.length) | 0];
      let sx = seed[0];
      let sy = seed[1];
      if (!firstRun) {
        let guard = maskH;
        while (guard-- > 0 && sy + 1 < maskH && mask[(sy + 1) * maskW + sx]) sy++;
      }
      b.x = offsetX + sx;
      b.y = offsetY + sy;
      b.age = firstRun ? FADE_IN_FRAMES : 0;
      b.rise = rand(RISE_MIN, RISE_MAX);
      b.sway = rand(SWAY_MIN, SWAY_MAX);
      b.swaySpeed = rand(0.012, 0.032);
      b.phase = Math.random() * Math.PI * 2;
      b.r = rand(1.1, 3.0);
      b.alpha = rand(0.3, 0.78);
    };

    const build = (image) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scale = Math.min(rect.width / image.width, rect.height / image.height) * 0.86;
      maskW = Math.max(1, Math.round(image.width * scale));
      maskH = Math.max(1, Math.round(image.height * scale));
      offsetX = (rect.width - maskW) / 2;
      offsetY = (rect.height - maskH) / 2;

      const probe = document.createElement("canvas");
      probe.width = maskW;
      probe.height = maskH;
      const pctx = probe.getContext("2d", { willReadFrequently: true });
      pctx.drawImage(image, 0, 0, maskW, maskH);

      let data;
      try {
        data = pctx.getImageData(0, 0, maskW, maskH).data;
      } catch {
        /* Tainted canvas. The asset is same-origin so this should not happen,
           but a failed read must not take the page down with it. */
        return;
      }

      mask = new Uint8Array(maskW * maskH);
      let insideCount = 0;
      for (let i = 0, n = maskW * maskH; i < n; i++) {
        if (data[i * 4 + 3] >= ALPHA_FLOOR) {
          mask[i] = 1;
          insideCount++;
        }
      }
      if (!insideCount) return;

      /* EVERY inside pixel is a candidate, not just the bottom band.
         Restricting spawns to the lower third looked right on paper — bubbles
         rise from a floor — but this glyph is not one connected column. Strokes
         that exist only in the upper half had no spawn point beneath them, so
         they drained on the first pass and never refilled: measured ink fell
         from 160k to 63k over ten seconds while the mass sank. Sampling the
         whole mask keeps every stroke fed. */
      spawns = [];
      for (let y = 0; y < maskH; y += 2) {
        for (let x = 0; x < maskW; x += 2) {
          if (mask[y * maskW + x]) spawns.push([x, y]);
        }
      }

      /* Count follows the glyph's actual area, so the density reads the same
         whether the canvas is 400px or 860px wide. */
      const step = small ? FILL_STEP + 2 : FILL_STEP;
      const count = Math.max(120, Math.round(insideCount / (step * step)));

      bubbles = new Array(count);
      for (let i = 0; i < count; i++) {
        const b = {};
        recycle(b, true);
        /* The opening assembly: start scattered across the field and fly in.
           `entering` hands over to the rising flow on arrival. */
        b.entering = !reduced;
        b.ex = b.x;
        b.ey = b.y;
        if (b.entering) {
          b.x += (Math.random() - 0.5) * rect.width * 1.2;
          b.y += (Math.random() - 0.5) * rect.height * 1.2;
        }
        bubbles[i] = b;
      }
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      /* Deeper than the field, so the cloud reads as shadow inside the brand
         colour rather than as a second hue laid over it. */
      ctx.fillStyle = "#8f1f10";

      for (const b of bubbles) {
        if (b.entering) {
          b.x += (b.ex - b.x) * ENTER_EASE;
          b.y += (b.ey - b.y) * ENTER_EASE;
          if (Math.abs(b.ex - b.x) < 1.5 && Math.abs(b.ey - b.y) < 1.5) b.entering = false;
        } else {
          /* Rise, and sway around the line of the rise. */
          b.y -= b.rise;
          b.phase += b.swaySpeed;
          b.age++;

          /* Containment is tested on the base position, not the swayed one.
             Testing the swayed point meant a bubble in a narrow stroke was
             thrown out the side almost immediately, so thin parts of the glyph
             could never hold any — the sway is a drawing offset, and letting it
             overhang the stroke edge by a few px reads as organic rather than
             as spill. */
          if (!inside(b.x, b.y)) recycle(b, false);
        }

        const x = b.x + Math.cos(b.phase) * b.sway;
        const fade = Math.min(1, b.age / FADE_IN_FRAMES);
        ctx.globalAlpha = b.alpha * fade;
        ctx.beginPath();
        ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    /* One static frame of the filled glyph, for reduced motion. */
    const drawStill = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = "#8f1f10";
      for (const b of bubbles) {
        ctx.globalAlpha = b.alpha;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now) => {
      if (stopped) return;
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      if (now - last < FRAME_MS) return;
      last = now;
      draw();
    };

    const image = new Image();
    image.decoding = "async";
    image.src = markSrc;

    const onReady = () => {
      build(image);
      if (!bubbles.length) return;
      if (reduced) {
        drawStill();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    if (image.complete) onReady();
    else image.addEventListener("load", onReady, { once: true });

    /* Rebuild on resize — the mask and every position are in CSS pixels, so a
       width change invalidates all of them. Debounced, or a drag-resize
       re-samples the glyph on every frame of the drag. */
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!image.complete) return;
        build(image);
        if (reduced) drawStill();
      }, 180);
    };
    window.addEventListener("resize", onResize, { passive: true });

    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    });
    io.observe(canvas);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
