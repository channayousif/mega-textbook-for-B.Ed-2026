# Tasks: Author GQUR-300 · Quantitative Reasoning-I

**Feature**: 021-author-gqur-300 | **Branch**: `021-author-gqur-300`
**Input**: [spec.md](./spec.md) · [plan.md](./plan.md)

## Format: `[ID] [P?] [Story] Description`

`[P]` marks tasks that touch different files with no incomplete dependency, so they may run in
parallel.

## Path Conventions

Content under `docs/semester-1/gqur-300/unit-NN/` (degree track, docs plugin at site root).
Urdu mirrors under `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-NN/`.
Governance under `specs/content/gqur-300/`. Figures under `static/img/figures/gqur-300/unit-NN/`.

---

## Phase 1: Foundation (G0/G1)

- [ ] **T001** [US1] Create `specs/content/gqur-300/content-spec.md` with `status: draft`, 5 CLOs verbatim from the guide, teaching strategies, assessment criteria, practical work, 4 recommended readings, derived-and-labelled week schedule (per D-2026-0012), and 6 unit blocks each with Sub-topic checklist, Topic list, Depth budget, Common misconceptions, Figure plan, and 10/10/5 Assessment blueprint.
- [ ] **T002** [US1] Run `node scripts/prepare-intake-evidence.mjs GQUR-300 specs/content/gqur-300/intake` and commit the manifest.
- [ ] **T003** [US1] Spawn the evaluator agent FRESH with the intake manifest, course code GQUR-300, and D-code block D-2026-0040..0049 (never "next free"). Apply findings (max 2 repair cycles, then escalate under G-2026-28..30). Only after approval set content-spec `status: approved` and create the per-unit G1-G7 tracker `specs/content/gqur-300/tasks.md`.

## Phase 2: Unit Authoring (per unit, in order)

- [ ] **T004** [US1] Author Unit 1 (Foundations of Quantitative Reasoning): `docs/semester-1/gqur-300/unit-01/` index, topic nine-part cycles, 10/10/5 assessment, teacher notes. Governance: coverage (v2), sources, figures, concepts (v4). Figures >= 2/topic, >= 1 schematic/unit with `.ur.svg` variants. Run `npm run check:content`, commit, run `node scripts/prepare-gate-evidence.mjs GQUR-300 1`, update tracker G2 row, append glossary terms.
- [ ] **T005** [US1] Author Unit 2 (Numbers and Operations): same file set under `unit-02/`. Same gates, evidence, tracker, glossary steps.
- [ ] **T006** [US1] Author Unit 3 (Algebraic Reasoning): same file set under `unit-03/`. Same gates, evidence, tracker, glossary steps.
- [ ] **T007** [US1] Author Unit 4 (Measurement and Geometry): same file set under `unit-04/`. Same gates, evidence, tracker, glossary steps.
- [ ] **T008** [US1] Author Unit 5 (Data Analysis and Statistics): same file set under `unit-05/`. Same gates, evidence, tracker, glossary steps.
- [ ] **T009** [US1] Author Unit 6 (Quantitative Reasoning in Everyday Life): same file set under `unit-06/`. Same gates, evidence, tracker, glossary steps. Rewrite `course-overview.mdx`, fix `_category_.json` labels, delete legacy placeholder files.

## Phase 3: G3 English Review (advisory, every unit)

- [ ] **T010** [US2] G3 review Unit 1: run `node scripts/review-evidence.mjs prepare gqur-300 1 G3 specs/content/gqur-300/reviews/unit-01/G3`, spawn g3-reviewer agent FRESH with the bundle path. Apply sensible advisory repairs (re-run gate evidence if bytes change). Never mark the G3 row done; record report path in Notes.
- [ ] **T011** [US2] G3 review Unit 2: same flow under `reviews/unit-02/G3`.
- [ ] **T012** [US2] G3 review Unit 3: same flow under `reviews/unit-03/G3`.
- [ ] **T013** [US2] G3 review Unit 4: same flow under `reviews/unit-04/G3`.
- [ ] **T014** [US2] G3 review Unit 5: same flow under `reviews/unit-05/G3`.
- [ ] **T015** [US2] G3 review Unit 6: same flow under `reviews/unit-06/G3`.

## Phase 4: G4 Urdu Translation (every unit)

- [ ] **T016** [US3] G4 translate Unit 1: complete Urdu mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-01/` (same file set, heading vectors, components, figure IDs, assessment items; terminology.csv read-only; academic-plain register; UR key_terms block). Re-run `npm run check:content`.
- [ ] **T017** [US3] G4 translate Unit 2: same mirror flow under `unit-02/`.
- [ ] **T018** [US3] G4 translate Unit 3: same mirror flow under `unit-03/`.
- [ ] **T019** [US3] G4 translate Unit 4: same mirror flow under `unit-04/`.
- [ ] **T020** [US3] G4 translate Unit 5: same mirror flow under `unit-05/`.
- [ ] **T021** [US3] G4 translate Unit 6: same mirror flow under `unit-06/`.

## Phase 5: G5 Urdu Review (advisory, every unit)

- [ ] **T022** [US3] G5 review Unit 1: run `node scripts/review-evidence.mjs prepare gqur-300 1 G5 <outdir>`, spawn g5-reviewer agent FRESH (binds to accepted G3 evidence per freshness rules). Advisory only; translation_status transitions follow the skill contract. Never mark the G5 row done.
- [ ] **T023** [US3] G5 review Unit 2: same flow for unit 2.
- [ ] **T024** [US3] G5 review Unit 3: same flow for unit 3.
- [ ] **T025** [US3] G5 review Unit 4: same flow for unit 4.
- [ ] **T026** [US3] G5 review Unit 5: same flow for unit 5.
- [ ] **T027** [US3] G5 review Unit 6: same flow for unit 6.

## Phase 6: Final Gates and PR

- [ ] **T028** [US2] Run `npm run check:all` (full tier incl. bilingual Docusaurus build + vitest). Fix findings (max 2 cycles, then document remaining under a G-code gap).
- [ ] **T029** [US1] `git push -u origin HEAD` and `gh pr create --base main` with the course summary (units, word counts, figures, D/G codes, gate summary, G3/G5 advisory status). Do NOT merge; do NOT push to main.

## Verification

1. All 11 content gates pass per unit and after every Urdu mirror
2. All SVG files exist, <= 20 KB, with light/dark and en/ur variants
3. `check:figures`: >= 2/topic, >= 1 schematic/unit
4. `check:concept-graph`: acyclic, resolvable
5. `check:bloom-bands`: MCQ Remember-Apply, RRQ Understand-Analyze, ERQ Analyze+
6. `check:depth-gate`: reading-min within budget
7. `check:pipeline-gate`: bilingual parity + translation_status
8. Course renders at textbook.com.pk/semester-1/gqur-300/ in both locales
9. `npm run check:all` green before PR
