/**
 * T039 [Polish] — walks the complete access-control matrix from data-model.md
 * (student/teacher/admin x self_assessment_checks/content_feedback) as one
 * consolidated regression check, complementing each story's narrower tests
 * above (SC-002, SC-007).
 *
 * | Actor | self_assessment_checks | content_feedback |
 * |---|---|---|
 * | Signed-out | no access | no access |
 * | Student, own rows | select/insert/update | select/insert; no update |
 * | Student, another's rows | none | none |
 * | Teacher | none at all (Art. VIII.1) | select/insert own; no update; cannot see another's |
 * | Admin | select all (aggregate) | select all; update (status/note/ref) on any row |
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, anonClient, createSignedInUser, adminSet, cleanupUsers, serviceClient,
} from './_helpers.mjs';

async function createSignedInAdmin() {
  const admin = await createSignedInUser({ role: 'student' });
  await adminSet(admin.authUserId, { role: 'admin' });
  return admin;
}

function saRow(studentId, overrides = {}) {
  return {
    student_id: studentId,
    course_code: 'EFMP-302',
    unit_no: 1,
    topic_no: 1,
    locale: 'en',
    item_position: 1,
    item_text_snapshot: 'Fixture item.',
    checked: true,
    ...overrides,
  };
}

function cfRow(authorId, overrides = {}) {
  return {
    author_id: authorId,
    page_kind: 'topic',
    course_code: 'EFMP-302',
    unit_no: 1,
    topic_no: 1,
    locale: 'en',
    scope: 'whole_page',
    comment: 'Fixture feedback.',
    ...overrides,
  };
}

describe.skipIf(!rlsConfigured)('curriculum-owner console: full access-control matrix', () => {
  const createdUsers = [];
  const createdProfileIds = [];

  afterAll(async () => {
    const svc = serviceClient();
    if (createdProfileIds.length) {
      await Promise.allSettled([
        svc.from('self_assessment_checks').delete().in('student_id', createdProfileIds),
        svc.from('content_feedback').delete().in('author_id', createdProfileIds),
      ]);
    }
    await cleanupUsers(createdUsers);
  });

  describe('self_assessment_checks', () => {
    test('signed-out visitor has no access at all', async () => {
      const anon = anonClient();
      const { data: readData } = await anon.from('self_assessment_checks').select('*');
      expect(readData).toHaveLength(0);

      const { error: insertError } = await anon
        .from('self_assessment_checks')
        .insert(saRow('00000000-0000-0000-0000-000000000000'));
      expect(insertError).toBeTruthy();
    });

    test('a student may select/insert/update their own rows', async () => {
      const student = await createSignedInUser({ role: 'student' });
      createdUsers.push(student.authUserId);
      const { data: profile } = await student.client.from('profiles').select('id').single();
      createdProfileIds.push(profile.id);

      const { data: inserted, error: insertError } = await student.client
        .from('self_assessment_checks').insert(saRow(profile.id)).select().single();
      expect(insertError).toBeNull();

      const { data: selected } = await student.client
        .from('self_assessment_checks').select('*').eq('id', inserted.id);
      expect(selected).toHaveLength(1);

      const { data: updated, error: updateError } = await student.client
        .from('self_assessment_checks').update({ checked: false }).eq('id', inserted.id).select().single();
      expect(updateError).toBeNull();
      expect(updated.checked).toBe(false);
    });

    test('a student has no access to another student\'s rows', async () => {
      const studentA = await createSignedInUser({ role: 'student' });
      createdUsers.push(studentA.authUserId);
      const { data: profileA } = await studentA.client.from('profiles').select('id').single();
      createdProfileIds.push(profileA.id);
      const { data: rowA } = await studentA.client
        .from('self_assessment_checks').insert(saRow(profileA.id, { item_position: 2 })).select().single();

      const studentB = await createSignedInUser({ role: 'student' });
      createdUsers.push(studentB.authUserId);

      const { data: seenByB } = await studentB.client
        .from('self_assessment_checks').select('*').eq('id', rowA.id);
      expect(seenByB).toHaveLength(0);

      const { data: updateByB, error: updateByBError } = await studentB.client
        .from('self_assessment_checks').update({ checked: false }).eq('id', rowA.id).select();
      expect(updateByBError).toBeNull();
      expect(updateByB).toHaveLength(0);
    });

    test('a teacher has NO access at all — not even to their own account\'s rows', async () => {
      const teacher = await createSignedInUser({ role: 'teacher' });
      createdUsers.push(teacher.authUserId);
      const { data: teacherProfile } = await teacher.client.from('profiles').select('id').single();

      const { data: unfiltered } = await teacher.client.from('self_assessment_checks').select('*');
      expect(unfiltered).toHaveLength(0);

      // 0036 — a teacher inserting even into their OWN profile id is rejected outright by
      // is_student() in the INSERT policy's WITH CHECK, not merely hidden from SELECT
      // afterwards. This is the database-layer enforcement of Art. VIII.1/FR-006 that a
      // client-side gate alone cannot guarantee (Constitution Art. IX.2).
      const { data: insertData, error: insertError } = await teacher.client
        .from('self_assessment_checks').insert(saRow(teacherProfile.id, { item_position: 3 })).select();
      expect(insertError).toBeTruthy();
      expect(insertData).toBeNull();

      const { data: seenAfter } = await teacher.client
        .from('self_assessment_checks').select('*').eq('student_id', teacherProfile.id);
      expect(seenAfter).toHaveLength(0);
    });

    test('an admin may select and aggregate across every student', async () => {
      const student = await createSignedInUser({ role: 'student' });
      createdUsers.push(student.authUserId);
      const { data: profile } = await student.client.from('profiles').select('id').single();
      createdProfileIds.push(profile.id);
      await student.client.from('self_assessment_checks').insert(saRow(profile.id, { item_position: 4, unit_no: 5 }));

      const admin = await createSignedInAdmin();
      createdUsers.push(admin.authUserId);
      const { data, error } = await admin.client
        .from('self_assessment_checks').select('*').eq('student_id', profile.id).eq('unit_no', 5);
      expect(error).toBeNull();
      expect(data).toHaveLength(1);

      // Admin insert/update of ANOTHER student's row is still denied — is_admin()
      // only widens SELECT; INSERT/UPDATE both still require student_id = self.
      const { data: adminUpdate, error: adminUpdateError } = await admin.client
        .from('self_assessment_checks').update({ checked: false }).eq('student_id', profile.id).select();
      expect(adminUpdateError).toBeNull();
      expect(adminUpdate).toHaveLength(0);
    });
  });

  describe('content_feedback', () => {
    test('signed-out visitor has no access at all', async () => {
      const anon = anonClient();
      const { data: readData } = await anon.from('content_feedback').select('*');
      expect(readData).toHaveLength(0);

      const { error: insertError } = await anon
        .from('content_feedback').insert(cfRow('00000000-0000-0000-0000-000000000000'));
      expect(insertError).toBeTruthy();
    });

    test('a student may select/insert their own rows but never update, even their own', async () => {
      const student = await createSignedInUser({ role: 'student' });
      createdUsers.push(student.authUserId);
      const { data: profile } = await student.client.from('profiles').select('id').single();
      createdProfileIds.push(profile.id);

      const { data: inserted, error: insertError } = await student.client
        .from('content_feedback').insert(cfRow(profile.id)).select().single();
      expect(insertError).toBeNull();

      const { data: selected } = await student.client
        .from('content_feedback').select('*').eq('id', inserted.id);
      expect(selected).toHaveLength(1);

      const { data: updated, error: updateError } = await student.client
        .from('content_feedback').update({ comment: 'edited' }).eq('id', inserted.id).select();
      expect(updateError).toBeNull();
      expect(updated).toHaveLength(0);
    });

    test('a student has no access to another reader\'s rows', async () => {
      const studentA = await createSignedInUser({ role: 'student' });
      createdUsers.push(studentA.authUserId);
      const { data: profileA } = await studentA.client.from('profiles').select('id').single();
      createdProfileIds.push(profileA.id);
      const { data: rowA } = await studentA.client
        .from('content_feedback').insert(cfRow(profileA.id, { topic_no: 2 })).select().single();

      const studentB = await createSignedInUser({ role: 'student' });
      createdUsers.push(studentB.authUserId);
      const { data: seenByB } = await studentB.client
        .from('content_feedback').select('*').eq('id', rowA.id);
      expect(seenByB).toHaveLength(0);
    });

    test('a teacher may select/insert their own rows as an author (same as a student); never update; cannot see another reader\'s rows', async () => {
      const teacher = await createSignedInUser({ role: 'teacher' });
      createdUsers.push(teacher.authUserId);
      const { data: teacherProfile } = await teacher.client.from('profiles').select('id').single();
      createdProfileIds.push(teacherProfile.id);

      const { data: inserted, error: insertError } = await teacher.client
        .from('content_feedback').insert(cfRow(teacherProfile.id, { topic_no: 3 })).select().single();
      expect(insertError).toBeNull();
      expect(inserted.author_role).toBe('teacher');

      const { data: updated, error: updateError } = await teacher.client
        .from('content_feedback').update({ comment: 'edited' }).eq('id', inserted.id).select();
      expect(updateError).toBeNull();
      expect(updated).toHaveLength(0);

      const student = await createSignedInUser({ role: 'student' });
      createdUsers.push(student.authUserId);
      const { data: seenByStudent } = await student.client
        .from('content_feedback').select('*').eq('id', inserted.id);
      expect(seenByStudent).toHaveLength(0);
    });

    test('an admin may select all rows and update status/note/ref on any row', async () => {
      const student = await createSignedInUser({ role: 'student' });
      createdUsers.push(student.authUserId);
      const { data: profile } = await student.client.from('profiles').select('id').single();
      createdProfileIds.push(profile.id);
      const { data: item } = await student.client
        .from('content_feedback').insert(cfRow(profile.id, { topic_no: 4 })).select().single();

      const admin = await createSignedInAdmin();
      createdUsers.push(admin.authUserId);

      const { data: seenByAdmin } = await admin.client
        .from('content_feedback').select('*').eq('id', item.id);
      expect(seenByAdmin).toHaveLength(1);

      const { data: transitioned, error: transitionError } = await admin.client
        .from('content_feedback')
        .update({ status: 'planned', owner_note: 'Looking into it.' })
        .eq('id', item.id).select().single();
      expect(transitionError).toBeNull();
      expect(transitioned.status).toBe('planned');
      expect(transitioned.owner_note).toBe('Looking into it.');
    });
  });
});
