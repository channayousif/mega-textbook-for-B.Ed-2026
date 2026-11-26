# EFMP-409 Unit 4 G3 Review - Limitations and Evidence Record

**Date:** 2026-11-26  
**Reviewer:** agent:g3-reviewer (agy session 6db538c7-bfd8-4d10-b233-a55663871884)

## 1. Render and Print Evidence Limitation

Per the crew brief and `AGENTS.md` host resource limits:
- Reviewers on this host must obey strict resource constraints: no `npm run build`, no development servers (`npm start`), and no Playwright browser test suites may be launched.
- Inspection of rendered output must use the production site at `https://textbook.com.pk` via `scripts/render-inspect.mjs EFMP-409 4 --base https://textbook.com.pk --no-pdf`, **only if** the deployed build on production matches the reviewed inputs at `HEAD`:
  ```bash
  git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- docs/semester-4/efmp-409/unit-04/ static/img/figures/efmp-409/unit-04/
  ```
- In this review run:
  - Deployed SHA: `074ab11456b999cf5d3c9b8aa6e603b2de834eb5`
  - Reviewed commit (HEAD): `b50f44f33e423da959742824832bdfd05e7a0933`
  - The diff is **not empty** (exit code 1): commit `8b00a3f53` placed banner illustration `fig-U4-7.webp` and inserted the `<Figure id="fig-U4-7" ... />` component into `docs/semester-4/efmp-409/unit-04/index.mdx`.
  - Because the deployed production build precedes this illustration placement, the production site does not serve the reviewed input.
  - Per the brief instructions, `render-review` is recorded as **unavailable (exit 1)**, and no local build or browser execution was initiated.

### Impact on Rubric Criteria:
- `accessibility`: Recorded as `unverified`.
  - Visual presentation criteria (small-screen 360px viewport table scrolling, desktop layout, A4 print layout, and visual figure clipping) could not be verified by direct browser rendering.
  - Structural accessibility passes via static source code and SVG inspection:
    - Semantic HTML headings properly structured (`h1` -> `h2` -> `h3`).
    - Every Figure component has descriptive, non-empty `alt` text.
    - All SVGs carry `role="img"`, `aria-labelledby`, `<title>`, and `<desc>`.
    - Figure text geometry was verified by `measure-figure-text.mjs` (exit code 0 across all 24 light and dark SVGs).
- Disposition: Under ADR-0019 and the review evidence contract, an `unverified` status on a required criterion precludes a `pass` disposition, resulting in an advisory disposition of **`escalate`**.

## 2. Islamic Content Verification Advisory

- Content-spec drafting note 8 states: "The reviewer should check the Islamic material (Surah Al-Alaq, the Hadith on knowledge, the Charter of Medina, the Last Sermon, As-Suffa) with a qualified scholar, per content-spec drafting note 8."
- In this unit, the Islamic material is handled with scholarly rigor:
  - Scripture is referenced explicitly (Surah Al-Alaq 96:1-5, Surah Az-Zumar 39:9, Surah Al-Mujadilah 58:11, Surah Taha 20:114, Surah Al-Baqarah 2:269, Surah Al-Ghashiyah 88:17-20) using accepted translations and paraphrasing without sectarian dogmatism.
  - Hadith citations name collection and reference number (Sunan Ibn Majah 224, Sahih Muslim 2699, Sahih al-Bukhari 5027).
  - The historical documents (Charter of Medina, Last Sermon, As-Suffa) are treated with historical and educational perspective rather than polemics.
  - Teacher notes explicitly advise student teachers to set classroom norms of scholarly respect and refer disputed theological interpretations to qualified scholars.
  - An advisory finding is recorded to preserve this notice for human qualification and final certification.
