import { chromium } from '@playwright/test';
const BASE='http://localhost:3103';
const OUT='/home/a2ahs/mega_book_for_B.Ed/specs/content/efmp-302/reviews/unit-03/render-run005';
const b=await chromium.launch();
// Desktop: element shots of two schematics, to read their instructional content
{
  const c=await b.newContext({viewport:{width:1280,height:900},deviceScaleFactor:2});
  const p=await c.newPage();
  await p.goto(BASE+'/semester-1/efmp-302/unit-03/topic-03/',{waitUntil:'networkidle'});
  const figs=p.locator('figure');
  await figs.nth(1).scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
  await figs.nth(1).screenshot({path:`${OUT}/fig-U3-6-flowchart-desktop.png`});
  await p.goto(BASE+'/semester-1/efmp-302/unit-03/topic-01/',{waitUntil:'networkidle'});
  const f2=p.locator('figure');
  await f2.nth(0).scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
  await f2.nth(0).screenshot({path:`${OUT}/fig-U3-1-table-desktop.png`});
  await c.close();
}
// Narrow 360: the figure scroll region as a learner sees it
{
  const c=await b.newContext({viewport:{width:360,height:740},deviceScaleFactor:2});
  const p=await c.newPage();
  await p.goto(BASE+'/semester-1/efmp-302/unit-03/topic-03/',{waitUntil:'networkidle'});
  const f=p.locator('figure').nth(1);
  await f.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
  await f.screenshot({path:`${OUT}/fig-U3-6-narrow-360-region.png`});
  await c.close();
}
// Print A4: the answers-and-marking-guidance region of the assessment
{
  const c=await b.newContext({viewport:{width:794,height:1123},deviceScaleFactor:2});
  const p=await c.newPage();
  await p.goto(BASE+'/semester-1/efmp-302/unit-03/unit-assessment/',{waitUntil:'networkidle'});
  await p.emulateMedia({media:'print'});
  await p.waitForTimeout(500);
  const h=p.locator('h2', {hasText:'Answers and marking guidance'});
  await h.scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
  const box=await h.boundingBox();
  await p.screenshot({path:`${OUT}/unit-assessment-print-answers-crop.png`, clip:{x:0,y:box.y,width:794,height:1100}});
  // last ERQ rubric table, to check it is not clipped on paper
  const t=p.locator('table').last();
  await t.scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
  await t.screenshot({path:`${OUT}/unit-assessment-print-last-rubric.png`});
  await c.close();
}
await b.close();
console.log('crops done');
