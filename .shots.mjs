import { chromium } from 'playwright';
const b = await chromium.launch();
for (const [name, path, w] of [['ill-unit-en','/semester-1/efmp-302/unit-01/',1280],['ill-topic-en','/semester-1/efmp-302/unit-01/topic-01/',1280],['ill-topic-ur','/ur/semester-1/efmp-302/unit-01/topic-02/',1280],['ill-topic-mobile','/semester-1/efmp-302/unit-01/topic-04/',400]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await p.goto('http://localhost:3056' + path, { waitUntil: 'networkidle' });
  const f = p.locator('figure.figure--illustration, .figure--illustration').first();
  if (await f.count()) { await f.scrollIntoViewIfNeeded(); await p.waitForTimeout(800); }
  await p.screenshot({ path: '/tmp/claude-1005/-home-a2ahs-mega-book-for-B-Ed/70684f54-2961-49d7-9cb9-25c258345c9b/scratchpad/' + name + '.png' });
}
await b.close();
