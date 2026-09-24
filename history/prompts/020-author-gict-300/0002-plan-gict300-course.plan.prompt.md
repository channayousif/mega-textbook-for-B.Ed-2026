---
id: "0002"
title: "plan-gict300-course"
stage: plan
date: 2026-09-23
surface: agent
model: LongCat-2.0
feature: 020-author-gict-300
branch: 020-author-gict-300
user: a2ahs
command: /sp.plan
labels: ["course-authoring", "gict-300", "plan", "constitution-check"]
links:
  spec: specs/020-author-gict-300/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/020-author-gict-300/plan.md
tests:
  - Constitution Check table complete, no violations
---

## Prompt

Orchestrator task (excerpt): "Follow .claude/commands/sp.plan.md ->
specs/020-author-gict-300/plan.md (include the Constitution Check section; model on
specs/018-author-geng300/plan.md)."

## Response snapshot

Wrote the implementation plan for GICT-300 authoring. Technical context: content-only feature
(Markdown/MDX, no new dependency, Node ESM gates). The Constitution Check table covers
Articles II.1-3, III.1-10, V.1, VI.1, VII and VII.8 with per-article compliance statements;
no violations, no Complexity Tracking entries. Project structure: degree-track content under
docs/semester-1/gict-300/, Urdu mirror under i18n/ur/docusaurus-plugin-content-docs/current/,
figures under static/img/figures/gict-300/. Implementation approach: G1 content-spec + intake
evaluation, per-unit author/figures/gates/G3/G4/G5 loop, then check:all and a PR (never merge,
never push to main). Key authoring rules list the register, Pakistan grounding, citation,
Bloom, figure-density and em-dash constraints.

## Outcome

- ✅ Impact: Plan ready for `/sp.tasks`
- 🧪 Tests: Constitution Check passes with zero violations
- 📁 Files: 1 file created (plan.md)
- 🔁 Next prompts: `/sp.tasks`
- 🧠 Reflection: The 018 plan pushed to main and ran deploy-prod.sh; that is prohibited for
  this feature, so the final phase is PR-only. D-2026-0014 (standing gate-checked publication
  authorisation for the 15 catalogued courses) means publication-tier notices are handled by
  the existing pipeline without any per-unit owner decision.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
