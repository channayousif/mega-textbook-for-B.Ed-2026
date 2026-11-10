# EFPG-401 Unit 4 translation handoff

- Date: 2026-11-11. Translator: agy, branch `crew/efpg-401-u04-translate`.
- English checkout baseline: `b43a52ced`.
- Files translated and verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-04/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-04/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-04/unit-assessment.mdx`
- Figure assets localized and verified:
  - `static/img/figures/efpg-401/unit-04/fig-U4-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-04/fig-U4-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-04/fig-U4-3.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 3 mirror files match the English baseline structure, heading level vectors, component calls (`<Figure>`, `<PrintHandout>`), and frontmatter schemas.
- Topic title strictly follows the required format: `موضوع 4.1 - گرائمر کی تدریس کا فعلی طریقہ`.
- Unit assessment carries the complete 10 MCQ + 10 RRQ + 5 ERQ item banks with the bounded answers section (`## جوابات اور نمبر دہی کی رہنمائی`), identical marks and option mappings (A -> الف, B -> ب, C -> ج, D -> د).
- The Urdu `index.mdx` carries a bank-bound `key_terms` block; the English `index.mdx` does not.
- Zero em dashes (U+2014, U+2015, U+2E3A, U+2E3B) in all authored content and figure SVGs.
- The temporary `reviewed` flip (both `index.mdx` files) was used to run the parity, figure and terminology gates, and verified clean; reverted to `draft`.
- Text geometry measured and verified with `measure-figure-text.mjs` on all SVGs and derived dark variants.

## Banked Key Terms (Declared in index.mdx)

Every `ur` value conforms to `specs/content/terminology.csv`:
- `Learning`: `سیکھنا`
- `Learning Outcome`: `نتیجہ ہائے تعلم`
- `Pedagogy`: `تدریسیات`
- `Teaching Strategy`: `حکمتِ تدریس`
- `Assessment`: `تشخیص`
- `Summative Assessment`: `مجموعی جائزہ`
- `Self-Assessment`: `خود جائزہ`
- `Rubric`: `معیارِ جانچ`
- `Rote Learning`: `رٹا لگانا`
- `Active Learning`: `فعال تعلم`
- `Transfer of Learning`: `تعلم کی منتقلی`

## Proposed Terms (Unbanked) for Curriculum Owner

The following terms are specific to this unit and are not yet banked in `specs/content/terminology.csv`. They are translated in the mirror and recorded here for the owner, per the translate-unit skill (the bank was not edited):

| English Term | Proposed Urdu Label | Reference |
|---|---|---|
| Functional approach to grammar teaching | گرائمر کی تدریس کا فعلی طریقہ | CON:EFPG-401-4-1 |
| Form, meaning and use | صورت، معنی اور استعمال | CON:EFPG-401-4-2 |
| Inductive and deductive presentation | استقرائی اور استنباطی پیشکش | CON:EFPG-401-4-3 |
| Controlled and meaningful practice | محدود اور بامعنی مشق | CON:EFPG-401-4-4 |
| Declarative and procedural knowledge | بیانی اور عملی علم | CON:EFPG-401-4-5 |
| Present continuous | فعل حال جاری | Topic 4.1 |
| Substitution drill / table | متبادلات کی مشق / متبادل جدول | Topic 4.1 |
| Gap-fill | خالی جگہ پر کرنا | Topic 4.1 |
| Shallow-end approach | سطحی مرحلہ وار طریقہ | Topic 4.1 (Kiran, 2021) |
| Three-dimensional model | سہ جہتی ماڈل | Topic 4.1 (Larsen-Freeman) |

## Status and Handoff Note

- `translation_status` remains `draft` pending independent G5 review per constitution Article III.2 and ADR-0019.
- G4 tracker row recorded with `agent:agy` and handoff link; G5 remains open awaiting independent review.
- No G5 certification is claimed by this translation pass.
