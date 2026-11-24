# EFMP-408 Unit 6: Urdu translation handoff

- Translator: agy, crew job `efmp-408-u06-translate`, 2026-11-25.
- English baseline: `8fa83e44e` (`origin/main` and branch HEAD at start). English content and figures are unchanged.
- Complete mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `topic-04.mdx`, `unit-assessment.mdx`, and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-06/`, resolved through `resolveUnit()` and `urPathFor()`.
- Eight schematic sources: `static/img/figures/efmp-408/unit-06/fig-U6-{1,2,3,4,5,6,7,8}.ur.svg`, with generated `.ur.dark.svg` twins. Layout and coordinates mirrored for RTL; Urdu labels use the Nastaliq-first font stack. Each description equals its page alt. Text geometry measured and verified clean with `measure-figure-text.mjs`.
- `translation_status` remains `draft` throughout the committed bundle. G3 remains open; G5 has not happened. No certification, publication action or done mark is recorded.

## Terminology working set

The unit binds to the banked terms in `specs/content/terminology.csv`:
- `Standardized Test` -> `معیاری آزمائش`
- `Assessment` -> `تشخیص`
- `Formative Assessment` -> `تشکیلی تشخیص`
- `Summative Assessment` -> `مجموعی جائزہ`
- `Diagnostic Assessment` -> `تشخیصی جانچ`
- `Norm-Referenced Test` -> `معیارِ گروہی آزمائش`
- `Criterion-Referenced Test` -> `معیارِ کسوٹی آزمائش`
- `Validity` -> `صداقت`
- `Reliability` -> `اعتماديت`
- `Classroom Assessment` -> `جماعتی تشخیص`
- `Portfolio Assessment` -> `پورٹ فولیو تشخیص`
- `Self-Assessment` -> `خود جائزہ`
- `Professional Ethics` -> `پیشہ ورانہ اخلاقیات`
- `Code of Ethical Conduct` -> `ضابطہ اخلاق`
- `Ethical Dilemma` -> `اخلاقی مخمصہ`
- `Professional Standards` -> `پیشہ ورانہ معیارات`
- `National Professional Standards for Teachers` -> `اساتذہ کے لیے قومی پیشہ ورانہ معیارات`
- `Teacher Licensing` -> `اساتذہ کا لائسنس`
- `Continuous Professional Development` -> `مسلسل پیشہ ورانہ ترقی`
- `Rubric` -> `معیارِ جانچ`
- `Formative Feedback` -> `تشکیلی تاثرات`

## Proposed terms for the owner and G5

As documented in `specs/content/efmp-408/concepts/unit-06.md`, several concept labels and domain terms are authored and proposed for independent review:

| English | Urdu used | Notes |
|---|---|---|
| Standardized Testing and Standardization | معیاری آزمائش اور معیار بندی | Core concept CON:EFMP-408-6-1 |
| Norming and Psychometric Calibration | گروہی معیار اور پیمائشی تسکین | Core concept CON:EFMP-408-6-2 |
| National and International Testing Systems | قومی و بین الاقوامی امتحانی نظام | Core concept CON:EFMP-408-6-3 |
| Assessment Fairness and Systemic Bias | تشخیص میں انصاف اور نظامی تعصب | Core concept CON:EFMP-408-6-4 |
| Construct-irrelevant barrier | غیر متعلقہ رکاوٹ | Topic 6.2 and assessment |
| Academic Integrity and Malpractice | تعلیمی دیانت اور امتحانی بدعنوانی | Core concept CON:EFMP-408-6-5 |
| Confidentiality of Assessment Data | تشخیصی کوائف کی رازداری | Core concept CON:EFMP-408-6-6 |
| Digital Assessment Tools and CBT | ڈیجیٹل تشخیصی آلات اور کمپیوٹر جانچ | Core concept CON:EFMP-408-6-7 |
| Continuous and Competency-Based Assessment | مسلسل اور اہلیت پر مبنی تشخیص | Core concept CON:EFMP-408-6-8 |
| Computer-Adaptive Testing (CAT) | کمپیوٹر اڈاپٹیو ٹیسٹنگ | Topic 6.3 and assessment |
| Assessment Policy in Pakistani Schools | پاکستانی اسکولوں میں امتحانی حکمت عملی | Core concept CON:EFMP-408-6-9 |
| NPSTP Standard 5 Assessment | این پی ایس ٹی پی معیار 5 تشخیص | Core concept CON:EFMP-408-6-10 |
| Test-Based and Assessment-Based Cultures | امتحانی اور تشخیصی ثقافتیں | Core concept CON:EFMP-408-6-11 |
| Descriptive feedforward / feedback | وضاحتی تاثرات / اصلاحی رہنمائی | Formative guidance (Topic 6.3/6.4) |
| Exit ticket | خروجی پرچی | Formative check technique (Topic 6.4) |

## Validation

- Baseline: all content gates passed on the untouched checkout, identical to `origin/main`.
- SVG text geometry: `scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efmp-408/unit-06/*.ur.svg` passed with 0 exit code across all 8 `.ur.svg` files.
- Dark variants: `npm run figures:variants` generated all 8 `.ur.dark.svg` variants; `npm run figures:variants:check` passed clean across all figures in the repository.
- Temporary conditional check: both `index.mdx` files were temporarily flipped to `reviewed`; `validate:content`, `check:figures`, `check:svg-style`, `check:no-em-dash` and all other gates passed clean; `check:pipeline-gate` reported only the expected open G4/G5 rows and zero terminology errors. Reverted cleanly back to `draft`.
- Final draft check: all content gates passed (`npm run build:content-status && npm run check:content`). Zero em dashes found across all files.

## Next owner

Independent G5 reviewer: compare passage-level meaning against the English baseline, solve the Urdu assessment independently, and verify the rendered bundle.
