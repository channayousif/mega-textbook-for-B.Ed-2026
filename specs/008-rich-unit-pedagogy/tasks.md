---
description: "Task list for 008-rich-unit-pedagogy"
---

# Tasks: Rich Unit Pedagogy — Nested Per-Topic Learning Cycles

**Input**: Design documents from `/specs/008-rich-unit-pedagogy/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`, `ADR-0011`

**Tests**: TDD **is** requested for the gate work (plan §"Gates + red-first tests", quickstart §5).
Test tasks precede every gate implementation task and MUST fail first.

**Organization**: grouped by user story. Story phases run in **dependency order**
(US3 → US5 → US2 → US1 → US4), not strict priority order, because the gates (US3) must exist before
the proving unit (US1) can be verified and the legacy regression floor (US5) must be re-proven after
each gate rewrite. This is noted per phase.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: `US1`–`US5` for user-story phases only
- Every task names exact file paths and tags the FR(s) it satisfies

## Path conventions

Single Docusaurus-rooted project (Specs 001–007). Content in `docs/` + `i18n/`; governance in
`specs/content/`; gates in `scripts/`; tests in `tests/unit/`; the skill in
`.claude/skills/author-unit/`; JSON schemas in `contracts/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: scaffolding that has no dependency on the constitution amendment.

- [x] T001 [P] Add `"check:figures": "node scripts/check-figures.mjs"` to `package.json` scripts; create `specs/content/efmp-302/figures/` with a `.gitkeep`. [FR-014]
- [x] T002 [P] Add a description-only note to `contracts/style-guide-frontmatter.schema.json` (and its `specs/006-content-pipeline/contracts/` mirror) that `version: "3.0"` is the Spec 008 freeze marker — the `^[0-9]+\.[0-9]+$` pattern already admits it, no structural change. [FR-026]
- [x] T003 [P] `git mv .claude/skills/author-unit/references/depth-standard.md .claude/skills/author-unit/references/structure-standard.md`; update the pointer in `.claude/skills/author-unit/SKILL.md` and the reciprocal "keep in sync with `specs/content/style-guide.md`" note in the renamed file (content filled in T032). [FR-023]

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: governance + contracts. **T004 (the constitution v2.6.0 amendment) is complete** — it
was the blocking prerequisite for the whole feature; T005–T012 may now run in parallel.

- [x] T004 **✅ DONE 2026-08-27 (this session, /sp.analyze remediation X1).** Amended `.specify/memory/constitution.md` v2.5.0 → **v2.6.0** (MINOR): prepended a `SYNC IMPACT REPORT (v2.6.0)` block; Art. III.1 (one-sentence reaffirmation — a richer *structure* does not raise the *language* register), Art. III.3 (per-topic formative+summative cycle + the unit-end 10 MCQ / 10 RRQ / 5 ERQ bank with rubrics; "Analyze or above" holds at both the per-topic `## Summative task` and the unit-end ERQ rubrics), Art. III.6 (the per-topic layout is a permitted alternative carrier of the guide's teaching/practical/assessment sections; Spec 006 FR-004 superseded *in part*, not deleted; "MUST NOT be invented where the guide is silent" unchanged), Art. V.2 (the answer-key carve-out — a bounded `## Answers and marking guidance` **final** section of `unit-assessment.mdx` / `course-review.mdx` is intentionally-public self-study content, distinct from the RLS-protected Spec 003 LMS store which stays `verified_teacher`-gated; the front-matter answer-key **key** ban and the everywhere-else content scan are retained), Art. VI.1 (recorded the "Standard versioning" re-run for v3.0 — proving unit = EFMP-302 U1, EFMP-301 U1 re-proof = the tracked next content task, EFMP-302 U1 = working exemplar), Art. VII (the Engineering-gate row gains "figure-marker ↔ manifest consistency (`check:figures`)"). Footer → `Version: 2.6.0`. Downstream review recorded in the sync block. **This unblocks all other tasks.** [FR-011, FR-024]
- [x] T005 [P] `specs/content/style-guide.md`: add `## Unit structure standard` — the nested model (unit opening → topics → unit-end matter → optional teacher-notes → course-end matter), the nine-part cycle with the exact headings from `contracts/topic-cycle.md`, file naming (`topic-NN.mdx` zero-padded, `unit-assessment.mdx`, `unit-teacher-notes.mdx`, `course-review.mdx`), the opt-in rule (`### Topic list` + `topic-*.mdx`), "legacy five-file units are unchanged and not required to migrate", and the single sanctioned `sidebar_position` (`course-review.mdx` → `900`). **Do NOT bump `version`.** [FR-001, FR-002, FR-003, FR-007, FR-018]
- [x] T006 [P] `specs/content/style-guide.md`: add `## Answers and marking guidance policy` — the bounded-block rule verbatim (one canonical case-sensitive heading; `unit-assessment.mdx` / `course-review.mdx` only; the file's final `##` section; ≤ 1 per file), and how `scripts/check-no-answer-keys.mjs` implements it so authors do not trip. [FR-008, FR-009, FR-010, FR-011]
- [x] T007 [P] `specs/content/style-guide.md`: add `## Figure markers and manifests` — the marker grammar, `fig-U<n>-<seq>` IDs, the alt-text requirement (Art. III.8), the `specs/content/<course>/figures/unit-NN.md` manifest, `npm run check:figures`, "nothing renders yet". [FR-012, FR-013, FR-014]
- [x] T008 [P] `specs/content/style-guide.md`: extend `## Assessment blueprint defaults` (add the unit-end 10/10/5 bank + the per-topic cycle assessments) and `## What the depth gate checks vs. the human Content gate` (add automated rows — cycle-heading presence/order, per-topic formative/checklist counts, 10/10/5 counts, answers-block-is-final, figure↔manifest consistency — and human rows — topic grouping, figure-prompt aptness, rubric soundness, whether the hook lands); add a note to `## Answer-key marker patterns` pointing at the new policy section. [FR-005, FR-008, FR-013]
- [x] T009 [P] `contracts/unit-frontmatter.schema.json` (+ mirror to `specs/008-rich-unit-pedagogy/contracts/`): add optional `topic_no` (integer, `minimum: 1`) and `topic_label` (string, `minLength: 1`); keep the `not/anyOf` answer-key **key** ban unchanged; add a description note that both are required in practice on `topic-*.mdx` (enforced by `validate-content.mjs`). [FR-002, data-model §2]
- [x] T010 [P] Copy `specs/008-rich-unit-pedagogy/contracts/course-review.schema.json` to repo-root `contracts/course-review.schema.json` (the copy `validate-content.mjs` compiles). [FR-006]
- [x] T011 [P] Add a one-line "Extended by Spec 008 — see `specs/008-rich-unit-pedagogy/contracts/`" pointer at the top of `specs/007-content-depth-standard/contracts/content-spec-v2.md` and `.../coverage-matrix.md`. [FR-021, FR-025]
- [x] T012 `specs/006-content-pipeline/spec.md`: add a superseding note **under** the FR-004 folding table (do **not** delete FR-004) — the five-file rule remains the default and governs every non-opted-in unit; Spec 008 introduces the opt-in `index.mdx` + `topic-NN.mdx` + `unit-assessment.mdx` shape selected by `### Topic list` + `topic-*.mdx`; the folding table's guide-section→destination intent is preserved (strategies/practical → `unit-teacher-notes.mdx`; activities/formative/summative → the topic cycle; readings → per-topic `## Further reading`). Touch SC-005 / the Key Entities "Unit Spec" bullet only if they say "five files" literally. [FR-025]

**Checkpoint**: constitution v2.6.0 landed; style-guide sections drafted (version still `"2.0"`); all
contracts in place. User-story phases may begin.

---

## Phase 3: User Story 3 — Automated gates catch a structurally incomplete unit (Priority: P2)

**Goal**: the gate set enforces the new-shape standard, each failure naming the exact unmet
condition and file; the legacy path is byte-for-byte unchanged.

**Independent Test**: for each violation class, a fixture that breaks exactly one rule → the right
gate exits non-zero with a message naming the condition and the file; every pre-existing legacy
fixture still passes.

**Why first**: US1 (author the proving unit) cannot be verified without these gates; US5 (legacy
regression) is proven against them.

### Red-first tests (MUST fail before the matching implementation task)

- [x] T013 [P] [US3] `tests/unit/depth-gate.test.mjs`: extend `makeDepthFixture()` with `layout: 'topic'` (builds `index.mdx` + `## In this unit`, `topic-01/02.mdx` with the full nine-heading skeleton, `unit-assessment.mdx` with `## Unit summary` + 10/10/5 + `## Answers and marking guidance`, a content-spec with `### Sub-topic checklist` + `### Topic list` + a widened `**Depth budget**`, and a `coverage/unit-01.md` referencing the topic files). Add failing cases: happy new-shape path → exit 0; missing/misordered cycle heading → fail naming heading+topic; `## Check your understanding` with 2 items → fail; no `## Self-assessment checklist` → fail; `### Topic list` present but only 1 topic file on disk → fail (signal disagreement); `topic-03.mdx` on disk not in `### Topic list` → fail; a checklist ID assigned to no topic row → fail naming the ID; a checklist ID in two rows → fail naming the ID; `unit-assessment.mdx` missing → fail; MCQ count 9 / RRQ 11 / ERQ 4 → fail naming the count; a `##` heading after `## Answers and marking guidance` → fail; reading-minutes sum outside the band → fail; coverage row `File: topic-99.mdx` → fail; a `topic-NN.mdx` unreferenced by any coverage row → fail; a checklist ID whose only coverage row names a **different** `topic-NN.mdx` than its `### Topic list` assignment → fail naming the ID + both files; the 10/10/5 counter is **per-`###`-band** (an item count that is only wrong when summed file-wide still passes; a wrong per-band count fails). **Also assert the existing legacy fixture still passes.** [FR-020, FR-021, SC-004, SC-007]
- [x] T014 [P] [US3] `tests/unit/validate-layout.test.mjs` (new): legacy 5-file fixture passes; new-shape fixture (`index` + `topic-01` + `topic-02` + `unit-assessment`) passes; gap after `topic-01` (next is `topic-03`) fails naming the gap; a stray `formative.mdx` in a new-shape folder fails; `topic-02.mdx` with `topic_no: 3` fails; `topic-02.mdx` with no `topic_label` fails; `course-review.mdx` with a bad/missing `course_code` fails. [FR-018, FR-019]
- [x] T015 [P] [US3] `tests/unit/figures-gate.test.mjs` (new): legacy unit (no topic files) → skipped/exit 0; topic with no marker → fail naming the file; malformed id `fig-1-2` → fail; duplicate id across two topics → fail; marker absent from the manifest → fail; manifest row with no marker → fail; blank `alt` in a marker → fail; `Topic` mismatch between manifest and file → fail; happy path → exit 0. [FR-012, FR-013, FR-014]
- [x] T016 [P] [US3] `tests/unit/no-answer-keys.test.mjs` (new): `"correct answer"` in `topic-01.mdx` → fail; the same phrase inside the bounded block of `unit-assessment.mdx` → pass; the bounded block followed by a `## Notes` section → fail; `answer_key:` in `unit-assessment.mdx` front matter → fail; `## Answers and marking guidance (teachers)` does not open the exception (a later `correct answer` → fail); two canonical headings in one file → fail; a `course-review.mdx` bounded block → pass; a legacy `summative.mdx` containing "marking scheme" → fail (unchanged). [FR-008, FR-009, FR-010, SC-010]
- [x] T017 [P] [US3] `tests/unit/parity.test.mjs`: add a new-shape `translation_status: reviewed` fixture with matching EN/UR `topic-*.mdx` → passes; drop a UR heading in `topic-01` → fails at that heading index; missing UR `topic-02.mdx` → fails. [FR-028]

### Implementation

- [x] T018 [US3] Create `scripts/check-figures.mjs` — same skeleton as `scripts/check-unit-depth.mjs` (`CONTENT_ROOT` override, `gray-matter`, hand-rolled pipe-table parser, `errors[]`, per-unit non-zero exit). Walk `docs/` new-shape units; apply the FR-014 rules from `contracts/figures-manifest.md` (every topic ≥ 1 marker; well-formed unique IDs whose `U<n>` matches the folder; non-empty prompt/alt; manifest exists; marker set == manifest set both ways; each row's `Topic` == the `topic_label` of the file its marker sits in; no blank cells; `Status` in enum; for `reviewed` bilingual units the UR topic files carry the same marker IDs). Legacy units → skip, exit 0. **Greens T015.** [FR-012, FR-013, FR-014]
- [x] T019 [US3] `.github/workflows/ci.yml`: add a `Figure marker gate` step running `npm run check:figures` in the `build` job, **after** the Depth-gate step and **before** "Answer-key safety check". [FR-014]
- [x] T020 [US3] Rewrite `scripts/check-unit-depth.mjs`: replace module-level `UNIT_FILES`/`FOLDING_FILES` with a per-unit computed set; add `detectLayout(unitDir, sectionLines)` → `'legacy' | 'topic'` (both signals; a message-naming failure on disagreement or count mismatch) and `parseTopicList(sectionLines)`. Legacy path = the existing five 007 checks **byte-for-byte**. New-shape path = the ten checks of FR-020: topic-file set matches `### Topic list` + contiguous from `01`; checklist↔topic partition total + disjoint; nine cycle headings **in order** per topic; per-topic formative ≥ 3 and checklist ≥ 3 (**count numbered / `- [ ]` items only within each section — from its heading to the next `##`/`###`**, per `contracts/topic-cycle.md`); per-topic `## Further reading` ≥ 1; `index.mdx` `## In this unit` count == topic count; `unit-assessment.mdx` `## Unit summary` + **exact 10 / 10 / 5 counted per-`###`-band** (between each `### …questions …` heading and the next `##`/`###`; numbered lines under `## Answers and marking guidance` don't count — `contracts/end-of-unit-assessment.md`) + `## Answers and marking guidance` last; coverage `File` ∈ the new-shape set + every `topic-NN.mdx` referenced ≥ 1 + **for every checklist ID ≥ 1 coverage row names the exact `topic-NN.mdx` its `### Topic list` row assigns it to (hard failure otherwise — `contracts/coverage-matrix-v2.md`)**; reading-minutes sum across the new-shape set ∈ the `**Depth budget**` band. Every failure names the condition and the file. **Greens T013.** [FR-018, FR-020, FR-021]
- [x] T021 [US3] Rewrite `scripts/validate-content.mjs`: branch on `topicFiles = readdir(unitDir).filter(/^topic-(\d{2})\.mdx$/)` — empty → legacy path unchanged; non-empty → require `index.mdx` + `unit-assessment.mdx`, `topic-01 … topic-NN` contiguous, **forbid** `activities.mdx` / `formative.mdx` / `summative.mdx` / `teacher-notes.mdx` (rename hint `unit-teacher-notes.mdx`), `unit-teacher-notes.mdx` optional, `topic_no === NN` + `topic_label` present per topic file. Add `checkCourseReview(courseDir, courseCode)` mirroring `checkOverview` (compile `contracts/course-review.schema.json`, confirm `course_code` matches the folder). Change the EN↔UR structural-parity check in `validate-content.mjs` (the Spec 001 heading-vector parity gate) to iterate the dynamic union of EN+UR unit-folder `.mdx` names instead of `UNIT_FILES`; `coming_soon` / `translation_status: reviewed` / `bilingual:false` guards unchanged. **Greens T014, T017.** [FR-018, FR-019, FR-028]
- [x] T022 [US3] Rewrite `scripts/check-no-answer-keys.mjs`: split `PATTERNS` into `FRONT_MATTER_PATTERNS` (the 4 `^\s*<key>\s*:` regexes) and `PROSE_PATTERNS` (`answer key`, `marking scheme`, `correct answer`). Non-matching source files → scan whole file with all 7 (unchanged). Files whose path matches `/(?:^|\/)(unit-assessment|course-review)\.mdx$/` → find lines `=== '## Answers and marking guidance'` after `.trimEnd()`: `> 1` → error; `0` → whole-file scan; `1` at line *k* → error if any `^##\s` after *k*, else scan `[0,k)` with all 7 and `[k,EOF)` with `FRONT_MATTER_PATTERNS` only. For `build/` HTML, suppress only `PROSE_PATTERNS` for routes whose last segment before `index.html` is `unit-assessment` / `course-review` (and `/ur/` mirrors). `EXCLUDE` (`style-guide.md`) unchanged; the JSON-Schema key ban is **not** relaxed. **Greens T016.** [FR-008, FR-009, FR-010, SC-010]
- [x] T023 [P] [US3] `scripts/build-content-index.mjs`: for a new-shape unit, index each `topic-*.mdx` (`kind: 'topic'`) and `unit-assessment.mdx` (`kind: 'assessment'`); at course level index `course-review.mdx` (`kind: 'course-review'`). Legacy `KIND_FILES` path unchanged. Update any search-e2e doc-count fixture expectation. [FR-019]
- [x] T024 [US3] `src/theme/DocItem/Footer.tsx`: in `deriveSourceKindFromPath`, a path tail matching `^topic-\d+$` or equal to `unit-assessment` / `course-review` returns `null` (no per-activity feedback control on these pages). "Suggest improvement" and "Mark as studied" keep working (both read `course_code` [+ `unit_no`], present on all new files). [FR-019, research D6]

**Checkpoint (US3)**: `npx vitest run tests/unit/depth-gate.test.mjs tests/unit/validate-layout.test.mjs tests/unit/figures-gate.test.mjs tests/unit/no-answer-keys.test.mjs tests/unit/parity.test.mjs` — every new case green, every pre-existing case green.

---

## Phase 4: User Story 5 — Legacy units keep working untouched (Priority: P3)

**Goal**: every legacy course/unit and `check:add-course` stay green on this branch with **zero
changes to any legacy unit file**.

**Independent Test**: run the full gate set + `check:add-course` against every legacy course; all
green; `git diff` shows no change to any `docs/` or `i18n/` legacy unit file or legacy content-spec.

**Why here**: this is the regression floor for the T020–T023 rewrites; run it the moment they land,
not at the end.

- [x] T025 [US5] Run `npm run validate:content && npm run check:pipeline-gate && npm run check:depth-gate && npm run check:figures && npm run check:no-answer-keys && npm run check:add-course && npm test` against the repo as-is. Confirm green for EFMP-301, GENG-300 (`bilingual:false`), EFMP-302 U2–U6, gict-300, gnas-301, gqur-300, and the `ZZZ-999` scaffold. Fix any legacy-path regression introduced in T020–T023 until green. [SC-007, FR-019]
- [x] T026 [US5] Confirm `git diff --stat` touches no `docs/…` / `i18n/…` legacy unit file and no legacy `content-spec.md`; only `scripts/`, `tests/`, `contracts/`, `specs/00{6,7,8}/`, `.github/`, `package.json`, `.claude/`, `CLAUDE.md`, `.specify/`, `README.md`, `history/`. Record the regression-floor result in the PHR (T061). [SC-007]

**Checkpoint (US5)**: legacy layout provably byte-for-byte; the new gates are additive only.

> **Regression-floor result (2026-08-29, this session).** ✅ All seven commands green against the
> repo as-is (96/96 vitest, was 45/45). `static/content-index.json` regenerates byte-identical
> (33 records — no new-shape unit exists yet). `git diff` touches **no** `docs/…` / `i18n/…`
> file and **no** legacy `content-spec.md`. Files changed: `scripts/`, `tests/`, `contracts/`,
> `specs/00{6,7,8}/`, `specs/content/style-guide.md`, `.github/workflows/ci.yml`, `package.json`,
> `.claude/skills/author-unit/`, and `src/theme/DocItem/Footer.tsx` (the one sanctioned swizzle
> tweak — T024; the T026 allowlist above omits `src/` but plan.md Technical Context names it).

---

## Phase 5: User Story 2 — Declare EFMP-302 Unit 1's topic partition (Priority: P2)

**Goal**: the course content-spec declares Unit 1's 4-topic partition + budgets; the depth gate now
treats Unit 1 as new-shape; a partition that leaves a checklist sub-topic unassigned (or assigns one
twice) fails with the sub-topic named.

**Independent Test**: add the `### Topic list`; the depth gate switches Unit 1 to the new-shape path;
omit a checklist ID → fail naming it; assign one to two rows → fail naming it; a legacy unit with no
partition is still legacy.

**Why here**: US1's draft is checked against this declaration; it must exist first.

- [x] T027 [US2] `specs/content/efmp-302/content-spec.md`, `## Unit 1`: added `### Topic list` (1.1 → U1-01…U1-04, 1.2 → U1-05…U1-06, 1.3 → U1-07…U1-10, 1.4 → U1-11…U1-14), a `Topic` column on `### Sub-topic checklist`, re-baselined `**Depth budget**` to `14 sub-topics; 4 topics; 90–160 reading-min` (provisional; T049 finalises), `**Figure plan**` (fig-U1-1…fig-U1-4) and `**Unit-end assessment blueprint**` (10/10/5 + Bloom spread + per-band sub-topic targets). Per `contracts/content-spec-v3.md`. [FR-015, FR-016]
- [x] T028 [P] [US2] `specs/content/efmp-302/content-spec.md`: added the course-level `## Course review plan` section (5 course-summary through-lines, practice-question mix ~15/10/5, 5 practicum project-idea briefs) per `contracts/content-spec-v3.md`. Seeds a future `course-review.mdx` (not authored here — FR-029). [FR-016]
- [x] T029 [US2] `content-spec.md` front matter stays `status: approved`. **G1 re-affirmed for the v3.0 topic-partition expansion by the curriculum owner (YM) alongside the T055 Content-gate pass, 2026-08-30** — recorded in the `specs/content/efmp-302/tasks.md` prose block. [FR-017]
- [x] T030 [US2] Partition invariant verified. The "no topic files yet" half-signal makes `check:depth-gate` fail loudly for EFMP-302 Unit 1 right now (confirmed on the real repo — by design until T038–T044). The "checklist ID assigned to zero / two topic rows → fail naming the ID" behaviour is proven by `tests/unit/depth-gate.test.mjs` new-shape cases ("assigned to no topic row" / "assigned to two topic rows"). [SC-001, SC-004]

**Checkpoint (US2)**: EFMP-302 Unit 1 is in new-shape scope; the partition is total and disjoint.

---

## Phase 6: User Story 1 — Author EFMP-302 Unit 1 as nested per-topic cycles (Priority: P1) 🎯 MVP

**Goal**: the rewritten `author-unit` skill produces the new-shape Unit 1 (English); every
English-side gate is green with committed coverage/sources/figures; the register holds; the
Urdu-mirror handoff is done.

**Independent Test**: run the skill against the declared partition; the produced files pass
`validate:content`, `check:depth-gate`, `check:figures`, `check:no-answer-keys` and `npm test`, with
the three governance artefacts committed and the unit total inside the budget band.

### Skill rewrite

- [x] T031 [US1] Rewrite `.claude/skills/author-unit/SKILL.md`: new triggers ("restructure a unit", "re-draft to the per-topic standard", "…up to the unit structure standard / v3.0 style guide"); Step 1 gather + verify sources per topic (never fabricate a citation/DOI); Step 2 per-topic backward design (enduring understandings → the topic's `## Check your understanding` + `## Summative task` → a Bloom mini-table over that topic's sub-topic IDs) + plan the unit-end 10/10/5 bank; Step 3 draft `index.mdx` opening / each `topic-NN.mdx` to `contracts/topic-cycle.md` with ≥ 1 FIGURE marker / `unit-assessment.mdx` with `## Answers and marking guidance` last / optional `unit-teacher-notes.mdx`, recompute every `est_reading_minutes`, register unchanged; Step 4 emit `coverage/unit-NN.md` (v2), `sources/unit-NN.md`, `figures/unit-NN.md`, then run `validate:content && check:depth-gate && check:figures && check:no-answer-keys && test`. Rewrite the re-draft handoff for the new file set. Keep "one skill, no sub-agent". [FR-022]
- [x] T032 [P] [US1] Fill `.claude/skills/author-unit/references/structure-standard.md` (renamed in T003 — until this task lands it still holds the old v2.0 depth-standard content, so **land T032 with or immediately after T031**): the per-topic model, the nine-part skeleton, every gate rule (cycle headings + order, per-topic counts scoped per section, the 10/10/5 per-band counts, the answers-block delimiter, the reading-minutes band, coverage↔sources↔figures consistency, the coverage↔`### Topic list` cross-check), and the reciprocal "keep in sync with `specs/content/style-guide.md` `## Unit structure standard`" directive. [FR-022, FR-023]
- [x] T033 [P] [US1] Expand `.claude/skills/author-unit/references/pedagogy-checklist.md` for the nine parts (real-life hook selection; worked-example effect + cognitive-load management in `## Explanation`; collaborative structures for `## Activity`; retrieval-practice design for `## Check your understanding`; metacognition for `## Self-assessment checklist`; transfer-task design for `## Try this at your practicum school`; constructive alignment for `## Summative task`). [FR-022]
- [x] T034 [P] [US1] Create `.claude/skills/author-unit/references/item-writing.md`: MCQ rules (single best answer, plausible distractors, no "all/none of the above", Bloom targeting); RRQ design (bounded scope, model answer + mark scheme); ERQ design (analytic rubric, ≥ 1 Analyze+); the unit-end 10/10/5 blueprint and how to spread it across the unit's sub-topics. [FR-022, FR-005]
- [x] T035 [P] [US1] Create `.claude/skills/author-unit/references/answers-block-formatting.md`: the exact `## Answers and marking guidance` delimiter rule; what may / may not appear (prose keys/rubrics yes, front-matter keys never); how the `check:no-answer-keys` bounded exception works so authors do not trip it. [FR-022, FR-008]
- [x] T036 [P] [US1] Create `.claude/skills/author-unit/references/figure-prompts.md`: how to write a generation prompt (subject; "clean flat vector, labelled, high contrast, no colour-only meaning"; aspect); the `fig-U<n>-<seq>` ID scheme; alt-text rules (Art. III.8); the manifest row format; "nothing renders yet". [FR-022, FR-012, FR-014]
- [x] T037 [P] [US1] Update `.claude/skills/author-unit/references/citation-and-register.md`: note that per-topic `## Further reading` replaces the single unit-level list; register rules otherwise unchanged. [FR-022, FR-007]

### Proving-unit draft (`docs/semester-1/efmp-302/unit-01/`)

- [x] T038 [US1] Rewrite `index.mdx` as the unit opening: `## Unit learning outcomes`, `## Prerequisite knowledge`, `## In this unit` (ordered list of 4 links `./topic-01`…`./topic-04`), `## How to use this unit`; keep `<TranslationStatusBadge status="draft" />`, drop the exposition body. [FR-003]
- [x] T039 [P] [US1] Create `topic-01.mdx` (Topic 1.1 "What makes teaching a profession", U1-01…U1-04): the nine-part cycle per `contracts/topic-cycle.md`; ~one Pakistan/Sindh example per sub-topic; paraphrase-and-cite the mapped readings in `## Explanation`; ≥ 1 marker `{/* FIGURE[fig-U1-1]: …; alt: … */}` (four-features comparison table). [FR-002, FR-004, FR-007, FR-012]
- [x] T040 [P] [US1] Create `topic-02.mdx` (Topic 1.2 "From an industrial model to inquiry-based teaching", U1-05…U1-06): the nine-part cycle; marker `fig-U1-2` ("one lesson, two ways" split panel). [FR-002, FR-004, FR-007, FR-012]
- [x] T041 [P] [US1] Create `topic-03.mdx` (Topic 1.3 "The four dimensions of teacher professionalism", U1-07…U1-10): the nine-part cycle; marker `fig-U1-3` (accountability / autonomy / collegiality triangle); fold the current `summative.mdx` "analyse a described teacher's practice" task in as this topic's `## Summative task`. [FR-002, FR-004, FR-007, FR-012]
- [x] T042 [P] [US1] Create `topic-04.mdx` (Topic 1.4 "Becoming a teacher: developing your identity", U1-11…U1-14): the nine-part cycle; marker `fig-U1-4` (identity-shaping influences web). [FR-002, FR-004, FR-007, FR-012]
- [x] T043 [US1] Create `unit-assessment.mdx`: `## Unit summary` (built from the current `## Key ideas in this unit`); `## Summative assessment` with `### Multiple-choice questions (MCQs)` (10), `### Restricted-response questions (RRQs)` (10), `### Extended-response questions (ERQs)` (5), every item Bloom-tagged; `## Answers and marking guidance` as the final `##` section (MCQ key + one-line justifications; RRQ model answers + mark schemes; ERQ analytic rubrics, ≥ 1 Analyze+). Per `contracts/end-of-unit-assessment.md`. [FR-005, FR-008]
- [x] T044 [US1] Create `unit-teacher-notes.mdx` from the current `teacher-notes.mdx` content (teaching strategies, likely misconceptions, practical work; no assessment items); then delete `activities.mdx`, `formative.mdx`, `summative.mdx`, `teacher-notes.mdx`. [FR-001, FR-025]
- [x] T045 [US1] Add `<PrintHandout />` at the top of each `topic-01.mdx`…`topic-04.mdx` and `unit-assessment.mdx`; `index.mdx` keeps only `<TranslationStatusBadge>`. No `src/css/custom.css` change. [FR-019, research D6]

### Governance artefacts + tuning

- [x] T046 [US1] Rewrite `specs/content/efmp-302/coverage/unit-01.md` to v2 (`contracts/coverage-matrix-v2.md`): `File` ∈ `{index.mdx, topic-01.mdx…topic-04.mdx, unit-assessment.mdx, unit-teacher-notes.mdx}`; `Section` = the exact heading (normally a `###` under each topic's `## Explanation`); every `U1-01`…`U1-14` mapped; every `topic-NN.mdx` referenced by ≥ 1 row. [FR-021, SC-001]
- [x] T047 [US1] Update `specs/content/efmp-302/sources/unit-01.md`: keep the 7 keys (`carr2000, demirkasimoglu2010, hargreaves2000, hurst2009, beijaard2004, brookfield2017, suarez2022`); ensure each is cited in some topic's `## Further reading`; coverage↔sources mutually consistent. Confirm ≥ 3 distinct scholarly sources are actually cited in prose. [FR-021, SC-002]
- [x] T048 [US1] Create `specs/content/efmp-302/figures/unit-01.md` (`contracts/figures-manifest.md`): one row per FIGURE marker (`fig-U1-1`…`fig-U1-4`), `Topic` = the marker's file `topic_label`, `Prompt`/`Alt text` matching the markers, `Status` = `prompt-only`. [FR-013, SC-008]
- [x] T049 [US1] Recompute `est_reading_minutes` on `index.mdx` + `topic-01…04.mdx` + `unit-assessment.mdx` + `unit-teacher-notes.mdx` (~180–200 wpm); set the final `**Depth budget**` `A–B` band in `specs/content/efmp-302/content-spec.md` `## Unit 1` from the actual total (expect ~100–150). [FR-016]

### Gate green + Urdu handoff

- [x] T050 [US1] Run `npm run validate:content && npm run check:depth-gate && npm run check:figures && npm run check:no-answer-keys && npm test` against the re-restructured unit; fix every finding. Leave EFMP-302 Unit 1 `G2 en-draft` / `G3 en-review` at `▣` (re-opened from `✅`); `check:pipeline-gate` is expected **red** for Unit 1 until T055. [SC-003, SC-004]
- [x] T051 [US1] `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/`: delete orphan UR `activities.mdx` / `formative.mdx` / `summative.mdx`; rewrite UR `index.mdx` to the new opening skeleton; `git mv` UR `teacher-notes.mdx` → `unit-teacher-notes.mdx`; add UR `topic-01.mdx`…`topic-04.mdx` + `unit-assessment.mdx` as **heading-only skeleton stubs** mirroring the EN heading vectors, all `translation_status: draft`, each carrying the **same** FIGURE marker IDs as its EN counterpart; set `<TranslationStatusBadge status="draft" />`. Parity gate skips `draft`; the `ur` route falls back to EN behind the FR-003 banner. [FR-028]
- [x] T052 [US1] `specs/content/efmp-302/tasks.md`: re-open `Unit 1 | G2 en-draft` / `G3 en-review` to `▣`; add a prose note that `G4 ur-translation` / `G5 ur-review` scope changed to the per-topic layout (rows already `▢` from Spec 007). **⚠️ Do NOT merge the branch from this point until T055 passes** — `check:pipeline-gate` is red for Unit 1 by design in this window (the Spec 007 merge-gate lesson). [FR-028]

**Checkpoint (US1 / MVP)**: EFMP-302 Unit 1 is a gate-passing new-shape unit in English with all
three governance artefacts committed; the Urdu mirror is handed off.

---

## Phase 7: User Story 4 — Self-learner works the assessment banks with answers (Priority: P3)

**Goal**: the end-of-unit bank + its bounded answers section render as ordinary content in the built
site; the built-site answer scan finds answer material only inside the bounded sections.

**Independent Test**: `npm run build`; open the built `unit-assessment` page — 10/10/5 questions +
one final answers section; `npm run check:no-answer-keys` over `build/` → clean; a raw grep of
`build/` for "correct answer" hits only routes ending `unit-assessment/` or `course-review/`.

- [x] T053 [US4] `npm run build` (en + ur); then `npm run check:no-answer-keys` over the `build/` output → passes (answer material only under the two bounded route names). [SC-010, FR-010]
- [x] T054 [US4] Build spot-check (`npm run serve`): the EFMP-302 Unit 1 sidebar shows `index → topic-01 … topic-04 → unit-assessment → unit-teacher-notes` in order; each `topic-*` page and the assessment page render a Print button; the `## Answers and marking guidance` section renders as normal content; `/ur/` Unit 1 falls back to English behind the "translation in progress" banner. [FR-005, FR-028, SC-003]

**Checkpoint (US4)**: readers get a working self-check; nothing leaked outside the bounded sections.

---

## Phase 8: Polish & Cross-Cutting Concerns

- [x] T055 **Content gate PASSED — curriculum owner YM, 2026-08-30.** Reviewed the re-restructured EFMP-302 Unit 1 (register / undefined-term check; example aptness + Pakistan-grounding; source relevance; topic-grouping quality; figure-prompt aptness; rubric soundness; whether the hooks land). `G2 en-draft` / `G3 en-review` set to `✅ YM` in `specs/content/efmp-302/tasks.md`; `check:pipeline-gate` is green for Unit 1; merge freeze lifted. [SC-003, SC-005, Constitution Art. VII]
- [x] T056 [P] `specs/content/style-guide.md`: bump front-matter `version: "2.0"` → `"3.0"`. **LAST content task — only after T055.** [FR-026, SC-006]
- [x] T057 [P] `README.md`: add a "Unit structure standard" contributor section — the per-topic model, `topic-*.mdx` / `unit-assessment.mdx` / `course-review.mdx`, `npm run check:figures`, the answers-and-marking-guidance policy, the `specs/content/<course>/figures/` manifest, and the `structure-standard.md` ↔ `style-guide.md` sync rule. [FR-027, Constitution Art. X.2]
- [x] T058 [P] **Replace** (do not duplicate) the existing golden-unit pending note so EFMP-301 Unit 1's target is v3.0, not the never-started v2.0 (see G3 — the v2.5.0 v2.0 obligation is superseded, owner-acknowledged): in `specs/content/efmp-301/content-spec.md` rewrite the `> **Pending: Unit 1 v2.0 depth-standard re-proof.**` block (currently lines ~8–17) as `> **Pending: Unit 1 v3.0 per-topic re-proof.**` — Constitution Art. VI.1 makes this the immediate-next content task after Spec 008's proving unit (EFMP-302 Unit 1); when scheduled, on its own branch, add a `### Sub-topic checklist` + `### Topic list` + `**Depth budget**` to the Unit 1 subsection, restructure to the per-topic layout (`index.mdx` + `topic-NN.mdx` + `unit-assessment.mdx`), emit `coverage/unit-01.md` (v2) + `sources/unit-01.md` + `figures/unit-01.md`, then create the `G1`–`G7` rows in `specs/content/efmp-301/tasks.md` **at that point (not before** — a `▢` row would flip the published Unit 1 to "not done" in `check-pipeline-gate.mjs` and break the deploy cron); until then EFMP-302 Unit 1 is the working exemplar. Update the matching `specs/backlog.md` bullet ("EFMP-301 Unit 1 **v2.0** …" → "**v3.0 per-topic** …") in the same edit. Confirm `check:pipeline-gate` stays green for EFMP-301. [Constitution Art. VI.1, plan Risk 1]
- [x] T059 [P] Reconcile any implementation drift (final heading text, ID grammar, parser tolerances) back into `specs/008-rich-unit-pedagogy/plan.md`, `data-model.md`, and `contracts/` (Constitution Art. IV.4). [FR-029]
- [x] T062 [P] **SC-009 check** (may run any time after T037 + T027; slot it here alongside the human gate). Dry-run the rewritten `author-unit` skill's Steps 1–3 against **one topic of the EFMP-302 Unit 1 `### Topic list`** (e.g. Topic 1.2) — starting from only `specs/content/efmp-302/content-spec.md` + `contracts/topic-cycle.md`, in a fresh context — and confirm it produces the full nine-part structure with **zero** clarifying questions about *what structure to output*. Record the result (pass = SC-009 met). If it asks a structure question, tighten `## Unit structure standard` (T005) / `structure-standard.md` (T032) until it does not. [SC-009]
- [x] T060 Final full verification: `npm run validate:content && npm run check:pipeline-gate && npm run check:depth-gate && npm run check:figures && npm run check:no-answer-keys && npm run check:add-course && npm test && npm run build && npm run check:no-answer-keys` (last one over `build/`) — all green; the legacy regression floor (SC-007) and the proving unit (SC-003) both pass. [SC-003, SC-007, SC-010]
- [x] T061 [P] Write the `/sp.tasks` + `/sp.implement` PHRs under `history/prompts/008-rich-unit-pedagogy/` (embed the regression-floor result from T026 and the final verification from T060). [FR-029, Constitution — PHR discipline]

---

## Dependencies & completion order

```
Phase 1 (Setup)  ──►  Phase 2 (Foundational)  ──►  story phases
                        └─ T004 (constitution) ✅ DONE — unblocked T005–T062
                        └─ T005–T012 [P] after T004

Phase 3 (US3 — gates)         needs Phase 2
  T013–T017 [P] (red)  ──►  T018 ─► T019
                            T020, T021, T022 (each greens its red tests; T020/T021/T022 share no file → [P]-capable but all touch gate behaviour: run T020→T021→T022 sequentially to keep the regression floor legible)
                            T023 [P], T024 [P]
Phase 4 (US5 — regression)    needs T018–T024
Phase 5 (US2 — partition)     needs Phase 2 + T020 (new-shape depth-gate path)
Phase 6 (US1 — author)        needs Phase 5 + T031–T037 (skill) + T018/T020/T021/T022 (gates)
  T031 ─► T032–T037 [P]
  T038 ─► T039–T042 [P] ─► T043 ─► T044 ─► T045
  T046, T047, T048 ─► T049 ─► T050 ─► T051 ─► T052 (merge-freeze starts)
Phase 7 (US4 — built site)    needs T050 (+ ideally T052)
Phase 8 (Polish)             T055 (human gate) unblocks merge ─► T056 (v3.0 bump) ─► T057–T059 [P] ─► T060 ─► T061
                             T062 (SC-009 dry-run) [P] — any time after T037 + T027
```

**Merge-freeze window**: from **T052** to **T055** the branch must not be merged (`check:pipeline-gate`
is intentionally red for EFMP-302 Unit 1).

## Parallel execution examples

- **Phase 2 after T004**: T005, T006, T007, T008 (all `style-guide.md` — same file, so run
  sequentially), T009, T010, T011 in parallel; T012 independent.
- **Phase 3 red tests**: T013–T017 all in parallel (five separate test files).
- **Phase 6 skill references**: T032, T033, T034, T035, T036, T037 in parallel (six separate files)
  once T031 lands.
- **Phase 6 topic drafts**: T039, T040, T041, T042 in parallel (four separate files) once T038 lands.
- **Phase 8**: T056, T057, T058, T059 in parallel once T055 passes.

## Implementation strategy

- **MVP = Phases 1 → 6** (Setup + Foundational + US3 gates + US5 regression + US2 partition + US1
  author). At the end of Phase 6 the feature's Definition of Done (FR-029) is met in substance:
  EFMP-302 Unit 1 is a gate-passing new-shape English unit with committed artefacts and the Urdu
  handoff. Phases 7–8 are verification, the human gate, the version freeze, and docs.
- **Incremental checkpoints**: US3 checkpoint (gates + tests green) → US5 checkpoint (legacy
  byte-for-byte) → US2 checkpoint (partition total/disjoint) → US1/MVP checkpoint (proving unit
  green) → US4 checkpoint (built site clean) → T055 (human gate) → T056 (v3.0).
- **Do not** start any content authoring (Phase 5+) before the gates (Phase 3) and the legacy
  regression floor (Phase 4) are green — a broken gate would give false confidence in the draft.

## Out of scope (explicit follow-ups, not tasks — FR-029)

- Restructuring EFMP-302 Units 2–6, or any unit of any other course.
- The EFMP-301 golden-unit re-proof at v3.0 (T058 records the obligation as a prose note only).
- Authoring EFMP-302's actual `course-review.mdx` (T028 seeds the plan; the page is authored when
  the course is fully restructured).
- The proving unit's Urdu re-translation / re-review (T051 is the handoff only).
- Image generation / optimisation / rendering.
- A dedicated `'topic'` teaching-log feedback kind and its Supabase migration.
- Any intermediate sidebar grouping for a unit's topic files.
