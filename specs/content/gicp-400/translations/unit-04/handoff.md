# GICP-400 Unit 4 Urdu translation handoff

Translator: agy, crew job `gicp-400-u04-translate`, 2026-11-06. This records translation work and translator checks, not independent G5 evidence or certification.

## Baseline and delivered files

English baseline: `f4bf69fd3`, identical to `origin/main` when work began. G2 is green; the G3 advisory escalation report is recorded by codex, and its tracker row remains open. The English files are unchanged.

Resolved the Urdu directory with `resolveUnit('.', 'GICP-400', 4)` and file paths with `urPathFor`. The five same-named mirrors are under `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-04/`:

- `index.mdx`: opening, outcomes, prerequisites, navigation, study guidance, historical edition scope notes and bank-bound `key_terms`.
- `topic-01.mdx`: Sukkur classroom case, explanations of martial law and breakdowns, worked example, timeline activity, retrieval, self-check, practicum task, summative comparison task and rubric, and reading references.
- `topic-02.mdx`: Hyderabad classroom case, 1971 crisis, drafting sequence, bicameral compromise, Islamic provisions and safeguards, display audit activity, retrieval, self-check, practicum task, summative task and rubric, and references.
- `topic-03.mdx`: Khairpur classroom case, lifetimes of 1956/1962/1973 constitutions, text-institutions-practice framework, three-layer activity, retrieval, self-check, practicum task, summative task and rubric, and references.
- `unit-assessment.mdx`: complete unit summary, 10 MCQs with transliterated options (الف، ب، ج، د), 10 restricted responses, 5 extended responses, model answers, scoring criteria, and five analytic rubrics. The translated answers section remains the final level-two section.

Six Urdu light SVGs and their six mechanically derived dark variants are under `static/img/figures/gicp-400/unit-04/`:

- `fig-U4-1.ur.svg` / `fig-U4-1.ur.dark.svg` (Timeline: four interruptions linked to stages of return)
- `fig-U4-2.ur.svg` / `fig-U4-2.ur.dark.svg` (Table: comparing breakdowns, text effect and return stages)
- `fig-U4-3.ur.svg` / `fig-U4-3.ur.dark.svg` (Flowchart: crisis to permanent settlement sequence)
- `fig-U4-4.ur.svg` / `fig-U4-4.ur.dark.svg` (Concept map: Islamic commitments, safeguards and later additions)
- `fig-U4-5.ur.svg` / `fig-U4-5.ur.dark.svg` (Table: 1956, 1962 and 1973 constitutions in historical perspective)
- `fig-U4-6.ur.svg` / `fig-U4-6.ur.dark.svg` (Diagram: implementation across text, institutions and practice layers)

Text, titles and descriptions are localised with Nastaliq-first font stacks (`'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', system-ui, sans-serif`). Shape layouts and label positions are horizontally mirrored where appropriate for RTL reading order. Every SVG description exactly matches its page carrier `alt` text. All six Urdu light files are between 3.5 KB and 4.8 KB, well below the 20 KB budget. Figure IDs, English prompts and manifest rows are unchanged.

## Terminology working set

The bank (`specs/content/terminology.csv`) was read before drafting. Terms appearing in the unit include:
- `Objectives Resolution` -> `قراردادِ مقاصد`
- `Assessment` -> `تشخیص`
- `Formative Assessment` -> `تشکیلی تشخیص`
- `Summative Assessment` -> `مجموعی جائزہ`
- `Rubric` -> `معیارِ جانچ`
- `Self-Assessment` -> `خود جائزہ`

The two `<Glossary>` calls keep their English `term` attributes and use definitions from `glossary.json`:
- `<Glossary term="Martial law" />`
- `<Glossary term="Theocracy">مذہبی پیشوائی کی حکومت</Glossary>`

The concept graph's eight Urdu labels (`specs/content/gicp-400/concepts/unit-04.md`) were checked and adhered to:
- مارشل لا (Martial law)
- آئین کی تنسیخ اور التوا (Abrogation and abeyance)
- جمہوریت کی بحالی (Democratic restoration)
- 1971 کے بعد آئینی اتفاق (Constitutional settlement after 1971)
- 1973 کے آئین کی تشکیل (Making the 1973 Constitution)
- اسلامی دفعات اور تحفظات (Islamic provisions and safeguards)
- آئین کا برقرار رہنا (Constitutional survival)
- آئین پر عمل درآمد (Constitutional implementation)

### Proposed terms for curriculum owner

The course spec's constitutional terms have no entries in `terminology.csv`. They are proposed here for the curriculum owner and independent G5 reviewer, not silently added to `key_terms` or the bank:

| English term | Urdu used in translation |
|---|---|
| Martial law | مارشل لا |
| Abrogation | تنسیخ |
| Abeyance | التوا / معطلی |
| Breakdown / interruption | تعطل / شکست و ریخت |
| Restoration of democracy | جمہوریت کی بحالی |
| Constituent assembly | دستور ساز اسمبلی |
| Interim constitution | عبوری آئین |
| Constitutional compromise | آئینی سمجھوتہ |
| Bicameral | دو ایوانی |
| Unicameral | ایک ایوان / یک ایوانی |
| Theocracy | مذہبی پیشوائی کی حکومت |
| Council of Islamic Ideology | اسلامی نظریاتی کونسل |
| Federal Shariat Court | وفاقی شرعی عدالت |
| Principles of Policy | پالیسی کے اصول |
| Basic Democracies | بنیادی جمہوریتیں |
| Injunctions of Islam | احکاماتِ اسلام |
| State religion | مملکتی مذہب |

## Checks and limits

- `npm run check:content` on baseline: all 14 content gates passed cleanly.
- Structural parity: identical file set, front-matter identifiers and reading estimates, exact heading-level vectors across all 5 files, and component count parity (`Figure`: 6, `Glossary`: 2, `PrintHandout`: 4, `TranslationStatusBadge`: 1).
- Topic title format: all topic titles strictly follow `موضوع 4.N - <عنوان>`.
- Zero em dashes: `npm run check:no-em-dash` passed with zero findings across the entire codebase.
- No answer keys check: `npm run check:no-answer-keys` passed. Translated heading `## جوابات اور نمبر دہی کی رہنمائی` is the final H2 in `unit-assessment.mdx`; no English answer-key patterns remain in Urdu prose.
- Assessment parity: 10 MCQs with transliterated options (الف، ب، ج، د) in identical order, 10 RRQs and 5 ERQs. Independent MCQ self-solve verified correspondence with translated keys (1: ب, 2: ج, 3: الف, 4: د, 5: ب, 6: ج, 7: الف, 8: د, 9: ج, 10: ب).
- Figure font measurement: `scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/gicp-400/unit-04/*.ur.svg` passed with 0 geometry problems across all 6 Urdu SVGs.
- Figure variants: `npm run figures:variants` generated 6 dark variants; `npm run figures:variants:check` passed for all 1181 figures in the repository.
- Conditional parity verification: both English and Urdu `index.mdx` files were temporarily flipped to `reviewed`. Under this flip:
  - `validate:content` passed (file parity and heading vector parity verified).
  - `check:figures` passed (carrier alt equality and Urdu SVG parity verified).
  - `check:pipeline-gate` confirmed zero terminology errors for `key_terms`, reporting only the expected incomplete G4 and G5 tracker rows for Unit 4.
  - Both index files were immediately reverted to `draft`.
- Final `npm run check:content`: all 14 content gates passed cleanly with zero findings.
- Site build, dev server and Playwright browser tests were not run in obedience to the crew brief's explicit restrictions. Render inspection at 360px, desktop and A4 print remains for the independent review stage.

## Handoff and next steps

`translation_status` remains `draft` throughout English and Urdu files because independent G5 review has not occurred. The `G4 ur-translation` tracker row in `specs/content/gicp-400/tasks.md` records the delivery of this draft mirror and remains open (`▢`) without certification or initials.

The next job is independent G5 Urdu review (`review-unit` skill via `.claude/agents/g5-reviewer.md`), which must independently evaluate passage-level bilingual equivalence, epistemic force, assessment equivalence, and perform rendered visual inspection.
