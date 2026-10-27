#!/usr/bin/env node
/**
 * G3 sign-off sync (ADR-0032): turns the owner's queued `g3_signoffs` ledger rows into
 * Git, in one PR per run.
 *
 * For each queued row, on a fresh worktree of origin/main:
 *  - refuse it as `stale` if the unit's review inputs changed since the owner decided
 *    (the digest the desk showed no longer matches) or the unit is already certified;
 *  - otherwise write the Spec 017 certification JSON under reviews/unit-NN/G3/ and append
 *    the tracker row (✅ for certify, ⏳ for revise/escalate), using the same
 *    `buildCertification`/`buildTrackerRow` the review-queue page uses.
 * Then run check:pipeline-gate, commit, push and open the PR, and mark the rows `synced`.
 * The crew never merges this PR: merging it is the owner's sign-off.
 *
 * Needs SUPABASE_SERVICE_ROLE_KEY and SUPABASE_URL (or DOCUSAURUS_SUPABASE_URL); without
 * them it does nothing, so a tick on a host without the key is unaffected.
 *
 * Usage: node scripts/crew/signoff-sync.mjs [--dry-run]
 *   --dry-run  writes the files in the worktree and prints the diff; no push, no PR, and no
 *              ledger row is changed.
 */
import { existsSync, mkdirSync, readFileSync, symlinkSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { inputManifest } from '../lib/review-evidence.mjs';
import { loadTracker, stageState } from '../lib/tracker-rows.mjs';
import { COMMANDS } from '../lib/review-criteria.mjs';
import { manifestDigest, certificationInput, runIdFor } from '../lib/g3-desk.mjs';
import { buildCertification, buildTrackerRow, certificationPath } from '../../src/lib/reviewQueue.ts';

const ROOT = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const GATE_COMMANDS = COMMANDS.filter((name) => name !== 'render-review');

/**
 * Insert a tracker row after the last `| Unit N |` row, so it lands inside the table rather
 * than after the prose that follows it. Appends at the end when the file has no unit rows.
 */
export function insertTrackerRow(text, row) {
  const lines = text.split('\n');
  let last = -1;
  lines.forEach((l, i) => { if (/^\| Unit \d+ \|/.test(l)) last = i; });
  if (last < 0) return `${text.replace(/\n*$/, '\n')}${row}\n`;
  lines.splice(last + 1, 0, row);
  return lines.join('\n');
}

/**
 * Write every acceptable row's certification and tracker row into `wt`.
 * Injected `manifestOf` and `certified` keep this testable without a real corpus.
 * Returns what was written and what was refused, and why.
 */
export function applySignoffs(wt, rows, { manifestOf, certified, gateExit, completedAt }) {
  const written = [];
  const stale = [];
  const failed = [];
  for (const row of rows) {
    const label = `${row.course_code} Unit ${row.unit_no}`;
    if (certified(row.course_code, row.unit_no)) { stale.push({ row, why: `${label} is already certified on main` }); continue; }
    let manifest;
    try { manifest = manifestOf(row.course_code, row.unit_no); } catch (e) { failed.push({ row, why: `${label}: cannot bind inputs: ${e.message}` }); continue; }
    if (manifestDigest(manifest) !== row.inputs_digest) {
      stale.push({ row, why: `${label} changed on main after the decision; decide again on the current version` });
      continue;
    }
    let cert;
    try {
      cert = buildCertification(certificationInput(row, { manifest, gateExit, completedAt }));
    } catch (e) { failed.push({ row, why: `${label}: ${e.message}` }); continue; }
    const path = certificationPath(cert, runIdFor(row));
    const trackerRow = buildTrackerRow(cert, path);
    mkdirSync(dirname(join(wt, path)), { recursive: true });
    writeFileSync(join(wt, path), `${JSON.stringify(cert, null, 2)}\n`);
    const tasks = join(wt, 'specs', 'content', row.course_code.toLowerCase(), 'tasks.md');
    writeFileSync(tasks, insertTrackerRow(readFileSync(tasks, 'utf8'), trackerRow));
    written.push({ row, path, trackerRow });
  }
  return { written, stale, failed };
}

// ---------------------------------------------------------------- CLI

function sh(cmd, args, cwd = ROOT, { allowFail = false } = {}) {
  const r = spawnSync(cmd, args, { cwd, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (r.status !== 0 && !allowFail) throw new Error(`${cmd} ${args.join(' ')}: ${(r.stderr || r.stdout || '').trim().slice(-800)}`);
  return { ok: r.status === 0, code: r.status, out: (r.stdout || '').trim(), err: (r.stderr || '').trim() };
}

function phr(stamp, branch, result) {
  const lines = result.written.map(({ row, path }) => `- ${row.course_code} Unit ${row.unit_no}: ${row.decision} by ${row.reviewer_initials} (${path})`);
  return `---
id: crew-g3-signoff-${stamp}
title: G3 sign-off sync ${stamp}
stage: misc
date: ${new Date().toISOString().slice(0, 10)}
surface: agent
model: crew
feature: none
branch: ${branch}
user: crew
command: node scripts/crew/signoff-sync.mjs
labels: ["crew", "g3-signoff"]
links:
  spec: specs/017-reviewer-role/spec.md
  ticket: null
  adr: history/adr/0032-g3-signoff-intent-ledger.md
  pr: null
files:
${result.written.flatMap(({ row, path }) => [` - ${path}`, ` - specs/content/${row.course_code.toLowerCase()}/tasks.md`]).join('\n')}
tests:
 - npm run check:pipeline-gate
---

## Prompt

Owner decisions recorded on the G3 sign-off desk (/app/admin/g3-signoff), queued in g3_signoffs.

## Response snapshot

${lines.join('\n')}

## Outcome

- Impact: ${result.written.length} G3 decision(s) written as Spec 017 certifications and tracker rows.
- Tests: check:pipeline-gate passed in the sync worktree before the PR was opened.
- Files: listed above.
- Next prompts: none.
- Reflection: none.

## Handoff (for CEO and agents)

- Shipped / changed: the certifications and tracker rows above. Certify rows become G3 done when this PR merges.
- Decisions the team must respect: ADR-0032; the ledger is intent only and no gate reads it.
- Pending / next owner: the owner merges this PR. The crew never merges it.
- Paperclip issues affected: none.
`;
}

async function main() {
  const DRY = process.argv.includes('--dry-run');
  const url = process.env.SUPABASE_URL || process.env.DOCUSAURUS_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) { process.stdout.write('signoff-sync: no service key on this host, skipped\n'); return; }
  const { createClient } = await import('@supabase/supabase-js');
  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

  const { data: rows, error } = await db.from('g3_signoffs').select('*').eq('sync_status', 'queued').order('decided_at');
  if (error) throw new Error(error.message);
  if (!rows.length) { process.stdout.write('signoff-sync: nothing queued\n'); return; }

  const mark = async (row, status, prUrl, note) => {
    if (DRY) { process.stdout.write(`[dry-run] would mark ${row.course_code} Unit ${row.unit_no} ${status}${note ? `: ${note}` : ''}\n`); return; }
    const { error: e } = await db.rpc('mark_g3_signoff_synced', { p_id: row.id, p_status: status, p_pr_url: prUrl ?? null, p_note: note ?? null });
    if (e) process.stderr.write(`signoff-sync: could not mark ${row.id}: ${e.message}\n`);
  };

  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
  const branch = `crew/g3-signoff-${stamp}`;
  const wt = join(process.env.CREW_WORKTREE_DIR || join(process.env.HOME, 'crew-wt'), `g3-signoff-${stamp}`);
  sh('git', ['fetch', '-q', 'origin']);
  sh('git', ['worktree', 'add', '-q', '-B', branch, wt, 'origin/main']);
  let pushed = false;
  const cleanup = () => {
    if (DRY) return;
    sh('git', ['worktree', 'remove', '--force', wt], ROOT, { allowFail: true });
    if (!pushed) sh('git', ['branch', '-D', branch], ROOT, { allowFail: true });
  };
  try {
    if (!existsSync(join(wt, 'node_modules'))) symlinkSync(join(ROOT, 'node_modules'), join(wt, 'node_modules'));
    const gateExit = Object.fromEntries(GATE_COMMANDS.map((name) => [name, sh('npm', ['run', '-s', name], wt, { allowFail: true }).code]));
    const result = applySignoffs(wt, rows, {
      manifestOf: (course, unit) => inputManifest(wt, course, unit, 'G3'),
      certified: (course, unit) => stageState(loadTracker(wt, course) ?? [], `Unit ${unit}`, 'G3') === 'done',
      gateExit,
      completedAt: new Date().toISOString(),
    });
    for (const { row, why } of result.stale) await mark(row, 'stale', null, why);
    for (const { row, why } of result.failed) await mark(row, 'failed', null, why);
    if (!result.written.length) { process.stdout.write('signoff-sync: nothing to commit\n'); return; }

    const gate = sh('npm', ['run', '-s', 'check:pipeline-gate'], wt, { allowFail: true });
    if (!gate.ok) {
      const tail = `check:pipeline-gate failed: ${(gate.err || gate.out).slice(-600)}`;
      for (const { row } of result.written) await mark(row, 'failed', null, tail);
      return;
    }
    const phrDir = join(wt, 'history', 'prompts', 'general');
    mkdirSync(phrDir, { recursive: true });
    writeFileSync(join(phrDir, `crew-g3-signoff-${stamp}.general.prompt.md`), phr(stamp, branch, result));
    sh('git', ['add', '-A', 'specs/content', 'history/prompts/general'], wt);
    const units = result.written.map(({ row }) => `${row.course_code} U${row.unit_no}`).join(', ');
    sh('git', ['commit', '-q', '-m', `review(g3): owner sign-off desk decisions\n\n${units}\n\nFrom g3_signoffs (ADR-0032).`], wt);
    if (DRY) {
      process.stdout.write(`${sh('git', ['show', '--stat', 'HEAD'], wt).out}\n\n[dry-run] worktree kept at ${wt}\n`);
      return;
    }
    sh('git', ['push', '-q', '-u', 'origin', branch], wt);
    pushed = true;
    const body = [
      'Owner G3 decisions from the sign-off desk (`/app/admin/g3-signoff`), written by the crew (ADR-0032).',
      '',
      '| Unit | Decision | Reviewer | Certification |',
      '| --- | --- | --- | --- |',
      ...result.written.map(({ row, path }) => `| ${row.course_code} Unit ${row.unit_no} | ${row.decision} | ${row.reviewer_initials} | \`${path}\` |`),
      '',
      'Merging this PR is the sign-off: certify rows become G3 done on merge. The crew does not merge it.',
      result.stale.length || result.failed.length ? `\nNot included: ${[...result.stale, ...result.failed].map(({ why }) => why).join('; ')}` : '',
    ].join('\n');
    const pr = sh('gh', ['pr', 'create', '--base', 'main', '--head', branch, '--title', `G3 sign-off: ${result.written.length} unit(s) from the desk`, '--body', body], wt);
    const prUrl = pr.out.split('\n').find((l) => l.startsWith('https://github.com/'));
    for (const { row } of result.written) await mark(row, 'synced', prUrl);
    process.stdout.write(`signoff-sync: ${prUrl}\n`);
  } finally {
    cleanup();
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => { process.stderr.write(`signoff-sync: ${e.message}\n`); process.exit(1); });
}
