---
id: crew-gicp-400-u06-author-conflict2
title: crew fix GICP-400 unit 6
stage: misc
date: 2026-11-06
surface: agent
model: opencode
feature: gicp-400
branch: crew/gicp-400-u06-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gicp-400/tasks.md
 - history/prompts/gicp-400/crew-gicp-400-u06-author-conflict2.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u06-author-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u06-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gicp-400-u06-author conflicts with main (specs/content/gicp-400/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GICP-400 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-06/`.

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
- (gicp-400-u06-author-conflict1, fix, opencode) Independent G3 review, Urdu translation, banner production and browser geometry checks for Unit 6 remain pending.
- (gicp-400-u06-author-conflict1, fix, opencode) `static/content-status.json` is gitignored; a fresh checkout must run `npm run build:content-status` before `check:content` passes.
- (gicp-400-u06-author-conflict1, fix, opencode) Main's Unit 4 and Unit 5 docs/specs/sources/figures now sit on this branch after the merge.
- (gicp-400-u06-author, author, codex) Independent review, Urdu translation, banner production and browser geometry checks remain pending.
- (gicp-400-u06-author, author, codex) Independent review, Urdu translation, banner production and browser geometry checks remain pending.

## Response snapshot

Merged origin/main into crew/gicp-400-u06-author, resolved the sole tasks.md conflict preserving both sides (main's Unit 2 rows and Unit 4 G3 advisory row, then this branch's Unit 6 rows and notes), regenerated content-status, and committed the merge plus this PHR with all 14 content gates green.

## Outcome

- Impact: fix for GICP-400 Unit 6 by opencode (attempt 2).
- Tests: npm run check:content passed after `npm run build:content-status`; all 14 content gates green.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gicp-400-u06-author and resolved the tasks.md conflict preserving both sides' entries; regenerated content-status; committed the merge plus this PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this merge does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Independent G3 review, Urdu translation, banner production and browser geometry checks for Unit 6 remain pending.
  - `static/content-status.json` is gitignored; a fresh checkout must run `npm run build:content-status` before `check:content` passes.
  - Main's Unit 2, Unit 4 and Unit 5 docs/specs/sources/figures now sit on this branch after the merge.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
