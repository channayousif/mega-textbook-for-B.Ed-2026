---
id: 20261031
title: Repair GQUR Unit Two Figure Geometry
stage: general
date: 2026-10-27
surface: agent
model: GPT-6 Codex
feature: none
branch: crew/gqur-300-u02-fix
user: owner
command: crew brief
labels: ["codex", "gqur-300", "figure-geometry"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/gqur-300/unit-02/
  - specs/content/gqur-300/tasks.md
  - specs/content/gqur-300/reviews/unit-02/G2/
tests:
  - Unit 2 light SVG text measurement: PASS (12 files)
  - npm run figures:variants
  - npm run check:content (compared with origin/main)
  - node scripts/prepare-gate-evidence.mjs GQUR-300 2
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Repositioned labels, wrapped examples, extended table border, and regenerated dark variants. Refresh G2 evidence after committing and mark G3 advisory review stale.

## Outcome

- ✅ Impact: Resolved all 11 reported text geometry problems without changing wording or canvas dimensions.
- 🧪 Tests: Measurement passes for all 12 light SVGs; content gates and evidence checks recorded with the work.
- 📁 Files: Four light SVG sources, four generated dark twins, G2 evidence, tracker, and this PHR.
- 🔁 Next prompts: Fresh independent G3 review.
- 🧠 Reflection: Measure text bounds rather than guessing label fit.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 2 figure geometry repairs and refreshed deterministic evidence.
- Decisions the team must respect: Preserve wording and font sizes; no G3/G5 certification or publication changes.
- Pending / next owner: Independent reviewer owns fresh G3; existing Urdu terminology and G5 work remains pending.
- Paperclip issues affected: GQUR-300 Unit 2; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Labels began inside tile rectangles and spilled; long table examples crossed borders.
- Graders run and results (PASS/FAIL): Figure measurement PASS; see gate logs for deterministic content checks.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): No further layout changes required.
