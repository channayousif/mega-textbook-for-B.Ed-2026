---
id: crew-gent-401-u07-author-conflict3
title: crew fix GENT-401 unit 7
stage: misc
date: 2026-11-24
surface: agent
model: claude_crew
feature: gent-401
branch: crew/gent-401-u07-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gent-401/unit-07/index.mdx
 - docs/semester-4/gent-401/unit-07/topic-01.mdx
 - docs/semester-4/gent-401/unit-07/topic-02.mdx
 - docs/semester-4/gent-401/unit-07/unit-assessment.mdx
 - docs/semester-4/gent-401/unit-07/unit-teacher-notes.mdx
 - glossary.json
 - history/prompts/gent-401/crew-gent-401-u07-author-conflict1.misc.prompt.md
 - history/prompts/gent-401/crew-gent-401-u07-author-conflict2.misc.prompt.md
 - history/prompts/gent-401/crew-gent-401-u07-author-conflict3.misc.prompt.md
 - history/prompts/gent-401/crew-gent-401-u07-author.green.prompt.md
 - specs/content/gent-401/concepts/unit-07.md
 - specs/content/gent-401/coverage/unit-07.md
 - specs/content/gent-401/figures/unit-07.banner.md
 - specs/content/gent-401/figures/unit-07.md
 - specs/content/gent-401/reviews/unit-07/G2/20261124T060041498Z-gates.json
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261124T060041498Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261124T060041498Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261124T060041498Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261124T060041498Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261124T060041498Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261124T060041498Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261124T060041498Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-07/G2/logs-20261124T060041498Z/validate-content.txt
 - specs/content/gent-401/sources/texts/openstax-entrepreneurship.md
 - specs/content/gent-401/sources/texts/pitch-competition.md
 - specs/content/gent-401/sources/texts/sme-risk-review.md
 - specs/content/gent-401/sources/unit-07.md
 - specs/content/gent-401/tasks.md
 - static/img/figures/gent-401/unit-07/fig-U7-1.dark.svg
 - static/img/figures/gent-401/unit-07/fig-U7-1.svg
 - static/img/figures/gent-401/unit-07/fig-U7-2.dark.svg
 - static/img/figures/gent-401/unit-07/fig-U7-2.svg
 - static/img/figures/gent-401/unit-07/fig-U7-3.dark.svg
 - static/img/figures/gent-401/unit-07/fig-U7-3.svg
 - static/img/figures/gent-401/unit-07/fig-U7-4.dark.svg
 - static/img/figures/gent-401/unit-07/fig-U7-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u07-author-conflict3

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u07-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/gent-401-u07-author conflicts with main (specs/content/gent-401/sources/texts/openstax-entrepreneurship.md, specs/content/gent-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENT-401 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-07/`.

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
- (gent-401-u07-author-conflict2, fix, claude_crew) The OpenStax evidence file now has four per-unit blocks whose note numbers restart (U1 1-7, U3 8-11, U4 8-12, U7 12-20); later jobs should append, not renumber.
- (gent-401-u07-author-conflict2, fix, claude_crew) `specs/content/gent-401/glossary.json` is missing from this sparse checkout and both parents, so the branch's Unit 7 glossary keys could not be diffed against main; verify in a full checkout.
- (gent-401-u07-author-conflict2, fix, claude_crew) Unit 7 stays English-only with banner fig-U7-5 prompt-only and G3/G5 unticked; Unit 1's accepted G2 input manifest may read as stale after the shared source text changed.
- (gent-401-u07-author-conflict1, fix, claude_crew) origin/main advanced mid-run to 6f358f0eb (a concurrent Unit 4 job); this branch merged dc10363e9, so a later conflict2 merge against 6f358f0eb will be needed.
- (gent-401-u07-author-conflict1, fix, claude_crew) the merged OpenStax text now has three blocks (Unit 1 notes 1-7, Unit 3 notes 8-11, Unit 7 notes 12-20); its `Consulted:` line still lists only the Unit 1 and Unit 7 sections, so a future job may add main's Unit 3 sections.


## Response snapshot

Merged origin/main into crew/gent-401-u07-author and resolved both conflicts by union (OpenStax evidence keeps main's Unit 6/Unit 3 blocks and Consulted sections plus the branch's Unit 7 block and sections; tasks.md records Units 6 and 7 authored), with all 14 content gates passing.

## Outcome

- Impact: fix for GENT-401 Unit 7 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 36 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gent-401-u07-author and resolved both conflicts by union (OpenStax evidence keeps main's Unit 6/Unit 3 blocks and Consulted sections plus the branch's Unit 7 block and sections; tasks.md records Units 6 and 7 authored), with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The OpenStax `Consulted:` line is now the 28-section union; the closing `## Use in GENT-401` summary still lists only Units 1, 4 and 6 (main's partial index already omitted Unit 3), so a later job may add Unit 7.
  - No GENT-401 G2 manifest hashes `sources/texts/*`, so the shared source-text change does not stale Unit 7's G2 row (`20261124T060041498Z-gates.json`); Unit 7 stays English-only with banner fig-U7-5 prompt-only and G3/G5 unticked, so G3 en-review is the next stage.
  - `D-2026-0053` cited in `specs/content/gent-401/sources/unit-07.md:19` is the Semester 2 owner ruling already on main, not a new branch ID; main's intake already escalates its Semester 4 use (`G-2026-212`).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
