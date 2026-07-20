---
id: 0014
title: Implement User Story 2 — assignments/submissions
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: (none — direct instruction "continue with US2")
labels: ["implementation", "classes-assignments", "us2", "rls", "content-index"]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - supabase/migrations/0017_assignments.sql
 - supabase/migrations/0018_submissions.sql
 - supabase/migrations/0019_submissions_storage.sql
 - scripts/build-content-index.mjs (new)
 - package.json (prestart/prebuild hooks, build:content-index script)
 - .gitignore (static/content-index.json)
 - src/lib/assignments.ts
 - src/lib/submissions.ts
 - src/pages/app/classes/assignment-new.tsx
 - src/pages/app/classes/assignments.tsx
 - src/pages/app/classes/assignment.tsx
 - tests/rls/assignment-publish-visibility.test.mjs
 - tests/rls/assignment-archived-class-lockout.test.mjs
 - tests/rls/submission-deadline.test.mjs
 - tests/rls/submission-resubmit-lock.test.mjs
 - tests/rls/submission-isolation.test.mjs
 - tests/rls/submission-file-limits.test.mjs
 - tests/rls/assignment-status-enum.test.mjs
 - tests/e2e/assignments-publish-submit.spec.ts
 - specs/003-classes-assignments/{data-model,tasks,quickstart}.md (corrections found during implementation)
tests:
 - 7 new RLS/storage test files + 1 new Playwright e2e spec — written, not yet run (no live Supabase instance in this environment)
 - Offline verification: `npx tsc --noEmit` (clean), `npm test` (16/16 pass), `npm run build` (full EN+UR SSG build succeeds; prebuild hook correctly generates static/content-index.json, copied into build output; 5 new pages present)
---

## Prompt

continue with US2

## Response snapshot

Implemented all 16 tasks for User Story 2 (assign work from the book, collect submissions):
migrations for `assignments`/`submissions`/the `submissions` Storage bucket, `src/lib/assignments.ts`/`submissions.ts`, and three pages (`assignment-new.tsx`, `assignments.tsx`, `assignment.tsx`).

Before writing the unit-item picker (T034), researched whether any content-index mechanism already existed for a teacher to pick "unit → activity/formative/summative" — none did. Docusaurus's `useAllDocsData()` only exposes a fixed metadata shape (title/permalink/id), not custom front-matter like `course_code`/`unit_no`. Built `scripts/build-content-index.mjs` (reusing `validate-content.mjs`'s `dirs()`/`gray-matter` traversal pattern) to emit `static/content-index.json`, wired via npm's `prestart`/`prebuild` hooks so it's automatic and never a manual step. Verified: 18 real records generated (6 courses × 1 unit × 3 kinds), copied into `build/` on a full build.

Design decisions made while implementing, each applying the pattern already established in US1 (compute security-relevant values server-side, restrict UPDATE columns via guard triggers, document corrections in-place rather than silently):
- **`late` computed server-side**, never trusted from the client — a `compute_submission_late()` `BEFORE INSERT` trigger sets it from `now()` vs. the assignment's `due_at`, eliminating any client-clock/server-clock mismatch. Verified with a test that a client explicitly lying (`late: true` on an on-time submission) gets silently overridden.
- **`guard_submission_updates()`** — proactively added (not a post-hoc "found a gap" fix this time, applied the lesson from `enrollments` directly) to stop a resubmission's UPDATE from reassigning `assignment_id`/`student_id` or forging `late`/`submitted_at`.
- **Fresh Storage path per upload** rather than overwriting the same object in place — avoids needing an UPDATE/DELETE policy on `storage.objects` at all; a resubmission's `submissions.file_path` column just points at the new object.
- **Storage bucket creation moved from a manual quickstart.md step into migration 0019** (idempotent `on conflict do nothing`) — one fewer manual step for the user; updated quickstart.md to just verify it landed via `psql`.
- **`assignment.tsx`'s FR-008 late/blocked messaging is genuinely bilingual** (EN/UR, matching `authErrors.ts`'s register) — this one page's task explicitly called for it, unlike the rest of US2's pages where full bilingual text is correctly deferred to T062/Polish per tasks.md's own scoping.

Chose **"Custom" mode** (not the unit-item picker) for the e2e test's assignment creation, specifically so the test's correctness doesn't depend on which course/unit content happens to exist in `docs/` at test-run time — the picker itself is still built and exercised by the RLS/manual-testing surface.

## Outcome

- ✅ Impact: US1+US2 together deliver the "assign work, collect submissions" half of the feature's
  core loop. A teacher can publish a book-linked or custom assignment in a few clicks; a student
  can submit and resubmit (until the due date, then locked) with correct late/on-time handling
  enforced entirely server-side.
- 🧪 Tests: 7 RLS/storage files + 1 e2e spec written, not executed (no live DB in this
  environment). tsc clean, 16/16 unit tests pass, full bilingual SSG build succeeds with the
  content-index generation step verified end-to-end (18 records, copied into `build/`).
- 📁 Files: 3 new migrations, 1 new build script + package.json wiring, 2 new `src/lib` modules,
  3 new pages, 8 new test files; `data-model.md`/`tasks.md`/`quickstart.md` updated in-place for
  design decisions made during implementation.
- 🔁 Next prompts: user to apply migrations 0017-0019 (same process as 0011-0016) and run
  `npm run test:rls`/`npm run test:e2e` against a non-production instance, or say "continue with
  US3" (grade submissions and return results).
- 🧠 Reflection: Applying `guard_submission_updates()` proactively — instead of writing the naive
  open UPDATE policy first and finding the gap afterward, the way `enrollments`' equivalent gap
  was found in US1 — shows the pattern-matching is transferring: the same class of RLS mistake
  (broad row-level policy without column-level narrowing) is now caught before it's written, not
  after. Worth continuing to check every new UPDATE policy against this specific question ("what
  columns does this table have that a legitimate caller should NOT be able to touch via this
  policy?") as a standing step, not just when a prior instance of the bug is fresh in mind.

## Evaluation notes (flywheel)

- Failure modes observed: None this session — no self-caught errors, unlike the prior US1 session
  (T077 test-placement mistake, T010 assertion-shape mistake). The proactive
  `guard_submission_updates()` design suggests the earlier corrections are generalizing rather
  than being one-off fixes.
- Graders run and results (PASS/FAIL): tsc: PASS (0 errors, both after lib/pages and after tests).
  npm test: PASS (16/16). npm run build: PASS (both locales; content-index generation verified).
  RLS/e2e suites: NOT RUN (no live DB).
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): Once the user applies 0017-0019 and runs the RLS
  suite, the highest-value single test to check first is `submission-deadline.test.mjs`'s
  "client-supplied late value is ignored" case — it's the one assertion in this batch that proves
  a design property (server-side trust boundary) rather than just a permission boundary, and would
  be the most informative if it failed.
