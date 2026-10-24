---
id: crew-maint-2026-w43-m1-conflict1
title: crew fix MAINT unit 431
stage: misc
date: 2026-10-24
surface: agent
model: opencode
feature: maint
branch: crew/maint-2026-w43-m1
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/maint/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/crew-maintenance/crew-maint-2026-w43-m1.misc.prompt.md
 - history/prompts/general/20261026-repair-crew-worktree-generated-status.general.prompt.md
 - scripts/crew/crew.mjs
 - specs/intelligence/registry.md
 - tests/crew/worktrees.test.mjs
tests:
 - npm run check:content
---

## Prompt

# Crew job maint-2026-w43-m1-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/maint-2026-w43-m1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
PR #326 conflicts with main. Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
MAINT Unit 431 only: its docs/licence and i18n files, its rows and folders under
`specs/content/maint/`, and `static/img/figures/maint/unit-431/`.

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
- (maint-2026-w43-m1, maint_refactor, codex) Protected crew script changes require owner review.
- (maint-2026-w43-m1, maint_refactor, codex) Crew suite retains one baseline failure in workers.test.mjs: expected codex, received agy_claude.
- (maint-2026-w43-m1, maint_refactor, codex) Protected crew script changes require owner review.


## Response snapshot

Merged origin/main into crew/maint-2026-w43-m1, resolving the static/content-status.json modify/delete conflict by keeping main's version, and confirmed all 13 content gates pass.

## Outcome

- Impact: fix for MAINT Unit 431 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 5 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/maint-2026-w43-m1, resolving the static/content-status.json modify/delete conflict by keeping main's version, and confirmed all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - workers.test.mjs retains the known baseline failure (expected codex, received agy_claude) reported by the earlier maint_refactor job  -  not introduced by this merge.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
