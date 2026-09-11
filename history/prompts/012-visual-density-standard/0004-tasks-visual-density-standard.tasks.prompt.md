---
id: 0004
title: Tasks Visual Density Standard
stage: tasks
date: 2026-09-08
surface: agent
model: claude-sonnet-5
feature: 012-visual-density-standard
branch: 012-visual-density-standard
user: channayousif@gmail.com
command: /sp.tasks 012-visual-density-standard
labels: ["tasks", "figures", "visual-density", "check-figures", "content-pipeline"]
links:
  spec: specs/012-visual-density-standard/spec.md
  ticket: null
  adr: history/adr/0017-visual-density-standard-and-figure-archetype-taxonomy.md
  pr: null
files:
 - specs/012-visual-density-standard/tasks.md
tests:
 - "n/a (task list); FR-006 fixture set enumerated as T004-T008"
---

## Prompt

/sp.tasks 012-visual-density-standard

## Response snapshot

Wrote `specs/012-visual-density-standard/tasks.md` - 34 tasks across 7 phases, grouped by the
four user stories.

- **Phase 1 Setup** (T001): baseline `npm test` green.
- **Phase 2 Foundational** (T002-T003): widen `KIND_ENUM` to the six archetypes + add
  `SCHEMATIC_ARCHETYPES` in `scripts/lib/figure-manifest.mjs`; v3 note on the manifest contract.
  Blocks US1 and US3.
- **Phase 3 US1 (P1, MVP)** (T004-T012): five fixture cases in `tests/unit/figures-gate.test.mjs`
  written first (pass; per-topic shortfall; missing schematic; blank/unknown archetype; skipped
  legacy), then the three gate changes in `check-figures.mjs` (per-topic `>= 2`; per-unit schematic
  pass; archetype validity), then `npm test` green.
- **Phase 4 US2 (P2)** (T013-T020): style-guide rule rewrite + `version 3.2 -> 3.3` + terminology
  re-attest; `author-unit` twin `structure-standard.md` + `SKILL.md` + `figure-prompts.md`;
  `generate-figures` archetype mapping; EFMP-302 content-spec Figure-plan shape.
- **Phase 5 US3 (P2, proving unit)** (T021-T026): choose one added figure per EFMP-302 U1 topic
  (concept-map / flowchart / timeline / flowchart), add markers, update `figures/unit-01.md`,
  render via `generate-figures`, mirror into UR (written+wired, not gate-enforced while EN is
  `draft`), full gate set green.
- **Phase 6 US4 (P3)** (T027-T030): T027 constitution amendment and T028 ADR-0017 marked **[x]
  done** (completed at the checkpoint); T029 backlog entry for the EFMP-301 U1 golden re-proof;
  T030 stale-wording cross-check.
- **Phase 7 Polish** (T031-T034): `Figure.tsx` `kind` union + `.figure--*` CSS; `CLAUDE.md`
  refresh; full clean-tree gate run into plan.md; implementation PHR.

Dependency order: Setup -> Foundational -> US1 (MVP) -> US2 -> US3 -> US4 tidy -> Polish. US2 skill
files (T016-T019) and the five fixtures (T004-T008) are the main [P] clusters. Do not merge
between T014 (`version` bump) and T026 (gates green).

## Outcome

- ✅ Impact: an executable task list; MVP = Phase 1+2+US1 (gate + fixtures), retrofit can trail.
- 🧪 Tests: FR-006 fixtures enumerated (T004-T008).
- 📁 Files: `specs/012-visual-density-standard/tasks.md`.
- 🔁 Next prompts: implement Phase 2 -> US1, then US2, then the EFMP-302 U1 retrofit; checkpoint
  before merge.
- 🧠 Reflection: marked the already-done constitution/ADR tasks `[x]` rather than dropping them, so
  tasks.md stays a faithful record of the whole feature.

## Evaluation notes (flywheel)

- Failure modes observed: cross-story dependency (US3 needs US1 + US2) - called out explicitly in
  Dependencies rather than pretending full independence.
- Graders run and results (PASS/FAIL): checklist-format check (checkbox + ID + [P]/[Story] +
  file path on every task) - PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): if US1's gate messages get verbose, factor a small
  `failDensity(file, reason)` helper rather than inline strings.
