# GENT-401 Unit 4: Urdu translation handoff

- Translator: agy, crew job `gent-401-u04-translate`, 2026-11-24.
- English baseline: `91287e81b` (`origin/main` and branch HEAD at start). English content and figures are unchanged.
- Complete mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`, and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-04/`, resolved through `resolveUnit()` and `urPathFor()`.
- Four schematic sources: `static/img/figures/gent-401/unit-04/fig-U4-{1,2,3,4}.ur.svg`, with generated `.ur.dark.svg` twins. Layout and coordinates mirrored for RTL; Urdu labels use the Nastaliq-first font stack. Each description equals its page alt. Text geometry measured and verified clean with `measure-figure-text.mjs`.
- `translation_status` remains `draft` throughout the committed bundle. G3 remains open; G5 has not happened. No certification, publication action or done mark is recorded.

## Terminology working set

As documented in `specs/content/gent-401/concepts/unit-04.md`, none of the Unit 4 business plan core terms are currently banked in `specs/content/terminology.csv`. Consequently, `key_terms: []` is declared in `index.mdx` to maintain banking integrity.

## Proposed terms for the owner and G5

No unbanked terms were added to `terminology.csv`. The following terms are proposed for independent language review:

| English | Urdu used | Notes |
|---|---|---|
| Business plan | کاروباری منصوبہ | Core concept CON:GENT-401-4-1 |
| Business plan components | کاروباری منصوبے کے اجزاء | Nine standard sections |
| Executive summary | انتظامی خلاصہ | Core concept CON:GENT-401-4-2 |
| Vision statement | تصور کا بیان | Core concept CON:GENT-401-4-3 |
| Mission statement | مقصد کا بیان | Core concept CON:GENT-401-4-3 |
| Marketing plan | مارکیٹنگ کا منصوبہ | Core concept CON:GENT-401-4-4 |
| Marketing mix (4Ps) | مارکیٹنگ مکس (مصنوع، قیمت، مقام، تشہیر) | Product, Price, Place, Promotion |
| Operational plan | عملیاتی منصوبہ | Core concept CON:GENT-401-4-5 |
| Operational workflow | عملیاتی بہاؤ / ورک فلو | Mapped in fig-U4-3 |
| Quality check / checkpoint | معیار کی جانچ / چیک پوائنٹ | Decision diamond in workflow |
| Organizational structure | تنظیمی ڈھانچہ | Core concept CON:GENT-401-4-6 |
| Chain of command | تنظیمی سلسلہ | Leadership hierarchy |
| Cost-plus pricing | لاگت میں منافع شامل کرنے کی قیمت (کاسٹ پلس پرائسنگ) | Pricing model |
| Value-based pricing | قدر پر مبنی قیمت (ویلیو بیسڈ پرائسنگ) | Pricing model |
| Penetration pricing | تعارفی کم قیمت (پینیٹریشن پرائسنگ) | Pricing model |
| Living document | زندہ دستاویز | Contrasted with static document |

## Validation

- Baseline: all 14 content gates passed on the untouched checkout, identical to `origin/main`.
- SVG text geometry: `scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/gent-401/unit-04/*.ur.svg` passed with 0 exit code across all 4 `.ur.svg` files.
- Dark variants: `npm run figures:variants` generated all 4 `.ur.dark.svg` variants; `npm run figures:variants:check` passed clean across all 1591 figures in the repository.
- Temporary conditional check: both `index.mdx` files were temporarily flipped to `reviewed`; `validate-content.mjs` and `check-figures.mjs` passed clean with parity enabled; `check:pipeline-gate` reported only the expected open G4/G5 rows and zero terminology errors. Reverted cleanly back to `draft`.
- Final draft check: all 14 content gates passed (`npm run build:content-status && npm run check:content`). Zero em dashes found across all files.

## Next owner

Independent G5 reviewer: compare passage-level meaning against the English baseline, solve the Urdu assessment independently, and verify the rendered bundle.
