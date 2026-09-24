import { chromium } from 'playwright-core';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('http://localhost:3217/ur/', { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.waitForLoadState('networkidle', { timeout: 120000 }).catch(() => {});
const info = await page.evaluate(() => {
  const links = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')).filter((h) => h && h.includes('gqur-300'));
  return {
    title: document.title,
    h1: document.querySelector('h1')?.textContent?.trim().slice(0, 60),
    dir: document.documentElement.getAttribute('dir'),
    gqurLinks: [...new Set(links)].slice(0, 10),
    anyUrLinks: [...new Set([...document.querySelectorAll('a[href^="/ur/"]')].map((a) => a.getAttribute('href')))].slice(0, 10),
  };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
