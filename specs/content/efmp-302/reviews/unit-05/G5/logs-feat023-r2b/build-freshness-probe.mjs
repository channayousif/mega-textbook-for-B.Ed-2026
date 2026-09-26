// build-freshness-probe.mjs - feat023-r2b. NOT a rebuild.
// Proves the shared two-locale build at build/ (mtime 2026-09-24T19:10, built immediately
// after repair commit 219960c at 19:09:46) serves Unit 5's CURRENT Urdu bytes:
// every one of the nine repaired passages must appear in the built Urdu HTML
// (whitespace-normalised matching, since the build preserves intra-paragraph newlines),
// plus a spread of unrepaired current-source probes, and all 16 Urdu figure assets
// under build/img/figures/efmp-302/unit-05/ must be byte-identical to static/ sources.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.env.CONTENT_ROOT || '.');
const out = [];
const say = (s) => out.push(s);
const norm = (s) => s.replace(/\s+/g, ' ').trim();

const pages = {
  'index': 'build/ur/semester-1/efmp-302/unit-05/index.html',
  'topic-01': 'build/ur/semester-1/efmp-302/unit-05/topic-01/index.html',
  'topic-02': 'build/ur/semester-1/efmp-302/unit-05/topic-02/index.html',
  'topic-03': 'build/ur/semester-1/efmp-302/unit-05/topic-03/index.html',
  'topic-04': 'build/ur/semester-1/efmp-302/unit-05/topic-04/index.html',
  'unit-assessment': 'build/ur/semester-1/efmp-302/unit-05/unit-assessment/index.html',
  'unit-teacher-notes': 'build/ur/semester-1/efmp-302/unit-05/unit-teacher-notes/index.html',
};
const html = {};
for (const [k, p] of Object.entries(pages)) html[k] = norm(readFileSync(join(root, p), 'utf8'));

say(`build-freshness-probe feat023-r2b ${new Date().toISOString()}`);
say('shared build at build/ (mtime 2026-09-24T19:10:44 -0500, commit 219960c 19:09:46 -0500); NOT a rebuild');

// The nine repaired passages (current source bytes) that must be present in the built pages.
const repairProbes = [
  ['repair-1 stance اختلاف', 'topic-02', 'جوابدہی کا دعویٰ مضبوط ہے اور یہ یونٹ اس سے اختلاف نہیں کرتا'],
  ['repair-2 not-nothing موجود بھی ہیں', 'topic-04', 'اس مطالعے والوں سے چھوٹے ہیں مگر موجود بھی ہیں'],
  ['repair-3 cost leg لاگت', 'topic-03', 'ان کی لاگت ان کے پاس ہونے والے صرف تیس منٹ ہیں'],
  ['repair-4 تضاد for tension', 'topic-02', 'جوابدہی اور ترقی کے درمیان تضاد کو جائزہ کے نظاموں کا مرکزی ڈیزائن مسئلہ پاتی ہیں'],
  ['repair-5 impose consequences', 'topic-02', 'ناپتے ہیں، موازنہ کرتے ہیں اور نتیجہ لاگو کرتے ہیں'],
  ['repair-6 RRQ1 pt4 commitment/duty', 'unit-assessment', 'بوجھ محنت اور خلوص کے ساتھ جُڑتا ہے، رسمی فرض کے ساتھ نہیں'],
  ['repair-9 ERQ1 rubric نہ ہٹنے والے', 'unit-assessment', 'ہٹانے والے اور نہ ہٹنے والے الگ'],
];
// repairs 7 and 8 live in the .ur.svg figure assets, checked byte-identically below.

// Spread of unrepaired current-source probes across all seven pages.
const freshnessProbes = [
  ['index current', 'index', 'کچھ شامل نہیں ہوا اور کچھ چھوڑا نہیں گیا'],
  ['topic-01 current', 'topic-01', 'کوئی متبادل انتظام نہیں ہے'],
  ['topic-02 current', 'topic-02', 'اخباری کالم اس پر کوئی دعویٰ ہی نہیں'],
  ['topic-03 current', 'topic-03', 'نتائج اب تک ملے جلے ہیں'],
  ['topic-04 current', 'topic-04', 'میری جماعت ناممکن ہے'],
  ['assessment current', 'unit-assessment', 'گروہی کام والی بات کی دو جائز قراءت الگ کرتا ہے'],
  ['notes current', 'unit-teacher-notes', 'صرف بے دلی کے نام لینے پر مضبوط بینڈ کا نمبر نہ دیجیے'],
];

let fail = 0;
for (const [name, page, needle] of [...repairProbes, ...freshnessProbes]) {
  const found = html[page].includes(norm(needle));
  if (!found) fail += 1;
  say(`  ${found ? 'FOUND' : 'MISSING'} ${name} in ${page}`);
}

// All 16 Urdu figure assets byte-identical between build/ and static/.
const figDir = 'static/img/figures/efmp-302/unit-05';
const files = readdirSync(join(root, figDir)).filter((f) => f.includes('.ur.'));
say(`urdu figure assets: ${files.length}`);
for (const f of files) {
  const a = createHash('sha256').update(readFileSync(join(root, figDir, f))).digest('hex');
  const b = createHash('sha256').update(readFileSync(join(root, 'build/img/figures/efmp-302/unit-05', f))).digest('hex');
  if (a !== b) { fail += 1; say(`  FIGURE-DIFF ${f}`); }
}
say(`figure assets byte-identical build==static: ${files.length - (fail > 0 ? 1 : 0) >= files.length ? 'all ' + files.length : 'see above'}`);

say(`VERDICT: ${fail === 0 ? 'shared build is fresh for Unit 5 Urdu (all probes found, all figure assets identical)' : fail + ' PROBE FAILURES - rebuild required'}`);
const text = out.join('\n') + '\n';
writeFileSync(join(root, 'specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r2b/site-build.log'), text);
console.log(text);
process.exit(fail === 0 ? 0 : 1);
