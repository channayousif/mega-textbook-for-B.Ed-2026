---
description: "Dependency-ordered task list for the Bilingual Content Platform"
---

# Tasks: Bilingual Content Platform

**Input**: Design documents from `/specs/001-content-platform/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Included. The Constitution's Engineering review gate (Art. VII) and SC-007's "rejected 100% of the time" guarantee require automated verification, so test tasks are part of each story (Vitest for the validator, Playwright for render/RTL/print).

**Organization**: Tasks are grouped by user story so each can be implemented and tested independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story the task belongs to (US1–US4)
- Exact file paths are included in each description.

## Path Conventions

Single static-content project rooted at the repo (Docusaurus convention, per plan.md). No frontend/backend split; the only executable code is two Node scripts under `scripts/` and typed MDX components under `src/components/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and toolchain.

- [X] T001 Scaffold Docusaurus v3 (classic preset, TypeScript) at repo root via `npx create-docusaurus@latest . classic --typescript`; commit the baseline (`docusaurus.config.ts`, `sidebars.ts`, `src/`, `docs/`, `static/`)
- [X] T002 [P] Install runtime dependencies `@easyops-cn/docusaurus-search-local`, `gray-matter`, `ajv`, `ajv-formats` (updates `package.json`)
- [X] T003 [P] Install dev/test dependencies `playwright`, `@playwright/test`, `vitest` and run `npx playwright install chromium` (updates `package.json`)
- [X] T004 [P] Add npm scripts (`validate:content`, `scaffold`, `start`, `build`, `test`, `test:e2e`) to `package.json` and update `.gitignore` (`build/`, `.docusaurus/`, `node_modules/`)
- [ ] T005 [P] Add self-hosted Noto Nastaliq Urdu (WOFF2, Urdu-range subset) + Noto Naskh Arabic fallback to `static/fonts/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure every user story depends on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T006 Configure i18n in `docusaurus.config.ts`: `locales: ['en','ur']`, default `en`, `ur` → `direction:'rtl'` + `htmlLang:'ur'`; add `localeDropdown` to the navbar; initialize the `i18n/ur/docusaurus-plugin-content-docs/current/` tree (verify keys via Context7 `/facebook/docusaurus`)
- [X] T007 [P] Base RTL + font foundation in `src/css/custom.css`: `@font-face` for Nastaliq/Naskh from `static/fonts/`, `[dir='rtl']` base rules, Nastaliq line-height
- [X] T008 [P] Place build-time JSON Schema contracts in repo `contracts/` (`unit-frontmatter.schema.json`, `course-overview.schema.json`, `category.schema.json`, `glossary.schema.json`) seeded from `specs/001-content-platform/contracts/`
- [X] T009 Implement the base content validator `scripts/validate-content.mjs`: walk `docs/**` + `i18n/ur/**`, parse front-matter with `gray-matter`, validate against the schemas with `ajv`+`ajv-formats`, enforce the exact five-file unit shape, reject forbidden answer-key fields (FR-012), check front-matter `course_code`/`unit_no` ↔ folder-path agreement, and enforce the cross-field rule **`assessment_weighting.summative + assessment_weighting.formative == 100` when present** (ajv can't express this — implement as a custom check; FR-010, Constitution III.7); exit non-zero with a per-file message naming the file + offending field (depends on T008)
- [X] T010 [P] Register typed MDX component shells and wire them into the theme `MDXComponents` map: `Glossary`, `BloomTag`, `ActivityCard`, `PrintHandout`, `ObjectiveList`, `TranslationStatusBadge` in `src/components/` (empty/typed stubs so MDX compiles)
- [X] T011 Base CI workflow `.github/workflows/ci.yml`: `npm run validate:content` → `docusaurus build` for both locales, on PR and push to `main` (depends on T009)

**Checkpoint**: Foundation ready — user stories can begin.

---

## Phase 3: User Story 1 - Read any unit in English or Urdu (Priority: P1) 🎯 MVP

**Goal**: A reader opens the golden unit, toggles EN↔UR (RTL Nastaliq, content parity), sees draft/untranslated states honestly marked, and gets inline bilingual glossary definitions.

**Independent Test**: Publish the golden unit in both languages; open on a 360px phone; switch EN↔UR → RTL layout, correct font, same sections; hover/expand a `<Glossary>` term → bilingual definition; point the `/ur/` route at a unit with no UR file → English body under an "untranslated" banner (no dead end).

### Tests for User Story 1

- [ ] T012 [P] [US1] Playwright e2e: EN↔UR toggle renders RTL with Nastaliq and the same sections, **completes in under 2 seconds (SC-001)**, and a content page fits a 360px viewport with no horizontal scroll, in `tests/e2e/read-bilingual.spec.ts`
- [X] T013 [P] [US1] Vitest: EN↔UR parity-gate fixture — a `translation_status: reviewed` unit with a removed/added UR heading makes `validate-content` exit non-zero naming the divergence, in `tests/unit/parity.test.mjs`
- [X] T014 [P] [US1] Vitest: glossary-reference fixture — a `<Glossary term="X">` with no matching `glossary.json` key, or an entry missing `definition_en`/`definition_ur`, makes `validate-content` exit non-zero, in `tests/unit/glossary.test.mjs`

### Implementation for User Story 1

- [X] T015 [US1] Implement `TranslationStatusBadge` variants `draft` and `untranslated` in `src/components/TranslationStatusBadge.tsx`, and wire the missing-UR default-locale fallback + "Urdu translation not yet available" banner behavior (FR-003, clarification Q1)
- [X] T016 [US1] Add the EN↔UR structural parity check to `scripts/validate-content.mjs`: compare the ordered heading-level vector of EN vs UR per file for `translation_status: reviewed` units (exempt `draft` and no-UR); report the file + first divergent heading (depends on T009)
- [X] T017 [US1] Implement the `Glossary` inline bilingual component (tooltip/expandable) in `src/components/Glossary.tsx` reading from `glossary.json`, and create a seed `glossary.json` conforming to `contracts/glossary.schema.json`
- [X] T018 [US1] Add the glossary-reference check to `scripts/validate-content.mjs`: every `<Glossary term="…">` used in content resolves to a `glossary.json` entry carrying both `definition_en` and `definition_ur` (depends on T009, T017)
- [X] T019 [US1] RTL/Nastaliq reading polish in `src/css/custom.css`: line-height for glyph stacking, correct alignment of mixed LTR terms/numerals inside RTL text, narrow-viewport no-scroll (depends on T007)
- [X] T020 [US1] Author the golden unit EFMP-301 Unit 1 (English) — the five files under `docs/semester-1/efmp-301/unit-01/` (EFMP-301 Educational Psychology is a Semester I course per `specs/gaps.md`) with valid front-matter and at least one `<Glossary>` usage
- [X] T021 [US1] Author the golden unit Urdu mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-01/` (`translation_status: reviewed`, passing the parity gate)

**Checkpoint**: US1 is fully functional and independently testable — the MVP.

---

## Phase 4: User Story 2 - Navigate the catalog and find content (Priority: P1)

**Goal**: A reader browses Semester → Course → Unit with an always-visible active trail and searches the whole book in both languages, opening a result directly.

**Independent Test**: With courses scaffolded, browse the sidebar to a unit (active trail correct, ≤3 steps); search a term in EN and in UR and open a result; confirm "coming soon" placeholders never surface as empty search hits.

### Tests for User Story 2

- [ ] T022 [P] [US2] Playwright e2e: navigation is organized Semester → Course → Unit, highlights the current location, and reaches a unit in ≤3 steps, in `tests/e2e/navigation.spec.ts`
- [ ] T023 [P] [US2] Playwright e2e: a term searched in EN and in UR each returns a relevant result that opens the intended page, and `coming_soon` units are absent from results, in `tests/e2e/search.spec.ts`

### Implementation for User Story 2

- [X] T024 [US2] Configure the autogenerated Semester → Course → Unit sidebar in `sidebars.ts` plus the `_category_.json` conventions, with active-trail highlighting (FR-004)
- [X] T025 [US2] Configure `@easyops-cn/docusaurus-search-local` for both `en` and `ur` in `docusaurus.config.ts`; spike/verify Urdu tokenization meets SC-004 (research R5 risk) before locking the choice
- [ ] T026 [US2] Implement `coming_soon` placeholder rendering (visible "coming soon" label, no dead-end) and exclude such pages from the search index via the search plugin config; ensure the validator treats `coming_soon` units as parity/authoring-exempt (FR-006, depends on T009)

**Checkpoint**: US1 + US2 both work independently — a usable public release (both are P1).

---

## Phase 5: User Story 3 - Teachers use per-unit teaching resources (Priority: P2)

**Goal**: A teacher reaches all five sections plus the course overview and prints a clean A4 handout for an activity or public assessment — with no answer keys anywhere in public content.

**Independent Test**: On the golden unit, open each teaching section and the course overview; use "Print / Save as PDF" on activities/formative/summative → clean A4 in the browser print dialog; inspect built output → no answer keys.

### Tests for User Story 3

- [ ] T027 [P] [US3] Playwright e2e with print emulation: each of `activities.mdx`, `formative.mdx`, `summative.mdx` paginates clean at A4 (chrome hidden, RTL preserved, no clipped content), in `tests/e2e/handout-print.spec.ts`
- [ ] T028 [P] [US3] Vitest: the built output and content sources contain no answer-key material and the validator rejects answer-key front-matter fields, in `tests/unit/no-answer-keys.test.mjs`

### Implementation for User Story 3

- [X] T029 [US3] Populate the five reachable sections (Content, Activities, Formative, Summative, Teacher Notes) and `course-overview.mdx` for EFMP-301, folding the guide's teaching strategies / practical work / assessment criteria (FR-007, FR-008; Constitution III.6)
- [X] T030 [US3] Implement the `PrintHandout` component (`window.print()`) in `src/components/PrintHandout.tsx` and add it to `activities.mdx`, `formative.mdx`, `summative.mdx`
- [X] T031 [US3] Add the A4 print stylesheet to `src/css/custom.css`: `@media print { @page { size: A4; margin } … }`, hiding navbar/sidebar/TOC/footer/button and preserving RTL/Nastaliq (depends on T007)

**Checkpoint**: US1 + US2 + US3 all independently functional.

---

## Phase 6: User Story 4 - Add or grow a course without platform changes (Priority: P3)

**Goal**: The curriculum owner adds a course or units purely by adding content folders + metadata; nav, search, and validation pick it up with no platform-code change, and missing metadata is rejected before publish.

**Independent Test**: Add a dummy course with only new folders/metadata → it appears in nav and search with zero `src/`/config diff; a unit missing a required field fails the build with a clear message.

### Tests for User Story 4

- [X] T032 [P] [US4] Vitest: missing-metadata fixture — a unit without `clo_refs` (or unit_no / course_code) makes `validate-content` exit non-zero with a message naming the missing field (SC-007), in `tests/unit/missing-metadata.test.mjs`
- [X] T033 [P] [US4] Vitest: weighting-sum fixture — a unit whose `assessment_weighting` does not sum to 100 (e.g. `{summative:70, formative:40}`) makes `validate-content` exit non-zero (FR-010; validates the T009 custom check), in `tests/unit/weighting-sum.test.mjs`
- [ ] T034 [P] [US4] e2e/script test: adding a dummy course folder + metadata yields zero changes under `src/` and config files (`git diff` check) and the build still passes, in `tests/e2e/add-course.spec.ts`

### Implementation for User Story 4

- [X] T035 [US4] Author the machine-readable catalog `catalog/courses.json` (all 8 semesters, ~40+ courses: code, EN/UR title, credit hours, category, priority) from the ROADMAP board scheme; keep unresolved code discrepancies tracked in `specs/gaps.md`
- [X] T036 [US4] Implement `scripts/scaffold-catalog.mjs`: generate `docs/semester-{1..8}/<course-code>/` with `_category_.json`, a `course-overview.mdx` stub, and placeholder `unit-NN` (five files, `coming_soon: true`, valid minimal front-matter) from `catalog/courses.json` (depends on T035, T009)
- [X] T037 [US4] Run the scaffold to materialize all 8 semesters; confirm zero dead-ends and that un-authored units render "coming soon" (FR-014, SC-005) (depends on T036)

**Checkpoint**: All four user stories independently functional; full catalog scaffolded.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Budgets, accessibility, deployment, and the golden-unit freeze.

- [ ] T038 [P] Add the Lighthouse CI gate to `.github/workflows/ci.yml`: content text < 200 KB excluding images, FCP < 2.5s on Slow-4G, accessibility pass (SC-002; depends on T011). **Also verify total first-load weight incl. the self-hosted Nastaliq font (WOFF2 Urdu subset, single weight, `font-display: swap`) stays within budget** — the font counts against first paint even though SC-002's text budget excludes images (research R3, Constitution V.5)
- [ ] T039 [P] Accessibility sweep across components and content: semantic heading order, alt text on all images/diagrams, no color-only meaning, RTL correctness (FR-013)
- [ ] T040 [P] Deployment config: Vercel primary + GitHub Pages fallback, deploy preview on PR and prod on merge to `main` (research R9)
- [ ] T041 Golden-unit review gates — Content + Engineering + Teacher sign-off — then freeze the unit template as the quality bar (FR-015, SC-008)
- [ ] T042 Run the full `quickstart.md` acceptance verification map (SC-001…SC-010) and record results

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies — start immediately.
- **Foundational (Phase 2)**: depends on Setup — BLOCKS all user stories.
- **User Stories (Phase 3–6)**: all depend on Foundational. US1 and US2 are both P1; US1 is the MVP. Stories are independently testable and can proceed in parallel if staffed.
- **Polish (Phase 7)**: depends on the targeted user stories being complete.

### User Story Dependencies

- **US1 (P1)**: after Foundational. Authors its own golden unit — does **not** depend on the full scaffold.
- **US2 (P1)**: after Foundational. Independently testable; richer once US4's scaffold exists but works against US1's golden unit + a couple of stub courses.
- **US3 (P2)**: after Foundational. Builds on the golden unit's five files (reuses US1 content) but its print path is independently testable.
- **US4 (P3)**: after Foundational. Generalizes single-unit authoring to the whole catalog; independent of US1–US3.

### Within Each User Story

- Tests are written to fail first, then implementation.
- Validator-extension tasks (T016, T018, T026) edit the shared `scripts/validate-content.mjs` — sequence them after the base validator T009 and not in parallel with each other.
- Content authoring (T020/T021, T029) after the components/validator they exercise.

### Parallel Opportunities

- Setup: T002, T003, T004, T005 in parallel after T001.
- Foundational: T007, T008, T010 in parallel; T009 after T008; T011 after T009.
- Per story, all `[P]` test tasks run together; components in different files run together.
- With capacity, US1/US2/US4 can be developed in parallel once Foundational is done (US3 reuses US1 content, so start it after T020/T021).

---

## Parallel Example: User Story 1

```bash
# Tests for US1 together:
Task: "Playwright EN↔UR toggle/RTL/narrow-viewport in tests/e2e/read-bilingual.spec.ts"
Task: "Vitest parity-gate fixture in tests/unit/parity.test.mjs"
Task: "Vitest glossary-reference fixture in tests/unit/glossary.test.mjs"

# Independent-file implementation together (validator edits stay sequential):
Task: "TranslationStatusBadge variants in src/components/TranslationStatusBadge.tsx"
Task: "Glossary component + seed glossary.json in src/components/Glossary.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Phase 1 Setup → 2. Phase 2 Foundational (blocks everything) → 3. Phase 3 US1 → **STOP & VALIDATE** the golden unit bilingually → demo.

### Incremental Delivery

1. Setup + Foundational → foundation ready.
2. US1 (read bilingual) → test → demo (MVP).
3. US2 (navigate + search) → test → demo (usable public release; both P1 done).
4. US3 (teacher resources + handouts) → test → demo.
5. US4 (scaffold whole catalog + add-course guarantee) → test → demo.
6. Polish: budgets, a11y, deploy, golden-unit freeze.

### Notes

- `[P]` = different files, no incomplete-task dependency.
- The user's explicit request — **glossary.json + `<Glossary>` + the validator's glossary-reference check** — is covered by T014 (test), T017 (component + data file), and T018 (validator check).
- Verify version-sensitive Docusaurus config against current docs via Context7 (`/facebook/docusaurus`) while implementing.
- Commit after each task or logical group; stop at any checkpoint to validate a story independently.
