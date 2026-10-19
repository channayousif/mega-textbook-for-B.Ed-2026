---
id: crew-geng-301-u06-review_en-conflict1
title: crew fix GENG-301 unit 6
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: geng-301
branch: crew/geng-301-u06-review_en
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/014-agent-review-governance/0004-geng301-unit-six-advisory-review.misc.prompt.md
 - history/prompts/general/533-geng301-unit-six-merge.general.prompt.md
 - history/prompts/geng-301/crew-geng-301-u06-review_en.misc.prompt.md
 - specs/content/geng-301/reviews/unit-06/G3/crew-20261019.json
 - specs/content/geng-301/reviews/unit-06/G3/crew-20261019/baseline.md
 - specs/content/geng-301/reviews/unit-06/G3/crew-20261019/check-content.log
 - specs/content/geng-301/reviews/unit-06/G3/crew-20261019/check-depth-gate.log
 - specs/content/geng-301/reviews/unit-06/G3/crew-20261019/check-docs-sync.log
 - specs/content/geng-301/reviews/unit-06/G3/crew-20261019/check-figures.log
 - specs/content/geng-301/reviews/unit-06/G3/crew-20261019/check-no-answer-keys.log
 - specs/content/geng-301/reviews/unit-06/G3/crew-20261019/check-no-em-dash.log
 - specs/content/geng-301/reviews/unit-06/G3/crew-20261019/commands.json
 - specs/content/geng-301/reviews/unit-06/G3/crew-20261019/final-check-content.log
 - specs/content/geng-301/reviews/unit-06/G3/crew-20261019/independent-solutions.md
 - specs/content/geng-301/reviews/unit-06/G3/crew-20261019/manifest.json
 - specs/content/geng-301/reviews/unit-06/G3/crew-20261019/render-limitation.md
 - specs/content/geng-301/reviews/unit-06/G3/crew-20261019/report-validation.log
 - specs/content/geng-301/reviews/unit-06/G3/crew-20261019/source-inspection.md
 - specs/content/geng-301/reviews/unit-06/G3/crew-20261019/summary.md
 - specs/content/geng-301/reviews/unit-06/G3/crew-20261019/validate-content.log
 - specs/content/geng-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u06-review_en-conflict1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u06-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/geng-301-u06-review_en conflicts with main (it could not join the hourly batch). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENG-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-06/`.

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
- (geng-301-u06-review_en, review_en, codex) Author repairs and host provenance/render evidence are required before fresh review; G3 remains incomplete.
- (geng-301-u06-review_en, review_en, codex) Author repairs and host provenance/render evidence are required before fresh review; G3 remains incomplete.


## Response snapshot

Resolved the tracker conflict, preserved both advisory review entries, and validated all content gates.

## Outcome

- Impact: fix for GENG-301 Unit 6 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved the tracker conflict, preserved both advisory review entries, and validated all content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 6 author repairs and fresh provenance/render review remain pending; G3 stays incomplete.
  - Unit 6 author repairs and fresh provenance/render review remain pending; G3 stays incomplete.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
