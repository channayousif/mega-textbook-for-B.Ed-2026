// G3 render inspection for GNAS-301 Unit 3 - run against docusaurus serve on :4611
// Desktop 1280x900, narrow 360x780, A4 print PDF. Evidence saved beside this script.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4611';
const OUT = 'specs/content/gnas-301/reviews/unit-03/G3/renders';
const PAGES = [
  ['index', '/semester-1/gnas-301/unit-03/'],
  ['topic-01', '/semester-1/gnas-301/unit-03/topic-01'],
  ['topic-02', '/semester-1/gnas-301/unit-03/topic-02'],
  ['topic-03', '/semester-1/gnas-301/unit-03/topic-03'],
  ['topic-04', '/semester-1/gnas-301/unit-03/topic-04'],
  ['unit-assessment', '/semester-1/gnas-301/unit-03/unit-assessment'],
  ['unit-teacher-notes', '/semester-1/gnas-301/unit-03/unit-teacher-notes'],
];

const browser = await chromium.launch();
const audit = { base: BASE, generated: new Date().toISOString(), pages: [] };

for (const [name, path] of PAGES) {
  const entry = { name, path, desktop: {}, narrow: {}, print: {} };

  // ---- desktop 1280x900 ----
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  entry.desktop = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('article img')];
    const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src'));
    const noAlt = imgs.filter((i) => !(i.getAttribute('alt') || '').trim()).map((i) => i.getAttribute('src'));
    const hs = [...document.querySelectorAll('article h1, article h2, article h3, article h4, article h5, article h6')].map((h) => h.tagName);
    let skipped = [];
    for (let i = 1; i < hs.length; i++) {
      if (Number(hs[i][1]) - Number(hs[i - 1][1]) > 1) skipped.push(hs[i - 1] + '->' + hs[i]);
    }
    const doc = document.documentElement;
    return {
      title: document.title,
      h1Count: document.querySelectorAll('article h1').length,
      imgCount: imgs.length,
      brokenImages: broken,
      imagesWithoutAlt: noAlt,
      skippedHeadingLevels: skipped,
      docOverflowX: doc.scrollWidth > doc.clientWidth,
      linksNoText: [...document.querySelectorAll('article a')].filter((a) => !a.textContent.trim() && !a.getAttribute('aria-label')).length,
    };
  });
  entry.desktop.consoleErrors = errors;
  await page.screenshot({ path: `${OUT}/desktop-${name}.png`, fullPage: false });

  // figure checks on desktop (lazy-load forces)
  entry.desktop.figures = await page.evaluate(async () => {
    const figs = [...document.querySelectorAll('article figure')];
    const out = [];
    for (const f of figs) {
      const img = f.querySelector('img');
      if (img) {
        img.scrollIntoView();
        await new Promise((r) => setTimeout(r, 250));
      }
      const cap = f.querySelector('figcaption');
      out.push({
        img: img ? img.getAttribute('src') : null,
        loaded: img ? (img.complete && img.naturalWidth > 0) : false,
        alt: img ? img.getAttribute('alt') : null,
        caption: cap ? cap.textContent.trim().slice(0, 80) : null,
      });
    }
    return out;
  });

  // dark-mode alt identity check (toggle if a control exists)
  entry.desktop.darkToggle = await page.evaluate(() => {
    const btn = document.querySelector('button[class*="toggle"][aria-label*="dark" i], button[class*="Toggle"], [data-theme-toggle]');
    return btn ? 'present' : 'absent';
  });
  await ctx.close();

  // ---- narrow 360x780 ----
  const nctx = await browser.newContext({ viewport: { width: 360, height: 780 } });
  const npage = await nctx.newPage();
  await npage.goto(BASE + path, { waitUntil: 'networkidle' });
  await npage.waitForTimeout(400);
  entry.narrow = await npage.evaluate(() => {
    const doc = document.documentElement;
    const out = {
      docOverflowX: doc.scrollWidth > doc.clientWidth,
      docScrollW: doc.scrollWidth, docClientW: doc.clientWidth,
      tables: [], figures: [],
    };
    // Measure the TABLE element itself, per the G3 rubric
    for (const t of document.querySelectorAll('article table')) {
      const rect = t.getBoundingClientRect();
      const fits = t.scrollWidth <= t.clientWidth + 1;
      const rec = {
        rows: t.rows.length,
        clientWidth: t.clientWidth,
        scrollWidth: t.scrollWidth,
        fitsViewportWidth: fits,
        keyboardAttrs: {
          tabindex: t.getAttribute('tabindex'),
          role: t.getAttribute('role'),
          ariaLabel: t.getAttribute('aria-label'),
        },
      };
      if (!fits) {
        // scroll test: can the last column be brought into view?
        t.scrollLeft = t.scrollWidth;
        const lastCell = t.rows[0]?.lastElementChild;
        rec.afterScrollLastColumnRight = lastCell ? Math.round(lastCell.getBoundingClientRect().right) : null;
        rec.viewportWidth = window.innerWidth;
      }
      out.tables.push(rec);
    }
    for (const f of document.querySelectorAll('article figure')) {
      const img = f.querySelector('img');
      const scroller = f.closest('div[class*="scroller"]') || f.parentElement;
      out.figures.push({
        img: img ? img.getAttribute('src') : null,
        figRight: Math.round(f.getBoundingClientRect().right),
        viewportW: window.innerWidth,
        figFits: f.getBoundingClientRect().right <= window.innerWidth + 1,
        scrollerOverflowX: getComputedStyle(scroller).overflowX,
      });
    }
    return out;
  });
  await npage.screenshot({ path: `${OUT}/narrow360-${name}.png`, fullPage: false });
  await nctx.close();

  // ---- A4 print PDF ----
  const pctx = await browser.newContext({ viewport: { width: 1240, height: 1754 } });
  const ppage = await pctx.newPage();
  await ppage.emulateMedia({ media: 'print' });
  await ppage.goto(BASE + path, { waitUntil: 'networkidle' });
  await ppage.waitForTimeout(300);
  await ppage.pdf({ path: `${OUT}/print-a4-${name}.pdf`, format: 'A4', printBackground: true, margin: { top: '10mm', bottom: '10mm', left: '8mm', right: '8mm' } });
  entry.print = { pdf: `print-a4-${name}.pdf` };
  await pctx.close();

  audit.pages.push(entry);
  console.log(`inspected ${name}`);
}

await browser.close();
writeFileSync(`${OUT}/render-inspect.json`, JSON.stringify(audit, null, 2));
console.log('DONE');
