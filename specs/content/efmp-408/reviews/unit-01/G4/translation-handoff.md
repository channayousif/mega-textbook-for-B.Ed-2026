# EFMP-408 Unit 1: Urdu translation handoff

- Translator: agy, crew job `efmp-408-u01-translate`, 2026-11-24.
- English baseline: `0ac0a4071` (`origin/main` and branch HEAD at start). English content and figures are unchanged.
- Complete mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `unit-assessment.mdx`, and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-01/`, resolved through `resolveUnit()` and `urPathFor()`.
- Six schematic sources: `static/img/figures/efmp-408/unit-01/fig-U1-{1,2,3,5,6,7}.ur.svg`, with generated `.ur.dark.svg` twins. Layout and coordinates mirrored for RTL; Urdu labels use the Nastaliq-first font stack. Each description equals its page alt. Text geometry measured and verified clean with `measure-figure-text.mjs`.
- `translation_status` remains `draft` throughout the committed bundle. G3 remains open; G5 has not happened. No certification, publication action or done mark is recorded.

## Terminology working set

The unit binds to the banked terms in `specs/content/terminology.csv`:
- `Assessment` -> `تشخیص`
- `Formative Assessment` -> `تشکیلی تشخیص`
- `Summative Assessment` -> `مجموعی جائزہ`
- `Diagnostic Assessment` -> `تشخیصی جانچ`
- `Norm-Referenced Test` -> `معیارِ گروہی آزمائش`
- `Criterion-Referenced Test` -> `معیارِ کسوٹی آزمائش`
- `Classroom Assessment` -> `جماعتی تشخیص`
- `Formative Feedback` -> `تشکیلی تاثرات`
- `Self-Assessment` -> `خود جائزہ`

## Proposed terms for the owner and G5

As documented in `specs/content/efmp-408/concepts/unit-01.md`, several concept labels and domain terms are authored and proposed for independent review:

| English | Urdu used | Notes |
|---|---|---|
| Placement Assessment | تقرری جانچ | Authored concept label CON:EFMP-408-1-6 |
| Measurement | پیمائش | Authored concept label CON:EFMP-408-1-2 |
| Test | آزمائش | Authored concept label CON:EFMP-408-1-2 |
| Evaluation | جائزہ | Authored concept label CON:EFMP-408-1-2 |
| Appraisal | قدر پیمائی | Holistic qualitative estimation (Topic 1.1) |
| Nature of assessment | تشخیص کی نوعیت | Core concept CON:EFMP-408-1-1 |
| Purpose and role | مقصد اور تعلیمی کردار | Core concept CON:EFMP-408-1-3 |
| Norm-referenced interpretation | معیارِ گروہی تشریح | Core concept CON:EFMP-408-1-7 |
| Criterion-referenced interpretation | معیارِ کسوٹی تشریح | Core concept CON:EFMP-408-1-8 |
| Descriptive feedforward | وضاحتی تاثرات / فیڈ فارورڈ | Directional actionable feedback (Topic 1.2) |
| Exit ticket | خروجی پرچی | Formative check technique (Topic 1.2) |
| All-pupil response | تمام طلبہ کے یکساں جواب کا نظام | Slate/card checking (Topic 1.2) |
| Cut score | کٹ آف اسکور | Absolute standard benchmark (Topic 1.3) |

## Validation

- Baseline: all content gates passed on the untouched checkout, identical to `origin/main`.
- SVG text geometry: `scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efmp-408/unit-01/*.ur.svg` passed with 0 exit code across all 6 `.ur.svg` files.
- Dark variants: `npm run figures:variants` generated all 6 `.ur.dark.svg` variants; `npm run figures:variants:check` passed clean across all figures in the repository.
- Temporary conditional check: both `index.mdx` files were temporarily flipped to `reviewed`; `validate:content`, `check:figures`, `check:svg-style`, `check:no-em-dash` and all other gates passed clean; `check:pipeline-gate` reported only the expected open G4/G5 rows and zero terminology errors. Reverted cleanly back to `draft`.
- Final draft check: all content gates passed (`npm run build:content-status && npm run check:content`). Zero em dashes found across all files.

## Next owner

Independent G5 reviewer: compare passage-level meaning against the English baseline, solve the Urdu assessment independently, and verify the rendered bundle.
