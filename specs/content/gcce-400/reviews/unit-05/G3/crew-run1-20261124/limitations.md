# Limitations - GCCE-400 Unit 5 G3 run 1

- **Rendered input identity.** Deployed SHA `ac3d5e2fcd1818492dd11bc9b72d8cfed9a25e8d`; reviewed
  HEAD `175a90b7a644bd366cf3d1d2592090a93f912bcb`. The unit's English directory and figure
  assets are NOT identical between the two: `index.mdx` adds the `fig-U5-7` banner figure and
  `static/img/figures/gcce-400/unit-05/fig-U5-7.webp` is new. Per the crew brief the live site is
  therefore not the review input, so `scripts/render-inspect.mjs` was not run and no PNG/WebP
  render exists for this attempt. The `accessibility` criterion is unverified. Source inspection
  (alt text on every figure, heading hierarchy, table structure, descriptive link text) was done,
  but source inspection cannot satisfy the visual checks.
- **Changed images may be served stale for up to 30 days.** A missing or mismatched asset on the
  live site would be unverified, not a content defect. No live asset was fetched for this reason.
- **Source verification.** The Batool et al. (2019) PDF was fetched from the publisher's open
  access endpoint and read in full; the extracted text is saved as
  `source-checks/batool-2019-article.txt`. The Constitution articles were read in the current
  transcription at `pakistani.org` (Part II chapter 1). The OpenStax section 21.2 page was read
  live. The digital-divide and Youniss notes are bound to other units and were not part of this
  bundle; they are cited only to show that the unit's own source table does not support the claim.
- **Assessment solve.** All MCQ/RRQ/ERQ items were solved from the prompts and topic prose before
  the supplied keys were read. The solve is recorded in `assessment-independent.md`.
- **No owner authorisation for unretrievable sources.** `youniss-levine-2009` is declared under
  `## Unverifiable sources`, but the declaration does not name `D-2026-0001`; the review treats
  this as a declaration/prose alignment issue (F3), not as an unretrievable-source failure.
- **Independence.** Fresh claude crew session (model LongCat-2.5) that did not author or translate
  these bytes. Author run identified by the authoring commit
  `74703ca659fa9ce44df5a9f39125cbd3b5536fa2`. No human initials, no signature, no certification.
- **Advisory only.** This report does not certify G3, does not support a tracker done state and
  does not authorise publication. The tracker row is proposed in `advisory-tracker-row.md`; the
  parent/owner owns insertion.
