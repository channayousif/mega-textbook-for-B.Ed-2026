/**
 * Suite-level sweep of leaked test accounts, shared by the e2e and RLS suites.
 *
 * Each spec deletes the users it creates, but a test that times out or crashes
 * never reaches its cleanup. Those leftovers piled up to 1,309 `@example.test`
 * logins on the live project (68 active admins) by 2026-11-08. Running the
 * sweep before and after every suite caps a leak at one run.
 *
 * Only fixtures older than 60 minutes are touched, so a concurrent run's live
 * users survive. Tombstones are left to the nightly cron run: checking every
 * reference takes about 30 seconds, too slow to pay twice per suite.
 *
 * Never throws: a sweep failure must not mask, or stand in for, a test result.
 */
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

// A child process, not an import: Playwright compiles the files a TypeScript
// global hook imports to CommonJS, where the purge script's `import.meta`
// is a syntax error (CI run 42513421938). Both runners start in the repo root.
const SCRIPT = join(process.cwd(), 'scripts', 'ops', 'purge-test-accounts.mjs');

export async function sweepTestAccounts(when) {
  const run = spawnSync(process.execPath, [SCRIPT, '--apply', '--older-than', '60', '--no-tombstones'], {
    encoding: 'utf8',
    timeout: 5 * 60_000,
  });
  for (const line of `${run.stdout ?? ''}${run.stderr ?? ''}`.split('\n').filter(Boolean)) {
    console.log(`[${when}] ${line}`);
  }
  if (run.error || run.status !== 0) {
    console.warn(`[${when}] test-account sweep failed: ${run.error?.message ?? `exit ${run.status}`}`);
  }
}
