# Unit 10 Urdu translation handoff

- Translator: agent:codex, branch `crew/gqur-301-u10-translate`, 2026-10-22 local date.
- English baseline checkout: `ed514d033892f876f6c66a8bf7edc9372c04fba5`, identical to `origin/main` at task start. The last English unit-content change is `73f5a67f`. English prose, metadata, figures, manifests and G2 evidence remain unchanged.
- Complete same-name Urdu mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`, and translated `_category_.json`. No English teacher-notes file exists, so no extra Urdu page was introduced. The mirror path was resolved with `resolveUnit` and all child writes used `urPathFor`.
- All four figures have translated labels, titles and descriptions in `.ur.svg`, wired into the two topics, plus generated `.ur.dark.svg` twins. Horizontal geometry and reading order are mirrored without mirroring glyphs. Description strings equal page alt text. Numerals and mathematical identifiers remain unchanged. Text baselines/font sizes were adjusted for Nastaliq; the final expected-value expression uses Unicode LTR isolation to keep the formula together.
- `translation_status` remains `draft` on all four pages. G3 and G5 remain open. The existing G4 tracker row has a factual note only, with its status and initials unchanged and no appended row, following translate-unit Step 7. This work is translation, not certification or independent review evidence.

## Terminology working set

The frozen bank contains six terms occurring in the English unit. All six are bound in the Urdu index: Learning (سیکھنا), Assessment (تشخیص), Summative Assessment (مجموعی جائزہ), Self-Assessment (خود جائزہ), Rubric (معیارِ جانچ), and Validity (صداقت). The bank and shared glossary were not edited. The English unit has no Glossary component calls to mirror.

The five core concept labels below follow `concepts/unit-10.md`. They are absent from the frozen bank and remain proposals for the curriculum owner and independent G5 reviewer. First bold definitions also give their English names.

| English | Proposed Urdu |
|---|---|
| Random variable | تصادفی متغیر |
| Discrete random variable | منفصل تصادفی متغیر |
| Continuous random variable | مسلسل تصادفی متغیر |
| Probability distribution | احتمالی تقسیم |
| Expected value | متوقع قدر |

Additional unbanked vocabulary used in this draft is listed here for owner review, not silently added to the bank:

| English | Proposed Urdu |
|---|---|
| Probability | احتمال |
| Random process / chance process | اتفاقی عمل |
| Outcome | نتیجہ |
| Discrete / continuous | منفصل / مسلسل |
| Frequency | تعدد |
| Relative frequency | نسبتی تعدد |
| Frequency table | تعددی جدول |
| Mean | اوسط |
| Weighted mean | وزنی اوسط |
| Mode | منوال |
| Long-run average | طویل مدت کا اوسط |
| Density | کثافت |
| Density curve | کثافت کی منحنی |
| Interval | وقفہ |
| Rounding | قریب ترین عدد تک لکھنا |
| Symmetry / symmetric | تناظر / متناظر |
| Fair coin / die | بے عیب سکہ / پاسہ |
| Independent | آزاد |
| Bar chart | ستونی خاکہ |
| Analyze / Evaluate | تجزیہ کرنا / قدر پیمائی کرنا |

## Validation and limits

- At the initial clean checkout, `npm run check:content` passed 12 of 13 gates. Its only finding was missing generated `static/content-status.json`; see `check-content-main.txt`. This run used the exact `origin/main` commit and preceded translation edits.
- The draft run before generating that artifact had exactly the same finding as main. `npm run build:content-status` then generated the ignored local JSON using `report-content-status.mjs`; this is not a Docusaurus build. The subsequent content run passed all 13 gates. See `check-content-generated-status.txt` and the final rerun in `check-content-final.txt`.
- Temporary `reviewed` probes exercised file/heading parity, figure parity and bank conformance. The first probe found only the deliberately open G4/G5 stages plus the missing local status artifact. The final probe was run with the local status artifact present; expected G4/G5 and temporary status-artifact mismatch findings are recorded in `check-content-parity-final.txt`. Both index files were restored byte-for-byte afterwards. No status or tracker evidence was fabricated to bypass those checks.
- A draft check caught G2 freshness after a descriptive edit to the English figure manifest. That edit was reverted; the final manifest is byte-identical to the baseline. The diagnostic is retained in `check-content-before-manifest-restore.txt`. Validation records live in this designated evidence folder and do not alter the English review inputs.
- Direct source comparison passed file sets, invariant front matter, heading-level vectors, component/import counts, numbered items, table shapes, figure IDs, localized sources, description/alt equality and bank membership. All four Urdu bodies compile with `@mdx-js/mdx`. Table comparison normalizes one physical line wrap in the inherited English ERQ 2 rubric; no English text was changed. See `structural-check.txt`.
- The assessment preserves 10 MCQs, 10 restricted-response questions, 5 extended-response questions, model answers, rubric bands, marks and word limits. Translator MCQ self-check gives A/B/C/C/B/B/B/A/B/B, mapped to الف/ب/ج/ج/ب/ب/ب/الف/ب/ب. This is a translator check, not independent G5 evidence.
- Four Urdu SVG sources are 3.1-4.9 KB, below 20 KB each. `figures:variants:check` passed for all 922 sources, including the four new Urdu assets. Light-source optimization, XML parsing and derived dark freshness were checked.
- Local Sharp raster previews were inspected using the installed Noto Nastaliq Urdu font, serially through `scripts/heavy.sh` after checking memory. Preview-only buffers resolved existing palette variables for Sharp; committed SVGs retain their required token block. Inspection prompted extra heading clearance in the concept map and isolation of the expected-value formula. These previews are not browser, narrow-page or A4 evidence.
- The crew brief prohibits a Docusaurus build, dev server and Playwright. None ran. Actual page rendering at desktop/narrow widths and A4 print, including browser SVG text geometry, remains pending for an authorized non-production host. No uncertainty about terminology or rendering is presented as accepted review.

## Next owners

The curriculum owner settles the unbanked vocabulary. A separate independent reviewer must settle G3 for this exact English baseline before G5 acceptance can bind to it. A fresh G5 session must compare every passage, assessment and figure, and inspect actual Urdu page rendering. The unit's existing advisory English review already calls for a non-production render host. No Paperclip issue was supplied or changed.

Drafting-to-final-validation interval: approximately 9 minutes from the first draft-body file, excluding initial baseline reading. This is not a human review measurement.
