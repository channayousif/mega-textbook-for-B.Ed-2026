# Limitations - GENT-401 Unit 3 G3 Review (Run 1)

## Render and print evidence unavailable

The crew brief prohibits `npm run build`, running a dev server, and running Playwright browser test suites.
The brief permits `scripts/render-inspect.mjs` only against the live production deployment at `https://textbook.com.pk`, and strictly conditional on the deployed SHA matching HEAD for the unit's English directory and figure assets:
`git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <unit English dir> static/img/figures/gent-401/unit-03/`

Comparing the deployed commit with current HEAD:
- Deployed SHA: `366019f8ace647e892523e553b81ab6d1832ec68`
- HEAD SHA: `d45dac6df448377759ad4c8f2ba5780a42409744`
- The diff is non-empty across two files:
  - `docs/semester-4/gent-401/unit-03/index.mdx` (2 changes: added Figure tag for banner `fig-U3-5`)
  - `static/img/figures/gent-401/unit-03/fig-U3-5.webp` (binary file added: banner illustration)

Because the deployed build reflects the pre-illustration commit and lacks current unit assets at HEAD, inspecting the live site would evaluate stale bytes rather than reviewed inputs.
Per brief instructions:
"If the diff is not empty, the live site is not your input: record render-review as unavailable and name the deployed SHA and HEAD."

Consequences:
1. Visual accessibility (360px mobile viewport, table horizontal swipe containers, desktop presentation, A4 print layout, and dynamic figure clipping) is unverified in live rendering.
2. Structural accessibility (semantic markdown headings, figure alt text, SVG role="img", aria-labelledby, title, and desc attributes) passes completely from source examination.
3. `render-review` is recorded as unavailable with exit code 1 in command records.
4. Disposition is ESCALATE due to unavailable render evidence.

## Figure geometry verification

`scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/gent-401/unit-03/*.svg` executed with exit code 0 across all 16 SVG assets:
- `fig-U3-1.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x680)
- `fig-U3-2.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x490)
- `fig-U3-3.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x600)
- `fig-U3-4.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x600)

Zero text clipping, zero viewBox boundary overflows, and zero collisions with the textbook wordmark were found.

## Reviewer independence and governance

- The reviewer acts as an independent G3 English reviewer (`agent:g3-reviewer`), running on model `Gemini 3.8 Flash (Medium)`.
- The reviewer did not author, translate, or illustrate candidate unit material.
- The candidate author commit is recorded as `commit:7cbdfae847e62db99b2ad2f7d2b6ca6ebefda8e9` (with illustration placed in `commit:b2f8ced1a`).
- The reviewer session ID is recorded as `d06d5d28-9ecb-4076-99c8-f8b1065bb4ec`.
- In compliance with ADR-0019 and AGENTS.md, the reviewer does not tick G3, does not add initials, does not write to tasks.md, and does not claim certification.
