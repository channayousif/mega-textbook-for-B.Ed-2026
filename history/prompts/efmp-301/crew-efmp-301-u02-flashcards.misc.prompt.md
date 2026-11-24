---
id: crew-efmp-301-u02-flashcards
title: crew flashcards EFMP-301 unit 2
stage: misc
date: 2026-11-24
surface: agent
model: claude-opus-5-5
feature: efmp-301
branch: crew/efmp-301-u02-flashcards
user: crew
command: crew flashcards
labels: ["crew", "claude", "flashcards"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/studio/flashcards/efmp-301/unit-02.json
  - specs/studio/flashcards-needed.json
tests:
  - node scripts/build-studio-index.mjs --coverage
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Authored the EFMP-301 Unit 2 flashcard deck (Feature 032 phase C): 35 bilingual cards across the four topics (9, 8, 10, 8). Terms come from each topic's own bold or defined terms; English definitions restate only the topic text; Urdu terms follow terminology.csv where a pair exists (Development, Maturation, Learning, Heredity, Environment, Adolescence, Cognitive/Emotional/Social Development, Peer Group), otherwise the Urdu topic's own wording. build-studio-index --coverage printed no "skipped" line and efmp-301/2 left flashcards-needed.json.

## Outcome

- Impact: EFMP-301 Unit 2 now has an authored flashcard deck outside the review evidence.
- Tests: build-studio-index --coverage clean for this unit; npm run check:content run (see final report).
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: the regenerated flashcards-needed.json also gained gent-401 units 1, 3, 4, 6, 7, which come from main's newer content, not from this job.

## Handoff (for CEO and agents)

- Shipped / changed: specs/studio/flashcards/efmp-301/unit-02.json; flashcards-needed.json regenerated.
- Decisions the team must respect: the "Learning" card uses the terminology.csv Urdu term سیکھنا while the Urdu topic prose writes تعلم; the Urdu definition names both. No topic MDX, glossary or terminology file was changed.
- Pending / next owner: owner spot-check of the deck if wanted; no gate is affected.
- Notes for the next job on this unit: tracked static/studio/flashcards files for other courses drift when the index is rebuilt; this job reverted them rather than commit out-of-scope changes.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): build-studio-index validateDeck PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
