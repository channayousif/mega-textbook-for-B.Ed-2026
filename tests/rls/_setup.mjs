/**
 * Preconditions for the RLS suite.
 *
 * TWO THINGS, both of which exist because this suite failing silently is worse
 * than it failing loudly.
 *
 * 1. **Load `.env.local`.** Without it, a local `npm run test:rls` found no
 *    credentials, every file hit `describe.skipIf(!rlsConfigured)`, and the run
 *    reported "5 skipped" and exit 0. Same dotenv pattern as
 *    `docusaurus.config.ts`, and the same reason: dotenv no-ops when the file
 *    is absent, so CI, which sets these through the workflow's own `env:`
 *    block, is unaffected.
 *
 * 2. **Refuse to run unconfigured.** ci.yml says of this suite: "Negative cases
 *    are mandatory; treat a missing/skipped one as a failing gate." A skipped
 *    run that exits 0 is exactly the failure that policy forbids, and it is the
 *    most dangerous shape a test suite can take - the whole point here is to
 *    prove policies REFUSE access, so a suite that asserts nothing while
 *    reporting success is indistinguishable from one where every policy is
 *    wide open.
 *
 * This config is only ever used when someone asks for RLS tests explicitly:
 * `vitest.config.ts` includes `tests/unit/**` alone, so `npm test` stays green
 * offline without any help from a skip here. `rlsConfigured` therefore stays in
 * `_helpers.mjs` for the individual `skipIf` guards, but by the time a test
 * file is imported it can no longer be false.
 */
import { config as loadEnv } from 'dotenv';

loadEnv({ path: '.env.local', quiet: true });

const REQUIRED = [
  'DOCUSAURUS_SUPABASE_URL',
  'DOCUSAURUS_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
];

const missing = REQUIRED.filter((name) => !process.env[name]);

if (missing.length > 0) {
  throw new Error(
    `RLS tests cannot run: ${missing.join(', ')} not set.\n`
    + 'Set them in .env.local (see .env.example) or in the environment.\n'
    + 'This is a hard failure on purpose: a skipped RLS run exits 0 while '
    + 'asserting nothing, which looks identical to a run where every policy passed.',
  );
}
