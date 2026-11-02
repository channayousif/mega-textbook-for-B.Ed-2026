---
id: crew-gpks-402-u02-review_en
title: crew review_en GPKS-402 unit 2
stage: misc
date: 2026-10-30
surface: agent
model: codex
feature: gpks-402
branch: crew/gpks-402-u02-review_en
user: crew
command: crew review_en
labels: ["crew", "codex", "review_en"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261039-gpks402-unit-two-g3-advisory.general.prompt.md
 - specs/content/gpks-402/reviews/unit-02/G3/01a18cbc-8067-7f42-995a-419ce6765add.json
 - specs/content/gpks-402/reviews/unit-02/G3/01a18cbc-8067-7f42-995a-419ce6765add.summary.md
 - specs/content/gpks-402/reviews/unit-02/G3/crew-20261028/logs/check-content.txt
 - specs/content/gpks-402/reviews/unit-02/G3/crew-20261028/manifest.json
 - specs/content/gpks-402/reviews/unit-02/G3/crew-20261030/archive-diagnostic-check-content.txt
 - specs/content/gpks-402/reviews/unit-02/G3/crew-20261030/baseline-note.md
 - specs/content/gpks-402/reviews/unit-02/G3/crew-20261030/check-content.txt
 - specs/content/gpks-402/reviews/unit-02/G3/crew-20261030/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-02/G3/crew-20261030/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-02/G3/crew-20261030/check-figures.txt
 - specs/content/gpks-402/reviews/unit-02/G3/crew-20261030/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-02/G3/crew-20261030/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-02/G3/crew-20261030/commands.json
 - specs/content/gpks-402/reviews/unit-02/G3/crew-20261030/final-check-content.txt
 - specs/content/gpks-402/reviews/unit-02/G3/crew-20261030/inspection.md
 - specs/content/gpks-402/reviews/unit-02/G3/crew-20261030/manifest.json
 - specs/content/gpks-402/reviews/unit-02/G3/crew-20261030/report-validation.txt
 - specs/content/gpks-402/reviews/unit-02/G3/crew-20261030/validate-content.txt
 - specs/content/gpks-402/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u02-review_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u02-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GPKS-402 Unit 2 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GPKS-402 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-02/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Feedback from the previous attempt
worker exited 1:
Permission deny rule (.claude/settings.json): Write(video-studio/episodes/**/approvals.jsonl) is not matched by file permission checks  -  only Edit(path) rules are. Use Edit(video-studio/episodes/**/approvals.jsonl) instead (Edit rules cover all file-editing tools).
You've hit your 5-hour limit · resets 7:10pm (Etc/GMT-5)



## Response snapshot

Added Unit 2 advisory G3 escalation evidence, an open tracker row and the required PHR.

## Outcome

- Impact: review_en for GPKS-402 Unit 2 by codex (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added Unit 2 advisory G3 escalation evidence, an open tracker row and the required PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Repair recorded assessment and chronology defects, then obtain fresh review with verified sources, provenance and screen/print inspection.
  - Repair recorded assessment and chronology defects, then obtain fresh review with verified sources, provenance and screen/print inspection.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
