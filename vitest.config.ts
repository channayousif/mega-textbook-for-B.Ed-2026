import { defineConfig } from 'vitest/config';

/**
 * Vitest runs ONLY the validator fixture unit tests. The Playwright e2e specs live in
 * tests/e2e/*.spec.ts and are run separately via `npm run test:e2e` — they must not be
 * collected by vitest (Playwright's test() is not valid in the vitest runner).
 */
export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.mjs'],
    exclude: ['tests/e2e/**', 'node_modules/**'],
  },
});
