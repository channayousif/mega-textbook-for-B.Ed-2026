---
id: crew-gsos-301-u03-translate-r1
title: crew translate GSOS-301 unit 3
stage: misc
date: 2026-10-24
surface: agent
model: claude
feature: gsos-301
branch: crew/gsos-301-u03-translate-r1
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gsos-301/20261025-gsos301-u03-translate-r1.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/unit-teacher-notes.mdx
 - specs/content/gsos-301/reviews/unit-03/G4/translation-handoff.md
 - specs/content/gsos-301/tasks.md
 - static/content-status.json
 - static/img/figures/gsos-301/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-1.ur.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-2.ur.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-3.ur.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u03-translate-r1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u03-translate-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GSOS-301 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-03/`.

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
- (gsos-301-u03-figures, figures, codex) Urdu Unit 3 pages are absent; the translation job must wire the prepared Urdu SVGs.
- (gsos-301-u03-figures, figures, codex) Urdu Unit 3 pages are absent; the translation job must wire the prepared Urdu SVGs.
- (gsos-301-u03-translate, translate, codex) A separate English author must resolve the existing G3 findings before G4 resumes.
- (gsos-301-u03-translate, translate, codex) A separate English author must resolve the existing G3 findings before G4 resumes.
- (gsos-301-u03-review_en, review_en, codex) Repair role terminology, missing figures, assessments and source mappings; fresh review needs author provenance and browser/print evidence.


## Response snapshot

Translated all five GSOS-301 Unit 3 files into a draft Urdu mirror with structural parity, wired and desc-synced the four .ur.svg figures, added bank-conformant key_terms, and updated the G4 tracker note and handoff while keeping translation_status draft.

## Outcome

- Impact: translate for GSOS-301 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated all five GSOS-301 Unit 3 files into a draft Urdu mirror with structural parity, wired and desc-synced the four .ur.svg figures, added bank-conformant key_terms, and updated the G4 tracker note and handoff while keeping translation_status draft.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English MCQ 3 + key, topic 3.1 village example and teacher notes conflate role conflict with role strain; RRQ 3 guidance and RRQ 1-2 Bloom levels also need English repair, after which only those Urdu passages need re-translation.
  - Concept graph labels CON:GSOS-301-3-13 as مواصلات while the Urdu prose uses the banked ابلاغ; the owner should align them. Proposed Urdu terms are listed in reviews/unit-03/G4/translation-handoff.md.
  - Rendered Urdu (desktop, 360px, A4) has not been inspected; run render-inspect --locale ur on a permitted host before G5.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
