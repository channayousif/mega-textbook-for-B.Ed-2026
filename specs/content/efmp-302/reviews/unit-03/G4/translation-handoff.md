# EFMP-302 Unit 3 translation handoff

- Date: 2026-10-18. Translator: Antigravity, crew/efmp-302-u03-translate-r1.
- English baseline commit: `4c7a55dc` (origin/main at task start; docs/semester-1/efmp-302/unit-03 unchanged since `65d2428e`).
- Files verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03/topic-03.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03/topic-04.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03/topic-05.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03/unit-assessment.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03/unit-teacher-notes.mdx`
- Figure assets verified:
  - `static/img/figures/efmp-302/unit-03/fig-U3-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-302/unit-03/fig-U3-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-302/unit-03/fig-U3-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-302/unit-03/fig-U3-4.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-302/unit-03/fig-U3-5.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-302/unit-03/fig-U3-6.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-302/unit-03/fig-U3-7.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-302/unit-03/fig-U3-8.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-302/unit-03/fig-U3-9.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-302/unit-03/fig-U3-10.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-302/unit-03/fig-U3-11.webp` through `fig-U3-16.webp` (rasters with Urdu alt text)

## Structure and Parity

- All 8 mirror files match English baseline structure, heading level vectors, component calls (`<Figure>`, `<Glossary>`, `<PrintHandout>`), and frontmatter schemas.
- Unit assessment carries complete 10 MCQ + 10 RRQ + 5 ERQ item banks with bounded answers section and analytical scoring rubrics matching English item counts, marks, Bloom levels, and pedagogical intent.
- Option letters map to Urdu (A -> الف, B -> ب, C -> ج, D -> د).
- Key terms declared in `index.mdx` (all verified against `terminology.csv`):
  - Teacher Effectiveness: معلم کی افادیت
  - Verbal Communication: زبانی ابلاغ
  - Non-verbal Communication: غیر زبانی ابلاغ

## Proposed Terms (Unbanked) for Curriculum Owner

Specialised labels from `concepts/unit-03.md` proposed for owner consideration:

| English | Urdu used | Concept ID |
|---|---|---|
| Effectiveness as achievement gain | افادیت بطور حاصلات میں اضافہ | CON:EFMP-302-3-2 |
| Effectiveness as observed practice | افادیت بطور مشاہدہ شدہ عمل | CON:EFMP-302-3-3 |
| Effectiveness as breadth of learner outcomes | افادیت بطور سیکھنے والوں کے وسیع نتائج | CON:EFMP-302-3-4 |
| Within-classroom processes | جماعت کے اندر کے عوامل | CON:EFMP-302-3-5 |
| Factors beyond the classroom | جماعت سے باہر کے عوامل | CON:EFMP-302-3-6 |
| Attitude toward the profession | پیشے کی جانب رویہ | CON:EFMP-302-3-7 |
| Professional image | پیشہ ورانہ تاثر | CON:EFMP-302-3-8 |
| Personality traits of effective teachers | مؤثر اساتذہ کی شخصی خصوصیات | CON:EFMP-302-3-9 |
| The failure mode of a trait at excess | خصوصیت کی زیادتی کا نقصان | CON:EFMP-302-3-10 |
| Stakeholder relationships | متعلقہ فریقوں سے تعلقات | CON:EFMP-302-3-11 |
| Reliability as the basis of trust | بھروسا مندی بطور اعتماد کی بنیاد | CON:EFMP-302-3-12 |
| Conflict de-escalation sequence | تنازع کو کم کرنے کی ترتیب | CON:EFMP-302-3-13 |
| Questioning that discovers thinking | ایسا سوال جو سوچ کو دریافت کرے | CON:EFMP-302-3-15 |
| Contradicting channels | متضاد ذرائع ابلاغ | CON:EFMP-302-3-17 |
| The teacher as facilitator | استاد بطور سہولت کار | CON:EFMP-302-3-18 |
| The teacher as researcher of own practice | استاد بطور اپنے عمل کا محقق | CON:EFMP-302-3-19 |
| The teacher as change agent, moral agent and life-long learner | استاد بطور تبدیلی کا داعی، اخلاقی نمونہ اور تاحیات سیکھنے والا | CON:EFMP-302-3-20 |

These are proposals for the owner, not additions to the frozen bank.

## Verification and Status

- Fast content gates (`npm run check:content`): 13 of 13 passed cleanly.
- Figure variants check (`npm run figures:variants:check`): clean across all 772 figures.
- Zero em dashes (U+2014, U+2015, U+2E3A, U+2E3B) confirmed across all Urdu files.
- Temporary flip check to `translation_status: reviewed`: `validate:content` (heading and component parity), `check:figures` (bilingual figures), and `check:pipeline-gate` (terminology check) all passed without error. Both index files were restored to `draft`.
- Build and rendered desktop/narrow/A4 inspection omitted: `.crew/brief.md` explicitly prohibits builds and dev servers. Current rendered verification remains for a future independent G5 session.
- `translation_status` remains `draft` across all files pending fresh, independent G5 review.
- G4 tracker row in `specs/content/efmp-302/tasks.md` marked in progress (`▣`) with empty reviewer initials. No self-certification or G5 review claimed.
