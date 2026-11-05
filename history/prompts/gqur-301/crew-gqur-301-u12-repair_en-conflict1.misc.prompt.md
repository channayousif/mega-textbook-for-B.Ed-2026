---
id: crew-gqur-301-u12-repair_en-conflict1
title: crew fix GQUR-301 unit 12
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u12-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-12/topic-01.mdx
 - docs/semester-2/gqur-301/unit-12/topic-02.mdx
 - docs/semester-2/gqur-301/unit-12/unit-assessment.mdx
 - history/prompts/general/2454-gqur-301-unit-12-advisory-repairs.general.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u12-repair_en-conflict1.misc.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u12-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/unit-assessment.mdx
 - specs/content/gqur-301/reviews/unit-12/G2/20261105T145541931Z-gates.json
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261105T145541931Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261105T145541931Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261105T145541931Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261105T145541931Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261105T145541931Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261105T145541931Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261105T145541931Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261105T145541931Z/validate-content.txt
 - specs/content/gqur-301/reviews/unit-12/repair-20261105.md
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u12-repair_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u12-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gqur-301-u12-repair_en conflicts with main (specs/content/gqur-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GQUR-301 Unit 12 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-12/`.

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
- (gqur-301-u12-repair_en, repair_en, codex) G3 remains open; independent review still needs browser/print inspection, provenance and G1/source evidence.
- (gqur-301-u12-repair_en, repair_en, codex) G3 remains open; independent review still needs browser/print inspection, provenance and G1/source evidence.
- (gqur-301-u12-fix, fix, codex) G3 remains open; F1-F6 need separate author repair and fresh independent review.
- (gqur-301-u12-fix, fix, codex) G3 remains open; F1-F6 need separate author repair and fresh independent review.
- (gqur-301-u12-translate-r1, translate, opencode) `.ur.svg` figure variants for all 4 figures (fig-U12-1 concept-map, fig-U12-2 table, fig-U12-3 diagram, fig-U12-4 table) need a `generate-figures` Step 5 run before the unit can be flipped to `reviewed`  -  `<Figure src>` already points at the `.ur.svg` paths.


## Response snapshot

Merged origin/main into crew/gqur-301-u12-repair_en, resolved the tasks.md conflict by keeping both sides' rows, regenerated the stale content-status artifact, and committed the merge plus its PHR with all content gates passing.

## Outcome

- Impact: fix for GQUR-301 Unit 12 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gqur-301-u12-repair_en, resolved the tasks.md conflict by keeping both sides' rows, regenerated the stale content-status artifact, and committed the merge plus its PHR with all content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `static/content-status.json` is a gitignored artifact; regenerate it with `npm run build:content-status` if `check:content-status` fails on a fresh checkout.
  - Unit 12 G3 stays open/unticked; browser/print inspection, historical provenance, G1 and bound source evidence remain for the review host, and the 4 `.ur.svg` figure variants still need a `generate-figures` Step 5 run.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
