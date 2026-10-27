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
  - check:content: initial 12/13, stale G2 to refresh after commit
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Repaired eight text-geometry findings by wrapping labels and moving text without changing wording, fonts, or canvas size. Regenerated dark variants. Refreshing G2 evidence after the repair commit.

## Outcome

- ✅ Impact: Readable labels with no measured overlaps or spills.
- 🧪 Tests: All 36 SVGs pass geometry; initial content gate failure is the expected stale G2 manifest.
- 📁 Files: Three English light sources and their generated dark twins; G2 evidence and tracker follow after commit.
- 🔁 Next prompts: Independent fresh G3 review.
- 🧠 Reflection: Preserve Urdu wording and avoid unnecessary carrier or prose changes.

## Handoff (for CEO and agents)

- Shipped / changed: Eight geometry failures repaired; dark twins regenerated.
- Decisions the team must respect: No wording, font size, viewBox, prose, publication state, or G3/G5 completion changes.
- Pending / next owner: Fresh independent G3 run belongs to review crew; G2 refresh follows repair commit.
- Paperclip issues affected: EFMP-301 Unit 3 crew repair; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Initial content run correctly rejects stale G2 after SVG changes. Existing figure 1 cosmetic wordmark collisions remain non-failing.
- Graders run and results (PASS/FAIL): Geometry PASS; initial content 12/13 pending evidence refresh.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Refresh G2 evidence and rerun all content gates.
