# Summary - EFPC-411 Unit 3 G3 English Review

Reviewer: agent:g3-reviewer | Model: LongCat-2.5
Reviewer run: a2fd4038-047b-44e1-8811-3cacf994666d
Author run: commit:472f8107fb5a9856cf6addb6db0dff0cf4efa8f3 (agy2)
Reviewed at HEAD: 0cbed86bb96f7a6a03420ad3e5d726a47e8f5513
Report: specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1.json
Disposition: ESCALATE (0 blocking, 5 uncertain, 3 advisory findings)

## Disposition rationale

The unit is well built and the deterministic gates are green. Authority and coverage are sound:
the approved content-spec's nine Unit 3 sub-topics (U3-01 to U3-09) are each taught under a mapped
heading, the four SLOs trace to guide outcomes, and all 14 content gates pass. The prose is
accessible, the pedagogical cycle is complete, and the assessment bank is correctly blueprint-shaped
(10/10/5, Bloom bands, 12 formative items).

The disposition is escalate for two independent reasons:

1. **Render and print inspection could not be performed.** The production site is not the reviewed
   input: deployed SHA `c8efed9b430b39867c1418fae61194c49cefcda9` differs from reviewed HEAD
   `0cbed86bb96f7a6a03420ad3e5d726a47e8f5513` on all five English unit files and on the five raster
   illustrations (fig-U3-9 to fig-U3-13). The brief forbids a local build, dev server or Playwright
   run, so `render-review` is recorded as unavailable (exit 1) and `accessibility` is unverified.
2. **Five uncertain content findings** need an author decision or repair before a pass is possible:
   an assessment item that contradicts the taught structure, a figure that omits the category an
   activity asks students to classify, a sample proforma that contradicts its own scenario, and two
   models attributed to sources whose bound notes do not document them.

## Findings

1. **Uncertain (unresolved):** render-review unavailable; visual accessibility and A4 print
   unverified. Deployed `c8efed9b43` vs HEAD `0cbed86bb` differ on the unit's English files and
   raster figures.
2. **Uncertain (unresolved):** `unit-assessment.mdx` RRQ 8 asks for "the four core chronological
   sections", but the unit teaches an eight-part portfolio architecture; the model answer regroups
   eight into four. A student who answers "eight components" is marked wrong.
3. **Uncertain (unresolved):** `topic-03.mdx` activity step 1 tells students to classify an
   authoritarian excerpt "using the framework in Figure 3.6", but `fig-U3-6` compares only
   authoritative and permissive styles; the authoritarian column is absent.
4. **Uncertain (unresolved):** `fig-U3-3` records "real leaves used" for the Grade 5 flowering-plants
   lesson, contradicting the `topic-02.mdx` scenario and `fig-U3-11`, which establish that no real
   plant or leaf was used.
5. **Uncertain (unresolved):** the four-stage reflective cycle (`topic-03.2`) and the
   authoritative/authoritarian/permissive typology (`topic-03.3`) are attributed to Richards &
   Lockhart (1994) and Scoupe et al. (2024); the bound notes for both works do not document either
   framework.
6. **Advisory (unresolved):** two formative items assert counts the unit never teaches:
   `topic-01.mdx` Q1 "four mandatory administrative identifiers" (six are listed) and
   `topic-04.mdx` Q1 "three mandatory verification documents" (one verification component).
7. **Advisory (unresolved):** MCQ key clustering - 8 of 10 keys are option B and no item uses D.
8. **Advisory (unresolved):** minor consistency items: HEC attributed for the 3-4 lesson count the
   bound note does not state; the 25-30% transition statistic is uncited; EMIS 418010204 is reused
   for a boys school and a girls school; ERQ 2's rubric names "passive student chanting" absent from
   its scenario; ERQ 5 asks 600-750 words while the topic-3.4 task asks 600-800.

## Criteria

| Criterion | Status | Basis |
|---|---|---|
| authority | pass | Guide Weeks 9-12 leaf sub-topics mapped to the approved spec and taught; SLOs trace to guide outcomes. |
| sources | fail | Two model attributions unsupported by the bound notes; one uncited statistic; one overstated HEC attribution. |
| coverage | pass | U3-01 to U3-09 each taught under a mapped heading; depth gate and concept graph pass. |
| assessment | fail | RRQ 8 contradicts the taught structure; two formative items use untaught counts; key clustering. |
| accessibility | unverified | render-review unavailable; source structure and figure geometry pass, visual checks not performed. |
| readability | pass | HSC register held; zero em dashes; technical terms defined in context. |
| pedagogy | fail | One activity unusable as written (figure lacks the required category); one sample figure contradicts its scenario. |

This report is advisory and unsigned. It does not certify the unit, mark G3 done, or authorise
publication. A separate author owns any repair; a fresh reviewer must recheck a changed input.
