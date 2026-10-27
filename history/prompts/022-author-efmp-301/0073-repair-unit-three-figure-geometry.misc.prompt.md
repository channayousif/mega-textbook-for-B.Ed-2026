---
id: 0073
title: Repair unit three figure geometry
stage: misc
date: 2026-10-27
surface: agent
model: GPT-6 Codex
feature: 022-author-efmp-301
branch: crew/efmp-301-u03-fix
user: owner
command: crew brief
labels: ["codex", "figure-geometry"]
links:
  spec: specs/022-author-efmp-301/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-301/unit-03/fig-U3-{6,7,9}.svg
  - static/img/figures/efmp-301/unit-03/fig-U3-{6,7,9}.dark.svg
  - specs/content/efmp-301/tasks.md
  - specs/content/efmp-301/reviews/unit-03/G2/
tests:
  - measure-figure-text on all 36 Unit 3 SVGs: PASS
  - check:content: initial stale G2 repaired; final 12/13, derived content-status stale after tracker change; clean origin/main 13/13
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Repaired eight text-geometry findings by wrapping labels and moving text without changing wording, fonts, or canvas size. Regenerated dark variants. Fresh G2 evidence passed all eight draft checks after repair commit 6fd621a4; tracker updated and G3 marked stale.

## Outcome

- ✅ Impact: Readable labels with no measured overlaps or spills.
- 🧪 Tests: All 36 SVGs and variant freshness pass. G2 draft checks pass. Final content suite passes 12/13; origin/main passes 13/13. Tracker digest requires regenerating the out-of-scope static/content-status.json, awaiting owner scope approval.
- 📁 Files: Three English light sources and their generated dark twins; fresh G2 evidence and tracker.
- 🔁 Next prompts: Independent fresh G3 review.
- 🧠 Reflection: Preserve Urdu wording and avoid unnecessary carrier or prose changes.

## Handoff (for CEO and agents)

- Shipped / changed: Eight geometry failures repaired; dark twins regenerated.
- Decisions the team must respect: No wording, font size, viewBox, prose, publication state, or G3/G5 completion changes.
- Pending / next owner: Fresh independent G3 run belongs to review crew; derived content-status regeneration awaits owner scope approval.
- Paperclip issues affected: EFMP-301 Unit 3 crew repair; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Initial content run correctly rejects stale G2 after SVG changes. Existing figure 1 cosmetic wordmark collisions remain non-failing.
- Graders run and results (PASS/FAIL): Geometry PASS; final content 12/13 due to stale derived status; clean main 13/13.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): With owner scope approval, regenerate derived content status and rerun content gates.
