---
id: 0002
title: Plan Visual Density Standard
stage: plan
date: 2026-09-08
surface: agent
model: claude-sonnet-5
feature: 012-visual-density-standard
branch: 012-visual-density-standard
user: channayousif@gmail.com
command: /sp.plan (012-visual-density-standard)
labels: ["plan", "content-pipeline", "figures", "check-figures", "constitution", "style-guide"]
links:
  spec: specs/012-visual-density-standard/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/012-visual-density-standard/plan.md
tests:
 - "n/a (planning artifact); test surface named: tests/unit/figures-gate.test.mjs +5 fixtures (FR-006)"
---

## Prompt

Continue Workstream C (approved plan): produce the implementation plan for Spec 012, including
the exact proposed constitution amendment, then checkpoint before touching content.

## Response snapshot

Wrote `specs/012-visual-density-standard/plan.md` in the project's plan house style (Summary,
Technical Context, Constitution Check, Key design decisions, proposed amendment, Phase 0/1,
retrofit steps, risks).

Four design decisions resolved (ADR candidate):
- **D1** archetype storage = **widen the manifest `Kind` enum from {diagram, illustration} to the
  six archetypes**, keep the column name and the v2 7-col header; do NOT add an `Archetype`
  column. Smallest diff; `diagram`/`illustration` stay valid so existing v2 rows still parse.
- **D2** "non-table diagram" for FR-002 = archetype in {concept-map, flowchart, timeline} only;
  `diagram`/`table`/`illustration` do not satisfy it.
- **D3** per-topic count is a blind carrier count (`>= 2`); archetype diversity is unit-level only.
- **D4** scope guard unchanged: only units with >=1 `topic-*.mdx`; non-topic files exempt; legacy
  five-file units and coming-soon stubs skipped.

Proposed constitution amendment set out verbatim for owner review at the checkpoint:
- governance `2.7.0 -> 2.8.0` (MINOR), Last Amended `2026-09-08`
- **new Article III.10 "Visual density"** (III.1-III.9 unchanged, not renumbered) - >=2 figures
  per `topic-*.mdx`, >=1 concept-map/flowchart/timeline per unit, six-value archetype recorded on
  the manifest, legacy/non-topic exempt, enforced by `check:figures`, III.8 applies.
- Article VII engineering-gate row appended with the density floor.
- top-of-file `SYNC IMPACT REPORT (v2.8.0)` in the established format.

Change surface named: `check-figures.mjs` + `figure-manifest.mjs` + `figures-gate.test.mjs`;
`Figure.tsx` prop union + `.figure--*` CSS; `style-guide.md` (`version 3.2 -> 3.3`, re-freezes
`terminology.csv`); `author-unit` `structure-standard.md` twin + `SKILL.md` + `figure-prompts.md`;
`generate-figures` `SKILL.md` + `svg-authoring.md`; manifest contract v2 -> v3 note; EFMP-302
content-spec Figure plan; then the EFMP-302 Unit 1 retrofit (>=8 figures, >=1 schematic, both
locales) + `backlog.md` EFMP-301 U1 follow-up.

Three risks logged (reviewed-unit bilingual gate trip mid-retrofit; `KIND_ENUM` widening vs
existing `diagram` rows; terminology re-freeze drift), each with a mitigation.

Checkpointing now: spec + proposed amendment are drafted; awaiting owner sign-off on the Article
III.10 wording and the `2.8.0` bump before implementation and before `/sp.tasks`.

## Outcome

- ✅ Impact: implementation approach + governance amendment are on paper and reviewable; no code
  or constitution file touched yet.
- 🧪 Tests: none run (planning); FR-006 fixture set specified.
- 📁 Files: `specs/012-visual-density-standard/plan.md`.
- 🔁 Next prompts: owner approves amendment wording -> `/sp.adr` for the taxonomy + gate-minimum
  -> `/sp.tasks` -> implement (`/sp.constitution`, gate, skills) -> EFMP-302 U1 retrofit.
- 🧠 Reflection: kept the amendment text verbatim in the plan so the checkpoint is a yes/no on
  concrete wording, not an abstract "is a clause ok".

## Evaluation notes (flywheel)

- Failure modes observed: scope creep risk (golden-unit re-authoring) - explicitly pushed to
  backlog in both spec (FR-013) and plan.
- Graders run and results (PASS/FAIL): constitution-check table - no violation, PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): confirm R3 (EFMP-302 U1 EN `translation_status`) before
  choosing retrofit-vs-Workstream-D ordering.
