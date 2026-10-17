---
id: crew-efmp-304-u01-review_en
title: crew review_en EFMP-304 unit 1
stage: misc
date: 2026-10-17
surface: agent
model: agy
feature: efmp-304
branch: crew/efmp-304-u01-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-304/0171-efmp-304-u01-independent-g3-review.misc.prompt.md
 - specs/content/efmp-304/reviews/unit-01/G3/agent-g3-efmp-304-u1-run5e4cc29c.json
 - specs/content/efmp-304/reviews/unit-01/G3/manifest.json
 - specs/content/efmp-304/reviews/unit-01/logs-5e4cc29c/check-depth-gate.log
 - specs/content/efmp-304/reviews/unit-01/logs-5e4cc29c/check-docs-sync.log
 - specs/content/efmp-304/reviews/unit-01/logs-5e4cc29c/check-figures.log
 - specs/content/efmp-304/reviews/unit-01/logs-5e4cc29c/check-no-answer-keys.log
 - specs/content/efmp-304/reviews/unit-01/logs-5e4cc29c/check-no-em-dash.log
 - specs/content/efmp-304/reviews/unit-01/logs-5e4cc29c/render-review.log
 - specs/content/efmp-304/reviews/unit-01/logs-5e4cc29c/validate-content.log
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/desktop-index.png
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/desktop-topic-01.png
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/desktop-topic-02.png
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/desktop-topic-03.png
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/desktop-topic-04.png
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/desktop-topic-05.png
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/desktop-unit-assessment.png
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/narrow360-index.png
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/narrow360-topic-01.png
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/narrow360-topic-02.png
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/narrow360-topic-03.png
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/narrow360-topic-04.png
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/narrow360-topic-05.png
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/narrow360-unit-assessment.png
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/print-a4-index.pdf
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/print-a4-topic-01.pdf
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/print-a4-topic-02.pdf
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/print-a4-topic-03.pdf
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/print-a4-topic-04.pdf
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/print-a4-topic-05.pdf
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/print-a4-unit-assessment.pdf
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/render-inspect.json
 - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/render-inspect.log
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u01-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u01-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-304 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-304 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.


## Response snapshot

Generated independent G3 English review evidence with disposition revise (identifying 3 blocking defects and 2 advisories), visual render inspections, gate logs, and PHR 0171 for EFMP-304 Unit 1.

## Outcome

- Impact: review_en for EFMP-304 Unit 1 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 33 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated independent G3 English review evidence with disposition revise (identifying 3 blocking defects and 2 advisories), visual render inspections, gate logs, and PHR 0171 for EFMP-304 Unit 1.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
