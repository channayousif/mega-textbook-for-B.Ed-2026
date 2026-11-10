# EFPG-401 Unit 7 translation handoff

- Date: 2026-11-11. Translator: agy, branch `crew/efpg-401-u07-translate`.
- English checkout baseline: `0c79bb31d` (`feat(efpg-401): author unit 7 assessment with four placed figures`).
- Files translated and verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-07/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-07/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-07/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-07/unit-assessment.mdx`
- Figure assets localized and verified:
  - `static/img/figures/efpg-401/unit-07/fig-U7-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-07/fig-U7-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-07/fig-U7-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-07/fig-U7-4.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 4 mirror files match the English baseline structure, heading level vectors, component calls (`<Figure>`, `<Glossary>`, `<PrintHandout>`), and frontmatter schemas.
- Topic titles strictly follow the required format: `موضوع 7.1 - ...` and `موضوع 7.2 - ...`.
- Unit assessment carries the complete 10 MCQ + 10 RRQ + 5 ERQ item banks with the bounded answers section (`## جوابات اور نمبر دہی کی رہنمائی`), identical marks and option mappings (A -> الف, B -> ب, C -> ج, D -> د).
- The Urdu `index.mdx` carries a bank-bound `key_terms` block; the English `index.mdx` does not.
- Zero em dashes (U+2014, U+2015, U+2E3A, U+2E3B) in all authored content and figure SVGs.
- The temporary `reviewed` flip (both `index.mdx` files) was used to run the parity, figure and terminology gates, and verified clean; reverted to `draft`.

## Banked Key Terms (Declared in index.mdx)

Every `ur` value conforms to `specs/content/terminology.csv`:
- `Assessment`: `تشخیص`
- `Learning`: `سیکھنا`
- `Learning Outcome`: `نتیجہ ہائے تعلم`
- `Rubric`: `معیارِ جانچ`
- `Validity`: `صداقت`
- `Reliability`: `اعتماديت`
- `Self-Assessment`: `خود جائزہ`
- `Summative Assessment`: `مجموعی جائزہ`

## Proposed Terms (Unbanked) for Curriculum Owner

The following terms are specific to this unit and are not yet banked in `specs/content/terminology.csv`. They are translated in the mirror and recorded here for the owner, per the translate-unit skill (the bank was not edited):

| English Term | Proposed Urdu Label | Reference |
|---|---|---|
| Objective-type test | موضوعي ٹیسٹ / معروضی ٹیسٹ | CON:EFPG-401-7-1 |
| Multiple-choice item construction | کثیر الانتخابی سوال کی تعمیر | CON:EFPG-401-7-2 |
| Subjective-type test | ذوقی ٹیسٹ / انشائی ٹیسٹ | CON:EFPG-401-7-3 |
| Analytic marking rubric | تجزیاتی معیارِ جانچ | CON:EFPG-401-7-4 |
| Multiple choice | کثیر الانتخابی | Topic 7.1 |
| True/false | درست یا غلط | Topic 7.1 |
| Matching | جوڑ ملانا | Topic 7.1 |
| Fill in the blank | خالی جگہ پر کرنا | Topic 7.1 |
| Stem | بنیادی عبارت / اصل سوال (stem) | Topic 7.1 |
| Key | درست جواب / کلید (key) | Topic 7.1 |
| Distractor | غلط متبادل (distractor) | Topic 7.1 |
| Mark scheme | نمبروں کی اسکیم / نمبر دہی کی اسکیم | Topic 7.2 |

## Status and Handoff Note

- `translation_status` remains `draft` pending independent G5 review per constitution Article III.2 and ADR-0019.
- G4 tracker row recorded with `agent:agy` and handoff link; G5 remains open awaiting independent review.
- No G5 certification is claimed by this translation pass.
