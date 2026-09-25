---
id: "0069"
title: "G3 round-1 reviews and repairs for Units 2-5"
stage: misc
date: 2026-09-25
surface: agent
model: LongCat-2.0
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: M Yousif Channa
command: "coordinator RESUME (G3 phase)"
labels: [efmp-301, g3, review, repair, sources]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-301/reviews/unit-02/G3/ (round-1 report + evidence)
  - specs/content/efmp-301/reviews/unit-03/G3/ (round-1 report + evidence)
  - specs/content/efmp-301/reviews/unit-04/G3/ (round-1 report + evidence)
  - specs/content/efmp-301/reviews/unit-05/G3/ (round-1 report + evidence)
  - specs/content/efmp-301/sources/texts/seifert2009.md (extended: Ch 2, Ch 3, Ch 9)
  - specs/content/efmp-301/sources/texts/spielman2020.md (extended: 6.3, 6.4, 7.5 history)
  - specs/content/efmp-301/sources/texts/seifert-hk.md (new: guide book 1)
  - specs/content/efmp-301/sources/texts/antonides2022.md (new: Bruner's modes)
  - specs/content/efmp-301/sources/texts/ariel2018.md (new: retrieval practice)
  - specs/content/efmp-301/sources/texts/rohrer2012.md (new: learning-styles evidence)
  - docs/semester-1/efmp-301/unit-02..05/ (assessment blueprint repairs, prose repairs)
  - i18n/ur/.../unit-02..05/ (all repairs mirrored)
tests:
  - "node scripts/review-evidence.mjs validate - all four reports structurally valid"
  - "npm run check:depth-gate - PASS after repairs"
  - "npm run check:concept-graph - PASS after repairs"
  - "npm run check:bloom-bands - PASS after repairs"
  - "node scripts/check-pipeline-gate.mjs - PASS (G2 evidence refreshed twice)"
---

## Prompt

Coordinator RESUME: obtain advisory G3 reviews, repair the findings, then continue the
pipeline.

## Response snapshot

Four G3 round-1 reviews completed (Units 2-5), all disposition REVISE, all advisory.
Every blocking finding repaired: assessment blueprints rebalanced to the approved
spreads (U2 3/3/2/2 + 2/3/2/3; U3 3/3/2/2 + 3/2/3/2; U4 4/3/3 + 3/4/3; U5 5/5 + 5/5)
with concept graphs remapped; misattributed scholarship re-cited to real bound sources
(Spielman 6.3/6.4 for the conditioning quadrant and Bandura; Antonides & Battista for
Bruner's enactive-iconic-symbolic model; Ariel & Karpicke for spacing/retrieval
practice; Rohrer & Pashler for the learning-styles evidence); the invented
immigrant-ranking IQ history corrected to the bound eugenics/Buck v. Bell account;
'response cost' replaced by the sourced 'negative punishment' terminology (prose,
SVGs, manifest); unsourced Thurstone label replaced; guide-practical-component
overstatements corrected; SLO mislabels fixed; gorilla-study wording corrected;
Urdu figure twins regenerated for Unit 3 and anchor-repaired course-wide; English
figure label overflows fixed. All repairs mirrored into the Urdu files. G2 evidence
refreshed for all 11 units at the post-repair state.

## Outcome

- ✅ Impact: Units 2-5 now rest on bound, verifiable sources and approved blueprints.
- 🧪 Tests: all content gates PASS; all four review reports validate.
- 📁 Files: 6 source excerpt files (4 extended, 5 new), 4 units' EN+UR content.
- 🔁 Next prompts: G3 reviews units 6-12, fresh manifests + re-reviews units 2-5,
  G5 reviews, PR.
- 🧠 Reflection: the reviews found a consistent authoring failure mode - citing the
  guide-recommended book for content it does not contain (Bruner's modes, Bandura's
  steps, the quadrant). The repair pattern - find and bind a real open-access source,
  then re-cite - is reusable for the remaining units' reviews.

## Evaluation notes (flywheel)

- Failure modes observed: blueprint drift toward the first topic; citation-by-prestige
  (attributing claims to the famous book rather than the carrying source); mirroring
  tool anchor bugs.
- Graders run and results (PASS/FAIL): all gates PASS after repairs; reports validate.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): pre-check every in-prose citation against
  the bound excerpt before submission, so G3 finds content issues only.
