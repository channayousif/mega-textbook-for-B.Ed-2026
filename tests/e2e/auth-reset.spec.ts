import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/**
 * T032 [US2] — full reset journey: request -> link -> new password -> sign-in
 * succeeds, old password rejected (FR-004, SC-003).
 *
 * ⚠️ Split into two proofs, discovered necessary while writing this test
 * (2026-07-19), not assumed up front:
 *
 * 1. UI test below: the REQUEST is submitted through the real `/app/reset`
 *    form (`resetPasswordForEmail`) — genuinely reaches GoTrue and triggers a
 *    real send through the production Resend relay (ADR-0006). Asserts the
 *    uniform success message a real user's browser would see.
 * 2. API test below: the click-through/new-password/sign-in-swap mechanics,
 *    exercised via `verifyOtp` + `updateUser` directly rather than clicking
 *    a browser-rendered link. Reason: `admin.generateLink()` can only ever
 *    produce an IMPLICIT-flow link (hash-fragment tokens) — a PKCE `?code=`
 *    link requires a `code_verifier` that only exists in the browser session
 *    which actually called `resetPasswordForEmail`, and that link is the one
 *    that gets emailed — which this environment cannot read back (Resend's
 *    API key is deliberately send-only, and Mailpit no longer receives
 *    anything now that GoTrue's SMTP is globally pointed at Resend, not
 *    per-email-type). Empirically confirmed: navigating a real browser
 *    (`flowType: 'pkce'`, matching production) to a generateLink()
 *    action_link leaves localStorage empty and the hash fragment unconsumed
 *    — supabase-js does not fall back to implicit-flow detection. This is a
 *    property of testing an OTP-email flow without inbox access, not a
 *    product bug — real users hit the PKCE path correctly, verified by code
 *    matching Supabase's own documented PASSWORD_RECOVERY pattern.
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const OLD_PASSWORD = 'Old-Passw0rd!';
const NEW_PASSWORD = 'New-Passw0rd!';

test('reset request: real UI submission reports uniform success (FR-004, no enumeration)', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const email = `e2e-reset-req-${Date.now()}@example.test`;
  const { data: created, error: createError } = await svc.auth.admin.createUser({
    email,
    password: OLD_PASSWORD,
    email_confirm: true,
  });
  expect(createError).toBeNull();

  try {
    await page.goto('/app/reset');
    await page.getByLabel(/email/i).fill(email);
    await page.getByRole('button', { name: /send reset link/i }).click();
    await expect(page.getByText(/we've sent a link/i)).toBeVisible();

    // The exact same success message for a non-existent account — no
    // enumeration signal (contracts/auth-operations.md §A).
    await page.reload();
    await page.getByLabel(/email/i).fill(`definitely-not-registered-${Date.now()}@example.test`);
    await page.getByRole('button', { name: /send reset link/i }).click();
    await expect(page.getByText(/we've sent a link/i)).toBeVisible();
  } finally {
    await svc.auth.admin.deleteUser(created.user!.id);
  }
});

test('reset mechanics: recovery session set-password + sign-in swap (FR-004, SC-003)', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const anon = createClient(SUPABASE_URL!, ANON_KEY!, { auth: { persistSession: false } });
  const email = `e2e-reset-swap-${Date.now()}@example.test`;

  const { data: created, error: createError } = await svc.auth.admin.createUser({
    email,
    password: OLD_PASSWORD,
    email_confirm: true,
  });
  expect(createError).toBeNull();

  try {
    // Same token GoTrue would have put in the real email; verified via the
    // same verifyOtp mechanism supabase-js runs internally when processing a
    // PKCE recovery link (Context7: "token hashes ... support for PKCE flows
    // in server-side authentication").
    const { data: linkData, error: linkError } = await svc.auth.admin.generateLink({
      type: 'recovery',
      email,
    });
    expect(linkError).toBeNull();
    const tokenHash = linkData.properties?.hashed_token;
    expect(tokenHash).toBeTruthy();

    const { data: verifyData, error: verifyError } = await anon.auth.verifyOtp({
      type: 'recovery',
      token_hash: tokenHash!,
    });
    expect(verifyError).toBeNull();
    expect(verifyData.session, 'a recovery link must establish a real session').toBeTruthy();

    // The actual code under test: updateUser({password}) while holding a
    // recovery-type session — exactly what reset.tsx's handleSetPassword does.
    const recoveryClient = createClient(SUPABASE_URL!, ANON_KEY!, { auth: { persistSession: false } });
    await recoveryClient.auth.setSession({
      access_token: verifyData.session!.access_token,
      refresh_token: verifyData.session!.refresh_token,
    });
    const { error: updateError } = await recoveryClient.auth.updateUser({ password: NEW_PASSWORD });
    expect(updateError).toBeNull();

    // Sign-in succeeds with the new password, fails with the old one — through
    // the real UI, a fresh unauthenticated context (no lingering session).
    await page.goto('/app/login');
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/password/i).fill(OLD_PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page.getByText(/not correct/i)).toBeVisible();

    await page.getByLabel(/password/i).fill(NEW_PASSWORD);
    await page.getByRole('button', { name: /^sign in$/i }).click();
    await expect(page).not.toHaveURL(/\/app\/login/);
  } finally {
    await svc.auth.admin.deleteUser(created.user!.id);
  }
});
