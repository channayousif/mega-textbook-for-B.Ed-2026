---
id: 0005
title: Content pipeline tasks breakdown
stage: tasks
date: 2026-08-25
surface: agent
model: claude-sonnet-5
feature: 006-content-pipeline
branch: 006-content-pipeline
user: channayousif@gmail.com
command: /sp.tasks
labels: ["content-pipeline", "tasks", "sdd"]
links:
  spec: specs/006-content-pipeline/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/006-content-pipeline/tasks.md
tests:
 - none (task-breakdown stage; no code written)
---

## Prompt

(empty — `/sp.tasks` invoked with no arguments, running the standard task-generation workflow
against the completed `specs/006-content-pipeline/plan.md`, `spec.md`, `research.md`, and
`data-model.md`)

## Response snapshot

Ran `check-prerequisites.sh --json` (FEATURE_DIR resolved, AVAILABLE_DOCS =
research.md/data-model.md/contracts/quickstart.md), re-read spec.md's five prioritized user
stories, data-model.md's file-based entities, and research.md's R1–R10 decisions, then cross-read
the actual repo state (`package.json` scripts, `scripts/check-no-answer-keys.mjs`,
`.github/workflows/ci.yml`, `tests/unit/_helpers.mjs`'s fixture-test pattern) to ground every task
in exact file paths and existing conventions rather than the template's generic placeholders.

Generated `tasks.md` with 35 tasks (T001–T035) across 8 phases:

- **Setup (T001–T006)**: directory scaffolding, `.gitignore` entry, the three contract file
  changes (2 new + 1 edited `unit-frontmatter.schema.json` diff), the `check:pipeline-gate` npm
  alias — all `[P]`, different files.
- **Foundational (T007–T010)**: `style-guide.md` (draft version), `terminology.csv` (seeded),
  the `check-pipeline-gate.mjs` skeleton (walk + CSV parser + message aggregator, no checks wired
  yet), and the Vitest fixture-test scaffold extending `tests/unit/_helpers.mjs`'s
  `makeFixture` pattern.
- **US1 (P1, T011–T014)**: EFMP-301's `content-spec.md` (Course-wide items + Unit 1 subsection
  per research.md R1), the approval check (FR-016b) in the gate script, its fixture tests, and
  approving the file.
- **US2 (P1, T015–T018)**: `tasks.md`'s G1–G3 rows, the EN-tracker check (FR-016a EN portion),
  its fixture tests, and a manual folding-rule verification against the golden template.
- **US3 (P2, T019–T023)**: `key_terms` front matter on the golden unit's UR `index.mdx`, G4–G5
  tracker rows, the UR-tracker check, the terminology-conformance check (FR-016c, research.md R4's
  structured `{en,ur}` equality design), and fixture tests covering both.
- **US4 (P2, T024–T025)**: G6–G7 tracker rows completing the one-row-per-stage set, plus a
  documented status-enum legend (SC-005).
- **US5 (P3, T026–T029)**: seed one accepted `improvement_suggestions` row, add a Revision Task
  row (FR-011, research.md R2's same-tracker design), carry it through the gate, and close the
  loop by publishing the fix and updating the suggestion's status.
- **Polish (T030–T035)**: extend `check-no-answer-keys.mjs` (research.md R5 — reuse, not
  rebuild), verify it, wire the new CI step, run the full verification suite, bump
  `style-guide.md`'s `version` to `"1.0"` (the FR-017/R8 freeze — explicitly gated on the prior
  verification task passing), and the SC-003 terminology spot-check.

Each user-story phase's own "Independent Test" section states precisely which fixture dimension
must vary in isolation to prove that story's slice of `check-pipeline-gate.mjs` works
independently — directly answering spec.md's own per-story Independent Test criteria rather than
inventing new ones. The Dependencies section explicitly calls out that `check-pipeline-gate.mjs`
and `tasks.md`/`content-spec.md` are each edited by tasks from multiple stories sequentially
(T012/T016/T021/T022 all touch the same script file) — a deliberate single-script design
(research.md R6), so this is flagged as expected rather than a task-independence violation, and
those tasks are correctly left unmarked `[P]` against each other.

## Outcome

- ✅ Impact: Produced a complete, dependency-ordered `tasks.md` (35 tasks, 8 phases) that turns
  Spec 006's plan into an executable checklist — every task cites an exact file path and the FR/
  research.md decision it implements, with User Story 1 (content-spec approval) validated as the
  standalone MVP slice.
- 🧪 Tests: none written yet — task-breakdown stage; `tests/unit/pipeline-gate.test.mjs` is
  scheduled as T010 (scaffold) plus T013/T017/T023 (per-check fixture tests) for `/sp.implement`.
- 📁 Files: `specs/006-content-pipeline/tasks.md` (new).
- 🔁 Next prompts: `/sp.implement` for Spec 006 (or `/sp.analyze` first, if a cross-artifact
  consistency pass is wanted before implementation starts).
- 🧠 Reflection: Grounding task file paths against the actual repo (existing npm scripts, the
  real `check-no-answer-keys.mjs` PATTERNS/TARGETS shape, the real CI step names/ordering) before
  writing tasks.md avoided the generic-template failure mode of tasks that "look right" but
  reference files/conventions that don't match what's actually in the repo.

## Evaluation notes (flywheel)

- Failure modes observed: none this stage — no self-corrections needed; the `create-phr.sh` stub
  was filled in directly against the already-fully-specified plan/research artifacts.
- Graders run and results (PASS/FAIL): placeholder scan on `tasks.md` (`[FEATURE NAME]`, `[###`,
  `[Entity`, `[Service]`, `[endpoint`) — PASS, none of the template's sample-task placeholders
  remain; checklist-format scan (every task line starts `- [ ] T### ` with `[P]`/`[USn]` only
  where applicable and a concrete file path) — PASS by manual inspection.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
