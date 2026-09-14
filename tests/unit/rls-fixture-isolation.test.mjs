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

  it('serializes CI runs so they cannot race on the shared database', () => {
    const ci = readFileSync(join(REPO, '.github', 'workflows', 'ci.yml'), 'utf8');
    expect(ci).toMatch(/^concurrency:/m);
    // Cancelling a run mid-suite is what strands fixture rows, so an ENABLED
    // cancel-in-progress is the thing to forbid. `false` is the default, and it
    // cannot be spelled out at all alongside `queue`, so asserting its presence
    // would forbid the queueing fix below rather than guard anything.
    expect(ci).not.toMatch(/cancel-in-progress:\s*true/);
  });

  it('queues serialized runs instead of dropping them', () => {
    const ci = readFileSync(join(REPO, '.github', 'workflows', 'ci.yml'), 'utf8');
    // The default `queue: single` holds one pending run and cancels it when a
    // third joins the group. On 2026-09-14 that evicted main's run for 18adacc,
    // leaving the merge commit for PR #57 with no CI verdict at all - and
    // scripts/deploy-prod.sh gates on a success run for the exact head_sha, so
    // that SHA would never have deployed. `queue: max` waits, FIFO, instead.
    expect(ci).toMatch(/^\s*queue:\s*max\s*$/m);
  });
});
