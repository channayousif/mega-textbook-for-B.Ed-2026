---
description: "Task list for 012-visual-density-standard"
---

# Tasks: Visual-density standard

**Input**: Design documents from `/specs/012-visual-density-standard/`
**Prerequisites**: plan.md (required), spec.md (required), ADR-0017

**Tests**: REQUESTED - FR-006 requires fixture-based gate tests. Test tasks are included and
written before the gate logic they cover.

**Organization**: grouped by the four user stories in spec.md (US1 P1 = the gate; US2 P2 =
authoring; US3 P2 = the proving unit; US4 P3 = the governance record).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: different file, no dependency on an incomplete task
- **[Story]**: US1 / US2 / US3 / US4

---

## Phase 1: Setup

- [x] T001 Confirm the working branch is `012-visual-density-standard` and `npm test` is green at
  baseline (136 tests) before any change, so regressions are attributable.

---

## Phase 2: Foundational (blocking prerequisites)

**⚠️ CRITICAL**: the archetype vocabulary must exist in the manifest library before the gate (US1)
or the retrofit (US3) can use it.

- [x] T002 In `scripts/lib/figure-manifest.mjs`: replace `KIND_ENUM` (`['diagram','illustration']`)
  with the six archetypes `['table','concept-map','flowchart','timeline','diagram','illustration']`;
  add `export const SCHEMATIC_ARCHETYPES = new Set(['concept-map','flowchart','timeline'])`. Keep
  the v1 (5-col) and v2 (7-col) header acceptance and every existing parse/validate path unchanged.
- [x] T003 [P] In `specs/009-figure-rendering/contracts/figure-manifest-v2.md`: add a short "v3
  note" - the `Kind` column vocabulary widened from 2 to 6 values (the column name and the 7-col
  header are unchanged); `diagram`/`illustration` remain valid.

**Checkpoint**: the manifest library knows the six archetypes; existing manifests still parse.

---

## Phase 3: User Story 1 - The figures gate enforces the floor (Priority: P1) 🎯 MVP

**Goal**: `check:figures` fails a unit with a topic under two carriers, or a unit with no
concept-map/flowchart/timeline, or any figure with a blank/unknown archetype; passes when all hold.

**Independent Test**: run the gate against the five fixtures in T004-T008; each behaves as its
name says; the existing `figures-gate.test.mjs` cases stay green.

### Tests for User Story 1 (write first, expect FAIL against the current gate)

- [x] T004 [P] [US1] In `tests/unit/figures-gate.test.mjs`: fixture + case "passes a unit with
  >= 2 carriers in every topic and >= 1 timeline" (extends the existing fixture harness /
  throwaway `CONTENT_ROOT` pattern).
- [x] T005 [P] [US1] Same file: case "fails when a `topic-NN.mdx` has only one carrier" - asserts
  the message names the file and the minimum of two.
- [x] T006 [P] [US1] Same file: case "fails when every topic has >= 2 carriers but no figure is a
  concept-map / flowchart / timeline" - asserts the message names the unit and the schematic rule.
- [x] T007 [P] [US1] Same file: case "fails when a manifest row's archetype is blank or an unknown
  word" - asserts the message names the figure ID and lists the allowed values.
- [x] T008 [P] [US1] Same file: case "skips a legacy five-file unit (no `topic-*.mdx`)" - the
  visual-density checks do not run; exit 0.

### Implementation for User Story 1

- [x] T009 [US1] In `scripts/check-figures.mjs`: change the per-topic carrier check from `>= 1` to
  `>= 2` (the count near the current `:131-133`); message: `<file>: <n> figure(s), need at least 2`.
- [x] T010 [US1] In `scripts/check-figures.mjs`: add a per-unit pass - collect the unit's figure
  archetypes (from manifest rows, cross-checked against carriers) and fail if none is in
  `SCHEMATIC_ARCHETYPES`; message names the unit.
- [x] T011 [US1] In `scripts/check-figures.mjs`: for every carrier/row, require a resolved archetype
  in `KIND_ENUM`; blank or unknown fails naming the figure ID. Keep this scoped to new-shape units
  (the existing `topic-*.mdx` guard); legacy units and coming-soon stubs still short-circuit.
- [x] T012 [US1] Run `npm test` - T004-T008 now pass and all pre-existing `figures-gate` and other
  unit tests stay green (the count rises from 136 by the 5 new cases).

**Checkpoint**: the gate enforces FR-001/FR-002/FR-003; legacy/stub regression floor intact.

---

## Phase 4: User Story 2 - Authors plan and place to the standard (Priority: P2)

**Goal**: the style guide and the authoring skills tell authors to plan 2-3 archetype-tagged
figures per topic and >= 1 schematic per unit; the content-spec Figure plan shape allows it.

**Independent Test**: read the style guide and both skill copies - the rule text matches and the
`version` is bumped; draft-plan a unit per the skill and confirm the figures gate passes first run.

- [x] T013 [US2] In `specs/content/style-guide.md`: rewrite the quantity rule in
  `## Figure markers and manifests` (the "at least one figure per `topic-*.mdx`" line) and
  `## Diagram conventions` to state FR-001 (>= 2/topic), FR-002 (>= 1 concept-map/flowchart/
  timeline per unit), and FR-003 (the six-value archetype recorded on the manifest). Update the
  depth-gate-vs-human table row that summarises the automated figure checks.
- [x] T014 [US2] In `specs/content/style-guide.md`: bump front-matter `version` `"3.2"` -> `"3.3"`.
- [x] T015 [US2] Re-attest `specs/content/terminology.csv` against `version 3.3` (Spec 006 FR-007):
  confirm `git diff` shows zero term rows changed; if a retrofit figure label needs a term not in
  the bank, add it here and note it, then re-run `check:pipeline-gate`.
- [x] T016 [P] [US2] In `.claude/skills/author-unit/references/structure-standard.md` (the
  style-guide twin): mirror the T013 rule text verbatim in this branch.
- [x] T017 [P] [US2] In `.claude/skills/author-unit/SKILL.md`: Step 3.1 - "plan 2-3
  archetype-tagged figures per topic; ensure the unit has >= 1 concept-map/flowchart/timeline";
  Step 4 - each emitted manifest row carries an archetype in the `Kind` column.
- [x] T018 [P] [US2] In `.claude/skills/author-unit/references/figure-prompts.md`: replace the
  ">= 1 marker per topic; more is fine" line with ">= 2 markers per topic, each tagged with an
  archetype; >= 1 concept-map/flowchart/timeline per unit"; add the archetype list + a one-line
  description of each.
- [x] T019 [P] [US2] In `.claude/skills/generate-figures/SKILL.md` (Step 1.3 classify) and
  `references/svg-authoring.md`: name the six archetypes and map each to an existing render route
  (table/concept-map/flowchart/timeline/diagram -> hand-authored SVG; illustration -> raster).
  The skill records the archetype on the manifest row it advances to `generated`/`placed`.
- [x] T020 [US2] Update the per-course content-spec Figure-plan shape: in
  `specs/content/efmp-302/content-spec.md` `**Figure plan**` and the `### Topic list` `Figures`
  column, allow >= 2 figure IDs per topic each with an archetype; document the shape in the
  Spec 008 content-spec contract note if one exists.

**Checkpoint**: the standard is written where authors work; `version` bumped; terminology re-frozen.

---

## Phase 5: User Story 3 - EFMP-302 Unit 1 retrofit (Priority: P2, the proving unit)

**Goal**: EFMP-302 Unit 1 meets FR-001 + FR-002 in both locales with every content gate green.

**Independent Test**: every `topic-0N.mdx` (EN) has >= 2 `<Figure>` elements; the unit has >= 1
timeline; `check:figures`, `check:depth-gate`, `validate:content`, `check:no-em-dash`,
`check:pipeline-gate`, `npm test`, `npm run build` (en + ur) all pass.

- [x] T021 [US3] Decide the added figure per topic (research.md R4): topic 1.1 -> a `concept-map`
  linking "profession" to its four features and to the near-synonyms it is not (occupation,
  vocation, semi-profession); topic 1.2 -> a `flowchart` of how a question travels in an inquiry
  lesson vs an industrial one; topic 1.3 -> a `timeline` of the professionalization arc of teaching
  in Pakistan (the unit-level schematic); topic 1.4 -> reclassify `fig-U1-4` as `concept-map` and
  add a `flowchart` of the reflective cycle (experience -> reflection -> adjustment -> next lesson).
  Record the choices in `specs/012-visual-density-standard/research.md`.
- [x] T022 [US3] Add a `{/* FIGURE[fig-U1-5..8]: ...; alt: ... */}` marker to each
  `docs/semester-1/efmp-302/unit-01/topic-01..04.mdx` per T021 so each topic has 2 carriers.
- [x] T023 [US3] Update `specs/content/efmp-302/figures/unit-01.md`: add a row per new figure with
  its archetype in the `Kind` column, `Status: prompt-only`; set `fig-U1-1` archetype to `table`,
  `fig-U1-2`/`fig-U1-3` to `diagram` (or `concept-map` for U1-3 if reframed), `fig-U1-4` to
  `concept-map`. Update the manifest header note for the v3 `Kind` vocabulary.
- [x] T024 [US3] Run the `generate-figures` skill for EFMP-302 Unit 1: hand-author each new SVG
  under `static/img/figures/efmp-302/unit-01/`, replace each marker with a `<Figure>` element,
  advance the manifest rows to `placed` with `Kind` + `Src`.
- [x] T025 [US3] Urdu mirror: for each new figure add the matching `<Figure>` (pointing at
  `<figId>.ur.svg`) into `i18n/ur/.../efmp-302/unit-01/topic-0N.mdx` and write a translated-label
  `<figId>.ur.svg`. Per plan.md R3 the EN unit is `translation_status: draft`, so these are
  written and wired but not yet gate-enforced; the Workstream D re-translation reviews the labels.
- [x] T026 [US3] Run `npm run check:figures`, `npm run check:depth-gate`, `npm run validate:content`,
  `npm run check:no-em-dash`, `npm run check:pipeline-gate`, `npm test`, `npm run build` - all green.

**Checkpoint**: the proving unit satisfies the new standard; Art. VI.1's proving-unit obligation met.

---

## Phase 6: User Story 4 - The governance record (Priority: P3)

**Goal**: the raised bar is discoverable in the constitution, the style guide, and the backlog.

- [x] T027 [US4] Amend `.specify/memory/constitution.md`: new Article III.10 (Visual density),
  Article VII engineering-gate row extended, governance `2.7.0 -> 2.8.0`, `SYNC IMPACT REPORT
  (v2.8.0)` block. *(Done at the checkpoint - PHR `history/prompts/constitution/0009`.)*
- [x] T028 [US4] Record ADR-0017 (visual-density standard + archetype taxonomy). *(Done -
  `history/adr/0017-visual-density-standard-and-figure-archetype-taxonomy.md`.)*
- [x] T029 [US4] In `specs/backlog.md`: add an entry under a 2026-09-08 / Spec 012 heading -
  "EFMP-301 Unit 1 golden re-proof to style-guide v3.3" is the immediate-next content task under
  Article VI.1; not started; EFMP-301 U1 is still a scaffold stub so it needs full `author-unit`
  authoring, now against the v3.3 figure floor.
- [x] T030 [US4] Cross-check: `grep` the constitution and style guide for the old "at least one
  figure" wording - none remains; the `check:figures` reference in Article VII names Spec 012.

**Checkpoint**: governance, standard, and follow-up are all on record and consistent.

---

## Phase 7: Polish & cross-cutting

- [x] T031 [P] In `src/components/Figure.tsx`: widen the `kind` prop union to the six archetype
  values; keep the default rendering. Add `.figure--table`, `.figure--concept-map`,
  `.figure--flowchart`, `.figure--timeline` to `src/css/custom.css` (minimal treatment - a class
  hook + any needed caption spacing, not a redesign).
- [x] T032 [P] Update `CLAUDE.md` "Active Technologies" / "Recent Changes" lines for Spec 012 and
  correct the stale "style-guide v3.1" / "manifests v2" notes to v3.3 / v3 `Kind` vocabulary.
- [x] T033 Run the full gate set once more from a clean tree
  (`npm test && npm run check:figures && npm run check:depth-gate && npm run validate:content &&
  npm run check:no-em-dash && npm run check:pipeline-gate && npm run build`) and paste results
  into `plan.md` "Implementation notes (post-build reconciliation)".
- [x] T034 PHR for the implementation (stage `green`) under
  `history/prompts/012-visual-density-standard/`.

---

## Dependencies & Execution Order

- **Phase 1 (Setup)** -> **Phase 2 (Foundational)** blocks everything.
- **US1 (P1)** depends on Phase 2 (needs `KIND_ENUM` + `SCHEMATIC_ARCHETYPES`). MVP.
- **US2 (P2)** depends only on Phase 2 conceptually; T013-T020 touch different files from US1 and
  can run in parallel with US1, but T015 (terminology re-attest) should follow T014 (`version` bump).
- **US3 (P2)** depends on **US1** (the gate must be able to pass the retrofitted unit) and **US2
  T014** (the `version` bump) and **Phase 2** (archetype enum). Run US3 after US1 + US2.
- **US4 (P3)**: T027/T028 already done; T029/T030 can run any time after US2 T013-T014.
- **Phase 7**: after US1-US4. T031 (component) is independent and [P].

### Parallel opportunities

- T004-T008 (the five gate fixtures) are all [P].
- T016-T019 (skill files) are all [P] and independent of the US1 gate work.
- T003 [P] (contract note) alongside T002.
- T031, T032 [P] in polish.

---

## Implementation Strategy

**MVP = Phase 1 + Phase 2 + US1**: the gate enforces the floor with fixture coverage. Ship/merge
point if the retrofit needs to trail.

**Then** US2 (authoring surface) -> US3 (retrofit EFMP-302 U1, the Art. VI.1 proving unit) -> US4
tidy-up (T029/T030) -> Phase 7 polish + full gate run + PHR.

**Coordination**: Workstream D (EFMP-302 Unit 1 Urdu re-translation) merges after this branch;
US3 T025's `.ur.svg` labels get their register/terminology review there.

## Notes

- Every gate-script edit stays scoped to new-shape units; the legacy five-file path and
  coming-soon stubs short-circuit before the new checks (regression floor).
- Commit after each phase.
- Do not merge between T014 (`version` bump) and T026 (gates green) - `check:pipeline-gate` reads
  the style-guide `version` and the manifest together.
