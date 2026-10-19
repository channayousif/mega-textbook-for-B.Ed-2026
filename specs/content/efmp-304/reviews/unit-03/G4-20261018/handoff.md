# EFMP-304 Unit 3: G4 translation handoff

Date: 2026-10-18. Translator: Claude (Opus 5.5), crew job `efmp-304-u03-translate`.
English baseline: `88efbd7d` (`origin/main` at task start). No English file was changed.

## What was done

The six Urdu pages (`index.mdx`, `topic-01.mdx` to `topic-04.mdx`, `unit-assessment.mdx`) were
retranslated in full rather than patched. The earlier mirror (TEX-23, PR #109) carried English
`blooms_summary` values, English figure alts, an extra `## Key terms` heading the English does not
have, many spelling slips (انے, کیونکھ, استقرئی) and several meaning changes. The most serious:
it rendered "the argument is not invalid" as "دلیل صداقت رکھتی نہیں" (the argument has no
validity) in Topic 3.1's worked example, and "we dismiss at noon" as "ہم دوپہر چھوڑ دیتے ہیں".

- Front matter: `title`, `description`, `blooms_summary` and `assessment_weighting_note`
  translated; `course_code`, `unit_no`, `topic_no`, `topic_label`, `clo_refs`,
  `est_reading_minutes` and `translation_status` byte-identical to the English.
- Headings: same count, levels and order in every file (heading-level vectors match).
- Components: `<Figure>` 8/8, `<Glossary>` 4/4 (self-closing form kept, English `term` key
  unchanged, Urdu term added in parentheses after it so the sentence reads in Urdu),
  `<PrintHandout>` 5/5, `TranslationStatusBadge` 1/1.
- Assessment: 10/10/5 bank in the original order; MCQ options mapped A/B/C/D to الف/ب/ج/د
  without reordering; Bloom tags translated at the same level; marks unchanged; answers stay in
  the final `## جوابات اور نمبر دہی کی رہنمائی` section; no English answer-key prose in the file.
  Translator's self-check, answering the Urdu MCQs from the Urdu alone:
  ب، ج، ب، ج، ب، ج، ج، ج، الف، ب, which matches the English key (B C B C B C C C A B).
  This is a self-check, not G5 evidence.
- `key_terms` on the Urdu `index.mdx`: Validity, Critical Thinking, Learning Outcome,
  Assessment, Summative Assessment and Self-Assessment, each with the bank's exact `term_ur`.

## Figures

Eight `.ur.svg` variants (`fig-U3-1` to `fig-U3-8`) were generated from the English sources:
shapes mirrored horizontally for right-to-left reading, every label translated, all Urdu labels
centre-anchored with `direction="rtl"` (so mixed runs such as "اگر P تو Q" order correctly), and
the Nastaliq font stack used in Unit 4. Each `<desc>` equals the Urdu page alt. Dark variants
were derived with `npm run figures:variants`; `figures:variants:check` is clean. All files are
under 5 KB.

A standalone Chromium render (installed Noto Nastaliq Urdu face, run through `scripts/heavy.sh`,
no build or server) found no text past any viewBox edge. The screenshots were inspected by eye.
The one change from a pure mirror: the fig-U3-7 wordmark was moved to the free bottom-right corner,
because mirroring put it on top of a box.

## Terminology

Bank-bound (non-negotiable): Validity = صداقت. Learning Outcome, Assessment, Summative
Assessment (مجموعی جائزہ), Self-Assessment (خود جائزہ) and Critical Thinking (تنقیدی سوچ) also
use the bank. Course convention from the Unit 2 mirror was kept for premise (پریمیس / پریمیسز),
argument (دلیل) and conclusion (نتیجہ). True and false premises are درست and غلط throughout, so
that صداقت (validity) is never confused with the truth of a premise.

Unbanked terms used, **proposed for the curriculum owner** (not added to the bank):

| English | Urdu used | Note |
|---|---|---|
| Deductive argument | استنتاجی دلیل | |
| Inductive argument | استقرائی دلیل | standard spelling; the glossary and concept graph have استقرئی |
| Valid / invalid | صداقت والی / صداقت سے خالی | adjective forms of the banked صداقت |
| Soundness / sound / unsound | استواری / استوار / غیر استوار | replaces سانڈنس; "سانڈ" reads as "bull" in Urdu |
| Strength / strong / weak | مضبوطی / مضبوط / کمزور | replaces اسٹرینتھ |
| Cogency / cogent / uncogent | وزن / وزنی / بے وزن | replaces کوجینسی |
| Test (validity, strength) | کسوٹی | |
| Categorical syllogism | زمرہ جاتی قیاس | |
| Modus ponens | اثباتی صورت (modus ponens) | |
| Modus tollens | نفی کی صورت (modus tollens) | |
| Chain argument (hypothetical syllogism) | سلسلہ وار دلیل (مفروضی قیاس) | |
| Antecedent / consequent | مقدم / تالی | classical logic terms, glossed as the "اگر" and "تو" parts |
| Affirming the consequent / denying the antecedent | تالی کا اثبات / مقدم کی نفی | |
| Middle term | حدِ اوسط | |
| Near-miss fallacy | ملتا جلتا مغالطہ | |
| Generalisation / hasty generalisation | تعمیم / جلد بازی کی تعمیم | |
| Analogy / argument from analogy | تمثیل / تمثیلی دلیل | |
| Causal inference | سببی استنباط | avoids استنتاج, which would read as deductive |
| Prediction | پیش گوئی | |
| Alternative cause / counter-example | متبادل سبب / جوابی مثال | |
| Cohort | بیچ | |
| Saturday (coaching class) | ہفتے کے دن کی | avoids ہفتہ (week) clashing with تعارفی ہفتہ |

## Problems found outside this job's scope (not changed)

1. **English content (G3 / author):** Topic 3.1, "What the wrong test produces": the paragraph
   headed "Judging a deductive argument by the inductive test" uses an inductive example (the
   parent's one-case generalisation), and the one headed "Judging an inductive argument by the
   deductive test" uses a deductive example (the fee list). The headings and examples appear
   swapped. Translated faithfully.
2. **English markup:** Topic 3.2's four "near-miss fallacy" labels open with `*` and close with
   `**`. The Urdu uses balanced `*...*`.
3. **English figures vs alts:** fig-U3-4's alt promises an inference bar and a highlighted
   changed element, which the SVG does not draw; fig-U3-6's alt promises "stronger and weaker" on
   each branch but only "stronger" cues are drawn, and its branch lines cross the centre box;
   fig-U3-8's alt promises the two wrong-test paths, which are not drawn; fig-U3-2 has a dangling
   centre branch line. The Urdu variants mirror the English drawings and alts as they stand.
4. **Shared `glossary.json`:** the Urdu definitions for Validity, Soundness, Strength and Cogency
   use ولڈٹی / ولڈ / سانڈ (against the bank's صداقت), and the Validity entry contains a corrupted
   character (نتیج۾). The tooltip shows these on the Urdu page. Owner decision needed.
5. **Concept graph (`concepts/unit-03.md`):** the Validity label is ولڈٹی, against the bank's
   صداقت, and the inductive label is spelt استقرئی. This file is a hashed G2 input, so it was
   left alone; correct it together with the next G2 run.

## Status and remaining work

- `npm run check:content`: 13/13 pass in draft. The only first-run failure,
  `check:content-status`, was the ignored `static/content-status.json` not existing yet, the
  same as on `origin/main`; `npm run build:content-status` regenerates it.
- Temporary `reviewed` flip on both `index.mdx` files: file and heading parity, figure parity
  and `key_terms` all pass; the pipeline reports only the open G4 and G5 rows. Both files were
  flipped back to `draft` and checked.
- `translation_status` stays `draft` on every page in both locales: only an accepted G5 earns
  `reviewed`. The G4 tracker row is marked in progress (▣), not done.
- Not done here: full-page desktop, 360 px and A4 print inspection (`render-inspect.mjs` needs a
  build, which the crew brief forbids), and independent G5 review. The English G3 for this unit
  is still open with an advisory escalate, so an English repair may yet invalidate this mirror.
- Translation time was not instrumented, so no rate is claimed.

## r1 continuation: content-status freshness

The continuation retained the existing six-page translation and G4 tracker records. A new
check on 2026-10-18 reproduced the reported stale `static/content-status.json` failure, with
the other 12 content gates passing. Regenerated the ignored report using
`npm run build:content-status` after the tracker edits. Run that command after any further
tracker change and before `npm run check:content`; tracker digests determine freshness.
No generated report is committed because the repository ignores it.

Six-page file, heading-level and component-count parity was checked again; both locales
remain draft. English G3 follow-up, independent G5 and full-page RTL/print inspection remain
with the owners identified above, under the crew build/server restriction.

Final rerun: `npm run check:content` passed all 13 gates. `git diff --check` passed.
