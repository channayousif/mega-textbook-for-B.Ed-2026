# GQUR-301 Unit 11 G3: figure source inspection

Source-level inspection of the four committed light SVGs (viewBox 0 0 780 480). This is NOT a
render inspection: `scripts/measure-figure-text.mjs` launches headless Chromium, which the crew brief
forbids in this job, so glyph geometry was estimated from font size and character count only.

- fig-U11-1 (concept-map): centre panel x 225-555, side panels x 25-375 and 405-755. Longest line
  "Set by mean and standard deviation" (34 chars at 16px, est. ~280px from x 425) ends near x 705,
  inside the 755 panel edge. Content matches topic-01 (binomial conditions, normal parameters).
- fig-U11-2 (diagram): Rs 6,000 for 120 booklets at Rs 50 and 5% of 120 = 6 expected absences
  match topic-01 "A real classroom situation".
- fig-U11-3 (diagram): bar heights at 7px per percentage point reproduce the Binomial(10, 0.25) pmf
  (k = 0 bar 39.42px = 5.63%; k = 2 bar 197.10px = 28.16%, the maximum). Annotations "Combined
  probability: 7.8%", "Most likely score: 2; expected score: 2.5" agree with numeric-verification.log
  and with the topic-02 alt text.
- fig-U11-4 (table): four rows at 14px; columns start at x 30/215/360/565; longest cells
  ("in a similar-age group", "Proportion below cut-off", "Count of right responses") are estimated to
  end before the next column. Rows agree with topic-02 assumptions text.
- Each figure's footer source line (x 20) and the wordmark (x 768, end-anchored) do not share a span.

Alt text in the MDX and the manifest describe each figure's teaching meaning. Rendered contrast,
dark-variant appearance, narrow-screen and A4 print behaviour remain unverified (F8).
