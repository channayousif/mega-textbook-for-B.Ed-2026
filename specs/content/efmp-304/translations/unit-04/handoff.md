# EFMP-304 Unit 4: G4 translation handoff

Date: 2026-10-17. Translator: Codex, crew job `efmp-304-u04-translate`.
English baseline: `65d2428e170574f474b50d20cefdf722ef389d19` (`origin/main` at task start).

The existing Urdu prose was retained and compared against the six corresponding English
pages: `index.mdx`, `topic-01.mdx` through `topic-04.mdx`, and `unit-assessment.mdx`.
Completed translated Bloom summaries and weighting notes, localised topic/unit labels,
normalised banked terminology, and expanded the Urdu index's bank-bound `key_terms`.
MCQ options and answer references use الف، ب، ج، د in the original order; the answers
remain in the final bounded section. The independently solved translation self-check
matched the English MCQ sequence: B, B, C, B, B, B, B, B, B, C. This is a translator's
self-check, not independent G5 evidence.

All eight English schematics now have translated, horizontally mirrored `.ur.svg` twins
and generated `.ur.dark.svg` variants. Urdu page alts equal the corresponding SVG
`desc` strings. English prose, prompts, assets and manifest rows were retained.

## Terminology working set

The Urdu index declares the bank's exact spellings for Learning, Development, Attention,
Summative Assessment, Self-Assessment, Critical Thinking, Lesson Plan, Validity,
Reflective Thinking, Reflective Process, Reflective Practice, Reflective Journal,
Reflective Cycle, Experiential Learning, Technical Reflection, Contextual Reflection,
Dialectical Reflection, Rubric, Group Work and Assessment.

All English Glossary keys are preserved, including their original capitalisation:
`Reflective thinking`, `Reflective process`, and `Reflective Practice`. Their existing
Urdu glossary definitions were consulted; no shared glossary or bank was edited.
The concept graph's seven labels were consulted as the unit's terminology baseline.

Unbanked specialised labels used in the unit, proposed for owner consideration:

| English | Urdu used |
|---|---|
| Reflection-in-action | عمل کے دوران غور و فکر |
| Reflection-on-action | عمل کے بعد غور و فکر |
| Critical friend | تنقیدی دوست |
| Action research | ایکشن ریسرچ |
| Disrupted expectation | ٹوٹی ہوئی توقع |
| Re-examination | دوبارہ جانچ |
| Claims vs evidence (reflection) | دعوی بمقابلہ شہادت (تامل) |
| Stages of the reflective process | تاملی عمل کے مرحلے |
| Levels of reflection | تامل کی سطحیں |
| Activities promoting reflection | تامل کو فروغ دینے والی سرگرمیاں |

These are proposals, not additions to the frozen bank. No unresolved translation choice
is being represented as owner-approved terminology.

## Validation and remaining work

- Final draft `npm run check:content`: all 13 gates pass after generating the ignored
  local content-status artifact with `npm run build:content-status`.
- Clean detached `origin/main` check: 12 gates pass; its sole failure is the same missing
  ignored `static/content-status.json` reported in this checkout's first run.
- Temporary `reviewed` check: file/heading parity, figure parity and declared terminology
  pass. The pipeline reports only unfinished G4/G5 rows. Both index files were restored
  to `draft`; no reviewer status or initials were fabricated.
- Direct comparison: all six filenames, heading-level vectors, invariant front matter,
  component counts and Glossary keys match. Assessment bands contain 10/10/5 questions
  and 40 ordered Urdu option labels. All eight asset paths and alt/desc pairs match.
- SVG optimisation: each source is below 20 KB. Scoped dark-variant freshness passes.
- Chromium standalone figure inspection used the installed Noto Nastaliq Urdu face.
  The contact sheet was visually inspected; all eight figures were also checked for text
  beyond all four viewBox edges, with zero findings. Browser sessions were closed.
- Full-page desktop, narrow viewport and A4 print inspection remains for the next reviewer:
  the crew brief forbids a local build or dev server. Standalone SVG inspection does not
  replace that check. No build or server was run.

`translation_status` remains `draft` on every page in both locales. The G4 tracker row
records this work with its existing in-progress status. The old advisory G5 report predates
these changed translation inputs and cannot certify them; fresh independent G5 is required.
The curriculum owner owns terminology decisions; a fresh independent reviewer owns G5 and
full-page RTL/print inspection. No Paperclip issue was updated; the figure work relates to
the pre-existing TEX-49 gap for Unit 4 only.

Translation duration was not instrumented in this continuation, so no rate estimate is claimed.
