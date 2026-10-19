# EFMP-305 Unit 2 translation handoff

- Date: 2026-10-19. Translator: Antigravity, crew/efmp-305-u02-translate-r1.
- English baseline commit: `9e6da6482387e89df933b20b8fcaee0ba13e8981` (content(efmp-305): render bilingual schematics and place English figures).
- Files translated and verified in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-02/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-02/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-02/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-02/unit-assessment.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-02/unit-teacher-notes.mdx`
- Figure assets verified:
  - `static/img/figures/efmp-305/unit-02/fig-U2-1.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-305/unit-02/fig-U2-2.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-305/unit-02/fig-U2-3.ur.svg` (and `.ur.dark.svg`)
  - `static/img/figures/efmp-305/unit-02/fig-U2-4.ur.svg` (and `.ur.dark.svg`)

## Structure and Parity

- All 5 mirror files match English baseline structure, heading level vectors (index: 5, topic-01: 14, topic-02: 12, unit-assessment: 9, unit-teacher-notes: 9), component calls (`<Figure>`, `<PrintHandout>`), and frontmatter schemas.
- Unit assessment carries complete 10 MCQ + 10 RRQ + 5 ERQ item banks with bounded answers section (`## جوابات اور نمبر دہی کی رہنمائی`) and analytical rubrics matching English item counts, marks, Bloom levels, and pedagogical intent.
- Option letters map to Urdu (A -> الف, B -> ب, C -> ج, D -> د) and answer keys match English baseline (1: ب, 2: ب, 3: ج, 4: ب, 5: ب, 6: ب, 7: ب, 8: الف, 9: ج, 10: ب).
- Key terms declared in `index.mdx`:
  - `Individual Differences`: `انفرادی اختلافات` (banked in `terminology.csv`)
  - `Inclusive Education`: `شمولیتی تعلیم` (banked in `terminology.csv`)
  - `Slow Learner`: `کمزور متعلم` (banked in `terminology.csv`)
  - `Assessment`: `تشخیص` (banked in `terminology.csv`)
  - `Attitude`: `رویہ` (banked in `terminology.csv`)

## Proposed Terms (Unbanked) for Curriculum Owner

The following concept labels from `specs/content/efmp-305/concepts/unit-02.md` and topics are specific to inclusive learner diversity and proposed for `terminology.csv` banking:

| English Term | Proposed Urdu Label | Concept ID / Reference |
|---|---|---|
| Learner diversity | متعلمین کا تنوع | CON:EFMP-305-2-1 |
| Impairment | خرابی | CON:EFMP-305-2-2 |
| Handicap | ہینڈی کیپ / ماحولیاتی رکاوٹ | CON:EFMP-305-2-2 |
| Labelling | لیبلنگ / منفی ٹھپا لگانا | CON:EFMP-305-2-6 |
| Stigma | داغ / عیب | CON:EFMP-305-2-7 |

## Verification and Status

- Fast content gates (`npm run check:content`): all 13 gates pass cleanly.
- Temporary flip check to `translation_status: reviewed`: `validate:content` (heading and component parity), `check:figures` (bilingual figure pairs), and `check:pipeline-gate` (terminology check) all pass without errors. Both index files were reverted back to `draft`.
- `translation_status` remains `draft` across all 5 files pending fresh, independent G5 review per translate-unit skill Step 7 and Constitution Art. III.2.
- G4 tracker row in `specs/content/efmp-305/tasks.md` marked in progress (`▣`) with empty reviewer initials. No self-certification or G5 review claimed.
