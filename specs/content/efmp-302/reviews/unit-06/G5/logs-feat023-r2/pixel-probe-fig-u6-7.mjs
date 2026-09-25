// Element screenshot + pixel probe of the repaired fig-U6-7 Urdu variants.
// Screenshots the <svg> element itself so viewBox->pixel mapping is exact, then
// reports ink density in the two note-box regions and a control region.
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';

const DIR = 'static/img/figures/efmp-302/unit-06';
const OUT = 'specs/content/efmp-302/reviews/unit-06/G5/renders-feat023-r2';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 700 }, deviceScaleFactor: 2 });

for (const [file, shot, dark] of [
  ['fig-U6-7.ur.svg', 'fig-U6-7.ur-notes.png', false],
  ['fig-U6-7.ur.dark.svg', 'fig-U6-7.ur.dark-notes.png', true],
]) {
  await page.setContent(readFileSync(`${DIR}/${file}`, 'utf8'), { waitUntil: 'load' });
  await page.waitForTimeout(200);
  const svg = page.locator('svg');
  await svg.screenshot({ path: `${OUT}/${shot}` });
  const box = await svg.boundingBox();
  const { w, h, regions } = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    const vb = svg.viewBox.baseVal;
    const r = svg.getBoundingClientRect();
    return { w: r.width, h: r.height, vbw: vb.width, vbh: vb.height, regions: null, vb: { w: vb.width, h: vb.height } };
  });
  console.log(`${file}: rendered ${w}x${h} for viewBox ${box ? 'ok' : '?'}; saved ${shot}`);
  // probe via canvas-free pixel read: use the PNG later; here report text counts per region from the DOM
  const counts = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    const vb = svg.viewBox.baseVal;
    const r = svg.getBoundingClientRect();
    const sx = r.width / vb.width, sy = r.height / vb.height;
    const regions = { note1: [], note2: [], control: [] };
    for (const t of svg.querySelectorAll('text')) {
      const b = t.getBBox();
      const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
      if (cx >= 24 && cx <= 274 && cy >= 196 && cy <= 244) regions.note1.push(t.textContent.trim());
      else if (cx >= 24 && cx <= 274 && cy >= 324 && cy <= 372) regions.note2.push(t.textContent.trim());
      else if (cx >= 24 && cx <= 274 && cy >= 440 && cy <= 468) regions.control.push(t.textContent.trim());
    }
    return regions;
  });
  console.log(`  note1 texts: ${JSON.stringify(counts.note1)}`);
  console.log(`  note2 texts: ${JSON.stringify(counts.note2)}`);
  console.log(`  control texts: ${JSON.stringify(counts.control)}`);
}
await browser.close();
