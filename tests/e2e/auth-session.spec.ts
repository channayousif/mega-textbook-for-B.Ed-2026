import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

/**
 * T046 [US4] — session persists across docs<->app navigation and across a
 * browser-context restart, with no re-prompt (FR-011, FR-011a, SC-006).
 *
 * A "browser restart" is simulated the standard Playwright way: capture
 * `storageState()` after signing in (this is exactly what a real browser
 * persists to disk between restarts — supabase-js's session lives in
 * localStorage per src/lib/supabase.ts's persistSession:true), close that
 * context, open a brand new one seeded with the saved state. If the app reads
 * anything beyond localStorage (a cookie, an in-memory-only flag) this would
 * fail to reproduce a real restart — it doesn't, matching research.md R1's
 * "no custom token storage" constraint.
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';
const DOCS_PAGE = '/semester-1/efmp-301/unit-01/';

test('session persists navigating docs <-> app pages, and across a simulated browser restart', async ({ page, browser }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const email = `e2e-session-${Date.now()}@example.test`;
  const { data: created } = await svc.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });

  try {
    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);

    // Docs -> app -> docs -> app: the navbar must show the account throughout,
    // never "Sign in", on every hop across the route-type boundary.
    for (const url of [DOCS_PAGE, '/app/profile', DOCS_PAGE, '/app/profile']) {
      await page.goto(url);
      await expect(page.getByRole('link', { name: /sign in/i })).toHaveCount(0);
      await expect(page.locator('.navbar').getByText(email)).toBeVisible();
    }

    // Simulate closing and reopening the browser.
    const storageState = await page.context().storageState();
    const restartedContext = await browser.newContext({ storageState });
    const restartedPage = await restartedContext.newPage();
    try {
      await restartedPage.goto(DOCS_PAGE);
      await expect(restartedPage.getByRole('link', { name: /sign in/i })).toHaveCount(0);
      await expect(restartedPage.locator('.navbar').getByText(email)).toBeVisible();

      await restartedPage.goto('/app/profile');
      // No redirect to /app/login — the whole point of FR-011a.
      await expect(restartedPage).not.toHaveURL(/\/app\/login/);
    } finally {
      await restartedContext.close();
    }
  } finally {
    await deleteUsers(svc, created.user!.id);
  }
});
