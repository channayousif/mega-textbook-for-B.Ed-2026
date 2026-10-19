---
id: crew-efmp-304-u01-translate-r1
title: crew translate EFMP-304 unit 1
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: efmp-304
branch: crew/efmp-304-u01-translate-r1
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-304/20261018-continue-unit-one-translation.misc.prompt.md
 - history/prompts/efmp-304/crew-efmp-304-u01-translate-r1.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/topic-05.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-01/unit-assessment.mdx
 - specs/content/efmp-304/reviews/unit-01/G4/translation-handoff.md
 - specs/content/efmp-304/tasks.md
 - static/img/figures/efmp-304/unit-01/fig-U1-1.ur.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-1.ur.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-10.ur.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-10.ur.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-2.ur.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-2.ur.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-3.ur.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-4.ur.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-4.ur.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-5.ur.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-5.ur.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-6.ur.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-6.ur.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-7.ur.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-7.ur.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-8.ur.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-8.ur.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-9.ur.dark.svg
 - static/img/figures/efmp-304/unit-01/fig-U1-9.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u01-translate-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u01-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-304 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-304 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Feedback from the previous attempt
npm run check:content has 3 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- EFMP-304 Unit 1 (docs/semester-2/efmp-304/unit-01): G2 en-draft: stale or incomplete input manifest
✗ static/content-status.json is missing. Run: npm run build:content-status


## Response snapshot

Completed the Urdu mirror continuation, standardized numerals, repaired G2 evidence freshness, and updated the tracker, handoff and PHR.

## Outcome

- Impact: translate for EFMP-304 Unit 1 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 31 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed the Urdu mirror continuation, standardized numerals, repaired G2 evidence freshness, and updated the tracker, handoff and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Translation remains draft; independent G3/G5 and narrow-width/A4 rendered inspection remain pending.
  - Translation remains draft; independent G3/G5 and narrow-width/A4 rendered inspection remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
