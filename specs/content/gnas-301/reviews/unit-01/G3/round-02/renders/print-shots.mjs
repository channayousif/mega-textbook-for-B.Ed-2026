// Print-view screenshots (A4 794px, print media) for the assessment and topic-03.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const BUILD = path.join(ROOT, 'build');
const OUT = path.join(ROOT, 'specs/content/gnas-301/reviews/unit-01/G3/round-02/renders');
const PORT = 4612;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.json': 'application/json', '.woff2': 'font/woff2' };

const server = createServer(async (req, res) => {
  try {
    const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(BUILD, p);
    const st = await stat(file).catch(() => null);
    if (!st) file = path.join(BUILD, p, 'index.html');
    else if (st.isDirectory()) file = path.join(file, 'index.html');
    if (!existsSync(file)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch (e) { res.writeHead(500); res.end(String(e)); }
});
await new Promise((r) => server.listen(PORT, '127.0.0.1', r));

const browser = await chromium.launch();
for (const [name, route] of [['unit-assessment', '/semester-1/gnas-301/unit-01/unit-assessment/'], ['topic-03', '/semester-1/gnas-301/unit-01/topic-03/']]) {
  const p = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  await p.emulateMedia({ media: 'print' });
  await p.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'networkidle' });
  await p.screenshot({ path: path.join(OUT, `printview-${name}.png`), fullPage: true });
  const info = await p.evaluate(() => {
    const a = document.querySelector('h2#answers-and-marking-guidance');
    const heads = [...document.querySelectorAll('h2')].map((h) => h.textContent.trim());
    const r = a ? a.getBoundingClientRect() : null;
    return { hasAnswersHeading: !!a, answersRight: r ? Math.round(r.right) : null, h2s: heads };
  });
  console.log(name, JSON.stringify(info));
  await p.close();
}
await browser.close();
server.close();
console.log('done');
