# Phase 1 Data Model: Virtual Classes, Assignments & Assessments

**Feature**: 003-classes-assignments | **Date**: 2026-07-19 | **Spec**: [spec.md](./spec.md)

All tables live in the Supabase Postgres `public` schema with RLS **enabled**, extending Spec
002's schema. Every FK that points at a person references `profiles(id)` (never
`auth.users(id)` — see [research.md](./research.md) R9). `is_admin()`, `is_verified_teacher()`,
and `current_profile_id()` are reused from `supabase/migrations/0004_is_admin.sql` /
`0010_verified_teacher_gate.sql`; this feature's first migration drops
`_verified_teacher_gate_demo`, which existed only as a placeholder for this table set.

Course/unit content itself is **not** duplicated into Postgres — `course_code` and `unit_no`
columns are plain, unvalidated-by-FK pointers into the Git-tracked content (Constitution Art.
V.1: content and application state are separate concerns). The client validates these against
the build-time content index before allowing an assignment to be created; the database does not
and cannot enforce referential integrity into Git.

---

## Entity: `classes`

Maps spec entity **Class**.

| Column | Type | Constraints | Maps to |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | — |
| `teacher_id` | `uuid` | NOT NULL, FK → `profiles(id)`, **immutable after insert** | Class owner |
| `course_code` | `text` | NOT NULL, pattern `^[A-Z]{2,4}-[0-9]{3}(--)?$` | FR-001 |
| `name` | `text` | NOT NULL | FR-001 |
| `term_label` | `text` | NOT NULL | Key Entities: academic term label |
| `join_code` | `text` | UNIQUE, nullable (`NULL` = revoked) | FR-001, FR-002 |
| `status` | `class_status` enum | NOT NULL, default `'active'` | FR-015, FR-020 |
| `archived_reason` | `text` | nullable, `'manual'` \| `'role_change'` — **informational only, not an authorization input** | FR-015, FR-020 |
| `archived_at` | `timestamptz` | nullable | FR-015 |
| `created_at` | `timestamptz` | NOT NULL, default `now()` | — |

```sql
create type class_status as enum ('active', 'archived');
```

**Design decision — no generic "edit class details" capability**: the spec only requires join-code
reissue/revoke (FR-002), archive (FR-015), and reactivate (clarification, 2026-07-19). `name`,
`term_label`, and `course_code` are therefore set once at creation and not exposed as editable by
this feature — adding general class-editing would be scope beyond what's specified. A guard
trigger (below), not RLS alone, enforces this, mirroring Spec 002's
`guard_privileged_columns()` idiom for "some columns need a narrower rule than the row-level
policy can express."

### RLS policies

- `SELECT`: the owning teacher (`teacher_id = current_profile_id()`); admin (all rows); **or a
  student with an `active` `enrollments` row for that class** (`exists (select 1 from enrollments
  e where e.class_id = classes.id and e.student_id = current_profile_id() and e.status =
  'active')`). **Implementation correction (found during T013):** the original design withheld
  `classes` `SELECT` from students entirely on the theory that `enrollments` alone would carry
  "class summary" data for display — but `enrollments` has no `name`/`term_label`/`course_code`
  columns, so that path cannot actually render a class name anywhere a student sees it. Granting
  SELECT to actively-enrolled students closes that gap; it does not reopen the join-code-browsing
  concern the original design was protecting against, since (a) a student only gains this access
  *after* successfully joining with a code they already legitimately had, and (b) a **removed**
  student's `enrollments.status` is no longer `'active'`, so this condition — and their access to
  the class row, including its current `join_code` — is revoked immediately (FR-018) alongside
  their assignment access. A non-owning teacher still gets no row access at all.
- `INSERT`: any active teacher, inserting only with `teacher_id = current_profile_id()`.
- `UPDATE`: **the owning teacher (`teacher_id = current_profile_id()`) or admin.** This is the
  row-level policy that lets an `UPDATE` command reach a row at all. `guard_class_updates()`
  (below) then narrows *which columns* that already-permitted `UPDATE` may actually change — the
  trigger cannot substitute for this policy. Without it, RLS denies every `UPDATE` on this table
  outright (0 rows affected, no error) regardless of caller, and the trigger never runs at all.

### Validation rules / guard trigger

`guard_class_updates()` (`BEFORE UPDATE ON classes`) — narrows the row-level `UPDATE` policy
above to specific columns, since RLS is row-level and cannot itself express "these columns only":
- `teacher_id`, `course_code`, `name`, `term_label`, `created_at` are immutable for everyone
  except direct SQL by an admin operator — no client path updates them at all.
- A non-admin caller may change only `join_code` and `status`, **and only on a class they own**
  (`teacher_id = current_profile_id()`) — a non-owner's attempt to change either column errors.
  This feature deliberately uses two different strictness levels for the two columns:
  - `join_code`: ownership **plus** `is_active_user()` (i.e. the caller is not suspended and not
    deleted) — but *not* the fuller "still holds the teacher role" check below. This is
    intentionally the lighter of the two checks (owner decision, 2026-07-19): a suspended teacher
    is blocked (matching this codebase's baseline — every protected write in Spec 002 predicates
    on `is_active_user()`), but the rule doesn't otherwise care whether they still hold the
    `teacher` role, since a role change away from `teacher` already triggers auto-archival (below)
    and an archived class's `join_code` has no practical effect regardless (`join_class_by_code`
    only matches `status='active'` classes).
  - `status`: ownership **plus** the caller being *currently* an eligible teacher (`role='teacher'
    AND status='active'` on their own profile) — the stricter check. This single,
    direction-agnostic rule is what satisfies the reactivation clarification: an ineligible
    teacher (role changed away, or suspended) cannot reactivate — or re-archive — their own class;
    once eligible again, they can. `archived_reason` is never read for authorization, only for
    display/audit.
- Admins bypass both checks entirely (`is_admin()`).

### State transitions

```
[teacher creates class] ──▶ active
active ──teacher (eligible) or admin: archive──▶ archived (archived_reason='manual')
archived ──teacher (eligible) or admin: reactivate──▶ active
active ──trigger (role change/suspension, R3)──▶ archived (archived_reason='role_change')
```

Archiving is **never** terminal in this feature (2026-07-19 clarification) — contrast with
Spec 002's `profiles` tombstone, which *is* terminal.

---

## Entity: `enrollments`

Maps spec entity **Enrollment**.

| Column | Type | Constraints | Maps to |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | — |
| `class_id` | `uuid` | NOT NULL, FK → `classes(id)` | — |
| `student_id` | `uuid` | NOT NULL, FK → `profiles(id)` | — |
| `status` | `enrollment_status` enum | NOT NULL, default `'active'` | FR-018 |
| `joined_at` | `timestamptz` | NOT NULL, default `now()` | FR-003 |
| `removed_at` | `timestamptz` | nullable | — |

```sql
create type enrollment_status as enum ('active', 'removed');
unique (class_id, student_id)
```

**No direct client INSERT policy.** A student never has standing SELECT access to `classes` rows
they aren't enrolled in (join codes must not be browsable), so joining is a `SECURITY DEFINER`
RPC:

```
join_class_by_code(p_code text) returns jsonb
```
Looks up `classes where join_code = p_code and status = 'active'`. On no match, returns a uniform
"invalid code" error the client renders as US1 AS3's "clear message" — deliberately the same
message whether the code was never valid, already reissued, or belongs to an archived class, so
as not to leak which case applies. On a match, behavior depends on any existing `enrollments` row
for `(class_id, current_profile_id())`:
- **No existing row**: inserts a new `active` row — first-time join (FR-003).
- **Existing row, `status='active'`**: no-op, returns the existing row — idempotent; a student
  re-entering a code they're already enrolled with is harmless.
- **Existing row, `status='removed'`**: **rejects** with a distinct "you were removed from this
  class by your teacher" error (FR-018, 2026-07-19 clarification) — deliberately *not* the
  uniform invalid-code message, since the caller is a known former member of this specific class,
  not an unrelated guesser being probed for information. No row is touched; only an explicit
  teacher restore action (below) can reactivate it.

**Removal & restoration** (FR-018, FR-022): a teacher sets `status='removed', removed_at=now()`
on an `enrollments` row in their own class to remove a student, or `status='active',
removed_at=null` to restore one — both allowed by an RLS UPDATE policy scoped to the parent
class's owning teacher. `join_class_by_code` above is the *only* path through which a student's
own action can touch a `'removed'` row's status, and it can only ever reject against one, never
reactivate it — reactivation is exclusively a teacher action (2026-07-19 clarification).

**Implementation correction (found during T016):** an earlier draft of this section claimed "no
guard trigger complexity needed here since every column *is* meant to be teacher-editable via this
one action" — that is wrong on `class_id`/`student_id`/`joined_at`: a fully open UPDATE policy
would let a teacher's crafted request reassign an enrollment row to a *different* student or move
it to a *different* class (including one they don't own), not just toggle `status`/`removed_at`.
A small `guard_enrollment_updates()` `BEFORE UPDATE` trigger (mirroring `guard_class_updates()`'s
role, non-admin path only) restricts non-admin writes to `status`/`removed_at`.

**Second implementation correction (found during T016):** `enrollments` stores only `student_id`
(a `profiles(id)`), never a display name — and Spec 002's `profiles` RLS granted only a user's own
row or an admin's read of all rows. Nothing let a *teacher* read an enrolled student's `profiles`
row at all, meaning the roster page had no way to show a name, only a raw UUID. Migration 0015
adds one new policy to Spec 002's `public.profiles` table — `profiles_select_own_students`,
granting a teacher `SELECT` on the `profiles` row of any student enrolled (any status, so removed
students' names still resolve for the roster's "removed" section) in one of their own classes. No
RLS recursion risk: the policy's subquery hits `enrollments`/`classes`, whose own policies resolve
ownership via `current_profile_id()`/`is_admin()` (`SECURITY DEFINER`, bypasses RLS internally)
rather than querying `profiles` directly, so evaluation never loops back into this policy.

---

## Entity: `assignments`

Maps spec entity **Assignment**.

| Column | Type | Constraints | Maps to |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | — |
| `class_id` | `uuid` | NOT NULL, FK → `classes(id)` | — |
| `source_kind` | `text` | NOT NULL, CHECK IN `('activity','formative','summative','custom','quiz')` | FR-004, FR-017 |
| `course_code` | `text` | nullable (NULL only for `source_kind='custom'`) | FR-004 |
| `unit_no` | `integer` | nullable (NULL only for `source_kind='custom'`) | FR-004 |
| `title` | `text` | NOT NULL | FR-004 |
| `instructions` | `text` | nullable | FR-004 |
| `due_at` | `timestamptz` | NOT NULL | FR-005 |
| `max_mark` | `numeric(6,2)` | NOT NULL, CHECK `> 0` | FR-005 |
| `allow_late` | `boolean` | NOT NULL, default `false` | FR-005 |
| `published` | `boolean` | NOT NULL, default `false` | FR-005 |
| `created_at` | `timestamptz` | NOT NULL, default `now()` | — |
| `updated_at` | `timestamptz` | NOT NULL, default `now()` | — |

**Design decision — no separate `auto_graded` column**: `source_kind='quiz'` *is* the
auto-graded assignment type (scored via `quiz_attempts`/`submit_quiz_attempt`, never via the
`grades` table). Nothing in this schema restricts a `quiz` assignment's `max_mark` or otherwise
treats it as lower-stakes than any other kind — satisfying the 2026-07-19 clarification ("any
assignment type, including summative") without an unused toggle: there was never a rule to lift.

### Validation rules / policies

- INSERT/UPDATE: only the owning teacher (`class_id`'s `teacher_id = current_profile_id()`),
  and only while the parent class is `status='active'` (archived classes are fully read-only,
  FR-015).
- `published` may be toggled `true↔false` freely by the owning teacher at any time, including
  after submissions exist (2026-07-19 clarification) — no guard needed beyond ordinary ownership,
  since unpublishing never touches `submissions`/`grades` rows.
- SELECT: owning teacher (any `published` state); enrolled student (`published=true` only, and
  only for classes where their `enrollments.status='active'`); admin (read-only, for support).
- A `BEFORE INSERT/UPDATE` trigger `enforce_active_class()` re-validates the parent class is
  `active`, defending the RLS check against a race where the class is archived mid-request.

### Computed status (not a stored column — FR-006)

| Student sees | Condition |
|---|---|
| Not yet submitted | no `submissions` row for `(assignment_id, student_id)`, `now() ≤ due_at` |
| Missing *(teacher queue only, US3 AS4)* | no `submissions` row, `now() > due_at` |
| Submitted | `submissions` row exists, `late=false`, no `grades` row |
| Late | `submissions` row exists, `late=true`, no `grades` row |
| Graded / Returned | `grades` row exists (grading and returning are one atomic teacher action in this feature — see `grades` below; the two labels are UI synonyms, not distinct stored states) |

---

## Entity: `submissions`

Maps spec entity **Submission**.

| Column | Type | Constraints | Maps to |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | — |
| `assignment_id` | `uuid` | NOT NULL, FK → `assignments(id)` | — |
| `student_id` | `uuid` | NOT NULL, FK → `profiles(id)` | — |
| `text_content` | `text` | nullable | FR-007 |
| `file_path` | `text` | nullable — Storage object path in the `submissions` bucket | FR-007, FR-009 |
| `file_name` | `text` | nullable | FR-009 (denormalized for teacher UI without a Storage round-trip) |
| `file_mime` | `text` | nullable | FR-009 |
| `file_size_bytes` | `integer` | nullable | FR-009 |
| `submitted_at` | `timestamptz` | NOT NULL, default `now()` | FR-007 |
| `late` | `boolean` | NOT NULL — set once at submit time (`submitted_at > assignment.due_at`), never recomputed | FR-008 |

```sql
unique (assignment_id, student_id)  -- resubmission overwrites in place, no version history (2026-07-19 clarification)
check (text_content is not null or file_path is not null)
```

### Validation rules / policies (resubmission + locking — 2026-07-19 clarification)

- **INSERT** (first submission): student is actively enrolled in the assignment's class, the
  assignment is `published`, and either `now() ≤ due_at`, or `now() > due_at AND
  assignment.allow_late = true` (FR-008). `late` is computed **server-side by a `BEFORE INSERT`
  trigger** (`compute_submission_late()`) from `now()` vs. the assignment's `due_at` — never
  trusted from the client, eliminating any client-clock/server-clock mismatch at the boundary;
  the INSERT policy's `WITH CHECK` then only needs to gate on the already-computed value.
- **UPDATE** (resubmission — student editing their own row): allowed **only while `now() ≤
  assignment.due_at`**, regardless of whether the original submission was itself on-time. This
  single condition delivers exactly the 2026-07-19 answer: editable up to the due date, then
  locked — including for a would-be-late-then-edited case, which cannot arise since the due date
  has already passed by definition once a submission is late. A `guard_submission_updates()`
  trigger (mirroring `guard_enrollment_updates()`'s role) restricts a non-admin resubmission to
  the content columns only — otherwise a crafted UPDATE could reassign `assignment_id`, forge
  `late`, or backdate `submitted_at`.
- No `DELETE` policy — nothing in the spec allows withdrawing a submission entirely (only
  overwriting its content via UPDATE).
- File-type/size limits are enforced by the Storage bucket config, not by this table (R4).

---

## Entity: `grades`

Maps spec entity **Grade**. Grading and returning are one atomic action in this feature (US3 AS2:
"enter a mark... and feedback and return it") — a `grades` row's existence *means* returned;
there is no separate ungraded-draft state modeled, since none is required by the spec (YAGNI: no
schema exists for a hypothetical future "save draft, return later" feature).

| Column | Type | Constraints | Maps to |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | — |
| `submission_id` | `uuid` | NOT NULL, UNIQUE, FK → `submissions(id)` ON DELETE CASCADE | — |
| `mark` | `numeric(6,2)` | NOT NULL, CHECK `>= 0` | FR-010 |
| `feedback` | `text` | nullable | FR-010 |
| `graded_by` | `uuid` | NOT NULL, FK → `profiles(id)` | FR-010 |
| `graded_at` | `timestamptz` | NOT NULL, default `now()` | FR-010 |
| `updated_at` | `timestamptz` | NOT NULL, default `now()` | FR-011 |

### Validation rules / policies

- INSERT/UPDATE: only the teacher who owns the submission's assignment's class
  (`submissions → assignments → classes.teacher_id = current_profile_id()`).
- A `BEFORE INSERT/UPDATE` trigger `enforce_max_mark()` raises a distinct, client-mappable error
  (e.g. `check_violation` with a recognizable message) when `NEW.mark > (select max_mark from
  assignments a join submissions s on s.id = NEW.submission_id where a.id = s.assignment_id)` —
  a cross-table rule a plain `CHECK` constraint cannot express (FR-010, edge case: "system rejects
  the entry and asks for a valid mark").
- `updated_at` bumps on every UPDATE (a trigger, or `graded_at` left untouched while `updated_at`
  changes) so the student-visible "corrected result" (FR-011) is distinguishable from the
  original grade in the UI if ever needed for display ("updated" indicator).
- SELECT: the grading teacher; the submission's own student (always — since a `grades` row only
  ever exists already-returned); admin (read-only).

---

## Entity: `quiz_items`

Maps spec entity **Quiz item**. Unit-scoped multiple-choice question bank (FR-017); an
assignment with `source_kind='quiz'` and a given `(course_code, unit_no)` draws on **all**
`quiz_items` for that unit — same "pick from a unit" shape as `activity`/`formative`/`summative`,
no separate per-assignment item-selection join table.

| Column | Type | Constraints | Maps to |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | — |
| `course_code` | `text` | NOT NULL | FR-017 |
| `unit_no` | `integer` | NOT NULL | FR-017 |
| `question_text` | `text` | NOT NULL | — |
| `options` | `jsonb` | NOT NULL — `[{"key":"A","text":"..."}, ...]` | — |
| `correct_option` | `text` | NOT NULL — **never read directly by a student- or unverified-teacher-facing query** | FR-013, Key Entities |
| `created_by` | `uuid` | FK → `profiles(id)` | — |
| `created_at` | `timestamptz` | NOT NULL, default `now()` | — |

### Access

- Full-row SELECT (including `correct_option`): `is_verified_teacher() OR is_admin()` only.
- A view `quiz_items_public` (all columns **except** `correct_option`) is granted to
  `authenticated` — this is what the quiz-taking UI reads. Practice-quiz *questions* are not
  confidential per the spec (only the *answer key* is, FR-013); only `correct_option` is withheld.
- No client INSERT/UPDATE policy in this feature — authoring quiz items is curriculum-owner
  content work (Constitution Art. II), out of this feature's UI scope; rows are seeded the same
  administrative way answer keys are (see `answer_keys` below).

---

## Entity: `quiz_attempts`

Maps spec entity **Quiz attempt**.

| Column | Type | Constraints | Maps to |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | — |
| `assignment_id` | `uuid` | NOT NULL, FK → `assignments(id)` | — |
| `student_id` | `uuid` | NOT NULL, FK → `profiles(id)` | — |
| `answers` | `jsonb` | NOT NULL — `{"<quiz_item_id>": "<chosen_option>", ...}` | FR-017 |
| `score` | `numeric(6,2)` | NOT NULL — `(correct_count / total_items) * assignment.max_mark` | FR-017 |
| `attempted_at` | `timestamptz` | NOT NULL, default `now()` | — |

### Access

- **No direct client INSERT/UPDATE policy.** The only write path is the `submit_quiz_attempt()`
  `SECURITY DEFINER` RPC (R2) — it computes `score` server-side from `quiz_items.correct_option`
  and inserts the row itself, so a client can never forge a score.
- SELECT: the attempting student (own rows only); the owning teacher (all attempts for their own
  class's assignments); admin.
- Unlimited attempts before `due_at` (2026-07-19 clarification) — enforced inside
  `submit_quiz_attempt()` (raises if `now() > assignment.due_at`), matching the same due-date
  lock shape as `submissions`.
- A view `quiz_best_scores(assignment_id, student_id, best_score)` computes
  `max(score) group by assignment_id, student_id` (R7) — read by the teacher's results view and
  the gradebook export as the score of record.

---

## Entity: `answer_keys`

Maps spec entity **Answer key / marking rubric**.

| Column | Type | Constraints | Maps to |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | — |
| `course_code` | `text` | NOT NULL | FR-013 |
| `unit_no` | `integer` | NOT NULL | FR-013 |
| `kind` | `text` | NOT NULL, CHECK IN `('formative','summative')` | FR-013 |
| `content` | `text` | NOT NULL | FR-013 |
| `created_by` | `uuid` | FK → `profiles(id)` | — |
| `updated_at` | `timestamptz` | NOT NULL, default `now()` | — |

```sql
unique (course_code, unit_no, kind)
```

### Access

- SELECT: `is_verified_teacher() OR is_admin()` only — students denied under all circumstances
  (FR-013, SC-004). No client INSERT/UPDATE policy in this feature (see `quiz_items` — same
  curriculum-authority rationale, Article II); admin manages content directly.

---

## Relationships

```
profiles (Spec 002)
   │ 1:N (teacher_id)                     │ 1:N (student_id)
   ▼                                       ▼
classes ──1:N──▶ enrollments ◀──N:1── (student)
   │
   └─1:N──▶ assignments ──1:N──▶ submissions ──1:1──▶ grades
                  │                                      ▲
                  └─1:N (course_code+unit_no)──▶ quiz_items   graded_by ──▶ profiles
                  └─1:N──▶ quiz_attempts ◀──N:1── (student)

answer_keys (course_code, unit_no, kind) — standalone, no FK into assignments (looked up by the
  same course_code/unit_no/kind an assignment already carries)
```

---

## Access-control matrix

Enforced at the database layer (Constitution Art. IX.2). This is the matrix the RLS test suite
(SC-004) must prove, extending `tests/rls/`.

| Actor | Own class | Other teacher's class | Own submission/grade | Other student's submission/grade | Answer keys / `quiz_items.correct_option` |
|---|---|---|---|---|---|
| anonymous | denied | denied | denied | denied | denied |
| student (enrolled, active) | read class row + published assignments only | denied | read/write submission until due date; read grade once returned | **denied** | **denied** |
| student (removed from class) | denied | denied | read-only (history preserved, FR-018) | denied | denied |
| teacher (owner, unverified) | full CRUD (per rules above) | denied | read/write grade for own class's submissions | denied | **denied** |
| teacher (owner, `verified_teacher`) | full CRUD | denied | read/write grade for own class's submissions | denied | **allowed** |
| any suspended/ineligible teacher | read-only history; cannot reactivate/archive/publish/grade | denied | — | denied | denied |
| admin | read all; reactivate any | read all; reactivate any | read all | read all | allowed |

Key negative assertions to test (mirrors Spec 002's SC-004 pattern):
1. A student cannot `SELECT` another student's `submissions`/`grades` rows, or another class's
   `assignments` — FR-012, SC-004.
2. A student cannot read `quiz_items.correct_option` (base table) or any `answer_keys` row by any
   query path, including through `quiz_items_public`'s underlying table — FR-013, SC-004.
3. An unverified teacher's `answer_keys`/`quiz_items` full-row read: 0 rows — FR-013.
4. A teacher cannot read or grade another teacher's class's submissions — FR-010, VIII.1.
5. A removed student cannot view or submit to the class's assignments, but their prior
   `submissions`/`grades` rows remain intact and teacher-visible — FR-018. Their `join_code`
   rejoin attempt is rejected with a distinct message, never silently reactivating the row; only
   the owning teacher's explicit restore action does — FR-018, FR-022, 2026-07-19 clarification.
   A non-owning teacher cannot restore a student removed from another teacher's class — FR-022.
6. A submission `UPDATE` after `due_at` is rejected regardless of caller — 2026-07-19
   clarification.
7. A `grades.mark` exceeding the assignment's `max_mark` is rejected — FR-010 edge case.
8. A direct client `INSERT`/`UPDATE` on `quiz_attempts` is rejected — only `submit_quiz_attempt()`
   may write; a forged high score cannot be submitted directly.
9. An ineligible teacher (role changed away, or suspended) cannot reactivate their own archived
   class; an admin can — 2026-07-19 clarification.
10. A tombstoned (deleted) student's prior `submissions`/`grades` remain in the gradebook with
    marks/feedback intact but display without identifying them by name — FR-019 (join
    `profiles.deleted_at IS NOT NULL` → render as anonymised in the UI; no schema change needed,
    `profiles.full_name` is already `NULL` for a tombstone per Spec 002).

---

## Triggers & functions (new in this feature)

| Name | Timing | Purpose |
|---|---|---|
| `guard_class_updates()` | BEFORE UPDATE on `classes` | Restrict non-admin updates to `join_code`/`status`; gate `status` transitions on current teacher eligibility. → FR-002, FR-015, FR-020 |
| `guard_enrollment_updates()` | BEFORE UPDATE on `enrollments` | Restrict non-admin updates to `status`/`removed_at` only — found during T016 (see `enrollments`' "Implementation correction" above). → FR-018, FR-022 |
| `archive_classes_on_teacher_ineligibility()` | AFTER UPDATE OF role, status ON `profiles` | Auto-archive a teacher's active classes when they stop being an eligible teacher. → FR-020 |
| `enforce_active_class()` | BEFORE INSERT/UPDATE ON `assignments` | Reject writes if the parent class is not `active`. → FR-015 |
| `enforce_max_mark()` | BEFORE INSERT/UPDATE ON `grades` | Reject a mark exceeding the assignment's `max_mark`. → FR-010 |
| `join_class_by_code(p_code)` | RPC, `SECURITY DEFINER` | Look up a class by join code and enroll the caller. → FR-001, FR-003 |
| `submit_quiz_attempt(assignment_id, answers)` | RPC, `SECURITY DEFINER` | Score an MCQ attempt server-side; correct answers never returned to the client. → FR-017 |
| `can_access_submission_file(path)` | `SECURITY DEFINER`, used by Storage policy | Authorize submission-file downloads by ownership/class-teacher relationship. → FR-009 |

Reused unmodified from Spec 002: `is_admin()`, `is_verified_teacher()`, `current_profile_id()`,
`is_active_user()` (`supabase/migrations/0004_is_admin.sql`, `0010_verified_teacher_gate.sql`).

---

## Storage

One new private bucket: `submissions`.

| Setting | Value | Maps to |
|---|---|---|
| `public` | `false` | FR-012 (no public URL leakage) |
| `file_size_limit` | `10485760` (10 MB) | FR-009 |
| `allowed_mime_types` | `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `image/png`, `image/jpeg` | FR-009 |
| Object path convention | `{assignment_id}/{student_id}/{filename}` | Backs `can_access_submission_file()`'s ownership check |

No Edge Functions are introduced in this feature — every write path either goes through ordinary
RLS-authorized PostgREST calls (using the caller's own JWT) or one of the two `SECURITY DEFINER`
RPCs above, neither of which needs the service-role key.
