# EFMP-305 Unit 4 translation handoff

- Date: 2026-10-18. Translator: Antigravity, crew/efmp-305-u04-translate.
- English baseline commit: `c31cad8fa3ba58322a83a34a402f17491b6bb431` (curriculum(efmp-305): settle Unit 4 RRQ 1 marks and ERQ 5 costing basis (TEX-118)).
- Files translated and verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-04/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-04/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-04/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-04/unit-assessment.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-04/unit-teacher-notes.mdx`
- Figure assets verified:
  - `static/img/figures/efmp-305/unit-04/fig-U4-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-305/unit-04/fig-U4-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-305/unit-04/fig-U4-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-305/unit-04/fig-U4-4.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 5 mirror files match English baseline structure, heading level vectors, component calls (`<Figure>`, `<PrintHandout>`), and frontmatter schemas.
- Unit assessment carries complete 10 MCQ + 10 RRQ + 5 ERQ item banks with bounded answers section and 4-band analytical scoring rubrics matching English item counts, marks, Bloom levels, and pedagogical intent.
- Option letters map to Urdu (A -> الف, B -> ب, C -> ج, D -> د).
- Key terms declared in `index.mdx`:
  - `Classroom Management`: `جماعتی انتظام` (banked in `terminology.csv`)
  - `Environment`: `ماحول` (banked in `terminology.csv`)
  - `Inclusive Education`: `شمولیتی تعلیم` (banked in `terminology.csv`)

## Proposed Terms (Unbanked) for Curriculum Owner

The following concept labels from `specs/content/efmp-305/concepts/unit-04.md` are new to the course and not yet banked in `terminology.csv`:

| English Term | Proposed Urdu Label | Concept ID |
|---|---|---|
| Productive and disruptive noise | بامقصد شور اور خلل انداز شور | CON:EFMP-305-4-3 |
| Predictability through taught routines | سکھائے گئے معمولات سے پیش بینی | CON:EFMP-305-4-4 |
| Positive behaviour support | مثبت طرزِ عمل کی معاونت | CON:EFMP-305-4-5 |
| Behaviour has a function | طرزِ عمل کا ایک مقصد ہوتا ہے | CON:EFMP-305-4-6 |
| Classroom arrangement | جماعتی ترتیب | CON:EFMP-305-4-7 |
| Barrier-based seating | رکاوٹ کے مطابق نشست | CON:EFMP-305-4-8 |
| Participation spread | شرکت کا پھیلاؤ | CON:EFMP-305-4-9 |
| Teacher position and the dead zone | استاد کی جگہ اور نظر انداز گوشہ | CON:EFMP-305-4-10 |
| Accessibility | رسائی | CON:EFMP-305-4-11 |
| Four layers of accessibility | رسائی کی چار سطحیں | CON:EFMP-305-4-12 |
| Barrier-free environment | رکاوٹ سے پاک ماحول | CON:EFMP-305-4-13 |
| Accessibility walk | رسائی کا پیدل جائزہ | CON:EFMP-305-4-14 |
| Classroom safety and evacuation | جماعتی تحفظ اور انخلا | CON:EFMP-305-4-15 |
| Teaching aids | تدریسی معاونات | CON:EFMP-305-4-16 |
| Learning corners | سیکھنے کے گوشے | CON:EFMP-305-4-17 |
| Assistive technology | معاون ٹیکنالوجی | CON:EFMP-305-4-18 |
| Low-cost and no-cost solutions | کم خرچ اور بغیر خرچ حل | CON:EFMP-305-4-19 |
| Levels of decision and escalation | فیصلے کی سطحیں اور ارجاع | CON:EFMP-305-4-20 |

## Verification and Status

- Fast content gates (`npm run check:content`): 13 of 13 passed.
- Temporary flip check to `translation_status: reviewed`: `validate:content` (heading and component parity), `check:figures` (bilingual figures), and `check:pipeline-gate` (terminology check) all passed without error. Both index files were reverted back to `draft`.
- `translation_status` remains `draft` across all 5 files pending fresh, independent G5 review.
- G4 tracker row in `specs/content/efmp-305/tasks.md` marked in progress (`▣`) with empty reviewer initials. No self-certification or G5 review claimed.
