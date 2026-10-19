# EFMP-304 Unit 4 translation handoff

- Date: 2026-10-18. Translator: Antigravity, crew/efmp-304-u04-translate-r1.
- English baseline commit: `8a04b4ad` (origin/main at task start; docs/semester-2/efmp-304/unit-04 unchanged since `65d2428e` / `a19f0138`).
- Files verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/topic-03.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/topic-04.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-04/unit-assessment.mdx`
- Figure assets verified:
  - `static/img/figures/efmp-304/unit-04/fig-U4-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-304/unit-04/fig-U4-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-304/unit-04/fig-U4-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-304/unit-04/fig-U4-4.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-304/unit-04/fig-U4-5.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-304/unit-04/fig-U4-6.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-304/unit-04/fig-U4-7.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-304/unit-04/fig-U4-8.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 6 mirror files match English baseline structure, heading level vectors, component calls (`<Figure>`, `<Glossary>`, `<PrintHandout>`), and frontmatter schemas.
- Unit assessment carries complete 10 MCQ + 10 RRQ + 5 ERQ item banks with bounded answers section and 4-band analytical scoring rubrics matching English item counts, marks, Bloom levels, and pedagogical intent.
- Option letters map to Urdu (A -> الف, B -> ب, C -> ج, D -> د).
- Key terms declared in `index.mdx` (all 20 verified against `terminology.csv`):
  - Learning: سیکھنا
  - Development: نشوونما
  - Attention: توجہ
  - Summative Assessment: مجموعی جائزہ
  - Self-Assessment: خود جائزہ
  - Critical Thinking: تنقیدی سوچ
  - Lesson Plan: سبقی منصوبہ
  - Validity: صداقت
  - Reflective Thinking: تاملی سوچ
  - Reflective Process: تاملی عمل
  - Reflective Practice: تاملی مشق
  - Reflective Journal: تاملی جریدہ
  - Reflective Cycle: تاملی چکر
  - Experiential Learning: تجرباتی تعلم
  - Technical Reflection: فنی تامل
  - Contextual Reflection: سیاقی تامل
  - Dialectical Reflection: جدلیاتی تامل
  - Rubric: معیارِ جانچ
  - Group Work: گروہی کام
  - Assessment: تشخیص

## Proposed Terms (Unbanked) for Curriculum Owner

Specialised labels from `concepts/unit-04.md` proposed for owner consideration:

| English | Urdu used | Concept ID |
|---|---|---|
| Reflection-in-action | عمل کے دوران غور و فکر | - |
| Reflection-on-action | عمل کے بعد غور و فکر | - |
| Critical friend | تنقیدی دوست | - |
| Action research | ایکشن ریسرچ | - |
| Disrupted expectation | ٹوٹی ہوئی توقع | - |
| Re-examination | دوبارہ جانچ | - |
| Claims vs evidence (reflection) | دعوی بمقابلہ شہادت (تامل) | CON:EFMP-304-4-4 |
| Stages of the reflective process | تاملی عمل کے مرحلے | CON:EFMP-304-4-5 |
| Levels of reflection | تامل کی سطحیں | CON:EFMP-304-4-6 |
| Activities promoting reflection | تامل کو فروغ دینے والی سرگرمیاں | CON:EFMP-304-4-7 |

These are proposals for the owner, not additions to the frozen bank.

## Verification and Status

- Fast content gates (`npm run check:content`): 13 of 13 passed cleanly.
- Zero em dashes (U+2014, U+2015, U+2E3A, U+2E3B) confirmed across all Urdu files.
- Temporary flip check to `translation_status: reviewed`: `validate:content` (heading and component parity), `check:figures` (bilingual figures), and `check:pipeline-gate` (terminology check) all passed without error. Both index files were restored to `draft`.
- `translation_status` remains `draft` across all files pending fresh, independent G5 review.
- G4 tracker row in `specs/content/efmp-304/tasks.md` marked in progress (`▣`) with empty reviewer initials. No self-certification or G5 review claimed.
