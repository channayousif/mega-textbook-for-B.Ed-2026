---
id: crew-efmp-301-u06-review_en
title: crew review_en EFMP-301 unit 6
stage: misc
date: 2026-10-27
surface: agent
model: agy
feature: efmp-301
branch: crew/efmp-301-u06-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-review-pipeline.md
  pr: null
files:
  - specs/content/efmp-301/reviews/unit-06/G3/20f4255e-9449-4f10-a771-4653e5eee5e5.json
  - specs/content/efmp-301/reviews/unit-06/G3/20f4255e-9449-4f10-a771-4653e5eee5e5.summary.md
  - specs/content/efmp-301/reviews/unit-06/G3/logs-20f4255e/check-depth-gate.txt
  - specs/content/efmp-301/reviews/unit-06/G3/logs-20f4255e/check-docs-sync.txt
  - specs/content/efmp-301/reviews/unit-06/G3/logs-20f4255e/check-figures.txt
  - specs/content/efmp-301/reviews/unit-06/G3/logs-20f4255e/check-no-answer-keys.txt
  - specs/content/efmp-301/reviews/unit-06/G3/logs-20f4255e/check-no-em-dash.txt
  - specs/content/efmp-301/reviews/unit-06/G3/logs-20f4255e/measure-figure-text.txt
  - specs/content/efmp-301/reviews/unit-06/G3/logs-20f4255e/render-review.txt
  - specs/content/efmp-301/reviews/unit-06/G3/logs-20f4255e/validate-content.txt
  - specs/content/efmp-301/reviews/unit-06/G3/renders-20f4255e/fig-U6-1.png
  - specs/content/efmp-301/reviews/unit-06/G3/renders-20f4255e/fig-U6-2.png
  - specs/content/efmp-301/reviews/unit-06/G3/renders-20f4255e/fig-U6-3.png
  - specs/content/efmp-301/reviews/unit-06/G3/renders-20f4255e/fig-U6-4.png
  - specs/content/efmp-301/reviews/unit-06/G3/run-002/manifest.json
  - specs/content/efmp-301/tasks.md
  - static/content-status.json
tests:
  - npm run check:content
  - node scripts/review-evidence.mjs validate specs/content/efmp-301/reviews/unit-06/G3/20f4255e-9449-4f10-a771-4653e5eee5e5.json
---

## Prompt

# Crew job efmp-301-u06-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u06-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-301 Unit 6 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-06/`.

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

Completed the independent G3 English cycle 2 review of EFMP-301 Unit 6 (Motivation and Emotion). Verified that round-1 repairs resolved the blocking false cross-reference and prior citation discrepancies. Generated the validated G3 review evidence report, execution logs, Sharp PNG renders, human-readable summary, and recorded the advisory G3 tracker row in tasks.md with all content gates passing.

## Outcome

- Impact: Independent G3 English review (Cycle 2) for EFMP-301 Unit 6 with disposition pass.
- Tests: `npm run check:content` (13 gates) and `node scripts/review-evidence.mjs validate` passed.
- Files: 18 files (evidence report, summary, logs, renders, manifest, tasks.md, content-status.json, PHR).
- Next prompts: Crew board schedules next stage based on tasks.md.
- Reflection: Verified that all round-1 blocking findings were resolved in commit 3782e123 while carrying forward 8 non-blocking advisory findings.

## Handoff (for CEO and agents)

- Shipped / changed: G3 Cycle 2 evidence report (disposition: pass) at `specs/content/efmp-301/reviews/unit-06/G3/20f4255e-9449-4f10-a771-4653e5eee5e5.json` and advisory tracker row in `specs/content/efmp-301/tasks.md`.
- Decisions the team must respect: G3 remains open (▢) and advisory under ADR-0019 until qualified sign-off; no reviewer initials added.
- Pending / next owner: G5 Urdu review or crew planner.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none; verified no em dashes (U+2014) in authored files.
- Graders run and results (PASS/FAIL): check:content PASS, review-evidence validate PASS.
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): none.
