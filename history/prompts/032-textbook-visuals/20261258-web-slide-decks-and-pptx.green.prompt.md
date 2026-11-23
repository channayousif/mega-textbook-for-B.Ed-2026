---
id: 20261258
title: Web slide decks and PowerPoint from unit outlines (Feature 032 phase B)
stage: green
date: 2026-11-23
surface: agent
model: claude-opus-5-5
feature: 032-textbook-visuals
branch: feat/032-slides
user: M Yousif Channa
command: continue with phase B slides
labels: [board-direct, studio, slides, crew]
links:
  spec: specs/032-textbook-visuals/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/studio/slides/efmp-301/unit-04.json
  - scripts/studio-slides.mjs, scripts/build-studio-index.mjs
  - scripts/studio/slides-pptx.py, scripts/studio/figure-pngs.mjs
  - static/studio/slides/efmp-301/unit-04.{en,ur}.pptx
  - src/components/Studio/StudioPanel.tsx (Presentation tab)
  - scripts/crew/{crew,planner,workers}.mjs (slides stage, `crew slides on|off`)
  - tests/unit/studio-slides.test.mjs, tests/crew/planner.test.mjs, tests/crew/worker-chains.test.mjs
tests:
  - vitest studio-slides + flashcards (6 passed)
  - node --test tests/crew (171 passed)
---

## Prompt

continue with phase B slides

## Response snapshot

- Outline per unit (specs/studio/slides/, outside every review manifest): title, subtitle and
  10 to 16 slides (section, points, figure, summary), English and Urdu, every point restating the
  unit's summaries. Pilot EFMP-301 Unit 4: 13 slides with the memory flowchart and the thinking map.
- renderDeck(): one self-contained HTML page per language on a fixed 1920x1080 stage scaled to the
  viewport (fixed a cropping bug: the stage is now centred absolutely), arrow keys reversed for
  Urdu, counter pinned left to right, print one slide per page, house colours, Nastaliq.
- PowerPoint: python-pptx (via uv) builds the same deck; figures rasterised in Chromium; Urdu
  paragraphs right to left. Verified by reopening (LibreOffice on the host cannot open pptx).
- Presentation tab in the Study Studio panel (embedded deck, full screen, PowerPoint download).
- Crew stage `slides` (`crew slides on`), one translated unit at a time.
- PR #741's merge had failed on a conflict with #739 while the watcher printed "MERGED"; resolved
  by merging main into the flashcards branch.

## Outcome

- ✅ Impact: units can be taught from slides in both languages, in the browser or PowerPoint.
- 🧪 Tests: unit 6/6, crew 171/171.
- 📁 Files: see front matter.
- 🔁 Next prompts: owner `crew slides on`; a watcher that checks the PR state after merging.
- 🧠 Reflection: a merge command's last line is not proof of a merge; read the PR state.

## Handoff (for CEO and agents)

- Shipped / changed: see files.
- Decisions the team must respect: slide outlines only restate unit text; decks stay out of review evidence.
- Pending / next owner: owner: `crew slides on`.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: a 1920px grid item is not centred when larger than its viewport; bidi reverses "3 / 13" in RTL.
- Graders run and results (PASS/FAIL): tests PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): a speaker-notes field shown in the PowerPoint only.
