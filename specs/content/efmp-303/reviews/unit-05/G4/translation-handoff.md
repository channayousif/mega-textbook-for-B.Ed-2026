# EFMP-303 Unit 5 translation handoff

- Date: 2026-10-18. Translator: Antigravity, crew/efmp-303-u05-translate.
- English baseline commit: `409ea26269f8da06c7d75b254e29864e30abce98`.
- Files verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-05/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-05/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-05/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-05/unit-assessment.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-05/unit-teacher-notes.mdx`
- Figure assets verified:
  - `static/img/figures/efmp-303/unit-05/fig-U5-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-303/unit-05/fig-U5-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-303/unit-05/fig-U5-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-303/unit-05/fig-U5-4.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 5 mirror files match English baseline structure, heading level vectors, component calls (`<Figure>`, `<Glossary>`, `<PrintHandout>`), and frontmatter schemas.
- Unit assessment carries complete 10 MCQ + 10 RRQ + 5 ERQ item banks with bounded answers section and analytical scoring rubrics matching English item counts, marks, Bloom levels, and pedagogical intent.
- Option letters map to Urdu (A -> الف, B -> ب, C -> ج, D -> د).
- Key terms declared in `index.mdx` (all verified against `terminology.csv`):
  - Curriculum: نصاب
  - Inclusive Education: شمولیتی تعلیم
  - Assessment: تشخیص

## Proposed Terms (Unbanked) for Curriculum Owner

Specialised labels from `concepts/unit-05.md` and unit text proposed for owner consideration:

| English | Urdu used | Concept ID |
|---|---|---|
| Accreditation systems | ایکریڈیشن نظام | CON:EFMP-303-5-1 |
| Curriculum standardization | نصاب کی معیاری بندی | CON:EFMP-303-5-2 |
| Teacher training and professional development | اساتذہ کی تربیت اور پیشہ وارانہ ترقی | CON:EFMP-303-5-3 |
| Human capital formation | انسانی سرمایہ کی تشکیل | CON:EFMP-303-5-4 |
| Education and inequality reduction | تعلیم اور عدم مساوات میں کمی | CON:EFMP-303-5-5 |
| Gender and inclusive education policies | جنس اور شمولیتی تعلیمی پالیسیاں | CON:EFMP-303-5-6 |
| Quality assurance | معیار کی ضمانت | - |
| School self-evaluation | اسکول کا خود جائزہ | - |
| External review | بیرونی جائزہ | - |
| Inspection | معائنہ | - |
| Teacher appraisal | استاد کی کارکردگی کا جائزہ | - |
| Single National Curriculum (SNC) | یکساں قومی نصاب | - |
| Pre-service training | قبل از ملازمت تربیت | - |
| In-service training | دورانِ ملازمت تربیت | - |
| Human Capital Index | ہیومن کیپیٹل انڈیکس / انسانی سرمایہ کا اشاریہ | - |

These are proposals for the owner, not additions to the frozen bank.

## Verification and Status

- Fast content gates (`npm run check:content`): 13 of 13 passed cleanly.
- Figure variants check (`npm run figures:variants:check`): clean across all 784 figures.
- Zero em dashes (U+2014, U+2015, U+2E3A, U+2E3B) confirmed across all Urdu files.
- Temporary flip check to `translation_status: reviewed`: `validate:content` (heading and component parity), `check:figures` (bilingual figures), and `check:pipeline-gate` (terminology check) all passed without error. Both index files were restored to `draft`.
- Build and rendered desktop/narrow/A4 inspection omitted: `.crew/brief.md` explicitly prohibits builds and dev servers. Current rendered verification remains for a future independent G5 session.
- `translation_status` remains `draft` across all files pending fresh, independent G5 review.
- G4 tracker row in `specs/content/efmp-303/tasks.md` marked in progress (`▣`) with empty reviewer initials. No self-certification or G5 review claimed.
