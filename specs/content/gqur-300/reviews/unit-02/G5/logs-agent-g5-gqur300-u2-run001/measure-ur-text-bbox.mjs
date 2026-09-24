import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';

const files = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage();
let problems = 0;
for (const file of files) {
  await page.setContent(readFileSync(file, 'utf8'), { waitUntil: 'load' });
  const report = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    const vb = svg.viewBox.baseVal;
    const out = [];
    for (const t of svg.querySelectorAll('text')) {
      const b = t.getBBox();
      out.push({ s: t.textContent.trim().slice(0, 40), x1: +b.x.toFixed(1), x2: +(b.x + b.width).toFixed(1), y1: +b.y.toFixed(1), y2: +(b.y + b.height).toFixed(1) });
    }
    return { vb: [vb.width, vb.height], texts: out };
  });
  const bad = report.texts.filter((t) => t.x1 < 0 || t.x2 > report.vb[0] || t.y1 < 0 || t.y2 > report.vb[1]);
  const minx = Math.min(...report.texts.map((t) => t.x1));
  console.log(`${file}: viewBox ${report.vb[0]}x${report.vb[1]}, min text x1=${minx}, ${bad.length ? 'OVERFLOW:' : 'all text inside'}`);
  for (const t of bad) { console.log(`  OVERFLOW x1=${t.x1} x2=${t.x2} "${t.s}"`); problems++; }
  for (const t of report.texts.filter((t) => t.x1 < 40)) console.log(`  near-left-edge x1=${t.x1} x2=${t.x2} "${t.s}"`);
}
await browser.close();
process.exit(problems ? 1 : 0);
