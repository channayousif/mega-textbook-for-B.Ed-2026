// G5 feat023-r1 Urdu figure text-overlap geometry check (evidence artifact).
//
// Instrument: real-browser rendered-DOM geometry. For each of the 20 Urdu figure
// variants, loads the SVG in Chromium and measures the bounding boxes of every
// <text> element, flagging any intersection between DISTINCT text elements
// (allowing the multi-<text> label pattern where consecutive texts are separate
// lines of one label: those are checked too - separate lines must not overlap).
//
// Negative control: a synthetic bad SVG derived from fig-U3-2.ur.svg with one
// text element translated on top of another. The instrument must detect it;
// otherwise the zero result on the real files is not evidence.
import { chromium } from 'playwright-core';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 800 } });

async function measure(svgPath) {
  const svg = readFileSync(svgPath, 'utf8');
  await page.setContent(`<!doctype html><body style="margin:0">${svg}</body>`);
  return page.evaluate(() => {
    const texts = [...document.querySelectorAll('text')];
    const boxes = texts.map((t, i) => {
      const r = t.getBoundingClientRect();
      return { i, x: r.x, y: r.y, w: r.width, h: r.height, content: (t.textContent || '').trim().slice(0, 30) };
    });
    const overlaps = [];
    const near = [];
    for (let a = 0; a < boxes.length; a++) {
      for (let b = a + 1; b < boxes.length; b++) {
        const A = boxes[a];
        const B = boxes[b];
        const xOverlap = Math.min(A.x + A.w, B.x + B.w) - Math.max(A.x, B.x);
        const yOverlap = Math.min(A.y + A.h, B.y + B.h) - Math.max(A.y, B.y);
        if (xOverlap > 0.5 && yOverlap > 0.5) {
          overlaps.push({ a: A.content, b: B.content, xOverlap: Math.round(xOverlap * 10) / 10, yOverlap: Math.round(yOverlap * 10) / 10 });
        } else if (xOverlap > -2 && yOverlap > -2 && (xOverlap > 0 || yOverlap > 0)) {
          near.push({ a: A.content, b: B.content, gapX: Math.round(xOverlap * 10) / 10, gapY: Math.round(yOverlap * 10) / 10 });
        }
      }
    }
    return { file: '', textCount: boxes.length, overlaps, nearMisses: near };
  });
}

const dir = 'static/img/figures/efmp-302/unit-03/';
const files = [];
for (let n = 1; n <= 10; n++) {
  files.push(`fig-U3-${n}.ur.svg`, `fig-U3-${n}.ur.dark.svg`);
}

const results = {};
let totalOverlaps = 0;
for (const f of files) {
  const r = await measure(dir + f);
  r.file = f;
  results[f] = r;
  totalOverlaps += r.overlaps.length;
  console.log(`${f}: texts=${r.textCount} overlaps=${r.overlaps.length} nearMisses=${r.nearMisses.length}${r.overlaps.length ? ' -> ' + JSON.stringify(r.overlaps) : ''}${r.nearMisses.length ? ' near=' + JSON.stringify(r.nearMisses) : ''}`);
}

// Negative control: shift the 4th text element of fig-U3-2.ur.svg onto the 3rd.
const bad = readFileSync(dir + 'fig-U3-2.ur.svg', 'utf8');
const parts = bad.split(/(<text\b)/);
if (parts.length > 9) {
  // find the y of the 3rd text and force the 4th to the same position
  const control = bad.replace(/(<text[^>]*?)(y=")(\d+)(")([^>]*>)/g, (m, pre, yq, yv, yq2, post, offset) => m);
  // simpler deterministic mutation: take the first two <text> elements and give the second the first's x/y
  const textMatches = [...bad.matchAll(/<text[^>]*>/g)];
  if (textMatches.length >= 2) {
    const first = textMatches[0][0];
    const second = textMatches[1][0];
    const xy = /x="([\d.]+)" y="([\d.]+)"/.exec(first);
    if (xy) {
      const forcedSecond = second.replace(/x="[\d.]+" y="[\d.]+"/, `x="${xy[1]}" y="${xy[2]}"`);
      const mutated = bad.replace(second, forcedSecond);
      writeFileSync('/tmp/fig-U3-2.ur.control-bad.svg', mutated);
      const r = await measure('/tmp/fig-U3-2.ur.control-bad.svg');
      r.file = 'NEGATIVE-CONTROL fig-U3-2.ur (text[1] forced onto text[0] position)';
      results['control-bad'] = r;
      console.log(`NEGATIVE CONTROL: overlaps=${r.overlaps.length} ${r.overlaps.length ? '-> ' + JSON.stringify(r.overlaps.slice(0, 2)) : 'INSTRUMENT INSENSITIVE'}`);
      totalOverlaps += 0; // control does not count toward the real total
    }
  }
}

await browser.close();
writeFileSync('specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r1/fig-text-overlap-ur.json', JSON.stringify(results, null, 2));
const control = results['control-bad'];
const controlDetects = control && control.overlaps.length > 0;
console.log(`total overlaps on the 20 committed Urdu variants: ${totalOverlaps}`);
console.log(`negative control detects: ${controlDetects ? 'YES (' + control.overlaps.length + ' overlap pair(s))' : 'NO - INSTRUMENT INVALID'}`);
console.log(totalOverlaps === 0 && controlDetects ? 'URDU-FIGURES-CLEAN-INSTRUMENT-VALID' : 'DEFECTS-OR-INVALID-INSTRUMENT');
