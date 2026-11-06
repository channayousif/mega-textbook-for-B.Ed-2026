---
id: crew-gicp-400-u07-author-conflict1
title: crew fix GICP-400 unit 7
stage: misc
date: 2026-11-07
surface: agent
model: opencode
feature: gicp-400
branch: crew/gicp-400-u07-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gicp-400/crew-gicp-400-u07-author-conflict1.misc.prompt.md
 - specs/content/gicp-400/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u07-author-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u07-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gicp-400-u07-author conflicts with main (specs/content/gicp-400/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GICP-400 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-07/`.

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
- (gicp-400-u07-author, author, opencode) The three hand-authored SVGs were not geometry-checked because the crew brief prohibits Chromium/Playwright; CI's figure-geometry job will measure them on the PR.
- (gicp-400-u07-author, author, opencode) `dean-2005-citizenship` is shared with GPKS-402 Unit 6; the GICP-400 bound excerpt is an original paraphrase of the verified abstract, so a reviewer should check the original passages.
- (gicp-400-u07-author, author, opencode) The branch is based on PR #461 (`f4bf69fd3`); origin/main has since advanced to PR #462 (`fa7d7fa89`), so the crew lead should expect a merge and a possible `tasks.md` conflict.

## Response snapshot

Merged origin/main, resolved the tasks.md conflict preserving both sides' entries, refreshed content-status, and committed the merge and PHR with all content gates passing.

## Outcome

- Impact: fix for GICP-400 Unit 7 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main, resolved the tasks.md conflict preserving both sides' entries, refreshed content-status, and committed the merge and PHR with all content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Independent review, Urdu translation, browser geometry validation and banner production remain pending for Unit 7.
  - The merge brought in main's Unit 1/2/3/4/5 content and review evidence; only the tasks.md conflict was resolved here.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
