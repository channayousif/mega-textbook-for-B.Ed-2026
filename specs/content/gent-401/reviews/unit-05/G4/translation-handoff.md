# GENT-401 Unit 5: Urdu translation handoff

- Translator: agy, crew job `gent-401-u05-translate`, 2026-11-24.
- English baseline: `6ba1de283` (`origin/main` and branch HEAD at start). English content and figures are unchanged.
- Complete mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`, and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-05/`, resolved through `resolveUnit()` and `urPathFor()`.
- Four schematic sources: `static/img/figures/gent-401/unit-05/fig-U5-{1,2,3,4}.ur.svg`, with generated `.ur.dark.svg` twins. Layout and coordinates mirrored for RTL; Urdu labels use the Nastaliq-first font stack. Each description equals its page alt. Text geometry measured and verified clean with `measure-figure-text.mjs`.
- `translation_status` remains `draft` throughout the committed bundle. G3 remains open; G5 has not happened. No certification, publication action or done mark is recorded.

## Terminology working set

As documented in `specs/content/gent-401/concepts/unit-05.md`, none of the Unit 5 financial planning core terms are currently banked in `specs/content/terminology.csv`. Consequently, `key_terms: []` is declared in `index.mdx` to maintain banking integrity.

## Proposed terms for the owner and G5

No unbanked terms were added to `terminology.csv`. The following terms are proposed for independent language review:

| English | Urdu used | Notes |
|---|---|---|
| Start-up costs | ابتدائی اخراجات / شروع کے اخراجات | Core concept CON:GENT-401-5-1 |
| Budget | بجٹ | Forward financial planning |
| Fixed costs | مقررہ اخراجات | Monthly constant overhead |
| Variable costs | متغیر اخراجات | Unit volume-dependent costs |
| Break-even point / analysis | بریک ایوین پوائنٹ / بریک ایوین تجزیہ | Core concept CON:GENT-401-5-2 |
| Contribution margin | کنٹری بیوشن مارجن | Price minus variable cost |
| Basic financial statements | بنیادی مالی گوشوارے | Core concept CON:GENT-401-5-3 |
| Income statement | انکم اسٹیٹمنٹ (آمدنی کا گوشوارہ) | Revenue minus expenses |
| Balance sheet | بیلنس شیٹ | Assets = Liabilities + Equity |
| Cash flow statement / cash flow | کیش فلو اسٹیٹمنٹ / کیش فلو (نقد بہاؤ) | Cash timing vs paper profit |
| Bootstrapping | بوٹ اسٹریپنگ / خود سرمایہ کاری | Core concept CON:GENT-401-5-4 |
| Bank loan | بینک قرض | Debt financing |
| Debt financing | قرض پر مبنی مالی معاونت | Must repay with interest |
| Equity financing | حصہ داری پر مبنی مالی معاونت (ایکویٹی فنانسنگ) | Sells part ownership |
| Angel investor | اینجل سرمایہ کار | Core concept CON:GENT-401-5-5 |
| Venture capital | وینچر کیپیٹل | Core concept CON:GENT-401-5-5 |
| Crowdfunding | کراؤڈ فنڈنگ | Core concept CON:GENT-401-5-6 |
| Collateral | ضمانت (رہن) | Security for bank debt |

## Validation

- Baseline: all 14 content gates passed on the untouched checkout, identical to `origin/main`.
- SVG text geometry: `scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/gent-401/unit-05/*.ur.svg` passed with 0 exit code across all 4 `.ur.svg` files.
- Dark variants: `npm run figures:variants` generated all 4 `.ur.dark.svg` variants; `npm run figures:variants:check` passed clean across all 1607 figures in the repository.
- Temporary conditional check: both `index.mdx` files were temporarily flipped to `reviewed`; `validate-content.mjs` and `check-figures.mjs` passed clean with parity enabled; `check:pipeline-gate` reported only the expected open G4/G5 rows and zero terminology errors. Reverted cleanly back to `draft`.
- Final draft check: all 14 content gates passed (`npm run build:content-status && npm run check:content`). Zero em dashes found across all files.

## Next owner

Independent G5 reviewer: compare passage-level meaning against the English baseline, solve the Urdu assessment independently, and verify the rendered bundle.
