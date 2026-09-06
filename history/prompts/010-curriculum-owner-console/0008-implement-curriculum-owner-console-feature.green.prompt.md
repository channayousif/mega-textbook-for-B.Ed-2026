---
id: 0008
title: Implement curriculum owner console feature
stage: green
date: 2026-09-05
surface: agent
model: claude-sonnet-5
feature: 010-curriculum-owner-console
branch: 010-curriculum-owner-console
user: M Yousif Channa
command: /sp.implement
labels: ["implementation", "curriculum-owner-console", "self-assessment", "content-feedback", "rls", "e2e"]
links:
  spec: specs/010-curriculum-owner-console/spec.md
  ticket: null
  adr: history/adr/0013-reader-feedback-dedicated-table-and-in-house-passage-capture.md, history/adr/0014-self-assessment-checklist-position-keyed-dom-hydration.md, history/adr/0015-curriculum-owner-catalog-edits-download-and-commit-flow.md
  pr: null
files:
 - supabase/migrations/0032_self_assessment_checks.sql
 - supabase/migrations/0033_content_feedback.sql
 - supabase/migrations/0034_content_feedback_author_role_trigger.sql
 - supabase/migrations/0035_content_feedback_status_transitions.sql
 - scripts/lib/mdx-sections.mjs
 - scripts/lib/unit-depth.mjs
 - scripts/lib/figure-manifest.mjs
 - scripts/report-content-status.mjs
 - scripts/check-unit-depth.mjs
 - scripts/check-figures.mjs
 - scripts/build-content-index.mjs
 - src/lib/types.ts
 - src/lib/selfAssessment.ts
 - src/lib/contentFeedback.ts
 - src/lib/feedbackExport.ts
 - src/lib/contentStatus.ts
 - src/lib/catalog.ts
 - src/lib/docPosition.ts
 - src/lib/assignments.ts
 - src/theme/DocItem/Content.tsx
 - src/theme/DocItem/Footer.tsx
 - src/components/OwnerConsoleGuard.tsx
 - src/pages/app/admin/overview.tsx
 - src/pages/app/admin/feedback-queue.tsx
 - src/pages/app/dashboard/progress.tsx
 - src/pages/app/classes/assignment-new.tsx
 - .claude/skills/revise-topic/SKILL.md
 - .claude/skills/revise-topic/references/export-format.md
 - .claude/skills/revise-topic/references/stale-passage-handling.md
 - guides/student-guide/self-assessment-and-feedback.mdx (+ ur translation)
 - guides/teacher-guide/give-feedback-and-suggest-improvements.mdx (+ ur translation, extended)
 - README.md
 - package.json
 - .github/workflows/ci.yml
 - .gitignore
 - specs/010-curriculum-owner-console/plan.md, data-model.md (reconciled, T046)
 - tests/rls/self-assessment-isolation.test.mjs
 - tests/rls/self-assessment-immutable-identity.test.mjs
 - tests/rls/content-feedback-isolation.test.mjs
 - tests/rls/content-feedback-status-transitions.test.mjs
 - tests/rls/curriculum-owner-console-full-isolation.test.mjs
 - tests/unit/content-status-report.test.mjs
 - tests/unit/feedback-export.test.mjs
 - tests/e2e/self-assessment-checklist.spec.ts
 - tests/e2e/content-feedback-submission.spec.ts
 - tests/e2e/owner-feedback-triage.spec.ts
 - tests/e2e/owner-console-rtl.spec.ts (2 tests: T023 + T035)
tests:
 - npm test (vitest unit suite) - 136/136 passing throughout, including new content-status-report.test.mjs (5) and feedback-export.test.mjs (11)
 - npx tsc --noEmit - clean after every phase
 - npm run test:rls - 127/127 pre-existing tests pass unchanged (zero regression); 22 new tests for self_assessment_checks/content_feedback fail with PGRST205 (table not found) because migrations 0032-0035 have not yet been applied to the live self-hosted Supabase instance (no supabase CLI/psql in this sandbox - applying migrations to the shared production DB is a human/deploy step per this repo's established convention, quickstart.md Sec 1)
 - npm run build (en + ur) - both locales compile and generate static output cleanly; static/content-status.json regenerates
 - npm run validate:content / check:depth-gate / check:figures / check:no-answer-keys / check:no-em-dash - all green, zero topic-source files touched (confirms FR-008)
 - targeted e2e regression (dashboard-progress, teacher-suggest-improvement x2, teacher-activity-feedback, unit-self-mark, assignments-publish-submit) against the live server - 6/6 pass, confirming no regression from Footer.tsx/progress.tsx/assignment-new.tsx edits
 - new e2e specs (owner-console-rtl.spec.ts) exercised against the live server - overview/feedback-queue pages render and degrade gracefully (no crash) even without the new tables; failures are exactly attributable to the same unapplied-migration gap, not to implementation bugs
---

## Prompt

(User invoked `/sp.implement` with empty additional input, per the standard SDD workflow: execute
the implementation plan by processing and executing all tasks defined in
`specs/010-curriculum-owner-console/tasks.md`.)

## Response snapshot

Implemented all 46 tasks across 9 phases of Spec 010 (curriculum-owner console and the
content-improvement loop) in one continuous session, following the task-file's own dependency
order:

- **Phase 1-2 (Setup/Foundational)**: domain types; extracted `scripts/lib/mdx-sections.mjs`,
  `unit-depth.mjs` (including a deeper-than-originally-scoped orchestration extraction -
  `checkUnitVerdict()` - needed so `report-content-status.mjs` could reuse the full per-unit
  dispatch, not just the leaf verdict functions, per FR-033), `figure-manifest.mjs`; four new
  migrations (`self_assessment_checks` + its identity-guard trigger, `content_feedback` + its
  author-role-stamping and status-transition-guard triggers).
- **Phase 3 (US1, MVP)**: `selfAssessment.ts` (upsert/read/aggregate/merge helpers); the
  `DocItem/Content.tsx` swizzle hydrating Spec 008's static checklist checkboxes by heading
  position (never text, never touching topic source); the self-assessment roll-up panel on
  `dashboard/progress.tsx`; RLS + e2e tests.
- **Phase 4 (US2, MVP)**: extracted `findNearestSectionAnchor()` to `docPosition.ts`;
  `contentFeedback.ts`; the reader `ContentFeedbackControl` on `DocItem/Footer.tsx` (resolving
  the one page-kind ambiguity - a bare `unit-NN` URL - via a one-time content-index.json
  lookup); `admin/feedback-queue.tsx`; RLS + e2e tests.
- **Phase 5 (US3)**: `OwnerConsoleGuard.tsx`; `admin/overview.tsx` with four panels (content
  status placeholder, feedback, self-assessment, progress); e2e RTL test.
- **Phase 6 (US4)**: `report-content-status.mjs` (reusing `checkUnitVerdict()` and
  `figureStatusFor()`, never re-deriving either); wired into `package.json`/CI; wired the
  overview's content-status panel to the real report; fixture-driven unit test.
- **Phase 7 (US5)**: `feedbackExport.ts` (a pure, `@site`-import-free module split out
  specifically so `tests/unit/feedback-export.test.mjs` could import it directly under vitest);
  `exportUnitFeedback()`; the export control on the queue page; the `.claude/skills/revise-topic/`
  skill + its two references.
- **Phase 8 (US6)**: inline feedback triage on the overview; a content-status refresh control
  (re-fetches the build artifact, never triggers a live rebuild, research.md R10); the
  catalog-edit form (`catalog.ts` + a build-time static copy in `build-content-index.mjs`,
  downloads a patched `courses.json`, zero Postgres writes); extended the RTL e2e spec.
- **Phase 9 (Polish)**: a consolidated full-matrix RLS regression test; Student Guide + Teacher
  Guide sections (EN+UR, zero em dash); a README pointer; a full production build (en+ur) plus
  bundle-size verification (no accidental supabase-js eager-bundling into any new chunk); the
  full verification pass; confirmed the three ADR candidates were already recorded (ADR-0013,
  0015) from an earlier planning-session `/sp.adr` run rather than creating duplicates; reconciled
  implementation drift (the final `depth_check: 'not_applicable'` third state, `feedbackExport.ts`/
  `contentStatus.ts`/`catalog.ts` as new files, `checkUnitVerdict()`'s wider scope, the catalog-edit
  form's exact four editable fields) back into `plan.md`/`data-model.md`.

Along the way, fixed one small pre-existing type-safety gap surfaced by honestly typing
`ContentIndexEntry.kind` (widening it to match what `build-content-index.mjs` actually emits):
`assignment-new.tsx`'s unit-item picker now filters to the three assignable kinds via a type
predicate, rather than silently trusting an inaccurate narrow type.

Every RLS test file this session added tracks and deletes only the exact rows/profile-ids it
created in its own `afterAll` (never a broad `course_code`-scoped delete, which could touch real
students' data on a real course like EFMP-302 in this shared, non-disposable Supabase project).

## Outcome

- ✅ Impact: All 46 tasks complete; both P1 (MVP) stories and all four P2/P3 stories shipped;
  zero regressions in 127 pre-existing RLS tests and 6 targeted e2e specs run against the live
  server; zero topic-source files touched (FR-008 verified via the content gates, not just
  asserted).
- 🧪 Tests: See `tests:` above - full detail on what ran and what remains blocked purely on a
  migration-application step outside this session's reach.
- 📁 Files: ~45 files created/edited across migrations, scripts, `src/lib`, `src/theme`,
  `src/pages/app/admin`, tests (rls/unit/e2e), guides (EN+UR), and planning-doc reconciliation.
- 🔁 Next prompts: Apply migrations 0032-0035 to the self-hosted Supabase instance (quickstart.md
  Sec 1, via the `~/supabase-project` docker compose flow - not from this repo/session); then
  `npm run test:rls` and `npm run test:e2e` should go fully green; merge to `main` once CI passes.
- 🧠 Reflection: For a task this large (46 tasks, 9 phases), doing the whole implementation in one
  continuous session (rather than delegating phases to fresh sub-agents) kept every design decision
  consistent end-to-end (e.g., the `checkUnitVerdict()` scope decision in Phase 2 directly enabled
  Phase 6's report without re-deriving anything) - the cost was a very long single session, but the
  alternative (re-deriving context per phase across fresh agents) risked exactly the kind of drift
  FR-033 explicitly guards against elsewhere in this feature.

## Evaluation notes (flywheel)

- Failure modes observed: none blocking. One near-miss caught before it shipped: my first draft of
  the new RLS tests' cleanup used a `course_code`-scoped delete, which would have been unsafe
  against a real course code (EFMP-302) in this shared production database - caught and fixed to
  scope cleanup by the test's own created profile/author ids instead.
- Graders run and results (PASS/FAIL): content gates (validate/depth/figures/no-answer-keys/
  no-em-dash) - PASS; `tsc --noEmit` - PASS throughout; unit suite - PASS (136/136); RLS suite -
  PASS for every pre-existing test, expected-fail for new tests pending migration application;
  targeted e2e regression - PASS (6/6).
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A - feature is implementation-complete pending the
  operator's own migration-application step.
