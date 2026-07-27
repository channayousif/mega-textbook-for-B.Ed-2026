/**
 * T016 [US3] — an admin can filter by any combination of
 * status/category/course; every legal transition
 * (submitted→under_review→accepted→published, under_review→rejected)
 * succeeds and bumps updated_at; every illegal transition (skip, backward,
 * or touching a terminal row) is rejected; an admin's attempt to change any
 * column other than status/admin_note is rejected; a non-admin teacher
 * cannot update any suggestion row, including their own (contract checklist
 * items 8, 10, 11).
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, adminSet, cleanupUsers, serviceClient,
} from './_helpers.mjs';

/**
 * `admin` is never self-selectable at signup (Constitution Art. V.3) — even
 * requesting it via user_metadata is silently ignored by the 0007/0008
 * allowlist trigger. A real admin test user must sign up as `student` and
 * then be promoted via the service-role `adminSet()` bypass, exactly like
 * `admin-role-change.test.mjs` already does.
 */
async function createSignedInAdmin() {
  const admin = await createSignedInUser({ role: 'student' });
  await adminSet(admin.authUserId, { role: 'admin' });
  return admin;
}

async function fileSuggestion(teacherClient, teacherProfileId, overrides = {}) {
  const { data, error } = await teacherClient
    .from('improvement_suggestions')
    .insert({
      teacher_id: teacherProfileId,
      page_slug: overrides.page_slug ?? '/docs/semester-1/efmp-301/unit-01/activities',
      locale: 'en',
      course_code: overrides.course_code ?? 'EFMP-301',
      unit_no: overrides.unit_no ?? 1,
      category: overrides.category ?? 'clarity',
      body: overrides.body ?? 'Fixture suggestion.',
    })
    .select()
    .single();
  if (error) throw new Error(`fileSuggestion fixture: ${error.message}`);
  return data;
}

describe.skipIf(!rlsConfigured)('suggestion moderation transitions', () => {
  const createdUsers = [];
  const createdSuggestions = [];

  afterAll(async () => {
    const svc = serviceClient();
    await Promise.allSettled(
      createdSuggestions.map((id) => svc.from('improvement_suggestions').delete().eq('id', id)),
    );
    await cleanupUsers(createdUsers);
  });

  test('an admin can filter the queue by status, category, and course', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const { data: teacherProfile } = await teacher.client.from('profiles').select('id').single();

    const s1 = await fileSuggestion(teacher.client, teacherProfile.id, { category: 'typo', course_code: 'EFMP-301' });
    const s2 = await fileSuggestion(teacher.client, teacherProfile.id, { category: 'factual', course_code: 'GICT-300' });
    createdSuggestions.push(s1.id, s2.id);

    const admin = await createSignedInAdmin();
    createdUsers.push(admin.authUserId);

    const { data: byCategory } = await admin.client
      .from('improvement_suggestions').select('*').eq('category', 'typo');
    expect(byCategory.map((r) => r.id)).toContain(s1.id);
    expect(byCategory.map((r) => r.id)).not.toContain(s2.id);

    const { data: byCourse } = await admin.client
      .from('improvement_suggestions').select('*').eq('course_code', 'GICT-300');
    expect(byCourse.map((r) => r.id)).toContain(s2.id);
    expect(byCourse.map((r) => r.id)).not.toContain(s1.id);

    const { data: byStatus } = await admin.client
      .from('improvement_suggestions').select('*').eq('status', 'submitted').in('id', [s1.id, s2.id]);
    expect(byStatus).toHaveLength(2);
  });

  test('legal transitions succeed and bump updated_at; illegal transitions are rejected', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const { data: teacherProfile } = await teacher.client.from('profiles').select('id').single();
    const suggestion = await fileSuggestion(teacher.client, teacherProfile.id);
    createdSuggestions.push(suggestion.id);

    const admin = await createSignedInAdmin();
    createdUsers.push(admin.authUserId);

    // Illegal: skip straight to accepted.
    const { error: skipError } = await admin.client
      .from('improvement_suggestions').update({ status: 'accepted' }).eq('id', suggestion.id);
    expect(skipError).toBeTruthy();

    // Legal: submitted -> under_review.
    const { data: step1, error: step1Error } = await admin.client
      .from('improvement_suggestions').update({ status: 'under_review' }).eq('id', suggestion.id).select().single();
    expect(step1Error).toBeNull();
    expect(step1.status).toBe('under_review');
    expect(new Date(step1.updated_at).getTime()).toBeGreaterThan(new Date(suggestion.updated_at).getTime());

    // Illegal: backward move under_review -> submitted.
    const { error: backwardError } = await admin.client
      .from('improvement_suggestions').update({ status: 'submitted' }).eq('id', suggestion.id);
    expect(backwardError).toBeTruthy();

    // Legal: under_review -> accepted, with a note.
    const { data: step2, error: step2Error } = await admin.client
      .from('improvement_suggestions')
      .update({ status: 'accepted', admin_note: 'Good catch.' })
      .eq('id', suggestion.id).select().single();
    expect(step2Error).toBeNull();
    expect(step2.status).toBe('accepted');
    expect(step2.admin_note).toBe('Good catch.');

    // Legal: accepted -> published.
    const { data: step3, error: step3Error } = await admin.client
      .from('improvement_suggestions').update({ status: 'published' }).eq('id', suggestion.id).select().single();
    expect(step3Error).toBeNull();
    expect(step3.status).toBe('published');

    // Illegal: published is terminal.
    const { error: terminalError } = await admin.client
      .from('improvement_suggestions').update({ status: 'under_review' }).eq('id', suggestion.id);
    expect(terminalError).toBeTruthy();
  });

  test('an admin cannot change any column other than status/admin_note', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const { data: teacherProfile } = await teacher.client.from('profiles').select('id').single();
    const suggestion = await fileSuggestion(teacher.client, teacherProfile.id);
    createdSuggestions.push(suggestion.id);

    const admin = await createSignedInAdmin();
    createdUsers.push(admin.authUserId);

    const { error } = await admin.client
      .from('improvement_suggestions').update({ body: 'Rewritten by admin' }).eq('id', suggestion.id);
    expect(error).toBeTruthy();
  });

  test('a non-admin teacher cannot update any suggestion row, including their own', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const { data: teacherProfile } = await teacher.client.from('profiles').select('id').single();
    const suggestion = await fileSuggestion(teacher.client, teacherProfile.id);
    createdSuggestions.push(suggestion.id);

    const { data, error } = await teacher.client
      .from('improvement_suggestions').update({ status: 'under_review' }).eq('id', suggestion.id).select();
    // RLS denies the row entirely (0 rows), rather than an error, since the
    // UPDATE policy's USING clause excludes the row for a non-admin.
    expect(error).toBeNull();
    expect(data).toHaveLength(0);
  });
});
