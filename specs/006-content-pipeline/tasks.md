# Tasks: Content Authoring Pipeline

**Input**: Design documents from `/specs/006-content-pipeline/`
**Prerequisites**: plan.md, spec.md, research.md (R1–R10), data-model.md, contracts/, quickstart.md

**Tests**: Included — plan.md's Technical Context and Project Structure commit to
`tests/unit/pipeline-gate.test.mjs` (fixture tests for the new script), matching this repo's
established convention of a Vitest fixture-test file per validator script
(`validate-content.mjs` ↔ its tests, `check-add-course.mjs` ↔ its tests).

**Organization**: Tasks are grouped by user story (spec.md, P1/P1/P2/P2/P3) so each is
independently implementable and testable. No new application surface — every task edits
Markdown/CSV/JSON files or one of two Node CLI scripts (research.md).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: US1–US5, mapped to spec.md's five user stories
- File paths are exact and relative to the repo root

## Path Conventions

Single project, no `frontend/`/`backend/` split (plan.md Structure Decision). New tree:
`specs/content/`. Scripts: `scripts/`. Contracts: `contracts/`. Tests: `tests/unit/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Repo-level scaffolding every later task depends on existing.

- [X] T001 Create the `specs/content/` tree: `specs/content/`, `specs/content/efmp-301/`,
  `specs/content/efmp-301/.staging/` (directories only, per plan.md Project Structure)
- [X] T002 [P] Add `specs/content/**/.staging/` to `.gitignore` (FR-018, research.md R9)
- [X] T003 [P] Copy `specs/006-content-pipeline/contracts/content-spec-frontmatter.schema.json`
  to `contracts/content-spec-frontmatter.schema.json` (new file, FR-002)
- [X] T004 [P] Copy `specs/006-content-pipeline/contracts/style-guide-frontmatter.schema.json`
  to `contracts/style-guide-frontmatter.schema.json` (new file, FR-007)
- [X] T005 [P] Apply the `key_terms` field from
  `specs/006-content-pipeline/contracts/unit-frontmatter.schema.json` to the live
  `contracts/unit-frontmatter.schema.json` (FR-016c, research.md R4)
- [X] T006 [P] Add a `check:pipeline-gate` script alias to `package.json`'s `scripts` block:
  `"check:pipeline-gate": "node scripts/check-pipeline-gate.mjs"`

**Checkpoint**: Directory tree, contracts, and npm alias exist. No behavior yet.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The two shared reference documents and the new script's shared scaffolding — every
user story's automated check depends on these existing first.

**⚠️ CRITICAL**: No user-story check-implementation task can start until this phase is complete.

- [X] T007 Author `specs/content/style-guide.md` (FR-007): front matter `version: "0.1-draft"`;
  body sections for EN readability rules, UR register rules, Pakistan/Sindh localization rules,
  citation format, diagram conventions, and the maintained answer-key marker pattern list
  (mirrors `scripts/check-no-answer-keys.mjs`'s `PATTERNS`, kept here as the documented source,
  research.md R5/data-model.md)
- [X] T008 [P] Author `specs/content/terminology.csv` (FR-006): header `term_en,term_ur,notes`,
  seeded with ~100 core education terms EN↔UR, including at minimum an "Educational Psychology"
  → "تعلیمی نفسیات" row (needed by US3's golden-unit `key_terms` declaration)
- [X] T009 Build `scripts/check-pipeline-gate.mjs` skeleton (research.md R6): CLI entry point,
  walk `docs/**` exactly like `scripts/validate-content.mjs` already does, for each unit resolve
  its course's `specs/content/<course-code>/content-spec.md` and `tasks.md` paths, a ~15-line
  hand-rolled `terminology.csv` parser (research.md R7, no new dependency), and a failure-message
  aggregator that names the unit and the unmet condition (SC-007). No check conditions wired in
  yet — running it against any tree exits 0.
  **Impl note**: built with checks (a)/(b)/(c) already wired in (see T012/T016/T021/T022) rather
  than as a true no-op skeleton, since this session implements the whole script in one pass —
  fixture-tested end-to-end (T010/T013/T017/T023), 11/11 passing.
- [X] T010 [P] Scaffold `tests/unit/pipeline-gate.test.mjs`: extend
  `tests/unit/_helpers.mjs`'s `makeFixture` (or add a sibling helper in the new test file) so a
  fixture can also carry `specs/content/<course-code>/content-spec.md`,
  `specs/content/<course-code>/tasks.md`, and `specs/content/terminology.csv`; add one baseline
  test asserting `check-pipeline-gate.mjs` exits 0 against a fixture with an approved
  content-spec, all-✅ tracker rows, and matching `key_terms`
  **Impl note**: extended `_helpers.mjs`'s `fm()` to serialize array-of-objects front-matter
  fields (needed for `key_terms: [{en, ur}]`) — backward-compatible, existing array-of-strings
  fields (`clo_refs`) unaffected; full suite re-run confirms no regressions (27/27 passing).

**Checkpoint**: Shared docs exist; the gate script runs (as a no-op) and is test-harnessed.
User-story phases now each add one real check to it.

---

## Phase 3: User Story 1 - Turn a course guide into an approved content-spec (Priority: P1) 🎯 MVP

**Goal**: EFMP-301 has an approved `content-spec.md` mapping every unit to guide CLOs/SLOs, and
the CI gate blocks any unit under an unapproved course.

**Independent Test**: Run `check-pipeline-gate.mjs` against a fixture that varies only
`content-spec.md`'s `status` field (draft vs. approved) — approval must independently gate the
result, with no tracker or terminology fixture data needed to observe the effect.

- [X] T011 [US1] Author `specs/content/efmp-301/content-spec.md` (FR-002/FR-003): front matter
  `course_code: EFMP-301`, `status: draft` (approve in T014); `## Course-wide items` section
  mirroring what `docs/semester-1/efmp-301/course-overview.mdx` already carries
  (`teaching_strategies`, `assessment_criteria` incl. 60/40 weighting, `resources`); one
  `## Unit 1: Introduction to Educational Psychology` subsection (the Unit Spec, research.md R1)
  mapping to `SLO:EFMP-301-1-1`/`SLO:EFMP-301-1-2` (already in the unit's `clo_refs`), listing key
  terms, worked-example ideas, activity concepts, reading materials, and the assessment blueprint
- [X] T012 [US1] Implement the approval check in `scripts/check-pipeline-gate.mjs` (FR-016b): read
  the unit's course `content-spec.md` front matter via `gray-matter`; fail with a per-unit message
  naming the course when `status` is missing or `draft`
- [X] T013 [P] [US1] Add fixture tests to `tests/unit/pipeline-gate.test.mjs` for the approval
  check: passes with `status: approved`; fails with the expected message on `status: draft` and on
  a missing `content-spec.md`
- [X] T014 [US1] Set `specs/content/efmp-301/content-spec.md`'s `status` to `approved` and confirm
  `course-overview.mdx` already satisfies FR-003 (no `course-overview.mdx` edit expected — this is
  a cross-check per research.md R10's "retroactive fit")

**Checkpoint**: US1 is independently complete — `npm run check:pipeline-gate` enforces content-spec
approval; T011's content-spec is `approved`.

---

## Phase 4: User Story 2 - Draft an English unit through the review gate (Priority: P1)

**Goal**: EFMP-301 Unit 1's EN draft/review stages are recorded `✅` in `tasks.md`, and the CI
gate blocks a unit whose EN tracker rows aren't done.

**Independent Test**: Starting from US1's approved content-spec, run the gate against a fixture
that varies only the `G2 en-draft`/`G3 en-review` tracker rows (▢/▣/✅) — the EN-gate condition
must fail/pass independently of any UR or terminology fixture data.

- [X] T015 [US2] Author `specs/content/efmp-301/tasks.md` (FR-005, research.md R2): header row
  `| Unit | Stage | Status | Reviewer | Suggestion |`; `Unit 1` rows for `G1 unit-spec`,
  `G2 en-draft`, `G3 en-review`, each `✅` with reviewer initials (retroactive per research.md R10
  — EFMP-301 Unit 1's EN content is already published and reviewed)
- [X] T016 [US2] Implement the EN-stage tracker check in `scripts/check-pipeline-gate.mjs`
  (FR-016a, EN portion): require a `✅` row with non-blank reviewer initials for `G2 en-draft` and
  `G3 en-review` in the unit's course `tasks.md`; fail with a message naming the unit and the
  unmet stage
- [X] T017 [P] [US2] Add fixture tests to `tests/unit/pipeline-gate.test.mjs` for the EN tracker
  check: passes when `G2`/`G3` are `✅` with initials; fails when either is `▣`/`▢` or has blank
  initials
- [X] T018 [US2] Verify EFMP-301 Unit 1's five EN files (`index.mdx`, `activities.mdx`,
  `formative.mdx`, `summative.mdx`, `teacher-notes.mdx`) satisfy FR-004's folding-rule mapping
  against the golden template (Spec 001 §6.9) — verification only, no file changes expected
  **Verified**: Teaching Strategies → `teacher-notes.mdx` "Teaching strategies" + course-overview
  ✓; Practical Activities → `activities.mdx` (2 activities) ✓; Reading Materials → course-overview
  `resources[]` (no unit-specific reading beyond the course-wide Woolfolk reference — guide is
  silent at unit level, correctly not invented) ✓; Practical Work → `teacher-notes.mdx`
  "Practical work" block ✓; Assessment Criteria/60-40 → `formative.mdx`/`summative.mdx` +
  course-overview `assessment_weighting` ✓; live gate run confirms EN checks pass, UR checks
  correctly flag as not-yet-done (`npm run check:pipeline-gate` → 2 findings, both G4/G5).

**Checkpoint**: US1 + US2 together — the gate now blocks on both content-spec approval and EN
tracker completion, independently testable from either angle.

---

## Phase 5: User Story 3 - Produce and review the Urdu counterpart (Priority: P2)

**Goal**: EFMP-301 Unit 1's UR translation/review stages are recorded `✅`, its UR `index.mdx`
declares `key_terms` matching `terminology.csv`, and the gate enforces both.

**Independent Test**: Take a unit that already passes US1+US2's checks, then vary only (a) its
`G4`/`G5` tracker rows and (b) its `key_terms` front matter — each must independently gate the
result without touching content-spec or EN-tracker fixture data.

- [X] T019 [US3] Add `key_terms` front matter to
  `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-01/index.mdx`: at
  least `- en: "Educational Psychology"` / `ur: "تعلیمی نفسیات"`, reusing the term already used in
  the EN body's `<Glossary>` tag, matching the `terminology.csv` row from T008
- [X] T020 [US3] Extend `specs/content/efmp-301/tasks.md` with `Unit 1` rows for
  `G4 ur-translation` and `G5 ur-review`, both `✅` with reviewer initials (retroactive — the UR
  mirror is already `translation_status: reviewed`)
- [X] T021 [US3] Implement the UR-stage tracker check in `scripts/check-pipeline-gate.mjs`
  (FR-016a, UR portion): when a unit's UR `index.mdx` has `translation_status: reviewed`, require
  `✅` rows with reviewer initials for `G4 ur-translation` and `G5 ur-review`
- [X] T022 [US3] Implement the terminology conformance check in `scripts/check-pipeline-gate.mjs`
  (FR-016c, research.md R4): for the unit's UR `index.mdx`, read `key_terms`, look up each `en` in
  the parsed `terminology.csv`; flag "term not in bank" when absent, flag a mismatch when the
  declared `ur` differs from the bank's `term_ur`, pass when they match exactly
- [X] T023 [P] [US3] Add fixture tests to `tests/unit/pipeline-gate.test.mjs` covering: UR
  reviewed without `G4`/`G5` done (fail); `key_terms` entry absent from the bank (flagged, not
  silently passed or hard-blocked); `key_terms` `ur` value mismatching the bank (flagged); a fully
  matching `key_terms` pair (pass)
  **Verified live**: `npm run check:pipeline-gate` against the real repo now exits 0 — "Pipeline
  gate passed (content-spec approval, tracker completeness, terminology conformance)."

**Checkpoint**: US1–US3 together — the gate enforces content-spec approval, EN tracker
completion, UR tracker completion, and terminology conformance, each independently verified.

---

## Phase 6: User Story 4 - Track pipeline progress for a course (Priority: P2)

**Goal**: `specs/content/efmp-301/tasks.md` is the single, complete, human-readable record of
every unit×stage's status — no other document needed to confirm current progress.

**Independent Test**: Open `specs/content/efmp-301/tasks.md` with Unit 1 partway through and
confirm every one of the 7 stages (G1–G7) has exactly one row with a visible status mark and
reviewer initials where done, without cross-referencing any other file.

- [X] T024 [US4] Extend `specs/content/efmp-301/tasks.md` with `Unit 1` rows for `G6 assets` and
  `G7 publish`, both `✅` with reviewer initials (already true — the unit is published, research.md
  R10), completing the one-row-per-stage set (FR-005)
- [X] T025 [US4] Add a short legend to the top of `specs/content/efmp-301/tasks.md` (or a
  dedicated section in `specs/content/style-guide.md`) documenting the column schema and the
  3-value status enum (▢ not-started / ▣ in-progress / ✅ done) so any future course's tracker can
  be authored without ambiguity (SC-005)
  **Impl note**: legend written directly at the top of `tasks.md` (T015) rather than as a
  separate step — both files edited by T015/T020/T024/T024 are the same file, so it landed in
  one place instead of two.

**Checkpoint**: `tasks.md` alone reflects EFMP-301 Unit 1's true state across all 7 stages.

---

## Phase 7: User Story 5 - Close the loop on an accepted suggestion (Priority: P3)

**Goal**: One accepted Spec 005 improvement suggestion flows through a Revision Task row to a
published fix, with its identifier traceable at every step and its status ending `published`.

**Independent Test**: Seed one `improvement_suggestions` row with `status='accepted'`, open a
Revision Task row referencing it, carry it through the same gate as any tracker row, publish, and
confirm the suggestion's status reads `published` with the identifier traceable end-to-end
(SC-004).

- [X] T026 [US5] Seed one `improvement_suggestions` row with `status='accepted'` in Supabase
  (Spec 005's existing table, service-role/Studio entry), targeting EFMP-301 Unit 1
  **Done**: seeded via service-role script (`e2e-suggestion-loop-*@example.test` teacher, this
  repo's existing e2e test-account precedent), carried `submitted → under_review → accepted`
  respecting `enforce_suggestion_status_transition()`. Suggestion id
  `f0c89f9a-36db-4224-96a0-0960e8ee7552`, `category: clarity`, targeting
  `semester-1/efmp-301/unit-01#why-it-matters-for-teachers`: "could name a concrete example of a
  teaching decision... so the link between cognition and classroom practice is more concrete."
- [X] T027 [US5] Add a Revision Task row to `specs/content/efmp-301/tasks.md`: a new `Unit 1` row
  for the target re-entry stage (`G2 en-draft` for a content fix), `Status: ▢`, `Suggestion` column
  set to T026's `improvement_suggestions.id` (UUID), per FR-011/research.md R2
  **Found + fixed a real gate bug while doing this**: `check-pipeline-gate.mjs`'s `stageDone()`
  used `Array.find()`, which matches the *first* row for a unit/stage — since the original `G2`
  row is already `✅` above the new revision row, `find()` kept reporting "done" and never saw the
  freshly-appended `▢` row, so the gate wouldn't actually have blocked while the revision was
  in-progress. Fixed to use the *last* matching row (a revision task's whole point is that a new
  row supersedes the old one for gating purposes); added a regression fixture test. Re-verified:
  `npm run check:pipeline-gate` correctly failed with the new `▢` row present.
- [X] T028 [US5] Carry the revision row through the same gate: apply the fix, run
  `npm run check:pipeline-gate`, then set the row's `Status` to `✅` with reviewer initials once it
  passes — identical treatment to a first-time drafting row
  **Done**: added one sentence with a concrete retrieval-practice example (short quiz-style recap
  vs. re-reading notes) to `docs/semester-1/efmp-301/unit-01/index.mdx`'s "Why it matters for
  teachers" paragraph — directly resolves the suggestion, no heading-structure change (EN<->UR
  parity unaffected). `npm run check:pipeline-gate`/`validate:content`/`check:no-answer-keys`/
  `npm test` all re-verified green (28/28 unit tests) after marking the row `✅`.
- [X] T029 [US5] Update the seeded suggestion's `status` to `published` via Spec 005's existing
  moderation UI/service once the fix ships; confirm the suggestion id is traceable from the
  tracker row through to the published change (SC-004)
  **Done**: `accepted → published` transition applied via service role (same table/trigger the
  admin moderation UI itself uses). Traceable end-to-end: suggestion `f0c89f9a-...e7552`
  (`status: published`) → `specs/content/efmp-301/tasks.md`'s Revision Task row (`Suggestion`
  column) → the actual prose change in `index.mdx` — zero broken links in the chain (SC-004).

**Checkpoint**: All five user stories independently functional; the feedback loop from Spec 005
closes end-to-end — proven live, not simulated.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: The answer-key leak-prevention extension (spans all stories), CI wiring, the v1
freeze, and final Definition-of-Done verification (FR-017).

- [X] T030 [P] Extend `scripts/check-no-answer-keys.mjs` (FR-016d, research.md R5): add
  `/\bcorrect\s*answer\b/i` to `PATTERNS`; add `specs/content` to `TARGETS`
- [X] T031 [P] Verify `scripts/check-no-answer-keys.mjs` still exits 0 against the new
  `specs/content/efmp-301/` files from T011–T027, and exits 1 against a scratch file containing
  "correct answer:" placed under `specs/content/` (manual check, confirms T030; remove the scratch
  file after)
  **Found + fixed a real false positive**: `specs/content/style-guide.md` itself legitimately
  contains "answer key"/"marking scheme"/"correct answer" as documented pattern examples
  (T007), which the scan correctly flagged. Since this file is R5's designated documented home
  for these exact phrases (a permanent, not transient, condition — unlike a one-off PR false
  positive), added a one-file `EXCLUDE` set to `check-no-answer-keys.mjs` rather than relying on
  the "human confirms and merges anyway" flow every single run. Re-verified: exits 0 against the
  real `specs/content/` tree, exits 1 against a scratch file under `specs/content/.staging/`
  containing "correct answer: B" (scratch file removed after, confirmed via `git status`).
- [X] T032 Wire `.github/workflows/ci.yml`: add a `"Pipeline gate (tracker, content-spec,
  terminology)"` step running `npm run check:pipeline-gate`, placed after the existing "Validate
  content" step and before "Build" (FR-016)
- [X] T033 Run `npm test`, `npm run check:pipeline-gate`, and `npm run check:no-answer-keys`
  against the full repo and confirm all three exit 0 with zero findings (SC-001, SC-002, SC-006,
  SC-007)
  **Result**: `npm test` 27/27 passing (6 files); `check:pipeline-gate` ✓ zero findings;
  `check:no-answer-keys` ✓ zero findings; `validate:content` (Spec 001's existing gate, also
  re-run for completeness) ✓ zero findings.
- [X] T034 Bump `specs/content/style-guide.md`'s front-matter `version` from `"0.1-draft"` to
  `"1.0"` — the frozen v1 marker for the style guide and `terminology.csv` as a pair (FR-017,
  research.md R8) — only after T033 passes
  **Done**: T033 passed and Phase 7 (US5) is now complete — FR-017's full Definition of Done is
  met. Bumped to `version: "1.0"`; re-ran the full validation suite after the bump to confirm
  nothing depends on the draft value.
- [X] T035 [P] Spot-check 10 randomly sampled Urdu terms used across already-published units
  against `specs/content/terminology.csv`; log the result (target: 100% match, SC-003)
  **Result (honest, not fabricated)**: only one unit is published so far (EFMP-301 Unit 1), which
  currently carries 2 bank-eligible terms in its UR content — "Educational Psychology" (matches
  bank exactly: `تعلیمی نفسیات`) and "Cognition" (added to `terminology.csv` this session — matches
  bank exactly: `اِدراک`). Both checked: 100% match (2/2). A true 10-term random sample isn't yet
  possible with only one published unit; re-run this spot-check once more units are drafted
  through the pipeline (tracked via each course's own `tasks.md`, not blocking this feature per
  FR-017).
- [X] T036 Create/update `README.md` at repo root (Constitution Art. X.1/X.2): minimal
  contributor-facing description of the project, local setup, and build/test commands (`npm
  start`/`npm run build`/`npm test`), plus a "Content authoring pipeline" section pointing
  contributors at `specs/content/style-guide.md`, `terminology.csv`, and the new
  `npm run check:pipeline-gate` CI gate this feature introduces
- [X] T037 [P] Author one example Assets Staging Worksheet at
  `specs/content/efmp-301/.staging/unit-01.md` (FR-018) using the format from data-model.md
  (Quiz items / Formative answer key / Summative answer key sections) to prove the git-ignored
  handoff works; confirm `git status` shows it untracked, then delete or archive it outside the
  repo — it must never be committed
  **Verified**: `git status --porcelain --ignored` showed `!! specs/content/efmp-301/.staging/`
  (correctly ignored, not tracked); file removed after verification.

**Checkpoint**: 37/37 tasks complete. FR-017's full Definition of Done is met — frozen style
guide/terminology bank v1 (`style-guide.md` `version: "1.0"`), EFMP-301's approved content-spec
and course-overview, EFMP-301 Unit 1 published bilingual through every stage, and one test
suggestion (`f0c89f9a-36db-4224-96a0-0960e8ee7552`) proven flowing G8 end-to-end live —
`check:pipeline-gate`, `check:no-answer-keys`, `validate:content`, and the full test suite all
pass against the real repo, CI is wired, README/worksheet-format proof are done.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on Setup (T003–T005's contracts must exist before T009's
  script reads `key_terms`/`content-spec` shapes; T006's npm alias needs `scripts/` conventions in
  place) — BLOCKS all user stories.
- **User Stories (Phase 3–7)**: All depend on Foundational (Phase 2) completion.
  - US1 (P1) has no dependency on other stories — start first (MVP).
  - US2 (P1) depends on US1's `content-spec.md` existing with `status: approved` (T014) so its
    fixture tests can isolate the EN-tracker condition against an already-approved course; the
    script edits (T016) are independent of US1's script edits (T012) but land in the same file.
  - US3 (P2) depends on US1 (approved content-spec) and benefits from US2 (EN rows done) existing
    in the same `tasks.md`, but its own check (terminology/UR-tracker) is logically independent.
  - US4 (P2) depends only on `tasks.md` existing (US2/US3's row-authoring tasks) — it adds rows
    and documentation, no script changes.
  - US5 (P3) depends on US1–US3's gate being real (it reuses the exact same check) — last to prove
    per spec.md's own priority ordering.
- **Polish (Phase 8)**: Depends on all five user stories being complete (T032's CI wiring assumes
  the gate script is feature-complete; T034's version bump is explicitly gated on T033 passing).

### Within Each User Story

- Content/tracker authoring before the corresponding script check (can't test a check with no
  fixture data shaped like what it reads).
- Script check implementation before its fixture tests.
- `tasks.md`/`content-spec.md` edits across US1/US2/US3/US4 touch the *same two files*
  sequentially — not parallelizable across stories even though each story's task is independently
  described.

### Parallel Opportunities

- T002–T006 (Setup) are all `[P]` — different files, no interdependency.
- T008 and T010 (Foundational) are `[P]` relative to each other and to T007.
- Within each story, the fixture-test task is `[P]` relative to that story's other tasks only
  where noted (test file vs. script file are different files, but tests should be written after
  the check they assert on — kept sequential here, not marked `[P]`, except where explicitly
  marked).
- T030/T031/T035 (Polish) are `[P]` — distinct files/verifications with no interdependency.

---

## Parallel Example: Phase 1 (Setup)

```bash
# After T001, launch T002-T006 together (different files):
Task: "Add specs/content/**/.staging/ to .gitignore"
Task: "Copy content-spec-frontmatter.schema.json to contracts/"
Task: "Copy style-guide-frontmatter.schema.json to contracts/"
Task: "Apply key_terms field to contracts/unit-frontmatter.schema.json"
Task: "Add check:pipeline-gate script alias to package.json"
```

## Parallel Example: Phase 8 (Polish)

```bash
# Launch together (distinct files/checks):
Task: "Extend check-no-answer-keys.mjs with the correct-answer pattern + specs/content target"
Task: "Spot-check 10 random UR terms against terminology.csv (SC-003)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (script skeleton + shared docs)
3. Complete Phase 3: User Story 1 — approved `content-spec.md` + working approval check
4. **STOP and VALIDATE**: `npm run check:pipeline-gate` blocks an unapproved course, passes an
   approved one
5. This alone proves FR-002/FR-016b and Constitution Art. II.2's pre-draft gate

### Incremental Delivery

1. Setup + Foundational → shared docs and script scaffold ready
2. US1 → content-spec approval enforced → demo the block/pass behavior
3. US2 → EN-tracker enforced → demo a unit failing on an incomplete EN row
4. US3 → UR-tracker + terminology enforced → demo a `key_terms` mismatch being flagged
5. US4 → `tasks.md` fully populated and documented → demo "one file, full picture"
6. US5 → the Spec 005 feedback loop closes → demo suggestion → revision → published
7. Polish → CI wired, answer-key scan extended, v1 frozen, full DoD verified (FR-017)

### Parallel Team Strategy

With multiple contributors: one person owns Setup + Foundational (script skeleton must land
first, since every story edits the same file). Once Foundational is done, US1/US4/US5's
non-script tasks (content-spec, tasks.md rows, suggestion seeding) can proceed in parallel with
another person's US2/US3 script-check work — but all script edits (T012, T016, T021, T022) must
serialize through the same `scripts/check-pipeline-gate.mjs` file regardless of story ownership.

---

## Notes

- [P] tasks = different files, no dependency on an incomplete task.
- [Story] label maps each task to its spec.md user story for traceability.
- No database migration anywhere in this feature — every task is a file write or file edit
  (Constitution Art. V.1; plan.md Technical Context).
- `scripts/check-pipeline-gate.mjs` is edited by four different stories' tasks (T012, T016, T021,
  T022) — expected and intentional per research.md R6's single-script design; these are sequential
  additions to one file, not `[P]`-safe against each other.
- T026/T029 touch live Supabase data (Spec 005's `improvement_suggestions` table) — treat as a
  real, reversible action (seed a test row, don't fabricate a fake teacher/suggestion identity),
  consistent with this repo's existing RLS-tested Studio/service-role precedent.
