/**
 * T008 [US1] — a student can insert then re-tick (upsert) their own
 * self_assessment_checks row for the same position, exactly one row results;
 * a student cannot insert/update a row with another student's student_id; a
 * teacher's SELECT returns zero rows under any filter; an admin can SELECT
 * and aggregate across every student; ticking every item across a whole unit
 * never inserts or updates a unit_progress row (FR-001, FR-005, FR-006,
 * FR-007, SC-002; contract checklist items 1, 2, 4, 5).
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, adminSet, cleanupUsers, serviceClient,
} from './_helpers.mjs';

async function createSignedInAdmin() {
  const admin = await createSignedInUser({ role: 'student' });
  await adminSet(admin.authUserId, { role: 'admin' });
  return admin;
}

function checkRow(overrides = {}) {
  return {
    course_code: 'EFMP-302',
    unit_no: 1,
    topic_no: 1,
    locale: 'en',
    item_position: 1,
    item_text_snapshot: 'I can explain the four features of a profession.',
    checked: true,
    ...overrides,
  };
}

describe.skipIf(!rlsConfigured)('self-assessment isolation', () => {
  const createdUsers = [];
  // Rows are scoped by student_id (always one of createdProfileIds below, never a
  // real account), so cleanup deletes by owner rather than by course_code — a
  // course_code-scoped delete would risk touching real students' rows on a real
  // course like EFMP-302.
  const createdProfileIds = [];

  afterAll(async () => {
    const svc = serviceClient();
    if (createdProfileIds.length) {
      await svc.from('self_assessment_checks').delete().in('student_id', createdProfileIds);
    }
    await cleanupUsers(createdUsers);
  });

  test('a student can insert then re-tick the same position — exactly one row results', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const { data: profile } = await student.client.from('profiles').select('id').single();
    createdProfileIds.push(profile.id);

    const { data: inserted, error: insertError } = await student.client
      .from('self_assessment_checks')
      .upsert(
        { student_id: profile.id, ...checkRow() },
        { onConflict: 'student_id,course_code,unit_no,topic_no,locale,item_position' },
      )
      .select()
      .single();
    expect(insertError).toBeNull();
    expect(inserted.checked).toBe(true);

    const { data: retick, error: retickError } = await student.client
      .from('self_assessment_checks')
      .upsert(
        { student_id: profile.id, ...checkRow({ checked: false }) },
        { onConflict: 'student_id,course_code,unit_no,topic_no,locale,item_position' },
      )
      .select()
      .single();
    expect(retickError).toBeNull();
    expect(retick.id).toBe(inserted.id);
    expect(retick.checked).toBe(false);

    const { data: rows } = await student.client
      .from('self_assessment_checks')
      .select('*')
      .eq('student_id', profile.id)
      .eq('course_code', 'EFMP-302')
      .eq('unit_no', 1)
      .eq('topic_no', 1)
      .eq('item_position', 1);
    expect(rows).toHaveLength(1);
  });

  test('a student cannot insert or update a row with another student\'s student_id', async () => {
    const studentA = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentA.authUserId);
    const { data: profileA } = await studentA.client.from('profiles').select('id').single();
    createdProfileIds.push(profileA.id);
    const { data: rowA } = await studentA.client
      .from('self_assessment_checks')
      .insert({ student_id: profileA.id, ...checkRow({ item_position: 2 }) })
      .select()
      .single();

    const studentB = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentB.authUserId);
    const { data: profileB } = await studentB.client.from('profiles').select('id').single();
    createdProfileIds.push(profileB.id);

    const { data: insertData, error: insertError } = await studentB.client
      .from('self_assessment_checks')
      .insert({ student_id: profileA.id, ...checkRow({ item_position: 2 }) })
      .select();
    expect(insertError).toBeTruthy();
    expect(insertData).toBeNull();

    // UPDATE: RLS's USING clause excludes the row entirely for a non-owner —
    // 0 rows affected, no error (same shape as Spec 005's precedent).
    const { data: updateData, error: updateError } = await studentB.client
      .from('self_assessment_checks')
      .update({ checked: false })
      .eq('id', rowA.id)
      .select();
    expect(updateError).toBeNull();
    expect(updateData).toHaveLength(0);
  });

  test('a teacher cannot SELECT any self_assessment_checks row under any filter', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const { data: profile } = await student.client.from('profiles').select('id').single();
    createdProfileIds.push(profile.id);
    await student.client.from('self_assessment_checks').insert({ student_id: profile.id, ...checkRow({ item_position: 3 }) });

    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);

    const { data: unfiltered } = await teacher.client.from('self_assessment_checks').select('*');
    expect(unfiltered).toHaveLength(0);

    const { data: filtered } = await teacher.client
      .from('self_assessment_checks').select('*').eq('course_code', 'EFMP-302');
    expect(filtered).toHaveLength(0);
  });

  test('an admin can SELECT and aggregate across every student', async () => {
    const studentA = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentA.authUserId);
    const { data: profileA } = await studentA.client.from('profiles').select('id').single();
    createdProfileIds.push(profileA.id);
    await studentA.client.from('self_assessment_checks').insert({ student_id: profileA.id, ...checkRow({ item_position: 4, unit_no: 9, course_code: 'EFMP-999' }) });

    const studentB = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentB.authUserId);
    const { data: profileB } = await studentB.client.from('profiles').select('id').single();
    createdProfileIds.push(profileB.id);
    await studentB.client.from('self_assessment_checks').insert({ student_id: profileB.id, ...checkRow({ item_position: 5, unit_no: 9, course_code: 'EFMP-999' }) });

    const admin = await createSignedInAdmin();
    createdUsers.push(admin.authUserId);

    const { data, error } = await admin.client
      .from('self_assessment_checks').select('*').eq('course_code', 'EFMP-999').eq('unit_no', 9);
    expect(error).toBeNull();
    expect(data.map((r) => r.student_id).sort()).toEqual([profileA.id, profileB.id].sort());
  });

  test('ticking every item across a whole unit never inserts or updates a unit_progress row', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const { data: profile } = await student.client.from('profiles').select('id').single();
    createdProfileIds.push(profile.id);

    for (let position = 1; position <= 4; position++) {
      const { error } = await student.client
        .from('self_assessment_checks')
        .insert({ student_id: profile.id, ...checkRow({ course_code: 'EFMP-777', unit_no: 1, topic_no: 1, item_position: position }) });
      expect(error).toBeNull();
    }

    const svc = serviceClient();
    const { data: progressRows } = await svc
      .from('unit_progress').select('*').eq('student_id', profile.id).eq('course_code', 'EFMP-777');
    expect(progressRows).toHaveLength(0);
  });
});
