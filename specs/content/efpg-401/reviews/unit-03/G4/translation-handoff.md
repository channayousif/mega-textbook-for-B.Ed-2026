# EFPG-401 Unit 3 translation handoff

- Date: 2026-11-18. Translator: claude, branch `crew/efpg-401-u03-translate`.
- English baseline: `be58317ea` (last commit touching `docs/semester-3/efpg-401/unit-03/`).
- Files translated in the Urdu mirror (`i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-03/`):
  - `index.mdx`
  - `topic-01.mdx` to `topic-06.mdx`
  - `unit-assessment.mdx`
- Figure assets localized (`static/img/figures/efpg-401/unit-03/`): `fig-U3-1` to `fig-U3-12`, each as `.ur.svg` plus a derived `.ur.dark.svg` (`npm run figures:variants`).

## Structure and parity

- All eight files keep the English heading level vectors, component calls (`<TranslationStatusBadge>`, `<PrintHandout>`, `<Figure>`), figure IDs and the byte-identical front-matter keys (`course_code`, `unit_no`, `topic_no`, `topic_label`, `clo_refs`, `est_reading_minutes`, `translation_status`).
- Topic titles read `موضوع 3.N - ...` matching the English numbering.
- The assessment keeps the 10 MCQ + 10 RRQ + 5 ERQ bank in the English order, with option letters mapped A/B/C/D to الف/ب/ج/د and the answer key using the Urdu letters. The bounded section is `## جوابات اور نمبر دہی کی رہنمائی`, the file's final `##` section.
- The Urdu `index.mdx` carries a bank-bound `key_terms` block (Learning, Learning Outcome, Pedagogy, Mother Tongue, Behaviorism, Habit Formation, Scaffolding, Assessment, Formative Assessment, Self-Assessment, Rubric).
- The temporary `reviewed` flip of both `index.mdx` files was run with `npm run check:content`; the only findings were the two expected pipeline-gate rows (G4 and G5 not done). Both files were reverted to `draft`.
- `scripts/measure-figure-text.mjs` exits 0 on all 12 `.ur.svg` and 12 `.ur.dark.svg` files. The SVGs were also rendered in Chromium and inspected for Nastaliq shaping and bidi order.

## Figure localisation notes

- Tables, flowcharts and concept maps are mirrored right to left (row labels on the right, step 1 on the right, arrows reversed). `fig-U3-7` (substitution table) is deliberately **not** mirrored: its body cells are English sentences read left to right, so only the column headers and caption are translated.
- English example sentences, affixes and word forms inside figures stay in English, isolated with Unicode bidi embedding controls (U+202B/U+202A ... U+202C) so quotation marks and full stops stay on the correct side in the RTL label.

## Terminology choices for the owner

The unit uses the Urdu concept labels from `specs/content/efpg-401/concepts/unit-03.md`. These are not in `terminology.csv` and are proposed, not banked (the bank was not edited):

| English | Urdu used in this mirror | Note |
|---|---|---|
| Grammar-Translation Method | قواعد و ترجمہ کا طریقہ | Unit 4's accepted-draft Urdu mirror uses گرائمر-ترجمہ کا طریقہ for the same method; one form should be chosen corpus-wide |
| Direct Method | براہِ راست طریقہ | |
| Audio-Lingual Approach | سمعی و زبانی طریقہ | Aural-Oral Approach rendered سماعی و زبانی طریقہ |
| Structural Approach | ساختیاتی طریقہ | |
| Communicative Approach / CLT | ترسیلی طریقہ / ترسیلی طریقۂ تدریسِ زبان | Unit 4's Urdu mirror uses ابلاغی طریقہ; same corpus-consistency question |
| Communicative competence | ترسیلی اہلیت | |
| Information gap | معلوماتی خلا | |
| Morphology | علمِ اشکال | concept label, used for the topic itself; where the English pairs morphology with syntax or speaks of morphological transfer, the traditional grammar term صرف / صرفی is used (نحو اور صرف, صرفی منتقلی) |
| Morpheme / root / prefix / suffix | مارفیم / مادّہ / سابقہ / لاحقہ | |
| Substitution / transformation / chain drill | متبادل / تبدیلی / زنجیری مشق | |
| Fossilization | پختگی (fossilization) | |
| Affective filter | جذباتی چھلنی (affective filter) | |

## Points for the G5 reviewer

- English `topic-04.mdx` writes the substitution count as LaTeX (`$4 \times 4 \times 4 \times 4$`); the site has no math plugin, so the English renders the raw markup. The Urdu writes `(4 × 4 × 4 × 4)`. The English is unchanged (out of scope for G4).
- English `unit-assessment.mdx` RRQ 3 has one marking-scheme bullet at a shallower indent; the Urdu mirrors it as-is.
- Self-assessment items use `سکتا/سکتی ہوں` for gender-neutral first person, as in the sibling units.

## Status

- `translation_status` remains `draft` in both locales: only an accepted independent G5 review earns `reviewed`.
- No G5 certification is claimed. Rendered-page inspection (`render-inspect.mjs --locale ur`) was not run because it needs a built site; G5 should inspect the deployed Urdu pages.
