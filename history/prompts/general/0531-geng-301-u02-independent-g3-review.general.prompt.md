---
id: "0531"
title: "GENG-301 Unit 2 independent G3 English review"
stage: general
date: 2026-10-19
surface: agent
model: Gemini 3.8 Flash (High)
feature: none
branch: crew/geng-301-u02-review_en
user: M Yousif Channa
command: Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.
labels: ["board-direct", "crew", "geng-301", "review-en", "g3"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/geng-301/reviews/unit-02/G3/manifest.json
  - specs/content/geng-301/reviews/unit-02/G3/04ddc645-f479-4d6d-a614-8f7e23db9fc0.json
  - specs/content/geng-301/reviews/unit-02/G3/04ddc645-f479-4d6d-a614-8f7e23db9fc0.md
  - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/validate-content.log
  - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/check-depth-gate.log
  - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/check-figures.log
  - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/check-no-em-dash.log
  - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/check-no-answer-keys.log
  - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/check-docs-sync.log
  - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/render-review.log
  - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/measure-figure-text.log
  - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/check-content.log
  - specs/content/geng-301/tasks.md
  - history/prompts/general/0531-geng-301-u02-independent-g3-review.general.prompt.md
tests:
  - node scripts/review-evidence.mjs validate specs/content/geng-301/reviews/unit-02/G3/04ddc645-f479-4d6d-a614-8f7e23db9fc0.json (structurally valid: revise)
  - node scripts/measure-figure-text.mjs static/img/figures/geng-301/unit-02/*.svg (16 overflow defects recorded)
  - npm run check:no-em-dash (clean)
  - npm run check:content (clean, all 13 gates pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Executed independent G3 English review of GENG-301 Unit 2 (The Writing Process) following review-unit skill and references/g3.md. Prepared 105-input bound manifest against clean checkout. Evaluated all 7 criteria (authority, sources, coverage, assessment, accessibility, readability, pedagogy). Discovered 5 blocking defect clusters: (1) SVG text geometry overflow in all 16 figure files under static/img/figures/geng-301/unit-02/ (wordmark overflows 780px viewBox right edge by 38.8px to 43.0px); (2) Subtopic U2-05 omitted from summative assessment items and erroneously mapped in concept graph; (3) RRQ 5 mark scheme arithmetic contradiction; (4) Bloom demand misclassification in MCQ 7 and RRQ 5, plus malformed MCQ 10 option; (5) Incomplete unverifiable source declarations in sources/unit-02.md and reading list divergence with content-spec.md. Formulated disposition: revise. Recorded full JSON evidence report, human-readable markdown summary, and command execution logs. Updated advisory tracker row in tasks.md leaving G3 unticked and unsigned.

## Outcome

- Impact: GENG-301 Unit 2 G3 review completed with validated revise evidence report.
- Tests: Listed above; evidence validated and content check matched origin/main.
- Files: Listed above.

## Handoff (for CEO and agents)

- Shipped: Validated G3 advisory report, summary, command logs, and advisory tracker row.
- Decisions to respect: G3 remains open and unsigned pending author repairs (repair_en).
- Pending: Next job repair_en to address SVG text geometry, assessment coverage for U2-05, RRQ 5 mark scheme arithmetic, and source declarations.
- Paperclip issues affected: GENG-301 Unit 2 pipeline progression.
