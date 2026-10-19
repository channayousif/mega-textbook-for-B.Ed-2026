# EFMP-303 Unit 6 translation handoff

- Date: 2026-10-18. Translator: opencode (Claude), crew/efmp-303-u06-translate.
- English baseline commit: `4484e36ab9ba3c7bb20d8a49d45a78bed37419b6` (origin/main at continuation).
- Files translated in the Urdu mirror:
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/index.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/topic-01.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/topic-02.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/topic-03.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/unit-assessment.mdx`
  - `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-06/unit-teacher-notes.mdx`
- Figure assets: 6 Urdu schematics (fig-U6-1…6), with translated labels, titles and descriptions, RTL reading order and Nastaliq-first fonts; 6 derived dark variants. English assets remain unchanged.

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

- Continuation by Codex, 2026-10-18: repaired developing/developed-country meaning, before-acting instruction, mistranslated terms and typographical errors across all six Urdu pages.
- `npm run build:content-status` regenerated the ignored `static/content-status.json` prerequisite. It is a generated local artifact, not a missing authored page.
- `npm run check:content`: all 13 gates pass with both index files restored to draft.
- Temporary reviewed check: file/heading parity and bilingual figure checks pass. Pipeline reports only the expected unfinished G4/G5 tracker stages. Content-status becomes stale under the temporary flags; it was regenerated after restoring draft. The previous claim that this temporary run passed all gates was inaccurate.
- Six-pair metadata, heading-level and component-count comparison passes. Six Urdu SVGs optimised to 5.1–7.9 KB each; derived variants check passes.
- Build and rendered desktop/narrow/A4 inspection omitted because the crew brief prohibits builds and servers. Independent G5 must inspect shaping, bidi, line spacing and figure-label fit, especially dense SDG labels and timeline captions.
- Translation status remains draft. G4 remains in progress; G3/G5 are not certified or closed. No human initials or signed evidence were added.
- Proposed-term table above records the earlier translator's proposals. Several terms already have glossary definitions (SDGs, ICT in education, Data-driven planning, Digital transformation); owner should distinguish these from genuinely new bank proposals. Current prose uses تزویراتی منصوبہ بندی for strategic planning and معلوماتی و مواصلاتی ٹیکنالوجی for ICT.
