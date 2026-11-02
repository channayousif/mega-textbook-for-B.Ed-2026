---
id: crew-gpks-402-u05-review_ur
title: crew review_ur GPKS-402 unit 5
stage: misc
date: 2026-11-02
surface: agent
model: longcat
feature: gpks-402
branch: crew/gpks-402-u05-review_ur
user: crew
command: crew review_ur
labels: ["crew", "opencode", "review_ur"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: specs/014-agent-review-governance/contracts/review-evidence.md
  pr: null
files:
 - history/prompts/gpks-402/crew-gpks-402-u05-review_ur.misc.prompt.md
 - specs/content/gpks-402/reviews/unit-05/G5/g5-claude-20261102T183940Z.json
 - specs/content/gpks-402/reviews/unit-05/G5/g5-claude-20261102T183940Z.summary.md
 - specs/content/gpks-402/reviews/unit-05/G5/prep-g5-claude-20261102T180309Z/manifest.json
 - specs/content/gpks-402/reviews/unit-05/G5/logs-g5-claude-20261102T183940Z/check-content.txt
 - specs/content/gpks-402/reviews/unit-05/G5/logs-g5-claude-20261102T183940Z/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-05/G5/logs-g5-claude-20261102T183940Z/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-05/G5/logs-g5-claude-20261102T183940Z/check-figures.txt
 - specs/content/gpks-402/reviews/unit-05/G5/logs-g5-claude-20261102T183940Z/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-05/G5/logs-g5-claude-20261102T183940Z/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-05/G5/logs-g5-claude-20261102T183940Z/exit-codes.txt
 - specs/content/gpks-402/reviews/unit-05/G5/logs-g5-claude-20261102T183940Z/measure-figure-text.txt
 - specs/content/gpks-402/reviews/unit-05/G5/logs-g5-claude-20261102T183940Z/render-review.txt
 - specs/content/gpks-402/reviews/unit-05/G5/logs-g5-claude-20261102T183940Z/validate-content.txt
 - specs/content/gpks-402/reviews/unit-05/G5/renders-g5-claude-20261102T183940Z/fig-U5-1.ur.png
 - specs/content/gpks-402/reviews/unit-05/G5/renders-g5-claude-20261102T183940Z/fig-U5-2.ur.png
 - specs/content/gpks-402/reviews/unit-05/G5/renders-g5-claude-20261102T183940Z/fig-U5-3.ur.png
 - specs/content/gpks-402/reviews/unit-05/G5/renders-g5-claude-20261102T183940Z/fig-U5-4.ur.png
 - specs/content/gpks-402/tasks.md
tests:
 - npm run check:content
 - node scripts/review-evidence.mjs validate specs/content/gpks-402/reviews/unit-05/G5/g5-claude-20261102T183940Z.json
---

## Prompt

# Crew job gpks-402-u05-review_ur

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u05-review_ur`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G5 Urdu reviewer of GPKS-402 Unit 5 (review-unit skill, .claude/agents/g5-reviewer.md). You did not translate this unit. Produce the evidence report and advisory tracker row. Never tick G5, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GPKS-402 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-05/`.

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

Executed independent G5 Urdu review of GPKS-402 Unit 5 with advisory escalate disposition, recorded the validated report, evidence logs and fallback figure renders, and appended an advisory open tracker row to tasks.md.

## Outcome

- Impact: review_ur for GPKS-402 Unit 5 by opencode (attempt 2, continuing the prepared bundle from attempt 1).
- Tests: npm run check:content passed (13/13); node scripts/review-evidence.mjs validate passed (escalate).
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Independent G5 Urdu review of GPKS-402 Unit 5. Report at specs/content/gpks-402/reviews/unit-05/G5/g5-claude-20261102T183940Z.json (disposition escalate, validated). Advisory open tracker row appended to specs/content/gpks-402/tasks.md; G5 stays open per ADR-0019.
- Decisions the team must respect: unsigned advisory only; nothing certified, signed, merged or published. The G3 dependency is the human desk record 20261102T140729Z-g3-desk-e7015f81.json, which binds the same English digests.
- Pending / next owner: a host with browser access must complete normal, narrow-viewport and A4 print inspection (F1 blocking). The translator or owner must resolve F2-F6 and F8-F10, or rule on F2/F3, then a fresh independent reviewer rechecks.
- Notes for the next job on this unit:
  - All mandatory deterministic gates pass, including measure-figure-text on all 16 SVG variants; the four-page mirror, headings, tables, components and 50 assessment items align one-to-one.
  - F2 (better value rendered cheaper), F3 (learning-outcome terminology drift), F4 (3, 3 نمبر typo), F5 (MCQ marks phrasing), F6 (fig-U5-4 traditions cell), F8 (share versus growth rate), F9 (workshop rendered دکان), F10 (added chart or).
  - static/content-status.json is a gitignored generated file; it was refreshed locally with npm run build:content-status so check:content passes, but it is not part of this commit.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt left only the prepared manifest and an empty logs directory.
- Graders run and results (PASS/FAIL): check:content PASS; review-evidence validate PASS (escalate).
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
