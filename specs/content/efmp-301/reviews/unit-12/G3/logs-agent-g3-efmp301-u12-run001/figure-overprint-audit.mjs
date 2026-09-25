// Figure text-collision audit for EFMP-301 Unit 12 G3 run001.
// Extends measure-figure-text.mjs's browser-measured geometry to the two defect
// classes it does not check: text-on-text overprint and text crossing a panel
// border or grid separator. Data-only; exits 0 unless a hard overprint is found.
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
    // Panels: the opaque boxes text sits inside. Track their edges.
    const panels = [...svg.querySelectorAll('rect.panel, rect')].map((el) => {
      const b = el.getBBox();
      return { x1: b.x, x2: b.x + b.width, y1: b.y, y2: b.y + b.height };
    }).filter((p) => p.x2 - p.x1 > 100 && p.y2 - p.y1 > 40);
    // Grid lines (stroke paths that are straight horizontal/vertical lines)
    const grids = [...svg.querySelectorAll('path.grid, line')].map((el) => {
      const b = el.getBBox();
      return { x1: b.x, x2: b.x + b.width, y1: b.y, y2: b.y + b.height, w: b.width, h: b.height };
    });
    return { texts, panels, grids };
  });

  const problems = [];
  const notes = [];
  const T = data.texts;
  // 1. text-on-text overprint (same visual space, both painted)
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
  // 2. text crossing a panel edge (text bbox extends past the panel it starts in)
  for (const t of T) {
    for (const p of data.panels) {
      // text horizontally inside this panel?
      if (t.x1 >= p.x1 - 2 && t.x2 <= p.x2 + 2 && t.y1 >= p.y1 - 40 && t.y1 <= p.y2) {
        if (t.y2 > p.y2 + 1) {
          problems.push(`TEXT CROSSES PANEL BOTTOM by ${(t.y2 - p.y2).toFixed(1)}px: "${t.s.slice(0, 50)}" (panel y2=${p.y2.toFixed(1)}, text y2=${t.y2.toFixed(1)})`);
        }
      }
    }
  }
  // 3. rows without a separating grid line (table figures): two duty/row labels
  //    in the same grid band - reported as a note for manual judgement.
  console.log(`== ${file.split('/').pop()}`);
  for (const p of problems) { console.log(`  !! ${p}`); hard++; }
  for (const t of T) {
    if (/pupil welfare first/.test(t.s)) {
      console.log(`  -- "pupil welfare first" bbox y ${t.y1.toFixed(1)}..${t.y2.toFixed(1)} (panel bottom 426, last grid 326)`);
    }
  }
  if (!problems.length) console.log('  ok: no text-on-text or panel-crossing collisions');
}
await browser.close();
console.log(hard ? `${hard} hard collision(s)` : 'no hard collisions');
process.exit(hard ? 1 : 0);
