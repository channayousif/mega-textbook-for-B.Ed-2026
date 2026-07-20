import { defineConfig, devices } from '@playwright/test';

/**
 * E2E config for render/RTL/print/nav/search checks (T012, T022, T023, T027).
 * Requires a served build: `npm run build && npm run serve` (port 3000).
 * Run: `npm run test:e2e` (after `npx playwright install chromium`).
 */
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  // CI runners talk to the self-hosted Supabase instance over real network
  // latency (vs. same-host access in local dev), occasionally pushing a
  // single assertion past its default timeout — retry there, not locally,
  // so a genuinely broken feature still fails every attempt.
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:3000',
    ...devices['Desktop Chrome'],
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
