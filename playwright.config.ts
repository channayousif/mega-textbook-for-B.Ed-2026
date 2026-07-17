import { defineConfig, devices } from '@playwright/test';

/**
 * E2E config for render/RTL/print/nav/search checks (T012, T022, T023, T027).
 * Requires a served build: `npm run build && npm run serve` (port 3000).
 * Run: `npm run test:e2e` (after `npx playwright install chromium`).
 */
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:3000',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'npm run serve -- --port 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
