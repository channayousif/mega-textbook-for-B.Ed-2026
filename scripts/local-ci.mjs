#!/usr/bin/env node
/**
 * Run the CI workflow locally, and attest the result for the deploy gate.
 *
 * WHY THIS EXISTS. The repository exhausted its 2,000 GitHub Actions minutes on
 * 2026-09-20; they reset on 2026-10-01. Until then `ci.yml` cannot run at all -
 * not on push, not on a pull request. That is not only a loss of verification:
 * `scripts/deploy-prod.sh` gates every production deploy on a COMPLETED, SUCCESSFUL
 * ci.yml run for the exact SHA, so with no runs possible, anything merged to main
 * would sit undeployed until October. Production would silently freeze.
 *
 * So this runs the same steps on this machine and records that it did.
 *
 * IT READS ci.yml. The step list is parsed out of the workflow rather than copied
 * here, because a hand-copied list is a list that drifts - and a local runner that
 * quietly checks less than CI is worse than no local runner, since it produces
 * the same green tick with less behind it. Every `run:` in the workflow's jobs is
 * executed in order. If a step is added to CI, it runs here the next day without
 * anyone remembering to mirror it.
 *
 *   node scripts/local-ci.mjs            # run everything, attest on success
 *   node scripts/local-ci.mjs --no-attest
 *   node scripts/local-ci.mjs --list     # show what would run
 *
 * Attestations land in ~/deploy/local-ci/<sha>.json and are consumed by
 * deploy-prod.sh's fallback, which is itself hard-expired - see EXPIRES below.
 */
import { spawnSync, execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';
import { createHash } from 'node:crypto';
import yaml from 'js-yaml';

const ROOT = resolve(process.env.CONTENT_ROOT || '.');
const ATTEST_DIR = join(homedir(), 'deploy', 'local-ci');

/**
 * Hard expiry. The Actions allowance resets on 2026-10-01; this is a fortnight's
 * measure, not a new way of working. Past this date the runner still RUNS - local
 * verification is always useful - but it stops writing attestations, so the deploy
 * fallback goes cold by itself rather than by anyone remembering to remove it.
 */
const EXPIRES = '2026-10-02';

const args = process.argv.slice(2);
const listOnly = args.includes('--list');
const noAttest = args.includes('--no-attest');

/** Every `run:` step of every job in ci.yml, in file order, with its job's env. */
function ciSteps() {
  const wf = yaml.load(readFileSync(join(ROOT, '.github', 'workflows', 'ci.yml'), 'utf8'));
  const steps = [];
  for (const [jobName, job] of Object.entries(wf.jobs ?? {})) {
    for (const step of job.steps ?? []) {
      if (!step.run) continue;
      // `uses:` steps are checkout/setup-node/upload-artifact - all either
      // meaningless locally or already true of this working tree.
      steps.push({ job: jobName, name: step.name ?? step.run.split('\n')[0], run: step.run, env: step.env ?? {} });
    }
  }
  return steps;
}

/** `${{ secrets.X }}` resolves from the local environment, which `.env.local` seeds. */
function resolveEnv(stepEnv) {
  const out = {};
  for (const [key, raw] of Object.entries(stepEnv)) {
    const secret = /^\$\{\{\s*secrets\.([A-Za-z0-9_]+)\s*\}\}$/.exec(String(raw));
    out[key] = secret ? (process.env[secret[1]] ?? '') : String(raw);
  }
  return out;
}

function loadDotEnv() {
  const file = join(ROOT, '.env.local');
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(line.trim());
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const steps = ciSteps();
if (listOnly) {
  console.log(`${steps.length} step(s) from .github/workflows/ci.yml:\n`);
  for (const s of steps) console.log(`  [${s.job}] ${s.name}`);
  process.exit(0);
}

loadDotEnv();

// An attestation names a commit, so it must describe one. A dirty tree would
// attest bytes that are not on any branch and that nothing else can reproduce -
// the same rule `prepare-gate-evidence.mjs` enforces for review evidence.
const dirty = execFileSync('git', ['status', '--porcelain'], { cwd: ROOT, encoding: 'utf8' }).trim();
if (dirty && !noAttest) {
  console.error('✗ Working tree is not clean. An attestation names a commit, so commit or stash first:\n');
  console.error(dirty.split('\n').slice(0, 10).map((l) => `    ${l}`).join('\n'));
  process.exit(1);
}
const sha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim();

console.log(`Local CI for ${sha.slice(0, 8)} - ${steps.length} steps from ci.yml\n`);
const results = [];
let failed = 0;

for (const [i, step] of steps.entries()) {
  const label = `${String(i + 1).padStart(2)}/${steps.length}  [${step.job}] ${step.name}`;
  process.stdout.write(`${label.padEnd(72).slice(0, 72)} `);
  const started = Date.now();
  const res = spawnSync('bash', ['-lc', step.run], {
    cwd: ROOT,
    encoding: 'utf8',
    env: { ...process.env, ...resolveEnv(step.env), CI: 'true' },
    maxBuffer: 64 * 1024 * 1024,
  });
  const secs = ((Date.now() - started) / 1000).toFixed(1);
  const ok = res.status === 0;
  console.log(ok ? `PASS ${secs}s` : `FAIL ${secs}s`);
  results.push({ job: step.job, name: step.name, exit_code: res.status, seconds: Number(secs) });
  if (!ok) {
    failed++;
    console.log(`\n${'='.repeat(70)}`);
    process.stdout.write(res.stdout || '');
    process.stderr.write(res.stderr || '');
    console.log(`${'='.repeat(70)}\n`);
  }
}

if (failed) {
  console.error(`\n✗ ${failed} of ${steps.length} step(s) failed. No attestation written.`);
  process.exit(1);
}

console.log(`\n✓ All ${steps.length} steps passed.`);
if (noAttest) process.exit(0);

if (new Date().toISOString().slice(0, 10) >= EXPIRES) {
  console.log(`\nAttestation NOT written: this measure expired on ${EXPIRES}.`);
  console.log('GitHub Actions minutes should have reset; let CI gate the deploy again.');
  process.exit(0);
}

mkdirSync(ATTEST_DIR, { recursive: true });
const attestation = {
  schema_version: 1,
  sha,
  workflow_digest: createHash('sha256')
    .update(readFileSync(join(ROOT, '.github', 'workflows', 'ci.yml')))
    .digest('hex'),
  attested_at: new Date().toISOString(),
  expires: EXPIRES,
  host: execFileSync('hostname', { encoding: 'utf8' }).trim(),
  reason: 'GitHub Actions minutes exhausted 2026-09-20; reset 2026-10-01',
  steps: results,
};
const out = join(ATTEST_DIR, `${sha}.json`);
writeFileSync(out, `${JSON.stringify(attestation, null, 2)}\n`);
console.log(`Attested: ${out}`);
console.log(`deploy-prod.sh will accept this for ${sha.slice(0, 8)} until ${EXPIRES}.`);
