# EFMP-408 Unit 3 - source verification (G3, cycle 2)

Reviewer: `agent:claude-g3-reviewer`, 2026-11-26.

## Bundle

Prepared locally with `node scripts/review-evidence.mjs prepare EFMP-408 3 G3
specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2`
(104 inputs, `skill_digest eccc4074...`). No parent-frozen handoff was supplied;
the manifest is a digest audit of the reviewed commit
`467e2a0876a783e4c8649e4aad7f476f0ccf330a`, verified against a fresh
`inputManifest()` computation (0 missing, 0 extra, 0 digest mismatches).

`specs/content/efmp-408/sources/texts/hec-2013-testdev.md` is NOT in the
manifest: `citedKeysFor` extracts the key `hec-2013` from `sources/unit-03.md`,
so that excerpt file is out of scope. The full HEC guide text IS bound at
`Scheme-and-Course-guides/extracted-text/course-guides-2025/TestDevEval_Sept13.txt`
(the whole `Scheme-and-Course-guides` tree is a manifest root), so every HEC
claim below was checked against the bound guide text directly.

## Verified against the bound HEC guide text

- TOS/test blueprint and content validity: `TestDevEval_Sept13.txt:1266-1272`
  ("A table of specification is the blueprint for a test. It specifies the
  content coverage, question types, marks distribution, and sometimes cognitive
  levels"). Supports `topic-01.mdx:43-45` and the repaired `:61`.
- Review checklist on topic coverage and cognitive-level weight:
  `:1443-1445`, adapted from an AKU-EB checklist for IBA Sukkur (`:1447`).
  Supports `topic-04.mdx:106-115`.
- MCQ stem/key/distractors: `:318` (unit outcome "construct multiple-choice
  questions (MCQs) and identify the elements of the questions (i.e. stem, key,
  and distractors)"). Supports `topic-03.mdx:53-58` and Figure 3.3.
- Essay and short-answer construction and marking guides: `:321-337`. Supports
  `topic-02.mdx:45-48,77-87`.
- Mark scheme/rubric concept and command words: `:1311-1345`. Supports
  `topic-02.mdx:103-106` and `topic-01.mdx:97-101`.
- Scoring bias / rater reliability: `:2354-2368` (rubrics, rater reliability,
  double marking). Supports `topic-02.mdx:91-106`.
- Seifert & Sutton (2009) bound excerpt `sources/texts/seifert-sutton-2009.md`
  note 5 supports the objective/constructed-response balance, rubrics against
  halo effects, and the negative-stem/giveaway-clue cautions. Supports the
  repaired `topic-02.mdx:94` halo-effect sentence.

## Cycle-1 flagged attributions: re-checked after the repair

- **S-1 (`topic-01.mdx:61`, `:86`).** The "three objective criteria (HEC, 2012)"
  attribution is gone. The paragraph now states the HEC guide asks teachers to
  plan content coverage, question types and marks distribution before writing,
  and labels the three weightage criteria "an author synthesis of common
  classroom practice, not a list stated in the HEC guide". The 30/40/30 split is
  now "a suggestion of this textbook, not an official rule". Supported and
  honest.
- **S-2 (`topic-02.mdx:94`).** "Studies consistently show" is gone. The
  mechanism is now framed as a commonly observed halo effect and cited to the
  bound Seifert&Sutton note 5.
- **S-3 (`topic-02.mdx:101`, `topic-04.mdx:86`).** The named bodies
  ("AKU-EB and the Sindh Higher Education Commission", "the Higher Education
  Commission and the Aga Khan University Examination Board") are gone. Both
  passages now say "widely recommended as general professional practice" /
  "General professional practice in item writing advises". The remaining AKU-EB
  attribution at `topic-04.mdx:106` (checklist adapted from AKU-EB for IBA
  Sukkur) IS in the bound guide at `:1447`, so it stands.

No source is declared under `## Unverifiable sources`, and none is needed: every
external claim in the unit is now either supported by the bound guide or the
bound Seifert excerpt, or is explicitly framed as the textbook's own synthesis.

## Note on the manifest key derivation

`sources/unit-03.md` spells the key `hec-2013-testdev`; `citedKeysFor`'s regex
captures `hec-2013`. This is a deterministic bundling quirk, not a unit defect.
Recorded so the next job does not read the absence of the excerpt as a missing
source.
