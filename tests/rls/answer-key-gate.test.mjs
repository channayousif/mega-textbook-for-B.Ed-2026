/**
 * T046 [US4] — a verified teacher reads an `answer_keys` row; an unverified
 * teacher and any student both get 0 rows (FR-013, SC-004). Reuses Spec 002's
 * `is_verified_teacher()` (0010_verified_teacher_gate.sql) unmodified — this
 * is the real content table that primitive was built ahead of.
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, adminSet, serviceClient, cleanupUsers,
} from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('answer_keys gated by is_verified_teacher()', () => {
  const createdUsers = [];
  let answerKeyId;

  afterAll(async () => {
    const svc = serviceClient();
    if (answerKeyId) await svc.from('answer_keys').delete().eq('id', answerKeyId);
    await cleanupUsers(createdUsers);
  });

  test('verified teacher reads the row; unverified teacher and a student get 0 rows', async () => {
    const svc = serviceClient();
    const { data: answerKey } = await svc
      .from('answer_keys')
      .insert({ course_code: 'EFMP-301', unit_no: 1, kind: 'formative', content: 'Rubric: award 1 point per criterion' })
      .select()
      .single();
    answerKeyId = answerKey.id;

    const verifiedTeacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(verifiedTeacher.authUserId);
    await adminSet(verifiedTeacher.authUserId, { verified_teacher: true });
    const { data: verifiedRead, error: verifiedError } = await verifiedTeacher.client
      .from('answer_keys')
      .select('*')
      .eq('id', answerKeyId);
    expect(verifiedError).toBeNull();
    expect(verifiedRead).toHaveLength(1);
    expect(verifiedRead[0].content).toBe('Rubric: award 1 point per criterion');

    const unverifiedTeacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(unverifiedTeacher.authUserId);
    const { data: unverifiedRead } = await unverifiedTeacher.client
      .from('answer_keys')
      .select('*')
      .eq('id', answerKeyId);
    expect(unverifiedRead).toHaveLength(0);

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const { data: studentRead } = await student.client
      .from('answer_keys')
      .select('*')
      .eq('id', answerKeyId);
    expect(studentRead).toHaveLength(0);
  });

  // SUPERSEDED BY 0040 (Spec 011 US6 / FR-014). This assertion used to read "a verified
  // teacher cannot INSERT/UPDATE an answer key (no client write policy)" - the Spec 003
  // admin-only-seeding posture. The curriculum owner's Spec 011 decision deliberately
  // reverses that and gives verified teachers an authoring UI, so the write path is now
  // covered positively in tests/rls/quiz-authoring.test.mjs. What is still worth asserting
  // here, and what 0040 did NOT change, is that the gate is is_verified_teacher(): an
  // UNVERIFIED teacher and a student remain locked out of writes, not just reads.
  test('an unverified teacher and a student still cannot INSERT an answer key', async () => {
    const unverifiedTeacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(unverifiedTeacher.authUserId);
    const { data: unverifiedInsert, error: unverifiedError } = await unverifiedTeacher.client
      .from('answer_keys')
      .insert({ course_code: 'EFMP-301', unit_no: 2, kind: 'summative', content: 'attempted client write' })
      .select();
    expect(unverifiedError).toBeTruthy();
    expect(unverifiedInsert ?? []).toHaveLength(0);

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    const { data: studentInsert, error: studentError } = await student.client
      .from('answer_keys')
      .insert({ course_code: 'EFMP-301', unit_no: 2, kind: 'summative', content: 'attempted client write' })
      .select();
    expect(studentError).toBeTruthy();
    expect(studentInsert ?? []).toHaveLength(0);
  });
});
