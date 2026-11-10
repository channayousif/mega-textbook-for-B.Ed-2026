# GISS-401 Unit 5 Urdu translation handoff

Translator: agent:agy (crew job `giss-401-u05-translate-r1`). Date: 2026-11-10. This is a G4 draft handoff, not a G5 review.

## Baseline and delivered mirror

English source baseline: commit on branch `crew/giss-401-u05-translate-r1` touching `docs/semester-3/giss-401/unit-05/`. The English baseline includes the G3 advisory repairs applied earlier on 2026-11-10 (opencode crew `giss-401-u05-repair_en`).

Mirror path, resolved with `resolveUnit()`: `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-05/`.
Translated files:
- `index.mdx`
- `topic-01.mdx`
- `topic-02.mdx`
- `unit-assessment.mdx`

Added `fig-U5-1` to `fig-U5-4` as `.ur.svg` with derived `.ur.dark.svg`. Each `<desc>` equals its page `alt`. Front-matter topic titles and H1s read `موضوع 5.1 - ...` and `موضوع 5.2 - ...`. Front-matter metadata, `blooms_summary`, `clo_refs`, `est_reading_minutes`, and `assessment_weighting` are structurally matched. Heading level vectors match file-by-file with English. Numbered item counts match. Assessment bank preserves 10 MCQs, 10 RRQs, and 5 ERQs, with A-D mapped to الف، ب، ج، د and answers bounded in the final `## جوابات اور نمبر دہی کی رہنمائی` section.

`translation_status` remains `draft` on all pages because G5 review has not happened; only an accepted independent G5 earns `reviewed`.

## Decisions a G5 reviewer should check

- **Qur'an and Hadith quotations:** Rendered into academic-plain Urdu matching the English citations (Quran.com / Saheeh International, Sahih Muslim, Sahih al-Bukhari, Sunan Abi Dawud). An Islamic Studies reviewer should check all block-quoted and in-text scriptural passages.
- **Honorifics:** Added in accordance with standard Urdu Islamic Studies convention: صلی اللہ علیہ وسلم for Prophet Muhammad, علیہ السلام for Prophet Ibrahim, and اللہ تعالیٰ for Allah Almighty.
- **RTL layout in figures:** Figures `fig-U5-1.ur.svg`, `fig-U5-2.ur.svg`, `fig-U5-3.ur.svg`, and `fig-U5-4.ur.svg` are mirrored right-to-left. In tables, the category/dimension column is positioned on the right. In the Shura diagram (fig-U5-3), Ahl al-Hall wal-Aqd is placed on the right and public feedback on the left. In the Zakat flowchart (fig-U5-1), flow runs right to left.
- **Figure viewBox:** Adjusted to 780 width (`780x480` and `780x470`) to strictly conform to `CANVAS_WIDTHS: [760, 780]`. Text geometry measured with `scripts/heavy.sh node scripts/measure-figure-text.mjs` and verified clean (code 0).
- **Untranslated notice omitted:** The English draft notice ("Urdu translation is not yet available...") is not included in the Urdu pages.

## Terminology

The frozen bank (`specs/content/terminology.csv`) was consulted without edits. The Urdu `index.mdx` declares accepted pairs in `key_terms`:
- Learning: سیکھنا
- Assessment: تشخیص
- Formative Assessment: تشکیلی تشخیص
- Summative Assessment: مجموعی جائزہ
- Learning Outcome: نتیجہ ہائے تعلم
- Rubric: معیارِ جانچ
- Self-Assessment: خود جائزہ
- Professional Ethics: پیشہ ورانہ اخلاقیات
- Curriculum: نصاب
- Pedagogy: تدریسیات

The ten concept-graph labels from `specs/content/giss-401/concepts/unit-05.md` were consulted and integrated:
- CON:GISS-401-5-1: حلال اور حرام کے معاشی اصول
- CON:GISS-401-5-2: مال بطورِ امانتِ الٰہی
- CON:GISS-401-5-3: ادارہ جاتی زکوٰۃ اور غربت کا خاتمہ
- CON:GISS-401-5-4: زکوٰۃ اور صدقہ کا تقابلی جائزہ
- CON:GISS-401-5-5: سود کی حرمت اور معاشی انصاف
- CON:GISS-401-5-6: شوریٰ کا تصور اور طریقہ کار
- CON:GISS-401-5-7: حکمرانی میں انصاف اور قانون کی بالادستی
- CON:GISS-401-5-8: ادارہ جاتی احتساب
- CON:GISS-401-5-9: اقلیتوں کے حقوق اور قانونی تحفظ
- CON:GISS-401-5-10: پاکستان کے آئین میں اقلیتوں کا تحفظ

Proposed specialised terms for the curriculum owner (translation proposals only, not bank additions):

| English | Urdu used |
|---|---|
| Halal and Haram | حلال اور حرام |
| Amanah (trusteeship) | امانت (امانتِ الٰہی) |
| Zakat | زکوٰۃ |
| Sadaqah | صدقہ |
| Riba (interest / usury) | سود (ربا) |
| Nisab | نصاب |
| Hawl (one lunar year ownership) | حول (ایک قمری سال) |
| Ushr | عشر |
| Mudarabah | مضاربت |
| Musharakah | مشارکت |
| Murabahah | مرابحہ |
| Qard al-Hasan | قرضِ حسن |
| Hakimiyyah (divine sovereignty) | حاکمیت (اللہ تعالیٰ کی حاکمیتِ اعلیٰ) |
| Khilafat (vicegerency) | خلافت (نیابت) |
| Shura (consultation) | شوریٰ (باہمی مشاورت) |
| Ahl al-Hall wal-Aqd | اہلِ حل و عقد |
| Istibdad (despotism / authoritarianism) | استبداد (آمریت / یکطرفہ تسلط) |
| Adl (impartial justice) | عدل (غیر جانب دارانہ انصاف) |
| Qada (judiciary) | قضاء (عدلیہ / عدالتی نظام) |
| Muhasabah (accountability) | محاسبہ (عوامی و ادارہ جاتی احتساب) |
| Huquq al-Aqalliyyat | حقوقِ اقلیات |
| Ahl al-Dhimmah / Mu'ahidun | اہلِ ذمہ / معاہدین |
| Mithaq al-Madinah | میثاقِ مدینہ |
| Ummah Wahidah | امت واحدہ |
| Ghash and Tadlis (fraud and deceit) | غش اور تدلیس |
| Ihtikar (hoarding / monopoly) | احتکار (ذخیرہ اندوزی / اجارہ داری) |
| Gharar (excessive ambiguity) | غرر |
| Maysir and Qimar (gambling) | میسر اور قمار |
| Trainee teacher | زیرِ تربیت استاد / استانی |

Bloom cognitive tags follow standard corpus forms: یاد رکھنا، سمجھنا، اطلاق کرنا، تجزیہ کرنا، جانچنا، تخلیق کرنا.

## Validation and gate results

- `npm run check:content`: all 14 gates pass with both `index.mdx` files at `draft`.
- Conditional parity probe with temporary `reviewed` flip: `validate:content` (including heading and file parity), `check:figures` (.ur.svg check), `check:svg-style` (0 violations), and `check:pipeline-gate` (terminology conformance) all passed cleanly; the only two findings were the expected uncompleted G4/G5 rows for this unit under review.
- `measure-figure-text.mjs`: all four `.ur.svg` files passed under `scripts/heavy.sh` with 0 failures.
- `npm run figures:variants:check`: OK for all 1292 figures.
- Zero em-dash (U+2014) verified across all authored Urdu MDX and SVG files.
- MDX compilation verified via `@mdx-js/mdx`.
