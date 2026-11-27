# EFPC-411 Unit 1 - cycle-1 findings checked against the current files

Superseded report: `specs/content/efpc-411/reviews/unit-01/G3/crew-efpc-411-u01-review_en-r1.json`
(disposition revise, reviewed commit 66a1991270e8800bdc55e838140e5b90c45b1524).
Repairs: commit edaed1188 (merged as 1b5fc79c2, "crew: efpc-411-u01-repair_en").
Checked at HEAD 7254e6a3917a1f7c5a052daa88ee40a728f6cb82 on 2026-11-27.

| ID | Cycle-1 finding | Current state | Verdict |
|---|---|---|---|
| F1 | `topic-04.mdx:43` unsupported "30 minutes of a 35-minute period" claim cited to HEC 2013 | Line 43 now: "In teacher-centred lessons, extended exposition can leave pupils little time for guided practice or independent work." No figures, no citation. | resolved |
| F2 | `topic-03.mdx:66` observer bias misattributed to HEC 2013 | Now "(Molina et al., 2021)"; manual pp. 15-16 discuss personal experiences, prior information and first impressions distorting observation. | resolved |
| F3 | `sources/texts/hec-2013-practicum.md` note 4 claims rating scales and anecdotal records | Note 4 now: checklists (Student Teaching Checklist) and reflective journals; states rating scales and anecdotal records are not in the handbook. Matches the handbook (Checklist pp. 23, 26, 32; journals pp. 11, 31). | resolved (but notes 1, 2, 3, 6 have the same class of defect: new F11) |
| F4 | `topic-01.mdx:39` decorative HEC citation on the definition | Citation removed; definition reads as author synthesis. | resolved |
| F5 | Figure metadata mismatches (fig-U1-1, -3, -6, -8) | fig-U1-1 alt/prompt/desc drop "tools" (SVG columns: Model, Primary Purpose, Who Observes, Typical Outcome); fig-U1-3 prompt "three" (SVG shows 3 questions x 5 areas); fig-U1-6 alt/prompt/desc "four" (SVG 4 rows); fig-U1-8 prompt "four" (SVG 4 rows). Page alt == manifest alt == SVG desc == dark SVG desc for fig-U1-1..8. Residual: the approved content-spec Figure plan still says two questions for fig-U1-3; reviewers may not edit an approved spec, and the plan is not reader-facing. | resolved |
| F6 | Six mis-mapped assessment IDs in `concepts/unit-01.md` | CON-1 MCQ-01, RRQ-01, ERQ-05; CON-2 MCQ-02, RRQ-02; CON-3 MCQ-03, ERQ-01, ERQ-05; CON-4 RRQ-03, ERQ-02, ERQ-05; CON-6 MCQ-07, RRQ-06, ERQ-05; CON-8 ERQ-04, ERQ-05. MCQ-04 sits in CON-5, ERQ-03 in CON-7, RRQ-10 in CON-10. Each item now sits under a concept it assesses; all 25 items remain mapped (check:concept-graph exit 0). | resolved |
| F7 | ERQ 4 Exceeds cell was model rewrites; RRQ 9 silent on wrong order | ERQ 4 Exceeds is now a descriptor ("master-level objective reconstructions of all five notes, each anchored in exact clock times ..."). RRQ 9: "1 mark for naming three correct steps, or for naming all four steps in the wrong order; 0 marks otherwise." | resolved |
| F8 | Bare-URL link text in Further reading | All four topics now use descriptive link text (`topic-01.mdx:138`, `topic-02.mdx:125-126`, `topic-03.mdx:149-150`, `topic-04.mdx:134-135`). Verified in source; not verified in a render (render-review unavailable this cycle). | resolved at source; render unverified |
| F9 | 60/40 weighting field without explanation | `index.mdx:11` and `unit-assessment.mdx:11` carry an `assessment_weighting_note` recording the guide's 20/40/20/20 and that the unit bank serves the 20 seminar marks. `docs/semester-4/efpc-411/course-overview.mdx:7-9` still has 60/40 with no note; that is a course-level file outside this unit's repair scope. | resolved for the unit; course-overview residual is advisory |
