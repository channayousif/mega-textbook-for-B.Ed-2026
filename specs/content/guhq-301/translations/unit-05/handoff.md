# GUHQ-301 Unit 5 Urdu translation handoff

- Translator: agent:claude (crew job `guhq-301-u05-translate`), 2026-11-22, branch `crew/guhq-301-u05-translate`.
- English baseline: `2d90513be` (last change to the English unit, its figures and its figure manifest), checked out at `90f645830`. No English unit file, figure manifest, sources, coverage or concepts file was changed, so the G2 evidence is untouched.
- Complete same-name mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-05/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`. The English unit has no teacher-notes file.
- Four `.ur.svg` figures (`fig-U5-1` to `fig-U5-4`) with their `.ur.dark.svg` twins from `npm run figures:variants`, wired into the two Urdu topics. Each SVG `<desc>` equals the Urdu page alt text.
- `translation_status` stays `draft` in both `index.mdx` files: only an accepted independent G5 earns `reviewed`. The G4 tracker row keeps status ▢ with a factual note; no row was appended and G5 is not claimed.

## Conventions used

- Topic titles read `موضوع 5.1 - ...` and `موضوع 5.2 - ...`, matching the English numbering; each H1 repeats its title.
- Arabic terms the English gives in Latin transliteration are written in Urdu or Arabic script: tafsir تفسیر، asbab al-nuzul اسبابِ نزول (prose also uses شانِ نزول for "the occasion of revelation" of one verse), siyaq سیاق، qawaʿid al-tafsir قواعدِ تفسیر، the rule اَلْعِبْرَةُ بِعُمُومِ اللَّفْظِ لَا بِخُصُوصِ السَّبَبِ، *al-atqa* اَلْأَتْقٰی، *wa-min sharri* وَمِنْ شَرِّ. "Context" in general is سیاق; where the English defines context as the arrangement of the text (siyaq) plus the circumstances of revelation, the Urdu uses سیاق و سباق for the wider word so that MCQ 5 option A does not read "siyaq is ... siyaq".
- Names: al-Nadar ibn al-Harith نضر بن حارث، al-Suyuti السیوطی، M. Quraish Shihab ایم۔ قریش شہاب (Latin kept in brackets on first use). Citations keep their Latin author-year form.
- Honorifics: the English says "the Prophet" and "Abu Bakr" without honorifics. The Urdu uses نبی کریم ﷺ and حضرت ابوبکرؓ, the register an Urdu Islamiat reader expects. This adds no claim, but G5 should confirm the choice.
- Qur'an quotations: the English quotes the Saheeh International English translation. The Urdu gives an Urdu rendering of that English meaning and says so in the index, in Topic 5.1 and in the assessment instructions, asking the reader to compare a trusted Urdu translation. It is not a published Urdu translation of the Qur'an. **The G5 reviewer must check every rendered verse meaning** (38:29, 47:24, 54:17, 22:4, 92:17-18, 2:114, 93:1-3 and 93:6-8, 109:2-6, 110:1-3, 112:1-4, 113:2-5), along with the religious-content check in content-spec drafting note 7. Al-Samad in 112 is rendered ابدی سہارا to follow "the Eternal Refuge".
- Option letters الف) ب) ج) د) in the same order; the key uses the Urdu letter. Bloom tags: یاد رکھنا، سمجھنا، اطلاق، تجزیہ، جائزہ، تخلیق. Western digits throughout; marks, word limits, timings and rubric bands unchanged.
- Self-answered from the Urdu alone, the MCQ key is ب، الف، الف، ب، الف، ب، ب، ب، الف، ب, matching the English B, A, A, B, A, B, B, B, A, B.

## Terminology

The frozen bank holds four terms that occur in the unit, all bound in the Urdu `key_terms`: Assessment (تشخیص), Summative Assessment (مجموعی جائزہ), Rubric (معیارِ جانچ), Self-Assessment (خود جائزہ). The bank and `glossary.json` were not changed. The unit has no `<Glossary>` calls. "Learning outcomes" is rendered تعلیمی نتائج in the heading, as in the course's Unit 1, not the bank's نتیجہ ہائے تعلم; it is not in `key_terms`.

Proposed terms for the curriculum owner and the G5 reviewer (none are banked):

| English | Proposed Urdu | Note |
|---|---|---|
| Tafsir | تفسیر | concept-graph label |
| Sources of tafsir | تفسیر کے مآخذ | concept-graph label |
| Principles of interpretation | تفسیر کے اصول | concept-graph label; the classical name قواعدِ تفسیر is given once |
| Context and language | سیاق اور زبان | concept-graph label |
| Interpreting selected verses | منتخب آیات کی تفسیر | concept-graph label |
| Main theme | مرکزی موضوع | concept-graph label; collides with "topic" (موضوع) in page titles, so G5 may prefer مرکزی خیال |
| Moral and practical lesson | اخلاقی اور عملی درس | concept-graph label |
| Occasion(s) of revelation | شانِ نزول / اسبابِ نزول | singular occasion of one verse / the discipline and plural |
| Generality of the wording | الفاظ کا عموم | with خصوصیت for "particularity" |
| Companions | صحابہ کرام | |
| Commentaries | تفاسیر | |

## Figures

- Labels were written over the English layout and then mirrored with `scripts/mirror-figure-rtl.mjs`, so the tables' label column sits on the right and every label is end-anchored at the right edge of its box; the wordmark moves to the bottom left. The two stacked flows (sources of tafsir, five steps) keep top-to-bottom order.
- Box and row heights were increased for Nastaliq (viewBoxes grew from 400/320/430/460 to 468/388/526/592 px tall); widths and column splits are unchanged.
- No `direction` attribute; each Urdu label is wrapped in U+200F marks, as in Unit 1.
- `scripts/measure-figure-text.mjs` exits 0 on all eight Urdu SVGs. All four light SVGs were rasterised in Chromium with the host's Noto Nastaliq Urdu and checked by eye for shaping, order and overflow. Not checked: the figures inside a built page.
- The SVGs are 3 to 5 KB, so `optimize:figure` was not run. The figure manifest was not edited (that would re-open G2).

## Validation and limits

- `npm run check:content` with both `index.mdx` files temporarily at `reviewed`: 13 of 14 gates pass, including `validate:content` parity, `check:figures` Urdu parity and the `key_terms` bank check. The only findings are the expected G4 and G5 rows not done (`check-content-parity.txt`). Both files were then restored byte-for-byte to `draft`, and `check:content` at `draft` passes 14 of 14.
- Structural self-check: same file set, identical invariant front matter, identical heading-level vectors, matching component counts (4 Figure, 3 PrintHandout, 1 TranslationStatusBadge), matching table rows and 10/10/5 numbered items.
- Not done here: `npm run build` and `render-inspect.mjs --locale ur` (crew rules forbid both against a local build), so the rendered page, 360 px and A4 inspection of the Urdu is still open for a permitted run or G5.

## Open points for G3, G5 and the owner

1. Verse meanings, honorifics and the religious-content check (see above).
2. The seven authored concept labels and the proposed terms above.
3. Carried over from English, for G3 rather than translation: the unit says 22:4 was revealed about al-Nadar ibn al-Harith, but in the surrounding passage the occasion is usually attached to 22:3, and the pronoun in 22:4 is usually read as referring to the devil named in 22:3. The Urdu mirrors the English exactly; if G3 changes the English, Topic 5.1, RRQ 3 and ERQ 1 and 4 must be re-mirrored.
4. The English author's flags still stand: the classroom routines and the ordering of the sources of tafsir have no bound source (`sources/unit-05.md`).
5. Time taken: about one session (roughly 1.5 hours including figure work), as the rate probe ADR-0022 asks for.
