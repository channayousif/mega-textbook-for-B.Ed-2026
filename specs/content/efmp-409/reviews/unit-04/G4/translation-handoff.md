# EFMP-409 Unit 4: Urdu translation handoff

- Translator: agy (Gemini), crew job `efmp-409-u04-translate`, 2026-11-25.
- English baseline: `9a7d5630d` (branch HEAD at start; last English unit commit `9a7d5630d`). English content, figures, manifest, sources, coverage and concepts are unchanged.
- Complete mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `unit-assessment.mdx` and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-04/`, resolved through `resolveUnit()`.
- Structural self-check: heading level vectors identical in all 6 files; numbered items, bullets, table rows and component calls (`<Figure>` 6, `<PrintHandout>` 5, `<TranslationStatusBadge>` 1) match; front-matter identifiers, `clo_refs`, `est_reading_minutes` and `translation_status` byte-identical. Option order and answer letters unchanged (A/B/C/D to الف/ب/ج/د; keys 1 ب, 2 الف, 3 ب, 4 ج, 5 ب, 6 الف, 7 ج, 8 ب, 9 ب, 10 الف).
- Six schematic sources: `static/img/figures/efmp-409/unit-04/fig-U4-{1..6}.ur.svg`, with derived `.ur.dark.svg` twins. RTL coordinates and text-anchors mirrored, Nastaliq-first font stack, table columns ordered right to left. Each `<desc>` equals its page alt. `measure-figure-text.mjs` exits 0 on all 6; `build-figure-variants.mjs` derived and verified `.ur.dark.svg` variants clean.
- `translation_status` remains `draft` in both locales. G3 is still open; G5 has not happened. No certification, publication action or done mark is recorded.

## Terminology working set

Bound to `specs/content/terminology.csv` and listed in the UR `index.mdx` `key_terms`:
- `Curriculum` -> `نصاب`
- `Learning` -> `سیکھنا`
- `Assessment` -> `تشخیص`
- `Self-Assessment` -> `خود جائزہ`
- `Summative Assessment` -> `مجموعی جائزہ`
- `Rubric` -> `معیارِ جانچ`
- `Teaching Strategy` -> `حکمتِ تدریس`
- `Rote Learning` -> `رٹا لگانا`
- `Reflective Thinking` -> `تاملی سوچ`

## Proposed terms for the owner and G5 (not banked)

As documented in `specs/content/efmp-409/concepts/unit-04.md`, concept labels and domain terms are authored and proposed for independent review:

| English | Urdu used | Notes |
|---|---|---|
| Iqra and the first revelation | اِقرا اور پہلی وحی | Authored concept label CON:EFMP-409-4-1 |
| Seeking knowledge in the Qur'an | قرآن میں علم کی تلاش | Authored concept label CON:EFMP-409-4-2 |
| Seeking knowledge in the Hadith | حدیث میں علم کی تلاش | Authored concept label CON:EFMP-409-4-3 |
| The Charter of Medina | میثاقِ مدینہ | Authored concept label CON:EFMP-409-4-4 |
| The Last Sermon and its principles | خطبۂ وداع اور اس کے اصول | Authored concept label CON:EFMP-409-4-5 |
| The As-Suffa learning circle | اصحابِ صفہ کا تعلیمی حلقہ | Authored concept label CON:EFMP-409-4-6 |
| Method and curriculum at As-Suffa | صفا میں طریقۂ کار اور نصاب | Authored concept label CON:EFMP-409-4-7 |
| Halaqah | حلقہ | Educational sitting/study circle at As-Suffa (Topic 4.3) |
| Ashab al-Suffa | اصحابِ صفہ | Companions of the platform (Topic 4.3) |
| Sanctuary / Rule of law | حرمت / قانون کی حکمرانی | Charter of Medina principles (Topic 4.2) |
| Accountability | جوابدہی اور احتساب | Principle from Last Sermon on trusts (Topic 4.2) |

## Validation

- Step 5 temporary flip test: both `index.mdx` files were temporarily set to `reviewed`, followed by `npm run build:content-status && npm run check:content`. All parity checks, figure checks, `no-em-dash`, `no-answer-keys`, and `key_terms` bank checks passed cleanly (only the expected open G4/G5 pipeline-gate tracker assertions for Unit 4 were reported). Both files were reverted cleanly back to `draft`.
- SVG text geometry: `scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efmp-409/unit-04/*.ur.svg` passed with exit code 0 across all 6 files.
- Dark variants: `npm run figures:variants` generated all 6 `.ur.dark.svg` files and `npm run figures:variants:check` passed clean across the repo.
- Final draft run: all 14 content gates passed cleanly with zero em dashes and zero findings beyond origin/main.

## Next owner

Independent G5 reviewer (fresh session, `g5-reviewer` with `review-unit`): passage-level comparison against the English baseline, independent solving of the Urdu assessment, verification of the 7 authored concept labels and proposed terms, and rendered inspection at 360 px and A4. A qualified scholar should also review the Islamic material (Surah Al-Alaq, Hadith reportings, Charter of Medina, Last Sermon, As-Suffa) per content-spec drafting note 8.
