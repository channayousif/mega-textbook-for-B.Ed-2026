---
id: crew-geng-301-u05-repair_en
title: crew repair_en GENG-301 unit 5
stage: misc
date: 2026-11-03
surface: agent
model: codex
feature: geng-301
branch: crew/geng-301-u05-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
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

# Crew job geng-301-u05-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/geng-301/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

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

## Open findings from the latest G3 report
From `specs/content/geng-301/reviews/unit-05/G3/20261102T212207Z-g3-desk-0ea60289.json` (disposition: revise). Resolve each one:
- [blocking] Content findings 1-6 in specs/content/geng-301/reviews/unit-05/G3/20261019-codex-review/summary.md#blocking-content-findings require author repairs.
- [uncertain] Author run identity and parent-prepared handoff missing; local diagnostic manifest cannot establish full provenance. Required current rendered desktop/narrow/A4 inspection unavailable because brief forbids rebuilding or serving. See summary.

## Notes from earlier jobs on this unit
- (geng-301-u05-fix, fix, opencode) G3 review remains incomplete; a fresh G3 run is needed after this figure-geometry repair. G4/G5/G6/G7 are untouched.
- (geng-301-u05-review_en-conflict2, fix, codex) G3 remains incomplete; author repairs, provenance and rendered inspection remain pending.
- (geng-301-u05-review_en-conflict2, fix, codex) G3 remains incomplete; author repairs, provenance and rendered inspection remain pending.
- (geng-301-u05-review_en-conflict1, fix, codex) G3 remains incomplete; earlier author repairs, provenance and rendered inspection remain pending.
- (geng-301-u05-review_en-conflict1, fix, codex) G3 remains incomplete; earlier author repairs, provenance and rendered inspection remain pending.


## Response snapshot

Repaired Unit 5 evidence, assessment, register guidance, figure labels and sequencing, appended the advisory G3 row, and refreshed G2 evidence.

## Outcome

- Impact: repair_en for GENG-301 Unit 5 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired Unit 5 evidence, assessment, register guidance, figure labels and sequencing, appended the advisory G3 row, and refreshed G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains open; original provenance, SVG geometry and desktop/narrow/A4 inspection need an authorised host.
  - G3 remains open; original provenance, SVG geometry and desktop/narrow/A4 inspection need an authorised host.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
