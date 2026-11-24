# GENT-401 Unit 7: Urdu translation handoff

- Translator: agy, crew job `gent-401-u07-translate`, 2026-11-24.
- English baseline: `e82d04b42` (`origin/main` and branch HEAD at start). English content and figures are unchanged.
- Complete mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`, and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-07/`, resolved through `resolveUnit()` and `urPathFor()`.
- Four schematic sources: `static/img/figures/gent-401/unit-07/fig-U7-{1,2,3,4}.ur.svg`, with generated `.ur.dark.svg` twins. Layout and coordinates mirrored for RTL; Urdu labels use the Nastaliq-first font stack. Each description equals its page alt. Text geometry measured and verified clean with `measure-figure-text.mjs`.
- `translation_status` remains `draft` throughout the committed bundle. G3 remains open; G5 has not happened. No certification, publication action or done mark is recorded.

## Terminology working set

The unit binds to the banked terms in `specs/content/terminology.csv`:
- `Verbal Communication` -> `زبانی ابلاغ`
- `Non-verbal Communication` -> `غیر زبانی ابلاغ`
- `Rubric` -> `معیارِ جانچ`
- `Self-Assessment` -> `خود تشخیصی`
- `Summative Assessment` -> `جامع تشخیص`

## Proposed terms for the owner and G5

As documented in `specs/content/gent-401/concepts/unit-07.md`, none of the six core concept labels are banked in `specs/content/terminology.csv`. No unbanked terms were added to `terminology.csv`. The following terms are proposed for independent language review:

| English | Urdu used | Notes |
|---|---|---|
| Leadership and team building | قیادت اور ٹیم بنانا / قیادت اور ٹیم سازی | Core concept CON:GENT-401-7-1 |
| Scaling strategies | ترقی کے لیے حکمت عملی / وسعت کی حکمت عملیاں | Core concept CON:GENT-401-7-2 |
| Risk management | خطرے کا انتظام / خطرات کا انتظام | Core concept CON:GENT-401-7-3 |
| Pitch structure | پچ کی ساخت | Core concept CON:GENT-401-7-4 |
| Investor presentations | سرمایہ کاروں کے لیے پیشکش | Core concept CON:GENT-401-7-5 |
| Communication skills for a pitch | پچ کے لیے رابطے کی مہارتیں / مواصلاتی مہارتیں | Core concept CON:GENT-401-7-6 |
| Pitch | پچ | Defined in glossary.json |
| Team building | ٹیم سازی | Defined in glossary.json |
| Pitch deck | پچ ڈیک | Slide presentation supporting talk |
| Risk matrix | رسک میٹرکس | Likelihood vs impact matrix |
| Ask | مانگ (طلب) | Specific resource requested |
| Hook | ہک (آغاز) | Attention-grabbing opening |
| Complementary skills | تکمیلی مہارتیں | Diverse skill sets in a team |

## Validation

- Baseline: all 14 content gates passed on the untouched checkout, identical to `origin/main`.
- SVG text geometry: `scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/gent-401/unit-07/*.ur.svg` passed with 0 exit code across all 4 `.ur.svg` files.
- Dark variants: `npm run figures:variants` generated all 4 `.ur.dark.svg` variants; `npm run figures:variants:check` passed clean across all 1619 figures in the repository.
- Temporary conditional check: both `index.mdx` files were temporarily flipped to `reviewed`; `validate:content`, `check:figures`, `check:svg-style`, `check:no-em-dash` and all other gates passed clean; `check:pipeline-gate` reported only the expected open G4/G5 rows and zero terminology errors. Reverted cleanly back to `draft`.
- Final draft check: all 14 content gates passed (`npm run build:content-status && npm run check:content`). Zero em dashes found across all files.

## Next owner

Independent G5 reviewer: compare passage-level meaning against the English baseline, solve the Urdu assessment independently, and verify the rendered bundle.
