import { defineConfig } from 'vitest/config';

/**
 * Row-Level Security matrix suite (Spec 002, SC-004 evidence).
 *
 * Kept in a SEPARATE config from vitest.config.ts because these tests need a
 * live Supabase instance and credentials, whereas the unit suite is pure and
 * offline. Mixing them would make `npm test` fail on any machine without a
 * database — including CI jobs that only validate content.
 *
 * Run with:  npm run test:rls
 * Requires:  DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY,
 *            SUPABASE_SERVICE_ROLE_KEY  (see .env.example)
 *
 * These tests assert NEGATIVE cases — that policies REFUSE access. A suite that
 * only proves happy paths cannot detect an over-permissive policy, which is the
 * principal risk this feature carries (answer keys leaking to unverified
 * teachers). Treat a missing negative test as a failing gate.
 */
export default defineConfig({
  test: {
    include: ['tests/rls/**/*.test.mjs'],
    exclude: ['tests/e2e/**', 'tests/unit/**', 'node_modules/**'],
    // Policy failures surface as network/DB round-trips; the default 5s is tight
    // when the suite runs against a hosted project rather than a local stack.
    testTimeout: 30_000,
    hookTimeout: 30_000,
    // Fixture users are shared state — parallel files would race on seeding.
    fileParallelism: false,
  },
});
