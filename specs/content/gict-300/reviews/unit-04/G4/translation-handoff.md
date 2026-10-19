# GICT-300 Unit 4 translation handoff

- Date: 2026-10-18. Translator: Antigravity, `crew/gict-300-u04-translate-r1`.
- English checkout baseline: `ef87f8f413ebceea23689f2cf05d9e5b7a544ba8` (fix(gict-300): apply G3 run002 Unit 4 repairs + record run002 reports).
- Files compared and verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-04/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-04/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-04/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-04/topic-03.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-04/topic-04.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-04/unit-assessment.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-04/unit-teacher-notes.mdx`
- Figure assets verified:
  - `static/img/figures/gict-300/unit-04/fig-U4-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-04/fig-U4-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-04/fig-U4-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-04/fig-U4-4.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-04/fig-U4-5.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-04/fig-U4-6.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-04/fig-U4-7.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/gict-300/unit-04/fig-U4-8.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 7 mirror files match English baseline structure, heading level vectors, component calls (`<Figure>`, `<Glossary>`, `<PrintHandout>`), and frontmatter schemas.
- Unit assessment carries complete 10 MCQ + 10 RRQ + 5 ERQ item banks with bounded answers section and analytical mark schemes matching English item counts, marks, Bloom levels, and pedagogical intent.
- Option letters map to Urdu (A -> الف, B -> ب, C -> ج, D -> د) with option order strictly preserved. Urdu MCQ answers in order: ب، د، ج، الف، ج، د، ب، الف، ج، د.
- Declared `key_terms` in `index.mdx` are bound to frozen bank entries in `terminology.csv`:
  - `Assessment`: `تشخیص` (banked in `terminology.csv`)
  - `Self-Assessment`: `خود جائزہ` (banked in `terminology.csv`)
  - `Rubric`: `معیارِ جانچ` (banked in `terminology.csv`)

## Proposed Terms (Unbanked) for Curriculum Owner

The following 15 concept labels from `specs/content/gict-300/concepts/unit-04.md` are computing/security specific and not yet banked in `specs/content/terminology.csv`. They remain owner proposals awaiting formal terminology banking and G5 review:

| English Term | Proposed Urdu Label | Concept ID |
|---|---|---|
| Malware | ملویئر | CON:GICT-300-4-1 |
| Phishing | فشنگ | CON:GICT-300-4-2 |
| Social engineering | سوشل انجینئرنگ | CON:GICT-300-4-3 |
| CIA triad | سی آئی اے تینی | CON:GICT-300-4-4 |
| Security habits as defence | دفاع کے طور پر عادات | CON:GICT-300-4-5 |
| Digital footprint | ڈیجیٹل فوٹ پرنٹ | CON:GICT-300-4-6 |
| Active versus passive traces | فعال بمقابلہ غیر فعال نشانیاں | CON:GICT-300-4-7 |
| Footprint audit | فوٹ پرنٹ جائزہ | CON:GICT-300-4-8 |
| Password strength | پاس ورڈ کی طاقت | CON:GICT-300-4-9 |
| Authentication factors | تصدیق کے فیکٹر | CON:GICT-300-4-10 |
| Multi-factor authentication | ملٹی فیکٹر تصدیق | CON:GICT-300-4-11 |
| Cloud computing (NIST definition) | کلاؤڈ کمپیوٹنگ | CON:GICT-300-4-12 |
| Personal data and sensitivity | ذاتی ڈیٹا اور حساسیت | CON:GICT-300-4-13 |
| The four data questions | ڈیٹا کے چار سوال | CON:GICT-300-4-14 |
| Collect-the-minimum | کم سے کم اکٹھا کریں | CON:GICT-300-4-15 |

Additional unbanked technical vocabulary in unit prose requiring curriculum owner intake:
- Virus (وائرس)
- Ransomware (رینسم ویئر)
- Spyware (اسپائی ویئر)
- Pretexting (بہانہ سازی)
- Password manager (پاس ورڈ مینیجر)
- Authentication (تصدیق)
- Personal data (ذاتی ڈیٹا)
- Sensitive personal data (حساس ذاتی ڈیٹا)
- Data protection (ڈیٹا تحفظ)
- Consent (رضامندی)
- Confidentiality (رازداری)
- Integrity (درستگی)
- Availability (دستیابی)
- Data center (ڈیٹا سینٹر)

## Semantic and Register Polish

- Maintained academic-plain (درسی مگر عام فہم) register throughout prose and teacher notes.
- Preserved employer translation as آجر in Topic 4.2 and teacher notes.
- Preserved dashed boxes description and labels in `fig-U4-3.ur.svg` (ٹھوس خانے: فعال فوٹ پرنٹ؛ ڈیشڈ خانے: غیر فعال حصہ).
- Preserved child consent notice in `fig-U4-7.ur.svg` (بچہ خود اپنی رضامندی نہیں دے سکتا: ذمہ داری بھاری ہے).
- All 8 Urdu figures have synchronized `.ur.svg` and `.ur.dark.svg` variants verified with `figures:variants:check`.
- Zero em dashes (U+2014, U+2015, U+2E3A, U+2E3B) confirmed across all unit files.

## Validation and Boundaries

- All 13 content gates pass cleanly (`npm run check:content`).
- `figures:variants:check` passes across all repository figure assets.
- `translation_status` remains `draft` across all 7 unit files.
- The G4 tracker row in `specs/content/gict-300/tasks.md` is set to in-progress (`▣`) with reference to this handoff document.
- No G3/G5 certification is claimed or recorded; review remains strictly advisory pending independent qualification under ADR-0019.
