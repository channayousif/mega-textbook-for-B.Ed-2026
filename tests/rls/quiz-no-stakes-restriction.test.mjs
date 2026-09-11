/**
 * T074 [US6] — a `quiz`-sourced assignment can be created and published with
 * an arbitrarily high `max_mark` (summative-weight framing) with no
 * rejection or restriction — guards the 2026-07-19-session-1 clarification
 * ("any assignment type, including summative") against future regression
 * (FR-021, G5).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, cleanupUsers } from './_helpers.mjs';
import { createClassFixture, cleanupClasses } from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('quiz assignments carry no automatic low-stakes restriction', () => {
  const createdUsers = [];
  const createdClasses = [];

  afterAll(async () => {
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  test('a quiz-sourced assignment with a high (summative-weight) max_mark is created and published without error', async () => {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId);
    createdClasses.push(klass.id);

    const { data, error } = await teacher.client
      .from('assignments')
      .insert({
        class_id: klass.id,
        source_kind: 'quiz',
        course_code: 'EFMP-301',
        unit_no: 4,
        title: 'High-stakes quiz',
        due_at: new Date(Date.now() + 3600_000).toISOString(),
        max_mark: 100, // summative-weight, same ceiling as any other assignment type
        published: true,
      })
      .select()
      .single();
    expect(error).toBeNull();
    expect(data.max_mark).toBe(100);
    expect(data.published).toBe(true);
  });
});
