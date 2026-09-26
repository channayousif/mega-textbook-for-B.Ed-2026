// G5: rendered position of the rotated axis label vs the vertical arrow in fig-U6-1.
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';

const browser = await chromium.launch();
const page = await browser.newPage();
for (const variant of ['svg', 'ur.svg']) {
  await page.setContent(readFileSync(`static/img/figures/efmp-301/unit-06/fig-U6-1.${variant}`, 'utf8'), { waitUntil: 'load' });
  const r = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    const out = { arrow: null, rotated: null };
    for (const l of svg.querySelectorAll('line')) {
      if (l.getAttribute('marker-end')) out.arrow = { x1: +l.getAttribute('x1'), x2: +l.getAttribute('x2') };
    }
    for (const t of svg.querySelectorAll('text')) {
      if ((t.getAttribute('transform') || '').includes('rotate')) {
        const b = t.getBBox();
        out.rotated = { text: t.textContent.slice(0, 40), x1: +b.x.toFixed(1), x2: +(b.x + b.width).toFixed(1), y1: +b.y.toFixed(1), y2: +(b.y + b.height).toFixed(1) };
      }
    }
    return out;
  });
  console.log(`fig-U6-1.${variant}:`, JSON.stringify(r));
}
await browser.close();
