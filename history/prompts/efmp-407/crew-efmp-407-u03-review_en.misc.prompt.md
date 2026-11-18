---
id: crew-efmp-407-u03-review_en
title: crew review_en EFMP-407 unit 3
stage: misc
date: 2026-11-07
surface: agent
model: codex
feature: efmp-407
branch: crew/efmp-407-u03-review_en
user: crew
command: crew review_en
labels: ["crew", "codex", "review_en"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261160-efmp407-u03-g3-review.general.prompt.md
 - specs/content/efmp-407/reviews/unit-03/G3/20261107-codex.json
 - specs/content/efmp-407/reviews/unit-03/G3/20261107-codex/assessment-solve.md
 - specs/content/efmp-407/reviews/unit-03/G3/20261107-codex/commands.json
 - specs/content/efmp-407/reviews/unit-03/G3/20261107-codex/logs/check-content-after-tracker.txt
 - specs/content/efmp-407/reviews/unit-03/G3/20261107-codex/logs/check-content-final.txt
 - specs/content/efmp-407/reviews/unit-03/G3/20261107-codex/logs/check-content.txt
 - specs/content/efmp-407/reviews/unit-03/G3/20261107-codex/logs/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-03/G3/20261107-codex/logs/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-03/G3/20261107-codex/logs/check-figures.txt
 - specs/content/efmp-407/reviews/unit-03/G3/20261107-codex/logs/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-03/G3/20261107-codex/logs/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-03/G3/20261107-codex/logs/input-verification.txt
 - specs/content/efmp-407/reviews/unit-03/G3/20261107-codex/logs/source-retrieval.txt
 - specs/content/efmp-407/reviews/unit-03/G3/20261107-codex/logs/validate-content.txt
 - specs/content/efmp-407/reviews/unit-03/G3/20261107-codex/manifest.json
 - specs/content/efmp-407/reviews/unit-03/G3/20261107-codex/summary.md
 - specs/content/efmp-407/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u03-review_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u03-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-407 Unit 3 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-03/`.

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

Recorded the independent Unit 3 G3 escalation report, assessment solutions, hashed evidence logs, advisory tracker row and PHR.

## Outcome

- Impact: review_en for EFMP-407 Unit 3 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded the independent Unit 3 G3 escalation report, assessment solutions, hashed evidence logs, advisory tracker row and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Author repairs are needed for source support, contradictory SDG 5 category guidance, readability and worked examples; rendering and provenance remain unverified.
  - Author repairs are needed for source support, contradictory SDG 5 category guidance, readability and worked examples; rendering and provenance remain unverified.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
