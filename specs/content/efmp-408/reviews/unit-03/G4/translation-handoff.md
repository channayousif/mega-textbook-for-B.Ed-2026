# EFMP-408 Unit 3: Urdu translation handoff

- Translator: claude, crew job `efmp-408-u03-translate`, 2026-11-25.
- English baseline: `8fa83e44e` (`origin/main` and branch HEAD at start). English content, figures, manifest, sources, coverage and concepts are unchanged, so the G2 en-draft evidence (`20261124T200357258Z-gates.json`) still binds the English.
- Complete mirror: `index.mdx`, `topic-01.mdx` to `topic-04.mdx`, `unit-assessment.mdx` and `unit-teacher-notes.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-03/`, path resolved through `resolveUnit()`.
- Eight schematic sources: `static/img/figures/efmp-408/unit-03/fig-U3-{1..8}.ur.svg`, with generated `.ur.dark.svg` twins. Labels translated, layout mirrored with `scripts/mirror-figure-rtl.mjs`, Nastaliq-first font stack, each `<desc>` equal to its page alt. Urdu labels are wrapped in U+200F marks (EFMP-301 Unit 2 precedent) so trailing colons and full stops sit on the reading end. Labels that mix in Latin (`SLOs`, `1/R`, `R_total = ...`, `an kidney`, `'an'`) use RLI/LRI isolates. The step-3 text lines in `fig-U3-8.ur.svg` were moved 2-7 px apart because tall Nastaliq lines touched. `measure-figure-text.mjs` exits 0 on all eight sources and their dark twins, both with the local Nastaliq face and with `--ci-fonts` (the CI fallback, which made one fig-U3-7 cell overlap until it was shortened to معقول متبادل قسمت گھٹاتے ہیں). Each figure was also rendered in Chromium and checked by eye.
- `translation_status` stays `draft` in both `index.mdx` files. G3 is still open and G5 has not happened. No certification, publication or done mark is recorded.

## Terminology working set

`key_terms` in the Urdu `index.mdx` uses only banked pairs from `specs/content/terminology.csv`:
`Assessment` تشخیص, `Achievement Test` کارکردگی آزمائش, `Bloom's Taxonomy` بلوم کی درجہ بندی, `Validity` صداقت, `Reliability` اعتماديت, `Rubric` معیارِ جانچ, `Student-Learning Outcome` طالب علم کا نتیجہ ہائے تعلم.

## Proposed terms for the owner and G5

These are not in the bank. They follow the Urdu concept labels in `specs/content/efmp-408/concepts/unit-03.md` where one exists:

| English | Urdu used | Notes |
|---|---|---|
| Table of Specifications | جدولِ تخصیص | Concept label CON:EFMP-408-3-1 |
| Test blueprint | امتحانی خاکہ | Concept label CON:EFMP-408-3-1 |
| Weightage | وزن | Concept label CON:EFMP-408-3-2 |
| Content validity | مواد کی صداقت | Built on banked صداقت |
| Essay item | انشائی سوال | Concept label CON:EFMP-408-3-3 |
| Extended-response / restricted-response | تفصیلی جواب والا / محدود جواب والا | RRQ heading uses محدود جوابی سوالات, ERQ uses تفصیلی جوابی سوالات (Unit 1 used مختصر جوابی سوالات for RRQs) |
| Short-answer item | مختصر جواباتی سوال | Concept label CON:EFMP-408-3-4 |
| Scoring guide | رہنمائے نمبرات | Concept label CON:EFMP-408-3-5; `Rubric` itself uses the banked معیارِ جانچ |
| Multiple-choice item | کثیر الانتخابی سوال | Concept label CON:EFMP-408-3-6 |
| Stem / key / distractor | متن سوال / درست جواب / گمراہ کن متبادل | Topic 3.3 |
| True/false; matching | درست و غلط؛ جوڑ ملائیں | Concept label CON:EFMP-408-3-7 |
| Premise (matching) | مقدمہ | Topic 3.3 |
| Halo effect | ہالہ اثر | Topic 3.2 |
| Marker / examiner | ممتحن | Topic 3.2 |
| Test-wiseness | امتحانی چالاکی | Topic 3.4 |
| Psychometric | نفسیاتی پیمائشی | Throughout |
| Bloom levels | یاد رکھنا، سمجھنا، اطلاق، تجزیہ، قدر پیمائی، تخلیق | Remember to Create; first four match Unit 1 |

## Decisions G5 should check

- **English-grammar flaws kept in English.** Several flawed items depend on the English indefinite article "an" (Topic 3.4 scenario, Rule 3 example, Activity items A and B, Check your understanding 4, Summative flawed items 1 to 3, assessment MCQ 10, and the row-2 draft in fig-U3-4). They are kept in the original English, each followed by an Urdu meaning (اردو مفہوم), because a translated item would lose the flaw the student is asked to find. Flaws that carry over to Urdu (double negatives, length bias, "All of the above", absolute qualifiers) are fully translated: assessment RRQ 10, ERQ 5 items A to E, Topic 3.3 items, and fig-U3-8 (which keeps only `an kidney` in Latin).
- **Left/right columns in matching items.** Topic 3.3 keeps the English "premises on the left (Column A), responses on the right (Column B)". An Urdu paper would usually set Column A on the right. G5 or the owner may prefer that wording.
- **Option letters.** Options use الف، ب، ج، د and the answer key uses the same letters; option order is unchanged. Inside quoted English items the Latin A to D are kept.
- **English source wording carried over without change.** Topic 3.3 has "matches the single date to the single year", and Topic 3.2 lists the "Sindh Higher Education Commission" as an examination body that enforces marking protocols. Both are translated as written. They are possible English-side issues for G3, not translation choices.

## Validation

- Final draft-state run (`npm run build:content-status && npm run check:content`): all 14 content gates pass.
- Heading-level vectors, `<Figure>`, `<PrintHandout>`, `<TranslationStatusBadge>` counts and numbered-item counts match English in all seven files.
- Temporary flip: both `index.mdx` set to `reviewed`, `npm run build:content-status && npm run check:content`: 13 of 14 gates pass, and `check:pipeline-gate` reports only the two expected open G4/G5 rows for Unit 3. There were no terminology, file-parity or figure-parity findings. Both files were then set back to `draft`, and the English `index.mdx` is byte-identical to the baseline.
- `npm run figures:variants` wrote 8 `.ur.dark.svg` files; `npm run figures:variants:check` is clean.
- The rendered Urdu pages were not inspected with `render-inspect.mjs`, because crew jobs may not run a local build or server. G5 needs that rendered evidence.

## Next owner

Independent G5 reviewer, after G3 accepts the English: compare passage-level meaning against `8fa83e44e`, solve the Urdu assessment independently, and inspect the rendered pages and figures.
