---
id: 0172
title: geng-300-u01-independent-g3-review
stage: misc
date: 2026-10-17
surface: agent
model: gemini-3.8-flash-high
feature: geng-300
branch: crew/geng-300-u01-review_en
user: crew
command: agy -p "Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."
labels: ["crew", "reviewer", "g3", "review", "geng-300", "agy"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/geng-300/reviews/unit-01/G3/manifest.json
  - specs/content/geng-300/reviews/unit-01/G3/agent-g3-geng-300-u1-run7c5e7ce2.json
  - specs/content/geng-300/reviews/unit-01/logs-7c5e7ce2/validate-content.log
  - specs/content/geng-300/reviews/unit-01/logs-7c5e7ce2/check-depth-gate.log
  - specs/content/geng-300/reviews/unit-01/logs-7c5e7ce2/check-figures.log
  - specs/content/geng-300/reviews/unit-01/logs-7c5e7ce2/check-no-em-dash.log
  - specs/content/geng-300/reviews/unit-01/logs-7c5e7ce2/check-no-answer-keys.log
  - specs/content/geng-300/reviews/unit-01/logs-7c5e7ce2/check-docs-sync.log
  - specs/content/geng-300/reviews/unit-01/logs-7c5e7ce2/render-review.log
  - specs/content/geng-300/reviews/unit-01/renders-7c5e7ce2/en/render-inspect.json
  - specs/content/geng-300/tasks.md
  - history/prompts/geng-300/0172-geng-300-u01-independent-g3-review.misc.prompt.md
tests:
  - npm run validate:content
  - npm run check:depth-gate
  - npm run check:figures
  - npm run check:no-em-dash
  - npm run check:no-answer-keys
  - npm run check:docs-sync
  - scripts/heavy.sh node scripts/render-inspect.mjs GENG-300 1 --out specs/content/geng-300/reviews/unit-01/renders-7c5e7ce2/en
  - node scripts/review-evidence.mjs validate specs/content/geng-300/reviews/unit-01/G3/agent-g3-geng-300-u1-run7c5e7ce2.json
  - npm run test:review
  - npm run check:pipeline-gate
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Brief details:
- Act as the INDEPENDENT G3 English reviewer of GENG-300 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.
- Follow .claude/skills/review-unit/SKILL.md exactly; read it and every file it references before starting.
- Scope: GENG-300 Unit 1 only: its docs/licence and i18n files, its rows and folders under specs/content/geng-300/, and static/img/figures/geng-300/unit-01/.
- Done when npm run check:content reports no finding that origin/main does not also report, all work is committed on this branch with a conventional commit message, do not push, do not open a PR, and final output ends with CREW-SUMMARY line.

## Response snapshot

Executed independent G3 English review for GENG-300 Unit 1 following the `review-unit` skill:
1. Prepared input manifest binding 96 committed inputs to `specs/content/geng-300/reviews/unit-01/G3/manifest.json`.
2. Executed mandatory deterministic gates and captured logs under `specs/content/geng-300/reviews/unit-01/logs-7c5e7ce2/` (all passed code 0).
3. Ran visual browser render inspection across desktop (1280x900), narrow mobile (360x780), and A4 print emulation (794px) with SVG text geometry checks using Playwright Chromium.
4. Identified three blocking defects requiring revision:
   - f1-svg-text-viewbox-overflow: static/img/figures/geng-300/unit-01/fig-U1-1.svg, fig-U1-1.dark.svg, fig-U1-3.svg, and fig-U1-3.dark.svg (4 files total) have wordmark "textbook.com.pk" positioned past the 780px viewBox right edge by 34.3px to 34.6px (extending to x=814.3px). Root cause: CSS rule `text { text-anchor: middle }` overrides presentation attribute `text-anchor="end"` on `<text class="wm">`.
   - f2-rrq3-mark-arithmetic-discrepancy: RRQ 3 stem header specifies `(4 marks)` but mark scheme allocates 4 marks for naming processes (1 each) plus up to 4 marks for examples, summing to 8 payable marks.
   - f3-rrq4-clause-classification-error: RRQ 4 stem presents a sentence with a compound predicate ("the teachers went to the staffroom and discussed the new timetable") which is a complex sentence, while mark scheme erroneously classifies it as compound-complex and defines "discussed the new timetable" as an independent clause despite lacking a subject.
5. Identified three advisory findings:
   - f4-figures-manifest-preamble-stale: figures manifest preamble says "Status: prompt-only" while rows are "placed".
   - f5-topic02-check-understanding-compound-predicate: topic-02.mdx Check your understanding item 3 repeats the compound predicate structure as an intended compound-complex example.
   - f6-cosmetic-wordmark-overlap: minor shape overlaps with wordmark bounding box in fig-U1-2 and fig-U1-6 (non-failing).
6. Recorded positive checks for independence, uncorroborated source declarations under D-2026-0001, and rendered DOM integrity.
7. Emitted structured G3 review report with disposition `revise` at `specs/content/geng-300/reviews/unit-01/G3/agent-g3-geng-300-u1-run7c5e7ce2.json`. Validated with `review-evidence.mjs validate` and `test:review` suite.
8. Updated `tasks.md` with in-progress advisory tracker row (`▣`) without ticking G3 or adding initials.

## Outcome

- Impact: Independent G3 English review evidence generated with disposition `revise` and 3 actionable blocking defects documented for revision.
- Tests: Deterministic content gates passed; render inspection completed; review governance tests passed (40/40); report validated; pipeline gate passed; all 13 content gates passed.
- Files: Generated manifest, G3 report, 7 gate logs, 20 render inspection files, updated tasks.md, and prompt record.
- Next prompts: Content author / illustrator to execute repair job for GENG-300 Unit 1 (SVG wordmark CSS text-anchor, RRQ 3 mark scheme arithmetic, RRQ 4 clause structure).
- Reflection: The review caught SVG text bounds overflow and grammatical mark scheme errors before publication.

## Handoff (for CEO and agents)

- Shipped / changed: G3 review evidence report `specs/content/geng-300/reviews/unit-01/G3/agent-g3-geng-300-u1-run7c5e7ce2.json`, inspection logs/renders, and advisory tracker row in `tasks.md`.
- Decisions the team must respect: Disposition is `revise`. Gate G3 remains open (agent evidence cannot close tracker row per ADR-0019). Defects f1, f2, and f3 must be resolved before G3 can pass.
- Pending / next owner: Content author / illustrator to execute repair job for GENG-300 Unit 1.
- Paperclip issues affected: null.

## Evaluation notes (flywheel)

- Failure modes observed: CSS selector specificity override on SVG text-anchor causing viewBox overflow; assessment mark arithmetic discrepancy; linguistic classification mistake in assessment bank.
- Graders run and results (PASS/FAIL): validateReport PASS (verdict revise); test:review PASS (40/40); check:pipeline-gate PASS; check:content PASS (13/13).
- Prompt variant (if applicable): null.
- Next experiment (smallest change to try): Targeted repair PR fixing f1, f2, and f3 followed by fresh re-review.
