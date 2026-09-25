// Same instrument as figure-geometry-overlap-ur.mjs, pointed at the ENGLISH fig-U6-2
// variants, to establish whether the rules-out box overflow is inherited from the
// English design or introduced by the Urdu label lengths.
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';

const DIR = 'static/img/figures/efmp-302/unit-06';
const TOL = 0.5;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 560 }, deviceScaleFactor: 1.5 });

for (const file of ['fig-U6-2.svg', 'fig-U6-2.dark.svg']) {
  await page.setContent(readFileSync(`${DIR}/${file}`, 'utf8'), { waitUntil: 'load' });
  await page.waitForTimeout(150);
  const m = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    const vb = svg.viewBox.baseVal;
    const leaves = [...svg.querySelectorAll('text')].map((t) => {
      const b = t.getBBox();
      return { cls: t.getAttribute('class') || '', txt: (t.textContent || '').trim().slice(0, 46), x: b.x, y: b.y, width: b.width, height: b.height };
    });
    const rects = [...svg.querySelectorAll('rect')].filter(r => !r.classList.contains('bg')).map(r => ({ cls: r.getAttribute('class') || '', x: r.x.baseVal.value, y: r.y.baseVal.value, width: r.width.baseVal.value, height: r.height.baseVal.value }));
    return { vb: { w: vb.width, h: vb.height }, leaves, rects };
  });
  console.log(`-- ${file}`);
  for (const t of m.leaves) {
    const enclosing = m.rects
      .filter(r => t.x + t.width / 2 >= r.x && t.x + t.width / 2 <= r.x + r.width && t.y + t.height / 2 >= r.y && t.y + t.height / 2 <= r.y + r.height)
      .sort((a, b) => a.width * a.height - b.width * b.height)[0];
    if (enclosing) {
      const esc = [];
      if (t.x < enclosing.x - TOL) esc.push(`left by ${(enclosing.x - t.x).toFixed(1)}`);
      if (t.x + t.width > enclosing.x + enclosing.width + TOL) esc.push(`right by ${(t.x + t.width - enclosing.x - enclosing.width).toFixed(1)}`);
      if (t.y + t.height > enclosing.y + enclosing.height + TOL) esc.push(`bottom by ${(t.y + t.height - enclosing.y - enclosing.height).toFixed(1)}`);
      console.log(`   ${esc.length ? 'ESCAPE ' + esc.join(', ') : 'fits'} | box ${enclosing.cls}@${enclosing.x},${enclosing.y} | "${t.txt}"`);
    }
  }
}
await browser.close();
