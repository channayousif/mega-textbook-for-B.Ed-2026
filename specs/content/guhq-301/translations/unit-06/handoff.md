# GUHQ-301 Unit 6 Urdu translation handoff

- Translator: agent:agy (crew job `guhq-301-u06-translate`), 2026-11-22, branch `crew/guhq-301-u06-translate`.
- English baseline: `c8b2313e2` (last change to the English unit, its figures and its figure manifest). No English unit file, figure manifest, sources, coverage or concepts file was changed, so the G2 evidence is untouched.
- Complete same-name mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-06/`: `index.mdx`, `topic-01.mdx`, `unit-assessment.mdx`. The English unit has no teacher-notes file.
- Three `.ur.svg` figures (`fig-U6-1` to `fig-U6-3`) with their `.ur.dark.svg` twins from `npm run figures:variants`, wired into `topic-01.mdx`. Each SVG `<desc>` equals the Urdu page alt text.
- `translation_status` stays `draft` in both `index.mdx` files: only an accepted independent G5 earns `reviewed`. The G4 tracker row keeps status ▢ with a factual note; no row was appended and G5 is not claimed.

## Conventions used

- Topic titles read `موضوع 6.1 - ...`, matching the English numbering; each H1 repeats its title.
- Arabic terms the English gives in Latin transliteration are written in Urdu or Arabic script: asbab al-nuzul اسبابِ نزول (prose also uses سببِ نزول for "the occasion of revelation" of a single verse), Makki and Madani مکی اور مدنی, Jahiliyyah دورِ جاہلیت, Hijrah ہجرت, fatrat al-wahy فترۃ الوحی, ibtida'an ابتداءً, tanjim تنجیم, tadrij تدریج, asabiyyah قبائلی عصبیت, I'jaz al-Quran اعجازِ قرآن, the hermeneutical rule اَلْعِبْرَةُ بِعُمُومِ اللَّفْظِ لَا بِخُصُوصِ السَّبَبِ.
- Names: al-Wahidi الواحدی, al-Suyuti السیوطی, al-As ibn Wa'il عاص بن وائل. Citations keep their Latin author-year form (Abdul Kadir et al., 2022).
- Honorifics: the English says "the Prophet (PBUH)" and "the Companions". The Urdu uses نبی کریم ﷺ and صحابہ کرام, matching the register an Urdu Islamiat reader expects.
- Qur'an quotations: the English quotes the Saheeh International English translation. The Urdu gives an Urdu rendering of that English meaning and says so in the index, in Topic 6.1 and in the assessment instructions, directing the reader to compare a trusted Urdu translation. It is not a published Urdu translation of the Qur'an. **The G5 reviewer must check every rendered verse meaning** (93:1-3, 93:9-10, 108:1-3, 107:1-7, 96:1-5, 5:3, 49:13, 22:4), along with the religious-content check in content-spec drafting note 7.
- Option letters: الف) ب) ج) د) in the same order; the key uses the Urdu letter. Bloom tags: یاد رکھنا، سمجھنا، اطلاق، تجزیہ، جائزہ، تخلیق. Western digits throughout; marks, word limits, timings and rubric bands unchanged.
- Self-answered from the Urdu alone, the MCQ key is ب، ب، ب، ب، ب، ب، ب، الف، ب، ب, matching the English B, B, B, B, B, B, B, A, B, B.

## Terminology

The frozen bank holds four terms that occur in the unit, all bound in the Urdu `key_terms`: Assessment (تشخیص), Summative Assessment (مجموعی جائزہ), Rubric (معیارِ جانچ), Self-Assessment (خود جائزہ). The bank and `glossary.json` were not changed. The unit has no `<Glossary>` calls.

Proposed terms for the curriculum owner and the G5 reviewer (none are banked):

| English | Proposed Urdu | Note |
|---|---|---|
| Revelation (Wahy) and its setting | وحی اور اس کا تاریخی پس منظر | concept-graph label |
| Asbab al-nuzul (Occasions of revelation) | اسباب النزول / اسبابِ نزول | concept-graph label |
| Makki surahs | مکی سورتیں | concept-graph label |
| Madani surahs | مدنی سورتیں | concept-graph label |
| Cultural and social background (Jahiliyyah) | ثقافتی اور سماجی پس منظر | concept-graph label |
| Context in interpretation | تفسیر میں سیاق اور تاریخی پس منظر کا اثر | concept-graph label |
| Occasion(s) of revelation | سببِ نزول / اسبابِ نزول | singular / plural |
| Generality of the wording | الفاظ کا عموم | with خصوصیت for particularity of occasion |
| Initial revelation (without prior incident) | ابتدائی نزول / نزولِ ابتداءً | classical ibtida'an |
| Gradual revelation | تدریجی نزول / تنجیم / تدریج | classical tanjim and tadrij |
| Tribal chauvinism | قبائلی عصبیت | classical asabiyyah |
| Inimitability of the Quran | اعجازِ قرآن | classical I'jaz |

## Figures

- In `fig-U6-1.ur.svg`, timeline order was mirrored for RTL so that time flows from right to left (Makki period on the right, Madani period on the left, Hijrah in the centre).
- In `fig-U6-2.ur.svg`, the table columns were mirrored for RTL so that the dimension label column sits on the right, Makki in the centre, and Madani on the left.
- In `fig-U6-3.ur.svg`, the stacked top-to-bottom sequence of derivation was preserved, with RTL-aligned text boxes and arrows.
- Box heights and viewBoxes were increased for Nastaliq line heights (viewBoxes: 780x460, 780x430, 780x550).
- `scripts/measure-figure-text.mjs` exits 0 on all six Urdu SVGs (3 source `.ur.svg` and 3 derived `.ur.dark.svg`), with zero text clipping, zero text collisions and zero wordmark collisions.

## Validation and limits

- `npm run check:content` with both `index.mdx` files temporarily flipped to `reviewed`: passes parity, figure wiring, and terminology bank checks, with the only two reported findings being the expected incomplete G4 and G5 tracker rows for Unit 6 (`check-content-parity.txt`). Both files were then restored byte-for-byte to `draft`.
- `npm run check:content` at `draft` passes all 14 gates cleanly.
- Structural self-check: identical heading-level vectors across all 3 files, matching component counts (3 Figure, 2 PrintHandout, 1 TranslationStatusBadge), matching table rows, and 10/10/5 numbered items.

## Open points for G3, G5 and the owner

1. Verse meanings, honorifics and the religious-content check in content-spec drafting note 7.
2. The six authored concept labels in `concepts/unit-06.md` and the proposed terms table above.
3. Classroom scenarios and pedagogical applications flagged by the author as instructional models.
