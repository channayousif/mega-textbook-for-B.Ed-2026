---
id: crew-efpg-401-u06-author-conflict1
title: crew merge EFPG-401 unit 6 author conflicts
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efpg-401
branch: crew/efpg-401-u06-author
user: crew
command: crew merge
labels: ["crew", "opencode", "merge"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efpg-401/tasks.md
 - history/prompts/efpg-401/crew-efpg-401-u06-author-conflict1.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-401-u06-author-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u06-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efpg-401-u06-author conflicts with main (specs/content/efpg-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFPG-401 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-06/`.

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
- (efpg-401-u06-author, author, opencode) Urdu mirror (G4) and independent G3 review remain open; figures are EN-only, no `.ur.svg` yet.
- (efpg-401-u06-author, author, opencode) G2 evidence is at `specs/content/efpg-401/reviews/unit-06/G2/20261110T133127223Z-gates.json`; re-run `prepare-gate-evidence` if unit bytes change.
- (efpg-401-u06-author, author, opencode) `measure-figure-text` reports two cosmetic wordmark collisions (fig-U6-8, fig-U6-9) that exit 0.

## Response snapshot

Merged origin/main into crew/efpg-401-u06-author and resolved the single conflict in specs/content/efpg-401/tasks.md, keeping main's Unit 2 rows and this branch's Unit 6 rows; no shared-registry ID collisions, and all 14 content gates pass.

## Outcome

- Impact: merge conflict resolution for EFPG-401 Unit 6 author branch by opencode (attempt 1).
- Tests: npm run check:content passed (14/14) after `npm run build:content-status`.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efpg-401-u06-author; resolved the tasks.md conflict by keeping main's Unit 2 stage rows and this branch's Unit 6 stage rows, with a combined status line; all 14 content gates pass.
- Decisions the team must respect: the merged tracker now reports Units 1 and 2 authored plus Unit 6 English draft complete; no main entry was altered or removed.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 6 G3/G5 remain open and figures are EN-only; the Urdu mirror is a separate job.
  - `static/content-status.json` is gitignored and was regenerated locally; CI's prestart hook rebuilds it.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
