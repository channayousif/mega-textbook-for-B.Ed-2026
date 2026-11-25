# Limitations - EFMP-408 Unit 2 G3 Review (Run 1)

## Render and print evidence unavailable

The crew brief prohibits `npm run build`, running a dev server, and running Playwright browser test suites.
The brief permits `scripts/render-inspect.mjs` only against the live production deployment at `https://textbook.com.pk`, and strictly conditional on the deployed SHA matching HEAD for the unit's English directory and figure assets:
`git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <unit English dir> static/img/figures/efmp-408/unit-02/`

Comparing the deployed commit with current HEAD:
- Deployed SHA: `3910d26161b35a1faf18ce848fd50ab0b4cf59f7`
- HEAD SHA: `7bb9e4d484428859cbfe2f6e3775c0e8291b11ea`
- The diff is non-empty across two files:
  - `docs/semester-4/efmp-408/unit-02/index.mdx` (2 changes: added Figure tag for banner `fig-U2-7`)
  - `static/img/figures/efmp-408/unit-02/fig-U2-7.webp` (binary file added: banner illustration)

Because the deployed build reflects the pre-illustration commit and lacks current unit assets at HEAD, inspecting the live site would evaluate stale bytes rather than reviewed inputs.
Per brief instructions:
"If the diff is not empty, the live site is not your input: record render-review as unavailable and name the deployed SHA and HEAD."

Consequences:
1. Visual accessibility (360px mobile viewport, table horizontal swipe containers, desktop presentation, A4 print layout, and dynamic figure clipping) is unverified in live rendering.
2. Structural accessibility (semantic markdown headings, figure alt text, SVG role="img", aria-labelledby, title, and desc attributes) passes completely from source examination.
3. `render-review` is recorded as unavailable with exit code 1 in command records.
4. Disposition is ESCALATE due to unavailable render evidence.

## Figure geometry verification

`scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efmp-408/unit-02/*.svg` executed with exit code 0 across all 24 SVG assets:
- `fig-U2-1.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x540)
- `fig-U2-2.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x440)
- `fig-U2-3.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x470)
- `fig-U2-4.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x540)
- `fig-U2-5.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x480)
- `fig-U2-6.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x420)

Zero text clipping, zero viewBox boundary overflows, and zero collisions with the textbook wordmark were found.

## Reviewer independence and governance

- The reviewer acts as an independent G3 English reviewer (`agent:g3-reviewer`), running on model `Gemini 3.8 Flash (Medium)`.
- The reviewer did not author, translate, or illustrate candidate unit material.
- The candidate author commit is recorded as `commit:524d79d15d0f9f4023c1ec340055de8a2a136091`.
- The reviewer session ID is recorded as `62f64eb3-3275-4677-b6da-317a8e876527`.
- In compliance with ADR-0019 and AGENTS.md, the reviewer does not tick G3, does not add initials, does not write to tasks.md, and does not claim certification.
