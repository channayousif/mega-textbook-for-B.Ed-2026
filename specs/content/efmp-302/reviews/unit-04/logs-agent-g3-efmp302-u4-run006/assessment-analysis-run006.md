# Assessment analysis - EFMP-302 Unit 4, G3 run006

Method: the ten MCQ keys were derived from topic prose alone and written to
`blind-mcq-derivation-run006.md` BEFORE `## Answers and marking guidance`
(unit-assessment.mdx:178+) or any prior run report was opened.

## MCQ comparison

Derived: 1b 2d 3a 4c 5b 6d 7c 8a 9b 10c
Supplied (unit-assessment.mdx:180-197): 1b 2d 3a 4c 5b 6d 7c 8a 9b 10c
**Agreement 10/10. No conflicting key. No ambiguous stem or double-defensible distractor found.**

Distractor notes (no defect):
- MCQ-02 a/b are the other two features of a usable standard, so the "chiefly" wording is load-bearing
  and correct: topic-01.mdx:59-61 makes evidence-specificity the failing feature.
- MCQ-04 d ("2009 by UNESCO alone") is a good near-miss against topic-02.mdx:41-43.
- MCQ-09 a/c are certification and appraisal respectively (topic-04.mdx:60-62), all three distinct.

## Blueprint conformance (content-spec.md:673-679)

| Requirement | Observed | Verdict |
|---|---|---|
| MCQs (10) Remember to Apply, >= 2 per topic | tags U,R,A,R,R,A,U,U,U,U; 4.1=3 4.2=3 4.3=2 4.4=2 | met |
| RRQs (10) Understand to Analyze, >= 2 per topic | tags U,U,U,An,U,U,An,U,U,An; 4.1=3 4.2=3 4.3=2 4.4=2 | met |
| ERQs (5) Analyze to Evaluate/Create, one per topic + integrative | Ev,An(integrative),Cr,Ev,Ev; 4.1,int,4.2,4.3,4.4 | met |

No `(Remember)` tag remains anywhere in the RRQ block (verified in the rendered page, not only source).
The run-005 Bloom-floor finding is therefore closed at the tag level.

## The three rewritten RRQ stems - do they demand what the new tag claims?

**RRQ-03 (Understand) - honest.** Stem adds "explain why any two of those requirements pull against
each other" to the recited four uses. That clause is not recitable as a pair the student chooses;
topic-01.mdx:139-146 prints only the development-vs-accountability contrast. Mark scheme
(unit-assessment.mdx:212-217) awards 1 of 8 for it.
Advisory: 7 of 8 marks remain recall, and topic-01.mdx:179-180 tags the identical 7-mark core
*(Remember)* in its own "Check your understanding". The demand shift is real but thin.

**RRQ-08 (Understand) - honest.** Stem adds "explain for each break why it makes the cycle unable to
show whether anything changed". The mark scheme (unit-assessment.mdx:238-243) awards 2 of 9 for two
distinct explanations, both constructible from topic-03.mdx:46-47 and :62-70 without being printed.
Advisory: same recall weighting caveat as RRQ-03 (7 of 9 marks recall).

**RRQ-05 (Understand) - NOT sound. Blocking.**
Stem, unit-assessment.mdx:133-134:
    "Describe the three-level architecture of Pakistan's National Professional Standards, and
     explain why only the performance level yields indicators an observer can check. *(Understand)*"
Mark scheme, unit-assessment.mdx:227-230:
    "... explains that knowledge and dispositions are inferred from what performance shows, so only
     the performance level states something an observer can watch for (1);
     indicators beneath, stating observably what meeting a part looks like (1)."

Three problems, each independently verifiable:

1. **The claim is never taught.** A grep of all four topic files for `infer`, `performance level`,
   `only the performance` and `watch for` returns nothing: the strings occur ONLY in
   unit-assessment.mdx:134 and :228-229. The nearest support is topic-02.mdx:211-213, which says
   "the dispositions part is nearly impossible to evidence by watching" - about dispositions only,
   about observation only, and framed as what trainees discover in a practicum exercise, not as a
   property of the architecture. Nothing anywhere addresses the knowledge level's observability.

2. **The taught text contradicts it.** topic-02.mdx:64-66: "**Indicators.** Beneath the parts sit
   indicators: specific, observable statements of what meeting that part looks like in practice."
   Restated at topic-02.mdx:179-181 and again in the assessment's own Unit summary at
   unit-assessment.mdx:31-34. "The parts" is plural and includes knowledge and dispositions, so on
   the taught account observable indicators exist for all three parts.

3. **The mark scheme contradicts itself.** Its third point ("only the performance level states
   something an observer can watch for") and its fourth ("indicators beneath, stating observably what
   meeting a part looks like") cannot both be true. A candidate who answers correctly from the taught
   text loses the third mark and earns the fourth; a candidate who answers as the stem presupposes
   does the reverse. This is a conflicting criterion in the sense of the G3 rubric.

Corroborating detail, not itself the defect: fig-U4-3's prompt and alt text
(`specs/content/efmp-302/figures/unit-04.md`, and topic-02.mdx:24) do place indicators "beneath the
performance band" only, so the figure and the prose already disagree. The concept graph
(`specs/content/efmp-302/concepts/unit-04.md`) maps RRQ-05 to CON:EFMP-302-4-7, -4-8 and -4-9 and
NOT to CON:EFMP-302-4-10 (Indicator), so the derived concept mapping does not cover what the
rewritten stem now asks.

**Two defensible remedies, and choosing between them is an owner call, not a reviewer's:**
(a) drop or reword the added clause so RRQ-05 asks something the unit establishes - for example
    "explain what the three-part division buys that a single judgement would not" (already taught at
    topic-02.mdx:58-62, though that overlaps RRQ-06); or
(b) keep the clause and make the claim true in the taught text - amend topic-02.mdx:64-66 and
    fig-U4-3 so the architecture actually says indicators attach to the performance level, and say
    how knowledge and dispositions are evidenced instead.
(b) changes unit prose and a committed figure and would require re-running the figure gates.

## RRQ mark-scheme arithmetic

Checked item by item. All totals reconcile except one minor slip:
RRQ-03 is "(8 marks)" = 4 uses + 3 requirements + 1 tension, but the stem asks for what **each** of
the four uses requires and the scheme then lists four requirements. Four demanded, three payable.
Advisory only.

## ERQ rubrics

All five are 4-criterion analytic rubrics out of 20 with a stated gate ("A response not reaching
'Adequate' on the analysis, evaluation or creation criterion cannot exceed 10 overall",
unit-assessment.mdx:256-257). Descriptors discriminate performance rather than restating the task,
and each rubric's bolded criterion carries the higher-order demand. No conflict with any stem found.
