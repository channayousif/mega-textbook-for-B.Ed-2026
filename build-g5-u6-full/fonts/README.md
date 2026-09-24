# Fonts

`NotoNastaliqUrdu-Regular.woff2` (FR-002) — the self-hosted Urdu webfont.

- Source: **Noto Nastaliq Urdu** (OFL), the Arabic/Urdu Unicode-range subset served by Google
  Fonts (`fonts.gstatic.com`), downloaded and committed for self-hosting so no third-party
  request is made on slow connections (Constitution V.5, research R3).
- Referenced by `@font-face` in `src/css/custom.css` with a matching `unicode-range` and
  `font-display: swap`, plus a Naskh/system fallback.
- ~159 KB (single weight). Further subsetting to only the glyphs used is a possible
  optimisation if the low-bandwidth budget (SC-002) needs it.
