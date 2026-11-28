---
id: 20261312
title: EFMP-302 Unit 4 bilingual flashcard deck
stage: green
date: 2026-11-28
surface: agent
model: claude-sonnet-5-5
feature: efmp-302
branch: crew/efmp-302-u04-flashcards
user: crew
command: crew flashcards
labels: ["crew", "claude", "flashcards"]
links:
  spec: specs/032-textbook-visuals
  ticket: null
  adr: null
  pr: null
files:
 - specs/studio/flashcards/efmp-302/unit-04.json
 - specs/studio/flashcards-needed.json
tests:
 - node scripts/build-studio-index.mjs --coverage
 - npm run check:content
---

## Prompt

# Crew job efmp-302-u04-flashcards

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u04-flashcards`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author the flashcard deck for EFMP-302 Unit 4 (Feature 032 phase C; owner, 2026-11-23: "Terms + server marking"). Read every English topic file of the unit and its Urdu mirror. For each topic, pick 6 to 10 key terms a learner must know from that topic, each one used in the topic's own text; prefer the topic's bold or defined terms. Write a plain definition of each in one or two sentences (at most 300 characters), saying only what the topic says (no new facts, no examples the text does not give), and its Urdu card: the Urdu term from `specs/content/terminology.csv` when a pair exists, otherwise the term as the Urdu topic writes it, and an academic-plain Urdu definition matching the English one. Write `specs/studio/flashcards/efmp-302/unit-04.json` as { "course": "EFMP-302", "unit": 4, "topics": { "1": { "en": [{ "term": "...", "definition": "..." }], "ur": [ ...same order... ] }, ... } }. No long dashes. Run `node scripts/build-studio-index.mjs --coverage` (it must not print "skipped" for this unit, and the unit leaves flashcards-needed.json) and commit both files. Do not edit glossary.json, terminology.csv, topic MDX or any file under specs/content/: decks stay outside the review evidence.

## Scope
EFMP-302 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-302/`, and `static/img/figures/efmp-302/unit-04/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (efmp-302-u04-fix, fix, codex) Pre-existing dirty static/content-status.json was refreshed locally and remains unstaged.
- (efmp-302-u04-fix, fix, codex) Fresh independent G3 required; G3/G5 remain open.
- (efmp-302-u04-fix, fix, codex) Pre-existing dirty static/content-status.json was refreshed locally and remains unstaged.
- (efmp-302-u04-translate-r1, translate, opencode) translation_status stays draft per the skill; G4/G5 tracker rows remain open per ADR-0019; independent G5 review in a fresh session is the next step.

## Response snapshot

Authored the EFMP-302 Unit 4 deck (topics 4.1 to 4.4: 8, 8, 8 and 7 cards, English and Urdu in the
same order) from the English topics and their Urdu mirrors, and regenerated the coverage list.

## Outcome

- ✅ Impact: Unit 4 has an authored flashcard deck and has left flashcards-needed.json.
- 🧪 Tests: coverage build printed no "skipped" line; all 14 content gates passed.
- 📁 Files: the deck, flashcards-needed.json and this record.
- 🔁 Next prompts: G5 Urdu review of Unit 4.
- 🧠 Reflection: the coverage build also rewrites tracked files under static/studio/flashcards/; they were restored.

## Handoff (for CEO and agents)

- Shipped / changed: deck committed on the crew branch, not pushed, no PR.
- Decisions the team must respect: decks stay outside the review evidence; nothing under specs/content/ changed.
- Pending / next owner: Urdu Topic 4.3 renders "thirty-eight pupils" as "اڑتی آٹھ" (should be اڑتیس); a G5 or repair job should fix it.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: the coverage build leaves unrelated tracked static files modified.
- Graders run and results (PASS/FAIL): content gates PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): untrack the gitignored static/studio/flashcards/ files.
