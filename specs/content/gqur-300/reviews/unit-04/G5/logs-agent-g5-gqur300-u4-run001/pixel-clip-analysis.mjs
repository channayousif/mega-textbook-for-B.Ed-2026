// Pixel clip analysis - GQUR-300 Unit 4 G5 run001.
// Loads each Nastaliq-rendered .ur.svg screenshot into a canvas and scans the
// leftmost pixel columns for glyph ink. Text touching column 0 is text cut by
// the viewBox edge (x<0 in SVG coordinates), confirming the geometry finding.
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';

const EXEC = '/home/a2ahs/.cache/ms-playwright/chromium-1243/chrome-linux-arm64/chrome';
const OUT = 'specs/content/gqur-300/reviews/unit-04/G5/renders-agent-g5-gqur300-u4-run001';
const FIGS = ['fig-U4-1', 'fig-U4-2', 'fig-U4-3', 'fig-U4-4', 'fig-U4-5', 'fig-U4-6'];

const browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.goto('about:blank');
for (const fig of FIGS) {
  const b64 = readFileSync(`${OUT}/${fig}-ur-nastaliq.png`).toString('base64');
  const res = await page.evaluate(async (b64) => {
    const img = new Image();
    img.src = `data:image/png;base64,${b64}`;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    const inkAt = (x, y) => {
      const i = (y * c.width + x) * 4;
      return data[i] < 200 || data[i + 1] < 200 || data[i + 2] < 200; // non-background
    };
    // y-bands where the leftmost 2 columns contain ink
    const bands = [];
    let start = null;
    for (let y = 0; y < c.height; y++) {
      const ink = inkAt(0, y) || inkAt(1, y);
      if (ink && start === null) start = y;
      if (!ink && start !== null) { bands.push([start, y - 1]); start = null; }
    }
    if (start !== null) bands.push([start, c.height - 1]);
    return { width: c.width, height: c.height, leftEdgeInkBands: bands };
  }, b64);
  console.log(`${fig}: ${res.width}x${res.height} left-edge ink bands: ${JSON.stringify(res.leftEdgeInkBands)}`);
}
await browser.close();
