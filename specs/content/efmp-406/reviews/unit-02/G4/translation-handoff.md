# EFMP-406 Unit 2 Urdu translation handoff

Date: 2026-11-05. Translator: agent:codex. Job: efmp-406-u02-translate-r1.
English baseline: `322e0c7a61d179e92a8e4d51b8a11739e57b66bf` (origin/main at job start).
The branch started clean with no commits ahead of origin/main. This resumes the earlier blocked translation after English repairs, rather than translating the old RRQ wording.

## Delivered draft

All five English MDX files have complete same-named Urdu mirrors, located using `resolveUnit()` and `urPathFor()`:

- `index.mdx`: outcomes, prerequisites, reading order, study instructions and bank-bound `key_terms`.
- `topic-01.mdx`: critical and digital literacy, both worked examples, discussion, retrieval prompts, practicum task and mini-rubric.
- `topic-02.mdx`: media/information and visual/multimodal literacy, worked examples, activities, retrieval prompts, practicum task and mini-rubric.
- `unit-assessment.mdx`: full 10 MCQ / 10 RRQ / 5 ERQ bank and final bounded Urdu answers/marking section. The repaired MCQ 4/8, RRQ 2/3/9 and Topic 2.2 check item 2 are translated from this baseline. Options and answers correspond; marks, rubrics, cognitive levels and word limits remain equivalent.
- `unit-teacher-notes.mdx`: sequencing, misconceptions, practical work, assessment and feedback, with course and unit weights distinguished.

Four `.ur.svg` schematics and four generated `.ur.dark.svg` twins are wired into the topics. Every label/title/description is translated, horizontal coordinates and reading order mirrored, and each Urdu page alt equals its SVG description. English IDs, geometry, prompts, captions' attribution and assets are preserved. The RTL helper added end anchors to nested tspans even in centred text; these were corrected to middle anchors in the affected centred nodes.

No English content, source claim, bank, glossary, tracker status, signing evidence or publication state was changed. This handoff and its logs live under reviews/unit-02/G4 because translations/unit-02 is bound into existing English G2 evidence; changing the older blocked handoff there would invalidate that evidence. The historical blocked handoff is retained unchanged and superseded by this record. The English has no Glossary component; there is no translated lookup key to add. Urdu notes disclose pending review instead of incorrectly saying that no Urdu translation exists.

## Terminology for owner consideration

The frozen bank was not edited. Existing terms use its forms: سیکھنا، تشخیص، مجموعی جائزہ، نصاب، یادداشت، توجہ، گروہی کام، معیارِ جانچ، خود جائزہ، تاملی جریدہ. Ten matching entries are declared in Urdu `key_terms`; core literacy terms absent from the bank are deliberately excluded from that block. The English citation title also contains Reflective Practice, whose existing bank form is تاملی مشق.

The following are proposals, not bank approvals. Core labels follow the unit concept graph's Urdu candidates. The owner and independent G5 reviewer should settle the terminology, particularly کثیر طرز and the distinction between an information source and a delivery channel.

| English | Urdu used / proposed |
|---|---|
| Literacy | خواندگی |
| Critical literacy | تنقیدی خواندگی |
| Digital literacy | ڈیجیٹل خواندگی |
| Media | میڈیا |
| Media literacy | میڈیا خواندگی |
| Information literacy | معلوماتی خواندگی |
| Media and information literacy | میڈیا اور معلوماتی خواندگی |
| Visual literacy | بصری خواندگی |
| Multimodal literacy | کثیر طرز خواندگی |
| Purpose | مقصد |
| Audience | مخاطبین |
| Representation and voice | نمائندگی اور آواز |
| Power | طاقت |
| Observation and inference | مشاہدہ اور استنباط |
| Purposeful digital communication | بامقصد ڈیجیٹل ابلاغ |
| Digital identity | ڈیجیٹل شناخت |
| Information need and source fit | معلومات کی ضرورت اور ماخذ کی موزونیت |
| Independent confirmation | آزاد تصدیق |
| Claim / evidence / source | دعویٰ / ثبوت / ماخذ |
| Channel | ذریعہ |
| Currency | معلومات کا تازہ یا موجودہ ہونا |
| Mode | طرز، ابلاغ کا طریقہ |
| Layout | ترتیب |
| Relationships among modes | طرزوں کا تعلق، ابلاغ کے طریقوں میں تعلق |
| Accessible meaning | معنی تک رسائی؛ concept label: معنی تک قابلِ رسائی طریقے |
| Accessibility | رسائی کی سہولت |
| Access / evaluation / use / creation / participation | رسائی / جانچ / استعمال / تخلیق / شرکت |
| Privacy | رازداری |
| Transcript | تحریری نقل |
| Sponsorship | مالی معاونت |

Work-time note: approximately 20 minutes for translation, source checks and static figure inspection in this run, excluding independent review and the prohibited browser work.

## Validation and limitations

See committed logs in `logs/`:

- `check-content-origin-main.txt`: comparison against a detached origin/main checkout inside `.crew/`. The first baseline attempt lacked the ignored content-status cache; it was generated with `npm run build:content-status` before the recorded final comparison.
- `check-content-temporary-reviewed.txt`: all parity/figure/terminology checks were activated by temporarily setting both indexes to reviewed. Findings: expected unfinished G4/G5 rows; stale G2 English manifest because the English status bytes changed; stale ignored content-status cache because the temporary status changed its derived report. No missing file, heading, figure or terminology finding. Both original indexes were restored in a finally block. These temporary diagnostics are not accepted evidence and no tracker row was altered to silence them.
- `check-content-draft.txt`: final full 14-gate draft run, after restoring English inputs, moving the handoff out of the English-bound translations folder and regenerating the ignored status cache. An earlier draft run caught the bound handoff change and a forbidden English scoring phrase in that handoff; both were fixed before the recorded final run.
- `parity-self-check.txt`: same file set, heading vectors, invariant metadata, component counts, figure IDs/attributes/paths and matching alt/description, 10/10/5 questions and corresponding numbered answers/rubrics, Bloom tags, answer letters, bank conformance and MDX compilation.
- `figure-inspection.txt`: static light/dark visual inspection and variant freshness. The four optimised Urdu source SVGs are 3.1–4.6 KB each, under 20 KB.

The crew brief prohibits builds, dev servers and Playwright. Accordingly no build, browser, `render-inspect.mjs` or `measure-figure-text.mjs` ran. Static Sharp previews, with palette variables substituted only in the scratch render buffer, were inspected in both themes using the installed Noto Nastaliq Urdu font. They show shaped text, mirrored table order, return arrow and clear panel labels without visible collisions after the centred-tspan repair. This is not browser geometry or 360px/A4 page evidence. All scratch renders and the baseline checkout stayed within `.crew/`; heavy Sharp work was serial, memory-checked and wrapped by `scripts/heavy.sh`.

Final result: all 14 content gates PASS in both the final draft tree and origin/main. No additional finding remains. Local parity/MDX/bank checks and figure-variant freshness PASS. Exact delivered MDX/SVG digests are recorded in logs/translation-sha256.txt.

## State and next owners

`translation_status` remains `draft` in English and Urdu. Independent G3 acceptance for the repaired baseline, then independent G5 passage-level/assessment review with narrow-screen and A4 inspection, remain required. The coordinator owns the unresolved English source-excerpt bundle and real author run provenance from the earlier G3 handoff. An authorised browser host owns SVG geometry, the Urdu build and rendered-page checks. No semantic uncertainty was silently resolved by changing English or its scoring guidance.

No G4 row was appended or marked done: translate-unit Step 7 explicitly forbids it. The brief says to record the row "as the skill says", so this handoff records delivered translation without making a completion claim. G3/G5 remain open and unsigned. This supersedes the earlier blocked handoff's instruction to wait for RRQ 2/3/9 repairs, which are now present in the baseline.
