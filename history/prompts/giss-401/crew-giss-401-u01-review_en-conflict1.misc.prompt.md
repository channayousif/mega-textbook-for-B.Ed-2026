---
id: crew-giss-401-u01-review_en-conflict1
title: crew fix GISS-401 unit 1 review branch
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: giss-401
branch: crew/giss-401-u01-review_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/giss-401/course-overview.mdx
  - docs/semester-3/giss-401/unit-04/index.mdx
  - docs/semester-3/giss-401/unit-04/topic-01.mdx
  - docs/semester-3/giss-401/unit-04/topic-02.mdx
  - docs/semester-3/giss-401/unit-04/unit-assessment.mdx
  - history/prompts/general/547-author-giss401-unit-four.general.prompt.md
  - history/prompts/general/548-clear-giss401-unit-four-g2.general.prompt.md
  - history/prompts/giss-401/crew-giss-401-u01-review_en.misc.prompt.md
  - history/prompts/giss-401/crew-giss-401-u01-review_en-conflict1.misc.prompt.md
  - history/prompts/giss-401/crew-giss-401-u04-author-conflict1.misc.prompt.md
  - history/prompts/giss-401/crew-giss-401-u04-author.green.prompt.md
  - specs/content/giss-401/concepts/unit-04.md
  - specs/content/giss-401/coverage/unit-04.md
  - specs/content/giss-401/figures/unit-04.md
  - specs/content/giss-401/reviews/unit-01/G2/20261103T002225035Z-gates.json
  - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T002225035Z/check-bloom-bands.txt
  - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T002225035Z/check-concept-graph.txt
  - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T002225035Z/check-depth-gate.txt
  - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T002225035Z/check-docs-sync.txt
  - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T002225035Z/check-figures.txt
  - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T002225035Z/check-no-answer-keys.txt
  - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T002225035Z/check-no-em-dash.txt
  - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T002225035Z/validate-content.txt
  - specs/content/giss-401/reviews/unit-01/G3/fb1baf5a-8583-4edd-a5d3-bf7e01304eaf.json
  - specs/content/giss-401/reviews/unit-01/G3/fb1baf5a-8583-4edd-a5d3-bf7e01304eaf.summary.md
  - specs/content/giss-401/reviews/unit-01/G3/logs-fb1baf5a/check-content.txt
  - specs/content/giss-401/reviews/unit-01/G3/logs-fb1baf5a/check-depth-gate.txt
  - specs/content/giss-401/reviews/unit-01/G3/logs-fb1baf5a/check-docs-sync.txt
  - specs/content/giss-401/reviews/unit-01/G3/logs-fb1baf5a/check-figures.txt
  - specs/content/giss-401/reviews/unit-01/G3/logs-fb1baf5a/check-no-answer-keys.txt
  - specs/content/giss-401/reviews/unit-01/G3/logs-fb1baf5a/check-no-em-dash.txt
  - specs/content/giss-401/reviews/unit-01/G3/logs-fb1baf5a/fig-U1-1.png
  - specs/content/giss-401/reviews/unit-01/G3/logs-fb1baf5a/fig-U1-2.png
  - specs/content/giss-401/reviews/unit-01/G3/logs-fb1baf5a/fig-U1-3.png
  - specs/content/giss-401/reviews/unit-01/G3/logs-fb1baf5a/fig-U1-4.png
  - specs/content/giss-401/reviews/unit-01/G3/logs-fb1baf5a/render-review.txt
  - specs/content/giss-401/reviews/unit-01/G3/logs-fb1baf5a/validate-content.txt
  - specs/content/giss-401/reviews/unit-01/G3/prep-fb1baf5a/manifest.json
  - specs/content/giss-401/reviews/unit-01/G3/summary.md
  - specs/content/giss-401/reviews/unit-04/G2/20261102T233255375Z-gates.json
  - specs/content/giss-401/reviews/unit-04/G2/20261103T002225277Z-gates.json
  - specs/content/giss-401/reviews/unit-04/G2/logs-20261102T233255375Z/check-bloom-bands.txt
  - specs/content/giss-401/reviews/unit-04/G2/logs-20261102T233255375Z/check-concept-graph.txt
  - specs/content/giss-401/reviews/unit-04/G2/logs-20261102T233255375Z/check-depth-gate.txt
  - specs/content/giss-401/reviews/unit-04/G2/logs-20261102T233255375Z/check-docs-sync.txt
  - specs/content/giss-401/reviews/unit-04/G2/logs-20261102T233255375Z/check-figures.txt
  - specs/content/giss-401/reviews/unit-04/G2/logs-20261102T233255375Z/check-no-answer-keys.txt
  - specs/content/giss-401/reviews/unit-04/G2/logs-20261102T233255375Z/check-no-em-dash.txt
  - specs/content/giss-401/reviews/unit-04/G2/logs-20261102T233255375Z/validate-content.txt
  - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T002225277Z/check-bloom-bands.txt
  - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T002225277Z/check-concept-graph.txt
  - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T002225277Z/check-depth-gate.txt
  - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T002225277Z/check-docs-sync.txt
  - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T002225277Z/check-figures.txt
  - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T002225277Z/check-no-answer-keys.txt
  - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T002225277Z/check-no-em-dash.txt
  - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T002225277Z/validate-content.txt
  - specs/content/giss-401/sources/texts/abdel-salam-2015-democracy.md
  - specs/content/giss-401/sources/texts/quran-translation.md
  - specs/content/giss-401/sources/unit-04.md
  - specs/content/giss-401/tasks.md
  - static/img/figures/giss-401/unit-04/fig-U4-1.dark.svg
  - static/img/figures/giss-401/unit-04/fig-U4-1.svg
  - static/img/figures/giss-401/unit-04/fig-U4-2.dark.svg
  - static/img/figures/giss-401/unit-04/fig-U4-2.svg
  - static/img/figures/giss-401/unit-04/fig-U4-3.dark.svg
  - static/img/figures/giss-401/unit-04/fig-U4-3.svg
  - static/img/figures/giss-401/unit-04/fig-U4-4.dark.svg
  - static/img/figures/giss-401/unit-04/fig-U4-4.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job giss-401-u01-review_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u01-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/giss-401-u01-review_en conflicts with main (specs/content/giss-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GISS-401 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-01/`.

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
- (giss-401-u01-review_en, review_en, agy) GISS-401 Unit 1 G3 English review passed all 7 criteria with advisory pass evidence; G3 remains open (▢) and unsigned pending qualified theological sign-off per content spec drafting note 2.
- (giss-401-u01-review_en, review_en, agy) All four English SVGs and dark variants are placed and verified non-blank via Sharp rasterization; Playwright Chromium geometry measurement was deferred per brief.
- (giss-401-u01-review_en, review_en, agy) Unit 1 English text and structure are clean and ready for Urdu translation (G4 ur-translation).
- (giss-401-u01-author, author, claude) Figures were checked by eye only (`measure-figure-text.mjs` needs Chromium, which the brief forbids), so CI's figure-geometry job is the first real measurement of the four GISS-401 Unit 1 SVGs.
- (giss-401-u01-author, author, claude) G3 for this unit also needs a qualified Islamic Studies reviewer (content-spec drafting note 2). Maududi is declared unverifiable and backs the title only; `islami-nazriya-e-hayat` is not cited.

## Response snapshot

Merged origin/main into crew/giss-401-u01-review_en, resolving the specs/content/giss-401/tasks.md conflict by keeping main's newer Unit 1 G2 gate-evidence row and this branch's independent Unit 1 G3 advisory-pass row. The shared registries were untouched by this branch, so they merge as main's versions. Regenerated the gitignored static/content-status.json so check:content-status matches the merged tree.

## Outcome

- Impact: fix for GISS-401 Unit 1 by opencode (attempt 1).
- Tests: npm run check:content passed (all 13 content gates) after regenerating static/content-status.json.
- Files: 72 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/giss-401-u01-review_en, resolving the specs/content/giss-401/tasks.md conflict by keeping main's newer Unit 1 G2 gate-evidence row and this branch's independent Unit 1 G3 advisory-pass row. The shared registries were untouched by this branch, so they merge as main's versions. Regenerated the gitignored static/content-status.json so check:content-status matches the merged tree.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this merge does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The merge keeps main's newer Unit 1 G2 gates file (20261103T002225035Z); this branch's older 20261102T230118463Z file remains on the branch history but is no longer the authoritative tracker reference.
  - GISS-401 Unit 1 G3 remains open (▢) and unsigned pending qualified Islamic Studies sign-off; Unit 1 is otherwise clean and ready for Urdu translation (G4).
  - The four Unit 1 SVGs have never been measured by measure-figure-text; CI figure-geometry may flag them, so G6 stays in progress.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
