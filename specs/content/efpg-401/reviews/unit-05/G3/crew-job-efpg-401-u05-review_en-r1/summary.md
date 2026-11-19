# EFPG-401 Unit 5 Independent G3 English Review Summary (Cycle 2)

**Reviewed commit:** `e46b9d5ffb3dc9057e3c995a45be2c3fd39b21fa`
**Stage:** G3 English review (Cycle 2, final cycle under ADR-0019)
**Reviewer:** `agent:agy` (Gemini 3.8 Flash (Medium)), run `5682982d-2bb3-4b3f-bceb-973d53377aba`
**Author run:** `crew-job:efpg-401-u05-author` (opencode); repair run `crew-job:efpg-401-u05-repair_en` (claude). This reviewer did not draft, repair, or translate this unit.
**Disposition:** escalate (advisory only)
**Supersedes:** `specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en.json`

## What holds and verified repairs

The unit covers all ten approved Lesson Planning leaves (guide section 5, `3rd 2026.txt:74-81`; content-spec U5-01 to U5-10) in seven topic files. Each topic contains an authentic Sindh classroom situation, an explanation, a worked plan, a collaborative activity, a retrieval check, a practicum school task, and a summative task with a mini-rubric. All explanations are readable at HSC level. The end-of-unit assessment satisfies the 10/10/5 blueprint with a Create-level lesson plan ERQ.

Every finding from the cycle 1 review (`crew-job-efpg-401-u05-review_en.json`) was verified against the current repository state:
1. **Topic 5.2 Missing Step Activity:** The quoted Grade 4 plan in `topic-02.mdx:73` now omits the practice step, giving the activity a clear and determinate answer.
2. **Title-Level Source Claims:** All in-text claims attributed to Celce-Murcia (1991) and Sheikh (1998) were removed from topic prose. Both works are cited only in `## Further reading`, and lesson guidance is framed as the unit's own in full alignment with `sources/unit-05.md` `## Mapped-reading limits` and `coverage/unit-05.md`.
3. **Paulsrud & Gheitasi (2024) Alignment:** In-text references in `topic-01.mdx:43` and `topic-03.mdx:37` strictly follow the bound abstract-level evidence notes in `sources/texts/paulsrud-2024-lesson-planning.md`.
4. **SVG Artifacts and Labels:** The leaked "180 units" labels in `fig-U5-2.svg` and its dark variant were removed. All 14 schematic SVGs measure clean on text geometry with no viewBox overflow and no wordmark overlap.
5. **Alt Text Alignment:** Alt texts for `fig-U5-1` and `fig-U5-14` accurately reflect figure content.
6. **MCQ Key Distribution:** Option order was rebalanced across all four letters (B, D, C, A, C, A, D, C, B, D).
7. **RRQ 7 Terminology:** `unit-assessment.mdx:107` now correctly contrasts a literal question with an inferential question.
8. **Guided Writing Sequence:** `topic-06.mdx:59` aligns with the five-step guided writing sequence taught in the topic.
9. **Independent Assessment Solution:** All ten MCQs were solved independently prior to inspecting the answer section (derived key: B, D, C, A, C, A, D, C, B, D); full agreement with the provided key.
10. **Deterministic Gates:** All mandatory review commands (`validate:content`, `check:depth-gate`, `check:figures`, `check:no-em-dash`, `check:no-answer-keys`, `check:docs-sync`) and all 14 repository content gates (`npm run check:content`) exited 0.

## Render inspection and visual verification

Because `cat ~/deploy/deployed-sha` (`e46b9d5ff...`) matches HEAD, live site inspection was executed via `scripts/heavy.sh node scripts/render-inspect.mjs EFPG-401 5 --base https://textbook.com.pk --no-pdf`.
- Desktop 1280x900: All 9 pages loaded with HTTP 200, no broken visible images, no missing alt text, and no horizontal overflow.
- Narrow 360x780: Document horizontal overflow is 0px across all pages. Tables scroll within their own containers with `tabindex="0"` and descriptive `aria-label`.
- A4 Print (794px): Zero clipped elements across all pages. Answers and marking guidance rendered on `unit-assessment`.
- SVGs: All 14 placed schematics (fig-U5-1 to fig-U5-14) passed glyph and wordmark bounds.
- 18 full-page PNG screenshots captured and staged in `renders/`.

`render-inspect.mjs` exited with code 1 due to Section D testing `.svg` URL variants on the 4 placed WebP raster illustrations (`fig-U5-16` to `fig-U5-19`), which were verified loaded as WebP in Section A. In accordance with the brief, this asset variance is treated as unverified rather than a content defect.

## Escalation rationale

1. **Cycle Limit Reached:** This is review cycle 2 (the final permitted cycle under ADR-0019).
2. **Tooling Limitation:** `render-inspect.mjs` exit code 1 prevents automated machine pass validation.
3. **Governance Boundary:** In accordance with repository constitution and ADR-0019, this independent review is advisory only. No server-protected signing host or qualified registry entry was used, so it does not certify G3 or support a tracker done state. The unit escalates to human editorial review for final qualification.
