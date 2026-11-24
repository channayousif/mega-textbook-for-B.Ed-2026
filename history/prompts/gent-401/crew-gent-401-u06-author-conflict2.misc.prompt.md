---
id: crew-gent-401-u06-author-conflict2
title: crew fix GENT-401 unit 6 (merge conflict 2)
stage: misc
date: 2026-11-24
surface: agent
model: claude_crew
feature: gent-401
branch: crew/gent-401-u06-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gent-401/tasks.md
 - history/prompts/gent-401/crew-gent-401-u06-author-conflict2.misc.prompt.md
tests:
 - npm run build:content-status
 - npm run check:content
---

## Prompt

# Crew job gent-401-u06-author-conflict2

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u06-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/gent-401-u06-author conflicts with main (specs/content/gent-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENT-401 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-06/`.

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
- (gent-401-u06-author-conflict1, fix, claude_crew) Unit 6 G3 en-review and the Urdu G4/G5 mirror are still open; the reviewer should verify SECP eZfile incorporation steps and IPO-Pakistan IP classifications.
- (gent-401-u06-author-conflict1, fix, claude_crew) The merged source-text files repeat note numbers across per-unit sections (openstax notes 8-11 appear in both the Unit 6 and Unit 3 sections); no gate parses them, so leave main's numbering alone.
- (gent-401-u06-author-conflict1, fix, claude_crew) The branch's older Unit 6 G2 evidence (`20261124T053918713Z-gates.json`) is now orphaned but still validates; the tracker row points at the new `20261124T064135131Z` file.
- (gent-401-u06-author, author, agy) Figures are placed in English only (fig-U6-1 to fig-U6-4, no .ur.svg yet); banner fig-U6-5 is prompt-only in figures/unit-06.banner.md for the illustrate job.
- (gent-401-u06-author, author, agy) G3 en-review and Urdu translation/review (G4/G5) remain open; reviewer should verify SECP eZfile incorporation steps and IPO-Pakistan IP classifications.

## Response snapshot

Merged origin/main (9 commits, adding GENT-401 Unit 2) into crew/gent-401-u06-author. The only conflict was the tasks.md status block; resolved by combining both sides (Units 1, 2, 3 and 6 authored, Unit 1 carries a drafted Urdu mirror). The append-only registries auto-merged with no branch-only entries lost. All 14 content gates pass.

## Outcome

- Impact: fix for GENT-401 Unit 6 by claude_crew (attempt 2, merge with main's Unit 2 work).
- Tests: npm run build:content-status wrote 21 courses; npm run check:content passed all 14 content gates.
- Files: specs/content/gent-401/tasks.md (conflict resolved) and this PHR.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merged origin/main into crew/gent-401-u06-author, resolved the single tasks.md status conflict losslessly, and left check:content green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this merge certifies nothing.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - Unit 6 G3 en-review and the Urdu G4/G5 mirror are still open; the reviewer should verify SECP eZfile incorporation steps and IPO-Pakistan IP classifications.
  - The merged source-text files repeat note numbers across per-unit sections (openstax notes 8-11 appear in both the Unit 6 and Unit 3 sections); no gate parses them, so leave main's numbering alone.
  - The branch's older Unit 6 G2 evidence (`20261124T053918713Z-gates.json`) is orphaned but still validates; the tracker row points at `20261124T064135131Z-gates.json`.
  - Figures are placed in English only (fig-U6-1 to fig-U6-4, no .ur.svg yet); banner fig-U6-5 is prompt-only for the illustrate job.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
