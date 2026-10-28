---
id: crew-efmp-301-u06-review_en-conflict1
title: crew fix EFMP-301 unit 6
stage: misc
date: 2026-10-28
surface: agent
model: claude
feature: efmp-301
branch: crew/efmp-301-u06-review_en
user: crew
command: crew fix
labels: ["crew", "claude", "fix"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-301/crew-efmp-301-u06-review_en.misc.prompt.md
 - specs/content/efmp-301/reviews/unit-06/G3/20f4255e-9449-4f10-a771-4653e5eee5e5.json
 - specs/content/efmp-301/reviews/unit-06/G3/20f4255e-9449-4f10-a771-4653e5eee5e5.summary.md
 - specs/content/efmp-301/reviews/unit-06/G3/logs-20f4255e/check-depth-gate.txt
 - specs/content/efmp-301/reviews/unit-06/G3/logs-20f4255e/check-docs-sync.txt
 - specs/content/efmp-301/reviews/unit-06/G3/logs-20f4255e/check-figures.txt
 - specs/content/efmp-301/reviews/unit-06/G3/logs-20f4255e/check-no-answer-keys.txt
 - specs/content/efmp-301/reviews/unit-06/G3/logs-20f4255e/check-no-em-dash.txt
 - specs/content/efmp-301/reviews/unit-06/G3/logs-20f4255e/measure-figure-text.txt
 - specs/content/efmp-301/reviews/unit-06/G3/logs-20f4255e/render-review.txt
 - specs/content/efmp-301/reviews/unit-06/G3/logs-20f4255e/validate-content.txt
 - specs/content/efmp-301/reviews/unit-06/G3/renders-20f4255e/fig-U6-1.png
 - specs/content/efmp-301/reviews/unit-06/G3/renders-20f4255e/fig-U6-2.png
 - specs/content/efmp-301/reviews/unit-06/G3/renders-20f4255e/fig-U6-3.png
 - specs/content/efmp-301/reviews/unit-06/G3/renders-20f4255e/fig-U6-4.png
 - specs/content/efmp-301/reviews/unit-06/G3/run-002/manifest.json
 - specs/content/efmp-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u06-review_en-conflict1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u06-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-301-u06-review_en conflicts with main (specs/content/efmp-301/tasks.md, static/content-status.json). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-06/`.

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
- (efmp-301-u06-review_en, review_en, agy) Cycle 2 G3 review passed with 8 non-blocking advisory findings carried forward (spec key terms, ERQ word count, MCQ key clustering, and figure text spacing tolerances under updated geometry checks).
- (efmp-301-u06-review_en, review_en, agy) Stage G3 en-review remains open (▢) and advisory under ADR-0019; no reviewer initials added.
- (efmp-301-u06-fix, fix, opencode) G3 en-review for EFMP-301 Unit 6 is stale and needs a fresh independent run; the fig-U6-1 body font is now 13px (not 14px) by design - do not revert without re-measuring.


## Response snapshot

Merged origin/main into the branch, fixed the EFMP-301 Unit 6 tracker conflict (main's newer G2 evidence, run002 G3 marked stale), accepted main's removal of the generated content-status file, and `npm run check:content` now passes.

## Outcome

- Impact: fix for EFMP-301 Unit 6 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into the branch, fixed the EFMP-301 Unit 6 tracker conflict (main's newer G2 evidence, run002 G3 marked stale), accepted main's removal of the generated content-status file, and `npm run check:content` now passes.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The G3 en-review for EFMP-301 Unit 6 needs a fresh independent run. The run002 pass report doesn't match the current unit files, including the figures changed by `8bac57e5`.
  - `static/content-status.json` is now untracked; if `check:content-status` reports it stale, run `npm run build:content-status`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
