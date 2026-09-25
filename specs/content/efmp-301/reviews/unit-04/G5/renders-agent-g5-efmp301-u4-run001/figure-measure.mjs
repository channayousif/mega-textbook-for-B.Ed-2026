// G5 evidence: pixel statistics for every saved PNG (proves non-blank real renders)
// plus direct measurement of the Urdu SVG variants loaded as documents: every
// <text> bbox is checked against the viewBox (clipping) and against every other
// text bbox (overprint), and the resolved font stack is reported.
import { chromium } from 'playwright';
import sharp from 'sharp';
import { readdirSync, writeFileSync } from 'node:fs';

const OUT = 'specs/content/efmp-301/reviews/unit-04/G5/renders-agent-g5-efmp301-u4-run001';
const log = [];
const say = (m) => { log.push(m); console.log(m); };

// ---------- 1. Pixel statistics over saved PNGs ----------
const stats = {};
for (const f of readdirSync(OUT).filter((f) => f.endsWith('.png'))) {
  const img = sharp(`${OUT}/${f}`);
  const { width, height } = await img.metadata();
  const { channels } = await img.stats();
  stats[f] = {
    size: `${width}x${height}`,
    stdev: channels.map((c) => Math.round(c.stdev * 10) / 10),
    mean: channels.map((c) => Math.round(c.mean * 10) / 10),
  };
  const blank = channels.every((c) => c.stdev < 2);
  say(`png ${f}: ${width}x${height} stdev=[${stats[f].stdev}] blank=${blank}`);
}

// ---------- 2. SVG-level text measurement ----------
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 600 } });
const SVG_BASE = 'http://localhost:3218/img/figures/efmp-301/unit-04';
const figs = ['fig-U4-1', 'fig-U4-2', 'fig-U4-3', 'fig-U4-4', 'fig-U4-5', 'fig-U4-6'];
const svgResults = {};
for (const fig of figs) {
  for (const variant of ['ur', 'ur.dark']) {
    await page.goto(`${SVG_BASE}/${fig}.${variant}.svg`, { waitUntil: 'networkidle' });
    const m = await page.evaluate(() => {
      const svg = document.documentElement;
      const vb = svg.viewBox.baseVal;
      const texts = [...svg.querySelectorAll('text')];
      const boxes = [];
      for (const t of texts) {
        const b = t.getBBox();
        boxes.push({
          text: t.textContent.trim().slice(0, 30),
          x: Math.round(b.x), y: Math.round(b.y),
          w: Math.round(b.width), h: Math.round(b.height),
          clipped: b.x < -1 || b.y < -1 || b.x + b.width > vb.width + 1 || b.y + b.height > vb.height + 1,
        });
      }
      // pairwise overlap of text bboxes (ignore empty/whitespace-only)
      const overlaps = [];
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i], b = boxes[j];
          if (!a.text || !b.text) continue;
          const ox = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
          const oy = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
          if (ox > 2 && oy > 2) overlaps.push(`${a.text} <-> ${b.text} (${ox}x${oy}px)`);
        }
      }
      const style = getComputedStyle(svg.querySelector('text') || svg);
      return {
        viewBox: `${vb.width}x${vb.height}`,
        textCount: boxes.length,
        clipped: boxes.filter((b) => b.clipped).map((b) => b.text),
        emptyText: boxes.filter((b) => !b.text).length,
        overlaps,
        fontFamily: style.fontFamily.slice(0, 80),
        direction: style.direction,
      };
    });
    svgResults[`${fig}.${variant}`] = m;
    say(`svg ${fig}.${variant}: viewBox=${m.viewBox} texts=${m.textCount} clipped=${JSON.stringify(m.clipped)} overlaps=${m.overlaps.length} empty=${m.emptyText} font="${m.fontFamily}" dir=${m.direction}`);
    if (m.overlaps.length) say(`  OVERLAPS: ${m.overlaps.join(' | ')}`);
  }
}
await browser.close();

writeFileSync(`${OUT}/capture-pixel-stats.json`, JSON.stringify({ pngStats: stats, svgMeasurements: svgResults }, null, 2));
writeFileSync(`${OUT}/figure-measure.log`, log.join('\n') + '\n');
say('measurement complete');
