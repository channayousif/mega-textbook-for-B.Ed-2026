---
id: crew-efmp-406-u03-translate-r1
title: crew translate EFMP-406 unit 3
stage: misc
date: 2026-11-06
surface: agent
model: codex
feature: efmp-406
branch: crew/efmp-406-u03-translate-r1
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261131-efmp406-u03-urdu-translation.general.prompt.md
 - history/prompts/general/20261132-efmp406-u03-translation-continuation.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-03/unit-assessment.mdx
 - specs/content/efmp-406/reviews/unit-03/G2/20261106T101651843Z-gates.json
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261106T101651843Z/check-bloom-bands.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261106T101651843Z/check-concept-graph.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261106T101651843Z/check-depth-gate.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261106T101651843Z/check-docs-sync.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261106T101651843Z/check-figures.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261106T101651843Z/check-no-answer-keys.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261106T101651843Z/check-no-em-dash.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261106T101651843Z/validate-content.txt
 - specs/content/efmp-406/reviews/unit-03/translation-continuation-20261106/check-final.txt
 - specs/content/efmp-406/reviews/unit-03/translation-continuation-20261106/check-initial.txt
 - specs/content/efmp-406/reviews/unit-03/translation-continuation-20261106/check-reviewed-repaired.txt
 - specs/content/efmp-406/reviews/unit-03/translation-continuation-20261106/handoff.md
 - specs/content/efmp-406/tasks.md
 - specs/content/efmp-406/translations/unit-03/handoff.md
 - specs/content/efmp-406/translations/unit-03/logs/check-content-draft.txt
 - specs/content/efmp-406/translations/unit-03/logs/check-content-final.txt
 - specs/content/efmp-406/translations/unit-03/logs/check-content-temporary-reviewed.txt
 - specs/content/efmp-406/translations/unit-03/logs/mdx-syntax.txt
 - specs/content/efmp-406/translations/unit-03/logs/parity-self-check.txt
 - static/img/figures/efmp-406/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-1.ur.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-2.ur.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-3.ur.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u03-translate-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u03-translate-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-406 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-03/`.

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
- (efmp-406-u03-repair_en-conflict2, fix, opencode) `static/content-status.json` is gitignored; run `npm run build:content-status` after any tracker edit or the content-status gate fails.
- (efmp-406-u03-repair_en-conflict2, fix, opencode) G3/G5 remain open and unsigned; the Unit 3 G3 advisory row still records missing author run identity and browser/print evidence.
- (efmp-406-u03-repair_en-conflict2, fix, opencode) Merge is local only on `crew/efmp-406-u03-repair_en`; do not push or open a PR.
- (efmp-406-u03-repair_en-conflict1, fix, opencode) origin/main `b7f563c7c` is already an ancestor of this branch (ahead 5, behind 0), so there was no conflict to resolve and no merge commit exists.
- (efmp-406-u03-repair_en-conflict1, fix, opencode) Batch PR #439 (`crew/batch-20261103-1902`) is still open and will advance main with the Unit 2 tracker row update and advisory row; expect a fresh append-only conflict in `specs/content/efmp-406/tasks.md` when merging main after it lands.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- EFMP-406 Unit 3 (docs/semester-3/efmp-406/unit-03): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Corrected EFMP-406 Unit 3 Urdu, refreshed stale G2 evidence, and recorded the tracker handoff and validation results.

## Outcome

- Impact: translate for EFMP-406 Unit 3 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 34 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Corrected EFMP-406 Unit 3 Urdu, refreshed stale G2 evidence, and recorded the tracker handoff and validation results.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Translation remains draft; independent G5 and permitted browser/print/SVG geometry checks remain pending.
  - Translation remains draft; independent G5 and permitted browser/print/SVG geometry checks remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
