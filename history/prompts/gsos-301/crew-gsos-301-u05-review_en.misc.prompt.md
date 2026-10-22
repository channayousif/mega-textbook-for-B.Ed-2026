---
id: crew-gsos-301-u05-review_en
title: crew review_en GSOS-301 unit 5
stage: misc
date: 2026-10-22
surface: agent
model: opencode
feature: gsos-301
branch: crew/gsos-301-u05-review_en
user: crew
command: crew review_en
labels: ["crew", "opencode", "review_en"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gsos-301/reviews/unit-05/G3/crew-gsos-301-u05-g3-r9f2a1b0c.json
 - specs/content/gsos-301/reviews/unit-05/G3/logs-20261022T214842Z/check-depth-gate.txt
 - specs/content/gsos-301/reviews/unit-05/G3/logs-20261022T214842Z/check-docs-sync.txt
 - specs/content/gsos-301/reviews/unit-05/G3/logs-20261022T214842Z/check-figures.txt
 - specs/content/gsos-301/reviews/unit-05/G3/logs-20261022T214842Z/check-no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-05/G3/logs-20261022T214842Z/check-no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-05/G3/logs-20261022T214842Z/render-review.txt
 - specs/content/gsos-301/reviews/unit-05/G3/logs-20261022T214842Z/validate-content.txt
 - specs/content/gsos-301/reviews/unit-05/G3/manifest.json
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u05-review_en

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u05-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GSOS-301 Unit 5 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-05/`.

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

Wrote independent G3 English review of GSOS-301 Unit 5 (escalate) with full evidence  -  validated report at specs/content/gsos-301/reviews/unit-05/G3/crew-gsos-301-u05-g3-r9f2a1b0c.json; all structural gates pass and source claims verified, but accessibility is unverified because render-review cannot run under the no-build/no-dev-server constraint.

## Outcome

- Impact: review_en for GSOS-301 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 9 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Wrote independent G3 English review of GSOS-301 Unit 5 (escalate) with full evidence  -  validated report at specs/content/gsos-301/reviews/unit-05/G3/crew-gsos-301-u05-g3-r9f2a1b0c.json; all structural gates pass and source claims verified, but accessibility is unverified because render-review cannot run under the no-build/no-dev-server constraint.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The blocking finding is the unverified visual accessibility (render review). A separate render inspection (build + serve + small-screen/print checks) must be run before this unit can be certified G3. The three no-external-source items (Lady Health Worker 1994 start, low-fee private schooling spread, Council of Islamic Ideology advisory role) and the unextracted OpenStax 15.1 wording are advisory only.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
