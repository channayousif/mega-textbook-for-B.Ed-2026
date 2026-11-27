# Summary: G3 English Review of EFPG-402 Unit 7

- **Course**: EFPG-402 (Teaching of Science)
- **Unit**: 7 (Assessment and Evaluation in Science)
- **Reviewer**: `agent:g3-reviewer`
- **Reviewer run ID**: `f3b32de7-5599-49ac-9cf7-0c3b8eb4fc89`
- **Author run ID**: `crew-job:efpg-402-u07-author`
- **Model**: LongCat-2.5
- **Disposition**: `escalate`

## Verdict

The unit is well built: authority, coverage, assessment, readability and pedagogy all pass on the
bound evidence, and every deterministic gate exits 0. Two things prevent a pass:

1. **`sources` fails.** Topics 7.1 to 7.5 attribute assessment definitions, the formative/summative
   distinction, assessment techniques and tools, achievement-test construction and diagnostic
   testing to the *National Curriculum of Pakistan 2022-23: Science, Grades 4-8*. The bound excerpt
   for that source contains eleven science-content/SLO passages and no assessment content, and the
   full 74-page PDF (checked independently on 2026-11-27) contains no assessment guidelines or
   formative/summative strategies. The co-cited monograph (Aggarwal, *Teaching of Science*) and the
   Sindh DCAR curriculum are declared unretrievable, and the `## Unverifiable sources` declaration's
   claim that each sub-topic is also grounded in a bound NCP excerpt is not borne out for assessment
   claims. This is a blocking finding.
2. **Render evidence is unavailable.** The production site is built from deployed SHA
   `9d45720686522bf6f9cb5678852f14e29eb5b08f`, which differs from reviewed HEAD
   `8a962478456e763a24f6cccfbc7961d0651300ae` on `docs/semester-4/efpg-402/unit-07/index.mdx` and
   `static/img/figures/efpg-402/unit-07/fig-U7-11.webp`. The live site is therefore not this review's
   input, and the brief prohibits a local build, dev server or browser run. `accessibility` is
   `unverified` for the visual checks; structural accessibility and figure geometry pass from source.

## What passes

- **Authority**: guide sections 7.1 to 7.5 (`4TH SEMESTER.txt:789-795`) match the G1 spec and the
  five topic files; SLOs trace to guide objective 6.
- **Coverage**: all six sub-topics U7-01 to U7-06 map to exact headings; `check:depth-gate` exits 0;
  seven concepts are defined and linked to the 10/10/5 bank.
- **Assessment**: independent solve of all ten MCQs matches the key 10/10; RRQ model answers and
  ERQ analytic rubrics agree with the derived answers; blueprint floors and Bloom bands are met.
- **Readability and pedagogy**: complete nine-part cycles, explicit misconception correction,
  feasible Sindh classroom activities, plain academic language.

## Advisory items (non-blocking)

- `topic-01.mdx:43` duplicates a word: "gathering, gathering, and synthesizing".
- MCQ correct keys are A 1, B 8, C 1, D 0; D is never the key.
- `fig-U7-10` shows four misconceptions but its caption and alt text say five.
- `fig-U7-3` and `fig-U7-8` do not match their manifest prompts (a missing fifth row; three
  sub-topics and three cognitive levels instead of four and four).
- The BSCS ERIC number in `sources/unit-07.md` (ED536125) disagrees with the bound excerpt and
  `sources/unit-05.md` (ED502570).

This report is advisory. It grants no certification, publication or tracker authority.
