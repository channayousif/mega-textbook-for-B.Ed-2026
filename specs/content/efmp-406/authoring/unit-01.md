# EFMP-406 Unit 1 - Authoring record

Author: claude (crew job `efmp-406-u01-author`), 2026-11-02. This is an author self-check and handoff, not independent G3/G5 evidence. Scope: English Unit 1 only, from the approved four-item checklist and two-topic partition. A teacher-notes page is included because the guide supplies teaching strategies and practical work (`3rd 2026.txt:279-284`, `:296-304`).

## Backward design

Topic 1.1 enduring understandings: literacy is skills (decoding, comprehension, composing, with numeracy) put to purposes, so it is a matter of degree, language, text and purpose rather than a yes-or-no label; the traditional skills view and the contemporary social-practice view each see something the other misses, and a teacher needs both. Topic 1.2 enduring understandings: each stage of literacy history added new tools and skills while older practices continued, so contemporary literacy adds to reading and writing; literacy is learned across the whole of life because roles, tools and texts keep changing.

| Sub-topic | Target Bloom level | Explanation heading | Evidence |
|---|---|---|---|
| U1-01 | Understand / Apply | Meaning and nature of literacy | Topic 1.1 retrieval 1-4; MCQ-01, MCQ-02, MCQ-04; RRQ-01 to RRQ-04; ERQ-02 |
| U1-02 | Analyze / Evaluate | Traditional and contemporary views of literacy | Topic 1.1 retrieval 5 and summative task; MCQ-03, MCQ-05; RRQ-05; ERQ-01, ERQ-05 |
| U1-03 | Understand / Analyze | Historical development of literacy practices | Topic 1.2 retrieval 1, 2, 4 and summative task; MCQ-06 to MCQ-08; RRQ-06, RRQ-07, RRQ-09, RRQ-10; ERQ-03 |
| U1-04 | Apply / Create | Literacy as a lifelong learning process | Topic 1.2 retrieval 3, 5 and summative task; MCQ-09, MCQ-10; RRQ-08; ERQ-04, ERQ-05 |

Unit bank: MCQ-01 to MCQ-05 and RRQ-01 to RRQ-05 sample Topic 1.1; MCQ-06 to MCQ-10 and RRQ-06 to RRQ-10 sample Topic 1.2. ERQ-01/02 sample 1.1, ERQ-03/04 sample 1.2, ERQ-05 integrates both. ERQ-01 is the spec's required Analyze-or-higher item comparing a skills view and a social-practice view with one Pakistani classroom example. Topic retrieval totals ten items; the spec's formative range is 5-8 items per unit, so the topic retrieval sets run slightly above it (flagged for the Content gate; no item was dropped to hit a number).

Misconceptions from the spec, each named and corrected in an Explanation: "literacy only means being able to read and write" and "a person who can sign their name is literate" (Topic 1.1); "contemporary literacy replaces reading and writing" and "literacy is learned once, in primary school, and is then complete" (Topic 1.2).

## Reading time

Reader-facing body words (front matter, imports and JSX removed), at about 190 words per minute, rounded up:

- index.mdx: 438 words, 3 minutes.
- topic-01.mdx: about 3,030 words, 16 minutes.
- topic-02.mdx: about 2,900 words, 16 minutes.
- unit-assessment.mdx: about 3,580 words, 19 minutes.
- unit-teacher-notes.mdx: about 720 words, 4 minutes.

Total: 58 minutes, inside the approved 55-75 band. Each topic is at the lower-middle of its 14-19 advisory range.

## Figures

All four planned figures are schematics (concept-map, table, timeline, diagram); none is an illustration. Codex authored the SVGs under the generate-figures skill; they were optimised, measured clean with `scripts/measure-figure-text.mjs`, rendered in Chromium and inspected, then placed. Dark variants are derived. Urdu `.ur.svg` files belong to the Urdu job.

## Open items for later jobs

- No `glossary.json` entries were added (the file is outside this job's scope); key terms are defined in bold on first use. Candidate glossary terms: Literacy, Functional literacy, Literacy practice, Multiliteracies, Lifelong learning.
- `terminology.csv` has no entry for any of the spec's key terms; the concept-graph Urdu labels are authored and flagged for G5.
- The course is not yet in `catalog/courses.json` (owner ruling pending, as the content spec records). A course-level `_category_.json` and a `course-overview.mdx` (guide outcomes, unit list, weights; required as a bound input by G2 evidence) were added; later units should extend the overview rather than replace it.
