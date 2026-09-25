// G3 render inspection - EFMP-301 Unit 4 (run001)
// Serves against the PRODUCTION BUILD at http://localhost:3217 (npm run serve).
// Per the G3 reference: measures the scrolling element itself (the <table>), tests
// column reachability by setting scrollLeft, and checks hydration-added keyboard
// attributes rather than inferring them.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const BASE = 'http://localhost:3217';
const OUT = 'specs/content/efmp-301/reviews/unit-04/G3/renders-agent-g3-efmp301-u4-run001';
const PAGES = [
  ['index', '/semester-1/efmp-301/unit-04/'],
  ['topic-01', '/semester-1/efmp-301/unit-04/topic-01/'],
  ['topic-02', '/semester-1/efmp-301/unit-04/topic-02/'],
  ['topic-03', '/semester-1/efmp-301/unit-04/topic-03/'],
  ['unit-assessment', '/semester-1/efmp-301/unit-04/unit-assessment/'],
  ['unit-teacher-notes', '/semester-1/efmp-301/unit-04/unit-teacher-notes/'],
];

const results = { base: BASE, pages: [] };
const log = [];
const say = (m) => { log.push(m); console.log(m); };

const browser = await chromium.launch();

// ---------- Desktop pass ----------
const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
for (const [name, path] of PAGES) {
  await desktop.goto(BASE + path, { waitUntil: 'networkidle' });
  await desktop.waitForTimeout(700); // allow hydration to settle
  const m = await desktop.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')];
    const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src);
    const noAlt = imgs.filter((i) => !i.getAttribute('alt')).length;
    const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => Number(h.tagName[1]));
    let skipped = [];
    for (let i = 1; i < hs.length; i++) if (hs[i] - hs[i - 1] > 1) skipped.push(`${hs[i - 1]}->${hs[i]}`);
    const doc = document.documentElement;
    return {
      title: document.title,
      imgCount: imgs.length,
      brokenImages: broken,
      imgsNoAlt: noAlt,
      skippedHeadings: skipped,
      docOverflowX: doc.scrollWidth - doc.clientWidth,
      answersSectionPresent: !!document.querySelector('#answers-and-marking-guidance'),
    };
  });
  await desktop.screenshot({ path: `${OUT}/desktop-${name}.png`, fullPage: true });
  results.pages.push({ name, pass: 'desktop', ...m });
  say(`desktop ${name}: imgs=${m.imgCount} broken=${m.brokenImages.length} noAlt=${m.imgsNoAlt} skippedH=${JSON.stringify(m.skippedHeadings)} docOverflowX=${m.docOverflowX}`);
}

// ---------- Narrow 360px pass ----------
const narrow = await browser.newPage({ viewport: { width: 360, height: 780 } });
for (const [name, path] of PAGES) {
  await narrow.goto(BASE + path, { waitUntil: 'networkidle' });
  await narrow.waitForTimeout(700);
  const m = await narrow.evaluate(() => {
    const doc = document.documentElement;
    const out = { docOverflowX: doc.scrollWidth - doc.clientWidth, tables: [], figures: [] };
    for (const t of document.querySelectorAll('table')) {
      const rect = t.getBoundingClientRect();
      const lastCol = t.querySelectorAll('thead th, thead td');
      const last = lastCol.length ? lastCol[lastCol.length - 1] : t;
      const before = last.getBoundingClientRect();
      // Reachability test per G3 reference: scroll the table itself fully right.
      t.scrollLeft = t.scrollWidth;
      const after = last.getBoundingClientRect();
      out.tables.push({
        scrollable: t.scrollWidth > t.clientWidth,
        clientWidth: t.clientWidth,
        scrollWidth: t.scrollWidth,
        rectRight: Math.round(rect.right),
        lastColRightBefore: Math.round(before.right),
        lastColRightAfterScroll: Math.round(after.right),
        reachableByScroll: after.right <= 360 + 1,
        tabindex: t.getAttribute('tabindex'),
        role: t.getAttribute('role'),
        ariaLabel: t.getAttribute('aria-label'),
      });
      t.scrollLeft = 0;
    }
    for (const f of document.querySelectorAll('figure, img')) {
      const r = f.getBoundingClientRect();
      out.figures.push({ tag: f.tagName, w: Math.round(r.width), right: Math.round(r.right), fitsViewport: r.right <= 360 + 1 && r.width <= 360 + 1 });
    }
    return out;
  });
  await narrow.screenshot({ path: `${OUT}/narrow360-${name}.png`, fullPage: true });
  results.pages.push({ name, pass: 'narrow360', ...m });
  const tSummary = m.tables.map((t) => `scroll=${t.scrollWidth}/${t.clientWidth} reach=${t.reachableByScroll} a11y=${t.tabindex}/${t.role}/${!!t.ariaLabel}`).join(' | ');
  say(`narrow360 ${name}: docOverflowX=${m.docOverflowX} tables[${m.tables.length}]: ${tSummary} figuresFit=${m.figures.filter((f) => f.fitsViewport).length}/${m.figures.length}`);
}

// ---------- A4 print pass ----------
const print = await browser.newPage({ viewport: { width: 794, height: 1123 } });
await print.emulateMedia({ media: 'print' });
for (const [name, path] of PAGES) {
  await print.goto(BASE + path, { waitUntil: 'networkidle' });
  await print.waitForTimeout(700);
  const m = await print.evaluate(() => {
    const PAGE_W = 794;
    const out = { clipped: [], figures: [], answersSectionPresent: !!document.querySelector('#answers-and-marking-guidance') };
    for (const el of document.querySelectorAll('main *')) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.right > PAGE_W + 1) {
        out.clipped.push({ tag: el.tagName, cls: (el.className || '').toString().slice(0, 40), right: Math.round(r.right) });
      }
    }
    out.clipped = out.clipped.slice(0, 8);
    for (const f of document.querySelectorAll('figure, img')) {
      const r = f.getBoundingClientRect();
      out.figures.push({ tag: f.tagName, w: Math.round(r.width), right: Math.round(r.right), fitsPage: r.right <= PAGE_W + 1 });
    }
    return out;
  });
  await print.pdf({ path: `${OUT}/print-a4-${name}.pdf`, format: 'A4', printBackground: true });
  await print.screenshot({ path: `${OUT}/print-a4-${name}.png`, fullPage: true });
  results.pages.push({ name, pass: 'print-a4', ...m });
  say(`print-a4 ${name}: clipped=${JSON.stringify(m.clipped)} figuresFit=${m.figures.filter((f) => f.fitsPage).length}/${m.figures.length} answers=${m.answersSectionPresent}`);
}

await browser.close();
writeFileSync(`${OUT}/render-inspect.json`, JSON.stringify(results, null, 2));
writeFileSync(`${OUT}/render-inspect.log`, log.join('\n') + '\n');
say('DONE');
