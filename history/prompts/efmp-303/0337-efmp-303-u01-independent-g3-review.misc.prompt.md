---
id: 0337
title: efmp-303-u01-independent-g3-review
stage: misc
date: 2026-10-18
surface: agent
model: gemini-3.8-flash-high
feature: efmp-303
branch: crew/efmp-303-u01-review_en
user: crew
command: agy -p "Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."
labels: ["crew", "reviewer", "g3", "review", "efmp-303", "agy"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/efmp-303/reviews/unit-01/G3/agent-g3-efmp-303-u1-run6844dc97.json
  - specs/content/efmp-303/reviews/unit-01/G3/agent-g3-efmp-303-u1-run6844dc97.summary.md
  - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/validate-content.log
  - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/check-depth-gate.log
  - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/check-figures.log
  - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/check-no-em-dash.log
  - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/check-no-answer-keys.log
  - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/check-docs-sync.log
  - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/figure-geometry.log
  - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/render-review.log
  - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/fig-U1-1.webp
  - specs/content/efmp-303/reviews/unit-01/crew-6844dc97/assessment-independent.md
  - history/prompts/efmp-303/0337-efmp-303-u01-independent-g3-review.misc.prompt.md
tests:
  - git merge origin/main
  - npm run check:content
  - node scripts/validate-content.mjs
  - node scripts/check-unit-depth.mjs
  - node scripts/check-figures.mjs
  - node scripts/check-no-em-dash.mjs
  - node scripts/check-no-answer-keys.mjs
  - node scripts/check-docs-sync.mjs
  - node scripts/measure-figure-text.mjs static/img/figures/efmp-303/unit-01/*.svg
  - node scripts/review-evidence.mjs validate specs/content/efmp-303/reviews/unit-01/G3/agent-g3-efmp-303-u1-run6844dc97.json
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Brief details:
- Act as the INDEPENDENT G3 English reviewer of EFMP-303 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md).
- Follow .claude/skills/review-unit/SKILL.md exactly.
- Scope: EFMP-303 Unit 1 only.
- Never edit content, never mark G3 done, never self-sign or use human initials.
- Produce evidence report, render inspections, deterministic gate logs, and advisory tracker row.
- Done when `npm run check:content` reports no finding that origin/main does not also report, work committed on branch with conventional commit, and final line is `CREW-SUMMARY: <what you changed, in one sentence>`.

## Response snapshot

- Merged `origin/main` to absorb the upstream fix for `glossary.json` syntax error (commit `c70ce2b2`), restoring `validate:content` and `npm run check:content` to green (all 13 content gates pass with zero errors).
- Executed full independent G3 review of EFMP-303 Unit 1:
  - Validated 104 input manifest hashes against working tree.
  - Independently solved all 10 MCQs with 10/10 agreement (1-B, 2-C, 3-B, 4-B, 5-B, 6-B, 7-B, 8-C, 9-B, 10-B), recorded working notes in `assessment-independent.md`.
  - Verified 10 RRQs and 5 ERQs (rubrics and Bloom cognitive demand Analyze or higher).
  - Verified 32 SVG variants across all 8 placed figures using `measure-figure-text.mjs` (0 text overflows).
  - Executed all required deterministic check scripts, capturing exit code 0 logs in `crew-6844dc97/`.
  - Produced `agent-g3-efmp-303-u1-run6844dc97.json` and validated structurally via `scripts/review-evidence.mjs validate`.
  - Recorded disposition `escalate` due to host constraints prohibiting dev server / build execution (`render-review` exit code 1) and G1 unit-spec intake status pending.
  - Formulated advisory tracker row for `tasks.md`.

## Handoff (for CEO and agents)

- Shipped: Validated G3 review evidence report `agent-g3-efmp-303-u1-run6844dc97.json`, summary, and deterministic check logs under `crew-6844dc97/`.
- Decisions: Disposition is `escalate` per `review-unit/SKILL.md` because brief constraints prohibit running `npm run build` or dev server for live-browser inspection; content and deterministic gates are otherwise completely clean.
- Pending: Live browser render inspection on a build-enabled host before certification; formal G1 board intake sign-off.
- Affected: EFMP-303 Unit 1 G3 review stage.
