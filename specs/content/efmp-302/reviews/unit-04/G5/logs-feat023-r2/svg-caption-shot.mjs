// G5 feat023-r2: screenshot fig-U4-8.ur.svg at natural size so the caption
// text (the residual شاید modal-force defect) is readable. The SVG is wrapped
// in a minimal HTML page (a bare fullPage screenshot of an SVG times out).
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:4625';
const out = 'specs/content/efmp-302/reviews/unit-04/G5/renders-feat023-r2';

const server = spawn('npm', ['run', 'serve', '--', '--port', '4625', '--no-open'], { stdio: 'ignore', detached: true });
await new Promise((r) => setTimeout(r, 6000));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 500 }, deviceScaleFactor: 2 });
await page.setContent(`<html><body style="margin:0"><img src="${base}/img/figures/efmp-302/unit-04/fig-U4-8.ur.svg" width="880" height="470"></body></html>`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.screenshot({ path: `${out}/crop-fig-U4-8-ur-full.png`, clip: { x: 0, y: 0, width: 880, height: 470 } });
console.log('OK   crop-fig-U4-8-ur-full.png');

await browser.close();
try { process.kill(-server.pid, 'SIGTERM'); } catch { /* already gone */ }
