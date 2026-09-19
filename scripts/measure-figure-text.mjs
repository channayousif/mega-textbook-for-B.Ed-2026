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

for (const file of files) {
  await page.setContent(readFileSync(file, 'utf8'), { waitUntil: 'load' });
  const { viewBox, texts } = await page.evaluate(() => {
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
    };
  });

  const problems = [];
  for (const t of texts) {
    if (t.x2 > viewBox[0]) problems.push(`overflows right edge by ${(t.x2 - viewBox[0]).toFixed(1)}px: "${t.s.slice(0, 60)}"`);
    if (t.y2 > viewBox[1]) problems.push(`overflows bottom edge by ${(t.y2 - viewBox[1]).toFixed(1)}px: "${t.s.slice(0, 60)}"`);
  }
  // The wordmark sits bottom right; a caption growing into it is invisible to
  // every other check and renders as run-together text.
  const wm = texts.find((t) => t.cls === 'wm');
  if (wm) {
    for (const t of texts) {
      if (t === wm) continue;
      if (t.x2 > wm.x1 && t.x1 < wm.x2 && t.y2 > wm.y1 && t.y1 < wm.y2) {
        problems.push(`overprints the wordmark (ends ${t.x2}, wordmark starts ${wm.x1}): "${t.s.slice(0, 60)}"`);
      }
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
}

await browser.close();
if (failures) {
  console.log(`\n${failures} text-geometry problem(s).`);
  process.exit(1);
}
