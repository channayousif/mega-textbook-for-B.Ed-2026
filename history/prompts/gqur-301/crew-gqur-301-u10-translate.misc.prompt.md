---
id: crew-gqur-301-u10-translate
title: crew translate GQUR-301 unit 10
stage: misc
date: 2026-10-21
surface: agent
model: codex
feature: gqur-301
branch: crew/gqur-301-u10-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gqur-301/20261021-translate-unit-ten-urdu.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-10/_category_.json
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-10/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-10/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-10/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-10/unit-assessment.mdx
 - specs/content/gqur-301/reviews/unit-10/translation-validation/check-content-before-manifest-restore.txt
 - specs/content/gqur-301/reviews/unit-10/translation-validation/check-content-final.txt
 - specs/content/gqur-301/reviews/unit-10/translation-validation/check-content-generated-status.txt
 - specs/content/gqur-301/reviews/unit-10/translation-validation/check-content-main.txt
 - specs/content/gqur-301/reviews/unit-10/translation-validation/check-content-parity-final.txt
 - specs/content/gqur-301/reviews/unit-10/translation-validation/check-content-parity.txt
 - specs/content/gqur-301/reviews/unit-10/translation-validation/figure-variants-check.txt
 - specs/content/gqur-301/reviews/unit-10/translation-validation/handoff.md
 - specs/content/gqur-301/reviews/unit-10/translation-validation/input-snapshot.json
 - specs/content/gqur-301/reviews/unit-10/translation-validation/structural-check.txt
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-10/fig-U10-1.ur.dark.svg
 - static/img/figures/gqur-301/unit-10/fig-U10-1.ur.svg
 - static/img/figures/gqur-301/unit-10/fig-U10-2.ur.dark.svg
 - static/img/figures/gqur-301/unit-10/fig-U10-2.ur.svg
 - static/img/figures/gqur-301/unit-10/fig-U10-3.ur.dark.svg
 - static/img/figures/gqur-301/unit-10/fig-U10-3.ur.svg
 - static/img/figures/gqur-301/unit-10/fig-U10-4.ur.dark.svg
 - static/img/figures/gqur-301/unit-10/fig-U10-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u10-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u10-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-301 Unit 10 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 10 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-10/`.

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
- (gqur-301-u10-review_en, review_en, opencode) Owner must provision a non-production host to run render-review and close the accessibility criterion before a pass is possible. G3 independence (ADR-0019) remains in effect  -  no G3 sign-off, no tracker row, no registry entry from this advisory report.
- (gqur-301-u10-author, author, codex) Independent G3 review, Urdu translation and localized figures, and G5 review remain open.
- (gqur-301-u10-author, author, codex) Independent G3 review, Urdu translation and localized figures, and G5 review remain open.

## Feedback from the previous attempt
worker exited 1:
You've hit your weekly limit · resets 11pm (Etc/GMT-5)



## Response snapshot

Completed Unit 10’s Urdu mirror, assessment, four localized figure pairs, tracker note, validation records and PHR.

## Outcome

- Impact: translate for GQUR-301 Unit 10 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed Unit 10’s Urdu mirror, assessment, four localized figure pairs, tracker note, validation records and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Translation remains draft; independent G3/G5 review, terminology approval and browser/A4 Urdu inspection remain pending.
  - Translation remains draft; independent G3/G5 review, terminology approval and browser/A4 Urdu inspection remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
