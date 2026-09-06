---
description: "Task list for 010-curriculum-owner-console implementation"
---

# Tasks: Curriculum-owner console and the content-improvement loop

**Input**: Design documents from `/specs/010-curriculum-owner-console/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/console-operations.md,
contracts/self-assessment-hydration.md, quickstart.md

**Tests**: **REQUIRED** for this feature (not optional). Constitution Art. VII's engineering gate
requires "RLS policies tested"; spec.md SC-002 and SC-007 require access-control isolation and
100%-of-attempts denial "verified by access-control tests"; SC-009 requires the existing
"suggest improvement" flow and unit-coverage tracking to be regression-free. The negative
assertions in `data-model.md`'s access-control matrix and `contracts/console-operations.md`'s
16-item checklist are the deliverable, not an afterthought - same posture Spec 005's tasks.md
took.

**Organization**: Tasks are grouped by user story (US1-US6, spec.md priorities P1/P1/P2/P2/P3/P3),
each independently implementable and testable. FR-012/FR-030 (bilingual/RTL) and FR-002 (the
checklist stays readable for everyone) are cross-cutting requirements with no dedicated story -
each page/control task below builds them in directly (bilingual `MESSAGES` dict, an explicit
empty state where relevant, guard-wrapped route), matching Specs 004/005's convention.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: Which user story this task belongs to (US1-US6)
- Exact file paths included in every task

## Path Conventions

Single Docusaurus app at repository root (no `site/` subdirectory), extending Specs 002-009's
layout per plan.md's Structure Decision. New code lands in `src/lib`, `src/theme/DocItem`,
`src/components`, `src/pages/app/admin/`, `src/pages/app/dashboard/`, `scripts/`, `scripts/lib/`,
`supabase/migrations/`, `.claude/skills/revise-topic/`, `tests/rls/`, `tests/unit/`, `tests/e2e/`.

---

## Phase 1: Setup

**Purpose**: Shared types every story's implementation references.

- [X] T001 Add curriculum-owner-console domain types (`SelfAssessmentCheck`,
      `ContentFeedbackPageKind`, `ContentFeedbackScope`, `ContentFeedbackStatus`,
      `ContentFeedback`) to `src/lib/types.ts`, mirroring `data-model.md`'s two new tables'
      columns.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The schema both new tables need, and the shared script logic Story 1's roll-up count
and Story 4's report both depend on.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T002 [P] Extract `scripts/check-unit-depth.mjs`'s private `countChecklistInSection()` into
      `scripts/lib/mdx-sections.mjs`, and its `checkLegacy()`/`checkTopic()` per-unit
      authored/planned + language-completion + depth-check verdict computation (minus the `err()`
      side effects - return a result object instead) into `scripts/lib/unit-depth.mjs`. Update
      `check-unit-depth.mjs` to import both and convert each returned result back into `err()`
      calls exactly as before. Re-run `npm test -- tests/unit` (the gate is exercised via
      `spawnSync`, so no test file edit is needed) and confirm every existing case still passes
      unchanged (research.md R9, `quickstart.md` step 2).
- [X] T003 [P] Extract `scripts/check-figures.mjs`'s manifest-table parser and per-row status
      logic into `scripts/lib/figure-manifest.mjs`. Update `check-figures.mjs` to import it. Re-run
      `npm test -- tests/unit` and confirm `tests/unit/figures-gate.test.mjs` still passes
      unchanged (research.md R9, `quickstart.md` step 2).
- [X] T004 [P] Create migration `supabase/migrations/0032_self_assessment_checks.sql`:
      `self_assessment_checks` table per `data-model.md` - `unique (student_id, course_code,
      unit_no, topic_no, locale, item_position)`; RLS `SELECT`
      `using (student_id = current_profile_id() or is_admin())` (no teacher branch at all);
      `INSERT`/`UPDATE` `with check (student_id = current_profile_id())`; no `DELETE` policy;
      `enforce_self_assessment_immutable_identity()` `BEFORE UPDATE` trigger rejecting any change
      to `student_id`/`course_code`/`unit_no`/`topic_no`/`locale`/`item_position`/`created_at`;
      reuse `touch_updated_at()` (Spec 003, `0017`).
- [X] T005 [P] Create migration `supabase/migrations/0033_content_feedback.sql`:
      `content_feedback_page_kind`/`content_feedback_scope`/`content_feedback_status` enums;
      `content_feedback` table per `data-model.md` including its three structural check
      constraints (scope vs. `quoted_passage`; `page_kind='topic'` vs. `topic_no`;
      `page_kind='course_review'` vs. `unit_no`) **and** its three length-cap check constraints
      (`comment` <= 4,000 chars; `quoted_passage` <= 2,000 chars; `passage_context` <= 2,000
      chars - FR-017; `/sp.analyze` finding U1); RLS `SELECT` (author own or admin all); `INSERT`
      `with check (author_id = current_profile_id() and status = 'open')`; `UPDATE`
      `using/with check (is_admin())`; no `DELETE` policy.
- [X] T006 Create migration `supabase/migrations/0034_content_feedback_author_role_trigger.sql`:
      `stamp_content_feedback_author_role()` `BEFORE INSERT`, `SECURITY DEFINER` trigger -
      overwrites `new.author_role` from the inserting user's `profiles.role` unconditionally
      (depends on T005).
- [X] T007 Create migration `supabase/migrations/0035_content_feedback_status_transitions.sql`:
      `enforce_content_feedback_status_transition()` `BEFORE UPDATE` trigger - restricts a
      permitted admin `UPDATE` to `status`/`owner_note`/`resolution_ref` only and allows exactly
      the transitions in `data-model.md`'s state-transition list (`open -> {planned, resolved,
      declined}`, `planned -> {resolved, declined}`, `{resolved, declined} -> open`); reuse
      `touch_updated_at()` (depends on T005).

**Checkpoint**: Schema and shared script modules ready - user story implementation can begin.

---

## Phase 3: User Story 1 - A self-assessment checklist that sticks (Priority: P1) MVP

**Goal**: A signed-in student ticks/unticks items on a topic's self-assessment checklist; state
persists across reloads, sessions, and devices; a signed-out visitor's ticks persist locally with
a sign-in hint and merge into their account once on first sign-in; the Progress area shows a
per-topic/unit/course completion figure, separate from unit coverage.

**Independent Test**: Sign in as a student, tick two of four items on one topic, reload and
confirm they persist, open the same account in a second browser and confirm they show ticked, and
confirm the Progress area reports the per-topic/unit completion fraction. Sign out and confirm the
checklist is still interactive on that device; sign back in and confirm any signed-out ticks
merge exactly once.

### Tests for User Story 1

> Write these FIRST and confirm they FAIL before implementing.

- [X] T008 [P] [US1] RLS test in `tests/rls/self-assessment-isolation.test.mjs`: a student can
      insert then re-tick (upsert) their own row for the same position - exactly one row results;
      a student cannot insert/update a row with another student's `student_id`; a teacher's
      `SELECT` against `self_assessment_checks` under any filter returns zero rows; an admin can
      `SELECT` and aggregate across every student; inserting or updating any number of
      `self_assessment_checks` rows - including ticking every item across a whole unit - never
      inserts or updates a row in `unit_progress` (FR-005's "MUST NOT change the unit-coverage
      record" guarantee; `/sp.analyze` finding G2) (FR-001, FR-005, FR-006, FR-007, SC-002;
      contract checklist items 1, 2, 4, 5).
- [X] T009 [P] [US1] RLS test in `tests/rls/self-assessment-immutable-identity.test.mjs`: no
      actor, including the owning student, can change `course_code`/`unit_no`/`topic_no`/
      `locale`/`item_position` on an existing row (FR-009's identity guarantee; contract checklist
      item 3).
- [X] T010 [P] [US1] E2E test in `tests/e2e/self-assessment-checklist.spec.ts`: ticks two items on
      a `topic-NN.mdx` page, reloads, confirms both stay ticked; opens the same account in a
      second browser context and confirms both show ticked; signs out, ticks a third item, and
      confirms a "sign in to sync" hint appears and the tick survives a reload on that browser;
      signs back in and confirms the third item merges into the account exactly once, and a
      second sign-out/sign-in cycle does not re-run the merge (SC-001, FR-003; research.md R4).
      Also asserts: editing one item's wording (via the fixture) between two loads renders that
      item unticked on the next load while the topic's other, unchanged ticked items stay ticked
      (FR-009, research.md R3; `/sp.analyze` finding G1); and, after switching locale to `ur`, the
      hydrated checklist and the "sign in to sync" hint both render correctly right-to-left with
      translated hint text (Art. III.8/X convention; `/sp.analyze` finding G4).

### Implementation for User Story 1

- [X] T011 [US1] Implement `src/lib/selfAssessment.ts`: `upsertCheck({studentId, courseCode,
      unitNo, topicNo, locale, itemPosition, itemTextSnapshot, checked})`,
      `fetchOwnChecks(courseCode, unitNo, topicNo, locale)`, `fetchOwnChecksForCourses(courseCodes)`
      (for the Progress area roll-up), `fetchAdminAggregate(courseCode?, unitNo?)` (depends on
      T004, T001).
- [X] T012 [US1] Extend `scripts/build-content-index.mjs` with a `self_assessment_count` field on
      every `kind: 'topic'` record, computed via `scripts/lib/mdx-sections.mjs`'s
      `countChecklistInSection()` (research.md R5) (depends on T002).
- [X] T013 [US1] Create `src/theme/DocItem/Content.tsx` (new swizzle) per
      `contracts/self-assessment-hydration.md`: activation only when `frontMatter.topic_no` is
      present; locate the 6th of 9 `##` `toc` entries; walk to the following `<ul>`; for each
      `<li>` with a checkbox, un-disable it and wire `onChange`; resolve initial `checked` from
      `selfAssessment.ts` (T011) when signed in (normalizing `item_text_snapshot` per FR-009,
      rendering unchecked - not deleting the stored row - on a wording mismatch) or from
      `localStorage` when signed out/account services unavailable; run the one-time
      local-to-account merge on the sign-in transition, gated by a `sa-merged:<profileId>` flag
      (research.md R4) (depends on T011).
- [X] T014 [US1] Extend `src/pages/app/dashboard/progress.tsx` with a self-assessment roll-up
      panel: per-topic/unit/course completion fraction derived from `content-index.json`'s
      `self_assessment_count` (T012) and `fetchOwnChecksForCourses()` (T011), rendered visually
      separate from the existing unit-coverage panel (FR-004); when a unit's fraction reaches
      100%, show a non-blocking prompt to mark it studied via the existing `markUnitStudied()`
      (Spec 004, `unitProgress.ts`, unchanged) - the prompt calls `markUnitStudied()` only on the
      student's own click, never automatically as a side effect of reaching 100%, so the student
      still takes that action explicitly (FR-005; `/sp.analyze` finding G2) (depends on T011,
      T012, T013).

**Checkpoint**: User Story 1 fully functional and independently testable - the MVP.

---

## Phase 4: User Story 2 - Readers flag problems in the text; the owner triages them (Priority: P1)

**Goal**: A signed-in reader submits whole-page or passage-anchored feedback on any of the five
Spec 008 page kinds in a unit; the curriculum owner opens a queue, sees each item with its quoted
passage in context, filters it, and moves it through open/planned/resolved/declined.

**Independent Test**: As a signed-in student, submit one general and one passage-anchored comment
on a topic in each language. As the curriculum owner, open the queue, confirm both appear with the
quoted passage shown as a blockquote, filter by unit and status, and move one item
open -> planned -> resolved with a note. Confirm a non-owner cannot change status and a reader
sees only their own items.

### Tests for User Story 2

- [X] T015 [P] [US2] RLS test in `tests/rls/content-feedback-isolation.test.mjs`: a signed-out
      request is rejected outright; a reader can insert only with `status='open'`, any other
      explicit status is rejected; a forged `author_role` is silently replaced by the
      trigger-computed value; a `scope='passage'` insert with `quoted_passage` null is rejected
      and vice versa; an insert with `comment` over 4,000 characters, or `quoted_passage`/
      `passage_context` over 2,000 characters, is rejected (FR-017; `/sp.analyze` finding U1); a
      reader cannot `SELECT` another reader's row nor `UPDATE` any row, including their own
      (FR-013, FR-014, FR-015, FR-017; contract checklist items 6-10, 16).
- [X] T016 [P] [US2] RLS test in `tests/rls/content-feedback-status-transitions.test.mjs`: every
      legal transition in `data-model.md`'s state list (including a reopen) succeeds and bumps
      `updated_at`; every illegal transition (e.g. a two-hop jump) is rejected; an admin's attempt
      to change `comment`/`quoted_passage`/`author_id`/`page_kind`/etc. is rejected by the same
      trigger regardless of whether `status` also changes (FR-019, FR-021; contract checklist
      items 11, 12).
- [X] T017 [P] [US2] E2E test in `tests/e2e/content-feedback-submission.spec.ts`: as a signed-in
      reader on a `topic-NN.mdx` page, submits whole-page feedback and, separately, selects a
      sentence and submits passage feedback, in both `en` and `ur`, and on a small viewport - each
      submission timed under 30 seconds by the test clock (SC-003; `/sp.analyze` finding G3);
      confirms a signed-out visitor sees no feedback control at all on the same page (FR-010-013;
      US2 AS1-3).
- [X] T018 [P] [US2] E2E test in `tests/e2e/owner-feedback-triage.spec.ts`: as the curriculum
      owner, opens the queue, confirms both seeded items show their quoted passage in context, and
      filters by course/unit/topic/status/scope/locale in turn - the full filter-and-locate flow
      timed under 15 seconds by the test clock (SC-004; `/sp.analyze` finding G3); moves one item
      `open -> planned -> resolved` with a note and a resolution reference and confirms the filing
      reader sees the new status; edits the live topic file's text after filing one seeded item
      and confirms the queue still shows that item's original quoted passage verbatim, unaffected
      by the content change (FR-021; `/sp.analyze` finding G5); confirms a non-owner reaching the
      queue route is denied and any attempted status change is rejected (FR-018-021, SC-007;
      US2 AS5-7).

### Implementation for User Story 2

- [X] T019 [US2] Extract `findNearestSectionAnchor()` out of `src/theme/DocItem/Footer.tsx`'s
      `SuggestImprovementControl` into `src/lib/docPosition.ts`; update `Footer.tsx` to import it
      from there (behavior-preserving - the existing "Suggest improvement" flow, FR-016, is
      unaffected) (research.md R7).
- [X] T020 [US2] Implement `src/lib/contentFeedback.ts` (base): `submitFeedback({authorId,
      pageKind, courseCode, unitNo, topicNo, locale, sectionAnchor, scope, quotedPassage,
      passageContext, comment})`, `fetchOwnFeedback()`, `fetchQueue(filters)` (admin - any
      subset of course/unit/topic/status/scope/locale), `transitionFeedback(id, status, {
      ownerNote, resolutionRef })` (depends on T005, T006, T007, T001).
- [X] T021 [US2] Extend `src/theme/DocItem/Footer.tsx` with a reader-only `FeedbackControl`,
      rendered for any signed-in reader (student or teacher) on the five page kinds from
      research.md R6 (derived from the page's path, mirroring `deriveSourceKindFromPath`): a
      "give feedback" affordance offering whole-page or (after a text selection via
      `window.getSelection()`, capped at 2,000 characters) passage-anchored submission, capturing
      the nearest section via `docPosition.ts` (T019) and the current locale; calls
      `submitFeedback()` (T020) (depends on T020, T019).
- [X] T022 [US2] Build `src/pages/app/admin/feedback-queue.tsx`: filterable triage queue (course,
      unit, topic, status, scope, locale), each row showing the quoted passage as a blockquote in
      context, status-transition controls presenting only the currently legal next status(es),
      `owner_note`/`resolution_ref` fields on resolve/decline, wrapped in the existing
      `AuthGuard requireRole="admin"` pattern (mirrors `admin/suggestions.tsx`) (depends on T020).

**Checkpoint**: User Stories 1 and 2 both independently functional - both P1 stories done.

---

## Phase 5: User Story 3 - The curriculum owner sees the whole picture on one page (Priority: P2)

**Goal**: The curriculum owner opens one overview page and sees per-course/unit content status,
outstanding figures, feedback counts per stream/status with links to each queue, and student
progress aggregates, each with an explicit empty state; a non-owner is refused the page; it
renders correctly bilingual/RTL.

**Independent Test**: Sign in as the curriculum owner, open the overview, and confirm each panel
renders with accurate counts, shows an explicit empty state where there is no data, and links out
correctly. Confirm a non-owner is refused the page. Confirm the page renders correctly in both
languages and right-to-left.

### Tests for User Story 3

- [X] T023 [P] [US3] E2E test in `tests/e2e/owner-console-rtl.spec.ts`: as the curriculum owner,
      opens `/app/admin/overview` and confirms the content-status, feedback, self-assessment, and
      progress panels each render with accurate counts (cross-checked against seeded data) and an
      explicit empty state when a panel has no data (a course with no figure manifest shows zero
      figures outstanding, not an error); confirms a non-owner sees `OwnerConsoleGuard`'s
      dedicated denial notice; switches locale to `ur` and confirms every panel/label/number
      renders correctly right-to-left (FR-026, FR-030, SC-006, SC-008; US3 AS1-5).

### Implementation for User Story 3

- [X] T024 [US3] Implement `src/components/OwnerConsoleGuard.tsx`: mirrors
      `StudentDashboardGuard.tsx`'s dedicated-message pattern (cosmetic gate, Constitution Art.
      IX.2 disclaimer) for `/app/admin/overview` and `/app/admin/feedback-queue`.
- [X] T025 [US3] Build `src/pages/app/admin/overview.tsx`: a content-status panel (placeholder
      pending T027/T030 - Story 4's report), a feedback panel (counts per stream/status from
      `fetchQueue()`/`fetchAdminAggregate()`, linking to `feedback-queue.tsx`), a self-assessment
      aggregate panel (`selfAssessment.ts`'s `fetchAdminAggregate()`, T011), and a progress
      aggregates panel (reusing Spec 004/005's existing unit-coverage/achievements query helpers
      unmodified), each with an explicit empty state; wrapped in `OwnerConsoleGuard` (T024);
      bilingual `MESSAGES` dict (FR-030) (depends on T024, T011, T020).

**Checkpoint**: User Stories 1-3 all independently functional.

---

## Phase 6: User Story 4 - A report of what content and figures still need work (Priority: P2)

**Goal**: One command produces a per-course/unit status inventory (authored vs. planned,
language-completion, depth-check pass/fail, figure counts by production state) plus a
human-readable "figures pending" list grouped by course/unit/topic; the same inventory regenerates
automatically at build time and runs informationally in CI.

**Independent Test**: Run the command against the repository and confirm it prints a per-course
status table and a "figures pending" section that matches the figure manifests; confirm it writes
a machine-readable status file; confirm it runs as part of build preparation and in CI without
failing the build; confirm it reuses the existing manifest and depth-check logic.

### Tests for User Story 4

- [X] T026 [P] [US4] Fixture-driven unit test in `tests/unit/content-status-report.test.mjs`:
      spawns `scripts/report-content-status.mjs` against a temp `CONTENT_ROOT` (same pattern as
      `figures-gate.test.mjs`/`depth-gate.test.mjs`); asserts a course with no
      `specs/content/<course>/figures/` manifest at all contributes zero figures outstanding, not
      an error (US4 AS2); asserts a unit whose figures are all `placed` contributes nothing to
      `figures_pending` (US4 AS2); asserts the emitted JSON's per-course/unit record matches a
      hand-built fixture's authored/planned, language-completion, and depth-check verdict
      (FR-031).

### Implementation for User Story 4

- [X] T027 [US4] Create `scripts/report-content-status.mjs`: imports
      `scripts/lib/figure-manifest.mjs` and `scripts/lib/unit-depth.mjs` (never re-deriving either
      - FR-033), walks `docs/` with the same `dirs()`/`topicFilesIn()` idiom as every other
      content script, and writes `static/content-status.json` per `data-model.md`'s shape
      (`generated_at`, per-course/unit `authored`, `translation_status`, `depth_check`, `figures`
      by production state, `figures_pending` grouped by course/unit/topic) (depends on T002, T003).
- [X] T028 [US4] `package.json`: add `"check:content-status": "node
      scripts/report-content-status.mjs"`; call it from `prestart`/`prebuild` alongside the
      existing `build-content-index.mjs` call (FR-032) (depends on T027).
- [X] T029 [US4] `.github/workflows/ci.yml`: add an informational, non-blocking step after the
      existing "Figure marker gate" step - `run: npm run check:content-status || echo
      "::warning::content-status report failed"` (FR-032) (depends on T027).
- [X] T030 [US4] Wire `admin/overview.tsx`'s content-status panel (T025) to `fetch('/content-
      status.json')` and render real per-course/unit rows plus the `figures_pending` list, and
      display the file's own `generated_at` timestamp (SC-006, SC-010) (depends on T027, T025).

**Checkpoint**: User Stories 1-4 all independently functional.

---

## Phase 7: User Story 5 - Feedback becomes a proposed revision (Priority: P3)

**Goal**: For one unit, the curriculum owner exports all open/planned feedback as one
self-contained document; a documented procedure turns it into a reviewable, minimal, traceable
revision of the affected files and their translations; closing the loop stays an explicit,
separate owner action in the queue.

**Independent Test**: With several open feedback items on a unit, produce the export and confirm
it contains repo-relative topic paths, the quotes, and the comments, and no copied topic body
text. Follow the documented revision procedure and confirm the result is a change set in which
each edit cites a feedback item, topic structure and reading level are preserved, and all content
checks (including the em-dash check) pass. Confirm feedback status only changes when the owner
changes it.

### Tests for User Story 5

- [X] T031 [P] [US5] Unit test in `tests/unit/feedback-export.test.mjs` (or an e2e case in
      `tests/e2e/owner-feedback-triage.spec.ts`, T018): a unit with zero open/planned items
      produces an empty export document, not an error; re-exporting after no queue change returns
      the exact same items (idempotent, edge case); the document contains no page body text, only
      repo-relative paths, quotes, and comments (FR-022; contract checklist item 14).

### Implementation for User Story 5

- [X] T032 [US5] Implement `exportUnitFeedback(courseCode, unitNo)` in `src/lib/contentFeedback.ts`
      (T020): queries `content_feedback` for `status in ('open','planned')` scoped to the unit,
      resolves each row's `(course_code, unit_no, topic_no, page_kind)` to its repo-relative path
      via the same filename convention `report-content-status.mjs` (T027) encodes, and renders one
      Markdown document - a heading per affected file, each quoted passage as a blockquote, each
      comment as prose beneath, no page body text (depends on T020, T027).
- [X] T033 [US5] Add an "Export unit feedback" control to `admin/feedback-queue.tsx` (T022) that
      calls `exportUnitFeedback()` (T032) and offers the result for download/copy (depends on
      T032, T022).
- [X] T034 [US5] Create `.claude/skills/revise-topic/SKILL.md` and its two references
      (`references/export-format.md`, `references/stale-passage-handling.md`): read the export ->
      locate each quoted passage verbatim in its named file -> propose a minimal edit addressing
      the comment -> mirror the edit into the file's translation -> run `npm run
      validate:content && npm run check:depth-gate && npm run check:figures && npm run
      check:no-answer-keys && npm run check:no-em-dash && npm test` -> present the change set for
      review; a quoted passage no longer found verbatim is reported as stale and skipped, never
      guessed at (FR-023, FR-024, FR-025).

**Checkpoint**: User Stories 1-5 all independently functional.

---

## Phase 8: User Story 6 - The owner acts from the console: triage, refresh, catalog (Priority: P3)

**Goal**: From the overview, the owner triages a feedback item without leaving the page, triggers
a content-status refresh and sees when it was last produced, and edits a catalog entry as a
downloadable, version-control-bound change - never a live database write of catalog content.

**Independent Test**: From the overview, move a feedback item open -> planned and confirm it
persists and shows in the detailed queue. Trigger a content-status refresh and confirm the "last
produced" time updates. Edit a catalog entry and confirm the change is delivered as a reviewable
change set, not a direct database write to content.

### Tests for User Story 6

- [X] T035 [P] [US6] E2E test extending `tests/e2e/owner-console-rtl.spec.ts` (T023): from the
      overview, moves a feedback item `open -> planned` via the inline control and confirms it
      persists and shows the new status in `feedback-queue.tsx`; clicks "refresh" on the
      content-status panel and confirms the displayed `generated_at` timestamp is re-read from
      `/content-status.json`; edits a catalog entry and confirms the result is an offered
      downloadable `courses.json`, with no network call to Postgres for catalog content (FR-027,
      FR-028, FR-029; US6 AS1-3).

### Implementation for User Story 6

- [X] T036 [US6] Extend `admin/overview.tsx` (T025) with an inline feedback-triage control per row
      of its feedback panel (`open -> planned` or `open -> declined`, calling
      `transitionFeedback()`, T020) that persists and is reflected in `feedback-queue.tsx` without
      navigating away (FR-027) (depends on T020, T025).
- [X] T037 [US6] Extend `admin/overview.tsx`'s content-status panel (T030) with a "refresh"
      control that re-`fetch()`s `/content-status.json` and re-renders its `generated_at`
      (research.md R10 - this re-reads the build-time artifact, it does not trigger a live
      rebuild) (FR-028) (depends on T030).
- [X] T038 [US6] Add a catalog-edit form to `admin/overview.tsx`: copy `catalog/courses.json` to
      `static/catalog-courses.json` at build time (a small addition to
      `scripts/build-content-index.mjs` or a new one-line script alongside it); the form reads
      that static copy, lets the owner edit one course entry's fields, and produces a downloadable,
      fully-formed replacement `courses.json` for the owner to review and commit - the console
      never writes catalog content to Postgres (FR-029) (depends on T025).

**Checkpoint**: All six user stories independently functional and integrated.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: A comprehensive cross-table isolation regression test, the Student/Teacher Guide and
README edits (Constitution Article X's Docs-gate obligation), the grouped ADR, and final
validation.

- [X] T039 [P] RLS test in `tests/rls/curriculum-owner-console-full-isolation.test.mjs`: walks the
      complete access-control matrix from `data-model.md` (student/teacher/admin x
      `self_assessment_checks`/`content_feedback`) as one consolidated regression check,
      complementing each story's narrower tests above (SC-002, SC-007) (depends on T004-T007 - all
      schema must exist).
- [X] T040 [P] Author a "Self-assessment and giving feedback" section in the existing Student
      Guide tree (EN + UR), covering the checklist's cross-device sync and how to give feedback on
      a passage (Constitution Art. X.1/X.2).
- [X] T041 [P] Author a "Giving feedback on content" section in the existing Teacher Guide tree
      (EN + UR), distinguishing this feature's reader-feedback control from the existing "suggest
      improvement"/"give feedback on this activity" controls (FR-016; plan.md Risk 2).
- [X] T042 [P] `README.md`: add a short "Curriculum-owner console" pointer under the admin-tooling
      notes (Constitution Art. X.2).
- [X] T043 Verify the Art. V.5 bundle budget for the new `admin/overview.tsx`,
      `admin/feedback-queue.tsx`, the `DocItem/Content.tsx` swizzle, and the extended
      `DocItem/Footer.tsx` (build-size/Lighthouse check).
- [X] T044 Run `quickstart.md`'s full end-to-end verification checklist, plus the complete `npm
      run test:rls` and `npm run test:e2e` suites (including T039's consolidated isolation test
      and T023/T035's RTL + actions spec); confirm every item in
      `contracts/console-operations.md`'s 16-item checklist passes; run `npm run build` (en + ur)
      and confirm `static/content-status.json` regenerates.
- [X] T045 `/sp.adr` for the grouped decision cluster spec.md names: `content_feedback` as a
      distinct table from `activity_feedback`/`improvement_suggestions`; best-effort in-house
      passage capture/re-location over an annotation library; the catalog-edit download-a-file
      mechanism.
- [X] T046 Reconcile any implementation drift (exact hydration DOM-walk edge cases, the final
      `content-status.json` shape, the catalog-edit form's exact fields) back into `plan.md` /
      `data-model.md` / `contracts/` (Constitution Art. IV.4).

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories (every story
  needs at least one of the two new tables or the shared script modules).
- **User Stories (Phase 3-8)**: All depend on Foundational phase completion.
  - US1 and US2 (both P1) have no dependency on each other - disjoint tables, disjoint files.
  - US3 depends on US1's `selfAssessment.ts` (T011) and US2's `contentFeedback.ts` (T020) existing
    to have anything to aggregate - matches spec.md's own stated story ordering ("it presents data
    the other stories produce").
  - US4 depends only on Foundational's script extractions (T002, T003), not on US1/US2/US3 - it
    could in principle run in parallel with them, but its output (T030) is wired into US3's
    overview, so it is sequenced right after US3 here.
  - US5 depends on US2's `contentFeedback.ts` (T020) and US4's path-resolution convention (T027).
  - US6 depends on US2's `contentFeedback.ts` (T020), US3's `overview.tsx` (T025), and US4's
    report (T027/T030) - it is the last story because every control it adds is an extension of
    surfaces the earlier stories built.
- **Polish (Phase 9)**: Depends on all six user stories being complete (T039 needs every new
  table's schema to exist; T044 needs every page to exist).

### Within Each User Story

- Tests MUST be written and FAIL before implementation.
- Migrations (Foundational) before lib helpers; lib helpers before pages/swizzles.
- Story complete before moving to the next priority (though US1/US2 can proceed in parallel if
  staffed, since they touch disjoint files until Polish).

### Parallel Opportunities

- Foundational: T002-T005 are all `[P]` (disjoint files); T006/T007 depend on T005.
- US1 and US2 can be staffed in parallel once Foundational completes - disjoint files
  (`selfAssessment.ts`/`DocItem/Content.tsx`/`progress.tsx` vs. `contentFeedback.ts`/
  `docPosition.ts`/`Footer.tsx`/`feedback-queue.tsx`).
- All RLS/E2E tests within a story marked `[P]` can run in parallel.
- US4's Foundational-only dependency (T002, T003) means its test (T026) and first implementation
  task (T027) could be staffed in parallel with US1/US2/US3's work, even though this list
  sequences it after US3 for the overview-wiring dependency (T030).

---

## Parallel Example: User Story 1

```bash
# Launch all three tests for User Story 1 together:
Task: "RLS test in tests/rls/self-assessment-isolation.test.mjs"
Task: "RLS test in tests/rls/self-assessment-immutable-identity.test.mjs"
Task: "E2E test in tests/e2e/self-assessment-checklist.spec.ts"

# T011 (selfAssessment.ts) and T012 (build-content-index.mjs) touch different files and can run
# in parallel; T013 (DocItem/Content.tsx) depends on T011; T014 (progress.tsx) depends on all three.
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories).
3. Complete Phase 3: User Story 1 (self-assessment checklist).
4. Complete Phase 4: User Story 2 (feedback capture + owner triage).
5. **STOP and VALIDATE**: Test both stories independently.
6. Deploy/demo if ready - together these deliver both of the spec's P1 stories: the persisted
   checklist and the owner's central feedback ask.

### Incremental Delivery

1. Setup + Foundational -> foundation ready.
2. US1 (self-assessment checklist) -> test independently -> deploy (MVP, part 1).
3. US2 (feedback capture + triage) -> test independently -> deploy (MVP, part 2).
4. US3 (owner overview) -> test independently -> deploy.
5. US4 (content/figure status report) -> test independently -> deploy.
6. US5 (export + revision loop) -> test independently -> deploy.
7. US6 (console actions: inline triage, refresh, catalog edit) -> test independently -> deploy.
8. Polish: guides, README, consolidated isolation regression, ADR, full verification.

### Parallel Team Strategy

With multiple developers, once Foundational is done: Developer A takes US1 then US3+US6's
overview-shell work (naturally sequenced, same files); Developer B takes US2 then US5 (the
feedback/export/revision pair, naturally sequenced, sharing `contentFeedback.ts`); Developer C
takes US4 (independent of US1/US2's schema, only needs Foundational's script extractions), then
joins US6's remaining actions once US3's overview shell exists.

---

## Notes

- `[P]` tasks = different files, no dependencies.
- `[Story]` label maps task to specific user story for traceability.
- Verify tests fail before implementing.
- Commit after each task or logical group.
- Stop at any checkpoint to validate a story independently.
- The checklist-hydration swizzle (T013) locates its target by **position** among the topic
  file's nine cycle headings, never by heading text or a new front-matter field - do not
  "simplify" this later into an id-based lookup that breaks the moment a topic's headings render
  in Urdu (research.md R2).
- `enforce_content_feedback_status_transition()` (T007) is the only thing preventing a crafted
  admin API call from skipping a triage step or editing already-filed content - do not relax it
  to "trust the triage UI" later.
- `report-content-status.mjs` (T027) must always import `scripts/lib/figure-manifest.mjs` and
  `scripts/lib/unit-depth.mjs` - never re-implement either parser, even partially, even for a
  quick fix (FR-033).
