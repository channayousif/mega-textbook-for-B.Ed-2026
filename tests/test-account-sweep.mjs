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
import { purgeTestAccounts } from '../scripts/ops/purge-test-accounts.mjs';

export async function sweepTestAccounts(when) {
  try {
    await purgeTestAccounts({
      apply: true,
      olderThanMin: 60,
      tombstones: false,
      log: (line) => console.log(`[${when}] ${line}`),
    });
  } catch (err) {
    console.warn(`[${when}] test-account sweep failed: ${err?.message ?? err}`);
  }
}
