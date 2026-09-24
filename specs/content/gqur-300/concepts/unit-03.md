# Concept graph - GQUR-300 Unit 3 (Algebraic Reasoning)

Per `specs/016-concept-graph-v4/contracts/concept-graph.md`. The fourth per-unit governance table,
beside `coverage/unit-03.md`, `sources/unit-03.md` and `figures/unit-03.md`. Those record what the
unit covers, what grounds it and what it shows; this records **what a learner must understand, and
in what order**.

`Topic` values are the `### Topic list` labels in `specs/content/gqur-300/content-spec.md`
(`## Unit 3`). `Assessment item IDs` are **derived** from `unit-assessment.mdx`'s existing
numbering under its three bank headings - no prose was changed to create them.

**Urdu labels.** None of these concepts match a term banked in
`specs/content/terminology.csv` (checked 2026-09-23), so every `Label UR` below is authored
here and **carries a G5 flag** (see the list at the foot of this file).

| Concept ID | Label EN | Label UR | Prerequisites | Topic | SLO refs | Assessment item IDs |
|---|---|---|---|---|---|---|
| CON:GQUR-300-3-1 | Patterns as growing rules | نمونے بطور بڑھتے ہوئے قاعدے | - | 3.1 | SLO:GQUR-300-1-1 | MCQ-01 |
| CON:GQUR-300-3-2 | Sequences as the pattern's outputs | تسلسل بطور نمونے کے نتیجے | CON:GQUR-300-3-1 | 3.1 | SLO:GQUR-300-1-1 | RRQ-01 |
| CON:GQUR-300-3-3 | Growth type points to the rule's shape | بڑھوٹر کی قسم قاعدے کی شکل بتاتی ہے | CON:GQUR-300-3-1 | 3.1 | SLO:GQUR-300-1-1 | MCQ-01 |
| CON:GQUR-300-3-4 | Variable as a named, changing quantity | متغیر بطور نامزد اور بدلتی ہوئی مقدار | - | 3.1 | SLO:GQUR-300-1-1 | MCQ-03 |
| CON:GQUR-300-3-5 | Expression as a machine, not a riddle | اثر بطور مشین، پہیلی نہیں | CON:GQUR-300-3-4 | 3.1 | SLO:GQUR-300-1-1 | MCQ-04, RRQ-02 |
| CON:GQUR-300-3-6 | Algebra vocabulary: coefficient, term, equation | الجبرا کی اصطلاحات: عددِ ضرب، رکن، مساوات | CON:GQUR-300-3-4 | 3.1 | SLO:GQUR-300-1-1 | RRQ-03 |
| CON:GQUR-300-3-7 | Equation as balance | مساوات بطور ترازو | CON:GQUR-300-3-6 | 3.2 | SLO:GQUR-300-1-1 | MCQ-05 |
| CON:GQUR-300-3-8 | The solve-and-check method | حل اور جانچ کا طریقہ | CON:GQUR-300-3-7 | 3.2 | SLO:GQUR-300-2-2 | MCQ-05, RRQ-04, RRQ-05 |
| CON:GQUR-300-3-9 | The equals sign means balance, not "answer next" | برابر کا نشان ترازو کا مطلب رکھتا ہے | CON:GQUR-300-3-7 | 3.2 | SLO:GQUR-300-1-1 | RRQ-07 |
| CON:GQUR-300-3-10 | Inequality as a range | نابرابری بطور حد | CON:GQUR-300-3-7 | 3.2 | SLO:GQUR-300-2-2 | MCQ-06 |
| CON:GQUR-300-3-11 | The sign flip on negative multiplication | منفی سے ضرب دینے پر علامت کا پلٹنا | CON:GQUR-300-3-10 | 3.2 | SLO:GQUR-300-2-2 | MCQ-07, RRQ-06 |
| CON:GQUR-300-3-12 | The translate-solve-interpret-decide loop | ترجمہ، حل، تشریح، فیصلہ کا چکر | CON:GQUR-300-3-8 | 3.3 | SLO:GQUR-300-2-2 | MCQ-10, RRQ-08 |
| CON:GQUR-300-3-13 | Comparing two expressions settles a family of questions | دو اثروں کا موازنہ پورے خاندان کے سوالات حل کرتا ہے | CON:GQUR-300-3-12 | 3.3 | SLO:GQUR-300-2-2 | MCQ-09, RRQ-09, RRQ-10, ERQ-03 |

## Urdu labels needing G5 review

Authored rather than drawn from the terminology bank (no matching `term_en` in
`specs/content/terminology.csv` as of 2026-09-23). A reviewer should confirm each, and any that
survive review should be promoted into `specs/content/terminology.csv`:

- Patterns as growing rules - نمونے بطور بڑھتے ہوئے قاعدے
- Sequences as the pattern's outputs - تسلسل بطور نمونے کے نتیجے
- Growth type points to the rule's shape - بڑھوٹر کی قسم قاعدے کی شکل بتاتی ہے
- Variable as a named, changing quantity - متغیر بطور نامزد اور بدلتی ہوئی مقدار
- Expression as a machine, not a riddle - اثر بطور مشین، پہیلی نہیں
- Algebra vocabulary: coefficient, term, equation - الجبرا کی اصطلاحات: عددِ ضرب، رکن، مساوات
- Equation as balance - مساوات بطور ترازو
- The solve-and-check method - حل اور جانچ کا طریقہ
- The equals sign means balance, not "answer next" - برابر کا نشان ترازو کا مطلب رکھتا ہے
- Inequality as a range - نابرابری بطور حد
- The sign flip on negative multiplication - منفی سے ضرب دینے پر علامت کا پلٹنا
- The translate-solve-interpret-decide loop - ترجمہ، حل، تشریح، فیصلہ کا چکر
- Comparing two expressions settles a family of questions - دو اثروں کا موازنہ پورے خاندان کے سوالات حل کرتا ہے
