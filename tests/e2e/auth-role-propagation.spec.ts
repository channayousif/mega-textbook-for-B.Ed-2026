import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/**
 * T041a [US3] — an admin changes a signed-in user's role and grants
 * verified_teacher; on the user's next page load both apply without
 * re-authentication (FR-008, SC-005). Regression guard for research.md R2 —
 * fails if role is ever moved into a JWT claim, since a JWT-cached role would
 * stay stale until the token rotates (potentially minutes to hours), not
 * "next page load".
 *
 * Two browser contexts: the target user stays signed in throughout (same
 * session, no new sign-in) while a SEPARATE admin session drives the change
 * through the real admin/users.tsx UI — not a service-role shortcut, so this
 * proves the actual product surface an admin would use.
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';

test('role + verified_teacher changes apply on next load without re-authentication', async ({ browser }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });

  const targetEmail = `e2e-propagation-target-${Date.now()}@example.test`;
  const { data: target } = await svc.auth.admin.createUser({
    email: targetEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
  });

  const adminEmail = `e2e-propagation-admin-${Date.now()}@example.test`;
  const { data: admin } = await svc.auth.admin.createUser({ email: adminEmail, password: PASSWORD, email_confirm: true });
  await svc.from('profiles').update({ role: 'admin' }).eq('auth_user_id', admin.user!.id);

  const targetContext = await browser.newContext();
  const adminContext = await browser.newContext();
  const targetPage = await targetContext.newPage();
  const adminPage = await adminContext.newPage();

  try {
    // Target user signs in — this is the session that must stay valid
    // throughout, with no second sign-in anywhere in this test.
    await targetPage.goto('/app/login');
    await targetPage.getByLabel(/email/i).fill(targetEmail);
    await targetPage.getByLabel(/password/i).fill(PASSWORD);
    await targetPage.getByRole('button', { name: /^sign in$/i }).click();
    await expect(targetPage).not.toHaveURL(/\/app\/login/);

    await targetPage.goto('/app/profile');
    // Before the change: role prompt or student role, never teacher/verified.
    await expect(targetPage.getByText(/^teacher$/)).toHaveCount(0);

    // Separate admin session drives the actual change through the real UI.
    await adminPage.goto('/app/login');
    await adminPage.getByLabel(/email/i).fill(adminEmail);
    await adminPage.getByLabel(/password/i).fill(PASSWORD);
    await adminPage.getByRole('button', { name: /^sign in$/i }).click();
    await expect(adminPage).not.toHaveURL(/\/app\/login/);

    await adminPage.goto('/app/admin/users');
    const targetRow = adminPage.locator('tr', { has: adminPage.getByText(targetEmail) });
    await expect(targetRow).toBeVisible();
    await targetRow.getByRole('combobox').selectOption('teacher');
    // Let the optimistic re-fetch settle before the checkbox click, since both
    // trigger a `load()` and a race would make the second overwrite the first.
    await expect(targetRow.getByRole('combobox')).toHaveValue('teacher');
    // Name the checkbox. The row carried exactly one until Spec 017 added the
    // `reviewer` capability toggle beside `verified_teacher`, at which point a
    // bare getByRole('checkbox') became a strict-mode violation. This test is
    // about verified_teacher propagation specifically, so it says so.
    const verifiedTeacherToggle = targetRow.getByRole('checkbox', { name: /^Verified teacher for / });
    // .click() rather than .check(): the checkbox is a controlled component
    // that briefly reverts to its old value between the native click and the
    // async update+reload resolving, and .check()'s strict "did it change"
    // sampling can land in that flicker window. toBeChecked() below retries.
    await verifiedTeacherToggle.click();
    await expect(verifiedTeacherToggle).toBeChecked();

    // The reviewer toggle beside it must be untouched by that click: the two
    // capabilities are orthogonal (Art. V.3, ADR-0005), and a UI that granted
    // both from one click would be a real defect rather than a test artefact.
    await expect(targetRow.getByRole('checkbox', { name: /^Reviewer capability for / })).not.toBeChecked();

    // Target user's session is untouched — reload only, no sign-in call.
    await targetPage.reload();
    await expect(targetPage.getByText(/^teacher$/)).toBeVisible();
    // The only "Yes" on the page — the verified-teacher <dd> (role's own value
    // is "student"/"teacher"/"admin", never this literal string).
    await expect(targetPage.getByText('Yes', { exact: true })).toBeVisible();
  } finally {
    await targetContext.close();
    await adminContext.close();
    await svc.auth.admin.deleteUser(target.user!.id);
    await svc.auth.admin.deleteUser(admin.user!.id);
  }
});
