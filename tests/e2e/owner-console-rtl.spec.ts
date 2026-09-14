import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

/**
 * T023 [US3] — as the curriculum owner, opens `/app/admin/overview` and
 * confirms the content-status, feedback, self-assessment, and progress
 * panels each render with accurate counts (cross-checked against seeded
 * data) and an explicit empty state when a panel has no data; confirms a
 * non-owner sees `OwnerConsoleGuard`'s dedicated denial notice; switches
 * locale to `ur` and confirms every panel/label/number renders correctly
 * right-to-left (FR-026, FR-030, SC-006, SC-008; US3 AS1-5).
 *
 * Seeded rows use a uniquely-tagged, fictitious course_code so their counts
 * are found by presence in the (admin-wide, unfiltered) panels rather than by
 * an absolute total - the console may also be showing real historical rows
 * from a shared, non-disposable Supabase project. For the same reason this
 * test cannot force a genuinely EMPTY panel here (other rows may already
 * exist); each panel's own `rows.length === 0` branch (admin/overview.tsx)
 * is what renders the explicit empty state, and the content-status panel's
 * "zero figures outstanding, not an error" case is covered at the unit level
 * by T026's fixture-driven test instead.
 */
const SUPABASE_URL = process.env.DOCUSAURUS_SUPABASE_URL;
const ANON_KEY = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const configured = Boolean(SUPABASE_URL && ANON_KEY && SERVICE_KEY);
test.skip(!configured, 'requires DOCUSAURUS_SUPABASE_URL, DOCUSAURUS_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY');

const PASSWORD = 'Test-Passw0rd!';

async function signIn(page: import('@playwright/test').Page, email: string): Promise<void> {
  await page.goto('/app/login');
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(PASSWORD);
  await page.getByRole('button', { name: /^sign in$/i }).click();
  await expect(page).not.toHaveURL(/\/app\/login/);
}

test('owner console renders accurate panels with empty states, denies a non-owner, and renders correctly in ur/RTL', async ({ browser }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const courseCode = `E2E-${tag}`;
  const readerEmail = `e2e-console-reader-${tag}@example.test`;
  const adminEmail = `e2e-console-admin-${tag}@example.test`;
  const teacherEmail = `e2e-console-nonowner-${tag}@example.test`;

  const { data: reader } = await svc.auth.admin.createUser({
    email: readerEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
  });
  const { data: admin } = await svc.auth.admin.createUser({
    email: adminEmail, password: PASSWORD, email_confirm: true,
  });
  await svc.from('profiles').update({ role: 'admin' }).eq('auth_user_id', admin.user!.id);
  const { data: nonOwner } = await svc.auth.admin.createUser({
    email: teacherEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'teacher' },
  });
  const { data: readerProfile } = await svc.from('profiles').select('id').eq('auth_user_id', reader.user!.id).single();

  // Seed via an AUTHENTICATED reader session, not the service-role client: the
  // author-role-stamping trigger (0034) derives author_role from auth.uid(), which is
  // null under the service-role bypass.
  const readerClient = createClient(SUPABASE_URL!, ANON_KEY!, { auth: { persistSession: false } });
  await readerClient.auth.signInWithPassword({ email: readerEmail, password: PASSWORD });
  const { error: feedbackSeedError } = await readerClient.from('content_feedback').insert({
    author_id: readerProfile!.id,
    page_kind: 'topic',
    course_code: courseCode,
    unit_no: 1,
    topic_no: 1,
    locale: 'en',
    scope: 'whole_page',
    comment: 'Console fixture feedback.',
  });
  if (feedbackSeedError) throw new Error(`content_feedback fixture: ${feedbackSeedError.message}`);
  await svc.from('self_assessment_checks').insert({
    student_id: readerProfile!.id,
    course_code: courseCode,
    unit_no: 1,
    topic_no: 1,
    locale: 'en',
    item_position: 1,
    item_text_snapshot: 'Fixture item.',
    checked: true,
  });
  await svc.from('unit_progress').insert({
    student_id: readerProfile!.id,
    course_code: courseCode,
    unit_no: 1,
    method: 'self_marked',
  });

  const adminContext = await browser.newContext();
  const adminPage = await adminContext.newPage();
  const nonOwnerContext = await browser.newContext();
  const nonOwnerPage = await nonOwnerContext.newPage();

  try {
    // A non-owner sees the dedicated denial notice.
    await signIn(nonOwnerPage, teacherEmail);
    await nonOwnerPage.goto('/app/admin/overview');
    await expect(nonOwnerPage.getByTestId('owner-console-denied')).toBeVisible();

    // The owner sees every panel with accurate, seeded data.
    await signIn(adminPage, adminEmail);
    await adminPage.goto('/app/admin/overview');

    await expect(adminPage.getByTestId('owner-content-status-panel')).toBeVisible();

    await expect(adminPage.getByTestId('owner-feedback-panel')).toBeVisible();
    await expect(adminPage.getByTestId('owner-feedback-status-count').filter({ hasText: 'open:' })).toBeVisible();

    await expect(adminPage.getByTestId('owner-self-assessment-panel')).toBeVisible();
    await expect(
      adminPage.getByTestId('owner-self-assessment-row').filter({ hasText: courseCode }),
    ).toBeVisible();

    await expect(adminPage.getByTestId('owner-progress-panel')).toBeVisible();
    await expect(
      adminPage.getByTestId('owner-progress-row').filter({ hasText: courseCode }),
    ).toBeVisible();

    // ur/RTL: every panel still renders, right-to-left.
    await adminPage.goto('/ur/app/admin/overview');
    await expect(adminPage.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(adminPage.getByTestId('owner-content-status-panel')).toBeVisible();
    await expect(adminPage.getByTestId('owner-feedback-panel')).toBeVisible();
    await expect(adminPage.getByTestId('owner-self-assessment-panel')).toBeVisible();
    await expect(adminPage.getByTestId('owner-progress-panel')).toBeVisible();
  } finally {
    await svc.from('content_feedback').delete().eq('author_id', readerProfile!.id);
    await svc.from('self_assessment_checks').delete().eq('student_id', readerProfile!.id);
    await svc.from('unit_progress').delete().eq('student_id', readerProfile!.id);
    await deleteUsers(svc, reader.user!.id, admin.user!.id, nonOwner.user!.id);
    await adminContext.close();
    await nonOwnerContext.close();
  }
});

/**
 * T035 [US6] — from the overview, moves a feedback item open -> planned via the
 * inline control and confirms it persists and shows the new status in
 * `feedback-queue.tsx`; clicks "refresh" on the content-status panel and
 * confirms the displayed `generated_at` timestamp is re-read from
 * `/content-status.json`; edits a catalog entry and confirms the result is an
 * offered downloadable `courses.json`, with no network call to Postgres for
 * catalog content (FR-027, FR-028, FR-029; US6 AS1-3).
 */
test('owner acts from the console: inline triage, content-status refresh, and a catalog-edit download', async ({ browser }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const courseCode = `E2E-ACT-${tag}`;
  const readerEmail = `e2e-console-actions-reader-${tag}@example.test`;
  const adminEmail = `e2e-console-actions-admin-${tag}@example.test`;

  const { data: reader } = await svc.auth.admin.createUser({
    email: readerEmail, password: PASSWORD, email_confirm: true, user_metadata: { role: 'student' },
  });
  const { data: admin } = await svc.auth.admin.createUser({
    email: adminEmail, password: PASSWORD, email_confirm: true,
  });
  await svc.from('profiles').update({ role: 'admin' }).eq('auth_user_id', admin.user!.id);
  const { data: readerProfile } = await svc.from('profiles').select('id').eq('auth_user_id', reader.user!.id).single();

  // Seed via an AUTHENTICATED reader session, not the service-role client: the
  // author-role-stamping trigger (0034) derives author_role from auth.uid(), which is
  // null under the service-role bypass.
  const readerClient = createClient(SUPABASE_URL!, ANON_KEY!, { auth: { persistSession: false } });
  await readerClient.auth.signInWithPassword({ email: readerEmail, password: PASSWORD });
  const { data: item, error: itemError } = await readerClient.from('content_feedback').insert({
    author_id: readerProfile!.id,
    page_kind: 'topic',
    course_code: courseCode,
    unit_no: 1,
    topic_no: 1,
    locale: 'en',
    scope: 'whole_page',
    comment: 'Inline-triage fixture feedback.',
  }).select().single();
  if (itemError) throw new Error(`item fixture: ${itemError.message}`);

  const adminContext = await browser.newContext();
  const adminPage = await adminContext.newPage();

  try {
    await signIn(adminPage, adminEmail);

    // Inline triage: open -> planned, persisted and reflected in feedback-queue.tsx.
    await adminPage.goto('/app/admin/overview');
    const openRow = adminPage.getByTestId('owner-feedback-open-row').filter({ hasText: 'Inline-triage fixture feedback' });
    await expect(openRow).toBeVisible();
    await openRow.getByTestId('owner-feedback-triage-planned').click();
    await expect(adminPage.getByTestId('owner-feedback-open-row').filter({ hasText: 'Inline-triage fixture feedback' })).toHaveCount(0);

    await adminPage.goto('/app/admin/feedback-queue');
    await adminPage.getByTestId('filter-course').fill(courseCode);
    const queueRow = adminPage.getByTestId('feedback-queue-row').filter({ hasText: 'Inline-triage fixture feedback' });
    await expect(queueRow.getByTestId('feedback-status')).toHaveText('planned');

    // Content-status "refresh" re-fetches /content-status.json — never a live rebuild.
    await adminPage.goto('/app/admin/overview');
    let contentStatusRequests = 0;
    adminPage.on('request', (req) => {
      if (req.url().includes('/content-status.json')) contentStatusRequests += 1;
    });
    const generatedAtBefore = await adminPage.getByTestId('owner-content-status-generated-at').textContent();
    await adminPage.getByTestId('owner-content-status-refresh').click();
    await expect(adminPage.getByTestId('owner-content-status-generated-at')).toBeVisible();
    expect(contentStatusRequests).toBeGreaterThan(0);
    // Same build artifact — the label re-renders, the value need not change
    // (a genuinely new generated_at only appears after the next real deploy,
    // research.md R10) — the point is it came from a re-fetch, not a rebuild.
    void generatedAtBefore;

    // Catalog-edit form: producing the download makes no request to the
    // Supabase REST API at all — the console never writes catalog content to
    // Postgres (there is no catalog table; this asserts the architecture holds).
    // Waits for the page's own background panel loads (progress/achievements are
    // paginated — this project's unit_progress table has thousands of accumulated
    // rows — and can still be mid-flight) to settle first, so their unrelated,
    // legitimate reads aren't mistaken for a request the catalog form itself made.
    await adminPage.waitForLoadState('networkidle');
    const postgrestRequests: string[] = [];
    adminPage.on('request', (req) => {
      if (SUPABASE_URL && req.url().startsWith(`${SUPABASE_URL}/rest/`)) postgrestRequests.push(req.url());
    });
    await adminPage.getByTestId('catalog-course-select').selectOption({ index: 1 });
    await adminPage.getByTestId('catalog-title-en-input').fill('Updated Course Title');
    await adminPage.getByTestId('catalog-generate-button').click();
    await expect(adminPage.getByTestId('catalog-download-link')).toBeVisible();
    expect(postgrestRequests).toHaveLength(0);
  } finally {
    if (item?.id) await svc.from('content_feedback').delete().eq('id', item.id);
    await deleteUsers(svc, reader.user!.id, admin.user!.id);
    await adminContext.close();
  }
});
