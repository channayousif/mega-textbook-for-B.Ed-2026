// G5 run001 figure render harness: screenshots every EN/UR/UR-dark SVG variant
// of EFMP-301 Unit 8 straight from the committed files (file:// URLs), DSF 2.
// Evidence for the figure-inspection criteria; run from the repo root.
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const base = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-ad57ca9469bfc4572';
const out = `${base}/specs/content/efmp-301/reviews/unit-08/G5/renders-agent-g5-efmp301-u8-run001/figures`;
mkdirSync(out, { recursive: true });

const exe = '/home/a2ahs/.cache/ms-playwright/chromium-1228/chrome-linux/chrome';
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox', '--force-color-profile=srgb'] });
const page = await browser.newPage({ viewport: { width: 780, height: 470 }, deviceScaleFactor: 2 });

const figs = ['fig-U8-1', 'fig-U8-2', 'fig-U8-3', 'fig-U8-4', 'fig-U8-5', 'fig-U8-6'];
for (const fig of figs) {
  for (const variant of ['en', 'ur', 'ur.dark']) {
    const file = variant === 'en' ? `${fig}.svg` : `${fig}.${variant}.svg`;
    await page.goto(`file://${base}/static/img/figures/efmp-301/unit-08/${file}`);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${out}/${fig}.${variant}.png`, clip: { x: 0, y: 0, width: 780, height: 470 } });
    console.log('rendered', fig, variant);
  }
}
await browser.close();
