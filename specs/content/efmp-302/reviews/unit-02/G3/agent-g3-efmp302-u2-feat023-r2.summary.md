# G3 review summary - EFMP-302 Unit 2, cycle 2 (feat023-r2)

Report: `agent-g3-efmp302-u2-feat023-r2.json` (validated). Supersedes
`agent-g3-efmp302-u2-feat023-r1.json`. Reviewer `agent:g3-reviewer`, model LongCat-2.0,
author run `commit:161a3ce`, fresh session that did not author or translate this content.
Advisory only: no signing, no tracker or registry change, no gate completion.

## Disposition: REVISE

One blocking accessibility defect found by the measurement this cycle exists to perform.
Everything else, including all six other criteria, passes on current bytes.

## What this cycle verified

1. **Inputs**: the prepared feat023-r2 manifest recomputes identically against the
   working tree (103/103 paths, trusted `inputManifest` comparison); no bound input
   dirty. D-2026-0001 ruling digest unchanged.
2. **Cycle-1 advisory repairs landed (both verified, marked resolved)**: the MCQ 6
   answer-key note now carries the Topic 2.2 uncorroborated-attribution caveat
   (`unit-assessment.mdx:196-199`), and `figures/unit-02.md:17-21` now records the
   `.ur.svg` variants and the rate-probe Urdu mirror as in place.
3. **Figure-internal text geometry (the check cycle 1 did not perform)**: over all 16
   EN variants (8 figures x light/dark), served bytes sha256-matched to committed bytes,
   rendered-DOM `getBBox` pairwise intersection plus canvas pixel ink-intersection.
   14 of 16 variants are fully clean; fig-U2-3's two bounding-box grazes share zero ink
   (no superposition); all 16 Urdu variants are clean. A negative control over the
   known-bad b8f8ffe bytes detects 3/7/9 overlapping pairs with real ink collisions,
   proving the instrument is sensitive.

## Blocking finding (B-01)

**fig-U2-5.svg and fig-U2-5.dark.svg superpose two failure-branch labels.** "was
outweighed" (x 488.0-585.6) prints over "did not follow through" (x 467.8-600.0) at
y 139-153: 97.6x14 box overlap, 281/270 shared ink pixels. The current bytes are
identical to the original figure-render commit 96dcf38, so this is pre-existing
authoring damage - present when cycle 1 passed the unit, invisible to `check:figures`
(no glyph geometry), `measure-figure-text` (viewBox and wordmark only) and cycle 1
(which measured no figure-internal geometry; see `specs/gaps.md` G-2026-62). The figure
is the primary schematic of load-bearing Topic 2.3 (U2-10), and its alt text names the
components but not the four failure labels, so the meaning is not fully recoverable.
Repair: reposition or rewrap the two labels until their ink is disjoint, then re-run
`renders-feat023-r2/figure-text-overlap.mjs` and confirm zero shared ink.

## Criteria

| Criterion | Status |
|---|---|
| authority | pass |
| sources | pass |
| coverage | pass |
| assessment | pass |
| accessibility | **fail** (B-01) |
| readability | pass |
| pedagogy | pass |

Assessment note: all 10 MCQs solved blind before reading the key; all ten keys
confirmed (1b, 2c, 3b, 4b, 5c, 6c, 7a, 8c, 9b, 10b). Blueprint 10/10/5 verified.

## Unresolved advisories carried forward

- U2-12 Reflective Decision Making (and, more weakly, the social-media dilemma type)
  has no direct summative item; blueprint-compliant but worth one RRQ/MCQ at next
  revision (from cycle 1).
- bebeau1999 full text remains unread; record-level support only, boundary declared in
  the sources register (from cycle 1).
- fig-U2-1 `.focus` shape-wordmark graze (88.3x4.5, both EN variants): pre-existing
  cosmetic class, wordmark paints last and is never occluded (new this cycle, measured).

## Commands (real logs under `logs-feat023-r2/`, all hashed in the evidence manifest)

`validate:content` 0, `check:depth-gate` 0, `check:figures` 0, `check:no-em-dash` 0
(re-run after evidence files were written), `check:no-answer-keys` 0, `check:docs-sync`
0, `site-build` 0 (both locales), `render-review` 1 (record complete; defect found),
`measure-figure-text` 0, `figure-text-overlap` 1 (defect found, by design),
`page-inspect` 0. Evidence: 65 files (logs, JSON, 16 standalone 2x figure renders,
4 collision crops, desktop/narrow/print renders, the three measurement instruments).

## Limitation

This reviewer session could not view raster images directly; visual inspection was
performed by real-browser DOM geometry and pixel ink measurement over the built and
served site, with a negative control, and all renders saved for human verification
(`render-review.log` records this honestly).

## Next step

An author repairs fig-U2-5's two EN variants; the parent prepares a new manifest; a
fresh reviewer rechecks. The skill allows at most two repair/review cycles per stage
per submission; the parent should confirm where that count stands for feature-023
before launching another attempt, and any recheck should reuse this report's
measurement method (`renders-feat023-r2/figure-text-overlap.mjs`) over the changed
figure bytes.
