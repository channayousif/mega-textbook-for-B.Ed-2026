# GICP-400 Unit 3 - Translator handoff

Translation delivery only, by agent:claude, crew job `gicp-400-u03-translate`, 2026-11-07. This is not an independent G5 report or review certification.

## Baseline and delivered files

- English baseline: `864814f473d418241aae7d897d01d4c579b7599e`, the checkout HEAD and `origin/main` when work began. No earlier branch commits or uncommitted edits were present. Unit 3 has green G2 evidence; G3 is an advisory escalation and unsigned. The English files were not changed.
- Complete same-named Urdu mirror, resolved with `resolveUnit()`, under `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-03/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`. The English has no teacher-notes file, so none was invented.
- The assessment keeps 10 MCQs, 10 restricted responses, 5 extended responses, all model answers, mark splits and five analytic rubrics. Option order is unchanged and answer letters are transliterated (الف، ب، ج، د). The translated answers section remains the final level-two section.
- Four localised SVGs, `fig-U3-1.ur.svg` to `fig-U3-4.ur.svg`, with generated `.ur.dark.svg` twins. Labels are translated, layouts mirrored with `scripts/mirror-figure-rtl.mjs`, Nastaliq is first in the font stack, and each Urdu page alt matches its SVG `desc` exactly. Each light file is under 7 KB. The banner stays prompt-only and belongs to the illustration job.

## Choices the reviewer should check

- **Draft note.** The English `:::note` says the Urdu translation is not yet available, which would be false on the Urdu page. The Urdu note instead says this translation is a draft and that the English draft and the translation both await independent review.
- **Ranges.** En-dash ranges are written with تا (`1947 تا 1962`, `0 تا 3 نمبر`) so that bidi cannot reorder the numerals. The values are unchanged.
- **Glossary.** The three `<Glossary>` calls stay self-closing with their English keys. That form renders the English word, so each is set in parentheses after the Urdu term, for example وفاقی مقننہ (Legislature).
- **Gendered verbs.** The Topic 3.1 and opening Topic 3.2 trainee is masculine by default (the English does not specify; Topic 3.1 is a boys' school). The Topic 3.2 worked-example trainee is feminine because the English says "She".
- **Citation keys.** The backticked keys in the English prose (`goi-act-1935`, `hamid-khan-const` and others) are kept exactly as they stand.

## Terminology working set and owner proposals

The frozen bank was read first and not changed. The Urdu index declares only exact bank entries: Objectives Resolution (قراردادِ مقاصد), Lahore Resolution (قراردادِ لاہور), Quaid-e-Azam (قائدِ اعظم), Pakistan Studies (پاکستان کے مطالعہ), Rubric (معیارِ جانچ). Prose also uses the bank forms تشخیص, مجموعی جائزہ, خود جائزہ, نتیجہ ہائے تعلم and تاملی جریدہ. The `definition_ur` values for Legislature, Martial law and Objectives Resolution were consulted. All ten concept-graph labels were consulted and their wording kept in the prose; G5 still has to review the nine that are not banked.

These terms are not in the bank. They are proposals for the owner, not accepted terminology:

| English | Urdu used |
|---|---|
| Constitution | آئین |
| Constituent Assembly | دستور ساز اسمبلی |
| Legislature | مقننہ |
| Unicameral / bicameral | یک ایوانی / دو ایوانی |
| Martial law | مارشل لا |
| Abrogation | تنسیخ (verb: منسوخ کرنا) |
| Interim constitution | عبوری آئین |
| As adapted (1935 Act) | ترمیم شدہ, from the concept graph |
| Indian Independence Act 1947 | قانونِ آزادیٔ ہند 1947 |
| Provisional Constitution Order 1947 | عبوری آئین حکم نامہ 1947 |
| Dominion | ڈومینین |
| Federal, Provincial, Concurrent lists | وفاقی، صوبائی، مشترکہ قانون سازی کی فہرست |
| Divine sovereignty | حاکمیتِ الٰہی |
| Sacred trust | مقدس امانت |
| Preamble | دیباچہ |
| Article (of a constitution) | دفعہ |
| Fundamental rights | بنیادی حقوق |
| Writ / jurisdiction | رٹ / دائرۂ اختیار |
| Assent | منظوری |
| Necessity (doctrine) | ضرورت کا اصول |
| Parity | برابری |
| One Unit | ون یونٹ |
| Basic Democracies | بنیادی جمہوریتیں |
| Basic Democrats | بنیادی جمہوری ارکان |
| Electoral College | انتخابی ادارہ |
| Electors | انتخاب کنندگان |
| Recurring / new / charged expenditure | جاری / نئے / واجب اخراجات |
| Principles of Law-Making | قانون سازی کے اصول |
| Advisory Council of Islamic Ideology | اسلامی نظریے کی مشاورتی کونسل |
| Franchise | حقِ رائے دہی |
| Cooperating teacher | معاون استاد |
| Rubric bands: Developing, Proficient, Exemplary | ابتدائی، ماہر، مثالی |
| Bloom's Evaluate tag | قدر جانچنا |

Article 2A stays Latin (`دفعہ 2A`), matching the corpus handling of `25A`, although `glossary.json` writes 2-الف. The owner may want one form.

## English defects found, not fixed

These are for `revise-topic` or the G3 repair job. Any English edit needs a matching Urdu edit and new review inputs.

- `topic-02.mdx`: "Political disvoting rights" (heading) and "The disvoting rights of the general populace" (summary) read as a bad word substitution. Translated by the evident meaning, حقِ رائے دہی سے محرومی, which is an inference.
- `topic-02.mdx`: "holded internal contradictions" and "an powerful presidency", plus "an powerful chief executive" in RRQ 7 of `unit-assessment.mdx`. Translated by the evident meaning.
- `unit-assessment.mdx`: the summary names "the Basic Principles Committee reports", which Topic 3.1 never teaches. Translated faithfully.
- `topic-01.mdx`: the summary says the 1935 Act was "adapted by the Indian Independence Act 1947", while the explanation attributes the adaptations to the 1947 Order under Section 8. Translated faithfully.
- `topic-01.mdx`: the activity cites "National Assembly, 2012, Annex", but that source is listed only in Topic 3.2's reading. The rubric also cites a "1955 One Unit Act" that the prose does not name.
- `fig-U3-3`: the alt text lists executive authority, electoral system and rights, while the figure's rows are Government, Legislature, Federal structure, National elections, Rights and Islamic provisions. The Urdu alt follows the English alt and shares this gap.
- Backticked citation keys render as code on the page in both languages.

## Verification

- `npm run check:content`: all 14 gates pass in draft, after regenerating the ignored `static/content-status.json`.
- Reviewed-only test: both indexes were temporarily set to `reviewed`, and the status report regenerated. The only findings were the two expected pipeline ones (Unit 3 G4 and G5 rows not done), with no terminology, structural parity or figure parity finding. Both indexes were restored to `draft` and the report regenerated.
- Scratch source comparison of all four files: matching heading-level vectors, component counts, Glossary keys, figure IDs, list and table counts, Bloom tag sequence and numerals. The only numeral differences are spelled grades (دسویں for Grade 10), the repeated 150 in (150، 150) and one added 1947 in a gloss. Each file also compiled with `@mdx-js/mdx` and `remark-gfm`.
- All ten Urdu MCQs were checked against the translated key by the translator. This is a translator self-check, not the independent solve G5 requires.
- `figures:variants:check` passes. Label widths were measured with Pillow, raqm and the installed Noto Nastaliq Urdu: no canvas overflow, no spill out of a panel, no close neighbours. This is a limited font-metric check, not browser evidence.

## Not done

- `node scripts/measure-figure-text.mjs`, `npm run build` and `render-inspect.mjs --locale ur` were not run, because the brief forbids Playwright and builds and the first and last need Chromium. Rendered Nastaliq, bidi, 360px and A4 output have not been seen, and no geometry pass is claimed. CI's `figure-geometry` job will be the first real measurement of these SVGs.
- `translation_status` stays `draft` on every page because G5 has not happened. The Unit 3 G4 row stays open with a delivery note, as Step 7 requires; no row was appended and nothing was certified. G5 belongs to a fresh independent session.
- English G3 remains an unsigned advisory escalation (Abbas 2023 and Shah 2026 full texts unbound, browser evidence missing). Claims resting on those sources were translated with their attribution unchanged. An accepted G5 cannot bind until that is resolved.

## Rate note

The translation, figures and checks took about 15 minutes of wall-clock time in one session, which says nothing about G5 effort.
