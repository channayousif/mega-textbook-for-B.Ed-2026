/**
 * T040 [US3] — an unverified teacher is denied answer-key-bearing rows; a
 * verified_teacher teacher is allowed (FR-005a, FR-017).
 *
 * ⚠️ Tests against `public._verified_teacher_gate_demo` (0010_verified_teacher_
 * gate.sql), not a real content table — Spec 002 does not own answer-key/
 * restricted-material storage ("their storage is detailed in later specs",
 * spec.md). This proves the reusable `is_verified_teacher()` primitive and RLS
 * pattern Spec 003's real tables must follow; it does not test Spec 003 itself,
 * which doesn't exist yet. Decision confirmed with the owner (2026-07-19)
 * rather than assumed.
 */
import { describe, test, expect, afterAll } from 'vitest';
import {
  rlsConfigured, createSignedInUser, adminSet, anonClient, cleanupUsers,
} from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('verified_teacher gates the demo restricted-material table', () => {
  const created = [];

  afterAll(async () => {
    await cleanupUsers(created);
  });

  test('an anonymous caller reads 0 rows', async () => {
    const { data, error } = await anonClient().from('_verified_teacher_gate_demo').select('*');
    expect(error).toBeNull();
    expect(data).toHaveLength(0);
  });

  test('a student reads 0 rows', async () => {
    const user = await createSignedInUser({ role: 'student' });
    created.push(user.authUserId);
    const { data, error } = await user.client.from('_verified_teacher_gate_demo').select('*');
    expect(error).toBeNull();
    expect(data).toHaveLength(0);
  });

  test('an unverified teacher reads 0 rows — self-selecting teacher never confers this', async () => {
    const user = await createSignedInUser({ role: 'teacher' });
    created.push(user.authUserId);
    const { data, error } = await user.client.from('_verified_teacher_gate_demo').select('*');
    expect(error).toBeNull();
    expect(data).toHaveLength(0);
  });

  test('a verified_teacher teacher reads the row(s)', async () => {
    const user = await createSignedInUser({ role: 'teacher' });
    created.push(user.authUserId);
    await adminSet(user.authUserId, { verified_teacher: true });
    const { data, error } = await user.client.from('_verified_teacher_gate_demo').select('*');
    expect(error).toBeNull();
    expect(data.length).toBeGreaterThan(0);
  });

  test('a suspended verified_teacher loses access immediately (FR-020)', async () => {
    const user = await createSignedInUser({ role: 'teacher' });
    created.push(user.authUserId);
    await adminSet(user.authUserId, { verified_teacher: true });

    const before = await user.client.from('_verified_teacher_gate_demo').select('*');
    expect(before.data.length).toBeGreaterThan(0);

    await adminSet(user.authUserId, { status: 'suspended' });
    const after = await user.client.from('_verified_teacher_gate_demo').select('*');
    expect(after.data).toHaveLength(0);
  });

  test('an admin reads the row(s) regardless of verified_teacher', async () => {
    const user = await createSignedInUser({ role: 'student' });
    created.push(user.authUserId);
    await adminSet(user.authUserId, { role: 'admin' });
    const { data, error } = await user.client.from('_verified_teacher_gate_demo').select('*');
    expect(error).toBeNull();
    expect(data.length).toBeGreaterThan(0);
  });
});
