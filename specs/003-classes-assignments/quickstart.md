# Quickstart: Virtual Classes, Assignments & Assessments

**Feature**: 003-classes-assignments | **Date**: 2026-07-19

Assumes Spec 002's self-hosted Supabase stack is already running (`api.a2ahs.com` → Kong,
per ADR-0006/ADR-0007) and at least one admin and one non-admin account exist. This feature adds
no new infrastructure — only migrations, one Storage bucket, and static app pages.

Every `docker compose ...` command below (here and in Spec 002's own quickstart) must run from
the compose project directory, not this repo's root — `cd ~/supabase-project` first (found during
T066 live validation: running these verbatim from `mega_book_for_B.Ed/` fails with `no
configuration file provided: not found`, since that's where `docker-compose.yml` actually lives,
per Spec 002 quickstart.md's own setup step).

---

## 1. Apply migrations

Same mechanism as Spec 002 — no cloud project to `supabase link` against on self-hosted:

```bash
cd ~/supabase-project
cat /path/to/mega_book_for_B.Ed/supabase/migrations/0011_*.sql \
    /path/to/mega_book_for_B.Ed/supabase/migrations/0012_*.sql ... \
  | docker compose exec -T db psql -U postgres -d postgres
```

Order matters — apply strictly by file number (`0011` through `0023`); the numbering already
encodes the dependency order: enums → `classes` → guard trigger → teacher-ineligibility trigger
→ `enrollments` → `join_class_by_code` RPC → `assignments` → `submissions` → submissions Storage
policies → `grades` → `answer_keys` → `quiz_items` → `quiz_attempts`. The first migration in this
feature also drops `_verified_teacher_gate_demo` (Spec 002's placeholder fixture — its own
comment says it is superseded once this feature lands).

## 2. `submissions` Storage bucket

No separate manual step — migration `0019_submissions_storage.sql` creates the bucket (10 MB
limit, allowlisted MIME types) and its RLS policies as part of the normal migration apply in
step 1. Confirm it landed:

```bash
docker compose exec db psql -U postgres -d postgres -c "select id, file_size_limit from storage.buckets where id='submissions';"
```

## 3. Verify the happy paths

```bash
npm start                 # http://localhost:3000
```

| Check | Expect | Spec |
|---|---|---|
| Teacher creates a class | Short join code shown, shareable | FR-001, SC-001 |
| Student enters the join code | Appears on the roster immediately | FR-003, SC-002 |
| Teacher publishes a unit-linked assignment | Title/unit link pre-filled from the picked activity/formative/summative | FR-004, SC-001 |
| Student submits before due date | Recorded on-time; student can resubmit, overwriting, until the due date | FR-007, 2026-07-19 clarification |
| Student submits after due date, late allowed | Accepted, marked late | FR-008 |
| Student submits after due date, late not allowed | Blocked, bilingual explanation | FR-008 |
| Teacher grades and returns | Student sees mark + feedback immediately | FR-010 |
| Teacher edits a returned grade | Student sees the corrected result | FR-011 |
| Teacher unpublishes, then republishes an assignment with submissions | Hidden then restored; submissions/grades untouched throughout | 2026-07-19 clarification |
| Teacher archives, then reactivates a class | Read-only while archived; fully live again after reactivation | FR-015, 2026-07-19 clarification |
| Verified teacher opens an answer key | Content visible | FR-013 |
| Unverified teacher or student attempts the same | Denied | FR-013, SC-004 |
| Student takes a practice quiz twice, second attempt scores lower | Teacher's results view shows the **first (higher)** score | 2026-07-19 clarification |
| Teacher exports the gradebook for a class with an Urdu-named student | `.xlsx` opens in a common spreadsheet program with the Urdu name intact | FR-014, SC-007 |

## 4. Verify the access controls (the part that matters)

```bash
npm run test:rls          # extends the Spec 002 RLS matrix — see contracts/classes-operations.md §H
```

Minimum negative cases this suite must prove (SC-004): a student cannot read another student's
submission/grade; a student or unverified teacher cannot read `answer_keys` or
`quiz_items.correct_option` under any query path; a direct client write to `quiz_attempts` is
rejected (only `submit_quiz_attempt()` may write); a submission cannot be edited after its due
date; a grade above `max_mark` is rejected; an ineligible (role-changed or suspended) teacher
cannot reactivate their own auto-archived class.

Manual spot-check worth doing once — confirm the auto-archive trigger actually fires end to end,
not just in isolation:

```sql
-- as admin, in the app: change a teacher's role away from 'teacher' (or suspend them)
-- then, as that same (now-ineligible) teacher's session:
select status, archived_reason from classes where teacher_id = '<their profile id>';
-- expect: status='archived', archived_reason='role_change' on every previously-active class
```

**T066 live validation (2026-07-19)**: run against the actual self-hosted instance, not just
described. Migrations 0011-0023 applied cleanly and in order (surfaced and fixed three real bugs
along the way — a forward reference in 0012, RLS recursion between `classes`/`enrollments`, and a
silent-no-op `assignments` UPDATE policy; see PHR 0015 for detail). The `submissions` bucket
confirmation query returned the expected 10 MB limit. `npm run test:rls` (38/39 files, 1 skipped)
and `npm run test:e2e` (29/29, run against a real `npm run build && npm run serve`, not just the
dev server) both pass, covering every happy-path row above except the unit-linked-assignment and
archive/reactivate rows specifically (those two are RLS-proven but not separately E2E-scripted).
The auto-archive spot-check above was run for real through the live admin UI (not just simulated
via the service role) and confirmed: `{"status":"archived","archived_reason":"role_change"}`.

## 5. Performance check at 200-student scale (T072, SC-005)

Seeded a real class at the feature's stated scale directly against the live instance: 1 teacher,
200 students, 200 active enrollments, 1 published assignment, 180 submissions (20 students left as
"missing" — representative, not every student submits), 150 of those graded (50 left ungraded —
representative partial-grading progress, not a fully-graded set). Measured p95 latency over 15
repetitions per query (10 for the write) using real RLS-authenticated clients (the actual teacher's
JWT for reads, a distinct enrolled student's JWT for the write), not the service role:

| Action | Query shape | p95 | Target | Result |
|---|---|---|---|---|
| Load roster (200 students) | `enrollments` + `profiles(full_name)`, teacher-scoped | 127 ms | <5 s | **PASS** (39x margin) |
| Open grading queue (200 students) | `enrollments` + `submissions`+`grades` joined, teacher-scoped | 354 ms | <5 s | **PASS** (14x margin) |
| Submit work (into a 200-student class) | `submissions` upsert, student-scoped | 36 ms | <5 s | **PASS** (139x margin) |

All three actions clear SC-005's <5s p95 target with wide margin at the feature's stated ceiling —
no pagination or query restructuring needed at this scale, consistent with R7's "plain indexed
aggregate, no premature caching" reasoning for `quiz_best_scores`. Fixture cleanup: deleting the
seeded `classes` row correctly cascades away its assignments/submissions/grades/enrollments; the
200 `auth.users`/`profiles` rows (created directly via SQL for seeding speed, not the slower
GoTrue admin API) needed an explicit follow-up `DELETE` — they aren't visible to
`supabase.auth.admin.listUsers()`, apparently because that call didn't return more than a couple of
directly-SQL-inserted rows in this environment; a real signup always goes through GoTrue itself, so
this is a fixture-cleanup wrinkle specific to this measurement technique, not a product bug.

## 6. Accessibility audit (Constitution Art. VII engineering gate)

Ran a Lighthouse accessibility audit (not the constitution's literally-named "performance pass" —
requested separately, on top of it) against all 8 new pages, both as a teacher and a student, on
the live self-hosted instance behind a real signed-in session (Lighthouse's default CLI/`--port`
attach mode audits a fresh, unauthenticated tab even when pointed at a running browser instance —
worked around by driving Lighthouse's Node API directly against an already-authenticated
Puppeteer `Page`, the only way that reliably preserves the session).

Found and fixed two real issues, both now verified at a clean 100/100 with zero failing audits
(including zero-weight/informational ones) across all 11 audited page+role combinations:

1. **Color contrast** — Infima's default `.button--danger` (white text on `#fa383e`) is a 3.75:1
   contrast ratio, below WCAG AA's 4.5:1 minimum. Found on roster.tsx's "Archive class" button;
   also affects Spec 002's `profile.tsx` danger button (not in this feature's scope to fix, since
   this is a global CSS rule fix — see `src/css/custom.css`). Fixed via
   `--ifm-color-danger-darkest`, an existing shade already defined in Infima's own palette
   (6.88:1), not an invented color.
2. **Unlabeled table actions column** — `<th />` (empty) on the actions column of 4 tables
   (roster.tsx x2, index.tsx, assignments.tsx) fails axe's `td-has-header` rule for screen-reader
   table navigation, even though the column's purpose is visually obvious from its buttons. Fixed
   with a `.sr-only` utility class (new in custom.css) and `<th><span className="sr-only">Actions</span></th>`.

## 7. Common failure modes

- **`join_class_by_code` always fails**: check the function was granted `execute` to
  `authenticated` (mirrors `0010_verified_teacher_gate.sql`'s grant pattern) — a missing grant
  fails silently as "permission denied for function," easy to mistake for "invalid code."
- **File upload succeeds past 10 MB**: the bucket's `file_size_limit` wasn't set at creation (step
  2) — Supabase Storage enforces this at the bucket config level, not in application code; there
  is nothing to debug in `src/` if this happens.
- **A teacher can read `quiz_items.correct_option`**: confirm they're reading `quiz_items`
  (restricted) and not `quiz_items_public` (the intended UI-facing view) — a component
  accidentally querying the base table is the most likely cause, not an RLS policy bug.
- **Gradebook export shows Urdu names as `????` or boxes**: confirm the export path produces
  `.xlsx` via `exceljs`, not `.csv` — a `.csv` fallback anywhere in the export code reintroduces
  exactly the encoding failure SC-007 exists to catch.
