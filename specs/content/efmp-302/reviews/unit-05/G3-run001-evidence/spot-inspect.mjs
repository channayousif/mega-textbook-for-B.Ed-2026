import { chromium } from 'playwright';
const OUT = process.argv[2];
const BASE = 'http://localhost:3105/semester-1/efmp-302/unit-05';
const b = await chromium.launch();
async function shot(path, vw, vh, name, sel, media) {
  const ctx = await b.newContext({ viewport: { width: vw, height: vh } });
  const p = await ctx.newPage();
  await p.goto(BASE + path, { waitUntil: 'networkidle' });
  if (media) await p.emulateMedia({ media });
  await p.waitForTimeout(300);
  const el = await p.$(sel);
  if (!el) { console.log('NOT FOUND', name, sel); await ctx.close(); return; }
  await el.screenshot({ path: `${OUT}/${name}.png` });
  const box = await el.boundingBox();
  console.log(`${name}: ${vw}x${vh}${media?' ['+media+']':''} box=${JSON.stringify(box)}`);
  await ctx.close();
}
// where fig-U5-1 should be: between the h2 "A real classroom situation" and the following prose
await shot('/topic-01', 1280, 900, 'spot-topic01-figure1-region-desktop', 'main article > div > h2:first-of-type ~ p, main .theme-doc-markdown h2', null);
await shot('/topic-01', 1280, 900, 'spot-topic01-article-head-desktop', 'main .theme-doc-markdown', null);
await shot('/topic-04', 360, 740, 'spot-topic04-narrow-regions', 'main .theme-doc-markdown h3', null);
await shot('/unit-assessment', 360, 740, 'spot-assessment-narrow-rubric-table', 'main .theme-doc-markdown table:last-of-type', null);
await shot('/unit-assessment', 680, 1050, 'spot-assessment-printA4-rubric-table', 'main .theme-doc-markdown table:last-of-type', 'print');
await shot('/topic-01', 680, 1050, 'spot-topic01-printA4-minirubric', 'main .theme-doc-markdown table:last-of-type', 'print');
await b.close();
