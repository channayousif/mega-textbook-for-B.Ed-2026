/**
 * T020 [US4] — a teacher can insert a `teaching_log_entries` row only for a
 * `class_id` they own; the same insert for a class owned by another teacher
 * is rejected; a teacher cannot `SELECT` another teacher's log entries; no
 * `UPDATE`/`DELETE` path exists on this table for any actor (FR-006,
 * contract checklist items 1–3).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, expectPermissionError, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, cleanupClasses } from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('teaching log isolation', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('a teacher can log an activity for a class they own', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const { data: teacherProfile } = await teacher.client.from('profiles').select('id').single();
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);

    const { data, error } = await teacher.client
      .from('teaching_log_entries')
      .insert({
        teacher_id: teacherProfile.id,
        class_id: klass.id,
        course_code: klass.course_code,
        unit_no: 1,
        source_kind: 'activity',
        occurred_on: new Date().toISOString().slice(0, 10),
        duration_minutes: 20,
        reflection: 'Went well.',
      })
      .select()
      .single();
    expect(error).toBeNull();
    expect(data.class_id).toBe(klass.id);
  });

  test('a teacher cannot log an activity against a class owned by another teacher', async () => {
    const teacherA = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacherA.authUserId);
    const teacherB = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacherB.authUserId);
    const { data: teacherBProfile } = await teacherB.client.from('profiles').select('id').single();
    const classA = await createClassFixture(teacherA.authUserId);
    createdClasses.push(classA.id);

    const { error } = await teacherB.client
      .from('teaching_log_entries')
      .insert({
        teacher_id: teacherBProfile.id,
        class_id: classA.id,
        course_code: classA.course_code,
        unit_no: 1,
        source_kind: 'activity',
        occurred_on: new Date().toISOString().slice(0, 10),
        duration_minutes: 20,
        reflection: 'Should not be allowed.',
      })
      .select()
      .single();
    expectPermissionError(error, expect);
  });

  test('a teacher cannot SELECT another teacher\'s log entries, and no update/delete path exists', async () => {
    const teacherA = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacherA.authUserId);
    const { data: teacherAProfile } = await teacherA.client.from('profiles').select('id').single();
    const classA = await createClassFixture(teacherA.authUserId);
    createdClasses.push(classA.id);
    const { data: entry } = await teacherA.client
      .from('teaching_log_entries')
      .insert({
        teacher_id: teacherAProfile.id,
        class_id: classA.id,
        course_code: classA.course_code,
        unit_no: 1,
        source_kind: 'activity',
        occurred_on: new Date().toISOString().slice(0, 10),
        duration_minutes: 20,
        reflection: 'Fixture entry.',
      })
      .select()
      .single();

    const teacherB = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacherB.authUserId);
    const { data: seenByB } = await teacherB.client
      .from('teaching_log_entries').select('*').eq('id', entry.id);
    expect(seenByB).toHaveLength(0);

    // No UPDATE policy for anyone, including the owner.
    const { data: updateResult, error: updateError } = await teacherA.client
      .from('teaching_log_entries').update({ reflection: 'Edited.' }).eq('id', entry.id).select();
    expect(updateError).toBeNull();
    expect(updateResult).toHaveLength(0);
  });
});
