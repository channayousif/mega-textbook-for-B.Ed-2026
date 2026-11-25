---
id: crew-efmp-409-u04-author-conflict2
title: crew fix EFMP-409 unit 4 (merge main)
stage: misc
date: 2026-11-25
surface: agent
model: claude_crew
feature: efmp-409
branch: crew/efmp-409-u04-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-409/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-409/tasks.md
 - history/prompts/efmp-409/crew-efmp-409-u04-author-conflict2.misc.prompt.md
tests:
 - npm run build:content-status
 - npm run check:content
---

## Prompt

# Crew job efmp-409-u04-author-conflict2

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-409-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Merged onto main's latest state, crew/efmp-409-u04-author fails npm run check:content (it could not join the hourly batch):
✗ Pipeline gate failed with 1 finding(s):
- EFMP-409 Unit 4 (docs/semester-4/efmp-409/unit-04): no 'G2 en-draft' row found for Unit 4 Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-409 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-409/`, and `static/img/figures/efmp-409/unit-04/`.

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
- (efmp-409-u04-author-conflict1, fix, claude_crew) The shared HEC note is not in Unit 4's G2 input manifest, so the existing G2 evidence stayed valid and was not regenerated.
- (efmp-409-u04-author-conflict1, fix, claude_crew) Unit 4's evidence notes are now 11-13 in `hec-2013-foundations.md`; main's 6-10 are byte-for-byte untouched, so do not renumber them.
- (efmp-409-u04-author-conflict1, fix, claude_crew) banner `fig-U4-7` is still prompt-only and the Urdu mirror is a separate job; G3 still needs a qualified scholar for the Islamic material.
- (efmp-409-u04-author, author, claude_crew) G3 should have a qualified scholar check the Islamic material (Surah Al-Alaq, the hadith on knowledge, the Charter of Medina, the Last Sermon, As-Suffa) per content-spec drafting note 8.
- (efmp-409-u04-author, author, claude_crew) `besari-2023-knowledge-ethics`, `farooq-2018-farewell-sermon` and `sani-2019-suffa` were verified only through Crossref metadata and abstracts (full texts not read); their `sources/texts` notes say so, and the Topic 4.1 hadith citations are paraphrased by collection and number.

## Response snapshot

Merged origin/main into crew/efmp-409-u04-author. The only conflict was `specs/content/efmp-409/tasks.md`: main carried the Unit 3 author rows, this branch carried the Unit 4 rows. Kept both, main's order first, updated the status header to Units 1, 2, 3 and 4, kept main's newer Unit 2 G4/G5/G6 rows and main's Unit 3 prose byte-for-byte, then reran the gates.

## Outcome

- Impact: fix for EFMP-409 Unit 4 by claude_crew (attempt 2).
- Tests: `npm run build:content-status` then `npm run check:content`: all 14 content gates PASS.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merge commit `effebf395` on `crew/efmp-409-u04-author` resolving `specs/content/efmp-409/tasks.md` as a union of main's Unit 3 rows and this branch's Unit 4 rows; `npm run check:content` is green.
- Decisions the team must respect: no Unit 4 English file, figure manifest, source, coverage or concept file was touched by the merge, so the existing G2 evidence (`specs/content/efmp-409/reviews/unit-04/G2/20261125T072435069Z-gates.json`) stayed valid and was not regenerated. The tracker's Unit 4 G2 row still points at that file.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The merge auto-merged main's newer Unit 2 G4/G5/G6 rows over this branch's older wording; those rows now describe the completed Unit 2 Urdu translation.
  - `tasks.md` now lists Units 1-4; do not drop main's Unit 3 rows when editing Unit 4 rows.
  - banner `fig-U4-7` is still prompt-only and the Urdu mirror is a separate job; G3 still needs a qualified scholar for the Islamic material.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): build:content-status PASS, check:content PASS (14/14)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
