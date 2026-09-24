# Concept graph - GQUR-300 Unit 2 (Numbers and Operations)

Per `specs/016-concept-graph-v4/contracts/concept-graph.md`. The fourth per-unit governance table,
beside `coverage/unit-02.md`, `sources/unit-02.md` and `figures/unit-02.md`. Those record what the
unit covers, what grounds it and what it shows; this records **what a learner must understand, and
in what order**.

`Topic` values are the `### Topic list` labels in `specs/content/gqur-300/content-spec.md`
(`## Unit 2`). `Assessment item IDs` are **derived** from `unit-assessment.mdx`'s existing
numbering under its three bank headings - no prose was changed to create them.

**Urdu labels.** None of these concepts match a term banked in
`specs/content/terminology.csv` (checked 2026-09-23), so every `Label UR` below is authored
here and **carries a G5 flag** (see the list at the foot of this file).

| Concept ID | Label EN | Label UR | Prerequisites | Topic | SLO refs | Assessment item IDs |
|---|---|---|---|---|---|---|
| CON:GQUR-300-2-1 | Whole numbers as counting numbers and zero | تمام اعداد بطور گنتی کے اعداد اور صفر | - | 2.1 | SLO:GQUR-300-1-1 | MCQ-01 |
| CON:GQUR-300-2-2 | Integers and negative numbers as honest bookkeeping | صحيح اعداد اور منفی اعداد بطور دیانتدار حساب کتاب | CON:GQUR-300-2-1 | 2.1 | SLO:GQUR-300-1-1 | MCQ-02, RRQ-02 |
| CON:GQUR-300-2-3 | Fractions as parts of wholes | کسریں بطور کسی پورے کے حصے | CON:GQUR-300-2-1 | 2.1 | SLO:GQUR-300-1-1 | MCQ-01 |
| CON:GQUR-300-2-4 | Decimals as place-value names for fractions | اعشاریے بطور کسروں کے مقامی قیمت والے نام | CON:GQUR-300-2-3 | 2.1 | SLO:GQUR-300-1-1 | MCQ-03 |
| CON:GQUR-300-2-5 | Multiplying by a number between 0 and 1 shrinks | صفر اور ایک کے درمیان عدد سے ضرب، نتیجہ چھوٹا کرتی ہے | CON:GQUR-300-2-3, CON:GQUR-300-2-4 | 2.1 | SLO:GQUR-300-1-1 | MCQ-04, RRQ-03 |
| CON:GQUR-300-2-6 | Ratio as comparison of two quantities | نسبت بطور دو مقداروں کا موازنہ | - | 2.2 | SLO:GQUR-300-3-3 | MCQ-05 |
| CON:GQUR-300-2-7 | Proportion as equal ratios, checked by cross-products | تناسب بطور برابر نسبتیں، ضربدری سے ثابت | CON:GQUR-300-2-6 | 2.2 | SLO:GQUR-300-3-3 | - |
| CON:GQUR-300-2-8 | Scaling by a multiplier, never by addition | پیمانہ بدلتے وقت ضربی عنصر، جمع کبھی نہیں | CON:GQUR-300-2-7 | 2.2 | SLO:GQUR-300-2-2 | MCQ-06, RRQ-04, RRQ-06 |
| CON:GQUR-300-2-9 | Percentage as a ratio per hundred | فیصد بطور سو میں سے نسبت | CON:GQUR-300-2-6 | 2.2 | SLO:GQUR-300-2-2 | RRQ-05 |
| CON:GQUR-300-2-10 | The four percentage situations including the reverse case | فیصد کی چار صورتحالیں بشمول الٹی صورت | CON:GQUR-300-2-9 | 2.2 | SLO:GQUR-300-2-2 | MCQ-07, ERQ-04 |
| CON:GQUR-300-2-11 | Powers as repeated multiplication; squares as areas | قوتیں بطور بار بار ضرب، مربع بطور رقبہ | - | 2.3 | SLO:GQUR-300-1-1 | MCQ-08 |
| CON:GQUR-300-2-12 | Square root as side from area, with bracketing | جذر بطور رقبے سے ضلع، ہمسایہ مربعوں کے درمیان | CON:GQUR-300-2-11 | 2.3 | SLO:GQUR-300-1-1 | MCQ-09, RRQ-07, RRQ-09 |
| CON:GQUR-300-2-13 | Choosing the operation by what the total does | کل کیا کام کرتی ہے، اسی سے عمل کا انتخاب | - | 2.3 | SLO:GQUR-300-2-2 | MCQ-10, RRQ-08, RRQ-10, ERQ-05 |

## Urdu labels needing G5 review

Authored rather than drawn from the terminology bank (no matching `term_en` in
`specs/content/terminology.csv` as of 2026-09-23). A reviewer should confirm each, and any that
survive review should be promoted into `specs/content/terminology.csv`:

- Whole numbers as counting numbers and zero - تمام اعداد بطور گنتی کے اعداد اور صفر
- Integers and negative numbers as honest bookkeeping - صحيح اعداد اور منفی اعداد بطور دیانتدار حساب کتاب
- Fractions as parts of wholes - کسریں بطور کسی پورے کے حصے
- Decimals as place-value names for fractions - اعشاریے بطور کسروں کے مقامی قیمت والے نام
- Multiplying by a number between 0 and 1 shrinks - صفر اور ایک کے درمیان عدد سے ضرب، نتیجہ چھوٹا کرتی ہے
- Ratio as comparison of two quantities - نسبت بطور دو مقداروں کا موازنہ
- Proportion as equal ratios, checked by cross-products - تناسب بطور برابر نسبتیں، ضربدری سے ثابت
- Scaling by a multiplier, never by addition - پیمانہ بدلتے وقت ضربی عنصر، جمع کبھی نہیں
- Percentage as a ratio per hundred - فیصد بطور سو میں سے نسبت
- The four percentage situations including the reverse case - فیصد کی چار صورتحالیں بشمول الٹی صورت
- Powers as repeated multiplication; squares as areas - قوتیں بطور بار بار ضرب، مربع بطور رقبہ
- Square root as side from area, with bracketing - جذر بطور رقبے سے ضلع، ہمسایہ مربعوں کے درمیان
- Choosing the operation by what the total does - کل کیا کام کرتی ہے، اسی سے عمل کا انتخاب
