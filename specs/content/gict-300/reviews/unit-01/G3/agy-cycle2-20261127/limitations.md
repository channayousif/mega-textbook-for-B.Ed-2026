# Limitations - GICT-300 Unit 1 G3 Review (Cycle 2)

## Render and print evidence unavailable

The crew brief prohibits `npm run build`, running a dev server, and running Playwright browser test suites.
The brief permits `scripts/render-inspect.mjs` only against the live production deployment at `https://textbook.com.pk`, and strictly conditional on the deployed SHA matching HEAD for the unit's English directory and figure assets:
`git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <unit English dir> static/img/figures/gict-300/unit-01/`

Comparing the deployed commit with current HEAD:
- Deployed SHA: `366019f8ace647e892523e553b81ab6d1832ec68`
- HEAD SHA: `3f8e0bc3be6797f26f24d983ae41477ca94f475b`
- The diff is non-empty across 10 files:
  - `docs/semester-1/gict-300/unit-01/index.mdx` (added Figure tag for banner `fig-U1-9`)
  - `docs/semester-1/gict-300/unit-01/topic-01.mdx` (placed `fig-U1-10.webp`)
  - `docs/semester-1/gict-300/unit-01/topic-02.mdx` (placed `fig-U1-11.webp`, `fig-U1-12.webp`)
  - `docs/semester-1/gict-300/unit-01/topic-03.mdx` (uncommented Figure placement)
  - `docs/semester-1/gict-300/unit-01/topic-04.mdx` (placed `fig-U1-13.webp`)
  - `static/img/figures/gict-300/unit-01/fig-U1-9.webp` (binary illustration added)
  - `static/img/figures/gict-300/unit-01/fig-U1-10.webp` (binary illustration added)
  - `static/img/figures/gict-300/unit-01/fig-U1-11.webp` (binary illustration added)
  - `static/img/figures/gict-300/unit-01/fig-U1-12.webp` (binary illustration added)
  - `static/img/figures/gict-300/unit-01/fig-U1-13.webp` (binary illustration added)

Because the deployed build reflects the pre-illustration commit and lacks current unit assets at HEAD, inspecting the live site would evaluate stale bytes rather than reviewed inputs.
Per brief instructions:
"If the diff is not empty, the live site is not your input: record render-review as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect."

Consequences:
1. Visual accessibility (360px mobile viewport, table horizontal swipe containers, desktop presentation, A4 print layout, and dynamic figure clipping) is unverified in live rendering.
2. Structural accessibility (semantic markdown headings, figure alt text, SVG role="img", aria-labelledby, title, and desc attributes) passes completely from source examination.
3. `render-review` is recorded as unavailable with exit code 1 in command records.
4. Disposition is ESCALATE due to unavailable render evidence.

## Figure geometry verification

`node scripts/measure-figure-text.mjs static/img/figures/gict-300/unit-01/*.svg` was executed across all 32 SVG assets (16 English light/dark, 16 Urdu light/dark).
- Text boundary check: zero viewBox boundary overflows and zero collisions with the textbook wordmark were found. fig-U1-6 label clipping repair was verified clean.
- Text contrast check: in `fig-U1-3.dark.svg` and `fig-U1-3.ur.dark.svg`, secondary timeline date labels "(ancient)", "(1600s)", etc., have 1.41:1 contrast against `.panel` fill (threshold 1.6:1). This is recorded as an advisory finding and does not impair core semantic reading.

## Reviewer independence and governance

- The reviewer acts as an independent G3 English reviewer (`agent:g3-reviewer`), running on model `Gemini 3.8 Flash (Medium)`.
- The reviewer did not author, translate, or illustrate candidate unit material.
- The candidate author commit is recorded as `commit:fff432dd569f4713da4121bf3a681cbb470d07fa`.
- The reviewer session ID is recorded as `28741b13-4cb9-4d34-886d-5c11b6edf8a3`.
- In compliance with ADR-0019 and AGENTS.md, the reviewer does not tick G3, does not add initials, does not write to tasks.md, and does not claim certification.
