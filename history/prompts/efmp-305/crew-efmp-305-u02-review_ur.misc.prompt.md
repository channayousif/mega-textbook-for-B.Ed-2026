---
id: crew-efmp-305-u02-review_ur
title: crew review_ur EFMP-305 unit 2
stage: misc
date: 2026-11-02
surface: agent
model: opencode
feature: efmp-305
branch: crew/efmp-305-u02-review_ur
user: crew
command: crew review_ur
labels: ["crew", "opencode", "review_ur"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-305/crew-efmp-305-u02-review_ur.misc.prompt.md
 - specs/content/efmp-305/reviews/unit-02/G5/crew-efmp-305-u02-g5-rabe274b8.json
 - specs/content/efmp-305/reviews/unit-02/G5/crew-efmp-305-u02-g5-rabe274b8.summary.md
 - specs/content/efmp-305/reviews/unit-02/G5/manifest.json
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/check-depth-gate.log
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/check-docs-sync.log
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/check-figures.log
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/check-no-answer-keys.log
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/check-no-em-dash.log
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/fig-U2-1-ur-dark-svg.png
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/fig-U2-1-ur-svg.png
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/fig-U2-2-ur-dark-svg.png
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/fig-U2-2-ur-svg.png
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/fig-U2-3-ur-dark-svg.png
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/fig-U2-3-ur-svg.png
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/fig-U2-4-ur-dark-svg.png
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/fig-U2-4-ur-svg.png
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/measure-figure-text.log
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/render-figures.log
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/render-figures.mjs
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/render-review.log
 - specs/content/efmp-305/reviews/unit-02/logs-abe274b8/validate-content.log
 - specs/content/efmp-305/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u02-review_ur

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u02-review_ur`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G5 Urdu reviewer of EFMP-305 Unit 2 (review-unit skill, .claude/agents/g5-reviewer.md). You did not translate this unit. Produce the evidence report and advisory tracker row. Never tick G5, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-02/`.

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

Completed the independent G5 Urdu review of EFMP-305 Unit 2, producing a validated escalate report with gate logs, figure renders and an advisory tracker row, all committed on the branch.

## Outcome

- Impact: review_ur for EFMP-305 Unit 2 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 23 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed the independent G5 Urdu review of EFMP-305 Unit 2, producing a validated escalate report with gate logs, figure renders and an advisory tracker row, all committed on the branch.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The escalation is advisory only; all six deterministic gates pass and the bilingual comparison found no material semantic defect. The two blockers are missing page-level render access (accessibility/rtl unverified, no build/dev server/Playwright) and terminology bank departures (Assessment جانچ vs تشخیص, Slow Learner سست طالب علم vs کمزور متعلم, Learning Outcome تعلیمی نتائج vs نتیجہ ہائے تعلم, unbanked Labelling لیبل/لیبلنگ/ٹھپا) needing an owner ruling.
  - A human should inspect the eight committed PNGs under `reviews/unit-02/logs-abe274b8/` and run a render-capable G5 pass; the accepted G3 dependency (CMY desk report) is unsigned, so automatic acceptance is not possible.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
