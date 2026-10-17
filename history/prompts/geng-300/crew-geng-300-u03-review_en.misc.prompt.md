---
id: crew-geng-300-u03-review_en
title: crew review_en GENG-300 unit 3
stage: misc
date: 2026-10-17
surface: agent
model: codex
feature: geng-300
branch: crew/geng-300-u03-review_en
user: crew
command: crew review_en
labels: ["crew", "codex", "review_en"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/014-agent-review-governance/0001-geng300-unit3-review-preflight.misc.prompt.md
 - specs/content/geng-300/reviews/unit-03/G3/20261017-crew-preflight.json
 - specs/content/geng-300/reviews/unit-03/G3/20261017-crew-preflight/check-content-final.log
 - specs/content/geng-300/reviews/unit-03/G3/20261017-crew-preflight/check-content-initial.log
 - specs/content/geng-300/reviews/unit-03/G3/20261017-crew-preflight/check-depth-gate.log
 - specs/content/geng-300/reviews/unit-03/G3/20261017-crew-preflight/check-docs-sync.log
 - specs/content/geng-300/reviews/unit-03/G3/20261017-crew-preflight/check-figures.log
 - specs/content/geng-300/reviews/unit-03/G3/20261017-crew-preflight/check-no-answer-keys.log
 - specs/content/geng-300/reviews/unit-03/G3/20261017-crew-preflight/check-no-em-dash.log
 - specs/content/geng-300/reviews/unit-03/G3/20261017-crew-preflight/command-records.json
 - specs/content/geng-300/reviews/unit-03/G3/20261017-crew-preflight/digest-verification.log
 - specs/content/geng-300/reviews/unit-03/G3/20261017-crew-preflight/manifest.json
 - specs/content/geng-300/reviews/unit-03/G3/20261017-crew-preflight/summary.md
 - specs/content/geng-300/reviews/unit-03/G3/20261017-crew-preflight/validate-content.log
 - specs/content/geng-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u03-review_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u03-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GENG-300 Unit 3 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-300 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-03/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.


## Response snapshot

Added GENG-300 Unit 3 advisory G3 escalation, hashed evidence logs, tracker entry and prompt history record.

## Outcome

- Impact: review_en for GENG-300 Unit 3 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added GENG-300 Unit 3 advisory G3 escalation, hashed evidence logs, tracker entry and prompt history record.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
