# GUHQ-301 Unit 3 Urdu translation handoff

- Translator: agent:claude (crew job `guhq-301-u03-translate`), 2026-11-22, branch `crew/guhq-301-u03-translate`.
- English baseline: `a653d2b03` (last change to the English unit, its figures and its figure manifest; also the G2 `reviewed_commit`), checked out at `178a61188`. No English unit file, figure manifest, sources, coverage or concepts file was changed, so the G2 evidence is untouched.
- Complete same-name mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-03/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`. The English unit has no teacher-notes file.
- Four `.ur.svg` figures (`fig-U3-1` to `fig-U3-4`) with their `.ur.dark.svg` twins from `npm run figures:variants`, wired into the two Urdu topics. Each SVG `<desc>` equals the Urdu page alt text.
- `translation_status` stays `draft` in both `index.mdx` files: only an accepted independent G5 earns `reviewed`. The G4 tracker row keeps status ▢ with a factual note; no row was appended and G5 is not claimed.

## Conventions used

- Topic titles read `موضوع 3.1 - ...` and `موضوع 3.2 - ...`, matching the English numbering.
- Arabic grammar terms are given in the forms Urdu grammar books use: اسمی جملہ (جملہ اسمیہ)، فعلی جملہ (جملہ فعلیہ)، شرطیہ جملہ (جملہ شرطیہ)، مبتدأ، خبر، فعل، فاعل، مفعول بہ، نائب فاعل، شرط، جوابِ شرط، حرفِ شرط، معروف / مجہول، فعلِ امر، فعل مبنی للمجہول، تاکید، حصر. The concept-graph Urdu labels are used as written in `concepts/unit-03.md`.
- Arabic words that the English gives only in Latin transliteration (*dhālika*, *udhkurū*, *zulzilat*, *qālū* and so on) are written in Arabic script, with the vowelling of the verse. Vowelled Qur'anic quotations in Arabic are copied byte-for-byte from the English file.
- Qur'an quotations: the English quotes the Saheeh International English translation. The Urdu gives an Urdu rendering of that English meaning and says so in the index and the assessment instructions, and asks the reader to compare a trusted Urdu translation. It is not a published Urdu translation of the Qur'an. **The G5 reviewer must check every rendered verse meaning** (1:5, 2:2, 2:20, 2:25, 2:91, 2:148, 2:152, 2:157, 2:183, 2:282, 2:284, 99:1, 99:2), along with the religious-content check in content-spec drafting note 7.
- Option letters الف) ب) ج) د) in the same order; the key uses the Urdu letter. Bloom tags: یاد رکھنا، سمجھنا، اطلاق، تجزیہ، جائزہ، تخلیق. Western digits throughout; marks, word limits and rubric bands unchanged.
- Self-answered from the Urdu alone, the MCQ key is ب، ب، ب، ج، ب، ج، ب، الف، ج، ب, matching the English B, B, B, C, B, C, B, A, C, B.

## Terminology

The frozen bank holds four terms that occur in the unit as concepts, all bound in the Urdu `key_terms`: Assessment (تشخیص), Summative Assessment (مجموعی جائزہ), Rubric (معیارِ جانچ), Self-Assessment (خود جائزہ). The bank and `glossary.json` were not changed. The unit has no `<Glossary>` calls.

None of the unit's grammar terms are in the bank, so they are not in `key_terms`. Proposed terms for the curriculum owner and the G5 reviewer:

| English | Proposed Urdu | Note |
|---|---|---|
| Nominal sentence | اسمی جملہ (جملہ اسمیہ) | concept-graph label |
| Verbal sentence | فعلی جملہ (جملہ فعلیہ) | concept-graph label |
| Conditional sentence | شرطیہ جملہ (جملہ شرطیہ) | concept-graph label |
| Passive voice / passive verb | مجہول صیغہ / مجہول فعل | concept-graph label |
| Active verb | معروف فعل | |
| Condition word | حرفِ شرط | used for both particles and nouns, as in Urdu grammar books |
| Condition clause / result clause | شرط والا حصہ / جواب والا حصہ | |
| Word order / emphasis / restriction | لفظوں کی ترتیب / تاکید / حصر | |
| Syntax-based reading | نحوی ساخت پر مبنی قرأت | concept-graph label; Topic 3.2 heading uses نحوی ساخت پر مبنی فہم کی مشقیں |
| Flowchart | بہاؤ چارٹ | as in other Urdu units |

## Figures

- Reading order is mirrored for Urdu: in fig-U3-1 the nominal panel moves to the right; in the two tables (fig-U3-2, fig-U3-4) the label column sits on the right; in the flowchart (fig-U3-3) step 1 is on the right and the arrows point left. ViewBoxes and shape geometry are unchanged. The wordmark moves to the bottom left.
- No `direction` attribute (per `bilingual-figures.md`). Each Urdu label is wrapped in U+200F marks, as in Unit 1. Nastaliq lines are spaced 22 to 26 px apart.
- fig-U3-4's English style has no `.ar` class, so the Urdu file adds one rule (`.ar { font-size: 20px }`) for its Arabic verb forms; `check:svg-style` passes.
- `scripts/measure-figure-text.mjs` exits 0 on all eight Urdu SVGs. All four light SVGs were also rasterised in headless Chromium with Noto Nastaliq Urdu and checked by eye for shaping, order and overflow. Not checked: the figures inside a built page.
- The SVGs were generated directly and are 3.5 to 5.5 KB, so `optimize:figure` was not run. The figure manifest was not edited (that would re-open G2).

## English defects found (not fixed here; for G3 or a `revise-topic` job)

The translation follows the English and does not silently correct it, except where noted.

1. **2:284 Qur'anic spelling**: Topic 3.2 and assessment MCQ 9 option ب quote `مَا فَىٓ أَنفُسِكُمْ`; the Qur'anic text is `فِىٓ` (kasra), not `فَىٓ`. Copied byte-for-byte into the Urdu so the two stay in parity; both files need the same fix.
2. **2:91 grammar**: the worked example in Topic 3.2 (and the activity built on it) calls ءَامِنُوا۟ ... the result clause (jawāb) of إِذَا. ءَامِنُوا۟ is what is said (inside the condition); the jawāb of إِذَا in 2:91 is قَالُوا۟ نُؤْمِنُ .... Translated as written; G3 should check.
3. **Arabic grammar labels misspelt**: the English writes جبملة اسمية، جبملة فعلية، جبملة شرطية (extra ب). The Urdu writes the correct جملة. Also "waāw" for "wāw" (Urdu writes واؤ).
4. **2:148** English rendering ("And for every direction is one that He turns it") is not the Saheeh International wording ("For each [religious following] is a direction toward which it faces") that the unit says it quotes. The Urdu renders the English as given.
5. **Topic 3.1 opening**: the pupil addresses the male trainee Imran as "miss"; the Urdu uses سر. Flagged so G5 does not count it as drift.

## Validation and limits

- `npm run check:content` with both `index.mdx` files temporarily at `reviewed`: 13 of 14 gates pass, including `validate:content` parity, `check:figures` Urdu parity and the `key_terms` bank check. The only findings are the expected G4 and G5 rows not done (`check-content-parity.txt`). Both files were then restored byte-for-byte to `draft`, and the normal run passes 14 of 14.
- Structural self-check: same file set, identical invariant front matter, identical heading-level vectors, matching component counts (4 Figure, 3 PrintHandout, 1 TranslationStatusBadge), matching table rows, list items and 10/10/5 numbered items with 40 options.
- Not done here: `npm run build` and `render-inspect.mjs --locale ur` against a local build (crew rules forbid both), so rendered page, 360 px and A4 inspection of the Urdu is still open for a permitted run or G5.

## Open points for G5 and the owner

1. Verse meanings and the religious-content check (see above).
2. The eight authored concept labels and the proposed terms above.
3. The English defects listed above, especially the 2:284 spelling and the 2:91 jawāb.
4. Time taken: about one session (roughly 1 hour including figure work), as the rate probe ADR-0022 asks for.
