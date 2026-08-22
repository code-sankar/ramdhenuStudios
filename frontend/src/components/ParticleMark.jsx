import { useEffect, useRef } from "react";

import markSrc from "../assets/logo-mark.png";

/**
 * PARTICLE MARK — the brand monogram assembled out of drifting particles.
 *
 * HOW IT WORKS. The logo ships as white-on-transparent PNG, so its alpha
 * channel is already a mask of the glyph. The image is drawn once to an
 * offscreen canvas, every Nth pixel is tested, and the ones inside the letter
 * become targets. Particles start scattered across the field and ease toward
 * their target, then breathe around it forever on a slow per-particle orbit.
 *
 * WHY A CANVAS AND NOT DOM. Four thousand elements is four thousand layout
 * boxes; the same four thousand points on a canvas is one. This is the one
 * place on the site where a canvas is the cheap option rather than the
 * expensive one.
 *
 * THE COSTS, AND WHAT THEY BUY:
 *   • The loop is capped at ~45fps. At 60 it is indistinguishable and burns a
 *     third more battery for it.
 *   • Particle count scales with area and halves below 768px — a mid-range
 *     Android is the target device, not a laptop.
 *   • It stops when scrolled out of view (IntersectionObserver) and when the
 *     tab is hidden. An animation nobody is looking at should not be running.
 *   • Under `prefers-reduced-motion` it renders one static frame of the
 *     assembled glyph and never starts a loop at all.
 *
 * It is decorative: `aria-hidden`, and the heading beside it carries meaning.
 */

/* Tuning. Named because each one is a judgement, not a magic number. */
const SAMPLE_STEP = 3; /* px between probes. Lower = denser = more particles. */
const ALPHA_FLOOR = 128; /* how opaque a pixel must be to count as "inside". */
const EASE = 0.045; /* how hard a particle is pulled home each frame. */
const DRIFT = 3.4; /* px of idle orbit once it has arrived. */
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

    let particles = [];
    let raf = 0;
    let last = 0;
    let visible = true;
    let stopped = false;

    /* Device pixels, capped at 2: a 3x phone would quadruple the fill cost for
       a blur-soft effect nobody can resolve at that density. */
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = (image) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* Fit the glyph inside the box, centred, with room for the drift. */
      const scale = Math.min(rect.width / image.width, rect.height / image.height) * 0.82;
      const w = Math.max(1, Math.round(image.width * scale));
      const h = Math.max(1, Math.round(image.height * scale));
      const offsetX = (rect.width - w) / 2;
      const offsetY = (rect.height - h) / 2;

      /* Read the alpha channel off an offscreen copy at the display size. */
      const probe = document.createElement("canvas");
      probe.width = w;
      probe.height = h;
      const pctx = probe.getContext("2d", { willReadFrequently: true });
      pctx.drawImage(image, 0, 0, w, h);

      let data;
      try {
        data = pctx.getImageData(0, 0, w, h).data;
      } catch {
        /* Tainted canvas — the asset is same-origin so this should not happen,
           but a failed read must not take the page down with it. */
        return;
      }

      const step = small ? SAMPLE_STEP + 2 : SAMPLE_STEP;
      const next = [];
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          if (data[(y * w + x) * 4 + 3] < ALPHA_FLOOR) continue;
          const tx = offsetX + x;
          const ty = offsetY + y;
          next.push({
            tx,
            ty,
            /* Scattered start, so the first second is an assembly. */
            x: tx + (Math.random() - 0.5) * rect.width * 1.1,
            y: ty + (Math.random() - 0.5) * rect.height * 1.1,
            /* Each particle keeps its own orbit, or the cloud pulses as one
               body and reads as a heartbeat rather than as dust. */
            phase: Math.random() * Math.PI * 2,
            speed: 0.006 + Math.random() * 0.012,
            radius: 1.0 + Math.random() * 1.5,
            alpha: 0.5 + Math.random() * 0.5,
          });
        }
      }
      particles = next;
    };

    const draw = (assembled) => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      /* A deeper coral than the field, so the cloud reads as shadow inside the
         brand colour rather than as a second hue laid over it. */
      ctx.fillStyle = "#8f1f10";

      for (const p of particles) {
        if (!assembled) {
          p.x += (p.tx - p.x) * EASE;
          p.y += (p.ty - p.y) * EASE;
        }
        p.phase += p.speed;
        const dx = Math.cos(p.phase) * DRIFT;
        const dy = Math.sin(p.phase * 1.3) * DRIFT;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x + dx, p.y + dy, p.radius, 0, Math.PI * 2);
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
      draw(false);
    };

    const image = new Image();
    image.decoding = "async";
    image.src = markSrc;

    const onReady = () => {
      build(image);
      if (!particles.length) return;

      if (reduced) {
        /* One static frame of the finished glyph. No loop is ever started. */
        for (const p of particles) {
          p.x = p.tx;
          p.y = p.ty;
        }
        draw(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    if (image.complete) onReady();
    else image.addEventListener("load", onReady, { once: true });

    /* Rebuild on resize — the target positions are in CSS pixels, so a width
       change invalidates every one of them. Debounced: a drag-resize would
       otherwise re-sample the glyph on every frame of the drag. */
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (image.complete) {
          build(image);
          if (reduced) {
            for (const p of particles) {
              p.x = p.tx;
              p.y = p.ty;
            }
            draw(true);
          }
        }
      }, 180);
    };
    window.addEventListener("resize", onResize, { passive: true });

    /* Off-screen is off. */
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
