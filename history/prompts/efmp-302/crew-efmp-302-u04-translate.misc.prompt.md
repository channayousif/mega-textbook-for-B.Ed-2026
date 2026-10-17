---
id: crew-efmp-302-u04-translate
title: crew translate EFMP-302 unit 4
stage: misc
date: 2026-10-17
surface: agent
model: claude
feature: efmp-302
branch: crew/efmp-302-u04-translate
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-302/0171-efmp302-u4-g4-mirror-reverify.misc.prompt.md
 - specs/content/efmp-302/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-302-u04-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u04-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-302 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-302 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-302/`, and `static/img/figures/efmp-302/unit-04/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.


## Response snapshot

Checked that the existing EFMP-302 Unit 4 Urdu mirror still matches the English (no retranslation needed, all 13 content gates pass), added a re-verification note to the G4 tracker row with status unchanged, and wrote PHR 0171.

## Outcome

- Impact: translate for EFMP-302 Unit 4 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Checked that the existing EFMP-302 Unit 4 Urdu mirror still matches the English (no retranslation needed, all 13 content gates pass), added a re-verification note to the G4 tracker row with status unchanged, and wrote PHR 0171.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
