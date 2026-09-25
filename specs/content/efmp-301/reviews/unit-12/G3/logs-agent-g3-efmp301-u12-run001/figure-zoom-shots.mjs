// Zoomed evidence shots for EFMP-301 Unit 12 G3 run001:
// fig-U12-3's fifth-row overprint and fig-U12-1's dashed-link geometry.
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';

const OUT = 'specs/content/efmp-301/reviews/unit-12/G3/renders-agent-g3-efmp301-u12-run001';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 700 }, deviceScaleFactor: 2 });

async function shot(svg, clip, out) {
  await page.setContent(readFileSync(svg, 'utf8'), { waitUntil: 'load' });
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${OUT}/${out}`, clip });
  console.log('wrote', out);
}

// fig-U12-3: the fifth row (bottom band, y 326-470 in a 780x470 viewBox rendered 1:1)
await shot('static/img/figures/efmp-301/unit-12/fig-U12-3.svg',
  { x: 0, y: 320, width: 780, height: 150 }, 'figure-fig-U12-3-fifthrow-zoom.png');
// fig-U12-1: the dashed curve region (y 260-470)
await shot('static/img/figures/efmp-301/unit-12/fig-U12-1.svg',
  { x: 0, y: 260, width: 780, height: 210 }, 'figure-fig-U12-1-dashlink-zoom.png');

await browser.close();
