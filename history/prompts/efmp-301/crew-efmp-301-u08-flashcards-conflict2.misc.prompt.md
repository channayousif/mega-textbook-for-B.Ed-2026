---
id: crew-efmp-301-u08-flashcards-conflict2
title: crew fix EFMP-301 unit 8
stage: misc
date: 2026-11-27
surface: agent
model: claude_crew
feature: efmp-301
branch: crew/efmp-301-u08-flashcards
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-301/crew-efmp-301-u08-flashcards-conflict1.misc.prompt.md
 - history/prompts/efmp-301/crew-efmp-301-u08-flashcards-conflict2.misc.prompt.md
 - history/prompts/efmp-301/crew-efmp-301-u08-flashcards.misc.prompt.md
 - specs/studio/flashcards-needed.json
 - specs/studio/flashcards/efmp-301/unit-08.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u08-flashcards-conflict2

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u08-flashcards`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efmp-301-u08-flashcards conflicts with main (specs/studio/flashcards-needed.json). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-301 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-08/`.

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
- (efmp-301-u08-flashcards-conflict1, fix, claude_crew) A fresh `node scripts/build-studio-index.mjs --coverage` would also add `efpc-411/2` and `efpc-411/3` to `specs/studio/flashcards-needed.json`; the merge deliberately kept the diff minimal, so they are still absent.
- (efmp-301-u08-flashcards-conflict1, fix, claude_crew) `build-studio-index.mjs` rewrites tracked files under `static/studio/flashcards/` for other courses; restore with `git checkout -- static/studio/` before committing.
- (efmp-301-u08-flashcards-conflict1, fix, claude_crew) Known leftovers for a G5/translation job on this unit: topics 8.1-8.3 use "کاؤنٹرائزنگ" for "management", and fig-U8-1/fig-U8-2 retain the Urdu label typos recorded in the earlier notes.
- (efmp-301-u08-flashcards, flashcards, claude) The Urdu mirrors of topics 8.1 to 8.3 use "کاؤنٹرائزنگ" for "management" throughout the body text, not only in the figure description; the deck avoids it, and a G5 or translation job should fix the topics.
- (efmp-301-u08-flashcards, flashcards, claude) `static/studio/flashcards/` is git-ignored but 61 files under it are still tracked, so `build-studio-index.mjs` dirties other courses' files; restore them before committing.


## Response snapshot

Merged origin/main into crew/efmp-301-u08-flashcards, resolving the lone specs/studio/flashcards-needed.json conflict by regenerating the coverage index (Units 8 and 9 leave the needed list, main's efpc-411 entries kept, efpg-402/1 added), committed the merge and its PHR, and left all 14 content gates green.

## Outcome

- Impact: fix for EFMP-301 Unit 8 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 5 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-301-u08-flashcards, resolving the lone specs/studio/flashcards-needed.json conflict by regenerating the coverage index (Units 8 and 9 leave the needed list, main's efpc-411 entries kept, efpg-402/1 added), committed the merge and its PHR, and left all 14 content gates green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `flashcards-needed.json` now lists `efpg-402/1` (new main unit, no deck) and keeps `efpc-411/2`/`efpc-411/3`; the standing fix is rerun `build-studio-index.mjs --coverage` then `git checkout -- static/studio/`.
  - `build-studio-index.mjs` rewrites tracked files under `static/studio/flashcards/` for other courses; restore them before committing.
  - Known leftovers for a G5/translation job: topics 8.1-8.3 use "کاؤنٹرائزنگ" for "management", and fig-U8-1/fig-U8-2 retain the Urdu label typos.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
