// Fill the report's placeholders with real values: completion timestamp, the
// prepared manifest's input_manifest (verified identical to the recomputed one),
// and the SHA-256 evidence manifest over the exact saved bytes.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const REPORT = 'specs/content/gqur-300/reviews/unit-02/G3/agent-g3-gqur300-u2-run001.json';
const LOGS = 'specs/content/gqur-300/reviews/unit-02/logs-agent-g3-gqur300-u2-run001';
const RENDERS = 'specs/content/gqur-300/reviews/unit-02/renders-agent-g3-gqur300-u2-run001';
const SOURCES = 'specs/content/gqur-300/reviews/unit-02/sources-agent-g3-gqur300-u2-run001';

const digest = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

const evidence = {};
const addDir = (dir, filter) => {
  for (const name of readdirSync(dir).sort()) {
    if (!filter.test(name)) continue;
    evidence[`${dir}/${name}`] = digest(`${dir}/${name}`);
  }
};
// command logs (txt only; the .mjs helpers are measurement tools, kept on disk, not cited evidence)
addDir(LOGS, /\.txt$/);
// renders: everything
addDir(RENDERS, /./);
// source retrieval artifacts: everything
addDir(SOURCES, /./);

const prepared = JSON.parse(readFileSync('specs/content/gqur-300/reviews/unit-02/G3/manifest.json', 'utf8'));
const report = JSON.parse(readFileSync(REPORT, 'utf8'));

if (report.completed_at !== 'PLACEHOLDER_COMPLETED_AT') throw new Error('completed_at already filled');
if (typeof report.input_manifest !== 'string') throw new Error('input_manifest already filled');
if (typeof report.evidence_manifest !== 'string') throw new Error('evidence_manifest already filled');

report.completed_at = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
report.input_manifest = prepared.input_manifest;
report.evidence_manifest = evidence;

writeFileSync(REPORT, JSON.stringify(report, null, 2) + '\n');
console.log('report finalized:', REPORT);
console.log('evidence files:', Object.keys(evidence).length);
console.log('completed_at:', report.completed_at);
