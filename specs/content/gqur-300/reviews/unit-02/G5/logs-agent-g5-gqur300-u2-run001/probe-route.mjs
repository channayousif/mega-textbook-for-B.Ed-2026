import { chromium } from 'playwright-core';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const url = 'http://localhost:3217/ur/semester-1/gqur-300/unit-02/';
try {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
  // Wait for the dev server to finish any recompile and the real page to appear
  await page.waitForFunction(() => {
    const h1 = document.querySelector('h1');
    return h1 && !/Page Not Found/i.test(h1.textContent);
  }, { timeout: 120000 });
} catch (e) {
  console.log('wait failed:', e.message.split('\n')[0]);
}
const info = await page.evaluate(() => ({
  url: location.href,
  title: document.title,
  h1: document.querySelector('h1')?.textContent?.trim().slice(0, 80),
  dir: document.documentElement.getAttribute('dir'),
}));
console.log(JSON.stringify(info, null, 1));
await browser.close();
