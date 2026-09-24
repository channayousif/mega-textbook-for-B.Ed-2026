// A4 print-emulation check for the Urdu Unit 5 pages (G5 run 001).
// Mirrors the G3 round-2 printcheck: 794px viewport, print media, element clipping
// and document overflow, plus figure visibility under print media.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const BASE = 'http://localhost:3459/ur/semester-1/gnas-301/unit-05';
const PAGES = ['index', 'topic-01', 'topic-02', 'topic-03', 'topic-04', 'unit-assessment', 'unit-teacher-notes'];
const out = {};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
await page.emulateMedia({ media: 'print' });

for (const p of PAGES) {
  await page.goto(`${BASE}/${p}/`, { waitUntil: 'networkidle' });
  out[p] = await page.evaluate(() => {
    const doc = document.documentElement;
    const clipped = [...document.querySelectorAll('article *')].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.right > doc.clientWidth + 2 || r.left < -2);
    }).slice(0, 5).map((el) => ({
      tag: el.tagName, right: Math.round(el.getBoundingClientRect().right),
      left: Math.round(el.getBoundingClientRect().left),
      text: (el.textContent || '').trim().slice(0, 40),
    }));
    const figs = [...document.querySelectorAll('figure img')].map((i) => {
      const r = i.getBoundingClientRect();
      const cs = getComputedStyle(i);
      return { src: i.getAttribute('src'), visible: cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 0 };
    });
    return {
      overflowX: doc.scrollWidth - doc.clientWidth,
      clipped,
      figuresVisibleInPrint: figs,
      articleDir: getComputedStyle(document.querySelector('article') || doc).direction,
    };
  });
  console.log(`${p}: overflowX=${out[p].overflowX} clipped=${out[p].clipped.length} figsVisible=${out[p].figuresVisibleInPrint.filter((f) => f.visible).length}/${out[p].figuresVisibleInPrint.length} dir=${out[p].articleDir}`);
}
await browser.close();
writeFileSync('specs/content/gnas-301/reviews/unit-05/G5/renders-20260924T081245Z/printcheck-ur.json', JSON.stringify(out, null, 2) + '\n');
console.log('print check complete');
