---
id: crew-geng-301-u02-repair_en-r1-conflict1
title: crew fix GENG-301 unit 2
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: geng-301
branch: crew/geng-301-u02-repair_en-r1
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/geng-301/unit-02/topic-02.mdx
 - docs/semester-2/geng-301/unit-02/topic-03.mdx
 - docs/semester-2/geng-301/unit-02/topic-04.mdx
 - docs/semester-2/geng-301/unit-02/unit-assessment.mdx
 - history/prompts/geng-301/crew-geng-301-u02-repair_en-r1-conflict1.misc.prompt.md
 - history/prompts/geng-301/crew-geng-301-u02-repair_en-r1.misc.prompt.md
 - specs/content/geng-301/figures/unit-02.md
 - specs/content/geng-301/reviews/unit-02/G2/20261103T184648108Z-gates.json
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261103T184648108Z/check-bloom-bands.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261103T184648108Z/check-concept-graph.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261103T184648108Z/check-depth-gate.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261103T184648108Z/check-docs-sync.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261103T184648108Z/check-figures.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261103T184648108Z/check-no-answer-keys.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261103T184648108Z/check-no-em-dash.txt
 - specs/content/geng-301/reviews/unit-02/G2/logs-20261103T184648108Z/validate-content.txt
 - specs/content/geng-301/tasks.md
 - static/img/figures/geng-301/unit-02/fig-U2-4.dark.svg
 - static/img/figures/geng-301/unit-02/fig-U2-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u02-repair_en-r1-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u02-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/geng-301-u02-repair_en-r1 conflicts with main (specs/content/geng-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENG-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-02/`.

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
- (geng-301-u02-repair_en-r1, repair_en, agy) Wordmark text geometry in static/img/figures/geng-301/unit-02/ was not inspected with Chromium because browser runs were barred; owner or subsequent reviewer should verify rendered geometry.
- (geng-301-u02-repair_en-r1, repair_en, agy) The content-spec continues to map openstax2021 while unit prose/sources bind writing2015; reconciling the approved spec remains an owner decision.
- (geng-301-u02-review_en-r1-conflict1, fix, agy) Owner must resolve remaining content findings and arrange visual, geometry and assessment evidence; this was the final authorized review cycle.
- (geng-301-u02-review_en-r1, review_en, codex) Owner must resolve remaining content findings and arrange visual, geometry and assessment evidence; this was the final authorized review cycle.
- (geng-301-u02-review_en-r1, review_en, codex) Owner must resolve remaining content findings and arrange visual, geometry and assessment evidence; this was the final authorized review cycle.


## Response snapshot

Merged origin/main (5663b5d45) into `crew/geng-301-u02-repair_en-r1` with no conflicts, verified the shared registries and Unit 2 tracker kept both sides' entries, committed the merge plus its PHR, and all 14 content gates pass.

## Outcome

- Impact: fix for GENG-301 Unit 2 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main (5663b5d45) into `crew/geng-301-u02-repair_en-r1` with no conflicts, verified the shared registries and Unit 2 tracker kept both sides' entries, committed the merge plus its PHR, and all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The merge was clean; no scope-file edits were needed because origin/main had not touched the Unit 2 files this branch changed.
  - F1 wordmark geometry in `static/img/figures/geng-301/unit-02/` is still unverified in Chromium; the openstax2021 vs writing2015 source mapping and session provenance remain owner decisions.
  - G3 stays open and unsigned (ADR-0019); a fresh independent G3 review is still required.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
