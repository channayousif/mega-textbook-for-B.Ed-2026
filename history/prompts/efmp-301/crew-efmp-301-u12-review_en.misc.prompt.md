---
id: crew-efmp-301-u12-review_en
title: crew review_en EFMP-301 unit 12
stage: misc
date: 2026-10-27
surface: agent
model: codex
feature: efmp-301
branch: crew/efmp-301-u12-review_en
user: crew
command: crew review_en
labels: ["crew", "codex", "review_en"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0544-efmp301-unit12-final-g3.general.prompt.md
 - specs/content/efmp-301/reviews/unit-12/G3/agent-codex-g3-u12-run002.json
 - specs/content/efmp-301/reviews/unit-12/G3/crew-run002/check-content.log
 - specs/content/efmp-301/reviews/unit-12/G3/crew-run002/check-depth-gate.log
 - specs/content/efmp-301/reviews/unit-12/G3/crew-run002/check-docs-sync.log
 - specs/content/efmp-301/reviews/unit-12/G3/crew-run002/check-figures.log
 - specs/content/efmp-301/reviews/unit-12/G3/crew-run002/check-no-answer-keys.log
 - specs/content/efmp-301/reviews/unit-12/G3/crew-run002/check-no-em-dash.log
 - specs/content/efmp-301/reviews/unit-12/G3/crew-run002/commands.json
 - specs/content/efmp-301/reviews/unit-12/G3/crew-run002/final-check-content.log
 - specs/content/efmp-301/reviews/unit-12/G3/crew-run002/independent-solutions.md
 - specs/content/efmp-301/reviews/unit-12/G3/crew-run002/main-check-content-archive-without-index.log
 - specs/content/efmp-301/reviews/unit-12/G3/crew-run002/main-check-content.log
 - specs/content/efmp-301/reviews/unit-12/G3/crew-run002/manifest-verification.log
 - specs/content/efmp-301/reviews/unit-12/G3/crew-run002/manifest.json
 - specs/content/efmp-301/reviews/unit-12/G3/crew-run002/post-tracker-content-status-stale.log
 - specs/content/efmp-301/reviews/unit-12/G3/crew-run002/repair-recheck.md
 - specs/content/efmp-301/reviews/unit-12/G3/crew-run002/report-validation.log
 - specs/content/efmp-301/reviews/unit-12/G3/crew-run002/validate-content.log
 - specs/content/efmp-301/reviews/unit-12/G3/summary-codex-run002.md
 - specs/content/efmp-301/tasks.md
 - static/content-status.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u12-review_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u12-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-301 Unit 12 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 12 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-12/`.

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

Committed the final Unit 12 English review, complete prior-finding recheck, evidence logs, advisory tracker row, and PHR.

## Outcome

- Impact: review_en for EFMP-301 Unit 12 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Committed the final Unit 12 English review, complete prior-finding recheck, evidence logs, advisory tracker row, and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Owner action needed on modelling claims, unstated ERQ word limits, source uncertainty, and current visual inspection.
  - Owner action needed on modelling claims, unstated ERQ word limits, source uncertainty, and current visual inspection.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
