# Concept graph - EFMP-305 Unit 3 (Inclusive Teaching Strategies)

Per `specs/016-concept-graph-v4/contracts/concept-graph.md`. The fourth per-unit governance table,
beside `coverage/unit-03.md`, `sources/unit-03.md` and `figures/unit-03.md`. Those record what the
unit covers, what grounds it and what it shows; this records **what a learner must understand, and
in what order**.

`Topic` values are the `### Topic list` labels in `specs/content/efmp-305/content-spec.md`
(`## Unit 3`). `Assessment item IDs` are **derived** from `unit-assessment.mdx`'s existing
numbering under its three bank headings - no prose was changed to create them.

**Urdu labels.** These are authored here and carry a G5 flag: a governance file is not published
prose, so it never passes the EN/UR parity gate and nothing else would catch a poor label.

**Cross-unit prerequisites.** The gate requires every `Prerequisites` entry to be a concept in
*this* unit, so genuine cross-unit dependencies are recorded here in prose instead of in the
column. Differentiated instruction (`CON:EFMP-305-3-1`) depends on Unit 1's principles of
inclusion (`CON:EFMP-305-1-7`) and Unit 2's observation and identification
(`CON:EFMP-305-2-5`); Accommodation (`CON:EFMP-305-3-7`) depends on Unit 1's equity
(`CON:EFMP-305-1-6`); Cooperative learning (`CON:EFMP-305-3-10`) depends on
`CON:EFMP-305-1-7`; and the Barrier table (`CON:EFMP-305-3-18`) depends on
`CON:EFMP-305-2-5`. Unit 3's `index.mdx` states the same dependencies as prerequisite knowledge.

**Terminology note.** Three labels below use pairs already banked in
`specs/content/terminology.csv`: Differentiated instruction `متنوع ہدایات`, Scaffolding
`معاونتی تدریس`, Formative assessment `تشکیلی تشخیص`. The remaining labels are **new to this
course and not yet banked**. They are proposed for banking in the TEX-69 handoff rather than
written into `terminology.csv` here, because `terminology.csv` freezes as a pair with
`style-guide.md` (Spec 006 FR-007) and banking is an owner decision (precedent: `D-2026-0067`).
The G4 translator must use these labels, not invent alternatives.

| Concept ID | Label EN | Label UR | Prerequisites | Topic | SLO refs | Assessment item IDs |
|---|---|---|---|---|---|---|
| CON:EFMP-305-3-1 | Differentiated instruction | متنوع ہدایات | - | 3.1 | SLO:EFMP-305-3-1 | MCQ-01, RRQ-01, ERQ-01 |
| CON:EFMP-305-3-2 | Differentiating content | مواد میں تنوع | CON:EFMP-305-3-1 | 3.1 | SLO:EFMP-305-3-1 | MCQ-07, RRQ-05, ERQ-01 |
| CON:EFMP-305-3-3 | Differentiating process | عمل میں تنوع | CON:EFMP-305-3-1 | 3.1 | SLO:EFMP-305-3-1 | MCQ-07, RRQ-05, ERQ-01 |
| CON:EFMP-305-3-4 | Differentiating product | حاصلِ کار میں تنوع | CON:EFMP-305-3-1 | 3.1 | SLO:EFMP-305-3-1 | MCQ-02, RRQ-03, RRQ-05 |
| CON:EFMP-305-3-5 | Scaffolding | معاونتی تدریس | CON:EFMP-305-3-3 | 3.1 | SLO:EFMP-305-3-1 | RRQ-05, RRQ-10 |
| CON:EFMP-305-3-6 | Tiered activities | درجہ بند سرگرمیاں | CON:EFMP-305-3-3 | 3.1 | SLO:EFMP-305-3-1 | RRQ-05, ERQ-01 |
| CON:EFMP-305-3-7 | Accommodation | سہولت کاری | CON:EFMP-305-3-1 | 3.1 | SLO:EFMP-305-3-1 | MCQ-04, RRQ-02, ERQ-04 |
| CON:EFMP-305-3-8 | Modification | ترمیم | CON:EFMP-305-3-7 | 3.1 | SLO:EFMP-305-3-1 | MCQ-10, RRQ-02, RRQ-10, ERQ-04 |
| CON:EFMP-305-3-9 | Universal Design for Learning | تعلم کے لیے عالمگیر ڈیزائن | CON:EFMP-305-3-1 | 3.1 | SLO:EFMP-305-3-1 | ERQ-03 |
| CON:EFMP-305-3-10 | Cooperative learning | اشتراکی تعلم | - | 3.2 | SLO:EFMP-305-3-2 | MCQ-03, RRQ-04, ERQ-02 |
| CON:EFMP-305-3-11 | Positive interdependence | مثبت باہمی انحصار | CON:EFMP-305-3-10 | 3.2 | SLO:EFMP-305-3-2 | MCQ-03, RRQ-08, ERQ-02 |
| CON:EFMP-305-3-12 | Individual accountability | انفرادی جوابدہی | CON:EFMP-305-3-10 | 3.2 | SLO:EFMP-305-3-2 | MCQ-03, MCQ-08, RRQ-08, ERQ-02 |
| CON:EFMP-305-3-13 | Cooperative structures | اشتراکی ساختیں | CON:EFMP-305-3-11, CON:EFMP-305-3-12 | 3.2 | SLO:EFMP-305-3-2 | MCQ-08, MCQ-09, RRQ-04, RRQ-06, ERQ-02 |
| CON:EFMP-305-3-14 | Flexible assessment | لچکدار تشخیص | CON:EFMP-305-3-4, CON:EFMP-305-3-7 | 3.2 | SLO:EFMP-305-3-3 | MCQ-05, RRQ-07, ERQ-04 |
| CON:EFMP-305-3-15 | Assessment criteria held constant | تشخیصی معیار کی ثباتی | CON:EFMP-305-3-14 | 3.2 | SLO:EFMP-305-3-3 | RRQ-07, ERQ-03, ERQ-04 |
| CON:EFMP-305-3-16 | Formative assessment | تشکیلی تشخیص | CON:EFMP-305-3-14 | 3.2 | SLO:EFMP-305-3-3 | ERQ-03 |
| CON:EFMP-305-3-17 | Inclusive lesson planning order | شامل سبق کی منصوبہ بندی کی ترتیب | CON:EFMP-305-3-1, CON:EFMP-305-3-13, CON:EFMP-305-3-14 | 3.3 | SLO:EFMP-305-3-1, SLO:EFMP-305-3-2, SLO:EFMP-305-3-3 | MCQ-06, RRQ-09, ERQ-03, ERQ-05 |
| CON:EFMP-305-3-18 | Barrier table | رکاوٹوں کی فہرست | CON:EFMP-305-3-17 | 3.3 | SLO:EFMP-305-3-1 | RRQ-09, ERQ-01, ERQ-03 |
