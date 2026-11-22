# GUHQ-301 Unit 2 Urdu translation handoff

- Translator: agent:antigravity (crew job `guhq-301-u02-translate`), 2026-11-22, branch `crew/guhq-301-u02-translate`.
- English baseline: `89cd2b0e3` (checked out at `ade6eb2e1`). No English unit file, figure manifest, sources, coverage or concepts file was changed, so the G2 evidence is untouched.
- Complete same-name mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-02/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `topic-04.mdx`, `unit-assessment.mdx`. The English unit has no teacher-notes file.
- Eight `.ur.svg` figures (`fig-U2-1` to `fig-U2-8`) with their `.ur.dark.svg` twins from `npm run figures:variants`, wired into the four Urdu topics. Each SVG `<desc>` equals the Urdu page alt text.
- `translation_status` stays `draft` in both `index.mdx` files: only an accepted independent G5 earns `reviewed`. The G4 tracker row keeps status ▢ with a factual note; no row was appended and G5 is not claimed.

## Conventions used

- Topic titles read `موضوع 2.1 - ...`, `موضوع 2.2 - ...`, `موضوع 2.3 - ...` and `موضوع 2.4 - ...`, matching the English numbering.
- Arabic words that the English gives in Latin transliteration (*ism*, *fi'l*, *harf*, *kāna*, *qāla*, *āmana*, *ʿalima*, *jāʾa*, *māḍī*, *muḍāriʿ*, *amr*, *faʿala*, *faʿʿala*, *afʿala* and so on) are written in Arabic script, vowelled where the vowels carry the teaching point (for example كَتَبَ against كُتُب). Vowelled Qur'anic quotations in Arabic are copied byte-for-byte from the English file. Root letters are written spaced in Urdu letters (ع ل م، ك ت ب، ق ر أ، و ل د).
- Qur'an quotations: the English quotes the Saheeh International English translation. The Urdu gives an Urdu rendering of that English meaning and asks the reader to compare a trusted Urdu translation. It is not a published Urdu translation of the Qur'an. **The G5 reviewer must check every rendered verse meaning** (1:1, 1:2, 1:4, 1:5, 2:2, 2:4, 2:11, 2:20, 2:22, 2:25, 2:29, 2:30, 2:32, 2:65, 2:87, 2:156, 2:160, 2:187, 2:255, 2:282, 2:285, 2:286, 3:52, 3:67, 3:195, 7:143, 23:1, 55:46, 67, 79:13, 79:42, 93:3, 93:5, 94:5-6, 96:1-5, 109:1-6, 112:1-4), along with the religious-content check in content-spec drafting note 7.
- Option letters الف) ب) ج) د) in the same order; the key uses the Urdu letter. Bloom tags: یاد رکھنا، سمجھنا، اطلاق، تجزیہ، جائزہ. Western digits throughout; marks, word limits and rubric bands unchanged.
- Self-answered from the Urdu alone, the MCQ key is ب، ج، ج، ب، ج، ج، ب، ب، ج، ج, matching the English B, C, C, B, C, C, B, B, C, C.

## Terminology

The frozen bank holds four terms that occur in the unit, all bound in the Urdu `key_terms`: Assessment (تشخیص), Summative Assessment (مجموعی جائزہ), Rubric (معیارِ جانچ), Self-Assessment (خود جائزہ). The bank and `glossary.json` were not changed. The unit has no `<Glossary>` calls.

The content-spec and concept-graph terms are not in the bank, so they are not in `key_terms`. Proposed terms for the curriculum owner and the G5 reviewer:

| English | Proposed Urdu | Note |
|---|---|---|
| High-frequency vocabulary | کثرت سے آنے والے الفاظ | concept-graph label |
| Parts of speech (ism, fi'l, harf) | اقسامِ کلمہ (اسم، فعل، حرف) | concept-graph label |
| Vocabulary memorisation | الفاظ یاد رکھنے کی تکنیک | concept-graph label |
| Noun gender | اسم کی جنس | concept-graph label |
| Noun number (singular, dual, plural) | اسم کا عدد (واحد، تثنیہ، جمع) | concept-graph label |
| Pronouns (detached and attached) | ضمائر (منفصل اور متصل) | concept-graph label |
| Verb tenses (madi, mudari', amr) | فعل کے زمانے (ماضی، مضارع، امر) | concept-graph label |
| Subject-verb agreement | فعل اور فاعل کی مطابقت | concept-graph label |
| Verb forms (I, II) | فعل کے ابواب (باب اول، دوم) | concept-graph label |
| Particles and prepositions | حروف اور حروفِ جر | concept-graph label |
| Negation and emphasis | نفی اور تاکید | concept-graph label |
| Grammar-based translation | قواعد پر مبنی ترجمہ | concept-graph label |
| Sound plural | جمع سالم | standard grammar term |
| Broken plural | جمع مکسر | standard grammar term |
| Detached pronoun | ضمیر منفصل | standard grammar term |
| Attached pronoun | ضمیر متصل | standard grammar term |
| Phrase spotting | مانوس جملوں میں پہچاننا | pedagogical technique |
| Daily verse method | یومیہ آیت کا طریقہ | pedagogical technique |

## Figures

- Reading order is mirrored for Urdu: tables reverse columns so the primary identifier sits on the right; the flowchart runs right to left with reversed arrows and right-anchored boxes. ViewBoxes and shape geometry are unchanged.
- No `direction` attribute (per `bilingual-figures.md`). Each Urdu label is wrapped in U+200F marks so that trailing colons, parentheses and references keep their place under the SVG's default left-to-right base direction.
- `scripts/measure-figure-text.mjs` exits 0 on all eight Urdu SVGs.
- The SVGs were written cleanly; `npm run figures:variants` generated all eight `.ur.dark.svg` counterparts and `npm run figures:variants:check` confirmed 100% parity across 1455 figures.
- The figure manifest was not edited (preserving G2 evidence); its `Src` column still lists only the English assets.

## Validation and limits

- `npm run check:content` with both `index.mdx` files temporarily at `reviewed`: 13 of 14 gates pass, including `validate:content` parity, `check:figures` Urdu parity and the `key_terms` bank check. The only findings are the expected G4 and G5 rows not done (`check-content-parity.txt`). Both files were then restored byte-for-byte to `draft`.
- Structural self-check: same file set, identical invariant front matter, identical heading-level vectors, matching component counts (8 Figure, 5 PrintHandout, 1 TranslationStatusBadge), matching table rows and 10/10/5 numbered items. Zero em dashes in all Urdu files.
- Not done here: `npm run build` and `render-inspect.mjs --locale ur` against a local build (crew rules forbid both), so rendered page, 360 px and A4 inspection of the Urdu is still open for a permitted run or G5.

## Open points for G5 and the owner

1. Verse meanings and the religious-content check (see above).
2. The twelve authored concept labels and the proposed terms above.
3. Conjugation, pronoun, negation and preposition tables are general-knowledge grammar flagged in `sources/unit-02.md`.
4. Time taken: about one session (roughly 1.25 hours including figure localisation and gate validation).
