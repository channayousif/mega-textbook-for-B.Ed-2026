# Unit 3 Urdu translation handoff

- Translator: agent:codex, 2026-10-21, branch `crew/gqur-301-u03-translate`.
- English baseline: `47e14253` (last unit-content change), checked out at `1a2dd365daf23bcf183154632f962ed0b8946e9f`. English files remain unchanged.
- Complete same-name mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`, `unit-teacher-notes.mdx`, plus translated `_category_.json`.
- Four `.ur.svg` figures and their generated `.ur.dark.svg` twins are wired into the two topics. Labels, descriptions, captions and credit text are translated; identifiers, viewBoxes, relationships and wordmark remain. Horizontal reading order is mirrored for Urdu. Page alt text equals the corresponding SVG description.
- `translation_status` remains `draft` throughout. No independent G5 has occurred. G3 is still open. The existing G4 row has a factual handoff note only: its status and initials are unchanged, and no row was appended, following translate-unit Step 7. This is translation work, not review evidence or certification.

## Terminology working set

The frozen bank contains seven terms occurring in the English unit. The Urdu index binds all seven: Learning (سیکھنا), Assessment (تشخیص), Formative Assessment (تشکیلی تشخیص), Summative Assessment (مجموعی جائزہ), Teaching Strategy (حکمتِ تدریس), Rubric (معیارِ جانچ), Self-Assessment (خود جائزہ). Neither the bank nor glossary was changed.

The following unbanked terms are proposals for the curriculum owner and independent G5 reviewer. The first eight follow the unit concept graph. Glossary lookups keep their English keys; glossary definitions are shared existing inputs. In particular, the glossary definition calls a statistic شماریاتی عدد, whereas the concept graph uses شماریہ; this translation consistently uses the concept-graph label and leaves glossary harmonisation to the owner.

| English | Proposed Urdu |
|---|---|
| Population | شماریاتی آبادی |
| Parameter | پیرامیٹر |
| Sample | نمونہ |
| Statistic | شماریہ |
| Inference | استنباط |
| Sampling frame | نمونہ گیری فریم |
| Random sampling | تصادفی نمونہ گیری |
| Non-random sampling | غیر تصادفی نمونہ گیری |
| Sampling | نمونہ گیری |
| Simple random sampling | سادہ تصادفی نمونہ گیری |
| Systematic sampling | منظم نمونہ گیری |
| Stratified sampling | طبقاتی نمونہ گیری |
| Convenience sampling | سہولتی نمونہ گیری |
| Purposive sampling | مقصدی نمونہ گیری |
| Quota sampling | کوٹہ نمونہ گیری |
| Stratum / strata | طبقہ / طبقات |
| Stratification | طبقہ بندی |
| Sampling variation | نمونہ گیری کا تغیر |
| Bias / selection bias | تعصب / انتخابی تعصب |
| Self-selection / voluntary response bias | خود انتخاب / رضاکارانہ جواب کا تعصب |
| Representativeness | نمائندگی |
| Generalisation | نتائج پوری شماریاتی آبادی پر لاگو کرنا |
| Absolute sample size | نمونے کی مطلق تعداد |
| Precision | دقت |
| Mean | اوسط |
| Median | وسطانیہ |
| Census | مکمل گنتی (Topic 3.1)، مردم شماری (school census list) |
| Analyze / Evaluate | تجزیہ / قدر پیمائی |

## Validation and limits

- Full `npm run check:content` passes all 13 gates in final draft state. The first run's only finding was missing generated `static/content-status.json`, repaired with `npm run build:content-status`; no gate code or tracked status artifact was changed.
- Temporary `reviewed` parity probe passed `validate:content`, `check:figures`, and terminology conformance. Its only findings were G4 and G5 not done, expected because neither has been certified. Both indexes were restored byte-for-byte to draft afterwards. See `check-content-parity.txt`.
- Direct structural comparison passed for file sets, invariant front matter, heading-level vectors, component counts, glossary keys, figure IDs/dimensions, SVG-description/page-alt equality, and numbered items. Assessment sections preserve 10 MCQ, 10 RRQ and 5 ERQ items. MCQ solutions and key correspond to B/C/B/C/B/C/C/B/B/C with Urdu option letters ب/ج/ب/ج/ب/ج/ج/ب/ب/ج. Marks, rubric bands and word limits are preserved.
- Four Urdu SVGs were optimised to 3.5-6.4 KB. `figures:variants:check` passed. Local Sharp previews were inspected with the installed Noto Nastaliq Urdu font. Sharp does not resolve CSS variables here, so preview-only buffers substituted the existing palette values before rasterising; committed SVGs retain their token CSS.
- Page rendering at desktop/narrow widths and A4 print remains pending for a separate authorised run. The crew brief expressly forbids builds, servers and Playwright; no such command ran. Local figure previews do not replace browser geometry measurements or page inspection.
- The English figure `fig-U3-3` names quota in its description but has only five method rows. The Urdu preserves that baseline rather than adding a new row. G3/owner should settle this before final G5 acceptance. The figure `fig-U3-2` inference arrow geometry is also inherited unchanged apart from horizontal mirroring; verify its correspondence with its description during independent review.
- Measured drafting-to-validation interval: at least 7 minutes, from first translation script at 05:50 UTC to checks at 05:57 UTC on 2026-10-21; initial reading time is excluded. This is not a human review measurement.

## Next owners

The curriculum owner settles unbanked terminology and the glossary-label difference. A separate G3 reviewer settles the English baseline; a separate G5 reviewer compares the complete passages and assessment demand after that dependency is accepted, and inspects actual narrow-width and A4 Urdu rendering. No Paperclip ticket was supplied.
