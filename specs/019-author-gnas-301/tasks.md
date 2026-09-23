# Tasks: Author GNAS-301 · Environmental Science

**Feature**: 019-author-gnas-301 | **Branch**: `019-author-gnas-301`
**Input**: [spec.md](./spec.md) · [plan.md](./plan.md)

## Format: `[ID] [P?] [Story] Description`

`[P]` marks tasks that touch different files with no incomplete dependency, so they may run in
parallel.

## Path Conventions

Content under `docs/semester-1/gnas-301/unit-NN/` (degree track). Urdu mirrors under
`i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-NN/`. Governance
under `specs/content/gnas-301/`. Figures under `static/img/figures/gnas-301/unit-NN/`.

---

## Phase 1: Foundation (G0/G1)

- [ ] **T001** Create `specs/content/gnas-301/content-spec.md` (status: draft): 5 CLOs
  verbatim, teaching strategies, assessment criteria, all 7 recommended readings (D-2026-0001
  flags where unretrievable), the guide's 16-week calendar, the derived six-unit partition
  labelled per D-2026-0012, and 6 unit blocks each with Sub-topic checklist, Topic list,
  Depth budget, Common misconceptions, Figure plan, and 10/10/5 Assessment blueprint.
- [ ] **T002** Run `node scripts/prepare-intake-evidence.mjs GNAS-301
  specs/content/gnas-301/intake`, then spawn a fresh evaluator agent with the manifest path
  and the D-2026-0020..0029 code block. Apply findings (max 2 repair cycles, then escalate
  under G-2026-22..24). Set `status: approved` only after approval.
- [ ] **T003** Create `specs/content/gnas-301/tasks.md` tracker: one row per unit per stage
  G1-G7, legend (▢ not-started, ▣ in-progress, ✅ done with evidence), model on
  `specs/content/geng-300/tasks.md`.

## Phase 2: Unit authoring (English + figures + gates)

- [ ] **T004** Author Unit 1 (Environmental Science and Ecosystems, 4 topics):
  `docs/semester-1/gnas-301/unit-01/` index, 4 topic nine-part cycles, 10/10/5 assessment,
  teacher notes. Governance: coverage, sources, figures, concepts. Render figures with
  `.ur.svg` variants. Run `npm run check:content`; commit; prepare gate evidence; update
  tracker. Replace the legacy placeholder tree in the same task.
- [ ] **T005** Author Unit 2 (Water and Waste Management, 3 topics): same pattern for
  `unit-02/`.
- [ ] **T006** Author Unit 3 (Air, Noise and Environmental Hazards, 4 topics): same pattern
  for `unit-03/`.
- [ ] **T007** Author Unit 4 (Occupational Safety and Health, 7 topics): same pattern for
  `unit-04/`.
- [ ] **T008** Author Unit 5 (Toxicology Essentials and Environmental Governance, 4 topics):
  same pattern for `unit-05/`.
- [ ] **T009** Author Unit 6 (Toxic Substances, Climate Change and Smog, 6 topics): same
  pattern for `unit-06/`.
- [ ] **T010** Rewrite `docs/semester-1/gnas-301/course-overview.mdx` (drop coming_soon,
  carry the guide's CLOs, teaching strategies, assessment criteria, reading list) and fix
  `_category_.json` labels.

## Phase 3: G3 review (advisory, every unit)

- [ ] **T011** G3 review Unit 1: `review-evidence.mjs prepare gnas-301 1 G3 <outdir>`;
  fresh g3-reviewer agent; apply sensible repairs; advisory only.
- [ ] **T012** G3 review Unit 2: same pattern.
- [ ] **T013** G3 review Unit 3: same pattern.
- [ ] **T014** G3 review Unit 4: same pattern.
- [ ] **T015** G3 review Unit 5: same pattern.
- [ ] **T016** G3 review Unit 6: same pattern.

## Phase 4: G4 translation + G5 review (every unit)

- [ ] **T017** G4 translate Unit 1 + G5 review (fresh g5-reviewer, binds to accepted G3
  evidence; advisory); re-run `npm run check:content`.
- [ ] **T018** G4 translate Unit 2 + G5 review; re-run `npm run check:content`.
- [ ] **T019** G4 translate Unit 3 + G5 review; re-run `npm run check:content`.
- [ ] **T020** G4 translate Unit 4 + G5 review; re-run `npm run check:content`.
- [ ] **T021** G4 translate Unit 5 + G5 review; re-run `npm run check:content`.
- [ ] **T022** G4 translate Unit 6 + G5 review; re-run `npm run check:content`.

## Phase 5: Final gates + PR

- [ ] **T023** Run `npm run check:all` (full tier incl. bilingual Docusaurus build + vitest);
  fix findings (max 2 cycles, then document under the G-code block).
- [ ] **T024** Push branch and open PR to main with the course summary (units, word counts,
  figures, D/G codes, gate summary, G3/G5 advisory status). Do not merge, do not push to
  main.

## Verification

1. All 11 content gates pass (`npm run check:content`)
2. `npm run check:all` green
3. All SVG files exist, <= 20 KB, with mirrored `.ur.svg` + `.ur.dark.svg` variants
4. `check:figures`: >= 2 carriers/topic, >= 1 schematic/unit
5. `check:concept-graph`: acyclic, resolvable
6. `check:bloom-bands`: MCQ Remember-Apply, RRQ Understand-Analyze, ERQ Analyze+
7. `check:depth-gate`: reading-min within budget per unit
8. Urdu mirrors: file set, heading vectors, figure IDs, assessment items match English
