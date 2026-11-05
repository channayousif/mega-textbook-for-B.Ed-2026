---
id: crew-efmp-406-u02-repair_en
title: crew repair_en EFMP-406 unit 2
stage: misc
date: 2026-11-03
surface: agent
model: claude
feature: efmp-406
branch: crew/efmp-406-u02-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-406/unit-02/topic-02.mdx
 - docs/semester-3/efmp-406/unit-02/unit-assessment.mdx
 - specs/content/efmp-406/reviews/unit-02/G2/20261103T180513037Z-gates.json
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261103T180513037Z/check-bloom-bands.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261103T180513037Z/check-concept-graph.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261103T180513037Z/check-depth-gate.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261103T180513037Z/check-docs-sync.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261103T180513037Z/check-figures.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261103T180513037Z/check-no-answer-keys.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261103T180513037Z/check-no-em-dash.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261103T180513037Z/validate-content.txt
 - specs/content/efmp-406/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u02-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u02-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-406/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-02/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/efmp-406/reviews/unit-02/G3/20261102T212207Z-g3-desk-e7c99b68.json` (disposition: revise). Resolve each one:
- [blocking] RRQ 2, 3 and 9 schemes reward unrequested additions or explanations. Align prompts and full-credit requirements as detailed in crew-review/findings.md.
- [advisory] Review Bloom demand/tag alignment for MCQ 4/8 and Topic 2.2 retrieval item 2 while respecting approved bands.
- [uncertain] Actual author run identity, parent-prepared handoff and exact deployed model version unavailable. Crew job identifies reviewer task, not host session ID. Independence provenance requires coordinator evidence.
- [uncertain] Primary-source support not independently verified from a bound passage bundle; provide frozen excerpts or complete authorised unavailable-source declarations.
- [uncertain] Actual narrow-screen and A4 print inspection plus SVG glyph geometry unavailable because brief prohibits builds and Playwright. Accessibility remains unverified.

## Notes from earlier jobs on this unit
- (efmp-406-u02-translate, translate, codex) English author must repair RRQ 2/3/9 before translation resumes; draft status and G3/G5 remain unchanged.
- (efmp-406-u02-translate, translate, codex) English author must repair RRQ 2/3/9 before translation resumes; draft status and G3/G5 remain unchanged.
- (efmp-406-u02-review_en, review_en, codex) G3 remains open: repair RRQ 2/3/9 marking alignment and supply source, run-provenance and browser/print evidence.
- (efmp-406-u02-review_en, review_en, codex) G3 remains open: repair RRQ 2/3/9 marking alignment and supply source, run-provenance and browser/print evidence.
- (efmp-406-u02-author-conflict5, fix, opencode) Unit 2 design files under `specs/content/efmp-406/design/` still bind to every unit's manifest (`unit-02-*` names miss the unit-scoping regex); Unit 5's G2 evidence was refreshed to absorb them, so the next Unit 2 addition there will re-invalidate other units' G2 evidence again.


## Response snapshot

Repaired the EFMP-406 Unit 2 RRQ 2/3/9 prompt and scheme mismatch and the MCQ 4/8 and Topic 2.2 Bloom alignment, refreshed the G2 evidence and added an unticked G3 "repairs applied" tracker row.

## Outcome

- Impact: repair_en for EFMP-406 Unit 2 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 12 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired the EFMP-406 Unit 2 RRQ 2/3/9 prompt and scheme mismatch and the MCQ 4/8 and Topic 2.2 Bloom alignment, refreshed the G2 evidence and added an unticked G3 "repairs applied" tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The source-excerpt bundle, author run provenance and the screen, print and SVG geometry checks are still open and need the coordinator and a host that can run a browser.
  - The questions and model answers changed in RRQ 2/3/9, MCQ 4/8 and Topic 2.2 check item 2, so the Urdu translation job should start from the repaired English, and a fresh independent G3 review must look at these new versions.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
