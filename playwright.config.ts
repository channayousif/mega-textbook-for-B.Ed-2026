import { defineConfig, devices } from '@playwright/test';

/**
 * E2E config for render/RTL/print/nav/search checks (T012, T022, T023, T027).
 * Run: `npm run test:e2e` (after `npx playwright install chromium`).
 *
 * webServer runs `docusaurus serve --build` (port 3000) — a full static
 * build, then served — never `docusaurus start`. The dev server only ever
 * serves ONE locale per process (Docusaurus docs: "you cannot run
 * Docusaurus sites in multiple locales simultaneously" in dev mode), so
 * every `/ur/...` RTL assertion would silently see English content
 * (`dir="ltr"`) instead of failing loudly — reproduced by three RTL specs
 * (classes-rtl, dashboard-rtl, teacher-dashboard-rtl) all failing
 * identically against the dev server (005-teacher-dashboard investigation),
 * then all passing once switched to a served build.
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
    // Always a full static build+serve, never `docusaurus start` — the dev
    // server only ever serves one locale per process, which makes every
    // `/ur/...` RTL assertion silently see English content instead of
    // failing loudly (see the file-level comment above). `serve --build`
    // builds then serves in one step, matching Docusaurus's documented
    // self-hosting pattern. Override with PW_WEBSERVER if needed.
    command: process.env.PW_WEBSERVER || 'npm run serve -- --build --port 3000 --no-open',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
