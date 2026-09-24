// G5 render capture for GQUR-300 Unit 6 (Urdu) - agent-g5-gqur300-u6-run001
// Renders the six bound Urdu pages at desktop 1280, narrow 360 and A4 print,
// plus per-figure element shots of the .ur.svg variants as served.
// Build: full two-locale production build in build-g5-u6-full, served at 127.0.0.1:4175.
// (A first single-locale pass against 4174 was discarded: with ur as the only
// locale the pages served at the site root while the bundled stylesheet still
// referenced /ur/assets/fonts/..., so the Nastaliq webfont failed to load.)
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4175';
const OUT = 'specs/content/gqur-300/reviews/unit-06/G5/renders-agent-g5-gqur300-u6-run001';
mkdirSync(OUT, { recursive: true });

const pages = [
  ['index', '/ur/semester-1/gqur-300/unit-06/'],
  ['topic-01', '/ur/semester-1/gqur-300/unit-06/topic-01'],
  ['topic-02', '/ur/semester-1/gqur-300/unit-06/topic-02'],
  ['topic-03', '/ur/semester-1/gqur-300/unit-06/topic-03'],
  ['unit-assessment', '/ur/semester-1/gqur-300/unit-06/unit-assessment'],
  ['unit-teacher-notes', '/ur/semester-1/gqur-300/unit-06/unit-teacher-notes'],
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
    const lang = await page.evaluate(() => document.documentElement.lang);
    const title = await page.title();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    const fontOk = await page.evaluate(() => {
      const faces = [];
      document.fonts.forEach((f) => { if (/Nastaliq/i.test(f.family)) faces.push(f.status); });
      return { nastaliqFaces: faces, check: document.fonts.check('16px "Noto Nastaliq Urdu"') };
    });
    report.push({ name, pass: 'desktop-1280', status: resp.status(), dir, lang, title, overflowX: overflow, font: fontOk, file });
  }
  // figure element shots on topic pages (desktop)
  const figureShots = [
    ['topic-01', 'fig-U6-1'], ['topic-01', 'fig-U6-2'],
    ['topic-02', 'fig-U6-3'], ['topic-02', 'fig-U6-4'],
    ['topic-03', 'fig-U6-5'], ['topic-03', 'fig-U6-6'],
  ];
  for (const [pg, fig] of figureShots) {
    await page.goto(BASE + `/ur/semester-1/gqur-300/unit-06/${pg}`, { waitUntil: 'networkidle' });
    const el = page.locator(`figure#${fig} img, figure img[src*="${fig}"]`).first();
    if (await el.count()) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForFunction(
        (sel) => {
          const im = document.querySelector(sel);
          return im && im.complete && im.naturalWidth > 0;
        },
        `figure#${fig} img, figure img[src*="${fig}"]`,
        { timeout: 8000 }
      ).catch(() => {});
      await page.waitForTimeout(300);
      const file = `${OUT}/figure-${fig}-ur-desktop.png`;
      await el.screenshot({ path: file });
      const src = await el.getAttribute('src');
      const natural = await el.evaluate((im) => `${im.naturalWidth}x${im.naturalHeight}`);
      report.push({ fig, pass: 'figure-desktop', src, natural, file });
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
  // figure element shot at 360 for the busiest figure (fig-U6-6 table)
  await page.goto(BASE + '/ur/semester-1/gqur-300/unit-06/topic-03', { waitUntil: 'networkidle' });
  const el6 = page.locator('figure#fig-U6-6 img, figure img[src*="fig-U6-6"]').first();
  if (await el6.count()) {
    await el6.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const file = `${OUT}/figure-fig-U6-6-ur-narrow.png`;
    await el6.screenshot({ path: file });
    report.push({ fig: 'fig-U6-6', pass: 'figure-narrow', file });
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
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    report.push({ name, pass: 'a4-print', status: resp.status(), overflowX: overflow, file });
  }
  await ctx.close();
} finally {
  await browser.close();
}
console.log(JSON.stringify(report, null, 1));
