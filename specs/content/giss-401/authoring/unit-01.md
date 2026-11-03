# GISS-401 Unit 1 - Authoring record

Author: claude (crew job `giss-401-u01-author`), 2026-11-03. This is an author self-check and handoff, not independent G3/G5 evidence. Scope: English Unit 1 only, from the approved six-item checklist and two-topic partition. No teacher-notes page: the guide lists no teaching strategies or practical work for this course (content spec, Course-wide items).

## Backward design

Topic 1.1 enduring understandings: Islam is freely chosen submission to Allah, and Islamic Studies is a wide field whose scope runs from belief to law and government, not a list of rituals; Islam gives knowledge a very high place and Islamic education aims at the whole person; Islam is a *din*, a complete code of life in which belief is the root of worship, morals, social, economic and public life. Topic 1.2 enduring understandings: Tauheed, Risalat and Akhirat are the three foundations of belief (whom we worship, how we live, why it matters); Tauheed is more than believing that God exists; the six articles of faith are stated in the hadith of Jibril; belief is meant to show itself in conduct.

| Sub-topic | Target Bloom level | Explanation heading | Evidence |
|---|---|---|---|
| U1-01 | Understand / Apply | Meaning and scope of Islamic Studies | Topic 1.1 retrieval 1, 2, 4; MCQ-01, MCQ-02, MCQ-04; RRQ-01, RRQ-02; ERQ-01 |
| U1-02 | Understand / Evaluate | Importance of Islamic education | Topic 1.1 retrieval 3; MCQ-03; RRQ-03, RRQ-04; ERQ-02 |
| U1-03 | Apply / Analyze | Islam as a complete code of life | Topic 1.1 retrieval 5 and summative task; MCQ-05; RRQ-05; ERQ-01, ERQ-05 |
| U1-04 | Understand / Apply | Concept of Tauheed | Topic 1.2 retrieval 1, 3, 4; MCQ-06, MCQ-09; RRQ-06; ERQ-05 |
| U1-05 | Understand / Analyze | Risalat and Akhirat | Topic 1.2 retrieval 1 and summative task; MCQ-07, MCQ-10; RRQ-07, RRQ-08; ERQ-03 |
| U1-06 | Remember / Create | Articles of faith | Topic 1.2 retrieval 2, 5; MCQ-08; RRQ-09, RRQ-10; ERQ-04 |

Unit bank: MCQ-01 to MCQ-05 and RRQ-01 to RRQ-05 sample Topic 1.1; MCQ-06 to MCQ-10 and RRQ-06 to RRQ-10 sample Topic 1.2. ERQ-01/02 sample 1.1, ERQ-03/04 sample 1.2, ERQ-05 integrates both. ERQ-03 is the spec's required Analyze-or-higher item on how belief in Akhirat shapes a Muslim teacher's everyday conduct; Topic 1.2's summative task rehearses it. Topic retrieval totals ten items (five per topic); the spec's formative range is 5-8 items per unit, so the topic retrieval sets run slightly above it (flagged for the Content gate; no item was dropped to hit a number).

Misconceptions from the spec, each named and corrected in an Explanation: "Islamic Studies is only about rituals" (Topic 1.1, Meaning and scope; revisited under Islam as a complete code of life); "Tauheed only means believing that God exists" (Topic 1.2, Concept of Tauheed); "belief has no link to daily conduct" (Topic 1.2, Risalat and Akhirat). A fourth, the fatalist reading of the divine decree, is corrected under Articles of faith.

## Reading time

Reader-facing body words (front matter, imports and JSX removed), at about 200 words per minute, rounded up:

- index.mdx: 464 words, 3 minutes.
- topic-01.mdx: about 3,160 words, 16 minutes.
- topic-02.mdx: about 3,120 words, 16 minutes.
- unit-assessment.mdx: about 3,060 words, 16 minutes.

Total: 51 minutes, inside the approved 40-55 band. Each topic is near the top of its 12-17 advisory range.

## Figures

All four planned figures are schematics (concept-map fig-U1-1, tables fig-U1-2 and fig-U1-3, diagram fig-U1-4); none is an illustration. Claude authored the SVGs by hand as the generate-figures fallback author, optimised them with `optimize:figure --svg`, derived dark variants with `figures:variants`, rendered the light files through sharp with the tokens substituted, inspected them, and placed them. `scripts/measure-figure-text.mjs` was not run: it drives Chromium, which the crew brief bars. Labels were budgeted at 8.8 px a character for 14 px text and the sharp renders show no overlap or spill, but CI's `figure-geometry` job is the first measured check. Urdu `.ur.svg` files belong to the Urdu job.

## Religious content

Statements of belief are mainstream Sunni teaching as found in standard Pakistani Islamiat: the three aspects of Tauheed, *Iman-e-Mujmal* and *Iman-e-Mufassal*, the finality of prophethood, and the six articles from the hadith of Jibril (*Sahih Muslim* 8a). Every Qur'anic reference was checked against the Saheeh International text on Quran.com and is bound in `sources/texts/quran-translation.md`. The content spec (drafting note 2) asks for a qualified Islamic Studies reviewer at G3 in addition to the general reviewer; this unit has not had that review.

## Open items for later jobs

- No `glossary.json` entries were added (the file is outside this job's scope); key terms are defined in bold on first use. Candidate glossary terms: Islamic Studies, Din, Aqaid, Iman, Tauheed, Shirk, Risalat, Akhirat, Taqdir.
- `terminology.csv` has no entry for any of the spec's key terms; the concept-graph Urdu labels are authored and flagged for G5.
- `islami-nazriya-e-hayat` is not cited (no author, publisher or catalogue record found); `maududi-towards-understanding` is declared unverifiable (title-level only).
- A course-level `_category_.json` and `course-overview.mdx` were added; later units should extend the overview rather than replace it.
