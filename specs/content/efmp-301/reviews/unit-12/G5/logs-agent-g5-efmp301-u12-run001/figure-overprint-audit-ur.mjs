// Urdu figure text-collision audit for EFMP-301 Unit 12 G5 run001.
// Browser-measures every text bbox in the six .ur.svg variants (light + dark)
// for text-on-text overprint, panel-border crossing and column-boundary
// crossing in the RTL table figures. Data-only; exits 1 on a hard collision.
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';

const files = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage();
let hard = 0;

for (const file of files) {
  await page.setContent(readFileSync(file, 'utf8'), { waitUntil: 'load' });
  const data = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    const texts = [...svg.querySelectorAll('text')].map((t) => {
      const b = t.getBBox();
      return {
        cls: t.getAttribute('class') || '',
        s: t.textContent,
        x1: b.x, x2: b.x + b.width, y1: b.y, y2: b.y + b.height,
      };
    });
    const panels = [...svg.querySelectorAll('rect.panel, rect')].map((el) => {
      const b = el.getBBox();
      return { x1: b.x, x2: b.x + b.width, y1: b.y, y2: b.y + b.height };
    }).filter((p) => p.x2 - p.x1 > 100 && p.y2 - p.y1 > 40);
    // Vertical grid lines (column separators) in table figures: paths/lines
    // whose bbox is tall and nearly zero-width.
    const vlines = [...svg.querySelectorAll('path.grid, line')].map((el) => {
      const b = el.getBBox();
      return { x1: b.x, x2: b.x + b.width, y1: b.y, y2: b.y + b.height, w: b.width, h: b.height };
    }).filter((g) => g.h > 100 && g.w < 3);
    return { texts, panels, vlines };
  });

  const problems = [];
  const T = data.texts;
  // 1. text-on-text overprint
  for (let i = 0; i < T.length; i++) {
    for (let j = i + 1; j < T.length; j++) {
      const a = T[i], b = T[j];
      const ox = Math.min(a.x2, b.x2) - Math.max(a.x1, b.x1);
      const oy = Math.min(a.y2, b.y2) - Math.max(a.y1, b.y1);
      if (ox > 1 && oy > 1) {
        problems.push(`TEXT-ON-TEXT "${a.s.slice(0, 40)}" x "${b.s.slice(0, 40)}" overlap ${ox.toFixed(1)}x${oy.toFixed(1)}px`);
      }
    }
  }
  // 2. text crossing a panel edge
  for (const t of T) {
    for (const p of data.panels) {
      if (t.x1 >= p.x1 - 2 && t.x2 <= p.x2 + 2 && t.y1 >= p.y1 - 40 && t.y1 <= p.y2) {
        if (t.y2 > p.y2 + 1) {
          problems.push(`TEXT CROSSES PANEL BOTTOM by ${(t.y2 - p.y2).toFixed(1)}px: "${t.s.slice(0, 50)}" (panel y2=${p.y2.toFixed(1)}, text y2=${t.y2.toFixed(1)})`);
        }
      }
    }
  }
  // 3. column-boundary crossing (RTL tables): a body text whose bbox crosses a
  //    vertical grid line it should stop at. Column cells lie between vlines;
  //    a text is flagged when it starts inside one column band and crosses a
  //    vline into the neighbouring band occupied by another text.
  for (const t of T) {
    if (!/body|sh/.test(t.cls)) continue;
    for (const g of data.vlines) {
      if (t.x1 < g.x1 - 1 && t.x2 > g.x1 + 1) {
        // crosses this vline; is there another text on the far side in the same y band?
        const far = T.find((o) => o !== t && o.y1 < t.y2 && o.y2 > t.y1 &&
          ((o.x1 >= g.x1 && t.x1 < g.x1) || (o.x2 <= g.x1 && t.x2 > g.x1)));
        if (far) {
          problems.push(`COLUMN CROSSING at x=${g.x1.toFixed(0)}: "${t.s.slice(0, 35)}" (bbox ${t.x1.toFixed(0)}..${t.x2.toFixed(0)}) crosses toward "${far.s.slice(0, 25)}"`);
        }
      }
    }
  }
  console.log(`== ${file.split('/').pop()}`);
  for (const p of problems) { console.log(`  !! ${p}`); hard++; }
  if (!problems.length) console.log('  ok: no text-on-text, panel-crossing or column-crossing collisions');
  // Dump the fifth-row geometry for fig-U12-3 (the G3 repair locus)
  if (/fig-U12-3\.ur/.test(file)) {
    for (const t of T) {
      if (/فلاح|ساکھ/.test(t.s)) {
        console.log(`  -- "${t.s.slice(0, 40)}" bbox x ${t.x1.toFixed(1)}..${t.x2.toFixed(1)} y ${t.y1.toFixed(1)}..${t.y2.toFixed(1)}`);
      }
    }
    console.log(`  -- vlines: ${data.vlines.map((g) => `x=${g.x1.toFixed(0)} (y ${g.y1.toFixed(0)}..${g.y2.toFixed(0)})`).join('; ')}`);
  }
}
await browser.close();
console.log(hard ? `${hard} hard collision(s)` : 'no hard collisions');
process.exit(hard ? 1 : 0);
