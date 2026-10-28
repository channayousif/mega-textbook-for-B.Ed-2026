---
id: crew-efmp-301-u08-review_en-conflict1
title: crew fix EFMP-301 unit 8
stage: misc
date: 2026-10-28
surface: agent
model: agy_claude
feature: efmp-301
branch: crew/efmp-301-u08-review_en
user: crew
command: crew fix
labels: ["crew", "agy_claude", "fix"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-301/crew-efmp-301-u08-review_en.misc.prompt.md
 - history/prompts/general/20261031-efmp301-unit-eight-final-english-review.general.prompt.md
 - specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028.json
 - specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028/assessment-analysis.md
 - specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028/check-content-after-tracker.log
 - specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028/check-content-final.log
 - specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028/check-content.log
 - specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028/check-depth-gate.log
 - specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028/check-docs-sync.log
 - specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028/check-figures.log
 - specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028/check-no-answer-keys.log
 - specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028/check-no-em-dash.log
 - specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028/commands.json
 - specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028/input-verification.log
 - specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028/manifest.json
 - specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028/started.txt
 - specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028/status-refresh.log
 - specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028/summary.md
 - specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028/validate-content.log
 - specs/content/efmp-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u08-review_en-conflict1

You are the agy_claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u08-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-301-u08-review_en conflicts with main (specs/content/efmp-301/tasks.md, static/content-status.json). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-301 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-08/`.

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
- (efmp-301-u08-review_en, review_en, codex) Owner action needed on untaught RRQ-10, unspecified ERQ word limits, and missing source/render evidence.
- (efmp-301-u08-review_en, review_en, codex) Owner action needed on untaught RRQ-10, unspecified ERQ word limits, and missing source/render evidence.
- (efmp-301-u08-fix, fix, opencode) G3 en-review is stale and needs a fresh run after the figure-geometry repair.
- (efmp-301-u08-fix, fix, opencode) The G2 en-draft gates file was regenerated; verify it passes `npm run check:content` before further work.


## Response snapshot

Merged origin/main into crew/efmp-301-u08-review_en, resolving conflicts in specs/content/efmp-301/tasks.md (kept main's newer G2 gates path and combined both sides' G3 review history) and static/content-status.json (accepted main's deletion).

## Outcome

- Impact: fix for EFMP-301 Unit 8 by agy_claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-301-u08-review_en, resolving conflicts in specs/content/efmp-301/tasks.md (kept main's newer G2 gates path and combined both sides' G3 review history) and static/content-status.json (accepted main's deletion).
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The `check:content-status` gate fails on both this branch and origin/main because `static/content-status.json` was deleted; regenerating it requires `npm run build:content-status` but that is a separate fix job.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
