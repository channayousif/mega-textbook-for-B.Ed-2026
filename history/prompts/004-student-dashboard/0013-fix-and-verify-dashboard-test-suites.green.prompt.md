---
id: 0013
title: Fix and verify dashboard test suites
stage: green
date: 2026-07-21
surface: agent
model: claude-sonnet-5
feature: 004-student-dashboard
branch: 004-student-dashboard
user: channayousif@gmail.com
command: manual (follow-up to /sp.implement, T048 closeout)
labels: ["testing", "debugging", "student-dashboard", "production-verification"]
links:
  spec: specs/004-student-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - tests/rls/unit-self-mark.test.mjs
 - tests/rls/achievement-on-time-completion.test.mjs
 - tests/e2e/dashboard-assignments.spec.ts
 - tests/e2e/dashboard-history.spec.ts
 - tests/e2e/dashboard-home.spec.ts
 - tests/e2e/dashboard-performance.spec.ts
 - tests/e2e/dashboard-progress.spec.ts
 - tests/e2e/dashboard-grades.spec.ts
 - tests/e2e/dashboard-achievements.spec.ts
 - tests/e2e/unit-self-mark.spec.ts
 - specs/004-student-dashboard/tasks.md (T048 marked complete)
tests:
 - npm run test:rls — 105 passed, 1 pre-existing skip (106 total) — FINAL, clean
 - npm run test:e2e (against production build) — 41 passed, 0 failed — FINAL, clean
---

## Prompt

The user first asked "ok, show me how can i do" (apply migrations + run test suites), and picked
"apply migrations to prod, but I'll run the tests myself." The user then ran `npm run test:rls`
and `npm run test:e2e` themselves and pasted the raw output back (50 RLS files all skipped; 3 e2e
failures in pre-existing Spec 001 tests, 6 in new Spec 004 tests, 35 passed). Asked to run the
corrected commands myself, the user chose "You run them now."

## Response snapshot

**Discovered migrations were already applied.** Before running anything, checked the actual
production Postgres (`~/supabase-project` on this same host) directly: `unit_progress` and
`student_achievements` tables, all 7 functions, and all 5 triggers already existed, byte-for-byte
matching the migration files — with zero rows in either table. Nothing to apply; this session
never ran a migration itself.

**Diagnosed the user's two reported problems before touching anything:**
1. `test:rls` skipped all 50 files/106 tests — Vitest doesn't read `.env.local` (only
   `docusaurus.config.ts`'s own `dotenv` call does, and only for the Docusaurus build process).
   Fixed by `source`-ing `.env.local` into the actual shell before invoking vitest.
2. The 3 e2e failures the user saw (`read-bilingual.spec.ts` x2, `search.spec.ts`) are pre-existing
   Spec 001 tests, untouched on this branch. Rather than assume, proved causation with a controlled
   experiment: `git stash push -- docusaurus.config.ts` (reverting this session's only config
   change), re-ran just those 2 files — same 3 failures recurred. Popped the stash immediately.
   Root cause confirmed by the tests' own header comments: both require a production build
   (`npm run build && npm run serve`), not the dev server Playwright's config defaults to
   (`npm start`) — `search.spec.ts` literally says "the index is generated at production build
   time." Nothing to do with Spec 004.

**Ran the corrected RLS suite** (env vars sourced): 103/106 passed, 2 genuine failures — both in
this session's own Spec 004 test code, not the RLS policies:
- `unit-self-mark.test.mjs`: `insertRow(...).catch is not a function` — misused `.catch()` on a
  duplicate-insert path where supabase-js resolves `{data, error}` rather than throwing; fixed to a
  plain `await`.
- `achievement-on-time-completion.test.mjs`: the "late submission does not grant it" test asserted
  0 rows but got 1. Root cause: the test's assignment fixtures defaulted to `due_at` one hour in
  the *future*, so Spec 003's own `compute_submission_late()` `BEFORE INSERT` trigger — which
  recomputes `late` server-side from `now()` vs. `due_at` and *always* overrides whatever the
  client/fixture requests, by design — silently discarded the fixture's `late: true` override.
  Fixed by giving that one assignment a past `due_at` + `allow_late: true` so a genuinely late
  submission occurs naturally, instead of trying to force the column directly.

**Built and served production**, then ran the e2e suite (`PW_WEBSERVER` pointed at `npm run
serve`): 35/41 passed, 6 new failures, all self-inflicted test bugs (confirmed via DB inspection
and a temporary debug-logging pass, not app bugs):
- `dashboard-assignments.spec.ts`: a NOT NULL violation on `allow_late` — a multi-row PostgREST
  insert requires every object in the array to specify the same keys; a row omitting a NOT-NULL
  column (even one with a table default) gets an explicit `NULL` for it, not the default, failing
  the whole batch. Fixed by specifying `allow_late` on all three fixture rows.
- `dashboard-home.spec.ts` / `dashboard-history.spec.ts`: Playwright strict-mode violations — the
  fixture data itself (an assignment titled "Due soon", a class named "Archived Fall 2024")
  contained the exact substring the test's own `getByText` locator was searching for, matching
  both the UI heading and the fixture data. Fixed by renaming fixture titles/names to avoid the
  collision and switching to `getByRole('heading', { exact: true })` where appropriate.
- `dashboard-performance.spec.ts`: `TypeError: Cannot read properties of null (reading 'id')` —
  the 48-class loop's `join_code` generator concatenated a differentiator (`s`, `c`) *before*
  slicing to 6 characters from the front (`.slice(0, 6)`), so the differentiator was discarded and
  every class in the loop tried to insert the same join_code, hitting the unique constraint after
  the first. Same root defect existed (dormant, not yet triggered) in 4 other single-class-per-run
  test files; fixed all 5 by moving the differentiator to the *end* of the string before slicing
  the trailing 6 characters (`.slice(-6)`), which is what a leading-character truncation of an
  ever-incrementing timestamp always discards.
- `dashboard-progress.spec.ts` / `unit-self-mark.spec.ts`: both seeded `unit_progress` rows for a
  student with no class enrollment at all. `progress.tsx` only shows coverage for courses the
  student is actively *enrolled* in (matching FR-005's literal "per enrolled course" wording) — an
  orphaned `unit_progress` row for an unenrolled course correctly never renders. Fixed both tests
  to create a real class + enrollment fixture first, matching realistic usage.
- One remaining strict-mode collision in `dashboard-assignments.spec.ts` (fixture title "Overdue,
  closed" contained the literal word the status-label locator searched for) — fixed by matching on
  the status label's more distinctive wording ("window has ended" / "late submission accepted")
  instead of the bare word.

Re-ran both suites to green after every fix (isolated single-file re-runs during diagnosis, full
suite re-runs before declaring done). Cleaned up `build/`, `test-results/`, `playwright-report/`
afterward. Marked `specs/004-student-dashboard/tasks.md`'s T048 complete — all 51 tasks now `[X]`.

## Outcome

- ✅ Impact: Both required test suites are fully green against the real production Supabase
  instance and a real production Docusaurus build — 105/106 RLS tests (1 pre-existing, unrelated
  skip) and 41/41 e2e tests. Every failure encountered was diagnosed to its actual root cause
  (never assumed) and every fix was in test code, not application code — the Spec 004
  implementation itself needed zero changes. T048 is the last of 51 tasks, now complete.
- 🧪 Tests: See `tests` field above — both suites are FINAL and clean.
- 📁 Files: 10 test files fixed; `specs/004-student-dashboard/tasks.md` updated (T048 → `[X]`).
- 🔁 Next prompts: Feature is fully implemented, tested, and verified end-to-end. Ready for
  PR/merge per the project's existing Spec 002/003 precedent, whenever the user chooses.
- 🧠 Reflection: The `git stash` causation test for the 3 pre-existing failures was the single
  highest-value diagnostic move this session — it converted "I think this is unrelated" into
  proven fact in under a minute, and meant the rest of the session could focus entirely on the
  session's own 9 real bugs without re-litigating whether Spec 004 broke Spec 001. Nearly every one
  of those 9 bugs was in test-fixture code, not RLS policies or React components — a useful signal
  that the underlying implementation was sound and the debugging effort was correctly concentrated
  on test-authoring mistakes (heterogeneous-key array inserts, string-truncation-order bugs,
  Playwright strict-mode text collisions with fixture data) rather than the feature itself.

## Evaluation notes (flywheel)

- Failure modes observed: 9 distinct test bugs across RLS and e2e suites, none in application code.
  Recurring patterns worth naming for future test-writing: (1) PostgREST multi-row inserts silently
  NULL any column a row omits if ANY sibling row in the same array specifies it — never mix
  partial and full key sets in one `.insert([...])` call. (2) String-truncation join_code
  generators must put the differentiator at the END before slicing, since `.slice(0, N)` from a
  long, slow-changing prefix (a millisecond timestamp) discards a leading differentiator entirely.
  (3) Fixture data (titles, names) must never literally contain the UI copy a locator in the same
  test searches for — Playwright's substring-matching `getByText` will find both.
- Graders run and results (PASS/FAIL): Both full-suite runs are the grader here — PASS/PASS as of
  the final invocation of each.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Before writing e2e fixture data, grep the target
  page's own rendered strings (headings, status labels) and deliberately choose fixture titles
  with zero substring overlap — this session's 3 strict-mode-violation bugs were all the same
  category of mistake and could have been avoided by that one habit during initial test authoring.
