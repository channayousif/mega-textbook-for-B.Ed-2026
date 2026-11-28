---
id: crew-efmp-302-u02-flashcards-conflict2
title: crew fix EFMP-302 unit 2
stage: misc
date: 2026-11-28
surface: agent
model: claude_crew
feature: efmp-302
branch: crew/efmp-302-u02-flashcards
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-302/crew-efmp-302-u02-flashcards-conflict1.misc.prompt.md
 - history/prompts/efmp-302/crew-efmp-302-u02-flashcards-conflict2.misc.prompt.md
 - history/prompts/efmp-302/crew-efmp-302-u02-flashcards.misc.prompt.md
 - specs/studio/flashcards-needed.json
 - specs/studio/flashcards/efmp-302/unit-02.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-302-u02-flashcards-conflict2

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u02-flashcards`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efmp-302-u02-flashcards conflicts with main (specs/studio/flashcards-needed.json). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-302 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-302/`, and `static/img/figures/efmp-302/unit-02/`.

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
- (efmp-302-u02-flashcards-conflict1, fix, claude_crew) specs/studio/flashcards-needed.json now omits efmp-302/2, so a future `build-studio-index.mjs --coverage` will report 82 covered / 87 needing a deck; the 22 out-of-scope reorder diffs it produced are pre-existing drift on main, not this branch's.
- (efmp-302-u02-flashcards, flashcards, claude) The Urdu flashcard terms and definitions have had no independent Urdu review; "غور و فکر پر مبنی فیصلہ سازی" is still marked a draft phrase in terminology.csv.
- (efmp-302-u02-refresh_figures, refresh_figures, claude) A fresh independent G3 review is needed because the figures changed (new ▢ row); the earlier notes say it needs owner sign-off under G-2026-63, and G5 stays pending per ADR-0019.
- (efmp-302-u02-refresh_figures, refresh_figures, claude) Urdu twins were rebuilt with the mirror script and checked by eye in this job, but they still need a G5 reviewer, especially the fig-U2-4 lines from the gaps and the wrapped fig-U2-5 labels.
- (efmp-302-u02-repair_en-r1, repair_en, claude) All d78cf623 findings were already resolved on main, so the next step is a fresh independent G3 review, and running it needs owner sign-off under G-2026-63 (no review cycles are left under ADR-0019).


## Response snapshot

Merged origin/main into crew/efmp-302-u02-flashcards, resolving the flashcards-needed.json conflict by dropping both sides' removed efmp-302 entries, and confirmed all 14 content gates pass.

## Outcome

- Impact: fix for EFMP-302 Unit 2 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 5 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-302-u02-flashcards, resolving the flashcards-needed.json conflict by dropping both sides' removed efmp-302 entries, and confirmed all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - A fresh independent G3 review of the changed figures still needs owner sign-off under G-2026-63; G5 stays pending per ADR-0019.
  - `specs/studio/flashcards/efmp-302/` now carries both unit-01.json (main) and unit-02.json (this branch); flashcards-needed.json lists only efmp-302/3 through /6.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
