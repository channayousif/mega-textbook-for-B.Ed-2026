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


## Codex continuation, 2026-10-19

- This pass continues the existing mirror at English baseline `f3197932aff6ec56382a14e68341c0636d7a46e8`. No English content was changed. The branch started clean with no commits ahead of origin/main; the earlier translation was already present in the baseline.
- Repaired meaning and register across all six Urdu pages: policy choices rather than elections, comparative girls' attendance rather than a time-series increase, better buildings rather than more buildings, local policy adaptation, and the omitted political will and institutional capacity qualification. Repaired MCQ 6's grouping adjustment and RRQ 6's selection of two from three roles. Option order, numerical values, Bloom levels and scoring remain those of the English baseline.
- Reworded six Urdu figure alts for faithful descriptions, synchronised each SVG `<desc>` with its page alt, and regenerated all six Urdu dark variants. No English figure or authored brief was changed.
- Verified the six-file set, heading vectors, metadata, component counts and glossary keys. The reviewed probe passes structural, figure and bank checks; its only findings are the unfinished G4/G5 rows and the generated status report becoming stale under temporary flags. Flags were restored and the report regenerated. Probe and final draft logs are stored beside this handoff.
- Proposed-term corrections supersede the earlier table where it differs: ICT uses معلوماتی و مواصلاتی ٹیکنالوجی; strategic planning uses تزویراتی منصوبہ بندی; EMIS uses تعلیمی انتظامی معلوماتی نظام. Policy adaptation is rendered مقامی حالات کے مطابق ڈھالیں، جوں کا توں منتقل نہ کریں. These are owner proposals, not new bank entries. Existing glossary definitions for SDGs, ICT, data-driven planning, digital transformation and innovation remain unchanged.
- This is translation production, not G5 review. G4 remains in progress as required by translate-unit Step 7; the existing row records work without a completion mark. G3/G5 remain open, and all page statuses remain draft. The existing G2 baseline is used under the skill's minimum prerequisite; accepted G3 evidence is still required before G5 acceptance.
- Build and rendered Urdu inspection were not run because this job prohibits builds and servers. The next independent reviewer must inspect desktop, narrow and A4 views, figure label fit, Nastaliq shaping and bidi punctuation. No visual approval is claimed. Source verification limitations in the English sources ledger remain with the English review owner.
- Work duration: not measured reliably for this continuation or the previous translation pass.
