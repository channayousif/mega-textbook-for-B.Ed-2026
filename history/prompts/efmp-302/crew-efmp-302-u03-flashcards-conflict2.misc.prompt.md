---
id: crew-efmp-302-u03-flashcards-conflict2
title: crew fix EFMP-302 unit 3
stage: misc
date: 2026-11-28
surface: agent
model: claude_crew
feature: efmp-302
branch: crew/efmp-302-u03-flashcards
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/032-textbook-visuals/20261310-efmp-302-u03-flashcards.green.prompt.md
 - history/prompts/efmp-302/crew-efmp-302-u03-flashcards-conflict1.misc.prompt.md
 - history/prompts/efmp-302/crew-efmp-302-u03-flashcards-conflict2.misc.prompt.md
 - history/prompts/efmp-302/crew-efmp-302-u03-flashcards.misc.prompt.md
 - specs/studio/flashcards-needed.json
 - specs/studio/flashcards/efmp-302/unit-03.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-302-u03-flashcards-conflict2

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u03-flashcards`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efmp-302-u03-flashcards conflicts with main (specs/studio/flashcards-needed.json). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

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
- (efmp-302-u03-flashcards-conflict1, fix, claude_crew) The anticipated `flashcards-needed.json` conflict never materialized; if a later main regenerates that file with `efmp-302/3` still listed, re-remove it.
- (efmp-302-u03-flashcards-conflict1, fix, claude_crew) Urdu cards still copy topic wording (e.g. "اگلے سطح پر بھیجنا", "موزونیت"); mirror any G5 topic correction into `specs/studio/flashcards/efmp-302/unit-03.json`.
- (efmp-302-u03-flashcards-conflict1, fix, claude_crew) Unit 3 G3 en-review and G5 Urdu tracker rows remain open/stale per ADR-0019; this merge touched no content or gate evidence.
- (efmp-302-u03-flashcards, flashcards, claude) Urdu cards copy the topic wording, including awkward forms such as "اگلے سطح پر بھیجنا" and "موزونیت" for adaptability; if G5 corrects the topics, mirror the fix in the deck.
- (efmp-302-u03-flashcards, flashcards, claude) `build-studio-index.mjs --coverage` also rewrites tracked files under `static/studio/flashcards/`; restore them with `git checkout -- static/studio/flashcards` before committing.


## Response snapshot

Merged origin/main into crew/efmp-302-u03-flashcards, resolving the specs/studio/flashcards-needed.json conflict by dropping `efmp-302/3` (covered by this branch's deck) while keeping main's other entries, with all 14 content gates passing.

## Outcome

- Impact: fix for EFMP-302 Unit 3 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 6 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-302-u03-flashcards, resolving the specs/studio/flashcards-needed.json conflict by dropping `efmp-302/3` (covered by this branch's deck) while keeping main's other entries, with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - On any future merge, re-remove `efmp-302/3` from `specs/studio/flashcards-needed.json` if main regenerates it while this branch's deck is unmerged.
  - I kept `gent-401/7` in that file per the "never remove main's entries" rule, even though the merged tree now derives glossary coverage for it; a fresh `build-studio-index.mjs --coverage` would drop it.
  - Unit 3 G3 en-review and G5 Urdu tracker rows remain open/stale per ADR-0019; this merge touched no content or gate evidence.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
