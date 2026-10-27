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
  - check:content: all 13 gates passed after G2 and generated status refresh
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Wrapped three English labels and moved two Urdu wordmarks left, preserving wording, type sizes and viewBoxes. Regenerated dark variants. Committed geometry before preparing fresh G2 evidence, updated the Unit 4 tracker and left G3 open with the required stale notice.

## Outcome

- ✅ Impact: All six reported text-geometry defects repaired without prose changes.
- 🧪 Tests: All 32 SVG geometry checks pass; 46 palette tests pass; wording invariant verified. Fresh G2 evidence passes all eight draft gates; final content gates pass after refreshing the generated status report. Dark variant freshness passes for all 1006 sources. Light/dark contact-sheet inspection completed with palette variables resolved in scratch rendering because librsvg does not resolve them.
- 📁 Files: Five light sources, five dark twins, fresh G2 evidence with eight gate logs, and two Unit 4 tracker rows. The existing dirty generated static/content-status.json was refreshed locally and remains unstaged.
- 🔁 Next prompts: Fresh independent G3 review remains with the review owner.
- 🧠 Reflection: Moving Latin wordmarks left with a system font preserves Nastaliq instructional text while removing collisions.

## Handoff (for CEO and agents)

- Shipped / changed: Bounded geometry fixes for Unit 4 figures 3, 4, 6 and 7, with derived dark variants.
- Decisions the team must respect: Keep all wording, font sizes, viewBoxes and draft translation status; no review certification.
- Pending / next owner: Implementation and G2 refresh complete; independent G3 belongs to a fresh reviewer. No G3/G5 certification or translation-status changes.
- Paperclip issues affected: Crew efmp-302-u04-fix; no issue number supplied.

## Evaluation notes (flywheel)

- Failure modes observed: English table/panel spills and Urdu wordmark overlap; expected G2 manifest invalidation.
- Graders run and results (PASS/FAIL): PASS: geometry, wording invariant, palette. Initial check:content FAIL on stale G2, then stale generated status; both resolved, final 13/13 PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run fresh independent G3 against the repaired committed inputs.
