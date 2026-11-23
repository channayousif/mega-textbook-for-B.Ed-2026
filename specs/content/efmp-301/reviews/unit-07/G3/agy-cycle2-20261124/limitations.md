# Limitations - EFMP-301 Unit 7 G3 cycle 2

## Render and print evidence unavailable

The crew brief prohibits `npm run build`, a dev server, and Playwright, permitting
`scripts/render-inspect.mjs` only against the production site `https://textbook.com.pk`.
The reviewed input is HEAD `ac3d5e2fcd1818492dd11bc9b72d8cfed9a25e8d`;
the deployed SHA is `98fbbb0647d5e2c6040059edcaaccc1317b620a1`.

Comparing the two reveals modifications to English prose and three newly placed illustration assets:
- `docs/semester-1/efmp-301/unit-07/index.mdx`
- `docs/semester-1/efmp-301/unit-07/topic-01.mdx`
- `docs/semester-1/efmp-301/unit-07/topic-02.mdx`
- `static/img/figures/efmp-301/unit-07/fig-U7-5.webp`
- `static/img/figures/efmp-301/unit-07/fig-U7-6.webp`
- `static/img/figures/efmp-301/unit-07/fig-U7-7.webp`

Because `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- docs/semester-1/efmp-301/unit-07/ static/img/figures/efmp-301/unit-07/` exits 1, the live site is stale and does not reflect the reviewed input.
Per brief instructions, `render-review` is recorded as unavailable (exit 1); no local build, dev server, or browser run was executed.

Consequences:
- Visual accessibility (360px small-screen layout, horizontal table scrolling, desktop layout, A4 print layout, and figure clipping) remains unverified.
- Structural accessibility (heading hierarchy, semantic tags, descriptive Figure alt text, SVG `role="img"` with `aria-labelledby`, `<title>`, and `<desc>`) passes completely from source inspection.
- The three newly placed raster figures (`fig-U7-5.webp`, `fig-U7-6.webp`, `fig-U7-7.webp`) are unverified in live rendering; stale asset serving is treated as a deployment matter rather than a content defect.

## Deterministic figure geometry

`node scripts/measure-figure-text.mjs` exits 0 across all 16 SVGs in `static/img/figures/efmp-301/unit-07/`.
Zero text overflows, zero viewBox clipping, and zero wordmark collisions were detected.

## Reviewer independence

The review was conducted by an independent session (`agent:g3-reviewer`) using `Gemini 3.8 Flash (Medium)`.
The reviewer did not author or translate any unit files. The author run identity is recorded as
`commit:5995f7523fb2357f51c382b6e5742e00fc24bbb3`.
No reviewer initials are used and no certification is claimed.
