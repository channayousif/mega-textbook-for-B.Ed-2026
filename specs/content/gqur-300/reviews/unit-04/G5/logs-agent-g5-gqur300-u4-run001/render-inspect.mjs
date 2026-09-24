// G5 render inspection - GQUR-300 Unit 4 Urdu mirror (run001)
// Procedure follows the review-unit skill render contract: production build of both
// locales, served locally, Chromium via playwright-core, desktop + narrow + A4 print
// emulation, DOM checks (dir/lang, Nastaliq webfont, horizontal overflow), figure
// element captures. Screenshots land in renders-agent-g5-gqur300-u4-run001/.
import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = 'http://localhost:3224/ur/semester-1/gqur-300/unit-04';
const OUT = 'specs/content/gqur-300/reviews/unit-04/G5/renders-agent-g5-gqur300-u4-run001';
const EXEC = '/home/a2ahs/.cache/ms-playwright/chromium-1243/chrome-linux-arm64/chrome';
mkdirSync(OUT, { recursive: true });

const PAGES = [
  ['index', `${BASE}/`],
  ['topic-01', `${BASE}/topic-01/`],
  ['topic-02', `${BASE}/topic-02/`],
  ['topic-03', `${BASE}/topic-03/`],
  ['unit-assessment', `${BASE}/unit-assessment/`],
  ['unit-teacher-notes', `${BASE}/unit-teacher-notes/`],
];

const browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
const results = { pages: [], figures: [] };

async function shoot(page, url, name, tag, fullPage = true) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const file = `${OUT}/${name}-${tag}.png`;
  await page.screenshot({ path: file, fullPage });
  return file;
}

// Desktop 1280x900
const desktop = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const dp = await desktop.newPage();
for (const [name, url] of PAGES) {
  const file = await shoot(dp, url, name, 'desktop-1280');
  const info = await dp.evaluate(() => {
    const art = document.querySelector('article') || document.body;
    const prose = art.querySelector('p, li');
    const cs = prose ? getComputedStyle(prose) : null;
    const de = document.documentElement;
    return {
      dir: de.getAttribute('dir'), lang: de.getAttribute('lang'),
      title: document.querySelector('h1')?.textContent?.trim(),
      proseFont: cs ? cs.fontFamily : null,
      nastaliqLoaded: document.fonts.check('16px "Noto Nastaliq Urdu"', 'پیمائش کی اکائی'),
      nastaliqLoadedLong: document.fonts.check('16px "Noto Nastaliq Urdu"', 'اطراف رقبہ حجم مستطیل مثلث دائرہ نصف قطر کلوگرام سینٹی میٹر ملی لیٹر گنجائش کمیت لمبائی'),
      horizontalOverflow: de.scrollWidth > de.clientWidth,
      scrollWidth: de.scrollWidth, clientWidth: de.clientWidth,
      latinRuns: [...new Set((art.innerText.match(/[A-Za-z][A-Za-z0-9&;.:/()-]{2,}/g) || []).slice(0, 60))],
    };
  });
  results.pages.push({ name, view: 'desktop-1280', file, ...info });
}

// Figure element captures on topic pages (desktop)
for (const [name, url] of PAGES) {
  if (!name.startsWith('topic')) continue;
  await dp.goto(url, { waitUntil: 'networkidle' });
  await dp.waitForTimeout(300);
  const figs = dp.locator('figure img');
  const n = await figs.count();
  for (let i = 0; i < n; i++) {
    const img = figs.nth(i);
    const src = await img.getAttribute('src');
    const file = `${OUT}/${name}-fig${i + 1}-element.png`;
    try { await img.screenshot({ path: file }); } catch { continue; }
    const box = await img.boundingBox();
    results.figures.push({ page: name, src, file, box });
  }
}

// Narrow 360x740 mobile
const narrow = await browser.newContext({
  viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
});
const np = await narrow.newPage();
for (const [name, url] of PAGES) {
  const file = await shoot(np, url, name, 'narrow-360');
  const info = await np.evaluate(() => {
    const de = document.documentElement;
    const over = [...document.querySelectorAll('article *')].filter((el) => el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflowX !== 'auto').slice(0, 8).map((el) => `${el.tagName}.${el.className?.toString().slice(0, 40)} sw=${el.scrollWidth} cw=${el.clientWidth}`);
    return { horizontalOverflow: de.scrollWidth > de.clientWidth, scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, overflowing: over };
  });
  results.pages.push({ name, view: 'narrow-360', file, ...info });
}

// A4 print emulation 794x1123
const print = await browser.newContext({ viewport: { width: 794, height: 1123 } });
const pp = await print.newPage();
await pp.emulateMedia({ media: 'print' });
for (const [name, url] of PAGES) {
  const file = await shoot(pp, url, name, 'print-emulated');
  const info = await pp.evaluate(() => {
    const de = document.documentElement;
    return { horizontalOverflow: de.scrollWidth > de.clientWidth, scrollWidth: de.scrollWidth, clientWidth: de.clientWidth };
  });
  results.pages.push({ name, view: 'print-emulated', file, ...info });
}

await browser.close();
writeFileSync(`${OUT}/render-inspection.json`, JSON.stringify(results, null, 1));
console.log(JSON.stringify({ pages: results.pages.length, figures: results.figures.length }, null, 1));
