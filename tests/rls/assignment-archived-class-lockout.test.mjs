/**
 * T023 [US2] — INSERT/UPDATE on `assignments` is rejected once the parent
 * class is archived (FR-015, `enforce_active_class()`).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, createAssignmentFixture, cleanupClasses } from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('assignments locked once the parent class is archived', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('cannot create an assignment in an archived class', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: 'ARL001', status: 'archived' });
    createdClasses.push(klass.id);

    const { error } = await teacher.client.from('assignments').insert({
      class_id: klass.id,
      source_kind: 'custom',
      title: 'Should not be created',
      due_at: new Date(Date.now() + 3600_000).toISOString(),
      max_mark: 100,
    });
    expect(error).toBeTruthy();
  });

  test('cannot update an assignment after its class is archived', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: 'ARL002' });
    createdClasses.push(klass.id);

    const assignment = await createAssignmentFixture(klass.id, { published: true });

    const { error: archiveError } = await teacher.client
      .from('classes')
      .update({ status: 'archived', archived_reason: 'manual', archived_at: new Date().toISOString() })
      .eq('id', klass.id);
    expect(archiveError).toBeNull();

    const { error: updateError } = await teacher.client
      .from('assignments')
      .update({ title: 'Renamed after archive' })
      .eq('id', assignment.id);
    expect(updateError).toBeTruthy();
  });
});
