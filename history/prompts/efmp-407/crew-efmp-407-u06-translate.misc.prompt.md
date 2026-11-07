---
id: crew-efmp-407-u06-translate
title: crew translate EFMP-407 unit 6
stage: misc
date: 2026-11-07
surface: agent
model: codex
feature: efmp-407
branch: crew/efmp-407-u06-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/006-content-pipeline/20261158-efmp-407-unit-06-urdu-mirror.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-06/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-06/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-06/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-06/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-06/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-06/unit-teacher-notes.mdx
 - specs/content/efmp-407/reviews/unit-06/G4/check-content-baseline.txt
 - specs/content/efmp-407/reviews/unit-06/G4/check-content-final.txt
 - specs/content/efmp-407/reviews/unit-06/G4/check-content-reviewed.txt
 - specs/content/efmp-407/reviews/unit-06/G4/figure-variants.txt
 - specs/content/efmp-407/reviews/unit-06/G4/structural-parity.txt
 - specs/content/efmp-407/reviews/unit-06/G4/translation-handoff.md
 - static/img/figures/efmp-407/unit-06/fig-U6-1.ur.dark.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-1.ur.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-2.ur.dark.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-2.ur.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-3.ur.dark.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-3.ur.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-4.ur.dark.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-4.ur.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-5.ur.dark.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-5.ur.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-6.ur.dark.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u06-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u06-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-407 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-06/`.

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
- (efmp-407-u06-review_en, review_en, agy) Multiple excerpt files exist on disk under specs/content/efmp-407/sources/texts/ but were omitted from input_manifest due to citedKeysFor regex; engineering owner should update regex or keys before qualification.
- (efmp-407-u06-review_en, review_en, agy) Live browser rendering (360px viewport, table scrolling, A4 print) was barred under brief constraints and remains to be inspected on an authorized host.
- (efmp-407-u06-review_en, review_en, agy) Candidate English content in docs/semester-3/efmp-407/unit-06/ remains clean and passed all 14 content gates.
- (efmp-407-u06-author-conflict2, fix, opencode) main's Unit 2 backward-design table still carries five erroneous Unit 1 tracker rows (pre-existing on main, left untouched per the merge rule).
- (efmp-407-u06-author-conflict2, fix, opencode) the stale content-status finding is a local cache artifact; a clean main checkout also lacks the git-ignored `static/content-status.json`.


## Response snapshot

Translated all six Unit 6 pages and six RTL schematics into Urdu, generated dark variants, and committed validation records and the PHR.

## Outcome

- Impact: translate for EFMP-407 Unit 6 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated all six Unit 6 pages and six RTL schematics into Urdu, generated dark variants, and committed validation records and the PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G4 tracker unchanged per translate-unit Step 7; terminology proposals and validation logs are recorded in the handoff.
  - Translation remains draft; browser geometry, narrow-screen/A4 inspection and independent G5 remain pending.
  - G4 tracker unchanged per translate-unit Step 7; terminology proposals and validation logs are recorded in the handoff.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
