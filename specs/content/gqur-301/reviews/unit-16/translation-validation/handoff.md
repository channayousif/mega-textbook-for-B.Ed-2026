# GQUR-301 Unit 16 Urdu translation handoff

## Bundle and status

Translated from checkout commit `89d7c508b6f5a038536d95b29ca1c597c48c2dac`.
The English unit was last authored in `c94f5b70`. Its six English MDX files, English figures,
approved content spec, figure briefs, concept graph, coverage and sources remain unchanged.
The prerequisite is the accepted deterministic G2 record, not certified G3. The existing
independent advisory G3 report leaves rendered accessibility inspection open.

The complete mirror contains `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`,
`unit-assessment.mdx` and `unit-teacher-notes.mdx`, resolved through `resolveUnit`/`urPathFor`
under `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-16/`.
All six MDX files retain `translation_status: draft`, matching the English baseline.

Six localized figures (`fig-U16-1` through `fig-U16-6`) have `.ur.svg` sources and generated
`.ur.dark.svg` twins under `static/img/figures/gqur-301/unit-16/`. Labels, titles and
accessible descriptions are translated; each description matches its Urdu page alt exactly.
Panel positions and arrows are reflected for RTL order, with end-anchored Urdu labels and
the wordmark at bottom left. The viewBoxes and underlying geometry are preserved.
SVG optimisation reports 3.6–6.1 KB per Urdu source, within the 20 KB budget.
English manifest rows retain their English source paths, prompts and descriptions.

Per translate-unit Step 7, no G4 row was appended or completed. The existing G4 row only
records the available draft and this handoff. G3/G5 were not signed or completed. These notes
and logs are translator preparation, not an independent review or evidence of certification.
They live in the excluded review-output directory so recording the handoff does not alter
the English G2 input set.

## Terminology working set

The frozen bank was read and not edited. The Urdu index declares the conformant entries:
Learning / سیکھنا; Learning Outcome / نتیجہ ہائے تعلم; Assessment / تشخیص;
Summative Assessment / مجموعی جائزہ; Memory / یادداشت; Problem Solving / مسئلہ حل کرنا;
Rubric / معیارِ جانچ; Self-Assessment / خود جائزہ.

The five English glossary keys are preserved unchanged: Frequency distribution, Histogram,
Population, Sample and Scatter plot. Their existing `definition_ur` entries were consulted.
No glossary definition or lookup key was changed.

Unbanked technical renderings below are proposals for owner/G5 consideration, not additions
to the terminology bank. The first six preserve the concept graph's authored labels:

| English term | Urdu rendering |
|---|---|
| Statistical model | شماریاتی نمونہ |
| Model check | نمونے کی جانچ |
| Problem-solving cycle | مسئلہ حل کرنے کا چکر |
| Observation unit and denominator | مشاہدے کی اکائی اور مخرج |
| Method integration | طریقوں کا باہمی ربط |
| Data-based decision | ڈیٹا پر مبنی فیصلہ |
| Statistical modeling | شماریاتی نمونہ سازی |
| Model card | نمونہ کارڈ |
| Sample | منتخب نمونہ |
| Sampling | نمونہ گیری |
| Population | آبادی |
| Assumption | مفروضہ |
| Prediction | پیش گوئی |
| Observed minus predicted | مشاہدہ منفی پیش گوئی |
| Pupil-day | طالب علم-دن |
| Operational definition | عملی تعریف |
| Missing data | گم شدہ ڈیٹا |
| Numerator | شمار کنندہ |
| Denominator | مخرج |
| Proportion | تناسب |
| Mean | اوسط |
| Median | وسطانیہ |
| Mode | منوال |
| Range | حدِ پھیلاؤ |
| Spread | پھیلاؤ |
| Variation | تغیر |
| Variance | تغیر |
| Deviation | انحراف |
| Standard deviation | معیاری انحراف |
| Scatter plot | نقاطی خاکہ |
| Bar chart | ستونی خاکہ |
| Cumulative frequency | مجموعی تعدد |
| Slope | ڈھلوان |
| Intercept | قطع |
| Regression line | رجعتی خط |
| Least-squares fit | کم ترین مربعات کا موزوں ترین خط |
| Permutations | تبادلات |
| Combinations | توافیق |
| Probability | احتمال |
| Probability distribution | احتمالی تقسیم |
| Random variable | تصادفی متغیر |
| Complement | تکملہ |
| Independence | آزادی |
| Dependence | باہمی انحصار |
| Estimation | تخمینہ |
| Inference | استنباط |
| Descriptive statistics | توصیفی شماریات |
| Inferential statistics | استنباطی شماریات |
| Confidence interval | اعتماد کا وقفہ |
| Coverage rate | شرحِ احاطہ |
| Margin of error | غلطی کا حاشیہ |
| Standard error | معیاری خطا |
| Null claim/value | صفر مفروضہ / صفر مفروضے کی قدر |
| Test statistic | آزمائشی شماریہ |
| Statistical significance | شماریاتی معنویت |
| Effect size | حجمِ اثر |
| Degrees of freedom | درجاتِ آزادی |
| Causal claim | سببی دعویٰ |
| Uncertainty | غیر یقینی کیفیت |

Model uses نمونہ while the sampling sense is explicitly منتخب نمونہ to distinguish them.
Owner/G5 should consider the shared rendering تغیر for general variation and technical
variance; the prose qualifies variance as نمونے کا تغیر or آبادی کا تغیر and gives its formula.
The bank provides no binding resolution. No unresolved substantive English correction was
silently incorporated. Western digits, quantities, citations, links, option ordering, scoring
and Bloom demand have been retained. The translator's arithmetic check gave MCQ choices
ب، الف، د، ج، ب، الف، د، ج، ب، الف, matching the translated final guidance; this is not G5.

## Validation and limits

- `check-content-origin-main.txt`: all 13 gates pass on `origin/main` at `07a0dce0` after
  generating its ignored content-status file.
- `check-content-temporary-reviewed.txt`: both indexes temporarily marked reviewed, with
  freshly generated content status. Content/heading parity, figures and terminology pass.
  Only the two intentionally unfinished G4/G5 tracker rows fail. Both indexes restored to draft
  in a `finally` block; no review claim is retained.
- `check-content-draft.txt`: final draft-state content gate result.
- `source-parity.txt`: file set, invariant metadata, draft status, heading vectors, component
  sequence, glossary/figure IDs, numbered-item totals and MDX compilation pass on all six pages;
  assessment bands remain 10/10/5.
- `figure-variants.txt`: derived dark variants are current.
- The first gate run reported a missing generated `static/content-status.json`. Running
  `npm run build:content-status` resolved it. It is ignored and not committed.

The brief prohibits a site build, dev server and Playwright. None was run. Actual Nastaliq
rendering, narrow 360px layout, embedded Latin bidi behaviour, table reading order, figure label
bounds and A4 print remain unverified. MDX compilation and SVG source validation are not visual
inspection. A host permitted to build and run `render-inspect.mjs GQUR-301 16 --locale ur` must
inspect every page and figure before independent G5 can be completed. An accepted G3 dependency
for the same English version is also required for G5 certification.

Next owners: the curriculum owner resolves proposed terminology; a permitted rendering host
provides Urdu render evidence; a fresh independent G5 reviewer compares the complete bundle.
Translation remains draft because these steps are pending. No Paperclip ticket was supplied.
