---
id: crew-efmp-407-u04-author-conflict1
title: crew fix EFMP-407 unit 4
stage: misc
date: 2026-11-07
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u04-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-407/crew-efmp-407-u04-author-conflict1.misc.prompt.md
 - specs/content/efmp-407/sources/texts/unesco-2017-esd-objectives.md
 - specs/content/efmp-407/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u04-author-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-407-u04-author conflicts with main (specs/content/efmp-407/sources/texts/unesco-2017-esd-objectives.md, specs/content/efmp-407/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-407 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-04/`.

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
- (efmp-407-u04-author, author, claude) Browser text geometry for `fig-U4-1` to `fig-U4-6` is unmeasured until CI `figure-geometry` runs; banner `fig-U4-7` is still prompt-only.
- (efmp-407-u04-author, author, claude) `specs/content/efmp-407/tasks.md` is shared with sibling units, so expect merge conflicts there and keep every unit's rows.

## Feedback from the previous attempt
the worker exited without committing any change

## Response snapshot

Merged `origin/main` into `crew/efmp-407-u04-author` and resolved both conflicts: kept main's Unit 2 tracker rows and UNESCO bound source note, then appended this branch's Unit 4 rows and Unit 4 source support (append-only, main first, branch second, exact duplicates dropped).

## Outcome

- Impact: fix for EFMP-407 Unit 4 by opencode (attempt 1).
- Tests: `npm run check:content` passes all 14 gates after regenerating the git-ignored `static/content-status.json` locally; the committed state does not include that generated file.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged `origin/main` and resolved the add/add `unesco-2017-esd-objectives.md` and `tasks.md` conflicts by keeping both sides' entries (main's order first, branch's second, exact duplicates dropped); committed as `2b3bce174`.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch does not certify anything. `static/content-status.json` is git-ignored, was regenerated locally only to clear the gate, and is not part of the committed merge.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - `static/content-status.json` is git-ignored and is not in the commit; a root-scope job must regenerate it (`npm run build:content-status`) before publication.
  - Browser text geometry for `fig-U4-1` to `fig-U4-6` is unmeasured until CI `figure-geometry` runs; banner `fig-U4-7` is still prompt-only.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt exited without committing any change.
- Graders run and results (PASS/FAIL): check:content PASS (all 14 gates).
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
