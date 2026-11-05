---
id: crew-efmp-305-u05-repair_en-conflict1
title: crew fix EFMP-305 unit 5
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: efmp-305
branch: crew/efmp-305-u05-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-305/unit-05/topic-01.mdx
 - docs/semester-2/efmp-305/unit-05/topic-02.mdx
 - docs/semester-2/efmp-305/unit-05/topic-03.mdx
 - docs/semester-2/efmp-305/unit-05/unit-assessment.mdx
 - docs/semester-2/efmp-305/unit-05/unit-teacher-notes.mdx
 - history/prompts/efmp-305/crew-efmp-305-u05-repair_en-conflict1.misc.prompt.md
 - history/prompts/efmp-305/crew-efmp-305-u05-repair_en.misc.prompt.md
 - history/prompts/general/20261035-repair-efmp305-unit-five-findings.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-05/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-05/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-05/unit-teacher-notes.mdx
 - specs/content/efmp-305/figures/unit-05.md
 - specs/content/efmp-305/reviews/unit-05/G2/20261103T131119616Z-gates.json
 - specs/content/efmp-305/reviews/unit-05/G2/20261103T180403253Z-gates.json
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T131119616Z/check-bloom-bands.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T131119616Z/check-concept-graph.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T131119616Z/check-depth-gate.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T131119616Z/check-docs-sync.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T131119616Z/check-figures.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T131119616Z/check-no-answer-keys.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T131119616Z/check-no-em-dash.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T131119616Z/validate-content.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T180403253Z/check-bloom-bands.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T180403253Z/check-concept-graph.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T180403253Z/check-depth-gate.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T180403253Z/check-docs-sync.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T180403253Z/check-figures.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T180403253Z/check-no-answer-keys.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T180403253Z/check-no-em-dash.txt
 - specs/content/efmp-305/reviews/unit-05/G2/logs-20261103T180403253Z/validate-content.txt
 - specs/content/efmp-305/reviews/unit-05/repair-en-20261103/content-baseline.log
 - specs/content/efmp-305/reviews/unit-05/repair-en-20261103/content-final.log
 - specs/content/efmp-305/reviews/unit-05/repair-en-20261103/geometry.log
 - specs/content/efmp-305/reviews/unit-05/repair-en-20261103/repair-notes.md
 - specs/content/efmp-305/reviews/unit-05/repair-en-20261103/source-check.md
 - specs/content/efmp-305/reviews/unit-05/repair-en-20261103/unit-tests.log
 - specs/content/efmp-305/reviews/unit-05/repair-en-20261103/validation.md
 - specs/content/efmp-305/sources/unit-05.md
 - specs/content/efmp-305/tasks.md
 - static/img/figures/efmp-305/unit-05/fig-U5-4.dark.svg
 - static/img/figures/efmp-305/unit-05/fig-U5-4.svg
 - static/img/figures/efmp-305/unit-05/fig-U5-4.ur.dark.svg
 - static/img/figures/efmp-305/unit-05/fig-U5-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u05-repair_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-305-u05-repair_en conflicts with main (specs/content/efmp-305/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-305 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-05/`.

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
- (efmp-305-u05-repair_en, repair_en, codex) Refresh static/content-status.json after scope approval, then rerun check:content.
- (efmp-305-u05-repair_en, repair_en, codex) Owner/host must supply F1 provenance/rendering and arrange fresh independent G3, including MCQ re-solve; G3 remains unticked.
- (efmp-305-u05-repair_en, repair_en, codex) Refresh static/content-status.json after scope approval, then rerun check:content.
- (efmp-305-u05-fix, fix, codex) Scope approval pending for generated content-status refresh; fresh independent G3 remains required.
- (efmp-305-u05-fix, fix, codex) Scope approval pending for generated content-status refresh; fresh independent G3 remains required.


## Response snapshot

Merged origin/main into crew/efmp-305-u05-repair_en, resolved the tasks.md conflict keeping both sides' rows, refreshed the stale Unit 5 G2 evidence, and regenerated content-status.json so all 14 content gates pass.

## Outcome

- Impact: fix for EFMP-305 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 45 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-305-u05-repair_en, resolved the tasks.md conflict keeping both sides' rows, refreshed the stale Unit 5 G2 evidence, and regenerated content-status.json so all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The branch's Unit 5 G2 row (`20261103T180403253Z-gates.json`) is the authoritative last matching row; main's Unit 3 row is preserved unchanged.
  - F1 provenance/rendering and a fresh independent G3 with MCQ re-solve remain owner/host work; G3 stays unticked.
  - `static/content-status.json` is gitignored and was regenerated locally; CI generates it before the gate.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
