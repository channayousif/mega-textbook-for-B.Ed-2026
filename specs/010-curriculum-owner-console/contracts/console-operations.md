# Contract: Console Operations (self-assessment + content feedback)

**Feature**: 010-curriculum-owner-console | **Date**: 2026-09-05

Same shape as Specs 002-005's contracts: **no bespoke REST API**. Per Constitution Art. V.1 the
client talks to Supabase directly (PostgREST) with the anon key plus the caller's own JWT;
authorization is enforced by RLS and two guard triggers, not by an application server. This
feature introduces **zero Edge Functions** and **zero new client-writable RPCs**.

Anything not listed is denied by default.

---

## A. Self-assessment checks

| Op | Call | Who | Result |
|---|---|---|---|
| Tick an item for the first time | `insert into self_assessment_checks (student_id, course_code, unit_no, topic_no, locale, item_position, item_text_snapshot, checked) values (current_profile_id(), ..., true)` | signed-in student | 1 row - FR-001 |
| Re-tick/untick the same item | `insert ... on conflict (student_id, course_code, unit_no, topic_no, locale, item_position) do update set checked=..., item_text_snapshot=..., updated_at=now()` | signed-in student, own row only | existing row updated in place, never duplicated |
| Insert/update for another student | any shape, `student_id` not the caller | any student | **denied** (RLS `WITH CHECK`) |
| Change `course_code`/`unit_no`/`topic_no`/`locale`/`item_position`/`created_at` on an existing row | `update ... set course_code = ...` | owning student, even on their own row | **denied** (`enforce_self_assessment_immutable_identity()` trigger) |
| Read own checks for one unit (Progress area) | `select * from self_assessment_checks where student_id = current_profile_id() and course_code = ... and unit_no = ...` | signed-in student | own rows only - FR-004 |
| Read another student's checks | any shape | any student, any teacher | **denied** - FR-006, FR-007 |
| Admin: per-course/unit aggregate | `select course_code, unit_no, count(*) filter (where checked), count(distinct student_id) from self_assessment_checks group by course_code, unit_no` | admin only | aggregate counts across every student - FR-006 |
| Teacher reaches any of the above | any shape | teacher | **denied** - RLS has no teacher branch at all (Art. VIII.1) |

**Denial shapes**: a forged `student_id` or an identity-column edit is rejected by RLS `WITH
CHECK`/the guard trigger respectively - same 0-rows-affected shape as every other RLS violation
in this codebase. A teacher's read returns 0 rows, indistinguishable at the wire level from "no
data exists" - by design, so the page renders its ordinary empty state rather than a
distinguishable "forbidden" signal that would itself leak that the table has rows.

---

## B. Content feedback

| Op | Call | Who | Result |
|---|---|---|---|
| Submit whole-page feedback | `insert into content_feedback (author_id, page_kind, course_code, unit_no, topic_no, locale, section_anchor, scope, comment) values (current_profile_id(), ..., 'whole_page', ...)` (`quoted_passage` omitted, `status` defaults `'open'`) | signed-in student or teacher | 1 row, `status='open'`, `author_role` stamped server-side - FR-010, FR-012 |
| Submit passage feedback | same shape, `scope='passage'`, `quoted_passage` + `passage_context` set | signed-in reader | 1 row - FR-011 |
| Submit with a forged `author_role` or non-`open` `status` | same shape, explicit `author_role`/`status` in the payload | any reader | `author_role` **silently overwritten** by the stamping trigger; a non-`open` `status` is **denied** (RLS `WITH CHECK`) - FR-014 |
| Submit a passage feedback item with `quoted_passage` null, or a whole-page item with `quoted_passage` set | any shape | any reader | **denied** (check constraint) |
| Submit `comment` over 4,000 characters, or `quoted_passage`/`passage_context` over 2,000 characters each | any shape | any reader | **denied** (length-cap check constraint) - FR-017 |
| Submit as a signed-out visitor | any shape | signed-out | **denied** - no `anon` grant exists on the table at all (FR-013) |
| Read own feedback items | `select * from content_feedback where author_id = current_profile_id()` | signed-in reader | own rows only, every status/note visible - FR-015 |
| Read another reader's feedback item | any shape | any non-admin reader | **denied** |
| Edit own already-submitted comment | any `UPDATE` shape | filing reader | **denied** - no reader `UPDATE` policy exists at all (Out of scope) |
| Admin: filter the triage queue | `select * from content_feedback where status=... and course_code=... and unit_no=... and topic_no=... and scope=... and locale=...` (any subset) | admin only | matching rows across every reader, quoted passage included - FR-018 |
| Admin: legal transition + note/ref | `update content_feedback set status=..., owner_note=..., resolution_ref=... where id=...` | admin only, along the legal transition graph (`data-model.md`) | row updated, `updated_at` bumped - FR-019, FR-020 |
| Admin: illegal transition (e.g. `resolved -> planned` directly) | same shape, illegal target `status` | admin | **denied** (`enforce_content_feedback_status_transition()` trigger) |
| Admin: attempt to change `comment`/`quoted_passage`/`author_id`/etc. | `update ... set comment = ...` | admin | **denied** (same trigger's column restriction) - FR-021's "quoted passage stays visible... even after the underlying topic text changed" depends on this row being immutable once filed |
| Non-admin attempts the triage queue or a status transition | any shape | non-admin reader | **denied** (RLS `UPDATE` is `is_admin()`-only) - FR-019, SC-007 |

**Denial shapes**: an illegal transition or forbidden column change raises from
`enforce_content_feedback_status_transition()` with a recognizable error (mirrors Spec 005's
`enforce_suggestion_status_transition()` precedent) - not a silent no-op, so the owner's triage UI
can surface *why* an out-of-sequence action failed.

---

## C. Content-status snapshot and feedback export (file-based, not a database operation)

| Op | Mechanism | Who | Result |
|---|---|---|---|
| Read the current content-status snapshot | `fetch('/content-status.json')` | anyone with the page open (the console gates who *sees* the page, not who can fetch a public static asset - same posture as `content-index.json`) | the JSON described in `data-model.md`, embedding `generated_at` - FR-026, FR-028 |
| "Refresh" the content-status snapshot | re-`fetch('/content-status.json')` | curriculum owner, from the console | the same file, re-read; a genuinely new `generated_at` appears only after the next deploy (research.md R10) - FR-028 |
| Export a unit's open/planned feedback | `exportUnitFeedback(courseCode, unitNo)` runs the query in table B (`status in ('open','planned')`, scoped to the unit) client-side and renders Markdown | curriculum owner, from the triage queue | one Markdown document, no page body text - FR-022 |

---

## Contract test checklist (extends `tests/rls/`)

1. A student can insert then re-tick (upsert) their own `self_assessment_checks` row for the
   same position - exactly one row results, `checked` and `item_text_snapshot` updated,
   `updated_at` bumped.
2. A student cannot insert or update a `self_assessment_checks` row with a `student_id` other
   than their own.
3. No actor, including the owning student, can change `course_code`/`unit_no`/`topic_no`/
   `locale`/`item_position` on an existing `self_assessment_checks` row (guard trigger).
4. A teacher cannot `SELECT` any `self_assessment_checks` row, including one belonging to their
   own enrolled-as-a-student account if they have one, under any filter.
5. An admin can `SELECT` and aggregate `self_assessment_checks` across every student; a
   non-admin, non-owning caller cannot.
6. A signed-out request against `content_feedback` (no JWT / `anon` role) is rejected outright -
   no row is ever returned or inserted.
7. A signed-in reader can insert a `content_feedback` row only with `status='submitted'`
   equivalent (`'open'`); any other explicit `status` on insert is rejected.
8. A forged `author_role` in an insert payload is silently replaced by the trigger-computed value
   from the caller's real `profiles.role` - never the client-supplied value.
9. A `scope='passage'` insert with `quoted_passage` null is rejected; a `scope='whole_page'`
   insert with `quoted_passage` set is rejected (check constraint).
10. A reader cannot `SELECT` another reader's `content_feedback` row, nor `UPDATE` any row,
    including their own.
11. An admin's legal transition (any edge in `data-model.md`'s state-transition list, including a
    reopen) succeeds and bumps `updated_at`; every illegal transition (e.g. `resolved ->
    planned`, or two hops at once) is rejected by `enforce_content_feedback_status_transition()`.
12. An admin's attempt to change `comment`/`quoted_passage`/`author_id`/`page_kind`/etc. via
    `UPDATE` is rejected by the same trigger, regardless of whether `status` also changes in the
    same statement.
13. An admin can filter the triage queue by any combination of `course_code`/`unit_no`/
    `topic_no`/`status`/`scope`/`locale`.
14. `exportUnitFeedback()` for a unit with zero open/planned items returns an empty document (not
    an error), and re-running it after a merge with no queue changes returns the same items again
    (idempotent export, edge case).
15. `static/content-status.json` regenerates on `npm run build`/`npm start` and its
    `figures_pending` list is empty for a course whose manifest reports every figure `placed`.
16. An insert with `comment` over 4,000 characters, or `quoted_passage`/`passage_context` over
    2,000 characters, is rejected by the length-cap check constraints (FR-017).
