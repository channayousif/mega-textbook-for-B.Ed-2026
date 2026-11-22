# GCCE-400 Unit 4 Urdu translation handoff

- Translator: agent:antigravity (crew job `gcce-400-u04-translate`), 2026-11-22, branch `crew/gcce-400-u04-translate`.
- English baseline: `7953d1221` (last change to the English unit, its figures and its figure manifest). No English unit file, figure manifest, sources, coverage or concepts file was changed, so the G2 evidence is untouched.
- Complete same-name mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-04/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`, `unit-teacher-notes.mdx`.
- Five `.ur.svg` figures (`fig-U4-1` to `fig-U4-5`) with their `.ur.dark.svg` twins from `npm run figures:variants`, wired into the topic files. Each SVG `<desc>` equals the Urdu page alt text.
- `translation_status` stays `draft` in both `index.mdx` files: only an accepted independent G5 earns `reviewed`. The G4 tracker row keeps status ▢ with a factual note; no row was appended and G5 is not claimed.

## Conventions used

- Topic titles read `موضوع 4.1 - ...` and `موضوع 4.2 - ...`, matching the English numbering; headings follow identical level vectors.
- Civic and engagement terms: accountability جواب دہی, non-violence عدم تشدد, community برادری, community development سماجی ترقی, community engagement سماجی شمولیت / برادری کی شمولیت, social cohesion سماجی ہم آہنگی, parental involvement والدین کی شمولیت, internal work اندرونی کام, external work بیرونی کام, lane organisation گلی کی تنظیم, lane manager لین مینیجر, school management committee اسکول مینجمنٹ کمیٹی, service-learning خدمت کے ذریعے سیکھنا.
- Constitution articles use `دفعہ` (`دفعہ 16`, `دفعہ 19`, `دفعہ 25`). `آئینِ پاکستان` for the Constitution. Western digits throughout.
- Names: Rabia رابعہ, Imran عمران, Sukkur سکھر, Thatta ٹھٹھہ, Mirpurkhas میرپورخاص, Dadu دادو, Larkana لاڑکانہ, Tharparkar تھرپارکر, Orangi اورنگی. Citations keep Latin author-year forms (Bala, 2013; Government of Pakistan, 2012; Hasan, 2006; MacQueen et al., 2001; OECD, 2011; Retallick, 2005; UNESCO, 2015; Youniss & Levine, 2009; EPA, 2026).
- `<Glossary>` attributes stay English (`Accountability`, `Non-violence`, `Community development`, `Social cohesion`, `Parental involvement`); wrapped surface text is translated.
- Option letters: الف) ب) ج) د) in the same order; the key uses the Urdu letter. Bloom tags: یاد رکھنا، سمجھنا، اطلاق، تجزیہ، جائزہ، تخلیق. Marks, word limits, timings and rubric bands unchanged.
- Self-answered from the Urdu alone, the MCQ key is ب، ج، ب، ج، ب، ج، ب، ب، الف، ج, matching the English B, C, B, C, B, C, B, B, A, C.

## Terminology

The frozen bank holds five terms that occur in the unit, all bound in the Urdu `key_terms`: Assessment (تشخیص), Summative Assessment (مجموعی جائزہ), Rubric (معیارِ جانچ), Self-Assessment (خود جائزہ), Practical Activity (عملی سرگرمی). The bank and `glossary.json` were not changed.

Proposed terms for the curriculum owner and the G5 reviewer (none are banked):

| English | Proposed Urdu | Note |
|---|---|---|
| Accountability | جواب دہی | content-spec key term and concept label |
| Non-violence | عدم تشدد | content-spec key term and concept label |
| Ethical considerations in civic engagement | شہری سرگرمی میں اخلاقی پہلو | concept label |
| Community and its characteristics | برادری اور اس کی خصوصیات | concept label |
| Community development | سماجی ترقی | concept label |
| Approaches to community engagement | سماجی شمولیت کے طریقے | concept label |
| Social cohesion | سماجی ہم آہنگی | concept label |
| Orangi Pilot Project as a community-driven initiative | اورنگی پائلٹ پروجیکٹ بطور برادری کی قیادت میں اقدام | concept label |
| School-community relationship and parental involvement | اسکول اور برادری کا تعلق اور والدین کی شمولیت | concept label |
| Parental involvement | والدین کی شمولیت | glossary term |
| School management committee | اسکول مینجمنٹ کمیٹی | institutional term |
| Internal work | اندرونی کام | OPP method term |
| External work | بیرونی کام | OPP method term |
| Lane organisation | گلی کی تنظیم | OPP method term |
| Lane manager | لین مینیجر | OPP role term |
| Katchi abadi | کچی آبادی | urban settlement term |
| Inform | مطلع کرنا | IAP2 participation level |
| Consult | مشورہ لینا | IAP2 participation level |
| Involve | شامل کرنا | IAP2 participation level |
| Collaborate | تعاون کرنا | IAP2 participation level |
| Empower | بااختیار بنانا | IAP2 participation level |
| Service-learning | خدمت کے ذریعے سیکھنا | pedagogical term |
| Community event planning | برادری کی تقریب کی منصوبہ بندی | practical activity |

## Figures

- `fig-U4-1.ur.svg` mirrors the concept map: central ellipse labelled اخلاقی شہری سرگرمی with five linked nodes (جواب دہی، عدم تشدد، سچائی اور دیانت، احترام، شمولیت) end-anchored, and an outer ring reading دوسروں کو نقصان نہ پہنچائیں۔.
- `fig-U4-2.ur.svg` mirrors the comparison table columns so the method column (طریقہ کار) sits on the right, ethical status (اخلاقی؟) in the middle, and value kept or broken (برقرار یا پامال شدہ قدر) on the left.
- `fig-U4-3.ur.svg` mirrors the 5-step engagement cycle flowing counter-clockwise in RTL from Step 1 (ضرورت کی شناخت) at top, through Step 2 (متحرک کرنا), Step 3 (مل کر منصوبہ بندی), Step 4 (عمل درآمد), to Step 5 (جائزہ لینا), with a return arrow labelled اگلی ضرورت and a center note.
- `fig-U4-4.ur.svg` mirrors the school community diagram: school at centre, linked with two-way arrows to Parents and families (top right), School management committee (top left), Local organisations (bottom right), and Local government (bottom left).
- `fig-U4-5.ur.svg` mirrors the horizontal timeline axis from right to left: 1980 at right, 1983-1993, 1988, 1994, 2004, and 2006 at left.
- All ten SVGs (5 source `.ur.svg` and 5 derived `.ur.dark.svg`) were checked with `scripts/heavy.sh node scripts/measure-figure-text.mjs` and exit 0 with zero text clipping, zero text collisions and zero wordmark collisions.

## Validation and limits

- `npm run check:content` with both `index.mdx` files temporarily flipped to `reviewed`: passes `validate:content` parity, `check:figures` Urdu parity and the `key_terms` bank check. The only reported findings are the expected incomplete G4 and G5 tracker rows for Unit 4 (`check-content-parity.txt`). Both files were then restored byte-for-byte to `draft`.
- `npm run check:content` at `draft` passes all 14 gates cleanly.
- Structural self-check: identical heading-level vectors across all 5 files, matching component counts (5 Figure, 5 Glossary, 3 PrintHandout, 1 TranslationStatusBadge), matching table rows, and 10/10/5 numbered items.
- `scripts/render-inspect.mjs --locale ur` was NOT run. This job's brief forbids a dev server, `npm run build` and any local render-inspect run, and permits render-inspect only for a review job against `https://textbook.com.pk`. The rendered Urdu (Nastaliq shaping, 360px and A4 print, table scroll) is therefore unverified here and is a G5 task.

## Open points for G3, G5 and the owner

1. The nine authored concept labels in `concepts/unit-04.md` and the proposed terms table above.
2. The Urdu render at 360px and A4 print, and the RTL table reading order in `fig-U4-2`.
3. The `youniss-levine-2009` title-level use, `oecd-2011-social-cohesion` definition against the report, and constitutional currency of Articles 16, 19 and 25 already flagged for G3 in `sources/unit-04.md`.