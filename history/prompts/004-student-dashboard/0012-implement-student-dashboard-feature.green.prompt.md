---
id: 0012
title: Implement student dashboard feature
stage: green
date: 2026-07-21
surface: agent
model: claude-sonnet-5
feature: 004-student-dashboard
branch: 004-student-dashboard
user: channayousif@gmail.com
command: /sp.implement
labels: ["implementation", "student-dashboard", "supabase", "docusaurus"]
links:
  spec: specs/004-student-dashboard/spec.md
  ticket: null
  adr: history/adr/0009-separate-docusaurus-docs-instance-for-usage-guides.md
  pr: null
files:
 - docusaurus.config.ts
 - sidebars-guides.ts
 - src/lib/types.ts
 - src/lib/unitProgress.ts
 - src/lib/achievements.ts
 - src/lib/dashboardQueries.ts
 - src/components/StudentDashboardGuard.tsx
 - src/components/DashboardNavLink.tsx
 - src/theme/NavbarItem/ComponentTypes.tsx
 - src/theme/DocItem/Footer.tsx
 - src/pages/app/dashboard/index.tsx
 - src/pages/app/dashboard/assignments.tsx
 - src/pages/app/dashboard/grades.tsx
 - src/pages/app/dashboard/progress.tsx
 - src/pages/app/dashboard/history.tsx
 - src/pages/app/dashboard/achievements.tsx
 - supabase/migrations/0024_unit_progress.sql
 - supabase/migrations/0025_unit_progress_sync_triggers.sql
 - supabase/migrations/0026_student_achievements.sql
 - supabase/migrations/0027_achievement_triggers.sql
 - guides/student-guide/*.mdx
 - i18n/ur/docusaurus-plugin-content-docs-guides/current/student-guide/*.mdx
 - tests/rls/_dashboardFixtures.mjs
 - tests/rls/*.test.mjs (13 new files)
 - tests/e2e/*.spec.ts (9 new files)
 - specs/004-student-dashboard/tasks.md (checkboxes updated)
tests:
 - 13 new RLS test files (tests/rls/) — written, not executed against a live instance
 - 9 new E2E test files (tests/e2e/) — written, not executed against a live instance
 - tsc --noEmit — PASS (0 errors after 2 fixes)
 - npm run build — PASS for both en and ur locales
---

## Prompt

/sp.implement

(No additional user input text was provided.)

## Response snapshot

Ran `.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks` and
confirmed the `requirements.md` checklist was 16/16 complete (PASS) before proceeding. Read
tasks.md (51 tasks), plan.md, data-model.md, contracts/dashboard-operations.md, and research.md in
full, then investigated existing codebase conventions before writing anything: `src/lib/types.ts`,
`src/lib/supabase.ts`, `src/lib/classes.ts`/`assignments.ts`/`quiz.ts` (query/RPC wrapper
patterns), `src/contexts/AuthContext.tsx`, `src/components/AuthGuard.tsx`/`NavbarAuthWidget.tsx`,
an existing app page (`assignments.tsx`) for the `MESSAGES`-dict/`useLocale()` convention, several
Spec 003 migrations (`0004_is_admin.sql`, `0017_assignments.sql`, `0020_grades.sql`,
`0023_quiz_attempts.sql`) for SQL/RLS/`SECURITY DEFINER` conventions, `tests/rls/_helpers.mjs` +
`_classFixtures.mjs` + an existing RLS test for the fixture/assertion pattern, and an existing
Playwright RTL spec (`classes-rtl.spec.ts`) for the E2E pattern. Verified the installed Docusaurus
version's actual `DocItem/Footer` source and `useDoc()` import path
(`@docusaurus/plugin-content-docs/client`, not the `theme-common/internal` path research.md had
guessed) before writing the theme swizzle.

**Critical finding before writing any migration**: `.env.local` contains live credentials pointing
at `https://api.a2ahs.com` — the production self-hosted Supabase instance (per ADR-0006/0007 and
project memory), not a throwaway/dev project. `tests/rls/_helpers.mjs`'s own header comment warns
"point these at a THROWAWAY project — the harness creates and deletes users." Running
`npm run test:rls`/`test:e2e` or applying migrations against this instance would create/delete real
accounts and alter the live schema without confirmation. Flagged this to the user immediately and
proceeded to write every deliverable (migrations, library code, pages, tests, docs) as staged
files, without executing anything that touches the live database.

Implemented all 9 phases in order:
- **Setup/Foundational (T001–T008)**: second Docusaurus docs-plugin instance (`guides`,
  `docusaurus.config.ts` + `sidebars-guides.ts`), dashboard TypeScript types, `unit_progress`
  migration + its two `SECURITY DEFINER` sync triggers, `unitProgress.ts` base read helpers,
  `StudentDashboardGuard.tsx`, `DashboardNavLink.tsx` + `NavbarItem/ComponentTypes.tsx` extension +
  navbar registration, and `_dashboardFixtures.mjs`.
- **US1–US5 (T009–T029, T051)**: RLS + E2E tests per story, `dashboardQueries.ts` built out
  incrementally (current-semester/due-soon/recent-grades → all-grades → past-semesters), and the
  Home/Assignments/Grades/Progress/History pages.
- **US6 (T030–T041)**: `student_achievements` migration + `grant_achievement()` helper, the three
  pure achievement triggers + the one client-assisted `check_full_coverage_achievement` RPC
  (research.md R2's documented exception), `achievements.ts` (static bilingual catalog — built
  early since `progress.tsx` needed to import it for T041's coverage check), the Achievements page,
  and the Home-page preview extension.
- **Polish (T042–T050)**: consolidated isolation regression test, RTL E2E test across all six
  areas, a load-time measurement test against SC-008's 2s budget, the full Student Guide (6 EN +
  6 UR pages, mirroring the existing `i18n/ur/docusaurus-plugin-content-docs/current/` convention
  for the new `docusaurus-plugin-content-docs-guides` instance), and bundle-budget verification.

**Verification performed** (all safe — no live-database calls):
- `npx tsc --noEmit` found 2 real type errors (Supabase embedded-relation typing needing an
  `unknown` cast, same pattern already used elsewhere in this codebase) — fixed both, re-ran clean.
- `npm run build` (with dummy Supabase env vars) succeeded for both `en` and `ur` locales — proved
  the second docs-plugin instance has no id collision, all 6 new dashboard pages and 6 new guide
  pages render in both locales, and no MDX/front-matter errors exist.
- Grepped a built content page's HTML and confirmed it references only `main.js` +
  the webpack runtime, never a dashboard-specific chunk — confirming Docusaurus's per-route code
  splitting keeps the new dashboard pages from bloating content-page bundles (Art. V.5, T047).
- Caught and fixed my own bug during this check: `unit-self-mark.spec.ts` referenced
  `/semester-3/efmp-301/unit-01/`, but the actual scaffolded location is `/semester-1/efmp-301/`.
- `node --check` on all 14 new `.mjs` RLS test files — all parse cleanly.
- Cleaned up the local `build/` directory afterward (gitignored, generated only for verification).

Updated `tasks.md`'s checkboxes as each phase completed — 50 of 51 tasks now `[X]`. **T048 (run
the full test suites + quickstart checklist end-to-end) was deliberately left `[ ]`** — it requires
live execution against a real Supabase instance, which is exactly the production database this
session declined to touch without explicit confirmation.

## Outcome

- ✅ Impact: The complete Student Dashboard feature (6 areas, 2 new tables, 7 new
  trigger/helper/RPC functions, the Student Guide, and comprehensive RLS/E2E test coverage) is
  implemented and staged. Static verification (type-check, dual-locale build, bundle-splitting
  check) all pass — the code is structurally sound. What remains is applying 4 migrations and
  running 2 test suites against a real (ideally non-production) Supabase instance.
- 🧪 Tests: 13 new RLS test files + 9 new E2E test files written, covering every item in
  data-model.md's access-control matrix and contracts/dashboard-operations.md's 13-item checklist;
  none executed against a live database this session (see blocker below).
- 📁 Files: 44 new/modified files (see `files` list above) — 4 migrations, 6 lib files (3 new, 1
  extended in place, 2 already existed and were reused), 6 dashboard pages, 2 new components, 2
  theme swizzles, 12 guide MDX files (EN+UR), 22 new test files.
- 🔁 Next prompts: Apply migrations `0024`–`0027` to a Supabase instance (via the project's own
  controlled deploy process — **not** by pointing this session's tools at `api.a2ahs.com`
  directly), then run `npm run test:rls` and `npm run test:e2e` with `.env.local` pointed at that
  instance. Once green, mark T048 complete and proceed to PR/deploy per the project's existing
  Spec 002/003 precedent.
- 🧠 Reflection: Discovering `.env.local` already pointed at production was the single highest-
  stakes moment of this session — the task list's own language ("Create migration...", "Run
  `npm run test:rls`") reads as instructions to execute, and a less careful pass could easily have
  run the RLS suite against production, creating and deleting real user accounts. Recognizing the
  test harness's own "throwaway project" warning as the trigger to stop and ask, rather than
  proceeding, was the right call given the Constitution's Art. VIII data-protection posture and
  this session's own risk-assessment obligations.

## Evaluation notes (flywheel)

- Failure modes observed: (1) Two Supabase embedded-relation type errors caught by `tsc`, fixed
  with the same `as unknown as X` cast pattern already established elsewhere in this codebase. (2)
  A wrong hardcoded content path (`semester-3` instead of `semester-1` for EFMP-301) in one E2E
  test, caught by cross-referencing the actual build output rather than assuming the path from
  memory. (3) Two hardcoded English-only table headers (`assignments.tsx`/`grades.tsx`) that would
  have silently violated FR-010/SC-007's bilingual requirement — caught during a self-review pass
  before writing the RTL test, not by the RTL test itself (which only checks `dir` and overflow,
  not actual translation coverage).
- Graders run and results (PASS/FAIL): Type-check — PASS (0 errors). Build — PASS (both locales,
  no broken-link warnings beyond a pre-existing deprecation notice unrelated to this feature).
  Bundle-isolation check — PASS (content page's HTML references no dashboard-specific chunk).
  Syntax check on all `.mjs` test files — PASS.
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Before any future `/sp.implement` run, check
  `.env.local`'s target host as an explicit first step (not something discovered mid-implementation
  as it was here) — this session got lucky that the discovery happened before the first migration
  was applied, not after.
