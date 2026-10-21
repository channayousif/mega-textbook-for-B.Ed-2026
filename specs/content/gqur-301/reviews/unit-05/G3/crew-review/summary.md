# GQUR-301 Unit 5 G3 advisory review

Disposition: **escalate**. This is a limited source review, not certification. G3 remains open.

## Provenance and input boundary

The checkout started clean, with no commits ahead of origin/main. Both resolved to
2186dd161e7665c93e140525fd949a6b07e00c88. The unit entered Git in 47e14253.
This session did not author or translate these inputs. No parent-prepared G3 bundle,
author run identity, host reviewer conversation ID or exact model build was supplied.
The worker prepared the accompanying 101-input manifest over committed files for audit.
Report validation recomputes its paths and hashes; this does not supply missing provenance.
Identity fields explicitly disclose unavailable identities rather than inventing them.
The environment identifies the model as GPT-6 without an exact build.

## Criterion evidence

- authority: unverified. Guide extracted-text/2nd 2026.txt, Chapter 5, sections 5.1-5.3 matches the three topics. content-spec.md Unit 5 follows those sections. tasks.md leaves G1 open. D-2026-0070 explicitly advises fresh intake before G3, and intake-3/evaluation.md still evaluates the withdrawn six-unit partition. Owner/evaluator must resolve the current G1 evidence.
- sources: unverified. The bound sources/texts/lane2023.md covers Chapters 1-2 only, not the Chapter 3 claims used here. sources/unit-05.md has no unavailable-source declaration. External page inspection below corroborates some claims but cannot silently extend the frozen source bundle. Topic 5.1 also attributes a grouped-mode formula to the print text while the sources ledger describes that text as bibliographic only. Author should provide the actual inspected supporting passage or remove the substantive attribution.
- coverage: pass for the three guide leaves. coverage/unit-05.md maps U5-01 to topic-01 Explanation (counting, ties, modal class), U5-02 to topic-02 Explanation (comparison, wages, skew limitations), and U5-03 to topic-03 Explanation (data type, question, school decisions). Assessment MCQ 1-3/RRQ 1-3/ERQ 1, MCQ 4-7/RRQ 4-6/ERQ 2, and MCQ 8-10/RRQ 7-10/ERQ 3-5 respectively sample those leaves. This mapping does not settle G1 authority or assessment correctness.
- readability: pass on inspected topic-01, topic-02 and topic-03 explanations. Counting precedes modal class; the wage example computes the mean before interpreting it; the school-decision example distinguishes total costs from typical distance. Definitions, short paragraphs and explicit misconception blocks support an intermediate graduate.
- pedagogy: unverified overall. The tally survey, paired dot plots and committee report offer feasible paper-based practice and progression. In topic-02 Activity, Group A sums to 45 and Group B also sums to 45, so both means are 5; Group A median/mode are 5, while Group B median is 3 and modes are 2 and 9. Topic-03's flowchart caption supplies the question check omitted from its branches, so branch inspection alone is insufficient grounds for a defect. Full teacher-note and rendered-figure inspection is not completed.
- assessment: fail. unit-assessment.mdx RRQ 6 model answer uses symmetric 0,0,2,2 to refute a conditional about right-skewed data. That example never satisfies the condition. Replace it with a justified right-skewed counterexample and align the marking criterion. RRQ 7 model answer says median/mode 25 describe what most workers earn, but only 3 of 12 earn exactly 25. Use precise typical/most frequent language instead of implying a majority. Arithmetic spot-checks: wages sum 377, median/mode 25; RRQ 5 sum 80, median/mode 7; ERQ 1 sum 31, mean 3.1, median 3, modes 3 and 5; ERQ 2 sum 412, median 35, mode 33; ERQ 3 sum 48, median/mode 3. These agree with the numerical guidance. All assessment text, including supplied answers, was read together before a blind solution record was made, so the required solve-before-key procedure was not satisfied. A fresh reviewer must independently solve all items, including formative and topic tasks. No full assessment pass is claimed.
- accessibility: unverified. Topic figures have meaningful alt text; index links name the topics. Browser, build, dev-server and Playwright execution are explicitly prohibited by the crew brief. No current desktop, 360px, A4 print or rendered SVG inspection was performed. No render-review success or synthetic image is recorded.

## External source cross-check (not acceptance-bound source evidence)

Inspected on 2026-10-21 via web retrieval:

- https://onlinestatbook.com/2/summarizing_distributions/comparing_measures.html, paragraphs preceding Table 1 and following Figure 2: supports qualified relationships between skew and central tendency, and reporting multiple summaries when a single figure hides variation.
- https://openstax.org/books/introductory-statistics-2e/pages/2-6-skewness-and-the-mean-median-and-mode, Figures 2.16-2.18 discussion and following exception paragraph: supports symmetry qualifications and discrete-data exceptions.

These passages corroborate topic-02's qualified rule. They do not verify every claim in the unit. Bind the relevant inspected texts in a new author-prepared bundle before an accepted source decision.

## Checks and baseline

The six mandatory deterministic commands passed; exact logs and exit codes accompany the report.
The full check:content run failed only because static/content-status.json is missing.
It ran before any tracked edits, on the exact origin/main commit, so that failure is also
the main baseline, not a new Unit 5 finding. No content inputs were repaired during review.
The final rerun is recorded separately. Render inspection was unavailable, not executed.

## Handoff

Author: repair RRQ 6 reasoning, RRQ 7 majority language and print-source attribution.
Owner/evaluator: settle current G1 evidence and supply actual author/run provenance.
Review host: prepare a frozen authoritative source bundle and launch a fresh reviewer with
permitted current page/print inspection. Preserve this attempt; do not retry the unchanged
inputs in search of a pass. No gate, publication tier or translation status is approved.
