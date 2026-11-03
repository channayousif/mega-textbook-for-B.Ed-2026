---
id: crew-giss-401-u05-author-conflict3
title: crew fix GISS-401 unit 5
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: giss-401
branch: crew/giss-401-u05-author
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
 - specs/content/giss-401/sources/texts/abdel-salam-2015-democracy.md
 - specs/content/giss-401/sources/texts/quran-translation.md
 - specs/content/giss-401/tasks.md
 - specs/content/giss-401/reviews/unit-01/G2/20261103T021608724Z-gates.json
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T021608724Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T021608724Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T021608724Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T021608724Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T021608724Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T021608724Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T021608724Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T021608724Z/validate-content.txt
 - specs/content/giss-401/reviews/unit-04/G2/20261103T021608931Z-gates.json
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T021608931Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T021608931Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T021608931Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T021608931Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T021608931Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T021608931Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T021608931Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T021608931Z/validate-content.txt
 - specs/content/giss-401/reviews/unit-05/G2/20261103T021609105Z-gates.json
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T021609105Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T021609105Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T021609105Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T021609105Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T021609105Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T021609105Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T021609105Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T021609105Z/validate-content.txt
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u05-author-conflict3

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/giss-401-u05-author conflicts with main (docs/semester-3/giss-401/course-overview.mdx, specs/content/giss-401/sources/texts/abdel-salam-2015-democracy.md, specs/content/giss-401/sources/texts/quran-translation.md, specs/content/giss-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GISS-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-05/`.

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
- (giss-401-u05-author-conflict1, fix, opencode) Unit 5 G3 English review and G4/G5 Urdu translation are still open downstream jobs; no G3/G5 row was marked done.
- (giss-401-u05-author-conflict1, fix, opencode) The merge changed shared bound inputs (`course-overview.mdx`, `pak-constitution-1973.md`), so both units' G2 evidence was re-recorded; a later main change to those files needs the same `prepare-gate-evidence.mjs --refresh-stale` step.
- (giss-401-u05-author-conflict1, fix, opencode) `static/content-status.json` is gitignored and was regenerated locally; CI's prestart hooks regenerate it too.
- (giss-401-u05-author, author, agy) G2 deterministic gate evidence is recorded; G3 independent English review and G4/G5 Urdu translation remain separate downstream jobs.
- (giss-401-u05-author, author, agy) Unit 5 concept graph has ten authored Urdu labels flagged for G5 review because the course key terms are not yet banked in terminology.csv.

## Response snapshot

Merged origin/main into `crew/giss-401-u05-author` and resolved all four conflicts, then refreshed the stale G2 gate evidence the merge invalidated.

## Outcome

- Impact: fix for GISS-401 Unit 5 by opencode (attempt 1).
- Tests: `npm run check:content` passes (13/13 gates) after `prepare-gate-evidence.mjs --refresh-stale` and `npm run build:content-status`.
- Files: 30 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merge commit `be0e14cae` resolves the four conflicts (course-overview unit availability, abdel-salam bound notes, quran-translation Unit 4/5 sections, tasks.md unit and stage rows); commit `adba27f2a` refreshes the G2 evidence for Units 1, 4 and 5 and repoints the tracker rows.
- Decisions the team must respect: the merged `quran-translation.md` keeps main's Unit 4 notes before this branch's U5 sections, and its intro now reads "Units 1, 4 and 5"; the merged `abdel-salam-2015-democracy.md` keeps main's citation and passage locators and appends this branch's U5 excerpts; `tasks.md` marks Units 4 and 5 both drafted and keeps main's Unit 1 G2 evidence path.
- Pending / next owner: Unit 5 G3 English review and G4/G5 Urdu translation remain separate downstream jobs; no G3/G5 row is marked done.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
