# GCCE-400 Unit 3 (Rights and Responsibilities) - G3 English review summary (cycle 2)

- **Reviewer:** agent:claude (independent; did not author or translate this unit)
- **Model:** LongCat-2.5
- **Reviewer run ID:** 7558a5eb-ca9c-48c8-bdd0-b7deb07922bf
- **Reviewer run:** crew-job:gcce-400-u03-review_en-r1
- **Author run:** crew-job:gcce-400-u03-author; repair run crew-job:gcce-400-u03-repair_en
- **Date:** 2026-11-23
- **Reviewed commit:** `dd2b914838b704cc754b14f06751be96540dcd7f` (HEAD)
- **Deployed SHA (render input):** `dd2b914838b704cc754b14f06751be96540dcd7f` (equal to HEAD)
- **Disposition:** **escalate** (advisory only)
- **Supersedes:** `specs/content/gcce-400/reviews/unit-03/G3/52caad24-9ea1-412b-918e-0ec74d99f5d0.json`

The unit is well written and the cycle 1 repairs are verified: the constitutional count is
twenty-five with Article 9A and Articles 23-24 taught, the MCQ 4 key and stem no longer misquote
Article 25(2) or point to Article 26, the Article 184(3) proviso is disclosed, Article 26's
examples are narrowed, the blueprint's four-scenario Analyze item is now RRQ 10, and the Glencoe
declaration names D-2026-0001. All deterministic gates pass. The review cannot pass the unit:
Article 184 was repealed, and the live render tool exits 1 on tooling artifacts.

## Verified repairs from cycle 1

1. **F1 (blocking, resolved):** `topic-01.mdx:82` now says Chapter 1 of Part II has twenty-five
   articles after the Twenty-sixth Amendment (2024) added Article 9A; Article 9A is taught at
   `topic-01.mdx:86` and Articles 23-24 at `topic-01.mdx:92-99`. The current transcription
   confirms 25 articles (8 to 28) and Article 9A between Articles 9 and 10. `sources/unit-03.md:18`
   no longer claims later amendments don't alter the rights.
2. **F2 (blocking, resolved):** the MCQ 4 key (`unit-assessment.mdx:131`) now reads "on the basis
   of sex", matching the current Article 25(2) and the unit's own prose.
3. **F3 (uncertain, resolved):** MCQ 4 (`unit-assessment.mdx:47-51`) is now a gender-
   differentiated traffic fine, which Article 25 governs; Article 26 is not implicated and the
   key selects Article 25.
4. **F4 (uncertain, resolved):** `topic-01.mdx:52` now states the Supreme Court may act on an
   application and cannot act suo motu beyond it, disclosing the Twenty-sixth Amendment proviso.
5. **F5 (uncertain, resolved):** RRQ 10 (`unit-assessment.mdx:94`) is the blueprint's four-
   scenario Analyze item, naming the right at stake and the balancing duty in each scenario.
6. **F6 (uncertain, resolved):** the deployed SHA now equals HEAD, so the live site is the review
   input and a live render inspection was performed.
7. **F7 (advisory, resolved):** `topic-01.mdx:107` now gives Article 26 examples as "places of
   public entertainment or resort, such as public parks".
8. **F8 (advisory, resolved):** `sources/unit-03.md:14` names owner ruling D-2026-0001, and the
   prose at `topic-01.mdx:43` / `topic-02.mdx:45` presents the idea as general civics knowledge
   with the book as an example.

## Unresolved finding

- **F9 (blocking):** Article 184 was omitted from the Constitution by the Twenty-seventh
  Amendment Act, 2025 (Article 29, effective 13 November 2025). The public-importance
  fundamental-rights jurisdiction now sits in the Federal Constitutional Court under Article
  175E(3), which requires an application. The unit still teaches the repealed article and court
  at `topic-01.mdx:52`, `unit-assessment.mdx:101`, `unit-assessment.mdx:141` and
  `unit-assessment.mdx:168-169`, and `sources/unit-03.md:7,18` still claims the article is current.
  Repair: re-point these passages to Article 175E(3) and the Federal Constitutional Court (or
  state the transfer), and correct the sources note.

## Render inspection

Because the deployed SHA equals HEAD, `scripts/heavy.sh node scripts/render-inspect.mjs GCCE-400
3 --base https://textbook.com.pk --no-pdf` was run and its log and 10 PNGs are recorded. The live
pages are clean: no heading-level jumps, no missing alt text, no document overflow at 360px, every
wide table scrolls with `tabindex="0"` and an aria-label, A4 print has zero clipped elements and
the answers section renders. The tool exited 1 on six artifacts: Section D tested `.svg` variants
on the two WebP illustrations (fig-U3-6, fig-U3-7), and the desktop pass measured two below-fold
lazy images before Chrome loaded them. A follow-up scroll probe (`logs/probe-figure-loading.txt`)
measures fig-U3-2.svg at 860x640 and fig-U3-4.svg at 860x563, both complete and visible. In
accordance with the brief this is treated as a tooling limitation, so accessibility is recorded
as unverified for machine pass rather than as a content defect.

## Escalation rationale

1. **Cycle limit:** this is review cycle 2, the final cycle under ADR-0019. F9 is a blocking
   content defect that a further repair would address, but a third cycle needs owner
   authorisation.
2. **Tooling:** `render-inspect.mjs` exits 1, so the machine pass contract for `render-review`
   cannot be met even though the pages inspect clean.
3. **Governance:** this report is advisory only. No protected signing host or qualified registry
   entry was used, so it does not certify G3 or support a tracker done state. The unit escalates
   to the owner for a ruling on the Article 184 repair and final editorial qualification.

## Evidence

- `manifest.json` (97 bound inputs)
- `logs/validate-content.txt`, `logs/check-unit-depth.txt`, `logs/check-figures.txt`,
  `logs/check-no-em-dash.txt`, `logs/check-no-answer-keys.txt`, `logs/check-docs-sync.txt`,
  `logs/check-concept-graph.txt`, `logs/check-bloom-bands.txt`, `logs/check-svg-style.txt`,
  `logs/check-source-floor.txt`, `logs/measure-figure-text.txt`, `logs/build-content-status.txt`,
  `logs/check-content.txt`, `logs/render-review.txt`, `logs/probe-figure-loading.txt`,
  `logs/static-accessibility.txt`, `logs/input-verification.txt`
- `source-verification.md`, `assessment-independent.md`
- `renders/` (10 PNGs, `render-inspect.json`, `render-inspect.log`)
