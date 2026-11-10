---
id: crew-efpg-401-u07-author-conflict2
title: crew merge main into EFPG-401 unit 7
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efpg-401
branch: crew/efpg-401-u07-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - glossary.json
 - specs/content/efpg-401/tasks.md
 - history/prompts/efpg-401/crew-efpg-401-u07-author-conflict2.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-401-u07-author-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u07-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efpg-401-u07-author conflicts with main (glossary.json, specs/content/efpg-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFPG-401 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-07/`.

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
- (efpg-401-u07-author, author, opencode) Unit 7 is English-only; the Urdu mirror (G4) is the next job and needs four `.ur.svg` plus `.ur.dark.svg` schematics, a `key_terms` block, and a UR index.
- (efpg-401-u07-author, author, opencode) The four EN figures are placed and `measure-figure-text` exits 0; the G2 evidence is recorded at `specs/content/efpg-401/reviews/unit-07/G2/20261110T141529122Z-gates.json`.
- (efpg-401-u07-author, author, opencode) `celce-murcia-1991` is declared under `## Unverifiable sources` (D-2026-0001); G3/G5 remain open.

## Response snapshot

merge origin/main into crew/efpg-401-u07-author

## Outcome

- Impact: resolved the glossary.json and specs/content/efpg-401/tasks.md conflicts for EFPG-401 Unit 7 by opencode (attempt 2).
- Tests: npm run check:content passed (all 14 content gates).
- Files: 3 file(s), listed above; the merge commit also carries main's Unit 6 authoring work.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merged origin/main into crew/efpg-401-u07-author; kept main's glossary entries (Audio-visual aid, Chart, Flash card, Realia, Language laboratory, Overhead projector) in main's order, then this branch's Objective-type test and Subjective-type test; merged the tracker status, Unit 6/7 rows, and Unit 6/7 stage rows and reading estimates.
- Decisions the team must respect: D-2026-0001 is the pre-existing owner ruling for unretrievable sources, so no renumbering was needed; G3/G5 stay open.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
