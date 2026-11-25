# Limitations - EFMP-303 Unit 6 G3 cycle 2

## Render and print evidence unavailable

The crew brief prohibits `npm run build`, a dev server, and Playwright, permitting
`scripts/render-inspect.mjs` only against the production site `https://textbook.com.pk`.
The reviewed input is HEAD `5a14660cb91f1f66e7f24ddceaad8e042fa64673`;
the deployed SHA is `7ca7b21298e4f5c59211b816273bd968a9799271`.

Comparing the two reveals modifications to English prose and four newly placed illustration assets:
- `docs/semester-2/efmp-303/unit-06/index.mdx`
- `docs/semester-2/efmp-303/unit-06/topic-01.mdx`
- `docs/semester-2/efmp-303/unit-06/topic-02.mdx`
- `docs/semester-2/efmp-303/unit-06/topic-03.mdx`
- `static/img/figures/efmp-303/unit-06/fig-U6-7.webp`
- `static/img/figures/efmp-303/unit-06/fig-U6-8.webp`
- `static/img/figures/efmp-303/unit-06/fig-U6-9.webp`
- `static/img/figures/efmp-303/unit-06/fig-U6-10.webp`

Because `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- docs/semester-2/efmp-303/unit-06/ static/img/figures/efmp-303/unit-06/` exits 1, the live site is stale and does not reflect the reviewed input.
Per brief instructions, `render-review` is recorded as unavailable (exit 1); no local build, dev server, or browser run was executed.

Consequences:
- Visual accessibility (360px small-screen layout, horizontal table scrolling, desktop layout, A4 print layout, and figure clipping) remains unverified.
- Structural accessibility (heading hierarchy, semantic tags, descriptive Figure alt text, SVG `role="img"` with `aria-labelledby`, `<title>`, and `<desc>`) passes completely from source inspection.
- The four newly placed raster figures (`fig-U6-7.webp`, `fig-U6-8.webp`, `fig-U6-9.webp`, `fig-U6-10.webp`) are unverified in live rendering; stale asset serving is treated as a deployment matter rather than a content defect.

## Deterministic figure geometry

`node scripts/measure-figure-text.mjs` exits 0 across all 24 SVGs in `static/img/figures/efmp-303/unit-06/`.
Zero text overflows, zero viewBox clipping, and zero wordmark collisions were detected.
The prior cosmetic wordmark collision on `fig-U6-2.svg` is verified resolved (canvas height expanded to 540).

## Reviewer independence

The review was conducted by an independent session (`agent:g3-reviewer`) using `Gemini 3.8 Flash (Medium)`.
The reviewer did not author or translate any unit files. The author run identity is recorded as
`commit:846ab64ff19293a479a0e66c61d56eb7bbcf929d`.
No reviewer initials are used and no certification is claimed.
