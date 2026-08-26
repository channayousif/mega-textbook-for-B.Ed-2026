/**
 * T038 [US7] — the drill-down query is scoped to one `(class_id,
 * student_id)` pair the caller owns; a combination outside that ownership
 * returns zero rows; the unit-coverage computation touches only
 * `submissions`/`grades`/`quiz_attempts` — confirmed by re-asserting Spec
 * 004's existing RLS still denies a teacher any read of
 * `unit_progress`/`student_achievements` (FR-011, SC-004, contract
 * checklist item 15, data-model.md matrix item 10).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses } from './_classFixtures.mjs';
import { createSubmissionFixture, createGradeFixture, createUnitProgressFixture } from './_dashboardFixtures.mjs';

describe.skipIf(!rlsConfigured)('student drilldown isolation', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('a class/student combination outside the caller\'s ownership returns zero rows', async () => {
    const teacherA = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacherA.authUserId);
    const teacherB = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacherB.authUserId);
    const studentB = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentB.authUserId);

    const classB = await createClassFixture(teacherB.authUserId);
    createdClasses.push(classB.id);
    await createEnrollmentFixture(classB.id, studentB.authUserId);
    const assignmentB = await createAssignmentFixture(classB.id, { max_mark: 100 });
    const submissionB = await createSubmissionFixture(assignmentB.id, studentB.authUserId);
    await createGradeFixture(submissionB.id, teacherB.authUserId, { mark: 77 });

    const { data: studentBProfile } = await teacherB.client.from('profiles').select('id').eq('auth_user_id', studentB.authUserId).maybeSingle();

    // Teacher A has no ownership of classB — every query the drill-down
    // would run returns zero rows.
    const { data: assignmentsFromA } = await teacherA.client
      .from('assignments').select('*').eq('class_id', classB.id);
    expect(assignmentsFromA).toHaveLength(0);

    const { data: submissionsFromA } = await teacherA.client
      .from('submissions').select('*').eq('assignment_id', assignmentB.id).eq('student_id', studentBProfile.id);
    expect(submissionsFromA).toHaveLength(0);
  });

  test('a teacher cannot read unit_progress or student_achievements through any query path (Spec 004 RLS unchanged)', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const unitProgressRow = await createUnitProgressFixture(student.authUserId, { course_code: klass.course_code, unit_no: 1 });

    const { data: seenByTeacher } = await teacher.client
      .from('unit_progress').select('*').eq('id', unitProgressRow.id);
    expect(seenByTeacher).toHaveLength(0);

    const { data: achievementsSeenByTeacher } = await teacher.client
      .from('student_achievements').select('*');
    expect(achievementsSeenByTeacher).toHaveLength(0);
  });
});
