import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = 'http://localhost:3218/ur/semester-1/gqur-300/unit-02';
const OUT = 'specs/content/gqur-300/reviews/unit-02/G5/renders-agent-g5-gqur300-u2-run001';
mkdirSync(OUT, { recursive: true });

const pages = [
  ['index', `${BASE}/`],
  ['topic-01', `${BASE}/topic-01/`],
  ['topic-02', `${BASE}/topic-02/`],
  ['topic-03', `${BASE}/topic-03/`],
  ['unit-assessment', `${BASE}/unit-assessment/`],
  ['unit-teacher-notes', `${BASE}/unit-teacher-notes/`],
];

const browser = await chromium.launch();
const report = { base: BASE, pages: [] };

for (const [name, url] of pages) {
  const entry = { name, url };

  // Desktop 1280x900
  const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await desktop.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
  entry.desktop = await desktop.evaluate(() => {
    const html = document.documentElement;
    const article = document.querySelector('article') || document.querySelector('main');
    const h1 = document.querySelector('h1');
    const figs = [...document.querySelectorAll('figure img')].map((i) => ({ src: i.getAttribute('src'), alt: (i.getAttribute('alt') || '').slice(0, 60), visible: i.offsetParent !== null || getComputedStyle(i).display !== 'none' }));
    return {
      dir: html.getAttribute('dir') || getComputedStyle(html).direction,
      lang: html.getAttribute('lang'),
      title: document.title,
      h1: h1 ? h1.textContent.trim().slice(0, 80) : null,
      bodyFont: article ? getComputedStyle(article).fontFamily.slice(0, 80) : null,
      h1Font: h1 ? getComputedStyle(h1).fontFamily.slice(0, 80) : null,
      overflowX: html.scrollWidth - html.clientWidth,
      figures: figs,
      headings: [...document.querySelectorAll('h1,h2,h3')].map((h) => `${h.tagName}:${h.textContent.trim().slice(0, 50)}`),
    };
  });
  await desktop.screenshot({ path: `${OUT}/${name}-desktop-1280.png`, fullPage: false });

  // Narrow 360x740 mobile DSF2
  const narrow = await browser.newPage({ viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await narrow.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
  entry.narrow = await narrow.evaluate(() => {
    const html = document.documentElement;
    const wide = [];
    for (const el of document.querySelectorAll('main *')) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > html.clientWidth + 1 || r.left < -1)) wide.push(`${el.tagName}.${(el.className || '').toString().slice(0, 30)} left=${r.left.toFixed(0)} right=${r.right.toFixed(0)}`);
    }
    return { overflowX: html.scrollWidth - html.clientWidth, wideElements: wide.slice(0, 8) };
  });
  await narrow.screenshot({ path: `${OUT}/${name}-narrow-360.png`, fullPage: false });
  await narrow.close();

  // A4 print emulation
  const print = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  await print.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
  await print.emulateMedia({ media: 'print' });
  entry.print = await print.evaluate(() => {
    const html = document.documentElement;
    const nav = document.querySelector('nav, .navbar');
    return {
      overflowX: html.scrollWidth - html.clientWidth,
      navDisplay: nav ? getComputedStyle(nav).display : null,
      sidebarDisplay: (() => { const s = document.querySelector('.theme-doc-sidebar-container, aside'); return s ? getComputedStyle(s).display : null; })(),
    };
  });
  await print.screenshot({ path: `${OUT}/${name}-print-emulated.png`, fullPage: false });
  await print.close();

  // Figure element shots and mixed-script probe on topic pages (desktop page still open)
  if (name === 'topic-01') {
    const fig = desktop.locator('figure').first();
    await fig.screenshot({ path: `${OUT}/fig-U2-1-ur-element.png` }).catch(() => {});
  }
  if (name === 'topic-03') {
    const figs = desktop.locator('figure');
    await figs.nth(0).screenshot({ path: `${OUT}/fig-U2-5-ur-element.png` }).catch(() => {});
    await figs.nth(1).screenshot({ path: `${OUT}/fig-U2-6-ur-element.png` }).catch(() => {});
  }
  // Mixed-script occurrences in rendered DOM
  entry.mixedScript = await desktop.evaluate(() => {
    const text = document.body.innerText;
    const found = [];
    for (const probe of ['tutors', 'شرbat', 'запас', 'sqrt(64)', '8^2']) if (text.includes(probe)) found.push(probe);
    return found;
  });
  report.pages.push(entry);
  await desktop.close();
  console.log(`inspected ${name}`);
}

// Font availability probe: does the page actually load the Nastaliq webfont?
const fontPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await fontPage.goto(pages[1][1], { waitUntil: 'networkidle', timeout: 120000 });
report.fontCheck = await fontPage.evaluate(async () => {
  await document.fonts.ready;
  const loaded = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight} ${f.style}`);
  const nastaliq = loaded.filter((f) => /nastaliq/i.test(f.family));
  return { loadedCount: loaded.length, sample: loaded.slice(0, 6), nastaliqLoaded: nastaliq.length > 0, check: document.fonts.check('16px "Noto Nastaliq Urdu"') };
});
await fontPage.close();
await browser.close();
writeFileSync(`${OUT}/render-inspection.json`, JSON.stringify(report, null, 2));
console.log('done');
