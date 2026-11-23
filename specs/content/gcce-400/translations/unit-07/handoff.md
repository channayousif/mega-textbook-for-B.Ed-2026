# GCCE-400 Unit 7 Urdu translation handoff

- Translator: agent:antigravity (crew job `gcce-400-u07-translate`), 2026-11-24, branch `crew/gcce-400-u07-translate`.
- English baseline: `78cb581cd` (last change to the English unit, its figures and its figure manifest). No English unit file, figure manifest, sources, coverage or concepts file was changed, so the G2 evidence is untouched.
- Complete seven-file mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-07/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `topic-04.mdx`, `unit-assessment.mdx`, `unit-teacher-notes.mdx`.
- Eight `.ur.svg` figures (`fig-U7-1` to `fig-U7-8`) with their `.ur.dark.svg` twins from `npm run figures:variants`, wired into the topic files. Each SVG `<desc>` equals the Urdu page alt text.
- `translation_status` stays `draft` in both `index.mdx` files: only an accepted independent G5 earns `reviewed`. The G4 tracker row keeps status ▢ with a factual note; no row was appended and G5 is not claimed.

## Conventions used

- Topic titles read `موضوع 7.1 - ...`, `موضوع 7.2 - ...`, `موضوع 7.3 - ...`, and `موضوع 7.4 - ...`, matching the English numbering; headings follow identical level vectors.
- Diversity, participation and equity terms: diversity تنوع, minority group اقلیتی گروہ, national unity قومی یکجہتی, social development سماجی ترقی, participation شرکت, barrier رکاوٹ, social inequality سماجی عدم مساوات, social injustice سماجی ناانصافی, private trouble ذاتی مشکل, public injustice عوامی ناانصافی, civic response شہری ردعمل, social movement سماجی تحریک, inclusive citizenship شامل کن شہریت, equality برابری, equity انصاف / شمولیت, inclusive education شمولیتی تعلیم, mother tongue مادری زبان.
- Constitution articles use `دفعہ` (`دفعہ 16`, `دفعہ 19`, `دفعہ 25`, `دفعہ 25A`, `دفعہ 26`, `دفعہ 27`, `دفعہ 28`, `دفعہ 33`, `دفعہ 34`, `دفعہ 36`, `دفعہ 37`). `آئینِ پاکستان` for the Constitution. Western digits throughout.
- Names: Zainab زینب, Ali علی, Saima صائمہ, Bilal بلال, Rizwan رضوان, Sukkur سکھر, Larkana لاڑکانہ, Hyderabad حیدرآباد, Quetta کوئٹہ, Karachi کراچی, Balochistan بلوچستان. Citations keep Latin author-year forms (Conerly, Holmes and Tamang, 2021; Kymlicka & Norman, 2000; Youniss & Levine, 2009; Government of Pakistan, 2012; Pakistan Bureau of Statistics, 2023; UNESCO, 2015).
- `<Glossary>` attributes stay English (`Diversity`, `Race`, `Minority group`, `Social development`, `Social inequality`, `Social movement`, `Inclusive citizenship`, `Equality`, `Equity`); wrapped surface text is translated.
- Option letters: الف) ب) ج) د) in the same order; the key uses the Urdu letter. Bloom tags: یاد رکھنا، سمجھنا، اطلاق، تجزیہ، جائزہ لینا، تخلیق. Marks, word limits, timings and rubric bands unchanged.
- Self-answered from the Urdu alone, the MCQ key is ب، ب، ج، الف، ب، ب، الف، ب، د، ب, matching the English B, B, C, A, B, B, A, B, D, B.

## Terminology

The frozen bank holds seven terms that occur in the unit, all bound in the Urdu `key_terms`: Assessment (تشخیص), Summative Assessment (مجموعی جائزہ), Rubric (معیارِ جانچ), Self-Assessment (خود جائزہ), Practical Activity (عملی سرگرمی), Inclusive Education (شمولیتی تعلیم), Mother Tongue (مادری زبان). The bank and `glossary.json` were not changed.

Proposed terms for the curriculum owner and the G5 reviewer (none are banked in `terminology.csv`):

| English | Proposed Urdu | Note |
|---|---|---|
| Diversity | تنوع | concept label and glossary term |
| Minority group | اقلیتی گروہ | concept label and glossary term |
| Diversity and national unity | تنوع اور قومی اتحاد | concept label |
| Social development | سماجی ترقی | concept label and glossary term |
| Barriers to participation | شرکت کی رکاوٹیں | concept label |
| Constitutional safeguards for equal participation | برابر شرکت کے آئینی تحفظات | concept label |
| Social inequality | سماجی عدم مساوات | concept label and glossary term |
| Private trouble and public injustice | ذاتی مشکل اور عوامی ناانصافی | concept label |
| Civic response to injustice | ناانصافی کے خلاف شہری ردعمل | concept label |
| Equality | برابری | concept label and glossary term |
| Equity | انصاف (Equity) | concept label and glossary term |
| Inclusive citizenship | شامل کن شہریت | concept label and glossary term |
| Race | نسل | glossary term |
| Social movement | سماجی تحریک | glossary term |

## Figures

- `fig-U7-1.ur.svg` mirrors the concept map: central box labelled پاکستان میں تنوع with six linked surrounding boxes (زبان، قومیت و نسل، مذہب، علاقہ، معاشی طبقہ، سیاسی نقطہ نظر) each with its Pakistani example.
- `fig-U7-2.ur.svg` mirrors the mother tongues table with three RTL columns: زبان on the right, آبادی کا تناسب in the middle, and بنیادی طور پر کہاں بولی جاتی ہے on the left.
- `fig-U7-3.ur.svg` mirrors the groups table with three RTL columns: گروہ on the right, شرکت کی ایک صورت in the middle, and ایک رکاوٹ on the left.
- `fig-U7-4.ur.svg` mirrors the constitutional safeguards diagram with five rows (دفعہ 25, 26, 27, 36, 37) in RTL orientation.
- `fig-U7-5.ur.svg` mirrors the social inequality table with three RTL columns: صورت on the right, اشاریہ in the middle, and یہ کیا ظاہر کرتا ہے on the left.
- `fig-U7-6.ur.svg` mirrors the civic response flowchart in RTL order: 1. دیکھنا اور نام دینا on the right, flowing through 2. شواہد جمع کرنا, 3. مکالمہ (with branch to قانونی چارہ جوئی below), to 4. وکالت on the left.
- `fig-U7-7.ur.svg` mirrors the two-panel equality and equity diagram: برابری (Equality) panel and انصاف و شمولیت (Equity) panel, with RTL labels.
- `fig-U7-8.ur.svg` mirrors the practices table with two RTL columns: سطح on the right and عملی اقدامات on the left, covering گھر پر, اسکول میں, and برادری میں.
- All sixteen SVGs (8 source `.ur.svg` and 8 derived `.ur.dark.svg`) were checked with `scripts/heavy.sh node scripts/measure-figure-text.mjs` and exit 0 with zero text clipping and zero collisions.

## Validation and limits

- `npm run check:content` with both `index.mdx` files temporarily flipped to `reviewed`: passes `validate:content` parity, `check:figures` Urdu parity and the `key_terms` bank check. The only reported findings are the expected incomplete G4 and G5 tracker rows for Unit 7 (`check-content-parity.txt`). Both files were then restored byte-for-byte to `draft`.
- `npm run check:content` at `draft` passes all 14 gates cleanly.
- Structural self-check: identical heading-level vectors across all 7 files, matching component counts (8 Figure, 9 Glossary, 5 PrintHandout, 1 TranslationStatusBadge), matching table rows, and 10/10/5 numbered items.
- `scripts/render-inspect.mjs --locale ur` was NOT run. This job's brief forbids a dev server, `npm run build` and any local render-inspect run, and permits render-inspect only for a review job against `https://textbook.com.pk`. The rendered Urdu (Nastaliq shaping, 360px and A4 print, table scroll) is therefore unverified here and is a G5 task.

## Open points for G3, G5 and the owner

1. The eleven authored concept labels in `concepts/unit-07.md` and the proposed terms table above.
2. The census Table 11 and Table 4.21 literacy discrepancy, constitutional articles currency, and kymlicka-norman-2000 and youniss-levine-2009 attributions flagged for G3 in `sources/unit-07.md`.
3. Urdu render inspection at 360px and A4 print during independent G5 review.
