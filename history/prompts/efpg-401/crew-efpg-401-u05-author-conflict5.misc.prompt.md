---
id: crew-efpg-401-u05-author-conflict5
title: crew fix EFPG-401 unit 5
stage: misc
date: 2026-11-11
surface: agent
model: opencode
feature: efpg-401
branch: crew/efpg-401-u05-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efpg-401/crew-efpg-401-u05-author-conflict5.misc.prompt.md
tests:
 - npm run check:content
 - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efpg-401/unit-05/*.svg
---

## Prompt

# Crew job efpg-401-u05-author-conflict5

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efpg-401-u05-author conflicts with main (specs/content/efpg-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFPG-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-05/`.

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
- (efpg-401-u05-author-conflict4, fix, opencode) Unit 5 EN still has no Urdu mirror, so G4 translation and independent G3/G5 review remain the open next steps.
- (efpg-401-u05-author-conflict4, fix, opencode) The merge brought in main's Unit 2/6 Urdu mirrors and Unit 7 EN; tasks.md now carries all their rows, so a future job should not re-add them.
- (efpg-401-u05-author-conflict3, fix, opencode) Unit 5 EN is authored with 14 placed figures; no Urdu mirror exists, so G4 translation and independent G3/G5 reviews are the open next steps.
- (efpg-401-u05-author-conflict3, fix, opencode) Unit 6 EN landed from main with 10 placed figures; its G4 Urdu mirror is a separate job.
- (efpg-401-u05-author-conflict3, fix, opencode) No D-/G-ID or glossary-key conflicts were found; main's 6 new glossary terms were retained in main's order.

## Response snapshot

Verified origin/main (6e5c58cc0) is already an ancestor of crew/efpg-401-u05-author, so `git merge origin/main` is a no-op; no conflict markers or unmerged paths remain. The merged specs/content/efpg-401/tasks.md keeps main's Unit 6 and 7 rows and adds the Unit 5 rows. All 14 content gates pass and measure-figure-text exits 0 on the 28 Unit 5 SVGs.

## Outcome

- Impact: fix verification for EFPG-401 Unit 5 by opencode (attempt 5); no content changes were needed.
- Tests: npm run check:content passed (14/14 gates); measure-figure-text exited 0 on 28 Unit 5 SVGs.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the origin/main merge is current and the content gates pass; no new content changes.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this job does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 5 EN still has no Urdu mirror, so G4 translation and independent G3/G5 review remain the open next steps.
  - The merge already brought in main's Unit 2/6 Urdu mirrors and Unit 7 EN; tasks.md carries all their rows, so a future job should not re-add them.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS; measure-figure-text PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
