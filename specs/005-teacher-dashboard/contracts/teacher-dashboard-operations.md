# Contract: Teacher Dashboard Operations

**Feature**: 005-teacher-dashboard | **Date**: 2026-07-24

Same shape as Specs 002–004's contracts: **no bespoke REST API**. Per Constitution Art. V.1 the
client talks to Supabase directly (PostgREST) with the anon key plus the caller's own JWT;
authorization is enforced by RLS and one guard trigger — not by an application server. This
feature introduces **zero Edge Functions** and **zero new client-writable RPCs**.

Anything not listed is denied by default.

---

## A. Teaching log

| Op | Call | Who | Result |
|---|---|---|---|
| Log a teaching activity | `insert into teaching_log_entries (teacher_id, class_id, course_code, unit_no, source_kind, occurred_on, duration_minutes, reflection) values (current_profile_id(), …)` | signed-in teacher, `class_id` must be a class they own | 1 row — FR-006 |
| Log against a class the caller doesn't own | same shape, `class_id` owned by another teacher | any teacher | **denied** (RLS `WITH CHECK`'s `exists (...)` subquery) |
| Read own teaching log | `select * from teaching_log_entries where teacher_id = current_profile_id() order by occurred_on desc` | signed-in teacher | own rows only, most-recent-first — FR-006 |
| Edit or delete a log entry | any shape | any teacher, including the owner | **denied** — no `UPDATE`/`DELETE` policy exists at all |

**Denial shapes**: a `class_id` the caller doesn't own is rejected by the `WITH CHECK` subquery
(0 rows affected, `WITH CHECK` violation) — same shape as any other RLS `WITH CHECK` failure
elsewhere in this codebase.

---

## B. Activity feedback

| Op | Call | Who | Result |
|---|---|---|---|
| Rate an activity for the first time | `insert into activity_feedback (teacher_id, course_code, unit_no, source_kind, rating, what_worked, what_didnt, actual_minutes) values (current_profile_id(), …)` | signed-in teacher | 1 row — FR-007 |
| Re-rate the same activity | `insert ... on conflict (teacher_id, course_code, unit_no, source_kind) do update set rating=…, what_worked=…, what_didnt=…, actual_minutes=…, updated_at=now()` | signed-in teacher, own row only | existing row updated in place, not duplicated — FR-007, Key Entities |
| Read own feedback for one activity (to show "invited to give feedback" vs. existing rating) | `select * from activity_feedback where teacher_id = current_profile_id() and course_code = … and unit_no = … and source_kind = …` | signed-in teacher | own row only, or no row (never-rated) — FR-007 |
| Read another teacher's individual feedback row | any shape | any teacher (non-admin) | **denied** |
| Admin: aggregated feedback per activity | `select course_code, unit_no, source_kind, avg(rating), array_agg(what_didnt) from activity_feedback where course_code=… and unit_no=… and source_kind=… group by …` | admin only (RLS admits admin to all rows; grouping/aggregation is ordinary client-side or SQL aggregation over an admin-readable set) | average rating + every recorded `what_didnt` note — FR-008 |

**Denial shapes**: a non-owning teacher's read of another teacher's row returns 0 rows (RLS
default-deny), same shape as Spec 003's cross-teacher submission isolation.

---

## C. Improvement suggestions

| Op | Call | Who | Result |
|---|---|---|---|
| File a suggestion | `insert into improvement_suggestions (teacher_id, page_slug, section_anchor, locale, course_code, unit_no, category, body) values (current_profile_id(), …)` (`status` defaults to `'submitted'`) | signed-in teacher | 1 row, `status='submitted'` — FR-003 |
| File a suggestion from a course-overview page (`unit_no` absent from front matter) | same shape, `unit_no = null` | signed-in teacher | 1 row, `unit_no = null` — **accepted, not rejected** (research.md R1, 2026-07-24 remediation) — FR-003 |
| File with a forged non-`submitted` status | same shape, explicit `status` other than `'submitted'` | any teacher | **denied** (RLS `WITH CHECK`) |
| Read own suggestions | `select * from improvement_suggestions where teacher_id = current_profile_id()` | signed-in teacher | own rows only, every status/note visible — FR-004 |
| Edit own suggestion's body/category after filing | any `UPDATE` shape | filing teacher | **denied** — no teacher `UPDATE` policy exists at all, only admin |
| Admin: filter moderation queue | `select * from improvement_suggestions where status=… and category=… and course_code=…` (any subset of filters) | admin only | matching rows across every teacher — FR-005 |
| Admin: transition status + note | `update improvement_suggestions set status=…, admin_note=… where id=…` | admin only, and only along the legal transition graph | row updated, `updated_at` bumped — FR-005 |
| Admin: illegal transition (skip a step, move backward, or touch a terminal row) | same shape, illegal target `status` | admin | **denied** (`enforce_suggestion_status_transition()` trigger) |
| Admin: attempt to change `body`/`category`/`teacher_id`/etc. | `update ... set body = …` | admin | **denied** (same trigger's column restriction) |
| Teacher (non-admin) attempts the moderation queue or a status transition | any shape | non-admin teacher | **denied** (RLS `UPDATE` policy is `is_admin()`-only; the moderation queue page itself is admin-gated at the route level too, cosmetically) |
| Student reaches any of the above | any shape | student | **denied** — FR-013, SC-007 |

**Denial shapes**: an illegal transition or forbidden column change raises from
`enforce_suggestion_status_transition()` with a recognizable error (mirrors Spec 003's
`enforce_max_mark()` precedent of a distinct, client-mappable message) — not a silent no-op, since
an admin acting on a real moderation queue should see *why* an action failed, unlike the
never-user-reachable forged-`method` case in Spec 004.

---

## D. Overview and Analytics reads (existing Spec 003 tables — no new policy needed)

| Op | Call | Who | Result |
|---|---|---|---|
| Overview: per-class ungraded count | `select ... from submissions join assignments ...` scoped to the teacher's own classes | signed-in teacher | own classes only, grouped by class — FR-002 |
| Overview: 5 soonest-due assignments | `select ... from assignments where class_id in (...) and due_at >= now() order by due_at asc limit 5` | signed-in teacher | across all of the teacher's own classes — FR-002 |
| Overview: 10-item recent activity | `select ... from submissions ...` + `select ... from quiz_attempts ...`, merged client-side | signed-in teacher | own classes only — FR-002 |
| Analytics: distribution/trend/unit average | Reuses `gradebookExport.ts`'s existing grades+`quiz_best_scores` merge, scoped to one owned `class_id` | signed-in teacher | own class only — FR-009 |
| Analytics: at-risk flag | Computed client-side over the same merged data | signed-in teacher | own class only, never surfaced to the student — FR-010 |
| Student drill-down: submissions/grades/coverage | `select ...` scoped to `(class_id, student_id)`, `class_id` owned by caller | signed-in teacher | own class only, no cross-class leakage — FR-011, SC-004 |

All seven rows above reuse Spec 003's existing RLS policies verbatim (a teacher already has
`SELECT` on their own classes' `submissions`/`grades`/`quiz_attempts`/`assignments`) — this feature
adds **no new policy** for these reads, only new client-side query composition and aggregation.

---

## Contract test checklist (extends `tests/rls/`)

1. A teacher can insert a `teaching_log_entries` row for a class they own; the same insert for a
   class owned by another teacher is rejected.
2. A teacher cannot `SELECT` another teacher's `teaching_log_entries` rows.
3. No `UPDATE`/`DELETE` path exists on `teaching_log_entries` for any actor, including the owner.
4. A teacher can insert then re-rate (upsert) their own `activity_feedback` for the same activity —
   exactly one row results, with updated fields and a bumped `updated_at`.
5. A teacher cannot `SELECT` another teacher's individual `activity_feedback` row.
6. An admin can `SELECT` every teacher's `activity_feedback` rows for one activity and compute an
   aggregate; a non-admin teacher cannot.
7. A teacher can insert an `improvement_suggestions` row only with `status='submitted'`; any other
   explicit `status` on insert is rejected.
8. A teacher cannot `UPDATE` any `improvement_suggestions` row, including their own.
9. An admin can filter the moderation queue by any combination of `status`/`category`/`course_code`.
10. An admin's legal transition (`submitted→under_review→accepted→published`, or
    `under_review→rejected`) succeeds and bumps `updated_at`; every illegal transition (skip,
    backward, or touching a terminal row) is rejected.
11. An admin's attempt to change any column other than `status`/`admin_note` is rejected by the
    same trigger.
12. A student cannot read or write any of the three new tables through any query path — FR-013.
13. A teacher's Overview ungraded-count/due-dates/recent-activity queries return data only for
    classes they own — no other teacher's class ever appears.
14. Analytics and the student drill-down return data only for one class the caller owns; a
    `class_id`/`student_id` combination outside that ownership returns zero rows, never another
    class's data.
15. The student drill-down's unit-coverage figure is computed without any query touching
    `unit_progress` or `student_achievements` — confirmed by asserting a teacher's role still
    cannot `SELECT` either table directly (Spec 004's existing RLS, re-verified unchanged).
16. FR-010's at-risk flag never appears on the student's own dashboard (`/app/dashboard/*`,
    Spec 004) for any student, under any condition — mirrors Spec 004's own FR-010 in the opposite
    direction.
17. A suggestion filed from a course-overview page (no `unit_no` in front matter) is accepted with
    `unit_no = null`, not rejected — the moderation queue's course filter still works since
    `course_code` remains required (2026-07-24 remediation, research.md R1).
