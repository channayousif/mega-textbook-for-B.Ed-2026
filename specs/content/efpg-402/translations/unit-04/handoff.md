# EFPG-402 Unit 4 Urdu translation handoff

- Translator: agent:agy (crew job `efpg-402-u04-translate`), 2026-11-27, branch `crew/efpg-402-u04-translate`.
- English baseline: `c8efed9b4` (HEAD of `crew/efpg-402-u04-translate` when started). No English unit file, figure manifest, sources, coverage or concepts file was changed.
- Complete same-name mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-04/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `topic-04.mdx`, `topic-05.mdx`, `unit-assessment.mdx`.
- Ten `.ur.svg` figures (`fig-U4-1` to `fig-U4-10`) with their `.ur.dark.svg` twins from `npm run figures:variants`, wired into the topic files. Each SVG text geometry was measured with `scripts/heavy.sh node scripts/measure-figure-text.mjs` and exits 0 with zero clipping, text collisions, or wordmark collisions.
- `translation_status` stays `draft` in both `index.mdx` files: only an accepted independent G5 earns `reviewed`. The G4 tracker row keeps status ▢ with a factual note; no row was appended and G5 is not claimed.

## Conventions used

- Topic titles read `موضوع N.M - ...`, matching the English numbering (`موضوع 4.1 - سائنس میں تدریسی معاونات کی اہمیت`, `موضوع 4.2 - تجربہ گاہ کے آلات کا استعمال`, `موضوع 4.3 - کم خرچ تدریسی معاونات کی تیاری اور استعمال`, `موضوع 4.4 - سائنس تدریس میں آئی سی ٹی کا استعمال`, `موضوع 4.5 - سائنس نمائشیں، فیلڈ ٹرپس اور کمیونٹی وسائل`); headings follow identical level vectors across all files.
- Option letters: الف) ب) ج) د) in the same order; the key uses the Urdu letter. Bloom tags: یاد رکھنا، سمجھنا، اطلاق، تجزیہ، جائزہ لینا، تخلیق کرنا. Marks, word limits, timings and rubric bands unchanged.
- Self-answered from the Urdu alone, the MCQ key is د، ب، ج، ج، ب، ب، ب، ب، ب، ب, matching the English D, B, C, C, B, B, B, B, B, B.
- Zero em dashes (U+2014) in any authored file.
- Names: Sir Rashid سر راشد, Larkana لاڑکانہ, Madam Tahira میڈم طاہرہ, Khairpur خیرپور, Sir Bilal سر بلال, Badin بدین, Madam Nasreen میڈم نسرین, Dadu دادو, Sir Zameer سر ضمیر, Jacobabad جیکب آباد. Citations keep Latin author-year forms (Dale, 1969; National Curriculum Council, 2023; Vaidya; Khan et al., 2019; Khan Academy; PhET Interactive Simulations).

## Terminology

The frozen bank holds 15 terms that occur in the unit, all bound in the Urdu `key_terms`:
- Learning Outcome (نتیجہ ہائے تعلم)
- Curriculum (نصاب)
- Lesson Plan (سبقی منصوبہ)
- Attention (توجہ)
- Problem Solving (مسئلہ حل کرنا)
- Group Work (گروہی کام)
- Environment (ماحول)
- Practical Activity (عملی سرگرمی)
- Active Learning (فعال تعلم)
- Collaborative Learning (باہمی تعلم)
- Experiential Learning (تجرباتی تعلم)
- Critical Thinking (تنقیدی سوچ)
- Self-Assessment (خود جائزہ)
- Summative Assessment (مجموعی جائزہ)
- Rubric (معیارِ جانچ)

The bank and `glossary.json` were not changed.

Proposed terms for the curriculum owner and the G5 reviewer (none are banked):

| English | Proposed Urdu | Note |
|---|---|---|
| Teaching aids | تدریسی معاونات | concept label CON:EFPG-402-4-1 |
| Cone of experience | مخروطِ تجربہ | concept label CON:EFPG-402-4-2 (Edgar Dale) |
| Laboratory equipment | تجربہ گاہ کے آلات | concept label CON:EFPG-402-4-3 |
| Safe use | محفوظ استعمال | concept label CON:EFPG-402-4-3 |
| Low-cost teaching aids | کم خرچ تدریسی معاونات | concept label CON:EFPG-402-4-4 |
| Improvised teaching aids | خود ساختہ تدریسی معاونات | concept label CON:EFPG-402-4-4 |
| ICT tools | آئی سی ٹی کے آلات | concept label CON:EFPG-402-4-5 |
| Science exhibitions | سائنس نمائشیں | concept label CON:EFPG-402-4-6 |
| Field trips | فیلڈ ٹرپس | concept label CON:EFPG-402-4-7 |
| Community resources | کمیونٹی وسائل | concept label CON:EFPG-402-4-7 |
| Meniscus | ہلالہ | curvature of liquid surface in cylinder |
| Parallax error | زاویہ نگاہ کی غلطی | reading error from non-perpendicular view |
| Gravity filtration | کششِ ثقل کے ذریعے فلٹریشن | standard filtration technique |
| Retort stand | ریٹارٹ اسٹینڈ | standard lab iron support |
| Test tube / Boiling tube | امتحانی نلی / ابلنے والی نلی | standard glassware |
| Graduated cylinder | گریجویٹڈ سلنڈر | volumetric measuring glassware |
| Spirit burner | اسپرٹ لیمپ | safe alcohol burner |
| Spring balance | اسپرنگ بیلنس | force / weight instrument |
| Pinhole camera | پن ہول کیمرہ | rectilinear propagation aid |
| Working model | فعال ماڈل / کام کرنے والا ماڈل | operational physical model |
| Simulation | سمولیشن | digital interactive model |
| Data logger | ڈیٹا لاگر | digital sensor recorder |

## Figures

- `fig-U4-1.ur.svg` (concept map): central node سائنس میں تدریسی معاونات with four branches: توجہ اور ارتکاز, تصوراتی وضاحت, دیرپا برقراری, شمولیت اور برابری.
- `fig-U4-2.ur.svg` (diagram): Dale's cone of experience with four bands from concrete base (براہِ راست بامقصد تجربات) to apex (لفظی اور تحریری علامات).
- `fig-U4-3.ur.svg` (table): three columns (آلہ, سائنسی استعمال, سنبھالنے اور حفاظت کے اصول) for test tube, beaker, graduated cylinder, spirit burner, spring balance.
- `fig-U4-4.ur.svg` (diagram): gravity filtration apparatus setup with six callout boxes at right in RTL.
- `fig-U4-5.ur.svg` (flowchart): five-step design cycle for low-cost aids (ہدف کا تعین, مواد کی فراہمی, ماڈل کی تعمیر, آزمائش اور جانچ, تدریس اور تامل).
- `fig-U4-6.ur.svg` (table): five low-cost teaching aids (پھیپھڑوں کا ماڈل, برقی سرکٹ ٹیسٹر, پن ہول کیمرہ, واٹر فلٹر, کثافت کا کالم).
- `fig-U4-7.ur.svg` (table): ICT tools compared with low-resource offline alternatives across four categories.
- `fig-U4-8.ur.svg` (diagram): comparative decision framework contrasting when to use digital ICT versus real physical objects with a central pedagogical filter (تدریسی کسوٹی).
- `fig-U4-9.ur.svg` (concept map): five community science resources (زرعی فارم, بنیادی ہیلتھ یونٹ, آٹو مرمت کی ورکشاپ, نہر یا دریا کا کنارہ, مٹی کے برتن یا بھٹہ).
- `fig-U4-10.ur.svg` (table): four phases of planning an effective school science exhibition.
- All twenty SVGs (10 source `.ur.svg` and 10 derived `.ur.dark.svg`) were checked with `scripts/measure-figure-text.mjs` and exit 0 with zero text clipping, zero text collisions and zero wordmark collisions.

## Validation and limits

- `npm run check:content` with both `index.mdx` files temporarily flipped to `reviewed`: passes `validate:content` parity, `check:figures` Urdu parity and the `key_terms` bank check. The only reported findings are the expected incomplete G4 and G5 tracker rows for Unit 4. Both files were then restored byte-for-byte to `draft`.
- `npm run check:content` at `draft` passes all 14 gates cleanly.
- Structural self-check: identical heading-level vectors across all 7 files, matching component counts (10 Figure, 6 PrintHandout, 1 TranslationStatusBadge), matching table rows, and 10/10/5 numbered items.
- `scripts/render-inspect.mjs --locale ur` was NOT run. This job's brief forbids a dev server, `npm run build` and any local render-inspect run, and permits render-inspect only for a review job against `https://textbook.com.pk`. The rendered Urdu (Nastaliq shaping, 360px and A4 print, table scroll) is therefore unverified here and is a G5 task.

## Open points for G3, G5 and the owner

1. The authored concept labels in `concepts/unit-04.md` and the proposed terms table above.
2. The Urdu render at 360px and A4 print, and the RTL table reading order.
