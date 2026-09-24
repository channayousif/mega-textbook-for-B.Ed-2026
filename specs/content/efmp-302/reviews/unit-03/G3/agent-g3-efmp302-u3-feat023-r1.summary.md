# G3 review summary - EFMP-302 Unit 3 (feat023-r1)

Reviewer run: `agent-g3-efmp302-u3-feat023-r1` (agent:g3-reviewer, LongCat-2.0), fresh session,
2026-09-24. Author run: `commit:53caf73`. Inputs: the prepared `feat023-r1/manifest.json`, all 111
bound paths digest-verified (the manifest recomputes identically from the current tree).
Report: `agent-g3-efmp302-u3-feat023-r1.json` in this directory. Disposition: **revise**.

## What changed since run 007, and what this review found

Run 007's two blocking findings are **confirmed repaired in content**:

- **B-01 (N=77)**: fig-U3-7's caption now reads "Furlich (2016): the verbal measure was
  significant, the non-verbal one was not. Sample size and setting are unstated in the abstract",
  exactly what the bound verbatim abstract supports. No N=77 survives anywhere in the unit, the
  figures or the course specs tree.
- **B-02 (channel-contradiction claim as fact)**: fig-U3-7 row 4 now reads "The class tends to
  believe the non-verbal channel." with "A practitioner's heuristic: widely held, and not
  established as a finding by the studies cited here." beneath it, in agreement with the prose
  (topic-04.mdx:131-140), the unit summary and MCQ 8's key.

Run 007's A-01 (fig-U3-6 wordmark collision) and A-12a (checklist self-description) are also
repaired in current bytes.

**A new blocking defect replaces them.** The `b8f8ffe` "SVG re-optimisation" pass (2026-09-21,
after run 007) enlarged every figure's fonts and re-wrapped long lines into tspan blocks, but
stacked the wrapped blocks at overlapping baselines. In **9 of the 10 figures, distinct strings
now print on top of each other**: 18 full superpositions (fig-U3-2 x4 and fig-U3-5 x2 in their
bottom captions, fig-U3-6 x4, fig-U3-7 x5 across three table cells and both caption blocks,
fig-U3-9 x3 in its closing caption) plus numerous 10-16px partial collisions (fig-U3-2 leaf
labels, fig-U3-3's footnote against the Adaptability row, fig-U3-4's legend, fig-U3-7's caption
interleavings, fig-U3-9's station labels). Only fig-U3-10 is clean.

Proof, all reproducible from the saved evidence:

- Rendered-DOM geometry in Chromium over all 20 committed SVGs
  (`logs-feat023-r1/fig-geometry-*.json`).
- Pixel ink-intersection: each line of a pair rendered alone, inked pixels intersected
  (`logs-feat023-r1/ink-collision.log`, 8 confirmed collisions, up to 1842 shared ink pixels for
  one pair). The B-02 repair line itself is one of the superposed ones.
- The rebuilt site serves exactly the committed bytes (all 10 served SVG digests match the
  manifest, `logs-feat023-r1/print-inspect.log`).
- Crops and standalone renders saved under `renders-feat023-r1/` for human verification.

No gate sees this class of defect: `check:figures` reads no glyph geometry, and
`measure-figure-text.mjs` checks only viewBox overflow and the wordmark. Both exit 0.

The illegible regions are the assessment-critical ones (fig-U3-7 row 4 against MCQ 8, fig-U3-3's
overdone column against RRQ 4, fig-U3-5's link labels against RRQ 5, fig-U3-9's caution against
MCQ 10 and RRQ 10), which is why **accessibility and pedagogy fail** while the prose-level
criteria pass. A companion advisory records that all 10 figure carriers carry height exactly 50px
below the new viewBoxes, so every figure also letterboxes at about 89% scale.

**Repair request (B-01)**: fix the tspan baseline stacking in the 9 affected figures (each
wrapped block's second `<text>` element must start below the previous block's last tspan
baseline, and the enlarged 16/18/14px fonts need at least 20-24px leading), or revert unit-03's
SVGs to the 38d8e7f geometry and re-apply the two content repairs at that geometry; then re-run
`figures:variants:check`, `measure-figure-text.mjs` and a rendered inspection that measures
text-on-text overlap, and update the stale carrier dimensions. The unit's provisional tier is
revoked, so nothing is live to learners, but any future publication would ship these bytes.

## Criteria

| Criterion | Status | Basis |
|---|---|---|
| authority | pass | All 11 guide leaf bullets for 3.1-3.5 taught; guide PDF re-extracted this run; content-spec checklist decomposition now honestly self-described (A-12b CLO trace carried as advisory) |
| sources | pass | run-007 B-01/B-02 repairs verified in bytes; furlich2016, taylor2023, goe2008, keelson2024, suarez2022 checked against the bound excerpts; unverifiable sources declared per D-2026-0001, honestly and completely |
| coverage | pass | 13 coverage rows resolve to real teaching headings; 2 MCQ + 2 RRQ + 1 ERQ per topic; depth gate exit 0; reading minutes 166 in the 130-175 band |
| assessment | pass | All 25 items solved blind first; derived MCQ key c,a,b,d,a,c,d,b,a,d matches the supplied key on all ten; RRQ schemes point-by-point (50 marks); ERQ rubrics sound with the 10-cap present |
| accessibility | **fail** | New blocking B-01: text overprints in 9 of 10 figures (see above). Narrow-360 scroll procedure on the real scrolling elements and A4 print views are otherwise clean: nothing unreachable, nothing clipped, alts intact |
| readability | pass | HSC-graduate register holds; key terms glossed and banked; uncertainty marked honestly; no em dash |
| pedagogy | **fail** | Same blocking B-01: the opening figures of the topics teach assessment-keyed content that cannot be read. The nine-part cycle, activities, misconceptions and teacher notes are all intact in prose |

## Carried advisories (all still live in current bytes)

A-02 (fig-U3-3 resilience cell vs prose/RRQ 4), A-03 (fig-U3-5 link labels vs prose/RRQ 5),
A-04 (fig-U3-9 caption count "three"), A-06 (MCQ option-length cue, items 5-8), A-07 (MCQ 4 and
7 labelled Apply are recall), A-08 (blooms_summary omits ERQ 4's Create), A-09 (hurst2009 and
brookfield2017 point-of-use attributions; U3-11's brookfield2017 grounding nominal), A-10
(keelson2024 "Ghana" rests on affiliation), A-11 (goe2008 "explicit" overstates the reuse
direction), A-12b (CLO trace should be CLOs 2 and 5), A-13 ("Immediacy" lacks a glossary entry),
A-15 (unit-depth.mjs scope-agreement limits, not re-derived), A-05 (review-ref/ snapshot hazard,
absent from this worktree; main-checkout cleanup remains an owner action). New low advisories:
A-N1 (stale carrier dimensions, 50px on all ten) and A-N3 (bare-URL Further reading links).

## Commands (all exit 0, logs under logs-feat023-r1/)

validate:content, check:depth-gate, check:figures, check:no-em-dash, check:no-answer-keys,
check:docs-sync, measure-figure-text, site-build (both locales), render-review
(scripts/render-inspect.mjs against the fresh build), plus this run's supplementary
page-inspect, print-inspect, fig-geometry (x3) and ink-collision-proofs.

## Limitations and boundaries

This reviewer session could not view raster images directly, so rendered inspection was performed
by real-browser DOM geometry measurement and pixel-level ink intersection over the actual built
and served pages, with screenshots and crops saved as evidence; a human should still look at the
crops. One measurement artifact is documented in the report (page-inspect.log's print section
used a 1280px viewport; the valid 794px print numbers are in print-inspect.log and
render-review.log).

This report is advisory and unsigned. No reviewer is registered or qualified in
`specs/reviewers/registry.json`, no protected signing host exists, and this reviewer edited no
content, gate, rubric, registry or tracker row. The Unit 3 G3 tracker row remains unset;
recording the outcome is the parent's and owner's action.
