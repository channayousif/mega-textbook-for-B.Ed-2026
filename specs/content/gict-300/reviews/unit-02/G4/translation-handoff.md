# GICT-300 Unit 2 G4 translation handoff

Date: 2026-10-18. Translator: Codex. Branch: `crew/gict-300-u02-translate-r1`.
Checkout baseline: `4484e36ab9ba3c7bb20d8a49d45a78bed37419b6`. English unit last changed at `37fcef38`.
The existing translation was continued, not replaced. English prose is unchanged.

## Delivered bundle

All seven files under `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-02/`:
`index.mdx`, `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `topic-04.mdx`,
`unit-assessment.mdx`, and `unit-teacher-notes.mdx`.
All eight figure pairs under `static/img/figures/gict-300/unit-02/`:
`fig-U2-1` through `fig-U2-8`, each with `.ur.svg` and generated `.ur.dark.svg`.

Repaired literal translations of device families and hierarchy rungs, dashed-line descriptions,
slow-speed label, boot-step agreement, switch/router agreement, spelling, rubric wording,
and English author-year citation names. Retained volatile/non-volatile as عارضی / غیر عارضی
with explicit power-loss definitions. No items, options, marks, Bloom levels, examples or
source qualifications were removed. Urdu MCQ answers in order are ب، ج، ب، ب، الف، ب، ب، ب، ج، ب,
matching the English options without reordering. The question bank remains 10/10/5 and its
answers remain in the final bounded section.

## Terminology working set

The declared `key_terms` now contain only frozen bank entries used in this unit:
Assessment = تشخیص; Self-Assessment = خود جائزہ; Rubric = معیارِ جانچ.
The former 14 computing entries remain translation proposals, not bank-approved declarations.
The frozen bank and shared glossary were not edited. Glossary attributes remain English keys.

| Proposed English term | Proposed Urdu term |
|---|---|
| Input device | ان پٹ ڈیوائس |
| Output device | آؤٹ پٹ ڈیوائس |
| Storage device | اسٹوریج ڈیوائس |
| RAM | ریم |
| ROM | روم |
| Secondary storage | سیکنڈری اسٹوریج |
| System software | سسٹم سافٹ ویئر |
| Operating system | آپریٹنگ سسٹم |
| Application software | ایپلیکیشن سافٹ ویئر |
| Utility software | یوٹیلیٹی سافٹ ویئر |
| Computer network | کمپیوٹر نیٹ ورک |
| Switch | سوئچ |
| Router | روٹر |
| Protocol | پروٹوکول |

Additional unbanked technical forms requiring owner terminology intake include Random Access
Memory (رینڈم ایکسیس میموری), Read Only Memory (ریڈ اونلی میموری), primary memory
(پرائمری میموری), working memory (ورکنگ میموری), storage hierarchy (اسٹوریج کی درجہ بندی),
peripheral (پیریفرل), solid state drive (سولڈ اسٹیٹ ڈرائیو), network interface
(نیٹ ورک انٹرفیس), Wi-Fi (وائی فائی), productivity tools (پروڈکٹیویٹی ٹولز), boot sequence
(بوٹ کا سلسلہ), and client (کلائنٹ). The 15 concept labels in `concepts/unit-02.md` remain
owner proposals too. In particular CON:GICT-300-2-5 still says متغیر while the translation
uses عارضی; align it through an English evidence refresh, since editing that bound input
invalidates the current G2 manifest. The cognitive-psychology bank entry Working Memory
is not silently repurposed as an approved computing translation.

## Validation and boundaries

- Seven-file source comparison: same heading level vectors, components and glossary keys,
  figure IDs, course/unit/topic metadata, outcomes, reading times and draft status.
- Temporary reviewed check: content validation and bilingual figures passed; no key-term
  conformance finding. Pipeline reported the expected incomplete G4/G5 rows and stale G2
  manifest caused by the temporary index edit. Content-status was stale under that flip.
  Both indexes were restored to draft in a finally block. No approval metadata was changed.
- Figure variants: all 780 source variants current after regeneration.
- Final draft content gate result is recorded in the accompanying `content-gates.log`.
  Origin/main comparison at `230572e12b6c2a8f2e4693086ff1548575f49f80` passed all 13 gates
  after generating its ignored content-status report. Initial local missing report was
  resolved with `npm run build:content-status` (not a site build).
- No site build, dev server, Chromium or rendered inspection was run, as the crew brief
  prohibits builds and servers. Historical G5 screenshots are not evidence for these edits.
- `translation_status` remains `draft` in every file. G4 stays in progress; G3/G5 are
  unchanged and no certification or self-review acceptance is claimed.

## Pending owners

- Curriculum owner: bank the proposed computing terms and align concept labels with a fresh
  G2 manifest where needed. The shared glossary definition for Random Access Memory says
  محفوظ کیا گیا کام (saved work) where English says unsaved work. This shared-file defect
  is outside this unit-only scope and must be repaired before G5. Its RAM entry also uses
  متغیر, and System software has مشین خود کو چلاتا ہے; reconcile register in that same pass.
- English author/owner: the settled teacher notes name the barcode reader among two dual-role
  devices. That ambiguity is inherited verbatim, not corrected by the translator.
- Fresh independent reviewer: refresh applicable G3 dependency evidence, then inspect the
  revised Urdu passages, figures at desktop and 360px, and A4 print. Check longer dashed-line
  labels for fit and the remaining glossary register. G5 must be a separate session.
