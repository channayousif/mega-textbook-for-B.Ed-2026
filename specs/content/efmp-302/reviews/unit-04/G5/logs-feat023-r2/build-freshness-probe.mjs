// G5 feat023-r2 site-build freshness evidence. No rebuild is run: the shared
// two-locale build at build/ was produced at commit a483c9e immediately before
// this review. This probe verifies the built Urdu pages contain the current
// (repaired) source bytes: every repaired string must appear, every
// cycle-1 defect string must be gone, and the known residual defects must
// appear (proving the build serves the current bytes, not stale ones). Also
// verifies all 16 Urdu figure variants are served.
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { execSync } from 'node:child_process';

const root = new URL('../../../../../../../', import.meta.url).pathname;
const urBase = `${root}build/ur/`;

const lines = [];
const log = (s) => { lines.push(s); console.log(s); };

log(`build/ mtime: ${statSync(`${root}build`).mtime.toISOString()}`);
log(`build/ur mtime: ${statSync(`${root}build/ur`).mtime.toISOString()}`);
log(`HEAD at review: ${execSync('git log -1 --format=%h', { cwd: root }).toString().trim()} (repair commit a483c9e)`);
log('');

const page = (name) => readFileSync(
  name === 'index'
    ? `${urBase}semester-1/efmp-302/unit-04/index.html`
    : `${urBase}semester-1/efmp-302/unit-04/${name}/index.html`,
  'utf8',
);
const count = (html, needle) => html.split(needle).length - 1;
// Built HTML preserves MDX line breaks as literal newlines inside text nodes;
// normalise whitespace so multi-word needles match across source line wraps.
const norm = (s) => s.replace(/\s+/g, ' ');
const countNorm = (html, needle) => count(norm(html), norm(needle));

// Repaired strings that MUST be in the built pages (cycle-1 fixes).
const mustHave = [
  ['index', '4.2 کے بغیر 4.3', 'repair 2: dependency un-inverted'],
  ['topic-01', 'داؤ', 'repair 4: stakes as داؤ'],
  ['topic-01', 'زیرِ خدمت استاد', 'repair 6: serving teacher'],
  ['topic-01', 'تضاد', 'repair 5: tension as تضاد'],
  ['topic-01', 'زیرِ بحث استعمال کا نام', 'repair 13c: استعمال not استعلام'],
  ['topic-03', 'اعلیٰ داؤ والے', 'repair 4: high-stakes'],
  ['topic-03', 'شمارشے', 'repair 13a: tallies not locks'],
  ['topic-03', 'مشق کے بجائے ریکارڈ', 'repair 3: record instead of practice'],
  ['topic-03', 'جس کے خلاف ڈیزائن کرنا پڑتا ہے', 'repair 12: risk to design against'],
  ['topic-04', 'چاہتا ہے', 'repair 1: U+FFFD gone, چاہتا restored'],
  ['topic-04', 'شاذ و نادر', 'repair 10: rarely'],
  ['topic-04', 'ترغیبی ڈھانچہ', 'repair 8: incentive structure'],
  ['topic-04', 'گرا سکتا', 'repair 13e: collapse'],
  ['topic-04', 'لگتی ہے', 'repair 13f: sounds unanswerable'],
  ['unit-assessment', 'یکجائتی', 'repair 7: ERQ-2 label'],
  ['unit-assessment', 'متبادل', 'repair 13d: متبادل not متبیل'],
  ['unit-assessment', 'حقیقی تضاد', 'repair 5: tension in RRQ-3 scheme'],
  ['unit-teacher-notes', 'مشق کے بجائے ریکارڈ', 'repair 3: debrief question'],
  ['unit-teacher-notes', 'جلدی کرنے پر باقی نہیں رہتا', 'repair 3: rushed negation'],
];

// Cycle-1 defect strings that MUST NOT be in the built pages.
const mustNotHave = [
  ['topic-01', 'دہشت'],
  ['topic-01', 'تناوب'],
  ['topic-01', 'فرضی استاد'],
  ['topic-01', 'استعلام'],
  ['topic-03', 'تالے'],
  ['topic-03', 'اعلیٰ دہشت'],
  ['topic-04', 'اشاریہ ڈھانچہ'],
  ['topic-04', 'گرما سکتا'],
  ['topic-04', 'متبیل'],
  ['topic-04', 'سنتا ہے'],
  ['unit-assessment', 'متبیل'],
  ['index', '4.3 کے بغیر 4.2'],
];

// Known residuals (verified in source): must appear, proving the build is current.
const residuals = [
  ['unit-teacher-notes', 'ERQ 2 مجموعی سوال', 'residual: repair 7 incomplete at :105'],
  ['unit-assessment', 'مجموعی نقشہ', 'residual: repair 7 incomplete at ERQ-2 rubric title :263'],
  ['unit-assessment', 'خلاصی', 'residual: wrong word for Abstract at :261'],
  ['topic-03', 'ثبٹ', 'residual: misspelling of ثبوت at :99/:154'],
];

let fail = 0;
log('--- repaired strings present in built pages ---');
for (const [f, needle, why] of mustHave) {
  const n = countNorm(page(f), needle);
  const ok = n > 0;
  if (!ok) fail += 1;
  log(`${ok ? 'OK ' : 'FAIL'} ${f}: "${needle}" -> ${n} (${why})`);
}
log('');
log('--- cycle-1 defect strings absent from built pages ---');
for (const [f, needle] of mustNotHave) {
  const n = countNorm(page(f), needle);
  const ok = n === 0;
  if (!ok) fail += 1;
  log(`${ok ? 'OK ' : 'FAIL'} ${f}: "${needle}" -> ${n} (expected 0)`);
}
log('');
log('--- residual defects present (build serves current bytes) ---');
for (const [f, needle, why] of residuals) {
  const n = countNorm(page(f), needle);
  const ok = n > 0;
  if (!ok) fail += 1;
  log(`${ok ? 'OK ' : 'FAIL'} ${f}: "${needle}" -> ${n} (${why})`);
}
log('');
log('--- frontmatter-only repairs and residuals (blooms_summary does not render; verified from source) ---');
const srcOf = (f) => readFileSync(`${root}i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-04/${f}.mdx`, 'utf8');
const fmChecks = [
  ['topic-04', 'جس شخص کا جائزہ لیا جاتا ہے اس میں', 'repair 11 in blooms_summary (frontmatter)'],
  ['unit-assessment', 'ایک مجموعی سوال', 'residual: repair 7 incomplete in blooms_summary (frontmatter)'],
];
for (const [f, needle, why] of fmChecks) {
  const n = count(srcOf(f), needle);
  const ok = n > 0;
  if (!ok) fail += 1;
  log(`${ok ? 'OK ' : 'FAIL'} ${f}.mdx source: "${needle}" -> ${n} (${why}; not rendered in page body)`);
}
log('');
log('--- U+FFFD count: source vs built ---');
const src = readFileSync(`${root}i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-04/topic-04.mdx`, 'utf8');
const built = page('topic-04');
const ufffd = String.fromCharCode(0xfffd);
log(`source topic-04.mdx = ${count(src, ufffd)}, built topic-04 page = ${count(built, ufffd)} (both must be 0)`);
if (count(src, ufffd) !== 0 || count(built, ufffd) !== 0) fail += 1;
log('');
log('--- Urdu figure variants served from build ---');
for (let i = 1; i <= 8; i += 1) {
  for (const v of [`fig-U4-${i}.ur.svg`, `fig-U4-${i}.ur.dark.svg`]) {
    const p = `${root}build/img/figures/efmp-302/unit-04/${v}`;
    const ok = existsSync(p);
    if (!ok) fail += 1;
    log(`build serves ${v}: ${ok}`);
  }
}
log('');
log(`BUILD FRESHNESS PROBE: ${fail === 0 ? 'OK - shared build serves the current (a483c9e) Urdu bytes for Unit 4' : `${fail} FAILURES`}`);

writeFileSync(new URL('site-build.log', import.meta.url).pathname, lines.join('\n') + '\n');
process.exit(fail === 0 ? 0 : 1);
