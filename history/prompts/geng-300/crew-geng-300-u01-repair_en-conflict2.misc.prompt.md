---
id: crew-geng-300-u01-repair_en-conflict2
title: crew fix GENG-300 unit 1
stage: misc
date: 2026-10-19
surface: agent
model: opencode
feature: geng-300
branch: crew/geng-300-u01-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/geng-300/unit-01/topic-02.mdx
 - docs/semester-1/geng-300/unit-01/unit-assessment.mdx
 - history/prompts/general/0531-merge-main-pass-content-gates.misc.prompt.md
 - history/prompts/geng-300/0174-repair-unit-one-g3-findings.misc.prompt.md
 - history/prompts/geng-300/crew-geng-300-u01-repair_en-conflict1.misc.prompt.md
 - history/prompts/geng-300/crew-geng-300-u01-repair_en.misc.prompt.md
 - specs/content/geng-300/figures/unit-01.md
 - specs/content/geng-300/reviews/unit-01/G2/20261019T135001511Z-gates.json
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261019T135001511Z/check-bloom-bands.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261019T135001511Z/check-concept-graph.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261019T135001511Z/check-depth-gate.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261019T135001511Z/check-docs-sync.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261019T135001511Z/check-figures.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261019T135001511Z/check-no-answer-keys.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261019T135001511Z/check-no-em-dash.txt
 - specs/content/geng-300/reviews/unit-01/G2/logs-20261019T135001511Z/validate-content.txt
 - specs/content/geng-300/tasks.md
 - static/img/figures/geng-300/unit-01/fig-U1-1.dark.svg
 - static/img/figures/geng-300/unit-01/fig-U1-1.svg
 - static/img/figures/geng-300/unit-01/fig-U1-2.dark.svg
 - static/img/figures/geng-300/unit-01/fig-U1-2.svg
 - static/img/figures/geng-300/unit-01/fig-U1-3.dark.svg
 - static/img/figures/geng-300/unit-01/fig-U1-3.svg
 - static/img/figures/geng-300/unit-01/fig-U1-6.dark.svg
 - static/img/figures/geng-300/unit-01/fig-U1-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u01-repair_en-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u01-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Merged onto main's latest state, crew/geng-300-u01-repair_en fails npm run check:content (it could not join the hourly batch):
✗ static/content-status.json is missing. Run: npm run build:content-status Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENG-300 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (geng-300-u01-repair_en-conflict1, fix, opencode) G3 review for GENG-300 Unit 1 remains open and unsigned  -  fresh independent review is pending (not part of this merge job).
- (geng-300-u01-repair_en-conflict1, fix, opencode) content-status.json is gitignored but regenerated on disk; gates that depend on it pass.
- (geng-300-u01-repair_en, repair_en, codex) G3 remains open and unsigned; fresh independent review is pending.
- (geng-300-u01-repair_en, repair_en, codex) G3 remains open and unsigned; fresh independent review is pending.


## Response snapshot

Merged origin/main into crew/geng-300-u01-repair_en (no conflicts in shared registries), all 13 content gates pass with no new findings.

## Outcome

- Impact: fix for GENG-300 Unit 1 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/geng-300-u01-repair_en (no conflicts in shared registries), all 13 content gates pass with no new findings.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
