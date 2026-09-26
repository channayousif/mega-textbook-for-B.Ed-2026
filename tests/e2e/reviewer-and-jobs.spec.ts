import { test, expect, type Page } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import { deleteUsers } from './_cleanup';

const url = process.env.DOCUSAURUS_SUPABASE_URL;
const anon = process.env.DOCUSAURUS_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
test.skip(!(url && anon && service), 'requires a migrated Supabase test instance');
const password = 'Test-Passw0rd!';

async function signIn(page: Page, email: string) {
  await page.goto('/app/login');
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole('button', { name: /^sign in$/i }).click();
  await expect(page).not.toHaveURL(/\/app\/login/);
}

test('application, direct grant, review decision and job retry are reachable', async ({ browser }) => {
  const svc = createClient(url!, service!, { auth: { persistSession: false } });
  const stamp = Date.now();
  const adminEmail = `admin-review-${stamp}@example.test`;
  const reviewerEmail = `reviewer-${stamp}@example.test`;
  const directEmail = `direct-reviewer-${stamp}@example.test`;
  const admin = await svc.auth.admin.createUser({ email: adminEmail, password, email_confirm: true, user_metadata: { role: 'student' } });
  const reviewer = await svc.auth.admin.createUser({ email: reviewerEmail, password, email_confirm: true, user_metadata: { role: 'teacher' } });
  const direct = await svc.auth.admin.createUser({ email: directEmail, password, email_confirm: true, user_metadata: { role: 'student' } });
  const adminContext = await browser.newContext();
  const reviewerContext = await browser.newContext();
  const adminPage = await adminContext.newPage();
  const reviewerPage = await reviewerContext.newPage();
  try {
    const adminProfile = await svc.from('profiles').select('id').eq('auth_user_id', admin.data.user!.id).single();
    const directProfile = await svc.from('profiles').select('id').eq('auth_user_id', direct.data.user!.id).single();
    await svc.from('profiles').update({ role: 'admin' }).eq('id', adminProfile.data!.id);

    await signIn(reviewerPage, reviewerEmail);
    await reviewerPage.goto('/app/reviewer/apply');
    await reviewerPage.getByLabel('Course').selectOption('EFMP-301');
    await reviewerPage.getByLabel('Qualifications and examples of review work').fill('Completed independent comparator reviews of two B.Ed units.');
    await reviewerPage.getByRole('button', { name: 'Submit application' }).click();
    await expect(reviewerPage.getByText(/Application submitted/)).toBeVisible();

    await signIn(adminPage, adminEmail);
    await adminPage.goto('/app/admin/reviewers');
    await expect(adminPage.getByRole('heading', { name: 'Reviewer applications and scopes' })).toBeVisible();
    const application = adminPage.locator('section').first().locator('tbody tr').filter({ hasText: 'Completed independent comparator reviews' });
    await application.getByRole('button', { name: 'Approve', exact: true }).click();
    await expect(application).toHaveCount(0);
    await adminPage.getByLabel('Account').selectOption(directProfile.data!.id);
    await adminPage.getByLabel('Course').selectOption('EFMP-302');
    await adminPage.getByLabel('Qualification evidence').fill('Qualified through independent review of comparable units.');
    await adminPage.getByRole('button', { name: 'Grant access' }).click();
    await expect(adminPage.getByRole('heading', { name: 'Active grants' })).toBeVisible();

    await reviewerPage.goto('/app/reviewer/workbench');
    await expect(reviewerPage.getByRole('heading', { name: 'Review workbench' })).toBeVisible();
    await reviewerPage.locator('tbody tr').filter({ hasText: 'EFMP-301' }).first().getByRole('button', { name: 'Review' }).click();
    for (const criterion of ['Accuracy and sources','Learning objectives','Pedagogy and examples','Assessment and answer guidance','Language and accessibility']) {
      await reviewerPage.getByLabel(criterion).selectOption(criterion === 'Pedagogy and examples' ? 'fail' : 'pass');
    }
    const comment = `Add a more specific classroom example for this concept ${stamp}.`;
    await reviewerPage.getByLabel('Specific comments and source locations').fill(comment);
    await reviewerPage.getByRole('button', { name: 'Submit recommendation' }).click();
    await expect(reviewerPage.getByText(/Recommendation submitted/)).toBeVisible();

    await adminPage.goto('/app/admin/review-decisions');
    const review = adminPage.locator('article.work-panel').filter({ hasText: comment });
    await expect(review).toBeVisible();
    await review.getByLabel('Decision note').fill('Add the requested classroom example.');
    await review.getByRole('button', { name: 'Request improvement' }).click();
    await expect(review.getByText(/Admin note:/)).toBeVisible();
    await review.getByRole('link', { name: 'Queue an agent improvement' }).click();
    await adminPage.getByLabel('Instructions for the draft PR').fill('Add the classroom example requested by the independent reviewer.');
    await adminPage.getByRole('button', { name: 'Approve and queue' }).click();
    await expect(adminPage.getByText(/Approved job queued/)).toBeVisible();

    const reviewRow = await svc.from('review_submissions').select('id').eq('comments', comment).single();
    const job = await svc.from('agent_jobs').select('id').eq('review_id', reviewRow.data!.id).single();
    const jobCard = adminPage.locator('article.work-panel').filter({ hasText: job.data!.id });
    // claim_agent_job returns an all-null row, not null, when nothing is claimable,
    // so assert the claimed id rather than trusting a non-null `data`.
    const claim1 = await svc.rpc('claim_agent_job', { p_id: job.data!.id });
    expect(claim1.error).toBeNull();
    expect(claim1.data?.id).toBe(job.data!.id);
    const failed = await svc.rpc('report_agent_job', { p_id: job.data!.id, p_token: claim1.data.claim_token, p_status: 'failed', p_error: 'Host agent unavailable.' });
    expect(failed.error).toBeNull();
    await adminPage.reload();
    await expect(jobCard.getByText('Host agent unavailable.')).toBeVisible();
    await jobCard.getByRole('button', { name: 'Retry job' }).click();
    // The retry RPC is async; claiming before it commits finds the job still
    // `failed` and gets the empty row back.
    await expect(adminPage.getByText('Job returned to the approved queue.')).toBeVisible();
    const claim2 = await svc.rpc('claim_agent_job', { p_id: job.data!.id });
    expect(claim2.error).toBeNull();
    expect(claim2.data?.id).toBe(job.data!.id);
    const reported = await svc.rpc('report_agent_job', { p_id: job.data!.id, p_token: claim2.data.claim_token, p_status: 'completed', p_diff: 'Added a specific example.', p_checks: { content: 'pass' }, p_pr_url: 'https://github.com/example/repo/pull/12' });
    expect(reported.error).toBeNull();
    await adminPage.reload();
    await expect(jobCard.getByRole('link', { name: 'Open draft pull request' })).toHaveAttribute('href', 'https://github.com/example/repo/pull/12');
  } finally {
    await adminContext.close(); await reviewerContext.close();
    await deleteUsers(svc, admin.data.user!.id, reviewer.data.user!.id, direct.data.user!.id);
  }
});
