---
id: crew-gnas-301-u06-review_en-conflict5
title: crew fix GNAS-301 unit 6
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: gnas-301
branch: crew/gnas-301-u06-review_en
user: crew
command: crew fix
labels: ["crew", "agy", "fix"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261034-gnas-301-unit-six-review-reconciliation.general.prompt.md
 - history/prompts/general/20261035-merge-unit-six-review-branch.general.prompt.md
 - history/prompts/gnas-301/crew-gnas-301-u06-review_en-conflict1.misc.prompt.md
 - history/prompts/gnas-301/crew-gnas-301-u06-review_en-conflict5.misc.prompt.md
 - history/prompts/gnas-301/crew-gnas-301-u06-review_en.misc.prompt.md
 - specs/content/gnas-301/reviews/unit-06/G3/codex-20261028-reconciliation.json
 - specs/content/gnas-301/reviews/unit-06/G3/crew-20261028-final/assessment-derivation.md
 - specs/content/gnas-301/reviews/unit-06/G3/crew-20261028-final/build-content-status.log
 - specs/content/gnas-301/reviews/unit-06/G3/crew-20261028-final/check-content-before-cache-refresh.log
 - specs/content/gnas-301/reviews/unit-06/G3/crew-20261028-final/check-content-final.log
 - specs/content/gnas-301/reviews/unit-06/G3/crew-20261028-final/check-content-initial.log
 - specs/content/gnas-301/reviews/unit-06/G3/crew-20261028-final/check-depth-gate.log
 - specs/content/gnas-301/reviews/unit-06/G3/crew-20261028-final/check-docs-sync.log
 - specs/content/gnas-301/reviews/unit-06/G3/crew-20261028-final/check-figures.log
 - specs/content/gnas-301/reviews/unit-06/G3/crew-20261028-final/check-no-answer-keys.log
 - specs/content/gnas-301/reviews/unit-06/G3/crew-20261028-final/check-no-em-dash.log
 - specs/content/gnas-301/reviews/unit-06/G3/crew-20261028-final/commands.json
 - specs/content/gnas-301/reviews/unit-06/G3/crew-20261028-final/manifest.json
 - specs/content/gnas-301/reviews/unit-06/G3/crew-20261028-final/provenance.log
 - specs/content/gnas-301/reviews/unit-06/G3/crew-20261028-final/render-limitation.md
 - specs/content/gnas-301/reviews/unit-06/G3/crew-20261028-final/report-validation.log
 - specs/content/gnas-301/reviews/unit-06/G3/crew-20261028-final/summary.md
 - specs/content/gnas-301/reviews/unit-06/G3/crew-20261028-final/validate-content.log
 - specs/content/gnas-301/reviews/unit-06/G3/crew-20261028/manifest.json
 - specs/content/gnas-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u06-review_en-conflict5

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u06-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gnas-301-u06-review_en conflicts with main (specs/content/gnas-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GNAS-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-06/`.

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
- (gnas-301-u06-review_en-conflict1, fix, codex) G-2026-33 and existing Unit 6 evidence gaps remain owner-owned; G3 stays open.
- (gnas-301-u06-review_en-conflict1, fix, codex) G-2026-33 and existing Unit 6 evidence gaps remain owner-owned; G3 stays open.
- (gnas-301-u06-review_en, review_en, codex) Owner must resolve G-2026-33; current rendering, source binding, provenance and assessment evidence remain incomplete.
- (gnas-301-u06-review_en, review_en, codex) Owner must resolve G-2026-33; current rendering, source binding, provenance and assessment evidence remain incomplete.
- (gnas-301-u06-fix, fix, opencode) G3 en-review is stale since the figure-geometry repair; needs a fresh G3 run (owner-gated at G-2026-33 for third cycle).


## Response snapshot

Merged origin/main into crew/gnas-301-u06-review_en, resolved the task tracker conflict in specs/content/gnas-301/tasks.md preserving both reviews, refreshed content status, and verified all 13 content gates pass.

## Outcome

- Impact: fix for GNAS-301 Unit 6 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gnas-301-u06-review_en, resolved the task tracker conflict in specs/content/gnas-301/tasks.md preserving both reviews, refreshed content status, and verified all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G-2026-33 cycle-count decision and existing Unit 6 evidence gaps remain owner-owned; G3 stays open.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
