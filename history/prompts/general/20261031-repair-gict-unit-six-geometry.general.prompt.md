---
id: 20261031
title: Repair GICT Unit Six Geometry
stage: general
date: 2026-10-27
surface: agent
model: GPT-6
feature: none
branch: crew/gict-300-u06-fix
user: crew
command: Read .crew/brief.md
labels: [codex, crew, figure-geometry]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/gict-300/unit-06/fig-U6-6.svg
 - static/img/figures/gict-300/unit-06/fig-U6-6.dark.svg
 - static/img/figures/gict-300/unit-06/fig-U6-8.ur.svg
 - static/img/figures/gict-300/unit-06/fig-U6-8.ur.dark.svg
 - specs/content/gict-300/tasks.md
 - specs/content/gict-300/reviews/unit-06/G2/
tests:
 - Full unit light SVG geometry measurement: PASS (16 sources)
 - figures:variants:check: PASS
 - check:content: rerun after variants regeneration
 - prepare-gate-evidence: required after repair commit
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Repaired the two table frames so captions sit outside the data grid, preserving wording, font sizes, canvas dimensions and prose. Regenerated dark twins. Refresh G2 evidence after the source commit and record that G3 needs a fresh run.

## Outcome

- ✅ Impact: Two reported caption spills repaired.
- 🧪 Tests: All 16 light sources measure clean; variants freshness passes. Full content checks and G2 evidence recorded in the follow-up commit.
- 📁 Files: Two light SVGs, their generated dark twins, unit G2 evidence, tracker and this PHR.
- 🔁 Next prompts: Fresh independent G3 review.
- 🧠 Reflection: The frames extended into caption space; ending each frame at its final data-row boundary removes the spill without moving text.

## Handoff (for CEO and agents)

- Shipped / changed: Geometry repair and generated dark twins; refreshed deterministic evidence follows the repair commit.
- Decisions the team must respect: Keep all EN and Urdu wording and font sizes; no viewBox or carrier change is needed. No G3/G5 certification claimed.
- Pending / next owner: Independent reviewer owns fresh G3; G5 remains pending.
- Paperclip issues affected: Crew job gict-300-u06-fix; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Two captions straddled table-frame boundaries. An initial content check overlapped source edits and detected stale dark twins before regeneration.
- Graders run and results (PASS/FAIL): Geometry PASS; variants freshness PASS; final content gate result recorded below after execution.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): No additional repair needed if final content checks pass.
