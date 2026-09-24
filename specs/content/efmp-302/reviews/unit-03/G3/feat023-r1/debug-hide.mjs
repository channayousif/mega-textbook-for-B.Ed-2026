import { chromium } from 'playwright-core';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const svgPath = process.argv[2];
const sel = process.argv[3];
let svg = readFileSync(resolve(svgPath), 'utf8');
svg = svg.replace('<svg ', '<svg width="860" height="450" ');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1500, height: 1100 } });
await page.setContent(`<!doctype html><html><body><div id="wrap">${svg}</div>
<script>
const texts = [...document.querySelectorAll('#wrap text')];
for (const t of texts) {
  if (!t.textContent.includes(${JSON.stringify(sel)})) t.style.visibility = 'hidden';
}
window.__n = texts.length;
window.__vis = texts.filter((t) => t.style.visibility !== 'hidden').map((t) => t.textContent.slice(0, 30));
</script></body></html>`, { waitUntil: 'load' });
await page.waitForTimeout(300);
const r = await page.evaluate(() => ({ n: window.__n, vis: window.__vis }));
console.log(JSON.stringify(r, null, 2));
await browser.close();
