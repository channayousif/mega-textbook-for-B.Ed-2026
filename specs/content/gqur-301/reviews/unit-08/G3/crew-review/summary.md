# GQUR-301 Unit 8 independent G3 advisory review

Disposition: **escalate**. G3 remains open; this report neither certifies nor authorizes publication. Reviewed commit: 1aac6d60bd7a042bc192483133df769e6c7660b1. No prior Unit 8 G3 attempt is superseded.

## Required repairs and unresolved evidence

- F1, blocking: topic-03.mdx, Explanation / Choosing the method, worked example 1 calls no repeated digits a safer lock rule. Under uniform choice the legal space falls from 1000 to 720, increasing a single random guess's success from 1/1000 to 1/720. Count alone does not justify the security claim. Remove or qualify the claim with explicit assumptions.
- F2, blocking: topic-01.mdx, Arranging some of the items, attributes notation to Chaudhry and Kamal despite sources/unit-08.md declaring the work bibliographic only. Supply actual source evidence or remove the attribution; do not invent retrieval.
- F3, blocking: fig-U8-2.svg and its dark variant, caption at y=366 says swapping two people or letters gives a different result in every row, but the KARACHI row contains identical A letters. Swapping those As yields the same visible arrangement. Qualify the caption to distinguish identical items. Preserve figure identity and record author correction before a new review.
- F4, uncertain: the method flowchart fig-U8-5 and its alt text send every unordered choice to C(n,r), without a no-repetition condition; the Topic 8.3 table has that condition. For two selections from A/B with replacement, unordered AA/AB/BB gives 3, not C(2,2)=1. Limit the chart explicitly to the taught distinct-object/no-replacement setting. The side note also needs disjoint cases for addition, as the prose correctly states. Do not expand the approved syllabus to teach a new formula without authority.
- F5, uncertain: parent-prepared frozen handoff and actual author session ID missing; local preparation is documented, not silently treated as a parent handoff. The real reviewer session is recorded. Exact model snapshot is unavailable.
- F6, uncertain: Unit 8 G1 remains open in tasks.md. D-2026-0070 settles chapter partition but explicitly certifies no content and advises fresh intake. Owner/evaluator must establish current G1 authority; this reviewer does not approve it.
- F7, uncertain: required fresh page, narrow viewport and A4 print inspection cannot run under the brief's build/browser prohibition. No actual rendered artifacts are claimed. Static inspection found meaningful alt text, ordered headings and text-supported examples, but cannot verify layout.
- F8, uncertain: the bound Lane source excerpt covers Chapters 1-2 rather than consulted Chapter 5; external retrieval corroborates the concepts but cannot replace a new bound source passage. Topic assessment rubrics were visible inline; the unit-bank pre-guidance save failed, so retained derivations are retrospective. A fresh reviewer must preserve answer-blind evidence.

## Criterion evidence

Authority: unverified, G1 and provenance limitations above; guide extracted-text/2nd 2026.txt lines 479-482 names the three topics in order. The actual guide and content spec agree on Chapter 8, Week 8.
Sources: fail, F2; bound OpenStax excerpt supports core formulas, while Lane evidence needs binding. See source-inspection.md.
Coverage: pass for taught scope, coverage/unit-08.md and each topic Explanation: U8-01 factorials/permutations/identical letters, MCQ 1-4/RRQ 1-3/ERQ 1; U8-02 r! overcount and complement, MCQ 5-8/RRQ 4-7/ERQ 2; U8-03 staged/restricted/complement counting, MCQ 9-10/RRQ 8-10/ERQ 3-5. All three SLOs have substantive teaching and assessment, not headings alone.
Readability: pass, terms are introduced from school situations before formulas; 8.1 expands factorials, 8.2 lists three possible pairs, 8.3 distinguishes stages and cases. HSC arithmetic and Unit 7 prerequisites are explicit. A domain statement 0 <= r <= n would improve clarity.
Pedagogy: fail pending F1/F3/F4; progression, retrieval and practical group tasks are sound, but teaching aids must not contradict identical-item or method assumptions.
Assessment: unverified for strict answer-blind sequence; all 25 bank calculations agree with supplied guidance. Independent-solutions.md records every item, all topic checks and summatives, reasoning and the save failure. MCQs use Remember through Apply, RRQs progress to error analysis, ERQs require comparisons, justification or design; rubrics distinguish performance and demand higher reasoning. Three topics satisfy the 2-MCQ and 2-RRQ allocation floor. No numerical bank defect found.
Accessibility: unverified, F7. Each topic has two placed figures and an alt text describing instructional meaning; fig-U8-5 is the unit schematic. Figure source and dark counterparts inspected as source only; geometry and rendering are unverified.

## Checks and ownership

All six mandatory deterministic validators pass, with actual hashed logs. Full check:content has only the baseline missing generated content-status file failure. A separate author owns F1-F4 repairs; owner/host/evaluator owns provenance, G1 and a frozen bundle; a fresh independent reviewer owns source/answer-blind and rendered checks. No review completion, initials, signature, publication or translation-status change was made. Advisory tracker row is explicitly requested by the crew brief.
