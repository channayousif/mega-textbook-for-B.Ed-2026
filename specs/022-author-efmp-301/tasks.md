# Tasks: Complete EFMP-301 · Educational Psychology

**Feature**: 022-author-efmp-301 | **Branch**: `022-author-efmp-301`
**Input**: [spec.md](./spec.md) · [plan.md](./plan.md)

## Format: `[ID] [P?] [Story] Description`

`[P]` marks tasks that touch different files with no incomplete dependency, so they may run in
parallel.

## Path Conventions

Content under `docs/semester-1/efmp-301/unit-NN/` (degree track). Urdu mirrors under
`i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-NN/`. Governance
under `specs/content/efmp-301/`. Figures under `static/img/figures/efmp-301/unit-NN/`.
Unit 1 trees are READ-ONLY (golden unit).

---

## Phase 1: Foundation (G0/G1)

- [ ] **T001** Extend `specs/content/efmp-301/content-spec.md` (status: draft): keep Unit
  1's approved G1 blocks byte-identical; add course-wide items from the guide (6 CLOs
  verbatim, teaching strategies, practical work, 60/40 default, the 2 open-access
  recommended books verified by retrieval); record the guide's 16-week/12-chapter calendar
  with the units 2+ partition labelled derived per D-2026-0012; add 5 unit blocks
  (Units 2-6) each with Sub-topic checklist, Topic list, Depth budget, Common
  misconceptions, Figure plan, and 10/10/5 Assessment blueprint.
- [ ] **T002** Run `node scripts/prepare-intake-evidence.mjs EFMP-301` (per the script's
  actual usage), then spawn a fresh evaluator agent with the manifest path and the
  D-2026-0043..0052 code block (never "next free"). Apply findings (max 2 repair cycles,
  then escalate under G-2026-52..61). If the derived partition or another owner-reserved
  item is escalated: commit everything and end the turn BLOCKED for owner rulings. Set
  `status: approved` only after approval.
- [ ] **T003** Extend `specs/content/efmp-301/tasks.md` tracker: append rows for Units 2-6
  stages G1-G7, keeping Unit 1's existing rows untouched.

## Phase 2: Unit authoring (English + figures + gates)

- [ ] **T004** Author Unit 2 (Human Growth and Development): `docs/semester-1/efmp-301/
  unit-02/` index, topic nine-part cycles, 10/10/5 assessment, teacher notes. Governance:
  coverage, sources, figures, concepts. Render figures with `.ur.svg` variants. Run
  `npm run check:content`; commit; prepare gate evidence; update tracker.
- [ ] **T005** Author Unit 3 (Learning Theories): same pattern for `unit-03/`.
- [ ] **T006** Author Unit 4 (Cognitive Processes, Intelligence and Creativity): same
  pattern for `unit-04/`.
- [ ] **T007** Author Unit 5 (Motivation, Individual Differences and Classroom
  Management): same pattern for `unit-05/`.
- [ ] **T008** Author Unit 6 (Assessment, the Teaching-Learning Process and Well-being):
  same pattern for `unit-06/`.
- [ ] **T009** Update `docs/semester-1/efmp-301/course-overview.mdx` to the full-course
  record (guide CLOs, teaching strategies, practical work, reading list) and check
  `_category_.json` labels.

## Phase 3: G3 review (advisory, every new unit)

- [ ] **T010** G3 review Unit 2: `review-evidence.mjs prepare efmp-301 2 G3 <outdir>`;
  fresh g3-reviewer agent; apply sensible repairs; advisory only; re-run G2 evidence if
  bytes change.
- [ ] **T011** G3 review Unit 3: same pattern.
- [ ] **T012** G3 review Unit 4: same pattern.
- [ ] **T013** G3 review Unit 5: same pattern.
- [ ] **T014** G3 review Unit 6: same pattern.

## Phase 4: G4 translation + G5 review (every new unit)

- [ ] **T015** G4 translate Unit 2 + G5 review (fresh g5-reviewer, binds to accepted G3
  evidence; advisory); re-run `npm run check:content`.
- [ ] **T016** G4 translate Unit 3 + G5 review; re-run `npm run check:content`.
- [ ] **T017** G4 translate Unit 4 + G5 review; re-run `npm run check:content`.
- [ ] **T018** G4 translate Unit 5 + G5 review; re-run `npm run check:content`.
- [ ] **T019** G4 translate Unit 6 + G5 review; re-run `npm run check:content`.
- [ ] **T020** Attempt to add advisory G5 evidence for Unit 1's open G5 row WITHOUT
  touching Unit 1 bytes; if the machinery requires byte changes or fails to bind,
  escalate under the G-block.

## Phase 5: Final gates + PR

- [ ] **T021** Run `npm run check:all` (full tier incl. bilingual Docusaurus build +
  vitest); fix findings (max 2 cycles, then document under the G-code block).
- [ ] **T022** Push branch and open PR to main with the course summary (units, word
  counts, figures, D/G codes, gate summary, G3/G5 advisory status, golden-unit untouched
  statement). Do not merge, do not push to main.

## Verification

1. All content gates pass (`npm run check:content`)
2. `npm run check:all` green
3. All new SVG files exist, <= 20 KB, with mirrored `.ur.svg` + `.ur.dark.svg` variants
4. `check:figures`: >= 2 carriers/topic, >= 1 schematic/unit
5. `check:concept-graph`: acyclic, resolvable
6. `check:bloom-bands`: MCQ Remember-Apply, RRQ Understand-Analyze, ERQ Analyze+
7. `check:depth-gate`: reading-min within budget per unit
8. Urdu mirrors: file set, heading vectors, figure IDs, assessment items match English
9. Zero diff under Unit 1's content, Urdu, and governance/review paths
