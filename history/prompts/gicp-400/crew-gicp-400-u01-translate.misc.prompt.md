---
id: crew-gicp-400-u01-translate
title: crew translate GICP-400 unit 1
stage: misc
date: 2026-11-06
surface: agent
model: codex
feature: gicp-400
branch: crew/gicp-400-u01-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261137-gicp-400-unit-01-urdu-mirror.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-01/unit-assessment.mdx
 - specs/content/gicp-400/reviews/unit-01/G4/translation-handoff.md
 - specs/content/gicp-400/tasks.md
 - static/img/figures/gicp-400/unit-01/fig-U1-1.ur.dark.svg
 - static/img/figures/gicp-400/unit-01/fig-U1-1.ur.svg
 - static/img/figures/gicp-400/unit-01/fig-U1-2.ur.dark.svg
 - static/img/figures/gicp-400/unit-01/fig-U1-2.ur.svg
 - static/img/figures/gicp-400/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/gicp-400/unit-01/fig-U1-3.ur.svg
 - static/img/figures/gicp-400/unit-01/fig-U1-4.ur.dark.svg
 - static/img/figures/gicp-400/unit-01/fig-U1-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u01-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u01-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GICP-400 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-01/`.

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
- (gicp-400-u01-review_en, review_en, opencode) G3 is escalated, not failed: sources and accessibility are unverified because the Hassan full text is not bound and the brief prohibits the build/browser render needed for the accessibility and SVG-geometry checks.
- (gicp-400-u01-review_en, review_en, opencode) The unit's main claims are supported; four secondary Hassan attributions (Jinnah's unity work, Congress rule 1937-1939, the "could not be united peacefully" narrative, East Pakistan 1971) are not established by the bound notes.
- (gicp-400-u01-review_en, review_en, opencode) G4 Urdu translation and the prompt-only banner remain open; a fresh reviewer must recheck after the parent supplies provenance and the missing evidence.
- (gicp-400-u01-author, author, codex) G3/G5, Urdu translation and banner production remain open.
- (gicp-400-u01-author, author, codex) SVG browser geometry inspection remains pending because the brief prohibits browser runs.


## Response snapshot

Completed GICP-400 Unit 1’s Urdu mirror, full assessment, four localised SVGs with dark variants, tracker handoff and PHR.

## Outcome

- Impact: translate for GICP-400 Unit 1 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed GICP-400 Unit 1’s Urdu mirror, full assessment, four localised SVGs with dark variants, tracker handoff and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Translation remains draft; English G3 resolution, independent G5 and browser/print inspection remain pending.
  - Translation remains draft; English G3 resolution, independent G5 and browser/print inspection remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
