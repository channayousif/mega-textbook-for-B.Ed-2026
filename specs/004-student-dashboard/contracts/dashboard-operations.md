# Contract: Student Dashboard Operations

**Feature**: 004-student-dashboard | **Date**: 2026-07-20

Same shape as Specs 002/003's contracts: **no bespoke REST API**. Per Constitution Art. V.1 the
client talks to Supabase directly (PostgREST) with the anon key plus the caller's own JWT;
authorization is enforced by RLS and `SECURITY DEFINER` functions — not by an application server.
This feature introduces **zero Edge Functions** and **zero new client-writable RPCs beyond one**
(`check_full_coverage_achievement`, a read-verifying call, not a data-mutating command in the
usual sense).

Anything not listed is denied by default.

---

## A. Unit coverage (self-marking)

| Op | Call | Who | Result |
|---|---|---|---|
| Mark a unit studied (dashboard or unit content page) | `insert into unit_progress (student_id, course_code, unit_no, method) values (current_profile_id(), …, …, 'self_marked') on conflict (student_id, course_code, unit_no) do nothing` | any signed-in student, own row only | 1 row on first mark; no-op (no error) on repeat — FR-006, User Story 4 AS2 |
| Mark a unit already covered via grade/quiz | same | student | no-op — `ON CONFLICT` — FR-006, User Story 4 AS3 |
| Attempt to insert `method != 'self_marked'` directly | same shape, forged `method` | any student | **denied** (RLS `WITH CHECK`) — only sync triggers may write those |
| Attempt to insert for another student | same, forged `student_id` | any student | **denied** (RLS `WITH CHECK`) |
| Read own coverage | `select course_code, unit_no from unit_progress where student_id = current_profile_id()` | signed-in student | own rows only — FR-005 |
| System-derived coverage (grading) | *(no client call — `sync_unit_progress_from_grade()` trigger)* | — | fires on every `grades` insert whose assignment has a unit — FR-005, FR-006 |
| System-derived coverage (quiz attempt) | *(no client call — `sync_unit_progress_from_quiz()` trigger)* | — | fires on every `quiz_attempts` insert — FR-005, FR-006 |

**Denial shapes**: a forged `method` or `student_id` on a direct `unit_progress` insert is denied
by RLS (0 rows affected, `WITH CHECK` violation) — the same shape as any other RLS `WITH CHECK`
failure elsewhere in this codebase, no bespoke error message needed since this path is never
user-reachable through the intended UI in the first place.

---

## B. Achievements

| Op | Call | Who | Result |
|---|---|---|---|
| Check/award 100% course coverage | `select check_full_coverage_achievement(p_course_code, p_total_units)` (RPC) | signed-in student, own progress only (function reads `current_profile_id()` internally) | `true` if newly or already granted, `false` otherwise — FR-008 |
| Read own earned achievements | `select * from student_achievements where student_id = current_profile_id()` | signed-in student | own rows only — FR-009 |
| Attempt direct `insert`/`update` on `student_achievements` | any shape | any student, including admin via client | **denied** — no client write policy exists at all; only `grant_achievement()` (internal) may write |
| System-derived grants (first submission, streak, on-time completion) | *(no client call — three `AFTER INSERT` triggers)* | — | fire on `submissions`/`unit_progress`/`grades` inserts respectively — FR-008 |

**Denial shapes**: `check_full_coverage_achievement` never fails loudly for a "not yet earned"
result — it simply returns `false`; there is no error path here since this is a benign check, not
an authorization-sensitive action. A direct client write attempt on `student_achievements` is
denied by the absence of any `INSERT`/`UPDATE` policy (0 rows, RLS default-deny), same shape as
Spec 003's `quiz_attempts`.

---

## C. Dashboard reads (existing Spec 003 tables — no new policy needed)

| Op | Call | Who | Result |
|---|---|---|---|
| Home: current semester + classes | `select ... from enrollments join classes ...` | signed-in student | own active enrollments only, unfiltered by semester; the "current semester" label is `max(semester)` from `content-index.json` across those classes' courses, not a filter (resolved via `/sp.analyze`, 2026-07-21) — FR-002 |
| Home/Assignments: due soon / all pending | `select ... from assignments left join submissions ...` | signed-in student | published, unsubmitted, ordered `due_at`; each row also carries `allow_late` and a computed `open`/`overdue-late-allowed`/`closed` state (resolved via `/sp.analyze`, 2026-07-21) — FR-002, FR-003 |
| Home/Grades: recent/all grades | `select ... from grades join submissions/assignments ...` | signed-in student | own returned grades only, no average computed — FR-002, FR-004 |
| History: past semesters | `select ... from classes where status='archived' ...` | signed-in student | frozen at archive time (Spec 003 read-only-once-archived guarantee) — FR-007 |

All four rows above reuse Spec 003's existing RLS policies verbatim (a student already has
`SELECT` on their own enrollments/assignments/submissions/grades) — this feature adds **no new
policy** for these reads, only new client-side query composition and aggregation.

---

## Contract test checklist (extends `tests/rls/`)

1. A student can insert a `self_marked` `unit_progress` row for themselves; a repeat insert is a
   no-op, not an error, and not a duplicate row.
2. A student cannot insert a `unit_progress` row with `method='assignment'`/`'quiz'` directly.
3. A student cannot insert a `unit_progress` row for a different `student_id`.
4. A student cannot `SELECT` another student's `unit_progress` rows.
5. Grading a unit-linked submission produces a `unit_progress` row with `method='assignment'`
   automatically; grading a `custom` assignment's submission produces no `unit_progress` row.
6. Submitting a quiz attempt produces a `unit_progress` row with `method='quiz'` automatically,
   even on a repeat/retake attempt (still exactly one row per unit).
7. A student's first-ever `submissions` insert grants `first_submission`; a second submission
   (any class) does not grant it again.
8. Three consecutive self-marked calendar days grant `study_streak` exactly once; a fourth
   consecutive day does not grant it again; a gap-then-resume streak re-evaluates correctly
   (grants again only if it had never been granted before — the `unique` constraint prevents a
   second grant regardless).
9. Completing every published assignment in a class on time grants
   `on_time_class_completion`; a class with zero published assignments never grants it; a late
   submission in an otherwise-complete class does not grant it.
10. `check_full_coverage_achievement` grants `full_course_coverage` only when the
    server-recomputed numerator meets the caller-supplied `p_total_units`, and only once even if
    called repeatedly after the condition is already true.
11. A student cannot directly `insert`/`update` `student_achievements` under any shape.
12. A teacher (owner or not, verified or not) cannot read another user's `unit_progress` or
    `student_achievements` rows through any query path — this feature grants teachers no access
    to either table at all.
13. An admin can read all `unit_progress`/`student_achievements` rows (support access) but cannot
    write to `student_achievements` directly either (same no-client-write-policy rule applies to
    admin as to students — only the internal `grant_achievement()` path writes, regardless of
    caller).
