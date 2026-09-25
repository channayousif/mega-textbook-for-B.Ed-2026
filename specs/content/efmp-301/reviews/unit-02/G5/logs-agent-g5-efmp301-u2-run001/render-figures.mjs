// G5 figure lazy-load verification + remaining Urdu figure captures - run agent-g5-efmp301-u2-run001
import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';

const BASE = 'http://localhost:3212/ur/semester-1/efmp-301/unit-02';
const OUT = new URL('../../renders-agent-g5-efmp301-u2-run001/', import.meta.url).pathname;
const log = [];
const say = (s) => { log.push(s); console.log(s); };

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

async function captureAll(topic, figIds) {
  await page.goto(`${BASE}/${topic}/`, { waitUntil: 'networkidle' });
  // scroll through the whole page to trigger every lazy figure
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
  const broken = await page.evaluate(() =>
    [...document.querySelectorAll('img')].filter((i) => i.src.includes('.ur.svg') && !i.complete || (i.src.includes('.ur.svg') && i.naturalWidth === 0)).map((i) => i.getAttribute('src'))
  );
  say(`${topic} visible-light-variant unloaded after scroll: ` + JSON.stringify(broken));
  for (const id of figIds) {
    const img = page.locator(`img[src*="${id}.ur.svg"]`).first();
    if (await img.count()) {
      await img.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await img.screenshot({ path: `${OUT}15-${id}-ur.png` });
      say(`saved 15-${id}-ur.png`);
    } else { say(`MISSING in-page: ${id}`); }
  }
}

await captureAll('topic-01', ['fig-U2-1', 'fig-U2-2']);
await captureAll('topic-02', ['fig-U2-3', 'fig-U2-4']);
await captureAll('topic-03', ['fig-U2-5', 'fig-U2-6']);
await captureAll('topic-04', ['fig-U2-7', 'fig-U2-8']);

await browser.close();
writeFileSync(new URL('./render-figures.log', import.meta.url).pathname, log.join('\n') + '\n');
console.log('DONE');
