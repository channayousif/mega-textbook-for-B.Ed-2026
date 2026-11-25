# EFMP-408 Unit 2: Urdu translation handoff

- Translator: agy, crew job `efmp-408-u02-translate`, 2026-11-25.
- English baseline: `b13c4db2a` (`origin/main` and branch HEAD at start). English content, figures, manifest, sources, coverage and concepts are unchanged, so the G2 en-draft evidence (`20261124T205350146Z-gates.json`) still binds the English.
- Complete mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `unit-assessment.mdx`, and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-02/`, path resolved through `resolveUnit()`.
- Six schematic sources: `static/img/figures/efmp-408/unit-02/fig-U2-{1..6}.ur.svg`, with generated `.ur.dark.svg` twins. Labels translated, layout mirrored for RTL, Nastaliq-first font stack, each `<desc>` equal to its page alt. Urdu labels wrapped in U+200F marks where appropriate so trailing punctuation and colons sit on the reading end. `measure-figure-text.mjs` exits 0 on all six sources and their dark twins, both with local Nastaliq and with `--ci-fonts`. Banner `fig-U2-7` remains prompt-only for the illustrate job.
- `translation_status` stays `draft` throughout the committed bundle. G3 remains open and G5 has not happened. No certification, publication action or done mark is recorded.

## Terminology working set

`key_terms` in the Urdu `index.mdx` uses only banked pairs from `specs/content/terminology.csv`:
- `Assessment` -> `تشخیص`
- `Bloom's Taxonomy` -> `بلوم کی درجہ بندی`
- `Validity` -> `صداقت`
- `Reliability` -> `اعتماديت`
- `Student-Learning Outcome` -> `طالب علم کا نتیجہ ہائے تعلم`
- `Formative Assessment` -> `تشکیلی تشخیص`
- `Summative Assessment` -> `جامع تشخیص`

## Proposed terms for the owner and G5

These are not in the bank. They follow the Urdu concept labels in `specs/content/efmp-408/concepts/unit-02.md` where one exists:

| English | Urdu used | Notes |
|---|---|---|
| Instructional objectives | ہدایاتی مقاصد / تدریسی مقاصد | Concept label CON:EFMP-408-2-1 |
| The Three Domains of Learning | سیکھنے کے تین شعبے | Concept label CON:EFMP-408-2-2 |
| Cognitive domain | ادراکی شعبہ | Topic 2.1 |
| Affective domain | جذباتی شعبہ | Topic 2.1 |
| Psychomotor domain | حرکی شعبہ | Topic 2.1 |
| Alignment | ہم آہنگی | Concept label CON:EFMP-408-2-3 |
| Content validity | مواد کی صداقت | Built on banked صداقت; Topic 2.2 |
| Construct validity | مفہومی صداقت | Built on banked صداقت; Topic 2.2 |
| Criterion validity | کسوٹی صداقت | Built on banked صداقت; Topic 2.2 |
| Concurrent validity | ہم وقت کسوٹی صداقت | Topic 2.2 |
| Predictive validity | پیشین گوئی کسوٹی صداقت | Topic 2.2 |
| Test-retest reliability | مکرر آزمائشی اعتماد | Built on banked اعتماديت; Topic 2.2 |
| Inter-rater reliability | بین الممتحن اعتماد | Built on banked اعتماديت; Topic 2.2 |
| Practicality | عملی قابلیت | Concept label CON:EFMP-408-2-6 |
| Usability | قابلِ استعمال ہونا | Concept label CON:EFMP-408-2-6 |
| Fairness | انصاف | Concept label CON:EFMP-408-2-7 |
| Freedom from bias / bias | غیر جانبداری / تعصب | Concept label CON:EFMP-408-2-7 |
| Bloom levels | یاد رکھنا، سمجھنا، اطلاق، تجزیہ، قدر پیمائی، تخلیق | Remember to Create (matches Unit 1) |

## Decisions G5 should check

- **Option letters.** Options use الف، ب، ج، د and the answer key uses the same letters; option order is unchanged.
- **Fair/biased scenario context.** Topic 2.3 and fig-U2-6 use the local Sindh market context (fruit seller in Sanghar selling apples) versus foreign ski resort sales, exactly matching the English counterpart.
- **Rubrics and mark schemes.** Mark breakdowns across criteria and parts match the English identically.
- **Render inspection.** The rendered Urdu pages were not inspected with local server `render-inspect.mjs`, because crew jobs may not run a local dev server or build. G5 needs that rendered evidence.

## Validation

- Final draft-state run (`npm run build:content-status && npm run check:content`): all content gates pass clean.
- Heading-level vectors, `<Figure>`, `<PrintHandout>`, `<TranslationStatusBadge>` counts and numbered-item counts match English in all six files.
- Temporary flip check: both `index.mdx` files set to `reviewed`, `npm run build:content-status && npm run check:content`: all gates pass, with `check:pipeline-gate` reporting only the two expected open G4/G5 rows for Unit 2 and zero terminology, file-parity or figure-parity findings. Both files then reverted back to `draft`.
- `scripts/heavy.sh node scripts/measure-figure-text.mjs` passed on all six `.ur.svg` files and `--ci-fonts`.
- `npm run figures:variants` generated 6 `.ur.dark.svg` files; `npm run figures:variants:check` passed clean.
- Zero em dashes across all files.

## Next owner

Independent G5 reviewer: compare passage-level meaning against `b13c4db2a`, solve the Urdu assessment independently, and inspect the rendered pages and figures.
