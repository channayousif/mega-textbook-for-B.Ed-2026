---
id: crew-efmp-301-u06-flashcards
title: crew flashcards EFMP-301 unit 6
stage: misc
date: 2026-11-25
surface: agent
model: claude
feature: efmp-301
branch: crew/efmp-301-u06-flashcards
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
 - specs/studio/flashcards/efmp-301/unit-06.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u06-flashcards

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u06-flashcards`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author the flashcard deck for EFMP-301 Unit 6 (Feature 032 phase C; owner, 2026-11-23: "Terms + server marking"). Read every English topic file of the unit and its Urdu mirror. For each topic, pick 6 to 10 key terms a learner must know from that topic, each one used in the topic's own text; prefer the topic's bold or defined terms. Write a plain definition of each in one or two sentences (at most 300 characters), saying only what the topic says (no new facts, no examples the text does not give), and its Urdu card: the Urdu term from `specs/content/terminology.csv` when a pair exists, otherwise the term as the Urdu topic writes it, and an academic-plain Urdu definition matching the English one. Write `specs/studio/flashcards/efmp-301/unit-06.json` as { "course": "EFMP-301", "unit": 6, "topics": { "1": { "en": [{ "term": "...", "definition": "..." }], "ur": [ ...same order... ] }, ... } }. No long dashes. Run `node scripts/build-studio-index.mjs --coverage` (it must not print "skipped" for this unit, and the unit leaves flashcards-needed.json) and commit both files. Do not edit glossary.json, terminology.csv, topic MDX or any file under specs/content/: decks stay outside the review evidence.

## Scope
EFMP-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-06/`.

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
- (efmp-301-u06-review_en-conflict1, fix, claude) The G3 en-review for EFMP-301 Unit 6 needs a fresh independent run. The run002 pass report doesn't match the current unit files, including the figures changed by `8bac57e5`.
- (efmp-301-u06-review_en-conflict1, fix, claude) `static/content-status.json` is now untracked; if `check:content-status` reports it stale, run `npm run build:content-status`.
- (efmp-301-u06-review_en, review_en, agy) Cycle 2 G3 review passed with 8 non-blocking advisory findings carried forward (spec key terms, ERQ word count, MCQ key clustering, and figure text spacing tolerances under updated geometry checks).
- (efmp-301-u06-review_en, review_en, agy) Stage G3 en-review remains open (▢) and advisory under ADR-0019; no reviewer initials added.
- (efmp-301-u06-fix, fix, opencode) G3 en-review for EFMP-301 Unit 6 is stale and needs a fresh independent run; the fig-U6-1 body font is now 13px (not 14px) by design - do not revert without re-measuring.


## Response snapshot

Added the 20-card EN/UR flashcard deck for EFMP-301 Unit 6 (topics 6.1 and 6.2), removed the unit from flashcards-needed.json, and committed both files with content gates passing.

## Outcome

- Impact: flashcards for EFMP-301 Unit 6 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the 20-card EN/UR flashcard deck for EFMP-301 Unit 6 (topics 6.1 and 6.2), removed the unit from flashcards-needed.json, and committed both files with content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - In Urdu, "Motivators" (Herzberg) is labelled "محرک (ہرزبرگ)" because the topic uses محرک for both terms; a G5 Urdu reviewer should confirm the label.
  - `build-studio-index.mjs --coverage` rewrites about 25 tracked files under `static/studio/flashcards/` for other courses; restore them before committing.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
