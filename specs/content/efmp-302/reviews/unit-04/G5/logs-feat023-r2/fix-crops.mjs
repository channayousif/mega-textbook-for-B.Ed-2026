// G5 feat023-r2: two crop fixes for locators that need different selectors
// (fig-U4-8 caption lives inside the SVG image, not DOM text; the ERQ-2 rubric
// title is a bold paragraph, not a heading). Same build, same port 4625.
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:4625';
const out = 'specs/content/efmp-302/reviews/unit-04/G5/renders-feat023-r2';

const server = spawn('npm', ['run', 'serve', '--', '--port', '4625', '--no-open'], { stdio: 'ignore', detached: true });
await new Promise((r) => setTimeout(r, 6000));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

// fig-U4-8 figure: locate by img src
await page.goto(`${base}/ur/semester-1/efmp-302/unit-04/topic-04/`, { waitUntil: 'networkidle' });
let loc = page.locator('figure:has(img[src*="fig-U4-8.ur.svg"])').first();
try {
  await loc.waitFor({ state: 'visible', timeout: 8000 });
  await loc.screenshot({ path: `${out}/crop-topic-04-fig-U4-8.png` });
  console.log('OK   crop-topic-04-fig-U4-8.png');
} catch (e) { console.log('MISS fig-U4-8:', e.message.split('\n')[0]); }

// ERQ-2 rubric title: bold paragraph
await page.goto(`${base}/ur/semester-1/efmp-302/unit-04/unit-assessment/`, { waitUntil: 'networkidle' });
loc = page.locator('p:has-text("مجموعی نقشہ")').first();
try {
  await loc.waitFor({ state: 'visible', timeout: 8000 });
  await loc.screenshot({ path: `${out}/crop-assessment-erq2-rubric.png` });
  console.log('OK   crop-assessment-erq2-rubric.png');
} catch (e) { console.log('MISS rubric:', e.message.split('\n')[0]); }

await browser.close();
try { process.kill(-server.pid, 'SIGTERM'); } catch { /* already gone */ }
