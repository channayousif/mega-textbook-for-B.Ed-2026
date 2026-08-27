---
id: 0005
title: Tasks content depth standard
stage: tasks
date: 2026-08-27
surface: agent
model: claude-sonnet-5
feature: 007-content-depth-standard
branch: 007-content-depth-standard
user: channayousif@gmail.com
command: /sp.tasks
labels: [content-pipeline, depth-standard, authoring-skill, ci-gate, tasks]
links:
  spec: specs/007-content-depth-standard/spec.md
  ticket: null
  adr: history/adr/0010-content-depth-standard-and-reusable-unit-authoring-skill.md
  pr: null
files:
 - specs/007-content-depth-standard/tasks.md
 - history/prompts/007-content-depth-standard/0005-tasks-content-depth-standard.tasks.prompt.md
tests:
 - none authored yet (tasks.md defines tests/unit/depth-gate.test.mjs as a red-first task, T027)
---

## Prompt

/sp.tasks (no additional argument text)

Generate the dependency-ordered, user-story-organised tasks.md for feature
007-content-depth-standard from its plan.md / spec.md / research.md / data-model.md /
contracts/ / quickstart.md.

## Response snapshot

`check-prerequisites.sh` → FEATURE_DIR + all four optional docs present. Read the tasks
template and all design docs.

**tasks.md written — 40 tasks, 8 phases:**

- **Phase 1 Setup (T001–T003)** — `package.json` `check:depth-gate` alias; create empty
  `.claude/skills/author-unit/references/`, `specs/content/efmp-302/{coverage,sources}/`;
  `contracts/style-guide-frontmatter.schema.json` description note.
- **Phase 2 Foundational (T004–T006, BLOCKING)** — author `## Unit depth standard` +
  `## What the depth gate checks vs. the human Content gate` in `style-guide.md` (version NOT
  bumped yet); `.claude/skills/author-unit/references/depth-standard.md` + the two-way sync
  note.
- **Phase 3 US2 P1 (T007–T013)** — expand `specs/content/efmp-302/content-spec.md`: Course
  Description, Reading list (12 guide readings, APA+DOI, unit-tagged), Week schedule, Standards
  anchors; Unit 1 `### Sub-topic checklist` table + `**Depth budget**`/prereqs/misconceptions/
  mapped-readings/worked-examples/best-practice; curriculum-owner checklist fidelity review.
- **Phase 4 US1 P1 🎯 MVP (T014–T026)** — write the `author-unit` skill (`SKILL.md` + 2
  reference files, T014–T016 [P]); re-draft the five EN files of
  `docs/semester-1/efmp-302/unit-01/` (T017–T021); emit `coverage/unit-01.md` +
  `sources/unit-01.md` (T022–T023, ≥3 scholarly sources); Urdu handoff — `translation_status`
  reviewed→draft on the five UR files + G4/G5 revision rows in `tasks.md` + re-open G2/G3
  (T024–T026).
- **Phase 5 US3 P2 (T027–T031)** — RED: `tests/unit/depth-gate.test.mjs` with 11 fixture
  cases (MUST fail first); GREEN: implement `scripts/check-unit-depth.mjs` (copy
  `check-pipeline-gate.mjs` shape; 6-step algorithm; skip units with no checklist); make tests
  green; add the CI step after "Pipeline gate"; run the full gate suite against the real unit.
- **Phase 6 US4 P2 (T032–T033)** — flip `style-guide.md` `version` 1.0→2.0 (only after T031 +
  T036); confirm `terminology.csv` unchanged and schema validates `"2.0"`.
- **Phase 7 US5 P3 (T034–T035)** — queue the EFMP-301 golden-unit v2.0 re-proof rows in
  `specs/content/efmp-301/tasks.md` (Constitution Art. VI.1 v2.5.0 obligation, not executed
  here); document "adopting the standard for a new unit = add the checklist table".
- **Phase 8 Polish (T036–T040)** — human Content-gate pass on the re-drafted unit (gates the
  freeze); README "Content depth standard" section (Art. X.2); sync-note verification;
  quickstart 15-item run; drift reconciliation.

**Key ordering decisions**: US2 → US1 despite both P1 (author writes against US2's reviewed
checklist); US3 tests/impl parallel with US1 but T031 acceptance needs US1+US2; US4 freeze is
last (FR-014) and gated on the human Content gate T036; US5's EFMP-301 re-proof queued after
the proving unit is done (v2.5.0 wording). Tests included (SC-004/SC-007 require them),
red-first in US3. 12 `[P]` tasks. MVP = Phases 1–4.

## Outcome

- ✅ Impact: Feature 007 fully decomposed; every task has a concrete file path and traces to
  an FR / SC / contract. Ready for `/sp.implement` (or manual execution).
- 🧪 Tests: none yet — T027 authors `tests/unit/depth-gate.test.mjs` red-first.
- 📁 Files: `specs/007-content-depth-standard/tasks.md`; this PHR.
- 🔁 Next prompts: `/sp.implement` — start Phase 1; STOP & VALIDATE after Phase 4 (MVP: a
  demonstrably deeper EFMP-302 Unit 1 with coverage/sources, before the gate exists).
- 🧠 Reflection: the build is small (one script + one skill + Markdown); the real work and
  risk is T017–T023 (does the re-drafted unit actually read as deeper?) and T036 (the human
  Content gate is the true acceptance test — the CI gate only guards structure).

## Evaluation notes (flywheel)

- Failure modes observed: n/a (task generation).
- Graders run and results (PASS/FAIL): checklist-format check — PASS (40/40 tasks match
  `- [ ] Txxx [P?] [US?] … <file path>`; story labels only on US phases; Setup/Foundational/
  Polish unlabelled).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): during `/sp.implement`, do T011 (the Unit 1
  checklist) and T013 (its fidelity review) as a hard stop before any prose — if the
  checklist is wrong, every downstream coverage row inherits the error.
