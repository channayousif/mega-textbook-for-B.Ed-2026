# Phase 1 Data Model: Teacher Dashboard, Feedback & Book Improvement Loop

**Feature**: 005-teacher-dashboard | **Date**: 2026-07-24 | **Spec**: [spec.md](./spec.md)

Three new tables live in the Supabase Postgres `public` schema with RLS **enabled**, extending
Spec 002 (`profiles`) and Spec 003 (`classes`, `enrollments`, `assignments`, `submissions`,
`grades`, `quiz_attempts`, `quiz_best_scores`). Every FK that points at a person references
`profiles(id)` (never `auth.users(id)`), consistent with Spec 002's tombstone-survival design.
`is_admin()`, `is_active_user()`, and `current_profile_id()` are reused unmodified from
`supabase/migrations/0004_is_admin.sql`.

**Spec 004's `unit_progress` and `student_achievements` tables are not touched by this feature in
any way** — no new column, no new RLS policy, no new read. FR-011's unit coverage is computed
independently (see "Read-only query shapes" below), per the 2026-07-24 clarification (research.md
R3).

This feature reads more than it writes: the Overview and Analytics areas are pure `SELECT`s/
aggregations over Spec 003's existing tables (no schema change there — see "Read-only query
shapes"). Only the teaching log, activity feedback, and improvement suggestions need new storage.

---

## Entity: `teaching_log_entries`

Maps spec entity **Teaching Log Entry**. One row per logged classroom activity.

| Column | Type | Constraints | Maps to |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | — |
| `teacher_id` | `uuid` | NOT NULL, FK → `profiles(id)` | FR-006 |
| `class_id` | `uuid` | NOT NULL, FK → `classes(id)` | FR-006 |
| `course_code` | `text` | NOT NULL | FR-006 |
| `unit_no` | `integer` | NOT NULL | FR-006 |
| `source_kind` | `text` | NOT NULL, CHECK IN `('activity','formative','summative')` | FR-006, spec.md Assumptions ("Activity reference reuses Spec 003's existing shape") |
| `occurred_on` | `date` | NOT NULL | FR-006 (the class date) |
| `duration_minutes` | `integer` | NOT NULL, CHECK `> 0` | FR-006 |
| `reflection` | `text` | NOT NULL | FR-006 |
| `created_at` | `timestamptz` | NOT NULL, default `now()` | — |

`course_code`/`unit_no`/`source_kind` are unvalidated pointers into Git-tracked content, exactly
like Spec 003's `assignments` (research.md R2) — never duplicated into a content table.

### RLS policies

- `SELECT`: the owning teacher (`teacher_id = current_profile_id()`); admin (all rows, read-only
  support). No student access at all — this is a teacher's private log, not named in any student-
  facing FR, and denied like every other route in this feature (FR-013).
- `INSERT`: the owning teacher, and only for a class they themselves own:
  ```sql
  with check (
    teacher_id = current_profile_id()
    and exists (select 1 from classes c where c.id = class_id and c.teacher_id = current_profile_id())
  )
  ```
  A teacher logging against a `class_id` they don't own is rejected by this `WITH CHECK`, not left
  to the client to prevent.
- No `UPDATE`/`DELETE` policy — a log entry, once created, is immutable, matching FR-006's "log it
  in seconds" one-shot flow; nothing in the spec asks for editing a past entry (Spec 004's
  `unit_progress` set the same "no update policy at all" precedent for a similarly one-shot record).

---

## Entity: `activity_feedback`

Maps spec entity **Activity Feedback**. One row per teacher per book activity they have rated;
a repeat submission for the same activity **updates** the existing row (upsert), it does not error
or create a second row.

| Column | Type | Constraints | Maps to |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | — |
| `teacher_id` | `uuid` | NOT NULL, FK → `profiles(id)` | FR-007 |
| `course_code` | `text` | NOT NULL | FR-007 |
| `unit_no` | `integer` | NOT NULL | FR-007 |
| `source_kind` | `text` | NOT NULL, CHECK IN `('activity','formative','summative')` | FR-007 |
| `rating` | `integer` | NOT NULL, CHECK `rating BETWEEN 1 AND 5` | FR-007 |
| `what_worked` | `text` | nullable | FR-007 |
| `what_didnt` | `text` | nullable | FR-007 |
| `actual_minutes` | `integer` | NOT NULL, CHECK `> 0` | FR-007 (2026-07-24 clarification: no comparison baseline — actual time only) |
| `created_at` | `timestamptz` | NOT NULL, default `now()` | — |
| `updated_at` | `timestamptz` | NOT NULL, default `now()` | bumps on the upsert path |

```sql
unique (teacher_id, course_code, unit_no, source_kind)
```

**Design decision — upsert, not error, on repeat submission**: not explicitly specified by the
spec (User Story 5's acceptance scenarios only distinguish "has rated" vs. "has not yet rated," not
first-vs-repeat), but a repeat rating updating the existing record in place is the least surprising
behavior and avoids an unhelpful unique-constraint error reaching the UI. Both `INSERT ... ON
CONFLICT (teacher_id, course_code, unit_no, source_kind) DO UPDATE` and a direct `UPDATE` require
matching RLS grants (below).

### RLS policies

- `SELECT`: the owning teacher (own rows only, `teacher_id = current_profile_id()`) **or** admin
  (all rows — FR-008 requires admin to aggregate across every teacher, not merely "support read").
  No other teacher may read another teacher's individual feedback row (only the aggregate, which
  is admin-only per FR-008 — this feature does not expose peer-teacher feedback sharing).
- `INSERT`: `with check (teacher_id = current_profile_id())`.
- `UPDATE`: `using (teacher_id = current_profile_id()) with check (teacher_id = current_profile_id())`
  — supports the upsert path above; a teacher may only ever update their own row.
- No `DELETE` policy — nothing in the spec allows withdrawing feedback entirely.

---

## Entity: `improvement_suggestions`

Maps spec entity **Improvement Suggestion**. One row per suggestion filed against a specific book
page/section.

| Column | Type | Constraints | Maps to |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | — |
| `teacher_id` | `uuid` | NOT NULL, FK → `profiles(id)` | FR-003 (filing teacher) |
| `page_slug` | `text` | NOT NULL | FR-003 |
| `section_anchor` | `text` | nullable — `null` means "top of page, before any heading" (research.md R1) | FR-003 |
| `locale` | `text` | NOT NULL, CHECK IN `('en','ur')` | FR-003 |
| `course_code` | `text` | NOT NULL | FR-005 (moderation queue's "course" filter) |
| `unit_no` | `integer` | nullable — `null` when filed against a course-level page (e.g. `course-overview.mdx`) rather than a specific unit | FR-003 |
| `category` | `suggestion_category` enum | NOT NULL | FR-003 |
| `body` | `text` | NOT NULL | FR-003 |
| `status` | `suggestion_status` enum | NOT NULL, default `'submitted'` | FR-004, FR-005 |
| `admin_note` | `text` | nullable | FR-004, FR-005 |
| `created_at` | `timestamptz` | NOT NULL, default `now()` | — |
| `updated_at` | `timestamptz` | NOT NULL, default `now()` | bumps on every status change |

```sql
create type suggestion_category as enum ('typo', 'clarity', 'factual', 'pedagogy', 'translation', 'other');
create type suggestion_status as enum ('submitted', 'under_review', 'accepted', 'rejected', 'published');
```

**Design decision — course-overview pages (2026-07-24 remediation, research.md R1)**: a suggestion
filed from a course-overview page (e.g. `course-overview.mdx`, which carries `course_code` but no
`unit_no` in its front matter) has `unit_no = null` — it is not treated as a unit-specific
suggestion. The moderation queue's "course" filter (FR-005) still works unaffected, since
`course_code` remains required regardless of whether `unit_no` is present.

**Design decision — a page is renamed/removed later (edge case)**: `page_slug`/`section_anchor`
are captured once, at filing time, and never re-validated against the live content tree — exactly
as spec.md's edge case requires ("the suggestion keeps its originally captured slug/anchor as a
historical record"). No FK, no trigger re-checks these against `static/content-index.json`.

### RLS policies

- `SELECT`: the filing teacher (own rows, `teacher_id = current_profile_id()`) **or** admin (all
  rows — FR-005's moderation queue). No other teacher may see another teacher's suggestion.
- `INSERT`: `with check (teacher_id = current_profile_id() and status = 'submitted')` — a
  suggestion is always filed at `submitted`; a client cannot insert directly into any other status.
- `UPDATE`: `using (is_admin()) with check (is_admin())` — **only an admin** may update a row at
  all (FR-005: "only an admin MUST be able to change a suggestion's status"). The filing teacher
  has no update path whatsoever — nothing in the spec allows editing a suggestion's body/category
  after filing.
- No `DELETE` policy.

### Validation rules / guard trigger

`enforce_suggestion_status_transition()` (`BEFORE UPDATE ON improvement_suggestions`, research.md
R5) — narrows the row-level `UPDATE` policy above (which already restricts row access to admins)
to specific columns and specific transitions, since RLS alone cannot express either:
- Non-`status`/`admin_note` columns (`teacher_id`, `page_slug`, `section_anchor`, `locale`,
  `course_code`, `unit_no`, `category`, `body`, `created_at`) are immutable for every caller,
  including admin, through any client path — no client write ever needs to touch them again once
  filed.
- `status` may only move `submitted → under_review`, `under_review → accepted`, `under_review →
  rejected`, or `accepted → published`. Any other target (skipping a step, moving backward, or
  updating an already-`rejected`/`published` row's status) raises.
- `updated_at` bumps on every permitted update, so "a status change... is visible on the filing
  teacher's own tracker" (SC-002) has a concrete timestamp to key off if ever needed for display.

### State transitions

```
[teacher files suggestion] ──▶ submitted
submitted ──admin──▶ under_review
under_review ──admin──▶ accepted
under_review ──admin──▶ rejected
accepted ──admin──▶ published
rejected, published ──▶ (terminal — no further transition)
```

---

## Relationships

```
profiles (Spec 002)
   │ 1:N (teacher_id)         │ 1:N (teacher_id)          │ 1:N (teacher_id)
   ▼                          ▼                           ▼
teaching_log_entries   activity_feedback           improvement_suggestions
   │
   └─N:1──▶ classes (Spec 003, must be owned by the same teacher_id)

All three tables' course_code/unit_no/source_kind (and improvement_suggestions' page_slug/
section_anchor/locale) are unvalidated pointers into Git-tracked content — no FK, no content table.
```

---

## Access-control matrix

Enforced at the database layer (Constitution Art. IX.2). Extends `tests/rls/`'s existing matrix.

| Actor | Own `teaching_log_entries` | Other teacher's `teaching_log_entries` | Own `activity_feedback` | Other teacher's `activity_feedback` | Own `improvement_suggestions` | Other teacher's `improvement_suggestions` |
|---|---|---|---|---|---|---|
| anonymous | denied | denied | denied | denied | denied | denied |
| student | denied | denied | denied | denied | denied | denied |
| teacher | read/insert own rows only | denied | read/insert/update (upsert) own rows only | denied | read/insert (status='submitted' only) own rows; **no update at all** | denied |
| admin | read all (support) | read all (support) | read all (aggregation, FR-008) | read all (aggregation, FR-008) | read all + **update status/admin_note only** (FR-005) | read all + update |

Key negative assertions to test (mirrors Specs 002–004's SC-004/SC-005 pattern):
1. A teacher cannot `SELECT`/`INSERT` a `teaching_log_entries` row for a `class_id` owned by
   another teacher — FR-006, SC-004.
2. A teacher cannot `SELECT` another teacher's `teaching_log_entries` or `activity_feedback` rows
   — FR-006, FR-007, SC-004.
3. A teacher cannot `SELECT` another teacher's individual `improvement_suggestions` row — only its
   aggregate (admin-only) is ever cross-teacher-visible.
4. A teacher cannot `UPDATE` any `improvement_suggestions` row, including their own — only an
   admin may (FR-005).
5. A direct client attempt to insert an `improvement_suggestions` row with `status != 'submitted'`
   is rejected — FR-003/FR-004.
6. An admin's `UPDATE` on `improvement_suggestions` that skips a transition step (e.g.
   `submitted → published` directly) or moves backward (e.g. `rejected → under_review`) is
   rejected by `enforce_suggestion_status_transition()` — research.md R5.
7. An admin's `UPDATE` attempting to change `body`/`category`/`teacher_id`/etc. (not
   `status`/`admin_note`) is rejected by the same trigger's column restriction.
8. A repeat `activity_feedback` submission for the same `(teacher_id, course_code, unit_no,
   source_kind)` updates the existing row (new `rating`/notes/`actual_minutes`, bumped
   `updated_at`) rather than erroring or creating a second row — the `unique` constraint plus the
   upsert-permitting `UPDATE` policy, FR-007's Key Entities note ("Multiple teachers may each leave
   one record for the same activity" — singular per teacher).
9. A student cannot reach any of the three new tables through any query path, insert or select —
   FR-013, SC-007.
10. A teacher cannot read Spec 004's `unit_progress` or `student_achievements` tables through any
    query path introduced by this feature — this feature adds **no** new grant on either table
    (research.md R3); Spec 004's existing "not even a teacher" RLS is unmodified and re-verified
    unchanged.

---

## Triggers & functions (new in this feature)

| Name | Timing | Purpose |
|---|---|---|
| `enforce_suggestion_status_transition()` | `BEFORE UPDATE ON improvement_suggestions` | Restrict admin updates to `status`/`admin_note`; allow only the documented one-directional status graph. → FR-005, research.md R5 |

Reused unmodified from Spec 002: `is_admin()`, `current_profile_id()`, `is_active_user()`. Reused
unmodified from Spec 004: `fetchTotalUnitsForCourse()` (client-side helper, not a DB function —
see "Read-only query shapes" below).

---

## Read-only query shapes (no new schema — existing Spec 003 tables, plus one Spec 004 client helper)

These back Overview and Analytics and involve no new tables, RLS policies, or triggers — listed
here so `/sp.tasks` can decompose them without re-deriving the joins from spec.md.

| Area | Source query shape |
|---|---|
| Overview — ungraded count per class (FR-002) | `submissions` joined to `assignments` (`class_id in` the teacher's own classes, via `classes.teacher_id = current_profile_id()`) **minus** rows with a matching `grades` row, grouped by `class_id`. Quiz-type assignments never populate `submissions` (they use `quiz_attempts`, auto-scored) and are therefore naturally excluded from "ungraded," consistent with Spec 003's existing status-computation precedent (`computeStudentStatus`). |
| Overview — 5 soonest-due assignments (FR-002, 2026-07-24 clarification) | `assignments` where `class_id in` the teacher's own **active** classes and `due_at >= now()`, `order by due_at asc limit 5` across all classes combined (not per class) |
| Overview — recent activity, 10 items (FR-002, 2026-07-24 clarification) | Two queries — `submissions` (`order by submitted_at desc limit 10`) and `quiz_attempts` (`order by attempted_at desc limit 10`), both joined through `assignments` to the teacher's own classes — merged client-side by timestamp, top 10 kept |
| Overview — "caught up" empty state (FR-002) | Client-side: render when the ungraded-count query returns 0 rows across every class **and** the soonest-due query returns 0 rows |
| Analytics — score distribution / unit average / trend (FR-009) | Reuses `gradebookExport.ts`'s existing per-student-per-assignment merge (`submissions.grades(mark)` for non-quiz, `quiz_best_scores` for quiz), normalized to `mark/max_mark`, scoped to one `class_id` the caller owns; grouped by assignment for distribution, by `(course_code, unit_no)` for the unit average, kept in `due_at` order per student for the trend (research.md R4) |
| Analytics — at-risk flag (FR-010) | Computed client-side over the same per-student merged array: ≥2 assignments with `due_at` passed and no `submissions`/`quiz_attempts` row, **or** the student's last 3 normalized scores each strictly lower than the one before |
| Student drill-down — submissions/grades (FR-011) | `submissions`/`grades`/`quiz_attempts` filtered to one `(class_id, student_id)` pair, `class_id` owned by the caller |
| Student drill-down — unit coverage (FR-011, 2026-07-24 clarification) | `count(distinct (course_code, unit_no))` across that student's graded `submissions` + `quiz_attempts` for the class's `course_code`, divided by `fetchTotalUnitsForCourse(class.course_code)` (Spec 004's existing client helper, `src/lib/unitProgress.ts`, reused unmodified) — **never** `unit_progress` (research.md R3) |

All of these are plain RLS-authorized `SELECT`s using the caller's own JWT — no new `SECURITY
DEFINER` RPC is needed for any of them, since Spec 003's existing RLS policies already scope every
row to the requesting teacher's own classes (or admin).
