---
id: crew-efmp-304-u04-translate
title: crew translate EFMP-304 unit 4
stage: misc
date: 2026-10-17
surface: agent
model: codex
feature: efmp-304
branch: crew/efmp-304-u04-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/006-content-pipeline/0011-complete-efmp304-unit4-urdu.green.prompt.md
 - history/prompts/006-content-pipeline/0012-refresh-efmp304-unit4-gate-evidence.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/unit-assessment.mdx
 - specs/content/efmp-304/reviews/unit-04/G2/20261017T164737346Z-gates.json
 - specs/content/efmp-304/reviews/unit-04/G2/logs-20261017T164737346Z/check-bloom-bands.txt
 - specs/content/efmp-304/reviews/unit-04/G2/logs-20261017T164737346Z/check-concept-graph.txt
 - specs/content/efmp-304/reviews/unit-04/G2/logs-20261017T164737346Z/check-depth-gate.txt
 - specs/content/efmp-304/reviews/unit-04/G2/logs-20261017T164737346Z/check-docs-sync.txt
 - specs/content/efmp-304/reviews/unit-04/G2/logs-20261017T164737346Z/check-figures.txt
 - specs/content/efmp-304/reviews/unit-04/G2/logs-20261017T164737346Z/check-no-answer-keys.txt
 - specs/content/efmp-304/reviews/unit-04/G2/logs-20261017T164737346Z/check-no-em-dash.txt
 - specs/content/efmp-304/reviews/unit-04/G2/logs-20261017T164737346Z/validate-content.txt
 - specs/content/efmp-304/tasks.md
 - specs/content/efmp-304/translations/unit-04/draft-content.log
 - specs/content/efmp-304/translations/unit-04/handoff.md
 - specs/content/efmp-304/translations/unit-04/origin-main-content.log
 - specs/content/efmp-304/translations/unit-04/temporary-reviewed-content.log
 - static/img/figures/efmp-304/unit-04/fig-U4-1.ur.dark.svg
 - static/img/figures/efmp-304/unit-04/fig-U4-1.ur.svg
 - static/img/figures/efmp-304/unit-04/fig-U4-2.ur.dark.svg
 - static/img/figures/efmp-304/unit-04/fig-U4-2.ur.svg
 - static/img/figures/efmp-304/unit-04/fig-U4-3.ur.dark.svg
 - static/img/figures/efmp-304/unit-04/fig-U4-3.ur.svg
 - static/img/figures/efmp-304/unit-04/fig-U4-4.ur.dark.svg
 - static/img/figures/efmp-304/unit-04/fig-U4-4.ur.svg
 - static/img/figures/efmp-304/unit-04/fig-U4-5.ur.dark.svg
 - static/img/figures/efmp-304/unit-04/fig-U4-5.ur.svg
 - static/img/figures/efmp-304/unit-04/fig-U4-6.ur.dark.svg
 - static/img/figures/efmp-304/unit-04/fig-U4-6.ur.svg
 - static/img/figures/efmp-304/unit-04/fig-U4-7.ur.dark.svg
 - static/img/figures/efmp-304/unit-04/fig-U4-7.ur.svg
 - static/img/figures/efmp-304/unit-04/fig-U4-8.ur.dark.svg
 - static/img/figures/efmp-304/unit-04/fig-U4-8.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u04-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u04-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-304 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-304 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-04/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- EFMP-304 Unit 4 (docs/semester-2/efmp-304/unit-04): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Preserved the completed EFMP-304 Unit 4 Urdu mirror and repaired its stale G2 evidence and tracker reference.

## Outcome

- Impact: translate for EFMP-304 Unit 4 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 38 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Preserved the completed EFMP-304 Unit 4 Urdu mirror and repaired its stale G2 evidence and tracker reference.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
