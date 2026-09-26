// Figure-internal text geometry with text-on-text overlap detection - URDU VARIANTS.
// G5 feat023-r1b adaptation of the G3 feat023-r1 instrument (validated there by a
// negative control on the b8f8ffe bytes, which flagged 25 stacked-baseline
// superpositions). Same measurements, pointed at the 16 .ur.svg / .ur.dark.svg
// variants of EFMP-302 unit-06:
//   1. pairwise text-on-text superposition
//   2. wordmark collision
//   3. text escaping its enclosing rect
//   4. text crossing the viewBox edge

import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4628';
const OUT = 'specs/content/efmp-302/reviews/unit-06/G5/renders-feat023-r1b';
const LOGJSON = 'specs/content/efmp-302/reviews/unit-06/G5/logs-feat023-r1b/figure-geometry-overlap-ur.json';
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
    const file = `${fig}${v}.svg`;
    const url = `${BASE}/img/figures/efmp-302/unit-06/${file}`;
    await page.goto(url, { waitUntil: 'load' });
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
        const o = overlap(others[i], others[j]);
        if (o.w > 0 && o.h > 0) {
          const rec = { a: others[i].txt, b: others[j].txt, overlapW: +o.w.toFixed(2), overlapH: +o.h.toFixed(2), area: +(o.w * o.h).toFixed(1) };
          if (o.w > TOL && o.h > TOL) entry.pairs.push(rec); else entry.nearMiss.push(rec);
        }
      }
    }
    for (const w of wm) {
      for (const o of others) {
        const ov = overlap(w, o);
        if (ov.w > TOL && ov.h > TOL) entry.wordmark.push({ text: o.txt, overlapW: +ov.w.toFixed(2), overlapH: +ov.h.toFixed(2) });
      }
    }
    for (const l of others) {
      for (const r of m.rects) {
        const startsInside = l.x >= r.x - 2 && l.x <= r.x + r.width && l.y >= r.y - 2 && l.y <= r.y + r.height + 2;
        if (!startsInside) continue;
        const overR = l.x + l.width - (r.x + r.width);
        const overL = r.x - l.x;
        const overB = l.y + l.height - (r.y + r.height);
        if (overR > TOL || overL > TOL || overB > TOL) {
          entry.rectEscape.push({ text: l.txt, rectClass: r.cls, textRight: +(l.x + l.width).toFixed(1), rectRight: +(r.x + r.width).toFixed(1), overflowRight: +Math.max(0, overR).toFixed(1), overflowLeft: +Math.max(0, overL).toFixed(1), overflowBottom: +Math.max(0, overB).toFixed(1) });
        }
      }
    }
    for (const l of m.leaves) {
      if (l.x < -TOL || l.y < -TOL || l.x + l.width > m.vb.w + TOL || l.y + l.height > m.vb.h + TOL) {
        entry.viewBoxEscape.push({ text: l.txt, right: +(l.x + l.width).toFixed(1), bottom: +(l.y + l.height).toFixed(1) });
      }
    }
    const bad = entry.pairs.length || entry.wordmark.length || entry.viewBoxEscape.length;
    if (bad) defects++;
    entry.verdict = bad ? 'DEFECT' : (entry.rectEscape.length ? 'clean (rect escape only)' : 'clean');
    report.push(entry);
    await page.screenshot({ path: `${OUT}/${fig}${v === '.ur' ? '.ur.light' : '.ur.dark'}-geometry.png` });
    console.log(`${file} [${entry.viewBox}] leaves=${entry.textLeaves} pairs=${entry.pairs.length} wm=${entry.wordmark.length} rectEscape=${entry.rectEscape.length} vbEscape=${entry.viewBoxEscape.length} nearMiss=${entry.nearMiss.length} -> ${entry.verdict}`);
    for (const p of entry.pairs) console.log(`   TEXT-ON-TEXT "${p.a}" x "${p.b}" overlap ${p.overlapW}x${p.overlapH} area ${p.area}`);
    for (const w of entry.wordmark) console.log(`   WORDMARK "${w.text}" overlap ${w.overlapW}x${w.overlapH}`);
    for (const e of entry.rectEscape) console.log(`   RECT-ESCAPE [${e.rectClass}] "${e.text}" textRight=${e.textRight} rectRight=${e.rectRight} overRight=${e.overflowRight} overLeft=${e.overflowLeft} overBottom=${e.overflowBottom}`);
    for (const e of entry.viewBoxEscape) console.log(`   VIEWBOX-ESCAPE "${e.text}" right=${e.right} bottom=${e.bottom}`);
    for (const n of entry.nearMiss) console.log(`   near-miss "${n.a}" x "${n.b}" ${n.overlapW}x${n.overlapH}`);
  }
}

writeFileSync(LOGJSON, JSON.stringify(report, null, 1));
console.log(`\nfiles measured: ${report.length}, with text-on-text/wordmark/viewBox defects: ${defects}`);
await browser.close();
