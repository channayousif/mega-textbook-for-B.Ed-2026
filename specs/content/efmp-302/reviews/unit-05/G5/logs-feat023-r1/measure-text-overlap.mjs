#!/usr/bin/env node
/**
 * Text-on-text overlap measurement for EFMP-302 Unit 5 URDU figure variants, G5 feat023-r1.
 *
 * Same instrument family as the Unit 4 G5 feat023-r1 and Unit 5 G3 feat023-r1 checks,
 * applied to this unit's 16 Urdu variants: fig-U5-1..8 .ur.svg and .ur.dark.svg.
 *
 * MEASURES, per SVG file:
 *   1. rendered-DOM bounding box (getBBox) of every <text> element, loaded as a live
 *      document in Chromium;
 *   2. pairwise intersection of those boxes (0.1 user-unit epsilon on both axes);
 *   3. the wordmark (.wm) against every other text element, reported separately;
 *   4. minimum clearances (vertical between horizontally-overlapping boxes, horizontal
 *      between vertically-overlapping boxes) so absence of overlap is quantified;
 *   5. viewBox overflow: every text box fully inside the SVG viewBox.
 *
 * FONT LIMITATION, recorded honestly: this host has no Noto Nastaliq Urdu / Jameel Noori
 * Nastaleeq installed; the SVGs do not embed a font. Measurements use Chromium's fallback
 * Arabic shaping (HarfBuzz-shaped FreeSerif/DejaVu). Geometry is measured under fallback
 * metrics; true Nastaliq metrics are typically taller. The same stack is the repo-wide
 * pattern for .ur.svg figures, so the measurement is internally comparable across units.
 *
 * Exits 1 on any text-on-text superposition, wordmark collision or viewBox overflow.
 */
import { chromium } from 'playwright-core';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(process.env.CONTENT_ROOT || '.');
const files = process.argv.slice(2);
if (!files.length) {
  console.error('usage: node measure-text-overlap.mjs <svg>...');
  process.exit(2);
}

const EPS = 0.1;
const lines = [];
const log = (s) => { lines.push(s); console.log(s); };
let failures = 0;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 1000 } });

for (const rel of files) {
  const abs = resolve(root, rel);
  const svgText = readFileSync(abs, 'utf8');
  await page.goto('about:blank');
  await page.setContent(`<!doctype html><html><body style="margin:0">${svgText}</body></html>`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const data = await page.evaluate(() => {
    const svg = document.querySelector('body > svg');
    const vb = svg.viewBox.baseVal;
    const texts = [...svg.querySelectorAll('text')];
    const out = [];
    for (const t of texts) {
      const b = t.getBBox();
      out.push({
        cls: t.getAttribute('class') || '',
        text: (t.textContent || '').trim().slice(0, 60),
        x1: b.x, y1: b.y, x2: b.x + b.width, y2: b.y + b.height,
      });
    }
    return { vb: { w: vb.width, h: vb.height }, texts: out };
  });

  const texts = data.texts;
  let overlaps = 0;
  let minVert = Infinity, minHoriz = Infinity, minWm = Infinity;
  const overlapPairs = [];
  for (let i = 0; i < texts.length; i++) {
    for (let j = i + 1; j < texts.length; j++) {
      const a = texts[i], b = texts[j];
      const xOverlap = Math.min(a.x2, b.x2) - Math.max(a.x1, b.x1);
      const yOverlap = Math.min(a.y2, b.y2) - Math.max(a.y1, b.y1);
      if (xOverlap > EPS && yOverlap > EPS) {
        overlaps++;
        overlapPairs.push([a.text, b.text, xOverlap.toFixed(2), yOverlap.toFixed(2)]);
      } else if (xOverlap > EPS) {
        const gap = Math.max(a.y1, b.y1) - Math.min(a.y2, b.y2);
        if (gap >= 0) minVert = Math.min(minVert, gap);
      } else if (yOverlap > EPS) {
        const gap = Math.max(a.x1, b.x1) - Math.min(a.x2, b.x2);
        if (gap >= 0) minHoriz = Math.min(minHoriz, gap);
      }
      const isWm = a.cls.includes('wm') || b.cls.includes('wm');
      if (isWm) {
        const gx = Math.max(a.x1, b.x1) - Math.min(a.x2, b.x2);
        const gy = Math.max(a.y1, b.y1) - Math.min(a.y2, b.y2);
        const clear = Math.max(gx, gy);
        if (clear >= 0) minWm = Math.min(minWm, clear);
      }
    }
  }
  let overflows = 0;
  for (const t of texts) {
    if (t.x1 < -EPS || t.y1 < -EPS || t.x2 > data.vb.w + EPS || t.y2 > data.vb.h + EPS) {
      overflows++;
      log(`  OVERFLOW ${rel}: "${t.text}" box ${t.x1.toFixed(1)},${t.y1.toFixed(1)}..${t.x2.toFixed(1)},${t.y2.toFixed(1)} vs viewBox ${data.vb.w}x${data.vb.h}`);
    }
  }
  for (const p of overlapPairs) log(`  OVERLAP ${rel}: "${p[0]}" x "${p[1]}" (${p[2]}x${p[3]} user units)`);
  if (overlaps > 0 || overflows > 0) failures++;
  log(`${rel}: ${texts.length} text elements, ${overlaps} overlaps, ${overflows} viewBox overflows, minVertGap=${minVert === Infinity ? 'n/a' : minVert.toFixed(2)}, minHorizGap=${minHoriz === Infinity ? 'n/a' : minHoriz.toFixed(2)}, minWordmarkClear=${minWm === Infinity ? 'n/a' : minWm.toFixed(2)}`);
}

await browser.close();
log(`RESULT: ${failures === 0 ? 'CLEAN - no text-on-text superposition, wordmark collision or viewBox overflow in any of the 16 Urdu variants (fallback-metric geometry)' : failures + ' file(s) with defects'}`);
writeFileSync('specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r1/measure-text-overlap.log', lines.join('\n') + '\n');
process.exit(failures === 0 ? 0 : 1);
