// G5 render inspection - GNAS-301 Unit 6 Urdu mirror
// Rendered input: build/g5-u6 served at http://127.0.0.1:4631 (python3 http.server)
// Browser: Playwright bundled Chromium, headless.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4631/ur/semester-1/gnas-301/unit-06';
const PAGES = ['index', 'topic-01', 'topic-02', 'topic-03', 'topic-04', 'topic-05', 'topic-06', 'unit-assessment', 'unit-teacher-notes'];
const OUT = new URL('../renders-20260924T081500Z/', import.meta.url).pathname;

const browser = await chromium.launch();
const result = { base: BASE, pages: {}, notes: {} };

async function inspectPage(page, name) {
  const consoleErrors = [];
  const failedRequests = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200)); });
  page.on('requestfailed', (r) => failedRequests.push(r.url().slice(-80) + ' :: ' + (r.failure()?.errorText || '')));
  const resp = await page.goto(`${BASE}/${name}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const data = await page.evaluate(() => {
    const de = document.documentElement;
    const article = document.querySelector('article') || document.body;
    const cs = getComputedStyle(article);
    const figs = [...document.querySelectorAll('figure img, img[src*="figures"]')].map((i) => ({
      src: i.getAttribute('src').split('/').pop(),
      loaded: i.complete && i.naturalWidth > 0,
      alt: (i.getAttribute('alt') || '').slice(0, 60),
      lazy: i.getAttribute('loading'),
      hidden: i.offsetParent === null && getComputedStyle(i).display === 'none',
      box: (() => { const r = i.getBoundingClientRect(); return { r: Math.round(r.right), w: Math.round(r.width) }; })(),
    }));
    const tables = [...document.querySelectorAll('table')].map((t) => ({ sw: t.scrollWidth, cw: t.clientWidth }));
    return {
      dir: de.getAttribute('dir'),
      lang: de.getAttribute('lang'),
      articleFontFamily: cs.fontFamily,
      nastaliqLoaded: document.fonts.check('16px "Noto Nastaliq Urdu"'),
      docOverflow: de.scrollWidth - de.clientWidth,
      bodyOverflow: document.body.scrollWidth - document.body.clientWidth,
      figs,
      tables,
      title: document.title,
    };
  });
  return { status: resp.status(), consoleErrors, failedRequests, ...data };
}

// 1. Desktop 1280x800
const ctxD = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const pageD = await ctxD.newPage();
for (const name of PAGES) result.pages[name] = { desktop: await inspectPage(pageD, name) };
await pageD.screenshot({ path: OUT + 'desktop-topic-01.png' });
await pageD.goto(`${BASE}/unit-assessment`, { waitUntil: 'networkidle' });
await pageD.screenshot({ path: OUT + 'desktop-unit-assessment.png', fullPage: false });
await pageD.goto(`${BASE}/index`, { waitUntil: 'networkidle' });
await pageD.screenshot({ path: OUT + 'desktop-index.png' });

// Numeral / bidi samples from the DOM (how Western digits sit inside RTL prose)
await pageD.goto(`${BASE}/topic-06`, { waitUntil: 'networkidle' });
result.notes.numeralSamples = await pageD.evaluate(() => {
  const text = document.body.innerText;
  const grab = (re) => { const m = text.match(re); return m ? m[0] : null; };
  return {
    has250000: grab(/250,000[^\n]{0,40}/),
    has36Arab: grab(/3\.6 ارب[^\n]{0,30}/),
    has2015: grab(/2015[^\n]{0,30}/),
    has42Lakh: /42 لاکھ/.test(text),
  };
});

// 2. Narrow 360x640
const ctxN = await browser.newContext({ viewport: { width: 360, height: 640 } });
const pageN = await ctxN.newPage();
for (const name of PAGES) {
  const d = await inspectPage(pageN, name);
  result.pages[name].narrow360 = {
    docOverflow: d.docOverflow,
    failedRequests: d.failedRequests,
    figsBeyondViewport: d.figs.filter((f) => !f.hidden && f.box.r > 360).map((f) => f.src),
    tablesScrollable: d.tables.filter((t) => t.sw > t.cw).length,
  };
}
await pageN.goto(`${BASE}/topic-01`, { waitUntil: 'networkidle' });
await pageN.screenshot({ path: OUT + 'narrow-360-topic-01.png' });
await pageN.goto(`${BASE}/unit-assessment`, { waitUntil: 'networkidle' });
await pageN.screenshot({ path: OUT + 'narrow-360-unit-assessment.png' });

// 3. A4 print emulation 794x1123, media print
const ctxP = await browser.newContext({ viewport: { width: 794, height: 1123 } });
const pageP = await ctxP.newPage();
await pageP.emulateMedia({ media: 'print' });
for (const name of ['index', 'topic-01', 'unit-assessment']) {
  const d = await inspectPage(pageP, name);
  result.pages[name].printA4 = {
    docOverflow: d.docOverflow,
    navbarVisible: await pageP.evaluate(() => {
      const nb = document.querySelector('nav, .navbar, [class*="navbar"]');
      return nb ? getComputedStyle(nb).display !== 'none' : null;
    }),
  };
}
await pageP.goto(`${BASE}/topic-01`, { waitUntil: 'networkidle' });
await pageP.screenshot({ path: OUT + 'print-a4-topic-01.png' });
await pageP.goto(`${BASE}/unit-assessment`, { waitUntil: 'networkidle' });
await pageP.screenshot({ path: OUT + 'print-a4-unit-assessment.png' });

// 4. Dark mode on topic-01: dark twins display, light hidden
const pageK = await ctxD.newPage();
await pageK.goto(`${BASE}/topic-01`, { waitUntil: 'networkidle' });
await pageK.evaluate(() => { document.documentElement.setAttribute('data-theme', 'dark'); });
await pageK.waitForTimeout(600);
result.notes.darkFigures = await pageK.evaluate(() => {
  const imgs = [...document.querySelectorAll('img[src*="figures"]')].map((i) => ({
    src: i.getAttribute('src').split('/').pop(),
    display: getComputedStyle(i).display,
    visible: i.offsetParent !== null || getComputedStyle(i).display !== 'none',
  }));
  return imgs;
});
await pageK.screenshot({ path: OUT + 'dark-topic-01.png' });

writeFileSync(OUT + 'render-inspect.json', JSON.stringify(result, null, 1));
await browser.close();
console.log('OK: render inspection complete; outputs in ' + OUT);
