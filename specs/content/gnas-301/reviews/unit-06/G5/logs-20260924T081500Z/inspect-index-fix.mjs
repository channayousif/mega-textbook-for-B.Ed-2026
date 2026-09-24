// Follow-up: correct index URL + identify the per-page 404 resource.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4631/ur/semester-1/gnas-301/unit-06';
const OUT = new URL('../renders-20260924T081500Z/', import.meta.url).pathname;
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
const notFound = [];
page.on('response', (r) => { if (r.status() >= 400) notFound.push(r.status() + ' ' + r.url().replace('http://127.0.0.1:4631', '')); });
const consoleErrors = [];
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 160)); });

// correct unit index URL (directory root)
const resp = await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
const data = await page.evaluate(() => {
  const de = document.documentElement;
  const article = document.querySelector('article') || document.body;
  return {
    dir: de.getAttribute('dir'), lang: de.getAttribute('lang'),
    title: document.title,
    font: getComputedStyle(article).fontFamily.slice(0, 60),
    nastaliq: document.fonts.check('16px "Noto Nastaliq Urdu"'),
    overflow: de.scrollWidth - de.clientWidth,
    headings: [...document.querySelectorAll('article h2')].map((h) => h.textContent.trim()).slice(0, 8),
  };
});
await page.screenshot({ path: OUT + 'desktop-index.png' });
// print pass for index
await page.emulateMedia({ media: 'print' });
const printData = await page.evaluate(() => {
  const de = document.documentElement;
  const nb = document.querySelector('nav, .navbar, [class*="navbar"]');
  return { overflow: de.scrollWidth - de.clientWidth, navbarVisible: nb ? getComputedStyle(nb).display !== 'none' : null };
});
await page.screenshot({ path: OUT + 'print-a4-index.png' });
await page.emulateMedia({ media: 'screen' });
// narrow pass for index
await page.setViewportSize({ width: 360, height: 640 });
const narrowData = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth }));

// identify the 404 resource on a topic page
const page2 = await ctx.newPage();
const notFound2 = [];
page2.on('response', (r) => { if (r.status() >= 400) notFound2.push(r.status() + ' ' + r.url().replace('http://127.0.0.1:4631', '')); });
await page2.goto(BASE + '/topic-01', { waitUntil: 'networkidle' });

const out = { index: { status: resp.status(), ...data, print: printData, narrow: narrowData, consoleErrors, notFound }, topic01notFound: notFound2 };
writeFileSync(OUT + 'render-inspect-index.json', JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await browser.close();
