// G3 round-2 render inspection for GNAS-301 Units 3 and 4 - one shared build,
// served at http://127.0.0.1:4613 (fresh `npm run build`, log: ../logs/build.log).
// Desktop 1280x900, narrow 360x780, A4 print emulation per the G3 rubric:
// content tables are measured on the <table> element itself (its own scroll
// container), including a scrollLeft reachability re-measure, and hydration
// attributes (tabindex/role/aria-label) are checked rather than inferred.
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4613';
const UNITS = [
  {
    unit: 3,
    out: 'specs/content/gnas-301/reviews/unit-03/G3/round-02/renders',
    pages: [
      ['index', '/semester-1/gnas-301/unit-03/'],
      ['topic-01', '/semester-1/gnas-301/unit-03/topic-01'],
      ['topic-02', '/semester-1/gnas-301/unit-03/topic-02'],
      ['topic-03', '/semester-1/gnas-301/unit-03/topic-03'],
      ['topic-04', '/semester-1/gnas-301/unit-03/topic-04'],
      ['unit-assessment', '/semester-1/gnas-301/unit-03/unit-assessment'],
      ['unit-teacher-notes', '/semester-1/gnas-301/unit-03/unit-teacher-notes'],
    ],
  },
  {
    unit: 4,
    out: 'specs/content/gnas-301/reviews/unit-04/G3/round-02/renders',
    pages: [
      ['index', '/semester-1/gnas-301/unit-04/'],
      ['topic-01', '/semester-1/gnas-301/unit-04/topic-01'],
      ['topic-02', '/semester-1/gnas-301/unit-04/topic-02'],
      ['topic-03', '/semester-1/gnas-301/unit-04/topic-03'],
      ['topic-04', '/semester-1/gnas-301/unit-04/topic-04'],
      ['topic-05', '/semester-1/gnas-301/unit-04/topic-05'],
      ['topic-06', '/semester-1/gnas-301/unit-04/topic-06'],
      ['topic-07', '/semester-1/gnas-301/unit-04/topic-07'],
      ['unit-assessment', '/semester-1/gnas-301/unit-04/unit-assessment'],
      ['unit-teacher-notes', '/semester-1/gnas-301/unit-04/unit-teacher-notes'],
    ],
  },
];

const browser = await chromium.launch();
const audit = { base: BASE, started: new Date().toISOString(), browser: await browser.version(), units: [] };

for (const U of UNITS) {
  mkdirSync(U.out, { recursive: true });
  const unitAudit = { unit: U.unit, pages: [] };

  for (const [name, path] of U.pages) {
    const entry = { name, path, desktop: {}, narrow: {}, print: {} };

    // ---- desktop 1280x900 ----
    const dctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const dpage = await dctx.newPage();
    const errors = [];
    dpage.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    dpage.on('pageerror', (e) => errors.push(String(e)));
    await dpage.goto(BASE + path, { waitUntil: 'networkidle' });
    await dpage.waitForTimeout(400);
    entry.desktop = await dpage.evaluate(() => {
      const imgs = [...document.querySelectorAll('article img')];
      const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src'));
      const noAlt = imgs.filter((i) => !(i.getAttribute('alt') || '').trim()).map((i) => i.getAttribute('src'));
      const hs = [...document.querySelectorAll('article h1, article h2, article h3, article h4, article h5, article h6')].map((h) => h.tagName);
      const skipped = [];
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
        docScrollWidth: doc.scrollWidth,
        docClientWidth: doc.clientWidth,
        docOverflowX: doc.scrollWidth > doc.clientWidth,
        linksNoText: [...document.querySelectorAll('article a')].filter((a) => !a.textContent.trim() && !a.getAttribute('aria-label')).length,
      };
    });
    entry.desktop.consoleErrors = errors;
    await dpage.screenshot({ path: `${U.out}/desktop-${name}.png`, fullPage: false });

    // figure checks on desktop: force lazy-load, measure alt/figcaption/pixels
    entry.desktop.figures = await dpage.evaluate(async () => {
      const figs = [...document.querySelectorAll('article figure')];
      const out = [];
      for (const f of figs) {
        const img = f.querySelector('img');
        if (img && !img.complete) await new Promise((r) => { img.onload = img.onerror = r; setTimeout(r, 2500); });
        const canvas = document.createElement('canvas');
        let pixelStddev = null;
        if (img && img.complete && img.naturalWidth > 0) {
          canvas.width = 60; canvas.height = 40;
          const cx = canvas.getContext('2d');
          try {
            cx.drawImage(img, 0, 0, 60, 40);
            const d = cx.getImageData(0, 0, 60, 40).data;
            let sum = 0, sq = 0, n = 0;
            for (let i = 0; i < d.length; i += 4) { sum += d[i]; sq += d[i] * d[i]; n++; }
            pixelStddev = Math.round(Math.sqrt(sq / n - (sum / n) ** 2) * 10) / 10;
          } catch { pixelStddev = 'tainted'; }
        }
        out.push({
          id: f.id || img?.getAttribute('src') || null,
          alt: img?.getAttribute('alt') || null,
          altLen: (img?.getAttribute('alt') || '').length,
          hasFigcaption: !!f.querySelector('figcaption'),
          loaded: !!(img && img.complete && img.naturalWidth > 0),
          pixelStddev,
        });
      }
      return out;
    });
    await dctx.close();

    // ---- narrow 360x780 ----
    const nctx = await browser.newContext({ viewport: { width: 360, height: 780 } });
    const npage = await nctx.newPage();
    await npage.goto(BASE + path, { waitUntil: 'networkidle' });
    await npage.waitForTimeout(400);
    entry.narrow = await npage.evaluate(() => {
      const doc = document.documentElement;
      // G3 rubric: measure the table element itself, not the wrapper.
      const tables = [...document.querySelectorAll('article table')].map((t) => {
        const rect = t.getBoundingClientRect();
        const cols = [...t.querySelectorAll('tr')][0] ? [...t.querySelectorAll('tr')][0].children : [];
        const lastCol = cols[cols.length - 1];
        const before = lastCol ? { right: Math.round(lastCol.getBoundingClientRect().right) } : null;
        // reachability test: scroll the table itself fully right, re-measure
        t.scrollLeft = t.scrollWidth;
        const after = lastCol ? { right: Math.round(lastCol.getBoundingClientRect().right) } : null;
        t.scrollLeft = 0;
        return {
          clientWidth: t.clientWidth,
          scrollWidth: t.scrollWidth,
          fits: t.scrollWidth <= t.clientWidth,
          lastColRightBeforeScroll: before?.right ?? null,
          lastColRightAfterScroll: after?.right ?? null,
          reachableBySwipe: after ? after.right <= 360 : true,
          hydrationAttrs: {
            tabindex: t.getAttribute('tabindex'),
            role: t.getAttribute('role'),
            ariaLabel: t.getAttribute('aria-label'),
          },
        };
      });
      const figs = [...document.querySelectorAll('article figure img')].map((i) => {
        const r = i.getBoundingClientRect();
        return { src: i.getAttribute('src'), right: Math.round(r.right), fits: r.right <= 360 };
      });
      return {
        docScrollWidth: doc.scrollWidth,
        docClientWidth: doc.clientWidth,
        docOverflowX: doc.scrollWidth > doc.clientWidth,
        tables,
        figures: figs,
      };
    });
    await npage.screenshot({ path: `${U.out}/narrow360-${name}.png`, fullPage: false });
    await nctx.close();

    // ---- A4 print emulation ----
    const pctx = await browser.newContext({ viewport: { width: 794, height: 1123 } });
    const ppage = await pctx.newPage();
    await ppage.emulateMedia({ media: 'print' });
    await ppage.goto(BASE + path, { waitUntil: 'networkidle' });
    await ppage.waitForTimeout(400);
    entry.print = await ppage.evaluate(() => {
      const doc = document.documentElement;
      const clipped = [...document.querySelectorAll('article *')].filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && (r.right > 795 || r.left < -1);
      }).slice(0, 5).map((el) => el.tagName + '.' + String(el.className).slice(0, 40));
      const navbar = document.querySelector('.navbar, nav');
      const sidebar = document.querySelector('.theme-doc-sidebar-container, .docs-wrapper aside');
      const figs = [...document.querySelectorAll('article figure img')].map((i) => {
        const r = i.getBoundingClientRect();
        return { src: i.getAttribute('src'), right: Math.round(r.right), loaded: i.complete && i.naturalWidth > 0 };
      });
      const answers = [...document.querySelectorAll('article h2, article h3')].find((h) => /answers|marking/i.test(h.textContent));
      return {
        docScrollWidth: doc.scrollWidth,
        docOverflowX: doc.scrollWidth > doc.clientWidth,
        clippedElems: clipped,
        navbarHidden: navbar ? getComputedStyle(navbar).display === 'none' : 'no-navbar',
        sidebarHidden: sidebar ? getComputedStyle(sidebar).display === 'none' : 'no-sidebar',
        figures: figs,
        allFiguresFit: figs.every((f) => f.right <= 794 && f.loaded),
        answersHeadingY: answers ? Math.round(answers.getBoundingClientRect().top + window.scrollY) : null,
      };
    });
    await ppage.pdf({ path: `${U.out}/print-a4-${name}.pdf`, format: 'A4', printBackground: true });
    await ppage.screenshot({ path: `${U.out}/printview-${name}.png`, fullPage: false });
    await pctx.close();

    unitAudit.pages.push(entry);
    console.log(`unit-${U.unit} ${name}: desktop(errors=${(entry.desktop.consoleErrors || []).length}, broken=${entry.desktop.brokenImages.length}, noAlt=${entry.desktop.imagesWithoutAlt.length}) narrow(overflow=${entry.narrow.docOverflowX}, tables=${entry.narrow.tables.length}) print(clipped=${entry.print.clippedElems.length}, figsFit=${entry.print.allFiguresFit})`);
  }
  audit.units.push(unitAudit);
}

audit.completed = new Date().toISOString();
writeFileSync('specs/content/gnas-301/reviews/unit-03/G3/round-02/renders/render-inspect.json', JSON.stringify(audit, null, 1));
writeFileSync('specs/content/gnas-301/reviews/unit-04/G3/round-02/renders/render-inspect.json', JSON.stringify(audit, null, 1));
await browser.close();
console.log('render inspection complete');
