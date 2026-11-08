---
id: crew-efmp-407-u08-translate-conflict1
title: crew fix EFMP-407 unit 8
stage: misc
date: 2026-11-08
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u08-translate
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-407/crew-efmp-407-u08-translate.misc.prompt.md
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

# Crew job efmp-407-u08-translate-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u08-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-407-u08-translate conflicts with main (specs/content/efmp-407/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

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
- (efmp-407-u08-translate, translate, codex) G3 repairs, independent G5, browser geometry and Urdu/A4 inspection remain pending; translation_status stays draft.
- (efmp-407-u08-translate, translate, codex) G3 repairs, independent G5, browser geometry and Urdu/A4 inspection remain pending; translation_status stays draft.
- (efmp-407-u08-review_en-r1, review_en, codex) G3 remains open. Prior findings F1-F9 need author repairs; fresh review requires runtime provenance and browser/print evidence.
- (efmp-407-u08-review_en-r1, review_en, codex) G3 remains open. Prior findings F1-F9 need author repairs; fresh review requires runtime provenance and browser/print evidence.
- (efmp-407-u08-review_en, review_en, opencode) F1 blocking - repair the Jumani and Abbasi (2015) attribution at topic-01.mdx:57 and :78, sources/unit-08.md:9, sources/texts/jumani-abbasi-2015.md:23 and coverage/unit-08.md:9,11 (remove or replace the source, or rewrite the claims to the paper's actual content).


## Response snapshot

Merged origin/main into `crew/efmp-407-u08-translate`, resolved the `specs/content/efmp-407/tasks.md` conflict by keeping main's new Unit 8 G3 r1 row alongside this branch's G4 translation row, and regenerated the gitignored content-status report so all content gates pass.

## Outcome

- Impact: fix for EFMP-407 Unit 8 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 26 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into `crew/efmp-407-u08-translate`, resolved the `specs/content/efmp-407/tasks.md` conflict by keeping main's new Unit 8 G3 r1 row alongside this branch's G4 translation row, and regenerated the gitignored content-status report so all content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains open (F1 Jumani and Abbasi attribution unfixed; codex r1 escalation row kept from main); translation_status stays draft.
  - `static/content-status.json` is gitignored/generated; regenerated locally so `check:content` passes, but it is not committed.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
