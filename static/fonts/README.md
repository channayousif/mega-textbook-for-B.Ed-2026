# Fonts

`NotoNastaliqUrdu-Regular.woff2` (FR-002) — the self-hosted Urdu webfont.

- Source: **Noto Nastaliq Urdu** (OFL), the Arabic/Urdu Unicode-range subset served by Google
  Fonts (`fonts.gstatic.com`), downloaded and committed for self-hosting so no third-party
  request is made on slow connections (Constitution V.5, research R3).
- Referenced by `@font-face` in `src/css/custom.css` with a matching `unicode-range` and
  `font-display: swap`, plus a Naskh/system fallback.
- ~159 KB (single weight). Further subsetting to only the glyphs used is a possible
  optimisation if the low-bandwidth budget (SC-002) needs it.

`Nunito-latin-variable.woff2`: **Nunito** (OFL), weights 500-800, the Latin subset served by Google
Fonts. English headings only. About 39 KB. Reading text stays on the device's own font to save data.

`NotoNaskhArabic-arabic-variable.woff2`: **Noto Naskh Arabic** (OFL), weights 400-700, the Arabic
subset served by Google Fonts. Urdu small text only. About 94 KB, and `unicode-range` keeps it off
English pages. Urdu headings stay at Noto Nastaliq Urdu Regular, because the variable Nastaliq with
a true bold costs 239 KB against 159 KB.
