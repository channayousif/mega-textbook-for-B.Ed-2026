---
id: crew-efmp-406-u02-translate-r1
title: crew translate EFMP-406 unit 2
stage: misc
date: 2026-11-05
surface: agent
model: codex
feature: efmp-406
branch: crew/efmp-406-u02-translate-r1
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261131-efmp-406-unit-02-urdu-translation.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-02/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-02/unit-teacher-notes.mdx
 - specs/content/efmp-406/reviews/unit-02/G4/logs/check-content-draft.txt
 - specs/content/efmp-406/reviews/unit-02/G4/logs/check-content-origin-main.txt
 - specs/content/efmp-406/reviews/unit-02/G4/logs/check-content-temporary-reviewed.txt
 - specs/content/efmp-406/reviews/unit-02/G4/logs/figure-inspection.txt
 - specs/content/efmp-406/reviews/unit-02/G4/logs/parity-self-check.txt
 - specs/content/efmp-406/reviews/unit-02/G4/logs/translation-sha256.txt
 - specs/content/efmp-406/reviews/unit-02/G4/translation-handoff.md
 - static/img/figures/efmp-406/unit-02/fig-U2-1.ur.dark.svg
 - static/img/figures/efmp-406/unit-02/fig-U2-1.ur.svg
 - static/img/figures/efmp-406/unit-02/fig-U2-2.ur.dark.svg
 - static/img/figures/efmp-406/unit-02/fig-U2-2.ur.svg
 - static/img/figures/efmp-406/unit-02/fig-U2-3.ur.dark.svg
 - static/img/figures/efmp-406/unit-02/fig-U2-3.ur.svg
 - static/img/figures/efmp-406/unit-02/fig-U2-4.ur.dark.svg
 - static/img/figures/efmp-406/unit-02/fig-U2-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u02-translate-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u02-translate-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-406 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-02/`.

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
- (efmp-406-u02-repair_en, repair_en, claude) The source-excerpt bundle, author run provenance and the screen, print and SVG geometry checks are still open and need the coordinator and a host that can run a browser.
- (efmp-406-u02-repair_en, repair_en, claude) The questions and model answers changed in RRQ 2/3/9, MCQ 4/8 and Topic 2.2 check item 2, so the Urdu translation job should start from the repaired English, and a fresh independent G3 review must look at these new versions.
- (efmp-406-u02-translate, translate, codex) English author must repair RRQ 2/3/9 before translation resumes; draft status and G3/G5 remain unchanged.
- (efmp-406-u02-translate, translate, codex) English author must repair RRQ 2/3/9 before translation resumes; draft status and G3/G5 remain unchanged.
- (efmp-406-u02-review_en, review_en, codex) G3 remains open: repair RRQ 2/3/9 marking alignment and supply source, run-provenance and browser/print evidence.


## Response snapshot

Translated all five EFMP-406 Unit 2 pages and four Urdu light/dark figure pairs, with validation logs, terminology proposals and handoff records.

## Outcome

- Impact: translate for EFMP-406 Unit 2 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated all five EFMP-406 Unit 2 pages and four Urdu light/dark figure pairs, with validation logs, terminology proposals and handoff records.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Status remains draft; independent G3/G5 review and authorised browser, print and SVG geometry checks remain pending.
  - Status remains draft; independent G3/G5 review and authorised browser, print and SVG geometry checks remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
