# EFMP-408 Unit 5: Urdu translation handoff

- Translator: agy, crew job `efmp-408-u05-translate`, 2026-11-25.
- English baseline: `4de49d901f7300b006dabfe8d7bfe21a1e863833` (`origin/main` and branch HEAD at start). English content, figures, manifest, sources, coverage and concepts are untouched, so the G2 en-draft evidence (`20261124T210439864Z-gates.json`) remains valid.
- Complete mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `unit-assessment.mdx` and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-05/`, path resolved via `resolveUnit()`.
- Six schematic sources: `static/img/figures/efmp-408/unit-05/fig-U5-{1..6}.ur.svg`, with generated `.ur.dark.svg` twins. Translated, styled with Nastaliq-first font stack, each `<desc>` equal to its page alt. Text geometry measured and verified clean with `measure-figure-text.mjs`.
- `translation_status` stays `draft` in both `index.mdx` files. G3 is still open and G5 has not happened. No certification, publication or done mark is recorded.

## Terminology working set

`key_terms` in the Urdu `index.mdx` binds strictly to accepted pairs from `specs/content/terminology.csv`:
- `Assessment` -> `تشخیص`
- `Classroom Assessment` -> `جماعتی تشخیص`
- `Formative Assessment` -> `تشکیلی تشخیص`
- `Summative Assessment` -> `مجموعی جائزہ`
- `Norm-Referenced Test` -> `معیارِ گروہی آزمائش`
- `Criterion-Referenced Test` -> `معیارِ کسوٹی آزمائش`
- `Rubric` -> `معیارِ جانچ`
- `Self-Assessment` -> `خود جائزہ`
- `Formative Feedback` -> `تشکیلی تاثرات`
- `Standardized Test` -> `معیاری آزمائش`
- `Achievement Test` -> `کارکردگی آزمائش`
- `Validity` -> `صداقت`
- `Reliability` -> `اعتماديت`

## Proposed terms for the owner and G5

These domain terms are not yet in `terminology.csv`. They follow the authored concept labels in `specs/content/efmp-408/concepts/unit-05.md` where one exists:

| English | Urdu used | Notes |
|---|---|---|
| Marking and Grading | نمبر دینے اور درجہ بندی | Concept label CON:EFMP-408-5-1 |
| Percentages and Grade Point Average | فیصد اور گریڈ پوائنٹ اوسط | Concept label CON:EFMP-408-5-2 |
| Reporting to Stakeholders | اسٹیک ہولڈرز کو رپورٹ | Concept label CON:EFMP-408-5-3 |
| Measures of Central Tendency | مرکزی رجحان کے پیمائشی اوسط | Concept label CON:EFMP-408-5-4 |
| Standard Deviation and Spread | معیاری انحراف اور پھیلاؤ | Concept label CON:EFMP-408-5-5 |
| Item Difficulty Index | آئٹم مشکل شاخص | Concept label CON:EFMP-408-5-6 |
| Item Discrimination Index | آئٹم امتیاز شاخص | Concept label CON:EFMP-408-5-7 |
| Mean | حسابی اوسط | Core statistical term (Topic 5.2) |
| Median | وسطانیہ | Core statistical term (Topic 5.2) |
| Mode | اعادہ | Core statistical term (Topic 5.2) |
| Spread / Range | پھیلاؤ / جماعتی وسعت (رینج) | Core statistical term (Topic 5.2) |
| Outlier | غیر معمولی انتہائی عدد | Statistical term (Topic 5.2) |
| Item analysis | آئٹم تجزیہ | Core concept (Topic 5.3) |
| Distractor | گمراہ کن متبادل / غلط متبادل | Item analysis term (Topic 5.3) |
| Credit hour | کریڈٹ آور | Academic weighting unit (Topic 5.1) |
| Report card | رپورٹ کارڈ | School reporting artifact (Topic 5.1) |

## Validation

- Final draft-state run (`npm run build:content-status && npm run check:content`): content gates pass cleanly.
- Heading-level vectors, `<Figure>`, `<PrintHandout>`, `<TranslationStatusBadge>` counts match English across all six files.
- Zero em dashes (U+2014, U+2015, U+2E3A, U+2E3B) across all authored `.mdx` and `.svg` files.
- `measure-figure-text.mjs` exits 0 on all 6 `.ur.svg` sources.
- `npm run figures:variants` generated all 6 `.ur.dark.svg` twins; `npm run figures:variants:check` passes clean across all 1675 figures in the repository.
- Temporary flip check: verified conditional parity gates by temporarily toggling `index.mdx` files to `reviewed` and reverting cleanly back to `draft`.

## Next owner

Independent G5 reviewer: compare passage-level meaning against English baseline `4de49d901f7300b006dabfe8d7bfe21a1e863833`, solve the Urdu assessment independently, and inspect the rendered Urdu bundle.
