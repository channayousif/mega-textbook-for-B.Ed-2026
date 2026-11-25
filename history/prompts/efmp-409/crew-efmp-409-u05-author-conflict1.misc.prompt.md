---
id: crew-efmp-409-u05-author-conflict1
title: crew fix EFMP-409 unit 5
stage: misc
date: 2026-11-25
surface: agent
model: claude_crew
feature: efmp-409
branch: crew/efmp-409-u05-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-409/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-409/crew-efmp-409-u05-author-conflict1.misc.prompt.md
 - specs/content/efmp-409/tasks.md
tests:
 - npm run build:content-status
 - npm run check:content
---

## Prompt

# Crew job efmp-409-u05-author-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-409-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Merged onto main's latest state, crew/efmp-409-u05-author fails npm run check:content (it could not join the hourly batch):
✗ Pipeline gate failed with 1 finding(s):
- EFMP-409 Unit 5 (docs/semester-4/efmp-409/unit-05): no 'G2 en-draft' row found for Unit 5 Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-409 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-409/`, and `static/img/figures/efmp-409/unit-05/`.

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
- (efmp-409-u05-author, author, claude_crew) Banner `fig-U5-7` is still prompt-only for the `illustrate` job; the six schematics are placed and measured clean.
- (efmp-409-u05-author, author, claude_crew) Unit 5 is English only (no Urdu mirror, no `key_terms`); G3/G5/G4 stay open and un certified. Reading-minutes total is 62, at the ceiling of the approved 46-62 band.
- (efmp-409-u05-author, author, claude_crew) The bound sources are the three PIE policy documents, Saiyid (1987), the 2025 Inverge review and World Bank indicators; `sindh-education-web` did not resolve and `provenzo-2006` was unavailable, both noted in `sources/unit-05.md`.

## Response snapshot

Merged origin/main into crew/efmp-409-u05-author and resolved the sole conflict in specs/content/efmp-409/tasks.md so the tracker keeps main's Unit 3 rows and this branch's Unit 5 rows; all 14 content gates pass.

## Outcome

- Impact: fix for EFMP-409 Unit 5 by claude_crew (conflict1 attempt).
- Tests: npm run build:content-status then npm run check:content passed, 14/14 gates PASS.
- Files: 2 file(s) changed by this job, listed above; the merge commit also carries main's own incoming work.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main (b7417e1e0) into crew/efmp-409-u05-author; resolved the one conflict in specs/content/efmp-409/tasks.md by keeping main's Unit 1, 2 and 3 rows and paragraphs and appending this branch's Unit 5 rows and paragraph, with the status line reading Units 1, 2, 3 and 5.
- Decisions the team must respect: G3/G5 stay open and uncertified; this merge certifies nothing and changes no English content.
- Pending / next owner: crew lead (auto-merge when CI is green).
- Notes for the next job on this unit:
  - No shared registry was touched by either side, so no ID remapping was needed and no glossary or terminology entry was added.
  - Unit 5 G2 evidence still points at reviews/unit-05/G2/20261125T085534293Z-gates.json; no English unit file, figure manifest, source, coverage or concept changed, so no fresh evidence run was required and check:pipeline-gate revalidated the existing file.
  - Banner fig-U5-7 stays prompt-only for the illustrate job; Unit 5 is English only, so G4/G5 remain open; reading-minutes total 62 sits at the ceiling of the approved 46-62 band.
- Paperclip issues affected: none (work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: the hourly batch could not auto-merge this branch, so it never joined; the conflict is a tracker-only collision with main's Unit 3 authoring job.
- Graders run and results (PASS/FAIL): check:content PASS (14/14)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
