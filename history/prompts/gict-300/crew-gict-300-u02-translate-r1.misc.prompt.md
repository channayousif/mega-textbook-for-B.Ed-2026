---
id: crew-gict-300-u02-translate-r1
title: crew translate GICT-300 unit 2
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: gict-300
branch: crew/gict-300-u02-translate-r1
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/gict-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/020-author-gict-300/0004-reconcile-unit-two-urdu.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-02/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-02/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-02/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-02/unit-teacher-notes.mdx
 - specs/content/gict-300/reviews/unit-02/G4/content-gates.log
 - specs/content/gict-300/reviews/unit-02/G4/main-content-gates.log
 - specs/content/gict-300/reviews/unit-02/G4/translation-handoff.md
 - specs/content/gict-300/tasks.md
 - static/img/figures/gict-300/unit-02/fig-U2-1.ur.dark.svg
 - static/img/figures/gict-300/unit-02/fig-U2-1.ur.svg
 - static/img/figures/gict-300/unit-02/fig-U2-2.ur.dark.svg
 - static/img/figures/gict-300/unit-02/fig-U2-2.ur.svg
 - static/img/figures/gict-300/unit-02/fig-U2-3.ur.dark.svg
 - static/img/figures/gict-300/unit-02/fig-U2-3.ur.svg
 - static/img/figures/gict-300/unit-02/fig-U2-4.ur.dark.svg
 - static/img/figures/gict-300/unit-02/fig-U2-4.ur.svg
 - static/img/figures/gict-300/unit-02/fig-U2-5.ur.dark.svg
 - static/img/figures/gict-300/unit-02/fig-U2-5.ur.svg
 - static/img/figures/gict-300/unit-02/fig-U2-6.ur.dark.svg
 - static/img/figures/gict-300/unit-02/fig-U2-6.ur.svg
 - static/img/figures/gict-300/unit-02/fig-U2-7.ur.dark.svg
 - static/img/figures/gict-300/unit-02/fig-U2-7.ur.svg
 - static/img/figures/gict-300/unit-02/fig-U2-8.ur.dark.svg
 - static/img/figures/gict-300/unit-02/fig-U2-8.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gict-300-u02-translate-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gict-300-u02-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GICT-300 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICT-300 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gict-300/`, and `static/img/figures/gict-300/unit-02/`.

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
- (gict-300-u02-translate, translate, agy) All 14 key_terms in index.mdx remain unbanked in [terminology.csv](file:///home/a2ahs/crew-wt/gict-300-u02-translate/specs/content/terminology.csv) and are proposed for curriculum owner intake.
- (gict-300-u02-translate, translate, agy) The G4 tracker row in [tasks.md](file:///home/a2ahs/crew-wt/gict-300-u02-translate/specs/content/gict-300/tasks.md) remains in-progress (`▣`) with `translation_status: draft` pending independent G5 review.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Reconciled Unit 2’s seven-file Urdu mirror, repaired figure labels and terminology declarations, and committed validation logs, tracker updates and handoff.

## Outcome

- Impact: translate for GICT-300 Unit 2 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 28 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Reconciled Unit 2’s seven-file Urdu mirror, repaired figure labels and terminology declarations, and committed validation logs, tracker updates and handoff.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Fresh independent G5 and rendered inspection remain pending.
  - Owner must repair the shared RAM glossary’s saved/unsaved error and resolve proposed terminology.
  - Fresh independent G5 and rendered inspection remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
