# Summary: G3 English Review of EFPG-402 Unit 2 (cycle 2)

- **Course**: EFPG-402 (Teaching of Science)
- **Unit**: 2 (Science Curriculum and Textbook)
- **Reviewer**: `agent:g3-reviewer`
- **Reviewer run ID**: `681bd02b-fb43-4e03-a737-f56e7497cb33`
- **Author run ID**: `commit:b2dc2715255b31026bf257e58e451ecbf983d001`
- **Model**: Claude LongCat-2.5
- **Disposition**: `revise` (advisory only; G3 remains open and unsigned)
- **Cycle**: 2 of 2 permitted by ADR-0019; further repair needs owner authorization

## What was reviewed

The five English topic files, `index.mdx` and `unit-assessment.mdx` for Unit 2, the Urdu mirror
under `i18n/ur/`, the coverage matrix, sources table, concept graph and figure manifest, the ten
placed schematic SVGs (with `.dark` and `.ur` twins) and the six placed raster/banner
illustrations, against the approved content-spec, the course guide
(`Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:746-752`), the style guide, the bound
source excerpts and the full published NCP Science progression-grid PDF.

## Verdict on the run-1 findings

| Run-1 finding | State in this cycle |
|---|---|
| F1 invented NCP quotations (topic-03, RRQ 1, topic-04) | **Partly resolved, one new defect.** The fabricated wordings are gone and S-04-A-17, S-06-A-12, S-04-B-02, S-05-B-05 and S-06-B-11 match the published NCP. But the replacement for the Grade 8 human-body step cites **S-08-A-14**, which is the brain-parts SLO; the "complex transport system" outcome is **S-07-A-15 (Grade 7)**. |
| F2 the six aims presented as the NCP's own | **Resolved.** topic-02, its summary, self-checklist, activity, practicum and summative task, and the unit-assessment summary all say the six aims are the unit's synthesis, and that the NCP states no numbered list of aims. |
| F3 RRQ 7 names "relevance", not a checklist criterion | **Resolved.** The model answer now names Activities and Inclusivity. |
| F4 render-review exit 1 on WebP illustrations | **Still unresolved, different cause.** The deployed SHA no longer matches HEAD, so the live build is not this input; render-review is recorded unavailable. |
| F5 MCQ key clustering (A: 0, C: 7) | **Resolved.** Keys are now A: 3, B: 2, C: 2, D: 3. |
| F6 "even a widely used textbook" | **Resolved.** Now "a textbook can be weak". |
| F7 "esophagus" British-spelling point | **Resolved.** Now states the NCP prints the same spelling and turns the point on the foreign source. |
| F8 fig-U2-3 "Sample standard (Grade 6)" | **Resolved.** The column is now "Our example (illustrative)" in the EN and UR SVGs and the manifest alt text, and topic-02 says the examples are written by the unit. |

## New findings

1. **Blocking: misattributed NCP SLO.** `topic-03.mdx:54` tells learners that in Grade 8 pupils
   explain the "complex transport system" and cites `S-08-A-14`. In the published NCP that
   outcome is `S-07-A-15` (Grade 7); `S-08-A-14` is "Identify the three major parts of the
   brain...". Wrong code and wrong grade. Verified against the 74-page PDF and the rendered
   pages (`source-checks/ncp-science-p17.png`, `ncp-science-p19.png`).
2. **Blocking: invented NCP quotation.** `topic-04.mdx:46` writes: "If the NCP asks pupils to
   'plan a fair test with one variable changed'". The NCP names "fair test" only as one of five
   enquiry types and never uses the word "variable". Same class as the run-1 fabricated
   quotations.
3. **Uncertain: render-review unavailable.** Deployed SHA `b7b7e00c9a8640158b8d336ba1215e4fcfed01e9`
   differs from HEAD `b2dc2715255b31026bf257e58e451ecbf983d001` on the four repaired unit files and
   the four `fig-U2-3` SVGs, so the production build is not the reviewed input. No build, dev
   server or browser run was attempted.
4. **Advisory: Bruner misquotation.** `topic-03.mdx:48` quotes "any subject can be taught in some
   intellectually honest form..."; the canonical wording (bound in
   `specs/content/efmp-301/sources/texts/seifert2009.md:112,373`) is "any subject can be taught
   **effectively** in some intellectually honest form...".
5. **Advisory: the Urdu mirror carries finding 1.** `i18n/ur/.../efpg-402/unit-02/topic-03.mdx:54`
   also cites `S-08-A-14` for the transport-system outcome. G5 must check it.

## Deterministic checks

`validate:content`, `check:depth-gate`, `check:figures`, `check:no-em-dash`,
`check:no-answer-keys`, `check:docs-sync`, `build:content-status` and `check:content` all exit 0.
`scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efpg-402/unit-02/*.svg`
exits 0 across all 40 SVGs. `render-review` was not run (see finding 3).

## Repair request

A separate author should correct `topic-03.mdx:54` to cite `S-07-A-15` and Grade 7 (or choose a
real Grade 8 life-science SLO), and remove or re-attribute the quotation in `topic-04.mdx:46`.
Then a fresh reviewer rechecks the repaired bytes. Because this is the second and final
ADR-0019 cycle for this submission, any further cycle needs the owner's authorization recorded
in `specs/decisions/log.md`.
