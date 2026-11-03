---
id: crew-efmp-406-u06-translate
title: crew translate EFMP-406 unit 6
stage: misc
date: 2026-11-02
surface: agent
model: codex
feature: efmp-406
branch: crew/efmp-406-u06-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-406/crew-efmp-406-u06-translate.misc.prompt.md
 - history/prompts/general/20261106-efmp406-u06-urdu-translation.general.prompt.md
 - history/prompts/general/20261109-repair-efmp406-u06-translation-evidence.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/unit-teacher-notes.mdx
 - specs/content/efmp-406/reviews/unit-06/G2/20261102T204643842Z-gates.json
 - specs/content/efmp-406/reviews/unit-06/G2/continuation-20261103/README.md
 - specs/content/efmp-406/reviews/unit-06/G2/continuation-20261103/before.txt
 - specs/content/efmp-406/reviews/unit-06/G2/continuation-20261103/final-draft.txt
 - specs/content/efmp-406/reviews/unit-06/G2/continuation-20261103/origin-main.txt
 - specs/content/efmp-406/reviews/unit-06/G2/continuation-20261103/temporary-reviewed.txt
 - specs/content/efmp-406/reviews/unit-06/G2/logs-20261102T204643842Z/check-bloom-bands.txt
 - specs/content/efmp-406/reviews/unit-06/G2/logs-20261102T204643842Z/check-concept-graph.txt
 - specs/content/efmp-406/reviews/unit-06/G2/logs-20261102T204643842Z/check-depth-gate.txt
 - specs/content/efmp-406/reviews/unit-06/G2/logs-20261102T204643842Z/check-docs-sync.txt
 - specs/content/efmp-406/reviews/unit-06/G2/logs-20261102T204643842Z/check-figures.txt
 - specs/content/efmp-406/reviews/unit-06/G2/logs-20261102T204643842Z/check-no-answer-keys.txt
 - specs/content/efmp-406/reviews/unit-06/G2/logs-20261102T204643842Z/check-no-em-dash.txt
 - specs/content/efmp-406/reviews/unit-06/G2/logs-20261102T204643842Z/validate-content.txt
 - specs/content/efmp-406/tasks.md
 - specs/content/efmp-406/translations/unit-06/handoff.md
 - specs/content/efmp-406/translations/unit-06/logs/check-content-draft.txt
 - specs/content/efmp-406/translations/unit-06/logs/check-content-origin-main.txt
 - specs/content/efmp-406/translations/unit-06/logs/check-content-temporary-reviewed.txt
 - specs/content/efmp-406/translations/unit-06/logs/mdx-syntax.txt
 - specs/content/efmp-406/translations/unit-06/logs/parity-self-check.txt
 - static/img/figures/efmp-406/unit-06/fig-U6-1.ur.dark.svg
 - static/img/figures/efmp-406/unit-06/fig-U6-1.ur.svg
 - static/img/figures/efmp-406/unit-06/fig-U6-2.ur.dark.svg
 - static/img/figures/efmp-406/unit-06/fig-U6-2.ur.svg
 - static/img/figures/efmp-406/unit-06/fig-U6-3.ur.dark.svg
 - static/img/figures/efmp-406/unit-06/fig-U6-3.ur.svg
 - static/img/figures/efmp-406/unit-06/fig-U6-4.ur.dark.svg
 - static/img/figures/efmp-406/unit-06/fig-U6-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u06-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u06-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-406 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-06/`.

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
- (efmp-406-u06-review_en, review_en, agy) All 7 G3 criteria pass, 25 assessment items independently solved, and all 8 SVG variants pass geometry; report validated with advisory pass disposition.
- (efmp-406-u06-review_en, review_en, agy) The G3 tracker row in specs/content/efmp-406/tasks.md is updated to open ▢ per ADR-0019; certification remains blocked pending trusted qualification.
- (efmp-406-u06-review_en, review_en, agy) Unit 6 is ready for Urdu translation (G4 ur-translation) and subsequent independent Urdu review (G5 ur-review).
- (efmp-406-u06-author-conflict5, fix, opencode) origin/main (5be22ec4) was already an ancestor of this branch via conflict4's merge 40a0c1d3, so the requested merge was a no-op and no merge commit was created.
- (efmp-406-u06-author-conflict5, fix, opencode) shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are byte-identical to main; the only tasks.md delta is the intended Unit 6 status update.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- EFMP-406 Unit 6 (docs/semester-3/efmp-406/unit-06): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Preserved the complete Unit 6 Urdu mirror, refreshed stale G2 evidence, and recorded the translation handoff and validation results.

## Outcome

- Impact: translate for EFMP-406 Unit 6 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 37 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Preserved the complete Unit 6 Urdu mirror, refreshed stale G2 evidence, and recorded the translation handoff and validation results.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu remains draft; independent G5 and permitted browser, print and SVG geometry checks are pending.
  - Urdu remains draft; independent G5 and permitted browser, print and SVG geometry checks are pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
