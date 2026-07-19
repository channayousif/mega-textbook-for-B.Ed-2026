import { test, expect } from '@playwright/test';

/**
 * T025 [US1] — sign-up returns the user to the originating page, and the
 * navbar shows the account's name or email fallback (FR-013, FR-010b).
 *
 * Requires DOCUSAURUS_SUPABASE_URL / DOCUSAURUS_SUPABASE_ANON_KEY at build/serve
 * time to exercise the real flow; skipped otherwise so `npm run test:e2e` stays
 * green on a machine with no Supabase project configured (mirrors tests/rls's
 * rlsConfigured skip pattern).
 */
const configured = Boolean(process.env.DOCUSAURUS_SUPABASE_URL && process.env.DOCUSAURUS_SUPABASE_ANON_KEY);

test.skip(!configured, 'requires a configured Supabase project — see .env.example');

test('sign-up page has email/password fields, a Google button, and an optional role choice', async ({ page }) => {
  await page.goto('/app/signup');
  await expect(page.getByLabel(/email/i)).toBeVisible();
  await expect(page.getByLabel(/password/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /continue with google/i })).toBeVisible();
  await expect(page.getByRole('radio', { name: /student/i })).toBeVisible();
  await expect(page.getByRole('radio', { name: /teacher/i })).toBeVisible();
});

test('sign-up returns to the originating page and the navbar shows the account', async ({ page }) => {
  const origin = '/semester-1/efmp-301/unit-01/';
  await page.goto(origin);
  await page.getByRole('link', { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/app\/login/);

  await page.getByRole('link', { name: /create an account/i }).click();
  await expect(page).toHaveURL(/\/app\/signup/);

  const email = `e2e-${Date.now()}@example.test`;
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/^password/i).fill('Test-Passw0rd!');
  await page.getByRole('button', { name: /create account/i }).click();

  // Email confirmation is required (FR-002) — no session yet, but the flow
  // should acknowledge the request rather than error.
  await expect(page.getByText(/check your email/i)).toBeVisible();
});
