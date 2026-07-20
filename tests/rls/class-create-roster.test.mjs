/**
 * T006 [US1] — a teacher creates a class with a unique join code; a student
 * calls join_class_by_code and appears on the roster immediately
 * (FR-001, FR-003).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, cleanupUsers } from './_helpers.mjs';
import { cleanupClasses } from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('class creation and join-by-code roster', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('teacher creates a class with a unique join code', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const teacherProfile = await getProfileByAuthId(teacher.authUserId);

    const { data, error } = await teacher.client
      .from('classes')
      .insert({
        teacher_id: teacherProfile.id,
        course_code: 'EFMP-301',
        name: 'Section A',
        term_label: 'Fall 2026',
        join_code: 'TEST01',
      })
      .select()
      .single();

    expect(error).toBeNull();
    createdClasses.push(data.id);
    expect(data.join_code).toBe('TEST01');
    expect(data.status).toBe('active');
  });

  test('student joins by code and appears on the roster immediately', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const teacherProfile = await getProfileByAuthId(teacher.authUserId);
    const { data: klass } = await teacher.client
      .from('classes')
      .insert({
        teacher_id: teacherProfile.id,
        course_code: 'EFMP-301',
        name: 'Section B',
        term_label: 'Fall 2026',
        join_code: 'TEST02',
      })
      .select()
      .single();
    createdClasses.push(klass.id);

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const studentProfile = await getProfileByAuthId(student.authUserId);

    const { data: joinResult, error: joinError } = await student.client.rpc('join_class_by_code', {
      p_code: 'TEST02',
    });
    expect(joinError).toBeNull();
    expect(joinResult.already_enrolled).toBe(false);

    const { data: roster, error: rosterError } = await teacher.client
      .from('enrollments')
      .select('*')
      .eq('class_id', klass.id)
      .eq('student_id', studentProfile.id);
    expect(rosterError).toBeNull();
    expect(roster).toHaveLength(1);
    expect(roster[0].status).toBe('active');
  });

  test('rejoining with the same active code is idempotent, not a duplicate row', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const teacherProfile = await getProfileByAuthId(teacher.authUserId);
    const { data: klass } = await teacher.client
      .from('classes')
      .insert({
        teacher_id: teacherProfile.id,
        course_code: 'EFMP-301',
        name: 'Section C',
        term_label: 'Fall 2026',
        join_code: 'TEST03',
      })
      .select()
      .single();
    createdClasses.push(klass.id);

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await student.client.rpc('join_class_by_code', { p_code: 'TEST03' });
    const { data: second, error } = await student.client.rpc('join_class_by_code', { p_code: 'TEST03' });
    expect(error).toBeNull();
    expect(second.already_enrolled).toBe(true);
  });
});
