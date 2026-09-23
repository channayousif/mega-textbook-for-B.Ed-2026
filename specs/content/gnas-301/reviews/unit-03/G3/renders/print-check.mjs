// Print-media verification: no horizontal clipping, figures fit, answers present, chrome hidden.
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
const report = { generated: new Date().toISOString(), pages: [] };

for (const [name, path] of PAGES) {
  const ctx = await browser.newContext({ viewport: { width: 794, height: 1123 } });
  const page = await ctx.newPage();
  await page.emulateMedia({ media: 'print' });
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const res = await page.evaluate(() => {
    const doc = document.documentElement;
    const nav = document.querySelector('nav, .navbar, header[class*="navbar"]');
    const sidebar = document.querySelector('.theme-doc-sidebar-container, aside');
    const article = document.querySelector('article');
    const out = {
      docScrollWidth: doc.scrollWidth,
      pageWidth: 794,
      horizontalClipping: doc.scrollWidth > 794,
      navbarDisplay: nav ? getComputedStyle(nav).display : 'none-found',
      sidebarDisplay: sidebar ? getComputedStyle(sidebar).display : 'none-found',
      articleRight: article ? Math.round(article.getBoundingClientRect().right) : null,
      figures: [],
      answersHeading: null,
      lastElementBottom: null,
    };
    for (const f of document.querySelectorAll('article figure')) {
      const img = f.querySelector('img');
      const r = f.getBoundingClientRect();
      out.figures.push({ img: img ? img.getAttribute('src') : null, right: Math.round(r.right), bottom: Math.round(r.bottom), fitsWidth: r.right <= 794 + 1, loaded: img ? img.complete && img.naturalWidth > 0 : false });
    }
    const ans = [...document.querySelectorAll('article h2')].find((h) => /answers and marking/i.test(h.textContent));
    if (ans) {
      out.answersHeading = { text: ans.textContent.trim(), top: Math.round(ans.getBoundingClientRect().top + window.scrollY) };
      const last = ans.parentElement.lastElementChild;
      out.lastElementBottom = last ? Math.round(last.getBoundingClientRect().bottom + window.scrollY) : null;
    }
    return out;
  });
  report.pages.push({ name, ...res });
  await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}/print-check.json`, JSON.stringify(report, null, 2));
for (const p of report.pages) {
  console.log(`${p.name}: clip=${p.horizontalClipping} docW=${p.docScrollWidth} nav=${p.navbarDisplay} sidebar=${p.sidebarDisplay} figs=${p.figures.length}${p.figures.length ? ' allFit=' + p.figures.every((f) => f.fitsWidth && f.loaded) : ''}${p.answersHeading ? ' answers@' + p.answersHeading.top + ' lastBottom=' + p.lastElementBottom : ''}`);
}
