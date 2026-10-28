---
id: 20261031
title: Repair EFMP-303 Unit 5 figure geometry
stage: misc
date: 2026-10-27
surface: agent
model: GPT-6
feature: 012-visual-density-standard
branch: crew/efmp-303-u05-fix
user: owner
command: crew brief
labels: [codex]
links:
  spec: specs/012-visual-density-standard/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-303/unit-05/fig-U5-4.svg
  - static/img/figures/efmp-303/unit-05/fig-U5-4.dark.svg
  - specs/content/efmp-303/tasks.md
  - specs/content/efmp-303/reviews/unit-05/G2/
tests:
  - Unit 5 light SVG text measurement: PASS (8 files)
  - npm run check:content
  - node scripts/prepare-gate-evidence.mjs EFMP-303 5
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Moved the English Gender norms barrier into the right-hand gap and wrapped its label without changing wording, font size or canvas dimensions. Regenerated the dark variant. Refresh G2 evidence after the repair commit and flag G3 as stale.

## Outcome

- ✅ Impact: Both reported text-geometry defects repaired.
- 🧪 Tests: All eight light English and Urdu figures pass measurement. G2 evidence passed all eight required checks. Content suite rerun after refreshing the generated status report.
- 📁 Files: English figure source, generated dark twin, G2 evidence and Unit 5 tracker.
- 🔁 Next prompts: Independent fresh G3 review remains required.
- 🧠 Reflection: Wrapping the barrier label preserves the figure dimensions and carrier attributes.

## Handoff (for CEO and agents)

- Shipped / changed: Figure geometry repair and refreshed deterministic evidence.
- Decisions the team must respect: Preserve prose, Urdu wording, publication state and review status.
- Pending / next owner: Independent reviewer owns fresh G3; G5 remains pending.
- Paperclip issues affected: EFMP-303 Unit 5; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Gender norms overlapped Better employment and started inside its panel.
- Graders run and results (PASS/FAIL): Figure measurement PASS; G2 evidence PASS (8/8); content suite PASS (13/13).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Independent review of current unit inputs.
