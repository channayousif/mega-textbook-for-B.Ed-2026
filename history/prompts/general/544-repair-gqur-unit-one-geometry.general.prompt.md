---
id: 544
title: Repair GQUR unit one figure geometry
stage: general
date: 2026-10-27
surface: agent
model: GPT-6
feature: 012-visual-density-standard
branch: crew/gqur-300-u01-fix
user: crew
command: Read .crew/brief.md and execute
labels: [codex, figures, gqur-300]
links:
  spec: specs/012-visual-density-standard/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/gqur-300/unit-01/fig-U1-4.svg
  - static/img/figures/gqur-300/unit-01/fig-U1-6.svg
  - static/img/figures/gqur-300/unit-01/fig-U1-4.dark.svg
  - static/img/figures/gqur-300/unit-01/fig-U1-6.dark.svg
  - static/content-status.json
  - specs/content/gqur-300/tasks.md
  - specs/content/gqur-300/reviews/unit-01/G2/
tests:
  - Unit 1 light SVG geometry measurement
  - npm run figures:variants
  - npm run check:content
  - node scripts/prepare-gate-evidence.mjs GQUR-300 1
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Wrapped English table labels and extended table borders within existing viewBoxes. Preserved all instructional wording and Urdu sources. Regenerated dark variants. Refresh G2 evidence after the repair commit and mark the G3 advisory record stale.

## Outcome

- ✅ Impact: Repairs the nine reported text geometry findings.
- 🧪 Tests: All 12 light SVGs pass geometry. Initial content run found the expected stale Unit 1 G2 manifest. Fresh G2 evidence passes all eight commands. Final content validation passes all 13 gates after updating the generated tracker digest.
- 📁 Files: Two light SVG sources, two derived variants, G2 evidence and tracker.
- 🔁 Next prompts: Independent fresh G3 review remains pending.
- 🧠 Reflection: Use wrapping and larger table borders rather than smaller fonts.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 1 estimation and logical reasoning table geometry repaired.
- Decisions the team must respect: No wording, publication state, G3/G5 status or viewBox changes. The generated status file needs the new GQUR tracker digest; its pre-existing uncommitted provenance edits are preserved separately.
- Pending / next owner: Independent reviewers own fresh G3 and dependent G5 review; owner vocabulary rulings remain pending.
- Paperclip issues affected: GQUR-300 Unit 1 crew geometry repair; no issue identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Long labels exceeded table edges; final row exceeded the table border.
- Graders run and results (PASS/FAIL): Geometry PASS for all 12 light sources; variants regenerated; G2 evidence PASS for all eight commands; final content suite PASS for all 13 gates.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): No additional experiment required.
