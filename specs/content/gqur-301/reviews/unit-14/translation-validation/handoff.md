# GQUR-301 Unit 14 Urdu translation handoff

## Bundle and status

Translated from checkout commit `49b87768197f5e0b8d14c9e71c0e23eb2859c6f2`. The English unit was
last changed in `c161a4f3`. No English MDX, English figure, content spec, figure manifest,
concept graph, coverage or sources file was edited.

The draft mirror contains `index.mdx`, `topic-01.mdx`, `topic-02.mdx` and `unit-assessment.mdx`
(the English unit has no teacher-notes page), resolved through `resolveUnit` under
`i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-14/`. All four keep
`translation_status: draft`, matching the English baseline.

Four localized figures (`fig-U14-1` to `fig-U14-4`) have `.ur.svg` sources and generated
`.ur.dark.svg` twins under `static/img/figures/gqur-301/unit-14/`. Titles, labels and
descriptions are translated; each `<desc>` matches its Urdu page `alt` exactly. Number lines
and formulas stay left to right (mathematical convention); the fig-U14-2 table columns and the
fig-U14-3 side panels are mirrored for RTL reading order; the wordmark moves to bottom left.
In fig-U14-4 the reading panel moved from x=520 to x=530 so it no longer overlaps sample 5's
interval (an overlap present in the English source). Urdu sources are 4.0-6.3 KB each.

Per translate-unit Step 7, the G4 row stays `▢`; its note only points to this handoff.
G3 and G5 were not signed or completed. This file is translator preparation, not review.

## The English baseline is not settled

G3 (`reviews/unit-14/G3/crew-20261023.json`) escalated with five blocking findings. The skill
forbids silently correcting English during translation, so the Urdu carries the English
content as it stands, including these known defects:

- F1: the topic-01 data list sums to 503, not 513 (topic-01, topic-02, fig-U14-2, RRQ 1 key).
- F2: topic-02's opening range 30.5 to 37.9 contradicts the worked interval (32.28, 36.12).
- F3: z* = 1.96 is used with s at n = 9 to 25 where a t critical value is standard.
- F4: fig-U14-4 English subtitle clipped. The Urdu subtitle is shorter and placed at y=62.
- F5: the 14.2 rubric interval 2.12 to 2.68 should be 2.13 to 2.67.
- Also mirrored as-is: topic-01 "(n = 513 / 15 = 34.2)" labels the mean as n; the English
  `<Figure>` for fig-U14-4 declares height 420 while its viewBox is 480 tall.

When the author repairs these, the same edits must be applied to the Urdu files and the
`.ur.svg` labels (fig-U14-2 holds `513 / 15`), and the G4 pass re-run against the new English.

## Terminology working set

The frozen bank was read and not edited. The Urdu index declares only bank-conformant entries:
Learning Outcome / نتیجہ ہائے تعلم; Learning / سیکھنا; Assessment / تشخیص;
Summative Assessment / مجموعی جائزہ; Rubric / معیارِ جانچ; Self-Assessment / خود جائزہ.
`Reliability` (bank: اعتماديت) was not declared: the English uses "reliability of the process"
in its everyday sense, not the psychometric term.

The eight `<Glossary>` keys (Parameter, Statistic, Estimator, Point estimate, Confidence
interval, Margin of error, Normal model, Confidence level) are unchanged.

Concept labels are used as authored in `concepts/unit-14.md`: اندازہ لگانے والا, نقطہ اندازہ,
وقفہ اندازہ, اعتماد وقفہ, اعتماد سطح, غلطی کی حد. These differ from Unit 16's proposals
(اعتماد کا وقفہ, غلطی کا حاشیہ); the owner should settle one form for the course.

Unbanked renderings, proposed for owner/G5 review:

| English term | Urdu rendering |
|---|---|
| Estimation | تخمینہ |
| Statistic | شماریہ |
| Parameter | پیرامیٹر |
| Population | آبادی |
| Sample | نمونہ |
| Sampling variability | نمونہ گیری کا تغیر |
| Standard error | معیاری خطا |
| Standard deviation | معیاری انحراف |
| Critical value | فیصلہ کن قدر |
| Unbiased | غیر جانبدار |
| Normal model / t-model | نارمل ماڈل / t-ماڈل |
| Proportion | تناسب |
| Frequentist | تکراری |
| Posterior probability | پسین احتمال |
| Bloom: Evaluate | قدر پیمائی کرنا |

## Glossary defects outside this job's scope

Several `definition_ur` entries in `glossary.json` that these pages render are corrupted and
will show on the Urdu pages: Confidence level contains the English word "stoppages" and
"فیسب سب"; Margin of error has "نماوندی مقدار" and "اسے میں سے کھینچا جاتا"; Normal model has
"تشہیری" (for symmetric) and "قدری"; Estimator has "نمون۔ اوسط". `glossary.json` is outside
this unit's scope and was not edited. The owner of the glossary should repair them before G5.

## Validation and limits

- `check-content-draft.txt`: final draft state. 12 of 13 gates pass; `check:content-status`
  fails because the tracked `static/content-status.json` is stale, which origin/main also shows.
- `check-content-temporary-reviewed.txt`: both indexes temporarily set to `reviewed` with a
  freshly generated content status. File-set and heading parity, figure parity and `key_terms`
  pass. Only the unfinished G4/G5 tracker rows fail. Both indexes were restored to `draft` and
  `static/content-status.json` was restored from Git.
- `figure-variants.txt`: dark variants are current.
- Hand checks: heading level vectors match on all four pages; component counts match
  (Figure 4, Glossary 9, PrintHandout 3, TranslationStatusBadge 1); numbered items 5/11/14/35
  and 40 MCQ options match; option order unchanged. The translator answered the Urdu MCQs from
  the Urdu alone and got ب، ج، ج، ب، ب، ج، ب، ج، ج، الف, matching the translated key. This is
  not G5.

The brief prohibits a site build, dev server and Playwright, so none was run. Nastaliq shaping,
360px layout, bidi of embedded numbers and Latin, table reading order, `.ur.svg` label bounds
and A4 print are unverified. Nastaliq sets taller than Latin; the step boxes in fig-U14-3 and
the annotation panels in fig-U14-1 and fig-U14-2 are the likeliest places for clipping or
overflow. A permitted host should run `render-inspect.mjs GQUR-301 14 --locale ur` before G5.
