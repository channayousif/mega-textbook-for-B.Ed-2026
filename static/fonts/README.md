# Fonts

Place the self-hosted Urdu webfont here (FR-002):

- `NotoNastaliqUrdu-Regular.woff2` — a WOFF2 subset of **Noto Nastaliq Urdu** limited to
  the Urdu/Arabic Unicode ranges (see `unicode-range` in `src/css/custom.css`), single
  weight, to respect the low-bandwidth budget (SC-002, research R3).

The font file is a binary asset and is intentionally not committed as source; add it during
setup (e.g. subset from Google Fonts with `fonttools`/`glyphhanger`). The site builds
without it, but Urdu will fall back to system Naskh until it is present.
