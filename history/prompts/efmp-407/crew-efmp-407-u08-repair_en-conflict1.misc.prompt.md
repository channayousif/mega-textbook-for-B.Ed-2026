---
id: crew-efmp-407-u08-repair_en-conflict1
title: crew fix EFMP-407 unit 8
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u08-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/unit-08/topic-01.mdx
 - docs/semester-3/efmp-407/unit-08/topic-02.mdx
 - docs/semester-3/efmp-407/unit-08/unit-assessment.mdx
 - history/prompts/efmp-407/20261188-resolve-efmp407-unit08-merge-conflicts.misc.prompt.md
 - history/prompts/efmp-407/crew-efmp-407-u08-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-08/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-08/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-08/unit-assessment.mdx
 - specs/content/efmp-407/coverage/unit-08.md
 - specs/content/efmp-407/reviews/unit-08/G2/20261110T024249494Z-gates.json
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261110T024249494Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261110T024249494Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261110T024249494Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261110T024249494Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261110T024249494Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261110T024249494Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261110T024249494Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261110T024249494Z/validate-content.txt
 - specs/content/efmp-407/sources/texts/sindh-rte-act-2013.md
 - specs/content/efmp-407/sources/texts/wals-2024-whole-school.md
 - specs/content/efmp-407/sources/unit-08.md
 - specs/content/efmp-407/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u08-repair_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u08-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-407-u08-repair_en conflicts with main (specs/content/efmp-407/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

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
- (efmp-407-u08-repair_en, repair_en, agy) G3 review findings F1-F8 from 20261108T203238Z-g3-desk-04abd597.json are repaired in EN and UR mirrors; G3 tracker row appended leaving G3 unticked.
- (efmp-407-u08-repair_en, repair_en, agy) G2 gate evidence refreshed at specs/content/efmp-407/reviews/unit-08/G2/20261110T024249494Z-gates.json and all 14 content gates are green.
- (efmp-407-u08-illustrate, illustrate, agy) Banner fig-U8-5.webp is placed in both English and Urdu unit index files, with unit-08.banner.md set to placed.
- (efmp-407-u08-illustrate, illustrate, agy) G2 gate evidence has been refreshed to cover the English index update, and all 14 content gates are green.
- (efmp-407-u08-illustrate, illustrate, agy) G3 English review and G5 Urdu review remain open and uncertified; Jumani and Abbasi (2015) attribution finding belongs to repair_en.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Merged origin/main into crew/efmp-407-u08-repair_en, resolved the shared tasks.md tracker conflict by preserving both sides' rows, committed the merge plus PHR 20261188, and left all 14 content gates passing.

## Outcome

- Impact: fix for EFMP-407 Unit 8 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-407-u08-repair_en, resolved the shared tasks.md tracker conflict by preserving both sides' rows, committed the merge plus PHR 20261188, and left all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 8 G3/G5 remain open and uncertified; the branch's advisory row leaves G3 unticked.
  - Shared tracker `specs/content/efmp-407/tasks.md` is the recurring collision point for parallel EFMP-407 unit jobs.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
