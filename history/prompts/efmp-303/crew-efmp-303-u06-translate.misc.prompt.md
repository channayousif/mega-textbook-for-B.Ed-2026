---
id: crew-efmp-303-u06-translate
title: crew translate EFMP-303 unit 6
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: efmp-303
branch: crew/efmp-303-u06-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-303/0343-efmp-303-u06-g4-translate.misc.prompt.md
 - history/prompts/efmp-303/0344-complete-unit-six-urdu-continuation.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/unit-teacher-notes.mdx
 - specs/content/efmp-303/reviews/unit-06/G4/translation-handoff.md
 - specs/content/efmp-303/tasks.md
 - static/img/figures/efmp-303/unit-06/fig-U6-1.ur.dark.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-1.ur.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-2.ur.dark.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-2.ur.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-3.ur.dark.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-3.ur.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-4.ur.dark.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-4.ur.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-5.ur.dark.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-5.ur.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-6.ur.dark.svg
 - static/img/figures/efmp-303/unit-06/fig-U6-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u06-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u06-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-303 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-06/`.

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
npm run check:content has 1 finding(s) that main does not have:
✗ static/content-status.json is missing. Run: npm run build:content-status


## Response snapshot

Completed six Urdu figure pairs, repaired translation errors, regenerated content status, and updated the G4 tracker, handoff and PHR.

## Outcome

- Impact: translate for EFMP-303 Unit 6 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed six Urdu figure pairs, repaired translation errors, regenerated content status, and updated the G4 tracker, handoff and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Translation remains draft pending independent G5 and rendered Urdu inspection; builds and servers were prohibited.
  - Translation remains draft pending independent G5 and rendered Urdu inspection; builds and servers were prohibited.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
