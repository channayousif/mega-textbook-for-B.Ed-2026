# Unit 13 schematic production

- Rendered all four planned schematics in English and Urdu, with generated dark twins. Existing English Figure elements already referenced the missing SVGs; preserved their alt text and positions. Manifest now records the completed placements.
- Urdu Unit 13 topic files do not exist. G4 translation is blocked in the existing tracker. The translation owner must place fig-U13-1.ur.svg and fig-U13-2.ur.svg in topic-01, and fig-U13-3.ur.svg and fig-U13-4.ur.svg in topic-02, with translated alt text. No untranslated or partial topic pages were invented by this asset job.
- Urdu table columns and flowchart reading order are mirrored. Mathematical axes keep their normal increasing numeric direction. Plot data in figure 1 have Pearson coefficients +0.9, +0.3, -0.3 and -0.9; figure 4 uses the topic's actual five observations and line y-hat = 30 + 5.5x. Zero residual at (10,85) is explicitly labelled.
- All eight light sources optimised below 20 KB. Dark variants generated using FIGURE_ROOT scoped to Unit 13. Palette tests: 46 passed. Figure gate passed.
- Inspected 640 px non-browser raster previews of English and Urdu figures in both palettes. Preview copies resolved CSS variables before serial rendering with sharp because the local SVG renderer does not resolve them. Corrected Urdu numeric-range bidi and added regression-axis padding. Source SVGs retain the required token variables.
- Browser text measurements, site rendering, build and Playwright were not run because the crew brief expressly prohibits browser/build jobs. This inspection is production QA, not G3/G5 certification. Review gates remain open.
- origin/main e22259e7 reports only the pre-existing stale static/content-status.json finding. Asset changes require refreshed G2 deterministic evidence; do not reuse the previous digest manifest.

Final check:content: 12 gates pass; only check:content-status fails with the identical stale-file message observed on origin/main. G2 evidence refreshed using prepare-gate-evidence.mjs and its tracker reference updated. No new findings remain.
