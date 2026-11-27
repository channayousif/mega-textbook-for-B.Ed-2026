# EFPG-402 Unit 1 Urdu translation handoff

- Translator: agent:agy (crew job `efpg-402-u01-translate`), 2026-11-27, branch `crew/efpg-402-u01-translate`.
- English baseline: `c6bbab221` (last change to the English unit, its figures and its figure manifest). No English unit file, figure manifest, sources, coverage or concepts file was changed. This handoff file itself is bound by the G2 input manifest (it names `unit-01` under `specs/content/efpg-402/`), so adding it made the earlier G2 evidence stale; the evidence was refreshed as described under "Validation and limits".
- Complete same-name mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-01/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `topic-04.mdx`, `topic-05.mdx`, `unit-assessment.mdx`.
- Ten `.ur.svg` figures (`fig-U1-1` to `fig-U1-10`) with their `.ur.dark.svg` twins from `npm run figures:variants`, wired into the topic files. Each SVG text geometry was measured with `node scripts/measure-figure-text.mjs` and exits 0 with zero clipping, text collisions, or wordmark collisions.
- `translation_status` stays `draft` in both `index.mdx` files: only an accepted independent G5 earns `reviewed`. The G4 tracker row keeps status ▢ with a factual note; no row was appended and G5 is not claimed.

## Conventions used

- Topic titles read `موضوع N.M - ...`, matching the English numbering (`موضوع 1.1 - سائنس کا مفہوم اور خصوصیات`, `موضوع 1.2 - سائنس بطور عمل، بطور حاصل اور بطور رویہ`, `موضوع 1.3 - سائنس کی تدریس کے مقاصد اور اہداف`, `موضوع 1.4 - سائنسی تعلیم کی اقدار`, `موضوع 1.5 - جدید معاشرے میں سائنس کا کردار`); headings follow identical level vectors across all files.
- Option letters: الف) ب) ج) د) in the same order; the key uses the Urdu letter. Bloom tags: یاد رکھنا، سمجھنا، اطلاق، تجزیہ، جائزہ، تخلیق. Marks, word limits, timings and rubric bands unchanged.
- Self-answered from the Urdu alone, the MCQ key is ج، ب، ج، الف، ب، ج، ب، الف، ج، الف, matching the English C, B, C, A, B, C, B, A, C, A.
- Zero em dashes (U+2014) in any authored file.
- Names: Rukhsana رخسانہ, Sana ثنا, Tando Allahyar ٹنڈو الہیار, Imran عمران, Tariq طارق, Zainab زینب, Farooq فاروق, Halai ہالائی. Citations keep Latin author-year forms (Halai, 2003; Hepburn & Andersen, 2015/2026; Ministry of Federal Education and Professional Training, 2022; Federal Directorate of Immunization, 2024).

## Terminology

The frozen bank holds 11 terms that occur in the unit, all bound in the Urdu `key_terms`:
- Learning Outcome (نتیجہ ہائے تعلم)
- Attitude (رویہ)
- Curriculum (نصاب)
- Lesson Plan (سبقی منصوبہ)
- Rote Learning (رٹا لگانا)
- Problem Solving (مسئلہ حل کرنا)
- Group Work (گروہی کام)
- Environment (ماحول)
- Self-Assessment (خود جائزہ)
- Summative Assessment (مجموعی جائزہ)
- Rubric (معیارِ جانچ)

The bank and `glossary.json` were not changed.

Proposed terms for the curriculum owner and the G5 reviewer (none are banked):

| English | Proposed Urdu | Note |
|---|---|---|
| Meaning of science | سائنس کا مفہوم | concept label CON:EFPG-402-1-1 |
| Characteristics of science | سائنس کی خصوصیات | concept label CON:EFPG-402-1-2 |
| Common sense | عام فہم | concept label CON:EFPG-402-1-3 |
| Belief or superstition | عقیدہ یا توہم | concept label CON:EFPG-402-1-3 |
| Science as a process | سائنس بطور عمل | concept label CON:EFPG-402-1-4 |
| Process skills | عملی مہارتیں | concept label CON:EFPG-402-1-4 |
| Science as a product | سائنس بطور حاصل | concept label CON:EFPG-402-1-5 |
| Scientific attitude | سائنسی رویہ | concept label CON:EFPG-402-1-6 (رویہ is banked) |
| Aims and objectives | مقاصد اور اہداف | concept label CON:EFPG-402-1-7 |
| Scientific literacy | سائنسی خواندگی | concept label CON:EFPG-402-1-8 |
| Intellectual, moral and social values | ذہنی، اخلاقی اور سماجی اقدار | concept label CON:EFPG-402-1-9 |
| Science in daily life | روزمرہ زندگی میں سائنس | concept label CON:EFPG-402-1-10 |
| Citizen | شہری | concept label CON:EFPG-402-1-11 |
| Empirical | تجربی | characteristic of science |
| Testable | قابلِ آزمائش | characteristic of science |
| Tentative | غیر حتمی | characteristic of science |
| Cumulative | تراکمی | characteristic of science |
| Self-correcting | خود اصلاح کرنے والا | characteristic of science |
| Hypothesis | مفروضہ | product of science |
| Theory | نظریہ | product of science |
| Law | قانون | product of science |

## Figures

- `fig-U1-1.ur.svg` (concept map): central node سائنس, five characteristic branches around it, dashed arrow for نئے شواہد.
- `fig-U1-2.ur.svg` (table): three columns (سائنس, عام فہم, عقیدہ یا توہم) and four rows comparing origin, checking, and contrary evidence.
- `fig-U1-3.ur.svg` (flowchart): enquiry loop with six clockwise steps (مشاہدہ، سوال پوچھنا، مفروضہ بنانا، آزمائش، نتیجہ اخذ کرنا، نتیجہ پہنچانا) and return paths.
- `fig-U1-4.ur.svg` (diagram): triangle of three faces (عمل، حاصل، رویہ) with interconnecting double-headed arrows.
- `fig-U1-5.ur.svg` (table): matching six aims of science teaching with the National Curriculum of Pakistan 2022-23.
- `fig-U1-6.ur.svg` (diagram): top-to-bottom narrowing from broad aim (مقصد) to lesson objective (ہدف) to visible classroom outcome (جماعتی نتیجہ).
- `fig-U1-7.ur.svg` (table): intellectual, moral and social values with classroom examples.
- `fig-U1-8.ur.svg` (concept map): values built by a science lesson with leaf nodes and honesty link.
- `fig-U1-9.ur.svg` (table): four areas of daily life in Pakistan (صحت، زراعت، توانائی، مواصلات) and citizen questions.
- `fig-U1-10.ur.svg` (timeline): EPI Pakistan vaccination timeline from 1978 to 2021.
- All twenty SVGs (10 source `.ur.svg` and 10 derived `.ur.dark.svg`) were checked with `scripts/measure-figure-text.mjs` and exit 0 with zero text clipping, zero text collisions and zero wordmark collisions.

## Validation and limits

- `npm run check:content` with both `index.mdx` files temporarily flipped to `reviewed`: passes `validate:content` parity, `check:figures` Urdu parity and the `key_terms` bank check. The only reported findings are the expected incomplete G4 and G5 tracker rows for Unit 1. Both files were then restored byte-for-byte to `draft`.
- `npm run check:content` at `draft` passes all 14 gates cleanly.
- G2 evidence: adding this handoff made the earlier G2 evidence stale, because a path under `specs/content/efpg-402/` that names `unit-01` is bound by the G2 input manifest. `node scripts/prepare-gate-evidence.mjs --refresh-stale` re-ran the eight draft gates at HEAD (all PASS) and repointed the G2 en-draft tracker row to a refreshed `reviews/unit-01/G2/<stamp>-gates.json`; the tracker row names the current file. Editing this handoff again requires the same refresh.
- Structural self-check: identical heading-level vectors across all 7 files, matching component counts (10 Figure, 6 PrintHandout, 1 TranslationStatusBadge), matching table rows, and 10/10/5 numbered items.
- `scripts/render-inspect.mjs --locale ur` was NOT run. This job's brief forbids a dev server, `npm run build` and any local render-inspect run, and permits render-inspect only for a review job against `https://textbook.com.pk`. The rendered Urdu (Nastaliq shaping, 360px and A4 print, table scroll) is therefore unverified here and is a G5 task.

## Open points for G3, G5 and the owner

1. The authored concept labels in `concepts/unit-01.md` and the proposed terms table above.
2. The Urdu render at 360px and A4 print, and the RTL table reading order.
3. Banner figure `fig-U1-11` remains `prompt-only` for the illustrate job.
