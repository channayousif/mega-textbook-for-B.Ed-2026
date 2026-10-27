---
id: 544
title: Repair GICT-300 Unit 2 figure geometry
stage: general
date: 2026-10-27
surface: agent
model: GPT-6 Codex
feature: gict-300-unit-02
branch: crew/gict-300-u02-fix
user: owner
command: crew brief
labels: [codex, crew]
links:
  spec: specs/content/gict-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/gict-300/unit-02/fig-U2-3.svg
  - static/img/figures/gict-300/unit-02/fig-U2-6.svg
  - static/img/figures/gict-300/unit-02/fig-U2-6.ur.svg
  - specs/content/gict-300/tasks.md
tests:
  - Unit 2 SVG Chromium geometry measurement
  - npm run check:content
  - node scripts/prepare-gate-evidence.mjs GICT-300 2
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Repositioned the storage arrow label, wrapped the English boot label, and centered Urdu boot labels inside their panels. Regenerated dark variants. Refresh G2 evidence after committing and record stale G3 review.

## Outcome

- ✅ Impact: All five reported geometry findings repaired without wording changes.
- 🧪 Tests: All sixteen light SVGs pass geometry measurement; content gates and evidence results recorded in task handoff.
- 📁 Files: Three light SVGs, three generated dark twins, G2 evidence and tracker.
- 🔁 Next prompts: Fresh independent G3 and G5 review remain pending.
- 🧠 Reflection: Correct anchoring removes apparent adjacent-panel spills without altering Urdu copy.

## Handoff (for CEO and agents)

- Shipped / changed: Geometry repair and derived variants; refreshed G2 evidence.
- Decisions the team must respect: Preserve all wording and publication/review status; no certification.
- Pending / next owner: Independent reviewers own fresh G3/G5; owner owns rendered inspection.
- Paperclip issues affected: GICT-300 Unit 2; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Rotated label exceeded measurement boundary; wide English line collided; Urdu end anchors placed labels outside their panels.
- Graders run and results (PASS/FAIL): Geometry PASS for all light Unit 2 SVGs; see gate evidence and task output for content checks.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Independent review of repaired figures.
