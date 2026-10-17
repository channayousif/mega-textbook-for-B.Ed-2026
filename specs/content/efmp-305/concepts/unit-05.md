# Concept graph - EFMP-305 Unit 5 (Policies and Legal Framework in Pakistan)

Per `specs/016-concept-graph-v4/contracts/concept-graph.md`. The fourth per-unit governance table,
beside `coverage/unit-05.md`, `sources/unit-05.md` and `figures/unit-05.md`. Those record what the
unit covers, what grounds it and what it shows; this records **what a learner must understand, and
in what order**.

`Topic` values are the `### Topic list` labels in `specs/content/efmp-305/content-spec.md`
(`## Unit 5`). `Assessment item IDs` are **derived** from `unit-assessment.mdx`'s existing numbering
under its three bank headings - no prose was changed to create them. The bank is built so that MCQ
and RRQ items 1 to 3 serve Topic 5.1, items 4 to 7 serve Topic 5.2 and items 8 to 10 serve
Topic 5.3, which is why no restricted item is claimed by concepts in two topics. ERQ items integrate
the three topics by design. Consistent with the owner's blueprint note, **no assessment item
requires the recitation of a section number**, so no concept below is evidenced by a
number-recall item.

**Urdu labels.** These are authored here and carry a G5 flag: a governance file is not published
prose, so it never passes the EN/UR parity gate and nothing else would catch a poor label.

**Cross-unit prerequisites.** The gate requires every `Prerequisites` entry to be a concept in
*this* unit, so genuine cross-unit dependencies are recorded here in prose instead of in the column.
Legal duty of a school (`CON:EFMP-305-5-9`) depends on Unit 1's principles of inclusion
(`CON:EFMP-305-1-7`) and on Unit 1's inclusive education (`CON:EFMP-305-1-1`), since the Act's own
statutory definition of inclusive education is the same idea in legislative form. Reasonable
accommodation (`CON:EFMP-305-5-8`) depends on Unit 4's accessibility (`CON:EFMP-305-4-11`) and its
four layers (`CON:EFMP-305-4-12`), which supply the content of what is being accommodated, and on
Unit 3's accommodation-versus-modification distinction, which is where the standard-preserving line
was first drawn. Statutory definition of disability (`CON:EFMP-305-5-6`) depends on Unit 2's
impairment-versus-disability distinction (`CON:EFMP-305-2-2`); the Act's "in interaction with
barriers" is that distinction in statutory language. Accessible building as a duty
(`CON:EFMP-305-5-11`) depends on Unit 4's accessibility walk (`CON:EFMP-305-4-14`), which is the
method the duty is audited with. Teacher attitude (`CON:EFMP-305-5-15`) depends on Unit 2's stigma
(`CON:EFMP-305-2-7`). Unit 5's `index.mdx` states the same dependencies as prerequisite knowledge.

**Terminology note.** Two labels below use pairs already banked in
`specs/content/terminology.csv`: Inclusive education `شمولیتی تعلیم` (inside the statutory-definition
label) and Attitude `رویہ` (inside `استاد کا رویہ`). The remaining labels are **new to this course
and not yet banked**. They are proposed for banking in the [TEX-77](/TEX/issues/TEX-77) handoff
rather than written into `terminology.csv` here, because `terminology.csv` freezes as a pair with
`style-guide.md` (Spec 006 FR-007) and banking is an owner decision (precedent: `D-2026-0067`). The
G4 translator must use these labels, not invent alternatives.

Four are judgement calls worth the reviewer's attention. **Reasonable accommodation** is rendered
`مناسب سہولت کاری` rather than calqued as `معقول رہائش`, because `رہائش` means lodging in ordinary
Urdu and the calque is actively misleading in a schooling context; `سہولت کاری` carries the sense of
providing a facility or adjustment. **Policy-to-practice gap** is rendered by meaning as
`پالیسی اور عمل کا فرق`. **Reasonable accommodation is not a budget test** is a proposition rather
than a term and is rendered as a short clause, `مناسب سہولت کاری بجٹ کا سوال نہیں`, deliberately so
that it reads as the claim it is. **Attitude-action cycle** is rendered `رویہ اور عمل کا چکر`, with
`چکر` chosen over `سائیکل` so that the figure label and the prose agree in register.

| Concept ID | Label EN | Label UR | Prerequisites | Topic | SLO refs | Assessment item IDs |
|---|---|---|---|---|---|---|
| CON:EFMP-305-5-1 | National Education Policy | قومی تعلیمی پالیسی | - | 5.1 | SLO:EFMP-305-5-1 | MCQ-01, RRQ-01 |
| CON:EFMP-305-5-2 | Policy statement is not a legal duty | پالیسی کا اعلان قانونی ذمہ داری نہیں | CON:EFMP-305-5-1 | 5.1 | SLO:EFMP-305-5-1 | MCQ-02, RRQ-01, ERQ-01 |
| CON:EFMP-305-5-3 | The policy's inclusion commitments | پالیسی کے شمولیتی وعدے | CON:EFMP-305-5-1 | 5.1 | SLO:EFMP-305-5-1 | RRQ-02 |
| CON:EFMP-305-5-4 | The policy's silences | پالیسی کی خاموشیاں | CON:EFMP-305-5-3 | 5.1 | SLO:EFMP-305-5-1 | MCQ-03, RRQ-03 |
| CON:EFMP-305-5-5 | Reading a policy: addressee, verb, mechanism, absence | پالیسی پڑھنے کے چار سوال | CON:EFMP-305-5-2, CON:EFMP-305-5-4 | 5.1 | SLO:EFMP-305-5-1 | RRQ-03, ERQ-01 |
| CON:EFMP-305-5-6 | Provincial and federal law after devolution | صوبائی اور وفاقی قانون، اختیارات کی منتقلی کے بعد | - | 5.1 | SLO:EFMP-305-5-1, SLO:EFMP-305-5-2 | ERQ-05 |
| CON:EFMP-305-5-7 | Purpose and extent of the Sindh Act 2018 | سندھ ایکٹ 2018 کا مقصد اور دائرہ | - | 5.2 | SLO:EFMP-305-5-2 | MCQ-04, ERQ-05 |
| CON:EFMP-305-5-8 | Statutory definition of inclusive education | شمولیتی تعلیم کی قانونی تعریف | CON:EFMP-305-5-7 | 5.2 | SLO:EFMP-305-5-2 | RRQ-04, ERQ-03 |
| CON:EFMP-305-5-9 | Statutory definition of a person with disabilities | معذور شخص کی قانونی تعریف | CON:EFMP-305-5-7 | 5.2 | SLO:EFMP-305-5-2 | ERQ-01 |
| CON:EFMP-305-5-10 | Non-discrimination, purpose or effect | عدم امتیاز: مقصد ہو یا نتیجہ | CON:EFMP-305-5-9 | 5.2 | SLO:EFMP-305-5-2 | MCQ-06, ERQ-01 |
| CON:EFMP-305-5-11 | Reasonable accommodation | مناسب سہولت کاری | CON:EFMP-305-5-8 | 5.2 | SLO:EFMP-305-5-2, SLO:EFMP-305-5-3 | MCQ-05, ERQ-02 |
| CON:EFMP-305-5-12 | Reasonable accommodation is not a budget test | مناسب سہولت کاری بجٹ کا سوال نہیں | CON:EFMP-305-5-11, CON:EFMP-305-5-10 | 5.2 | SLO:EFMP-305-5-3 | RRQ-05, ERQ-02 |
| CON:EFMP-305-5-13 | Limits of accommodation | سہولت کاری کی حدود | CON:EFMP-305-5-11 | 5.2 | SLO:EFMP-305-5-3 | ERQ-02 |
| CON:EFMP-305-5-14 | Admission without discrimination | بغیر امتیاز داخلہ | CON:EFMP-305-5-10 | 5.2 | SLO:EFMP-305-5-3 | ERQ-01, ERQ-03 |
| CON:EFMP-305-5-15 | Accessible building and campus as a duty | قابلِ رسائی عمارت اور احاطہ بطور ذمہ داری | CON:EFMP-305-5-14 | 5.2 | SLO:EFMP-305-5-3 | ERQ-03 |
| CON:EFMP-305-5-16 | Individualised support and appropriate modes of communication | انفرادی معاونت اور مناسب ذریعۂ ابلاغ | CON:EFMP-305-5-11 | 5.2 | SLO:EFMP-305-5-3 | RRQ-06, RRQ-07 |
| CON:EFMP-305-5-17 | Monitoring participation, attainment and completion | شرکت، حاصلات اور تکمیل کی نگرانی | CON:EFMP-305-5-14 | 5.2 | SLO:EFMP-305-5-3 | ERQ-03 |
| CON:EFMP-305-5-18 | The federal comparison and its limits | وفاقی ایکٹ سے موازنہ اور اس کی حدود | CON:EFMP-305-5-7, CON:EFMP-305-5-6 | 5.2 | SLO:EFMP-305-5-2 | MCQ-07, ERQ-05 |
| CON:EFMP-305-5-19 | School responsibilities audit | اسکولی ذمہ داریوں کا جائزہ | CON:EFMP-305-5-14, CON:EFMP-305-5-15, CON:EFMP-305-5-17 | 5.2 | SLO:EFMP-305-5-3 | ERQ-03 |
| CON:EFMP-305-5-20 | Teacher attitude as a pattern of decisions | استاد کا رویہ بطور فیصلوں کا سلسلہ | - | 5.3 | SLO:EFMP-305-5-4 | MCQ-08, ERQ-04 |
| CON:EFMP-305-5-21 | Attitude-action cycle | رویہ اور عمل کا چکر | CON:EFMP-305-5-20 | 5.3 | SLO:EFMP-305-5-4 | MCQ-09, RRQ-09 |
| CON:EFMP-305-5-22 | Low expectation | کم توقع | CON:EFMP-305-5-21 | 5.3 | SLO:EFMP-305-5-4 | RRQ-09, ERQ-04 |
| CON:EFMP-305-5-23 | Interrupting the cycle: duty at the decision, contact at the evidence | چکر توڑنا: فیصلے پر ذمہ داری، شاہدی پر رابطہ | CON:EFMP-305-5-21 | 5.3 | SLO:EFMP-305-5-4 | RRQ-09, ERQ-04 |
| CON:EFMP-305-5-24 | What Pakistani teachers report about inclusion | پاکستانی اساتذہ شمولیت کے بارے میں کیا بتاتے ہیں | CON:EFMP-305-5-20 | 5.3 | SLO:EFMP-305-5-4 | RRQ-08, ERQ-04 |
| CON:EFMP-305-5-25 | Scope limits of attitude evidence | رویے کے شواہد کی حدود | CON:EFMP-305-5-24 | 5.3 | SLO:EFMP-305-5-4 | RRQ-08 |
| CON:EFMP-305-5-26 | Policy-to-practice gap | پالیسی اور عمل کا فرق | - | 5.3 | SLO:EFMP-305-5-3, SLO:EFMP-305-5-4 | RRQ-10 |
| CON:EFMP-305-5-27 | Four levels of a gap: document, system, school, classroom | فرق کی چار سطحیں: دستاویز، نظام، اسکول، جماعت | CON:EFMP-305-5-26 | 5.3 | SLO:EFMP-305-5-3 | MCQ-10, RRQ-10 |
| CON:EFMP-305-5-28 | The teacher-sized portion of the gap | فرق کا وہ حصہ جو استاد کا ہے | CON:EFMP-305-5-27, CON:EFMP-305-5-20 | 5.3 | SLO:EFMP-305-5-4 | MCQ-10, ERQ-04 |

## Authored Urdu labels for G5 review

Twenty-six of the twenty-eight labels above are authored rather than banked; only Inclusive
education (inside `شمولیتی تعلیم کی قانونی تعریف`) and Attitude (inside `استاد کا رویہ بطور فیصلوں کا
سلسلہ`) are bound to banked pairs. They are listed here so a G5 reviewer can check them as a set
rather than hunting them in a table.

- National Education Policy - قومی تعلیمی پالیسی
- Policy statement is not a legal duty - پالیسی کا اعلان قانونی ذمہ داری نہیں
- The policy's inclusion commitments - پالیسی کے شمولیتی وعدے
- The policy's silences - پالیسی کی خاموشیاں
- Reading a policy: addressee, verb, mechanism, absence - پالیسی پڑھنے کے چار سوال
- Provincial and federal law after devolution - صوبائی اور وفاقی قانون، اختیارات کی منتقلی کے بعد
- Purpose and extent of the Sindh Act 2018 - سندھ ایکٹ 2018 کا مقصد اور دائرہ
- Statutory definition of inclusive education - شمولیتی تعلیم کی قانونی تعریف
- Statutory definition of a person with disabilities - معذور شخص کی قانونی تعریف
- Non-discrimination, purpose or effect - عدم امتیاز: مقصد ہو یا نتیجہ
- Reasonable accommodation - مناسب سہولت کاری
- Reasonable accommodation is not a budget test - مناسب سہولت کاری بجٹ کا سوال نہیں
- Limits of accommodation - سہولت کاری کی حدود
- Admission without discrimination - بغیر امتیاز داخلہ
- Accessible building and campus as a duty - قابلِ رسائی عمارت اور احاطہ بطور ذمہ داری
- Individualised support and appropriate modes of communication - انفرادی معاونت اور مناسب ذریعۂ ابلاغ
- Monitoring participation, attainment and completion - شرکت، حاصلات اور تکمیل کی نگرانی
- The federal comparison and its limits - وفاقی ایکٹ سے موازنہ اور اس کی حدود
- School responsibilities audit - اسکولی ذمہ داریوں کا جائزہ
- Teacher attitude as a pattern of decisions - استاد کا رویہ بطور فیصلوں کا سلسلہ
- Attitude-action cycle - رویہ اور عمل کا چکر
- Low expectation - کم توقع
- Interrupting the cycle: duty at the decision, contact at the evidence - چکر توڑنا: فیصلے پر ذمہ داری، شاہدی پر رابطہ
- What Pakistani teachers report about inclusion - پاکستانی اساتذہ شمولیت کے بارے میں کیا بتاتے ہیں
- Scope limits of attitude evidence - رویے کے شواہد کی حدود
- Policy-to-practice gap - پالیسی اور عمل کا فرق
- Four levels of a gap: document, system, school, classroom - فرق کی چار سطحیں: دستاویز، نظام، اسکول، جماعت
- The teacher-sized portion of the gap - فرق کا وہ حصہ جو استاد کا ہے

## Statutory terms: a translator instruction, not a preference

Six of the labels above render terms that appear in a **statute**. The Sindh Act of 2018 was
enacted in English, and official Urdu renderings of its terms, where they exist, were not retrieved
and are not claimed here. The G4 translator must therefore do two things that are not optional:

1. **Keep the English term in parentheses on first use** for the six statutory terms - inclusive
   education, person with disabilities, discrimination, reasonable accommodation,
   non-discrimination and accessibility - because a reader who later meets the Act itself, or a
   departmental circular, will meet the English words.
2. **Never paraphrase a quoted statutory passage.** Where the English unit quotes the Act, the Urdu
   edition carries a faithful translation **and** the English words of the quoted clause, because
   the argument of Topic 5.2 turns on the wording of one clause and a loose Urdu rendering would
   silently destroy it.

A G5 reviewer should treat any quoted clause that appears in Urdu only, without the English, as a
defect rather than a style choice.
