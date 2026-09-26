// G5 figure-geometry evidence: browser-measured text bboxes vs grid/arrow geometry
// for the four Urdu figure variants (and their English sources for comparison).
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';

const files = [
  'fig-U6-1', 'fig-U6-2', 'fig-U6-3', 'fig-U6-4',
];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const f of files) {
  for (const variant of ['svg', 'ur.svg']) {
    const path = `static/img/figures/efmp-301/unit-06/${f}.${variant}`;
    await page.setContent(readFileSync(path, 'utf8'), { waitUntil: 'load' });
    const r = await page.evaluate(() => {
      const svg = document.querySelector('svg');
      const vb = svg.viewBox.baseVal;
      const vertSegments = [];
      for (const p of svg.querySelectorAll('path.grid')) {
        for (const m of (p.getAttribute('d') || '').matchAll(/M\s*([\d.]+)\s+([\d.]+)V([\d.]+)/g)) {
          vertSegments.push({ x: +m[1], y1: +m[2], y2: +m[3] });
        }
      }
      const hLines = [];
      for (const p of svg.querySelectorAll('path')) {
        const d = p.getAttribute('d') || '';
        if (/H/.test(d) && !/grid/.test(p.getAttribute('class') || '')) {
          const b = p.getBBox();
          if (b.height < 6) hLines.push({ d, x1: +b.x.toFixed(1), x2: +(b.x + b.width).toFixed(1), y: +(b.y + b.height / 2).toFixed(1) });
        }
      }
      const texts = [...svg.querySelectorAll('text')].map((t) => {
        const b = t.getBBox();
        return { s: t.textContent.slice(0, 34), x1: +b.x.toFixed(1), x2: +(b.x + b.width).toFixed(1), y1: +b.y.toFixed(1), y2: +(b.y + b.height).toFixed(1) };
      });
      const crossings = [];
      for (const seg of vertSegments) {
        for (const t of texts) {
          if (t.x1 < seg.x && seg.x < t.x2 && t.y1 < seg.y2 && t.y2 > seg.y1) crossings.push({ kind: 'grid-line', x: seg.x, text: t.s });
        }
      }
      for (const l of hLines) {
        for (const t of texts) {
          if (t.x1 < l.x2 && l.x1 < t.x2 && t.y1 < l.y && l.y < t.y2) crossings.push({ kind: 'h-path', d: l.d, text: t.s });
        }
      }
      return { viewBox: `${vb.width}x${vb.height}`, vertSegments, hLines, crossings };
    });
    console.log(`\n=== ${f}.${variant} (viewBox ${r.viewBox}) ===`);
    console.log('grid verticals:', JSON.stringify(r.vertSegments));
    if (r.hLines.length) console.log('horizontal paths:', JSON.stringify(r.hLines));
    if (r.crossings.length) console.log('CROSSINGS:', JSON.stringify(r.crossings, null, 1));
    else console.log('no line/text crossings');
  }
}
await browser.close();
