# EFPG-401 Unit 1 translation handoff

- Date: 2026-11-10. Translator: Antigravity, branch `crew/efpg-401-u01-translate`.
- English checkout baseline: `73c0c4c73` (`feat(efpg-401): author unit 01 four language skills and course overview`).
- Files translated and verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-01/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-01/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-01/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-01/topic-03.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-01/topic-04.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-01/unit-assessment.mdx`
- Figure assets localized and verified:
  - `static/img/figures/efpg-401/unit-01/fig-U1-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-01/fig-U1-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-01/fig-U1-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-01/fig-U1-4.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-01/fig-U1-5.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-01/fig-U1-6.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-01/fig-U1-7.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efpg-401/unit-01/fig-U1-8.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 6 mirror files match the English baseline structure, heading level vectors (100% exact vector parity), component calls (`<Figure>`, `<PrintHandout>`), and frontmatter schemas.
- Topic titles strictly follow the required format: `موضوع 1.1 - ...`, `موضوع 1.2 - ...`, `موضوع 1.3 - ...`, `موضوع 1.4 - ...`.
- Unit assessment carries complete 10 MCQ + 10 RRQ + 5 ERQ item banks with bounded answers section (`## جوابات اور نمبر دہی کی رہنمائی`), identical marks and option mappings (A -> الف, B -> ب, C -> ج, D -> د).
- Zero em dashes (U+2014, U+2015, U+2E3A, U+2E3B) in all authored content and figure SVGs.

## Banked Key Terms (Declared in index.mdx)

Every `ur` value conforms to `specs/content/terminology.csv`:
- `Second Language Acquisition`: `دوسری زبان کا حصول`
- `Pedagogy`: `تدریسیات`
- `Verbal Communication`: `زبانی ابلاغ`
- `Non-verbal Communication`: `غیر زبانی ابلاغ`
- `Active Learning`: `فعال تعلم`
- `Rote Learning`: `رٹا لگانا`
- `Scaffolding`: `معاونتی تدریس`
- `Assessment`: `تشخیص`

## Proposed Terms (Unbanked) for Curriculum Owner

The following concept labels from `specs/content/efpg-401/concepts/unit-01.md` and English language teaching pedagogy are specific to this unit and not yet banked in `specs/content/terminology.csv`:

| English Term | Proposed Urdu Label | Concept ID / Reference |
|---|---|---|
| Listening comprehension | سماعت کی تفہیم | CON:EFPG-401-1-1 |
| Three-stage listening pedagogy | تدریسِ سماعت کا سہ مرحلہ جاتی طریقہ | CON:EFPG-401-1-2 |
| Speaking climate and affective filter | بولنے کا سازگار ماحول اور جذباتی رکاوٹ | CON:EFPG-401-1-3 |
| Pronunciation, intonation, and dialogues | تلفظ، لب و لہجہ اور مکالمہ | CON:EFPG-401-1-4 |
| Silent reading and comprehension | خاموش مطالعہ اور تفہیم | CON:EFPG-401-1-5 |
| Reading sub-skills and methods | مطالعے کی ذیلی مہارتیں اور طریقے | CON:EFPG-401-1-6 |
| Handwriting and spelling mechanics | خوشخطی اور املا کی بنیادی مہارتیں | CON:EFPG-401-1-7 |
| Process writing and functional correspondence | تحریری عمل اور باضابطہ درخواست نگاری | CON:EFPG-401-1-8 |
| Total Physical Response (TPR) | مکمل جسمانی ردِ عمل | Topic 1.1 |
| Listening for gist | اجمالی سماعت | Topic 1.1 |
| Listening for specific detail | مخصوص تفصیل کے لیے سننا | Topic 1.1 |
| Skimming | سرسری مطالعہ | Topic 1.3 |
| Scanning | مخصوص تلاش | Topic 1.3 |
| Receptive skills | وصولی مہارتیں | Unit Overview |
| Productive skills | پیداواری مہارتیں | Unit Overview |

## Status and Handoff Note

- `translation_status` remains `draft` pending independent G5 review per constitution Article III.2 and ADR-0019.
- No certification or approval is claimed by this translation pass.
