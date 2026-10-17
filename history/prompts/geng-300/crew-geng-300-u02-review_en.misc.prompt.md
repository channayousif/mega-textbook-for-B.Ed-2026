---
id: crew-geng-300-u02-review_en
title: crew review_en GENG-300 unit 2
stage: misc
date: 2026-10-17
surface: agent
model: agy
feature: geng-300
branch: crew/geng-300-u02-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/geng-300/0173-geng-300-u02-independent-g3-review.misc.prompt.md
 - specs/content/geng-300/reviews/unit-02/G3/agent-g3-geng-300-u2-run24f6f754.json
 - specs/content/geng-300/reviews/unit-02/G3/manifest.json
 - specs/content/geng-300/reviews/unit-02/logs-24f6f754/check-depth-gate.log
 - specs/content/geng-300/reviews/unit-02/logs-24f6f754/check-docs-sync.log
 - specs/content/geng-300/reviews/unit-02/logs-24f6f754/check-figures.log
 - specs/content/geng-300/reviews/unit-02/logs-24f6f754/check-no-answer-keys.log
 - specs/content/geng-300/reviews/unit-02/logs-24f6f754/check-no-em-dash.log
 - specs/content/geng-300/reviews/unit-02/logs-24f6f754/render-review.log
 - specs/content/geng-300/reviews/unit-02/logs-24f6f754/validate-content.log
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/desktop-index.png
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/desktop-topic-01.png
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/desktop-topic-02.png
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/desktop-topic-03.png
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/desktop-unit-assessment.png
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/desktop-unit-teacher-notes.png
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/narrow360-index.png
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/narrow360-topic-01.png
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/narrow360-topic-02.png
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/narrow360-topic-03.png
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/narrow360-unit-assessment.png
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/narrow360-unit-teacher-notes.png
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/print-a4-index.pdf
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/print-a4-topic-01.pdf
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/print-a4-topic-02.pdf
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/print-a4-topic-03.pdf
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/print-a4-unit-assessment.pdf
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/print-a4-unit-teacher-notes.pdf
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/render-inspect.json
 - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/render-inspect.log
 - specs/content/geng-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u02-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u02-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GENG-300 Unit 2 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-300 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-02/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.


## Response snapshot

Conducted the independent G3 English review for GENG-300 Unit 2, producing validated evidence report specs/content/geng-300/reviews/unit-02/G3/agent-g3-geng-300-u2-run24f6f754.json with disposition revise, recording the advisory in-progress tracker row in tasks.md, and logging prompt history record 0173.

## Outcome

- Impact: review_en for GENG-300 Unit 2 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 31 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Conducted the independent G3 English review for GENG-300 Unit 2, producing validated evidence report specs/content/geng-300/reviews/unit-02/G3/agent-g3-geng-300-u2-run24f6f754.json with disposition revise, recording the advisory in-progress tracker row in tasks.md, and logging prompt history record 0173.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
