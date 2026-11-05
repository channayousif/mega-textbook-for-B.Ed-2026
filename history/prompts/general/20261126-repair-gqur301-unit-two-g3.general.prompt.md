---
id: 20261126
title: Repair GQUR-301 Unit 2 G3 findings
stage: general
date: 2026-11-05
surface: agent
model: GPT-6 (exact serving snapshot unavailable)
feature: gqur-301-unit-02
branch: crew/gqur-301-u02-repair_en
user: crew
command: Read .crew/brief.md and carry it out
labels: [codex, crew, repair]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/gqur-301/unit-02/topic-01.mdx
  - docs/semester-2/gqur-301/unit-02/topic-02.mdx
  - docs/semester-2/gqur-301/unit-02/unit-assessment.mdx
  - docs/semester-2/gqur-301/unit-02/unit-teacher-notes.mdx
  - specs/content/gqur-301/figures/unit-02.md
  - specs/content/gqur-301/tasks.md
  - specs/content/gqur-301/reviews/unit-02/repairs/20261105-codex.md
  - static/img/figures/gqur-301/unit-02/fig-U2-3.svg
  - static/img/figures/gqur-301/unit-02/fig-U2-3.dark.svg
tests:
  - Unchanged origin/main content baseline passed all 14 gates
  - SVG arithmetic and dark variant checks passed
  - Full repair checks and npm test results recorded in the repair handoff
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the four blocking author repairs and appended the required unticked advisory G3 row. The crew brief explicitly requires commits, overriding the revision skill default of presenting an uncommitted change set.

## Outcome

- ✅ Impact: Corrected quantitative figure geometry and assessment pedagogy.
- 🧪 Tests: Baseline passes; final checks recorded in repair handoff after G2 refresh.
- 📁 Files: Unit 2 topics, assessment, teacher notes, figure pair, manifest, tracker and repair handoff.
- 🔁 Next prompts: Fresh independent G3 review with frozen source and render evidence; resolve G1/provenance.
- 🧠 Reflection: Repairs stale the existing G2 input manifest, requiring fresh deterministic evidence without G3 certification.

## Handoff (for CEO and agents)

- Shipped / changed: F1-F4 author repairs with unchanged figure IDs and original prompt.
- Decisions the team must respect: G3 remains open; no Urdu mirror exists; no self-certification.
- Pending / next owner: Owner/evaluator resolves authority and provenance; orchestration arranges independent review and permitted visual checks.
- Paperclip issues affected: Crew job gqur-301-u02-repair_en; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Initial changed-input check exposed stale G2 evidence and removal of a grandfathered SVG outline; outline restored.
- Graders run and results (PASS/FAIL): Baseline 14/14 PASS; arithmetic and variants PASS; final results in repair handoff.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Independent answer-blind assessment and rendered review of repaired version.
