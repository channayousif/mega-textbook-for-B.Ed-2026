---
id: crew-gnas-301-u05-review_en
title: crew review_en GNAS-301 unit 5
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: gnas-301
branch: crew/gnas-301-u05-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gnas-301/crew-gnas-301-u05-review_en.misc.prompt.md
 - specs/content/gnas-301/reviews/unit-05/G3/5c420198-baaa-4562-ab56-91a01924a95a.json
 - specs/content/gnas-301/reviews/unit-05/G3/5c420198-baaa-4562-ab56-91a01924a95a.summary.md
 - specs/content/gnas-301/reviews/unit-05/G3/crew-5c420198/manifest.json
 - specs/content/gnas-301/reviews/unit-05/G3/logs-5c420198/check-content.txt
 - specs/content/gnas-301/reviews/unit-05/G3/logs-5c420198/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-05/G3/logs-5c420198/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-05/G3/logs-5c420198/check-figures.txt
 - specs/content/gnas-301/reviews/unit-05/G3/logs-5c420198/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-05/G3/logs-5c420198/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-05/G3/logs-5c420198/measure-figure-text.txt
 - specs/content/gnas-301/reviews/unit-05/G3/logs-5c420198/render-review.txt
 - specs/content/gnas-301/reviews/unit-05/G3/logs-5c420198/validate-content.txt
 - specs/content/gnas-301/reviews/unit-05/G3/renders-5c420198/fig-U5-1.png
 - specs/content/gnas-301/reviews/unit-05/G3/renders-5c420198/fig-U5-2.png
 - specs/content/gnas-301/reviews/unit-05/G3/renders-5c420198/fig-U5-3.png
 - specs/content/gnas-301/reviews/unit-05/G3/renders-5c420198/fig-U5-4.png
 - specs/content/gnas-301/reviews/unit-05/G3/renders-5c420198/fig-U5-5.png
 - specs/content/gnas-301/reviews/unit-05/G3/renders-5c420198/fig-U5-6.png
 - specs/content/gnas-301/reviews/unit-05/G3/renders-5c420198/fig-U5-7.png
 - specs/content/gnas-301/reviews/unit-05/G3/renders-5c420198/fig-U5-8.png
 - specs/content/gnas-301/reviews/unit-05/G3/summary.md
 - specs/content/gnas-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u05-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u05-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GNAS-301 Unit 5 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GNAS-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-05/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.


## Response snapshot

Executed independent second-cycle G3 English review of GNAS-301 Unit 5 with advisory pass disposition, verified resolution of prior round-2 blocking defects (Topic 5.1 RRQ blueprint floor, WHO air 2024 claims, fig-U5-3 connector arrows and panel spacing, coverage matrix cells, alibhatti2017 author citations) and figure text geometry across all 32 SVG variants, recorded validated review contract evidence and command logs, rasterized figures to PNG via Sharp, and appended advisory row to tasks.md with G3 open.

## Outcome

- Impact: review_en for GNAS-301 Unit 5 by agy (Cycle 2, pass).
- Tests: npm run check:content passed all 13 gates with exit code 0.
- Files: 23 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Executed independent second-cycle G3 English review of GNAS-301 Unit 5 with advisory pass disposition, verified resolution of prior round-2 findings, recorded validated review contract evidence and command logs, and appended advisory row to tasks.md with G3 open.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All 5 round-2 blocking defects resolved (RRQ balance 2/2/3/3 across topics 5.1-5.4, WHO 2024 claim alignment, fig-U5-3 panels and connector arrows across all 4 variants, coverage matrix U5-06 and U5-07 cells, and complete 5-author citation for alibhatti2017).
  - All 32 SVG figure variants pass measure-figure-text.mjs with exit code 0.
  - Carried advisories: MEA timeline figure plan divergence (6 delivered vs 8 planned) accepted per repair notes; missing glossary keys (Toxicant, Risk management, Environmental law) belong in repo-wide glossary.json; un-bound source excerpts (who-chemical-safety, un-paris, un-sdgs) exist on disk.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
