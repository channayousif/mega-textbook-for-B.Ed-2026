---
id: 0173
title: geng-300-u02-independent-g3-review
stage: misc
date: 2026-10-17
surface: agent
model: gemini-3.8-flash-high
feature: geng-300
branch: crew/geng-300-u02-review_en
user: crew
command: agy -p "Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."
labels: ["crew", "reviewer", "g3", "review", "geng-300", "agy"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/geng-300/reviews/unit-02/G3/manifest.json
  - specs/content/geng-300/reviews/unit-02/G3/agent-g3-geng-300-u2-run24f6f754.json
  - specs/content/geng-300/reviews/unit-02/logs-24f6f754/validate-content.log
  - specs/content/geng-300/reviews/unit-02/logs-24f6f754/check-depth-gate.log
  - specs/content/geng-300/reviews/unit-02/logs-24f6f754/check-figures.log
  - specs/content/geng-300/reviews/unit-02/logs-24f6f754/check-no-em-dash.log
  - specs/content/geng-300/reviews/unit-02/logs-24f6f754/check-no-answer-keys.log
  - specs/content/geng-300/reviews/unit-02/logs-24f6f754/check-docs-sync.log
  - specs/content/geng-300/reviews/unit-02/logs-24f6f754/render-review.log
  - specs/content/geng-300/reviews/unit-02/renders-24f6f754/en/render-inspect.json
  - specs/content/geng-300/tasks.md
  - history/prompts/geng-300/0173-geng-300-u02-independent-g3-review.misc.prompt.md
tests:
  - npm run validate:content
  - npm run check:depth-gate
  - npm run check:figures
  - npm run check:no-em-dash
  - npm run check:no-answer-keys
  - npm run check:docs-sync
  - scripts/heavy.sh node scripts/render-inspect.mjs GENG-300 2 --out specs/content/geng-300/reviews/unit-02/renders-24f6f754/en
  - node scripts/review-evidence.mjs validate specs/content/geng-300/reviews/unit-02/G3/agent-g3-geng-300-u2-run24f6f754.json
  - npm run test:review
  - npm run check:pipeline-gate
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Brief requirements:
- Act as the INDEPENDENT G3 English reviewer of GENG-300 Unit 2 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.
- Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.
- Scope: GENG-300 Unit 2 only: its docs/licence and i18n files, its rows and folders under `specs/content/geng-300/`, and `static/img/figures/geng-300/unit-02/`.
- Done when `npm run check:content` reports no finding that origin/main does not also report, all work is committed on this branch with a conventional commit message, do not push, do not open a PR, and final output ends with `CREW-SUMMARY: <what you changed, in one sentence>`.

## Response snapshot

Executed independent G3 English review for GENG-300 Unit 2 following the `review-unit` skill and ADR-0019:
1. Prepared input manifest binding 96 committed inputs to `specs/content/geng-300/reviews/unit-02/G3/manifest.json`.
2. Executed mandatory deterministic gates and captured logs under `specs/content/geng-300/reviews/unit-02/logs-24f6f754/` (all passed code 0).
3. Ran visual browser render inspection across desktop (1280x900), narrow mobile (360x780), and A4 print emulation (794px) with SVG text geometry checks using Playwright Chromium (`scripts/render-inspect.mjs`).
4. Identified three blocking defects requiring revision:
   - f1-blueprint-comparison-item-missing: `specs/content/geng-300/content-spec.md:107-108` explicitly requires the summative assessment to include "one Analyze-or-higher item comparing two texts for audience and purpose". No such item exists in `docs/semester-1/geng-300/unit-02/unit-assessment.mdx` (ERQ 2 presents a single passage on girls' education).
   - f2-rrq3-mark-scheme-arithmetic-discrepancy: `unit-assessment.mdx:178-179`, RRQ 3 specifies `(4 marks)` in its header, but mark scheme allocates 1 mark per strategy named (up to 4) plus 1 mark per correct use case (up to 4), summing to 8 payable marks against a 4-mark total.
   - f3-u2-05-making-predictions-omitted: `content-spec.md:117` specifies leaf subtopic U2-05 as "Reading strategies: making predictions, summarising, questioning". In `docs/semester-1/geng-300/unit-02/topic-02.mdx`, "making predictions" is completely omitted from the text (zero occurrences in prose or checks); summarising and questioning are only referenced in passing as steps in SQ4R without explicit instruction on predictive reading strategies.
5. Identified three advisory findings:
   - f4-prose-figure-reference-mismatches: in `topic-02.mdx:78-81`, prose refers to "The figure above maps common note-taking formats..." but the preceding figure is `fig-U2-5` (reading strategies table), while note-taking table `fig-U2-6` is placed in `topic-03.mdx`. In `topic-03.mdx:56-57`, prose refers to "The figure above maps the listening process..." immediately following `fig-U2-6`, while the listening process diagram is `fig-U2-3` at line 24. Furthermore, `unit-teacher-notes.mdx:71-72` describes `fig-U2-6` as a concept map and `fig-U2-3` as a flowchart.
   - f5-mcq-key-distribution-skew: across the 10 MCQs in `unit-assessment.mdx:155-167`, correct options are 1 a, 5 b, 4 c, and 0 d. Option 'd' is never the correct key.
   - f6-cosmetic-wordmark-collision-fig-u2-5: `measure-figure-text.mjs` reports shape `.panel` [14,368,750,456] overlaps with the wordmark box at y=463.3 by 74.3 x 6.5px in `fig-U2-5.svg` and `fig-U2-5.dark.svg`. All text remains within the 780x470 viewBox.
6. Verified source support under D-2026-0001 (all 5 sources are print monographs honestly declared under `## Unverifiable sources`).
7. Emitted structured G3 review report with disposition `revise` at `specs/content/geng-300/reviews/unit-02/G3/agent-g3-geng-300-u2-run24f6f754.json`. Validated with `review-evidence.mjs validate` and `test:review` suite.
8. Updated `tasks.md` with in-progress advisory tracker row (`▣`) without ticking G3 or adding initials.

## Outcome

- Impact: Independent G3 English review evidence generated with disposition `revise` and 3 actionable blocking defects documented for revision.
- Tests: Deterministic content gates passed; render inspection completed; review governance tests passed (40/40); report validated; pipeline gate passed; all 13 content gates passed.
- Files: Generated manifest, G3 report, 7 gate logs, 20 render inspection files, updated tasks.md, and prompt record.
- Next prompts: Content author to execute repair job for GENG-300 Unit 2 (add two-text comparison item to summative assessment per blueprint, fix RRQ 3 mark scheme arithmetic, teach predictive reading strategies in topic-02.mdx).
- Reflection: The review caught missing blueprint requirements, assessment mark arithmetic discrepancy, and missing leaf subtopic content before publication.

## Handoff (for CEO and agents)

- Shipped / changed: G3 review evidence report `specs/content/geng-300/reviews/unit-02/G3/agent-g3-geng-300-u2-run24f6f754.json`, inspection logs/renders, and advisory tracker row in `tasks.md`.
- Decisions the team must respect: Disposition is `revise`. Gate G3 remains open (agent evidence cannot close tracker row per ADR-0019). Defects f1, f2, and f3 must be resolved before G3 can pass.
- Pending / next owner: Content author to execute repair job for GENG-300 Unit 2.
- Paperclip issues affected: null.

## Evaluation notes (flywheel)

- Failure modes observed: Blueprint requirement omission during drafting; assessment mark arithmetic discrepancy; missing leaf subtopic coverage in topic body.
- Graders run and results (PASS/FAIL): validateReport PASS (verdict revise); test:review PASS (40/40); check:pipeline-gate PASS; check:content PASS (13/13).
- Prompt variant (if applicable): null.
- Next experiment (smallest change to try): Targeted repair PR fixing f1, f2, and f3 followed by fresh re-review.
