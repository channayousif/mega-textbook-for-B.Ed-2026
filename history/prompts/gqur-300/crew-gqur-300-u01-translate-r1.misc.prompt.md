---
id: crew-gqur-300-u01-translate-r1
title: crew translate GQUR-300 unit 1
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: gqur-300
branch: crew/gqur-300-u01-translate-r1
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/006-content-pipeline/0020-verify-gqur300-unit-one-urdu-retry.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-01/unit-assessment.mdx
 - specs/content/gqur-300/reviews/unit-01/G4/handoff.md
 - specs/content/gqur-300/reviews/unit-01/G4/retry-content-gates.log
 - specs/content/gqur-300/reviews/unit-01/G4/retry-parity.json
 - specs/content/gqur-300/reviews/unit-01/G4/retry-reviewed.log
 - specs/content/gqur-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-300-u01-translate-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u01-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-300 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-300 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (gqur-300-u01-translate, translate, agy) Unit 1 Urdu mirror remains in draft at G4, with translation_status draft retained pending owner vocabulary rulings, English G3 resolution, and independent G5 review.
- (gqur-300-u01-translate, translate, agy) Translation handoff and validation artifacts reside under `specs/content/gqur-300/reviews/unit-01/G4/` to avoid invalidating the recorded English G2 input manifest.
- (gqur-300-u01-translate, translate, agy) All 13 content gates pass cleanly with zero findings on this branch.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Verified the complete Unit 1 Urdu mirror, repaired two comparative meanings, and committed validation evidence, tracker notes and prompt history.

## Outcome

- Impact: translate for GQUR-300 Unit 1 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 8 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the complete Unit 1 Urdu mirror, repaired two comparative meanings, and committed validation evidence, tracker notes and prompt history.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Owner vocabulary rulings, G3 resolution and fresh independent G5 with rendered inspection remain pending.
  - Owner vocabulary rulings, G3 resolution and fresh independent G5 with rendered inspection remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
