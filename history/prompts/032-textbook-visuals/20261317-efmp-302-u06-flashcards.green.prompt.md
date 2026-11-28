---
id: 20261317
title: Crew efmp-302-u06-flashcards - EFMP-302 Unit 6 bilingual flashcard deck
stage: green
date: 2026-11-28
surface: agent
model: claude-sonnet-5-5
feature: 032-textbook-visuals
branch: crew/efmp-302-u06-flashcards
user: M Yousif Channa
command: crew flashcards job
labels: [claude, crew, interactivity]
links:
  spec: specs/032-textbook-visuals/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/studio/flashcards/efmp-302/unit-06.json
  - specs/studio/flashcards-needed.json
tests:
  - node scripts/build-studio-index.mjs --coverage (no skip for this unit)
  - npm run check:content (14 gates PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The brief, verbatim:

# Crew job efmp-302-u06-flashcards

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u06-flashcards`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author the flashcard deck for EFMP-302 Unit 6 (Feature 032 phase C; owner, 2026-11-23: "Terms + server marking"). Read every English topic file of the unit and its Urdu mirror. For each topic, pick 6 to 10 key terms a learner must know from that topic, each one used in the topic's own text; prefer the topic's bold or defined terms. Write a plain definition of each in one or two sentences (at most 300 characters), saying only what the topic says (no new facts, no examples the text does not give), and its Urdu card: the Urdu term from `specs/content/terminology.csv` when a pair exists, otherwise the term as the Urdu topic writes it, and an academic-plain Urdu definition matching the English one. Write `specs/studio/flashcards/efmp-302/unit-06.json` as { "course": "EFMP-302", "unit": 6, "topics": { "1": { "en": [{ "term": "...", "definition": "..." }], "ur": [ ...same order... ] }, ... } }. No long dashes. Run `node scripts/build-studio-index.mjs --coverage` (it must not print "skipped" for this unit, and the unit leaves flashcards-needed.json) and commit both files. Do not edit glossary.json, terminology.csv, topic MDX or any file under specs/content/: decks stay outside the review evidence.

## Scope
EFMP-302 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-302/`, and `static/img/figures/efmp-302/unit-06/`.

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
- (efmp-302-u06-refresh_figures, refresh_figures, claude) The fig-U6-1 to fig-U6-8 Urdu SVGs carry three spelling fixes (فراہمی, ناہمواری, قطار) and wrap some labels onto new lines; the next G5 review should check them against the Urdu topic text.
- (efmp-302-u06-refresh_figures, refresh_figures, claude) A fresh G3 run is still needed and needs owner authorisation (G-2026-64 / ADR-0019); the earlier S3 source and X1 scroll-region notes are unchanged.
- (efmp-302-u06-repair_en-r1, repair_en, opencode) S3 full-text source verification remains uncertain; no Unit 6 source excerpt is bound under `specs/content/efmp-302/sources/texts/`.
- (efmp-302-u06-repair_en-r1, repair_en, opencode) X1 generic scroll-region names need platform work outside unit scope; browser inspection remains pending under the brief's restrictions.
- (efmp-302-u06-repair_en-r1, repair_en, opencode) A fresh independent G3 review needs owner authorisation under G-2026-64 / ADR-0019 (D-2026-0005).

## Response snapshot

Authored the Unit 6 deck: 36 cards in English and Urdu across four topics (10, 8, 9, 9). A script
checked each term against its own topic's text in both languages; two English labels and one Urdu
label were corrected to the topic wording. Topic MDX, glossary, terminology bank and specs/content
were not edited.

## Outcome

- ✅ Impact: EFMP-302 Unit 6 topics gain flashcards; the unit leaves flashcards-needed.json.
- 🧪 Tests: coverage run printed no skip; all 14 content gates pass.
- 📁 Files: one new deck, one line removed from the needed list, this record.
- 🔁 Next prompts: crew lead to push and open the PR.
- 🧠 Reflection: the coverage run also rewrites other units' tracked files under static/studio/flashcards/; restore them before committing.

## Handoff (for CEO and agents)

- Shipped / changed: specs/studio/flashcards/efmp-302/unit-06.json (committed on the crew branch, not pushed).
- Decisions the team must respect: decks stay outside the review evidence.
- Pending / next owner: crew lead to push and open the PR. Urdu cards follow the topic wording, so a later G5 wording fix in the topics should be mirrored in the deck.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: three headword labels in the first draft were not verbatim in the topic text.
- Graders run and results (PASS/FAIL): verbatim-term script PASS after fix; content gates PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): add the verbatim-term check to the deck builder as a warning.
