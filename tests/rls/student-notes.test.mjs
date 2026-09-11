/**
 * Spec 011 US3 / FR-008 - student_notes RLS regression.
 *
 * A student can CRUD their own notes; a second student can neither read, update, nor
 * delete the first student's notes; a teacher and an admin cannot create a note (the
 * INSERT policy requires the caller to currently hold the student role); an over-length
 * body is rejected by the CHECK constraint.
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, getProfileByAuthId, adminSet, cleanupUsers,
} from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('student_notes RLS', () => {
  const createdUsers = [];
  afterAll(async () => { await cleanupUsers(createdUsers); });

  test('a student can create, read, edit, and delete their own note', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const profile = await getProfileByAuthId(student.authUserId);

    const { data: created, error: createErr } = await student.client
      .from('student_notes')
      .insert({ student_id: profile.id, course_code: 'EFMP-302', unit_no: 1, body: 'my note' })
      .select()
      .single();
    expect(createErr).toBeNull();
    expect(created.body).toBe('my note');

    const { data: read } = await student.client.from('student_notes').select('*');
    expect(read).toHaveLength(1);

    const { error: updErr } = await student.client
      .from('student_notes').update({ body: 'edited' }).eq('id', created.id);
    expect(updErr).toBeNull();

    const { error: delErr } = await student.client
      .from('student_notes').delete().eq('id', created.id);
    expect(delErr).toBeNull();

    const { data: after } = await student.client.from('student_notes').select('*');
    expect(after).toHaveLength(0);
  });

  test("a second student cannot see or touch the first student's notes", async () => {
    const a = await createSignedInUser({ role: 'student' });
    const b = await createSignedInUser({ role: 'student' });
    createdUsers.push(a.authUserId, b.authUserId);
    const pa = await getProfileByAuthId(a.authUserId);

    const { data: note } = await a.client
      .from('student_notes')
      .insert({ student_id: pa.id, body: 'private to A' })
      .select()
      .single();

    const { data: bSees } = await b.client.from('student_notes').select('*');
    expect(bSees).toHaveLength(0);

    const { data: bUpd } = await b.client
      .from('student_notes').update({ body: 'hacked' }).eq('id', note.id).select();
    expect(bUpd ?? []).toHaveLength(0); // RLS filters the row out of the UPDATE

    const { data: bDel } = await b.client
      .from('student_notes').delete().eq('id', note.id).select();
    expect(bDel ?? []).toHaveLength(0);

    // A still has it, unchanged.
    const { data: aStill } = await a.client.from('student_notes').select('*');
    expect(aStill).toHaveLength(1);
    expect(aStill[0].body).toBe('private to A');
  });

  test('a teacher cannot create a note, even naming their own profile id', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const profile = await getProfileByAuthId(teacher.authUserId);

    const { error } = await teacher.client
      .from('student_notes')
      .insert({ student_id: profile.id, body: 'from a teacher' })
      .select();
    expect(error).toBeTruthy();
  });

  test('an admin cannot create a note', async () => {
    const admin = await createSignedInUser({ role: 'student' });
    createdUsers.push(admin.authUserId);
    await adminSet(admin.authUserId, { role: 'admin' });
    const profile = await getProfileByAuthId(admin.authUserId);

    const { error } = await admin.client
      .from('student_notes')
      .insert({ student_id: profile.id, body: 'from an admin' })
      .select();
    expect(error).toBeTruthy();
  });

  test('an over-length body is rejected', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const profile = await getProfileByAuthId(student.authUserId);

    const { error } = await student.client
      .from('student_notes')
      .insert({ student_id: profile.id, body: 'x'.repeat(8001) })
      .select();
    expect(error).toBeTruthy();
  });
});
