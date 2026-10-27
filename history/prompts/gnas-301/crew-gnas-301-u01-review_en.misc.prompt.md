---
id: crew-gnas-301-u01-review_en
title: crew review_en GNAS-301 unit 1
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: gnas-301
branch: crew/gnas-301-u01-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/gnas-301/crew-gnas-301-u01-review_en.misc.prompt.md
  - specs/content/gnas-301/reviews/unit-01/G3/12ce2621-624d-4c79-bf71-dbaccdf17ac2.json
  - specs/content/gnas-301/reviews/unit-01/G3/logs-12ce2621/check-content.txt
  - specs/content/gnas-301/reviews/unit-01/G3/logs-12ce2621/check-depth-gate.txt
  - specs/content/gnas-301/reviews/unit-01/G3/logs-12ce2621/check-docs-sync.txt
  - specs/content/gnas-301/reviews/unit-01/G3/logs-12ce2621/check-figures.txt
  - specs/content/gnas-301/reviews/unit-01/G3/logs-12ce2621/check-no-answer-keys.txt
  - specs/content/gnas-301/reviews/unit-01/G3/logs-12ce2621/check-no-em-dash.txt
  - specs/content/gnas-301/reviews/unit-01/G3/logs-12ce2621/measure-figure-text.txt
  - specs/content/gnas-301/reviews/unit-01/G3/logs-12ce2621/render-review.txt
  - specs/content/gnas-301/reviews/unit-01/G3/logs-12ce2621/validate-content.txt
  - specs/content/gnas-301/reviews/unit-01/G3/summary.md
  - specs/content/gnas-301/tasks.md
  - static/content-status.json
tests:
  - npm run check:content
---

## Prompt

# Crew job gnas-301-u01-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u01-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GNAS-301 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GNAS-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Response snapshot

Executed independent second-cycle G3 review of GNAS-301 Unit 1 with advisory escalate disposition, verified resolution of prior round-2 findings, recorded contract evidence and logs, and updated tasks.md with G3 unticked.

## Outcome

- Impact: review_en for GNAS-301 Unit 1 by agy (Cycle 2, ADR-0019).
- Tests: npm run check:content passed in the job worktree.
- Files: 14 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Executed independent G3 review of GNAS-301 Unit 1 with advisory escalate disposition, validated report JSON against review evidence contract, recorded command execution logs, and appended advisory row to tasks.md with G3 open.
- Decisions the team must respect: G3 stays open (`▢`) without reviewer initials or certification (ADR-0019).
- Pending / next owner: graphics/figure repair pass for SVG text geometry adjustments on Unit 1 figures, followed by permitted visual render inspection.
- Notes for the next job on this unit:
  - Measure-figure-text reports 10 text geometry defects across fig-U1-2, fig-U1-3.ur, fig-U1-6, and fig-U1-8 (spilling out of panels, overlapping text, and wordmark overprint); adjust text/panel coordinates in SVGs so measure-figure-text exits 0.
  - Live 360px viewport, table horizontal scrolling, and A4 print view require inspection under permitted browser tools before formal G3 certification.
  - who-water-2023.md:18 heading retains legacy Unit 2 label to avoid invalidating Unit 2 G2 evidence; make unit-neutral when Unit 2 evidence is refreshed.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
