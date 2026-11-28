---
id: crew-efmp-302-u03-flashcards
title: crew flashcards EFMP-302 unit 3
stage: misc
date: 2026-11-28
surface: agent
model: claude
feature: efmp-302
branch: crew/efmp-302-u03-flashcards
user: crew
command: crew flashcards
labels: ["crew", "claude", "flashcards"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/032-textbook-visuals/20261310-efmp-302-u03-flashcards.green.prompt.md
 - specs/studio/flashcards-needed.json
 - specs/studio/flashcards/efmp-302/unit-03.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-302-u03-flashcards

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u03-flashcards`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author the flashcard deck for EFMP-302 Unit 3 (Feature 032 phase C; owner, 2026-11-23: "Terms + server marking"). Read every English topic file of the unit and its Urdu mirror. For each topic, pick 6 to 10 key terms a learner must know from that topic, each one used in the topic's own text; prefer the topic's bold or defined terms. Write a plain definition of each in one or two sentences (at most 300 characters), saying only what the topic says (no new facts, no examples the text does not give), and its Urdu card: the Urdu term from `specs/content/terminology.csv` when a pair exists, otherwise the term as the Urdu topic writes it, and an academic-plain Urdu definition matching the English one. Write `specs/studio/flashcards/efmp-302/unit-03.json` as { "course": "EFMP-302", "unit": 3, "topics": { "1": { "en": [{ "term": "...", "definition": "..." }], "ur": [ ...same order... ] }, ... } }. No long dashes. Run `node scripts/build-studio-index.mjs --coverage` (it must not print "skipped" for this unit, and the unit leaves flashcards-needed.json) and commit both files. Do not edit glossary.json, terminology.csv, topic MDX or any file under specs/content/: decks stay outside the review evidence.

## Scope
EFMP-302 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-302/`, and `static/img/figures/efmp-302/unit-03/`.

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
- (efmp-302-u03-fix, fix, opencode) G3 en-review row for Unit 3 is stale and needs a fresh independent G3 run (figure bytes changed). G5 Urdu row carries the same dependency (G-2026-65).
- (efmp-302-u03-translate-r1, translate, agy) translation_status stays draft on all files pending independent G5 Urdu review; G4 and G5 tracker rows remain open per ADR-0019.
- (efmp-302-u03-translate-r1, translate, agy) Build and dev server inspection were omitted per the brief; current rendered Urdu inspection (360px and A4 print) remains owed by the independent G5 review session.
- (efmp-302-u03-translate-r1, translate, agy) Seventeen unbanked concept labels from concepts/unit-03.md remain recorded for curriculum owner review in reviews/unit-03/G4/translation-handoff.md.


## Response snapshot

Added the EFMP-302 Unit 3 bilingual flashcard deck (41 cards across five topics), removed the unit from flashcards-needed.json and recorded the PHR.

## Outcome

- Impact: flashcards for EFMP-302 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the EFMP-302 Unit 3 bilingual flashcard deck (41 cards across five topics), removed the unit from flashcards-needed.json and recorded the PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu cards copy the topic wording, including awkward forms such as "اگلے سطح پر بھیجنا" and "موزونیت" for adaptability; if G5 corrects the topics, mirror the fix in the deck.
  - `build-studio-index.mjs --coverage` also rewrites tracked files under `static/studio/flashcards/`; restore them with `git checkout -- static/studio/flashcards` before committing.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
