# Limitations - GCCE-400 Unit 4 G3 Review (Cycle 2)

## Render and print evidence unavailable

The crew brief prohibits `npm run build`, running a dev server, and running Playwright browser test suites.
The brief permits `scripts/render-inspect.mjs` only against the live production deployment at `https://textbook.com.pk`, and strictly conditional on the deployed SHA matching HEAD for the unit's English directory and figure assets:
`git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <unit English dir> static/img/figures/gcce-400/unit-04/`

Comparing the deployed commit with current HEAD:
- Deployed SHA: `ac3d5e2fcd1818492dd11bc9b72d8cfed9a25e8d`
- HEAD SHA: `175a90b7a644bd366cf3d1d2592090a93f912bcb`
- The diff is non-empty across three files:
  - `docs/semester-4/gcce-400/unit-04/topic-01.mdx` (19 changes: removed duplicate table, added descriptive link text)
  - `docs/semester-4/gcce-400/unit-04/topic-02.mdx` (14 changes: IAP2 Collaborate example and agency-decides sentence)
  - `docs/semester-4/gcce-400/unit-04/unit-assessment.mdx` (12 changes: MCQ 5 Apply/D key, ERQ 4 token consult rubric)

Because the deployed build reflects the pre-repair state and lacks the current unit files, inspecting the live site would evaluate stale bytes rather than reviewed inputs.
Per brief instructions:
"If the diff is not empty, the live site is not your input: record render-review as unavailable and name the deployed SHA and HEAD."

Consequences:
1. Visual accessibility (360px mobile viewport, table horizontal swipe containers, desktop presentation, A4 print layout, and dynamic figure clipping) is unverified in live rendering.
2. Structural accessibility (semantic markdown headings, figure alt text, SVG role="img", aria-labelledby, title, and desc attributes) passes completely from source examination.
3. `render-review` is recorded as unavailable with exit code 1 in command records.
4. Disposition is ESCALATE due to unavailable render evidence.

## Figure geometry verification

`node scripts/measure-figure-text.mjs static/img/figures/gcce-400/unit-04/*.svg` executed with exit code 0 across all 20 SVG assets:
- `fig-U4-1.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x560)
- `fig-U4-2.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x490)
- `fig-U4-3.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x520)
- `fig-U4-4.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x580)
- `fig-U4-5.svg` / `.dark.svg` / `.ur.svg` / `.ur.dark.svg` (780x420)

Zero text clipping, zero viewBox boundary overflows, and zero collisions with the textbook wordmark were found.

## Reviewer independence and governance

- The reviewer acts as an independent G3 English reviewer (`agent:g3-reviewer`), running on model `Gemini 3.8 Flash (Medium)`.
- The reviewer did not author, translate, or repair any candidate unit material.
- The candidate repair commit is recorded as `commit:1cfa8056c4c315af0d7abc4fc88f25b40db8ad56`.
- The reviewer session ID is recorded as `fa4c0502-c180-4c3e-8532-b789e0a94d5a`.
- In compliance with ADR-0019 and AGENTS.md, the reviewer does not tick G3, does not add initials, does not write to tasks.md, and does not claim certification.
