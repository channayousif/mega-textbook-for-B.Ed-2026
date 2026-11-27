# Limitations: G3 Review of EFPG-402 Unit 1

Reviewer run ID: `e9bd17ee-cecf-4f54-9149-3a5da9b53668`  
Date: 2026-11-27

## Rendered visual inspection limitation

Under the host resource rules and crew brief instructions:
1. `npm run build`, local development servers, and local Playwright / Chromium headless browsers are prohibited on this shared host to protect production availability.
2. The crew brief directs:
   > "For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/efpg-402/unit-01/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs EFPG-402 1 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD."

3. The deployed commit at `~/deploy/deployed-sha` is `0cbed86bb96f7a6a03420ad3e5d726a47e8f5513`.
4. The current branch HEAD is `956c4ba914a2750e5058774e1d916bb4b11f7c5d`.
5. Checking the diff:
   `git diff --stat 0cbed86bb96f7a6a03420ad3e5d726a47e8f5513 HEAD -- docs/semester-4/efpg-402/unit-01 static/img/figures/efpg-402/unit-01/`
   reports:
   - `docs/semester-4/efpg-402/unit-01/index.mdx` (2 insertions placing `fig-U1-11.webp`)
   - `static/img/figures/efpg-402/unit-01/fig-U1-11.webp` (binary illustration asset added)

Because the deployed build does not contain these recent changes, the production website at `https://textbook.com.pk` is not the input for this commit. In accordance with the brief:
- `render-review` is recorded as unavailable (exit code 1).
- Visual rendering criteria (small-screen 360px viewport responsiveness, table scrolling, print styling) remain unverified.
- Disposition is set to `escalate` due to unavailable render evidence.

Structural accessibility, semantic HTML, descriptive alt text, and SVG glyph geometry (via `measure-figure-text.mjs`) were independently verified and passed.
