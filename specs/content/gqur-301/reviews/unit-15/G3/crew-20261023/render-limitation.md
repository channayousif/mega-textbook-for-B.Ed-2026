# Render review unavailable; figure source inspection

The crew brief prohibits npm run build, a dev server and Playwright. No page, 360px narrow-viewport,
keyboard or A4 print inspection was performed, no render-review command is claimed and no page image exists.
`measure-figure-text.mjs` launches headless Chromium and was not run.

## Figure source inspection (not a render)

- `static/img/figures/gqur-301/unit-15/` contains only `fig-U15-1.svg` and `fig-U15-1.dark.svg`.
- topic-01 (fig-U15-2), topic-02 (fig-U15-3, fig-U15-4) and topic-03 (fig-U15-5, fig-U15-6) each place a live
  `<Figure src="/img/figures/gqur-301/unit-15/fig-U15-N.svg">` whose file does not exist; their manifest rows are
  `prompt-only` with an empty Src. The pages would show five broken images. `check:figures` passes regardless
  (finding F1).
- fig-U15-1.svg: viewBox 0 0 600 360, role="img", aria-labelledby title + desc; desc matches the page alt and
  manifest alt; every class used (bg, box, diamond, keep, line, no-line, reject, wm, yes-line) is defined in the
  embedded style; labels "1. State H0 and H1" ... "p <= alpha ?", "Yes: Reject H0", "No: Do not reject H0"
  match the five-step text. Glyph overflow was not measured.
- fig-U15-3 alt/prompt marks z = 1.82 in a two-tailed do-not-reject region beside a worked example that
  computes z = 1.84, right-tailed, reject (F2). fig-U15-2 alt says x-bar = 75 "falls in the right tail" next
  to shaded rejection regions whose two-tailed critical value is x-bar = 75.31 (F3).
- Headings are sequential (H2/H3) in every file; further-reading links show full URLs; tables have header rows.
