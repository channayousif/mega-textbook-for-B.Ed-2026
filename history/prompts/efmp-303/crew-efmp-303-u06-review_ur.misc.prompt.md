---
id: crew-efmp-303-u06-review_ur
title: crew review_ur EFMP-303 unit 6
stage: misc
date: 2026-11-02
surface: agent
model: claude
feature: efmp-303
branch: crew/efmp-303-u06-review_ur
user: crew
command: crew review_ur
labels: ["crew", "claude", "review_ur"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-303/reviews/unit-06/G5/claude-session-a2c8ddac-e057-4a8a-967b-505507f1979e.json
 - specs/content/efmp-303/reviews/unit-06/G5/claude-session-a2c8ddac-e057-4a8a-967b-505507f1979e.summary.md
 - specs/content/efmp-303/reviews/unit-06/G5/crew-20261102/manifest.json
 - specs/content/efmp-303/reviews/unit-06/G5/logs-crew-20261102/check-depth-gate.log
 - specs/content/efmp-303/reviews/unit-06/G5/logs-crew-20261102/check-docs-sync.log
 - specs/content/efmp-303/reviews/unit-06/G5/logs-crew-20261102/check-figures.log
 - specs/content/efmp-303/reviews/unit-06/G5/logs-crew-20261102/check-no-answer-keys.log
 - specs/content/efmp-303/reviews/unit-06/G5/logs-crew-20261102/check-no-em-dash.log
 - specs/content/efmp-303/reviews/unit-06/G5/logs-crew-20261102/independent-urdu-mcq-derivation.md
 - specs/content/efmp-303/reviews/unit-06/G5/logs-crew-20261102/render-review.log
 - specs/content/efmp-303/reviews/unit-06/G5/logs-crew-20261102/validate-content.log
 - specs/content/efmp-303/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u06-review_ur

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u06-review_ur`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G5 Urdu reviewer of EFMP-303 Unit 6 (review-unit skill, .claude/agents/g5-reviewer.md). You did not translate this unit. Produce the evidence report and advisory tracker row. Never tick G5, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-06/`.

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

Added an independent advisory G5 escalation report, gate logs, summary and unticked tracker row for EFMP-303 Unit 6 Urdu, with no content changes.

## Outcome

- Impact: review_ur for EFMP-303 Unit 6 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 12 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added an independent advisory G5 escalation report, gate logs, summary and unticked tracker row for EFMP-303 Unit 6 Urdu, with no content changes.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The register repair list in the G5 report JSON (the blocking finding) needs a translator pass. Fix `fig-U6-3/4/6.ur.svg` so "Feedback" reads "فیڈبیک" and "Evidence" reads "شہادت" as in the text, then regenerate the dark variants and run `measure-figure-text.mjs`.
  - The next G5 needs a main-session browser check of all six Urdu pages and the 12 Urdu SVG variants (desktop, narrow, A4). It also needs a signed G3 or an owner path for the human CMY G3. This was repair cycle 1 of 2.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
