import { chromium } from 'playwright';
const OUT = process.argv[2];
const b = await chromium.launch();
for (const [name, path, vw, vh] of [['figabsence-topic01-desktop','/topic-01',1280,900],['figabsence-topic01-narrow','/topic-01',360,740],['figabsence-topic04-desktop','/topic-04',1280,900]]) {
  const ctx = await b.newContext({ viewport: { width: vw, height: vh } });
  const p = await ctx.newPage();
  await p.goto('http://localhost:3105/semester-1/efmp-302/unit-05' + path, { waitUntil: 'networkidle' });
  await p.evaluate(() => { const h=[...document.querySelectorAll('h2')].find(x=>/A real classroom situation/i.test(x.textContent)); if(h) h.scrollIntoView({block:'start'}); });
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${OUT}/${name}.png` });
  const counts = await p.evaluate(() => ({ imgs: document.querySelectorAll('main img').length, figures: document.querySelectorAll('main figure').length, figureAboveRefs: (document.querySelector('main').innerText.match(/figure above/gi)||[]).length }));
  console.log(name, JSON.stringify(counts));
  await ctx.close();
}
await b.close();
