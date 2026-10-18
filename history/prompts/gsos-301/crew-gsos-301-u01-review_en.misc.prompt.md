---
id: crew-gsos-301-u01-review_en
title: crew review_en GSOS-301 unit 1
stage: misc
date: 2026-10-18
surface: agent
model: agy
feature: gsos-301
branch: crew/gsos-301-u01-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gsos-301/crew-gsos-301-u01-review_en.misc.prompt.md
 - specs/content/gsos-301/reviews/unit-01/G3/7725a4f0-f3eb-4a48-aed1-23a2605c30d8.json
 - specs/content/gsos-301/reviews/unit-01/G3/7725a4f0-f3eb-4a48-aed1-23a2605c30d8.summary.md
 - specs/content/gsos-301/reviews/unit-01/G3/logs-7725a4f0/check:depth-gate.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-7725a4f0/check:docs-sync.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-7725a4f0/check:figures.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-7725a4f0/check:no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-7725a4f0/check:no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-7725a4f0/fig-U1-1-render.png
 - specs/content/gsos-301/reviews/unit-01/G3/logs-7725a4f0/independent-assessment-derivation.md
 - specs/content/gsos-301/reviews/unit-01/G3/logs-7725a4f0/measure-fig-U1-1.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-7725a4f0/measure-fig-U1-2.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-7725a4f0/measure-fig-U1-3.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-7725a4f0/measure-fig-U1-4.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-7725a4f0/measure-fig-U1-5.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-7725a4f0/measure-fig-U1-6.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-7725a4f0/render-review.txt
 - specs/content/gsos-301/reviews/unit-01/G3/logs-7725a4f0/validate:content.txt
 - specs/content/gsos-301/reviews/unit-01/G3/manifest.json
 - specs/content/gsos-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u01-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u01-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of GSOS-301 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.


## Response snapshot

Executed independent G3 English review of GSOS-301 Unit 1, producing validated revise evidence report, visual render evidence, assessment derivation, and tasks.md advisory tracker record.

## Outcome

- Impact: review_en for GSOS-301 Unit 1 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Executed independent G3 English review of GSOS-301 Unit 1, producing validated revise evidence report, visual render evidence, assessment derivation, and tasks.md advisory tracker record.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Figure text geometry overflows right edge on all 6 SVGs and dark variants; fix by adding text-anchor: end; to .wm class and re-wrapping long cell lines in fig-U1-4 and fig-U1-6.
  - In topic-01..03 prose and Further reading, replace phantom citations to Henson (2022) with Hammond & Cheney (n.d.) and Givens & White (2023) with Conerly et al. (2021).
  - Unit 1 G3 review disposition is revise; tasks.md advisory row references the validated report at specs/content/gsos-301/reviews/unit-01/G3/7725a4f0-f3eb-4a48-aed1-23a2605c30d8.json.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
