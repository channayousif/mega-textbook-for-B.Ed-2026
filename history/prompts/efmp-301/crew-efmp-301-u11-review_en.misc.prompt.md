---
id: crew-efmp-301-u11-review_en
title: crew review_en EFMP-301 unit 11
stage: misc
date: 2026-10-27
surface: agent
model: codex
feature: efmp-301
branch: crew/efmp-301-u11-review_en
user: crew
command: crew review_en
labels: ["crew", "codex", "review_en"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261031-efmp301-unit11-g3-cycle2.general.prompt.md
 - specs/content/efmp-301/reviews/unit-11/G3/codex-cycle2-20261028-summary.md
 - specs/content/efmp-301/reviews/unit-11/G3/codex-cycle2-20261028.json
 - specs/content/efmp-301/reviews/unit-11/G3/codex-cycle2-20261028/assessment-and-repairs.md
 - specs/content/efmp-301/reviews/unit-11/G3/codex-cycle2-20261028/check-content-baseline.log
 - specs/content/efmp-301/reviews/unit-11/G3/codex-cycle2-20261028/check-content-final.log
 - specs/content/efmp-301/reviews/unit-11/G3/codex-cycle2-20261028/check-depth-gate.log
 - specs/content/efmp-301/reviews/unit-11/G3/codex-cycle2-20261028/check-docs-sync.log
 - specs/content/efmp-301/reviews/unit-11/G3/codex-cycle2-20261028/check-figures.log
 - specs/content/efmp-301/reviews/unit-11/G3/codex-cycle2-20261028/check-no-answer-keys.log
 - specs/content/efmp-301/reviews/unit-11/G3/codex-cycle2-20261028/check-no-em-dash.log
 - specs/content/efmp-301/reviews/unit-11/G3/codex-cycle2-20261028/commands.json
 - specs/content/efmp-301/reviews/unit-11/G3/codex-cycle2-20261028/manifest.json
 - specs/content/efmp-301/reviews/unit-11/G3/codex-cycle2-20261028/provenance.md
 - specs/content/efmp-301/reviews/unit-11/G3/codex-cycle2-20261028/render-limitation.md
 - specs/content/efmp-301/reviews/unit-11/G3/codex-cycle2-20261028/validate-content.log
 - specs/content/efmp-301/reviews/unit-11/G3/codex-cycle2-20261028/verify-manifest.log
 - specs/content/efmp-301/tasks.md
 - static/content-status.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u11-review_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u11-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-301 Unit 11 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 11 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-11/`.

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

Added the second-cycle advisory G3 report, verified prior repairs, preserved unresolved findings, and committed the evidence, tracker row and PHR.

## Outcome

- Impact: review_en for EFMP-301 Unit 11 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the second-cycle advisory G3 report, verified prior repairs, preserved unresolved findings, and committed the evidence, tracker row and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Owner escalation required for clinical source support, render evidence and review provenance; no automatic third cycle.
  - Owner escalation required for clinical source support, render evidence and review provenance; no automatic third cycle.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
