#!/usr/bin/env node
/**
 * G2 draft-stage gate evidence (Constitution Art. VII.7).
 *
 * G3 asks whether content is academically sound, which needs judgement. G2 asks
 * only whether a draft exists at standard, which is machine-checkable - so it is
 * answered by deterministic gate exit codes and needs no reviewer identity.
 *
 * Until now nothing in this repo ran the gates and recorded their logs: the
 * reviewer agent produced `reviews/*_/logs-*_/` by hand following
 * `.claude/skills/review-unit/SKILL.md`, and the tooling only validated what it
 * found. This writes that evidence directly.
 *
 * Conventions follow `scripts/review-evidence.mjs prepare`: refuse a dirty tree,
 * because a manifest describes a commit and one prepared over local edits
 * describes a state no other host can reproduce; and write with `wx` so evidence
 * is never silently overwritten.
 *
 *   node scripts/prepare-gate-evidence.mjs EFMP-302 2
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { DRAFT_COMMANDS } from './lib/review-criteria.mjs';
import { inputManifest, dirtyInputs, digest } from './lib/review-evidence.mjs';

const root = resolve(process.env.CONTENT_ROOT || '.');
const [course, unitArg] = process.argv.slice(2);

try {
  if (!course || !unitArg) throw new Error('usage: prepare-gate-evidence COURSE UNIT');
  const unit = Number(unitArg);
  if (!Number.isInteger(unit) || unit <= 0) throw new Error('UNIT must be a positive integer');

  // Bound with the G3 input set: G2 and G3 review the same English bytes, and a
  // separate G2 set would be free to drift from the one a review actually uses.
  const dirty = dirtyInputs(root, course, unit, 'G3');
  if (dirty.length) {
    throw new Error(`bound inputs are not committed; commit, stash or ignore them first:\n  ${dirty.join('\n  ')}`);
  }

  const head = execFileSync('git', ['-C', root, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
  const stamp = new Date().toISOString().replace(/[:.]/g, '').replace(/-/g, '');
  const folder = `unit-${String(unit).padStart(2, '0')}`;
  const rel = `specs/content/${course.toLowerCase()}/reviews/${folder}/G2`;
  const logDir = `${rel}/logs-${stamp}`;
  mkdirSync(join(root, logDir), { recursive: true });

  const commands = [];
  const evidence_manifest = {};
  let failed = 0;

  for (const name of DRAFT_COMMANDS) {
    const started = new Date().toISOString();
    const run = spawnSync('npm', ['run', '-s', name], { cwd: root, encoding: 'utf8' });
    const exit_code = run.status ?? 1;
    const body = `$ npm run ${name}   (repo HEAD ${head}, ${started})\n`
      + `${(run.stdout || '') + (run.stderr || '')}`.trimEnd()
      + `\nexit_code=${exit_code}\n`;
    const log_path = `${logDir}/${name.replace(/:/g, '-')}.txt`;
    writeFileSync(join(root, log_path), body);
    evidence_manifest[log_path] = digest(Buffer.from(body));
    commands.push({ name, exit_code, log_path });
    if (exit_code !== 0) failed += 1;
    console.log(`  ${exit_code === 0 ? 'PASS' : 'FAIL'}  ${name}`);
  }

  if (failed) {
    throw new Error(`${failed} gate(s) failed; logs are in ${logDir}. G2 evidence is only written for a clean run.`);
  }

  const out = `${rel}/${stamp}-gates.json`;
  const payload = {
    schema_version: 1,
    course_code: course,
    unit_no: unit,
    stage: 'G2',
    reviewed_commit: head,
    generated_at: new Date().toISOString(),
    input_manifest: inputManifest(root, course, unit, 'G3'),
    commands,
    evidence_manifest,
  };
  writeFileSync(join(root, out), `${JSON.stringify(payload, null, 2)}\n`, { flag: 'wx' });

  console.log(`\nG2 evidence written: ${out}`);
  console.log(`Tracker row: | Unit ${unit} | G2 en-draft | ✅ | auto:gates | gates:${out} |`);
} catch (error) {
  console.error(`Gate evidence not prepared: ${error.message}`);
  process.exitCode = 1;
}
