---
id: crew-gsos-301-u02-translate
title: crew translate GSOS-301 unit 2
stage: misc
date: 2026-10-19
surface: agent
model: agy
feature: gsos-301
branch: crew/gsos-301-u02-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0343-gsos301-u02-g4-translate.general.prompt.md
 - history/prompts/gsos-301/crew-gsos-301-u02-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-02/unit-teacher-notes.mdx
 - specs/content/gsos-301/tasks.md
 - static/img/figures/gsos-301/unit-02/fig-U2-1.ur.dark.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-1.ur.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-2.ur.dark.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-2.ur.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-3.ur.dark.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-3.ur.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-4.ur.dark.svg
 - static/img/figures/gsos-301/unit-02/fig-U2-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u02-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u02-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GSOS-301 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-02/`.

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
- (gsos-301-u02-review_en, review_en, agy) Reconcile topic-01 and topic-02 citations (Givens & White, Henson, Lindsey) against approved sources (Conerly et al. 2021, Lindsey & Beach 2001).
- (gsos-301-u02-review_en, review_en, agy) Reconcile Mead socialization stages and ages across topic-02, fig-U2-4, and assessment items against OpenStax 5.1.
- (gsos-301-u02-review_en, review_en, agy) Recalculate Bloom cognitive demand on MCQ-07, MCQ-08, RRQ-06, and refine ERQ-02/03/04 rubrics and coverage mappings.


## Response snapshot

Translated GSOS-301 Unit 2 into its complete 5-file Urdu mirror with localized SVG figure variants, exact heading parity, and terminology conformance passing all 13 content gates.

## Outcome

- Impact: translate for GSOS-301 Unit 2 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GSOS-301 Unit 2 into its complete 5-file Urdu mirror with localized SVG figure variants, exact heading parity, and terminology conformance passing all 13 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - translation_status remains draft pending independent G5 review; G4 tracker row recorded with auto:gates.
  - If English source citations or Mead stage age boundaries are later adjusted per G3 review notes, fig-U2-4.ur.svg and topic-02.mdx should be aligned accordingly.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
