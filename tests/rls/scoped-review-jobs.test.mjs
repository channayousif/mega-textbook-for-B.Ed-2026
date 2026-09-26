import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, adminSet, getProfileByAuthId, serviceClient, cleanupUsers } from './_helpers.mjs';
import { randomUUID } from 'node:crypto';

describe.skipIf(!rlsConfigured)('scoped review and approved agent jobs', () => {
  const created = [];
  afterAll(async () => { await cleanupUsers(created); });

  test('application, scope, recommendation, admin decision and retry stay server-authoritative', async () => {
    const admin = await createSignedInUser({ role: 'student' }); created.push(admin.authUserId);
    await adminSet(admin.authUserId, { role: 'admin' });
    const adminProfile = await getProfileByAuthId(admin.authUserId);
    const reviewer = await createSignedInUser({ role: 'teacher' }); created.push(reviewer.authUserId);
    const outsider = await createSignedInUser({ role: 'teacher' }); created.push(outsider.authUserId);
    const reviewerProfile = await getProfileByAuthId(reviewer.authUserId);
    const outsiderProfile = await getProfileByAuthId(outsider.authUserId);

    const deniedGrant = await reviewer.client.rpc('grant_reviewer_scope', {
      p_subject: reviewerProfile.id, p_track: 'bed', p_course: 'EFMP-301',
      p_evidence: 'This is a sufficiently long qualification note.',
    });
    expect(deniedGrant.error).toBeTruthy();
    const deniedCatalogSync = await reviewer.client.rpc('sync_review_course_scopes', { p_codes: ['TEST-999'] });
    expect(deniedCatalogSync.error).toBeTruthy();
    const deniedClassAction = await reviewer.client.rpc('admin_set_class_status', { p_id: randomUUID(), p_archive: true, p_note: 'No admin role.' });
    expect(deniedClassAction.error).toBeTruthy();

    const applied = await reviewer.client.from('reviewer_applications').insert({
      applicant_id: reviewerProfile.id, track: 'bed', course_code: 'EFMP-301',
      qualification_evidence: 'Two comparator units reviewed against the approved rubric.',
    }).select('id').single();
    expect(applied.error).toBeNull();
    const otherRead = await outsider.client.from('reviewer_applications').select('id').eq('id', applied.data.id);
    expect(otherRead.data).toEqual([]);

    const approved = await admin.client.rpc('decide_reviewer_application', { p_id: applied.data.id, p_approve: true, p_note: 'Comparator review passed.' });
    expect(approved.error).toBeNull();
    const ownScope = await reviewer.client.rpc('has_review_scope', { p_track: 'bed', p_course: 'EFMP-301' });
    expect(ownScope.data).toBe(true);
    const wrongCourse = await reviewer.client.rpc('has_review_scope', { p_track: 'bed', p_course: 'EFMP-302' });
    expect(wrongCourse.data).toBe(false);
    const wrongTrack = await reviewer.client.rpc('has_review_scope', { p_track: 'licence', p_course: null });
    expect(wrongTrack.data).toBe(false);

    const direct = await admin.client.rpc('grant_reviewer_scope', {
      p_subject: outsiderProfile.id, p_track: 'licence', p_course: null,
      p_evidence: 'Qualified on independent teaching licence page comparisons.',
    });
    expect(direct.error).toBeNull();
    const licenceScope = await outsider.client.rpc('has_review_scope', { p_track: 'licence', p_course: null });
    expect(licenceScope.data).toBe(true);

    const base = { reviewer_id: reviewerProfile.id, track: 'bed', unit_no: 1, topic_no: 1,
      stage: 'topic', criteria: {
        'Accuracy and sources': 'pass', 'Learning objectives': 'pass',
        'Pedagogy and examples': 'fail', 'Assessment and answer guidance': 'pass',
        'Language and accessibility': 'pass',
      }, comments: 'The explanation needs a clearer classroom example.',
      recommendation: 'improve' };
    const crossScope = await reviewer.client.from('review_submissions').insert({ ...base, course_code: 'EFMP-302' });
    expect(crossScope.error).toBeTruthy();
    const submitted = await reviewer.client.from('review_submissions').insert({ ...base, course_code: 'EFMP-301' }).select('id').single();
    expect(submitted.error).toBeNull();
    const licenceReview = await outsider.client.from('review_submissions').insert({
      reviewer_id: outsiderProfile.id, track: 'licence', course_code: null, unit_no: null,
      topic_no: null, page_slug: '/licence/pedagogy/c-classroom-management/', stage: 'licence',
      criteria: { ...base.criteria, 'Pedagogy and examples': 'pass' },
      comments: 'The lesson example is appropriate for the licence heading.', recommendation: 'approve',
    });
    expect(licenceReview.error).toBeNull();
    const outsiderBedReview = await outsider.client.from('review_submissions').insert({ ...base, reviewer_id: outsiderProfile.id, course_code: 'EFMP-301' });
    expect(outsiderBedReview.error).toBeTruthy();
    const outsiderReviews = await outsider.client.from('review_submissions').select('id').eq('id', submitted.data.id);
    expect(outsiderReviews.data).toEqual([]);
    const deniedDecision = await reviewer.client.rpc('decide_review', { p_id: submitted.data.id, p_decision: 'improve', p_note: 'Needs a new example.' });
    expect(deniedDecision.error).toBeTruthy();
    const decision = await admin.client.rpc('decide_review', { p_id: submitted.data.id, p_decision: 'improve', p_note: 'Needs a new example.' });
    expect(decision.error).toBeNull();
    const deniedHistory = await outsider.client.from('admin_action_history').select('id').limit(1);
    expect(deniedHistory.data).toEqual([]);
    const decisionAudit = await admin.client.from('admin_action_history').select('actor_id,action')
      .eq('target_id', submitted.data.id).eq('action','review_improve').single();
    expect(decisionAudit.data).toMatchObject({ actor_id: adminProfile.id, action: 'review_improve' });

    const suggested = await reviewer.client.from('improvement_suggestions').insert({
      teacher_id: reviewerProfile.id, page_slug: '/semester-1/efmp-301/unit-01/topic-01',
      locale: 'en', course_code: 'EFMP-301', unit_no: 1, category: 'clarity',
      body: 'The same example could be more explicit.',
    }).select('id').single();
    expect(suggested.error).toBeNull();
    const moderated = await admin.client.from('improvement_suggestions').update({ status: 'under_review', admin_note: 'Checking the example.' }).eq('id', suggested.data.id);
    expect(moderated.error).toBeNull();
    const moderationAudit = await admin.client.from('admin_action_history').select('actor_id,action')
      .eq('target_id', suggested.data.id).eq('action','suggestion_moderated').single();
    expect(moderationAudit.data).toMatchObject({ actor_id: adminProfile.id, action: 'suggestion_moderated' });

    const queued = await admin.client.rpc('enqueue_agent_job', { p_suggestion: null, p_review: submitted.data.id, p_instructions: 'Add a concrete classroom example to the reviewed topic.' });
    expect(queued.error).toBeNull();
    const duplicate = await admin.client.rpc('enqueue_agent_job', { p_suggestion: null, p_review: submitted.data.id, p_instructions: 'Duplicate job should be refused.' });
    expect(duplicate.error).toBeTruthy();
    const deniedClaim = await reviewer.client.rpc('claim_agent_job', { p_id: queued.data });
    expect(deniedClaim.error).toBeTruthy();

    const svc = serviceClient();
    const claim1 = await svc.rpc('claim_agent_job', { p_id: queued.data });
    expect(claim1.error).toBeNull();
    expect(claim1.data.id).toBe(queued.data);
    const fail = await svc.rpc('report_agent_job', { p_id: queued.data, p_token: claim1.data.claim_token, p_status: 'failed', p_error: 'Host CLI unavailable.' });
    expect(fail.error).toBeNull();
    const retry = await admin.client.rpc('retry_agent_job', { p_id: queued.data });
    expect(retry.error).toBeNull();
    const claim2 = await svc.rpc('claim_agent_job', { p_id: queued.data });
    expect(claim2.error).toBeNull();
    expect(claim2.data.attempt).toBe(2);
    const stale = await svc.rpc('report_agent_job', { p_id: queued.data, p_token: claim1.data.claim_token, p_status: 'completed', p_diff: 'diff', p_checks: {}, p_pr_url: 'https://github.com/example/repo/pull/12' });
    expect(stale.error).toBeTruthy();
    const completed = await svc.rpc('report_agent_job', { p_id: queued.data, p_token: claim2.data.claim_token, p_status: 'completed', p_diff: 'Added example.', p_checks: { content: 'pass' }, p_pr_url: 'https://github.com/example/repo/pull/12' });
    expect(completed.error).toBeNull();
    const job = await admin.client.from('agent_jobs').select('status,pr_url,attempt').eq('id', queued.data).single();
    expect(job.data).toMatchObject({ status: 'completed', attempt: 2, pr_url: 'https://github.com/example/repo/pull/12' });

    const grants = await admin.client.from('reviewer_grants').select('id').eq('subject_id', reviewerProfile.id).is('revoked_at', null);
    expect(grants.data).toHaveLength(1);
    const revoke = await admin.client.rpc('revoke_reviewer_scope', { p_id: grants.data[0].id });
    expect(revoke.error).toBeNull();
    const afterRevoke = await reviewer.client.rpc('has_review_scope', { p_track: 'bed', p_course: 'EFMP-301' });
    expect(afterRevoke.data).toBe(false);
  });
});
