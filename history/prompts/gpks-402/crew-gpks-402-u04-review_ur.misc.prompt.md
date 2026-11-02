---
id: crew-gpks-402-u04-review_ur
title: crew review_ur GPKS-402 unit 4
stage: misc
date: 2026-11-02
surface: agent
model: claude
feature: gpks-402
branch: crew/gpks-402-u04-review_ur
user: crew
command: crew review_ur
labels: ["crew", "claude", "review_ur"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gpks-402/reviews/unit-04/G5/g5-claude-20261102T174837Z.json
 - specs/content/gpks-402/reviews/unit-04/G5/g5-claude-20261102T174837Z.summary.md
 - specs/content/gpks-402/reviews/unit-04/G5/logs-g5-claude-20261102T174837Z/check-content.txt
 - specs/content/gpks-402/reviews/unit-04/G5/logs-g5-claude-20261102T174837Z/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-04/G5/logs-g5-claude-20261102T174837Z/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-04/G5/logs-g5-claude-20261102T174837Z/check-figures.txt
 - specs/content/gpks-402/reviews/unit-04/G5/logs-g5-claude-20261102T174837Z/check-map-sources.txt
 - specs/content/gpks-402/reviews/unit-04/G5/logs-g5-claude-20261102T174837Z/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-04/G5/logs-g5-claude-20261102T174837Z/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-04/G5/logs-g5-claude-20261102T174837Z/exit-codes.txt
 - specs/content/gpks-402/reviews/unit-04/G5/logs-g5-claude-20261102T174837Z/fig-U4-6-ur-vs-withdrawn.txt
 - specs/content/gpks-402/reviews/unit-04/G5/logs-g5-claude-20261102T174837Z/render-review.txt
 - specs/content/gpks-402/reviews/unit-04/G5/logs-g5-claude-20261102T174837Z/validate-content.txt
 - specs/content/gpks-402/reviews/unit-04/G5/prep-g5-claude-20261102T174837Z/manifest.json
 - specs/content/gpks-402/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u04-review_ur

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u04-review_ur`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G5 Urdu reviewer of GPKS-402 Unit 4 (review-unit skill, .claude/agents/g5-reviewer.md). You did not translate this unit. Produce the evidence report and advisory tracker row. Never tick G5, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GPKS-402 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-04/`.

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

Added an unsigned advisory G5 escalate report, its evidence and a tracker note for GPKS-402 Unit 4, finding that the Urdu map is the withdrawn hand-drawn map and the regions table is missing, while the prose and assessment are faithful.

## Outcome

- Impact: review_ur for GPKS-402 Unit 4 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added an unsigned advisory G5 escalate report, its evidence and a tracker note for GPKS-402 Unit 4, finding that the Urdu map is the withdrawn hand-drawn map and the regions table is missing, while the prose and assessment are faithful.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The repair job must rebuild `fig-U4-6.ur.svg` and its dark version from the current English map (keep the boundary and disputed-territory notes), add `fig-U4-8.ur.svg` with a dark version at topic-03 after the coastal belt, and update the fig-U4-6 Urdu alt text. The English map itself still awaits owner sign-off (#369).
  - The next G5 attempt needs a host with a browser to view the pages at desktop, 360px and A4 print and to run `measure-figure-text`. The owner rulings on F4 (نگرانی) and F5 should come before the translator's wording pass.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
