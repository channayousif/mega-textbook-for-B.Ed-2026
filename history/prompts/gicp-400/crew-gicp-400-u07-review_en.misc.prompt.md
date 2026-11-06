---
id: crew-gicp-400-u07-review_en
title: crew review_en GICP-400 unit 7
stage: misc
date: 2026-11-06
surface: agent
model: claude
feature: gicp-400
branch: crew/gicp-400-u07-review_en
user: crew
command: crew review_en
labels: ["crew", "claude", "review_en"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261140-gicp400-unit-seven-g3-review.general.prompt.md
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0.json
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/bundle/manifest.json
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/evidence/assessment-derived-before-key.md
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/evidence/assessment.md
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/evidence/check-content.txt
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/evidence/check-depth-gate.txt
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/evidence/check-docs-sync.txt
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/evidence/check-figures.txt
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/evidence/check-no-answer-keys.txt
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/evidence/check-no-em-dash.txt
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/evidence/dean-term-search.txt
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/evidence/fig-U7-1.sharp.png
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/evidence/fig-U7-2.sharp.png
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/evidence/fig-U7-3.sharp.png
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/evidence/figure-raster.txt
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/evidence/figure-var-audit.txt
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/evidence/input-verification.txt
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/evidence/render-review.txt
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/evidence/sources.md
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/evidence/validate-content.txt
 - specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0/summary.md
 - specs/content/gicp-400/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u07-review_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u07-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GICP-400 Unit 7 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-07/`.

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

Recorded an independent advisory G3 escalation for GICP-400 Unit 7 (report, evidence, summary, tracker row and PHR) with 10 blocking findings, leaving G3 open and unsigned and unit content unchanged.

## Outcome

- Impact: review_en for GICP-400 Unit 7 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 23 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded an independent advisory G3 escalation for GICP-400 Unit 7 (report, evidence, summary, tracker row and PHR) with 10 blocking findings, leaving G3 open and unsigned and unit content unchanged.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Repair needs the actual Dean text (ecommons.aku.edu PDF) and Kennedy text (mdpi.com/2227-7102/2/3/121); do not reuse `sources/texts/dean-2005-citizenship.md`, whose second paragraph is the root of the misattribution.
  - The Article 251 fix also touches the `fig-U7-3` label and dark variant plus RRQ 5 and 7 models, and `fig-U7-1` needs its label moved; run `measure-figure-text` where Chromium is allowed.
  - The ideology strand awaits an owner ruling; browser and A4 inspection are still outstanding, and this was review round 1 of ADR-0019's limit of 2.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
