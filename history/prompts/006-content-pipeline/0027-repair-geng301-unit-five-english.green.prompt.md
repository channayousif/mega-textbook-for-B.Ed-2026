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
  - specs/content/geng-301/reviews/unit-05/G2/20261103T185029661Z-gates.json
  - specs/content/geng-301/reviews/unit-05/G2/logs-20261103T185029661Z/
tests:
  - npm run check:content (baseline and final: all 14 gates pass)
  - scripts/heavy.sh npm test (31 files, 368 tests passed)
  - scoped dark-variant freshness check (pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied the six requested author repairs and appended an advisory G3 row. Kept provenance and rendering limitations explicit.

## Outcome

- ✅ Impact: Corrected evidence, hedging, register and scheduling defects in Unit 5.
- 🧪 Tests: Baseline and final content runs pass all 14 gates; eight G2 draft checks and all 368 unit tests pass.
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
- Graders run and results (PASS/FAIL): Baseline and final content gates, eight G2 draft checks, 368 unit tests and scoped dark variants PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Fresh independent G3 review with original provenance and current rendered evidence.
