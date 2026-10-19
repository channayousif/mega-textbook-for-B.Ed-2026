# EFMP-303 Unit 2 translation handoff

- Date: 2026-10-18. Translator: Antigravity, crew/efmp-303-u02-translate.
- English baseline commit: `5ea0764cfc2e5d0c47509895aad8c6e57765757f` (and origin/main HEAD `609577ef`).
- Files verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-02/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-02/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-02/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-02/topic-03.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-02/unit-assessment.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-02/unit-teacher-notes.mdx`
- Figure assets verified:
  - `static/img/figures/efmp-303/unit-02/fig-U2-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-303/unit-02/fig-U2-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-303/unit-02/fig-U2-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-303/unit-02/fig-U2-4.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-303/unit-02/fig-U2-5.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-303/unit-02/fig-U2-6.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 6 mirror files match English baseline structure, heading level vectors, component calls (`<Figure>`, `<Glossary>`, `<PrintHandout>`), and frontmatter schemas.
- Unit assessment carries complete 10 MCQ + 10 RRQ + 5 ERQ item banks with bounded answers section and analytical scoring rubrics matching English item counts, marks, Bloom levels, and pedagogical intent.
- Option letters map to Urdu (A -> الف, B -> ب, C -> ج, D -> د).
- Key terms declared in `index.mdx` (all verified against `terminology.csv`):
  - Curriculum: نصاب
  - Critical Thinking: تنقیدی سوچ
  - Rote Learning: رٹا لگانا

## Proposed Terms (Unbanked) for Curriculum Owner

Specialised labels from `concepts/unit-02.md` and unit text proposed for owner consideration:

| English | Urdu used | Concept ID |
|---|---|---|
| Early education policies (1947-2000) | ابتدائی تعلیمی پالیسیاں (1947-2000) | CON:EFMP-303-2-1 |
| Policy evolution patterns | پالیسی کی ترقی کے نمونے | CON:EFMP-303-2-2 |
| NEP 2009 objectives | قومی تعلیمی پالیسی 2009 کے اہداف | CON:EFMP-303-2-3 |
| NEP 2009 implementation | قومی تعلیمی پالیسی 2009 کا نفاذ | CON:EFMP-303-2-4 |
| NEP 2009 outcomes and challenges | قومی تعلیمی پالیسی 2009 کے نتائج اور چیلنجز | CON:EFMP-303-2-5 |
| NEP 2017 vision and framework | قومی تعلیمی پالیسی 2017 کا نظارہ اور فریم ورک | CON:EFMP-303-2-6 |
| NEP 2017 curriculum reforms | قومی تعلیمی پالیسی 2017 کی نصابی اصلاحات | CON:EFMP-303-2-7 |
| NEP 2017 priorities | قومی تعلیمی پالیسی 2017 کی ترجیحات | CON:EFMP-303-2-8 |
| Comparing NEP 2009 and 2017 | پالیسی 2009 اور 2017 کا موازنہ | CON:EFMP-303-2-9 |
| National Education Policy | قومی تعلیمی پالیسی | - |
| Free and compulsory education | مفت اور لازمی تعلیم | - |
| Implementation gap | نفاذ کا خلا | - |
| Decentralization | عدم مرکزیت | - |
| Constitutional amendment | آئینی ترمیم | - |
| Devolution | تفویضِ اختیارات | - |
| Accreditation | الحاق / ایکریڈیٹیشن | - |
| Quality assurance | معیار کی ضمانت | - |

These are proposals for the owner, not additions to the frozen bank.

## Verification and Status

- Fast content gates (`npm run check:content`): 13 of 13 passed cleanly.
- Figure variants check (`npm run figures:variants:check`): clean across all 772 figures.
- Zero em dashes (U+2014, U+2015, U+2E3A, U+2E3B) confirmed across all Urdu files.
- Phrasing repair: updated `topic-01.mdx` line 101 from `شاہد` (witness) to `شواہد` (evidence).
- Temporary flip check to `translation_status: reviewed`: `validate:content` (heading and component parity), `check:figures` (bilingual figures), and `check:pipeline-gate` (terminology check) all passed without error. Both index files were restored to `draft`.
- Build and rendered desktop/narrow/A4 inspection omitted: `.crew/brief.md` explicitly prohibits builds and dev servers. Current rendered verification remains for a future independent G5 session.
- `translation_status` remains `draft` across all files pending fresh, independent G5 review.
- G4 tracker row in `specs/content/efmp-303/tasks.md` marked in progress (`▣`) with empty reviewer initials. No self-certification or G5 review claimed.
