#!/usr/bin/env node
/**
 * G3 feat023-r1 figure text-geometry measurement for EFMP-302 Unit 5.
 *
 * measure-figure-text.mjs (and render-inspect section D) check viewBox overflow
 * and wordmark collision, but NOT text-on-text superposition - the exact defect
 * class the 2026-09-21 b8f8ffe "SVG re-optimisation" introduced (overlapping
 * tspan baselines) before the 2026-09-24 revert in 69bae9e. This script closes
 * that gap for all 8 unit-05 figures in both EN theme variants.
 *
 * For every <text> element in each SVG document it takes the rendered bounding
 * rect (getBoundingClientRect, includes CSS transforms) and then:
 *   1. reports every pair of distinct text elements whose rects intersect by
 *      more than a 1.5px tolerance in BOTH axes (real superposition, not
 *      metrics touching), with the fraction of the smaller box covered;
 *   2. reports any non-wordmark text whose rect intersects the wordmark rect;
 *   3. reports any text rect extending past the viewBox.
 *
 * Part 2 re-measures the ERQ rubric <table> at 360px per references/g3.md:
 * scroll the table itself (not its wrapper) and re-measure the "Strong (4-5)"
 * column, and record tabindex/role/aria-label.
 */
import { chromium } from 'playwright-core';
import { readdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = resolve(process.cwd());
const FIGDIR = join(ROOT, 'static/img/figures/efmp-302/unit-05');
const BASE = 'http://localhost:3000';
const OUT = join(ROOT, 'specs/content/efmp-302/reviews/unit-05/G3/logs-feat023-r1/figure-text-overlap.log');

const lines = [];
const say = (s) => { lines.push(s); console.log(s); };

const figs = readdirSync(FIGDIR).filter((f) => /^fig-U5-\d\.svg$/.test(f)).sort();
const variants = [];
for (const f of figs) { variants.push(f); variants.push(f.replace('.svg', '.dark.svg')); }
variants.sort();

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

say('### figure text-geometry overlap measurement - EFMP-302 unit 05 (feat023-r1)');
say('### method: rendered getBoundingClientRect of every <text> element; pairwise intersection >1.5px in both axes = superposition');
say(`### started: ${new Date().toISOString()}`);
say('');

let hardDefects = 0;
let softNotes = 0;

for (const v of variants) {
  const url = `${BASE}/img/figures/efmp-302/unit-05/${v}`;
  await page.goto(url, { waitUntil: 'networkidle' });
  const r = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    const vb = svg.viewBox.baseVal;
    const texts = [...svg.querySelectorAll('text')].map((t) => {
      const b = t.getBoundingClientRect();
      return {
        s: (t.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 70),
        cls: t.getAttribute('class') || '',
        x1: b.left, y1: b.top, x2: b.right, y2: b.bottom,
        w: b.width, h: b.height,
      };
    });
    return { vb: { w: vb.width, h: vb.height }, texts,
      docW: document.documentElement.clientWidth };
  });
  const T = r.texts;
  const problems = [];
  const overlaps = [];
  for (let i = 0; i < T.length; i++) {
    for (let j = i + 1; j < T.length; j++) {
      const a = T[i], b = T[j];
      const ox = Math.min(a.x2, b.x2) - Math.max(a.x1, b.x1);
      const oy = Math.min(a.y2, b.y2) - Math.max(a.y1, b.y1);
      if (ox > 1.5 && oy > 1.5) {
        const frac = (ox * oy) / Math.min(a.w * a.h, b.w * b.h);
        overlaps.push({ a: a.s, b: b.s, ox: +ox.toFixed(1), oy: +oy.toFixed(1), frac: +frac.toFixed(2) });
      }
    }
  }
  // wordmark = the text element holding the site domain
  const wm = T.find((t) => /textbook\.com\.pk/.test(t.s));
  let wmHits = [];
  if (wm) {
    wmHits = T.filter((t) => t !== wm
      && Math.min(t.x2, wm.x2) - Math.max(t.x1, wm.x1) > 1.5
      && Math.min(t.y2, wm.y2) - Math.max(t.y1, wm.y1) > 1.5);
  } else {
    problems.push('WORDMARK NOT FOUND');
  }
  // viewBox overflow (rendered rect vs svg client size)
  const svgBox = await page.evaluate(() => {
    const b = document.querySelector('svg').getBoundingClientRect();
    return { x1: b.left, y1: b.top, x2: b.right, y2: b.bottom };
  });
  for (const t of T) {
    if (t.x1 < svgBox.x1 - 1 || t.x2 > svgBox.x2 + 1 || t.y1 < svgBox.y1 - 1 || t.y2 > svgBox.y2 + 1) {
      problems.push(`text past rendered svg box: "${t.s}" [${t.x1},${t.y1},${t.x2},${t.y2}] box=[${svgBox.x1},${svgBox.y1},${svgBox.x2},${svgBox.y2}]`);
    }
  }
  const status = (problems.length === 0 && overlaps.length === 0 && wmHits.length === 0)
    ? 'clean' : 'REVIEW';
  if (problems.length) hardDefects += problems.length;
  if (overlaps.length || wmHits.length) softNotes += overlaps.length + wmHits.length;
  say(`-- ${v}: texts=${T.length} viewBox=${r.vb.w}x${r.vb.h} -> ${status}`
    + (wm ? ` (wordmark "${wm.s}" @[${wm.x1.toFixed(1)},${wm.y1.toFixed(1)}])` : ''));
  for (const o of overlaps) say(`   OVERLAP "${o.a}" x "${o.b}" by ${o.ox}x${o.oy}px (${Math.round(o.frac * 100)}% of smaller box)`);
  for (const t of wmHits) say(`   WORDMARK COLLISION: "${t.s}" [${t.x1.toFixed(1)},${t.y1.toFixed(1)},${t.x2.toFixed(1)},${t.y2.toFixed(1)}]`);
  for (const p of problems) say(`   DEFECT: ${p}`);
}

say('');
say('===== ERQ rubric table re-measure at 360px (per references/g3.md) =====');
await page.setViewportSize({ width: 360, height: 780 });
await page.goto(`${BASE}/semester-1/efmp-302/unit-05/unit-assessment`, { waitUntil: 'networkidle' });
const tbl = await page.evaluate(() => {
  const out = [];
  const tables = [...document.querySelectorAll('table')];
  tables.forEach((table, idx) => {
    const strong = [...table.querySelectorAll('th, td')].find((c) => /Strong \(4-5\)/.test(c.textContent || ''));
    if (!strong) return;
    const before = strong.getBoundingClientRect();
    const fitsBefore = before.right <= 360 && before.left >= 0;
    table.scrollLeft = table.scrollWidth;
    const after = strong.getBoundingClientRect();
    out.push({
      idx,
      tableClient: table.clientWidth,
      tableScroll: table.scrollWidth,
      tabindex: table.getAttribute('tabindex'),
      role: table.getAttribute('role'),
      ariaLabel: table.getAttribute('aria-label'),
      before: { left: +before.left.toFixed(1), right: +before.right.toFixed(1), fits: fitsBefore },
      afterScrollLeft: table.scrollLeft,
      after: { left: +after.left.toFixed(1), right: +after.right.toFixed(1), fits: after.right <= 360 && after.left >= 0 },
    });
  });
  return out;
});
for (const t of tbl) {
  say(`-- table[${t.idx}] client=${t.tableClient} scroll=${t.tableScroll} tabindex=${t.tabindex} role=${t.role} aria="${t.ariaLabel}"`);
  say(`   Strong col before scroll: x ${t.before.left}-${t.before.right} fits=${t.before.fits}; after scrollLeft=${t.afterScrollLeft}: x ${t.after.left}-${t.after.right} fits=${t.after.fits}`);
  if (!t.after.fits) hardDefects++;
}
say('');
say(`### finished: ${new Date().toISOString()}`);
say(`### text-overlap pairs + wordmark collisions: ${softNotes}; hard defects: ${hardDefects}`);
writeFileSync(OUT, lines.join('\n') + '\n');
await browser.close();
process.exit(hardDefects > 0 ? 1 : 0);
