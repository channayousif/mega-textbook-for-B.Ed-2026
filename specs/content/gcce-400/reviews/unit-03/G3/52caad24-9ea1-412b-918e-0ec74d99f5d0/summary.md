# GCCE-400 Unit 3 (Rights and Responsibilities) - G3 English review summary

- **Reviewer:** agent:claude (independent; did not author or translate this unit)
- **Model:** LongCat-2.5
- **Reviewer run ID:** 52caad24-9ea1-412b-918e-0ec74d99f5d0
- **Author run ID:** crew-job:gcce-400-u03-author
- **Date:** 2026-11-23
- **Reviewed commit:** `3ea8c670e552cbafd99c59d3e36eb35cb4788f25` (HEAD)
- **Deployed SHA (render input check):** `e7e1130220816c9d83316cd40336060adcaf9ad2`
- **Disposition:** **revise**

The unit is well written, at an appropriate HSC/intermediate level, with a clear classroom-to-
concept progression, worked examples, misconceptions, activities and a full 10/10/5 assessment.
The deterministic gates all pass. The review cannot certify it: the constitutional-currency claim
is out of date, one answer key misquotes Article 25(2), and no rendered page or print view could be
inspected because the deployed build is not the review input.

## 1. Authority - pass

The four guide leaves (`4TH SEMESTER.txt:138-144`: 6.1 fundamental rights and liberties; 6.2
Constitution of Pakistan 1973; 7.1 duties of citizens; 7.2 responsibilities in a democratic
society) map to the approved content-spec (`content-spec.md:189-231`) and to the exact Explanation
headings in `topic-01.mdx:41,73` and `topic-02.mdx:41,83`. The coverage matrix
(`coverage/unit-03.md:5-18`) is consistent. No contradictory G0/G1 authority was found.

## 2. Sources - fail

The primary text was read in the current transcription, not only the 2012 edition. Discrepancies:

- Article 9A (clean and healthy environment) was inserted by the Twenty-sixth Amendment (2024) and
  is omitted; the unit's "twenty-four comprehensive fundamental rights" is the pre-2024 count and
  the four categories omit Articles 23 and 24 (`topic-01.mdx:82-105`).
- `sources/unit-03.md:18` claims subsequent amendments "do not alter these substantive
  fundamental rights and duties"; that is false for Article 9A and Article 17(2).
- The MCQ 4 key repeats "on the basis of sex alone", omitted from Article 25(2) by the Eighteenth
  Amendment (2010) (`unit-assessment.mdx:131`).
- Article 184(3) was amended in 2024 to bar suo motu action beyond an application; the unit's "can
  take notice" is the older description (`topic-01.mdx:52`).

See `source-verification.md`. Dean (2005) and Ahmad (2004) are used within their bound claims.
Glencoe is a declared unverifiable source; the declaration is honest but does not name D-2026-0001.

## 3. Coverage - fail

The four guide leaves are taught, but the unit's own claim to group Articles 8 to 28 into four
categories is not delivered: Articles 23 and 24 are absent, Article 9A is absent, and Article 24 is
then relied on by MCQ 10 without being taught. The approved Unit 3 assessment blueprint also
requires a summative Analyze item over four school/community scenarios naming the right at stake
and the balancing duty; that item exists only as a formative activity.

## 4. Assessment - fail

All 10 MCQs, 10 RRQs and 5 ERQs were solved independently (`assessment-independent.md`). The
demand bands and the 2-per-topic-plus-integrative ERQ spread match the blueprint. Two defects:

- MCQ 4's key misquotes Article 25(2) (F2).
- MCQ 4 is ambiguous: the scenario (women banned from public parks) is directly governed by
  Article 26, which the topic text itself cites for parks, but Article 26 is not an option and the
  key selects Article 25 (F3).

## 5. Accessibility - unverified

No rendered page or print view could be inspected: the deployed build
(`e7e1130220816c9d83316cd40336060adcaf9ad2`) is not the review input because `index.mdx`,
`topic-01.mdx`, `topic-02.mdx` and `fig-U3-5/6/7.webp` differ from HEAD
(`3ea8c670e552cbafd99c59d3e36eb35cb4788f25`). Static checks only: heading order is sound, all seven
figure markers carry non-empty alt text, the SVGs carry title/desc, and `measure-figure-text`
exits 0 on all 16 SVGs. Small-screen and A4 print behaviour is unverified.

## 6. Readability - pass

Plain-language explanations, defined terms, two common-misconception corrections per topic, a
worked example in each topic, and a summary and self-assessment checklist. An HSC/intermediate
graduate can follow it without prior specialist knowledge.

## 7. Pedagogy - pass

Each topic opens with a Sindh classroom situation, moves to explanation, a worked example, a
collaborative activity with feasible materials, retrieval questions, a practicum task and a
summative task with a mini-rubric. The teacher notes sequence the two weeks and point to a school
civic audit. Activities are feasible in the stated Pakistani/Sindhi context.

## Blocking findings

- **F1 (blocking):** constitutional currency - Article 9A omitted, "twenty-four" count wrong,
  Articles 23-24 omitted, `sources/unit-03.md:18` overbroad.
- **F2 (blocking):** MCQ 4 answer key misquotes Article 25(2) ("sex alone").

## Uncertain findings

- **F3:** MCQ 4 ambiguity (Article 26 not an option; topic text cites parks under Article 26).
- **F4:** Article 184(3) "take notice" omits the 2024 suo motu proviso.
- **F5:** the blueprint's summative four-scenario Analyze item is absent.
- **F6:** render-review unavailable; accessibility unverified.

## Advisory findings

- **F7:** Article 26 examples "roads and transport" go beyond "places of public entertainment or
  resort".
- **F8:** the Glencoe declaration does not name D-2026-0001 and the unit attributes a specific
  explanation to the book.

## Evidence

- `manifest.json` (97 bound inputs)
- `logs/validate-content.txt`, `logs/check-unit-depth.txt`, `logs/check-figures.txt`,
  `logs/check-no-em-dash.txt`, `logs/check-no-answer-keys.txt`, `logs/check-docs-sync.txt`,
  `logs/check-concept-graph.txt`, `logs/check-bloom-bands.txt`, `logs/check-svg-style.txt`,
  `logs/check-source-floor.txt`, `logs/measure-figure-text.txt`, `logs/check-content.txt`,
  `logs/render-review.txt`, `logs/static-accessibility.txt`, `logs/input-verification.txt`
- `source-verification.md`, `assessment-independent.md`
