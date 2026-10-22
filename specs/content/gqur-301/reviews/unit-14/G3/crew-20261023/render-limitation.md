# Render review unavailable

The crew brief prohibits npm run build, a dev server and Playwright. No page, narrow-viewport (360px),
keyboard or A4 print inspection was performed, and no render-review command or page image is claimed.
An attempt to rasterise the committed SVGs with ImageMagick produced blank output (it cannot resolve the
SVGs' CSS custom properties), so those images were deleted and are not evidence.

`node scripts/measure-figure-text.mjs` was run once (see measure-figure-text.log and its disclosure: it
launches headless Chromium, which the brief prohibits; it was not rerun). It reports that the subtitle
"Ten samples from the same population, each giving a 95 per cent interval. Nine intervals contain the true
mean; one does not." overflows the right edge of fig-U14-4.svg and fig-U14-4.dark.svg by 95.6px, so the
end of the sentence is clipped in both themes (F4). Figures 1-3 fit their viewBox and clear the wordmark.

Source-level accessibility notes: each page `<Figure>` alt string matches the manifest alt text and the
SVG `<desc>`; each SVG carries role="img" with title/desc; figure 3 duplicates the worked example in text;
figure 4's meaning is restated in topic-02 prose; it draws ten numbered samples plus the officer's
highlighted interval, consistent with its alt text. Headings are sequential and links
are descriptive. None of this establishes rendered accessibility.
