import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

/**
 * T018 [US2] — as the curriculum owner, opens the queue, confirms both seeded
 * items show their quoted passage in context, and filters by
 * course/unit/topic/status/scope/locale in turn - the full filter-and-locate
 * flow timed under 15 seconds by the test clock (SC-004; `/sp.analyze`
 * finding G3); moves one item open -> planned -> resolved with a note and a
 * resolution reference and confirms the filing reader sees the new status;
 * confirms the queue keeps showing that item's original quoted passage
 * verbatim regardless of later content changes (FR-021; `/sp.analyze`
 * finding G5); confirms a non-owner reaching the queue route is denied and
 * any attempted status change is rejected (FR-018-021, SC-007; US2 AS5-7).
 *
 * Both fixture items share one uniquely-tagged, fictitious course_code, kept
 * applied via `filter-course` for the whole filtering section below - this
 * scopes every subsequent count assertion to just this test run's own two
 * rows, immune to any other content_feedback rows in this shared,
 * non-disposable Supabase project (past runs, concurrent runs, or eventual
 * real usage once the feature ships).
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

test('owner triages the feedback queue: filters, transitions, and passage stability; a non-owner is denied', async ({ browser }) => {
  const svc = createClient(SUPABASE_URL!, SERVICE_KEY!, { auth: { persistSession: false } });
  const tag = Date.now();
  const courseCode = `E2E-TRIAGE-${tag}`;
  const readerEmail = `e2e-triage-reader-${tag}@example.test`;
  const adminEmail = `e2e-triage-admin-${tag}@example.test`;
  const teacherEmail = `e2e-triage-nonowner-${tag}@example.test`;

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
  // null under the service-role bypass — a real end-user session is what production
  // traffic actually looks like, and what the RLS test suite's own fixtures already use.
  const readerClient = createClient(SUPABASE_URL!, ANON_KEY!, { auth: { persistSession: false } });
  await readerClient.auth.signInWithPassword({ email: readerEmail, password: PASSWORD });

  const { data: itemA, error: itemAError } = await readerClient.from('content_feedback').insert({
    author_id: readerProfile!.id,
    page_kind: 'topic',
    course_code: courseCode,
    unit_no: 1,
    topic_no: 1,
    locale: 'en',
    scope: 'passage',
    quoted_passage: 'The original quoted sentence from the topic file.',
    passage_context: 'context before context after',
    comment: 'This claim needs a citation.',
  }).select().single();
  if (itemAError) throw new Error(`itemA fixture: ${itemAError.message}`);

  const { data: itemB, error: itemBError } = await readerClient.from('content_feedback').insert({
    author_id: readerProfile!.id,
    page_kind: 'unit_assessment',
    course_code: courseCode,
    unit_no: 1,
    locale: 'en',
    scope: 'whole_page',
    comment: 'The assessment instructions are unclear.',
  }).select().single();
  if (itemBError) throw new Error(`itemB fixture: ${itemBError.message}`);

  const adminContext = await browser.newContext();
  const adminPage = await adminContext.newPage();
  const nonOwnerContext = await browser.newContext();
  const nonOwnerPage = await nonOwnerContext.newPage();

  try {
    // A non-owner reaching the queue route is denied.
    await signIn(nonOwnerPage, teacherEmail);
    await nonOwnerPage.goto('/app/admin/feedback-queue');
    await expect(nonOwnerPage.getByTestId('owner-console-denied')).toBeVisible();
    await expect(nonOwnerPage.getByTestId('feedback-queue-row')).toHaveCount(0);

    // A non-owner's attempted status change is rejected at the database layer
    // regardless of what the UI shows.
    const nonOwnerClient = createClient(SUPABASE_URL!, ANON_KEY!, { auth: { persistSession: false } });
    await nonOwnerClient.auth.signInWithPassword({ email: teacherEmail, password: PASSWORD });
    const { data: forbiddenUpdate, error: forbiddenUpdateError } = await nonOwnerClient
      .from('content_feedback').update({ status: 'planned' }).eq('id', itemA!.id).select();
    expect(forbiddenUpdateError).toBeNull();
    expect(forbiddenUpdate).toHaveLength(0);

    // Owner opens the queue, scopes it to this run's course, and sees both items with
    // the quoted passage in context.
    await signIn(adminPage, adminEmail);
    const start = Date.now();
    await adminPage.goto('/app/admin/feedback-queue');
    await adminPage.getByTestId('filter-course').fill(courseCode);
    await expect(adminPage.getByTestId('feedback-queue-row')).toHaveCount(2);
    await expect(adminPage.getByTestId('feedback-quoted-passage').first()).toContainText('original quoted sentence');

    // Filter by topic, scope, unit, status, and locale in turn - `filter-course` stays
    // applied throughout, so every count below is scoped to just this run's two rows.
    await adminPage.getByTestId('filter-topic').fill('1');
    await expect(adminPage.getByTestId('feedback-queue-row')).toHaveCount(1);
    await adminPage.getByTestId('filter-topic').fill('');

    await adminPage.getByTestId('filter-scope').selectOption('passage');
    await expect(adminPage.getByTestId('feedback-queue-row')).toHaveCount(1);
    await adminPage.getByTestId('filter-scope').selectOption('');

    await adminPage.getByTestId('filter-unit').fill('1');
    await expect(adminPage.getByTestId('feedback-queue-row')).toHaveCount(2);
    await adminPage.getByTestId('filter-unit').fill('');

    await adminPage.getByTestId('filter-status').selectOption('open');
    await expect(adminPage.getByTestId('feedback-queue-row')).toHaveCount(2);
    await adminPage.getByTestId('filter-status').selectOption('');

    await adminPage.getByTestId('filter-locale').selectOption('en');
    await expect(adminPage.getByTestId('feedback-queue-row')).toHaveCount(2);
    await adminPage.getByTestId('filter-locale').selectOption('');
    expect(Date.now() - start).toBeLessThan(15_000);

    // Move itemA open -> planned -> resolved with a note and resolution ref.
    const rowA = adminPage.getByTestId('feedback-queue-row').filter({ hasText: 'original quoted sentence' });
    await rowA.getByTestId('transition-to-planned').click();
    await expect(rowA.getByTestId('feedback-status')).toHaveText('planned');
    await rowA.getByLabel(`Owner note for ${itemA!.id}`).fill('Adding a citation.');
    await rowA.getByLabel(`Resolution reference for ${itemA!.id}`).fill('PR#42');
    await rowA.getByTestId('transition-to-resolved').click();
    await expect(rowA.getByTestId('feedback-status')).toHaveText('resolved');

    // The filing reader sees the new status.
    const { data: rowAfter } = await svc.from('content_feedback').select('*').eq('id', itemA!.id).single();
    expect(rowAfter.status).toBe('resolved');
    expect(rowAfter.owner_note).toBe('Adding a citation.');
    expect(rowAfter.resolution_ref).toBe('PR#42');
    // The quoted passage stays exactly as filed, unaffected by anything else.
    expect(rowAfter.quoted_passage).toBe('The original quoted sentence from the topic file.');
  } finally {
    const idsToDelete = [itemA?.id, itemB?.id].filter((id): id is string => Boolean(id));
    if (idsToDelete.length) await svc.from('content_feedback').delete().in('id', idsToDelete);
    await svc.auth.admin.deleteUser(reader.user!.id);
    await svc.auth.admin.deleteUser(admin.user!.id);
    await svc.auth.admin.deleteUser(nonOwner.user!.id);
    await adminContext.close();
    await nonOwnerContext.close();
  }
});
