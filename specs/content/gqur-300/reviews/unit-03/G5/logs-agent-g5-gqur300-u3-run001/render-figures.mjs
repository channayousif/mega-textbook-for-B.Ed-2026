// G5 figure inspection - standalone .ur.svg variants embedded in a neutral page.
import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = 'http://localhost:3221';
const OUT = 'specs/content/gqur-300/reviews/unit-03/G5/renders-agent-g5-gqur300-u3-run001';
mkdirSync(OUT, { recursive: true });
const figs = ['fig-U3-1', 'fig-U3-2', 'fig-U3-3', 'fig-U3-4', 'fig-U3-5', 'fig-U3-6'];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 900, height: 760 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const notes = [];

for (const f of figs) {
  const res = await page.request.get(`${BASE}/img/figures/gqur-300/unit-03/${f}.ur.svg`);
  const svg = await res.text();
  await page.setContent(`<!doctype html><meta charset="utf-8"><body style="margin:16px;background:#fff">${svg}</body>`, { waitUntil: 'load' });
  await page.waitForTimeout(400);
  const box = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    svg.removeAttribute('width'); svg.removeAttribute('height');
    svg.setAttribute('width', '860');
    const r = svg.getBoundingClientRect();
    let zero = 0, oob = 0;
    const sr = svg.getBoundingClientRect();
    for (const t of svg.querySelectorAll('text')) {
      const tr = t.getBoundingClientRect();
      if (!tr.width || !tr.height) zero++;
      if (tr.right > sr.right + 2 || tr.left < sr.left - 2) oob++;
    }
    return { w: Math.round(r.width), h: Math.round(r.height), zero, oob };
  });
  await page.screenshot({ path: `${OUT}/figure-${f}-ur.png`, fullPage: true });
  notes.push(`figure ${f}.ur.svg: renderedW=${box.w} H=${box.h} zeroSizeText=${box.zero} textOutOfBounds=${box.oob}`);
}
await browser.close();
writeFileSync('specs/content/gqur-300/reviews/unit-03/G5/logs-agent-g5-gqur300-u3-run001/figure-measurements.txt', notes.join('\n') + '\n');
console.log(notes.join('\n'));
