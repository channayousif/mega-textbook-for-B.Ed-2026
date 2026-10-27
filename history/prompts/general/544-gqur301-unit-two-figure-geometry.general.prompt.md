---
id: 544
title: Repair GQUR-301 Unit 2 figure geometry
stage: general
date: 2026-10-28
surface: agent
model: gpt-6
feature: none
branch: crew/gqur-301-u02-fix
user: owner
command: crew brief
labels: [codex]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/gqur-301/unit-02/fig-U2-4.svg
  - static/img/figures/gqur-301/unit-02/fig-U2-4.dark.svg
tests:
  - Unit 2 SVG text measurement: PASS
  - Content gates and G2 evidence: recorded in follow-up commit
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Wrapped the overflowing school-budget example, expanded its panel and repositioned the following labels and caption. Regenerated the dark variant.

## Outcome

- ✅ Impact: Removed the reported panel spill without changing wording or font sizes.
- 🧪 Tests: All four light Unit 2 SVG sources pass geometry measurement.
- 📁 Files: English source and generated dark variant; no viewBox or carrier changes.
- 🔁 Next prompts: Fresh independent G3 review remains required.
- 🧠 Reflection: Wrapping fixes the measured spill without reducing readability.

## Handoff (for CEO and agents)

- Shipped / changed: Figure geometry repair and regenerated variant.
- Decisions the team must respect: Preserve wording, publication state and open G3/G5 status.
- Pending / next owner: Refresh G2 evidence and tracker after this commit; independent reviewer owns G3.
- Paperclip issues affected: GQUR-301 Unit 2; no linked issue.

## Evaluation notes (flywheel)

- Failure modes observed: One 6.5px panel spill; corrected with line wrapping.
- Graders run and results (PASS/FAIL): PASS: all Unit 2 light SVG text geometry.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): No further layout changes needed.
