import { chromium } from 'playwright';
const browser = await chromium.launch();
const targets = [
  '/semester-1/gnas-301/',
  '/semester-1/gnas-301/unit-01/',
  '/semester-1/gnas-301/unit-03/',
  '/semester-1/gnas-301/unit-05/',
  '/semester-1/gnas-301/unit-05/topic-01/',
  '/semester-1/gnas-301/unit-05/unit-assessment/',
  '/semester-1/gnas-301/unit-06/',
  '/semester-1/gnas-301/unit-06/topic-01/',
  '/semester-1/gnas-301/unit-06/unit-assessment/',
  '/',
];
for (const t of targets) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 80)); });
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 80)));
  await page.goto(`http://localhost:3457${t}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  console.log(t, '->', errors.length === 0 ? 'clean' : `${errors.length} errors: ${errors[0]}`);
  await ctx.close();
}
await browser.close();
