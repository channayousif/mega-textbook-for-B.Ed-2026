---
id: crew-gqur-301-u14-review_en
title: crew review_en GQUR-301 unit 14
stage: misc
date: 2026-10-22
surface: agent
model: claude
feature: gqur-301
branch: crew/gqur-301-u14-review_en
user: crew
command: crew review_en
labels: ["crew", "claude", "review_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gqur-301/reviews/unit-14/G3/crew-20261023.json
 - specs/content/gqur-301/reviews/unit-14/G3/crew-20261023.md
 - specs/content/gqur-301/reviews/unit-14/G3/crew-20261023/assessment-solutions.md
 - specs/content/gqur-301/reviews/unit-14/G3/crew-20261023/check-content-before.log
 - specs/content/gqur-301/reviews/unit-14/G3/crew-20261023/check-content-final.log
 - specs/content/gqur-301/reviews/unit-14/G3/crew-20261023/check-depth-gate.log
 - specs/content/gqur-301/reviews/unit-14/G3/crew-20261023/check-docs-sync.log
 - specs/content/gqur-301/reviews/unit-14/G3/crew-20261023/check-figures.log
 - specs/content/gqur-301/reviews/unit-14/G3/crew-20261023/check-no-answer-keys.log
 - specs/content/gqur-301/reviews/unit-14/G3/crew-20261023/check-no-em-dash.log
 - specs/content/gqur-301/reviews/unit-14/G3/crew-20261023/manifest.json
 - specs/content/gqur-301/reviews/unit-14/G3/crew-20261023/measure-figure-text.log
 - specs/content/gqur-301/reviews/unit-14/G3/crew-20261023/numeric-verification.log
 - specs/content/gqur-301/reviews/unit-14/G3/crew-20261023/render-limitation.md
 - specs/content/gqur-301/reviews/unit-14/G3/crew-20261023/report-validation.log
 - specs/content/gqur-301/reviews/unit-14/G3/crew-20261023/source-inspection.md
 - specs/content/gqur-301/reviews/unit-14/G3/crew-20261023/validate-content.log
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u14-review_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u14-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GQUR-301 Unit 14 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 14 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-14/`.

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

Recorded an independent advisory G3 escalate review of GQUR-301 Unit 14 (5 blocking findings, evidence and validated report) and an in-progress tracker row, without signing or completing G3.

## Outcome

- Impact: review_en for GQUR-301 Unit 14 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded an independent advisory G3 escalate review of GQUR-301 Unit 14 (5 blocking findings, evidence and validated report) and an in-progress tracker row, without signing or completing G3.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - F1 (data sum 503 not 513) touches topic-01, topic-02, all four fig-U14 SVGs plus dark variants, and the RRQ 1 key; fix them together and re-measure fig-U14-4.
  - F3 (z vs t) may need an owner ruling if the course intends z only; until then items that supply z* stay answerable.
  - static/content-status.json is tracked and out of date on origin/main; check:content-status fails there too.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
