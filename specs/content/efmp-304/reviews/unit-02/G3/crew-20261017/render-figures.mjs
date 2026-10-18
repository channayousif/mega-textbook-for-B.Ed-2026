import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
const output = 'specs/content/efmp-304/reviews/unit-02/G3/crew-20261017';
const browser = await chromium.launch();
try {
  console.log(`Supplementary SVG inspection only. Browser ${browser.version()}. No Docusaurus pages inspected.`);
  for (const [id,width] of [[2,780],[4,900]]) {
    const file = `static/img/figures/efmp-304/unit-02/fig-U2-${id}.svg`;
    const page = await browser.newPage({viewport:{width,height:470},deviceScaleFactor:1});
    await page.setContent(`<style>html,body{margin:0;padding:0}svg{display:block;width:${width}px;height:470px}</style>${readFileSync(file,'utf8')}`);
    const path = `${output}/fig-U2-${id}-native.png`;
    await page.screenshot({path});
    console.log(`${file} -> ${path}; native ${width} x 470, screen media.`);
    await page.close();
  }
  console.log('Required narrow (360px) and A4 print Docusaurus page inspection unavailable: brief forbids build/server, no fresh page render provided. SVG screenshots do not satisfy render-review.');
} finally { await browser.close(); }
