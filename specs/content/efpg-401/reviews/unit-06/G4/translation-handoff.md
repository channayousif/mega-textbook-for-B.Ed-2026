# EFPG-401 Unit 6 translation handoff

- Date: 2026-11-10. Translator: opencode, branch `crew/efpg-401-u06-translate`.
- English checkout baseline: `bb9166236` (`feat(efpg-401): author unit 6 English with ten placed figures`).
- Files translated and verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-06/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-06/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-06/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-06/topic-03.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-06/topic-04.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-06/topic-05.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-06/unit-assessment.mdx`
- Figure assets localized and verified:
  - `static/img/figures/efpg-401/unit-06/fig-U6-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-06/fig-U6-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-06/fig-U6-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-06/fig-U6-4.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-06/fig-U6-5.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-06/fig-U6-6.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-06/fig-U6-7.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-06/fig-U6-8.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-06/fig-U6-9.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-06/fig-U6-10.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 7 mirror files match the English baseline structure, heading level vectors, component calls (`<Figure>`, `<Glossary>`, `<PrintHandout>`), and frontmatter schemas.
- Topic titles strictly follow the required format: `موضوع 6.1 - ...` through `موضوع 6.5 - ...`.
- Unit assessment carries the complete 10 MCQ + 10 RRQ + 5 ERQ item banks with the bounded answers section (`## جوابات اور نمبر دہی کی رہنمائی`), identical marks and option mappings (A -> الف, B -> ب, C -> ج, D -> د).
- The Urdu `index.mdx` carries a bank-bound `key_terms` block; the English `index.mdx` does not.
- Zero em dashes (U+2014, U+2015, U+2E3A, U+2E3B) in all authored content and figure SVGs.
- The temporary `reviewed` flip (both `index.mdx` files) was used to run the parity, figure and terminology gates, then reverted; `translation_status` is `draft` in both files.

## Banked Key Terms (Declared in index.mdx)

Every `ur` value conforms to `specs/content/terminology.csv`:
- `Memory`: `یادداشت`
- `Attention`: `توجہ`
- `Learning`: `سیکھنا`
- `Learning Outcome`: `نتیجہ ہائے تعلم`
- `Short-Term Memory`: `قلیل مدتی یادداشت`
- `Long-Term Memory`: `طویل مدتی یادداشت`
- `Assessment`: `تشخیص`

## Proposed Terms (Unbanked) for Curriculum Owner

The following terms are specific to this unit and are not yet banked in `specs/content/terminology.csv`. They are translated in the mirror and recorded here for the owner, per the translate-unit skill (the bank was not edited):

| English Term | Proposed Urdu Label | Reference |
|---|---|---|
| Audio-visual aid(s) | سمعی و بصری وسائل | CON:EFPG-401-6-1 |
| Meaning (learner benefit) | معنی | CON:EFPG-401-6-1 |
| Participation (learner benefit) | شرکت | CON:EFPG-401-6-1 |
| Low-cost teaching aids | کم خرچ تدریسی وسائل | CON:EFPG-401-6-2 |
| Chart | چارٹ | Topic 6.2 |
| Flash card | فلش کارڈ | Topic 6.2 |
| Realia / real objects | حقیقی اشیاء | Topic 6.2 |
| Audio aids | سمعی وسائل | CON:EFPG-401-6-3 |
| Language laboratory | زبان لیبارٹری | CON:EFPG-401-6-3 |
| Video lesson | ویڈیو سبق | CON:EFPG-401-6-4 |
| Paralinguistic support | غیر لسانی سہارا | Topic 6.4 |
| Projected aids | پروجیکٹڈ وسائل | CON:EFPG-401-6-5 |
| Overhead projector | اوور ہیڈ پروجیکٹر | Topic 6.5 |
| Multimedia projector | ملٹی میڈیا پروجیکٹر | Topic 6.5 |
| Filmstrip | فلم اسٹرپ | Topic 6.5 |
| Clear slide | صاف سلائیڈ | Topic 6.5 |

## Status and Handoff Note

- `translation_status` remains `draft` pending independent G5 review per constitution Article III.2 and ADR-0019.
- No G4 tracker row was appended and no G5 certification is claimed: the translate-unit skill never appends a tracker row, and `reviewed` is what turns the parity gates on.
- No certification or approval is claimed by this translation pass.
