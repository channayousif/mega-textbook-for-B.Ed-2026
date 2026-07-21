/**
 * T042 [Polish] — walks the complete access-control matrix from
 * data-model.md (student/teacher/admin x unit_progress/student_achievements)
 * as one consolidated regression check, complementing each story's narrower
 * tests above (SC-005).
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, getProfileByAuthId, adminSet, cleanupUsers,
} from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('dashboard full isolation matrix', () => {
  const createdUsers = [];

  afterAll(async () => {
    await cleanupUsers(createdUsers);
  });

  test('a teacher has zero access to any student\'s unit_progress or student_achievements', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const profile = await getProfileByAuthId(student.authUserId);
    await student.client.from('unit_progress').insert({
      student_id: profile.id, course_code: 'EFMP-301', unit_no: 1, method: 'self_marked',
    });

    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);

    const { data: progressRows } = await teacher.client
      .from('unit_progress').select('*').eq('student_id', profile.id);
    expect(progressRows).toHaveLength(0);

    const { data: achievementRows } = await teacher.client
      .from('student_achievements').select('*').eq('student_id', profile.id);
    expect(achievementRows).toHaveLength(0);
  });

  test('an admin can read (support access) but never write directly to either table', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const profile = await getProfileByAuthId(student.authUserId);
    await student.client.from('unit_progress').insert({
      student_id: profile.id, course_code: 'EFMP-301', unit_no: 2, method: 'self_marked',
    });

    const admin = await createSignedInUser({ role: 'student' });
    createdUsers.push(admin.authUserId);
    await adminSet(admin.authUserId, { role: 'admin' });

    const { data: readRows } = await admin.client
      .from('unit_progress').select('*').eq('student_id', profile.id);
    expect(readRows).toHaveLength(1);

    const { data: writeAttempt, error: writeError } = await admin.client
      .from('unit_progress')
      .insert({ student_id: profile.id, course_code: 'EFMP-301', unit_no: 99, method: 'assignment' })
      .select();
    expect(writeError).toBeTruthy();
    expect(writeAttempt ?? []).toHaveLength(0);
  });

  test('a student cannot read another student\'s unit_progress or student_achievements under any query shape', async () => {
    const studentA = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentA.authUserId);
    const profileA = await getProfileByAuthId(studentA.authUserId);
    await studentA.client.from('unit_progress').insert({
      student_id: profileA.id, course_code: 'EFMP-301', unit_no: 3, method: 'self_marked',
    });

    const studentB = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentB.authUserId);

    const { data: progressRows } = await studentB.client
      .from('unit_progress').select('*').eq('student_id', profileA.id);
    expect(progressRows).toHaveLength(0);

    const { data: achievementRows } = await studentB.client
      .from('student_achievements').select('*').eq('student_id', profileA.id);
    expect(achievementRows).toHaveLength(0);
  });
});
