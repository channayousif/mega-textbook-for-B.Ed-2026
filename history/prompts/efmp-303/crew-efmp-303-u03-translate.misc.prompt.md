---
id: crew-efmp-303-u03-translate
title: crew translate EFMP-303 unit 3
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: efmp-303
branch: crew/efmp-303-u03-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-303/crew-efmp-303-u03-refresh-g2.misc.prompt.md
 - history/prompts/efmp-303/crew-efmp-303-u03-translate-continuation.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/unit-teacher-notes.mdx
 - specs/content/efmp-303/reviews/unit-03/G2/20261019T020228252Z-gates.json
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261019T020228252Z/check-bloom-bands.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261019T020228252Z/check-concept-graph.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261019T020228252Z/check-depth-gate.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261019T020228252Z/check-docs-sync.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261019T020228252Z/check-figures.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261019T020228252Z/check-no-answer-keys.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261019T020228252Z/check-no-em-dash.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261019T020228252Z/validate-content.txt
 - specs/content/efmp-303/reviews/unit-03/G4/crew-g2-refresh/check-content.log
 - specs/content/efmp-303/reviews/unit-03/G4/crew-g2-refresh/origin-main-check-content.log
 - specs/content/efmp-303/tasks.md
 - specs/content/efmp-303/translations/unit-03/check-content.log
 - specs/content/efmp-303/translations/unit-03/conditional-parity.log
 - specs/content/efmp-303/translations/unit-03/figure-font-geometry.json
 - specs/content/efmp-303/translations/unit-03/figures-nastaliq.png
 - specs/content/efmp-303/translations/unit-03/handoff.md
 - specs/content/efmp-303/translations/unit-03/main-check-content.log
 - specs/content/efmp-303/translations/unit-03/structural-parity.log
 - static/img/figures/efmp-303/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-1.ur.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-2.ur.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-3.ur.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-4.ur.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-5.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-5.ur.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-6.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u03-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u03-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-303 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-03/`.

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
- (efmp-303-u03-review_en, review_en, codex) G3 remains open; recorded content repairs and fresh independent assessment/render checks are pending.
- (efmp-303-u03-review_en, review_en, codex) G3 remains open; recorded content repairs and fresh independent assessment/render checks are pending.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- EFMP-303 Unit 3 (docs/semester-2/efmp-303/unit-03): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Completed the existing EFMP-303 Unit 3 Urdu draft handoff by refreshing G2 evidence, updating its tracker reference, and committing validation records.

## Outcome

- Impact: translate for EFMP-303 Unit 3 by codex (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 39 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed the existing EFMP-303 Unit 3 Urdu draft handoff by refreshing G2 evidence, updating its tracker reference, and committing validation records.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English G3 repairs and Urdu page/print inspection remain pending; translation status stays draft.
  - English G3 repairs and Urdu page/print inspection remain pending; translation status stays draft.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
