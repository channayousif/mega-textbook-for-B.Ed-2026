# Concept graph - EFMP-305 Unit 4 (Creating an Inclusive Classroom Environment)

Per `specs/016-concept-graph-v4/contracts/concept-graph.md`. The fourth per-unit governance table,
beside `coverage/unit-04.md`, `sources/unit-04.md` and `figures/unit-04.md`. Those record what the
unit covers, what grounds it and what it shows; this records **what a learner must understand, and
in what order**.

`Topic` values are the `### Topic list` labels in `specs/content/efmp-305/content-spec.md`
(`## Unit 4`). `Assessment item IDs` are **derived** from `unit-assessment.mdx`'s existing numbering
under its three bank headings - no prose was changed to create them. The unit's bank is built so
that MCQ and RRQ items 1 to 5 serve Topic 4.1 and items 6 to 10 serve Topic 4.2, which is why no
restricted item is claimed by concepts in two topics. ERQ items integrate both topics by design.

**Urdu labels.** These are authored here and carry a G5 flag: a governance file is not published
prose, so it never passes the EN/UR parity gate and nothing else would catch a poor label.

**Cross-unit prerequisites.** The gate requires every `Prerequisites` entry to be a concept in
*this* unit, so genuine cross-unit dependencies are recorded here in prose instead of in the column.
Accessibility (`CON:EFMP-305-4-11`) depends on Unit 2's impairment/disability distinction
(`CON:EFMP-305-2-2`), which supplies the environment-interaction premise the four-layer audit rests
on. Barrier-based seating (`CON:EFMP-305-4-8`) depends on Unit 2's observation and identification
(`CON:EFMP-305-2-5`) and on Unit 2's stigma (`CON:EFMP-305-2-7`), which is why the front-row reflex
carries a social cost. Teaching aids (`CON:EFMP-305-4-16`) depends on Unit 3's differentiating
content (`CON:EFMP-305-3-2`) and on Universal Design for Learning (`CON:EFMP-305-3-9`). Inclusive
classroom environment (`CON:EFMP-305-4-1`) depends on Unit 1's principles of inclusion
(`CON:EFMP-305-1-7`). Unit 4's `index.mdx` states the same dependencies as prerequisite knowledge.

**Terminology note.** Three labels below use pairs already banked in
`specs/content/terminology.csv`: Classroom management `جماعتی انتظام`, Environment `ماحول` (inside
`شمولیتی جماعتی ماحول`), Inclusive education `شمولیتی تعلیم` (the `شمولیتی` element). The remaining
labels are **new to this course and not yet banked**. They are proposed for banking in the
[TEX-76](/TEX/issues/TEX-76) handoff rather than written into `terminology.csv` here, because
`terminology.csv` freezes as a pair with `style-guide.md` (Spec 006 FR-007) and banking is an owner
decision (precedent: `D-2026-0067`). The G4 translator must use these labels, not invent
alternatives. Two are judgement calls worth the reviewer's attention: "dead zone" is rendered by
meaning as `نظر انداز گوشہ` (the neglected corner) rather than calqued, and "accessibility walk" as
`رسائی کا پیدل جائزہ` (the on-foot accessibility review), because a literal calque of either would
not be read as a method name.

| Concept ID | Label EN | Label UR | Prerequisites | Topic | SLO refs | Assessment item IDs |
|---|---|---|---|---|---|---|
| CON:EFMP-305-4-1 | Inclusive classroom environment | شمولیتی جماعتی ماحول | - | 4.1 | SLO:EFMP-305-4-1 | ERQ-01 |
| CON:EFMP-305-4-2 | Classroom management | جماعتی انتظام | CON:EFMP-305-4-1 | 4.1 | SLO:EFMP-305-4-1 | MCQ-01, RRQ-01 |
| CON:EFMP-305-4-3 | Productive and disruptive noise | بامقصد شور اور خلل انداز شور | CON:EFMP-305-4-2 | 4.1 | SLO:EFMP-305-4-1 | MCQ-03, RRQ-02 |
| CON:EFMP-305-4-4 | Predictability through taught routines | سکھائے گئے معمولات سے پیش بینی | CON:EFMP-305-4-2 | 4.1 | SLO:EFMP-305-4-1 | RRQ-03 |
| CON:EFMP-305-4-5 | Positive behaviour support | مثبت طرزِ عمل کی معاونت | CON:EFMP-305-4-2 | 4.1 | SLO:EFMP-305-4-1 | MCQ-02, RRQ-04 |
| CON:EFMP-305-4-6 | Behaviour has a function | طرزِ عمل کا ایک مقصد ہوتا ہے | CON:EFMP-305-4-5 | 4.1 | SLO:EFMP-305-4-1 | MCQ-04, RRQ-04 |
| CON:EFMP-305-4-7 | Classroom arrangement | جماعتی ترتیب | CON:EFMP-305-4-1 | 4.1 | SLO:EFMP-305-4-1, SLO:EFMP-305-4-2 | ERQ-03 |
| CON:EFMP-305-4-8 | Barrier-based seating | رکاوٹ کے مطابق نشست | CON:EFMP-305-4-7 | 4.1 | SLO:EFMP-305-4-2 | ERQ-03, ERQ-04 |
| CON:EFMP-305-4-9 | Participation spread | شرکت کا پھیلاؤ | CON:EFMP-305-4-7 | 4.1 | SLO:EFMP-305-4-1 | MCQ-05, RRQ-05 |
| CON:EFMP-305-4-10 | Teacher position and the dead zone | استاد کی جگہ اور نظر انداز گوشہ | CON:EFMP-305-4-9 | 4.1 | SLO:EFMP-305-4-1 | RRQ-05, ERQ-01 |
| CON:EFMP-305-4-11 | Accessibility | رسائی | - | 4.2 | SLO:EFMP-305-4-2 | MCQ-07, ERQ-02 |
| CON:EFMP-305-4-12 | Four layers of accessibility | رسائی کی چار سطحیں | CON:EFMP-305-4-11 | 4.2 | SLO:EFMP-305-4-2 | MCQ-06, RRQ-10 |
| CON:EFMP-305-4-13 | Barrier-free environment | رکاوٹ سے پاک ماحول | CON:EFMP-305-4-12 | 4.2 | SLO:EFMP-305-4-2 | RRQ-07, ERQ-03 |
| CON:EFMP-305-4-14 | Accessibility walk | رسائی کا پیدل جائزہ | CON:EFMP-305-4-12 | 4.2 | SLO:EFMP-305-4-2 | RRQ-06, ERQ-03 |
| CON:EFMP-305-4-15 | Classroom safety and evacuation | جماعتی تحفظ اور انخلا | CON:EFMP-305-4-12 | 4.2 | SLO:EFMP-305-4-2 | MCQ-10, ERQ-03 |
| CON:EFMP-305-4-16 | Teaching aids | تدریسی معاونات | - | 4.2 | SLO:EFMP-305-4-3 | MCQ-08, RRQ-09 |
| CON:EFMP-305-4-17 | Learning corners | سیکھنے کے گوشے | CON:EFMP-305-4-16 | 4.2 | SLO:EFMP-305-4-3 | ERQ-03 |
| CON:EFMP-305-4-18 | Assistive technology | معاون ٹیکنالوجی | CON:EFMP-305-4-16 | 4.2 | SLO:EFMP-305-4-3 | MCQ-09, ERQ-05 |
| CON:EFMP-305-4-19 | Low-cost and no-cost solutions | کم خرچ اور بغیر خرچ حل | CON:EFMP-305-4-18 | 4.2 | SLO:EFMP-305-4-3 | RRQ-09, ERQ-05 |
| CON:EFMP-305-4-20 | Levels of decision and escalation | فیصلے کی سطحیں اور ارجاع | CON:EFMP-305-4-13, CON:EFMP-305-4-19 | 4.2 | SLO:EFMP-305-4-2, SLO:EFMP-305-4-3 | RRQ-08, ERQ-02 |

## Authored Urdu labels for G5 review

Nineteen of the twenty labels above are authored rather than banked; only Classroom management is
bound to a banked pair. They are listed here so a G5 reviewer can check them as a set rather than
hunting them in a table.

- Inclusive classroom environment - شمولیتی جماعتی ماحول
- Productive and disruptive noise - بامقصد شور اور خلل انداز شور
- Predictability through taught routines - سکھائے گئے معمولات سے پیش بینی
- Positive behaviour support - مثبت طرزِ عمل کی معاونت
- Behaviour has a function - طرزِ عمل کا ایک مقصد ہوتا ہے
- Classroom arrangement - جماعتی ترتیب
- Barrier-based seating - رکاوٹ کے مطابق نشست
- Participation spread - شرکت کا پھیلاؤ
- Teacher position and the dead zone - استاد کی جگہ اور نظر انداز گوشہ
- Accessibility - رسائی
- Four layers of accessibility - رسائی کی چار سطحیں
- Barrier-free environment - رکاوٹ سے پاک ماحول
- Accessibility walk - رسائی کا پیدل جائزہ
- Classroom safety and evacuation - جماعتی تحفظ اور انخلا
- Teaching aids - تدریسی معاونات
- Learning corners - سیکھنے کے گوشے
- Assistive technology - معاون ٹیکنالوجی
- Low-cost and no-cost solutions - کم خرچ اور بغیر خرچ حل
- Levels of decision and escalation - فیصلے کی سطحیں اور ارجاع
