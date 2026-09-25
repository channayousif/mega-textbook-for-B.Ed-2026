// G5 Urdu render inspection - EFMP-301 Unit 2 - run agent-g5-efmp301-u2-run001
// Drives the real Chromium browser (Playwright 1.61.1, chromium 149.0.7827.0)
// against the local Docusaurus serve on :3212 (build verified to contain the
// exact bound Urdu source bytes before this script ran).
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = 'http://localhost:3212/ur/semester-1/efmp-301/unit-02';
const OUT = new URL('../../renders-agent-g5-efmp301-u2-run001/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const log = [];
const say = (s) => { log.push(s); console.log(s); };

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const consoleErrors = [];
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message));

async function shot(name, opts = {}) {
  await page.screenshot({ path: OUT + name, fullPage: opts.full ?? false });
  say(`saved ${name}`);
}

async function brokenImages() {
  return page.evaluate(() =>
    [...document.querySelectorAll('img')].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.getAttribute('src'))
  );
}

async function overflowCount() {
  return page.evaluate(() => {
    const doc = document.documentElement;
    let n = 0;
    const wide = [];
    for (const el of document.querySelectorAll('main *')) {
      if (el.scrollWidth - el.clientWidth > 8 && el.clientWidth > 0) {
        n++;
        if (wide.length < 5) wide.push(el.tagName + '.' + (el.className || '').toString().slice(0, 40));
      }
    }
    return { n, wide, docOverflowX: doc.scrollWidth > doc.clientWidth + 2, docScrollW: doc.scrollWidth, docClientW: doc.clientWidth };
  });
}

// ---- 1. Urdu index at normal viewport ---------------------------------------
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
say('index dir=' + (await page.evaluate(() => document.documentElement.dir)));
say('index nastaliq loaded (Noto Nastaliq Urdu): ' +
  (await page.evaluate(() => document.fonts.check('16px "Noto Nastaliq Urdu"'))));
say('index title: ' + (await page.title()));
say('index broken images: ' + JSON.stringify(await brokenImages()));
say('index overflow: ' + JSON.stringify(await overflowCount()));
await shot('01-index-1280.png');

// ---- 2. topic-01 normal viewport (prose + concept map fig-U2-1) -------------
await page.goto(BASE + '/topic-01/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
say('topic-01 broken images: ' + JSON.stringify(await brokenImages()));
say('topic-01 overflow: ' + JSON.stringify(await overflowCount()));
await shot('02-topic01-1280-top.png');
await page.evaluate(() => window.scrollTo(0, 900));
await shot('03-topic01-1280-fig-u2-1.png');
const fig1 = page.locator('figure, .figure-wrapper, img[src*="fig-U2-1"]').first();
if (await fig1.count()) { await fig1.screenshot({ path: OUT + '04-fig-u2-1-ur.png' }); say('saved 04-fig-u2-1-ur.png'); }

// ---- 3. topic-01 at 360px narrow --------------------------------------------
await page.setViewportSize({ width: 360, height: 800 });
await page.goto(BASE + '/topic-01/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
say('topic-01@360 overflow: ' + JSON.stringify(await overflowCount()));
await shot('05-topic01-360-top.png');
await page.evaluate(() => window.scrollTo(0, 1200));
await shot('06-topic01-360-mid.png');

// ---- 4. topic-02 figure fig-U2-3 (numerals/bidi in SVG labels) --------------
await page.goto(BASE + '/topic-02/', { waitUntil: 'networkidle' });
const fig3 = page.locator('img[src*="fig-U2-3"]').first();
if (await fig3.count()) { await fig3.screenshot({ path: OUT + '07-fig-u2-3-ur.png' }); say('saved 07-fig-u2-3-ur.png'); }
say('topic-02@1280 overflow: ' + JSON.stringify(await overflowCount()));

// ---- 5. topic-04 timeline fig-U2-7 (mirrored RTL timeline) ------------------
await page.goto(BASE + '/topic-04/', { waitUntil: 'networkidle' });
const fig7 = page.locator('img[src*="fig-U2-7"]').first();
if (await fig7.count()) { await fig7.screenshot({ path: OUT + '08-fig-u2-7-ur-timeline.png' }); say('saved 08-fig-u2-7-ur-timeline.png'); }
say('topic-04 broken images: ' + JSON.stringify(await brokenImages()));

// ---- 6. unit-assessment at 360px (MCQ options, tables, answer key) ----------
await page.setViewportSize({ width: 360, height: 800 });
await page.goto(BASE + '/unit-assessment/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
say('assessment@360 overflow: ' + JSON.stringify(await overflowCount()));
await shot('09-assessment-360-mcqs.png');
await page.evaluate(() => document.scrollTo ? document.scrollTo(0, 3000) : window.scrollTo(0, 3000));
await shot('10-assessment-360-key.png');
// ERQ rubric table at 360px
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 900));
await shot('11-assessment-360-erq-table.png');
say('assessment broken images: ' + JSON.stringify(await brokenImages()));

// ---- 7. A4 print emulation ---------------------------------------------------
await page.setViewportSize({ width: 1280, height: 900 });
await page.emulateMedia({ media: 'print' });
await page.evaluate(() => window.scrollTo(0, 0));
await shot('12-assessment-print-a4.png');
await page.goto(BASE + '/topic-01/', { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });
await shot('13-topic01-print-a4.png');
const printInfo = await page.evaluate(() => ({
  printColorAdjust: getComputedStyle(document.body).printColorAdjust || 'n/a',
  bodyWidth: document.body.clientWidth,
}));
say('print emulation info: ' + JSON.stringify(printInfo));
await page.emulateMedia({ media: null });

// ---- 8. teacher notes at 360px ----------------------------------------------
await page.setViewportSize({ width: 360, height: 800 });
await page.goto(BASE + '/unit-teacher-notes/', { waitUntil: 'networkidle' });
say('notes@360 overflow: ' + JSON.stringify(await overflowCount()));
await shot('14-teacher-notes-360.png');

say('console errors: ' + (consoleErrors.length ? JSON.stringify(consoleErrors.slice(0, 6)) : 'none'));
await browser.close();
writeFileSync(new URL('./render-inspect.log', import.meta.url).pathname, log.join('\n') + '\n');
console.log('DONE');
