// G5 feat023-r1 G3-dependency evidence artifact.
// Compares the English-side digests bound by this G5 manifest with those bound by
// the latest advisory G3 report (feat023-r2), establishing whether the English
// comparison base is byte-identical to the state the G3 pass reviewed.
import { readFileSync } from 'node:fs';

const g5 = JSON.parse(readFileSync('specs/content/efmp-302/reviews/unit-03/G5/feat023-r1/manifest.json', 'utf8'));
const g3 = JSON.parse(readFileSync('specs/content/efmp-302/reviews/unit-03/G3/agent-g3-efmp302-u3-feat023-r2.json', 'utf8'));

const g5m = g5.input_manifest;
const g3m = g3.input_manifest;
const englishSide = (p) =>
  p.startsWith('docs/semester-1/efmp-302/unit-03/')
  || (p.startsWith('static/img/figures/efmp-302/unit-03/') && !/\.ur(\.dark)?\.svg$/.test(p))
  || p === 'docs/semester-1/efmp-302/course-overview.mdx';

const checked = [];
const diverged = [];
const onlyG5 = [];
for (const p of Object.keys(g5m)) {
  if (!englishSide(p)) continue;
  checked.push(p);
  if (!(p in g3m)) { onlyG5.push(p); continue; }
  if (g5m[p] !== g3m[p]) diverged.push(p);
}
console.log(`G3 report: ${g3.reviewer_run_id}, disposition ${g3.disposition}, author_run_id ${g3.author_run_id}, completed ${g3.completed_at}`);
console.log(`English-side paths compared (G5 manifest vs G3 r2 manifest): ${checked.length}`);
console.log(`diverged: ${diverged.length}${diverged.length ? ' -> ' + diverged.join(', ') : ''}`);
console.log(`bound by G5 but not by G3 r2: ${onlyG5.length}${onlyG5.length ? ' -> ' + onlyG5.join(', ') : ''}`);
const urduSide = Object.keys(g5m).filter((p) => p.startsWith('i18n/ur/'));
console.log(`Urdu-side paths bound by G5 (not expected in a G3 manifest): ${urduSide.length}`);
console.log(diverged.length === 0 && onlyG5.length === 0
  ? 'ENGLISH-BASE-IDENTICAL-TO-G3-R2-PASS'
  : 'ENGLISH-BASE-DIVERGED-FROM-G3-R2-PASS');
