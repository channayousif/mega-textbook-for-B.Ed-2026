---
id: crew-efmp-409-u05-author-conflict2
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
 - specs/content/efmp-409/tasks.md
 - specs/content/efmp-409/reviews/unit-03/G4/translation-handoff.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/topic-05.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/topic-06.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-03/unit-teacher-notes.mdx
 - history/prompts/efmp-409/crew-efmp-409-u03-translate.green.prompt.md
 - history/prompts/efmp-409/crew-efmp-409-u03-translate.misc.prompt.md
 - static/img/figures/efmp-409/unit-03/fig-U3-1.ur.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-2.ur.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-3.ur.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-4.ur.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-5.ur.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-5.ur.dark.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-6.ur.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-6.ur.dark.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-7.ur.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-7.ur.dark.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-8.ur.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-8.ur.dark.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-9.ur.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-9.ur.dark.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-10.ur.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-10.ur.dark.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-11.ur.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-11.ur.dark.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-12.ur.svg
 - static/img/figures/efmp-409/unit-03/fig-U3-12.ur.dark.svg
 - history/prompts/efmp-409/crew-efmp-409-u05-author-conflict2.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-409-u05-author-conflict2

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
- (efmp-409-u05-author-conflict1, fix, claude_crew) Unit 5 G2 evidence still points at reviews/unit-05/G2/20261125T085534293Z-gates.json and revalidates against the merged tree.
- (efmp-409-u05-author-conflict1, fix, claude_crew) Banner fig-U5-7 remains prompt-only for the illustrate job; Unit 5 is English only, so G4/G5 stay open.
- (efmp-409-u05-author-conflict1, fix, claude_crew) Reading-minutes total 62 sits exactly at the ceiling of the approved 46-62 band, so any later addition to Unit 5 prose will breach the depth gate.
- (efmp-409-u05-author, author, claude_crew) Banner `fig-U5-7` is still prompt-only for the `illustrate` job; the six schematics are placed and measured clean.
- (efmp-409-u05-author, author, claude_crew) Unit 5 is English only (no Urdu mirror, no `key_terms`); G3/G5/G4 stay open and un certified. Reading-minutes total is 62, at the ceiling of the approved 46-62 band.

## Response snapshot

Merged origin/main (16 commits, 81 files) into crew/efmp-409-u05-author. The only overlapping file, specs/content/efmp-409/tasks.md, auto-merged cleanly: main's Unit 3 G4/G6 updates and this branch's Unit 5 G2 en-draft row are in separate hunks, so both survive and no manual conflict resolution or ID remap was needed. The merge is committed and all 14 content gates pass.

## Outcome

- Impact: fix for EFMP-409 Unit 5 by claude_crew (attempt 2).
- Tests: npm run check:content passed in the job worktree after the merge and again after this PHR was added.
- Files: 38 file(s), listed above (the merge's EFMP-409 files plus this PHR).
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merge commit 66d7a2e20 brings origin/main into crew/efmp-409-u05-author; Unit 5's G2 en-draft tracker row and its gate evidence are intact and the branch is 0 commits behind main.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this merge certifies nothing.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - No conflict actually occurred: specs/content/efmp-409/tasks.md auto-merged because main's edits (Unit 3 G4/G6 rows) and this branch's (Unit 5 rows) are disjoint hunks. No shared registry was touched by either side, so no ID remapping was needed.
  - Unit 5 G2 evidence still points at reviews/unit-05/G2/20261125T085534293Z-gates.json; no Unit 5 English file, figure manifest, source, coverage or concept changed, so no fresh evidence run was required.
  - Banner fig-U5-7 stays prompt-only; Unit 5 is English only, so G3/G4/G5 stay open; reading-minutes total 62 sits at the 46-62 ceiling.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
