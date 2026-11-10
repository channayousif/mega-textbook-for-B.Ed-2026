---
id: crew-gpks-402-u06-repair_en-r1
title: crew repair_en GPKS-402 unit 6 round 1
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: gpks-402
branch: crew/gpks-402-u06-repair_en-r1
user: crew
command: crew repair_en
labels: [crew, agy, repair_en, gpks-402]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - docs/semester-2/gpks-402/unit-06/topic-01.mdx
  - docs/semester-2/gpks-402/unit-06/topic-02.mdx
  - docs/semester-2/gpks-402/unit-06/topic-03.mdx
  - docs/semester-2/gpks-402/unit-06/unit-assessment.mdx
  - specs/content/gpks-402/sources/texts/dean-2005-citizenship.md
  - specs/content/gpks-402/sources/texts/khan-2015-foreign-policy.md
  - specs/content/gpks-402/sources/unit-06.md
  - specs/content/gpks-402/tasks.md
  - specs/content/gpks-402/reviews/unit-06/G2/20261110T062724508Z-gates.json
  - specs/content/gpks-402/reviews/unit-06/G2/logs-20261110T062724508Z/check-bloom-bands.txt
  - specs/content/gpks-402/reviews/unit-06/G2/logs-20261110T062724508Z/check-concept-graph.txt
  - specs/content/gpks-402/reviews/unit-06/G2/logs-20261110T062724508Z/check-depth-gate.txt
  - specs/content/gpks-402/reviews/unit-06/G2/logs-20261110T062724508Z/check-docs-sync.txt
  - specs/content/gpks-402/reviews/unit-06/G2/logs-20261110T062724508Z/check-figures.txt
  - specs/content/gpks-402/reviews/unit-06/G2/logs-20261110T062724508Z/check-no-answer-keys.txt
  - specs/content/gpks-402/reviews/unit-06/G2/logs-20261110T062724508Z/check-no-em-dash.txt
  - specs/content/gpks-402/reviews/unit-06/G2/logs-20261110T062724508Z/validate-content.txt
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied all findings from the latest G3 review report (20261108T203238Z-g3-desk-558b2467.json):
- F02: Bound demographic, poverty and labour data to dated official publications (Census 2023, Poverty & Equity Brief Oct 2024, PDHS 2017-18, PDU Oct 2025); provided an explicit Offline Data Card in Topic 6.2 with all verified national indicators.
- F03: Maintained U6-06 coverage mapping to NACTA NAP 2014, Paigham-e-Pakistan 2018, SATP fatality counts, and Burki 1999; verified D-2026-0001 unavailable-source declaration with dated attempts and authorisation context.
- F04: Replaced purported quotation marks with clear paraphrase labels in dean-2005-citizenship.md and khan-2015-foreign-policy.md; confirmed ledger retrieval URLs; qualified multilateral election counts (UN Security Council non-permanent membership terms) in topic-01; clarified flood impact terminology (33 million affected with ~8M displaced); verified absence of unattributed 25% forest standard.
- F05: Aligned ERQ 2 rubric heading and criteria directly with the question stem (population, poverty, youth unemployment, and environmental vulnerability) removing extremism/NAP scoring; updated RRQ 8 stem and mark scheme to accept any two valid agricultural, conservation, or policy measures (1.5 marks each).
- F06: Defined geoeconomics at first use in topic-01; defined intercensal growth, clarified youth dependency ratio, defined economic exclusion/disenfranchisement, and clarified targeted combat operations in topic-02.
- F07: Supplied offline resource cards for provincial and territorial profiles in Topic 6.3 distinguishing provinces from territories; reframed ERQ 5 rubric Criterion 1 Level 3 to reward evidence-based critique of teacher agency and structural limits; updated Topic 6.3 prose to avoid describing GB and AJK as provinces.
- F01 and F08: Recorded as host-supplied (provenance and rendered narrow/A4 evidence); appended new Unit 6 G3 tracker row starting with "advisory: revise; repairs applied" naming report 20261108T203238Z-g3-desk-558b2467.json, leaving G3 unticked.
- Refreshed G2 gate evidence (20261110T062724508Z-gates.json) and repointed tasks.md; npm run check:content passes 14/14 content gates.

## Outcome

- Impact: All findings from G3 report 20261108T203238Z-g3-desk-558b2467.json resolved with minimal, precise edits. All 14 content gates pass cleanly.
- Tests: npm run check:content passed (14/14 content gates).
- Files: topic-01.mdx, topic-02.mdx, topic-03.mdx, unit-assessment.mdx, dean-2005-citizenship.md, khan-2015-foreign-policy.md, sources/unit-06.md, tasks.md, G2 gate evidence and logs.
- Next prompts: Fresh independent G3 review of the repaired Unit 6. Urdu translation is a separate job.
- Reflection: Providing self-contained offline data cards and resource cards directly within the topic MDX files ensures pedagogical inquiry works reliably without internet access while resolving reviewer concerns about data availability.

## Handoff (for CEO and agents)

- Shipped / changed: GPKS-402 Unit 6 content repairs across topics 01, 02, 03, unit-assessment, source texts and ledger; refreshed G2 gate evidence; appended advisory: revise tracker row for Unit 6 G3.
- Decisions the team must respect: GB and AJK are designated as territories, distinct from the four provinces; ERQ 2 rubric demands match its stem without extremism scoring; Dean and Khan excerpts are labelled paraphrase; offline data cards in topic-02 and topic-03 are authoritative classroom assets.
- Pending / next owner: Fresh independent G3 review run; Urdu translation is a separate job.
- Paperclip issues affected: None.

## Evaluation notes (flywheel)

- Failure modes observed: Gate evidence input manifests must be regenerated via prepare-gate-evidence after any content changes to satisfy pipeline gate checks.
- Graders run and results (PASS/FAIL): npm run check:content PASS (14/14).
- Prompt variant (if applicable): None.
- Next experiment (smallest change to try): None.
