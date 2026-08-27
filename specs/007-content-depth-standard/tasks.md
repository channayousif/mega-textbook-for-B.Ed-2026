# Tasks: Content Depth Standard & Reusable Unit-Authoring Skill

**Input**: Design documents from `/specs/007-content-depth-standard/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Tests**: INCLUDED — spec SC-004 / SC-007 require automated verification ("fails the depth
gate in 100% of attempts"), and plan.md mandates `tests/unit/depth-gate.test.mjs` with a
red-first fixture suite. Test tasks appear in User Story 3 (the gate).

**Organization**: by user story (spec.md priorities). Build order honours the one real
dependency — the author (US1) needs US2's enumerated checklist to write against, and the
freeze (US4) is the last step after the proof — so the P1 stories run US2 → US1.

## Path Conventions

Single Docusaurus-rooted project (Specs 001–006). No `src/` app code in this feature —
paths are `scripts/`, `tests/unit/`, `specs/content/`, `.claude/skills/`, `docs/`, `i18n/`,
`.github/workflows/`, repo root.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: aliases and empty trees the later phases write into.

- [X] T001 [P] Add `"check:depth-gate": "node scripts/check-unit-depth.mjs"` to the `scripts` block of `package.json` (alongside `check:pipeline-gate`)
- [X] T002 [P] Create the empty trees: `.claude/skills/author-unit/references/`, `specs/content/efmp-302/coverage/`, `specs/content/efmp-302/sources/` (add a `.gitkeep` to each until real files land)
- [X] T003 [P] Update the `description` field of `contracts/style-guide-frontmatter.schema.json` to note that `version: "2.0"` is the depth-standard freeze marker (Feature 007 / Spec 006 FR-007) — no structural change, the `^[0-9]+\.[0-9]+$` pattern already admits `"2.0"`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: define the depth standard itself. Nothing can be authored, gated, or frozen
against it until this exists.

**⚠️ CRITICAL**: no user story work begins until Phase 2 is complete.

- [X] T004 Author the `## Unit depth standard` section in `specs/content/style-guide.md` — the concept-coverage hard rule (every checklist sub-topic → its own named subsection in its FR-004 folding-rule file; grouping only if each is still individually covered in the matrix); the soft no-padding length rule (precise, ~one Pakistan-grounded example per sub-topic, **no word floor**); **both** the `## Common misconceptions` **and** the `## Further reading` blocks are required in `index.mdx` (the gate fails if either is missing); **formative ≥ 5 items written as a numbered list** (state this — it is what the gate counts, research.md R7); the `**Depth budget**` reading-minutes band guidance (author-set; keep the band tight — roughly ±25% of the target — so the FR-012(d) check has teeth); the register-ceiling restatement (Constitution Art. III.1 — deeper concepts, not harder language; new term → glossary entry). **Do NOT bump `version` yet.**
- [X] T005 Author the `## What the depth gate checks vs. the human Content gate` section in `specs/content/style-guide.md` — the FR-013 split: the CI gate checks structure (checklist coverage, required blocks, formative count, reading-minutes band, matrix↔sources consistency); the human Content gate owns padding, example aptness, substitute-source relevance, and whether the register held
- [X] T006 [P] Create `.claude/skills/author-unit/references/depth-standard.md` restating the numeric/structural rules from T004/T005 as the skill's shared source of truth; add a one-line "keep in sync with `specs/content/style-guide.md`'s `## Unit depth standard`" note to BOTH files (plan risk 3)

**Checkpoint**: the standard is written. User stories can begin.

---

## Phase 3: User Story 2 — Expand the course content-spec (Priority: P1)

**Goal**: `specs/content/efmp-302/content-spec.md` carries the source material an author needs
to go deep, and its `## Unit 1` subsection carries the enumerated checklist the gate grades
against.

**Independent Test**: open `specs/content/efmp-302/content-spec.md` — Course Description,
annotated Reading list, Week schedule, and Standards anchors are all present; the `## Unit 1`
subsection has a `### Sub-topic checklist` table with one row per leaf bullet of guide
sections 1.1–1.4; front matter still `status: approved`.

- [X] T007 [US2] Add `## Course Description` to `specs/content/efmp-302/content-spec.md` from the guide's **"Course Description"** section for EFMP-302 in `Scheme-and-Course-guides/extracted-text/1st 2026.txt` (locate by the heading, not a fixed line number), paraphrased or quoted < 15 words per Constitution Art. III.5
- [X] T008 [US2] Add `## Reading list` to `specs/content/efmp-302/content-spec.md` with `### Guide-required` and `### Curated-supplementary (open access)` tables per `contracts/content-spec-v2.md` — full APA + DOI/URL for every entry in the guide's **"Suggested Readings"** section for EFMP-302 in `.../1st 2026.txt` (locate by the heading): Beijaard et al. 2004; Brookfield 2017; Carr 2000; Day 1999; Demirkasımoğlu 2010; Ehrich et al. 2011; Guskey 2000; Hargreaves 2000; Hurst & Reding 2009; Icka & Kochoska 2024; Suarez & McGrath 2022; Villegas-Reimers 2003 — each row's `Units` column tagging the unit(s) it supports
- [X] T009 [US2] Add `## Week schedule` table (`| Week(s) | Unit | Sub-topics |`) to `specs/content/efmp-302/content-spec.md` covering weeks 1–16 → Units 1–6
- [X] T010 [US2] Add `## Standards & frameworks anchors` to `specs/content/efmp-302/content-spec.md` — National Professional Standards for Teachers (Pakistan) → Unit 4; UNESCO / NACTE codes → Unit 2; OECD (Suarez & McGrath 2022) → Unit 1 identity — noting what each anchors
- [X] T011 [US2] In the `## Unit 1: Understanding Teaching` subsection of `specs/content/efmp-302/content-spec.md`, add the `### Sub-topic checklist` table per `contracts/content-spec-v2.md` — one `U1-NN` row per leaf bullet of guide 1.1–1.4 (concept of a profession; profession-vs-occupation features; professionalism vs professionalisation; comparative view; industrial metaphors; shift to inquiry-based; specialised knowledge/training; code of conduct; accountability/autonomy/collegiality; professional associations/accreditation; sociocultural/policy influence on identity; personal beliefs/values; reflection & self-awareness; "who am I becoming as a teacher")
- [X] T012 [US2] In the same subsection add `**Depth budget**` (`N sub-topics; A–B reading-min`), `**Prerequisite knowledge**`, `**Common misconceptions**`, `**Mapped readings**` (keys from T008), `**Worked-examples plan**` (~one per sub-topic), `**International best-practice notes**` per `contracts/content-spec-v2.md`
- [X] T013 [US2] Curriculum-owner review of the **whole expanded** `specs/content/efmp-302/content-spec.md` (Content gate, Constitution Art. II.2): (a) the Unit 1 `### Sub-topic checklist` faithfully reflects guide 1.1–1.4 — it is the authoritative list the gate grades against; (b) the new `## Course Description` / `## Reading list` / `## Week schedule` / `## Standards & frameworks anchors` sections are accurate and the file still merits `status: approved` (re-affirm it — SC-006). Record reviewer initials on the `G1 unit-spec` row for Unit 1 in `specs/content/efmp-302/tasks.md`

**Checkpoint**: content-spec expanded; the Unit 1 checklist is reviewed and is the frozen
target for US1.

---

## Phase 4: User Story 1 — Author EFMP-302 Unit 1 to the depth standard using the skill (Priority: P1) 🎯 MVP

**Goal**: the five English files of `docs/semester-1/efmp-302/unit-01/` re-drafted so every
checklist sub-topic has its own named subsection with a cited source and ~one Pakistani
example, plus the committed `coverage/unit-01.md` + `sources/unit-01.md` and the Urdu handoff.

**Independent Test**: `specs/content/efmp-302/coverage/unit-01.md` maps 100% of the Unit 1
checklist to a real subsection with a source (SC-001); `specs/content/efmp-302/sources/unit-01.md`
lists ≥ 3 distinct scholarly sources (SC-002); a readability spot-check finds no graduate-level
term without a glossary entry (SC-005) — all verifiable without the CI gate.

- [X] T014 [P] [US1] Write `.claude/skills/author-unit/SKILL.md` — YAML front matter (`name: author-unit`, `description` with trigger phrases: "author a unit", "draft unit content", "content depth standard", "re-draft unit") + the four-step workflow: (1) source-gather — read the guide sub-unit verbatim, pull `**Mapped readings**`, use `WebSearch`/`WebFetch` to locate & verify a topically-related open-access substitute when a mapped reading is unavailable (record exact URL/DOI), degrade to author-provided material + FR-004 escalation offline, **never fabricate a citation**; (2) UbD backward design — CLOs → understandings → assessment evidence → content, with a Bloom alignment table; (3) draft the five files to `references/depth-standard.md`; (4) self-review against the standard + Content gate, emit `coverage/unit-NN.md` and `sources/unit-NN.md`. Out of scope: quiz answer keys (stay in Spec 006's `.staging/`)
- [X] T015 [P] [US1] Write `.claude/skills/author-unit/references/pedagogy-checklist.md` — cognitive load (chunking, worked-example effect), retrieval practice in formative, spaced-review hooks, Universal Design for Learning representation, explicit vocabulary, dialogic / inquiry activities matching the course description
- [X] T016 [P] [US1] Write `.claude/skills/author-unit/references/citation-and-register.md` — APA reference form, the < 15-word quotation rule (Constitution Art. III.5), HSC/intermediate-graduate register (Art. III.1), Urdu-translation-friendly phrasing (short sentences, no idiom)
- [X] T017 [US1] Re-draft `docs/semester-1/efmp-302/unit-01/index.mdx` with the `author-unit` skill — a named subsection per checklist sub-topic mapped to `index.mdx`, ~one Pakistan-grounded example each, paraphrase-and-cite the mapped/substitute readings, add `## Common misconceptions` and `## Further reading` (real citations), recompute `est_reading_minutes`
- [X] T018 [US1] Re-draft `docs/semester-1/efmp-302/unit-01/activities.mdx` to cover its mapped checklist sub-topics (the profession-vs-occupation and industrial-vs-inquiry activities, deepened); recompute `est_reading_minutes`
- [X] T019 [US1] Re-draft `docs/semester-1/efmp-302/unit-01/formative.mdx` — **≥ 5 items as a numbered list**, Remember → Understand → Apply, covering the unit's key distinctions; recompute `est_reading_minutes`
- [X] T020 [US1] Re-draft `docs/semester-1/efmp-302/unit-01/summative.mdx` — keep a rubric + ≥ 1 Analyze-or-higher item (Constitution Art. III.3); recompute `est_reading_minutes`
- [X] T021 [US1] Re-draft `docs/semester-1/efmp-302/unit-01/teacher-notes.mdx` — teaching strategies + "Practical work" block covering the sub-topics mapped to `teacher-notes.mdx`; recompute `est_reading_minutes`
- [X] T022 [US1] Create `specs/content/efmp-302/coverage/unit-01.md` per `contracts/coverage-matrix.md` — one row per (`U1-NN`, file, exact section heading, source key); every checklist ID mapped, no blank cells
- [X] T023 [US1] Create `specs/content/efmp-302/sources/unit-01.md` per `contracts/sources-consulted.md` — ≥ 3 distinct scholarly sources with exact DOI/URL and `Kind`; every `Source` used in `coverage/unit-01.md` present as a `Key`, and no unreferenced non-`no-external-source` key (FR-012e). Log any `no-external-source` row in `specs/gaps.md` (FR-004)
- [X] T024 [US1] Urdu handoff — set `translation_status: reviewed` → `draft` in the front matter of all five files in `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/`, and update the `<TranslationStatusBadge status=…>` prop in the UR `index.mdx` to match (FR-017)
- [X] T025 [US1] Append `| Unit 1 | G4 ur-translation | ▢ |  |  |` and `| Unit 1 | G5 ur-review | ▢ |  |  |` revision rows to `specs/content/efmp-302/tasks.md` (the Urdu re-work handoff — actual re-translation is downstream, FR-016)
- [X] T026 [US1] In `specs/content/efmp-302/tasks.md`, re-open the Unit 1 `G2 en-draft` and `G3 en-review` rows to `▣` (they were `✅` from Spec 006's draft; the re-draft resets them until T031 / T036)

**Checkpoint**: EFMP-302 Unit 1 is re-drafted deep; `coverage/unit-01.md` + `sources/unit-01.md`
committed; Urdu mirror handed off. This is the MVP — a standards-compliant golden-quality unit,
verifiable by inspection.

---

## Phase 5: User Story 3 — CI depth gate blocks a shallow merge (Priority: P2)

**Goal**: `scripts/check-unit-depth.mjs` fails a merge whose in-scope unit is missing the
structural evidence of depth, names the unmet condition, and skips any unit without a
checklist.

**Independent Test**: run the fixture suite — a unit missing a checklist sub-topic subsection,
or with a 4-item formative set, fails with a message naming the condition (SC-004); a clean
unit passes; an un-migrated unit is skipped (exit 0).

### Tests for User Story 3 (write FIRST — MUST fail before T028) ⚠️

- [X] T027 [P] [US3] Write `tests/unit/depth-gate.test.mjs` (Vitest; mirror `tests/unit/pipeline-gate.test.mjs`, add a local `makeDepthFixture()` or extend `tests/unit/_helpers.mjs`). Every failing case MUST assert both the non-zero exit code **and** that the message names the unmet condition (SC-004). Cases: (a) happy path — in-scope unit, full coverage → exit 0; (b) no `### Sub-topic checklist` in the subsection → **skipped**, exit 0; (c) missing `coverage/unit-01.md` → fail; (d) a checklist ID absent from the coverage matrix → fail, message names the ID; (e) a coverage row with a blank `File`/`Section`/`Source` → fail; (f) a coverage `Source` with no matching `Key` in `sources/unit-01.md` → fail; (g) a `sources` `Key` (non-`no-external-source`) unreferenced by coverage → fail; (h1) `index.mdx` missing `## Common misconceptions` (with `## Further reading` present) → fail; (h2) `index.mdx` missing `## Further reading` (with `## Common misconceptions` present) → fail; (i) `formative.mdx` with 4 numbered items → fail; (j) sum of the five EN files' `est_reading_minutes` below / above the `**Depth budget**` band → fail; (k) `coming_soon: true` unit → skipped. **Run `npm test` — these MUST fail (script absent).**

### Implementation for User Story 3

- [X] T028 [US3] Implement `scripts/check-unit-depth.mjs` — skeleton copied from `scripts/check-pipeline-gate.mjs` (`CONTENT_ROOT` env override, `gray-matter`, hand-rolled pipe-table parser, `errors[]`, non-zero exit with a per-unit message). Per non-`coming_soon` EN unit under `docs/`: (1) load the course `content-spec.md`, find the `## Unit N` subsection, parse `### Sub-topic checklist` → **no table ⇒ skip** (research.md R4); (2) parse `specs/content/<course>/coverage/unit-NN.md` — fail if missing / any checklist ID unmapped / any blank cell; (3) parse `specs/content/<course>/sources/unit-NN.md` — fail on either-direction key mismatch (FR-012e); (4) EN `index.mdx` — fail if **either** the `## Common misconceptions` heading **or** the `## Further reading` heading is missing (FR-005 mandates both; the message names which one is absent); (5) `formative.mdx` — count `/^\s*\d+\.\s/m`, fail if < 5; (6) sum `est_reading_minutes` across the five EN files, parse the `**Depth budget**` `A–B` range, fail if the sum ∉ `[A, B]`. Every failure pushes a per-unit message naming the unmet condition (SC-004)
- [X] T029 [US3] Run `npm test` until `tests/unit/depth-gate.test.mjs` is all green; fix parser edge cases (leading/trailing `|`, `|---|` separator rows skipped, cell trimming, missing file vs empty file)
- [X] T030 [US3] Add a `- name: Depth gate (concept coverage, required blocks, formative floor)` / `run: npm run check:depth-gate` step to the `build` job of `.github/workflows/ci.yml`, positioned after the "Pipeline gate" step and before "Answer-key safety check"
- [X] T031 [US3] Run the full gate suite locally against the re-drafted unit — `npm run validate:content && npm run check:depth-gate && npm run check:no-answer-keys && npm test` — all pass (SC-003 structural half, SC-007). Fix any content/coverage discrepancy the gate surfaces in the US1 files. Leave the EFMP-302 Unit 1 `G2 en-draft` / `G3 en-review` tracker rows at `▣` — a green structural gate is not a passed review; only T036 (curriculum owner) sets them `✅`. (`check:pipeline-gate` stays red for Unit 1 until T036 — expected, see Dependencies.)

**Checkpoint**: the gate is live in CI, green against the real re-drafted unit, red against
shallow fixtures, and silent on un-migrated units.

---

## Phase 6: User Story 4 — Freeze the standard as a versioned pair (Priority: P2)

**Goal**: `specs/content/style-guide.md` frozen at `version: "2.0"`, governing the terminology
bank as its pair.

**Independent Test**: `style-guide.md` front matter reads `version: "2.0"`; `terminology.csv`
has no version field; `npm run check:pipeline-gate` and `npm run validate:content` still pass.

- [X] T032 [US4] Set `version: "1.0"` → `version: "2.0"` in the front matter of `specs/content/style-guide.md` — **only after T031 passes and the human Content gate (T036) clears** (FR-014 / quickstart.md: the freeze is the last step)
- [X] T033 [US4] Confirm `specs/content/terminology.csv` is unchanged (no version field — research.md R8) and that `contracts/style-guide-frontmatter.schema.json` validates the `"2.0"` value; re-run `npm run check:pipeline-gate`

**Checkpoint**: style guide + terminology bank frozen together at v2.0 (SC-007).

---

## Phase 7: User Story 5 — Roll the standard onward without re-opening this feature (Priority: P3)

**Goal**: the next unit adopts the standard by adding a checklist (no code change), and the
constitutionally-required EFMP-301 golden-unit re-proof is queued.

**Independent Test**: adding a `### Sub-topic checklist` table to any other unit's content-spec
subsection puts that unit in the depth gate's scope with zero edits to `check-unit-depth.mjs`;
none of this feature's artifacts change.

- [X] T034 [US5] Queue the EFMP-301 golden-unit re-proof (Constitution Art. VI.1, v2.5.0 "Standard versioning") **as a prose note only** — add a short `> **Pending:** Unit 1 v2.0 depth-standard re-proof — the immediate-next content task after the EFMP-302 Unit 1 proving unit (Constitution Art. VI.1).` block near the top of `specs/content/efmp-301/content-spec.md`, and a matching bullet in `specs/backlog.md`. **Do NOT add `G1`–`G7` stage rows to `specs/content/efmp-301/tasks.md`** — EFMP-301 Unit 1 is already published with all-`✅` rows, and `check-pipeline-gate.mjs` reads the *last* matching row, so a `▢` row would flip that unit to "not done" and break `check:pipeline-gate` on `main` (blocking the deploy cron). The stage rows are created when the re-proof is actually scheduled on its own branch
- [X] T034a [US5] Confirm no regression: after T034, run `npm run check:pipeline-gate` — EFMP-301 Unit 1 still passes (prose note only, no tracker change)
- [X] T035 [US5] Add an "Adopting the depth standard for a new unit" note to `specs/content/style-guide.md`'s `## Unit depth standard` — add the `### Sub-topic checklist` table to the unit's content-spec subsection and the gate picks it up automatically; until then the unit is grandfathered

**Checkpoint**: rollout mechanism confirmed; EFMP-301 re-proof tracked.

---

## Phase 8: Polish & Cross-Cutting Concerns

- [X] T036 Human Content-gate pass (curriculum owner) on the re-drafted EFMP-302 Unit 1 — CLO/SLO traceability, register held (Art. III.1, SC-005), examples apt, substitute sources genuinely on-topic (FR-003), misconceptions accurate, guide-section fidelity. This is the sole task that sets the Unit 1 `G2 en-draft` and `G3 en-review` rows in `specs/content/efmp-302/tasks.md` from `▣` to `✅` with the curriculum owner's initials (the Art. VII Content gate is theirs to grant, not the developer's). After this, `check:pipeline-gate` is green for Unit 1 again (SC-003 human half). The Teacher gate is not re-run — EFMP-302's is satisfied per-course under Spec 006 (spec.md Assumptions)
- [X] T037 [P] Add a "Content depth standard" section to `README.md` (Constitution Art. X.2, FR-018) — what the standard requires, where `specs/content/<course>/coverage/` and `.../sources/` live, `npm run check:depth-gate`, the `.claude/skills/author-unit/` skill, and the `references/depth-standard.md` ↔ `style-guide.md` sync rule
- [X] T038 [P] Verify the "keep in sync" note from T006 is present in BOTH `specs/content/style-guide.md` and `.claude/skills/author-unit/references/depth-standard.md` (plan risk 3)
- [X] T039 Run the full `specs/007-content-depth-standard/quickstart.md` verification checklist end-to-end; tick all 15 items; note any deviation in `quickstart.md`
- [X] T040 [P] Reconcile design drift (Constitution Art. IV.4) — if implementation changed any detail (ID grammar, parser behaviour, section names), update `plan.md` / `research.md` / `data-model.md` / `contracts/` and note it in PHR `history/prompts/007-content-depth-standard/`

---

## Dependencies & Execution Order

### Phase dependencies

- **Setup (Phase 1)** — no dependencies; start immediately.
- **Foundational (Phase 2)** — after Setup. **Blocks every user story** (the standard must
  exist to author, gate, or freeze against).
- **US2 (Phase 3, P1)** — after Foundational.
- **US1 (Phase 4, P1)** — after **US2** (the author writes against US2's reviewed checklist;
  T017–T023 consume the `### Sub-topic checklist` and `**Depth budget**` from T011/T012/T013).
- **US3 (Phase 5, P2)** — T027/T028/T029 can proceed **in parallel with US1** (different
  files); **T031 requires US1 + US2 complete** (it runs the gate against the real unit).
- **US4 (Phase 6, P2)** — T032 requires **T031 green AND T036 (human Content gate) clear**
  (the freeze is the last step, FR-014).
- **US5 (Phase 7, P3)** — T034/T034a after US4 (EFMP-301 re-proof is "the immediate next
  content task *after the proving unit*" — proving unit = US1–US4 done).
- **Polish (Phase 8)** — T036 gates T032; T037–T040 after the rest.

### ⚠️ Merge gate

Between **T026** (re-open EFMP-302 Unit 1 `G2/G3` to `▣`) and **T036** (curriculum owner sets
them `✅`), `npm run check:pipeline-gate` is **RED for EFMP-302 Unit 1** by design — the
re-draft is in progress. **Do not merge this branch until T036 is complete and
`check:pipeline-gate` is green again.** T031 deliberately omits `check:pipeline-gate` from its
command line for this reason; T034a re-confirms EFMP-301 was not collaterally regressed.

### User story independence

- **US2** is fully independent — testable by opening the expanded `content-spec.md`.
- **US1** depends on US2 only. Testable by inspecting `coverage/unit-01.md` + `sources/unit-01.md`
  against the checklist — no CI gate needed.
- **US3** is independent of US1/US2 for its *unit tests* (fixtures), but its *acceptance*
  (T031, gate green on the real unit) needs US1+US2.
- **US4** is a 2-task freeze, gated on the proof (US1) + human review (T036).
- **US5** is 3 tracking/verification tasks (T034 prose note, T034a no-regression check, T035
  adoption note), gated on US4.

### Within a story

- US3: T027 (failing tests) **before** T028 (implementation) **before** T029 (green).
- US1: skill files (T014–T016, parallel) before the re-draft (T017–T021); re-draft before
  the coverage/sources emit (T022–T023); T024–T026 (handoff) after the re-draft.

### Parallel opportunities

- Setup: T001, T002, T003 all `[P]`.
- Foundational: T006 `[P]` (T004→T005 sequential — same file).
- US1: T014, T015, T016 `[P]` (three separate skill files). T017–T021 touch five separate
  files but share the checklist as input — parallelisable once T011–T013 are done.
- US2: T007–T010 touch different sections of the same file — treat as sequential to avoid
  merge churn; T011→T012→T013 sequential.
- Polish: T037, T038, T040 `[P]`.

---

## Parallel Example: User Story 1 skill files

```bash
Task: "Write .claude/skills/author-unit/SKILL.md"                              # T014
Task: "Write .claude/skills/author-unit/references/pedagogy-checklist.md"      # T015
Task: "Write .claude/skills/author-unit/references/citation-and-register.md"   # T016
```

---

## Implementation Strategy

### MVP (Phases 1–4)

1. Phase 1 Setup → 2. Phase 2 Foundational (the standard) → 3. Phase 3 US2 (expanded
   content-spec + Unit 1 checklist) → 4. Phase 4 US1 (re-drafted Unit 1 + coverage/sources +
   Urdu handoff).
5. **STOP & VALIDATE**: `coverage/unit-01.md` maps 100% of the checklist (SC-001); ≥ 3
   scholarly sources (SC-002); register spot-check clean (SC-005). This is a demonstrably
   deeper golden-quality unit — the core value — even before the gate exists.

### Increment 2 (Phase 5) — enforcement

Add US3: the CI depth gate + fixtures. Now a shallow unit can't merge (SC-004, SC-007).

### Increment 3 (Phases 6–8) — freeze & close out

US4 freeze to v2.0; US5 queue the EFMP-301 re-proof + document adoption; Polish: human
Content gate, README, quickstart run, drift reconciliation.

### Total: 41 tasks

| Phase | Tasks | Story |
|---|---|---|
| 1 Setup | T001–T003 | — |
| 2 Foundational | T004–T006 | — |
| 3 | T007–T013 | US2 (P1) |
| 4 | T014–T026 | US1 (P1) 🎯 |
| 5 | T027–T031 | US3 (P2) |
| 6 | T032–T033 | US4 (P2) |
| 7 | T034, T034a, T035 | US5 (P3) |
| 8 Polish | T036–T040 | — |

Parallel markers: 12 tasks `[P]`. Independent-test criteria: one per story, above.
Suggested MVP: **Phases 1–4** (US2 + US1). **Merge gate**: do not merge until T036 restores
`check:pipeline-gate` to green (see Dependencies).
