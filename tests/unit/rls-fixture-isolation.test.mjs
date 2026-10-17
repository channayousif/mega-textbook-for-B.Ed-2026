import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const RLS_DIR = join(REPO, 'tests', 'rls');

/**
 * Guards the two defects that took `main` red on 2026-09-11, and the third that
 * silently dropped CI runs on 2026-09-14.
 *
 * The RLS suite runs against a SHARED Supabase project, so its fixtures must be
 * safe to create concurrently and must always be removable afterwards. They
 * were neither:
 *
 *  1. Class fixtures used hardcoded join codes ('PUB001', 'UPS001', ...) in a
 *     UNIQUE column, so two runs of the same file collided deterministically -
 *     not by chance, every single time.
 *  2. cleanupClasses issued a bare `delete from classes` inside
 *     Promise.allSettled. teaching_log_entries.class_id does not cascade, so
 *     the delete raised a foreign-key violation that allSettled discarded in
 *     silence. Those classes then sat in the database forever, and the ones
 *     holding hardcoded codes poisoned every later run.
 *  3. The serializing concurrency group relied on the default `queue: single`,
 *     which keeps at most ONE pending run and cancels it the moment a third
 *     joins the group. Serialization that drops runs is not serialization.
 */

const rlsFiles = () =>
  readdirSync(RLS_DIR)
    .filter((f) => f.endsWith('.mjs'))
    .map((f) => ({ name: f, text: readFileSync(join(RLS_DIR, f), 'utf8') }));

describe('RLS fixture isolation', () => {
  it('never persists a hardcoded join code', () => {
    const offenders = [];
    for (const { name, text } of rlsFiles()) {
      text.split('\n').forEach((line, i) => {
        if (!/join_code:\s*'[^']+'/.test(line)) return;
        // A literal is fine only where the test asserts the write is REJECTED -
        // an `.update()` the guard trigger refuses never reaches the column.
        if (line.includes('.update(')) return;
        offenders.push(`${name}:${i + 1} ${line.trim()}`);
      });
    }
    expect(offenders).toEqual([]);
  });

  it('deletes teaching_log_entries before the class that owns them', () => {
    const helper = readFileSync(join(RLS_DIR, '_classFixtures.mjs'), 'utf8');
    const body = helper.slice(helper.indexOf('export async function cleanupClasses'));
    const logIdx = body.indexOf("from('teaching_log_entries')");
    const classIdx = body.indexOf("from('classes').delete()");
    expect(logIdx).toBeGreaterThan(-1);
    expect(classIdx).toBeGreaterThan(-1);
    expect(logIdx).toBeLessThan(classIdx);
  });

  it('surfaces cleanup failures instead of swallowing them', () => {
    const helper = readFileSync(join(RLS_DIR, '_classFixtures.mjs'), 'utf8');
    const body = helper.slice(helper.indexOf('export async function cleanupClasses'));
    expect(body).not.toMatch(/allSettled/);
    expect(body).toMatch(/throw new Error/);
  });

  // The lock lives on the jobs that touch the shared Supabase project, not on the
  // whole workflow (content fast lane, 2026-10-17): `build` touches no database and
  // runs in parallel. So the guard is per job. Every job that runs test:rls or
  // test:e2e must hold the one group, queue rather than drop, and never cancel.
  const ci = () => readFileSync(join(REPO, '.github', 'workflows', 'ci.yml'), 'utf8');
  const jobs = (text) => {
    const body = text.slice(text.search(/^jobs:\s*$/m));
    const parts = body.split(/^ {2}(?=[A-Za-z][\w-]*:\s*$)/m).slice(1);
    return Object.fromEntries(parts.map((p) => [p.slice(0, p.indexOf(':')), p]));
  };
  const databaseJobs = (text) =>
    Object.entries(jobs(text)).filter(([, t]) => /npm run (?:-s )?test:(?:rls|e2e)\b/.test(t));

  it('serializes every job that uses the shared database', () => {
    const found = databaseJobs(ci());
    expect(found.map(([name]) => name).sort()).toEqual(['e2e', 'rls']);
    for (const [, t] of found) {
      expect(t).toMatch(/^ {4}concurrency:\s*\n {6}group:\s*shared-supabase\s*$/m);
      // Cancelling a job mid-suite is what strands fixture rows, so an ENABLED
      // cancel-in-progress is the thing to forbid. `false` is the default, and it
      // cannot be spelled out at all alongside `queue`.
      expect(t).not.toMatch(/cancel-in-progress:\s*true/);
    }
  });

  it('queues serialized jobs instead of dropping them', () => {
    // The default `queue: single` holds one pending entry and cancels it when a
    // third joins the group. On 2026-09-14 that evicted main's run for 18adacc,
    // leaving the merge commit for PR #57 with no CI verdict at all - and
    // scripts/deploy-prod.sh gates on a success run for the exact head_sha, so
    // that SHA would never have deployed. `queue: max` waits, FIFO, instead.
    for (const [, t] of databaseJobs(ci())) expect(t).toMatch(/^ {6}queue:\s*max\s*$/m);
  });

  it('runs the database suites on every push to main', () => {
    // Content-only PRs may skip rls/e2e; main may not, because deploy-prod.sh
    // deploys only a main SHA whose ci.yml run succeeded.
    expect(ci()).toMatch(/if \[ "\$EVENT" != "pull_request" \]; then echo "app=true"/);
  });
});
