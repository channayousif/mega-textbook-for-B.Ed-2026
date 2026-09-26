// G5 feat023-r1: precise line-number locators for every systematic defect this
// review cites, so the report's findings name exact file:line locations.
import { readFileSync, writeFileSync } from 'node:fs';

const dir = 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-04';
const files = ['index.mdx', 'topic-01.mdx', 'topic-02.mdx', 'topic-03.mdx', 'topic-04.mdx', 'unit-assessment.mdx', 'unit-teacher-notes.mdx'];
const needles = {
  'U+FFFD': '�',
  'دہشت (stakes->terror)': 'دہشت',
  'تناوب (tension/conflict->alternation)': 'تناوب',
  'فرضی استاد/مشق (serving->hypothetical)': 'فرضی',
  'متبیل (متبادل typo)': 'متبیل',
  'مجموعی۔ (integrative->summative)': 'مجموعی۔',
  'استعلام (استعمال typo)': 'استعلام',
  'تالے (tallies->locks)': 'تالے',
  'خلاصی طور پر (in the abstract)': 'خلاصی طور پر',
  'گرما سکتا (گرا typo)': 'گرما سکتا',
  'سنتا ہے (لگتا typo)': 'سنتا ہے',
  'formally (embedded English)': 'formally',
  'چھیں چھیں (overlap calque)': 'چھیں چھیں',
  'پیچھا کر (follow->chase)': 'پیچھا کر',
  'بہ طور ڈیفالٹ': 'ڈیفالٹ',
  'حاصل ممکن': 'حاصل ممکن',
  'شہادت کے قابلِ تفصیل': 'قابلِ تفصیل',
  'ترقی اور ترقی (dev/promo conflation)': 'ترقی اور ترقی',
  'اشاریہ ڈھانچہ (incentive->indicator structure)': 'اشاریہ ڈھانچہ',
  'شاید کسی (rarely->perhaps)': 'شاید کسی',
  'آدھے میعاد (fortnight->half term)': 'آدھے میعاد',
  'لے کر نہیں آنا (garbled)': 'لے کر نہیں آنا',
};
const lines = [];
for (const [label, needle] of Object.entries(needles)) {
  lines.push(`### ${label}`);
  let total = 0;
  for (const f of files) {
    const text = readFileSync(`${dir}/${f}`, 'utf8');
    const rows = text.split('\n');
    rows.forEach((row, i) => {
      const n = row.split(needle).length - 1;
      if (n > 0) { total += n; lines.push(`  ${f}:${i + 1} (x${n})`); }
    });
  }
  if (total === 0) lines.push('  (none)');
  lines.push(`  TOTAL: ${total}`);
}
// clo_refs divergence
lines.push('### clo_refs (UR topic files vs EN SLO:EFMP-302-4-2)');
for (const f of ['topic-01.mdx', 'topic-02.mdx', 'topic-03.mdx', 'topic-04.mdx']) {
  const text = readFileSync(`${dir}/${f}`, 'utf8');
  const m = text.match(/SLO:EFMP-302-4-\d/);
  lines.push(`  ${f}: ${m ? m[0] : 'none'}`);
}
const out = lines.join('\n');
console.log(out);
writeFileSync('specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r1/defect-locators.log', out + '\n');
