---
id: crew-efmp-407-u08-translate
title: crew translate EFMP-407 unit 8
stage: misc
date: 2026-11-07
surface: agent
model: codex
feature: efmp-407
branch: crew/efmp-407-u08-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261162-complete-unit-eight-translation-retry.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-08/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-08/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-08/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-08/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-08/unit-teacher-notes.mdx
 - specs/content/efmp-407/reviews/unit-08/G2/20261107T194631162Z-gates.json
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T194631162Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T194631162Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T194631162Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T194631162Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T194631162Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T194631162Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T194631162Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T194631162Z/validate-content.txt
 - specs/content/efmp-407/tasks.md
 - specs/content/efmp-407/translation/unit-08.md
 - static/img/figures/efmp-407/unit-08/fig-U8-1.ur.dark.svg
 - static/img/figures/efmp-407/unit-08/fig-U8-1.ur.svg
 - static/img/figures/efmp-407/unit-08/fig-U8-2.ur.dark.svg
 - static/img/figures/efmp-407/unit-08/fig-U8-2.ur.svg
 - static/img/figures/efmp-407/unit-08/fig-U8-3.ur.dark.svg
 - static/img/figures/efmp-407/unit-08/fig-U8-3.ur.svg
 - static/img/figures/efmp-407/unit-08/fig-U8-4.ur.dark.svg
 - static/img/figures/efmp-407/unit-08/fig-U8-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u08-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u08-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-407 Unit 8 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-08/`.

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
- (efmp-407-u08-review_en-r1, review_en, codex) G3 remains open. Prior findings F1-F9 need author repairs; fresh review requires runtime provenance and browser/print evidence.
- (efmp-407-u08-review_en-r1, review_en, codex) G3 remains open. Prior findings F1-F9 need author repairs; fresh review requires runtime provenance and browser/print evidence.
- (efmp-407-u08-review_en, review_en, opencode) F1 blocking - repair the Jumani and Abbasi (2015) attribution at topic-01.mdx:57 and :78, sources/unit-08.md:9, sources/texts/jumani-abbasi-2015.md:23 and coverage/unit-08.md:9,11 (remove or replace the source, or rewrite the claims to the paper's actual content).
- (efmp-407-u08-review_en, review_en, opencode) F8 uncertain - topic-02.mdx:138 is tagged Analyze above the formative band; reword the item or record an owner ruling before the next review cycle.
- (efmp-407-u08-review_en, review_en, opencode) F3 - the Sindh Act URL is dead, use the official sja.gos.pk copy. F9 - a fresh review still needs a real narrow-view and A4 print inspection when a render path is available.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- EFMP-407 Unit 8 (docs/semester-3/efmp-407/unit-08): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Validated the existing Unit 8 Urdu mirror and committed fresh gate evidence with zero new findings.

## Outcome

- Impact: translate for EFMP-407 Unit 8 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Validated the existing Unit 8 Urdu mirror and committed fresh gate evidence with zero new findings.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 repairs, independent G5, browser geometry and Urdu/A4 inspection remain pending; translation_status stays draft.
  - G3 repairs, independent G5, browser geometry and Urdu/A4 inspection remain pending; translation_status stays draft.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
