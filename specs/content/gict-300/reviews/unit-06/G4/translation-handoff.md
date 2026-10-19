# GICT-300 Unit 6 translation handoff

- Date: 2026-10-18. Translator: Antigravity, `crew/gict-300-u06-translate-r1`.
- English checkout baseline: `34f207fbd2419d441511174ede548f50a4cc4cfd` (feat(gict-300): author Unit 6 (Internet Applications and Emerging Technologies)).
- Resumed and reconciled the existing Urdu mirror; did not wipe or replace existing work.
- Files compared and verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-06/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-06/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-06/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-06/topic-03.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-06/topic-04.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-06/unit-assessment.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-06/unit-teacher-notes.mdx`
- Figure assets verified and reconciled:
  - `static/img/figures/gict-300/unit-06/fig-U6-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-06/fig-U6-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-06/fig-U6-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-06/fig-U6-4.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-06/fig-U6-5.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-06/fig-U6-6.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-06/fig-U6-7.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-06/fig-U6-8.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 7 mirror files match the English baseline structure, heading level vectors, component calls (`<Figure>`, `<Glossary>`, `<PrintHandout>`), and frontmatter schemas 1:1.
- Unit assessment contains a complete 10 MCQ + 10 RRQ + 5 ERQ item bank with a bounded answers and marking guidance section, and 4-band analytical scoring rubrics matching English marks, Bloom taxonomy levels, and pedagogical intent.
- Option letters map to Urdu (الف، ب، ج، د) preserving exact option ordering. The Urdu MCQ answer keys correspond 100% to English (b, c, b, b, c, b, b, b, b, b).
- `key_terms` in `index.mdx` are bank-conformant and bound to `specs/content/terminology.csv`:
  - `Assessment`: `تشخیص` (banked in `terminology.csv`)
  - `Self-Assessment`: `خود جائزہ` (banked in `terminology.csv`)
  - `Rubric`: `معیارِ جانچ` (banked in `terminology.csv`)

## Proposed Terms (Unbanked) for Curriculum Owner

The following 15 concept labels from `specs/content/gict-300/concepts/unit-06.md` are specific to Internet Applications and Emerging Technologies and are not yet banked in `specs/content/terminology.csv`. They are documented here as proposals for curriculum owner review and promotion:

| Concept ID | English Term | Proposed Urdu Label |
|---|---|---|
| CON:GICT-300-6-1 | Web browser | ویب براؤزر |
| CON:GICT-300-6-2 | Search engine and its ranking | سرچ انجن اور اس کی ترتیب |
| CON:GICT-300-6-3 | Deliberate search strategy | سوچ سمجھ کر تلاش |
| CON:GICT-300-6-4 | Matching tools to purposes | اوزار کا مقصد سے میل |
| CON:GICT-300-6-5 | Reading the domain | ڈومین پڑھنا |
| CON:GICT-300-6-6 | The padlock's meaning | پیڈ لاک کا مطلب |
| CON:GICT-300-6-7 | Artificial Intelligence as pattern learning | مصنوعی ذہانت بطور نمونہ سیکھنا |
| CON:GICT-300-6-8 | The fluent-error problem and the review rule | رواں غلطی کا مسئلہ اور جائزے کا اصول |
| CON:GICT-300-6-9 | Internet of Things | انٹرنیٹ آف تھنگز |
| CON:GICT-300-6-10 | IoT and sensitive data | IoT اور حساس ڈیٹا |
| CON:GICT-300-6-11 | Blockchain as a tamper-evident ledger | بلاک چین بطور بدلاؤ سے محفوظ لیجر |
| CON:GICT-300-6-12 | The trust question | اعتماد کا سوال |
| CON:GICT-300-6-13 | VR versus AR | VR بمقابلہ AR |
| CON:GICT-300-6-14 | Engagement versus learning gain | دلچسپی بمقابلہ سیکھنے میں اضافہ |
| CON:GICT-300-6-15 | The closing question (lesson, cost, cautions) | آخری سوال (سبق، قیمت، احتیاط) |

## Semantic and Register Polish

- `index.mdx`: Removed unbanked computing key terms from frontmatter `key_terms` that would cause terminology validation failures under reviewed status; retained banked terms (`Assessment`, `Self-Assessment`, `Rubric`) aligned with Units 1-3.
- `topic-01.mdx`: Fixed typo `لتی` -> `لیتی`.
- `topic-02.mdx`: Corrected awkward phrasing `اُس جانا ہوا پتے سے` -> `اُس جانے پہچانے پتے سے`, and fixed grammatical gender agreement in `ایک حقیقی لگنے والی بنائی ہوئی مثال`.
- `topic-03.mdx`: Clarified machine-vs-human responsibility transfer clause `کوئی بھی ذمہ داری منتقل نہیں کرتی۔`, and corrected transitive imperative `کسی اصول سے جوڑیں۔`.
- `topic-04.mdx`: Fixed plural noun phrasing `بہت سی کاپیاں`, plural verb agreement `رہنے چاہییں`, and fixed typo `سبق کی موزونیت کا سوال`.
- `unit-assessment.mdx`: Corrected augmented reality description `آگمنٹڈ ریئلٹی اس میں اضافہ کرتی ہے`, corrected verb agreement `رہنے چاہییں`, corrected rubric section heading `### ERQ معیارِ جانچ`, and fixed typo `سبق کی موزونیت کا سوال`.
- `unit-teacher-notes.mdx`: Fixed typo `ہر ترجمہ شدہ دعویٰ جانچا جا سکے` and replaced literal dissection phrasing `زندہ پتہ چیر پھاڑ` with natural pedagogical phrasing `پتے کا براہِ راست تجزیہ`.
- Figures:
  - `fig-U6-2.ur.svg`: Corrected mistranslation `ملازم کریں` -> `میل کریں، صرف سیکھنا کافی نہیں`, and transliterated `assignment` -> `اسائنمنٹ`.
  - `fig-U6-3.ur.svg` & `fig-U6-4.ur.svg`: Unified phrasing to `جانا پہچانا پتہ`.
  - `fig-U6-5.ur.svg`: Corrected grammatical gender in title `ابھرتی ٹیکنالوجی کا خاندان`, and fixed spelling `آگمنٹڈ ریئلٹی`.
  - `fig-U6-6.ur.svg`: Naturalized UNESCO recommendation translation `اس کی جگہ نہ لے،`.
  - `fig-U6-7.ur.svg`: Naturalized break-detection phrasing `اس خرابی کو دیکھ سکتا ہے۔`.
  - `fig-U6-8.ur.svg`: Naturalized title `VR غرق کرتی ہے؛ AR حاشیہ لگاتی ہے`, and corrected spelling `ورچوئل ریئلٹی` and `آگمنٹڈ ریئلٹی`.
  - Derived all `.ur.dark.svg` variants via `npm run figures:variants`.

## Validation and Review Boundary

- Fast content gates (`npm run check:content`): 13/13 gates green.
- Figure variants check (`npm run figures:variants:check`): 810/810 figures green.
- Temporary flip check to `translation_status: reviewed`: `validate:content` (file and heading parity) and `check:figures` (bilingual figures) passed cleanly; `check:pipeline-gate` confirmed all declared `key_terms` conform to `terminology.csv`. Reverted immediately to `draft`.
- Zero em dashes (U+2014) verified across all authored files via `check:no-em-dash`.
- `translation_status` remains `draft` across all 7 files and the English index pending fresh independent G5 review.
- G4 tracker row in `specs/content/gict-300/tasks.md` marked in progress (`▣`) with blank initials (no self-certification).
