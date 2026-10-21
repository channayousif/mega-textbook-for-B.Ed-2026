---
id: crew-gqur-301-u03-translate
title: crew translate GQUR-301 unit 3
stage: misc
date: 2026-10-21
surface: agent
model: codex
feature: gqur-301
branch: crew/gqur-301-u03-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/008-rich-unit-pedagogy/018-translate-gqur301-unit3-urdu.green.prompt.md
 - history/prompts/008-rich-unit-pedagogy/019-resume-gqur301-unit3-translation.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-03/_category_.json
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-03/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-03/unit-teacher-notes.mdx
 - specs/content/gqur-301/reviews/unit-03/G2/20261021T071753539Z-gates.json
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261021T071753539Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261021T071753539Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261021T071753539Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261021T071753539Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261021T071753539Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261021T071753539Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261021T071753539Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261021T071753539Z/final-check-content.txt
 - specs/content/gqur-301/reviews/unit-03/G2/logs-20261021T071753539Z/validate-content.txt
 - specs/content/gqur-301/tasks.md
 - specs/content/gqur-301/translations/unit-03/check-content-final.txt
 - specs/content/gqur-301/translations/unit-03/check-content-main.txt
 - specs/content/gqur-301/translations/unit-03/check-content-parity.txt
 - specs/content/gqur-301/translations/unit-03/check-content-resume-initial.txt
 - specs/content/gqur-301/translations/unit-03/check-content-resume-parity.txt
 - specs/content/gqur-301/translations/unit-03/handoff.md
 - specs/content/gqur-301/translations/unit-03/structural-check.txt
 - static/img/figures/gqur-301/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/gqur-301/unit-03/fig-U3-1.ur.svg
 - static/img/figures/gqur-301/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/gqur-301/unit-03/fig-U3-2.ur.svg
 - static/img/figures/gqur-301/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/gqur-301/unit-03/fig-U3-3.ur.svg
 - static/img/figures/gqur-301/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/gqur-301/unit-03/fig-U3-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u03-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u03-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-301 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-03/`.

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
- (gqur-301-u03-review_en-r1, review_en, agy) G3 review is advisory and unsigned (status ▢, no initials) under ADR-0019; disposition is pass with advisory finding F1 (headless render limitation).
- (gqur-301-u03-review_en-r1, review_en, agy) All four figure SVGs pass measure-figure-text cleanly with no viewBox overflow (two cosmetic wordmark collisions reported in fig-U3-2 but not failed).
- (gqur-301-u03-review_en-r1, review_en, agy) Next lifecycle stage for Unit 3 is G4 Urdu translation.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GQUR-301 Unit 3 (docs/semester-2/gqur-301/unit-03): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Validated the existing complete Unit 3 Urdu mirror and figures, refreshed stale G2 evidence, and committed validation records and the PHR.

## Outcome

- Impact: translate for GQUR-301 Unit 3 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 34 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Validated the existing complete Unit 3 Urdu mirror and figures, refreshed stale G2 evidence, and committed validation records and the PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Translation remains draft; independent G3/G5 review and browser inspection remain pending.
  - Translation remains draft; independent G3/G5 review and browser inspection remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
