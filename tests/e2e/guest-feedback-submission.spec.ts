import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'node:crypto';

/**
 * Spec 010 follow-up (2026-09-07) — a signed-out visitor now sees the same "Give
 * feedback" control a signed-in reader does (Footer.tsx, gated on `!loading && !session`
 * rather than excluding every signed-out visitor outright), with an email field and an
 * explanation that a confirmation click is needed before it reaches the queue.
 *
 * Does NOT click the real submit button: that calls guest-feedback-submit, a live Edge
 * Function that sends a real email through the production Resend relay (ADR-0006) on
 * every call - fine to verify once by hand (already done, see this feature's PHR), not
 * something an automated suite should trigger on every run (repeated bounces to a
 * necessarily-fake e2e address are exactly the kind of pattern that damages a sending
 * domain's reputation over time). The pre-submit UI surface is fully exercised here
 * instead; the confirm-feedback page below is tested against a row seeded directly (no
 * Edge Function call, no email), the same "seed via an authenticated/service client, not
 * the real write path" precedent every other e2e fixture in this suite already follows
 * for its own non-essential side effects.
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const TOPIC_PATH = '/semester-1/efmp-302/unit-01/topic-01';

test('a signed-out visitor sees the guest feedback control with guidance and an email field', async ({ page }) => {
  await page.goto(TOPIC_PATH);
  await expect(page.getByTestId('content-feedback-selection-hint')).toBeVisible();
  await expect(page.getByTestId('content-feedback-button')).toBeVisible();

  await page.getByTestId('content-feedback-button').click();
  await expect(page.getByTestId('content-feedback-email-input')).toBeVisible();
  await expect(page.getByTestId('content-feedback-guest-explain')).toBeVisible();
  // The comment field and submit button are the same ones a signed-in reader
  // gets - only the email field is guest-specific.
  await expect(page.getByTestId('content-feedback-comment-textarea')).toBeVisible();
  await expect(page.getByTestId('content-feedback-submit-button')).toBeVisible();

  // Native `type="email"`/`required` reject an empty or malformed address before
  // any network call - fill a valid-looking one and confirm the field accepts it,
  // without actually submitting (see file-level comment).
  await page.getByTestId('content-feedback-email-input').fill('a-guest@example.test');
  await expect(page.getByTestId('content-feedback-email-input')).toHaveValue('a-guest@example.test');
});

test('confirm-feedback: a real token confirms once and shows success; a bogus token shows invalid', async ({ page }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const email = `e2e-guest-confirm-${tag}@example.test`;
  const token = randomUUID();

  const { data: row, error: insertError } = await svc.from('content_feedback').insert({
    author_id: null,
    page_kind: 'topic',
    course_code: `E2E-GUEST-${tag}`,
    unit_no: 1,
    topic_no: 1,
    locale: 'en',
    scope: 'whole_page',
    comment: 'Seeded directly for the confirm-feedback page test - no Edge Function call.',
    guest_email: email,
    guest_confirmation_token: token,
  }).select().single();
  if (insertError) throw new Error(`fixture insert: ${insertError.message}`);

  try {
    // The trailing slash BEFORE the query string is load-bearing, not style: this
    // site's `trailingSlash: true` build 301s `/app/confirm-feedback?...` (no slash)
    // to `/app/confirm-feedback/` with the query string dropped entirely - verified
    // directly against a served build (`Location: /app/confirm-feedback/`, no
    // `?token=...`). guest-feedback-submit's own emailed link already includes it;
    // this test has to reach the same URL its own way.

    // Real token - confirms and shows success.
    await page.goto(`/app/confirm-feedback/?token=${token}&locale=en`);
    await expect(page.getByTestId('confirm-feedback-message')).toContainText('confirmed');
    const { data: afterConfirm } = await svc.from('content_feedback').select('guest_confirmed_at').eq('id', row.id).single();
    expect(afterConfirm?.guest_confirmed_at).not.toBeNull();

    // Same token again - already used.
    await page.goto(`/app/confirm-feedback/?token=${token}&locale=en`);
    await expect(page.getByTestId('confirm-feedback-message')).toContainText(/invalid|already/);

    // A bogus token - also invalid, not an error.
    await page.goto(`/app/confirm-feedback/?token=${randomUUID()}&locale=en`);
    await expect(page.getByTestId('confirm-feedback-message')).toContainText(/invalid|already/);
  } finally {
    await svc.from('content_feedback').delete().eq('id', row.id);
  }
});
