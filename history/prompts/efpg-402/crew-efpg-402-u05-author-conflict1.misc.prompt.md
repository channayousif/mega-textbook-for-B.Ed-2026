---
id: crew-efpg-402-u05-author-conflict1
title: crew fix EFPG-402 unit 5
stage: misc
date: 2026-11-27
surface: agent
model: claude_crew
feature: efpg-402
branch: crew/efpg-402-u05-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efpg-402/unit-05/index.mdx
 - docs/semester-4/efpg-402/unit-05/topic-01.mdx
 - docs/semester-4/efpg-402/unit-05/topic-02.mdx
 - docs/semester-4/efpg-402/unit-05/topic-03.mdx
 - docs/semester-4/efpg-402/unit-05/topic-04.mdx
 - docs/semester-4/efpg-402/unit-05/topic-05.mdx
 - docs/semester-4/efpg-402/unit-05/unit-assessment.mdx
 - history/prompts/efpg-402/crew-efpg-402-u05-author-conflict1.misc.prompt.md
 - history/prompts/efpg-402/crew-efpg-402-u05-author.green.prompt.md
 - specs/content/efpg-402/concepts/unit-05.md
 - specs/content/efpg-402/coverage/unit-05.md
 - specs/content/efpg-402/figures/unit-05.md
 - specs/content/efpg-402/reviews/unit-05/G2/20261127T123914687Z-gates.json
 - specs/content/efpg-402/reviews/unit-05/G2/20261127T132231832Z-gates.json
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T123914687Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T123914687Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T123914687Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T123914687Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T123914687Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T123914687Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T123914687Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T123914687Z/validate-content.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T132231832Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T132231832Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T132231832Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T132231832Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T132231832Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T132231832Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T132231832Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-05/G2/logs-20261127T132231832Z/validate-content.txt
 - specs/content/efpg-402/sources/texts/bscs-2006-5e.md
 - specs/content/efpg-402/sources/texts/rowe-1974-waittime.md
 - specs/content/efpg-402/sources/unit-05.md
 - specs/content/efpg-402/tasks.md
 - static/img/figures/efpg-402/unit-05/fig-U5-1.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-1.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-10.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-10.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-2.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-2.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-3.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-3.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-4.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-4.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-5.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-5.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-6.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-6.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-7.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-7.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-8.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-8.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-9.dark.svg
 - static/img/figures/efpg-402/unit-05/fig-U5-9.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-402-u05-author-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efpg-402-u05-author conflicts with main (specs/content/efpg-402/sources/texts/bscs-2006-5e.md, specs/content/efpg-402/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFPG-402 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-05/`.

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
- (efpg-402-u05-author, author, agy2) Urdu mirror job (G4) will need to localize the 10 placed SVGs (.ur.svg twins) and unit prose; G3 English review remains open for independent review.
- (efpg-402-u05-author, author, agy2) Unit banner (unit-05.banner.md) is not yet drafted and will be planned during raster illustration passes.


## Response snapshot

Merged origin/main into crew/efpg-402-u05-author, resolving the bscs-2006-5e.md add/add and tasks.md conflicts by keeping both sides' entries, then refreshed Unit 5 G2 evidence and passed all 14 content gates.

## Outcome

- Impact: fix for EFPG-402 Unit 5 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 54 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efpg-402-u05-author, resolving the bscs-2006-5e.md add/add and tasks.md conflicts by keeping both sides' entries, then refreshed Unit 5 G2 evidence and passed all 14 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 5 G4 Urdu mirror and independent G3 English review are still open for separate jobs.
  - `specs/content/efpg-402/sources/texts/bscs-2006-5e.md` is now shared by Unit 3 and Unit 5; keep both the "Unit 3 use" map and the Unit 5 phase-excerpt section in future edits.
  - Unit 5 banner (`unit-05.banner.md`) is still not drafted.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
