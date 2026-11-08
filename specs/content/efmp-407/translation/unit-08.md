# EFMP-407 Unit 8 Urdu translation handoff

Prepared by agent:claude (crew job `efmp-407-u08-translate`) on 2026-11-07 from English baseline commit `0d10bb72b8e095a046d2e8bb66776af1e91dbe36` (the last commit touching `docs/semester-3/efmp-407/unit-08/`). The branch had no earlier translation work, so this is a first full draft. English content is unchanged. `translation_status` stays `draft` in both locales because no independent G5 review has happened; only an accepted G5 earns `reviewed`.

## Translation bundle

The complete same-named mirror is at `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-08/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx` and `unit-teacher-notes.mdx`. Topic titles and H1s read `موضوع 8.1 - ...` and `موضوع 8.2 - ...`. Front-matter identifiers, `clo_refs`, reading minutes and `assessment_weighting` are byte-identical to English. Heading level vectors match file by file. Numbered and bulleted item counts match (the Urdu index adds only its `key_terms` block). Component calls match: 4 `<Figure>`, 3 `<PrintHandout>`, 1 `<TranslationStatusBadge>`. The assessment keeps the 10/10/5 order, option order (A-D as الف، ب، ج، د), marks, mark splits and the final bounded `## جوابات اور نمبر دہی کی رہنمائی` section. Each Urdu MCQ was re-answered from the Urdu alone and matched the translated key.

All four placed English schematics now have `.ur.svg` sources wired into the Urdu pages, plus `.ur.dark.svg` twins derived by `npm run figures:variants` (`--check` clean). Reading order is mirrored: table columns run right to left with the row label on the right, the fig-U8-1 cycle runs counter-clockwise from the top, and the fig-U8-3 partner boxes swap sides. Labels use the Nastaliq-first font stack. Each SVG `<desc>` equals its Urdu page alt. The English manifest rows, prompts and lifecycle are unchanged.

Two figure decisions need a reviewer's eye:

- **Bidi direction.** A sharp/librsvg render with the default LTR base put trailing Urdu commas, leading step numbers and embedded `SMC`/`NGOs` on the wrong side. Every Urdu `<text>` therefore carries `direction="rtl"`, with `text-anchor="start"` for right-aligned labels (under RTL, `start` is the right edge, so labels still grow leftward from `x`). The `bilingual-figures.md` warning is about `rtl` combined with `end`, which overflows. That combination is not used here.
- **Table rows grown.** In fig-U8-2 and fig-U8-4, worst-case Nastaliq ink between stacked lines collided at the English 65 px row height. Rows were grown to 80 px, and the viewBox from 780x380 to 780x440, rather than shrinking the text.

Label widths and line clearance were checked against Noto Nastaliq Urdu with HarfBuzz, and all four figures were rendered and inspected as PNGs (sharp). `scripts/measure-figure-text.mjs` was **not** run because it needs Playwright, which the crew brief forbids. CI's `figure-geometry` job must measure these four `.ur.svg` files. `render-inspect.mjs --locale ur` and the site build were not run for the same reason, so narrow-view (360 px) and A4 print inspection of the rendered Urdu pages is still outstanding for G5.

## Gate results

`npm run check:content`: 14/14 pass with both `index.mdx` files at `draft`. During the temporary `reviewed` flip (reverted and verified), the only findings were the two expected ones: the `G4 ur-translation` and `G5 ur-review` rows were not done, plus a `content-status` staleness caused by the flip itself. So `key_terms`, file-set parity and figure parity are clean.

## Terminology working set and proposals

The frozen bank was consulted without edits. The Urdu index declares accepted entries for Learning Outcome, Assessment, Summative Assessment (مجموعی جائزہ), Formative Assessment, Rubric, Self-Assessment (خود جائزہ), Group Work, Curriculum, Pedagogy and Environment. The unit has no `<Glossary>` calls.

The ten concept-graph Urdu labels in `concepts/unit-08.md` were consulted. One divergence is deliberate: the label `اسکول کا پائیدار منصوبہ` reads as "a durable school project", so the prose uses `اسکول کا پائیداری کا منصوبہ` (a school sustainability project). The concept file was not edited. The owner or G5 should align the label.

Proposed specialised terms for the terminology owner (translation proposals only, not bank additions):

| English | Urdu used |
|---|---|
| Sustainability project | پائیداری کا منصوبہ |
| Whole School Approach (WSA) | مکمل اسکول کا نقطۂ نظر |
| Project cycle | منصوبے کا چکر |
| Monitoring | نگرانی |
| Indicator | اشاریہ |
| Community / community participation | برادری / برادری کی شمولیت |
| Co-ownership | مشترکہ ملکیت |
| School Management Committee (SMC) | اسکول مینجمنٹ کمیٹی (SMC) |
| School Improvement Plan (SIP) | اسکول کی بہتری کا منصوبہ (SIP) |
| Reporting | رپورٹنگ |
| Multimodal | کثیر جہتی |
| Stakeholders | متعلقہ فریق |
| Project plan matrix | منصوبے کا خاکہ (میٹرکس) |
| Student teacher / trainee teacher | زیرِ تربیت استاد / اساتذہ |
| Teaching practicum | تدریسی مشق |
| Sindh Right of Children to Free and Compulsory Education Act, 2013 | سندھ مفت اور لازمی تعلیم کے حقِ اطفال کا ایکٹ، 2013 (English title kept in parentheses on first use) |

Bloom tags follow the corpus forms: یاد رکھنا، سمجھنا، اطلاق، تجزیہ، جانچنا، تخلیق.

## Known English issues carried over, not fixed in translation

The translation follows the English faithfully. It does not repair the open G3 findings, which belong to an English revision job. Each needs a mirrored Urdu edit when the English changes:

- **F1 (blocking):** the Jumani and Abbasi (2015) attributions at `topic-01.mdx:57` and `:78` are translated as written. If the English claims are rewritten or the source is removed, the matching Urdu paragraphs (the closing paragraph of "منصوبے کے چکر کے چھ مراحل" and the low-cost-resources paragraph) must change too.
- **F3:** the dead Sindh Act URL in topic 8.2's further reading is reproduced unchanged.
- **F8:** topic 8.2 check item 3 keeps its Analyze tag (تجزیہ).
- fig-U8-3's hub-to-growers connector is one-way in English while every other link and the alt say two-way. The Urdu figure mirrors the English geometry exactly.

Any English edit after `0d10bb72b` invalidates the G5 dependency for the edited passages.

## Not done here

- No G5 review, no `reviewed` flip, and no tracker row marked done. The G4 row is marked ▣ (prepared) with this note, as for Unit 4.
- The banner fig-U8-5 stays `prompt-only` and outside this bundle.
- Rate probe: this draft took one session of about 75 minutes, covering 5 pages and 4 figures.
