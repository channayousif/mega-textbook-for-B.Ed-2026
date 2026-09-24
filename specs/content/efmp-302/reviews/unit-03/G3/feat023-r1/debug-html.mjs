import { chromium } from 'playwright-core';
import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';

const svgPath = process.argv[2];
const sel = process.argv[3];
let svg = readFileSync(resolve(svgPath), 'utf8');
svg = svg.replace('<svg ', '<svg width="860" height="450" ');
const html = `<!doctype html><html><head><style>html,body{margin:0;padding:0;background:#fff}</style></head>
<body><div id="wrap" style="display:inline-block;line-height:0">${svg}</div>
<script>
const mode = ${JSON.stringify(sel)};
const texts = [...document.querySelectorAll('#wrap text')];
for (const t of texts) {
  const mine = t.textContent.includes(mode);
  if (!mine) t.style.visibility = 'hidden';
}
</script></body></html>`;
writeFileSync('/tmp/debug-html.html', html);
const browser = await chromium.launch();
const page = await browser.newPage();
page.on('pageerror', (e) => console.log('PAGEERROR:', e.message));
page.on('console', (m) => console.log('CONSOLE:', m.type(), m.text()));
await page.setContent(html, { waitUntil: 'load' });
await page.waitForTimeout(300);
const r = await page.evaluate(() => [...document.querySelectorAll('#wrap text')].filter((t) => t.style.visibility !== 'hidden').length);
console.log('visible:', r);
await browser.close();
