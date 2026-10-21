# Unit 9 baseline comparison

Baseline was run before any edits at `origin/main` and HEAD `1a2dd365daf23bcf183154632f962ed0b8946e9f`. The final run uses the Unit 9 G2 record `20261021T061433933Z-gates.json`.

Both runs pass 12 of 13 content gates. The complete finding sets are identical: `static/content-status.json is missing`. This generated ignored file was already absent in the clean checkout. No new finding remains. Full logs are adjacent to this record. No build, dev server, browser or Playwright was run. The 46 figure-palette tests passed under `scripts/heavy.sh`. Dark variant freshness and `git diff --check` passed. Representative light and dark figures were visually inspected from temporary local raster previews.

G3/G5 and publication remain untouched. The shared glossary is outside this unit-only brief: vocabulary is defined inline, and bilingual glossary integration remains with the terminology/translation owner.
