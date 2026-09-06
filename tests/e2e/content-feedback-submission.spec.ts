import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/**
 * T017 [US2] — as a signed-in reader on a topic-NN.mdx page, submits
 * whole-page feedback and, separately, selects a sentence and submits
 * passage feedback, in both `en` and `ur`, and on a small viewport - each
 * submission timed under 30 seconds by the test clock (SC-003;
 * `/sp.analyze` finding G3); confirms a signed-out visitor sees no feedback
 * control at all on the same page (FR-010-013; US2 AS1-3).
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';
const TOPIC_PATH = '/semester-1/efmp-302/unit-01/topic-01';
const TOPIC_PATH_UR = '/ur/semester-1/efmp-302/unit-01/topic-01';

async function signIn(page: import('@playwright/test').Page, email: string): Promise<void> {
  await page.goto('/app/login');
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(PASSWORD);
  await page.getByRole('button', { name: /^sign in$/i }).click();
  await expect(page).not.toHaveURL(/\/app\/login/);
}

/** Selects the first body paragraph's full text and opens the feedback form in one JS
 * execution (a real Playwright click after a separate `evaluate` risks the browser
 * collapsing the selection on the intervening mousedown). Waits for the button first - it
 * only renders once AuthContext has asynchronously resolved the signed-in role. */
async function selectFirstParagraphAndOpenFeedback(page: import('@playwright/test').Page): Promise<void> {
  await page.getByTestId('content-feedback-button').waitFor();
  await page.evaluate(() => {
    const p = document.querySelector('.markdown p');
    if (!p) throw new Error('no paragraph found to select');
    const range = document.createRange();
    range.selectNodeContents(p);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    (document.querySelector('[data-testid="content-feedback-button"]') as HTMLButtonElement)?.click();
  });
}

test('a reader submits whole-page and passage feedback in both locales and on a small viewport; a signed-out visitor sees no control', async ({ browser }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const email = `e2e-content-feedback-${tag}@example.test`;
  const { data: user } = await svc.auth.admin.createUser({
    email, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Signed-out visitor sees no feedback control at all.
    await page.goto(TOPIC_PATH);
    await expect(page.getByTestId('content-feedback-button')).toHaveCount(0);

    await signIn(page, email);

    // Whole-page feedback, EN, default viewport.
    await page.goto(TOPIC_PATH);
    let start = Date.now();
    await page.getByTestId('content-feedback-button').click();
    await page.getByTestId('content-feedback-comment-textarea').fill('This page could use a clearer example.');
    await page.getByTestId('content-feedback-submit-button').click();
    await expect(page.getByTestId('content-feedback-submitted')).toBeVisible();
    expect(Date.now() - start).toBeLessThan(30_000);

    // Passage feedback, EN, small viewport (360px).
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(TOPIC_PATH);
    start = Date.now();
    await selectFirstParagraphAndOpenFeedback(page);
    await expect(page.getByTestId('content-feedback-quoted-passage')).toBeVisible();
    await page.getByTestId('content-feedback-comment-textarea').fill('This passage is confusing.');
    await page.getByTestId('content-feedback-submit-button').click();
    await expect(page.getByTestId('content-feedback-submitted')).toBeVisible();
    expect(Date.now() - start).toBeLessThan(30_000);
    await page.setViewportSize({ width: 1280, height: 800 });

    // Whole-page feedback, UR/RTL.
    await page.goto(TOPIC_PATH_UR);
    start = Date.now();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await page.getByTestId('content-feedback-button').click();
    await page.getByTestId('content-feedback-comment-textarea').fill('یہ صفحہ واضح نہیں ہے۔');
    await page.getByTestId('content-feedback-submit-button').click();
    await expect(page.getByTestId('content-feedback-submitted')).toBeVisible();
    expect(Date.now() - start).toBeLessThan(30_000);

    const { data: profile } = await svc.from('profiles').select('id').eq('auth_user_id', user.user!.id).single();
    const { data: filed } = await svc.from('content_feedback').select('*').eq('author_id', profile!.id);
    expect(filed).toHaveLength(3);
  } finally {
    const { data: profile } = await svc.from('profiles').select('id').eq('auth_user_id', user.user!.id).single();
    if (profile) await svc.from('content_feedback').delete().eq('author_id', profile.id);
    await svc.auth.admin.deleteUser(user.user!.id);
    await context.close();
  }
});
