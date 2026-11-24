---
id: crew-efmp-408-u02-author-conflict5
title: crew fix EFMP-408 unit 2
stage: misc
date: 2026-11-25
surface: agent
model: claude_crew
feature: efmp-408
branch: crew/efmp-408-u02-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-408/tasks.md
 - specs/gaps.md
 - history/prompts/efmp-408/crew-efmp-408-u02-author-conflict5.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-408-u02-author-conflict5

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efmp-408-u02-author conflicts with main (specs/content/efmp-408/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-408 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-02/`.

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
- (efmp-408-u02-author-conflict4, fix, claude_crew) Unit 2 G4 Urdu translation and independent G3/G5 review remain open; banner fig-U2-7 stays prompt-only for the illustrate job.
- (efmp-408-u02-author-conflict4, fix, claude_crew) `specs/content/efmp-408/tasks.md` now carries Units 1, 2, 3 and 6 state, so read all four units' rows before editing it.
- (efmp-408-u02-author-conflict4, fix, claude_crew) The shared registries were untouched by main this merge, so no append-order or duplicate-ID work was required.
- (efmp-408-u02-author-conflict3, fix, claude_crew) Unit 2 G4 Urdu translation and independent G3/G5 review are still open; banner fig-U2-7 stays prompt-only for the illustrate job.
- (efmp-408-u02-author-conflict3, fix, claude_crew) `specs/content/efmp-408/tasks.md` now carries Unit 1, Unit 2 and Unit 3 state, so read all three units' rows before editing it.

## Response snapshot

Merged origin/main into crew/efmp-408-u02-author, resolved the single `specs/content/efmp-408/tasks.md` conflict as a union of both sides (Unit 2 row from this branch, Unit 3 row and the Unit 5 additions from main), and confirmed all 14 content gates pass.

## Outcome

- Impact: fix for EFMP-408 Unit 2 by claude_crew (attempt 1).
- Tests: npm run check:content passed (all 14 content gates PASS).
- Files: 3 file(s) authored or resolved by this job, listed above; the merge also pulled in main's Unit 3, 5 and 6 files.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-408-u02-author and resolved the only conflict, `specs/content/efmp-408/tasks.md`, as a union: status line and Unit 2 row from this branch, Unit 3 row and Unit 5 state from main. `specs/gaps.md` auto-merged main's G-2026-235 entry.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this merge certifies nothing.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 2 G4 Urdu translation and independent G3/G5 review remain open; banner fig-U2-7 stays prompt-only for the illustrate job.
  - `specs/content/efmp-408/tasks.md` now carries Units 1, 2, 3, 5 and 6 state, so read all five units' rows before editing it.
  - The shared registries were untouched by main this merge, so no append-order or duplicate-ID work was required.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
