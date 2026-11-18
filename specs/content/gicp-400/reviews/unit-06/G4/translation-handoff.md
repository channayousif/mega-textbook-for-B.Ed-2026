# GICP-400 Unit 6 Urdu translation handoff

Translator: Codex, crew job `gicp-400-u06-translate`, 2026-11-07. This is translator work and self-check evidence, not an independent review or certification.

## Baseline and delivery

English baseline: `b7863ac41dd9c97acb5460ef63c4c2c6dcf1c6e0`, the starting HEAD and origin/main. No earlier job commits or uncommitted changes existed on this branch. English prose, front matter, figures and approved specifications are unchanged. G2 was recorded green; G3 remains open with the existing advisory escalation.

Resolved the Urdu directory through `resolveUnit('.', 'GICP-400', 6)` and `urPathFor`. Delivered four same-named MDX files under `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-06/`:

- `index.mdx`: introduction, outcomes, prerequisites, navigation, study instructions, edition warning and eight bank-bound key terms.
- `topic-01.mdx`: classroom case, legislature, executive and current courts, worked cases, comparisons, group activity, retrieval questions, summary, self-check, practicum, summative task and mini-rubric, readings.
- `topic-02.mdx`: classroom case, Article 239 procedure, three historical amendments, federalism comparison, worked cases, activity, retrieval, summary, self-check, practicum, summative evaluation and mini-rubric, readings.
- `unit-assessment.mdx`: summary, all 10 MCQs, 10 RRQs and 5 ERQs, all 40 MCQ options in the original order, translated model answers, unchanged scoring, and five analytic rubrics. The bounded answers heading is the final level-two section.

All identifiers, reading estimates, component calls and glossary keys cross over unchanged. Topic titles use `موضوع 6.1 - ...` and `موضوع 6.2 - ...`. Eight figure assets are delivered under `static/img/figures/gicp-400/unit-06/`: `fig-U6-1` through `fig-U6-4`, each with `.ur.svg` and derived `.ur.dark.svg`. Urdu description strings equal their page alt strings. The source geometry is mirrored horizontally for RTL reading order; vertical space is increased for Nastaliq. Visible Latin `175A` labels use Unicode LTR isolates to prevent splitting the reference. No external fonts or images are embedded.

## Terminology working set

The frozen bank is unchanged. Its entries appearing in the English unit were checked, and all eight are declared with accepted Urdu values in the Urdu index:

| Bank entry | Accepted form used |
|---|---|
| Learning | سیکھنا |
| Assessment | تشخیص |
| Summative Assessment | مجموعی جائزہ |
| Curriculum | نصاب |
| Memory | یادداشت |
| Rubric | معیارِ جانچ |
| Self-Assessment | خود جائزہ |
| Pakistan Studies | پاکستان کے مطالعہ |

The five Glossary keys retain their English attributes: Separation of Powers, Legislature, Executive, Judiciary, Federalism. Their existing Urdu definitions were read in `glossary.json`; no glossary changes were made. The twelve concept labels in `concepts/unit-06.md` supplied the unit's domain working set, and remain proposals for independent terminology review.

## Unbanked domain terms proposed for owner review

These are translation choices, not additions to the bank. Existing glossary definitions ground the first five. The concept-graph labels are retained in meaning; grammatical inflections follow the surrounding Urdu sentence.

| English | Urdu proposed/used |
|---|---|
| Legislature | مقننہ |
| Executive | انتظامیہ |
| Judiciary | عدلیہ |
| Separation of Powers | اختیارات کی علیحدگی |
| Federalism | وفاقی نظام |
| Majlis-e-Shoora | مجلسِ شوریٰ (پارلیمنٹ) |
| Two Houses and federal balance | دو ایوان اور وفاقی توازن |
| Head of State and chief executive | سربراہِ مملکت اور چیف ایگزیکٹو |
| Acting on advice | مشورے کے مطابق عمل |
| Courts and their jurisdiction | عدالتیں اور ان کا دائرۂ اختیار |
| Judicial independence | عدلیہ کی آزادی |
| Constitutional amendment | آئینی ترمیم |
| Amendment procedure | آئینی ترمیم کا طریقۂ کار |
| Provincial consent on limits | صوبائی حدود پر صوبے کی رضامندی |
| Eighteenth Amendment | اٹھارویں ترمیم |
| Nineteenth Amendment | انیسویں ترمیم |
| Twenty-fifth Amendment | پچیسویں ترمیم |
| Effect of amendments on federalism | ترامیم کے وفاق پر اثرات |
| Provincial autonomy | صوبائی خودمختاری |
| National Assembly / Senate | قومی اسمبلی / سینیٹ |
| Electoral college | انتخابی کالج |
| Total membership | کل رکنیت |
| Assent | منظوری |
| No-confidence resolution | عدم اعتماد کی قرارداد |
| Federal Constitutional Court | وفاقی آئینی عدالت |
| Supreme Court / High Court | سپریم کورٹ / ہائی کورٹ |
| Federal Shariat Court / subordinate courts | وفاقی شرعی عدالت / ماتحت عدالتیں |
| Judicial Commission / Supreme Judicial Council | جوڈیشل کمیشن / سپریم جوڈیشل کونسل |
| Concurrent Legislative List | مشترکہ قانون سازی کی فہرست |
| Federal Legislative List | وفاقی قانون سازی کی فہرست |
| Council of Common Interests | مشترکہ مفادات کونسل |
| National Finance Commission Award | قومی مالیاتی کمیشن ایوارڈ |
| Declaratory judgment | اعلانیہ فیصلہ |
| Judicial review | عدالتی جائزہ |
| Federally Administered Tribal Areas | وفاق کے زیرِ انتظام قبائلی علاقے |

## Checks and limits

- `npm run check:content` on origin/main: all 14 gates pass, recorded in `check-main.log`.
- Draft gate run: all 14 gates pass. Final staged run is recorded in `check-draft.log`.
- Temporary reviewed-status run: file-set, headings, figures and terminology checks pass. The only findings are unfinished G4 and G5 tracker rows, as the skill predicts; see `check-reviewed.log`. Both index flags were restored to `draft`. An explicit check also validates all eight bank entries independently of status.
- Extra structural checks and MDX compilation pass for all four files: metadata, heading level vectors, component counts, glossary key order, figure IDs, alt/description equality, numbered item sequences, 40 MCQ option letters and the 10/10/5 assessment bands. See `parity.log`.
- All four Urdu SVG sources optimise below 20 KB. `figures:variants:check` passes with generated dark twins.
- A non-browser Pillow/RAQM check measures Nastaliq glyph bounds at fourfold resolution against panels, viewBoxes and neighbouring text. Its initial eight overlaps were repaired by increasing vertical spacing; final result is zero findings over 126 labels. See `font-metrics.log`. This is a limited font-metric check, not the mandatory Chromium geometry check.
- Light and dark previews of all four SVGs were rendered serially with sharp under `scripts/heavy.sh` and inspected. Preview-only copies resolve CSS variables to literal colours because the non-browser SVG renderer does not support the committed CSS custom properties. The committed SVGs keep the required token block. Previews and helper scripts remain ignored scratch under `.crew/`.
- Translator passage comparison and MCQ solving preserve the response sequence ج، الف، ب، د، الف، د، ب، ج، ب، ج and unchanged marks. This is translator self-check, not independent assessment review.

The crew brief prohibits builds, dev servers, Playwright and Chromium. Consequently `measure-figure-text.mjs`, `render-inspect.mjs`, the locale build, 360px/desktop page inspection, keyboard table scrolling and A4 print inspection were not run. An authorised host must perform these before G5 acceptance. The inherited source-access qualification concerning the official 25th Amendment gazette is preserved as a review dependency, not silently resolved in translation. No independent G5 was invoked, no evidence was signed, and no publication occurred.

`translation_status` stays `draft` in every page because G5 has not been accepted. The existing G4 tracker row records delivery while staying open under translate-unit Step 7. G3/G5 status is unchanged. The untranslated badge remains byte-identical to the English component call; no reviewed claim is made. A later English edit requires reconciliation with this mirror before independent G5.
