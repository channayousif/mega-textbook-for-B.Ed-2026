---
id: crew-efmp-303-u06-review_en
title: crew review_en EFMP-303 unit 6
stage: misc
date: 2026-10-18
surface: agent
model: opencode
feature: efmp-303
branch: crew/efmp-303-u06-review_en
user: crew
command: crew review_en
labels: ["crew", "opencode", "review_en"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-303/0338-efmp-303-u06-independent-g3-review.misc.prompt.md
 - specs/content/efmp-303/reviews/unit-06/G3/20261018T200000000Z.json
 - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/check:depth-gate.txt
 - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/check:docs-sync.txt
 - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/check:figures.txt
 - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/check:no-answer-keys.txt
 - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/check:no-em-dash.txt
 - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/fig-U6-3-render.png
 - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/measure-fig-U6-1.txt
 - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/measure-fig-U6-2.txt
 - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/measure-fig-U6-3.txt
 - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/measure-fig-U6-4.txt
 - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/measure-fig-U6-5.txt
 - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/measure-fig-U6-6.txt
 - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/render-review.txt
 - specs/content/efmp-303/reviews/unit-06/G3/logs-20261018T200000000Z/validate:content.txt
 - specs/content/efmp-303/reviews/unit-06/G3/manifest.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u06-review_en

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u06-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-303 Unit 6 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-06/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.


## Response snapshot

Produced and committed an independent G3 English pass review for EFMP-303 Unit 6 with validated evidence report, gate logs, figure measurements, render PNG, and PHR.

## Outcome

- Impact: review_en for EFMP-303 Unit 6 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Produced and committed an independent G3 English pass review for EFMP-303 Unit 6 with validated evidence report, gate logs, figure measurements, render PNG, and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
