# Limitations - GENT-401 Unit 2 G3 Review (Run 1)

## Render and print evidence unavailable

The crew brief prohibits `npm run build`, running a dev server, and running Playwright browser test suites.
The brief permits `scripts/render-inspect.mjs` only against the live production deployment at `https://textbook.com.pk`, and strictly conditional on the deployed SHA matching HEAD for the unit's English directory and figure assets:
`git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <unit English dir> static/img/figures/gent-401/unit-02/`

Comparing the deployed commit with current HEAD:
- Deployed SHA: `366019f8ace647e892523e553b81ab6d1832ec68`
- HEAD SHA: `39ac555fd68079fbe4a9a92440f3408a2fcb7c46`
- The diff is non-empty across two files:
  - `docs/semester-4/gent-401/unit-02/index.mdx` (added Figure tag for banner `fig-U2-5`)
  - `static/img/figures/gent-401/unit-02/fig-U2-5.webp` (binary file added: banner illustration)

Because the deployed build reflects the pre-illustration commit and lacks current unit assets at HEAD, inspecting the live site would evaluate stale bytes rather than reviewed inputs.
Per brief instructions:
"If the diff is not empty, the live site is not your input: record render-review as unavailable and name the deployed SHA and HEAD."

Consequences:
1. Visual accessibility (360px mobile viewport, table horizontal swipe containers, desktop presentation, A4 print layout, and dynamic figure clipping) is unverified in live rendering.
2. Structural accessibility (semantic markdown headings, figure alt text, SVG role="img", aria-labelledby, title, and desc attributes) passes completely from source examination.
3. `render-review` is recorded as unavailable with exit code 1 in command records.
4. Disposition is ESCALATE due to unavailable render evidence.

## Figure geometry verification

`scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/gent-401/unit-02/*.svg` executed with exit code 0 across all 16 SVG assets:
- `fig-U2-1.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg`
- `fig-U2-2.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg`
- `fig-U2-3.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg`
- `fig-U2-4.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg`

Zero text clipping, zero viewBox boundary overflows, and zero collisions with the textbook wordmark were found.

## Reviewer independence and governance

- The reviewer acts as an independent G3 English reviewer (`agent:g3-reviewer`), running on model `Gemini 3.8 Flash (Medium)`.
- The reviewer did not author, translate, or illustrate candidate unit material.
- The candidate author commit is recorded as `commit:c512cbeaf5557bb5f1297b9dfbfa4caf2c460bef`.
- The reviewer session ID is recorded as `fe6a6335-fbbf-45e2-8c35-6c799b77114d`.
- In compliance with ADR-0019 and AGENTS.md, the reviewer does not tick G3, does not add initials, does not write to tasks.md, and does not claim certification.
