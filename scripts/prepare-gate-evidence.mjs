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
 *   node scripts/prepare-gate-evidence.mjs --refresh-stale
 *
 * `--refresh-stale` re-evidences every unit whose current G2 tracker row points at
 * gate evidence that is now stale (its input manifest no longer matches), and
 * repoints that row at the new file. It exists for binding changes: editing
 * `scripts/lib/review-evidence.mjs` changes every manifest at once, because that
 * file is inside the hashed review-script closure. The draft gates take no unit
 * argument (each scans the whole corpus), so their output at one HEAD is the same
 * for every unit: they run once, and each unit gets its own copy of the real logs.
 * Only a stale manifest is refreshed; evidence that fails for any other reason is
 * reported and left alone, since re-running gates cannot repair it.
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { DRAFT_COMMANDS } from './lib/review-criteria.mjs';
import { inputManifest, dirtyInputs, digest, acceptGateEvidence } from './lib/review-evidence.mjs';
import { walkUnits } from './lib/content-roots.mjs';
import { loadTracker, latestRow } from './lib/tracker-rows.mjs';

const root = resolve(process.env.CONTENT_ROOT || '.');
const args = process.argv.slice(2);
const pad = (n) => String(n).padStart(2, '0');

/** Refuse a unit whose bound inputs are not committed (see header). */
function requireClean(course, unit) {
  // Bound with the G3 input set: G2 and G3 review the same English bytes, and a
  // separate G2 set would be free to drift from the one a review actually uses.
  const dirty = dirtyInputs(root, course, unit, 'G3');
  if (dirty.length) {
    throw new Error(`${course} Unit ${unit}: bound inputs are not committed; commit, stash or ignore them first:\n  ${dirty.join('\n  ')}`);
  }
}

/** Run every draft gate once at HEAD. */
function runGates() {
  const head = execFileSync('git', ['-C', root, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
  const results = DRAFT_COMMANDS.map((name) => {
    const started = new Date().toISOString();
    const run = spawnSync('npm', ['run', '-s', name], { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    const exit_code = run.status ?? 1;
    const body = `$ npm run ${name}   (repo HEAD ${head}, ${started})\n`
      + `${(run.stdout || '') + (run.stderr || '')}`.trimEnd()
      + `\nexit_code=${exit_code}\n`;
    console.log(`  ${exit_code === 0 ? 'PASS' : 'FAIL'}  ${name}`);
    return { name, exit_code, body };
  });
  return { head, results };
}

/** Write one unit's logs and evidence JSON from a gate run; returns the evidence path. */
function writeEvidence(course, unit, gates) {
  const stamp = new Date().toISOString().replace(/[:.]/g, '').replace(/-/g, '');
  const rel = `specs/content/${course.toLowerCase()}/reviews/unit-${pad(unit)}/G2`;
  const logDir = `${rel}/logs-${stamp}`;
  mkdirSync(join(root, logDir), { recursive: true });
  const commands = [];
  const evidence_manifest = {};
  for (const { name, exit_code, body } of gates.results) {
    const log_path = `${logDir}/${name.replace(/:/g, '-')}.txt`;
    writeFileSync(join(root, log_path), body);
    evidence_manifest[log_path] = digest(Buffer.from(body));
    commands.push({ name, exit_code, log_path });
  }
  const failed = commands.filter((c) => c.exit_code !== 0).length;
  if (failed) throw new Error(`${failed} gate(s) failed; logs are in ${logDir}. G2 evidence is only written for a clean run.`);
  const out = `${rel}/${stamp}-gates.json`;
  const payload = {
    schema_version: 1,
    course_code: course,
    unit_no: unit,
    stage: 'G2',
    reviewed_commit: gates.head,
    generated_at: new Date().toISOString(),
    input_manifest: inputManifest(root, course, unit, 'G3'),
    commands,
    evidence_manifest,
  };
  writeFileSync(join(root, out), `${JSON.stringify(payload, null, 2)}\n`, { flag: 'wx' });
  return out;
}

/** Units whose current G2 row is gate evidence that fails only because its manifest is stale. */
function staleUnits() {
  const out = [];
  const trackers = new Map();
  for (const u of walkUnits(root)) {
    if (!trackers.has(u.courseCode)) trackers.set(u.courseCode, loadTracker(root, u.courseCode) ?? []);
    const row = latestRow(trackers.get(u.courseCode), `Unit ${u.unitNo}`, 'G2');
    const ref = row && row.reviewer === 'auto:gates' ? /^gates:([^\s]+\.json)$/.exec(row.suggestion)?.[1] : null;
    if (!ref) continue;
    try {
      acceptGateEvidence(root, ref, u.courseCode, u.unitNo);
    } catch (error) {
      if (/stale or incomplete input manifest/.test(error.message)) out.push({ course: u.courseCode, unit: u.unitNo, ref });
      else console.log(`  skip ${u.courseCode} Unit ${u.unitNo}: ${error.message} (not a stale manifest; re-running gates cannot repair it)`);
    }
  }
  return out;
}

/** Repoint the unit's G2 row from the old evidence file to the new one. */
function repoint(course, unit, oldRef, newRef) {
  const file = join(root, 'specs', 'content', course.toLowerCase(), 'tasks.md');
  const text = readFileSync(file, 'utf8');
  const needle = `gates:${oldRef}`;
  const lines = text.split('\n');
  const at = lines.map((l, i) => (l.startsWith(`| Unit ${unit} |`) && l.includes(needle) ? i : -1)).filter((i) => i >= 0);
  if (at.length === 0) throw new Error(`${course} Unit ${unit}: tracker row for ${oldRef} not found`);
  const i = at[at.length - 1];
  lines[i] = lines[i].replace(needle, `gates:${newRef}`);
  writeFileSync(file, lines.join('\n'));
}

try {
  if (args[0] === '--refresh-stale') {
    const stale = staleUnits();
    if (!stale.length) { console.log('No stale G2 gate evidence.'); process.exit(0); }
    for (const s of stale) requireClean(s.course, s.unit);
    console.log(`${stale.length} unit(s) with stale G2 evidence; running the draft gates once:`);
    const gates = runGates();
    for (const s of stale) {
      const out = writeEvidence(s.course, s.unit, gates);
      repoint(s.course, s.unit, s.ref, out);
      console.log(`  refreshed ${s.course} Unit ${s.unit}: ${out}`);
    }
    console.log(`\nRefreshed ${stale.length} unit(s); tracker rows repointed.`);
  } else {
    const [course, unitArg] = args;
    if (!course || !unitArg) throw new Error('usage: prepare-gate-evidence COURSE UNIT | --refresh-stale');
    const unit = Number(unitArg);
    if (!Number.isInteger(unit) || unit <= 0) throw new Error('UNIT must be a positive integer');
    requireClean(course, unit);
    const out = writeEvidence(course, unit, runGates());
    console.log(`\nG2 evidence written: ${out}`);
    console.log(`Tracker row: | Unit ${unit} | G2 en-draft | ✅ | auto:gates | gates:${out} |`);
  }
} catch (error) {
  console.error(`Gate evidence not prepared: ${error.message}`);
  process.exitCode = 1;
}
