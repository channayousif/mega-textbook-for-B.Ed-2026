# EFMP-303 Unit 6 translation handoff

- Date: 2026-10-18. Translator: opencode (Claude), crew/efmp-303-u06-translate.
- English baseline commit: origin/main HEAD.
- Files translated in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/topic-03.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/unit-assessment.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/unit-teacher-notes.mdx`
- Figure assets: 6 placed English schematics (fig-U6-1…6) referenced as `.ur.svg` in `<Figure src>` but `.ur.svg` variants not yet generated (pending generate-figures Step 5).

## Structure and Parity

- All 6 mirror files match English baseline structure, heading level vectors, component calls (`<Figure>`, `<Glossary>`, `<PrintHandout>`), and frontmatter schemas.
- Unit assessment carries complete 10 MCQ + 10 RRQ + 5 ERQ item banks with bounded answers section and analytical scoring rubrics matching English item counts, marks, Bloom levels, and pedagogical intent.
- Option letters map to Urdu (A -> الف, B -> ب, C -> ج, D -> د); option order preserved.
- Bloom tags translated (Remember -> یاد رکھنا, Understand -> سمجھنا, Apply -> لاگو کرنا, Analyze -> تجزیہ کرنا, Evaluate -> جائزہ لینا, Create -> تخلیق کرنا).
- Key terms declared in `index.mdx` (all verified against `terminology.csv`):
  - Learning: سیکھنا
  - Development: نشوونما
  - Assessment: تشخیص
  - Summative Assessment: مجموعی جائزہ
  - Curriculum: نصاب
  - Group Work: گروہی کام
  - Rubric: معیارِ جانچ
  - Self-Assessment: خود جائزہ
  - Multi-grade Classroom: کثیر درجاتی کلاس روم

## Proposed Terms (Unbanked) for Curriculum Owner

Labels and terms from `concepts/unit-06.md` and unit prose that are not in `terminology.csv` and `glossary.json`:

| English | Urdu used | Source |
|---|---|---|
| International education policies | بین الاقوامی تعلیمی پالیسیاں | concept CON:EFMP-303-6-1 |
| Lessons for Pakistan from other countries | دوسرے ممالک سے پاکستان کے لیے سبق | concept CON:EFMP-303-6-2 |
| ICT in education management | تعلیمی انتظام میں اطلیاتی مواصلاتی ٹیکنالوجی | concept CON:EFMP-303-6-4 |
| Data-driven planning | ڈیٹا پر مبنی منصوبہ بندی | concept CON:EFMP-303-6-5 |
| Digital transformation in education | تعلیمی شعبے میں ڈیجیٹل تبدیلی | concept CON:EFMP-303-6-6 |
| Innovations in policy design | پالیسی ڈیزائن میں جدت | concept CON:EFMP-303-6-7 |
| Strategic planning for quality and equity | معیار اور انصاف کے لیے حکمتی منصوبہ بندی | concept CON:EFMP-303-6-8 |
| Role of teachers in policy success | پالیسی کی کامیابی میں اساتذہ کا کردار | concept CON:EFMP-303-6-9 |
| EMIS (Education Management Information System) | تعلیمی انتظام المعلوماتی نظام | prose (acronym + expansion) |
| SDG4 / Sustainable Development Goals | پائیدار ترقی کے اہداف 4 / SDG4 | prose (glossary term, kept Latin identifier) |
| Community schools | کمیونٹی اسکول | prose |
| Cluster schools | کلسٹر اسکول | prose |
| Transport stipend | ٹرانسپورٹ اسٹپینڈ | prose |

These are proposals for the owner, not additions to the frozen bank.

## Verification and Status

- Fast content gates (`npm run check:content`): 12 of 13 pass. The single failure (`check:content-status`) is pre-existing on origin/main (missing `static/content-status.json`), not introduced by this work.
- Zero em dashes confirmed across all Urdu files.
- Temporary flip check to `translation_status: reviewed`: `validate:content` (heading and component parity), `check:figures` (bilingual figures), and `check:pipeline-gate` (terminology check) all passed without error. Both index files were restored to `draft`.
- Build and rendered desktop/narrow/A4 inspection omitted: `.crew/brief.md` explicitly prohibits `npm run build` and dev servers. Rendered verification remains for a future independent G5 session.
- `.ur.svg` figure variants: not created in this pass. generate-figures Step 5 is required to author the 6 Urdu label variants and derive dark variants. Without them, `<Figure src>` points to non-existent assets until that job runs.
- `translation_status` remains `draft` across all files pending fresh, independent G5 review.
- G4 tracker row in `specs/content/efmp-303/tasks.md` marked `▣` with `auto:gates`. No self-certification or G5 review claimed.
