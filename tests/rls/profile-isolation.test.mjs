/**
 * T024 [US1] — a student may read their own profile; selecting another
 * user's row returns zero rows, not an error (FR-016, contracts §B, §D item 6).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, cleanupUsers } from './_helpers.mjs';

describe.skipIf(!rlsConfigured)('profile row isolation', () => {
  const created = [];

  afterAll(async () => {
    await cleanupUsers(created);
  });

  test('own row: 1 row; another user\'s row: 0 rows (silent filter, no error)', async () => {
    const a = await createSignedInUser({ role: 'student' });
    const b = await createSignedInUser({ role: 'student' });
    created.push(a.authUserId, b.authUserId);

    const own = await a.client.from('profiles').select('*').eq('auth_user_id', a.authUserId);
    expect(own.error).toBeNull();
    expect(own.data).toHaveLength(1);

    const other = await a.client.from('profiles').select('*').eq('auth_user_id', b.authUserId);
    expect(other.error, 'reading another user\'s row must not raise').toBeNull();
    expect(other.data).toHaveLength(0);
  });

  test('an anonymous caller reads zero rows', async () => {
    const a = await createSignedInUser({ role: 'student' });
    created.push(a.authUserId);

    const { anonClient } = await import('./_helpers.mjs');
    const anon = anonClient();
    const { data, error } = await anon.from('profiles').select('*').eq('auth_user_id', a.authUserId);
    expect(error).toBeNull();
    expect(data).toHaveLength(0);
  });
});
