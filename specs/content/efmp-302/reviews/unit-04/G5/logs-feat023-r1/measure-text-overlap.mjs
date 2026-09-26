#!/usr/bin/env node
/**
 * Text-on-text overlap measurement for EFMP-302 Unit 4 URDU figure variants, G5 feat023-r1.
 *
 * Adapted from the G3 feat023-r1 instrument (which covered the 16 EN theme variants) to
 * cover the 16 Urdu variants: fig-U4-1..8 .ur.svg and .ur.dark.svg.
 *
 * MEASURES, per SVG file:
 *   1. rendered-DOM bounding box (getBBox) of every <text> element, loaded as a live
 *      document in Chromium;
 *   2. pairwise intersection of those boxes (0.1 user-unit epsilon on both axes);
 *   3. the wordmark (.wm) against every other text element, reported separately;
 *   4. pixel ink-intersection for every candidate pair (alpha-mask AND of two rasters,
 *      each with only one of the two texts visible).
 *
 * FONT LIMITATION, recorded honestly: this host has no Noto Nastaliq Urdu / Jameel Noori
 * Nastaleeq installed (fc-list :lang=ur -> FreeMono/FreeSerif/Unifont only), and the SVGs
 * do not embed a font. Measurements therefore use Chromium's fallback Arabic shaping
 * (HarfBuzz-shaped FreeSerif/DejaVu). The geometry is measured under fallback metrics;
 * true Nastaliq metrics are typically taller. The same stack is the repo-wide pattern
 * (unit-03, unit-05 .ur.svg figures use the identical font-family).
 *
 * Exits 1 on any real ink superposition or wordmark collision, 0 otherwise.
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

const EPS = 0.1;
const results = [];
let failures = 0;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 1000 } });

async function measureFile(rel) {
  const abs = resolve(root, rel);
  const svgText = readFileSync(abs, 'utf8');
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
const outPath = resolve(root, 'specs/content/efmp-302/reviews/unit-04/G5/renders-feat023-r1/text-overlap-measurement.json');
writeFileSync(outPath, JSON.stringify({ measured_at: new Date().toISOString(), epsilon_user_units: EPS, font_limitation: 'host has no Nastaliq font; fallback Arabic metrics used', results }, null, 2));
console.log(`wrote ${outPath}`);
process.exit(failures === 0 ? 0 : 1);
