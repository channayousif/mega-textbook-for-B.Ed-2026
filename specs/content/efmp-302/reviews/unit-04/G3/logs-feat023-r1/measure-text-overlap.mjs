#!/usr/bin/env node
/**
 * Text-on-text overlap measurement for EFMP-302 Unit 4 figures, G3 feat023-r1.
 *
 * WHY THIS EXISTS. The 2026-09-21 b8f8ffe "SVG re-optimisation" broke text layout in
 * nearly every EFMP-302 figure (overlapping tspan baselines); it was reverted on
 * 2026-09-24 by 69bae9e. Neither `scripts/measure-figure-text.mjs` nor the D section of
 * `scripts/render-inspect.mjs` measures text-against-TEXT geometry: both check text
 * against the viewBox and against the wordmark only. This script closes that gap.
 *
 * WHAT IT MEASURES, per SVG file (all 8 unit-04 figures, both theme variants):
 *   1. The rendered-DOM bounding box (SVGLocatable.getBBox, the tight glyph union in
 *      user units) of every <text> element, loaded as a live document in Chromium.
 *   2. Pairwise intersection of those boxes: any pair of distinct text elements whose
 *      boxes intersect by more than 0.1 user units on BOTH axes is a candidate
 *      superposition.
 *   3. The wordmark (.wm) against every other text element, reported separately.
 *   4. For every candidate pair, a pixel ink-intersection check: the SVG is rasterised
 *      twice into canvases with only one of the two texts visible each time, and the
 *      alpha masks are ANDed. A shared ink pixel is a real glyph superposition; bbox
 *      slack alone (adjacent lines whose em-boxes touch) is not.
 *
 * Exits 1 if any real superposition or wordmark collision is found, 0 otherwise.
 * Advisory bbox contacts with zero shared ink pixels are reported but do not fail.
 */
import { chromium } from 'playwright-core';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';

const root = resolve(process.env.CONTENT_ROOT || '.');
const files = process.argv.slice(2);
if (!files.length) {
  console.error('usage: node measure-text-overlap.mjs <svg>...');
  process.exit(2);
}

const EPS = 0.1; // user-unit epsilon: ignore sub-tenth contacts
const results = [];
let failures = 0;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 1000 } });

async function measureFile(rel) {
  const abs = resolve(root, rel);
  const svgText = readFileSync(abs, 'utf8');
  // Load the SVG as a live document so text metrics use the real font stack.
  await page.goto('about:blank');
  await page.setContent(`<!doctype html><html><body style="margin:0">${svgText}</body></html>`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const data = await page.evaluate(() => {
    const svg = document.querySelector('body > svg');
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
    return out;
  });

  const candidates = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      const a = data[i], b = data[j];
      const ox = Math.min(a.x2, b.x2) - Math.max(a.x1, b.x1);
      const oy = Math.min(a.y2, b.y2) - Math.max(a.y1, b.y1);
      if (ox > EPS && oy > EPS) {
        candidates.push({ i, j, ox: +ox.toFixed(2), oy: +oy.toFixed(2) });
      }
    }
  }
  const wm = data.findIndex((d) => d.cls.split(/\s+/).includes('wm'));
  const wmCollisions = wm === -1 ? [] : candidates.filter((c) => c.i === wm || c.j === wm);
  const textOnText = candidates.filter((c) => c.i !== wm && c.j !== wm);

  // Pixel ink-intersection for every candidate pair.
  const ink = [];
  for (const c of candidates) {
    const shared = await page.evaluate(async ({ idxA, idxB }) => {
      const svg = document.querySelector('body > svg');
      const PAINTABLE = 'rect,path,line,circle,ellipse,polyline,polygon,text,image,use';
      const serializeWithOnly = (keepIdx) => {
        const clone = svg.cloneNode(true);
        const texts = [...clone.querySelectorAll('text')];
        for (const el of clone.querySelectorAll(PAINTABLE)) {
          if (el.tagName !== 'text' || !texts.includes(el)) el.setAttribute('visibility', 'hidden');
        }
        // keep only texts[keepIdx] visible
        texts.forEach((t, k) => { if (k !== keepIdx) t.setAttribute('visibility', 'hidden'); });
        return new XMLSerializer().serializeToString(clone);
      };
      const raster = async (svgStr) => {
        const img = new Image();
        const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);
        await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
        const vb = svg.getAttribute('viewBox').split(/\s+/).map(Number);
        const canvas = document.createElement('canvas');
        canvas.width = vb[2]; canvas.height = vb[3];
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, vb[2], vb[3]);
        const d = ctx.getImageData(0, 0, vb[2], vb[3]).data;
        const mask = new Uint8Array(vb[2] * vb[3]);
        for (let p = 0; p < mask.length; p++) mask[p] = d[p * 4 + 3] > 8 ? 1 : 0;
        return mask;
      };
      const mA = await raster(serializeWithOnly(idxA));
      const mB = await raster(serializeWithOnly(idxB));
      let sharedPixels = 0;
      for (let p = 0; p < mA.length; p++) if (mA[p] && mB[p]) sharedPixels++;
      return sharedPixels;
    }, { idxA: c.i, idxB: c.j });
    ink.push({ pair: [data[c.i].text, data[c.j].text], sharedPixels: shared });
  }

  return { file: basename(rel), texts: data.length, candidates, wmCollisions, textOnText, ink };
}

for (const rel of files) {
  const r = await measureFile(rel);
  const realOverlaps = r.ink.filter((k) => k.sharedPixels > 0);
  const status = realOverlaps.length === 0 ? 'clean' : 'TEXT-ON-TEXT OVERLAP';
  if (realOverlaps.length > 0) failures++;
  results.push(r);
  const wmNote = r.wmCollisions.length
    ? ` wordmark-candidates=${r.wmCollisions.length}`
    : ' wordmark-collisions=0';
  console.log(`${status === 'clean' ? 'OK ' : 'FAIL'} ${rel} texts=${r.texts}${wmNote}` +
    ` text-on-text-candidates=${r.textOnText.length}` +
    (r.candidates.length ? ` bbox-contacts=${r.candidates.length} ink-verified-overlaps=${realOverlaps.length}` : ' bbox-contacts=0'));
  for (const k of r.ink) {
    if (k.sharedPixels > 0) {
      console.log(`     REAL OVERLAP (${k.sharedPixels} shared ink px): "${k.pair[0]}" <-> "${k.pair[1]}"`);
    } else if (r.candidates.length) {
      console.log(`     bbox contact, zero shared ink: "${k.pair[0]}" <-> "${k.pair[1]}"`);
    }
  }
}

await browser.close();
const outPath = resolve(root, 'specs/content/efmp-302/reviews/unit-04/G3/renders-feat023-r1/text-overlap-measurement.json');
writeFileSync(outPath, JSON.stringify({ measured_at: new Date().toISOString(), epsilon_user_units: EPS, results }, null, 2));
console.log(`wrote ${outPath}`);
process.exit(failures === 0 ? 0 : 1);
