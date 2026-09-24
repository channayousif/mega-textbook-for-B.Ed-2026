// Second-pass G3 render evidence: figure element shots + pixel stats + print-view shots.
import { chromium } from 'playwright';
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4611';
const OUT = 'specs/content/gnas-301/reviews/unit-03/G3/renders';
const TOPICS = [
  ['topic-01', '/semester-1/gnas-301/unit-03/topic-01'],
  ['topic-02', '/semester-1/gnas-301/unit-03/topic-02'],
  ['topic-03', '/semester-1/gnas-301/unit-03/topic-03'],
  ['topic-04', '/semester-1/gnas-301/unit-03/topic-04'],
];

const browser = await chromium.launch();
const report = { figures: [], printShots: [], generated: new Date().toISOString() };

for (const [name, path] of TOPICS) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  const figs = page.locator('article figure');
  const count = await figs.count();
  for (let i = 0; i < count; i++) {
    const f = figs.nth(i);
    await f.scrollIntoViewIfNeeded();
    await page.waitForTimeout(350); // allow lazy load
    const file = `${OUT}/fig-${name}-${i + 1}.png`;
    await f.screenshot({ path: file });
    const img = sharp(file);
    const stats = await img.stats();
    const stdevs = stats.channels.map((c) => c.stdev.toFixed(1)).join('/');
    const distinct = stats.channels.map((c) => c.unique).join('/');
    report.figures.push({ page: name, index: i + 1, file: file.split('/').pop(), pixelStdev: stdevs, uniqueChannelValues: distinct, caption: await f.locator('figcaption').textContent() });
  }
  await ctx.close();
}

// Print-media full-page screenshots (A4 width) for the assessment answers and one topic with figures
for (const [name, path] of [['unit-assessment', '/semester-1/gnas-301/unit-03/unit-assessment'], ['topic-03', '/semester-1/gnas-301/unit-03/topic-03']]) {
  const ctx = await browser.newContext({ viewport: { width: 794, height: 1123 } });
  const page = await ctx.newPage();
  await page.emulateMedia({ media: 'print' });
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const file = `${OUT}/printview-${name}.png`;
  await page.screenshot({ path: file, fullPage: true });
  const meta = await sharp(file).metadata();
  report.printShots.push({ page: name, file: file.split('/').pop(), width: meta.width, height: meta.height });
  await ctx.close();
}

await browser.close();

// SVG label extraction: prove each figure carries its instructional labels
import { readFileSync } from 'node:fs';
report.svgLabels = {};
for (let i = 1; i <= 8; i++) {
  const svg = readFileSync(`static/img/figures/gnas-301/unit-03/fig-U3-${i}.svg`, 'utf8');
  const texts = [...svg.matchAll(/<text[^>]*>([^<]+)<\/text>/g)].map((m) => m[1].trim()).filter(Boolean);
  report.svgLabels[`fig-U3-${i}`] = { labelCount: texts.length, labels: texts.slice(0, 14) };
}

writeFileSync(`${OUT}/figure-pixel-check.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ figures: report.figures.length, printShots: report.printShots.length }, null, 1));
