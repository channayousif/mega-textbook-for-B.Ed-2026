# EFPG-401 Unit 1 - G3 English review summary

- Course: EFPG-401 (Teaching of English), Semester 3
- Unit: 1, Four Skills of Language Learning
- Stage: G3 (English)
- Disposition: **escalate** (advisory only, no certification)
- Reviewer: `agent:claude`, run `a0dffa23-4ae1-40fa-aef4-f60697bb4df8`
- Author run: `crew-job:efpg-401-u01-author`
- Reviewed commit: `f17d30e9e8f0787b2e064ecceda85e788cdda6b7` (HEAD)
- Skill digest: `eccc4074a6f753d12663e5010e19d9b3a0f9f5c461ac8c3a22d093503345998b`

## Verdict

The unit is structurally complete, authority-matched and consistent with the approved content
spec, and all six deterministic checks plus `check:content` pass. The review still escalates
rather than passes because the required rendered-page and print evidence could not be obtained:
the production build is deployed at SHA `f946ee78998790458db839362579aa1288341ebb`, which does
not contain this unit's current English bytes or the five new WebP illustrations, so the live
site is not a valid review input. Source support is also unverified, because the bound records
for all six mapped readings are author paraphrases with title-only passage anchors rather than
inspectable source text.

## Criteria

| Criterion | Status | Basis |
|---|---|---|
| authority | pass | Guide section 1 leaves match the content-spec checklist, coverage matrix and unit headings |
| sources | unverified | Three monographs declared under `## Unverifiable sources`; three open-access articles claimed read in full but bound only as paraphrase notes |
| coverage | pass | All 19 sub-topics map to exact Explanation headings; assessment traces to the leaves |
| assessment | pass | 10 MCQ, 10 RRQ, 5 ERQ solved independently; key agrees; blueprint met |
| accessibility | unverified | No rendered or print inspection possible; static headings, alt text, links and manifest checked |
| readability | pass | HSC-level prose, definitions, worked examples and Sindh classroom contexts |
| pedagogy | pass | Misconceptions, progression, feasible activities and retrieval practice present |

## Findings

1. **uncertain, unresolved** - render-review unavailable. Deployed SHA `f946ee789...` differs from
   HEAD `f17d30e9...` across five English files and five new WebP assets, so live inspection was
   skipped. Rendered headings, in-place alt text, 360px layout, A4 print and figure clipping
   remain unverified.
2. **uncertain, unresolved** - source support unverified. `sources/texts/*.md` are original
   paraphrases with a title-only anchor and state that they are not a substitute for independent
   source review, so the in-text claims resting on Daulay (2025), Hartati et al. (2024) and
   Yunus et al. (2013) could not be checked against the actual passages.
3. **advisory** - MCQ answer key is unbalanced: 8 of 10 items are keyed B (items 1-7 and 9),
   with only items 8 and 10 keyed C. Recommend rebalancing option order so the key is not
   guessable.
4. **advisory** - `topic-03.mdx:75` says "four primary reading sub-skills" but lists five
   (skimming, scanning, intensive, extensive, inferential). `fig-U1-6` and the coverage matrix
   show four. Reconcile the count or the list.
5. **advisory** - Specific claims are attributed to the three title-level monographs
   (Cook 1991 at `topic-01.mdx:39`; Celce-Murcia 1991 at `topic-02.mdx:49`, `topic-03.mdx:71`
   and `topic-04.mdx:109`; Nolasco and Arthur 1987 at `topic-02.mdx:68`). The sources file
   declares these works as title-level support and names the use areas, so the limitation is
   disclosed, but the claims are not verified. Consider narrowing the wording to the
   declaration, as Unit 5 was repaired.
6. **advisory** - The content-spec Unit 1 blueprint asks for an Analyze-or-higher item that
   asks which of the four skills a Grade 4 English lesson develops. ERQ 1 analyses a Grade 4
   listening lesson's flaws and ERQ 5 integrates the four skills across four days; neither
   asks the blueprint's exact question. Low priority, but worth aligning.

## Commands

All deterministic commands exited 0: `validate:content`, `check:depth-gate`, `check:figures`,
`check:no-em-dash`, `check:no-answer-keys`, `check:docs-sync`, `check:content`. The SVG text
geometry check also exited 0 (6 cosmetic wordmark collisions reported, not failed).
`render-review` is recorded as unavailable with exit code 1.

## Acceptance boundary

This report is advisory. No server-protected signing host, reviewer registry entry or
qualification record was used, so it does not certify G3 and cannot support a tracker done
state. A separate author repairs content, a fresh manifest is prepared, and a new independent
reviewer rechecks it.
