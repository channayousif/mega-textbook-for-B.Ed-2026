/**
 * T025 [US5] — a teacher can insert then re-rate (upsert) their own
 * `activity_feedback` for the same activity — exactly one row results, with
 * updated fields and a bumped `updated_at`; a teacher cannot `SELECT`
 * another teacher's individual row; an admin can `SELECT` every teacher's
 * rows for one activity to compute an aggregate (contract checklist items
 * 4–6).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, adminSet, cleanupUsers, serviceClient } from './_helpers.mjs';

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

describe.skipIf(!rlsConfigured)('activity feedback upsert', () => {
  const createdUsers = [];

  afterAll(async () => {
    const svc = serviceClient();
    await Promise.allSettled(
      createdUsers.map(async (authUserId) => {
        const { data: profile } = await svc.from('profiles').select('id').eq('auth_user_id', authUserId).maybeSingle();
        if (profile) await svc.from('activity_feedback').delete().eq('teacher_id', profile.id);
      }),
    );
    await cleanupUsers(createdUsers);
  });

  test('a teacher can insert then re-rate the same activity — one row, updated', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const { data: teacherProfile } = await teacher.client.from('profiles').select('id').single();

    const { data: first, error: firstError } = await teacher.client
      .from('activity_feedback')
      .upsert(
        {
          teacher_id: teacherProfile.id, course_code: 'EFMP-301', unit_no: 1, source_kind: 'activity',
          rating: 3, what_worked: 'Pairing', what_didnt: 'Too rushed', actual_minutes: 20,
        },
        { onConflict: 'teacher_id,course_code,unit_no,source_kind' },
      )
      .select()
      .single();
    expect(firstError).toBeNull();
    expect(first.rating).toBe(3);

    const { data: second, error: secondError } = await teacher.client
      .from('activity_feedback')
      .upsert(
        {
          teacher_id: teacherProfile.id, course_code: 'EFMP-301', unit_no: 1, source_kind: 'activity',
          rating: 5, what_worked: 'Pairing worked great', what_didnt: null, actual_minutes: 15,
        },
        { onConflict: 'teacher_id,course_code,unit_no,source_kind' },
      )
      .select()
      .single();
    expect(secondError).toBeNull();
    expect(second.id).toBe(first.id);
    expect(second.rating).toBe(5);
    expect(new Date(second.updated_at).getTime()).toBeGreaterThanOrEqual(new Date(first.updated_at).getTime());

    const { data: rows } = await teacher.client
      .from('activity_feedback')
      .select('*')
      .eq('teacher_id', teacherProfile.id)
      .eq('course_code', 'EFMP-301')
      .eq('unit_no', 1)
      .eq('source_kind', 'activity');
    expect(rows).toHaveLength(1);
  });

  test('a teacher cannot SELECT another teacher\'s individual activity_feedback row', async () => {
    const teacherA = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacherA.authUserId);
    const { data: teacherAProfile } = await teacherA.client.from('profiles').select('id').single();
    const { data: feedback } = await teacherA.client
      .from('activity_feedback')
      .insert({
        teacher_id: teacherAProfile.id, course_code: 'EFMP-301', unit_no: 2, source_kind: 'formative',
        rating: 4, actual_minutes: 10,
      })
      .select()
      .single();

    const teacherB = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacherB.authUserId);
    const { data: seenByB } = await teacherB.client
      .from('activity_feedback').select('*').eq('id', feedback.id);
    expect(seenByB).toHaveLength(0);
  });

  test('an admin can read every teacher\'s rows for one activity to compute an aggregate', async () => {
    const teacherA = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacherA.authUserId);
    const { data: teacherAProfile } = await teacherA.client.from('profiles').select('id').single();
    await teacherA.client.from('activity_feedback').insert({
      teacher_id: teacherAProfile.id, course_code: 'EFMP-301', unit_no: 3, source_kind: 'summative',
      rating: 2, what_didnt: 'Too long', actual_minutes: 40,
    });

    const teacherB = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacherB.authUserId);
    const { data: teacherBProfile } = await teacherB.client.from('profiles').select('id').single();
    await teacherB.client.from('activity_feedback').insert({
      teacher_id: teacherBProfile.id, course_code: 'EFMP-301', unit_no: 3, source_kind: 'summative',
      rating: 4, what_didnt: 'A bit rushed', actual_minutes: 35,
    });

    const admin = await createSignedInAdmin();
    createdUsers.push(admin.authUserId);
    const { data: rows } = await admin.client
      .from('activity_feedback').select('*').eq('course_code', 'EFMP-301').eq('unit_no', 3).eq('source_kind', 'summative');
    expect(rows).toHaveLength(2);
    const avg = rows.reduce((sum, r) => sum + r.rating, 0) / rows.length;
    expect(avg).toBe(3);
  });
});
