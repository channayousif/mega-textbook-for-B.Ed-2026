import { defineConfig, devices } from '@playwright/test';

/**
 * E2E config for render/RTL/print/nav/search checks (T012, T022, T023, T027).
 * Requires a served build: `npm run build && npm run serve` (port 3000).
 * Run: `npm run test:e2e` (after `npx playwright install chromium`).
 */
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  // Retries in CI only, never locally, so a genuinely broken feature still
  // fails every attempt. NOTE: a CI failure on assignments-publish-submit.spec.ts
  // reproduced identically on the original run AND both retries (PR #4) —
  // ruled out as transient network-latency flakiness; trace/screenshot below
  // exist to actually diagnose it instead of guessing further.
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:3000',
    ...devices['Desktop Chrome'],
    // Captured only on failure — cheap when everything passes, and gives an
    // actual trace.zip/screenshot to inspect instead of just the bare
    // error-context.md Playwright already writes by default.
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    // Prefer a real static build in CI (`npm run serve`); locally the dev server works too
    // and avoids the SSG step. Override with PW_WEBSERVER if needed.
    command: process.env.PW_WEBSERVER || 'npm run start -- --port 3000 --no-open',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
