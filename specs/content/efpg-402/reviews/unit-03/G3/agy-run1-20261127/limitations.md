# Limitations - EFPG-402 Unit 3 G3 Review (Run 1)

## Render and print evidence unavailable

The crew brief prohibits `npm run build`, running a dev server, and running Playwright browser test suites.
The brief permits `scripts/render-inspect.mjs` only against the live production deployment at `https://textbook.com.pk`, and strictly conditional on the deployed SHA matching HEAD for the unit's English directory and figure assets:
`git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <unit English dir> static/img/figures/efpg-402/unit-03/`

Comparing the deployed commit with current HEAD:
- Deployed SHA: `0cbed86bb96f7a6a03420ad3e5d726a47e8f5513`
- HEAD SHA: `956c4ba9149ccc34e41e7d1dc31c624f7709d1b6`
- The diff is non-empty across two files:
  - `docs/semester-4/efpg-402/unit-03/index.mdx` (added Figure tag for banner `fig-U3-15`)
  - `static/img/figures/efpg-402/unit-03/fig-U3-15.webp` (binary file added: banner illustration)

Because the deployed build reflects the pre-illustration commit and lacks current unit assets at HEAD, inspecting the live site would evaluate stale bytes rather than reviewed inputs.
Per brief instructions:
"If the diff is not empty, the live site is not your input: record render-review as unavailable and name the deployed SHA and HEAD."

Consequences:
1. Visual accessibility (360px mobile viewport, table horizontal swipe containers, desktop presentation, A4 print layout, and dynamic figure clipping) is unverified in live rendering.
2. Structural accessibility (semantic markdown headings, figure alt text, SVG role="img", aria-labelledby, title, and desc attributes) passes completely from source examination.
3. `render-review` is recorded as unavailable with exit code 1 in command records.
4. Disposition is ESCALATE due to unavailable render evidence.

## Figure geometry verification

`scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efpg-402/unit-03/*.svg` executed with exit code 0 across all 28 SVG assets:
- `fig-U3-1.svg` / `.dark.svg` through `fig-U3-14.svg` / `.dark.svg`

Zero text clipping, zero viewBox boundary overflows, and zero collisions with the textbook wordmark were found.

## Reviewer independence and governance

- The reviewer acts as an independent G3 English reviewer (`agent:g3-reviewer`), running on model `Gemini 3.8 Flash (Medium)`.
- The reviewer did not author, translate, or illustrate candidate unit material.
- The candidate author commit is recorded as `commit:8b58f672de81406058d75f3bc7d1557cfeef44cf`.
- The reviewer session ID is recorded as `3043d3cb-2c9a-4666-bb72-3769cdb90044`.
- In compliance with ADR-0019 and AGENTS.md, the reviewer does not tick G3, does not add initials, does not write to tasks.md, and does not claim certification.
