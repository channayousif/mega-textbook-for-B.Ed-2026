# Tasks: Licence content tree

**Feature**: 015-licence-content-tree | **Branch**: `015-licence-content-tree`
**Input**: [spec.md](./spec.md) · [plan.md](./plan.md) · [research.md](./research.md) ·
[data-model.md](./data-model.md) · [contracts/content-roots.md](./contracts/content-roots.md) ·
[quickstart.md](./quickstart.md) · [ADR-0020](../../history/adr/0020-content-tracks.md)

## Format: `[ID] [P?] [Story] Description`

`[P]` marks tasks that touch different files with no incomplete dependency, so they may run in
parallel. `[US#]` maps to the increments below.

**Note on organisation.** `spec.md` is requirements-based (FR-001 to FR-014) and declares no
P1/P2/P3 user stories, because this is infrastructure rather than a user-facing feature. The three
increments below are derived from the plan's Phase 2 ordering and preserve its central property:
the refactor is proven on the existing corpus **before** the licence track exists, so FR-009's
byte-identical acceptance test cannot be confounded by the new track.

**Tests are included.** The spec requests them in substance: FR-009's acceptance is a before/after
comparison, and success criterion 2 requires each gate to "fail for the right reason when
deliberately broken", which is a mutation test.

## Path Conventions

Repository root. Gate scripts are plain Node ESM under `scripts/`; shared modules under
`scripts/lib/`; app code under `src/`; content roots are `docs/` (pre-service track) and
`licence/` (licence track).

---

## Phase 1: Setup (Shared Infrastructure)

- [X] T001 Capture the FR-009 baseline: run each of the seven content gates and save stdout+exit code to `specs/015-licence-content-tree/baseline/<gate>.txt` (git-ignored), so the post-refactor comparison is mechanical rather than remembered
- [X] T002 [P] Add `specs/015-licence-content-tree/baseline/` to `.gitignore` with a comment naming T001 as its purpose
- [X] T003 [P] Create the test file `tests/unit/content-roots.test.mjs` with the vitest scaffold and no assertions yet

---

## Phase 2: Foundational (Blocking Prerequisites)

**Blocks every story below.** The module must exist and be correct before any consumer ports to it.

- [X] T004 Create `scripts/lib/content-roots.mjs` exporting `TRACKS` with the `pre-service` track only (`id`, `contentRoot: 'docs'`, `dirPattern: /^semester-(\d+)$/`, `hasOrdinal: true`, `urBase`, `routeBasePath`, `pluginId`) per data-model.md
- [X] T005 Implement `walkUnits(root, options?)` in `scripts/lib/content-roots.mjs` returning `UnitRecord[]` sorted by track order, `trackDir`, `courseFolder`, `unitNo`; returns `[]` for an absent content root and throws only on a malformed unit directory name
- [X] T006 Implement `resolveUnit(root, courseCode, unitNo)` in `scripts/lib/content-roots.mjs`, throwing on zero or more than one match (FR-011 global code uniqueness means no track argument)
- [X] T007 Implement `urPathFor(record, ...segments)` in `scripts/lib/content-roots.mjs`, joining under the record's `track.urBase` so no consumer ever joins `UR_BASE` itself
- [X] T008 Implement `CONTENT_ROOTS` in `scripts/lib/content-roots.mjs` as the flat, frozen list of track content directories derived from `TRACKS` (FR-014)
- [X] T009 [P] Write unit tests in `tests/unit/content-roots.test.mjs` covering: absent content root returns `[]`, malformed unit dir throws, `resolveUnit` throws on zero and on duplicate matches, `ordinal` is a number for `pre-service`, and `urPathFor` derives from `track.urBase`

---

## Phase 3: User Story 1 - One definition of where content lives (Priority: P1) 🎯 MVP

**Goal**: Eight consumers stop re-deriving content paths. Zero behaviour change on the existing
corpus.

**Independent test**: `npm run check:all` produces findings byte-identical to the T001 baseline,
and `grep -rn "semester-(\\\\d+)" scripts/` returns exactly one hit, in `content-roots.mjs`.

- [X] T010 [US1] Port `scripts/validate-content.mjs` (FR-001, FR-002) to consume `walkUnits` and `urPathFor`, deleting its own semester regex and `UR_BASE` join
- [X] T011 [P] [US1] Port `scripts/check-unit-depth.mjs` to consume `walkUnits`, deleting its `^semester-\d+$` filter
- [X] T012 [P] [US1] Port `scripts/check-figures.mjs` to consume `walkUnits` and `urPathFor`, deleting its semester regex and both `UR_BASE` joins
- [X] T013 [P] [US1] Port `scripts/check-pipeline-gate.mjs` to consume `walkUnits` and `urPathFor`, deleting its semester regex and `UR_BASE` join
- [X] T014 [P] [US1] Port `scripts/build-content-index.mjs` to consume `walkUnits`, deriving `permalink` from the record's track `routeBasePath` rather than a literal semester directory
- [X] T015 [US1] Port `scripts/lib/review-evidence.mjs`'s `inputManifest` to call `resolveUnit` instead of its own `readdirSync(docs).filter(/^semester-\d+$/)` (FR-003)
- [X] T016 [P] [US1] Port `scripts/check-no-em-dash.mjs` to build `DEFAULT_SCAN_DIRS` from `CONTENT_ROOTS` plus its own non-track roots (`guides`, `i18n`, `specs/content`) (FR-014)
- [X] T017a [P] [US1] Port `scripts/report-content-status.mjs` to consume `walkCourses` - a ninth consumer found during implementation, listed in neither plan.md nor tasks.md, which would have under-reported licence content in the status report
- [X] T017 [P] [US1] Port `scripts/check-no-answer-keys.mjs` to build `TARGETS` from `CONTENT_ROOTS` plus its own non-track roots (`i18n`, `build`, `specs/content`) (FR-014)
- [X] T018 [US1] Run `npm run test:review` and confirm 21/21 still pass after the `review-evidence.mjs` port
- [X] T019 [US1] Verify FR-009 and success criterion 1: diff every gate's output against `specs/015-licence-content-tree/baseline/` and confirm byte-identical findings; record the result in `specs/015-licence-content-tree/validation.md`
- [X] T020 [US1] Verify success criterion 5: confirm the semester regex, the `UR_BASE` join and every hardcoded content-root list each appear exactly once across `scripts/`, in `content-roots.mjs`

**Checkpoint**: the refactor is complete and provably inert. Safe to stop here and ship.

---

## Phase 4: User Story 2 - The licence track exists, renders and is gated (Priority: P2)

**Goal**: `licence/` is a real content root that every gate sees and Docusaurus renders.

**Independent test**: the scaffolded `licence/zzz-998/unit-01/` is seen by all six content gates
and fails each for the right reason when deliberately broken; `/licence/zzz-998/` renders in both
locales and appears in the offline search index.

- [ ] T021 [US2] Add the `licence` track to `TRACKS` in `scripts/lib/content-roots.mjs` (`contentRoot: 'licence'`, `hasOrdinal: false`, `pluginId: 'licence'`, `urBase: i18n/ur/docusaurus-plugin-content-docs-licence/current`, `routeBasePath: '/licence'`) per FR-004 and FR-006
- [ ] T022 [US2] Prove FR-013: add a third `cpd` track entry to `TRACKS` in `scripts/lib/content-roots.mjs` pointing at a content root that does not exist, confirm all six content gates still pass and that no consumer file needed editing, then remove the entry
- [ ] T023 [P] [US2] Extend `tests/unit/content-roots.test.mjs` to assert `ordinal` is `null` for the licence track and that `urPathFor` resolves to the `-licence` i18n directory, never the default one
- [ ] T024 [US2] Add the third `@docusaurus/plugin-content-docs` instance to `docusaurus.config.ts` with `id: 'licence'`, `path: 'licence'`, `routeBasePath: 'licence'`, `sidebarPath: './sidebars-licence.ts'` (FR-005)
- [ ] T025 [US2] Add `/licence` to `docsRouteBasePath` in `docusaurus.config.ts`'s search plugin options so the track is indexed by offline search
- [ ] T026 [P] [US2] Create `sidebars-licence.ts` with an autogenerated sidebar rooted at the licence content directory
- [ ] T027 [P] [US2] Add a "Licence track" navbar entry in `docusaurus.config.ts` pointing at `/licence/`, then verify FR-008 and R3: the semester sidebar is unchanged, the licence course appears in no semester grouping, and nothing required it to declare a semester
- [ ] T028 [US2] Scaffold a throwaway `licence/zzz-998/unit-01/` unit plus `_category_.json` and `course-overview.mdx`, and its Urdu mirror under `i18n/ur/docusaurus-plugin-content-docs-licence/current/zzz-998/unit-01/`, for the gate-visibility proof
- [ ] T029 [US2] Verify success criterion 2 positively: run all six content gates and confirm each one sees the scaffolded licence unit
- [ ] T030 [US2] Verify success criterion 2 negatively: break the scaffold six ways in turn (missing front-matter `description`, sub-topic below the depth floor, a topic file with fewer than two figure carriers, a missing tracker row, an em dash, an `answer_key:` front-matter key) and confirm the matching gate fails for the right reason each time
- [ ] T031 [US2] Run `npm run build` and confirm `/licence/zzz-998/` renders in `en` and falls back to English with the untranslated banner in `ur` per Spec 001 FR-003
- [ ] T032 [US2] Verify SC4's search requirement: after the build, confirm a `licence/zzz-998/` page is present in the generated offline search index, proving T024's `docsRouteBasePath` entry took effect
- [ ] T033 [US2] Confirm `npm run review:evidence -- prepare ZZZ-998 1 G3 /tmp/licence-check` produces a manifest, proving FR-003 across tracks (success criterion 3)

**Checkpoint**: licence content is fully governed. Nothing is catalogued or user-visible yet.

---

## Phase 5: User Story 3 - Licence courses are first-class in catalogue and app (Priority: P3)

**Goal**: a licence course appears wherever a degree course does, without special-casing.

**Independent test**: `EED-313` appears in the teacher course picker marked `hasContent: false`,
and adding a second licence course requires no platform edit.

- [ ] T034 [US3] Add the `tracks` key to `catalog/courses.json` with a `licence` entry, and add `EED-313` to it (`title_ur: کلاس روم مینجمنٹ`, `category: 'Licence track'`, `bilingual: true`) per FR-010 and data-model.md
- [ ] T035 [P] [US3] Add `CatalogTrack` to `src/lib/catalog.ts`, widen `Catalog` with the optional `tracks` key, and implement `allCourses(catalog)` returning every course across both keys (FR-007)
- [ ] T036 [US3] Change `CourseOptionGroup` in `src/lib/courseOptions.ts` to `{ trackId, label, ordinal: number | null, courses }`, rename each course's `semester` field to `ordinal`, and build groups from `allCourses()` rather than `catalog.semesters` (FR-012)
- [ ] T037 [P] [US3] Migrate `src/pages/app/classes/index.tsx` to the track-keyed group shape
- [ ] T038 [P] [US3] Migrate `src/pages/app/teacher/quiz-authoring.tsx` to the track-keyed group shape
- [ ] T039 [US3] Add the FR-011 duplicate-code check to `scripts/check-pipeline-gate.mjs`: fail when one `course_code` appears in more than one track
- [ ] T040 [P] [US3] Add a unit test in `tests/unit/content-roots.test.mjs` asserting a duplicate course code across tracks is rejected
- [ ] T041 [US3] Extend `scripts/check-add-course.mjs` to add a throwaway licence course alongside its throwaway semester course, and add `sidebars-licence.ts` to its `guarded` path list (research R4, Article V.4)
- [ ] T042 [US3] Delete the `licence/zzz-998/` scaffold and its Urdu mirror created in T028

**Checkpoint**: the feature is complete. `EED-313` is catalogued with no units, matching the seven catalogued-but-unauthored degree courses.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T043 [P] Update `README.md` with the licence track: what it is, why it exists outside the scheme, and where its content lives
- [ ] T044 [P] Record the run in `specs/015-licence-content-tree/validation.md`: FR-009 diff result, the six-gate positive and negative proofs, and the rendered-route check
- [ ] T045 [P] Flip ADR-0020 from Proposed to Accepted in `history/adr/0020-content-tracks.md` once the owner approves PR #46
- [ ] T046 Run `npm run check:all` and confirm 13/13 gates green, then open the implementation PR

---

## Dependencies & Execution Order

```text
Phase 1 Setup (T001-T003)
        │
Phase 2 Foundational (T004-T009)  ← blocks everything
        │
Phase 3 US1 (T010-T020)           ← MVP; provably inert refactor
        │
Phase 4 US2 (T021-T033)           ← needs the walker to exist
        │
Phase 5 US3 (T034-T042)           ← needs the track to be gated
        │
Phase 6 Polish (T043-T046)
```

**Story independence**: US1 ships alone and is worth shipping alone - it removes six duplicated
derivations whether or not the licence track ever lands. US2 depends on US1's walker. US3 depends
on US2's track existing. This is a stack, not three parallel tracks, because each increment's
acceptance test assumes the previous one.

**Critical ordering constraint**: T021 must not precede T019. Adding the licence track before the
FR-009 baseline diff would make a degree-corpus regression indistinguishable from new-track
behaviour, which is the whole reason the plan ordered it this way.

## Parallel Execution Examples

**Phase 2**: T009 runs alongside T004-T008 once the module's exports are stubbed.

**Phase 3 (largest opportunity)**: T011, T012, T013, T014, T016 and T017 all touch different gate
scripts with no interdependency - six ports in parallel. T010 and T015 are sequential only because
`validate-content.mjs` and `review-evidence.mjs` are the two most intricate consumers and deserve
undivided attention.

**Phase 5**: T037 and T038 are independent page migrations; T040 is independent of both.

## Implementation Strategy

**MVP = US1 alone.** It is a pure simplification with a mechanical acceptance test and no new
surface. If the licence track were cancelled tomorrow, US1 would still be the right change.

**Increment 2 = US2.** Licence content becomes possible and governed, but invisible to users.

**Increment 3 = US3.** The track becomes user-visible and catalogued.

**Sequencing against v4.0**: this feature should land before the v4.0 concept layer. Both modify
the same gate scripts, and interleaving them means resolving path-walker changes and concept-layer
changes in one diff.
