---
id: 0007
title: Implement 008 — gates, skill rewrite, proving unit
stage: green
date: 2026-08-30
surface: agent
model: claude-sonnet-5
feature: 008-rich-unit-pedagogy
branch: 008-rich-unit-pedagogy
user: channayousif@gmail.com
command: /sp.implement
labels: ["content-pipeline", "gates", "tdd", "author-unit-skill", "efmp-302", "per-topic-layout"]
links:
  spec: specs/008-rich-unit-pedagogy/spec.md
  ticket: null
  adr: history/adr/0011-nested-per-topic-unit-pedagogy-bounded-answer-keys-and-figure-markers.md
  pr: null
files:
  - package.json (+check:figures alias)
  - .github/workflows/ci.yml (+Figure marker gate step)
  - contracts/unit-frontmatter.schema.json (+topic_no, topic_label) + 008 mirror
  - contracts/style-guide-frontmatter.schema.json (+006 mirror) — v3.0 freeze-marker note
  - contracts/course-review.schema.json (new, copied from 008/contracts/)
  - scripts/check-figures.mjs (new)
  - scripts/check-unit-depth.mjs (rewritten — legacy byte-for-byte + new-shape path)
  - scripts/validate-content.mjs (rewritten — legacy/new-shape branch, checkCourseReview, dynamic parity)
  - scripts/check-no-answer-keys.mjs (rewritten — bounded answers exception)
  - scripts/build-content-index.mjs (topic/assessment/course-review kinds)
  - src/theme/DocItem/Footer.tsx (deriveSourceKindFromPath — null for topic/unit-assessment/course-review)
  - tests/unit/depth-gate.test.mjs (+20 new-shape cases)
  - tests/unit/parity.test.mjs (+3 per-topic cases)
  - tests/unit/figures-gate.test.mjs (new, 11 cases)
  - tests/unit/validate-layout.test.mjs (new, 9 cases)
  - tests/unit/no-answer-keys.test.mjs (new, 8 cases)
  - .claude/skills/author-unit/SKILL.md + references/{structure-standard,pedagogy-checklist,item-writing,answers-block-formatting,figure-prompts,citation-and-register}.md
  - specs/content/style-guide.md (+3 sections, +assessment/gate-table extensions; version still 2.0)
  - specs/content/efmp-302/content-spec.md (Unit 1 v3 expansion + course review plan)
  - specs/content/efmp-302/{coverage,sources,figures}/unit-01.md
  - specs/content/efmp-302/tasks.md (G2/G3 re-opened; merge-freeze note)
  - docs/semester-1/efmp-302/unit-01/{index,topic-01..04,unit-assessment,unit-teacher-notes}.mdx (+4 legacy files deleted)
  - i18n/ur/.../efmp-302/unit-01/ (orphans deleted, teacher-notes renamed, 5 draft skeleton stubs added)
  - specs/006-content-pipeline/spec.md (FR-004 superseding note); specs/007-*/contracts/*.md (pointers)
  - specs/content/efmp-301/content-spec.md + specs/backlog.md (v3.0 re-proof note)
  - README.md (+Unit structure standard section); specs/008-rich-unit-pedagogy/{plan.md,contracts/*} (drift notes)
tests:
  - "T060 final verification (2026-08-30, after T055 owner pass + T056 version bump):"
  - npm test — 96 passed (was 45; +51 new-shape/figures/validate-layout/no-answer-keys cases)
  - npm run validate:content — pass
  - npm run check:pipeline-gate — pass (merge freeze lifted; G2/G3 restored to ✅ YM)
  - npm run check:depth-gate — pass (EFMP-302 U1 a valid new-shape unit)
  - npm run check:figures — pass
  - npm run check:no-answer-keys — pass (source + build/)
  - npm run check:add-course — pass
  - npm run build — both locales, no broken links, no MDX errors; content-index 33 -> 35 records
  - SC-003 (proving unit) and SC-007 (legacy regression floor) both hold
---

## Prompt

/sp.implement  (no additional input)

Follow-up steering across the session:
- "continue into Phase 5 and the skill rewrite"
- "proceed into Phase 6"
- "continue with the Phase 7–8 items you can do now"
- Owner decisions (AskUserQuestion): work Phases 3–4 then check in; web-research the EFMP-302
  Unit 1 sources for real (verify DOIs / catalog entries, no fabrication).

## Response snapshot

Executed `specs/008-rich-unit-pedagogy/tasks.md` in dependency order (US3 → US5 → US2 → US1 →
US4 → polish). 57 of 61 tasks complete + T029 partial; T055 (human Content gate), T056 (style
guide `version` "2.0" → "3.0", gated on T055), and T060 (final verification, gated on T056)
remain — all owner-gated.

**Phases 1–2 (T001–T012, governance + contracts).** `check:figures` alias; `topic_no` /
`topic_label` added to the unit schema (+ 008 mirror); `course-review.schema.json` copied to
repo-root `contracts/`; three new `style-guide.md` sections (`## Unit structure standard`,
`## Answers and marking guidance policy`, `## Figure markers and manifests`) + extensions to
the assessment blueprint and the depth-gate-vs-human table, `version` deliberately left at
`"2.0"`; Spec 006 FR-004 superseding note; Spec 007 contract pointers. All existing gates +
45/45 tests still green.

**Phase 3 (T013–T024, US3 gates — TDD).** New `scripts/check-figures.mjs` (marker ↔ manifest
consistency; legacy units skipped) + CI step after the depth gate. `check-unit-depth.mjs`
rewritten: `detectLayout()` + `parseTopicList()`; the **legacy path runs byte-for-byte**; the
new-shape path adds the ten FR-020 checks (topic-file/`### Topic list` agreement, total+disjoint
partition, nine cycle headings in order, per-topic formative/checklist floors, per-`###`-band
10/10/5, answers-block-is-final, coverage↔`### Topic list` cross-check, re-baselined
reading-minutes band). `validate-content.mjs` rewritten with a legacy/new-shape branch,
`checkCourseReview()`, and EN↔UR parity over the dynamic EN+UR file union.
`check-no-answer-keys.mjs` rewritten with the bounded `## Answers and marking guidance`
exception (canonical heading, two-file whitelist, must-be-final, ≤1; front-matter key ban
retained everywhere; built-HTML route suppression). `build-content-index.mjs` indexes
`topic`/`assessment`/`course-review` kinds. `Footer.tsx` returns `null` for the new page tails.
Tests: depth-gate 17 → 37, parity 4 → 7, plus new `figures-gate` (11), `validate-layout` (9),
`no-answer-keys` (8) — suite 45 → 96, all green.

**Phase 4 (T025–T026, US5 regression floor).** All seven gate commands + tests green against
the repo as-is; `content-index.json` regenerated byte-identical at that point; `git diff`
touched no `docs/…` / `i18n/…` legacy file and no legacy `content-spec.md` (only `scripts/`,
`tests/`, `contracts/`, `specs/00{6,7,8}/`, `specs/content/style-guide.md`, `.github/`,
`package.json`, `.claude/`, and the one sanctioned `src/theme/DocItem/Footer.tsx` swizzle).
Legacy layout provably byte-for-byte; the new gates are additive only.

**Phase 5 (T027–T030, US2).** EFMP-302 `content-spec.md` `## Unit 1`: `### Topic list` (4
topics partitioning U1-01…U1-14), `Topic` column on the checklist, re-baselined `**Depth
budget**`, `**Figure plan**`, `**Unit-end assessment blueprint**`; course-level `## Course
review plan`. T029 owner re-affirmation drafted, flagged PENDING YM. T030: the one-signal state
made `check:depth-gate` fail loudly for EFMP-302 Unit 1 as designed (confirmed on the real
repo); the partition-naming behaviour is covered by the depth-gate fixtures.

**Skill rewrite (T031–T037).** `SKILL.md` rewritten for the per-topic layout (per-topic source
gathering, per-topic backward design + 10/10/5 planning, the 4-file draft, emit
coverage-v2/sources/figures, run the gate set, per-topic Urdu handoff — one skill, no
sub-agent). `references/structure-standard.md` fully rewritten (shape, nine headings, every gate
rule, self-check). `pedagogy-checklist.md` expanded per part. New `item-writing.md`,
`answers-block-formatting.md`, `figure-prompts.md`. `citation-and-register.md` note.

**Phase 6 (T038–T052, US1 — MVP).** EFMP-302 Unit 1 authored to the per-topic layout:
`index.mdx` opening; `topic-01…04.mdx` as nine-part cycles with Sindh/Pakistan-grounded
vignettes, one FIGURE marker each, paraphrase-and-cite of the mapped readings, per-topic
formative + self-assessment + summative-with-rubric (Topic 1.3 folds in the old summative
case-analysis task); `unit-assessment.mdx` with exactly 10 MCQ / 10 RRQ / 5 ERQ (Bloom-tagged,
one integrative ERQ) + a final `## Answers and marking guidance` section (MCQ key, RRQ model
answers + mark schemes, ERQ analytic rubrics with Analyze-or-higher criteria);
`unit-teacher-notes.mdx` from the old teacher-notes; 4 legacy files deleted. All 7 mapped
sources verified this session — hargreaves2000 / demirkasimoglu2010 / beijaard2004 / suarez2022
DOIs resolve; carr2000 / hurst2009 / brookfield2017 confirmed in library catalogs; no citation
fabricated. `coverage/unit-01.md` → v2; `sources/unit-01.md` updated to per-topic locations;
`figures/unit-01.md` created (4 rows, all `prompt-only`). `est_reading_minutes` recomputed —
unit total **103**, band finalised to `90–120`. Urdu mirror reset to a `draft` skeleton
(orphans deleted, `teacher-notes.mdx` → `unit-teacher-notes.mdx`, 5 heading-only stubs added
carrying the same FIGURE marker IDs). `check:pipeline-gate` intentionally RED for EFMP-302 Unit
1 (G2/G3 → `▣`, merge freeze until T055).

**Phase 7–8 (done now): T053/T054** — `npm run build` clean for both locales; `check:no-answer-keys`
over `build/` clean; a raw grep of `build/` for "correct answer" returns nothing, and the only
answer-key phrase anywhere in the unit is `### MCQ answer key` inside the bounded section.
**T057** — README "Unit structure standard" section + `check:figures` in the build/test list.
**T058** — EFMP-301 golden-unit note rewritten to a **v3.0 per-topic** re-proof (supersedes the
never-started v2.0 obligation, owner-acknowledged); `specs/backlog.md` updated. **T059** —
drift reconciliation notes added to `plan.md` + two clarifying notes to
`figures-manifest.md` / `topic-cycle.md` (the figure gate does not byte-compare prompt/alt; the
further-reading check counts a non-blank line; the depth band was set from a ~110-wpm
work-through rate). **T062** — SC-009 met: `topic-02.mdx` was authored straight from the
content-spec + `contracts/topic-cycle.md` with zero questions about *what structure to emit*.

## Outcome

- ✅ Impact: the per-topic unit standard is fully enforced (4 gates), the `author-unit` skill
  targets it, and EFMP-302 Unit 1 is a gate-passing proving unit. Legacy units untouched and
  provably byte-for-byte.
- 🧪 Tests: 96/96 vitest; validate/pipeline/depth/figures/no-answer-keys/add-course green;
  build green both locales; post-build answer scan green. After the owner's T055 pass and the
  T056 `version` bump, `check:pipeline-gate` is green — merge freeze lifted.
- 📁 Files: see front matter — 4 gate scripts (1 new, 3 rewritten), 5 test files (3 new),
  8 skill files, 7 EN unit files (4 legacy deleted), 8 UR files, ~12 governance/doc files.
- 🔁 Next prompts: G4/G5 — Urdu re-translation + re-review of the per-topic EFMP-302 Unit 1
  (skeleton stubs are in place); then EFMP-301 Unit 1 v3.0 per-topic re-proof (backlog).
- 🧠 Reflection: adding the `### Topic list` to a unit whose `topic-*.mdx` files do not yet
  exist makes `check:depth-gate` fail loudly for that unit — a real mid-restructure window on
  the branch, cleared only when Phase 6 authoring lands. Worth sequencing Phase 5 and the start
  of Phase 6 close together on future restructures.

## Evaluation notes (flywheel)

- Failure modes observed: none blocking. One spec/task inconsistency — T026's allowlist omits
  `src/`, though `plan.md` names the `Footer.tsx` swizzle; recorded in `tasks.md`.
- Graders run and results (PASS/FAIL): gate suite PASS (except the by-design pipeline-gate red);
  build PASS; SC-007 regression-floor PASS; SC-009 structure-determinism PASS.
- Prompt variant (if applicable): n/a.
- Next experiment (smallest change to try): have `/sp.tasks` emit Phase 5's `### Topic list`
  task and Phase 6's first `topic-01.mdx` task as a single non-splittable unit so the
  loud-failure window never spans a session boundary.
