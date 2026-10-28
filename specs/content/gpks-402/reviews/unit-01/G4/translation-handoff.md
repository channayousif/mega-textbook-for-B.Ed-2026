# GPKS-402 Unit 1: Urdu translation handoff

- Translator: codex, crew job `gpks-402-u01-translate`, 2026-10-28.
- English baseline: `0bc193429b1b484ed1bcd9eb4d45fbbe1d28d14a` (`origin/main` and branch HEAD at start). English content and figures are unchanged.
- Complete mirror: `index.mdx`, `topic-01.mdx`, `topic-02.mdx`, and `unit-assessment.mdx` under `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-01/`, resolved through `resolveUnit()` and `urPathFor()`.
- Four schematic sources: `static/img/figures/gpks-402/unit-01/fig-U1-{1,2,3,4}.ur.svg`, with generated `.ur.dark.svg` twins. Horizontal coordinates and anchors mirrored with `scripts/mirror-figure-rtl.mjs`; Urdu labels use the Nastaliq-first stack. Each description equals its page alt. Each source is under 20 KB after SVG optimisation.
- `translation_status` remains `draft` throughout the committed bundle. G3 remains advisory and unsigned; G5 has not happened. No certification, publication action or done mark is recorded.

## Terminology working set

The following frozen-bank terms occur in the English unit, including general teaching terms. Inflected Urdu forms retain the same terms. The Urdu index declares the eight named banked historical/core terms; generic words in the table are not all technical labels in every English occurrence.

| Bank term | Accepted Urdu |
|---|---|
| Learning | سیکھنا |
| Assessment | تشخیص |
| Summative Assessment | مجموعی جائزہ / جامع تشخیص |
| Curriculum | نصاب |
| Lesson Plan | سبقی منصوبہ |
| Learning Outcome | نتیجہ ہائے تعلم |
| Memory | یادداشت |
| Stress | دباؤ |
| Critical Thinking | تنقیدی سوچ |
| Rubric | معیارِ جانچ |
| Self-Assessment | خود جائزہ / خود تشخیصی |
| Pakistan Studies | پاکستان کے مطالعہ |
| Two-Nation Theory | دو قومی نظریہ |
| Ideology of Pakistan | پاکستان کے نظریے |
| Quaid-e-Azam | قائدِ اعظم |
| Objectives Resolution | قراردادِ مقاصد |
| Lahore Resolution | قراردادِ لاہور |
| All-India Muslim League | آل انڈیا مسلم لیگ |
| Sir Syed Ahmad Khan | سر سید احمد خان |

All nine English Glossary calls retain their English lookup keys and imports. Definitions come from the existing `glossary.json`; no glossary or terminology-bank changes were made. The bank's unusual `پاکستان کے مطالعہ` and `پاکستان کے نظریے` are retained rather than silently replaced with more idiomatic compounds.

## Proposed terms for the owner and G5

No new term was added to the bank. These unbanked labels include the author's concept labels and additional translation terms; they remain proposals for independent language review:

| English | Urdu used |
|---|---|
| Ideology | نظریہ |
| National ideology | قومی نظریہ |
| National identity | قومی شناخت |
| Layered identity | تہ دار شناخت |
| Islamic concept of state | اسلامی تصورِ ریاست |
| Sovereignty | حاکمیت |
| Theocracy | مذہبی پیشوائی کی حکومت |
| National integration | قومی یکجہتی |
| Civics | شہریت |
| Constitutional safeguards | آئینی تحفظات |
| Separate electorates | جداگانہ انتخاب |

Longer authored labels, their prerequisites and assessment links remain in `concepts/unit-01.md`. The existing Urdu glossary definitions for Ideology, National identity, Sovereignty and Theocracy were read as the meaning baseline. No unresolved source meaning was silently changed. Citations, historical qualifications (including the debate over Iqbal's intended state), minority protections, question order, option order and scoring are preserved.

## Validation and limits

- Baseline: all 13 `npm run check:content` gates passed on the untouched checkout, identical to `origin/main`.
- Final draft: all 13 content gates passed after refreshing the ignored local `static/content-status.json` using `npm run build:content-status`. The tracker-note digest requires this normal refresh; no generated file is committed.
- Temporary conditional check: both indexes were set to `reviewed` only inside a try/finally validation script, then restored byte for byte. `validate:content` and `check:figures` passed with parity enabled; the pipeline reported only the unfinished G4 and G5 rows, with no terminology findings. `check:content-status` reported the expected stale generated status during the temporary change. The temporary state was not used to regenerate status data or review evidence.
- Direct source parity: identical file sets, heading-level vectors, invariant metadata, component counts, Glossary lookup keys, numbered-item counts and checklist counts. All declared key terms conform to the frozen CSV. The 10/10/5 assessment and 10 model responses retain their order and marks.
- MDX syntax: all four pages compiled directly with `@mdx-js/mdx`; this is a source syntax check, not a site build or rendering check. XML parsing passed for all eight Urdu SVG variants.
- Dark variants: `npm run figures:variants:check` passed across the repository.
- Browser geometry and rendered Urdu remain **unverified**: the brief prohibits build, servers and Playwright; `measure-figure-text.mjs` itself launches Playwright Chromium. No such command was run and no screenshot or rendering pass is claimed. Source checks cannot establish Nastaliq fit, clipping, RTL punctuation or A4 legibility.

## Next owner

The next permitted rendering job must run `scripts/measure-figure-text.mjs` on all eight Urdu SVG variants, fix any geometry findings, then build and inspect every Urdu page at desktop, narrow and A4-print sizes. Use `scripts/heavy.sh` and the memory check required by AGENTS.md. Independent G5 must compare every passage, solve the Urdu assessment, judge the proposed terms and inspect the rendered bundle. G5 certification still needs accepted G3 evidence for this exact English version and the ADR-0019 qualification/signing path; the current G3 advisory is not certification.

Translator records live under `reviews/unit-01/G4/` so they do not become new academic inputs or invalidate existing English evidence. They are not reviewer reports or certification.

The existing G4 row's note records the authored draft; its status and initials stay untouched and no new stage row is appended, following translate-unit Step 7. This handoff is translator provenance, not a review report.
