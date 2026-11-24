# Scope limitations and environmental constraints - GCCE-400 Unit 7 G3 Review

Recorded on 2026-11-24 by independent G3 reviewer (agent:g3-reviewer).

## 1. Render and visual accessibility inspection

The review contract (`scripts/014-agent-review-governance/contracts/review-evidence.md`) and G3 rubric require inspection of rendered web pages (including 360px small-viewport behavior, table horizontal scrolling, desktop layouts, and A4 print views).

Per repository rules (`AGENTS.md`) and the crew brief:
- The host is a production 2-CPU / 12 GB server hosting live services. Running `npm run build`, a local development/preview server (`npm start`, `npm run serve`), or Playwright e2e browsers is strictly prohibited.
- `scripts/render-inspect.mjs` may only be executed against `--base https://textbook.com.pk` when the deployed commit matches HEAD.
- Inspection of `~/deploy/deployed-sha` yields `5a3deb303255eb4c6bd11d331722b8efac16cbca`.
- Comparison against HEAD (`88e07887c472884f65e99b9729b8073a3ff99f10`) demonstrates that candidate inputs differ on:
  - `docs/semester-4/gcce-400/unit-07/index.mdx` (2 insertions)
  - `static/img/figures/gcce-400/unit-07/fig-U7-9.webp` (new placed banner asset)
- Because the deployed site does not serve the candidate inputs, the live build cannot serve as rendered evidence for candidate HEAD.
- In accordance with brief instructions:
  - `render-review` is recorded as unavailable with exit code 1 in `logs/render-review.txt`.
  - The criterion `accessibility` is scored as `unverified`.
  - The overall disposition is set to `escalate` due to this limitation.

## 2. Structural accessibility and figure text geometry verification

While visual rendering inspection could not be completed on live browsers, structural accessibility was verified directly from candidate source files:
- Proper heading hierarchy (H1 -> H2 -> H3) maintained without skipping levels.
- All 9 figures (fig-U7-1 through fig-U7-9) possess rich, descriptive alternative text.
- All SVGs feature `role="img"`, `aria-labelledby`, `<title>`, and `<desc>` elements.
- `scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/gcce-400/unit-07/*.svg` executed and verified that all 32 SVG assets (including light, dark, Urdu, and Urdu dark twins) exit 0 with all text strictly contained within the viewBox and with no overprinting of the textbook wordmark.

## 3. Unverifiable sources under Owner Ruling D-2026-0001

Two sources cited in `specs/content/gcce-400/sources/unit-07.md` are declared under `## Unverifiable sources`:
1. `kymlicka-norman-2000` (Kymlicka, W., & Norman, W. (Eds.). (2000). *Citizenship in diverse societies*. Oxford University Press): Print volume. Used in Topics 7.1 and 7.4 solely for the general academic premise of shared citizenship across cultural diversity. No specific page claims or uncorroborated quotations are introduced.
2. `youniss-levine-2009` (Youniss, J., & Levine, P. (Eds.). (2009). *Engaging young people in civic life*. Vanderbilt University Press): Print volume. Used in Topic 7.2 solely for the general premise of youth experiential civic learning as reflected in its title.

Per Owner Ruling 2026-09-19 (decision `D-2026-0001`, Constitution Art. VII), transparent declaration with documented search attempts does not block a pass for `sources`. The declarations are honest, restrained, and do not overstate source claims.
