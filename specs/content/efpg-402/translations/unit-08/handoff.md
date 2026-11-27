# EFPG-402 Unit 8 - G4 translation handoff

Date: 2026-11-27. Producer: crew agy worker (job efpg-402-u08-translate). Source: English Unit 8 as of commit d128e7371.

## Delivered

- Seven Urdu files: `index.mdx`, `topic-01.mdx` to `topic-05.mdx`, and `unit-assessment.mdx` (10/10/5 bank, same option order with Urdu option labels الف/ب/ج/د, and bounded answers section).
- Ten `.ur.svg` schematic figures mirrored right to left, verified with `measure-figure-text`, with derived dark twins (`.ur.dark.svg` via `npm run figures:variants`).
- Bank-bound `key_terms` in `index.mdx` fully verified against `specs/content/terminology.csv`.
- `translation_status` stays `draft`: independent G5 review has not happened yet. The English index still displays the "untranslated" badge pending G5.

## Checks

- `measure-figure-text` passes on all ten `.ur.svg` files (exit code 0).
- `build-figure-variants` generated all ten `.ur.dark.svg` twins; `figures:variants:check` OK.
- Zero em dashes (U+2014) in all authored Urdu files.
- Heading level vectors match byte-for-byte across all seven files.
- With both `index.mdx` files temporarily flipped to `reviewed`, conditional parity and terminology gates passed cleanly (reporting only the two expected findings for open G4/G5 rows). Reverted to `draft`.
- Rendered Urdu pages (360px and A4 print) were NOT inspected: this job is strictly prohibited from building the site or launching dev servers.

## Proposed terms (not in terminology.csv, for the owner)

تدریسی عملی تحقیق (classroom action research); پائیدار ترقی (sustainable development); پائیدار ترقی کے اہداف (Sustainable Development Goals / SDGs); پائیدار ترقی کے لیے تعلیم (Education for Sustainable Development / ESD); اسٹیم تعلیم (STEM education); اسٹیم (STEAM); عوامی سائنس (citizen science); ڈیجیٹل سمولیشن / شبیہ سازی (digital simulations); کثیر حسی سائنسی تعلیم (multi-sensory science education); سائنسی مزاج (scientific temper); شمولیتی ماڈل (infusion model); تدریسی مواد کا علم (Pedagogical Content Knowledge / PCK); حیاتیاتی تنوع (biodiversity); ماحولیاتی نظام (ecosystem).

## English points for the G3 reviewer (translated faithfully, not changed)

- Topic 8.1 and ERQ-01: The community water safety scenario links biological pathogens and filtration to local Sindh flood realities.
- Topic 8.2 and ERQ-02: Lee Shulman's PCK framework and the Knowledge-Skills-Dispositions model are presented consistently across the topic and rubric.
- Topic 8.3 and ERQ-03: The action-research cycle follows the classic Plan-Act-Observe-Reflect progression.
- Topic 8.4 and ERQ-04: The infusion model connects elementary science to six SDGs and uses UNESCO 2017's cognitive, socio-emotional, and behavioral domains.
- Topic 8.5 and ERQ-05: The historical timeline and low-cost STEM challenge design emphasize low-cost resourcefulness in underprivileged schools.
