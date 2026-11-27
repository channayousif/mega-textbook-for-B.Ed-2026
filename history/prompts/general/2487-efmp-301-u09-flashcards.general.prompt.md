---
id: 2487
title: EFMP-301 Unit 9 flashcard deck
stage: green
date: 2026-11-27
surface: agent
model: claude-sonnet-5-5
feature: none
branch: crew/efmp-301-u09-flashcards
user: crew
command: Read .crew/brief.md and carry it out
labels: [claude, flashcards, efmp-301]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/studio/flashcards/efmp-301/unit-09.json
  - specs/studio/flashcards-needed.json
tests:
  - node scripts/build-studio-index.mjs --coverage
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Task section of the brief, verbatim:

## Task
Author the flashcard deck for EFMP-301 Unit 9 (Feature 032 phase C; owner, 2026-11-23: "Terms + server marking"). Read every English topic file of the unit and its Urdu mirror. For each topic, pick 6 to 10 key terms a learner must know from that topic, each one used in the topic's own text; prefer the topic's bold or defined terms. Write a plain definition of each in one or two sentences (at most 300 characters), saying only what the topic says (no new facts, no examples the text does not give), and its Urdu card: the Urdu term from `specs/content/terminology.csv` when a pair exists, otherwise the term as the Urdu topic writes it, and an academic-plain Urdu definition matching the English one. Write `specs/studio/flashcards/efmp-301/unit-09.json` as { "course": "EFMP-301", "unit": 9, "topics": { "1": { "en": [{ "term": "...", "definition": "..." }], "ur": [ ...same order... ] }, ... } }. No long dashes. Run `node scripts/build-studio-index.mjs --coverage` (it must not print "skipped" for this unit, and the unit leaves flashcards-needed.json) and commit both files. Do not edit glossary.json, terminology.csv, topic MDX or any file under specs/content/: decks stay outside the review evidence.

## Response snapshot

Authored 22 bilingual cards (7, 7 and 8 for topics 9.1 to 9.3) from the English topic files and their Urdu mirrors, regenerated the coverage list, and ran the content gates.

## Outcome

- ✅ Impact: EFMP-301 Unit 9 now has an authored deck.
- 🧪 Tests: coverage build printed no skip for this unit; all 14 content gates passed.
- 📁 Files: one new deck, regenerated flashcards-needed.json.
- 🔁 Next prompts: independent Urdu check of the deck wording.
- 🧠 Reflection: the coverage run also rewrites tracked static deck files of other courses; those changes were reverted.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 9 flashcard deck, committed on the branch, not pushed.
- Decisions the team must respect: Urdu card terms follow terminology.csv where a pair exists.
- Pending / next owner: Urdu wording is not independently reviewed.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: terminology.csv renders Assessment as تشخیص while the Unit 9 Urdu topics write جانچ.
- Graders run and results (PASS/FAIL): content gates PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
