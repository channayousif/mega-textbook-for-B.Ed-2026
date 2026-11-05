---
id: crew-geng-301-u05-repair_en-conflict1
title: crew fix GENG-301 unit 5
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: geng-301
branch: crew/geng-301-u05-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/geng-301/unit-05/topic-03.mdx
 - docs/semester-2/geng-301/unit-05/topic-04.mdx
 - docs/semester-2/geng-301/unit-05/unit-assessment.mdx
 - docs/semester-2/geng-301/unit-05/unit-teacher-notes.mdx
 - history/prompts/006-content-pipeline/0027-repair-geng301-unit-five-english.green.prompt.md
 - history/prompts/geng-301/crew-geng-301-u05-repair_en.misc.prompt.md
 - specs/content/geng-301/figures/unit-05.md
 - specs/content/geng-301/reviews/unit-05/G2/20261103T185029661Z-gates.json
 - specs/content/geng-301/reviews/unit-05/G2/logs-20261103T185029661Z/check-bloom-bands.txt
 - specs/content/geng-301/reviews/unit-05/G2/logs-20261103T185029661Z/check-concept-graph.txt
 - specs/content/geng-301/reviews/unit-05/G2/logs-20261103T185029661Z/check-depth-gate.txt
 - specs/content/geng-301/reviews/unit-05/G2/logs-20261103T185029661Z/check-docs-sync.txt
 - specs/content/geng-301/reviews/unit-05/G2/logs-20261103T185029661Z/check-figures.txt
 - specs/content/geng-301/reviews/unit-05/G2/logs-20261103T185029661Z/check-no-answer-keys.txt
 - specs/content/geng-301/reviews/unit-05/G2/logs-20261103T185029661Z/check-no-em-dash.txt
 - specs/content/geng-301/reviews/unit-05/G2/logs-20261103T185029661Z/validate-content.txt
 - specs/content/geng-301/reviews/unit-05/repairs/20261103-repair-en.md
 - specs/content/geng-301/tasks.md
 - static/img/figures/geng-301/unit-05/fig-U5-2.dark.svg
 - static/img/figures/geng-301/unit-05/fig-U5-2.svg
 - static/img/figures/geng-301/unit-05/fig-U5-8.dark.svg
 - static/img/figures/geng-301/unit-05/fig-U5-8.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u05-repair_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/geng-301-u05-repair_en conflicts with main (specs/content/geng-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENG-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-05/`.

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
- (geng-301-u05-repair_en, repair_en, codex) G3 remains open; original provenance, SVG geometry and desktop/narrow/A4 inspection need an authorised host.
- (geng-301-u05-repair_en, repair_en, codex) G3 remains open; original provenance, SVG geometry and desktop/narrow/A4 inspection need an authorised host.
- (geng-301-u05-fix, fix, opencode) G3 review remains incomplete; a fresh G3 run is needed after this figure-geometry repair. G4/G5/G6/G7 are untouched.
- (geng-301-u05-review_en-conflict2, fix, codex) G3 remains incomplete; author repairs, provenance and rendered inspection remain pending.
- (geng-301-u05-review_en-conflict2, fix, codex) G3 remains incomplete; author repairs, provenance and rendered inspection remain pending.


## Response snapshot

Merged origin/main into crew/geng-301-u05-repair_en (clean, no conflicts) and confirmed npm run check:content passes all 14 content gates.

## Outcome

- Impact: fix for GENG-301 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/geng-301-u05-repair_en (clean, no conflicts) and confirmed npm run check:content passes all 14 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Merge was clean (no overlapping files with origin/main); branch content intact and all 14 content gates pass.
  - G3 remains open for Unit 5; a fresh independent G3 review is still required after the figure-geometry repair.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
