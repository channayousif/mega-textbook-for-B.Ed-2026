// G5 feat023-r1 site-build freshness probe: confirm the shared build at build/
// (built 2026-09-24 16:39, before this review launched) serves Unit 4's CURRENT
// Urdu bytes, so render inspection inspects the reviewed inputs. Probes the built
// HTML for strings that exist only in the current source, including the defects
// this review found (they must be present in the build, proving the build is not
// older or newer than the reviewed source).
import { readFileSync, writeFileSync, statSync } from 'node:fs';

const base = 'build/ur/semester-1/efmp-302/unit-04';
const src = 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-04';
const lines = [];
const log = (s) => { lines.push(s); console.log(s); };

log(`build/ mtime: ${statSync('build').mtime.toISOString()}`);
log(`build/ur mtime: ${statSync('build/ur').mtime.toISOString()}`);
log(`HEAD at review: c138103 (git log -1 --format=%h)`);

const probes = {
  'index.html': ['ترتیب سے پڑھیے', 'بنیادی دستاویز پر ایک بات', '4.3 کے بغیر 4.2'],
  'topic-01/index.html': ['دہشت', 'فرضی استاد', 'formally', 'تناوب'],
  'topic-02/index.html': ['دس ہیں', 'اقسام کا ملاپ', 'پیچھا کر سکے'],
  'topic-03/index.html': ['تالے', 'خلاصی طور پر', 'چالیس منٹ', 'اعلیٰ دہشت'],
  'topic-04/index.html': ['اشاریہ ڈھانچہ', 'گرما سکتا', 'متبیل'],
  'unit-assessment/index.html': ['متبیل', 'مجموعی۔', 'وزارتِ تعلیم، 2009'],
  'unit-teacher-notes/index.html': ['چھیں چھیں', 'نتیجہ گھڑنے', 'لے کر نہیں آنا', 'کمرے میں ملنے والا جواب'],
};

let allPresent = true;
for (const [page, strings] of Object.entries(probes)) {
  const h = readFileSync(`${base}/${page}`, 'utf8');
  for (const s of strings) {
    const n = h.split(s).length - 1;
    log(`${page}: ${JSON.stringify(s)} -> ${n}`);
    if (n === 0) allPresent = false;
  }
}

// The corrupted byte must be in BOTH source and build exactly once (proves the
// build is neither older nor newer than the reviewed bytes).
const srcT4 = readFileSync(`${src}/topic-04.mdx`, 'utf8');
const bldT4 = readFileSync(`${base}/topic-04/index.html`, 'utf8');
log(`U+FFFD count: source topic-04.mdx = ${srcT4.split('�').length - 1}, built topic-04/index.html = ${bldT4.split('�').length - 1}`);

// The Urdu figure variants must be served by the build.
for (const i of [1, 2, 3, 4, 5, 6, 7, 8]) {
  const p = `build/img/figures/efmp-302/unit-04/fig-U4-${i}.ur.svg`;
  let ok = false;
  try { ok = readFileSync(p, 'utf8').length > 0; } catch { ok = false; }
  log(`build serves fig-U4-${i}.ur.svg: ${ok}`);
  const pd = `build/img/figures/efmp-302/unit-04/fig-U4-${i}.ur.dark.svg`;
  let okd = false;
  try { okd = readFileSync(pd, 'utf8').length > 0; } catch { okd = false; }
  log(`build serves fig-U4-${i}.ur.dark.svg: ${okd}`);
}

log(`FRESHNESS: ${allPresent ? 'OK - every current-source probe found in the built Urdu pages' : 'STALE - some probes missing'}`);
writeFileSync('specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r1/site-build.log', lines.join('\n') + '\n');
process.exit(allPresent ? 0 : 1);
