# Summary: G3 English Review of EFPG-402 Unit 2

- **Course**: EFPG-402 (Teaching of Science)
- **Unit**: 2 (Science Curriculum and Textbook)
- **Reviewer**: `agent:g3-reviewer`
- **Reviewer run ID**: `1947560f-ec6d-49d7-86e1-0c8e0c563ccb`
- **Author run ID**: `commit:5d85468c72977804305edf866ba720f47fc6ccb8`
- **Model**: Claude LongCat-2.5
- **Disposition**: `revise` (advisory only; G3 remains open and unsigned)

## What was reviewed

The five English topic files, `index.mdx` and `unit-assessment.mdx` for Unit 2, its coverage
matrix, sources table, concept graph and figure manifest, the ten placed schematic SVGs and the
five placed classroom illustrations, against the approved content-spec, the course guide
(`4TH SEMESTER.txt:746-752`), the style guide, the bound source excerpts and the full published
NCP Science progression-grid PDF.

## Key findings

1. **Sources fail: fabricated NCP quotations.** Three passages present invented Student Learning
   Outcome wording in quotation marks as the NCP's own:
   - `topic-03.mdx` worked example: Grade 4 "identify the main parts of the human body and their
     basic functions", Grade 6 "describe the functions of the main organs of the digestive
     system", Grade 8 "explain how the circulatory and respiratory systems work together".
   - `unit-assessment.mdx` RRQ 1 model answer: the NCP says Grade 6 pupils should "classify
     materials as conductors or insulators".
   - `topic-04.mdx` worked example: "If the NCP asks pupils to 'describe the functions of the
     main organs of the digestive system'".
   The full 74-page NCP PDF (downloaded 2026-11-28 from the cited URL, HTTP 200, 19.6 MB) does
   not contain any of these wordings; its actual human-body SLOs are S-04-A-17, S-05-A-04,
   S-05-A-05, S-06-A-11/12/13 and S-08-A-14. See
   `source-checks/ncp-science-2022-unit-02-search.txt`.
2. **Sources: the "six broad aims" are not in the NCP.** The NCP states no list of aims and never
   uses the words "scientific literacy" or "spiral". The unit discloses that the six aims "can be
   drawn from" the curriculum, but the summary and the assessment present them as the
   curriculum's own aims. Reframe or bind support.
3. **Assessment: RRQ 7 model answer names a non-criterion.** The six checklist criteria are
   accuracy, curriculum alignment, language, activities, illustrations and inclusivity. The model
   answer's second criterion is "Relevance (or inclusivity via 'illustrations')"; relevance is not
   in the checklist. The correct second answer is inclusivity.
4. **Coverage, authority, readability and pedagogy pass.** All five guide sub-topics (2.1-2.5)
   are taught under the mapped headings; the bank is 10/10/5 with correct Bloom banding; the
   per-topic cycle is complete and feasible in a Sindh government school.
5. **Accessibility unverified.** `render-inspect` against the production site (deployed SHA
   `00ac8dbb5ee318db7387243e2b3b92aed650ae8c`, which matches HEAD for this unit's English
   directory and figures) is clean on desktop 1280x900, narrow 360x780 (0 px document overflow,
   tables scroll with `tabindex="0"` and an aria-label) and A4 print (no clipped elements). The
   command still exited 1 because it requests `.svg` variants for the five WebP illustrations
   (`fig-U2-12` to `fig-U2-16`), which do not exist; per the contract a pass needs exit 0, so
   visual accessibility is recorded unverified rather than passed.

## Deterministic checks

`validate:content`, `check:depth-gate`, `check:figures`, `check:no-em-dash`,
`check:no-answer-keys`, `check:docs-sync`, `build:content-status` and `check:content` all exit 0.
`scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efpg-402/unit-02/*.svg`
exits 0 across all 40 SVGs.

## Repair request

A separate author should replace the invented NCP quotations with the real SLOs (or remove the
quotation marks and reframe them as the unit's own illustration), reframe the six aims so they
are not presented as the NCP's stated aims (or bind a source that states them), and correct the
RRQ 7 model answer to name inclusivity. Then a fresh reviewer rechecks the repaired bytes.
