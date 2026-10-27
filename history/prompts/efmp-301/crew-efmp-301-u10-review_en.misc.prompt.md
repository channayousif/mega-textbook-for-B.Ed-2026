---
id: crew-efmp-301-u10-review_en
title: crew review_en EFMP-301 unit 10
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: efmp-301
branch: crew/efmp-301-u10-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-301/reviews/unit-10/G3/agent-g3-efmp301-u10-run002.json
  - specs/content/efmp-301/reviews/unit-10/G3/logs-agent-g3-efmp301-u10-run002/check-bloom-bands.log
  - specs/content/efmp-301/reviews/unit-10/G3/logs-agent-g3-efmp301-u10-run002/check-concept-graph.log
  - specs/content/efmp-301/reviews/unit-10/G3/logs-agent-g3-efmp301-u10-run002/check-depth-gate.log
  - specs/content/efmp-301/reviews/unit-10/G3/logs-agent-g3-efmp301-u10-run002/check-docs-sync.log
  - specs/content/efmp-301/reviews/unit-10/G3/logs-agent-g3-efmp301-u10-run002/check-figures.log
  - specs/content/efmp-301/reviews/unit-10/G3/logs-agent-g3-efmp301-u10-run002/check-no-answer-keys.log
  - specs/content/efmp-301/reviews/unit-10/G3/logs-agent-g3-efmp301-u10-run002/check-no-em-dash.log
  - specs/content/efmp-301/reviews/unit-10/G3/logs-agent-g3-efmp301-u10-run002/check-source-floor.log
  - specs/content/efmp-301/reviews/unit-10/G3/logs-agent-g3-efmp301-u10-run002/figures-variants-check.log
  - specs/content/efmp-301/reviews/unit-10/G3/logs-agent-g3-efmp301-u10-run002/independent-assessment-derivation.md
  - specs/content/efmp-301/reviews/unit-10/G3/logs-agent-g3-efmp301-u10-run002/manifest-verify.log
  - specs/content/efmp-301/reviews/unit-10/G3/logs-agent-g3-efmp301-u10-run002/measure-figure-text.log
  - specs/content/efmp-301/reviews/unit-10/G3/logs-agent-g3-efmp301-u10-run002/render-review.log
  - specs/content/efmp-301/reviews/unit-10/G3/logs-agent-g3-efmp301-u10-run002/validate-content.log
  - specs/content/efmp-301/reviews/unit-10/G3/logs-agent-g3-efmp301-u10-run002/fig-U10-1-render.png
  - specs/content/efmp-301/reviews/unit-10/G3/logs-agent-g3-efmp301-u10-run002/fig-U10-2-render.png
  - specs/content/efmp-301/reviews/unit-10/G3/logs-agent-g3-efmp301-u10-run002/fig-U10-3-render.png
  - specs/content/efmp-301/reviews/unit-10/G3/logs-agent-g3-efmp301-u10-run002/fig-U10-4-render.png
  - specs/content/efmp-301/reviews/unit-10/G3/summary-run002.txt
  - specs/content/efmp-301/tasks.md
  - static/content-status.json
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-301-u10-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u10-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-301 Unit 10 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 10 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-10/`.

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

Completed the second and final independent G3 English review cycle for EFMP-301 Unit 10 under ADR-0019. Verified that all four blocking findings from run001 (assessment blueprint balance, teacher notes guide misattribution, fig-U10-1 header guide misattribution, fig-U10-4 text-overprint) were repaired at commit 2e19d4d8. Generated run002 evidence artifacts, raster renders, and validated report with disposition pass. Recorded advisory tracker row in specs/content/efmp-301/tasks.md and refreshed static/content-status.json.

## Outcome

- Impact: review_en for EFMP-301 Unit 10 by agy (round 2 of 2, pass disposition).
- Tests: npm run check:content passed in the job worktree before commit.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge (unit awaits human G3 sign-off).
- Reflection: none.

## Handoff (for CEO and agents)

- Shipped / changed: Produced G3 review run002 evidence, rendered PNG figures, validated report agent-g3-efmp301-u10-run002.json (disposition pass), and advisory tracker row in tasks.md.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead / board for human G3 sign-off (ADR-0019 / ADR-0032).
- Paperclip issues affected: none (Paperclip paused; work tracked by crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
