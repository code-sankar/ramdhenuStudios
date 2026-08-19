/**
 * Renders the social share card to public/og-image.png. Run from the package
 * root after changing the logo or the headline:
 *
 *   node scripts/generate-og-image.mjs
 *
 * Requires playwright: npm i -D playwright
 */
import { chromium } from "playwright";
import fs from "node:fs";

const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--no-sandbox"] });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
const lockup = "data:image/png;base64," + fs.readFileSync("src/assets/logo-lockup.png").toString("base64");
const font = "data:font/woff2;base64," + fs.readFileSync("public/fonts/barlow-condensed-600-latin.woff2").toString("base64");
const body = "data:font/woff2;base64," + fs.readFileSync("public/fonts/barlow-400-latin.woff2").toString("base64");

await p.setContent(`
<style>
  @font-face { font-family: "BC"; src: url(${font}) format("woff2"); font-weight: 600; }
  @font-face { font-family: "B"; src: url(${body}) format("woff2"); font-weight: 400; }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #1d2d3d; position: relative; overflow: hidden; }
  .grid { position: absolute; inset: 0;
    background-image:
      linear-gradient(to right, rgba(242,242,243,.07) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(242,242,243,.07) 1px, transparent 1px);
    background-size: 90px 90px; }
  .inner { position: relative; padding: 82px 90px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; }
  img { width: 520px; display: block; }
  h1 { font-family: BC, sans-serif; font-weight: 600; color: #f2f2f3; font-size: 82px;
       line-height: .96; letter-spacing: -.02em; text-transform: uppercase; }
  p { font-family: B, sans-serif; color: rgba(242,242,243,.7); font-size: 25px; }
  .marks i { position: absolute; background: #5980a6; }
  .marks i.h { width: 54px; height: 2px; } .marks i.v { width: 2px; height: 54px; }
</style>
<div class="grid"></div>
<div class="marks">
  <i class="h" style="top:52px;left:52px"></i><i class="v" style="top:26px;left:78px"></i>
  <i class="h" style="bottom:52px;right:52px"></i><i class="v" style="bottom:26px;right:78px"></i>
</div>
<div class="inner">
  <img src="${lockup}">
  <div>
    <h1>A step towards<br>digital presence</h1>
    <p style="margin-top:26px">Websites · Photography · Social · Ads · Google Business</p>
  </div>
</div>`);
await p.waitForTimeout(900);
await p.screenshot({ path: "public/og-image.png" });
await b.close();
console.log("og-image.png", fs.statSync("public/og-image.png").size, "bytes");
