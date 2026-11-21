# GUHQ-301 Unit 1 Urdu translation handoff

- Translator: agent:claude (crew job `guhq-301-u01-translate`), 2026-11-22, branch `crew/guhq-301-u01-translate`.
- English baseline: `856b9437e` (last change to the English unit and its figures), checked out at `929fef960`. No English unit file, figure manifest, sources, coverage or concepts file was changed, so the G2 evidence is untouched.
- Complete same-name mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-01/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`. The English unit has no teacher-notes file. The course-level `course-overview.mdx` and `_category_.json` are outside this unit job and were not translated.
- Four `.ur.svg` figures (`fig-U1-1` to `fig-U1-4`) with their `.ur.dark.svg` twins from `npm run figures:variants`, wired into the two Urdu topics. Each SVG `<desc>` equals the Urdu page alt text.
- `translation_status` stays `draft` in both `index.mdx` files: only an accepted independent G5 earns `reviewed`. The G4 tracker row keeps status ▢ with a factual note; no row was appended and G5 is not claimed.

## Conventions used

- Topic titles read `موضوع 1.1 - ...` and `موضوع 1.2 - ...`, matching the English numbering.
- Arabic words that the English gives in Latin transliteration (*al-ʿālamīn*, *kutiba*, *fāʿil* and so on) are written in Arabic script, vowelled where the vowels carry the teaching point (for example عَلِیم against اَلِیم). Vowelled Qur'anic quotations in Arabic are copied byte-for-byte from the English file. Root letters are written spaced in Urdu letters (ع ل م، ک ت ب).
- Qur'an quotations: the English quotes the Saheeh International English translation. The Urdu gives an Urdu rendering of that English meaning and says so in the index, in Topic 1.1 and Topic 1.2 (under the expressions table) and in the assessment instructions, and asks the reader to compare a trusted Urdu translation. It is not a published Urdu translation of the Qur'an. **The G5 reviewer must check every rendered verse meaning** (1:2, 1:5, 2:2, 2:10, 2:32, 2:153, 2:156, 2:183, 2:282, 4:26, 2:20, 2:25, 18:24, 2:286, 12:2, 38:29, 47:24, 54:17, 69:41), along with the religious-content check in content-spec drafting note 7.
- Option letters الف) ب) ج) د) in the same order; the key uses the Urdu letter. Bloom tags: یاد رکھنا، سمجھنا، اطلاق، تجزیہ، جائزہ، تخلیق. Western digits throughout; marks, word limits and rubric bands unchanged.
- Self-answered from the Urdu alone, the MCQ key is ب، ج، ج، ب، ج، ب، ب، ب، ج، ب, matching the English B, C, C, B, C, B, B, B, C, B.

## Terminology

The frozen bank holds four terms that occur in the unit, all bound in the Urdu `key_terms`: Assessment (تشخیص), Summative Assessment (مجموعی جائزہ), Rubric (معیارِ جانچ), Self-Assessment (خود جائزہ). The bank and `glossary.json` were not changed. The unit has no `<Glossary>` calls.

The content-spec key terms are not in the bank, so they are not in `key_terms`. Proposed terms for the curriculum owner and the G5 reviewer:

| English | Proposed Urdu | Note |
|---|---|---|
| Quranic Arabic | قرآنی عربی | concept-graph label |
| Classical Arabic | کلاسیکی عربی | concept-graph label |
| Root (jadhr) | مادّہ (جذر) | concept-graph label; prose uses مادّہ with جذر in brackets on first use |
| Word pattern (wazn) | وزن | concept-graph label; plural اوزان |
| Understanding the Qur'an | فہمِ قرآن | concept-graph label (catalog `title_ur`) |
| Letter sounds | حروف کی آوازیں | concept-graph label |
| Frequent Qur'anic expressions | کثرت سے آنے والے قرآنی جملے | concept-graph label |
| Reflection (tadabbur) | غور و فکر (تدبّر) | the bank's تامل terms are EFMP-304 reflective-practice terms, so not reused here |
| Modern Standard Arabic | جدید معیاری عربی | |
| Pre-Islamic poetry | قبل از اسلام شاعری | |
| Concept map / Flowchart | تصوری نقشہ / بہاؤ چارٹ | as in other Urdu units |

## Figures

- Reading order is mirrored for Urdu: the comparison table's label column sits on the right; the concept map and root diagram swap left and right boxes so reading starts top right; the flowchart runs right to left with reversed arrows and a mirrored dashed return path. ViewBoxes and shape geometry are unchanged. The wordmark moves to the bottom left so it does not collide with the right-anchored footer notes.
- No `direction` attribute (per `bilingual-figures.md`). Each Urdu label is wrapped in U+200F marks so that trailing commas, colons and verse references keep their place under the SVG's default left-to-right base direction. Without them, Chromium put trailing punctuation at the wrong edge.
- `scripts/measure-figure-text.mjs` exits 0 on all eight Urdu SVGs. All four light SVGs were also rasterised in Chromium and checked by eye for shaping, order and overflow. Not checked: the site's own Nastaliq webfont (the host has one Nastaliq face) or the figures inside a built page.
- The SVGs were written directly and are 5 to 7 KB, so `optimize:figure` was not run. The figure manifest was not edited (that would re-open G2); its `Src` column still lists only the English assets.

## Validation and limits

- `npm run check:content` with both `index.mdx` files temporarily at `reviewed`: 13 of 14 gates pass, including `validate:content` parity, `check:figures` Urdu parity and the `key_terms` bank check. The only findings are the expected G4 and G5 rows not done (`check-content-parity.txt`). Both files were then restored byte-for-byte to `draft`.
- Structural self-check: same file set, identical invariant front matter, identical heading-level vectors, matching component counts (4 Figure, 3 PrintHandout, 1 TranslationStatusBadge), matching table rows and 10/10/5 numbered items.
- Not done here: `npm run build` and `render-inspect.mjs --locale ur` against a local build (crew rules forbid both), so rendered page, 360 px and A4 inspection of the Urdu is still open for a permitted run or G5.

## Open points for G5 and the owner

1. Verse meanings and the religious-content check (see above).
2. The seven authored concept labels and the proposed terms above.
3. Topic 1.2's table of letters that Urdu speakers pronounce alike carries over the English author's flag: no open-access source backs it (see `sources/unit-01.md`).
4. Time taken: about one session (roughly 1.5 hours including figure work), as the rate probe ADR-0022 asks for.
