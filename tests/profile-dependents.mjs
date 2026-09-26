/**
 * Every table that must be cleared before a `profiles` row can be deleted.
 *
 * Shared by `tests/rls/_helpers.mjs` and `tests/e2e/_cleanup.ts` so the two
 * fixture-teardown paths cannot drift apart, and checked for completeness by
 * `tests/unit/profile-dependents.test.mjs`, which reads the migrations and
 * fails if a foreign key to `profiles(id)` exists without a matching entry.
 *
 * WHY THIS LIST EXISTS AT ALL. Almost every foreign key to `profiles(id)` is
 * NO ACTION, so a single `unit_progress` row is enough to abort a profile
 * delete. A teardown that deletes only the profile therefore leaves it behind,
 * and the failure is silent unless the error is inspected. That is how 29,381
 * orphan rows accumulated against 227 real ones.
 *
 * WHY NOT ON DELETE CASCADE. FR-021 deliberately anonymizes a deleted account
 * rather than destroying the teacher gradebooks that reference it. Loosening
 * the foreign keys for test convenience would take that guarantee with it.
 *
 * Order matters only in that profiles comes last; these are all siblings.
 */
export const PROFILE_DEPENDENTS = [
  ['admin_action_history', 'actor_id'],
  ['agent_jobs', 'requested_by'],
  ['review_submissions', 'reviewer_id'],
  ['reviewer_grants', 'subject_id'],
  ['reviewer_applications', 'applicant_id'],
  ['unit_progress', 'student_id'],
  ['student_achievements', 'student_id'],
  ['self_assessment_checks', 'student_id'],
  ['quiz_attempts', 'student_id'],
  ['student_notes', 'student_id'],
  ['submissions', 'student_id'],
  ['enrollments', 'student_id'],
  ['grades', 'graded_by'],
  ['teaching_log_entries', 'teacher_id'],
  ['activity_feedback', 'teacher_id'],
  ['improvement_suggestions', 'teacher_id'],
  ['assignment_templates', 'teacher_id'],
  ['content_feedback', 'author_id'],
  ['quiz_items', 'created_by'],
  ['answer_keys', 'created_by'],
  ['classes', 'teacher_id'],
];
