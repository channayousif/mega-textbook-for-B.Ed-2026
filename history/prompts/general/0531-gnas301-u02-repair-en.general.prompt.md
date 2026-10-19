---
id: "0531"
title: "Apply GNAS-301 Unit 2 G3 Further reading link repairs"
stage: general
date: 2026-10-19
surface: agent
model: gemini-3.8-flash
feature: none
branch: crew/gnas-301-u02-repair_en
user: M Yousif Channa
command: Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.
labels: ["board-direct", "crew", "gnas-301", "unit-02", "repair", "g3"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gnas-301/unit-02/topic-01.mdx
 - docs/semester-1/gnas-301/unit-02/topic-02.mdx
 - docs/semester-1/gnas-301/unit-02/topic-03.mdx
 - specs/content/gnas-301/tasks.md
 - specs/content/gnas-301/reviews/unit-02/G2/20261019T142940752Z-gates.json
 - specs/content/gnas-301/reviews/unit-02/G2/logs-20261019T142940752Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-02/G2/logs-20261019T142940752Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-02/G2/logs-20261019T142940752Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-02/G2/logs-20261019T142940752Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-02/G2/logs-20261019T142940752Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-02/G2/logs-20261019T142940752Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-02/G2/logs-20261019T142940752Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-02/G2/logs-20261019T142940752Z/validate-content.txt
 - history/prompts/general/0531-gnas301-u02-repair-en.general.prompt.md
tests:
 - npm run check:content (13/13 passed)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Executed crew job gnas-301-u02-repair_en:
1. Inspected findings from latest G3 review report (specs/content/gnas-301/reviews/unit-02/G3/agent-g3-gnas301-u2-run001.json). Verified earlier repairs: ERQ 3 household vs clinic comparison, RRQ 2 mark arithmetic (5 marks), MCQ key de-skewing, Bloom labels, USGS water resource citation, WHO Health-care waste fact sheet binding, and Sanitation glossary link.
2. Repaired remaining open advisory finding: replaced bare URLs with descriptive link text in the Further reading sections of docs/semester-1/gnas-301/unit-02/topic-01.mdx, topic-02.mdx, and topic-03.mdx matching the Urdu mirror conventions.
3. Refreshed G2 gate evidence for Unit 2 via scripts/prepare-gate-evidence.mjs against the repaired English inputs.
4. Appended new Unit 2 G3 tracker row in specs/content/gnas-301/tasks.md recording advisory revise repairs applied and referencing the report with G3 left unticked.
5. Verified 13/13 content gates pass under npm run check:content.

## Outcome

- Impact: Resolved open G3 advisory on bare URLs in GNAS-301 Unit 2; updated G2 gate evidence and tasks.md tracker row.
- Tests: npm run check:content passed (13/13).
- Files: listed above.

## Handoff (for CEO and agents)

- Shipped: Further reading link text repairs across GNAS-301 Unit 2 topics, refreshed G2 gate evidence, and appended G3 tracker row.
- Decisions to respect: G3 remains unticked pending fresh qualified independent review.
- Pending: Owner merge and future independent review cycle.
- Paperclip issues affected: none.
