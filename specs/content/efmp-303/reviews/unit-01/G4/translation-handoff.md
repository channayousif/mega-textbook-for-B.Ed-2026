# EFMP-303 Unit 1 translation handoff

- Date: 2026-10-18. Translator: Antigravity, branch `crew/efmp-303-u01-translate`.
- English baseline commit: `5ea0764c` (and current `609577ef`).
- Files verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-01/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-01/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-01/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-01/topic-03.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-01/topic-04.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-01/unit-assessment.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-01/unit-teacher-notes.mdx`
- Figure assets verified:
  - `static/img/figures/efmp-303/unit-01/fig-U1-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-303/unit-01/fig-U1-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-303/unit-01/fig-U1-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-303/unit-01/fig-U1-4.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-303/unit-01/fig-U1-5.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-303/unit-01/fig-U1-6.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-303/unit-01/fig-U1-7.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-303/unit-01/fig-U1-8.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 7 mirror files match English baseline structure, heading level vectors (index: 5, topic-01: 12, topic-02: 13, topic-03: 12, topic-04: 12, assessment: 9, teacher-notes: 6), component calls (`<Figure>`: 8, `<Glossary>`: 3, `<PrintHandout>`: 6), and frontmatter schemas.
- Unit assessment carries complete 10 MCQ + 10 RRQ + 5 ERQ item banks with bounded answers section and analytical mark schemes matching English item counts (45 numbered items total), marks, Bloom levels, and pedagogical intent.
- Option letters map to Urdu (A -> الف, B -> ب, C -> ج, D -> د) in original order.
- Key terms declared in `index.mdx` (both verified against `terminology.csv`):
  - Curriculum: نصاب
  - Development: نشوونما

## Proposed Terms (Unbanked) for Curriculum Owner

Specialised labels from `concepts/unit-01.md` and course prose proposed for owner consideration:

| English | Urdu used | Concept ID / Source |
|---|---|---|
| Educational policy | تعلیمی پالیسی | CON:EFMP-303-1-1 |
| Educational planning | تعلیمی منصوبہ بندی | CON:EFMP-303-1-2 |
| Policy-planning relationship | پالیسی اور منصوبہ بندی کا تعلق | CON:EFMP-303-1-3 |
| Education-society-development triangle | تعلیم، سماج اور ترقی کا تکون | CON:EFMP-303-1-4 |
| Social factors shaping education | تعلیم کو تشکیل دینے والے معاشرتی عوامل | CON:EFMP-303-1-5 |
| Colonial education legacy | نوآبادیاتی تعلیم کا وراثت / ورثہ | CON:EFMP-303-1-6 |
| Post-independence education developments | آزادی کے بعد تعلیمی ترقیات | CON:EFMP-303-1-7 |
| Sharif Commission (1959) | شریف کمیشن (1959) | CON:EFMP-303-1-8 |
| Education milestones timeline | تعلیم کے سنگ میل کا خط زمانی | CON:EFMP-303-1-9 |
| Human capital | انسانی سرمایہ | topic-02 Glossary |

Note on "Development": `terminology.csv` currently binds Development to نشوونما (the human/child development sense, as in EFMP-301). In this course's macro-educational, economic, and national planning context, the text naturally uses ترقی. The banked term is retained in `key_terms` to ensure gate conformance, while raising the sense split for the curriculum owner's determination.

These are proposals for the owner, not unauthorized additions to the frozen bank.

## Verification and Status

- Fast content gates (`npm run check:content`): 13 of 13 passed cleanly.
- Zero em dashes (U+2014, U+2015, U+2E3A, U+2E3B) confirmed across all Urdu files.
- Figure variants check (`npm run figures:variants:check`): passed cleanly on all 772 repository figures.
- Temporary flip check to `translation_status: reviewed`: `validate:content` (heading and component parity), `check:figures` (bilingual figures), and `check:pipeline-gate` (terminology check) all passed without error. Both index files were restored to `draft`.
- `translation_status` remains `draft` across all files pending fresh, independent G5 review.
- G4 tracker row in `specs/content/efmp-303/tasks.md` marked in progress (`▣`) with empty reviewer initials. No self-certification or G5 review claimed.
