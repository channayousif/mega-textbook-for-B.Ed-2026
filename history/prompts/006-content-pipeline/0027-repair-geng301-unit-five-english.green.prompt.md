---
id: 27
title: Repair GENG301 Unit Five English
stage: green
date: 2026-11-03
surface: agent
model: GPT-6
feature: 006-content-pipeline
branch: crew/geng-301-u05-repair_en
user: crew
command: Read .crew/brief.md and carry it out
labels: ["codex", "crew", "geng-301", "unit-05"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/geng-301/unit-05/topic-03.mdx
  - docs/semester-2/geng-301/unit-05/topic-04.mdx
  - docs/semester-2/geng-301/unit-05/unit-assessment.mdx
  - docs/semester-2/geng-301/unit-05/unit-teacher-notes.mdx
  - static/img/figures/geng-301/unit-05/fig-U5-2.svg
  - static/img/figures/geng-301/unit-05/fig-U5-2.dark.svg
  - static/img/figures/geng-301/unit-05/fig-U5-8.svg
  - static/img/figures/geng-301/unit-05/fig-U5-8.dark.svg
  - specs/content/geng-301/figures/unit-05.md
  - specs/content/geng-301/tasks.md
  - specs/content/geng-301/reviews/unit-05/repairs/20261103-repair-en.md
tests:
  - npm run check:content (baseline passes; repair validation and evidence refresh in progress)
  - scripts/heavy.sh npm test (in progress)
  - scoped dark-variant freshness check (pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the six requested author repairs and appended an advisory G3 row. Kept provenance and rendering limitations explicit.

## Outcome

- ✅ Impact: Corrected evidence, hedging, register and scheduling defects in Unit 5.
- 🧪 Tests: Baseline content gates pass; final results recorded after evidence refresh.
- 📁 Files: Unit 5 English prose, assessment, figure labels, tracker and repair record.
- 🔁 Next prompts: Parent prepares frozen handoff and fresh independent G3 review.
- 🧠 Reflection: Playwright prohibition takes precedence over browser-dependent SVG measurement.

## Handoff (for CEO and agents)

- Shipped / changed: Six requested content findings repaired; no G3 certification.
- Decisions the team must respect: G3 remains incomplete; fictional material is not research evidence.
- Pending / next owner: Parent owns original provenance, frozen handoff and current desktop/narrow/A4 plus SVG geometry inspection.
- Paperclip issues affected: Crew job geng-301-u05-repair_en; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Content changes invalidate G2 evidence and the generated content-status record.
- Graders run and results (PASS/FAIL): Baseline content gates and scoped dark variants PASS; final checks pending at initial commit.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Refresh Unit 5 deterministic evidence and rerun content gates.
