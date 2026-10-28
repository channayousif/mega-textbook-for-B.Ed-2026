---
id: crew-efmp-305-u02-review_en
title: crew review_en EFMP-305 unit 2
stage: misc
date: 2026-10-27
surface: agent
model: agy
feature: efmp-305
branch: crew/efmp-305-u02-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-305/0898-crew-efmp-305-u02-review-en.misc.prompt.md
 - specs/content/efmp-305/reviews/unit-02/G3/agent-g3-efmp-305-u2-runfd523bce.json
 - specs/content/efmp-305/reviews/unit-02/G3/agent-g3-efmp-305-u2-runfd523bce.summary.md
 - specs/content/efmp-305/reviews/unit-02/G3/manifest.json
 - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/check-depth-gate.log
 - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/check-docs-sync.log
 - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/check-figures.log
 - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/check-no-answer-keys.log
 - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/check-no-em-dash.log
 - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/fig-U2-1-render.png
 - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/fig-U2-2-render.png
 - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/fig-U2-3-render.png
 - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/fig-U2-4-render.png
 - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/independent-assessment-derivation.md
 - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/measure-figure-text.log
 - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/render-review.log
 - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/validate-content.log
 - specs/content/efmp-305/tasks.md
 - static/content-status.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u02-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u02-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-305 Unit 2 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

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

Delivered independent G3 English cycle 2 review for EFMP-305 Unit 2 with disposition pass after verifying resolution of all cycle 1 citation and gate findings.

## Outcome

- Impact: review_en for EFMP-305 Unit 2 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Delivered independent G3 English cycle 2 review for EFMP-305 Unit 2 with disposition pass after verifying resolution of all cycle 1 citation and gate findings.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 advisory review passed on cycle 2; next job on EFMP-305 Unit 2 is independent G5 Urdu review (unit has completed G4 translation mirror).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
