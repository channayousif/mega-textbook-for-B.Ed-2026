# GUHQ-301 Unit 4 Urdu translation handoff

- Translator: agent:claude (crew job `guhq-301-u04-translate`), 2026-11-22, branch `crew/guhq-301-u04-translate`.
- English baseline: `506797187` (last change to the English unit and its figures), checked out at `9aa75d572`. No English unit file, figure manifest, sources, coverage or concepts file was changed, so the G2 evidence is untouched.
- Complete same-name mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-04/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `unit-assessment.mdx`. The English unit has no teacher-notes file.
- Six `.ur.svg` figures (`fig-U4-1` to `fig-U4-6`) with their `.ur.dark.svg` twins from `npm run figures:variants`, wired into the three Urdu topics. Each SVG `<desc>` equals the Urdu page alt text.
- An earlier uncommitted attempt on this branch had left a full draft with many errors (for example جماعت نجم for Class 9, سنی for the pupil Sana, first-person verb forms in summaries, a mistranslated 113:4 and 102:1-8, Latin transliterations inside Urdu runs). This job rewrote all five pages and corrected the six SVGs rather than patching them.
- `translation_status` stays `draft` in both `index.mdx` files: only an accepted independent G5 earns `reviewed`. The G4 tracker row keeps status ▢ with a factual note; no row was appended and G5 is not claimed.

## Conventions used

- Topic titles read `موضوع 4.1 - ...`, `موضوع 4.2 - ...`, `موضوع 4.3 - ...`, matching the English numbering.
- Arabic words that the English gives in Latin transliteration (*wa-min sharri*, *tawāṣaw*, *bi-l-ḥaqqi* and so on) are written in vowelled Arabic script. Vowelled Qur'anic words already in Arabic in the English are copied as they are.
- Qur'an quotations: the English quotes the Saheeh International English translation. The Urdu gives an Urdu rendering of that English meaning and says so in the index, in the Topic 4.3 table header and in the assessment instructions. It is not a published Urdu translation of the Qur'an. Where the English text discusses an English idiom (Sana's question, "to truth" after "advised", the meaning-based column of 103:1-3, MCQ 9 options), the English wording is kept in quotation marks because the point is about English.
- Citations keep their Latin author names (Al-Hilali (2026), Rafei and colleagues (2024), Abdelfattah, Khalil and Abbas (2025)).
- Option letters الف) ب) ج) د) in the same order. MCQ 3 options A and B differ only by the English article; the Urdu marks the literal one with وہ ("بے شک وہ انسان خسارے میں ہے"), matching Sadiq's literal draft in Topic 4.1, and the key explains it as keeping the article awkwardly.
- Self-answered from the Urdu alone, the MCQ key is ب، ج، ب، ج، ج، ب، ب، ب، ب، ب, matching the English B, C, B, C, C, B, B, B, B, B.
- Bloom tags: یاد رکھنا، سمجھنا، اطلاق، تجزیہ، جائزہ، تخلیق. Western digits throughout; marks, word limits and rubric bands unchanged.

## Terminology

The frozen bank holds four terms bound in the Urdu `key_terms`: Assessment (تشخیص), Summative Assessment (مجموعی جائزہ), Rubric (معیارِ جانچ), Self-Assessment (خود جائزہ). The bank and `glossary.json` were not changed. The unit has no `<Glossary>` calls.

Proposed terms for the curriculum owner and the G5 reviewer (not in the bank):

| English | Urdu used | Note |
|---|---|---|
| Accurate reading | درست پڑھنا | The concept-graph label is درست مطالعہ; مطالعہ usually means study, so درست پڑھنا or درست قراءت may be clearer. The concepts file was not edited (it is a G2-bound input). |
| Word-by-word translation | لفظ بہ لفظ ترجمہ | concept-graph label |
| Meaning-based translation | معنی محور ترجمہ | concept-graph label |
| Key words and phrases | اہم الفاظ و عبارات | concept-graph label |
| Verse connections | آیات کا ربط | concept-graph label reads آیات کے ربط |
| Ruku' | رکوع | concept-graph label |
| Theme of a passage | مرکزی موضوع | concept-graph label |
| Passage | اقتباس | مقطع (used by the earlier draft) was avoided because in Urdu it usually means the closing couplet of a ghazal |
| Semantic unit | معنوی اکائی | |
| Topic sentence / transitional sentence | موضوعی جملہ / عبوری جملہ | |
| Spectrum (of translation) | طیف | with (spectrum) on first use in Topic 4.1 |
| Formal / dynamic equivalence | صوری مساوات / حرکی مساوات | English term kept in brackets |
| Makhraj, sukun, shadda, waqf | مخرج، سکون، تشدید، وقف | standard tajwid vocabulary |

## Figures

- The six Urdu SVGs already existed from the earlier attempt with right-to-left reading order (label columns on the right, wordmark bottom left) and U+200F marks round each label. This job corrected their text: step 4 ترتیب دیں, وقت کی قسم for "by (the) time", تلقین کی for the past-tense verbs, نحوی حیثیت for the grammar column, the 113:1-5 verse meanings (صبح کے رب, گرہوں میں پھونکنے والوں, the evils as "... کی برائی سے"), وَمِن شَرِّ in Arabic script instead of Latin, جس کی جڑ کٹی ہوئی ہے for "the one cut off", رحلۃ الشتاء and نبی کے دشمن کی تباہی in fig-U4-6.
- Line spacing in the three-line cells of fig-U4-3 and the two-line boxes of fig-U4-5 was widened (17-18 px to 26 px) after a Chromium render showed the Nastaliq lines colliding.
- `scripts/measure-figure-text.mjs` exits 0 on all six Urdu SVGs; it reports one cosmetic wordmark collision in fig-U4-1 (not failed; moving the wordmark lower overflows the viewBox). All six light SVGs were rasterised in headless Chromium with the host's Noto Nastaliq Urdu and checked by eye for shaping, order and overflow. Not checked: the site's webfont or the figures inside a built page.
- The figure manifest was not edited (that would re-open G2); its `Src` column lists only the English assets.

## English defects carried over (for the author or G3, not fixed in translation)

1. Topic 4.1 says 103:1 has five words and fig-U4-1, fig-U4-2 and MCQ 2 treat إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ as part of 103:1. In the mushaf 103:1 is only وَٱلْعَصْرِ; the other four words are 103:2. The Topic 4.1 table also splits "And the time, indeed" / "mankind is in loss" across 103:1 and 103:2. Translated as written.
2. The English transliterates إِنَّ as *innā* (which reads as إِنَّا, "indeed We"). The Urdu writes the Arabic word itself, so this does not cross over.
3. The ruku' numbers (547, 552, 556, 557) assume one ruku' per surah in a 558-ruku' count; a reviewer should confirm them against the mushaf in use.
4. RRQ 3's model answer says merging ق and ک turns *qulūb* toward *kalb*; strictly the merged form is *kulūb* (dogs, plural of *kalb*). Translated as written.

## Validation and limits

- `npm run check:content` with both `index.mdx` files temporarily at `reviewed`: 13 of 14 gates pass, including `validate:content` parity, `check:figures` Urdu parity and the `key_terms` bank check. The only findings are the expected G4 and G5 rows not done (`check-content-parity.txt`). Both files were then restored to `draft`, and the normal run passes all 14 gates.
- Structural self-check: same file set, identical invariant front matter, identical heading-level vectors, matching Figure IDs, table rows, checklist items and 10/10/5 numbered items with 40 options.
- Not done here: `npm run build` and `render-inspect.mjs --locale ur` against a local build (crew rules forbid both), so rendered page, 360 px and A4 inspection of the Urdu is still open for a permitted run or G5.

## Open points for G5 and the owner

1. Every rendered verse meaning: 103:1-3, 102:1-8, 108:1-3, 113:1-5 and the phrase meanings for 112, together with the religious-content check in content-spec drafting note 7.
2. The nine authored concept labels and the proposed terms above.
3. The English defects listed above, which G3 should settle before G5 compares the two languages.
4. Time taken: about one session (roughly 1.5 hours including figure work), as the rate probe ADR-0022 asks for.
