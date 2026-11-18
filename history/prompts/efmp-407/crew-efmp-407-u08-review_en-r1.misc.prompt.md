---
id: crew-efmp-407-u08-review_en-r1
title: crew review_en EFMP-407 unit 8
stage: misc
date: 2026-11-07
surface: agent
model: codex
feature: efmp-407
branch: crew/efmp-407-u08-review_en-r1
user: crew
command: crew review_en
labels: ["crew", "codex", "review_en"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261162-efmp-407-u08-g3-continuation.misc.prompt.md
 - specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en-r1.json
 - specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en-r1/input-verification.txt
 - specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en-r1/logs/check-content-before-status-refresh.txt
 - specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en-r1/logs/check-content-final.txt
 - specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en-r1/logs/check-content.txt
 - specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en-r1/logs/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en-r1/logs/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en-r1/logs/check-figures.txt
 - specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en-r1/logs/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en-r1/logs/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en-r1/logs/validate-content.txt
 - specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en-r1/manifest.json
 - specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en-r1/render-unavailable.txt
 - specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en-r1/summary.md
 - specs/content/efmp-407/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u08-review_en-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u08-review_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-407 Unit 8 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-08/`.

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

Added Unit 8’s advisory G3 escalation report, evidence logs, tracker row and prompt history record.

## Outcome

- Impact: review_en for EFMP-407 Unit 8 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added Unit 8’s advisory G3 escalation report, evidence logs, tracker row and prompt history record.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains open. Prior findings F1-F9 need author repairs; fresh review requires runtime provenance and browser/print evidence.
  - G3 remains open. Prior findings F1-F9 need author repairs; fresh review requires runtime provenance and browser/print evidence.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
