// G3 render inspection for GNAS-301 Unit 6 - G3 review attempt 20260924T0review1.
// Serves against http://localhost:3457 (docusaurus serve of a fresh build).
// Three passes: desktop 1280x800, narrow 360x640 (rubric table methodology),
// A4 print emulation. Saves PNG renders + a JSON inspection record.
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE = 'http://localhost:3457/semester-1/gnas-301/unit-06';
const OUT = new URL('.', import.meta.url).pathname;
const PAGES = [
  ['index', `${BASE}/`],
  ['topic-01', `${BASE}/topic-01/`],
  ['topic-02', `${BASE}/topic-02/`],
  ['topic-03', `${BASE}/topic-03/`],
  ['topic-04', `${BASE}/topic-04/`],
  ['topic-05', `${BASE}/topic-05/`],
  ['topic-06', `${BASE}/topic-06/`],
  ['unit-assessment', `${BASE}/unit-assessment/`],
  ['unit-teacher-notes', `${BASE}/unit-teacher-notes/`],
];
const record = { started: new Date().toISOString(), base: BASE, passes: {} };

const browser = await chromium.launch();

// ---------- desktop ----------
const desktop = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const dpage = await desktop.newPage();
const dErrors = [];
dpage.on('console', (m) => { if (m.type() === 'error') dErrors.push(`${m.text().slice(0, 200)}`); });
dpage.on('pageerror', (e) => dErrors.push(`pageerror: ${String(e).slice(0, 200)}`));
record.passes.desktop = { viewport: '1280x800', pages: {} };
for (const [name, url] of PAGES) {
  await dpage.goto(url, { waitUntil: 'networkidle' });
  const info = await dpage.evaluate(() => {
    const h1 = document.querySelector('h1');
    const figs = [...document.querySelectorAll('figure.figure, .figure')].map((f) => {
      const img = f.querySelector('img');
      return {
        alt: img ? img.getAttribute('alt') : null,
        loaded: img ? img.naturalWidth > 0 : false,
        width: img ? img.getBoundingClientRect().width : 0,
        caption: (f.querySelector('figcaption')?.textContent || '').trim().slice(0, 120),
      };
    });
    return {
      title: document.title,
      h1: h1 ? h1.textContent.trim() : null,
      figures: figs,
      tables: document.querySelectorAll('article table').length,
      brokenImgs: [...document.querySelectorAll('article img')].filter((i) => i.naturalWidth === 0).map((i) => i.getAttribute('src')),
      glossaryTerms: document.querySelectorAll('article .glossary-term, article [class*="glossary"]').length,
      furtherReadingLinks: [...document.querySelectorAll('article ~ * a, article a')].filter((a) => a.closest('h2') === null && /Further reading/i.test(a.closest('section, article')?.textContent || '')).length,
    };
  });
  record.passes.desktop.pages[name] = info;
}
await dpage.screenshot({ path: join(OUT, 'render-desktop-topic-01.png'), fullPage: false });
await dpage.goto(`${BASE}/unit-assessment/`, { waitUntil: 'networkidle' });
await dpage.screenshot({ path: join(OUT, 'render-desktop-unit-assessment.png'), fullPage: false });
await dpage.goto(`${BASE}/topic-03/`, { waitUntil: 'networkidle' });
await dpage.screenshot({ path: join(OUT, 'render-desktop-topic-03.png'), fullPage: false });
record.passes.desktop.consoleErrors = dErrors;
await desktop.close();

// ---------- narrow 360px ----------
const narrow = await browser.newContext({ viewport: { width: 360, height: 640 } });
const npage = await narrow.newPage();
record.passes.narrow = { viewport: '360x640', pages: {} };
for (const [name, url] of PAGES) {
  await npage.goto(url, { waitUntil: 'networkidle' });
  const info = await npage.evaluate(() => {
    const doc = document.documentElement;
    const pageOverflow = doc.scrollWidth - doc.clientWidth;
    // Measure the scrolling element itself (the <table>), per the G3 rubric:
    // content tables are display:block; width:fit-content; overflow-x:auto.
    const tables = [...document.querySelectorAll('article table')].map((t) => {
      const scrollable = t.scrollWidth > t.clientWidth;
      const before = t.scrollLeft;
      const lastCell = [...t.querySelectorAll('tr')[0]?.querySelectorAll('th,td') || []].pop();
      const rectBefore = lastCell ? lastCell.getBoundingClientRect().right : null;
      t.scrollLeft = t.scrollWidth;
      const rectAfter = lastCell ? lastCell.getBoundingClientRect().right : null;
      const reachableBySwipe = rectAfter !== null ? rectAfter <= window.innerWidth + 1 : null;
      t.scrollLeft = before;
      return {
        scrollable,
        scrollWidth: t.scrollWidth,
        clientWidth: t.clientWidth,
        lastColumnRightAfterFullSwipe: rectAfter,
        viewport: window.innerWidth,
        reachableBySwipe,
        keyboardAttrs: {
          tabindex: t.getAttribute('tabindex'),
          role: t.getAttribute('role'),
          ariaLabel: t.getAttribute('aria-label'),
        },
      };
    });
    const figs = [...document.querySelectorAll('.figure img')].map((i) => {
      const r = i.getBoundingClientRect();
      return { alt: i.getAttribute('alt'), loaded: i.naturalWidth > 0, displayWidth: Math.round(r.width), clipped: r.width > window.innerWidth + 1 };
    });
    return { pageOverflow, tables, figures: figs };
  });
  record.passes.narrow.pages[name] = info;
}
await npage.goto(`${BASE}/topic-01/`, { waitUntil: 'networkidle' });
await npage.screenshot({ path: join(OUT, 'render-narrow-360-topic-01.png'), fullPage: false });
await npage.goto(`${BASE}/unit-assessment/`, { waitUntil: 'networkidle' });
await npage.screenshot({ path: join(OUT, 'render-narrow-360-unit-assessment.png'), fullPage: false });
await narrow.close();

// ---------- A4 print emulation ----------
const print = await browser.newContext({ viewport: { width: 794, height: 1123 } });
const ppage = await print.newPage();
await ppage.emulateMedia({ media: 'print' });
record.passes.print = { viewport: '794x1123 (A4 @96dpi), media print', pages: {} };
for (const [name, url] of PAGES) {
  await ppage.goto(url, { waitUntil: 'networkidle' });
  const info = await ppage.evaluate(() => {
    const figs = [...document.querySelectorAll('.figure')].map((f) => {
      const img = f.querySelector('img');
      const cs = img ? getComputedStyle(img) : null;
      return {
        alt: img?.getAttribute('alt'),
        visible: img ? cs.display !== 'none' && img.getBoundingClientRect().height > 0 : false,
        which: img?.classList.contains('figure__img--light') ? 'light' : img?.classList.contains('figure__img--dark') ? 'dark' : 'other',
      };
    });
    const answers = !!document.querySelector('#answers-and-marking-guidance, h2#answers-and-marking-guidance');
    const chrome = ['navbar', 'theme-doc-sidebar-container', 'theme-doc-toc-desktop'].map((c) => {
      const el = document.querySelector(`.${c}`);
      return el ? getComputedStyle(el).display : 'absent';
    });
    const tables = [...document.querySelectorAll('article table')].map((t) => ({ scrollWidth: t.scrollWidth, clientWidth: t.clientWidth, overflow: t.scrollWidth > t.clientWidth + 1 }));
    return { figures: figs, answersSectionPresent: answers, chromeDisplay: chrome, tables, docScrollW: document.documentElement.scrollWidth, docClientW: document.documentElement.clientWidth };
  });
  record.passes.print.pages[name] = info;
}
await ppage.goto(`${BASE}/topic-01/`, { waitUntil: 'networkidle' });
await ppage.screenshot({ path: join(OUT, 'render-print-a4-topic-01.png'), fullPage: true });
await ppage.goto(`${BASE}/unit-assessment/`, { waitUntil: 'networkidle' });
await ppage.screenshot({ path: join(OUT, 'render-print-a4-unit-assessment.png'), fullPage: true });
await print.close();

await browser.close();
record.completed = new Date().toISOString();
writeFileSync(join(OUT, 'render-inspection.json'), JSON.stringify(record, null, 2));
console.log('inspection complete');
console.log('desktop console errors:', dErrors.length);
for (const [n, p] of Object.entries(record.passes.narrow.pages)) {
  const badTables = p.tables.filter((t) => t.scrollable && !t.reachableBySwipe);
  console.log(`narrow ${n}: pageOverflow=${p.pageOverflow} tables=${p.tables.length} unreachableTables=${badTables.length} clippedFigs=${p.figures.filter((f) => f.clipped).length}`);
}
