---
id: crew-gqur-301-u14-repair_en-conflict1
title: crew fix GQUR-301 unit 14
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u14-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-14/topic-01.mdx
 - docs/semester-2/gqur-301/unit-14/topic-02.mdx
 - docs/semester-2/gqur-301/unit-14/unit-assessment.mdx
 - history/prompts/gqur-301/2454-crew-gqur-301-u14-repair_en-conflict1.misc.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u14-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/unit-assessment.mdx
 - specs/content/gqur-301/reviews/unit-14/G2/20261105T152528893Z-gates.json
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261105T152528893Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261105T152528893Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261105T152528893Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261105T152528893Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261105T152528893Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261105T152528893Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261105T152528893Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-14/G2/logs-20261105T152528893Z/validate-content.txt
 - specs/content/gqur-301/reviews/unit-14/G3/repair-desk-b6a93c25.md
 - specs/content/gqur-301/sources/unit-14.md
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u14-repair_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u14-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gqur-301-u14-repair_en conflicts with main (specs/content/gqur-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GQUR-301 Unit 14 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-14/`.

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
- (gqur-301-u14-repair_en, repair_en, agy) G2 gate evidence was refreshed with input hashes matching the repaired content; G3 remains unticked pending fresh independent review.
- (gqur-301-u14-repair_en, repair_en, agy) Classroom data values in Topic 01 now strictly produce sum 513, mean 34.2, and sample SD 3.80, perfectly matching all existing figures and references.
- (gqur-301-u14-repair_en, repair_en, agy) Uncertain findings from review (render accessibility inspection, G1 status under D-2026-0070, and external source binding) remain open for an authorized evaluation session.
- (gqur-301-u14-fix, fix, codex) Existing academic findings still need author repair and fresh independent G3 review.
- (gqur-301-u14-fix, fix, codex) Existing academic findings still need author repair and fresh independent G3 review.


## Response snapshot

Merged origin/main into crew/gqur-301-u14-repair_en, resolved the tasks.md conflict keeping both sides' rows, regenerated content-status, and passed all content gates.

## Outcome

- Impact: fix for GQUR-301 Unit 14 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gqur-301-u14-repair_en, resolved the tasks.md conflict keeping both sides' rows, regenerated content-status, and passed all content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 14 G3 stays open/unticked; uncertain findings (render accessibility, G1 under D-2026-0070, external source binding) remain for an authorized evaluation session.
  - The merge pulled in main's geng-301 u03, gsos-301 u02 and gqur-301 u08 repairs; those are main's work, not this branch's.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
