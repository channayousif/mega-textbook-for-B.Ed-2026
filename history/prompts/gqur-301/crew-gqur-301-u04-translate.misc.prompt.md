---
id: crew-gqur-301-u04-translate
title: crew translate GQUR-301 unit 4
stage: misc
date: 2026-10-21
surface: agent
model: codex
feature: gqur-301
branch: crew/gqur-301-u04-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gqur-301/crew-gqur-301-u04-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-04/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-04/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-04/unit-teacher-notes.mdx
 - specs/content/gqur-301/reviews/unit-04/translation-validation/draft-content-gates.txt
 - specs/content/gqur-301/reviews/unit-04/translation-validation/handoff.md
 - specs/content/gqur-301/reviews/unit-04/translation-validation/origin-main-content-gates.txt
 - specs/content/gqur-301/reviews/unit-04/translation-validation/structural-parity.txt
 - specs/content/gqur-301/reviews/unit-04/translation-validation/temporary-reviewed-content-gates.txt
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-04/fig-U4-1.ur.dark.svg
 - static/img/figures/gqur-301/unit-04/fig-U4-1.ur.svg
 - static/img/figures/gqur-301/unit-04/fig-U4-2.ur.dark.svg
 - static/img/figures/gqur-301/unit-04/fig-U4-2.ur.svg
 - static/img/figures/gqur-301/unit-04/fig-U4-3.ur.dark.svg
 - static/img/figures/gqur-301/unit-04/fig-U4-3.ur.svg
 - static/img/figures/gqur-301/unit-04/fig-U4-4.ur.dark.svg
 - static/img/figures/gqur-301/unit-04/fig-U4-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u04-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u04-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-301 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-04/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (gqur-301-u04-review_en, review_en, agy) Advisory findings F1 and F2 note minor cosmetic background card rect overlap with the wordmark on fig-U4-3 (2.5px) and fig-U4-4 (4.5px).
- (gqur-301-u04-review_en, review_en, agy) Unit 4 G3 review passed all 7 criteria; the unit is ready for G4 Urdu translation.


## Response snapshot

Translated all five GQUR-301 Unit 4 pages into Urdu, localized four figures with dark variants, and committed validation logs, tracker notes and PHR.

## Outcome

- Impact: translate for GQUR-301 Unit 4 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated all five GQUR-301 Unit 4 pages into Urdu, localized four figures with dark variants, and committed validation logs, tracker notes and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The sole baseline gate failure is missing generated static/content-status.json.
  - Translation remains draft; independent G5 and rendered Urdu inspection are pending.
  - The sole baseline gate failure is missing generated static/content-status.json.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
