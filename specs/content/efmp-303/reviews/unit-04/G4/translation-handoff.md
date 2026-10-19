# EFMP-303 Unit 4 translation handoff

- Date: 2026-10-18. Translator: Antigravity, branch `crew/efmp-303-u04-translate`.
- English baseline commit: `c0e60d31` (and `origin/main` / `HEAD`).
- Files verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-04/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-04/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-04/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-04/unit-assessment.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-04/unit-teacher-notes.mdx`
- Figure assets verified:
  - `static/img/figures/efmp-303/unit-04/fig-U4-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-303/unit-04/fig-U4-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-303/unit-04/fig-U4-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-303/unit-04/fig-U4-4.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 5 mirror files match English baseline structure, heading level vectors (index: 5, topic-01: 12, topic-02: 13, assessment: 9, teacher-notes: 6), component calls (`<Figure>`: 4, `<Glossary>`: 6, `<PrintHandout>`: 4), and frontmatter schemas.
- Unit assessment carries complete 10 MCQ + 10 RRQ + 5 ERQ item banks with bounded answers section and analytical mark schemes matching English item counts (25 numbered items total), marks, Bloom levels, and pedagogical intent.
- Option letters map to Urdu (A -> الف, B -> ب, C -> ج, D -> د) in original order.
- Key terms declared in `index.mdx` (all verified against `terminology.csv`):
  - Summative Assessment: مجموعی جائزہ
  - Self-Assessment: خود جائزہ
  - Rubric: معیارِ جانچ

## Proposed Terms (Unbanked) for Curriculum Owner

Specialised labels from `concepts/unit-04.md` and course prose proposed for owner consideration:

| English | Urdu used | Concept ID / Source |
|---|---|---|
| Monitoring | نگرانی | CON:EFMP-303-4-1 / Glossary |
| Evaluation | جائزہ | CON:EFMP-303-4-1 / Glossary |
| Monitoring and evaluation concepts | نگرانی اور جائزہ کے تصورات | CON:EFMP-303-4-1 |
| Monitoring vs evaluation | نگرانی بمقابلہ جائزہ | CON:EFMP-303-4-2 |
| M&E process | نگرانی اور جائزہ کا عمل | CON:EFMP-303-4-3 |
| M&E tools and resources | نگرانی اور جائزہ کے آلات اور وسائل | CON:EFMP-303-4-4 |
| Tool | آلہ / آلات | CON:EFMP-303-4-4 / Glossary |
| Financial constraints in implementation | نفاذ میں مالی پابندیاں | CON:EFMP-303-4-5 / Glossary |
| Political instability and policy | عدم سیاسی استحکام اور پالیسی | CON:EFMP-303-4-6 / Glossary |
| Bureaucratic and administrative issues | بیوکریٹک اور انتظامی مسائل | CON:EFMP-303-4-7 / Glossary |
| Bureaucracy | بیوکریسی | Glossary |
| Interaction of implementation challenges | نفاذ کے چیلنجز کا باہمی عمل | CON:EFMP-303-4-8 |
| Implementation gap | اعلان اور نفاذ میں فرق / نفاذ کا فرق | topic-02 |
| Programme continuity / discontinuity | پروگرام کا تسلسل / تسلسل ٹوٹنا | topic-02 |
| Leakage | راستے میں رقم کا ضیاع | topic-02 |

These are proposals for the owner, not unauthorized additions to the frozen bank.

## Verification and Status

- Fast content gates (`npm run check:content`): 13 of 13 passed cleanly.
- Zero em dashes (U+2014, U+2015, U+2E3A, U+2E3B) confirmed across all Urdu files.
- Figure variants check (`npm run figures:variants:check`): passed cleanly on all 780 repository figures.
- Temporary flip check to `translation_status: reviewed`: `validate:content` (heading and component parity), `check:figures` (bilingual figures), and `check:pipeline-gate` (terminology check) all passed without error. Both index files were restored to `draft`.
- `translation_status` remains `draft` across all files pending fresh, independent G5 review.
- G4 tracker row in `specs/content/efmp-303/tasks.md` marked in progress (`▣`) with empty reviewer initials. No self-certification or G5 review claimed.
