---
id: 20261031
title: Repair EFMP-301 Unit 11 geometry
stage: general
date: 2026-10-27
surface: agent
model: GPT-6 Codex
feature: none
branch: crew/efmp-301-u11-fix
user: owner
command: crew brief
labels: ["codex", "figure-geometry"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-301/unit-11/fig-U11-4.ur.svg
 - static/img/figures/efmp-301/unit-11/fig-U11-4.ur.dark.svg
 - specs/content/efmp-301/tasks.md
 - specs/content/efmp-301/reviews/unit-11/G2/
tests:
 - Unit 11 light SVG text geometry: PASS
 - npm run check:content: PASS (13 gates)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Repaired the Urdu final-row geometry, moved its wordmark to the lower-left, and regenerated the dark variant. Preparing fresh G2 evidence and marking G3 stale as requested.

## Outcome

- ✅ Impact: Removes the measured final-row wordmark collision without changing Urdu wording or the viewBox.
- 🧪 Tests: All eight light SVGs pass geometry; all 13 content gates pass.
- 📁 Files: Urdu SVG source and derived dark twin; fresh G2 evidence and Unit 11 tracker references follow in the evidence commit.
- 🔁 Next prompts: Independent fresh G3 review remains required.
- 🧠 Reflection: Preserve wording and fix available space rather than reducing font size.

## Handoff (for CEO and agents)

- Shipped / changed: Urdu table geometry repair and regenerated dark variant; evidence refresh follows.
- Decisions the team must respect: No prose, viewBox, publication status, G3 or G5 certification changes. Existing static/content-status.json edits excluded.
- Pending / next owner: Fresh G3 run owned by an independent reviewer.
- Paperclip issues affected: EFMP-301 Unit 11; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Final Urdu label overlapped the bottom-right wordmark; panel ended above the final row.
- Graders run and results (PASS/FAIL): Geometry PASS; content gates PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Validate refreshed evidence and rerun content gates after tracker update.
