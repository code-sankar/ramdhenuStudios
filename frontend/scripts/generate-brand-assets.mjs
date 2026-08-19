/**
 * Derives the web logo assets and favicons from the full-resolution artwork in
 * src/assets/brand/. Run from the package root after replacing a source file:
 *
 *   node scripts/generate-brand-assets.mjs
 *
 * The artwork is white-on-transparent; the logo derivatives keep that (they are
 * used as CSS masks and filled with currentColor, see components/Logo.jsx),
 * while the favicons get an opaque steel tile so the mark never vanishes on a
 * light browser tab.
 *
 * Requires playwright: npm i -D playwright
 */
import { chromium } from "playwright";
import fs from "node:fs";

const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--no-sandbox"] });
const p = await b.newPage();
const enc = (f) => "data:image/png;base64," + fs.readFileSync(f).toString("base64");

const MARK = enc("src/assets/brand/logo-mark-source.png");
const LOCKUP = enc("src/assets/brand/logo-lockup-source.png");

/**
 * Draws `src` into a canvas of the given size and returns a PNG data URL.
 * `ground` fills behind it (favicons need an opaque tile); omit for transparency.
 * `inset` is the padding ratio, so a mark can breathe inside an icon tile.
 */
const render = async (src, w, h, ground, inset) =>
  p.evaluate(
    ([src, w, h, ground, inset]) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const c = document.createElement("canvas");
          c.width = w;
          c.height = h;
          const ctx = c.getContext("2d");
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          if (ground) {
            ctx.fillStyle = ground;
            ctx.fillRect(0, 0, w, h);
          }
          const pad = inset || 0;
          const boxW = w * (1 - pad * 2);
          const boxH = h * (1 - pad * 2);
          const scale = Math.min(boxW / img.width, boxH / img.height);
          const dw = img.width * scale;
          const dh = img.height * scale;
          ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
          resolve(c.toDataURL("image/png"));
        };
        img.src = src;
      }),
    [src, w, h, ground, inset],
  );

const write = (file, dataUrl) => {
  fs.writeFileSync(file, Buffer.from(dataUrl.split(",")[1], "base64"));
  console.log(String(fs.statSync(file).size).padStart(7), file);
};

const STEEL = "#1d2d3d";

// Web assets — white on transparent, recoloured in CSS via mask + currentColor.
write("src/assets/logo-mark.png",   await render(MARK,   256, 256, null, 0));
write("src/assets/logo-lockup.png", await render(LOCKUP, 1000, 400, null, 0));

// Icons — opaque steel tile, so the mark never vanishes on a light tab bar.
write("public/favicon-32.png",       await render(MARK, 32,  32,  STEEL, 0.16));
write("public/favicon-192.png",      await render(MARK, 192, 192, STEEL, 0.16));
write("public/apple-touch-icon.png", await render(MARK, 180, 180, STEEL, 0.18));

await b.close();
