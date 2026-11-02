# EFMP-406 Unit 5 - Authoring record

Author: claude (crew job `efmp-406-u05-author`), 2026-11-02. This is an author self-check and handoff, not independent G3/G5 evidence. Scope: English Unit 5 only, from the approved four-item checklist and two-topic partition. A teacher-notes page is included because the guide supplies teaching strategies and practical work (`3rd 2026.txt:279-284`, `:296-304`).

## Backward design

Topic 5.1 enduring understandings: learner-centred literacy instruction changes who does the reading, talking, choosing and thinking, and it needs a more active, better-prepared teacher, not a passive one; inquiry and project work give pupils real reasons to read and write and build information literacy, and they belong in language classes as much as in science. Topic 5.2 enduring understandings: ICT helps literacy only when it is integrated into a specific literacy task pupils could not do as well without it, and low-cost tools can be enough; assessment gathers evidence and evaluation judges it, no single method sees everything, so a teacher combines methods and assesses the process of project work as well as the product.

| Sub-topic | Target Bloom level | Explanation heading | Evidence |
|---|---|---|---|
| U5-01 | Understand / Analyze | Learner-centred literacy instruction | Topic 5.1 retrieval 1, 2; MCQ-01, MCQ-05; RRQ-01, RRQ-02; ERQ-01, ERQ-05 |
| U5-02 | Apply / Create | Inquiry-based and project-based learning | Topic 5.1 retrieval 3-5 and summative task; MCQ-02 to MCQ-04; RRQ-03 to RRQ-05; ERQ-02 |
| U5-03 | Apply / Evaluate | Integration of ICT in literacy teaching | Topic 5.2 retrieval 2, 3 and summative task; MCQ-06, MCQ-07; RRQ-06, RRQ-07; ERQ-03, ERQ-05 |
| U5-04 | Apply / Evaluate | Assessment and evaluation of literacy skills | Topic 5.2 retrieval 1, 4, 5 and summative task; MCQ-08 to MCQ-10; RRQ-08 to RRQ-10; ERQ-04, ERQ-05 |

Unit bank: MCQ-01 to MCQ-05 and RRQ-01 to RRQ-05 sample Topic 5.1; MCQ-06 to MCQ-10 and RRQ-06 to RRQ-10 sample Topic 5.2. ERQ-01/02 sample 5.1, ERQ-03/04 sample 5.2, ERQ-05 integrates both. ERQ-05 is the spec's required Create-level item: design a short literacy activity for a Grade 5 class using one approach from the unit, with a way to assess it. Topic retrieval totals ten items; the spec's formative range is 5-8 items per unit, so the topic retrieval sets run slightly above it (flagged for the Content gate; no item was dropped to hit a number). ERQ Bloom tags carry the highest level each task demands, because `check:bloom-bands` reads one tag per item.

Misconceptions from the spec, each named and corrected in an Explanation: "learner-centred means the teacher does nothing" and "project work is only for science" (Topic 5.1); "ICT integration means showing slides" and "a written test is the only way to assess reading" (Topic 5.2).

## Reading time

Reader-facing body words (front matter, imports and JSX removed), at about 190 words per minute, rounded up:

- index.mdx: 462 words, 3 minutes.
- topic-01.mdx: about 2,700 words, 15 minutes.
- topic-02.mdx: about 2,910 words, 16 minutes.
- unit-assessment.mdx: about 3,740 words, 20 minutes.
- unit-teacher-notes.mdx: about 750 words, 4 minutes.

Total: 58 minutes, inside the approved 55-75 band. Each topic sits inside its 14-19 advisory range.

## Sources

All three mapped readings are cited. Gasque (2016) and Hafifah and Sulistyo (2020) were read in full; Minott (2011) only from its abstract, as for Unit 2. U5-04 had no mapped reading, so the open EGRA toolkit (RTI International, 2016) was added and bound. The Minott excerpt file is shared with Unit 2 (branch `crew/efmp-406-u02-author`): this branch keeps Unit 2's text unchanged and appends a Unit 5 section, so a merge conflict on that file resolves by taking this branch's version.

## Figures

All four planned figures are schematics (flowchart, table, table, diagram); none is an illustration. Codex authored the SVGs under the generate-figures skill; they were optimised, measured clean with `scripts/measure-figure-text.mjs` (exit 0) and placed. Dark variants are derived. Their labels were checked against the prompts in source, but not rendered and inspected as images in this job; a reviewer should look at them on the page. Urdu `.ur.svg` files belong to the Urdu job.

## Open items for later jobs

- No `glossary.json` entries were added (outside this job's scope); key terms are defined in bold on first use. Candidate glossary terms: Learner-centred literacy instruction, Inquiry-based learning, Project-based learning, Information literacy, ICT integration, Reading record.
- `terminology.csv` has no entry for the spec's key terms Learner-centred instruction, Inquiry-based learning, Project-based learning or Literacy assessment; the concept-graph Urdu labels for them are authored and flagged for G5.
- `course-overview.mdx` still says only Unit 1 is available; it is outside this unit's scope and should be updated when units are published.
