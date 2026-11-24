---
id: crew-gent-401-u06-author-conflict3
title: crew fix GENT-401 unit 6
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
 - history/prompts/gent-401/crew-gent-401-u06-author-conflict3.misc.prompt.md
 - specs/content/gent-401/reviews/unit-06/G2/20261124T101619522Z-gates.json
 - specs/content/gent-401/reviews/unit-06/G2/logs-20261124T101619522Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-06/G2/logs-20261124T101619522Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-06/G2/logs-20261124T101619522Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-06/G2/logs-20261124T101619522Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-06/G2/logs-20261124T101619522Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-06/G2/logs-20261124T101619522Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-06/G2/logs-20261124T101619522Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-06/G2/logs-20261124T101619522Z/validate-content.txt
 - specs/content/gent-401/sources/texts/openstax-entrepreneurship.md
 - specs/content/gent-401/sources/texts/scott-2017-efmd.md
 - specs/content/gent-401/tasks.md
tests:
 - npm run check:content
---


## Prompt

# Crew job gent-401-u06-author-conflict3

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u06-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/gent-401-u06-author conflicts with main (specs/content/gent-401/sources/texts/openstax-entrepreneurship.md, specs/content/gent-401/sources/texts/scott-2017-efmd.md, specs/content/gent-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

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
- (gent-401-u06-author-conflict2, fix, claude_crew) Unit 6 G3 en-review and the Urdu G4/G5 mirror are still open; the reviewer should verify SECP eZfile incorporation steps and IPO-Pakistan IP classifications.
- (gent-401-u06-author-conflict2, fix, claude_crew) Unit 6 figures are placed in English only (fig-U6-1 to fig-U6-4, no .ur.svg yet); banner fig-U6-5 is prompt-only for the illustrate job.
- (gent-401-u06-author-conflict2, fix, claude_crew) The merge added main's Unit 2; tasks.md status now reads Units 1, 2, 3 and 6 authored, and no content finding is new relative to main.
- (gent-401-u06-author-conflict1, fix, claude_crew) Unit 6 G3 en-review and the Urdu G4/G5 mirror are still open; the reviewer should verify SECP eZfile incorporation steps and IPO-Pakistan IP classifications.
- (gent-401-u06-author-conflict1, fix, claude_crew) The merged source-text files repeat note numbers across per-unit sections (openstax notes 8-11 appear in both the Unit 6 and Unit 3 sections); no gate parses them, so leave main's numbering alone.

## Response snapshot

Merged origin/main into crew/gent-401-u06-author and resolved all three conflicts (tasks.md, openstax-entrepreneurship.md, scott-2017-efmd.md) keeping both sides' entries, refreshed the Unit 6 G2 gate evidence at the merge commit, repointed the tracker row, and left every content gate green.

## Outcome

- Impact: fix for GENT-401 Unit 6 by claude_crew (attempt 3).
- Tests: npm run build:content-status and npm run check:content both exited 0 (14/14 content gates PASS) in the job worktree.
- Files: 13 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gent-401-u06-author; resolved the tasks.md, openstax-entrepreneurship.md and scott-2017-efmd.md conflicts with both sides' entries kept (main's Unit 4 material first, then this branch's Unit 6 material); refreshed the Unit 6 G2 evidence and repointed its tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch does not certify anything. The openstax consulted list keeps both sides' section slugs, so 8-1 and 13-1 each appear twice with different slugs; the real OpenStax slugs are title-derived (8-1-entrepreneurial-marketing-and-the-marketing-mix, 13-1-business-structures-overview-of-legal-and-tax-considerations) and neither side's list matches them, so the whole line needs verification by a job that owns it.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - Unit 6 G3 en-review and the Urdu G4/G5 mirror are still open; the reviewer should verify SECP eZfile incorporation steps and IPO-Pakistan IP classifications.
  - Unit 6 figures are placed in English only (fig-U6-1 to fig-U6-4, no .ur.svg yet); banner fig-U6-5 is prompt-only for the illustrate job.
  - tasks.md status now reads Units 1, 2, 3, 4 and 6 authored; the merge added main's Unit 4 and no content finding is new relative to main.
  - The older Unit 6 G2 evidence files (`20261124T053918713Z`, `20261124T064135131Z`) are orphaned but still validate; the tracker row points at `20261124T101619522Z`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
