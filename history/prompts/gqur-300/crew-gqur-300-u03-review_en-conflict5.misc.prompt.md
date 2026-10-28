---
id: crew-gqur-300-u03-review_en-conflict5
title: crew fix GQUR-300 unit 3
stage: misc
date: 2026-10-28
surface: agent
model: codex
feature: gqur-300
branch: crew/gqur-300-u03-review_en
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261037-merge-unit-three-review-conflict.general.prompt.md
 - history/prompts/gqur-300/0900-crew-gqur-300-u03-review-en.misc.prompt.md
 - history/prompts/gqur-300/20261035-resolve-unit-three-review-merge.misc.prompt.md
 - history/prompts/gqur-300/crew-gqur-300-u03-review_en-conflict1.misc.prompt.md
 - history/prompts/gqur-300/crew-gqur-300-u03-review_en.misc.prompt.md
 - specs/content/gqur-300/reviews/unit-03/G3/agent-g3-gqur300-u3-run90e224ef.json
 - specs/content/gqur-300/reviews/unit-03/G3/agent-g3-gqur300-u3-run90e224ef.summary.md
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/check-depth-gate.log
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/check-docs-sync.log
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/check-figures.log
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/check-no-answer-keys.log
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/check-no-em-dash.log
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/fig-U3-1-render.png
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/fig-U3-2-render.png
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/fig-U3-3-render.png
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/fig-U3-4-render.png
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/fig-U3-5-render.png
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/fig-U3-6-render.png
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/independent-assessment-derivation.md
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/measure-figure-text.log
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/render-review.log
 - specs/content/gqur-300/reviews/unit-03/logs-90e224ef/validate-content.log
 - specs/content/gqur-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-300-u03-review_en-conflict5

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u03-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gqur-300-u03-review_en conflicts with main (specs/content/gqur-300/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GQUR-300 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-03/`.

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
- (gqur-300-u03-review_en, review_en, agy) G3 cycle 2 review passed; all 3 previous blocking findings (F1 grounding/gap, F2 mark scheme step alignment, F3 fare-desk arithmetic) verified resolved.
- (gqur-300-u03-review_en, review_en, agy) Unit 3 has completed Urdu translation at i18n/ur/.../gqur-300/unit-03/ and is ready for independent G5 review once G3 is certified.
- (gqur-300-u03-fix, fix, opencode) GQUR-300 Unit 3's G3 English review row is marked stale and needs a fresh independent run; the viewBox height for fig-U3-2 is now 482 (was 470) and must be preserved by any future edits to that figure.
- (gqur-300-u03-translate-r1, translate, agy) All 8 key_terms in Unit 3 index.mdx remain unbanked in terminology.csv (flagged in concepts/unit-03.md) and await curriculum owner banking.
- (gqur-300-u03-translate-r1, translate, agy) G4 tracker row in specs/content/gqur-300/tasks.md is set to in-progress (▣) and translation_status remains draft pending fresh independent G5 review.


## Response snapshot

Resolved the Unit 3 tracker conflict, preserved advisory review status, and committed the validated merge.

## Outcome

- Impact: fix for GQUR-300 Unit 3 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 23 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved the Unit 3 tracker conflict, preserved advisory review status, and committed the validated merge.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Content checks pass 12/13 gates; the stale content-status finding also occurs on main, with no new findings.
  - Content checks pass 12/13 gates; the stale content-status finding also occurs on main, with no new findings.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
