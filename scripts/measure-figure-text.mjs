#!/usr/bin/env node
/**
 * Measure text geometry inside committed figure SVGs.
 *
 * Not a gate. `check:figures` validates the manifest, the carrier and the alt
 * text; it cannot see where glyphs land, so two defect classes have slipped
 * through it: text overflowing the viewBox (five of thirty-four SVGs, caught by
 * a reviewer), and a caption overprinting the wordmark (introduced by a repair
 * to fig-U4-3 and caught by the run-007 G3 review, which measured 780.1 against
 * a wordmark starting at 775.6).
 *
 * Both came from estimating character widths while editing a caption. This
 * measures instead. Run it after editing any text node in an SVG.
 *
 *   node scripts/measure-figure-text.mjs static/img/figures/efmp-302/unit-04/*.svg
 *
 * Exits 1 if any text overflows the viewBox or overlaps the wordmark, so it can
 * be used in a loop while editing. It is deliberately not wired into
 * `check:figures`: that script is a hashed review-entry input, and adding a
 * browser dependency to the gate path would make every accepted review manifest
 * stale for a check that authors run at edit time.
 */
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';

const files = process.argv.slice(2);
if (!files.length) {
  console.error('usage: node scripts/measure-figure-text.mjs <svg> [svg...]');
  process.exit(2);
}

const browser = await chromium.launch();
const page = await browser.newPage();
let failures = 0;
let warned = 0;

for (const file of files) {
  await page.setContent(readFileSync(file, 'utf8'), { waitUntil: 'load' });
  const { viewBox, texts, shapes } = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    const vb = svg.viewBox.baseVal;
    return {
      viewBox: [vb.width, vb.height],
      texts: [...svg.querySelectorAll('text')].map((t) => {
        const b = t.getBBox();
        return {
          cls: t.getAttribute('class') || '',
          x1: +b.x.toFixed(1), x2: +(b.x + b.width).toFixed(1),
          y1: +b.y.toFixed(1), y2: +(b.y + b.height).toFixed(1),
          s: t.textContent,
        };
      }),
      // Painted shapes, so a box drawn over the wordmark is caught too. The
      // background rect is excluded by area: it covers the whole canvas by design.
      shapes: [...svg.querySelectorAll('rect, circle, ellipse, polygon, path')].flatMap((el) => {
        const b = el.getBBox();
        if (!b.width || !b.height) return [];
        if (b.width * b.height > 0.8 * vb.width * vb.height) return [];
        const cs = getComputedStyle(el);
        if (cs.fill === 'none' && cs.stroke === 'none') return [];
        return [{
          cls: el.getAttribute('class') || el.tagName,
          x1: +b.x.toFixed(1), x2: +(b.x + b.width).toFixed(1),
          y1: +b.y.toFixed(1), y2: +(b.y + b.height).toFixed(1),
        }];
      }),
    };
  });

  const problems = [];
  const warnings = [];
  for (const t of texts) {
    if (t.x2 > viewBox[0]) problems.push(`overflows right edge by ${(t.x2 - viewBox[0]).toFixed(1)}px: "${t.s.slice(0, 60)}"`);
    if (t.y2 > viewBox[1]) problems.push(`overflows bottom edge by ${(t.y2 - viewBox[1]).toFixed(1)}px: "${t.s.slice(0, 60)}"`);
  }
  // The wordmark sits bottom right; a caption growing into it is invisible to
  // every other check and renders as run-together text.
  const wm = texts.find((t) => t.cls === 'wm');
  if (wm) {
    const hits = (a) => a.x2 > wm.x1 && a.x1 < wm.x2 && a.y2 > wm.y1 && a.y1 < wm.y2;
    for (const t of texts) {
      if (t === wm) continue;
      if (hits(t)) problems.push(`overprints the wordmark (ends ${t.x2}, wordmark starts ${wm.x1}): "${t.s.slice(0, 60)}"`);
    }
    // A shape over the wordmark does not hide instructional text and the wordmark is
    // aria-hidden, so this is reported as a collision rather than an accessibility fault.
    for (const sh of shapes) {
      if (!hits(sh)) continue;
      const ox = (Math.min(sh.x2, wm.x2) - Math.max(sh.x1, wm.x1)).toFixed(1);
      const oy = (Math.min(sh.y2, wm.y2) - Math.max(sh.y1, wm.y1)).toFixed(1);
      warnings.push(`shape .${sh.cls} [${sh.x1},${sh.y1},${sh.x2},${sh.y2}] collides with the wordmark by ${ox} x ${oy}px`);
    }
  }

  if (problems.length) {
    failures += problems.length;
    console.log(`✗ ${file}`);
    for (const p of problems) console.log(`    ${p}`);
  } else {
    const widest = texts.reduce((a, t) => (t.x2 > a ? t.x2 : a), 0);
    console.log(`✓ ${file} (${viewBox[0]}x${viewBox[1]}, widest text ends at ${widest}${wm ? `, wordmark at ${wm.x1}` : ''})`);
  }
  // Reported, but not a failure: these hide no instructional label and the wordmark is
  // aria-hidden, so the cost of a risky edit to a committed figure exceeds the benefit.
  warned += warnings.length;
  for (const w of warnings) console.log(`  ~ ${w}`);
}

await browser.close();
if (warned) console.log(`\n${warned} cosmetic wordmark collision(s) - reported, not failed.`);
if (failures) {
  console.log(`\n${failures} text-geometry problem(s).`);
  process.exit(1);
}
