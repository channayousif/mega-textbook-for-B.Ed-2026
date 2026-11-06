# GISS-401 Unit 3 Urdu translation handoff

Translator: Claude (crew job giss-401-u03-translate). Date: 2026-11-06. This is a G4 draft handoff, not a G5 review.

## Baseline and delivered mirror

English source commit: `929158ac0735ddd768188fe9e2477fe3f0fdae3a`, directory `docs/semester-3/giss-401/unit-03/`. The English G3 is advisory and unsigned (escalated), so this baseline is gate-checked (`G2 en-draft`), not accepted. A later English edit invalidates the G5 dependency and needs a matching Urdu edit.

Mirror path, resolved with `resolveUnit()`: `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-03/`. Translated `index.mdx`, `topic-01.mdx`, `topic-02.mdx` and `unit-assessment.mdx`. The English unit has no teacher-notes page.

Added `fig-U3-1` to `fig-U3-4` as `.ur.svg` with derived `.ur.dark.svg`. Each `<desc>` equals its page `alt` (checked by script), and Urdu alt text uses the v4.6 colon. English pages, assets, manifest rows, the terminology bank and the tracker are unchanged.

`translation_status` remains `draft` on every page because G5 has not happened. Translate-unit Step 7 forbids appending a G4 tracker row, so the brief's "record the G4 tracker row as the skill says" is met by this handoff, as in Units 1 and 4. The Unit 3 `G4 ur-translation` row stays open.

## Decisions a G5 reviewer should check

- **Qur'an and hadith quotations are Urdu renderings of the unit's English quotations, made by this translator.** They are not taken from a published Urdu translation, and a scholar has not checked them. An Islamic Studies reviewer should check all 12 block-quoted passages (11 verses or verse ranges and one hadith), plus the short verse phrases in the seventh MCQ and fig-U3-3, or the owner should name an Urdu translation to quote. Bracketed glosses are preserved.
- **Honorifics were added** in line with the Unit 1 mirror: صلی اللہ علیہ وسلم for the Prophet, علیہ السلام for Prophets Ibrahim and Ismail, حضرت for Hajar, اللہ تعالیٰ for Allah Almighty. The English does not carry them.
- **Omitted on purpose:** the English topic pages carry the note "Urdu translation is not yet available. This English draft awaits independent review." It is false on an Urdu page, so it is not mirrored. The Unit 1 and 4 mirrors have no such note, and their English pages have none either.
- **Transliterated terms** appear in Urdu script. Where the English gloss would repeat the same Urdu word (for example `*wudu*` after "ablution"), one italic term stands for both.
- **Gender:** the Topic 3.1 trainee is feminine, following the English "she". The unnamed trainee in the worked examples uses the masculine default.
- **Rendering of "Justice (Adl)":** عدل in prose, انصاف (عدل) in the heading and in fig-U3-3, so that it parallels the other virtue labels.

## English issues preserved, not fixed

Translation does not repair the English. These need an English revision job or an owner ruling:

1. Topic 3.1 opening: the pupil addresses a trainee described as "she" with "Sir". Urdu keeps "سر" with feminine verbs.
2. Topic 3.1 opening: a Zuhr prayer bell rings "during morning assembly".
3. fig-U3-4 and its alt give the stages as knowledge, reflective practice, formed habit, stable character. The Topic 3.2 prose and the assessment give Sutomo's cycle as knowledge, feeling, practice, habit, and fig-U3-4 omits moral feeling. Both are mirrored as written.
4. fig-U3-3 cites "Surah An-Nisa 4:135 and 5:8", but 5:8 is in Surah Al-Ma'idah, as the Topic 3.2 prose says.
5. The topic pages still say "Urdu translation is not yet available" in English. That note is stale once this mirror merges.
6. The Maududi citation lists Maududi as his own translator ("A. A. Maududi, Trans."). The Urdu keeps the Latin citation unchanged.

## Terminology

The frozen bank was not edited. `key_terms` declares only bank-accepted pairs, and the temporary `reviewed` run reports no key-term finding. The unit has no `<Glossary>` calls. `Profession` is left out of `key_terms` because the English word appears as a whole word only in "profession of faith", which is not the banked sense. `Professional Ethics` is declared.

Proposed terms for the curriculum owner, absent from the bank:

| English | Urdu used |
|---|---|
| Ibadat / ibadah | عبادات / عبادت |
| Akhlaq / khuluq | اخلاق / خُلق |
| Salat, Saum, Zakat, Hajj | نماز، صوم (روزہ)، زکوٰۃ، حج |
| Sadaqah | صدقہ |
| Nisab | نصاب (same spelling as the banked Curriculum term; the sense comes from context) |
| Taqwa | تقویٰ |
| Sidq, Adl, Amanah, Sabr | صدق، عدل، امانت، صبر |
| Truthfulness, Justice, Honesty | سچائی، انصاف، دیانت |
| Character building | کردار سازی |
| Character education | کردار کی تعلیم |
| Moral knowledge, feeling, practice | اخلاقی علم، اخلاقی احساس، اخلاقی عمل |
| Formed habit, stable character | پختہ عادت، مستحکم کردار |
| Istiqamah, Hal, Niyyah | استقامت، حال، نیت |
| Role modelling (qudwah hasanah) | عملی نمونہ (قدوۂ حسنہ) |
| Virtue | خوبی |
| Bullying | تنگ کرنا |
| Nepotism | اقربا پروری |
| Trainee teacher | زیرِ تربیت استاد / استانی |

The ten authored concept labels in `concepts/unit-03.md` informed the prose. They remain proposals for G5.

## Validation and limits

- `npm run check:content`, draft state: 14 of 14 pass, recorded in `content-gates.txt`.
- Temporary `reviewed` flip of both `index.mdx` files: only the expected findings, recorded in `conditional-parity-gates.txt`: the open G4 and G5 rows in `check:pipeline-gate`, and `check:content-status`, which is stale because of the flip itself. Both files were reverted to `draft` and the revert was confirmed.
- Scripted source parity: heading vectors, blockquotes, numbered items, table rows, figure counts, verse references, year citations and all numerals in the page bodies match English on all four pages. Extra bullets in `index.mdx` are only the Urdu `key_terms` lines.
- All four pages compile with `@mdx-js/mdx`. `figures:variants:check` passes.
- The MCQ key maps position for position: ب، ج، ب، ب، ج، ج، الف، ج، ب، ب. This is a translator check, not an independent answer run.

**Not run, because the crew brief bars builds, dev servers and Playwright:** `npm run build`, `scripts/render-inspect.mjs --locale ur` and `scripts/measure-figure-text.mjs`, which launches Chromium. So there is no browser geometry measurement and no rendered inspection of the Urdu pages at narrow width or in A4 print. AGENTS.md requires `measure-figure-text` to exit 0 for changed SVG text, and CI's `figure-geometry` job will be its first real run. MDX compilation does not replace the Docusaurus build. A permitted session must do all of this before anyone claims the Urdu is rendered and ready.

Figures were inspected only through serial Sharp previews under `scripts/heavy.sh`, using Noto Nastaliq Urdu with CSS variables resolved in a scratch copy.

## Figure notes

- `scripts/mirror-figure-rtl.mjs` adds `text-anchor="end"` to tspans inside middle-anchored text. In the first Sharp preview this pushed centred labels off-centre in fig-U3-2 and fig-U3-4, so those tspan anchors were removed after mirroring; the parent `<text>` keeps the anchor. `fig-U4-1.ur.svg` carries the same tspan attribute. It was not changed or measured here, and the mirror tool is outside this job's scope.
- SVG text has a left-to-right base direction, so lines that start with a digit or bracket, or end in a neutral mark, carry an invisible U+200F so that numbering and punctuation stay on the correct side. Check this in the browser pass.
- Urdu labels were re-wrapped and re-spaced to fit Nastaliq, so some wording breaks differ from the English lines. Geometry and viewBox are inherited, with horizontal positions mirrored. Text is at the existing font sizes.
