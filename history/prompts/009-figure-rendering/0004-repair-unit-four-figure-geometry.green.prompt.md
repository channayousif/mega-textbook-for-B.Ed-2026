---
id: 0004
title: Repair Unit Four Figure Geometry
stage: green
date: 2026-10-27
surface: agent
model: GPT-6
feature: 009-figure-rendering
branch: crew/efmp-302-u04-fix
user: owner
command: crew brief execution
labels: ["codex", "efmp-302-u04-fix"]
links:
  spec: specs/009-figure-rendering/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-302/unit-04/fig-U4-{3,4,6}.svg
  - static/img/figures/efmp-302/unit-04/fig-U4-{4,7}.ur.svg
  - corresponding generated dark variants
  - specs/content/efmp-302/tasks.md
  - specs/content/efmp-302/reviews/unit-04/G2/
tests:
  - Unit 4 SVG geometry: all 32 light/dark English/Urdu assets pass
  - Palette tests: 46 passed
  - XML wording comparison: unchanged across all unit SVGs
  - check:content: initial run 12/13, G2 stale after geometry repair; evidence refresh and final rerun follow
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Wrapped three English labels and moved two Urdu wordmarks left, preserving wording, type sizes and viewBoxes. Regenerated dark variants. Commit geometry before preparing fresh G2 evidence, update the Unit 4 tracker and leave G3 open with the required stale notice.

## Outcome

- ✅ Impact: All six reported text-geometry defects repaired without prose changes.
- 🧪 Tests: All 32 SVG geometry checks pass; 46 palette tests pass; wording invariant verified. Initial content gate failure is the expected stale Unit 4 G2 record and will be refreshed after this commit.
- 📁 Files: Five light sources and their derived dark twins; G2 evidence and tracker refresh follow in a separate commit.
- 🔁 Next prompts: Fresh independent G3 review remains with the review owner.
- 🧠 Reflection: Moving Latin wordmarks left with a system font preserves Nastaliq instructional text while removing collisions.

## Handoff (for CEO and agents)

- Shipped / changed: Bounded geometry fixes for Unit 4 figures 3, 4, 6 and 7, with derived dark variants.
- Decisions the team must respect: Keep all wording, font sizes, viewBoxes and draft translation status; no review certification.
- Pending / next owner: Refresh G2 after the geometry commit, then rerun content gates and commit evidence; independent G3 belongs to a fresh reviewer.
- Paperclip issues affected: Crew efmp-302-u04-fix; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: English table/panel spills and Urdu wordmark overlap; expected G2 manifest invalidation.
- Graders run and results (PASS/FAIL): PASS: geometry, wording invariant, palette. Initial check:content FAIL: Unit 4 G2 manifest stale after repair.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run fresh independent G3 against the repaired committed inputs.
