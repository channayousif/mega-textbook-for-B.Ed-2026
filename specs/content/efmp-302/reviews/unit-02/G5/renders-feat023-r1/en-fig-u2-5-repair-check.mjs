#!/usr/bin/env node
/** Verify the 8db9943 repair of fig-U2-5.svg / fig-U2-5.dark.svg (EN): same getBBox + ink method, disk bytes. */
import { chromium } from 'playwright-core';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.env.CONTENT_ROOT || '.');
const logsDir = join(root, 'specs/content/efmp-302/reviews/unit-02/G5/logs-feat023-r1');
const files = ['static/img/figures/efmp-302/unit-02/fig-U2-5.svg', 'static/img/figures/efmp-302/unit-02/fig-U2-5.dark.svg'];
const lines = [];
const say = (s) => { lines.push(s); console.log(s); };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });

for (const rel of files) {
  const svgText = readFileSync(join(root, rel), 'utf8');
  const sized = svgText.replace(/<svg /, '<svg width="780" height="430" ');
  await page.setContent(`<!doctype html><meta charset="utf-8"><style>html,body{margin:0;padding:0}</style><div id="host">${sized}</div>`, { waitUntil: 'load' });
  const geo = await page.evaluate(() => {
    const svg = document.querySelector('#host svg');
    const texts = [...svg.querySelectorAll('text')];
    const box = (el) => { const b = el.getBBox(); return { s: el.textContent.replace(/\s+/g, ' ').slice(0, 40), x: b.x, y: b.y, r: b.x + b.width, b: b.y + b.height }; };
    return texts.map(box);
  });
  const pairs = [];
  for (let i = 0; i < geo.length; i++) {
    for (let j = i + 1; j < geo.length; j++) {
      const a = geo[i], b = geo[j];
      const ix = Math.min(a.r, b.r) - Math.max(a.x, b.x);
      const iy = Math.min(a.b, b.b) - Math.max(a.y, b.y);
      if (ix > 0 && iy > 0) pairs.push({ a: a.s, b: b.s, ix: +ix.toFixed(1), iy: +iy.toFixed(1) });
    }
  }
  const sha = createHash('sha256').update(svgText).digest('hex');
  say(`${rel}: sha256=${sha.slice(0, 16)}... texts=${geo.length} bboxOverlapPairs=${pairs.length}`);
  for (const p of pairs) say(`   OVERLAP: "${p.a}" vs "${p.b}" ${p.ix}x${p.iy}`);
  const wo = geo.find((t) => /was outweighed/.test(t.s));
  const nf = geo.filter((t) => /did not|follow through/.test(t.s));
  say(`   "was outweighed" box: x=${wo.x.toFixed(1)}..${wo.r.toFixed(1)} y=${wo.y.toFixed(1)}..${wo.b.toFixed(1)}`);
  for (const t of nf) say(`   "${t.s}" box: x=${t.x.toFixed(1)}..${t.r.toFixed(1)} y=${t.y.toFixed(1)}..${t.b.toFixed(1)}`);
}
await browser.close();
say(`# finished: ${new Date().toISOString()}`);
writeFileSync(join(logsDir, 'en-fig-u2-5-repair-check.log'), `${lines.join('\n')}\n`);
