---
id: 0171
title: efmp-304-u01-independent-g3-review
stage: misc
date: 2026-10-17
surface: agent
model: gemini-3.8-flash-high
feature: efmp-304
branch: crew/efmp-304-u01-review_en
user: crew
command: agy -p "Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."
labels: ["crew", "reviewer", "g3", "review", "efmp-304", "agy"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/efmp-304/reviews/unit-01/G3/manifest.json
  - specs/content/efmp-304/reviews/unit-01/G3/agent-g3-efmp-304-u1-run5e4cc29c.json
  - specs/content/efmp-304/reviews/unit-01/logs-5e4cc29c/validate-content.log
  - specs/content/efmp-304/reviews/unit-01/logs-5e4cc29c/check-depth-gate.log
  - specs/content/efmp-304/reviews/unit-01/logs-5e4cc29c/check-figures.log
  - specs/content/efmp-304/reviews/unit-01/logs-5e4cc29c/check-no-em-dash.log
  - specs/content/efmp-304/reviews/unit-01/logs-5e4cc29c/check-no-answer-keys.log
  - specs/content/efmp-304/reviews/unit-01/logs-5e4cc29c/check-docs-sync.log
  - specs/content/efmp-304/reviews/unit-01/logs-5e4cc29c/render-review.log
  - specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en/render-inspect.json
  - history/prompts/efmp-304/0171-efmp-304-u01-independent-g3-review.misc.prompt.md
tests:
  - npm run validate:content
  - npm run check:depth-gate
  - npm run check:figures
  - npm run check:no-em-dash
  - npm run check:no-answer-keys
  - npm run check:docs-sync
  - scripts/heavy.sh node scripts/render-inspect.mjs EFMP-304 1 --base http://127.0.0.1:4599 --out specs/content/efmp-304/reviews/unit-01/renders-5e4cc29c/en
  - node scripts/review-evidence.mjs validate specs/content/efmp-304/reviews/unit-01/G3/agent-g3-efmp-304-u1-run5e4cc29c.json
  - npm run test:review
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Brief details:
- Act as the INDEPENDENT G3 English reviewer of EFMP-304 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md).
- Follow .claude/skills/review-unit/SKILL.md exactly.
- Scope: EFMP-304 Unit 1 only.
- Never edit content, never mark G3 done, never self-sign or use human initials.
- Produce evidence report, render inspections, deterministic gate logs, and advisory tracker row.
- Done when `npm run check:content` reports no finding that origin/main does not also report, work committed on branch with conventional commit, and final line is `CREW-SUMMARY: <what you changed, in one sentence>`.

## Response snapshot

Executed independent G3 English review for EFMP-304 Unit 1 following `review-unit` skill:
1. Prepared input manifest binding 106 committed files to `specs/content/efmp-304/reviews/unit-01/G3/manifest.json`.
2. Executed deterministic gates and captured logs under `specs/content/efmp-304/reviews/unit-01/logs-5e4cc29c/` (all passed code 0).
3. Ran browser visual inspection across desktop (1280x900), narrow mobile (360x780), and A4 print emulation (794px) with SVG text geometry checks against local server.
4. Identified three blocking defects:
   - f1-fig-u1-3-syntax-error: SVG syntax error on line 1, col 1877 in `fig-U1-3.svg` and `fig-U1-3.dark.svg` (`can</text"><text x="446"`), causing XML parser failure and blank render on `topic-02.mdx`.
   - f2-svg-text-viewbox-overflow: Site wordmark `textbook.com.pk` overflows 780px viewBox by 34.6px to 47.3px in 5 schematic figures (`fig-U1-1`, `fig-U1-4`, `fig-U1-5`, `fig-U1-7`, `fig-U1-10`).
   - f3-rrq-blueprint-imbalance: Assessment blueprint imbalance violating content-spec section 7.2 (Topic 1.1 has 1 RRQ, Topic 1.3 has 3 RRQs, whereas blueprint specifies >= 2 per topic across 10 items).
5. Identified two advisory findings:
   - f4-figures-manifest-preamble-stale: figures manifest preamble says "Status: prompt-only" while rows are "placed".
   - f5-bare-url-links: bare DOI URLs on topic-02 and topic-03 in Further reading.
6. Emitted structured G3 review report with disposition `revise` at `specs/content/efmp-304/reviews/unit-01/G3/agent-g3-efmp-304-u1-run5e4cc29c.json`. Validated with `review-evidence.mjs validate`.

## Outcome

- Impact: Independent G3 English review evidence generated with disposition `revise` and 3 blocking defects documented for revision.
- Tests: Deterministic content gates passed; render inspection completed; review governance tests passed (40/40); report validated.
- Files: Generated manifest, G3 report, 7 gate logs, 20 render inspection files, and prompt record.
- Next prompts: Authoring/revision session to repair SVG syntax error, SVG text bounds, and assessment blueprint RRQ distribution.
- Reflection: Independent review caught parser-breaking SVG syntax bug and text overflow invisible to basic markdown linters.

## Handoff (for CEO and agents)

- Shipped / changed: G3 review evidence report `specs/content/efmp-304/reviews/unit-01/G3/agent-g3-efmp-304-u1-run5e4cc29c.json` and inspection logs/renders.
- Decisions the team must respect: Disposition is `revise`. Gate G3 remains open (agent evidence cannot close tracker row per ADR-0019). Defects f1, f2, and f3 must be resolved before G3 can pass.
- Pending / next owner: Content author / illustrator to execute repair job for EFMP-304 Unit 1.
- Paperclip issues affected: null.

## Evaluation notes (flywheel)

- Failure modes observed: Malformed XML quote in SVG prevented Chromium rendering; blueprint item distribution mismatch.
- Graders run and results (PASS/FAIL): validateReport PASS (verdict revise); acceptProvisionalReport PASS (refuses non-pass as intended); check:content PASS.
- Prompt variant (if applicable): null.
- Next experiment (smallest change to try): Targeted repair PR fixing f1, f2, and f3 followed by fresh re-review.
