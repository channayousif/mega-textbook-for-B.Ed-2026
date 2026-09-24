import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
await page.emulateMedia({ media: 'print' });
for (const u of ['05', '06']) {
  await page.goto(`http://localhost:3457/semester-1/gnas-301/unit-${u}/`, { waitUntil: 'networkidle' });
  const clipped = await page.evaluate(() => {
    const doc = document.documentElement;
    return [...document.querySelectorAll('body *')].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.right > doc.clientWidth + 2 || r.left < -2);
    }).slice(0, 6).map((el) => ({
      tag: el.tagName, cls: (el.className || '').toString().slice(0, 60),
      right: Math.round(el.getBoundingClientRect().right), left: Math.round(el.getBoundingClientRect().left),
      text: (el.textContent || '').trim().slice(0, 40),
    }));
  });
  console.log(`unit-${u} index clipped:`, JSON.stringify(clipped, null, 1));
}
await page.goto('http://localhost:3457/semester-1/gnas-301/unit-01/', { waitUntil: 'networkidle' });
const u1 = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
console.log('unit-01 index print overflow:', u1);
await browser.close();
