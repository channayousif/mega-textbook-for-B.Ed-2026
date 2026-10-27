---
id: 544
title: Repair EFMP303 unit two geometry
stage: general
date: 2026-10-28
surface: agent
model: gpt-6
feature: none
branch: crew/efmp-303-u02-fix
user: owner
command: crew brief
labels: [codex, figure-geometry, efmp-303]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-303/unit-02/fig-U2-2.svg
 - static/img/figures/efmp-303/unit-02/fig-U2-2.dark.svg
 - specs/content/efmp-303/tasks.md
 - specs/content/efmp-303/reviews/unit-02/G2/
tests:
 - Unit 2 light SVG geometry measurement
 - npm run check:content
 - node scripts/prepare-gate-evidence.mjs EFMP-303 2
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Wrapped the final focus cell of fig-U2-2 onto two lines, preserving wording, typography and viewBox. Regenerated its dark variant. Refresh G2 evidence after committing the repair and record G3 staleness without claiming certification.

## Outcome

- ✅ Impact: Removed the final-row label collision.
- 🧪 Tests: All twelve light SVG sources pass geometry measurement; content gate results recorded below after validation.
- 📁 Files: English light and derived dark figure, tracker, G2 evidence and this work record.
- 🔁 Next prompts: Independent G3 review followed by dependent G5 review.
- 🧠 Reflection: Wrapping the cell preserves the established layout without changing the figure dimensions.

## Handoff (for CEO and agents)

- Shipped / changed: Figure geometry repair and fresh deterministic G2 evidence.
- Decisions the team must respect: Preserve all prose and Urdu wording; no G3/G5 completion or certification is claimed.
- Pending / next owner: Independent reviewer owns fresh G3 and subsequent G5 review.
- Paperclip issues affected: Crew job efmp-303-u02-fix; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Final-row focus label was only 0.3 px from the year label.
- Graders run and results (PASS/FAIL): Geometry PASS for all twelve light SVGs. Further gate results recorded after execution.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): None required for the measured collision.
