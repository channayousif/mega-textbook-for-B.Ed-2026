---
id: crew-efmp-301-u03-flashcards
title: crew flashcards EFMP-301 unit 3
stage: misc
date: 2026-11-25
surface: agent
model: claude
feature: efmp-301
branch: crew/efmp-301-u03-flashcards
user: crew
command: crew flashcards
labels: ["crew", "claude", "flashcards"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/studio/flashcards-needed.json
 - specs/studio/flashcards/efmp-301/unit-03.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u03-flashcards

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u03-flashcards`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author the flashcard deck for EFMP-301 Unit 3 (Feature 032 phase C; owner, 2026-11-23: "Terms + server marking"). Read every English topic file of the unit and its Urdu mirror. For each topic, pick 6 to 10 key terms a learner must know from that topic, each one used in the topic's own text; prefer the topic's bold or defined terms. Write a plain definition of each in one or two sentences (at most 300 characters), saying only what the topic says (no new facts, no examples the text does not give), and its Urdu card: the Urdu term from `specs/content/terminology.csv` when a pair exists, otherwise the term as the Urdu topic writes it, and an academic-plain Urdu definition matching the English one. Write `specs/studio/flashcards/efmp-301/unit-03.json` as { "course": "EFMP-301", "unit": 3, "topics": { "1": { "en": [{ "term": "...", "definition": "..." }], "ur": [ ...same order... ] }, ... } }. No long dashes. Run `node scripts/build-studio-index.mjs --coverage` (it must not print "skipped" for this unit, and the unit leaves flashcards-needed.json) and commit both files. Do not edit glossary.json, terminology.csv, topic MDX or any file under specs/content/: decks stay outside the review evidence.

## Scope
EFMP-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-03/`.

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
- (efmp-301-u03-slides, slides, claude) Running `node scripts/build-studio-index.mjs` rewrites unrelated `static/studio/flashcards/*.json` files; restore them with `git checkout -- static/studio/flashcards/` before committing.
- (efmp-301-u03-refresh_figures, refresh_figures, claude) Unit 3 needs a fresh G3 run, because the last desk review (20261122T175629Z) came before the figure redraw.
- (efmp-301-u03-refresh_figures, refresh_figures, claude) Several Urdu figure labels were changed (scaffolding term, typos, two fig-U3-3 cells); G5 should check them, along with the tight three-line Urdu header in fig-U3-3 column 3.
- (efmp-301-u03-illustrate, illustrate, agy) G2 gate evidence refreshed and committed at `specs/content/efmp-301/reviews/unit-03/G2/20261113T015843872Z-gates.json`.
- (efmp-301-u03-illustrate, illustrate, agy) Unit 3 G3 remains open and unticked pending a fresh independent review cycle.


## Response snapshot

Wrote and committed the 34-card bilingual flashcard deck for EFMP-301 Unit 3 (topics 3.1 to 3.4) and the regenerated flashcards-needed.json, which no longer lists the unit.

## Outcome

- Impact: flashcards for EFMP-301 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Wrote and committed the 34-card bilingual flashcard deck for EFMP-301 Unit 3 (topics 3.1 to 3.4) and the regenerated flashcards-needed.json, which no longer lists the unit.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - For Motivation I used the terminology.csv pair محرک, but Urdu topic-03 writes حوصلہ, and topic-01 also uses محرک for "stimulus". G5 should decide whether the Motivation card's Urdu term is right.
  - Urdu topic-04 writes "مستقل بیساکی", which looks like a typo for بیساکھی. The card uses بیساکھی, so the topic text should be checked at G5. The Accommodation card uses مطابقت, because the terminology.csv entry سہولت کاری is for access adaptation, a different sense.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
