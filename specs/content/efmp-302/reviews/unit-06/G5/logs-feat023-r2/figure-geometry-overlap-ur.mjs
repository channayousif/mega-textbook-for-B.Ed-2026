// Figure-internal text geometry with text-on-text overlap detection - URDU VARIANTS.
// G5 feat023-r2 adaptation of the feat023-r1b instrument (itself the G3 feat023-r1
// instrument, validated there by a negative control on the b8f8ffe bytes which
// flagged 25 stacked-baseline superpositions). Same five measurements:
//   1. pairwise text-on-text superposition
//   2. wordmark collision
//   3. text escaping its enclosing rect
//   4. text crossing the viewBox edge
//   5. near-miss (texts within 2px vertically on overlapping x-ranges)
// Difference from r1b: SVGs are loaded with page.setContent() from the committed
// files (the measure-figure-text.mjs method) instead of over HTTP, so no served
// build is required. The bytes measured are the same committed files.
import { chromium } from 'playwright-core';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const DIR = 'static/img/figures/efmp-302/unit-06';
const OUT = 'specs/content/efmp-302/reviews/unit-06/G5/renders-feat023-r2';
const LOGJSON = 'specs/content/efmp-302/reviews/unit-06/G5/logs-feat023-r2/figure-geometry-overlap-ur.json';
const FIGS = ['fig-U6-1', 'fig-U6-2', 'fig-U6-3', 'fig-U6-4', 'fig-U6-5', 'fig-U6-6', 'fig-U6-7', 'fig-U6-8'];
const VARIANTS = ['.ur', '.ur.dark'];
const TOL = 0.5;

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 560 }, deviceScaleFactor: 1.5 });
const report = [];
let defects = 0;

const overlap = (a, b) => ({
  w: Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x),
  h: Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y),
});

for (const fig of FIGS) {
  for (const v of VARIANTS) {
    const file = `${DIR}/${fig}${v}.svg`;
    await page.setContent(readFileSync(file, 'utf8'), { waitUntil: 'load' });
    await page.waitForTimeout(150);
    const m = await page.evaluate(() => {
      const svg = document.querySelector('svg');
      const vb = svg.viewBox.baseVal;
      const leaves = [];
      for (const t of svg.querySelectorAll('text')) {
        const tspans = [...t.querySelectorAll('tspan')];
        if (tspans.length) {
          for (const ts of tspans) {
            const b = ts.getBBox();
            leaves.push({ cls: t.getAttribute('class') || '', txt: (ts.textContent || '').trim().slice(0, 46), x: b.x, y: b.y, width: b.width, height: b.height, tspan: true });
          }
        } else {
          const b = t.getBBox();
          leaves.push({ cls: t.getAttribute('class') || '', txt: (t.textContent || '').trim().slice(0, 46), x: b.x, y: b.y, width: b.width, height: b.height, tspan: false });
        }
      }
      const rects = [...svg.querySelectorAll('rect')].filter(r => !r.classList.contains('bg')).map(r => ({ cls: r.getAttribute('class') || '', x: r.x.baseVal.value, y: r.y.baseVal.value, width: r.width.baseVal.value, height: r.height.baseVal.value }));
      return { vb: { w: vb.width, h: vb.height }, leaves, rects, svgW: svg.getBoundingClientRect().width };
    });
    const entry = { file, viewBox: `${m.vb.w}x${m.vb.h}`, textLeaves: m.leaves.length, pairs: [], wordmark: [], rectEscape: [], viewBoxEscape: [], nearMiss: [] };
    const wm = m.leaves.filter(l => l.cls.includes('wm') || /textbook\.com\.pk/.test(l.txt));
    const others = m.leaves.filter(l => !wm.includes(l));
    for (let i = 0; i < others.length; i++) {
      for (let j = i + 1; j < others.length; j++) {
        const a = others[i], b = others[j];
        const o = overlap(a, b);
        if (o.w > TOL && o.h > TOL) entry.pairs.push({ a: a.txt, b: b.txt, w: +o.w.toFixed(1), h: +o.h.toFixed(1) });
        else if (o.w > 2 && o.h > -2 && o.h <= TOL) entry.nearMiss.push({ a: a.txt, b: b.txt, gap: +(-o.h).toFixed(1) });
      }
    }
    for (const w of wm) {
      for (const o of others) {
        const ov = overlap(w, o);
        if (ov.w > TOL && ov.h > TOL) entry.wordmark.push({ text: o.txt, w: +ov.w.toFixed(1), h: +ov.h.toFixed(1) });
      }
    }
    for (const t of m.leaves) {
      if (t.x < -TOL || t.y < -TOL || t.x + t.width > m.vb.w + TOL || t.y + t.height > m.vb.h + TOL) {
        entry.viewBoxEscape.push({ text: t.txt, x: +t.x.toFixed(1), y: +t.y.toFixed(1), x2: +(t.x + t.width).toFixed(1), y2: +(t.y + t.height).toFixed(1) });
      }
      // enclosing rect: the smallest rect that contains the text's anchor point region
      const enclosing = m.rects
        .filter(r => t.x + t.width / 2 >= r.x && t.x + t.width / 2 <= r.x + r.width && t.y + t.height / 2 >= r.y && t.y + t.height / 2 <= r.y + r.height)
        .sort((a, b) => a.width * a.height - b.width * b.height)[0];
      if (enclosing) {
        const esc = [];
        if (t.x < enclosing.x - TOL) esc.push(`left by ${(enclosing.x - t.x).toFixed(1)}`);
        if (t.y < enclosing.y - TOL) esc.push(`top by ${(enclosing.y - t.y).toFixed(1)}`);
        if (t.x + t.width > enclosing.x + enclosing.width + TOL) esc.push(`right by ${(t.x + t.width - enclosing.x - enclosing.width).toFixed(1)}`);
        if (t.y + t.height > enclosing.y + enclosing.height + TOL) esc.push(`bottom by ${(t.y + t.height - enclosing.y - enclosing.height).toFixed(1)}`);
        if (esc.length) entry.rectEscape.push({ text: t.txt, box: `${enclosing.cls}@${enclosing.x},${enclosing.y}`, esc });
      }
    }
    const bad = entry.pairs.length + entry.wordmark.length + entry.rectEscape.length + entry.viewBoxEscape.length;
    defects += bad;
    report.push(entry);
    console.log(`${bad === 0 ? 'OK ' : 'DEF'} ${file} texts=${entry.textLeaves} pairs=${entry.pairs.length} wordmark=${entry.wordmark.length} rectEscape=${entry.rectEscape.length} viewBoxEscape=${entry.viewBoxEscape.length} nearMiss=${entry.nearMiss.length}`);
    if (bad) console.log(JSON.stringify({ pairs: entry.pairs, wordmark: entry.wordmark, rectEscape: entry.rectEscape, viewBoxEscape: entry.viewBoxEscape }, null, 2));
    await page.screenshot({ path: `${OUT}/${fig}${v}-geometry.png` });
  }
}
await browser.close();
writeFileSync(LOGJSON, JSON.stringify(report, null, 2));
console.log(defects === 0 ? 'ALL 16 URDU VARIANTS GEOMETRICALLY CLEAN' : `${defects} GEOMETRY DEFECTS`);
process.exit(defects === 0 ? 0 : 1);
