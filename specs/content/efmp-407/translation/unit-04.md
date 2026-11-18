# EFMP-407 Unit 4 Urdu translation handoff

Prepared by agent:codex on 2026-11-07 from English baseline commit `e24d9e2b2db80d8cb5c2e3d3c13f024ba11c1746`. The branch contained no commits ahead of origin/main and already held untracked Urdu drafts and six Urdu SVGs. This pass continued those files, compared them with the English baseline, corrected meanings and terminology, and derived the six dark twins. English content is unchanged.

## Translation bundle

The complete same-named mirror is at `i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/`: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `unit-assessment.mdx`, and `unit-teacher-notes.mdx`. Topic titles retain `موضوع 4.1 -`, `موضوع 4.2 -`, and `موضوع 4.3 -`. Metadata identifiers, reading minutes, heading levels, component calls, imports, figure IDs, question order, marks and the 10/10/5 assessment blueprint match English. The final translated answers section remains bounded and public for self-study.

All six placed English schematics have wired `.ur.svg` sources and generated `.ur.dark.svg` twins under `static/img/figures/efmp-407/unit-04/`. Horizontal reading order is mirrored, Urdu labels use the Nastaliq-first font stack, and each SVG description equals its Urdu page alt. The English figure manifest rows, prompts and lifecycle remain unchanged. The banner fig-U4-7 remains outside this translation bundle at prompt-only.

Meaning corrections include rendering uncollected plastic/waste as material not picked up, rather than material not accumulating, in Topic 4.2, its figure and the assessment. The Topic 4.2 rubric now describes comparison of benefits and disadvantages rather than bargaining. The project definition preserves sustained investigation of a question. Collaborative learning uses the bank's باہمی تعلم.

## Terminology working set and proposals

The frozen bank was consulted without edits. The index declares accepted entries for Lesson Plan, Learning Outcome, Assessment, Group Work, Rubric, Self-Assessment and Summative Assessment. Relevant bank entries also include Learning, Memory, Attention, Environment, Practical Activity and Collaborative Learning. Development in the phrase sustainable development refers to ترقی, rather than the bank's child-development sense نشوونما; no bank change is proposed for that contextual difference. The English Glossary key `Lesson planning` and its existing `definition_ur` were retained. All nine concept-graph Urdu labels were consulted; the graph is unchanged.

Proposed specialised terms for the terminology owner, not additions to the frozen bank:

| English | Urdu used / proposed |
|---|---|
| Sustainability | پائیداری |
| Education for sustainable development | پائیدار ترقی کے لیے تعلیم |
| Project-based learning | منصوبے پر مبنی سیکھنا |
| Inquiry-based learning | تحقیق پر مبنی سیکھنا |
| Guided inquiry | رہنمائی میں تحقیق |
| Systems thinking | نظامی سوچ |
| System boundary | نظام کی حدود |
| Causal link | سببی ربط |
| Feedback loop | بازگشتی چکر |
| Reinforcing loop | تبدیلی کو تقویت دینے والا چکر |
| Futures thinking | مستقبل کے بارے میں سوچ |
| Probable / possible / preferable future | متوقع / ممکن / پسندیدہ مستقبل |
| Anticipatory competence | پیش بینی کی اہلیت |
| Delay | تاخیر |
| Claim, evidence and reasoning | دعویٰ، شواہد اور استدلال |
| Observable lesson outcome | قابلِ مشاہدہ سبق کا نتیجہ |
| Alignment and individual evidence | مطابقت اور ہر طالب علم کے سیکھنے کا ثبوت |
| Inclusive sustainability planning | سب کی شرکت کے ساتھ پائیداری کی منصوبہ بندی |

These are translation proposals for independent language review, not approved terminology. Ordinary Urdu wording is not being proposed as new technical vocabulary.

## Validation and remaining work

All pages retain `translation_status: draft`. The existing G4 row records work in progress, with no appended completion row. The translate-unit skill explicitly forbids the translator from marking G4 done or certifying G5. G3 and G5 remain open. A fresh independent G5 session must compare the actual frozen bundle after the English G3 dependency is accepted; this handoff is not review evidence.

Builds, dev servers, Playwright and Chromium were prohibited by the crew brief. Consequently actual desktop, 360px and A4 Urdu rendering, Nastaliq shaping, table scrolling and browser SVG text geometry remain uninspected. The mandatory `measure-figure-text.mjs` and `render-inspect.mjs` checks require a permitted session or CI. No visual pass is claimed from source inspection. All Urdu SVGs passed the SVG optimiser and 20 KB budget; dark variants are generated, not hand-authored.

The existing English G3 handoff still applies: the engineering owner must bind the Lim/Allan and UNESCO excerpts before final qualification, and provenance/render gaps remain open. No unresolved English content defect was identified in that advisory report. No publication, push or PR is authorised by this job.

## English baseline digests

SHA-256 of the unchanged English source files at handoff:

- `index.mdx`: `604f43b37e5784b7ea2b994c042c2a7bd77b072766f946c5290bf7781480497e`
- `topic-01.mdx`: `74cb9321db5026927159094166c1ccaa8416054f2783d73a354937d267d9b9f2`
- `topic-02.mdx`: `bd0c7ea3e37e2a32c2d9b5514edbb33f3d2f5dc07c4211efabfeadf141ba7235`
- `topic-03.mdx`: `ea36619b3d6e0dad21fff71bc76c10dd15178ae4fd9b5573c1c5a8268b7fd87f`
- `unit-assessment.mdx`: `f14b36927b3da53d7d15cb7391793b777171a77b0c81c037c18d6a8bc4333232`
- `unit-teacher-notes.mdx`: `61b45ba2a5b674ee4fde9b22e2eef8b2ca462b2a3565509e78179cbbb4296b7d`

## Deterministic check record

- Initial draft `npm run check:content`: all 14 gates passed.
- Temporary reviewed check after refreshing the ignored status report: 13 gates passed; pipeline gate reported exactly the unfinished Unit 4 G4 and G5 rows. No other finding. Both index files were restored byte-for-byte to draft in a finally block, then the ignored status report was refreshed again.
- `npm run figures:variants:check`: passed for all 1248 authored SVG sources.
- Direct source audit: six matching page names, metadata identifiers and reading minutes, heading vectors, component/import counts, six identical alt/desc pairs, 10/10/5 bank, and mapped MCQ letters passed. The translator also solved the Urdu MCQs and compared the choices with English; this is a self-check, not independent review.
- SVG optimisation: all six sources passed, approximately 3.6-6.8 KB each.
- Final draft `npm run check:content`: all 14 gates passed, exit 0, with no findings. No origin/main failure comparison was necessary.
