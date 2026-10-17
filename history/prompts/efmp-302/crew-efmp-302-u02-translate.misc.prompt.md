---
id: crew-efmp-302-u02-translate
title: crew translate EFMP-302 unit 2
stage: misc
date: 2026-10-17
surface: agent
model: codex
feature: efmp-302
branch: crew/efmp-302-u02-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-302/0131-unit-two-urdu-translation-continuation.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-02/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-02/topic-04.mdx
 - specs/content/efmp-302/reviews/unit-02/G4-20261017/baseline-content.log
 - specs/content/efmp-302/reviews/unit-02/G4-20261017/figure-geometry.log
 - specs/content/efmp-302/reviews/unit-02/G4-20261017/figure-variants.log
 - specs/content/efmp-302/reviews/unit-02/G4-20261017/final-content.log
 - specs/content/efmp-302/reviews/unit-02/G4-20261017/handoff.md
 - specs/content/efmp-302/reviews/unit-02/G4-20261017/mirror-check.log
 - specs/content/efmp-302/reviews/unit-02/G4-20261017/reviewed-probe.log
 - specs/content/efmp-302/reviews/unit-02/G4-20261017/translator-inputs.json
 - specs/content/efmp-302/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-302-u02-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u02-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-302 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-302 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-302/`, and `static/img/figures/efmp-302/unit-02/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.


## Response snapshot

Verified and repaired EFMP-302 Unit 2’s complete Urdu mirror and committed its G4 tracker update and handoff records.

## Outcome

- Impact: translate for EFMP-302 Unit 2 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified and repaired EFMP-302 Unit 2’s complete Urdu mirror and committed its G4 tracker update and handoff records.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
