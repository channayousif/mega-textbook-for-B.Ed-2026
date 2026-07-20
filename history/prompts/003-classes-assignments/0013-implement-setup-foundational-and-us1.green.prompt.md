---
id: 0013
title: Implement Setup, Foundational, and US1
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: /sp.implement
labels: ["implementation", "classes-assignments", "us1-mvp", "rls"]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - package.json / package-lock.json (exceljs dependency)
 - supabase/migrations/0011_class_enums.sql
 - supabase/migrations/0012_classes.sql
 - supabase/migrations/0013_class_guard_trigger.sql
 - supabase/migrations/0014_teacher_ineligibility_trigger.sql
 - supabase/migrations/0015_enrollments.sql
 - supabase/migrations/0016_join_class_rpc.sql
 - src/contexts/ClassContext.tsx
 - src/lib/types.ts
 - src/lib/classes.ts
 - src/pages/app/classes/index.tsx
 - src/pages/app/classes/roster.tsx
 - tests/rls/_classFixtures.mjs
 - tests/rls/class-create-roster.test.mjs
 - tests/rls/class-join-code-lifecycle.test.mjs
 - tests/rls/class-archive-reactivate.test.mjs
 - tests/rls/class-auto-archive.test.mjs
 - tests/rls/class-guard-trigger.test.mjs
 - tests/rls/enrollment-isolation.test.mjs
 - tests/rls/enrollment-removal.test.mjs
 - tests/rls/enrollment-restore.test.mjs
 - tests/e2e/classes-lifecycle.spec.ts
 - specs/003-classes-assignments/{data-model,plan,tasks}.md (corrections found during implementation)
tests:
 - 9 new RLS test files (tests/rls/*.mjs) — written, not yet run (no live/local Supabase instance in this environment)
 - 1 new Playwright e2e spec (classes-lifecycle.spec.ts) — written, not yet run
 - Offline verification performed instead: `npx tsc --noEmit` (clean), `npm test` (16/16 existing unit tests pass), `npm run build` (full EN+UR SSG build succeeds, new pages present in output)
---

## Prompt

(No additional user input provided — `/sp.implement` invoked with empty arguments. User then answered a scoping AskUserQuestion: "Setup + Foundational + US1 first" — write and verify Phase 1-3 (26 tasks: T001-T021, T068-T070, T075-T077), stop for review before continuing to US2-US6.)

## Response snapshot

Before writing code, checked the environment: `.env.local` points at `https://api.a2ahs.com` (live production, not local/dev), and Docker access is denied in this environment. Surfaced this via AskUserQuestion rather than silently either writing 77 tasks unverified or attempting to touch production; user chose the recommended incremental scope.

Implemented all 26 tasks for Setup + Foundational + User Story 1 (create class, join by code, reissue/revoke join code, archive/reactivate, remove/restore student), following the established Spec 002 codebase conventions closely (read `supabase.ts`, `AuthContext.tsx`, `AuthGuard.tsx`, `admin/users.tsx`, `authErrors.ts`, `tests/rls/_helpers.mjs`, and three existing migration files before writing anything, to match idiom rather than invent a new one).

Five real gaps were found and fixed **during** implementation (each corrected in `data-model.md`/`tasks.md`/`plan.md` inline, not silently patched):
1. **`classes` SELECT policy gap** — the original design withheld all `classes` SELECT from students, but `enrollments` carries no name/term/course_code, so a student would have no way to see their own class's details. Added a third SELECT branch: actively-enrolled students may read their own class row.
2. **`enrollments` UPDATE over-permission** — data-model.md's claim that "every column is teacher-editable" on `enrollments` would have let a teacher's UPDATE reassign `class_id`/`student_id`. Added `guard_enrollment_updates()`, restricting non-admin writes to `status`/`removed_at`.
3. **Missing `profiles` read path for rosters** — nothing in Spec 002's `profiles` RLS let a teacher read an enrolled student's name; the roster would only ever show a raw UUID. Added `profiles_select_own_students`, a new policy on Spec 002's table, verified recursion-safe (subqueries route through `current_profile_id()`/`is_admin()`, not direct `profiles` reads).
4. **Routing mechanism** — plan.md's file-tree sketch used Next.js-style `[classId]/` bracket directories, which Docusaurus's router does not support. Switched to flat pages with query-string params (`?classId=…`), matching every existing Spec 002 `src/pages/app/*.tsx` page; documented the correction in plan.md and fixed all 14 stale path references across `tasks.md`.
5. **N1 test correctness** — while writing T010's "suspended teacher" test, traced through `current_profile_id()`'s actual definition (no `status` check) and confirmed the row-level UPDATE policy still matches for a suspended owner, so the guard trigger's `is_active_user()` check is what raises — not a silent 0-row filter as a first draft of the test assumed. Fixed the assertion before it could ship as a false-positive test.

Verified everything that's possible without a live database: `npx tsc --noEmit` (zero errors), `npm test` (16/16 existing unit tests still pass), and a full `npm run build` (both `en` and `ur` locales build successfully, `/app/classes/` and `/app/classes/roster/` present in output, no SSG prerendering failures). The 9 RLS tests and 1 e2e test are written and correctly `skipIf(!rlsConfigured)`/`test.skip(!configured)` gated, but have **not** been run against a live instance — that requires the user to apply migrations 0011-0016 and point a (non-production, ideally local) Supabase instance's env vars at this checkout.

Marked all 26 corresponding checkboxes `[X]` in `tasks.md` (27 done / 50 remaining — the remainder is US2-US6 + Polish, correctly starting at T022).

## Outcome

- ✅ Impact: The MVP (User Story 1) is code-complete: a teacher can create a class, get a join
  code, manage the roster (reissue/revoke code, archive/reactivate, remove/restore students), and
  a student can join by code — all enforced by RLS + guard triggers, not client-side gating.
  5 real design gaps were caught and fixed during implementation rather than discovered later.
- 🧪 Tests: 9 RLS files + 1 e2e spec written (not yet executed — no live DB access in this
  environment). Offline checks all pass: tsc clean, 16/16 unit tests, full bilingual SSG build.
- 📁 Files: 6 new migrations, 4 new `src/` modules (2 lib, 1 context, 2 pages), 10 new test files,
  1 `package.json` dependency; `data-model.md`/`plan.md`/`tasks.md` corrected in-place for the 5
  findings above.
- 🔁 Next prompts: user to (a) apply migrations 0011-0016 to a non-production Supabase instance,
  (b) run `npm run test:rls` and `npm run test:e2e` against it, (c) either report back with
  results or request continuation into US2 (Assign work from the book and collect submissions).
- 🧠 Reflection: Checking the environment (production DB, no Docker) *before* writing any code —
  rather than discovering the constraint mid-implementation — turned what could have been a
  wasted, unverifiable 77-task sprint into a properly-scoped, reviewable 26-task increment with a
  clear verification story. The five findings-during-implementation reinforce a pattern from this
  whole feature's history: a data model that reads as complete on paper reliably has RLS-policy
  gaps that only surface once you trace an actual query path (here: "how does the UI even render
  a student's name") rather than just checking FR coverage.

## Evaluation notes (flywheel)

- Failure modes observed: One self-caught error mid-session — an early draft of T010's
  "suspended teacher" RLS test assumed a silent 0-row filter (matching the non-owning-teacher
  case's shape) before actually tracing `current_profile_id()`'s definition and realizing
  ownership still resolves for a suspended user, so the correct expectation is a raised error.
  Corrected before the test was finalized, not after a failing run.
- Graders run and results (PASS/FAIL): tsc: PASS (0 errors). npm test: PASS (16/16). npm run
  build: PASS (both locales, no prerender failures). RLS/e2e suites: NOT RUN (no live DB).
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): Once the user has a non-production Supabase instance
  reachable, the smallest next step is applying just migrations 0011-0016 and running
  `npm run test:rls -- class-create-roster` alone first, before the full suite, to catch any
  migration-ordering or syntax issue with the fastest possible feedback loop.
