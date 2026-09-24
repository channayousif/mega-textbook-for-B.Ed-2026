# Tasks: Author GICT-300 · Application of ICT

**Feature**: 020-author-gict-300 | **Branch**: `020-author-gict-300`
**Input**: [spec.md](./spec.md) · [plan.md](./plan.md)

## Format: `[ID] [P?] [Story] Description`

`[P]` marks tasks that touch different files with no incomplete dependency, so they may run in
parallel.

## Path Conventions

Content under `docs/semester-1/gict-300/unit-NN/` (degree track). Urdu mirror under
`i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-NN/`. Governance under
`specs/content/gict-300/`. Figures under `static/img/figures/gict-300/unit-NN/`.

---

## Phase 1: Foundation (G0/G1)

- [ ] **T001** Author `specs/content/gict-300/content-spec.md` (status: draft): front matter
  `course_code: GICT-300`; 8 CLOs verbatim from the guide; teaching strategies, practical
  work, and 5 recommended readings (title-level per D-2026-0001); derived-and-labelled week
  schedule per D-2026-0012; 6 unit blocks each with Sub-topic checklist (U1-01..U6-07),
  Topic list (reading-minutes + planned figures), Depth budget, Common misconceptions,
  Figure plan, and 10/10/5 assessment blueprint.
- [ ] **T002** Commit the draft content-spec, then run
  `node scripts/prepare-intake-evidence.mjs GICT-300 specs/content/gict-300/intake` to freeze
  the intake manifest.
- [ ] **T003** Spawn the evaluator agent (fresh subagent, never sees drafting context) with
  the manifest path, course code GICT-300, and the pre-assigned D-code block
  D-2026-0030..D-2026-0039. Apply findings (max 2 repair cycles); only after approval set
  content-spec `status: approved`.
- [ ] **T004** Create `specs/content/gict-300/tasks.md` tracker: legend
  (not-started / in-progress / done-with-evidence), one row per unit per stage G1-G7.

## Phase 2: Unit Authoring (per unit, in guide order)

- [ ] **T005** Author Unit 1 (Introduction to Computer Literacy and ICT):
  `docs/semester-1/gict-300/unit-01/` index + topic nine-part cycles + 10/10/5 assessment +
  teacher notes; governance (coverage, sources, figures, concepts); replace the legacy
  placeholder files. Run `npm run check:content` (max 2 repair cycles). Commit.
- [ ] **T006** Author Unit 2 (Computer Hardware and Software Fundamentals): same pattern,
  `unit-02/`. Run `npm run check:content`. Commit.
- [ ] **T007** Author Unit 3 (Operating System Concepts): same pattern, `unit-03/`. Run
  `npm run check:content`. Commit.
- [ ] **T008** Author Unit 4 (Cyber security and Data Protection): same pattern, `unit-04/`.
  Run `npm run check:content`. Commit.
- [ ] **T009** Author Unit 5 (Ethical and Responsible Use of ICT): same pattern, `unit-05/`.
  Run `npm run check:content`. Commit.
- [ ] **T010** Author Unit 6 (Internet Applications and Emerging Technologies): same pattern,
  `unit-06/`. Run `npm run check:content`. Commit.

## Phase 3: Figures (per unit, after that unit's prose)

- [ ] **T011** Generate Unit 1 figures: classify markers, author SVGs (Codex primary /
  Claude fallback, log which), place `<Figure>` elements, dark variants via
  `npm run figures:variants`, Urdu-label `.ur.svg` + `.ur.dark.svg` variants, manifest rows
  to `Status: placed`. Run `npm run check:content`.
- [ ] **T012** Generate Unit 2 figures: same pattern.
- [ ] **T013** Generate Unit 3 figures: same pattern.
- [ ] **T014** Generate Unit 4 figures: same pattern.
- [ ] **T015** Generate Unit 5 figures: same pattern.
- [ ] **T016** Generate Unit 6 figures: same pattern.

## Phase 4: G2 evidence + G3 advisory review (per unit)

- [ ] **T017** Unit 1: `node scripts/prepare-gate-evidence.mjs GICT-300 1`; set tracker G2 row
  from the printed path; commit. Then `node scripts/review-evidence.mjs prepare gict-300 1 G3
  specs/content/gict-300/reviews/unit-01/G3`; spawn fresh g3-reviewer; apply sensible repairs
  (re-run gate evidence if bytes change); G3 row stays not-started with report path in Notes.
- [ ] **T018** Unit 2: same pattern (G2 evidence + G3 advisory review).
- [ ] **T019** Unit 3: same pattern.
- [ ] **T020** Unit 4: same pattern.
- [ ] **T021** Unit 5: same pattern.
- [ ] **T022** Unit 6: same pattern.

## Phase 5: G4 Urdu translation + G5 advisory review (per unit)

- [ ] **T023** Unit 1: translate-unit skill (complete Urdu mirror, terminology-bank bound,
  translation_status: draft, UR key_terms block); re-run `npm run check:content`; G5 via
  fresh g5-reviewer bound to accepted G3 evidence; advisory only.
- [ ] **T024** Unit 2: same pattern (G4 + G5).
- [ ] **T025** Unit 3: same pattern.
- [ ] **T026** Unit 4: same pattern.
- [ ] **T027** Unit 5: same pattern.
- [ ] **T028** Unit 6: same pattern.

## Phase 6: Course-level polish + PR

- [ ] **T029** Rewrite `docs/semester-1/gict-300/course-overview.mdx` (drop coming_soon,
  bilingual: true, guide description + CLOs + strategies + readings); fix `_category_.json`
  labels; append new glossary terms at the END of the glossary.json array only.
- [ ] **T030** Run `npm run check:all` (full tier incl. bilingual Docusaurus build + vitest);
  fix findings (max 2 cycles, then document under the G-code block).
- [ ] **T031** Push the branch and open a PR to main (never merge, never push to main):
  course code, units authored (EN + UR word counts), figures count, D/G codes consumed,
  escalations, gate summary, G3/G5 advisory status.

## Verification

1. All 11 content gates pass after every unit; `check:all` green before the PR
2. All SVG files exist, <= 20 KB, light/dark/Urdu variants present
3. `check:figures`: >= 2/topic, >= 1 schematic/unit, marker/manifest parity
4. `check:concept-graph`: acyclic, resolvable, Label UR from terminology.csv where banked
5. `check:bloom-bands`: MCQ Remember-Apply, RRQ Understand-Analyze, ERQ Analyze+
6. `check:depth-gate`: reading-min within budget
7. Bilingual parity gates pass for every unit
8. Tracker G2 rows carry auto:gates evidence paths; G3/G5 rows advisory (never done)
