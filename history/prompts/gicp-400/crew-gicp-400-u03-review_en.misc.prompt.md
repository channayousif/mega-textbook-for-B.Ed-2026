---
id: crew-gicp-400-u03-review_en
title: crew review_en GICP-400 unit 3
stage: misc
date: 2026-11-06
surface: agent
model: agy
feature: gicp-400
branch: crew/gicp-400-u03-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gicp-400/crew-gicp-400-u03-review_en.misc.prompt.md
 - specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd.json
 - specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd/bundle/manifest.json
 - specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd/evidence/assessment.md
 - specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd/evidence/check-bloom-bands.txt
 - specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd/evidence/check-concept-graph.txt
 - specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd/evidence/check-content.txt
 - specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd/evidence/check-depth-gate.txt
 - specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd/evidence/check-docs-sync.txt
 - specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd/evidence/check-figures.txt
 - specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd/evidence/check-no-answer-keys.txt
 - specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd/evidence/check-no-em-dash.txt
 - specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd/evidence/input-verification.txt
 - specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd/evidence/render-review.txt
 - specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd/evidence/sources.md
 - specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd/evidence/validate-content.txt
 - specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd/summary.md
 - specs/content/gicp-400/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u03-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u03-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GICP-400 Unit 3 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-03/`.

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

Recorded independent G3 English advisory escalation review, evidence bundle, and unchecked tracker row for GICP-400 Unit 3.

## Outcome

- Impact: review_en for GICP-400 Unit 3 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded independent G3 English advisory escalation review, evidence bundle, and unchecked tracker row for GICP-400 Unit 3.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains open and advisory under escalate disposition due to unbound secondary source texts and execution prohibitions on browser/print inspection tooling.
  - Live browser rendering (360px viewport, table scrolling, A4 print) and SVG text-geometry validation must be executed on a host permitted to run Chromium.
  - Journal articles Abbas (2023) and Shah (2026) full texts should be bound in the repository or declared under unverifiable sources.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
