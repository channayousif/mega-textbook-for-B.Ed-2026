import type { Page } from '@playwright/test';

/**
 * Keeps e2e runs from sending real auth email.
 *
 * GoTrue's SMTP is the production Resend relay (ADR-0006), whose plan allows 100
 * emails a day. Sign-up and password-reset requests each send one, to
 * undeliverable `@example.test` addresses, and CI runs e2e on every push to main:
 * on 2026-10-19 that exhausted the quota, which also blocks real readers' sign-up
 * and reset emails until it resets.
 *
 * So by default the browser's /signup and /recover calls are answered here with
 * the shape GoTrue returns when it accepts a request (the user, no session, for a
 * sign-up that needs email confirmation; an empty object for a recovery), and the
 * UI flow is tested without a send. Set E2E_REAL_EMAIL=1 to send for real, e.g.
 * once by hand after an auth or SMTP change.
 */
export const REAL_EMAIL = process.env.E2E_REAL_EMAIL === '1';

export async function stubAuthEmail(page: Page): Promise<void> {
  if (REAL_EMAIL) return;
  await page.route(/\/auth\/v1\/signup(\?|$)/, async (route) => {
    const { email } = route.request().postDataJSON() as { email: string };
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id,
        aud: 'authenticated',
        role: '',
        email,
        confirmation_sent_at: now,
        created_at: now,
        updated_at: now,
        app_metadata: { provider: 'email', providers: ['email'] },
        user_metadata: {},
        identities: [{ id, user_id: id, provider: 'email', identity_data: { email, sub: id } }],
      }),
    });
  });
  await page.route(/\/auth\/v1\/recover(\?|$)/, (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
}
