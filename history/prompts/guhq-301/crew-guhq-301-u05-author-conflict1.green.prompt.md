---
id: crew-guhq-301-u05-author-conflict1
title: crew merge conflict resolution GUHQ-301 unit 5
stage: misc
date: 2026-11-22
surface: agent
model: agy
feature: guhq-301
branch: crew/guhq-301-u05-author
user: crew
command: crew conflict
labels: ["crew", "agy", "conflict1"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/guhq-301/tasks.md
  - history/prompts/guhq-301/crew-guhq-301-u05-author-conflict1.green.prompt.md
tests:
  - npm run build:content-status
  - npm run check:content
---

## Prompt

# Crew job guhq-301-u05-author-conflict1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/guhq-301-u05-author conflicts with main (specs/content/guhq-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GUHQ-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/guhq-301/`, and `static/img/figures/guhq-301/unit-05/`.

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
- (guhq-301-u05-author, author, opencode) Urdu job needs `.ur.svg` for all four figures and G5 review of the seven authored Urdu concept labels.
- (guhq-301-u05-author, author, opencode) G3 must make the religious-content check (content-spec drafting note 7); the classroom routines and the ordering of the sources of tafsir are flagged in `sources/unit-05.md` as having no bound source.
- (guhq-301-u05-author, author, opencode) `tafseer-talim-ul-quran` (mapped reading) could not be identified and is not cited; `kadir-2022-asbab` carries the rules-of-interpretation claims.

## Response snapshot

Merged origin/main into `crew/guhq-301-u05-author` and resolved the conflict in `specs/content/guhq-301/tasks.md`. `tasks.md` now records Units 1, 2, 3, 4 and 5 as authored, with stage rows and reading-estimate paragraphs for all five units preserved. No shared registries were changed. `npm run check:content` passes all 14 gates.

## Outcome

- Impact: conflict-resolution merge for GUHQ-301 Unit 5 by agy (attempt 1).
- Tests: `npm run build:content-status` then `npm run check:content` passed in the job worktree (14/14 content gates).
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merge commit `c925d3266` resolving the conflict in `specs/content/guhq-301/tasks.md`; `tasks.md` carries Units 1 through 5 rows, stage rows and reading-estimate entries.
- Decisions the team must respect: both sides' tasks.md entries were retained; no main entry was dropped.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1 (conflict resolution)
- Next experiment (smallest change to try): none
