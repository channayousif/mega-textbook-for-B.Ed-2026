# Prior findings carried into G3 run 2

Source report: `specs/content/efpg-402/reviews/unit-04/G3/b389e9fb-33f5-41f9-ab56-7df8fd3419e9.json`
(run 1, disposition `revise`, reviewer run `b389e9fb-33f5-41f9-ab56-7df8fd3419e9`).
Repairs: commit `f3815d2e9` (apply G3 revise findings) and merge `01a517779`, on branch
`crew/efpg-402-u04-repair_en`, now in HEAD `b2dc27152`.

| # | Severity | Run-1 finding | Status at run 2 | Evidence |
|---|---|---|---|---|
| 1 | blocking | Dale's cone level count and naming disagree: topic-01 five levels, fig-U4-2 four bands with second band "Demonstrations & Working Models", RRQ 2 asks four and key names Direct/Contrived/Visual/Verbal. | RESOLVED | topic-01.mdx:57-60 now lists four levels; fig-U4-2.svg:29-30 second band renamed "Contrived Experiences & Working Models"; fig-U4-2.ur.svg matches; unit-assessment.mdx:105 asks four and :154 names the same four. |
| 2 | blocking | ERQ 3 names "Closed Electric Circuits and Electrical Conductivity", an NCP Grade 6 concept (S-06-B-37) and a non-NCP term, against the Grade 5 blueprint at content-spec.md:268. | RESOLVED | unit-assessment.mdx:129 now names "Flow of Electric Current in a Circuit" (SLO S-05-B-16), a Grade 5 SLO (NCP PDF p. 56); rubric :187 updated to "electric current flow". |
| 3 | blocking | NCP grade-reference errors in topic-03.mdx:28,94; topic-04.mdx:28,94; unit-assessment.mdx:125. | RESOLVED | topic-03.mdx:28 Grade 7 (S-07-A-11); topic-03.mdx:94 Grade 7 xylem (S-07-A-02); topic-04.mdx:28 Grade 7 atomic structure (S-07-B-01); topic-04.mdx:94 Grade 5 changes of state (Benchmark VII); unit-assessment.mdx:125 Grade 8 "Properties of Waves" (Benchmark VIII). Independently re-checked against the retrieved NCP PDF; see source-checks/ncp-science-2022-grade-check.txt. |
| 4 | uncertain | render-review tooling limitation: render-inspect.mjs Section D fetches `.svg` variants for the five raster illustrations and exits 1. | CHANGED, UNRESOLVED | The production site is not the reviewed input at all this cycle: deployed SHA `b7b7e00c9a8640158b8d336ba1215e4fcfed01e9` differs from HEAD `b2dc2715255b31026bf257e58e451ecbf983d001` on eight unit files. render-review is recorded unavailable; visual accessibility stays unverified. See logs/render-review.txt. |
| 5 | advisory | MCQ key skew: B 7/10, A 0/10. | RESOLVED | unit-assessment.mdx:139-148 keys now D,B,C,C,A,B,A,B,C,D (A2/B3/C3/D2). |
| 6 | advisory | Concept-graph CON-4-6 and CON-4-7 assessment mappings swapped. | RESOLVED | concepts/unit-04.md:12-13 now map CON-4-6 to RRQ-10 (exhibition safety) and CON-4-7 to MCQ-09, MCQ-10, RRQ-09 (field trips and community resources). |
| 7 | advisory | Figure-plan drift: content-spec.md:307 plans fig-U4-9 as "farm, clinic, workshop, river, museum"; the placed figure and topic-05.mdx:52 use "Pottery / Brick Kiln" and no museum. | UNRESOLVED (out of scope) | The approved content-spec is frozen for a reviewer; the placed figure matches the prose. Carried as advisory. |
| 8 | advisory | sources/unit-04.md declared khan-2019-low-cost unverifiable, but the article is diamond OA; "superior retention" wording in topic-03 rested on the literature review. | RESOLVED | sources/unit-04.md no longer lists the article under `## Unverifiable sources`; a bound excerpt is committed at sources/texts/khan-2019-low-cost.md; topic-03.mdx:44 now says "active engagement", which the retrieved article supports. |

## New observations at run 2

- N1 (advisory): figure-manifest prompt drift introduced by the grade repairs.
  `specs/content/efpg-402/figures/unit-04.md:19` (fig-U4-14) still says "a Grade 5 science lesson"
  while topic-03.mdx:28 now teaches Grade 7; `:20` (fig-U4-15) still says "a Grade 8 science
  lesson" while topic-04.mdx:28 now teaches Grade 7. The student-facing alt text carries no grade,
  so this is a manifest-record inconsistency, not a learner-facing defect.
- N2 (advisory): `static/img/figures/efpg-402/unit-04/fig-U4-6.svg` still labels the circuit-tester
  concept "Closed electric circuits and electrical conductivity of materials". The table header says
  "Grades 4-8", so it is not a Grade 5 blueprint claim, but "electrical conductivity" is not an NCP
  SLO phrase (the grid names thermal conductivity at Grade 7). Minor terminology drift.
- N3 (advisory): `unit-assessment.mdx:71` MCQ 6 says "A Grade 5 teacher builds a working lung
  model" and asks about diaphragm mechanics, which the NCP places at Grade 7 (S-07-A-11). The item
  tests the mechanism rather than claiming a Grade 5 curriculum placement, so it is not a blueprint
  defect, but it sits oddly beside the repaired Grade 7 prose.
