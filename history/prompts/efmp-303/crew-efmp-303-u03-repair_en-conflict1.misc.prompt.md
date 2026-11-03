---
id: crew-efmp-303-u03-repair_en-conflict1
title: crew fix EFMP-303 unit 3
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: efmp-303
branch: crew/efmp-303-u03-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-303/unit-03/topic-01.mdx
 - docs/semester-2/efmp-303/unit-03/topic-02.mdx
 - docs/semester-2/efmp-303/unit-03/topic-03.mdx
 - docs/semester-2/efmp-303/unit-03/unit-assessment.mdx
 - docs/semester-2/efmp-303/unit-03/unit-teacher-notes.mdx
 - history/prompts/efmp-303/crew-efmp-303-u03-repair_en-conflict1.misc.prompt.md
 - history/prompts/efmp-303/crew-efmp-303-u03-repair_en.misc.prompt.md
 - history/prompts/general/20261116-repair-efmp303-unit-three-g3.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/unit-teacher-notes.mdx
 - specs/content/efmp-303/concepts/unit-03.md
 - specs/content/efmp-303/coverage/unit-03.md
 - specs/content/efmp-303/figures/unit-03.md
 - specs/content/efmp-303/reviews/unit-03/G2/20261103T071326507Z-gates.json
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261103T071326507Z/check-bloom-bands.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261103T071326507Z/check-concept-graph.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261103T071326507Z/check-depth-gate.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261103T071326507Z/check-docs-sync.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261103T071326507Z/check-figures.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261103T071326507Z/check-no-answer-keys.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261103T071326507Z/check-no-em-dash.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261103T071326507Z/validate-content.txt
 - specs/content/efmp-303/reviews/unit-03/G3/repair-20261103/check-content.log
 - specs/content/efmp-303/reviews/unit-03/G3/repair-20261103/handoff.md
 - specs/content/efmp-303/reviews/unit-03/G3/repair-20261103/origin-main-check-content.log
 - specs/content/efmp-303/sources/texts/u03-coombs.md
 - specs/content/efmp-303/sources/texts/u03-nep2009.md
 - specs/content/efmp-303/sources/texts/u03-vision2025.md
 - specs/content/efmp-303/sources/unit-03.md
 - specs/content/efmp-303/tasks.md
 - static/img/figures/efmp-303/unit-03/fig-U3-2.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-2.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-2.ur.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-3.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-3.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-3.ur.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-4.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-4.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-4.ur.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-5.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-5.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-5.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-5.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u03-repair_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u03-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-303-u03-repair_en conflicts with main (specs/content/efmp-303/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-303 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-03/`.

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
- (efmp-303-u03-repair_en, repair_en, codex) G3 remains open; independent review, browser inspection and owner G1/figure-plan decisions remain pending.
- (efmp-303-u03-repair_en, repair_en, codex) G3 remains open; independent review, browser inspection and owner G1/figure-plan decisions remain pending.
- (efmp-303-u03-fix, fix, opencode) G3 en-review row for Unit 3 is flagged stale; a fresh independent G3 run is needed. English G3 repairs and Urdu page/print inspection remain pending from earlier translate jobs (translation_status stays draft).
- (efmp-303-u03-translate-r1, translate, codex) English G3 repairs and Urdu page/mobile/A4 inspection remain pending; translation_status stays draft.
- (efmp-303-u03-translate-r1, translate, codex) English G3 repairs and Urdu page/mobile/A4 inspection remain pending; translation_status stays draft.


## Response snapshot

Merged origin/main into crew/efmp-303-u03-repair_en, resolved the single tasks.md conflict by keeping both sides' G3 en-review rows, and confirmed all 13 content gates pass.

## Outcome

- Impact: fix for EFMP-303 Unit 3 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 49 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-303-u03-repair_en, resolved the single tasks.md conflict by keeping both sides' G3 en-review rows, and confirmed all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 for Unit 3 remains open; independent review, browser inspection and owner G1/figure-plan decisions are still pending.
  - The merge pulled main's Unit 4 repair changes into this branch; they are out of Unit 3 scope but now present. static/content-status.json is gitignored, so a fresh worktree needs `npm run build:content-status` before check:content.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
