# Tasks: Author GENG-300 · Functional English

**Feature**: 018-author-geng300 | **Branch**: `018-author-geng300`
**Input**: [spec.md](./spec.md) · [plan.md](./plan.md)

## Format: `[ID] [P?] [Story] Description`

`[P]` marks tasks that touch different files with no incomplete dependency, so they may run in
parallel.

## Path Conventions

Content under `docs/semester-1/geng-300/unit-NN/` (licence track, route `/licence`). Governance under
`specs/content/geng-300/`. Figures under `static/img/figures/geng-300/`.

---

## Phase 1: Foundation (G0/G1)

- [ ] **T001** Create `specs/content/geng-300/content-spec.md` with `status: approved`, 4 CLOs verbatim, teaching strategies, assessment criteria, practical work, 10 recommended readings, derived week schedule (per D-2026-0012), and 4 unit blocks each with Sub-topic checklist, Topic list, Depth budget, Common misconceptions, Figure plan, and Assessment blueprint.
- [ ] **T002** Create `specs/content/geng-300/intake/manifest.json` with bound inputs (guide docx, constitution, catalog, contracts, content-spec, style-guide, terminology).
- [ ] **T003** Create `specs/content/geng-300/intake/evaluation.md` evaluating against 8 G0/G1 criteria (identity, partition, coverage, outcomes, readings, blueprint, structure, decision residue). Record decision as `## D-2026-00XX` in `specs/decisions/log.md`.

## Phase 2: Unit Authoring

- [ ] **T004** Author Unit 1 (Foundations): `docs/semester-1/geng-300/unit-01/` index, 8 topic nine-part cycles, 10/10/5 assessment, teacher notes. Governance: coverage, sources, figures, concepts. Run `npm run check:content`.
- [ ] **T005** Author Unit 2 (Comprehension & Analysis): `docs/semester-1/geng-300/unit-02/` index, 7 topic nine-part cycles, 10/10/5 assessment, teacher notes. Governance: coverage, sources, figures, concepts. Run `npm run check:content`.
- [ ] **T006** Author Unit 3 (Effective Communication): `docs/semester-1/geng-300/unit-03/` index, 10 topic nine-part cycles, 10/10/5 assessment, teacher notes. Governance: coverage, sources, figures, concepts. Run `npm run check:content`.
- [ ] **T007** Author Unit 4 (Professional Writing & Intercultural Communication): `docs/semester-1/geng-300/unit-04/` index, 6 topic nine-part cycles, 10/10/5 assessment, teacher notes. Governance: coverage, sources, figures, concepts. Run `npm run check:content`.

## Phase 3: Figures

- [ ] **T008** Generate SVG figures for all 4 units: classify, author SVG (Codex primary / Claude fallback), place `<Figure>` elements, generate dark variants, update manifest rows to `Status: placed`. Run `npm run check:content`.

## Phase 4: Gates and Deploy

- [ ] **T009** Run `npm run check:content` (all 11 gates) and `npm run check:all` (full suite). Fix any findings.
- [ ] **T010** Commit all files, push to origin/main, run local-ci for deploy attestation, run deploy-prod.sh.

## Verification

1. All 11 content gates pass
2. All SVG files exist and are ≤ 20 KB
3. `check:figures`: ≥ 2/topic, ≥ 1 schematic/unit
4. `check:concept-graph`: acyclic, resolvable
5. `check:bloom-bands`: MCQ Remember-Apply, RRQ Understand-Analyze, ERQ Analyze+
6. `check:depth-gate`: reading-min within budget
7. Course renders at textbook.com.pk/docs/semester-1/geng-300/
