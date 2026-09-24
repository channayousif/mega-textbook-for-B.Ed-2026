// G5 feat023-r1 targeted render inspection (evidence artifact).
// Close-up screenshots of the specific regions the G5 rubric names: Nastaliq
// legibility, bidi punctuation around embedded Latin citations, RTL table
// order at 360px, MCQ option markers, and the print view.
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';

const out = 'specs/content/efmp-302/reviews/unit-03/G5/renders-feat023-r1';
const base = 'http://127.0.0.1:4623';

const server = spawn('npm', ['run', 'serve', '--', '--port', '4623'], { stdio: 'ignore', detached: true });
await new Promise((r) => setTimeout(r, 4000));

const browser = await chromium.launch();

// Desktop close-ups (1280x900, clip regions scaled 2x for legibility).
const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
const shots = [
  // bidi: Urdu comma between Latin author names + parenthesised year (topic-01)
  ['ur/semester-1/efmp-302/unit-03/topic-01', 'p-urdu-close-topic01-goe', 'Bell اور Little'],
  // embedded Latin citation inside Urdu sentence (topic-04, Furlich scope paragraph)
  ['ur/semester-1/efmp-302/unit-03/topic-04', 'p-urdu-close-topic04-scope', 'شہادت کو اس کے دائرے'],
  // embedded Latin word mid-sentence (topic-04 heuristic paragraph, "conclusion")
  ['ur/semester-1/efmp-302/unit-03/topic-04', 'p-urdu-close-topic04-conclusion', 'conclusion'],
  // MCQ options with Arabic-letter markers (assessment)
  ['ur/semester-1/efmp-302/unit-03/unit-assessment', 'p-urdu-close-mcq8', 'پیشہ ور کا قیاس جو 93'],
];
for (const [route, name, needle] of shots) {
  await desktop.goto(`${base}/${route}`, { waitUntil: 'networkidle' });
  const el = desktop.locator(`text=${needle}`).first();
  await el.scrollIntoViewIfNeeded();
  const box = await el.boundingBox();
  if (box) {
    await desktop.screenshot({
      path: `${out}/${name}.png`,
      clip: { x: 0, y: Math.max(0, box.y - 120), width: 1280, height: Math.min(900, box.height + 260) },
    });
    console.log(`saved ${name}.png (needle at y=${Math.round(box.y)})`);
  } else {
    console.log(`NEEDLE NOT FOUND for ${name}: ${needle}`);
  }
}

// Narrow 360x780 close-ups: RTL table order in the ERQ rubric, MCQ list.
const narrow = await browser.newPage({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 3 });
const nshots = [
  ['ur/semester-1/efmp-302/unit-03/unit-assessment', 'p-narrow360-erq1-rubric-table', 'اجزاء کا استعمال'],
  ['ur/semester-1/efmp-302/unit-03/unit-assessment', 'p-narrow360-mcq1-options', 'حاصلات میں اضافے پر بہترین'],
];
for (const [route, name, needle] of nshots) {
  await narrow.goto(`${base}/${route}`, { waitUntil: 'networkidle' });
  const el = narrow.locator(`text=${needle}`).first();
  await el.scrollIntoViewIfNeeded();
  const box = await el.boundingBox();
  if (box) {
    await narrow.screenshot({
      path: `${out}/${name}.png`,
      clip: { x: 0, y: Math.max(0, box.y - 150), width: 360, height: 780 },
    });
    console.log(`saved ${name}.png`);
  } else {
    console.log(`NEEDLE NOT FOUND for ${name}: ${needle}`);
  }
}

// Print media close-up: the answers section of the assessment at A4 width.
const print = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
await print.goto(`${base}/ur/semester-1/efmp-302/unit-03/unit-assessment`, { waitUntil: 'networkidle' });
await print.emulateMedia({ media: 'print' });
const el = print.locator('text=MCQ جوابی کلید').first();
await el.scrollIntoViewIfNeeded();
const box = await el.boundingBox();
if (box) {
  await print.screenshot({ path: `${out}/p-print-a4-mcq-key.png`, clip: { x: 0, y: Math.max(0, box.y - 60), width: 794, height: 1000 } });
  console.log('saved p-print-a4-mcq-key.png');
}

await browser.close();
process.kill(-server.pid, 'SIGTERM');
console.log('done');
