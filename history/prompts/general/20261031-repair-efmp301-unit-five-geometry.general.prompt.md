---
id: 20261031
title: Repair EFMP301 Unit Five Geometry
stage: general
date: 2026-10-27
surface: agent
model: GPT-6 Codex
feature: 022-author-efmp-301
branch: crew/efmp-301-u05-fix
user: crew
command: crew brief
labels: ["codex", "crew", "figure-geometry"]
links:
  spec: specs/022-author-efmp-301/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-301/unit-05/fig-U5-1.svg
  - static/img/figures/efmp-301/unit-05/fig-U5-1.dark.svg
  - static/img/figures/efmp-301/unit-05/fig-U5-3.ur.svg
  - static/img/figures/efmp-301/unit-05/fig-U5-3.ur.dark.svg
  - static/img/figures/efmp-301/unit-05/fig-U5-4.ur.svg
  - static/img/figures/efmp-301/unit-05/fig-U5-4.ur.dark.svg
  - specs/content/efmp-301/tasks.md
  - specs/content/efmp-301/reviews/unit-05/G2/
tests:
  - Figure text measurement on all eight light SVGs: PASS
  - Content gates and refreshed G2 evidence: pending final verification
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Repair the five reported geometry findings, regenerate dark variants, validate content gates, refresh committed G2 evidence and flag G3 as stale.

## Outcome

- ✅ Impact: Widened the English Spearman panel, enlarged the Urdu giftedness note and moved two Urdu wordmarks to the bottom-left.
- 🧪 Tests: All eight light SVGs measure without findings; final gate and evidence verification follows the repair commit.
- 📁 Files: Three light sources, three derived dark variants, unit G2 evidence, tracker and this PHR.
- 🔁 Next prompts: Independent fresh G3 review remains required.
- 🧠 Reflection: Small geometry edits preserve all wording, viewBoxes and content carriers.

## Handoff (for CEO and agents)

- Shipped / changed: Figure geometry repair; gate evidence and tracker refresh follow in a second commit.
- Decisions the team must respect: No prose, translation wording, publication state or G3/G5 completion changes. Existing static/content-status.json edits belong to another session and remain untouched.
- Pending / next owner: Independent reviewer owns fresh G3; owner retains terminology escalations already recorded in tracker.
- Paperclip issues affected: EFMP-301 Unit 5 crew job; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Three English panel spills, one Urdu note spill and one Urdu caption/wordmark collision reproduced.
- Graders run and results (PASS/FAIL): Light geometry PASS; initial content gate reported only the expected stale dark variants before regeneration.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Verify regenerated variants and bind G2 evidence to the repair commit.
