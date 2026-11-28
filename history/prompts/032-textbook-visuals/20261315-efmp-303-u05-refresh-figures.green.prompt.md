---
id: 20261315
title: EFMP-303 Unit 5 figure redraw
stage: green
date: 2026-11-28
surface: agent
model: claude-sonnet-5-5
feature: 032-textbook-visuals
branch: crew/efmp-303-u05-refresh_figures
user: crew
command: crew efmp-303-u05-refresh_figures
labels: [claude, crew]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-303/unit-05/fig-U5-{1,2,3,4}{,.ur,.dark,.ur.dark}.svg
  - specs/content/svg-style-baseline.json
  - specs/content/efmp-303/tasks.md
tests:
  - scripts/measure-figure-text.mjs (16 SVGs, exit 0)
  - npm run check:svg-style
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Redrew fig-U5-1 to fig-U5-4 (EN and UR) with layer groups and named nodes and edges, derived the dark twins, and rendered EN beside UR.

## Outcome

- ✅ Impact: Unit 5 schematics meet the improved SVG standard.
- 🧪 Tests: measure-figure-text and check:svg-style pass; check:content is run after gate evidence.
- 📁 Files: 16 SVGs, style baseline, tracker.
- 🔁 Next prompts: fresh G3 run for Unit 5.
- 🧠 Reflection: the first render caught a box spill and misplaced Urdu brackets that the measure script did not flag.

## Handoff (for CEO and agents)

- Shipped / changed: four schematics redrawn, same ids, alt text and manifest rows. In fig-U5-3 the links between outer nodes are now dashed to set them apart from the branches; in fig-U5-4 barriers are octagons and the blocked path is one row.
- Decisions the team must respect: none new. No complex picture needed to be left as SVG.
- Pending / next owner: fresh G3 run; Urdu wording is carried over from the old .ur.svg and still needs G5 (for example "رجسٹر اور ضوابط" beside "enrolment, compliance").
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: Urdu SVG text starting or ending with brackets or commas needs right-to-left marks.
- Graders run and results (PASS/FAIL): measure-figure-text PASS; svg-style PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): have mirror-figure-rtl add the marks.
