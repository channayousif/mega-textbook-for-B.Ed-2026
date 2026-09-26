#!/usr/bin/env node
// G5 feat023-r1 site-build freshness probe: confirm the shared build at build/
// (built at commit a483c9e immediately before this review launched) serves Unit
// 5's CURRENT Urdu bytes, so render inspection inspects the reviewed inputs.
// Probes the built HTML for strings that exist only in the current source,
// including strings at this review's defect locators (they must be present in
// the build, proving the build is neither older nor newer than the reviewed
// source). Also verifies the build serves the .ur.svg and .ur.dark.svg assets.
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { execSync } from 'node:child_process';

const base = 'build/ur/semester-1/efmp-302/unit-05';
const src = 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-05';
const lines = [];
const log = (s) => { lines.push(s); console.log(s); };

log(`build/ mtime: ${statSync('build').mtime.toISOString()}`);
log(`HEAD at review: ${execSync('git log -1 --format=%h').toString().trim()}`);

const probes = {
  'index.html': ['تدریسی پیشے کے مسائل اور چیلنج', '262 نارویجن استادوں کی دریافت', 'کچھ شامل نہیں ہوا اور کچھ چھوڑا نہیں گیا'],
  'topic-01/index.html': ['محترمہ شہناز', 'تینتالیس کاپیاں', 'انسانی خدمت والے پیشوں', 'صفروں'],
  'topic-02/index.html': ['جناب رفیق', 'اس سے اتفاق نہیں کرتا', 'تناوب', 'کم تنخواہ اور کم اعتماد'],
  'topic-03/index.html': ['محترمہ سندس', 'چالیس ٹیبلٹ', 'ملے جلے', 'ان کا مطلب ان کے پاس ہونے والے صرف تیس منٹ'],
  'topic-04/index.html': ['جناب بلال', 'باسٹھ', 'اور کچھ بھی نہیں ہیں', 'منتقل کرنے کا طریقہ'],
  'unit-assessment/index.html': ['ایک حلقے کے بارے میں سچ فیصلے', 'ہٹانے اور fixed الگ', 'اکاون شاگردوں'],
  'unit-teacher-notes/index.html': ['پری سروس بیچ', 'ہر تھکن کا ماخذ کہاں چلا', 'اور اختتام'],
};

let allPresent = true;
// The built HTML preserves the source's intra-paragraph newlines, so probe strings
// are matched against whitespace-normalised text (runs of whitespace -> one space).
const norm = (s) => s.replace(/\s+/g, ' ');
for (const [page, strings] of Object.entries(probes)) {
  const h = norm(readFileSync(`${base}/${page}`, 'utf8'));
  for (const s of strings) {
    const n = h.split(norm(s)).length - 1;
    log(`${page}: ${JSON.stringify(s)} -> ${n}`);
    if (n === 0) allPresent = false;
  }
}

// The Urdu figure variants must be served by the build, byte-identical to source.
import { createHash } from 'node:crypto';
for (const i of [1, 2, 3, 4, 5, 6, 7, 8]) {
  for (const suffix of ['.ur.svg', '.ur.dark.svg']) {
    const name = `fig-U5-${i}${suffix}`;
    let ok = false, same = false;
    try {
      const b = readFileSync(`build/img/figures/efmp-302/unit-05/${name}`);
      const s = readFileSync(`static/img/figures/efmp-302/unit-05/${name}`);
      ok = b.length > 0;
      same = createHash('sha256').update(b).digest('hex') === createHash('sha256').update(s).digest('hex');
    } catch { /* missing */ }
    log(`build serves ${name}: ${ok} (byte-identical to source: ${same})`);
    if (!ok || !same) allPresent = false;
  }
}

log(`FRESHNESS: ${allPresent ? 'OK - every current-source probe found in the built Urdu pages and all 16 Urdu figure assets byte-identical' : 'STALE - some probes missing'}`);
writeFileSync('specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r1/site-build.log', lines.join('\n') + '\n');
process.exit(allPresent ? 0 : 1);
