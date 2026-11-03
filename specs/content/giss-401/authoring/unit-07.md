# GISS-401 Unit 7 - Authoring record

Author: claude (crew job `giss-401-u07-author`), 2026-11-03. This is an author self-check and handoff, not independent G3/G5 evidence. Scope: English Unit 7 only, from the approved three-item checklist and one-topic partition. No teacher-notes page: the guide lists no teaching strategies or practical work for this course (content spec, Course-wide items).

## Backward design

Topic 7.1 enduring understandings: a teaching post is an *amanah* owed to learners, colleagues, parents and the institution, and for a Muslim teacher professional ethics is *akhlaq* at work, not a separate code; every teacher is a guardian of what is in their care, and Islamic leadership is a trust held for service, guided by justice, consultation, trustworthiness, mercy and accountability; pupils learn values from a teacher's conduct more than from the teacher's words.

| Sub-topic | Target Bloom level | Explanation heading | Evidence |
|---|---|---|---|
| U7-01 | Understand / Analyze | Ethical responsibilities of teachers | Topic retrieval 1, 2, 3; summative task criterion 1; MCQ-01 to MCQ-04; RRQ-01 to RRQ-04; ERQ-01, ERQ-04 |
| U7-02 | Analyze / Evaluate | Islamic values in educational leadership | Topic retrieval 4, 5; summative task criteria 2 and 4; MCQ-05 to MCQ-07; RRQ-05 to RRQ-07; ERQ-02 |
| U7-03 | Understand / Evaluate | Role modelling in education | Topic retrieval 6; summative task criterion 3; MCQ-08, MCQ-09; RRQ-08 to RRQ-10; ERQ-03 |

The five-step decision process ("Putting it together") reinforces U7-01 and U7-02 and is tested by MCQ-10 and the summative task. ERQ-04 is the spec's required Create item (a short personal code of professional conduct grounded in Islamic values); ERQ-05 integrates the unit with Units 1, 3 and 6, as the blueprint asks. Topic retrieval has six items, inside the spec's formative range of 5-8.

Misconceptions from the spec, each named and corrected in the Explanation: "professional ethics is separate from religious ethics" (Ethical responsibilities of teachers); "leadership means authority, not service" (Islamic values in educational leadership); "pupils learn from what teachers say, not what they do" (Role modelling in education).

## Reading time

See `sources/unit-07.md`, Reading-time method: 2 + 22 + 16 = 40 minutes, at the top of the 25-40 band (41 if every page is rounded up). The topic sits inside its 18-26 advisory range.

## Figures

All three planned figures are schematics (concept-map fig-U7-1, table fig-U7-2, flowchart fig-U7-3); none is an illustration. Claude authored the SVGs as the generate-figures fallback author, optimised them, derived dark variants, rendered the light files through sharp with tokens substituted, inspected them, fixed two geometry faults, and placed them as `<Figure>` elements. `scripts/measure-figure-text.mjs` was not run (Chromium is barred by the crew brief); CI's `figure-geometry` job is the first measured check. Urdu `.ur.svg` files belong to the Urdu job.

## Religious content

Statements are mainstream teaching as found in standard Pakistani Islamiat: *amanah*, *adl*, *shura*, the Prophet as the excellent pattern, and the two hadith from *Sahih al-Bukhari* (33 and 893). Every Qur'anic reference was checked against the Saheeh International text on Quran.com and is bound in `sources/texts/quran-translation.md`; the hadith are bound in `sources/texts/sahih-bukhari-33-893.md`. The applications to school life are the author's and are marked as such in the sources file. The content spec (drafting note 2) asks for a qualified Islamic Studies reviewer at G3; this unit has not had that review.

## Open items for later jobs

- No `glossary.json` entries were added (outside this job's scope); key terms are defined in bold on first use. Candidate glossary terms: Amanah, Professional ethics, Educational leadership, Role model, Shura, Adl.
- `terminology.csv` has an entry only for Professional Ethics; the other concept-graph Urdu labels are authored and flagged for G5.
- The course overview still says only Unit 1 is available; updating it is a course-level edit outside this unit's scope.
