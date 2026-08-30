---
id: 0004
title: Tasks 008 rich unit pedagogy
stage: tasks
date: 2026-08-27
surface: agent
model: claude-sonnet-5
feature: 008-rich-unit-pedagogy
branch: 008-rich-unit-pedagogy
user: channayousif
command: /sp.tasks
labels: ["tasks", "content-architecture", "gates", "tdd", "constitution-v2.6.0", "spec-008"]
links:
  spec: specs/008-rich-unit-pedagogy/spec.md
  ticket: null
  adr: history/adr/0011-nested-per-topic-unit-pedagogy-bounded-answer-keys-and-figure-markers.md
  pr: null
files:
 - specs/008-rich-unit-pedagogy/tasks.md
tests:
 - none (tasks stage — test tasks T013–T017 are defined in tasks.md, not yet run)
---

## Prompt

> approve adr 11, run sp tasks
>
> Generate tasks.md for 008-rich-unit-pedagogy from plan.md, research.md, data-model.md, contracts/,
> quickstart.md, and ADR-0011. Follow the approved plan's 12-phase dependency order (see quickstart.md
> steps 1–11). Constraints: (1) the constitution v2.5.0 → v2.6.0 amendment is the FIRST blocking task
> — nothing else starts until it lands; (2) red-first — each gate rewrite/new gate gets a failing-tests
> task before its implementation task; (3) a "legacy regression floor green" checkpoint task after each
> gate change (SC-007); (4) the style-guide.md version "2.0" → "3.0" bump is the LAST content task, only
> after the human Content gate passes EFMP-302 Unit 1; (5) do NOT merge between the Urdu-handoff tasks.md
> edit and the human Content-gate pass; (6) tag each task with the FR(s) it satisfies. Mark [P] for
> parallelizable tasks. Scope tasks to the DoD in FR-029 (EFMP-302 Unit 1 English + Urdu handoff only)
> — Units 2–6, other courses, the EFMP-301 re-proof, and the real course-review.mdx are explicit
> follow-ups, not tasks.

## Response snapshot

Confirmed ADR-0011 already at Status: Accepted. Ran `check-prerequisites.sh`; wrote
`specs/008-rich-unit-pedagogy/tasks.md` — **61 tasks, 8 phases**, organised by user story in
**dependency order** (US3 → US5 → US2 → US1 → US4), each phase noting why it deviates from strict
priority order.

- **Phase 1 Setup** (T001–T003, all [P]): `check:figures` npm script + `figures/` dir; style-guide
  schema description note; `git mv depth-standard.md → structure-standard.md`.
- **Phase 2 Foundational** (T004–T012): **T004 = constitution v2.5.0 → v2.6.0, BLOCKS everything**
  (Art. III.1/III.3/III.6, V.2 carve-out, VI.1 re-run, VII figure-gate row). Then [P]: the three new
  `style-guide.md` sections (same file → sequential) + `## Assessment blueprint` extension;
  `unit-frontmatter.schema.json` +`topic_no`/`topic_label`; copy `course-review.schema.json` to
  repo-root `contracts/`; 007-contract pointers; the Spec 006 FR-004 superseding note.
- **Phase 3 US3 — gates** (T013–T024, 12 tasks): **red-first** T013–T017 (extend `depth-gate.test.mjs`
  + 3 new test files + `parity.test.mjs`), then T018 `check-figures.mjs` + T019 CI wiring, T020
  `check-unit-depth.mjs` rewrite (`detectLayout`/`parseTopicList` + the 10 new-shape checks, legacy
  byte-for-byte), T021 `validate-content.mjs` rewrite (+`checkCourseReview`, dynamic parity loop),
  T022 `check-no-answer-keys.mjs` bounded exception, T023 `build-content-index.mjs`, T024
  `Footer.tsx` path guard.
- **Phase 4 US5 — regression floor** (T025–T026): full gate set + `check:add-course` green across all
  legacy courses; `git diff` proves no legacy unit file touched (SC-007).
- **Phase 5 US2 — partition** (T027–T030): EFMP-302 `content-spec.md` `## Unit 1` gets `### Topic
  list` (4 topics) + `Topic` column + re-baselined `**Depth budget**` + `**Figure plan**` +
  `**Unit-end assessment blueprint**`; course-level `## Course review plan`; owner re-approval;
  partition-invariant verify.
- **Phase 6 US1 — author (MVP 🎯)** (T031–T052, 22 tasks): SKILL.md rewrite + 6 `references/` files
  ([P]); `index.mdx` opening → `topic-01..04.mdx` ([P], nine-part cycle + FIGURE markers) →
  `unit-assessment.mdx` (10/10/5 + bounded answers) → `unit-teacher-notes.mdx` + delete the 4 legacy
  files; `<PrintHandout />` placement; emit `coverage/unit-01.md` v2 + `sources/unit-01.md` +
  `figures/unit-01.md`; recompute `est_reading_minutes` + finalise the band; gate green (leave G2/G3
  `▣`); Urdu handoff (orphan deletes + skeleton stubs + same marker IDs); `tasks.md` rows +
  **merge-freeze starts at T052**.
- **Phase 7 US4 — built site** (T053–T054): `npm run build` + answer-key scan over `build/` clean;
  sidebar/print/fallback spot-check.
- **Phase 8 Polish** (T055–T061): T055 human Content gate → unblocks merge; **T056 = style-guide
  `version` "3.0" bump, LAST**; README section; EFMP-301 v3.0 re-proof prose note (no tracker rows);
  drift reconciliation; final full verification; PHRs.

Dependency graph + merge-freeze window (T052→T055) + parallel-execution examples + MVP strategy
(Phases 1–6) + an explicit out-of-scope list all included. Verified: 61 tasks, no placeholders,
**all 29 spec FRs referenced by ≥ 1 task**.

## Outcome

- ✅ Impact: `008` is implementation-ready; `/sp.implement` can execute tasks.md top-to-bottom.
- 🧪 Tests: none run (T013–T017 are red-first test-authoring tasks).
- 📁 Files: `specs/008-rich-unit-pedagogy/tasks.md` (new, 61 tasks).
- 🔁 Next prompts: optionally `/sp.analyze` (cross-artifact consistency, as Spec 007 did) then
  `/sp.implement`; T004 (constitution amendment) is the first executable task.
- 🧠 Reflection: story phases run in dependency order, not P-order — the gates (US3) and the legacy
  regression floor (US5) must precede any content authoring (US2/US1), or a broken gate would give
  false confidence in the proving-unit draft.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): FR-coverage grader — PASS (29/29 FRs tagged); task-format
  grader — PASS (all 61 tasks = `- [ ] Tnnn [P?] [US?] … <path>`); constraint grader — PASS (T004
  blocking; red-first T013–T017 before T018–T022; T025–T026 regression checkpoint; T056 version bump
  last; T052→T055 merge-freeze documented; DoD scoped to EFMP-302 U1).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): during `/sp.implement`, run `npm test` after T020, T021,
  T022 individually (not just at the T024 checkpoint) so a legacy regression is caught at the task
  that caused it.
