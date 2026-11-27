# EFMP-408 Unit 3 - source verification (G3)

Reviewer: agent:claude-g3-reviewer, 2026-11-25.

## Bundle

Prepared locally with `node scripts/review-evidence.mjs prepare EFMP-408 3 G3
specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r1`
(104 inputs, `skill_digest eccc4074...`). No parent-frozen handoff was supplied;
the manifest is a digest audit of the current commit (`7bb9e4d48`), not an
independent freeze. `specs/content/efmp-408/sources/texts/hec-2013-testdev.md`
is NOT in the manifest: `citedKeysFor` extracts the key `hec-2013` from
`sources/unit-03.md`, so the excerpt file `hec-2013-testdev.md` is out of scope.
The full HEC guide text IS bound at
`Scheme-and-Course-guides/extracted-text/course-guides-2025/TestDevEval_Sept13.txt`
(the whole `Scheme-and-Course-guides` tree is a manifest root), so the HEC
claims below were checked against the bound guide text directly.

## Verified against the bound HEC guide text

- TOS/test blueprint and content validity: `TestDevEval_Sept13.txt:1266-1272`
  ("A table of specification is the blueprint for a test. It specifies the
  content coverage, question types, marks distribution, and sometimes cognitive
  levels"), `:1443-1445` (review checklist items 7-8 on topic coverage and the
  weight given to cognitive levels). Supports topic-01.mdx:43-45, :61.
- MCQ stem/key/distractors: `:318` (unit outcome "construct multiple-choice
  questions (MCQs) and identify the elements of the questions (i.e. stem, key,
  and distractors)"). Supports topic-03.mdx:53-58 and Figure 3.3.
- Essay and short-answer construction and marking guides: `:321-337`. Supports
  topic-02.mdx:45-48, :77-87.
- Mark scheme/rubric concept and command words: `:1311-1345`. Supports
  topic-02.mdx:103-106 and topic-01.mdx:97-101.
- Item review checklist adapted from AKU-EB for IBA Sukkur: `:1447`. Supports
  topic-04.mdx:106-115.
- Scoring bias / rater reliability: `:2354-2368` (rubrics, rater reliability,
  double marking). Supports topic-02.mdx:91-106.
- Seifert & Sutton (2009) bound excerpt `sources/texts/seifert-sutton-2009.md`
  note 5 supports the objective/constructed-response balance, rubrics against
  halo effects, and the negative-stem/giveaway-clue cautions.

## Flagged (advisory S-1 to S-3)

- topic-01.mdx:61 attributes "three objective criteria" for weightage to
  "(HEC, 2012)". The bound guide specifies content coverage, question types,
  marks distribution and sometimes cognitive levels (`:1269`) but never states
  the three criteria (instructional time, curricular significance, cognitive
  complexity). The criteria are reasonable professional synthesis; the
  attribution to HEC is not supported.
- topic-01.mdx:86-89 states a "sound professional standard" of 30/40/30 across
  Remembering/Understanding/Applying-and-Analysing with no citation. Not in the
  bound sources.
- topic-02.mdx:94 states "Studies consistently show" for the handwriting/
  presentation effect with no citation; the bound excerpt names halo effects
  and rubrics but not a specific study or effect size.
- topic-02.mdx:101 names "AKU-EB and the Sindh Higher Education Commission" as
  bodies that "enforce four mandatory marking protocols". AKU-EB is in the
  bound guide (`:1447`); the Sindh Higher Education Commission is not in any
  bound source, and the four protocols are the author's synthesis.
- topic-04.mdx:86 attributes the advice against "All of the above"/"None of the
  above" to "the Higher Education Commission and the Aga Khan University
  Examination Board". Neither bound source states that advice.

These are secondary framing attributions; the unit's core claims (TOS, item
anatomy, essay/short-answer trade-offs, item-writing rules) are supported by the
bound guide and the bound Seifert excerpt. No source is declared under
`## Unverifiable sources`, and none is needed for these claims.

## Note on the manifest key derivation

`sources/unit-03.md` spells the key `hec-2013-testdev`; `citedKeysFor`'s regex
captures `hec-2013`. This is a deterministic bundling quirk, not a unit defect.
Recorded so the next job does not read the absence of the excerpt as a missing
source.
