---
id: crew-gent-401-u04-author-conflict2
title: crew fix GENT-401 unit 4
stage: misc
date: 2026-11-24
surface: agent
model: claude_crew
feature: gent-401
branch: crew/gent-401-u04-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gent-401/unit-02/index.mdx
 - docs/semester-4/gent-401/unit-02/topic-01.mdx
 - docs/semester-4/gent-401/unit-02/topic-02.mdx
 - docs/semester-4/gent-401/unit-02/unit-assessment.mdx
 - docs/semester-4/gent-401/unit-02/unit-teacher-notes.mdx
 - glossary.json
 - history/prompts/gent-401/crew-gent-401-u02-author-conflict1.misc.prompt.md
 - history/prompts/gent-401/crew-gent-401-u02-author.green.prompt.md
 - history/prompts/gent-401/crew-gent-401-u04-author-conflict2.misc.prompt.md
 - specs/content/gent-401/concepts/unit-02.md
 - specs/content/gent-401/coverage/unit-02.md
 - specs/content/gent-401/figures/unit-02.banner.md
 - specs/content/gent-401/figures/unit-02.md
 - specs/content/gent-401/reviews/unit-02/G2/20261124T045217007Z-gates.json
 - specs/content/gent-401/reviews/unit-02/G2/logs-20261124T045217007Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-02/G2/logs-20261124T045217007Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-02/G2/logs-20261124T045217007Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-02/G2/logs-20261124T045217007Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-02/G2/logs-20261124T045217007Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-02/G2/logs-20261124T045217007Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-02/G2/logs-20261124T045217007Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-02/G2/logs-20261124T045217007Z/validate-content.txt
 - specs/content/gent-401/sources/texts/qamar-2020-social.md
 - specs/content/gent-401/sources/unit-02.md
 - specs/content/gent-401/tasks.md
 - static/img/figures/gent-401/unit-02/fig-U2-1.dark.svg
 - static/img/figures/gent-401/unit-02/fig-U2-1.svg
 - static/img/figures/gent-401/unit-02/fig-U2-2.dark.svg
 - static/img/figures/gent-401/unit-02/fig-U2-2.svg
 - static/img/figures/gent-401/unit-02/fig-U2-3.dark.svg
 - static/img/figures/gent-401/unit-02/fig-U2-3.svg
 - static/img/figures/gent-401/unit-02/fig-U2-4.dark.svg
 - static/img/figures/gent-401/unit-02/fig-U2-4.svg
tests:
 - npm run build:content-status
 - npm run check:content
---

## Prompt

# Crew job gent-401-u04-author-conflict2

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/gent-401-u04-author conflicts with main (specs/content/gent-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENT-401 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-04/`.

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
- (gent-401-u04-author-conflict1, fix, claude_crew) Unit 4's G2 evidence is now 20261124T062449556Z-gates.json; the earlier 20261124T062155314Z and 20261124T050320192Z evidence directories are stale leftovers this branch can prune if wanted.
- (gent-401-u04-author-conflict1, fix, claude_crew) The merged scott-2017-efmd.md binds Unit 4 notes with pp. 53-76 locators that only the branch authored; a G3 reviewer should check them against the printed pagination.
- (gent-401-u04-author, author, agy) Four schematic SVGs (fig-U4-1 to fig-U4-4) placed with dark variants; unit banner fig-U4-5 remains prompt-only in unit-04.banner.md for the illustrate job.
- (gent-401-u04-author, author, agy) G3 English review and G4 Urdu translation remain open; Urdu labels in concepts/unit-04.md are authored and require independent G5 review.
- (gent-401-u04-author, author, agy) Reading estimates total 41 minutes (index 2, topic-01 11, topic-02 11, assessment 15, teacher notes 2), inside the approved 32-44 depth budget band.

## Response snapshot

Merged origin/main into crew/gent-401-u04-author. The only conflict was specs/content/gent-401/tasks.md, where main's Unit 2 status and this branch's Unit 4 status were combined. All 14 content gates pass.

## Outcome

- Impact: fix for GENT-401 Unit 4 by claude_crew (attempt 2, merge with current main).
- Tests: npm run check:content passed (14/14) after npm run build:content-status.
- Files: 32 file(s) from the merge, listed above, plus this PHR.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gent-401-u04-author and resolved the specs/content/gent-401/tasks.md conflict by keeping main's Unit 2 rows and reading estimates alongside this branch's Unit 4 rows, and merging the status header so Units 1-4 are all reported. All 14 content gates pass.
- Decisions the team must respect: the merged tracker status now reads "Units 1-4 English drafts authored and G2 gate evidence recorded"; Unit 1's drafted Urdu mirror is still draft pending G5. G3/G5 stay advisory until a qualified sign-off; this merge certifies nothing.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the merge touches a protected path).
- Notes for the next job on this unit:
  - Unit 4's G2 evidence is 20261124T062449556Z-gates.json; the earlier 20261124T062155314Z and 20261124T050320192Z evidence directories are stale leftovers still on the branch and can be pruned.
  - The merged scott-2017-efmd.md binds Unit 4 notes with pp. 53-76 locators that only the branch authored; a G3 reviewer should check them against the printed pagination.
  - The merge brought main's Unit 2 (docs, specs, figures, G2 evidence, glossary terms, PHRs). It is outside this job's Unit 4 scope and was not re-reviewed here.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
