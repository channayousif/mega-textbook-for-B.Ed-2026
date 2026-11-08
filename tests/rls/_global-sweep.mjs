// Vitest globalSetup for the RLS suite: see tests/test-account-sweep.mjs.
import { sweepTestAccounts } from '../test-account-sweep.mjs';

export async function setup() {
  await sweepTestAccounts('rls setup');
}

export async function teardown() {
  await sweepTestAccounts('rls teardown');
}
