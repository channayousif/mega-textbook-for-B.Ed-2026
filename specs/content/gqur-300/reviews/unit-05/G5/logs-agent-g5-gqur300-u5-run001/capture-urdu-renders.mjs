// G5 render capture for GQUR-300 Unit 5 (Urdu) - agent-g5-gqur300-u5-run001
// Renders the six bound Urdu pages at desktop 1280, narrow 360 and A4 print,
// plus per-figure element shots of the .ur.svg variants as served.
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4173';
const OUT = 'specs/content/gqur-300/reviews/unit-05/G5/renders-agent-g5-gqur300-u5-run001';
mkdirSync(OUT, { recursive: true });

const pages = [
  ['index', '/ur/semester-1/gqur-300/unit-05/'],
  ['topic-01', '/ur/semester-1/gqur-300/unit-05/topic-01'],
  ['topic-02', '/ur/semester-1/gqur-300/unit-05/topic-02'],
  ['topic-03', '/ur/semester-1/gqur-300/unit-05/topic-03'],
  ['unit-assessment', '/ur/semester-1/gqur-300/unit-05/unit-assessment'],
  ['unit-teacher-notes', '/ur/semester-1/gqur-300/unit-05/unit-teacher-notes'],
];

const browser = await chromium.launch();
const report = [];
try {
  // Pass 1: desktop 1280
  let ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  let page = await ctx.newPage();
  for (const [name, path] of pages) {
    const resp = await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const file = `${OUT}/desktop-1280-${name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    const dir = await page.evaluate(() => document.documentElement.dir);
    const title = await page.title();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    report.push({ name, pass: 'desktop-1280', status: resp.status(), dir, title, overflowX: overflow, file });
  }
  // figure element shots on topic pages (desktop)
  const figureShots = [
    ['topic-01', 'fig-U5-1'], ['topic-01', 'fig-U5-2'],
    ['topic-02', 'fig-U5-3'], ['topic-02', 'fig-U5-4'],
    ['topic-03', 'fig-U5-5'], ['topic-03', 'fig-U5-6'],
  ];
  for (const [pg, fig] of figureShots) {
    await page.goto(BASE + `/ur/semester-1/gqur-300/unit-05/${pg}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    const el = page.locator(`figure#${fig} img, figure img[src*="${fig}"]`).first();
    if (await el.count()) {
      const file = `${OUT}/figure-${fig}-ur-desktop.png`;
      await el.screenshot({ path: file });
      const src = await el.getAttribute('src');
      report.push({ fig, pass: 'figure-desktop', src, file });
    } else {
      report.push({ fig, pass: 'figure-desktop', error: 'figure element not found' });
    }
  }
  await ctx.close();

  // Pass 2: narrow 360
  ctx = await browser.newContext({ viewport: { width: 360, height: 800 } });
  page = await ctx.newPage();
  for (const [name, path] of pages) {
    const resp = await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const file = `${OUT}/narrow-360-${name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    report.push({ name, pass: 'narrow-360', status: resp.status(), overflowX: overflow, file });
  }
  await ctx.close();

  // Pass 3: A4 print emulation (794 x 1123 css px at 96dpi), print media
  ctx = await browser.newContext({ viewport: { width: 794, height: 1123 } });
  page = await ctx.newPage();
  await page.emulateMedia({ media: 'print' });
  for (const [name, path] of pages) {
    const resp = await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const file = `${OUT}/a4-print-${name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    report.push({ name, pass: 'a4-print', status: resp.status(), file });
  }
  await ctx.close();
} finally {
  await browser.close();
}
console.log(JSON.stringify(report, null, 1));
