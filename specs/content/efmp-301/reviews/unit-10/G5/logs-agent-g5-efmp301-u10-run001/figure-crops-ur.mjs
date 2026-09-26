// Zoomed crops of Urdu figure defect regions for G5 run001 evidence.
import { chromium } from 'playwright-core';

const BASE = process.env.BASE || 'http://127.0.0.1:4599';
const DIR = 'img/figures/efmp-301/unit-10';
const OUT = 'specs/content/efmp-301/reviews/unit-10/G5/renders-agent-g5-efmp301-u10-run001';

const CROPS = [
  // [figure, name, x, y, w, h, scale]
  ['fig-U10-4', 'fifth-row', 0, 370, 780, 100, 2],
  ['fig-U10-4', 'header-and-col1', 400, 10, 380, 120, 2],
  ['fig-U10-3', 'check-label', 0, 190, 170, 120, 2.5],
  ['fig-U10-2', 'check-label', 0, 190, 170, 120, 2.5],
  ['fig-U10-2', 'arrow-gap', 330, 130, 120, 190, 2.5],
  ['fig-U10-3', 'arrow-gap', 330, 130, 120, 190, 2.5],
  ['fig-U10-1', 'use-column', 0, 60, 215, 370, 2],
  ['fig-U10-1', 'header-bar', 0, 55, 780, 30, 3],
  ['fig-U10-4', 'header-bar', 0, 60, 780, 30, 3],
];

const browser = await chromium.launch();
for (const [fig, name, x, y, w, h, scale] of CROPS) {
  const svgText = await (await fetch(`${BASE}/${DIR}/${fig}.ur.svg`)).text();
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face { font-family: 'Noto Nastaliq Urdu';
      src: url('/fonts/NotoNastaliqUrdu-Regular.woff2') format('woff2'); }
    body { margin: 0; }
    svg { width: 780px; height: 470px; display: block; }
    text { font-family: 'Noto Nastaliq Urdu', serif !important; }
  </style></head><body>${svgText}</body></html>`;
  const page = await browser.newPage({ viewport: { width: 780, height: 470 }, deviceScaleFactor: scale });
  const url = `${BASE}/__g5-crop/${fig}-${name}.html`;
  await page.route(url, (route) => route.fulfill({ contentType: 'text/html; charset=utf-8', body: html }));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/crop-${fig}-${name}.png`, clip: { x, y, width: w, height: h } });
  await page.close();
  console.log(`crop-${fig}-${name}.png`);
}
await browser.close();
console.log('crops saved');
