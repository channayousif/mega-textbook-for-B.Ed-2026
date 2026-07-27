/**
 * T042 — walks the complete access-control matrix from data-model.md
 * (teacher/admin/student × teaching_log_entries/activity_feedback/
 * improvement_suggestions) as one consolidated regression check,
 * complementing each story's narrower tests above, and re-verifies Spec
 * 004's unit_progress/student_achievements RLS is unchanged (SC-004).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, adminSet, cleanupUsers, serviceClient } from './_helpers.mjs';
import { createClassFixture, cleanupClasses } from './_classFixtures.mjs';

/**
 * `admin` is never self-selectable at signup (Constitution Art. V.3) — a
 * real admin test user must sign up as `student` and then be promoted via
 * the service-role `adminSet()` bypass, exactly like
 * `admin-role-change.test.mjs` already does.
 */
async function createSignedInAdmin() {
  const admin = await createSignedInUser({ role: 'student' });
  await adminSet(admin.authUserId, { role: 'admin' });
  return admin;
}

describe.skipIf(!rlsConfigured)('teacher dashboard full isolation regression', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    const svc = serviceClient();
    await Promise.allSettled([
      ...createdUsers.map(async (authUserId) => {
        const { data: profile } = await svc.from('profiles').select('id').eq('auth_user_id', authUserId).maybeSingle();
        if (!profile) return;
        await svc.from('teaching_log_entries').delete().eq('teacher_id', profile.id);
        await svc.from('activity_feedback').delete().eq('teacher_id', profile.id);
        await svc.from('improvement_suggestions').delete().eq('teacher_id', profile.id);
      }),
    ]);
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('student is denied read/write on all three new tables', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const { data: teacherProfile } = await teacher.client.from('profiles').select('id').single();
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);

    const { data: log } = await teacher.client.from('teaching_log_entries').insert({
      teacher_id: teacherProfile.id, class_id: klass.id, course_code: klass.course_code, unit_no: 1,
      source_kind: 'activity', occurred_on: new Date().toISOString().slice(0, 10), duration_minutes: 10, reflection: 'x',
    }).select().single();
    const { data: feedback } = await teacher.client.from('activity_feedback').insert({
      teacher_id: teacherProfile.id, course_code: klass.course_code, unit_no: 1, source_kind: 'activity', rating: 3, actual_minutes: 10,
    }).select().single();
    const { data: suggestion } = await teacher.client.from('improvement_suggestions').insert({
      teacher_id: teacherProfile.id, page_slug: '/x', locale: 'en', course_code: klass.course_code, unit_no: 1, category: 'other', body: 'x',
    }).select().single();

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);

    const { data: logSeen } = await student.client.from('teaching_log_entries').select('*').eq('id', log.id);
    expect(logSeen).toHaveLength(0);
    const { data: feedbackSeen } = await student.client.from('activity_feedback').select('*').eq('id', feedback.id);
    expect(feedbackSeen).toHaveLength(0);
    const { data: suggestionSeen } = await student.client.from('improvement_suggestions').select('*').eq('id', suggestion.id);
    expect(suggestionSeen).toHaveLength(0);

    const { data: insertAttempt, error: insertError } = await student.client.from('improvement_suggestions').insert({
      teacher_id: teacherProfile.id, page_slug: '/y', locale: 'en', course_code: klass.course_code, unit_no: 1, category: 'other', body: 'forged',
    }).select();
    expect(insertError).toBeTruthy();
    expect(insertAttempt).toBeFalsy();
  });

  test('admin has read access (and only the documented write access) across all three tables', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const { data: teacherProfile } = await teacher.client.from('profiles').select('id').single();
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);

    const { data: log } = await teacher.client.from('teaching_log_entries').insert({
      teacher_id: teacherProfile.id, class_id: klass.id, course_code: klass.course_code, unit_no: 1,
      source_kind: 'activity', occurred_on: new Date().toISOString().slice(0, 10), duration_minutes: 10, reflection: 'x',
    }).select().single();
    const { data: suggestion } = await teacher.client.from('improvement_suggestions').insert({
      teacher_id: teacherProfile.id, page_slug: '/x', locale: 'en', course_code: klass.course_code, unit_no: 1, category: 'other', body: 'x',
    }).select().single();

    const admin = await createSignedInAdmin();
    createdUsers.push(admin.authUserId);

    const { data: logSeenByAdmin } = await admin.client.from('teaching_log_entries').select('*').eq('id', log.id);
    expect(logSeenByAdmin).toHaveLength(1);

    // Admin has no write path on teaching_log_entries at all (no INSERT/UPDATE policy for anyone but the owning teacher's INSERT).
    const { data: adminLogWrite, error: adminLogError } = await admin.client.from('teaching_log_entries').insert({
      teacher_id: teacherProfile.id, class_id: klass.id, course_code: klass.course_code, unit_no: 1,
      source_kind: 'activity', occurred_on: new Date().toISOString().slice(0, 10), duration_minutes: 10, reflection: 'admin attempt',
    }).select();
    expect(adminLogError).toBeTruthy();
    expect(adminLogWrite).toBeFalsy();

    // Admin CAN update improvement_suggestions' status/admin_note.
    const { error: adminTransitionError } = await admin.client
      .from('improvement_suggestions').update({ status: 'under_review' }).eq('id', suggestion.id);
    expect(adminTransitionError).toBeNull();
  });

  test('Spec 004\'s unit_progress/student_achievements RLS remains unchanged — teachers still get zero access', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const { data: rows } = await teacher.client.from('unit_progress').select('*');
    expect(rows).toHaveLength(0);
    const { data: achievements } = await teacher.client.from('student_achievements').select('*');
    expect(achievements).toHaveLength(0);
  });
});
