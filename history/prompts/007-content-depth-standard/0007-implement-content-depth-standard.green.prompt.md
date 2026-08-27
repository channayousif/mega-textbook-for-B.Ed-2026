---
id: 0007
title: Implement content depth standard
stage: green
date: 2026-08-27
surface: agent
model: claude-sonnet-5
feature: 007-content-depth-standard
branch: 007-content-depth-standard
user: channayousif@gmail.com
command: /sp.implement
labels: [content-pipeline, depth-standard, authoring-skill, ci-gate, implementation]
links:
  spec: specs/007-content-depth-standard/spec.md
  ticket: null
  adr: history/adr/0010-content-depth-standard-and-reusable-unit-authoring-skill.md
  pr: null
files:
 - package.json
 - contracts/style-guide-frontmatter.schema.json
 - specs/content/style-guide.md
 - .claude/skills/author-unit/SKILL.md
 - .claude/skills/author-unit/references/depth-standard.md
 - .claude/skills/author-unit/references/pedagogy-checklist.md
 - .claude/skills/author-unit/references/citation-and-register.md
 - scripts/check-unit-depth.mjs
 - tests/unit/depth-gate.test.mjs
 - .github/workflows/ci.yml
 - specs/content/efmp-302/content-spec.md
 - specs/content/efmp-302/coverage/unit-01.md
 - specs/content/efmp-302/sources/unit-01.md
 - specs/content/efmp-302/tasks.md
 - docs/semester-1/efmp-302/unit-01/index.mdx
 - docs/semester-1/efmp-302/unit-01/activities.mdx
 - docs/semester-1/efmp-302/unit-01/formative.mdx
 - docs/semester-1/efmp-302/unit-01/summative.mdx
 - docs/semester-1/efmp-302/unit-01/teacher-notes.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/*.mdx
 - specs/content/efmp-301/content-spec.md
 - specs/backlog.md
 - README.md
 - specs/007-content-depth-standard/quickstart.md
 - specs/007-content-depth-standard/contracts/coverage-matrix.md
tests:
 - tests/unit/depth-gate.test.mjs (17 cases, red-first then green)
 - full suite: npx vitest run → 45/45 pass
---

## Prompt

/sp.implement (no additional argument text) — execute tasks.md for feature
007-content-depth-standard.

## Response snapshot

Checklist gate: `requirements.md` 16/16 → PASS, proceeded.

**37 of 41 tasks completed.** The 4 open are human-gated and cannot be done by an
implementation agent: T013 + T036 (curriculum-owner Content-gate review), and T032 + T033
(the v2.0 freeze, explicitly gated on T036 by FR-014).

- **Phase 1 (T001–T003)** — `package.json` `check:depth-gate` alias; new dirs; schema
  `description` note (`version` pattern already admits `"2.0"`).
- **Phase 2 (T004–T006)** — `specs/content/style-guide.md` gained `## Unit depth standard`
  (concept-coverage hard rule, both required index blocks, formative ≥5-numbered floor,
  ±25% depth-budget band guidance, register-ceiling restatement) and `## What the depth gate
  checks vs. the human Content gate` (FR-013 table). `version` **left at `"1.0"`** (T032).
  `.claude/skills/author-unit/references/depth-standard.md` + a two-way sync note in both files.
- **Phase 3 US2 (T007–T012)** — `specs/content/efmp-302/content-spec.md` expanded: Course
  Description, Reading list (12 guide readings w/ APA + DOI, unit-tagged; + 2
  curated-supplementary), Week schedule, Standards anchors. Unit 1 subsection gained the
  14-row `### Sub-topic checklist` (guide 1.1–1.4 leaf bullets, IDs U1-01…U1-14),
  `**Depth budget**: 14 sub-topics; 45–70 reading-min`, prerequisites, misconceptions, mapped
  readings, worked-examples plan, best-practice notes. `status: approved` unchanged. T013
  (owner review) pending.
- **Phase 4 US1 (T014–T026)** — wrote the `author-unit` skill (`SKILL.md` + 3 references;
  now auto-registered). Re-drafted all five EN files of `docs/semester-1/efmp-302/unit-01/` to
  the depth standard: one named subsection per checklist sub-topic, ~1 Pakistan-grounded
  example each, paraphrase-and-cite of the mapped readings, `## Common misconceptions` +
  `## Further reading` in `index.mdx`, formative = 8 numbered items, summative = rubric +
  Analyze task, recomputed `est_reading_minutes` (unit total 65, band 45–70). Emitted
  `coverage/unit-01.md` (14/14 IDs mapped + a non-required reinforcement table) and
  `sources/unit-01.md` (7 guide-required scholarly sources — SC-002, up from 0). Urdu handoff:
  five UR files `translation_status: reviewed → draft` + badge; `efmp-302/tasks.md` Unit 1
  G2/G3 → `▣`, G4/G5 → `▢` with an explanatory note.
- **Phase 5 US3 (T027–T031)** — `tests/unit/depth-gate.test.mjs` written first (17 cases,
  all failed with no script), then `scripts/check-unit-depth.mjs` implemented (copied
  `check-pipeline-gate.mjs` shape; 6-step algorithm; in-scope iff `### Sub-topic checklist`
  present; required-blocks check fails if **either** block missing; every failure names the
  condition). `npm test` 45/45 green. CI step added to `ci.yml` `build` job after "Pipeline
  gate". T031 structural suite (validate:content, check:depth-gate, check:no-answer-keys,
  npm test) all green against the real re-drafted unit.
- **Phase 7 US5 (T034, T034a, T035)** — pending-re-proof prose note in
  `efmp-301/content-spec.md` + `specs/backlog.md` (no `▢` tracker rows — would regress
  `check-pipeline-gate` for the published EFMP-301 U1); `check:pipeline-gate` confirmed still
  clean for EFMP-301; adoption instruction is in the style-guide `## Unit depth standard`
  blockquote.
- **Phase 8 Polish (T037–T040)** — `README.md` gained a "Content depth standard" section +
  `check:depth-gate` in the commands list and contribution-flow CI list; sync note verified in
  both files; quickstart "Implementation results" note appended; `coverage-matrix.md` contract
  gained an implementation note (the gate parses every table in the file, not just the first).

**Gate status now:** `validate:content` ✓ · `check:depth-gate` ✓ · `check:no-answer-keys` ✓ ·
`check:add-course` ✓ · `npm test` 45/45 ✓ · `build:content-index` ✓ (33 records).
`check:pipeline-gate` is **intentionally RED** for EFMP-302 Unit 1 (`G2/G3` = `▣`) — the
documented merge gate; T036 flips them to `✅` and it goes green.

## Outcome

- ✅ Impact: the depth standard, its CI gate, the `author-unit` skill, and a proving-unit
  re-draft (EFMP-302 Unit 1 — 14/14 concept coverage, 7 cited sources vs 0 before) are all in
  place and machine-verified. Feature is code-complete pending the human Content gate.
- 🧪 Tests: `tests/unit/depth-gate.test.mjs` 17/17; full suite 45/45.
- 📁 Files: 20 modified + 10 new (see list). No `src/` app code, no dependency, no DB.
- 🔁 Next: curriculum owner runs T013 + T036 (Content-gate review of the re-drafted unit and
  the expanded content-spec) → then T032/T033 set `style-guide.md` `version: "2.0"` and
  T036 sets the `efmp-302/tasks.md` G2/G3 rows to `✅`, turning `check:pipeline-gate` green.
  Do not merge before that. Downstream (backlog): EFMP-301 U1 v2.0 re-proof; EFMP-302 U1 Urdu
  re-translation; EFMP-302 Units 2–6.
- 🧠 Reflection: the parity gate self-skipping on `translation_status: draft` is what makes
  the "EN re-draft now, Urdu later" handoff actually work without a validator change — worth
  noting for the next unit re-draft.

## Evaluation notes (flywheel)

- Failure modes observed: none in implementation. The one design subtlety — a full EN re-draft
  desynchronises the reviewed Urdu mirror's heading structure — is handled by Spec 001's
  parity gate only running for `translation_status: reviewed` units, so setting the EN file to
  `draft` disengages it cleanly.
- Graders run and results: depth-gate fixtures 17/17 PASS; full unit suite 45/45 PASS;
  content-shape + answer-key + add-course gates PASS; pipeline-gate RED-by-design on
  EFMP-302 U1 pending T036.
- Prompt variant: n/a
- Next experiment: have the curriculum owner run T036 against the re-drafted unit and capture
  where the automated depth gate's "green" diverged from their judgement (padding? example
  aptness? register?) — that delta is the signal for tuning the `## Unit depth standard` text.
