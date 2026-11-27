# GENT-401 Unit 7 G3 English review (advisory) - crew/gent-401-u07-review_en-r1

- Reviewer: `agent:claude-crew` (model claude-opus-5-5), independent of the author run `crew-job:gent-401-u07-author`.
- Reviewed commit: 01fde1b302e083ffef3098d3dadd40fbb90cf8d7. Input manifest: `manifest.json` (93 inputs).
- Disposition: **escalate**. Eight blocking content findings, two uncertain, and render-review unavailable.
- Report: `specs/content/gent-401/reviews/unit-07/G3/crew-gent-401-u07-review_en-r1.json`. Advisory only: unsigned, not a G3 certification.

## Criteria

| Criterion | Status | Basis |
|---|---|---|
| authority | pass | Guide Weeks 14-15 (`4TH SEMESTER.txt:380-387`) match content-spec U7-01 to U7-06 |
| coverage | pass | All six leaves taught under their own Explanation headings in topic-01 and topic-02 |
| sources | fail | F6 altered OpenStax 10.5 quotation; F7 unsupported 7.3 attribution; F9 12.2 rule unverified |
| readability | pass | Plain HSC-level prose, terms defined; minor grammar (A2) |
| pedagogy | fail | F1 worked-example numbers; F2 risk-matrix figure vs prose; F3 seven vs eight pitch parts |
| assessment | fail | F4 ERQ 1 and ERQ 5 rubrics score what the tasks do not ask; F5 MCQ 3 stem contradicts the topic |
| accessibility | fail | F8 fig-U7-4 alt text claims skill links absent from the image; render-review unavailable (F10) |

## Blocking findings (repair requests)

1. **F1** `topic-02.mdx:38-49`: the "three-minute" worked pitch times to 200 s (3 min 20 s); the ask of Rs 60,000 for four corners cannot be derived from the model row (18,000 per corner; 72,000 total, 48,000 school share, 24,000 sponsor share); the market row has three schools willing while the ask funds four. Make the times total 180 s and make the ask follow from the stated numbers (or explain it).
2. **F2** `fig-U7-2.svg` node-accident at (620,390) is high likelihood, low impact, but `topic-01.mdx:84` reads it as "Low on both: accept". The quadrant list (lines 79-84) also names a "Medium on both" quadrant and omits high likelihood, low impact. Align the figure and the list, and say what to do with the fourth quadrant.
3. **F3** Seven vs eight pitch parts: fig-U7-3 title, CYU 1, the activity, RRQ 8 and the rubrics say seven; the worked table has eight rows and `topic-02.mdx:69` says "the eight parts above". State once whether "next step" is a part.
4. **F4** `unit-assessment.mdx:145` ERQ 1 criterion "Judgement on taking the chance" scores a decision the task (line 98) does not request; line 180 ERQ 5 requires a next step the task (line 102) does not request. Align task and rubric.
5. **F5** `unit-assessment.mdx:42` MCQ 3 says "the three shifts" but `topic-01.mdx:38` teaches two directions; the MCQ 4 rationale (line 113) uses "market penetration", never taught.
6. **F6** `topic-01.mdx:50` quotation marks enclose altered wording; OpenStax 10.5 reads "manage cash, delegate tasks to others, and ensure the right people and systems are in place". Quote exactly or paraphrase (bound note 12 needs the same correction).
7. **F7** `topic-02.mdx:67` attributes "admit what it still has to learn" to OpenStax 7.3; no such passage was found. Remove the attribution or cite a supporting passage.
8. **F8** `topic-02.mdx:83-85` and fig-U7-4 alt text say each do/don't is linked to a communication skill; the image has no skill column. Add the skill per row (and the Urdu pair) or correct the lead-in and alt text.

## Uncertain

- **F9** `topic-01.mdx:38` "identify the tasks, identify the skills each needs, then search for people" rule attributed to OpenStax 12.2 was not located by direct-quote retrieval; bound note 14 asserts it. Recheck.
- **F10** render-review unavailable: production is built from 366019f8a, which predates this unit's banner commit (index.mdx and fig-U7-5.webp differ from HEAD 01fde1b30). No 360px, reading-order, clipping or A4 print inspection was done.

## Advisory

A1 MCQ key A2/B6/C2/D0 (all-B scores 6/10). A2 `topic-02.mdx:81` "A honest", "a invented". A3 `topic-01.mdx:71` and `:73` repeat the same three-causes sentence. A4 the pitch flowchart is said to be "built on" six elements including risk mitigation but has no risk part; bound notes disagree on whether the seven-part structure is OpenStax's or the author's. A5 coverage maps sme-risk-review and pitch-competition to Explanation sections that do not cite them; teacher notes say "teach the lifecycle", which Topic 7.1 does not teach. A6 fig-U7-2 horizontal axis lacks an arrowhead at the high end, a stray arrowhead sits at the origin, and neither axis has low/high labels. A7 ERQs split 3/2 across topics, with no clearly integrative item. A8 RRQ 6 is labelled Analyze but the demand is Understand.

## Checks run (all exit 0 except render-review)

validate:content, check:depth-gate, check:figures, check:no-em-dash, check:no-answer-keys, check:docs-sync, measure-figure-text (4 SVGs), build:content-status, check:content. Logs are in `logs-*/`.
