---
id: crew-gpks-402-u04-translate-conflict1
title: crew fix GPKS-402 unit 4
stage: misc
date: 2026-11-02
surface: agent
model: opencode
feature: gpks-402
branch: crew/gpks-402-u04-translate
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261042-gpks402-unit-four-urdu-mirror.general.prompt.md
 - history/prompts/gpks-402/crew-gpks-402-u04-translate-conflict1.misc.prompt.md
 - history/prompts/gpks-402/crew-gpks-402-u04-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-04/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-04/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-04/unit-assessment.mdx
 - specs/content/gpks-402/reviews/unit-04/G4/translation-handoff.md
 - specs/content/gpks-402/tasks.md
 - static/img/figures/gpks-402/unit-04/fig-U4-1.ur.dark.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-1.ur.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-2.ur.dark.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-2.ur.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-3.ur.dark.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-3.ur.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-4.ur.dark.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-4.ur.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-5.ur.dark.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-5.ur.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-6.ur.dark.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-6.ur.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-7.ur.dark.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-7.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u04-translate-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u04-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gpks-402-u04-translate conflicts with main (specs/content/gpks-402/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GPKS-402 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-04/`.

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
- (gpks-402-u04-translate, translate, codex) Status remains draft; independent G5, SVG geometry and rendered Urdu inspection remain pending because browser runs were prohibited.
- (gpks-402-u04-translate, translate, codex) Status remains draft; independent G5, SVG geometry and rendered Urdu inspection remain pending because browser runs were prohibited.
- (gpks-402-u04-review_en, review_en, agy) All seven G3 criteria pass with verified evidence; 25 assessment items independently solved; all 14 SVG variants pass measure-figure-text.
- (gpks-402-u04-review_en, review_en, agy) G3 tracker row in specs/content/gpks-402/tasks.md is updated to open ▢ per ADR-0019; certification remains blocked pending trusted qualification.
- (gpks-402-u04-review_en, review_en, agy) Unit 4 is ready for Urdu translation (G4 ur-translation) and subsequent independent Urdu review (G5 ur-review).


## Response snapshot

Merged origin/main into crew/gpks-402-u04-translate, resolved the single tasks.md conflict (main's Unit 3/6 progress + HEAD's Unit 4 Urdu draft status), and all 13 content gates pass.

## Outcome

- Impact: fix for GPKS-402 Unit 4 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 24 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gpks-402-u04-translate, resolved the single tasks.md conflict (main's Unit 3/6 progress + HEAD's Unit 4 Urdu draft status), and all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G5 Urdu review and rendered browser inspection remain pending for Unit 4 (browser runs were prohibited in this job); no content-status.json commit needed (gitignored generated file).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
