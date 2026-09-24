// G5 feat023-r2 G3 dependency check: verify that every English-side input bound to
// this G5 review is byte-identical to the binding of the advisory G3 cycle-2 pass
// (G3/agent-g3-efmp302-u3-feat023-r2.json), per the G-2026-65 course-wide pattern.
import { readFileSync, writeFileSync } from 'node:fs';

const g5 = JSON.parse(readFileSync('specs/content/efmp-302/reviews/unit-03/G5/feat023-r2/manifest.json', 'utf8'));
const g3 = JSON.parse(readFileSync('specs/content/efmp-302/reviews/unit-03/G3/agent-g3-efmp302-u3-feat023-r2.json', 'utf8'));

const g5m = g5.input_manifest;
const g3m = g3.input_manifest;

const shared = Object.keys(g5m).filter((p) => p in g3m);
const g5Only = Object.keys(g5m).filter((p) => !(p in g3m));
const g3Only = Object.keys(g3m).filter((p) => !(p in g5m));
const mismatched = shared.filter((p) => g5m[p] !== g3m[p]);

// English-side subset of the shared set: EN unit docs, EN figures, course overview.
const enSide = shared.filter((p) => p.startsWith('docs/') || p.startsWith('static/img/figures/') || p === 'catalog/courses.json');
const enMismatched = enSide.filter((p) => g5m[p] !== g3m[p]);

const lines = [];
lines.push(`g3-dependency-check (feat023-r2) ${new Date().toISOString()}`);
lines.push(`g5 manifest: specs/content/efmp-302/reviews/unit-03/G5/feat023-r2/manifest.json (${Object.keys(g5m).length} paths)`);
lines.push(`g3 report: specs/content/efmp-302/reviews/unit-03/G3/agent-g3-efmp302-u3-feat023-r2.json`);
lines.push(`g3 disposition: ${g3.disposition} (${g3.criteria.map((c) => c.id + ':' + c.status).join(', ')})`);
lines.push(`g3 reviewer_run_id: ${g3.reviewer_run_id}, author_run_id: ${g3.author_run_id}, completed_at: ${g3.completed_at}`);
lines.push(`shared paths: ${shared.length}`);
lines.push(`G5-only paths (Urdu mirror + G5-only validators): ${g5Only.length}`);
for (const p of g5Only) lines.push(`  G5-only: ${p}`);
lines.push(`G3-only paths: ${g3Only.length}`);
for (const p of g3Only) lines.push(`  G3-only: ${p}`);
lines.push(`shared digest mismatches: ${mismatched.length}`);
for (const p of mismatched) {
  lines.push(`  MISMATCH ${p}`);
  lines.push(`    g5: ${g5m[p]}`);
  lines.push(`    g3: ${g3m[p]}`);
}
lines.push(`English-side shared subset (docs/, static/img/figures/, catalog): ${enSide.length} paths, mismatches: ${enMismatched.length}`);
const ok = mismatched.length === 0;
lines.push(`RESULT: ${ok ? 'EVERY SHARED INPUT (INCLUDING ALL ENGLISH-SIDE INPUTS) IS BYTE-IDENTICAL BETWEEN THE G5 feat023-r2 BINDING AND THE ADVISORY G3 r2 PASS' : 'ENGLISH DEPENDENCY NOT SATISFIED BY DIGEST'}`);
const text = lines.join('\n') + '\n';
writeFileSync('specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r2/g3-dependency-check.log', text);
console.log(text);
process.exit(ok ? 0 : 1);
