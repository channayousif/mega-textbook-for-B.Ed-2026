---
id: crew-efmp-304-u03-translate
title: crew translate EFMP-304 unit 3
stage: misc
date: 2026-10-18
surface: agent
model: agy
feature: efmp-304
branch: crew/efmp-304-u03-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-304/crew-efmp-304-u03-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-03/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-03/unit-assessment.mdx
 - specs/content/efmp-304/reviews/unit-03/G4-20261018/handoff.md
 - specs/content/efmp-304/tasks.md
 - static/img/figures/efmp-304/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/efmp-304/unit-03/fig-U3-1.ur.svg
 - static/img/figures/efmp-304/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/efmp-304/unit-03/fig-U3-2.ur.svg
 - static/img/figures/efmp-304/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/efmp-304/unit-03/fig-U3-3.ur.svg
 - static/img/figures/efmp-304/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/efmp-304/unit-03/fig-U3-4.ur.svg
 - static/img/figures/efmp-304/unit-03/fig-U3-5.ur.dark.svg
 - static/img/figures/efmp-304/unit-03/fig-U3-5.ur.svg
 - static/img/figures/efmp-304/unit-03/fig-U3-6.ur.dark.svg
 - static/img/figures/efmp-304/unit-03/fig-U3-6.ur.svg
 - static/img/figures/efmp-304/unit-03/fig-U3-7.ur.dark.svg
 - static/img/figures/efmp-304/unit-03/fig-U3-7.ur.svg
 - static/img/figures/efmp-304/unit-03/fig-U3-8.ur.dark.svg
 - static/img/figures/efmp-304/unit-03/fig-U3-8.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u03-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u03-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-304 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-304 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-03/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.


## Response snapshot

Completed the translation work on EFMP-304 Unit 3 by moving the translation handoff to `specs/content/efmp-304/reviews/unit-03/G4-20261018/handoff.md` to avoid invalidating the unit 3 G2 gate manifest, updating tasks.md tracker row, verifying all 13 content gates pass cleanly, and creating this Prompt History Record.

## Outcome

- Impact: translate for EFMP-304 Unit 3 continued and completed by agy.
- Tests: npm run check:content 13/13 passed.
- Files: 25 file(s) across the branch, listed above.
- Next prompts: fresh independent G5 review for EFMP-304 Unit 3.
- Reflection: None.

## Handoff (for CEO and agents)

- Shipped / changed: Relocated G4 handoff to `reviews/unit-03/G4-20261018/handoff.md` to prevent stale input manifest in G2 gate checks, updated `tasks.md`, verified Urdu mirror parity, figure variants, and terminology conformance. All 13 content gates pass.
- Decisions the team must respect: G4 remains draft pending independent G5 review.
- Pending / next owner: independent G5 reviewer.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: handoff file placed under `translations/unit-03` invalidated G2 input manifest; resolved by placing under `reviews/unit-03/`.
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
