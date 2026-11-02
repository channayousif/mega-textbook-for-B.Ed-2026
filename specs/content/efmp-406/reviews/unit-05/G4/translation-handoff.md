# EFMP-406 Unit 5 Urdu translation handoff

Translator: codex, crew job `efmp-406-u05-translate`, 2026-11-02.

## Baseline and delivery

English content commit: `93a6ad9998978c1f4c4ae3c5c68319e7a0b47de5`.
Checkout baseline: `ddc9f9d940da5fea19f589eb76c75f61603cf1ee`.
The English unit is unchanged. G2 is recorded green; G3 has an advisory pass, remains unsigned and open, and is not accepted certification for G5.

Complete same-named Urdu drafts are at the mirror resolved by `resolveUnit('.', 'EFMP-406', 5)`:

- `index.mdx`: opening, outcomes, prerequisites, navigation, use instructions and bank-bound `key_terms`.
- `topic-01.mdx`: learner-centred teaching, inquiry and projects, examples, activities, both assessment cycles and references.
- `topic-02.mdx`: ICT integration, assessment and evaluation, EGRA, examples, activities, both assessment cycles and references.
- `unit-assessment.mdx`: summary, 10 MCQs, 10 restricted responses, 5 extended responses, full translated final answers and marking guidance, and five analytic rubrics.
- `unit-teacher-notes.mdx`: teaching sequence, discussion, misconceptions and practical work.

Four Urdu SVG sources `fig-U5-1.ur.svg` through `fig-U5-4.ur.svg` are wired into the topic pages. Their horizontal layouts were mirrored with `mirror-figure-rtl.mjs`; labels, titles and descriptions were translated, Nastaliq-first font stacks used, and line spacing increased. Each page alt equals the corresponding SVG description. Four dark variants were derived using the repository script. Source SVGs were optimised to 4.2-5.4 KB each, below 20 KB. English figure sources, manifest prompts and identifiers are unchanged.

## Terminology working set

Frozen bank checked without editing it. No English page uses a Glossary component, so no glossary keys or definitions needed localisation. The concept graph's Urdu labels were consulted.

| Bank term | Urdu used |
|---|---|
| Assessment | تشخیص |
| Formative Assessment | تشکیلی تشخیص |
| Summative Assessment | مجموعی جائزہ |
| Rubric | معیارِ جانچ |
| Curriculum | نصاب |
| Group Work | گروہی کام |
| Lesson Plan | سبقی منصوبہ |
| Self-Assessment | خود جائزہ |
| Reflective Journal | تاملی جریدہ |
| Classroom Assessment | جماعتی تشخیص |
| Rote Learning | رٹا لگانا |
| Learning Outcome | نتیجہ ہائے تعلم |

Proposed specialist terms not held in the bank, for the curriculum owner and independent G5 reviewer:

| English | Proposed Urdu |
|---|---|
| Literacy | خواندگی |
| Contemporary literacies | عصری خواندگیاں |
| Learner-centred literacy instruction | متعلم مرکز خواندگی کی تدریس |
| Teacher-centred instruction | استاد مرکز تدریس |
| Inquiry-based learning | تحقیق پر مبنی تعلم |
| Project-based learning | منصوبہ پر مبنی تعلم |
| Information literacy | معلوماتی خواندگی |
| Critical literacy | تنقیدی خواندگی |
| Digital literacy | ڈیجیٹل خواندگی |
| Media and information literacy | میڈیا و معلوماتی خواندگی |
| Visual literacy | بصری خواندگی |
| ICT / ICT literacy | آئی سی ٹی / آئی سی ٹی خواندگی |
| ICT integration | آئی سی ٹی کا انضمام |
| Literacy assessment | خواندگی کی تشخیص |
| Evaluation | قدر پیمائی |
| Reading record | ریڈنگ ریکارڈ |
| Portfolio | پورٹ فولیو |
| Observation | مشاہدہ |
| Test | آزمائش |
| Decoding | لفظ خوانی |
| Fluency | روانی |
| Comprehension | تفہیم |
| Self-correction | خود اصلاح |
| Inference | اخذ کرنا |
| Offline e-books | آف لائن برقی کتابیں |
| Brainstorming | ذہنی کاوش |
| Role-play / simulation | کردار نگاری / نقلِ صورت حال |

The concept graph currently uses جائزہ for evaluation. The translation instead proposes قدر پیمائی so that evaluation is distinct from the bank's مجموعی جائزہ for summative assessment. This is a proposal, not an owner-approved change to terminology or the concept graph. G5 should resolve it with the owner. Other concept labels retain their existing proposed meanings.

## Validation and limitations

- `npm run check:content`: all 13 gates pass in the final draft state, with no findings to compare against origin/main.
- Temporary `reviewed` flags on both index files exercised conditional parity, figure and terminology checks. The retry found only the expected open G4 and G5 pipeline rows and a transient `check:content-status` mismatch caused by the temporary flags. Both flags were restored to `draft`; the generated status file was not changed.
- Direct structural comparison passed for all five filenames, metadata invariants, heading-level vectors, component counts, imports, numbered-item counts and figure-description equality.
- All five Urdu pages passed MDX compilation without a site build.
- `npm run figures:variants:check` passes.
- Translator's Urdu MCQ solve: ب، ج، ج، الف، ج، ب، ب، ج، ج، ب, matching the translated key. This is a translator check, not independent review.
- No site build, dev server, Playwright or Chromium was run, as the crew brief explicitly prohibits them. `measure-figure-text.mjs` launches Playwright Chromium too, so SVG text geometry is **not measured**. Desktop, 360px, A4 print, Nastaliq shaping, bidi behaviour and label clipping still need actual inspection. Do not treat the structural checks as rendered evidence.

`translation_status` remains `draft` in every page. No G3/G5 status, signature or reviewer identity was changed. The current translate-unit skill expressly forbids appending a G4 row; the existing open tracker row is preserved. This file records the translation delivery without changing gate state. It is stored under the unit review-record folder because it is translation lifecycle metadata. Keeping it under `translations/unit-05/` added a bound English input and made the existing G2 manifest incomplete; moving it here preserves that manifest without changing English content or review evidence.

## Next owner

The next authorised rendering job must measure all eight Urdu SVG variants, repair any overflow and inspect every Urdu page at desktop, narrow width and A4 print. Then a separate G5 reviewer must compare all English and Urdu passages and assessment items. Accepted G3 dependency and reviewer qualification remain prerequisites for certification. The translator does not certify this work.
