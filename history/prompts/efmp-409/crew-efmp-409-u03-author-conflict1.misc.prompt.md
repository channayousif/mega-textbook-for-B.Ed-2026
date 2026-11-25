---
id: crew-efmp-409-u03-author-conflict1
title: crew fix EFMP-409 unit 3
stage: misc
date: 2026-11-25
surface: agent
model: claude_crew
feature: efmp-409
branch: crew/efmp-409-u03-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "conflict"]
links:
  spec: specs/content/efmp-409/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-409/crew-efmp-409-u03-author-conflict1.misc.prompt.md
 - specs/content/efmp-409/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-409-u03-author-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-409-u03-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Merged onto main's latest state, crew/efmp-409-u03-author fails npm run check:content (it could not join the hourly batch):
✗ Pipeline gate failed with 1 finding(s):
- EFMP-409 Unit 3 (docs/semester-4/efmp-409/unit-03): no 'G2 en-draft' row found for Unit 3 Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-409 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-409/`, and `static/img/figures/efmp-409/unit-03/`.

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
- (efmp-409-u03-author, author, agy) Banner illustration fig-U3-13 is prompt-only in figures/unit-03.banner.md for Codex raster generation.
- (efmp-409-u03-author, author, agy) G3 reviewer should check Islamic educational content (Ibn Khaldun and Iqbal) with a qualified scholar per spec note 8.
- (efmp-409-u03-author, author, agy) All 13 concept labels in concepts/unit-03.md carry authored Urdu labels ready for independent checking during G5.

## Feedback from the previous attempt
the worker exited without committing any change

## Response snapshot

Merged origin/main (Unit 2 author job and efmp-301 flashcards) into crew/efmp-409-u03-author; the only conflict was specs/content/efmp-409/tasks.md, resolved by keeping main's Unit 1 and Unit 2 rows plus this branch's Unit 3 rows and combining the reading estimates and author notes, committed as 4690ba5e5 with npm run check:content green (all 14 gates pass).

## Outcome

- Impact: conflict fix for EFMP-409 Unit 3 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree after the merge.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-409-u03-author and resolved the single conflict in specs/content/efmp-409/tasks.md so the tracker carries Unit 1, Unit 2 and Unit 3 rows (main's order then the branch's, exact duplicates dropped); npm run check:content passes all 14 gates.
- Decisions the team must respect: the merged tracker keeps both sides' Unit 1 reading-estimate paragraph once (exact duplicate) and keeps both author-note paragraphs; no G3/G5 status was changed and no human initials were used.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Neither side touched glossary.json, specs/decisions/log.md, specs/gaps.md or specs/content/terminology.csv in this merge, so no ID remapping was needed.
  - Unit 3 G2 evidence still points at reviews/unit-03/G2/20261125T070051288Z-gates.json; the merge did not alter Unit 3's docs, figures manifest, sources, coverage or concepts, so no fresh evidence run was required.
  - Banner illustration fig-U3-13 remains prompt-only; G3 Islamic-content scholar check and the 13 authored Urdu concept labels remain open for G5.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS (14/14)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
