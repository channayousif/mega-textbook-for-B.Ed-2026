---
id: crew-efpg-401-u03-author-conflict4
title: crew fix EFPG-401 unit 3
stage: misc
date: 2026-11-11
surface: agent
model: opencode
feature: efpg-401
branch: crew/efpg-401-u03-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efpg-401/tasks.md
 - history/prompts/efpg-401/crew-efpg-401-u03-author-conflict4.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-401-u03-author-conflict4

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u03-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efpg-401-u03-author conflicts with main (specs/content/efpg-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFPG-401 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-03/`.

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
- (efpg-401-u03-author-conflict3, fix, opencode) tasks.md status line still reads main's "Units 1 and 2 authored; Unit 6 English draft complete"; left unchanged under the never-change-main's-entry rule.
- (efpg-401-u03-author-conflict3, fix, opencode) Unit 3 Urdu G4 mirror and independent G3/G5 remain the downstream jobs; branch is 0 behind origin/main and 11 ahead, no push and no PR.
- (efpg-401-u03-author-conflict2, fix, opencode) tasks.md now carries both Unit 2 (main) and Unit 3 (branch) rows; its status line still reads "Units 1 and 2 authored" from main and was left unchanged under the "never change main's entry" rule.
- (efpg-401-u03-author-conflict2, fix, opencode) Branch is 0 behind origin/main; no push and no PR opened. Unit 3 Urdu G4 mirror and independent G3/G5 remain the downstream jobs.
- (efpg-401-u03-author-conflict1, fix, opencode) The brief predicted a conflict in specs/content/efpg-401/tasks.md, but main had not modified that file since the merge base, so the three-way merge was clean; the branch's Unit 3 rows and main's Unit 1 rows coexist in the merged tracker.

## Response snapshot

Merged origin/main into crew/efpg-401-u03-author, resolved the tasks.md conflict by keeping main's more advanced Unit 2 row (with G4 Urdu translation) and the branch's Unit 3 row (authored, G2 done, twelve figures placed), left main's status line unchanged under the never-change-main's-entry rule, and committed the merge plus PHR with all 14 content gates passing.

## Outcome

- Impact: fix for EFPG-401 Unit 3 by opencode (attempt 4).
- Tests: npm run check:content passed in the job worktree.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efpg-401-u03-author, resolved the tasks.md conflict by keeping main's Unit 2 row and the branch's Unit 3 row, and committed with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this merge does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - tasks.md status line still reads main's "Units 1, 2 and 7 authored; Unit 6 English draft complete"; left unchanged under the never-change-main's-entry rule.
  - Unit 3 Urdu G4 mirror and independent G3/G5 remain the downstream jobs; branch is 0 behind origin/main and 12 ahead, no push and no PR.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
