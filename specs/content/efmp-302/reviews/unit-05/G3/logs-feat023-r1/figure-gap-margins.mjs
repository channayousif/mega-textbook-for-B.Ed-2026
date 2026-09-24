#!/usr/bin/env node
/**
 * G3 feat023-r1: quantified text-separation margins for EFMP-302 unit-05
 * figures, both EN theme variants.
 *
 * For every pair of distinct <text> elements:
 *   - pairs whose horizontal extents overlap: the vertical separation
 *     (positive = gap, negative = overlap);
 *   - pairs whose vertical extents overlap: the horizontal separation.
 * The minimum of each, per file, quantifies how far the layout sits from
 * text-on-text superposition. Glyph ink is contained in the element's
 * rendered box, so a positive minimum separation in the relevant axis makes
 * pixel ink-intersection geometrically impossible; a negative value is a
 * real superposition. Also re-checks the wordmark against every other text.
 */
import { chromium } from 'playwright-core';
import { readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const BASE = 'http://localhost:3000';
const OUT = resolve(ROOT, 'specs/content/efmp-302/reviews/unit-05/G3/logs-feat023-r1/figure-gap-margins.log');
const lines = [];
const say = (s) => { lines.push(s); console.log(s); };

const figs = readdirSync(resolve(ROOT, 'static/img/figures/efmp-302/unit-05'))
  .filter((f) => /^fig-U5-\d(\.dark)?\.svg$/.test(f)).sort();

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 620 } });

say('### text-separation margins - EFMP-302 unit-05, all 8 figures x 2 EN theme variants');
say('### minGapV = smallest vertical gap among horizontally-overlapping pairs (negative = overlap)');
say('### minGapH = smallest horizontal gap among vertically-overlapping pairs (negative = overlap)');
say(`### started: ${new Date().toISOString()}`);

let hardDefects = 0;
const closest = [];

for (const f of figs) {
  await page.goto(`${BASE}/img/figures/efmp-302/unit-05/${f}`, { waitUntil: 'networkidle' });
  const boxes = await page.evaluate(() => {
    return [...document.querySelectorAll('svg text')].map((t) => {
      const b = t.getBoundingClientRect();
      return { s: (t.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 55),
        x1: b.left, x2: b.right, y1: b.top, y2: b.bottom };
    });
  });
  let minGapV = Infinity, minGapVPair = null;
  let minGapH = Infinity, minGapHPair = null;
  let overlaps = 0;
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], b = boxes[j];
      const ox = Math.min(a.x2, b.x2) - Math.max(a.x1, b.x1);
      const oy = Math.min(a.y2, b.y2) - Math.max(a.y1, b.y1);
      if (ox > 0) {
        const gap = Math.max(a.y1, b.y1) - Math.min(a.y2, b.y2);
        if (gap < minGapV) { minGapV = gap; minGapVPair = [a.s, b.s]; }
        if (gap <= 0) overlaps++;
      }
      if (oy > 0) {
        const gap = Math.max(a.x1, b.x1) - Math.min(a.x2, b.x2);
        if (gap < minGapH) { minGapH = gap; minGapHPair = [a.s, b.s]; }
        if (gap <= 0) overlaps++;
      }
    }
  }
  // wordmark isolation check
  const wm = boxes.find((t) => /textbook\.com\.pk/.test(t.s));
  let wmMinGap = Infinity;
  if (wm) {
    for (const t of boxes) {
      if (t === wm) continue;
      const ox = Math.min(t.x2, wm.x2) - Math.max(t.x1, wm.x1);
      const oy = Math.min(t.y2, wm.y2) - Math.max(t.y1, wm.y1);
      if (ox > 0 && oy > 0) { wmMinGap = -1; } // true box overlap
      else if (ox > 0 || oy > 0) {
        const gap = ox > 0 ? (Math.max(t.y1, wm.y1) - Math.min(t.y2, wm.y2))
          : (Math.max(t.x1, wm.x1) - Math.min(t.x2, wm.x2));
        if (gap < wmMinGap) wmMinGap = gap;
      }
    }
  }
  const bad = overlaps > 0 || (wm && wmMinGap < 0);
  if (bad) hardDefects++;
  say(`-- ${f}: texts=${boxes.length} minGapV=${minGapV.toFixed(2)}px (${minGapVPair ? `"${minGapVPair[0]}" / "${minGapVPair[1]}"` : 'none'})`
    + ` minGapH=${minGapH === Infinity ? 'n/a' : minGapH.toFixed(2) + 'px'} (${minGapHPair ? `"${minGapHPair[0]}" / "${minGapHPair[1]}"` : 'none'})`
    + ` overlappingPairs=${overlaps} wordmarkMinGap=${wm ? (wmMinGap === -1 ? 'BOX OVERLAP' : wmMinGap.toFixed(2) + 'px') : 'wordmark not found'}`);
  if (minGapV < 6) closest.push({ f, minGapV, pair: minGapVPair });
}

say('');
say('### closest horizontally-overlapping pairs (minGapV < 6px), all variants:');
for (const c of closest) say(`   ${c.f}: ${c.minGapV.toFixed(2)}px - "${c.pair ? c.pair[0] : ''}" / "${c.pair ? c.pair[1] : ''}"`);
say(`### finished: ${new Date().toISOString()}`);
say(`### hard defects: ${hardDefects}`);
writeFileSync(OUT, lines.join('\n') + '\n');
await browser.close();
process.exit(hardDefects > 0 ? 1 : 0);
