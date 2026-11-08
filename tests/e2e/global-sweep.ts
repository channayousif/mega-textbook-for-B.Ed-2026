// Playwright globalSetup and globalTeardown: see tests/test-account-sweep.mjs.
// @ts-expect-error - plain ESM module shared with the RLS harness, no types needed
import { sweepTestAccounts } from '../test-account-sweep.mjs';

export default async function globalSweep(): Promise<void> {
  await sweepTestAccounts('e2e');
}
