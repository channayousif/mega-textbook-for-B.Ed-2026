# GQUR-301 Unit 7 Urdu draft handoff

- Translator: agent:codex, crew/gqur-301-u07-translate-r1, 2026-10-25.
- English baseline: `27261f5971fba7cf087798c5a5e26b99e7ed3659` (origin/main); last unit prose repair: `2b956061f3e258bdacad88c6be10e332a5bb8de8`.
- Completed the existing untracked attempt rather than restarting it. Five same-named MDX mirrors: index, topics 01 and 02, unit assessment and teacher notes. Translated all passages, options, model answers, scoring tables, captions and alt text. Preserved the repaired RRQ 9/10, ERQ 2/4 and Topic 7.2 ID example.
- Four Urdu schematic sources plus four derived dark variants. Horizontal coordinates mirrored with `mirror-figure-rtl.mjs`, including the tree, tables and wordmark. IDs, kinds, viewBoxes and MDX dimensions preserved. Urdu descriptions equal their MDX alt strings. SVG sources optimized to 5.5-10.0 KB.
- `input-digests.json` identifies the source and translation bytes. This is a translator handoff, not signed review evidence.

## Terminology working set

The frozen bank was read before completing the translation. Existing bank terms used in the mirror and declared in `key_terms`: Learning Outcome = نتیجہ ہائے تعلم; Summative Assessment = مجموعی جائزہ; Self-Assessment = خود جائزہ; Rubric = معیارِ جانچ; Assessment = تشخیص; Teaching Strategy = حکمتِ تدریس. Formative Assessment = تشکیلی تشخیص is used in the teacher notes. Accepted pairs retain one consistent choice.

The five English Glossary keys retain their exact attributes and bilingual definitions from `glossary.json`; their visible children are Urdu. No glossary or bank edits were made.

Proposed terms for owner confirmation, absent from terminology.csv, follow the existing concept graph and glossary meanings:

| English | Urdu used |
|---|---|
| Outcome | نتیجہ |
| Counting principle | شمارشی اصول |
| Systematic listing | منظم فہرست سازی |
| Addition rule of counting | گنتی کا جمع کا اصول |
| Overlapping groups | باہم مشترک گروہ |
| Multiplicative rule | ضرب کا اصول |
| Tree diagram | درختی خاکہ |
| Choosing to add or multiply | جمع یا ضرب کا انتخاب |
| Permutations | ترتیبات |
| Combinations | انتخاب |

These are proposals, not additions to the approved bank. No unresolved numerical or instructional meaning was silently repaired in English.

## Validation and next owner

- `check-content-main.log`: all 13 gates pass on an origin/main archive, with Git metadata directed to the unchanged baseline index so committed-input checks can run. The first archive-only attempt could not validate committed inputs and was discarded as an invalid comparison.
- `check-content-reviewed-probe.log`: both indexes temporarily set to reviewed; structural parity, figures and terminology checks pass. Only the deliberately open G4/G5 rows and the generated content-status discrepancy fail. Both indexes restored to draft. No review or completion was claimed.
- Direct file comparison: metadata, heading vectors, component/import counts, glossary keys and figure identities match; all five Urdu MDX bodies compile. Assessment bands contain 10 MCQ, 10 RRQ and 5 ERQ items, with preserved option order and scoring. Translator self-check MCQ sequence: ب، ج، د، الف، ب، ج، الف، د، ب، ج. This is not answer-blind independent review.
- `check-content-final.log`: all 13 final draft gates pass, matching the clean baseline. The first draft rerun found the content-status tracker digest stale after the G4 note changed. Regenerated `static/content-status.json` with build:content-status; this required derived artifact changes no publication or gate state. Dark variants checked with FIGURE_ROOT restricted to this unit.
- Crew brief forbids build, dev server and Playwright. No rendered desktop, 360px, SVG text measurement or A4 inspection was performed. The next authorized rendering session must inspect Nastaliq label fit, tree labels, bidi arithmetic, table reading order and print layout. Source inspection and MDX compilation do not prove rendered legibility.
- `translation_status` remains draft everywhere because G5 has not accepted this bundle. Updated only the note in the existing open G4 tracker row; no appended row, done mark, initials or signature, per translate-unit Step 7.
- Curriculum owner / fresh independent reviewer owns G1 and G3 dependencies, followed by independent G5 and rendered evidence. Existing author-run provenance and real-school-data ERQ 4 review concerns remain open; this translation certifies neither.
- Work was continued from an earlier draft; total translation time across attempts is unknown, so this run is not a reliable fresh-unit rate measurement.
