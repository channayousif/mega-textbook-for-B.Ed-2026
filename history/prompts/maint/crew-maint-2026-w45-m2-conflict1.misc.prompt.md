---
id: crew-maint-2026-w45-m2-conflict1
title: crew fix MAINT unit 452
stage: misc
date: 2026-11-08
surface: agent
model: opencode
feature: maint
branch: crew/maint-2026-w45-m2
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/maint/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/crew-maintenance/crew-maint-2026-w45-m2.misc.prompt.md
 - scripts/crew/batch.mjs
 - scripts/crew/crew.mjs
 - tests/crew/batch.test.mjs
 - tests/crew/worktrees.test.mjs
tests:
 - npm run check:content
---

## Prompt

# Crew job maint-2026-w45-m2-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/maint-2026-w45-m2`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
PR #498 conflicts with main. Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
MAINT Unit 452 only: its docs/licence and i18n files, its rows and folders under
`specs/content/maint/`, and `static/img/figures/maint/unit-452/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. The acceptance checks in your task pass; `npm run check:content` reports nothing new against origin/main;
   any `node --test tests/crew/*.test.mjs` or unit tests covering what you changed pass.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (maint-2026-w45-m2, maint_refactor, claude) If a row is inserted mid-table with a Unit/Stage pair that already appears, the occurrence numbers shift. That is safe (a real clash still returns null), but merged rows can come out in a different order than a hand merge would give.
- (maint-2026-w45-m2, maint_refactor, claude) The PR touches protected `scripts/crew/` files, so it goes to the owner; the reviewer should check both test files in the diff.


## Response snapshot

Merged origin/main into crew/maint-2026-w45-m2, resolving the single tests/crew/worktrees.test.mjs import conflict by keeping both main's briefRules and the branch's mergeTrackerRows imports; check:content and all 109 crew tests pass.

## Outcome

- Impact: fix for MAINT Unit 452 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 5 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/maint-2026-w45-m2, resolving the single tests/crew/worktrees.test.mjs import conflict by keeping both main's briefRules and the branch's mergeTrackerRows imports; check:content and all 109 crew tests pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Merge commit is local only (not pushed); PR diff vs origin/main touches only the PHR plus scripts/crew/{batch,crew}.mjs and tests/crew/{batch,worktrees}.test.mjs, no course content.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
