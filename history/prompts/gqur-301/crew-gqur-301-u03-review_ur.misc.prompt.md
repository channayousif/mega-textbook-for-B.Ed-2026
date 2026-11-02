---
id: crew-gqur-301-u03-review_ur
title: crew review_ur GQUR-301 unit 3
stage: misc
date: 2026-11-02
surface: agent
model: agy
feature: gqur-301
branch: crew/gqur-301-u03-review_ur
user: crew
command: crew review_ur
labels: ["crew", "agy", "review_ur"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gqur-301/reviews/unit-03/G5/aa728971-e15b-4b7e-9402-70a2f68221bd.json
 - specs/content/gqur-301/reviews/unit-03/G5/aa728971-e15b-4b7e-9402-70a2f68221bd.summary.md
 - specs/content/gqur-301/reviews/unit-03/G5/logs-aa728971/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-03/G5/logs-aa728971/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-03/G5/logs-aa728971/check-figures.txt
 - specs/content/gqur-301/reviews/unit-03/G5/logs-aa728971/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-03/G5/logs-aa728971/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-03/G5/logs-aa728971/exit-codes.txt
 - specs/content/gqur-301/reviews/unit-03/G5/logs-aa728971/independent-urdu-mcq-derivation.md
 - specs/content/gqur-301/reviews/unit-03/G5/logs-aa728971/measure-figure-text.txt
 - specs/content/gqur-301/reviews/unit-03/G5/logs-aa728971/render-review.txt
 - specs/content/gqur-301/reviews/unit-03/G5/logs-aa728971/validate-content.txt
 - specs/content/gqur-301/reviews/unit-03/G5/prep-aa728971/manifest.json
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u03-review_ur

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u03-review_ur`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G5 Urdu reviewer of GQUR-301 Unit 3 (review-unit skill, .claude/agents/g5-reviewer.md). You did not translate this unit. Produce the evidence report and advisory tracker row. Never tick G5, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-03/`.

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

Added an unsigned advisory G5 escalate report for GQUR-301 Unit 3 with its summary, logs and manifest, and recorded the advisory outcome in `tasks.md` leaving G5 open.

## Outcome

- Impact: review_ur for GQUR-301 Unit 3 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before commit.
- Files: 14 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added an unsigned advisory G5 escalate report for GQUR-301 Unit 3 with its summary, logs, independent MCQ derivation and manifest, and updated the open G5 row in `tasks.md`.
- Decisions the team must respect: G3/G5 remain advisory until qualified sign-off; no gate is marked done and nothing is certified.
- Pending / next owner: crew lead (auto-merge when CI is green).
- Notes for the next job on this unit:
  - Real browser visual inspection of Urdu pages (normal 1280px, narrow 360px viewport, and A4 print view) must be run on an authorised host with browser access before G5 certification.
  - The curriculum owner should review candidate terms in `concepts/unit-03.md` and harmonise `glossary.json` (which defines Statistic as شماریاتی عدد vs unit text شماریہ) before promoting into `terminology.csv`.
  - In `fig-U3-3`, the table graphic contains 5 method rows while caption and alt text mention quota sampling; owner/author may consider adding a quota sampling row during future revisions.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
