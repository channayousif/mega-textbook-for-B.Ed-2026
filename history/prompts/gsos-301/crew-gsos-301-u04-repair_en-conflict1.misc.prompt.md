---
id: crew-gsos-301-u04-repair_en-conflict1
title: crew fix GSOS-301 unit 4
stage: misc
date: 2026-11-06
surface: agent
model: opencode
feature: gsos-301
branch: crew/gsos-301-u04-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gsos-301/unit-04/unit-assessment.mdx
 - docs/semester-2/gsos-301/unit-04/unit-teacher-notes.mdx
 - history/prompts/gsos-301/crew-gsos-301-u04-repair_en-conflict1.misc.prompt.md
 - history/prompts/gsos-301/crew-gsos-301-u04-repair_en.misc.prompt.md
 - specs/content/gsos-301/coverage/unit-04.md
 - specs/content/gsos-301/reviews/unit-04/G2/20261105T174150992Z-gates.json
 - specs/content/gsos-301/reviews/unit-04/G2/logs-20261105T174150992Z/check-bloom-bands.txt
 - specs/content/gsos-301/reviews/unit-04/G2/logs-20261105T174150992Z/check-concept-graph.txt
 - specs/content/gsos-301/reviews/unit-04/G2/logs-20261105T174150992Z/check-depth-gate.txt
 - specs/content/gsos-301/reviews/unit-04/G2/logs-20261105T174150992Z/check-docs-sync.txt
 - specs/content/gsos-301/reviews/unit-04/G2/logs-20261105T174150992Z/check-figures.txt
 - specs/content/gsos-301/reviews/unit-04/G2/logs-20261105T174150992Z/check-no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-04/G2/logs-20261105T174150992Z/check-no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-04/G2/logs-20261105T174150992Z/validate-content.txt
 - specs/content/gsos-301/sources/unit-04.md
 - specs/content/gsos-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u04-repair_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u04-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gsos-301-u04-repair_en conflicts with main (specs/content/gsos-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GSOS-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-04/`.

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
- (gsos-301-u04-repair_en, repair_en, opencode) G3 remains unticked; P1 author-run provenance and X1 browser/print render inspection stay open because the brief prohibits build/server/browser.
- (gsos-301-u04-repair_en, repair_en, opencode) content-spec.md's introductory "Status is draft" paragraph still conflicts with its approved frontmatter; it is an approved spec, so it is an owner edit outside this job's scope.
- (gsos-301-u04-repair_en, repair_en, opencode) No Urdu mirror exists for Unit 4, so G4 stays blocked until a fresh independent G3 confirms these repairs.
- (gsos-301-u04-fix, fix, opencode) Unit 4 G3 en-review is stale and needs a fresh run; G4 translation remains blocked per earlier jobs' assessment/coverage notes.
- (gsos-301-u04-translate-r1, translate, codex) Separate English author must repair assessment and coverage findings before G4 resumes.


## Response snapshot

Merged origin/main into crew/gsos-301-u04-repair_en, resolved the tasks.md conflict by keeping both sides' G3 rows (main's Unit 3 and Unit 5, then this branch's Unit 4), regenerated the stale static/content-status.json, and committed the merge plus PHR with all content gates passing.

## Outcome

- Impact: fix for GSOS-301 Unit 4 by opencode (attempt 1).
- Tests: npm run check:content passed (14/14 content gates).
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gsos-301-u04-repair_en, resolved the tasks.md conflict by keeping both sides' G3 rows (main's Unit 3 and Unit 5, then this branch's Unit 4), regenerated the stale static/content-status.json, and committed the merge plus PHR with all content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains unticked; P1 author-run provenance and X1 browser/print render inspection stay open because the brief prohibits build/server/browser.
  - content-spec.md's introductory "Status is draft" paragraph still conflicts with its approved frontmatter; it is an approved spec, so it is an owner edit outside this job's scope.
  - No Urdu mirror exists for Unit 4, so G4 stays blocked until a fresh independent G3 confirms these repairs.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
