# G3 English review summary - GQUR-301 Unit 16

Reviewer: agent:opencode (LongCat-2.0), independent of the authoring session.
Disposition: **escalate** (advisory - no certification authority).

## Outcome

All semantic G3 criteria (authority, sources, coverage, assessment, readability,
pedagogy) pass. The unit is a sound capstone that integrates Units 1-15 through
statistical modelling, a complete investigation cycle, and a method-choice review.
The 10/10/5 assessment bank is correct, Bloom-tagged, and traceable to the
approved content-spec. All cited open-access sources were verified through bound
source notes.

The **accessibility** criterion is `unverified`: `render-review` could not run
because brief.md forbids `npm run build`, a dev server, or Playwright on this
host. All static accessibility checks instead pass (alt text, heading hierarchy,
table markup, figure text-fit within viewBox, light/dark SVG variants). The gap
is live visual inspection only (360px layout, A4 print, reading order). This is a
tooling limitation, not a content defect.

## Deterministic gates (all PASS)

- validate:content, check:depth-gate, check:figures, check:no-em-dash,
  check:no-answer-keys, check:docs-sync, check:bloom-bands, check:source-floor,
  check:concept-graph, measure-figure-text.
- render-review: NOT RUN (host constraint), exit code 1.

## Action for the owner / next job

A host with build/Playwright permitted should run `render-review` against the
unit to close the accessibility gap. No content revision is required to satisfy
the other six criteria.
