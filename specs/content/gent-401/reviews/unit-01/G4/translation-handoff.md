# GENT-401 Unit 1: Urdu translation handoff

- Translator: agy, crew job `gent-401-u01-translate`, 2026-11-24.
- English baseline: `bd60c874b` (`origin/main` and branch HEAD at start). English content and figures are unchanged.
- Complete mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`, and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-01/`, resolved through `resolveUnit()` and `urPathFor()`.
- Four schematic sources: `static/img/figures/gent-401/unit-01/fig-U1-{1,2,3,4}.ur.svg`, with generated `.ur.dark.svg` twins. Layout and coordinates mirrored for RTL; Urdu labels use the Nastaliq-first font stack. Each description equals its page alt. Text geometry measured and verified clean with `measure-figure-text.mjs`.
- `translation_status` remains `draft` throughout the committed bundle. G3 remains open; G5 has not happened. No certification, publication action or done mark is recorded.

## Terminology working set

The following frozen-bank terms occur in the unit and are bound:

| Bank term | Accepted Urdu | Notes |
|---|---|---|
| Creativity | تخلیقیت | Row 58 in terminology.csv |
| Problem Solving | مسئلہ حل کرنا | Row 59 in terminology.csv |

Both `<Glossary term="Innovation">جدت</Glossary>` calls in topic-01 and topic-02 retain their English lookup keys and imports. Definition comes from `glossary.json` (`کوئی نیا خیال، طریقہ یا حل جو پہلے سے موجود چیز کو بہتر بنائے۔`). No changes were made to `terminology.csv` or `glossary.json`.

## Proposed terms for the owner and G5

No unbanked terms were added to `terminology.csv`. The following terms are proposed for independent language review:

| English | Urdu used | Notes |
|---|---|---|
| Entrepreneurship | کاروباری صلاحیت | Matches catalog Urdu title and concept graph |
| Entrepreneur | کاروباری فرد / کاروباری شخص | Plural: کاروباری افراد |
| Entrepreneurial venture | کاروباری اقدام | Used in topic-01 |
| Small business owner | چھوٹے کاروبار کا مالک | Contrast with entrepreneur |
| Innovation | جدت | In glossary.json; proposed for terminology.csv banking |
| Calculated risk | سوچا سمجھا خطرہ | Contrast with gambling |
| Invention | ایجاد | Contrast with innovation and creativity |
| Managerial thinking | انتظامی سوچ | Contrast with entrepreneurial thinking |
| Entrepreneurial thinking | کاروباری سوچ | Contrast with managerial thinking |
| Economic development | معاشی ترقی | Core concept in topic-01 |

## Validation

- Baseline: all 14 content gates passed on the untouched checkout, identical to `origin/main`.
- SVG text geometry: `scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/gent-401/unit-01/*.ur.svg` passed with 0 exit code across all 4 `.ur.svg` files.
- Dark variants: `npm run figures:variants` generated all 4 `.ur.dark.svg` variants; `npm run figures:variants:check` passed clean across all 1571 figures in the repository.
- Temporary conditional check: both `index.mdx` files were temporarily flipped to `reviewed`; `validate-content.mjs` and `check-figures.mjs` passed clean with parity enabled; `check:pipeline-gate` reported only the expected open G4/G5 rows and zero terminology errors. Reverted cleanly back to `draft`.
- Final draft check: all 14 content gates passed (`npm run build:content-status && npm run check:content`). Zero em dashes found across all files.

## Next owner

Independent G5 reviewer: compare passage-level meaning against the English baseline, solve the Urdu assessment independently, and verify the rendered bundle.
