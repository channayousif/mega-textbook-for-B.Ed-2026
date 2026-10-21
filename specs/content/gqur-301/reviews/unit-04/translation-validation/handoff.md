# GQUR-301 Unit 4 translation handoff

- English baseline: `f3cd24e09af22b06a4ea1d9a15e8374a1d47b268`, also `origin/main` when this job began. The checkout was clean and `git log origin/main..HEAD` was empty. English content is unchanged.
- Complete draft mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`, `unit-teacher-notes.mdx`, resolved with `resolveUnit` and written with `urPathFor`.
- Figures: all four `.ur.svg` files and generated `.ur.dark.svg` counterparts are wired to the Urdu topics. Descriptions, titles, labels, caption text and credits are localized. Flowchart paths and the computation columns read from the right; numerical axes keep increasing left to right. Original English assets, prompts and manifest rows are unchanged. Optimized Urdu light assets are 4.1-5.4 KB, below 20 KB.
- All front-matter invariants, five heading vectors, component imports/counts, figure IDs/kinds/dimensions, glossary lookup keys and numbered lists match. Assessment retains 10 MCQs, 10 RRQs, 5 ERQs and final bounded answers with identical scoring. MCQ mapping is B/B/A/B/B/B/A/B/B/B, rendered ب/ب/الف/ب/ب/ب/الف/ب/ب/ب. Computation items were rechecked from Urdu.
- `translation_status` remains `draft` throughout both languages. G3/G5 are unchanged and open. The existing G4 row has a progress note only, with its open status and empty reviewer retained; no completed row or certification was appended. The skill's Step 7 prohibits a completed G4 transition in this translation session.

## Terminology working set and owner proposals

The frozen bank was consulted, not modified. The Urdu index declares only banked pairs: Assessment = تشخیص; Summative Assessment = مجموعی جائزہ; Learning Outcome = نتیجہ ہائے تعلم. Other banked terminology used includes Formative Assessment = تشکیلی تشخیص; Self-Assessment = خود جائزہ; Rubric = معیارِ جانچ; Group Work = گروہی کام; Teaching Strategy = حکمتِ تدریس. The `Mean` and `Median` glossary keys and their existing Urdu definitions were inspected and preserved.

The bank has no statistical entries for this unit. Proposed technical labels, for owner consideration and independent G5 checking:

| English | Urdu used |
|---|---|
| Measure of central tendency | مرکزی رجحان کی پیمائش |
| Mean / arithmetic mean | حسابی اوسط |
| Mean of a frequency table | تعددی جدول کی اوسط |
| Median | وسطانیہ |
| Outlier | غیر معمولی قدر |
| Robustness of the median | وسطانیہ کی پائیداری |
| Data | اعداد و شمار |
| Raw data | خام اعداد و شمار |
| Frequency | تعدد |
| Frequency table | تعددی جدول |
| Balance point | توازن کا نقطہ |
| Fair sharing | منصفانہ تقسیم |
| Skewed data | ترچھے اعداد و شمار |
| Symmetric data | دونوں طرف متناسب اعداد و شمار |
| Long tail | ایک طرف لمبی دُم |
| Mode | منوال |
| Number line | عددی لکیر |
| Dot plot | نقطہ جاتی خاکہ |
| Deviation | انحراف |

The first six follow the unit concept graph. These are proposals, not additions to the approved bank. No unresolved mathematical meaning was guessed; semantic fidelity and term suitability still need independent review.

## Validation and baseline comparison

- `origin-main-content-gates.txt`: actual pre-edit `npm run check:content` run at the baseline above. Twelve of thirteen gates pass; `check:content-status` fails because ignored generated `static/content-status.json` is missing.
- `temporary-reviewed-content-gates.txt`: both indexes temporarily set to `reviewed` to activate parity. Content/heading parity, figures and terminology pass. Pipeline reports exactly the expected open G4 and G5 stages. Content-status reports the same baseline failure. Both flags were restored immediately after the run.
- `draft-content-gates.txt`: restored draft run has the same sole missing-content-status finding as the baseline. No new findings.
- `structural-parity.txt`: explicit checks cover invariants that are otherwise silent for drafts, including components, glossary keys, assessment counts and key correspondence.
- SVG optimization and `npm run figures:variants:check` pass for all four localized figures. `git diff --check` passes.

## Pending, next owner

The crew brief expressly forbids build, dev server and Playwright. Consequently no rendered desktop, 360px or A4 inspection, screenshot or text-geometry evidence is claimed here. A fresh independent G5 reviewer must inspect actual rendered Urdu, particularly tall Nastaliq labels/captions and the embedded arithmetic. Prior English advisory F1/F2 concern background-card proximity to the wordmark on figures 3 and 4; Urdu wordmarks are mirrored, but their actual clearance still needs rendered inspection. Review qualification and accepted G3 dependency remain the review owner's responsibility.

This is translation output and deterministic validation, not a G5 review or a publication action. No push or PR is requested. Paperclip ticket: none supplied.
