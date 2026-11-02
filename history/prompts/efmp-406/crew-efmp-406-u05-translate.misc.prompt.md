---
id: crew-efmp-406-u05-translate
title: crew translate EFMP-406 unit 5
stage: misc
date: 2026-11-02
surface: agent
model: codex
feature: efmp-406
branch: crew/efmp-406-u05-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261105-translate-efmp406-unit-five.general.prompt.md
 - history/prompts/general/20261106-repair-unit-five-translation-handoff.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-05/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-05/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-05/unit-teacher-notes.mdx
 - specs/content/efmp-406/reviews/unit-05/G4/translation-handoff.md
 - static/img/figures/efmp-406/unit-05/fig-U5-1.ur.dark.svg
 - static/img/figures/efmp-406/unit-05/fig-U5-1.ur.svg
 - static/img/figures/efmp-406/unit-05/fig-U5-2.ur.dark.svg
 - static/img/figures/efmp-406/unit-05/fig-U5-2.ur.svg
 - static/img/figures/efmp-406/unit-05/fig-U5-3.ur.dark.svg
 - static/img/figures/efmp-406/unit-05/fig-U5-3.ur.svg
 - static/img/figures/efmp-406/unit-05/fig-U5-4.ur.dark.svg
 - static/img/figures/efmp-406/unit-05/fig-U5-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u05-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u05-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-406 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-05/`.

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
- (efmp-406-u05-review_en, review_en, agy) All 7 G3 criteria pass, 25 assessment items independently solved, and all 8 SVG variants pass geometry; report validated with advisory pass disposition.
- (efmp-406-u05-review_en, review_en, agy) The G3 tracker row in specs/content/efmp-406/tasks.md is updated to open ▢ per ADR-0019; certification remains blocked pending trusted qualification.
- (efmp-406-u05-review_en, review_en, agy) Unit 5 is ready for Urdu translation (G4 ur-translation) and subsequent independent Urdu review (G5 ur-review).
- (efmp-406-u05-author-conflict5, fix, opencode) Unit 5's four figures still have no Urdu `.ur.svg` versions and their concept-graph Urdu labels need G5 review (they use جائزہ for "evaluation" while the terminology bank reserves it inside "Summative Assessment").
- (efmp-406-u05-author-conflict5, fix, opencode) `course-overview.mdx` still says only Unit 1 is available; it was outside this job's scope.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- EFMP-406 Unit 5 (docs/semester-3/efmp-406/unit-05): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Preserved the complete Unit 5 Urdu mirror and relocated its handoff to restore the English G2 evidence binding.

## Outcome

- Impact: translate for EFMP-406 Unit 5 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Preserved the complete Unit 5 Urdu mirror and relocated its handoff to restore the English G2 evidence binding.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu rendering, SVG geometry inspection and independent G5 review remain pending.
  - Urdu rendering, SVG geometry inspection and independent G5 review remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
