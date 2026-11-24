# Limitations - GCCE-400 Unit 6 G3 Review (Run 1)

## Render and print evidence unavailable

The crew brief prohibits `npm run build`, running a dev server, and running Playwright browser test suites.
The brief permits `scripts/render-inspect.mjs` only against the live production deployment at `https://textbook.com.pk`, and strictly conditional on the deployed SHA matching HEAD for the unit's English directory and figure assets:
`git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <unit English dir> static/img/figures/gcce-400/unit-06/`

Comparing the deployed commit with current HEAD:
- Deployed SHA: `175a90b7a644bd366cf3d1d2592090a93f912bcb`
- HEAD SHA: `6da753a0c89ff4be5d224b7884655bf7520911c2`
- The diff is non-empty across two files:
  - `docs/semester-4/gcce-400/unit-06/index.mdx` (2 changes: added Figure tag for banner `fig-U6-7`)
  - `static/img/figures/gcce-400/unit-06/fig-U6-7.webp` (binary file added: banner illustration)

Because the deployed build reflects the pre-illustration commit and lacks the current unit files, inspecting the live site would evaluate stale bytes rather than reviewed inputs.
Per brief instructions:
"If the diff is not empty, the live site is not your input: record render-review as unavailable and name the deployed SHA and HEAD."

Consequences:
1. Visual accessibility (360px mobile viewport, table horizontal swipe containers, desktop presentation, A4 print layout, and dynamic figure clipping) is unverified in live rendering.
2. Structural accessibility (semantic markdown headings, figure alt text, SVG role="img", aria-labelledby, title, and desc attributes) passes completely from source examination.
3. `render-review` is recorded as unavailable with exit code 1 in command records.
4. Disposition is ESCALATE due to unavailable render evidence.

## Figure geometry verification

`scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/gcce-400/unit-06/*.svg` executed with exit code 0 across all 24 SVG assets:
- `fig-U6-1.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x550)
- `fig-U6-2.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x400)
- `fig-U6-3.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x560)
- `fig-U6-4.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x410)
- `fig-U6-5.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x480)
- `fig-U6-6.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x500)

Zero text clipping, zero viewBox boundary overflows, and zero collisions with the textbook wordmark were found.

## Reviewer independence and governance

- The reviewer acts as an independent G3 English reviewer (`agent:g3-reviewer`), running on model `Gemini 3.8 Flash (Medium)`.
- The reviewer did not author, translate, or illustrate candidate unit material.
- The candidate author commit is recorded as `commit:83395d0296907b259329dd93071f020f043f0e8f`.
- The reviewer session ID is recorded as `759d9e52-79fb-4844-92e5-0c1c6b4bceef`.
- In compliance with ADR-0019 and AGENTS.md, the reviewer does not tick G3, does not add initials, does not write to tasks.md, and does not claim certification.
