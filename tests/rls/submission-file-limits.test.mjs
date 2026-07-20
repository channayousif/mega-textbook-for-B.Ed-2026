/**
 * T027 [US2] — an upload exceeding 10 MB or an unlisted MIME type is
 * rejected before it counts as a submission attempt; a valid file's signed
 * URL is readable by its own student and the owning teacher only
 * (FR-009, `can_access_submission_file()`).
 */
import { describe, test, expect, afterAll } from 'vitest';
import { rlsConfigured, createSignedInUser, getProfileByAuthId, serviceClient, cleanupUsers } from './_helpers.mjs';
import {
  createClassFixture, createEnrollmentFixture, createAssignmentFixture, cleanupClasses,
} from './_classFixtures.mjs';

describe.skipIf(!rlsConfigured)('submission file upload limits and access', () => {
  const createdUsers = [];
  const createdClasses = [];
  const uploadedPaths = [];

  afterAll(async () => {
    if (uploadedPaths.length) await serviceClient().storage.from('submissions').remove(uploadedPaths);
    await cleanupClasses(createdClasses);
    await cleanupUsers(createdUsers);
  });

  async function setup(joinCode) {
    const teacher = await createSignedInUser({ role: 'teacher' });
    createdUsers.push(teacher.authUserId);
    const klass = await createClassFixture(teacher.authUserId, { join_code: joinCode });
    createdClasses.push(klass.id);
    const assignment = await createAssignmentFixture(klass.id, {
      published: true,
      due_at: new Date(Date.now() + 3600_000).toISOString(),
    });

    const student = await createSignedInUser({ role: 'student' });
    createdUsers.push(student.authUserId);
    await createEnrollmentFixture(klass.id, student.authUserId);
    const studentProfile = await getProfileByAuthId(student.authUserId);

    return { teacher, klass, assignment, student, studentProfile };
  }

  test('upload exceeding 10 MB is rejected before it counts as a submission attempt', async () => {
    const { assignment, student, studentProfile } = await setup('FL001');
    const oversized = new Blob([new Uint8Array(11 * 1024 * 1024)], { type: 'application/pdf' });
    const path = `${assignment.id}/${studentProfile.id}/oversized.pdf`;
    const { error } = await student.client.storage
      .from('submissions')
      .upload(path, oversized, { contentType: 'application/pdf' });
    expect(error).toBeTruthy();
  });

  test('upload with an unlisted MIME type is rejected', async () => {
    const { assignment, student, studentProfile } = await setup('FL002');
    const script = new Blob(['#!/bin/sh\necho hi'], { type: 'application/x-sh' });
    const path = `${assignment.id}/${studentProfile.id}/script.sh`;
    const { error } = await student.client.storage
      .from('submissions')
      .upload(path, script, { contentType: 'application/x-sh' });
    expect(error).toBeTruthy();
  });

  test("a valid file's signed URL is readable by its own student and the owning teacher, denied to others", async () => {
    const { teacher, assignment, student, studentProfile } = await setup('FL003');
    const valid = new Blob(['hello'], { type: 'application/pdf' });
    const path = `${assignment.id}/${studentProfile.id}/answer.pdf`;
    const { error: uploadError } = await student.client.storage
      .from('submissions')
      .upload(path, valid, { contentType: 'application/pdf' });
    expect(uploadError).toBeNull();
    uploadedPaths.push(path);

    const ownRead = await student.client.storage.from('submissions').createSignedUrl(path, 60);
    expect(ownRead.error).toBeNull();

    const teacherRead = await teacher.client.storage.from('submissions').createSignedUrl(path, 60);
    expect(teacherRead.error).toBeNull();

    const otherStudent = await createSignedInUser({ role: 'student' });
    createdUsers.push(otherStudent.authUserId);
    const otherRead = await otherStudent.client.storage.from('submissions').createSignedUrl(path, 60);
    expect(otherRead.error).toBeTruthy();
  });

  test('a student uploading under another student\'s path segment is rejected', async () => {
    const { assignment, studentProfile } = await setup('FL004');
    const other = await createSignedInUser({ role: 'student' });
    createdUsers.push(other.authUserId);
    const valid = new Blob(['hello'], { type: 'application/pdf' });
    const path = `${assignment.id}/${studentProfile.id}/spoofed.pdf`; // studentProfile, not `other`
    const { error } = await other.client.storage.from('submissions').upload(path, valid, { contentType: 'application/pdf' });
    expect(error).toBeTruthy();
  });
});
