---
description: "Task list for 003-classes-assignments implementation"
---

# Tasks: Virtual Classes, Assignments & Assessments

**Input**: Design documents from `/specs/003-classes-assignments/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/classes-operations.md, quickstart.md

**Tests**: **REQUIRED** for this feature (not optional). Spec SC-004 mandates dedicated tests that
"specifically try and fail to" breach isolation, and Constitution Art. VII's engineering gate
requires "RLS policies tested". A passing suite that only covers happy paths is explicitly
insufficient — the negative cases in data-model.md's access-control matrix and
contracts/classes-operations.md §H are the deliverable, not an afterthought.

**Organization**: Tasks are grouped by user story (US1–US6, spec.md priorities P1/P1/P1/P2/P2/P3),
each independently implementable and testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1–US6)
- Exact file paths included in every task

## Path Conventions

Single Docusaurus app at repository root (no `site/` subdirectory), extending Spec 002's layout
per plan.md's Structure Decision. New code lands in `src/lib`, `src/contexts`,
`src/pages/app/classes/`, `supabase/migrations/`, `tests/rls/`, `tests/e2e/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: The one new dependency this feature needs before any code is written

- [X] T001 Add `exceljs` to `dependencies` in `package.json`; run `npm install` (FR-014, research.md R5)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared enums, the class-scoped context every subsequent page nests under, and the
RLS test fixtures every story's tests reuse.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete. Migrations must be
applied in the numeric order given across this whole file — policies referencing `is_admin()` /
`is_verified_teacher()` / `current_profile_id()` (Spec 002) are assumed already present; this
feature's own migrations additionally depend on each other in the order listed (e.g. RLS policies
on `classes` require `classes` to exist first).

- [X] T002 Create migration `supabase/migrations/0011_class_enums.sql`: define `class_status` and `enrollment_status` enums per data-model.md; drop `_verified_teacher_gate_demo` and its policy from `0010_verified_teacher_gate.sql` (its own comment: "Superseded, not extended, once Spec 003 lands")
- [X] T003 [P] Implement `src/contexts/ClassContext.tsx` (`useClassRole`/`useQueryParam` hooks) — resolves the caller's role for a given `classId` read from the query string (owning teacher / enrolled student / neither), callable from every `src/pages/app/classes/*.tsx?classId=…` page across all six user stories (routing correction: query-string params, not a nested route tree — see plan.md)
- [X] T004 [P] Add class-domain TypeScript types (`Class`, `Enrollment`, `Assignment`, `Submission`, `Grade`, `QuizItem`, `QuizAttempt`, `AnswerKey`) in `src/lib/types.ts` mirroring data-model.md's columns
- [X] T005 [P] Extend the RLS test harness with `tests/rls/_classFixtures.mjs`: `createClass()`, `createEnrollment()`, `createAssignment()` fixture helpers built on Spec 002's per-role authenticated clients (`tests/rls/_helpers.mjs`), plus teardown — reused by every story's RLS tests below

**Checkpoint**: Shared enums, context, types, and test fixtures ready — user story implementation
can begin.

---

## Phase 3: User Story 1 - Set up a class and enroll students (Priority: P1) 🎯 MVP

**Goal**: A teacher creates a virtual class and gets a join code; students who enter it appear on
the roster immediately. A teacher can reissue/revoke the code, and archive/reactivate the class.

**Independent Test**: A teacher can create a class and see a roster of students who joined using
the code, with no assignments involved — useful and fully verifiable on its own (spec.md).

### Tests for User Story 1 ⚠️

> Write these FIRST and confirm they FAIL before implementing.

- [X] T006 [P] [US1] RLS test in `tests/rls/class-create-roster.test.mjs`: teacher creates a class with a unique `join_code`; student calls `join_class_by_code` and appears on the roster immediately (FR-001, FR-003)
- [X] T007 [P] [US1] RLS test in `tests/rls/class-join-code-lifecycle.test.mjs`: reissuing the join code makes the old code fail while the existing roster is unaffected; revoking it blocks new joins while the roster is unaffected (FR-002, US1 AS3/AS4)
- [X] T008 [P] [US1] RLS test in `tests/rls/class-archive-reactivate.test.mjs`: an eligible teacher (or admin) archives their own class → no new joins/assignments/submissions, full history stays visible; the same actor reactivates it → live again (FR-015, 2026-07-19 clarification)
- [X] T009 [P] [US1] RLS test in `tests/rls/class-auto-archive.test.mjs`: an admin changing a teacher's role away from `teacher` (or suspending them) auto-archives every active class they own with `archived_reason='role_change'`; the now-ineligible teacher cannot reactivate it, but an admin can (FR-020, 2026-07-19 clarification)
- [X] T010 [P] [US1] RLS test in `tests/rls/class-guard-trigger.test.mjs`: a non-admin attempting to change `teacher_id`/`course_code`/`name`/`term_label` on a class errors; the owning teacher can change `join_code`/`status` on their own class; a non-owning teacher attempting to change `join_code` or `status` on another teacher's class is rejected; a **suspended** (but still owning) teacher's attempt to reissue their own `join_code` is rejected, even though they are not attempting a `status` change (data-model.md `guard_class_updates()`, U1, N1)
- [X] T011 [P] [US1] RLS test in `tests/rls/enrollment-isolation.test.mjs`: a teacher cannot see or manage another teacher's roster; a student has no standing `SELECT` access to `classes.join_code` for classes they have not joined (FR-001 security posture, SC-004)
- [X] T012 [P] [US1] E2E test in `tests/e2e/classes-lifecycle.spec.ts`: teacher creates a class, shares the code, a student joins, the roster updates — spot-checks SC-001/SC-002 timing
- [X] T070 [P] [US1] RLS test in `tests/rls/enrollment-removal.test.mjs`: an owning teacher removes a student from their own class → the student immediately loses view/submit access to that class and its assignments; a teacher cannot remove a student from another teacher's class; the removed student's prior `submissions`/`grades` remain intact and teacher-visible; the same file also asserts that the removed student re-entering the class's still-valid join code via `join_class_by_code` is rejected with a distinct "you were removed" message and does **not** reactivate the enrollment (FR-018, SC-004, 2026-07-19 clarification)
- [X] T077 [P] [US1] RLS test in `tests/rls/enrollment-restore.test.mjs`: an owning teacher restores a removed student → the student immediately regains view/submit access to the class's published assignments; a teacher cannot restore a student removed from another teacher's class (FR-022, SC-004)

### Implementation for User Story 1

- [X] T013 [US1] Create migration `supabase/migrations/0012_classes.sql`: `classes` table per data-model.md, RLS enabled, with three policies — SELECT (owning teacher, admin, or a student with an `active` `enrollments` row for that class — corrected during implementation, see data-model.md), INSERT (own `teacher_id` only), and the row-level **UPDATE** policy (`teacher_id = current_profile_id() OR is_admin()`) that `guard_class_updates()` (T014) depends on to ever fire; without this UPDATE policy the trigger has no row to act on and every reissue/archive/reactivate would silently affect 0 rows (depends on T002)
- [X] T014 [US1] Create migration `supabase/migrations/0013_class_guard_trigger.sql`: `guard_class_updates()` BEFORE UPDATE trigger restricting non-admin writes to `join_code`/`status` — narrows T013's row-level UPDATE policy to specific columns; grants no row access by itself. Two different strictness levels per column (owner decision, 2026-07-19): `join_code` requires ownership + `is_active_user()` only (blocks a suspended teacher, doesn't require them to still hold the `teacher` role); `status` transitions require ownership + full current eligibility (`role='teacher' AND status='active'`) (depends on T013)
- [X] T015 [US1] Create migration `supabase/migrations/0014_teacher_ineligibility_trigger.sql`: `archive_classes_on_teacher_ineligibility()` `SECURITY DEFINER` AFTER UPDATE OF role, status ON `profiles` trigger (FR-020) (depends on T013)
- [X] T016 [US1] Create migration `supabase/migrations/0015_enrollments.sql`: `enrollments` table, RLS enabled, teacher-manages-own-class-roster + student-reads-own-enrollment policies, plus a `guard_enrollment_updates()` trigger restricting non-admin UPDATEs to `status`/`removed_at` only (corrected during implementation — a fully open UPDATE policy would let a teacher reassign `class_id`/`student_id` via a crafted request; see data-model.md). Also adds `profiles_select_own_students` — a new policy on Spec 002's `public.profiles` granting a teacher SELECT on an enrolled student's profile (name), which nothing previously allowed (corrected during implementation — see data-model.md) (depends on T013)
- [X] T017 [US1] Create migration `supabase/migrations/0016_join_class_rpc.sql`: `join_class_by_code(p_code)` `SECURITY DEFINER` RPC returning a uniform error for invalid/expired/archived-class codes; on a valid code, inserts a new `active` enrollment if none exists (first join), no-ops if already `active` (idempotent), or **rejects with a distinct "you were removed" message** (never reactivating) if the caller has a `removed` row for that class — only an explicit teacher restore action (T075) may reactivate it (FR-003, FR-018, 2026-07-19 clarification) (depends on T016)
- [X] T018 [P] [US1] Implement `src/lib/classes.ts`: `createClass`, `listOwnClasses`, `listJoinedClasses`, `reissueJoinCode`, `revokeJoinCode`, `archiveClass`, `reactivateClass`, `joinClassByCode` wrapper (depends on T013-T017)
- [X] T019 [US1] Build `src/pages/app/classes/index.tsx`: teacher's class list + "Create class" form; student's "Join a class" code-entry form + list of joined classes (depends on T018)
- [X] T020 [US1] Build `src/pages/app/classes/roster.tsx (?classId=…)`: roster table, join-code reissue/revoke controls, archive/reactivate controls (teacher only), read-only banner while archived (depends on T018, T003)
- [X] T021 [US1] Exercise `useClassRole`/`useQueryParam` (T003) from `roster.tsx` (T020) so it — and every later story's `src/pages/app/classes/*.tsx?classId=…` page — resolves the caller's role from the query string rather than a route param (depends on T003, T013)
- [X] T068 [US1] Extend `src/lib/classes.ts` (T018) with `removeStudent(classId, studentId)`: sets the enrollment's `status='removed', removed_at=now()` for a student in the caller's own class (FR-018)
- [X] T069 [US1] Extend `src/pages/app/classes/roster.tsx (?classId=…)` (T020) with a "Remove student" control per roster row (teacher-only, confirmation required) (depends on T068) (FR-018)
- [X] T075 [US1] Extend `src/lib/classes.ts` (T018) with `restoreStudent(classId, studentId)`: sets the enrollment's `status='active', removed_at=null` for a student in the caller's own class (FR-022)
- [X] T076 [US1] Extend `src/pages/app/classes/roster.tsx (?classId=…)` (T020) with a "removed students" section and a "Restore" control per removed row (teacher-only) (depends on T075) (FR-022)

**Checkpoint**: US1 fully functional and independently testable — create, join, roster, reissue/
revoke, remove-student, restore-student, archive/reactivate, and auto-archive all working.

---

## Phase 4: User Story 2 - Assign work from the book and collect submissions (Priority: P1)

**Goal**: A teacher publishes an assignment linked to a unit's activity/formative/summative
content (or custom), and students submit text/files before or after the deadline per FR-008.

**Independent Test**: With a class and roster in place (US1), a teacher publishes one assignment
and a student submits work and sees a confirmation — independently verifiable without grading.

### Tests for User Story 2 ⚠️

- [X] T022 [P] [US2] RLS test in `tests/rls/assignment-publish-visibility.test.mjs`: an unpublished assignment returns 0 rows for an enrolled student but is visible to the owning teacher; toggling `published` true↔false at any time preserves existing submissions/grades unchanged (FR-005, 2026-07-19 unpublish clarification); the same file also asserts that editing an assignment's due date after submissions exist leaves those submissions unaltered, with the new due date applying only going forward to future late/on-time marking (spec.md Edge Cases, U1)
- [X] T023 [P] [US2] RLS test in `tests/rls/assignment-archived-class-lockout.test.mjs`: INSERT/UPDATE on `assignments` is rejected once the parent class is `archived` (FR-015, `enforce_active_class()`)
- [X] T024 [P] [US2] RLS test in `tests/rls/submission-deadline.test.mjs`: an on-time submission is recorded `late=false`; a late submission is accepted and marked late when `allow_late=true`, rejected when `allow_late=false` (FR-007, FR-008)
- [X] T025 [P] [US2] RLS test in `tests/rls/submission-resubmit-lock.test.mjs`: a resubmission before the due date overwrites the existing row in place (still one row); an UPDATE attempt after the due date is rejected regardless of the original submission's on-time/late status (2026-07-19 clarification)
- [X] T026 [P] [US2] RLS test in `tests/rls/submission-isolation.test.mjs`: a student cannot read or write another student's submission; a teacher can only read submissions belonging to their own class's assignments (FR-012, SC-004)
- [X] T027 [P] [US2] Storage test in `tests/rls/submission-file-limits.test.mjs`: an upload exceeding 10 MB or an unlisted MIME type is rejected before it counts as a submission attempt; a valid file's signed URL is readable by its own student and the owning teacher only (FR-009, `can_access_submission_file()`)
- [X] T028 [P] [US2] E2E test in `tests/e2e/assignments-publish-submit.spec.ts`: teacher picks a unit item, publishes it, a student sees it and submits text+file before the deadline and sees an on-time confirmation (SC-001, SC-006)
- [X] T073 [P] [US2] RLS/unit test in `tests/rls/assignment-status-enum.test.mjs`: for a single student across one assignment's lifecycle, confirms each of FR-006's student-facing status values appears correctly in sequence — not-yet-submitted → submitted (on-time) or late → graded/returned once a grade exists (FR-006, G4). Complements the existing teacher-side "missing" assertion in `grading-queue-missing.test.mjs`.

### Implementation for User Story 2

- [X] T029 [US2] Create migration `supabase/migrations/0017_assignments.sql`: `assignments` table, RLS (teacher CRUD on own active-class assignments; student SELECT `published=true` only for enrolled classes), `enforce_active_class()` trigger, plus a reusable `touch_updated_at()` stamper (also used by `grades`, US3) (depends on T013, T016)
- [X] T030 [US2] Create migration `supabase/migrations/0018_submissions.sql`: `submissions` table, INSERT/UPDATE RLS policies encoding the due-date resubmission lock and the late-allowed rule; `late` computed server-side by `compute_submission_late()` (never trusted from the client — found during implementation, avoids a client/server clock mismatch); `guard_submission_updates()` restricts resubmission to content columns only, mirroring `guard_enrollment_updates()` (depends on T029, T016)
- [X] T031 [US2] Create migration `supabase/migrations/0019_submissions_storage.sql`: create the private `submissions` Storage bucket (10 MB limit, allowlisted MIME types) and its `can_access_submission_file()`-backed read/write policies (depends on T029, T030)
- [X] T032 [P] [US2] Implement `src/lib/assignments.ts`: `createAssignment` (from a picked unit item, or custom), `publishAssignment`/`unpublishAssignment`, `listForTeacher`, `listPublishedForStudent` (depends on T029)
- [X] T033 [P] [US2] Implement `src/lib/submissions.ts`: submit/resubmit (text + Storage upload), fetch own submission, computed-status helper (not-yet-submitted/missing/submitted/late/graded, per data-model.md) (depends on T030, T031)
- [X] T034 [US2] Build `src/pages/app/classes/assignment-new.tsx (?classId=…)`: unit-item picker (activity/formative/summative from the build-time content index, or custom) pre-filling title/unit link, plus due date, max mark, allow-late toggle, and publish action — targets SC-001's ≤3-click/<2-min flow. **Found during implementation**: no content-index mechanism existed (Docusaurus's `useAllDocsData()` doesn't expose custom front-matter); added `scripts/build-content-index.mjs` (walks `docs/` like `validate-content.mjs`, emits `static/content-index.json`, wired via `prestart`/`prebuild`) as the "build-time content index" this task's picker reads via `fetch('/content-index.json')` (depends on T032)
- [X] T035 [US2] Build `src/pages/app/classes/assignments.tsx (?classId=…)`: teacher's full assignment list (incl. unpublished) with a publish/unpublish toggle; student's published-only list with due date and computed status (depends on T032, T033)
- [X] T036 [US2] Build `src/pages/app/classes/assignment.tsx (?classId=…&assignmentId=…)`: student submission form (text/file, resubmit-until-due-date UX, locked state after the due date) with the bilingual late/blocked messaging FR-008 requires (depends on T033)

**Checkpoint**: US1 and US2 both independently functional — a teacher can publish a book-linked
assignment and a student can submit (and resubmit) before the deadline.

---

## Phase 5: User Story 3 - Grade submissions and return results (Priority: P1)

**Goal**: A teacher reviews every submission for an assignment in one queue, marks and returns
each one, and a student sees their result immediately.

**Independent Test**: With at least one real submission (US2), a teacher grades it and a student
sees the result — the final leg of the core assign/submit/grade/return loop.

### Tests for User Story 3 ⚠️

- [X] T037 [P] [US3] RLS test in `tests/rls/grading-queue-missing.test.mjs`: the teacher's queue lists every submission for the assignment plus enrolled non-submitters as "missing" once the due date has passed (US3 AS4)
- [X] T038 [P] [US3] RLS test in `tests/rls/grade-max-mark.test.mjs`: a mark exceeding `assignments.max_mark` is rejected by `enforce_max_mark()` (FR-010 edge case)
- [X] T039 [P] [US3] RLS test in `tests/rls/grade-edit-visibility.test.mjs`: editing an already-returned grade's mark/feedback is reflected on the student's next read, never the original value (FR-011)
- [X] T040 [P] [US3] RLS test in `tests/rls/grade-isolation.test.mjs`: a teacher cannot grade another teacher's class's submissions; a student can read only their own returned grade (FR-010, FR-012, SC-004)
- [X] T041 [P] [US3] E2E test in `tests/e2e/grading-queue.spec.ts`: teacher grades and returns a submission and the student sees the mark/feedback immediately; teacher edits it and the student sees the update (SC-006)
- [X] T071 [P] [US3] RLS test in `tests/rls/grade-tombstone-anonymized.test.mjs`: a tombstoned (deleted) student's `grades`/`submissions` rows remain readable by the owning teacher with marks/feedback/submission content intact, joined against `profiles.full_name IS NULL` (FR-019, extends data-model.md access-control matrix item #10)

### Implementation for User Story 3

- [X] T042 [US3] Create migration `supabase/migrations/0020_grades.sql`: `grades` table, `enforce_max_mark()` trigger, RLS (teacher CRUD on own class's submissions' grades; student SELECT own only) (depends on T030)
- [X] T043 [P] [US3] Implement `src/lib/grading.ts`: fetch the grading queue (submissions LEFT JOIN grades, plus enrolled-but-missing students), grade-and-return, edit-grade (depends on T042)
- [X] T044 [US3] Build `src/pages/app/classes/queue.tsx (?classId=…&assignmentId=…)`: teacher's grading queue (list/one-at-a-time view), mark+feedback entry with max-mark validation, missing-student indicator, anonymized placeholder name for any row whose student `profiles.full_name IS NULL` (depends on T043) (FR-010, FR-019)
- [X] T045 [US3] Extend `src/pages/app/classes/assignment.tsx (?classId=…&assignmentId=…)` (T036) to show the student's own returned mark/feedback once graded (depends on T043, T036)

**Checkpoint**: The full core loop (US1→US2→US3) is independently functional — create class,
join, publish, submit, grade, see result.

---

## Phase 6: User Story 4 - Consult the official answer key while grading (Priority: P2)

**Goal**: A verified teacher can open a book assessment's official answer key or marking rubric
while grading; unverified teachers and students cannot, under any circumstance.

**Independent Test**: An approved ("verified") teacher can view an answer key; an unapproved
teacher or a student cannot — testable independently of any actual grading taking place.

### Tests for User Story 4 ⚠️

- [X] T046 [P] [US4] RLS test in `tests/rls/answer-key-gate.test.mjs`: a verified teacher reads an `answer_keys` row; an unverified teacher and any student both get 0 rows (FR-013, SC-004)

### Implementation for User Story 4

- [X] T047 [US4] Create migration `supabase/migrations/0021_answer_keys.sql`: `answer_keys` table, RLS SELECT restricted to `is_verified_teacher() OR is_admin()`, no client INSERT/UPDATE policy (reuses Spec 002's `is_verified_teacher()` unmodified)
- [X] T048 [P] [US4] Implement `src/lib/answerKeys.ts`: fetch an answer key/rubric by `course_code`/`unit_no`/`kind` (depends on T047)
- [X] T049 [US4] Build the answer-key panel inside `src/pages/app/classes/queue.tsx (?classId=…&assignmentId=…)` (extends T044), rendered only when the caller's `verified_teacher` flag is true, absent otherwise (depends on T048, T044)

**Checkpoint**: Verified teachers can consult answer keys while grading; unverified teachers and
students categorically cannot, by any path.

---

## Phase 7: User Story 5 - Export the gradebook (Priority: P2)

**Goal**: A teacher downloads every mark for a class as a spreadsheet that renders Urdu names
correctly in common spreadsheet software.

**Independent Test**: With graded assignments in place (US3), a teacher exports the gradebook and
opens it correctly, including Urdu names — a standalone reporting action.

### Tests for User Story 5 ⚠️

- [X] T050 [P] [US5] E2E test in `tests/e2e/gradebook-export.spec.ts`: the exported `.xlsx` for a class with an Urdu-named student opens with the name intact — not garbled, not a `.csv` fallback (FR-014, SC-007)

### Implementation for User Story 5

- [X] T051 [P] [US5] Implement `src/lib/gradebookExport.ts`: query every enrollment × assignment × grade (and `quiz_best_scores`, if US6 is built) row for a class the caller owns, generate an `.xlsx` file via a dynamically-imported `exceljs` (research.md R5); rows for a tombstoned student (`profiles.full_name IS NULL`) export an anonymized placeholder name, never a blank or raw `NULL` cell (depends on T001, T042) (FR-014, FR-019)
- [X] T052 [US5] Build `src/pages/app/classes/gradebook.tsx (?classId=…)`: teacher-only export button triggering T051 and downloading the file (depends on T051)

**Checkpoint**: A teacher can export a correct, Urdu-safe gradebook spreadsheet.

---

## Phase 8: User Story 6 - Take an auto-graded practice quiz (Priority: P3)

**Goal**: A student answers a multiple-choice practice quiz for a unit and sees an instant score,
with unlimited retakes before the due date and the best score kept as the record.

**Independent Test**: A student can take a multiple-choice quiz linked to a unit and see an
instant score — fully testable without any teacher grading action.

### Tests for User Story 6 ⚠️

- [X] T053 [P] [US6] RLS test in `tests/rls/quiz-item-gate.test.mjs`: `quiz_items_public` exposes questions/options but never `correct_option`; a full-row read of the base `quiz_items` table is `is_verified_teacher()`/`is_admin()`-only (FR-013, FR-017, SC-004)
- [X] T054 [P] [US6] RLS test in `tests/rls/quiz-attempt-scoring.test.mjs`: `submit_quiz_attempt` computes the score server-side; a direct client INSERT on `quiz_attempts` is rejected (FR-017, SC-004)
- [X] T055 [P] [US6] RLS test in `tests/rls/quiz-retake-best-score.test.mjs`: multiple attempts before the due date leave `quiz_best_scores` reflecting the highest score, not the latest; an attempt after the due date is rejected (2026-07-19 clarification)
- [X] T056 [P] [US6] E2E test in `tests/e2e/quiz-retake.spec.ts`: a student takes a quiz and sees an instant score, retakes it and improves the score, and the teacher's results view shows the best score (US6 AS1/AS2)
- [X] T074 [P] [US6] RLS test in `tests/rls/quiz-no-stakes-restriction.test.mjs`: a `quiz`-sourced assignment can be created and published with an arbitrarily high `max_mark` (summative-weight framing) with no rejection or restriction — guards the 2026-07-19-session-1 clarification ("any assignment type, including summative") against future regression (FR-021, G5)

### Implementation for User Story 6

- [X] T057 [US6] Create migration `supabase/migrations/0022_quiz_items.sql`: `quiz_items` table plus the `quiz_items_public` view (excludes `correct_option`), RLS per data-model.md
- [X] T058 [US6] Create migration `supabase/migrations/0023_quiz_attempts.sql`: `quiz_attempts` table (no client write policy), `quiz_best_scores` view, `submit_quiz_attempt()` `SECURITY DEFINER` RPC (depends on T057, T029)
- [X] T059 [P] [US6] Implement `src/lib/quiz.ts`: fetch `quiz_items_public` for a unit, `submit_quiz_attempt` wrapper, fetch own attempts + best score, fetch a class's best scores (teacher view) (depends on T058)
- [X] T060 [US6] Build `src/pages/app/classes/quiz.tsx (?classId=…&assignmentId=…)`: student take/retake UI with an instant score; teacher best-score results view (depends on T059)
- [X] T061 [US6] Extend `src/pages/app/classes/assignment-new.tsx (?classId=…)` (T034) to support `source_kind='quiz'` creation, drawing on `quiz_items` for the chosen unit (depends on T034, T057)

**Checkpoint**: All six user stories are independently functional.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that span multiple user stories, and the gates required before merge.

- [X] T062 [P] Bilingual EN/UR copy pass across every new `src/pages/app/classes/**` page and every new error/status message (FR-016, Constitution Art. III.8)
- [X] T063 [P] RTL layout verification for the new pages, mirroring Spec 001/002's existing RTL Playwright checks
- [X] T064 Bundle-budget check (Constitution Art. V.5): confirm `exceljs` and the new `src/pages/app/classes/**` route chunk are excluded from content pages' bundle — `exceljs` dynamically imported only on the export action (plan.md Risk 3). Measured: `main.js` 147.0 KB gzip (budget 200 KB, Spec 002 post-fix baseline 146.6 KB); `exceljs` absent from `main.js`, lives in its own 257 KB gzip chunk loaded only on export click.
- [X] T065 Run `npm run test:rls` and `npm run test:e2e` in full and confirm they pass alongside the existing Spec 001/002 suites with no regression
- [X] T066 Run quickstart.md's end-to-end validation against the live self-hosted instance: migration order, Storage bucket creation, every happy-path and RLS check in its tables. Found and fixed a real doc gap (missing `cd ~/supabase-project` context) and confirmed the auto-archive trigger live through the real admin UI, not just simulated.
- [X] T067 Log plan.md's Follow-ups (quiz/answer-key authoring UI, rejoin-after-removal semantics, grading-queue pagination beyond SC-005's scale) in `specs/backlog.md` for a future spec, per Constitution Art. VI.2
- [X] T072 Performance check (Constitution Art. VII engineering gate, SC-005): seed a 200-student class with representative submissions/grades; measure p95 latency for submitting work, opening the grading queue, and loading the roster against the <5s target; record results in quickstart.md. Results: roster 127ms, grading queue 354ms, submission write 36ms — all comfortably under the 5s target (14-139x margin).

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories.
- **User Stories (Phase 3–8)**: All depend on Foundational phase completion. US1 must land first
  in practice (every later story's tables FK into `classes`/`enrollments`), but US2–US6 can then
  proceed in priority order or in parallel by story once their own migration dependencies (noted
  per-task above) are satisfied.
- **Polish (Phase 9)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational — no dependency on other stories. **This is the MVP.**
- **US2 (P1)**: Requires US1's `classes`/`enrollments` tables (migrations T013, T016) to exist; otherwise independently testable.
- **US3 (P1)**: Requires US2's `submissions` table (T030); otherwise independently testable.
- **US4 (P2)**: Requires only Foundational + Spec 002's `is_verified_teacher()` — no dependency on US2/US3's tables, though its UI slot (T049) extends US3's queue page.
- **US5 (P2)**: Requires US3's `grades` table (T042) for a meaningful export; soft dependency on US6's `quiz_best_scores` (export still works with zero quiz rows if US6 isn't built).
- **US6 (P3)**: Requires US2's `assignments` table (T029); otherwise independently testable.

### Within Each User Story

- Tests MUST be written and FAIL before implementation.
- Migrations before `src/lib/*` wrappers before pages.
- Story complete and checkpointed before moving to the next priority (or in parallel, if staffed).

### Parallel Opportunities

- All Foundational `[P]` tasks (T003–T005) can run in parallel once T002 lands.
- All tests within a story marked `[P]` can run in parallel.
- `src/lib/*` implementation tasks marked `[P]` within a story can run in parallel once that
  story's migrations are applied.
- US4 and US5 have no dependency on each other and can be built in parallel by different people
  once US3 (US4/US5's soft prerequisite) is checkpointed.

---

## Parallel Example: User Story 1

```bash
# Launch all US1 tests together (after Foundational is checkpointed):
Task: "RLS test in tests/rls/class-create-roster.test.mjs"
Task: "RLS test in tests/rls/class-join-code-lifecycle.test.mjs"
Task: "RLS test in tests/rls/class-archive-reactivate.test.mjs"
Task: "RLS test in tests/rls/class-auto-archive.test.mjs"
Task: "RLS test in tests/rls/class-guard-trigger.test.mjs"
Task: "RLS test in tests/rls/enrollment-isolation.test.mjs"
Task: "E2E test in tests/e2e/classes-lifecycle.spec.ts"

# Launch parallel implementation once migrations (T013-T017) are applied:
Task: "Implement src/lib/classes.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories).
3. Complete Phase 3: User Story 1.
4. **STOP and VALIDATE**: run all of Phase 3's "Tests for User Story 1" (T006–T012, T070, T077)
   against a live instance; confirm the roster/join/remove/restore/archive flows work
   independently, per spec.md's own framing of US1 as usable on its own (e.g. as an attendance
   reference).
5. Deploy/demo if ready.

### Incremental Delivery

1. Setup + Foundational → foundation ready.
2. US1 → test independently → deploy/demo (MVP!).
3. US2 → test independently → deploy/demo (assign + submit now works).
4. US3 → test independently → deploy/demo (the full core loop now works — this is the feature's
   own stated definition of done).
5. US4, US5 → each independently deployable, any order, P2 polish on top of the core loop.
6. US6 → independently deployable, P3, no dependency on US4/US5.
7. Phase 9: Polish, then merge.

### Security-gate note

Per Constitution Art. VII, the engineering gate requires RLS policies tested with the negative
cases proven, not just the happy path. Every `[US*]` test task above encodes at least one negative
assertion from data-model.md's access-control matrix — none are optional "nice to have" tests; a
story is not checkpointed as complete until its RLS tests pass, including the denial cases.

---

## Notes

- `[P]` tasks = different files, no dependencies on incomplete tasks.
- `[Story]` label maps every implementation/test task to its user story for traceability.
- Each user story is independently completable and testable, per spec.md's own "Independent Test"
  framing for each story.
- Verify tests fail before implementing (tests are written first in every story's phase).
- Commit after each task or logical group.
- Stop at any checkpoint to validate a story independently before moving on.
- Avoid: vague tasks, same-file conflicts inside a `[P]` group, cross-story dependencies that
  break a story's independent testability beyond the explicit soft dependencies noted above.
