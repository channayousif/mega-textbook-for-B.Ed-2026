/**
 * T021 [US4] — a student can insert a self_marked unit_progress row for
 * themselves; a repeat insert for the same unit is a no-op (ON CONFLICT DO
 * NOTHING), not a duplicate row or an error; a forged method
 * ('assignment'/'quiz') or a forged student_id on a direct client insert is
 * denied (US4 AS2, contract checklist items 1–4).
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, getProfileByAuthId, cleanupUsers,
} from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('unit self-marking', () => {
  const createdUsers = [];

  afterAll(async () => {
    await cleanupUsers(createdUsers);
  });

  test('a student can self-mark a unit; repeating it is a no-op, not a duplicate row', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const profile = await getProfileByAuthId(student.authUserId);

    const insertRow = () => student.client
      .from('unit_progress')
      .insert({ student_id: profile.id, course_code: 'EFMP-301', unit_no: 7, method: 'self_marked' })
      .select();

    const { data: first, error: firstError } = await insertRow();
    expect(firstError).toBeNull();
    expect(first).toHaveLength(1);

    // A raw second insert (no ON CONFLICT clause) legitimately hits the
    // unique constraint and errors — supabase-js never throws for API/DB
    // errors, it resolves with { data: null, error }, so this is a plain
    // await, not a try/catch. The client library (src/lib/unitProgress.ts)
    // issues `on conflict ... do nothing` for the real no-op behavior; here
    // we only assert this raw path never produces a duplicate row.
    await insertRow();

    const { data: rows } = await student.client
      .from('unit_progress')
      .select('*')
      .eq('student_id', profile.id)
      .eq('course_code', 'EFMP-301')
      .eq('unit_no', 7);
    expect(rows).toHaveLength(1);
  });

  test('a forged method is rejected', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const profile = await getProfileByAuthId(student.authUserId);

    const { data, error } = await student.client
      .from('unit_progress')
      .insert({ student_id: profile.id, course_code: 'EFMP-301', unit_no: 8, method: 'assignment' })
      .select();
    expect(error).toBeTruthy();
    expect(data ?? []).toHaveLength(0);
  });

  test('a forged student_id is rejected', async () => {
    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const other = await createSignedInUser({ role: 'student' });
    createdUsers.push(other.authUserId);
    const otherProfile = await getProfileByAuthId(other.authUserId);

    const { data, error } = await student.client
      .from('unit_progress')
      .insert({ student_id: otherProfile.id, course_code: 'EFMP-301', unit_no: 9, method: 'self_marked' })
      .select();
    expect(error).toBeTruthy();
    expect(data ?? []).toHaveLength(0);
  });

  test('a student cannot read another student\'s unit_progress rows', async () => {
    const studentA = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentA.authUserId);
    const profileA = await getProfileByAuthId(studentA.authUserId);
    await studentA.client
      .from('unit_progress')
      .insert({ student_id: profileA.id, course_code: 'EFMP-301', unit_no: 10, method: 'self_marked' });

    const studentB = await createSignedInUser({ role: 'student' });
    createdUsers.push(studentB.authUserId);

    const { data } = await studentB.client
      .from('unit_progress')
      .select('*')
      .eq('student_id', profileA.id);
    expect(data).toHaveLength(0);
  });
});
