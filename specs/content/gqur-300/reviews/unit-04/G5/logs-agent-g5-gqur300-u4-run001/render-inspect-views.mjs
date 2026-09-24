import { chromium } from 'playwright-core';
const EXEC = '/home/a2ahs/.cache/ms-playwright/chromium-1243/chrome-linux-arm64/chrome';
const BASE = 'http://localhost:3224/ur/semester-1/gqur-300/unit-04';
const browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
const out = [];
for (const [tag, opts, media] of [
  ['narrow-360', { viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, null],
  ['print-emulated', { viewport: { width: 794, height: 1123 } }, 'print'],
]) {
  const ctx = await browser.newContext(opts);
  const p = await ctx.newPage();
  if (media) await p.emulateMedia({ media });
  for (const name of ['index', 'topic-01', 'topic-02', 'topic-03', 'unit-assessment', 'unit-teacher-notes']) {
    await p.goto(`${BASE}/${name === 'index' ? '' : name + '/'}`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(300);
    const info = await p.evaluate(() => {
      const de = document.documentElement;
      const art = document.querySelector('article') || document.body;
      return {
        dir: de.getAttribute('dir'), lang: de.getAttribute('lang'),
        nastaliq: document.fonts.check('16px "Noto Nastaliq Urdu"', 'پیمائش کی اکائی اطراف رقبہ حجم'),
        latinRuns: [...new Set((art.innerText.match(/[A-Za-z][A-Za-z0-9&;.:/()-]{2,}/g) || []).slice(0, 40))],
      };
    });
    out.push({ view: tag, name, ...info });
  }
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 1));
