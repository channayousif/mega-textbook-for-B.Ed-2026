# Unit 1 G3 repair handoff (Round 2)

Report addressed: `specs/content/efmp-406/reviews/unit-01/G3/20261108T203238Z-g3-desk-5985010a.json` (disposition: revise).
This is an author repair record, not an independent review or certification.

- Advisory 1 (Teaching case illustrations and hypothetical examples): Verified that fictional classroom scenarios and family narratives (Nadia in Tando Allahyar, Bilal in Sukkur, Sana, Imran, Mariam's mother, munshi and khata cases) are explicitly labeled as original illustrative instructional examples designed for pedagogy across `index.mdx` (line 44), `topic-01.mdx` (line 22), `topic-02.mdx` (line 22), `unit-assessment.mdx` (line 30), `unit-teacher-notes.mdx` (line 14), and `specs/content/efmp-406/sources/unit-01.md` (lines 1-3), with exact mirroring across all corresponding Urdu MDX files. They are explicitly distinguished from empirical case studies or official school inspection records.
- Advisory 2 (Headless review tooling constraint): Retained the headless review tooling constraint documented per ADR-0019 / ADR-0032. Host resource limits strictly prohibit running `npm run build`, a local dev server, or Playwright Chromium. Visual and structural checks remain verified clean via `measure-figure-text.mjs` (all 8 SVG variants exit 0 with zero overflow or collision), static heading progression, and table container analysis. Render inspection on browser (desktop / 360px narrow) and A4 print remains an owner and independent reviewer handoff.
- Advisory 3 (Abstract-level citation for Shakir et al., 2012): Verified that Shakir, Lone, and Zafar (2012) citations in topic prose (`topic-01.mdx:106`, `topic-02.mdx:62,127`), assessment marking guidance (`unit-assessment.mdx:136`), further reading lists (`topic-01.mdx:192`, `topic-02.mdx:187`), and source documentation (`sources/unit-01.md:8`, `sources/texts/shakir-2012-literacy-pk.md:6-8`) are strictly qualified as limited to findings reported in the published abstract retrieved via Semantic Scholar (HTTP 403 publisher response on 2026-11-02 noted), mirrored in Urdu.
- Advisory 4 (Catalog entry pending owner ruling): Retained the pending owner ruling documented in `content-spec.md`: EFMP-406 is proposed for Semester 3 in `catalog/courses.json` but not yet committed pending an owner ruling. The job brief explicitly forbids editing `catalog/` or approved content specifications; this item remains reserved for curriculum-owner action.

## Unresolved evidence and ownership

Current rendered desktop, narrow-screen (360px), and A4 print inspection remain pending for an authorized browser host due to strict crew resource constraints. Catalog entry and independent G3 certification remain with the owner and fresh independent reviewer. Unit 1 G3 remains unticked.

## Validation

All 14 content gates pass (`npm run check:content`). Zero em dashes across all files (`npm run check:no-em-dash`). Figure text geometry is verified clean across all 8 SVG variants.
