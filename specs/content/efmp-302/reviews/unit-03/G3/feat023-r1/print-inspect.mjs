import { chromium } from 'playwright-core';
import { createHash } from 'node:crypto';

const base = 'http://127.0.0.1:4601';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
await page.emulateMedia({ media: 'print' });
const out = {};
for (const p of ['topic-04', 'unit-assessment']) {
  await page.goto(base + '/semester-1/efmp-302/unit-03/' + p + '/', { waitUntil: 'networkidle' });
  out[p] = await page.evaluate(() => {
    const clipped = [];
    for (const el of document.querySelectorAll('main *')) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > 796 || r.left < -2)) clipped.push({ tag: el.tagName, cls: (el.className || '').toString().slice(0, 40), right: Math.round(r.right), left: Math.round(r.left) });
    }
    const headings = [...document.querySelectorAll('h2')].map((h) => h.textContent.trim());
    return { clippedCount: clipped.length, clippedSample: clipped.slice(0, 5), hasAnswers: headings.some((h) => h.includes('Answers and marking guidance')) };
  });
}
// served vs committed identity for all 10 figure SVGs
out.servedDigests = {};
for (let i = 1; i <= 10; i++) {
  const id = 'fig-U3-' + i;
  const res = await page.request.get(base + '/img/figures/efmp-302/unit-03/' + id + '.svg');
  out.servedDigests[id] = { status: res.status(), sha256: createHash('sha256').update(await res.body()).digest('hex').slice(0, 16) };
}
console.log(JSON.stringify(out, null, 2));
await browser.close();
