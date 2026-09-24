// DIAGNOSTIC ONLY (not the official validation): re-runs every check from
// validateReport() in scripts/lib/review-evidence.mjs EXCEPT the input_manifest
// comparison, to confirm the drift is the sole reason the official validator
// rejects agent-g5-gnas301-u5-run001.json. The official rejection stands.
import { readFileSync } from 'node:fs';
import { inputManifest, skillDigest, CRITERIA, digest } from '../../../../../../../scripts/lib/review-evidence.mjs';
import { resolve } from 'node:path';

const root = process.cwd();
const report = JSON.parse(readFileSync('specs/content/gnas-301/reviews/unit-05/G5/agent-g5-gnas301-u5-run001.json', 'utf8'));
const results = [];
const check = (name, ok, detail = '') => results.push(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ' - ' + detail : ''}`);

check('schema_version/stage', report.schema_version === 1 && CRITERIA[report.stage]);
check('disposition', ['pass', 'revise', 'escalate'].includes(report.disposition));
check('required strings', ['reviewer_id', 'author_run_id', 'reviewer_run_id', 'model', 'started_at', 'completed_at'].every((k) => typeof report[k] === 'string' && report[k].trim()));
check('reviewer_id format', /^agent:[a-z0-9-]+$/.test(report.reviewer_id), report.reviewer_id);
check('identity distinct', report.author_run_id !== report.reviewer_run_id);
const started = Date.parse(report.started_at), completed = Date.parse(report.completed_at);
check('timestamps', Number.isFinite(started) && Number.isFinite(completed) && completed >= started && completed <= Date.now() + 300000);
check('skill_digest', report.skill_digest === skillDigest(root, report.stage));
const cur = inputManifest(root, report.course_code, report.unit_no, report.stage);
const bound = report.input_manifest;
const changed = Object.keys(cur).filter((k) => bound[k] && cur[k] !== bound[k]);
check('SKIPPED input_manifest (official validator fails here)', false, `official check fails: ${changed.length} drifted digests: ${changed.join(', ')}`);
check('criteria count', Array.isArray(report.criteria) && report.criteria.length === CRITERIA[report.stage].length);
const ids = report.criteria.map((c) => c.id);
check('criteria ids', new Set(ids).size === ids.length && CRITERIA[report.stage].every((id) => ids.includes(id)));
check('findings format', Array.isArray(report.findings) && report.findings.every((f) => ['blocking', 'uncertain', 'advisory'].includes(f.severity) && typeof f.message === 'string' && f.message.trim() && typeof f.resolved === 'boolean'));
check('criterion format', report.criteria.every((c) => ['pass', 'fail', 'unverified'].includes(c.status) && Array.isArray(c.evidence)));
check('pass criteria have evidence', report.criteria.every((c) => c.status !== 'pass' || (c.evidence.length > 0 && c.evidence.every((e) => typeof e === 'string' && e.trim()))));
check('evidence_manifest object', report.evidence_manifest && typeof report.evidence_manifest === 'object' && !Array.isArray(report.evidence_manifest));
const prefix = `specs/content/${report.course_code.toLowerCase()}/reviews/unit-${String(report.unit_no).padStart(2, '0')}/`;
let hashOk = true, hashDetail = '';
for (const [p, h] of Object.entries(report.evidence_manifest)) {
  if (!p.startsWith(prefix)) { hashOk = false; hashDetail = 'outside prefix: ' + p; break; }
  try {
    if (digest(readFileSync(resolve(root, p))) !== h) { hashOk = false; hashDetail = 'hash mismatch: ' + p; break; }
  } catch (e) { hashOk = false; hashDetail = 'unreadable: ' + p; break; }
}
check('evidence hashes', hashOk, hashDetail);
check('commands format', Array.isArray(report.commands) && report.commands.every((c) => typeof c.name === 'string' && Number.isInteger(c.exit_code) && typeof c.log_path === 'string'));
check('command logs in manifest', report.commands.every((c) => report.evidence_manifest[c.log_path]));
check('render PNGs in manifest', Object.keys(report.evidence_manifest).some((p) => /\.(png|webp|jpg)$/.test(p)));
check('g3_report present', typeof report.g3_report === 'string' && report.g3_report.length > 0);

console.log(results.join('\n'));
const fails = results.filter((r) => r.startsWith('FAIL') && !r.includes('SKIPPED'));
console.log(`\n${fails.length === 0 ? 'ALL OTHER CHECKS PASS - the input-manifest drift is the sole official-validation blocker' : fails.length + ' additional failures'}`);
