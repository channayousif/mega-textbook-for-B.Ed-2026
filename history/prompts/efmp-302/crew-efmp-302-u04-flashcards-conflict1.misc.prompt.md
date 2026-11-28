---
id: crew-efmp-302-u04-flashcards-conflict1
title: crew fix EFMP-302 unit 4
stage: misc
date: 2026-11-28
surface: agent
model: claude_crew
feature: efmp-302
branch: crew/efmp-302-u04-flashcards
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-302/20261312-efmp-302-u04-flashcards.green.prompt.md
 - history/prompts/efmp-302/crew-efmp-302-u04-flashcards.misc.prompt.md
 - history/prompts/efmp-302/crew-efmp-302-u04-flashcards-conflict1.misc.prompt.md
 - specs/studio/flashcards-needed.json
 - specs/studio/flashcards/efmp-302/unit-04.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-302-u04-flashcards-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u04-flashcards`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efmp-302-u04-flashcards conflicts with main (specs/studio/flashcards-needed.json). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

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
- (efmp-302-u04-flashcards, flashcards, claude) Urdu Topic 4.3 (topic-03.mdx line 35) renders "thirty-eight pupils" as "اڑتی آٹھ"; it should be "اڑتیس". Fix it in a G5 or repair job.
- (efmp-302-u04-flashcards, flashcards, claude) `build-studio-index.mjs --coverage` modifies tracked but gitignored `static/studio/flashcards/*` files; restore them before committing.
- (efmp-302-u04-flashcards, flashcards, claude) `efmp-302/3` is still listed in `flashcards-needed.json` on this branch (no Unit 3 deck here), so expect a possible merge conflict with the Unit 3 deck branch.
- (efmp-302-u04-fix, fix, codex) Pre-existing dirty static/content-status.json was refreshed locally and remains unstaged.
- (efmp-302-u04-fix, fix, codex) Fresh independent G3 required; G3/G5 remain open.

## Response snapshot

Merged origin/main into crew/efmp-302-u04-flashcards. Main had advanced to 42942847f (PR #957, NotebookLM health and Workers AI transcripts), but it did not touch specs/studio/flashcards-needed.json, so the anticipated conflict never materialised and the merge was clean. Kept the Unit 4 deck and its registry removal intact, restored the gitignored static/studio/flashcards working copies that build-studio-index rewrites, added this conflict-resolution PHR, and confirmed all 14 content gates pass.

## Outcome

- Impact: fix for EFMP-302 Unit 4 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 5 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main (42942847f) into crew/efmp-302-u04-flashcards with no conflict, kept the Unit 4 flashcard deck and its flashcards-needed.json removal intact, added the conflict-resolution PHR, and confirmed all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The anticipated `flashcards-needed.json` conflict never materialised: main's advance (PR #957) did not touch that file. Batch PR #958 carries the EFMP-302 Unit 3 deck and removes `efmp-302/3`; when it merges to main, this branch will conflict again in that file. The correct merged result drops `efmp-302/3`, `efmp-302/4` and `gent-401/7`.
  - This branch's `flashcards-needed.json` also drops `gent-401/7` because `build-studio-index.mjs --coverage` regenerates it that way (the glossary covers gent-401/7); main's committed copy is stale there.
  - Urdu Topic 4.3 (topic-03.mdx line 35) renders "thirty-eight pupils" as "اڑتی آٹھ"; it should be "اڑتیس". Fix it in a G5 or repair job.
  - Unit 4 G3 en-review and G5 Urdu tracker rows remain open per ADR-0019; this merge touched no content or gate evidence.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
