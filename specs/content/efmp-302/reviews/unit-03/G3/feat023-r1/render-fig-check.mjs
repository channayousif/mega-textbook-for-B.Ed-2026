import { chromium } from 'playwright-core';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const files = process.argv.slice(2);
const outDir = process.env.OUT_DIR || '/tmp';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
for (const f of files) {
  const abs = resolve(f);
  let svg = readFileSync(abs, 'utf8');
  const vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg);
  const w = vb ? parseFloat(vb[1]) : 860;
  const h = vb ? parseFloat(vb[2]) : 450;
  svg = svg.replace('<svg ', `<svg width="${w}" height="${h}" `);
  const html = `<!doctype html><html><head><style>html,body{margin:0;padding:0;background:#fff}</style></head>
<body><div id="wrap" style="display:inline-block;line-height:0">${svg}</div></body></html>`;
  await page.setContent(html, { waitUntil: 'load' });
  await page.waitForTimeout(400);
  const out = outDir + '/figcheck-' + abs.split('/').pop().replace('.svg', '') + '.png';
  const el = page.locator('#wrap').first();
  await el.screenshot({ path: out });
  console.log('rendered', abs, '->', out);
}
await browser.close();
