# EFMP-407 Unit 2 - Draft translation handoff

Translator: agent:codex. Date: 2026-11-07. This is a translation work record, not a review report or gate certification.

## Baseline and delivered files

Translated from checkout `e24d9e2b2db80d8cb5c2e3d3c13f024ba11c1746`. The last English unit content commit is `ec48c1b9c94996898d4334ffaeae23ae9eb47b53` (`feat(content): author EFMP-407 unit 2 in English`). G2 is recorded green; G3 remains an unsigned advisory escalation. An accepted G3 for the exact English inputs is still required before G5 acceptance.

The resolved Urdu unit directory is `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-02/`. It contains the complete six-file mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `unit-assessment.mdx`, and `unit-teacher-notes.mdx`.

All six schematic figures have translated title, description and labels in `static/img/figures/efmp-407/unit-02/fig-U2-{1..6}.ur.svg`, with six derived `.ur.dark.svg` twins. Tables, flowchart and water-system arrows read right to left. Figure IDs, kinds, English prompts and English alt text remain unchanged. The existing English manifest's statement that Urdu is a separate job is historical; this record supplies the outcome without editing an input bound to G2.

The 10 MCQ, 10 RRQ and 5 ERQ bank, option order, scoring, rubrics, topic tasks and final bounded public self-study answers are mirrored. English citation identifiers and destinations remain intact. No Glossary component occurs in the English unit, so none was added and `glossary.json` was not changed.

## Frozen terminology working set

The bank was read before drafting. These bank entries occur in the English unit (including inflected pedagogical contexts and bibliographic titles). Accepted alternatives are chosen consistently.

| Bank entry | Accepted Urdu used or relevant context |
|---|---|
| Learning | سیکھنا |
| Development | نشوونما when referring to learner development; the compound sustainable development is translated پائیدار ترقی, not treated as developmental psychology |
| Assessment | تشخیص |
| Summative Assessment | مجموعی جائزہ |
| Curriculum | نصاب; English publication titles retain bibliographic wording |
| Lesson Plan | سبقی منصوبہ |
| Attention | توجہ |
| Attitude | رویہ |
| Environment | ماحول |
| Critical Thinking | تنقیدی سوچ |
| Rubric | معیارِ جانچ |
| Self-Assessment | خود جائزہ |

The Urdu index declares six bank-backed key terms. Every declared pair was checked against `terminology.csv`, including the accepted self-assessment pair. The bank itself was not edited.

## Proposed terms for the curriculum owner

These are working translations used in this draft, not additions to the frozen bank. Full concept labels already authored in `concepts/unit-02.md` also need independent register review. The domain label عملی and the feedback term باز اثر especially deserve a consistency decision across the ESD course.

| English | Proposed Urdu |
|---|---|
| Education for Sustainable Development (ESD) | پائیدار ترقی کے لیے تعلیم |
| Sustainable development / sustainability | پائیدار ترقی / پائیداری |
| UNESCO / framework | یونیسکو / خاکہ |
| Learning domain | سیکھنے کا شعبہ |
| Cognitive / socio-emotional / behavioural | ادراکی / معاشرتی و جذباتی / عملی |
| Competency / cross-cutting competencies | صلاحیت / مشترک صلاحیتیں |
| Systems thinking | نظامی سوچ |
| Anticipatory thinking | پیش بینی کی سوچ |
| Normative thinking | اقدار پر مبنی سوچ |
| Strategic thinking | حکمت عملی کی سوچ |
| Collaboration / self-awareness | تعاون / خود آگاہی |
| Integrated problem-solving | مربوط مسئلہ حل کرنا |
| Environmental education (EE) | ماحولیاتی تعلیم |
| Trade-off | فائدے اور نقصان کا تبادلہ |
| Transformative learning | تبدیلی لانے والا سیکھنا |
| Assumption / system boundary | مفروضہ / نظام کی حد |
| Stock / flow | ذخیرہ / بہاؤ |
| Inflow / outflow | اندر آنے والا بہاؤ / باہر جانے والا بہاؤ |
| Feedback loop | باز اثر کا چکر |
| Balancing loop | متوازن کرنے والا چکر |
| Delay | تاخیر |
| Learner agency | سیکھنے والے کا اختیار |

## Validation and limitations

- `origin/main` was archived under `.crew/baseline/`, given its own Git index referencing the exact main tree, and checked with the shared installed dependencies. After generating its ignored content-status file, all 14 content gates passed. The initial archive-only attempt had invalid Git manifest context; that attempt is not the baseline result.
- `npm run check:content` passed in draft state. With both index flags temporarily at `reviewed` and content status regenerated, 13 gates passed; pipeline-gate reported exactly the expected open G4 and G5 rows for Unit 2. No file-set, heading-vector, figure or terminology finding remained. Both flags were then restored to `draft`.
- All six Urdu SVG sources were optimized to approximately 2.9-4.5 KB each. `figures:variants` derived their dark twins and `figures:variants:check` passed.
- Static light-theme previews of all six figures were rendered serially with Sharp through `scripts/heavy.sh`, after checking available memory, and visually inspected for Nastaliq shaping, RTL sequence and obvious clipping. These previews are not browser geometry evidence.
- Builds, dev servers, Chromium/Playwright, `measure-figure-text.mjs`, and rendered Urdu page inspection were not run because the crew brief prohibits them. CI or an authorized follow-up host must measure all six Urdu SVG sources and inspect desktop, 360px, keyboard table scrolling and A4 print, including dark variants.
- All six Urdu MDX bodies also compile using the installed `@mdx-js/mdx` compiler, without running a site build. Source comparisons preserve heading levels, imports/components, figure identities, link destinations, reading-minute metadata and assessment counts. The translator solved the Urdu MCQs independently of the displayed key, then confirmed option and response correspondence with the English bank. This is translator checking, not independent assessment review.

`translation_status` remains `draft` in both locales because G5 has not accepted the translation. No G3/G5 status, qualification, signature, publication or catalog state was changed. Following translate-unit Step 7, no G4 tracker row was appended or flipped. The existing open G4/G5 rows remain. A fresh independent reviewer must receive the frozen inputs, not the translator's reasoning as review instructions.

Elapsed translation and local checking time was approximately 15 minutes; rendered checking and independent review are excluded. Term choices above remain proposals until the owner resolves them.
