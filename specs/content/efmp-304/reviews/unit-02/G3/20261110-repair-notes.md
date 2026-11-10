# Unit 2 G3 repair handoff (Round 2)

Report addressed: `specs/content/efmp-304/reviews/unit-02/G3/20261108T203238Z-g3-desk-5daf97ba.json` (disposition: revise).
Author pass: agy, branch `crew/efmp-304-u02-repair_en-r1`. This is repair documentation, not independent review or acceptance evidence.

## Finding-by-finding resolution

1. **`topic-03.mdx`, Types of argument, Policy argument; Four ways to argue one thing:**
   Separated support patterns from the subject of the practical conclusion. Removed policy's exclusive claim to "we should" (admitting evidence, analogy, and authority support as well). Clarified that labels describe support patterns, policy describes practical decisions, and labels can overlap. Mixed patterns are explicitly credited in Topic 2.3 and ERQ 3. Mirrored in Urdu.

2. **`topic-02.mdx`, The rhetorical triangle and Issue questions and information questions; assessment RRQ 4 model:**
   Communicative purpose and support relations clarified in Topic 2.2 and RRQ 4 model. A colleague's reciprocal offer can support accepting a request; parents and colleagues can receive arguments when reasons are given. Direct checks settle clear information questions, but uncertain factual claims can also require reasoned argument. Administrative power to grant leave does not determine whether a text supplies support. Mirrored in Urdu.

3. **`topic-03.mdx`, Classify first, judge second; `sources/texts/yuzenker2022.md`, Scope note:**
   Removed the unverified attribution and meta-reference to Yu and Zenker from Topic 2.3 in both English and Urdu. The core principle ("classify first, describe support offered before judging success, so as not to describe one's own reaction") is taught directly without unverified citation. `sources/unit-02.md` notes the withdrawal of the Yu/Zenker binding for Unit 2; the shared note `sources/texts/yuzenker2022.md` is preserved for Unit 3.

4. **`topic-01.mdx` through `topic-04.mdx`, Further reading; `topic-03.mdx`, opening of Types of argument; `sources/unit-02.md`, Unverifiable sources:**
   - Bassham is declared bibliographic-only with point-of-use disclosure in Further reading of Topics 2.1 through 2.4 (EN & UR), with dated retrieval attempt (2026-11-03) recorded in `sources/unit-02.md`.
   - Van Cleave (2016) is bound and verified for underlying analytical distinctions.
   - Qin (2016) is qualified to the 16-student instructional finding in Topic 2.2 (EN & UR) and `sources/unit-02.md`.
   - Malone (2003): Removed the unverified attribution `(Malone, 2003)` from the real-discourse recommendation in `index.mdx` line 74 and Urdu line 78; `sources/unit-02.md` documents Malone retained as qualified further reading only.

5. **`unit-assessment.mdx`, RRQ 7 and corresponding model:**
   Explicit causal conclusion added to the prompt ("Therefore the added class caused the improvement"). Model answer awards marks for identifying the support pattern, recovering a defensible missing causal link, and explicitly evaluating the absence of non-adopter comparison without fabricating comparison results. Mirrored in Urdu.

6. **`unit-assessment.mdx`, RRQ 9 and model; `topic-04.mdx`:**
   Prompt and model answer separate empirical assumptions (restoring the route enables attendance) from normative obligations (duty of school to take reasonable steps to enable attendance). Allows multiple defensible reconstructions; avoids inferring that refusal implies rejecting attendance obligations. Mirrored in Urdu.

7. **`unit-assessment.mdx`, ERQ 3 and rubric:**
   Rubric explicitly accommodates repeated and overlapping support patterns (notebook count and pass rates both evidence-shaped, doctor comparison analogy, room/period availability feasibility/policy). Expressly removes requirement for authority. Accepts any evidence-based ranking justified by named features of the arguments. Mirrored in Urdu.

8. **`static/img/figures/efmp-304/unit-02/fig-U2-2.svg`, `.dark.svg`, `fig-U2-4.svg`, `.dark.svg`:**
   Inference labels in `fig-U2-2.svg` reflowed to x=490 (within 780px viewBox). Table headings in `fig-U2-4.svg` shortened and split across lines with `<tspan>` tags. Dark variants regenerated. Verified through `measure-figure-text.mjs` with exit code 0.

9. **`unit-assessment.mdx`, RRQ 8, RRQ 10, ERQ 5 and rubrics:**
   Bloom tags aligned with actual cognitive demand: RRQ 8 set to Understand, RRQ 10 set to Apply, ERQ 5 set to Evaluate (matching its analytic rubric). Mirrored in Urdu.

## Advisories

- **Course overview assessment weighting (60/40 vs 30/70):** Course-level dependency outside unit scope; referred to course owner.
- **`unit-assessment.mdx` MCQ 3 and `topic-01.mdx` dispute test:** MCQ 3 prompt contextualized ("Everyone present agrees the fan has stopped. A caretaker explains the cause..."). Topic 2.1 text updated in EN and UR to present the dispute test as a practical heuristic rather than an exhaustive definition.

## Unresolved evidence and ownership

Current rendered desktop, narrow-screen (360px), table horizontal scrolling, and A4 print evidence remain uninspected due to strict host resource controls prohibiting browser execution. Commit provenance and handoff details remain unsupplied to this session. Unit 2 G3 remains unticked pending fresh independent review and owner disposition.

## Validation

All 14 content gates pass (`npm run check:content`). Zero em dashes across all touched files (`npm run check:no-em-dash`). Figure text geometry for all Unit 2 SVGs passed `measure-figure-text.mjs` cleanly (exit code 0). Vitest unit suite passed (39 test files, 448 tests).
