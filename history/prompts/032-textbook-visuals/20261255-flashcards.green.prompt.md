---
id: 20261255
title: Flashcards from the glossary, crew stage for the rest (Feature 032 phase C, part 2)
stage: green
date: 2026-11-23
surface: agent
model: claude-opus-5-5
feature: 032-textbook-visuals
branch: feat/032-flashcards
user: M Yousif Channa
command: continue with flashcards
labels: [board-direct, interactivity, crew]
links:
  spec: specs/032-textbook-visuals/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - scripts/build-studio-index.mjs (buildFlashcards, validateDeck, authored decks, --coverage)
  - scripts/build-glossary-origin.mjs, specs/studio/glossary-origin.json, specs/studio/flashcards-needed.json
  - src/components/Studio/Flashcards.tsx, StudioPanel.tsx, studio.module.css
  - scripts/crew/{crew,planner,workers}.mjs (flashcards stage, `crew flashcards on|off`)
  - tests/unit/flashcards.test.mjs, tests/crew/planner.test.mjs, tests/crew/worker-chains.test.mjs
tests:
  - vitest flashcards + figure-animations (6 passed)
  - node --test tests/crew (170 passed)
---

## Prompt

continue with flashcards

## Response snapshot

- The glossary (553 bilingual terms) already occurs in every unit's text, but naive matching
  gave junk ("Fraction" in a memory topic). Decks now rank each topic's own-course terms
  (course of origin from git blame, committed as specs/studio/glossary-origin.json because CI
  clones are shallow); another course's term only if multi-word and used three or more times; a
  topic with fewer than four good cards gets no deck. Result: 61 units, 130 topics, about 7 cards.
- glossary.json is bound into every unit's G3/G5 manifest, so adding terms there would stale the
  whole corpus. Authored decks therefore live in specs/studio/flashcards/<course>/unit-NN.json
  (the Feature 029 rule keeps Studio files out of review evidence). Crew stage `flashcards`
  (owner switch `crew flashcards on`, two at a time) authors them for the 79 units listed in
  specs/studio/flashcards-needed.json.
- <Flashcards> tab in the Study Studio panel: flip, previous, next, shuffle, keyboard, a print list.
- Self-check importer now reads every Urdu layout (Urdu letters with the Urdu full stop, bold keys, key
  tables, headings without "MCQ"): all 259 pages valid; live bank 1,400 EN + 1,190 UR items.

## Outcome

- ✅ Impact: flashcards for 61 units now; the crew can complete the rest without touching reviews.
- 🧪 Tests: unit 6/6, crew 170/170.
- 📁 Files: see front matter.
- 🔁 Next prompts: owner `crew flashcards on`; rerun build-glossary-origin after new units.
- 🧠 Reflection: the "add terms to glossary.json" plan would have re-opened every review.

## Handoff (for CEO and agents)

- Shipped / changed: see files.
- Decisions the team must respect: never edit glossary.json for flashcards; decks only in specs/studio/flashcards/.
- Pending / next owner: owner: `crew flashcards on`. Claude: Phase B slides.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: cross-course glossary matches; escaped closing backtick in a brief.
- Graders run and results (PASS/FAIL): tests PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): show card counts per unit in the crew status.
