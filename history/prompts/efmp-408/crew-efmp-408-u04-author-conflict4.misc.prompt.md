---
id: crew-efmp-408-u04-author-conflict4
title: crew fix EFMP-408 unit 4
stage: misc
date: 2026-11-25
surface: agent
model: claude_crew
feature: efmp-408
branch: crew/efmp-408-u04-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-408/crew-efmp-408-u04-author-conflict4.misc.prompt.md
 - specs/content/efmp-408/tasks.md
 - specs/content/efmp-408/reviews/unit-05/G2/20261124T232625475Z-gates.json
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T232625475Z/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T232625475Z/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T232625475Z/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T232625475Z/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T232625475Z/check-figures.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T232625475Z/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T232625475Z/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T232625475Z/validate-content.txt
tests:
 - npm run build:content-status
 - npm run check:content
---

## Prompt

# Crew job efmp-408-u04-author-conflict4

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Merged onto main's latest state, crew/efmp-408-u04-author fails npm run check:content (it could not join the hourly batch):
✗ Pipeline gate failed with 1 finding(s):
- EFMP-408 Unit 5 (docs/semester-4/efmp-408/unit-05): G2 en-draft: stale or incomplete input manifest Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-408 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-04/`.

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
- (efmp-408-u04-author-conflict3, fix, claude_crew) Any further edit to `specs/content/efmp-408/sources/texts/seifert-sutton-2009.md` re-invalidates the G2 evidence of Units 1, 3, 4 and 6, so run `node scripts/prepare-gate-evidence.mjs --refresh-stale` afterwards.
- (efmp-408-u04-author-conflict3, fix, claude_crew) `crew/efmp-408-u02-author` also edits `specs/content/efmp-408/tasks.md` (Unit 2 rows), so its next merge will conflict on that file again.
- (efmp-408-u04-author-conflict3, fix, claude_crew) Unit 4 is still English-only at `translation_status: draft` with G3/G5 open, and the banner `fig-U4-4` remains `prompt-only` for the illustrate job.
- (efmp-408-u04-author-conflict2, fix, claude_crew) Any further edit to `specs/content/efmp-408/sources/texts/seifert-sutton-2009.md` re-invalidates the G2 evidence of Units 1, 3 and 4, so run `node scripts/prepare-gate-evidence.mjs --refresh-stale` afterwards.
- (efmp-408-u04-author-conflict2, fix, claude_crew) `crew/efmp-408-u02-author` also edits `specs/content/efmp-408/tasks.md` (Unit 2 rows), so its next merge will conflict on that file again.

## Response snapshot

Merged origin/main (17 commits), resolved the single `specs/content/efmp-408/tasks.md` conflict by keeping both sides' Unit 4 and Unit 5 rows and main's newer Unit 3, 5 and 6 rows, and verified the append-only registries auto-merged with both sides intact. The branch's shared source note in `seifert-sutton-2009.md` had made Unit 5's G2 input manifest stale, so `node scripts/prepare-gate-evidence.mjs --refresh-stale` re-evidenced Unit 5 and repointed its tracker row. `npm run check:content` is green (14/14).

## Outcome

- Impact: fix for EFMP-408 Unit 4 by claude_crew (attempt 4).
- Tests: `npm run build:content-status` then `npm run check:content` passed, all 14 content gates.
- Files: 11 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merge of origin/main committed with the `tasks.md` conflict resolved (both sides' unit and stage rows kept); Unit 5 G2 evidence refreshed and its tracker row repointed after the branch's shared source note stale-dated it.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this job certifies nothing. Unit 5's content was not edited, only its G2 gate evidence.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - Any further edit to `specs/content/efmp-408/sources/texts/seifert-sutton-2009.md` re-invalidates the G2 evidence of Units 1, 3, 4, 5 and 6, so run `node scripts/prepare-gate-evidence.mjs --refresh-stale` afterwards.
  - `crew/efmp-408-u02-author` also edits `specs/content/efmp-408/tasks.md` (Unit 2 rows), so its next merge will conflict on that file again.
  - Unit 4 is still English-only at `translation_status: draft` with G3/G5 open, and the banner `fig-U4-4` remains `prompt-only` for the illustrate job.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: a source note added to a shared `sources/texts/` file is cited by several units, so one edit stales each citing unit's G2 input manifest; `--refresh-stale` is the correct remedy and the gate names the unit.
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
