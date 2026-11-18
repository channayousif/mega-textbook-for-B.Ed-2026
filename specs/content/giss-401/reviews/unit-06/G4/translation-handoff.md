# GISS-401 Unit 6 Urdu translation handoff

Date: 2026-11-06. Translator: agent:codex. Stage: G4 drafting, not G5 review or certification.

## Baseline and delivered files

English baseline: `ed24f4949c21658596960f6852c8a1b857817b2e`, identical to `origin/main` when this job began. No earlier translation commits or working-tree changes were present. The English G2 rows are green; the independent G3 report is advisory pass, not signed acceptance. No English content, existing evidence, manifest rows, publication state or review status was changed.

The complete same-name mirror is at `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-06/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx` and `unit-assessment.mdx`. No teacher-notes page exists in the baseline. Topic titles use `موضوع 6.N - ...`. Reading minutes, identifiers, weighting, heading levels, component counts, figure IDs and citation destinations match the baseline. The assessment retains 10 MCQs, 10 RRQs and 5 ERQs, option order, marks, model answers and the final bounded answers section. The translator's Urdu MCQ solve matched the translated guidance in all ten positions; this is a drafting check, not an independent review.

Six `.ur.svg` sources and their six derived `.ur.dark.svg` variants are wired to the matching topics. English asset IDs, prompts and alt text remain unchanged. Urdu tables read from the right, and the vertical timeline retains chronological order with its axis on the right. Nastaliq-first fonts, translated labels and descriptions, mirrored wordmarks and spaced wrapped labels are included. No raster illustrations were needed.

## Frozen-bank working set

The case-insensitive whole-term scan of the English baseline found these bank entries. The Urdu index declares them with accepted spellings, plus the bank's rubric term used in the assessment.

| English | Accepted Urdu used |
|---|---|
| Learning | سیکھنا |
| Development | نشوونما |
| Assessment | تشخیص |
| Summative Assessment | مجموعی جائزہ |
| Memory | یادداشت |
| Attention | توجہ |
| Group Work | گروہی کام |
| Self-Assessment | خود جائزہ |
| Rubric | معیارِ جانچ |

There are no `<Glossary>` calls in the English unit, so no glossary definitions or keys were added or removed. The concept graph's ten Urdu labels informed the translation. Neither the frozen terminology bank nor `glossary.json` was changed.

## Proposed terminology for the owner

These subject-specific terms or concept phrases have no exact bank entries. The following are translation proposals, not additions to the bank or approved terminology. The curriculum owner and independent G5 reviewer should resolve their suitability and consistency across GISS-401.

| English | Proposed Urdu |
|---|---|
| Ilm / Knowledge | علم |
| Hikmah / Wisdom | حکمت |
| Culture | ثقافت |
| Civilization / Islamic civilization | تہذیب / اسلامی تہذیب |
| Human rights | انسانی حقوق |
| Dignity | وقار / انسانی وقار |
| Justice | انصاف |
| Peace | امن |
| Tolerance | رواداری |
| Coexistence | بقائے باہمی |
| Scholarly contribution and attribution | علمی خدمات اور درست نسبت |
| Institutions and cultural exchange | ادارے اور ثقافتی تبادلہ |
| Historical scope and continuing scholarship | تاریخی دائرہ اور علمی کام کا تسلسل |
| Scientific inquiry and method checks | سائنسی تحقیق اور طریقے کی جانچ |
| Verification and immediate protection | تصدیق اور فوری تحفظ |

The remaining concept labels are plain combinations used in the graph: تعلیم کا مقصد اور ذمہ داری، استاد اور طالب علم کی باہمی ذمہ داریاں، علم اور حکمت، انسانی وقار اور حقوق میں منتخب مماثلتیں، رواداری اور بقائے باہمی۔ All need independent register and meaning review; none is self-approved here.

## Checks and limits

- `npm run check:content` on the untouched baseline: all 14 gates passed, so there were no inherited failures to exempt.
- Temporary `reviewed` flip of both indexes: file/heading parity, figures, SVG style, terminology and every other applicable content check passed. Only the expected two pipeline findings remained: Unit 6 G4 and G5 rows are not done. The generated, ignored content-status report was refreshed during the flip to remove a stale-report finding.
- Both indexes were restored to `draft`, and the generated report refreshed again. Final `npm run check:content`: all 14 gates passed.
- All five Urdu MDX bodies compiled with `@mdx-js/mdx`. Separate comparisons passed for fixed front matter, heading-level vectors, all six named pedagogical component types and Markdown citation destinations.
- SVG optimisation passed for all six Urdu sources, each under 6 KB. `npm run figures:variants:check` passed globally. Twelve light/dark PNG previews were rendered serially with Sharp under `scripts/heavy.sh` after checking available memory and visually inspected. Preview-only CSS-variable resolution did not alter the committed token blocks.
- The crew brief explicitly prohibits builds, dev servers and Playwright/Chromium. Consequently no build, browser layout check, A4 page inspection or `measure-figure-text.mjs` run was attempted. Sharp previews are not browser geometry or G5 render evidence. CI or the next permitted validation session must measure the actual SVGs and inspect all Urdu pages at desktop, narrow and A4 sizes.

## Status and next owner

`translation_status` remains `draft` in every page in both languages. The draft badge remains visible for the Urdu mirror. G3 and G5 remain open and unsigned. The current `translate-unit` skill, Step 7, explicitly says: "Do not append a `G4 ur-translation` tracker row". Therefore the existing open G4 row is retained, and this handoff records the delivered draft instead of claiming a completed gate or changing tracker certification metadata.

The next independent reviewer needs accepted G3 evidence for the exact English baseline before G5 can be accepted, including the qualified Islamic Studies review and the unresolved independent full-UDHR retrieval noted by the English jobs. This job translates the existing selected comparisons; it does not resolve those source limitations or add rulings. No further semantic uncertainty was resolved by altering the English baseline. G5 must examine passage-level meaning, epistemic force, assessment equivalence and actual rendering independently.

Approximate main-session drafting and checking time: 20 minutes, including source reading, five pages, six localisations, preview corrections and repeated gates. This is a single-unit drafting observation, not an estimate of independent review time.
