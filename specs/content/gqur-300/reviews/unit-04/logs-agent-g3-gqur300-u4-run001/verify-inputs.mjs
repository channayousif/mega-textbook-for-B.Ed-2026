#!/usr/bin/env node
// Independent G3 input verification for GQUR-300 Unit 4, run001.
// Recomputes the manifest with manifestFor() via inputManifest() and diffs it
// against the parent's prepared manifest, then records tree cleanliness.
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-affcb48d7818e8183';
const { inputManifest, dirtyInputs, skillDigest } = await import(
  resolve(root, 'scripts/lib/review-evidence.mjs')
);

const out = [];
const say = (line) => { out.push(line); console.log(line); };

say(`reviewer_run_id: agent-g3-gqur300-u4-run001`);
say(`started: ${new Date().toISOString()}`);
say(`root: ${root}`);
say(`HEAD: ${execFileSync('git', ['-C', root, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()}`);
say(`branch: ${execFileSync('git', ['-C', root, 'rev-parse', '--abbrev-ref', 'HEAD'], { encoding: 'utf8' }).trim()}`);

// 1. Recompute the G3 input manifest for this unit and stage.
const recomputed = inputManifest(root, 'GQUR-300', 4, 'G3');
say(`recomputed input count: ${Object.keys(recomputed).length}`);

// 2. Compare with the parent's prepared manifest.
const preparedPath = resolve(root, 'specs/content/gqur-300/reviews/unit-04/G3/manifest.json');
const prepared = JSON.parse(readFileSync(preparedPath, 'utf8'));
say(`prepared input count: ${Object.keys(prepared.input_manifest).length}`);
say(`prepared course/unit/stage: ${prepared.course_code} ${prepared.unit_no} ${prepared.stage}`);

const keys = new Set([...Object.keys(recomputed), ...Object.keys(prepared.input_manifest)]);
const missing = [], extra = [], mismatched = [];
for (const key of keys) {
  const a = prepared.input_manifest[key];
  const b = recomputed[key];
  if (a === undefined) extra.push(key);
  else if (b === undefined) missing.push(key);
  else if (a !== b) mismatched.push(`${key}: prepared=${a} recomputed=${b}`);
}
say(`missing from recomputation (prepared but not bound now): ${missing.length}`);
for (const k of missing) say(`  MISSING ${k}`);
say(`extra in recomputation (bound now but not prepared): ${extra.length}`);
for (const k of extra) say(`  EXTRA ${k}`);
say(`digest mismatches: ${mismatched.length}`);
for (const m of mismatched) say(`  MISMATCH ${m}`);

// 3. Skill digest.
const sd = skillDigest(root, 'G3');
say(`skill_digest recomputed: ${sd}`);
say(`skill_digest prepared:   ${prepared.skill_digest}`);
say(`skill_digest match: ${sd === prepared.skill_digest}`);

// 4. Dirty bound inputs right now.
const dirty = dirtyInputs(root, 'GQUR-300', 4, 'G3');
say(`dirty bound inputs now: ${dirty.length}`);
for (const d of dirty) say(`  DIRTY ${d}`);

// 5. Authoring commits for the unit's own bytes.
for (const path of [
  'docs/semester-1/gqur-300/unit-04/index.mdx',
  'docs/semester-1/gqur-300/unit-04/topic-01.mdx',
  'docs/semester-1/gqur-300/unit-04/topic-02.mdx',
  'docs/semester-1/gqur-300/unit-04/topic-03.mdx',
  'docs/semester-1/gqur-300/unit-04/unit-assessment.mdx',
  'docs/semester-1/gqur-300/unit-04/unit-teacher-notes.mdx',
  'static/img/figures/gqur-300/unit-04/fig-U4-6.svg',
]) {
  const log = execFileSync('git', ['-C', root, 'log', '-1', '--format=%h %s', '--', path], { encoding: 'utf8' }).trim();
  say(`last-commit ${path}: ${log}`);
}

const ok = missing.length === 0 && extra.length === 0 && mismatched.length === 0 && sd === prepared.skill_digest;
say(`MANIFEST VERIFICATION: ${ok ? 'MATCH' : 'MISMATCH'}`);
say(`completed: ${new Date().toISOString()}`);
writeFileSync(resolve(root, 'specs/content/gqur-300/reviews/unit-04/logs-agent-g3-gqur300-u4-run001/input-binding-verification.txt'), out.join('\n') + '\n');
process.exitCode = ok ? 0 : 1;
