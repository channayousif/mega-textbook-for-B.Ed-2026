# Contract: Classes, Assignments & Grading Operations

**Feature**: 003-classes-assignments | **Date**: 2026-07-19

Same shape as Spec 002's contract: **no bespoke REST API**. Per Constitution Art. V.1 the client
talks to Supabase directly (PostgREST) with the anon key plus the caller's own JWT; authorization
is enforced by RLS and two `SECURITY DEFINER` RPC functions — not by an application server. This
feature introduces **zero Edge Functions** (see [research.md](./../research.md) R2 for why).

Anything not listed is denied by default.

---

## A. Class lifecycle

| Op | Call | Who | Result |
|---|---|---|---|
| Create class | `insert into classes (teacher_id, course_code, name, term_label, join_code) ...` | any active teacher | 1 row, `status='active'` — FR-001 |
| Reissue join code | `update classes set join_code=<new> where id=…` | owning teacher (active — not suspended; role change alone doesn't block this, see data-model.md) | 1 row; old code stops matching any row — FR-002 |
| Revoke join code | `update classes set join_code=null where id=…` | owning teacher (active — not suspended) | 1 row; new joins fail, roster unchanged — FR-002 |
| Archive | `update classes set status='archived' where id=…` | owning teacher (eligible) or admin | 1 row — FR-015 |
| Reactivate | `update classes set status='active' where id=…` | owning teacher (**currently** eligible) or admin | 1 row — 2026-07-19 clarification |
| Reactivate (ineligible teacher) | same | ineligible teacher (role changed, or suspended) | **error** (`guard_class_updates` trigger) |
| Join a class (first time) | `select join_class_by_code('ABC123')` (RPC) | any signed-in student, no prior enrollment for this class | new `active` enrollment row — FR-003 |
| Join a class (already active) | same | student already `active` in this class | no-op, returns existing row — idempotent |
| Join a class (invalid/expired/archived code) | same | any signed-in student | uniform "invalid code" error, no existence disclosure — FR-003 |
| Join a class (removed student re-entering the code) | same | student with a `removed` enrollment for this class | **distinct rejection** ("you were removed by your teacher") — never reactivates the row — FR-018, 2026-07-19 clarification |
| Remove a student | `update enrollments set status='removed', removed_at=now() where id=…` | owning teacher | 1 row; student loses class/assignment access, history preserved — FR-018 |
| Remove a student (not owner) | same | non-owning teacher | **error** — FR-018 |
| Restore a student | `update enrollments set status='active', removed_at=null where id=…` | owning teacher | 1 row; student regains access — FR-022 |
| Restore a student (not owner) | same | non-owning teacher | **error** — FR-022 |
| Auto-archive on ineligibility | *(system trigger, no client call)* | — | fires when an admin changes a teacher's `role`/`status` on `profiles` — FR-020 |

**Denial shapes**: reads of another teacher's class or roster return **zero rows** (RLS); a
disallowed `classes` column write, an ineligible reactivate attempt, or a non-owning teacher's
remove/restore attempt **raises an error**; `join_class_by_code`'s two failure modes (invalid
code vs. "you were removed") are deliberately different shapes for different reasons — the first
avoids existence disclosure to an unrelated guesser, the second informs a known former member of
their own status, which discloses nothing they don't already know. Same two-shape convention as
Spec 002's contract, extended with this one deliberate exception.

---

## B. Assignments

| Op | Call | Who | Result |
|---|---|---|---|
| Create (unit-linked) | `insert into assignments (class_id, source_kind, course_code, unit_no, title, due_at, max_mark, allow_late) ...` | owning teacher, class `active` | 1 row, `published=false` — FR-004, FR-005 |
| Create (custom) | same, `source_kind='custom'`, `course_code`/`unit_no` NULL | owning teacher | 1 row — FR-004 |
| Publish | `update assignments set published=true where id=…` | owning teacher | visible to enrolled students — FR-005 |
| Unpublish | `update assignments set published=false where id=…` | owning teacher, any time | hidden from students; submissions/grades untouched — 2026-07-19 clarification |
| List published (student) | `select * from assignments where class_id=… and published=true` | enrolled student | rows for classes they're enrolled in — FR-006 |
| List all (teacher) | `select * from assignments where class_id=…` | owning teacher | all rows incl. unpublished — FR-006 |

---

## C. Submissions

| Op | Call | Who | Result |
|---|---|---|---|
| Submit (first time) | `insert into submissions (assignment_id, text_content, file_path, ...) ...` | enrolled student | 1 row, `late` set from `now()` vs `due_at` — FR-007, FR-008 |
| Submit after due date, late allowed | same | enrolled student | 1 row, `late=true` — FR-008 |
| Submit after due date, late not allowed | same | enrolled student | **error** — FR-008 |
| Resubmit (before due date) | `update submissions set text_content=…, file_path=… where id=…` | owning student, `now() ≤ due_at` | row overwritten, no history — 2026-07-19 clarification |
| Resubmit (after due date) | same | owning student, `now() > due_at` | **error** — 2026-07-19 clarification |
| Upload file | Storage `upload('submissions/{assignment_id}/{student_id}/{name}', file)` | enrolled student | object stored if ≤10 MB and an allowed MIME type, else **rejected pre-upload** — FR-009 |
| Download own/other's file | Storage `createSignedUrl(path)` | student (own) / owning teacher (any in their class) | signed URL, or **denied** — `can_access_submission_file()` |

---

## D. Grading

| Op | Call | Who | Result |
|---|---|---|---|
| List submission queue | `select ... from submissions join grades ...` (+ enrolled-student LEFT JOIN for "missing") | owning teacher | full class roster with per-student status — FR-010, US3 AS4 |
| Grade & return | `insert into grades (submission_id, mark, feedback, graded_by) ...` | owning teacher | 1 row; student sees result immediately — FR-010 |
| Grade above max | same, `mark > assignment.max_mark` | owning teacher | **error** (`enforce_max_mark`) — FR-010 edge case |
| Edit returned grade | `update grades set mark=…, feedback=… where id=…` | owning teacher | student sees corrected result, not original — FR-011 |
| Read own grade | `select * from grades where submission_id in (select id from submissions where student_id=current_profile_id())` | student | own grades only, always already-returned — FR-012 |
| Read another student's grade | same, other `student_id` | student | **0 rows** — FR-012, SC-004 |

---

## E. Auto-graded quiz

| Op | Call | Who | Result |
|---|---|---|---|
| Read quiz questions | `select * from quiz_items_public where course_code=… and unit_no=…` | any authenticated user | questions + options, **no `correct_option`** — FR-017 |
| Submit attempt | `select submit_quiz_attempt(assignment_id, answers)` (RPC) | enrolled student, `now() ≤ due_at` | score computed server-side, 1 `quiz_attempts` row — FR-017 |
| Submit attempt after due date | same | enrolled student, `now() > due_at` | **error** — 2026-07-19 clarification |
| Retake | same RPC again | enrolled student | additional `quiz_attempts` row; best score is the record — 2026-07-19 clarification |
| Read best score (teacher) | `select * from quiz_best_scores where assignment_id=…` | owning teacher | one row per student, `max(score)` — FR-017 |
| Read `quiz_items.correct_option` (base table) | `select * from quiz_items where …` | unverified teacher or student | **0 rows** — FR-013, SC-004 |
| Read `quiz_items.correct_option` | same | verified teacher or admin | full rows — FR-013 |

---

## F. Restricted material (answer keys)

| Op | Call | Who | Result |
|---|---|---|---|
| Read answer key / rubric | `select * from answer_keys where course_code=… and unit_no=… and kind=…` | verified teacher or admin | 1 row — FR-013 |
| Read answer key / rubric | same | unverified teacher or student | **0 rows** — FR-013, SC-004 |

---

## G. Gradebook export

Purely client-side: query every `enrollments` (active or removed, per FR-019/FR-018) ×
`assignments` × `grades`/`quiz_best_scores` row for a class the teacher owns (all already
RLS-scoped to that teacher), then generate an `.xlsx` file in-browser with `exceljs` (R5) and
trigger a download. No new database object beyond ordinary SELECTs already covered above.

---

## H. Contract test checklist

Each row is an executable assertion for the RLS suite that SC-004 requires, extending
`tests/rls/`.

- [ ] Teacher creates a class; join code is unique and non-guessable-in-practice — FR-001
- [ ] Reissued join code: old code fails to enroll, existing roster unaffected — FR-002, US1 AS3
- [ ] Revoked join code: new joins fail, existing roster unaffected — FR-002, US1 AS4
- [ ] `join_class_by_code` with a valid code enrolls the caller immediately — FR-003
- [ ] `join_class_by_code` with an invalid/expired/archived-class code: uniform denial, no
      existence disclosure — US1 AS3, edge case
- [ ] `join_class_by_code` from a student with a `removed` enrollment for that class: distinct
      rejection message (not the uniform invalid-code one), the row is never reactivated —
      FR-018, 2026-07-19 clarification
- [ ] Teacher restores a removed student: enrollment returns to `active`, student regains
      view/submit access to published assignments — FR-022
- [ ] A teacher cannot restore a student removed from another teacher's class — FR-022, SC-004
- [ ] Unpublished assignment: 0 rows for an enrolled student; visible to the owning teacher —
      FR-005
- [ ] Unpublishing a published assignment with existing submissions hides it from the student but
      preserves the submission/grade rows unchanged — 2026-07-19 clarification
- [ ] On-time submission before due date: `late=false` — FR-008
- [ ] Late submission when `allow_late=true`: accepted, `late=true` — FR-008
- [ ] Late submission when `allow_late=false`: rejected — FR-008
- [ ] Resubmission before due date overwrites the existing row (still one row) — 2026-07-19
      clarification
- [ ] Resubmission attempt after due date: rejected regardless of on-time/late origin —
      2026-07-19 clarification
- [ ] Upload exceeding 10 MB or an unlisted MIME type: rejected before it counts as a submission
      attempt — FR-009
- [ ] Teacher's submission queue shows a non-submitting student as "missing" once the due date has
      passed — US3 AS4
- [ ] Grade exceeding `max_mark`: rejected — FR-010 edge case
- [ ] Edited grade: student's subsequent read reflects the new mark/feedback, not the original —
      FR-011
- [ ] Student cannot `SELECT` another student's `submissions`/`grades` — FR-012, SC-004
- [ ] Removed student: denied all class/assignment access; prior `submissions`/`grades` remain
      teacher-visible — FR-018
- [ ] Tombstoned (deleted) student's `grades`/`submissions` remain intact, displayed anonymised
      (`profiles.full_name IS NULL`) — FR-019
- [ ] Admin changes a teacher's `role` away from `teacher` (or suspends them): all that teacher's
      `active` classes become `archived`, `archived_reason='role_change'` — FR-020
- [ ] The now-ineligible teacher cannot reactivate their own auto-archived class; an admin can —
      2026-07-19 clarification
- [ ] Unverified teacher or student: `quiz_items.correct_option` and `answer_keys` both return
      0 rows — FR-013, SC-004
- [ ] `quiz_items_public` exposes questions/options but never `correct_option` — FR-013
- [ ] `submit_quiz_attempt` computes score server-side; a direct client `INSERT` on
      `quiz_attempts` is rejected — FR-017, SC-004
- [ ] Multiple quiz attempts before the due date: `quiz_best_scores` reflects the highest, not the
      latest — 2026-07-19 clarification
- [ ] Quiz attempt after the due date: rejected — 2026-07-19 clarification
