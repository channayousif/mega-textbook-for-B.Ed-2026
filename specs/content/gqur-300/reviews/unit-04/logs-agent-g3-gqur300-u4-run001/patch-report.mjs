// Append the worktree-concurrency advisory finding to this run's report.
import { readFileSync, writeFileSync } from 'node:fs';

const p = 'specs/content/gqur-300/reviews/unit-04/G3/agent-g3-gqur300-u4-run001.json';
const r = JSON.parse(readFileSync(p, 'utf8'));
r.findings.push({
  severity: 'advisory',
  resolved: false,
  message: "Worktree concurrency note: during this review (2026-09-24T00:31-00:45Z), a concurrent session authored untracked Urdu mirror files for GQUR-300 unit-02 under i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-02/ in this shared worktree. Those paths are outside this review's bound input set (i18n/ is not a G3 manifest root), no tracked file was modified, and the report was re-validated after the files appeared (exit 0). Recorded so the parent knows the worktree was not exclusive to the reviewer; if a later session modifies a bound shared input (style guide, constitution, contracts, validator scripts, course guides), this report's manifest goes stale by design.",
});
r.summary += " Transparency note: a concurrent session authored untracked unit-02 Urdu files in this shared worktree during the review; those paths are outside the G3 bound set, no tracked file changed, and the report re-validated after they appeared.";
writeFileSync(p, JSON.stringify(r, null, 2) + '\n');
console.log('findings now:', r.findings.length);
