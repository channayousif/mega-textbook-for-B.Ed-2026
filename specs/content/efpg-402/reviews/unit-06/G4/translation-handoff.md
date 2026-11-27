# EFPG-402 Unit 6 Urdu translation handoff

- Translator: agent:agy (crew job `efpg-402-u06-translate`), 2026-11-27, branch `crew/efpg-402-u06-translate`.
- English baseline: `956c4ba91`. No English unit file, figure manifest, sources, coverage or concepts file was changed.
- Complete same-name mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-06/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `topic-04.mdx`, `topic-05.mdx`, `topic-06.mdx`, `unit-assessment.mdx`.
- Twelve `.ur.svg` figures (`fig-U6-1` to `fig-U6-12`) with their `.ur.dark.svg` twins from `npm run figures:variants`, wired into the topic files.
- `translation_status` stays `draft` in both `index.mdx` files: only an accepted independent G5 earns `reviewed`. The G4 tracker row keeps status ▢ with a factual note; no row was appended and G5 is not claimed.

## Conventions used

- Topic titles read `موضوع 6.M - ...`, matching the English numbering (`موضوع 6.1 - سائنس لیبارٹری کی اہمیت`, `موضوع 6.2 - سائنس لیبارٹری کا نقشہ اور تنظیمی ڈھانچہ`, `موضوع 6.3 - سامان کی ذخیرہ کاری اور کیمیائی مادوں کا اخراج`, `موضوع 6.4 - لیبلنگ، انوینٹری اور اسٹاک رجسٹرز`, `موضوع 6.5 - لیبارٹری کے حفاظتی اصول اور ابتدائی طبی امداد`, `موضوع 6.6 - لیبارٹری انتظام میں سائنس استاد کا کردار`); headings follow identical level vectors across all files.
- Option letters: الف) ب) ج) د) in the same order; the key uses the Urdu letter.
- Self-answered from the Urdu alone, the MCQ key is ب، ب، د، ج، ب، ب، ج، ب، ج، ب, matching the English B, B, D, C, B, B, C, B, C, B.
- Zero em dashes (U+2014) in any authored file.
- Names: Farhana فرحانہ, Mirpurkhas میرپورخاص, Jameel جمیل, Sukkur سکھر, Zulfiqar ذوالفقار, Nawabshah نوابشاہ, Shahida شاہدہ, Hyderabad حیدرآباد, Naveed نوید, Larkana لاڑکانہ, Bilquees بلقیس, Badin بدین. Citations keep Latin author-year forms (Kochhar; National Curriculum Council, 2023; CPSC & NIOSH, 2006; Minhas, 2025).

## Terminology

The frozen bank holds 13 terms that occur in the unit, all bound in the Urdu `key_terms`:
- Learning Outcome (نتیجہ ہائے تعلم)
- Student-Learning Outcome (طالب علم کا نتیجہ ہائے تعلم)
- Environment (ماحول)
- Problem Solving (مسئلہ حل کرنا)
- Critical Thinking (تنقیدی سوچ)
- Active Learning (فعال تعلم)
- Group Work (گروہی کام)
- Practical Activity (عملی سرگرمی)
- Self-Assessment (خود جائزہ)
- Summative Assessment (مجموعی جائزہ)
- Rubric (معیارِ جانچ)
- Classroom Management (جماعتی انتظام)
- Attitude (رویہ)

The bank and `glossary.json` were not changed.

Proposed terms for the curriculum owner and the G5 reviewer:

| English | Proposed Urdu | Note |
|---|---|---|
| Role and importance of the science laboratory | سائنس لیبارٹری کا کردار اور اہمیت | concept label CON:EFPG-402-6-1 |
| Laboratory layout and spatial organization | لیبارٹری کا نقشہ اور تنظیمی ڈھانچہ | concept label CON:EFPG-402-6-2 |
| Chemical arrangement and compatibility storage | کیمیائی مادوں کی ترتیب اور مطابقت کے مطابق ذخیرہ کاری | concept label CON:EFPG-402-6-3 |
| Safe disposal of chemical waste | کیمیائی فضلہ کا محفوظ اخراج | concept label CON:EFPG-402-6-4 |
| Chemical container labelling and GHS standards | کیمیائی بوتلوں کی لیبلنگ اور جی ایچ ایس معیارات | concept label CON:EFPG-402-6-5 |
| Inventory management and stock registers | انوینٹری کا انتظام اور اسٹاک رجسٹرز | concept label CON:EFPG-402-6-6 |
| Laboratory safety rules and risk prevention | لیبارٹری کے حفاظتی اصول اور خطرات کی روک تھام | concept label CON:EFPG-402-6-7 |
| Laboratory first-aid measures and emergency care | لیبارٹری میں ابتدائی طبی امداد اور ہنگامی نگہداشت | concept label CON:EFPG-402-6-8 |
| Teacher responsibilities in laboratory management | لیبارٹری انتظام میں سائنس استاد کی ذمہ داریاں | concept label CON:EFPG-402-6-9 |
| Compatibility grouping | مطابقت کے گروہ | chemical storage standard |
| Neutralization | تعدیل | chemical disposal |
| Master utility shutoff | مرکزی یوٹیلیٹی سوئچ | laboratory safety engineering |
| Permanent stock register | مستقل اسٹاک رجسٹر | statutory equipment ledger |
| Consumable stock register | قابلِ صرف اسٹاک رجسٹر | statutory supplies ledger |
| Breakage and condemnation register | ٹوٹ پھوٹ اور منسوخی کا رجسٹر | statutory condemnation ledger |
| Eyewash station | آنکھ دھونے کا فوارہ / اسٹیشن | emergency safety fixture |
| Personal protective equipment (PPE) | ذاتی حفاظتی سامان | safety standard |

## Figures

- `fig-U6-1.ur.svg` (concept map): central node سائنس لیبارٹری, four domain branches.
- `fig-U6-2.ur.svg` (table): four alternative practical approaches for schools without a lab, mirrored RTL.
- `fig-U6-3.ur.svg` (diagram): model laboratory floor plan with benches, perimeter sinks, dual exits, prep room.
- `fig-U6-4.ur.svg` (table): five architectural layout features and safety rationales, mirrored RTL.
- `fig-U6-5.ur.svg` (table): chemical compatibility storage rules across five substance groups, mirrored RTL.
- `fig-U6-6.ur.svg` (flowchart): chemical waste disposal decision tree, mirrored RTL.
- `fig-U6-7.ur.svg` (table): sample laboratory stock register layout with 7 mandatory columns, mirrored RTL.
- `fig-U6-8.ur.svg` (diagram): GHS-compliant chemical reagent bottle label, mirrored RTL.
- `fig-U6-9.ur.svg` (table): first-aid protocols for chemical splashes, burns, cuts, and fume exposure, mirrored RTL.
- `fig-U6-10.ur.svg` (diagram): six standard GHS hazard pictograms and meanings, mirrored RTL.
- `fig-U6-11.ur.svg` (concept map): teacher's tripartite management cycle (pre-lab, live supervision, post-lab).
- `fig-U6-12.ur.svg` (table): weekly operational inspection checklist across five days, mirrored RTL.

## Validation and limits

- Structural self-check: identical heading-level vectors across all 8 files, matching component counts (12 Figure, 7 PrintHandout, 1 TranslationStatusBadge), matching table rows, and 10/10/5 numbered items.
- Zero em dashes (U+2014) in any authored file.
- `scripts/render-inspect.mjs --locale ur` was NOT run per brief constraints.
