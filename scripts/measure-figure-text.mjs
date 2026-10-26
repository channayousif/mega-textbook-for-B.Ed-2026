#!/usr/bin/env node
/**
 * Measure text geometry inside committed figure SVGs.
 *
 * Not a content gate (CI runs it on changed SVGs only, in the figure-geometry
 * job). `check:figures` validates the manifest, the carrier and the alt
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
 * A third class reached production in about a thousand places (specs/gaps.md):
 * labels in neighbouring table columns or boxes printing over each other, and
 * text running out of the panel that holds it. So it also fails:
 *   - two different <text> elements that intersect, or that share a line and
 *     sit closer than MIN_GAP px apart (a column label running into the next);
 *   - text that starts inside a painted rect and spills past its edges.
 *
 *   --changed <base>  measure only figure SVGs added or modified since <base>
 *                     (CI uses this, so existing figures never turn a PR red)
 *   --report          per-unit summary of every file; always exits 0
 *
 * Exits 1 if any text overflows the viewBox, overlaps the wordmark or other
 * text, or spills out of its rect, so it can be used in a loop while editing.
 * It is deliberately not wired into
 * `check:figures`: that script is a hashed review-entry input, and adding a
 * browser dependency to the gate path would make every accepted review manifest
 * stale for a check that authors run at edit time.
 */
import { chromium } from 'playwright-core';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

/** Smallest horizontal gap between two labels on the same line, in px. */
const MIN_GAP = 4;
/** How far text may poke past its rect before it counts, in px (anti-aliasing). */
const SPILL_TOLERANCE = 1;

const argv = process.argv.slice(2);
const REPORT = argv.includes('--report');
const changedAt = argv.indexOf('--changed');
let files = argv.filter((a, i) => !a.startsWith('--') && (changedAt === -1 || i !== changedAt + 1));
if (changedAt !== -1) {
  const base = argv[changedAt + 1];
  if (!base) { console.error('--changed needs a base ref, e.g. origin/main'); process.exit(2); }
  const r = spawnSync('git', ['diff', '--name-only', '--diff-filter=AM', `${base}...HEAD`, '--', 'static/img/figures'], { encoding: 'utf8' });
  if (r.status !== 0) { console.error(r.stderr.trim()); process.exit(2); }
  files = r.stdout.split('\n').filter((f) => f.endsWith('.svg'));
  if (!files.length) { console.log(`no figure SVGs changed since ${base}`); process.exit(0); }
}
if (!files.length) {
  console.error('usage: node scripts/measure-figure-text.mjs [--report] [--changed <base>] <svg> [svg...]');
  process.exit(2);
}

const browser = await chromium.launch();
const page = await browser.newPage();
let failures = 0;
let warned = 0;
const report = [];

for (const file of files) {
  await page.setContent(readFileSync(file, 'utf8'), { waitUntil: 'load' });
  const { viewBox, texts, shapes } = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    const vb = svg.viewBox.baseVal;
    return {
      viewBox: [vb.width, vb.height],
      texts: [...svg.querySelectorAll('text')].map((t) => {
        const b = t.getBBox();
        // getBBox height follows the font's ascent and descent, which for Nastaliq is
        // about twice the line it occupies, so stacked lines of one cell would all
        // "overlap". Same-line tests use a band of 0.9em around the box's centre.
        const fs = parseFloat(getComputedStyle(t).fontSize) || 15;
        const cy = b.y + b.height / 2;
        return {
          cls: t.getAttribute('class') || '',
          c1: +(cy - 0.45 * fs).toFixed(1), c2: +(cy + 0.45 * fs).toFixed(1),
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
          rect: el.tagName === 'rect',
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

  // Labels over labels: the wordmark has its own check above, so it is left out here.
  const labels = texts.filter((t) => t.cls !== 'wm' && t.x2 > t.x1);
  for (let i = 0; i < labels.length; i++) {
    for (let k = i + 1; k < labels.length; k++) {
      const [a, b] = labels[i].x1 <= labels[k].x1 ? [labels[i], labels[k]] : [labels[k], labels[i]];
      const vertical = Math.min(a.c2, b.c2) - Math.max(a.c1, b.c1);
      if (vertical <= 0) continue;
      const gap = b.x1 - a.x2;
      if (gap < 0 && a.x2 > b.x1) problems.push(`overlaps other text by ${(-gap).toFixed(1)}px: "${a.s.slice(0, 40)}" / "${b.s.slice(0, 40)}"`);
      else if (gap < MIN_GAP) problems.push(`only ${gap.toFixed(1)}px from the next label (need ${MIN_GAP}): "${a.s.slice(0, 40)}" / "${b.s.slice(0, 40)}"`);
    }
  }
  // Text out of its panel: the holder is the smallest rect containing where the text
  // starts. Text that starts in no rect (an axis label, a free caption) is not checked.
  const rects = shapes.filter((sh) => sh.rect);
  for (const t of labels) {
    const midY = (t.c1 + t.c2) / 2;
    const holder = rects
      .filter((r) => t.x1 >= r.x1 && t.x1 <= r.x2 && midY >= r.y1 && midY <= r.y2)
      .sort((p, q) => (p.x2 - p.x1) * (p.y2 - p.y1) - (q.x2 - q.x1) * (q.y2 - q.y1))[0];
    if (!holder) continue;
    const spill = Math.max(t.x2 - holder.x2, holder.x1 - t.x1, t.c2 - holder.y2, holder.y1 - t.c1);
    if (spill > SPILL_TOLERANCE) problems.push(`spills ${spill.toFixed(1)}px out of its .${holder.cls} [${holder.x1},${holder.y1},${holder.x2},${holder.y2}]: "${t.s.slice(0, 60)}"`);
  }

  if (REPORT) {
    report.push({ file, problems: problems.length });
    if (problems.length) failures += problems.length;
    continue;
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
if (REPORT) {
  // One line per unit folder: course/unit-NN, files with problems, problem count.
  const units = new Map();
  for (const { file, problems } of report) {
    const key = file.replace(/^.*static\/img\/figures\//, '').replace(/\/[^/]+$/, '');
    const u = units.get(key) || { files: 0, bad: 0, problems: 0 };
    u.files++; if (problems) u.bad++; u.problems += problems;
    units.set(key, u);
  }
  for (const [key, u] of [...units].sort()) if (u.problems) console.log(`${key}\t${u.bad}/${u.files} files\t${u.problems} problem(s)`);
  const badUnits = [...units.values()].filter((u) => u.problems).length;
  console.log(`\n${failures} problem(s) in ${badUnits} of ${units.size} unit folder(s), ${report.length} SVGs measured.`);
  process.exit(0);
}
if (warned) console.log(`\n${warned} cosmetic wordmark collision(s) - reported, not failed.`);
if (failures) {
  console.log(`\n${failures} text-geometry problem(s).`);
  process.exit(1);
}
