# GUHQ-301 Unit 7 Urdu translation handoff

- Translator: agent:agy (crew job `guhq-301-u07-translate`), 2026-11-22, branch `crew/guhq-301-u07-translate`.
- English baseline: `eb236335b` (last change to the English unit, its figures and its figure manifest). No English unit file, figure manifest, sources, coverage or concepts file was changed, so the G2 evidence is untouched.
- Complete same-name mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-07/`: `index.mdx`, `topic-01.mdx`, `unit-assessment.mdx`. The English unit has no teacher-notes file.
- Three `.ur.svg` figures (`fig-U7-1` to `fig-U7-3`) with their `.ur.dark.svg` twins from `npm run figures:variants`, wired into `topic-01.mdx`. Each SVG `<desc>` equals the Urdu page alt text.
- `translation_status` stays `draft` in both `index.mdx` files: only an accepted independent G5 earns `reviewed`. The G4 tracker row keeps status ▢ with a factual note; no row was appended and G5 is not claimed.

## Conventions used

- Topic titles read `موضوع 7.1 - ...`, matching the English numbering; headings follow identical level vectors.
- Arabic and Quranic terms: tajwid تجوید, makharij al-huruf مخارج الحروف, sifat صفات, waqf وقف, 'alamat al-waqf علاماتِ وقف (مـ، ط، ج، ز، ص، لا), tadabbur تدبر, 'amal عمل, shura شوریٰ, tawhid توحید, as-Samad الصمد, khusr خُسر, tawasaw تواصوا, the hermeneutical rule اَلْعِبْرَةُ بِعُمُومِ اللَّفْظِ لَا بِخُصُوصِ السَّبَبِ.
- Grammatical terms: waw al-qasam واوِ قسم, majrur مجرور, inna حرفِ توکید و نصب, ism inna اسمِ اِنّ, mansub منصوب, lam al-muzahlaqa لامِ مزحلقہ, harf istithna حرفِ استثناء, mustathna مستثنیٰ, fi'l madi فعلِ ماضی, waw al-jama'ah واوِ جماعت, bab-e-tafa'ul بابِ تفاعل.
- Names: al-Hilali الہلالی, Master Rafiq ماسٹر رفیق, Farhan فرحان, Danish دانش, Ali علی, Maryam مریم. Citations keep Latin author-year forms (Al-Hilali, 2026; Abdelfattah et al., 2025; Abdul Kadir et al., 2022; Dukes et al., 2010).
- Honorifics: the English says "the Prophet (PBUH)" and "the Companions". The Urdu uses نبی کریم ﷺ and صحابہ کرام, matching the register an Urdu Islamiat reader expects.
- Qur'an quotations: the English quotes the Saheeh International English translation. The Urdu gives an Urdu rendering of that English meaning and notes that the reader should compare a trusted Urdu translation. **The G5 reviewer must check every rendered verse meaning** (103:1-3, 2:255 extract, 38:29, 83:1-3, 3:159, 17:23-24, 4:36, 30:21, 5:2, 42:38, 49:11-12, 108:1-3, 110:1-3, 107:1-7, 112:1-4, 113:1-5), along with the religious-content check in content-spec drafting note 7.
- Option letters: الف) ب) ج) د) in the same order; the key uses the Urdu letter. Bloom tags: یاد رکھنا، سمجھنا، اطلاق، تجزیہ، جائزہ، تخلیق. Western digits throughout; marks, word limits, timings and rubric bands unchanged.
- Self-answered from the Urdu alone, the MCQ key is الف، ب، الف، ج، الف، د، ب، الف، ج، ب, matching the English A, B, A, C, A, D, B, A, C, B.

## Terminology

The frozen bank holds four terms that occur in the unit, all bound in the Urdu `key_terms`: Assessment (تشخیص), Summative Assessment (مجموعی جائزہ), Rubric (معیارِ جانچ), Self-Assessment (خود جائزہ). The bank and `glossary.json` were not changed. The unit has no `<Glossary>` calls.

Proposed terms for the curriculum owner and the G5 reviewer (none are banked):

| English | Proposed Urdu | Note |
|---|---|---|
| Integrated practice | جامع مشق | concept-graph label |
| Grammar and syntax parsing | قواعد اور نحوی تجزیہ | concept-graph label |
| Translation and comprehension | ترجمہ اور فہم | concept-graph label |
| Guided recitation (tajwid) | رہنمائی کے ساتھ تلاوت (تجوید) | concept-graph label |
| Practical application (tadabbur) | عملی اطلاق (تدبر) | concept-graph label |
| Five-step study routine | پانچ مرحلہ وار مطالعاتی معمول | instructional method |
| Formal equivalence / literal gloss | لفظ بہ لفظ تحت اللفظی ترجمہ | translation mode |
| Dynamic / communicative equivalence | با محاورہ اور فہمی ترجمہ | translation mode |
| Pause symbols / marks | علاماتِ وقف | tajwid science |
| Generality of the wording | الفاظ کا عموم | hermeneutical canon |
| Particularity of the occasion | سبب کی خصوصیت | hermeneutical canon |
| Emphatic lam | لامِ مزحلقہ / لامِ تاکید | syntactic feature |
| Reciprocal verb form | بابِ تفاعل (باہمی عمل اور اشتراک) | morphological pattern |

## Figures

- In `fig-U7-1.ur.svg`, the five-step vertical routine was styled for RTL with text-anchor="end" at x="724", panel heights increased to 70 for Nastaliq line heights, and viewBox 780x520.
- In `fig-U7-2.ur.svg`, the table columns were mirrored for RTL so that Column 1 (قرآنی حصہ) is on the right, through Column 5 (عملی سبق) on the left. Row heights were increased to 80 for Nastaliq line heights (viewBox 780x390).
- In `fig-U7-3.ur.svg`, the concept map placed Classroom practice on the right, Family relations on the left, and School community at the bottom, with a central ellipse for Quranic teachings in daily life (viewBox 780x470).
- All six SVGs (3 source `.ur.svg` and 3 derived `.ur.dark.svg`) were checked with `scripts/measure-figure-text.mjs` and exit 0 with zero text clipping, zero text collisions and zero wordmark collisions.

## Validation and limits

- `npm run check:content` with both `index.mdx` files temporarily flipped to `reviewed`: passes parity, figure wiring, and terminology bank checks, with the only two reported findings being the expected incomplete G4 and G5 tracker rows for Unit 7 (`check-content-parity.txt`). Both files were then restored byte-for-byte to `draft`.
- `npm run check:content` at `draft` passes all 14 gates cleanly.
- Structural self-check: identical heading-level vectors across all 3 files, matching component counts (3 Figure, 2 PrintHandout, 1 TranslationStatusBadge), matching table rows, and 10/10/5 numbered items.

## Open points for G3, G5 and the owner

1. Verse meanings, honorifics and the religious-content check in content-spec drafting note 7.
2. The five authored concept labels in `concepts/unit-07.md` and the proposed terms table above.
3. Classroom scenarios and pedagogical applications flagged by the author as instructional models.
