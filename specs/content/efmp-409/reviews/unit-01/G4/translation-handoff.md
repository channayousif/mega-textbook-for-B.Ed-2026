# EFMP-409 Unit 1: Urdu translation handoff

- Translator: agy, crew job `efmp-409-u01-translate`, 2026-11-25.
- English baseline: `cb9ff20cc` (`origin/main` and branch HEAD at start). English content and figures are unchanged.
- Complete mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`, and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-01/`, resolved through `resolveUnit()` and `urPathFor()`.
- Four schematic sources: `static/img/figures/efmp-409/unit-01/fig-U1-{1,2,3,4}.ur.svg`, with generated `.ur.dark.svg` twins. Layout and coordinates mirrored for RTL; Urdu labels use the Nastaliq-first font stack. Each description equals its page alt. Text geometry measured and verified clean with `measure-figure-text.mjs`.
- `translation_status` remains `draft` throughout the committed bundle. G3 remains open; G5 has not happened. No certification, publication action or done mark is recorded.

## Terminology working set

The unit binds to the banked terms in `specs/content/terminology.csv`:
- `Curriculum` -> `نصاب`
- `Learning` -> `سیکھنا`
- `Assessment` -> `تشخیص`
- `Self-Assessment` -> `خود جائزہ`
- `Profession` -> `پیشہ`
- `Development` -> `نشوونما`
- `Personality` -> `شخصیت`
- `Summative Assessment` -> `مجموعی جائزہ`
- `Rubric` -> `معیارِ جانچ`

## Proposed terms for the owner and G5

As documented in `specs/content/efmp-409/concepts/unit-01.md`, several concept labels and domain terms are authored and proposed for independent review:

| English | Urdu used | Notes |
|---|---|---|
| Foundations of education | تعلیم کی بنیادیں | Course title in `catalog/courses.json` |
| Meaning of education | تعلیم کا مفہوم | Authored concept label CON:EFMP-409-1-2 |
| Branches of philosophy | فلسفے کی شاخیں | Authored concept label CON:EFMP-409-1-3 |
| Philosophy-to-classroom chain | فلسفے سے کمرۂ جماعت تک کا سلسلہ | Authored concept label CON:EFMP-409-1-4 |
| Scope and importance of education and philosophy | تعلیم اور فلسفے کا دائرہ اور اہمیت | Authored concept label CON:EFMP-409-1-5 |
| Aims of education | تعلیم کے مقاصد | Authored concept label CON:EFMP-409-1-6 |
| Narrow meaning of education | تعلیم کا محدود مفہوم | Technical sense of education in institutions (Topic 1.1) |
| Broad meaning of education | تعلیم کا وسیع مفہوم | Lifelong experiential sense of education (Topic 1.1) |
| Metaphysics | مابعد الطبیعیات | Core branch of philosophy (Topic 1.1) |
| Epistemology | علمیات | Core branch of philosophy (Topic 1.1) |
| Axiology | قدرِیات | Core branch of philosophy (Topic 1.1) |
| Ethics | اخلاقیات | Sub-branch of axiology (Topic 1.1) |
| Aesthetics | جمالیات | Sub-branch of axiology (Topic 1.1) |
| Formal education | رسمی تعلیم | Institution-based education (Topic 1.2) |
| Non-formal education | غیر رسمی / نیم رسمی تعلیم | Flexible organised programmes (Topic 1.2) |
| Informal education | غیر منظم / فطری تعلیم | Unplanned life learning (Topic 1.2) |
| Individual aim | انفرادی مقصد | Five aims framework (Topic 1.2) |
| Social aim | معاشرتی مقصد | Five aims framework (Topic 1.2) |
| Vocational aim | پیشہ ورانہ مقصد | Five aims framework (Topic 1.2) |
| Moral aim | اخلاقی مقصد | Five aims framework (Topic 1.2) |
| Spiritual aim | روحانی مقصد | Five aims framework (Topic 1.2) |
| Educare | پرورش کرنا، پالنا پوسنا | Latin root verb (Topic 1.1) |
| Educere | باہر نکالنا، رہنمائی کرنا | Latin root verb (Topic 1.1) |
| Tarbiyah | تربیت | Islamic term for nurturing growth (Topic 1.1) |
| Ta'lim | تعلیم | Islamic term for teaching/informing (Topic 1.1) |
| Ta'dib | تادیب | Islamic term for training in right conduct (Topic 1.1) |

## Validation

- Baseline: all content gates passed on the untouched checkout, identical to `origin/main`.
- SVG text geometry: `scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efmp-409/unit-01/*.ur.svg` passed with 0 exit code across all 4 `.ur.svg` files.
- Dark variants: `npm run figures:variants` generated all 4 `.ur.dark.svg` variants; `npm run figures:variants:check` passed clean across all figures in the repository.
- Temporary conditional check: both `index.mdx` files were temporarily flipped to `reviewed`; `validate:content`, `check:figures`, `check:svg-style`, `check:no-em-dash` and all other gates passed clean; `check:pipeline-gate` reported only the expected open G4/G5 rows and zero terminology errors. Reverted cleanly back to `draft`.
- Final draft check: all content gates passed (`npm run build:content-status && npm run check:content`). Zero em dashes found across all files.

## Next owner

Independent G5 reviewer: compare passage-level meaning against the English baseline, solve the Urdu assessment independently, and verify the rendered bundle.
