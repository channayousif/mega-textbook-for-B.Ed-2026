import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const OUT = process.argv[2]; mkdirSync(OUT, { recursive: true });
const BASE = 'http://localhost:3105/semester-1/efmp-302/unit-05';
// A4 210mm wide; Docusaurus print stylesheet + typical 15mm margins => ~180mm content = 680 CSS px at 96dpi.
const A4_CONTENT_PX = 680;
const pages = [['index','/'],['topic-01','/topic-01'],['topic-02','/topic-02'],['topic-03','/topic-03'],['topic-04','/topic-04'],['unit-assessment','/unit-assessment'],['unit-teacher-notes','/unit-teacher-notes']];
const b = await chromium.launch();
console.log('browser:', b.version(), '| A4 printable content width emulated at', A4_CONTENT_PX, 'CSS px');
const out = {};
for (const [name, path] of pages) {
  const ctx = await b.newContext({ viewport: { width: A4_CONTENT_PX, height: 1050 } });
  const p = await ctx.newPage();
  await p.goto(BASE + path, { waitUntil: 'networkidle' });
  await p.emulateMedia({ media: 'print' });
  await p.waitForTimeout(400);
  const res = await p.evaluate((W) => {
    const main = document.querySelector('main') || document.body;
    const over = [];
    for (const el of main.querySelectorAll('table, pre, figure, img, blockquote')) {
      const r = el.getBoundingClientRect();
      const scrollable = el.scrollWidth > el.clientWidth + 1;
      if (r.width > W + 1 || r.right > W + 1 || scrollable) {
        over.push({ tag: el.tagName, renderedW: Math.round(r.width), right: Math.round(r.right),
          scrollW: el.scrollWidth, clientW: el.clientWidth, horizontallyScrollable: scrollable,
          text: (el.textContent||'').replace(/\s+/g,' ').trim().slice(0,70) });
      }
    }
    // is any table cell text truncated / overflowing its cell?
    const cellClip = [];
    for (const td of main.querySelectorAll('td,th')) {
      if (td.scrollWidth > td.clientWidth + 1) cellClip.push({ text: td.textContent.trim().slice(0,50), scrollW: td.scrollWidth, clientW: td.clientWidth });
    }
    return { docScrollW: document.documentElement.scrollWidth, viewportW: W,
      pageOverflowsA4: document.documentElement.scrollWidth > W + 1, overflowing: over, cellClip: cellClip.slice(0,10) };
  }, A4_CONTENT_PX);
  await p.screenshot({ path: `${OUT}/${name}-print-A4width-680.png`, fullPage: true });
  out[name] = res;
  console.log(`${name}: pageOverflowsA4=${res.pageOverflowsA4} docScrollW=${res.docScrollW} overflowingEls=${res.overflowing.length} clippedCells=${res.cellClip.length}`);
  await ctx.close();
}
await b.close();
console.log('\n===== PRINT A4 JSON =====');
console.log(JSON.stringify(out, null, 1));
