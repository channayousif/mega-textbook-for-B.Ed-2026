// G5: is the Urdu h1 Latin-stack issue site-wide or unit-specific?
import { chromium } from 'playwright-core';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const urls = [
  'http://localhost:3217/ur/semester-1/efmp-301/unit-05/',
  'http://localhost:3217/ur/semester-1/efmp-301/unit-03/topic-01',
];
for (const u of urls) {
  const resp = await page.goto(u, { waitUntil: 'domcontentloaded' }).catch(() => null);
  if (!resp || resp.status() !== 200) { console.log(u, '-> status', resp && resp.status()); continue; }
  const r = await page.evaluate(async () => {
    await document.fonts.ready;
    const h1 = document.querySelector('h1');
    return {
      title: document.title.slice(0, 50),
      h1Family: h1 ? getComputedStyle(h1).fontFamily.slice(0, 60) : null,
      nastaliqLoaded: [...document.fonts].some((f) => f.family.includes('Nastaliq') && f.status === 'loaded'),
    };
  });
  console.log(u, '->', JSON.stringify(r));
}
await browser.close();
