// Rendered-output verification for GQUR-300 Unit 5 G3 run001.
// The reviewer session cannot display images, so visual checks are executed
// objectively in the real browser: pixel sampling of the rendered figure and
// DOM/layout invariants on every page at desktop, narrow and print widths.
import { chromium } from 'playwright';
import { writeFileSync, readFileSync } from 'node:fs';
import sharp from 'sharp';

const BASE = 'http://127.0.0.1:4311';
const OUT = 'specs/content/gqur-300/reviews/unit-05/G3/renders-agent-g3-gqur300-u5-run001';
const PAGES = [
  ['index', '/semester-1/gqur-300/unit-05/'],
  ['topic-01', '/semester-1/gqur-300/unit-05/topic-01'],
  ['topic-02', '/semester-1/gqur-300/unit-05/topic-02'],
  ['topic-03', '/semester-1/gqur-300/unit-05/topic-03'],
  ['unit-assessment', '/semester-1/gqur-300/unit-05/unit-assessment'],
  ['unit-teacher-notes', '/semester-1/gqur-300/unit-05/unit-teacher-notes'],
];
const report = { generated: new Date().toISOString(), pages: [], figU55PixelCheck: null };

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  // --- DOM invariants per page (desktop) ---
  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    const inv = await page.evaluate(() => {
      const imgs = [...document.querySelectorAll('article img')];
      const h1 = [...document.querySelectorAll('article h1')];
      const headings = [...document.querySelectorAll('article h1, article h2, article h3')].map((h) => h.tagName);
      const links = [...document.querySelectorAll('article a')];
      return {
        title: document.title,
        h1Count: h1.length,
        headingSequence: headings.join(','),
        imgCount: imgs.length,
        imgsWithoutAlt: imgs.filter((i) => !i.getAttribute('alt') || !i.getAttribute('alt').trim()).length,
        figureCount: document.querySelectorAll('article figure').length,
        figCaptions: [...document.querySelectorAll('article figure figcaption')].map((c) => c.textContent.trim().slice(0, 80)),
        emptyLinks: links.filter((a) => !a.textContent.trim() && !a.getAttribute('aria-label')).length,
        badgePresent: !!document.querySelector('article [class*="badge"], article [class*="Badge"]'),
        bodyTextLength: (document.querySelector('article')?.innerText || '').length,
      };
    });
    report.pages.push({ name, ...inv });
  }

  // --- Narrow 360: no horizontal document overflow ---
  await page.setViewportSize({ width: 360, height: 800 });
  const narrowOverflow = [];
  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    narrowOverflow.push({ name, docScrollWidth: sw, overflows: sw > 360 + 1 });
  }
  report.narrow = narrowOverflow;

  // --- Rendered fig-U5-5 pixel check: confirm the render matches the SVG source defect ---
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(BASE + '/semester-1/gqur-300/unit-05/topic-03', { waitUntil: 'networkidle' });
  const fig = page.locator('#fig-U5-5').first();
  const box = await fig.boundingBox();
  const png = await fig.screenshot();
  writeFileSync(`${OUT}/fig-U5-5-verify.png`, png);
  const { data, info } = await sharp(png).raw().toBuffer({ resolveWithObject: true });
  const px = (x, y) => {
    const xi = Math.round(x), yi = Math.round(y);
    const o = (yi * info.width + xi) * info.channels;
    return [data[o], data[o + 1], data[o + 2]];
  };
  // SVG viewBox 780x470; render box maps SVG coords to pixels.
  const sx = info.width / 780, sy = info.height / 470;
  const dotRowY = 316; // cy of the base dot row in SVG coords
  const isDarkDot = ([r, g, b]) => r + g + b < 300; // ink is #132a24-ish
  const valueX = (v) => 60 + (v - 20) * 7.5; // axis: 20@60px .. 100@660px
  const check = {};
  for (const v of [20, 35, 40, 45, 50, 52, 55, 60, 62, 70, 96, 100]) {
    const x = valueX(v) * sx, y = dotRowY * sy;
    check[`value_${v}`] = { svgX: Math.round(valueX(v)), renderedDarkDot: isDarkDot(px(x, y)) };
  }
  // stacked dots above base row at the 60-position (cy 294, 272) and 52-position (cy 294)
  check.stackAbove60 = isDarkDot(px(valueX(60) * sx, 294 * sy)) && isDarkDot(px(valueX(60) * sx, 272 * sy));
  check.stackAbove52 = isDarkDot(px(valueX(52) * sx, 294 * sy));
  report.figU55PixelCheck = { renderSize: `${info.width}x${info.height}`, elementBox: box, samples: check };
} finally {
  await browser.close();
}
writeFileSync(`${OUT}/render-verification.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
