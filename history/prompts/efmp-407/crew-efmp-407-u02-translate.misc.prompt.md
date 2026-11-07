---
id: crew-efmp-407-u02-translate
title: crew translate EFMP-407 unit 2
stage: misc
date: 2026-11-07
surface: agent
model: codex
feature: efmp-407
branch: crew/efmp-407-u02-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/2461-efmp407-unit2-urdu-mirror.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-02/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-02/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-02/unit-teacher-notes.mdx
 - specs/content/efmp-407/reviews/unit-02/G4/translation-handoff.md
 - static/img/figures/efmp-407/unit-02/fig-U2-1.ur.dark.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-1.ur.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-2.ur.dark.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-2.ur.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-3.ur.dark.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-3.ur.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-4.ur.dark.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-4.ur.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-5.ur.dark.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-5.ur.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-6.ur.dark.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u02-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u02-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-407 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-02/`.

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
- (efmp-407-u02-review_en, review_en, agy) G3 remains open under an advisory escalate disposition because live browser and print inspection are barred by brief constraints.
- (efmp-407-u02-review_en, review_en, agy) Live browser rendering (360px viewport, keyboard table scrolling, A4 print view) should be verified on an authorized host.
- (efmp-407-u02-review_en, review_en, agy) In tasks.md lines 24-28 under backward-design alignment, 5 duplicated Unit 1 tracker rows from author copy-paste can be cleaned up during maintenance.
- (efmp-407-u02-author, author, claude) Figure text geometry for `fig-U2-1` to `fig-U2-6` has never been browser-measured, so check the CI `figure-geometry` result first.
- (efmp-407-u02-author, author, claude) `tasks.md` is shared with the Unit 3 and Unit 4 jobs and will conflict again when they merge; keep every unit's rows, and rerun `npm run build:content-status` after the tracker changes because `static/content-status.json` is gitignored.


## Response snapshot

Translated all six EFMP-407 Unit 2 pages and six schematics into Urdu, added dark variants, and recorded terminology proposals and the PHR.

## Outcome

- Impact: translate for EFMP-407 Unit 2 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated all six EFMP-407 Unit 2 pages and six schematics into Urdu, added dark variants, and recorded terminology proposals and the PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Browser geometry, narrow-screen/A4 inspection and independent review remain pending; translation stays draft.
  - Browser geometry, narrow-screen/A4 inspection and independent review remain pending; translation stays draft.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
