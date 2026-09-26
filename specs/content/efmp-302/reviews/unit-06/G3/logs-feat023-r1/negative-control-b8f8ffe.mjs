// NEGATIVE CONTROL for the figure-geometry-overlap instrument (feat023-r1).
// Runs the same leaf-text bbox pairwise-intersection measurement against the
// b8f8ffe-era bytes of fig-U6-2 and fig-U6-6 (the known-broken re-optimisation
// that stacked tspan baselines). If the instrument is sound it MUST flag
// text-on-text superpositions here; a clean result would mean the instrument
// cannot detect the damage class and the unit's clean result is worthless.

import { chromium } from 'playwright-core';

const BASE = 'http://127.0.0.1:8125';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 560 } });
const TOL = 0.5;
let flagged = 0;

for (const file of ['fig-U6-2.svg', 'fig-U6-6.svg']) {
  await page.goto(`${BASE}/${file}`, { waitUntil: 'load' });
  await page.waitForTimeout(150);
  const m = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    const leaves = [];
    for (const t of svg.querySelectorAll('text')) {
      const tspans = [...t.querySelectorAll('tspan')];
      if (tspans.length) {
        for (const ts of tspans) {
          const b = ts.getBBox();
          leaves.push({ txt: (ts.textContent || '').trim().slice(0, 40), x: b.x, y: b.y, width: b.width, height: b.height });
        }
      } else {
        const b = t.getBBox();
        leaves.push({ txt: (t.textContent || '').trim().slice(0, 40), x: b.x, y: b.y, width: b.width, height: b.height });
      }
    }
    return leaves;
  });
  console.log(`${file} (b8f8ffe bytes): ${m.length} leaf text nodes`);
  for (let i = 0; i < m.length; i++) {
    for (let j = i + 1; j < m.length; j++) {
      const w = Math.min(m[i].x + m[i].width, m[j].x + m[j].width) - Math.max(m[i].x, m[j].x);
      const h = Math.min(m[i].y + m[i].height, m[j].y + m[j].height) - Math.max(m[i].y, m[j].y);
      if (w > TOL && h > TOL) {
        flagged++;
        console.log(`   SUPERPOSITION "${m[i].txt}" x "${m[j].txt}" overlap ${w.toFixed(1)}x${h.toFixed(1)}`);
      }
    }
  }
}
console.log(`\nnegative control: ${flagged} superposition(s) flagged on the known-broken bytes`);
console.log(flagged > 0 ? 'INSTRUMENT VALID: detects the b8f8ffe damage class; the clean result on current bytes is meaningful' : 'INSTRUMENT INVALID: cannot detect the damage class');
await browser.close();
