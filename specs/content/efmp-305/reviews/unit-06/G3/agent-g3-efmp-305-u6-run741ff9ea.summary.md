# Independent G3 Review Summary: EFMP-305 Unit 6 (English)

- **Unit**: EFMP-305 Unit 6 (Collaboration and Parental Involvement)
- **Reviewer**: Antigravity (independent reviewer run `741ff9ea`, model `Gemini 3.8 Flash (High)`)
- **Author Run**: `commit:78798ec3`
- **Reviewer Run ID**: `paperclip-run:741ff9ea-d23e-4389-bc2c-8ae19d14491f`
- **Started At**: `2026-10-16T22:01:35Z`
- **Completed At**: `2026-10-16T22:15:00Z`
- **Disposition**: `escalate`

---

## 1. Executive Summary

This independent G3 review evaluates EFMP-305 Unit 6 (Inclusive Education: Collaboration and Parental Involvement) against the 101-input bundle re-prepared at commit `78798ec3` (draft PR #119).

In the prior review attempt (`paperclip-run:4d766bf0-3045-49db-8e0c-0782b6cf237d` against commit `411f5b76`), the review was escalated for two reasons: prompt-only figures and depth budget overrun. At commit `544653f7` / `78798ec3`, figure placement was completed under TEX-79: all 6 planned figures are now rendered `<Figure>` elements in topic files with matching SVGs under `static/img/figures/efmp-305/unit-06/`. Figure geometry and wordmarks are verified clean (`measure-figure-text.mjs` reports 0 defects), and `check:figures` reports 0 findings for EFMP-305 Unit 6.

The review disposition remains **`escalate`** solely due to the single remaining blocker:
- **Depth Budget Overrun**: The unit-total estimated reading time is 193 minutes, exceeding the approved depth-budget band of 140–170 minutes by 23 minutes (`check:depth-gate` exits with code 1). Individual topics meet their respective planning bands (topic-01: 46 min [40–50], topic-02: 53 min [45–55], topic-03: 48 min [45–55]). Resolving this requires CurriculumOwner evaluation to either expand the unit depth budget band in `specs/content/efmp-305/content-spec.md` or commission an authoring revision to trim 23 minutes of prose.

---

## 2. Criterion Evaluation

### Authority: Pass
- All 101 files in the prepared review manifest match exact current hashes against commit `78798ec3`.
- Curriculum alignment: Scheme-and-Course-guides outline for EFMP-305 Unit 6 (Weeks 14–16: Building empathy and supportive classroom culture; Working with parents and collaboration with special educators; Challenges and solutions: practical strategies to overcome barriers) is fully respected across the three topics.
- All six English unit files carry appropriate `clo_refs` (SLO:EFMP-305-6-1, SLO:EFMP-305-6-2, SLO:EFMP-305-6-3).
- Subtopics U6-1 through U6-5 mapped to explicit syllabus topics without omissions.

### Sources: Pass
- All cited sources match keys in `specs/content/efmp-305/sources/unit-06.md`: `unicef2014`, `sindh2018`, `fu2022`, `khalid2021`, `virani2022`, `alvarez2026`, `ainscow2020`, `ainscow2020b`.
- Legal grounding: Section 9 of the Sindh Empowerment of 'Persons with Disabilities' Act, 2018 verified. In `topic-02.mdx:402-405`, a device request for a named pupil is correctly grounded in Section 9(1) (reasonable accommodation), while sanctioned posts for sign-language/Braille teachers are grounded in Section 9(2). Cross-checked with `topic-03.mdx` (Section 9(2) trained posts, Section 9(1) monitoring duty) and the unit assessment.
- Open-access floor satisfied by registry-verified DOIs for `ainscow2020`, `ainscow2020b`, and `fu2022`.
- Unverifiable source declarations are honest and complete per D-2026-0001, with scope cautions and methodology limitations explicitly stated in prose.

### Coverage: Pass
- Topic 01: 6.1 Empathy and a supportive classroom culture (subtopic U6-1).
- Topic 02: 6.2 Parents, special educators and the school team (subtopics U6-2, U6-3).
- Topic 03: 6.3 Challenges and practical solutions (subtopics U6-4, U6-5).
- All five sub-topics and guide sections are fully taught and assessed across the 10/10/5 assessment bank.
- Concept-graph linkage in `specs/content/efmp-305/concepts/unit-06.md` verified consistent across topics and assessment items.

### Assessment: Pass
- Independent blind solve of 10 MCQs completed without consulting the key:
  - 1: B (Four culture markers: what happens when someone gives a wrong answer)
  - 2: B (Empathy mediation: work on classroom routines and check results rather than assuming causality)
  - 3: C (Buddy system: weekly rota across whole class that supported pupil takes a turn on)
  - 4: C (First-contact protocol: establish who actually raises the child day to day)
  - 5: B (Khalid et al. 2021: parents of children with disabilities more inclined towards inclusion, with dissatisfaction on delivery)
  - 6: B (UNICEF 2014: invitations carry negative meaning if sent only when problems arise)
  - 7: C (Specialist visit allocation: 25 min observe class, 30 min co-plan with teacher, 15 min check question with pupil)
  - 8: B (Barrier gap analysis: who holds the barrier, and what it costs in money and minutes)
  - 9: C (Large class fallacy: shared access routines address class-wide barriers alongside individual support)
  - 10: C (Time scaling test: 10 minutes of 1-to-1 reading per pupil doubles cost if pupil count doubles)
- Derived answers match the published key exactly: 1-B, 2-B, 3-C, 4-C, 5-B, 6-B, 7-C, 8-B, 9-C, 10-C (10/10 agreement).
- All 10 RRQs carry explicit mark breakdowns (total 40 marks), itemized marking criteria, and model answers.
- All 5 ERQs carry 10-mark analytic rubrics with 5 criteria (2 marks each) and 4 qualitative performance bands.

### Accessibility: Pass
- Desktop (1280x900), narrow viewport (360x780, docHorizontalOverflow=0px), and A4 print emulation (794px, clippedElems=0) render cleanly with zero DOM overflow and no clipped text blocks.
- All 6 unit figures (fig-U6-1 through fig-U6-6) are rendered `<Figure>` carriers placed in MDX topics with valid light, dark, and Urdu SVG assets under `static/img/figures/efmp-305/unit-06/`.
- Text geometry and wordmark placement verified clean via `scripts/measure-figure-text.mjs` (0 collisions, 0 overflows).

### Readability: Pass
- Clear academic-plain English appropriate for pre-service B.Ed candidates.
- Zero em dashes present in authored prose (confirmed by `check:no-em-dash`).
- No bare URLs or non-descriptive links across all 6 files.

### Pedagogy: Pass
- Nine-part pedagogical flow followed across topics: classroom situation, exposition, worked example, activity, check your understanding, summary, self-assessment checklist, practicum pointers, and summative task.
- Contextualized in Pakistani school environments and provincial administrative realities (classes of 60 to 80 pupils, limited resources, non-literate family communication).
- Unit teacher notes provide guidance on instruction pacing, parent role-play delivery, common trainee misconceptions, and field placement supervision.

---

## 3. Findings & Recommendations

1. **Blocking (Depth Budget Overrun)**: Reconcile the 193-minute unit reading total with the 140–170 minute course depth budget band. Each topic meets its individual planning band (46 min [40–50], 53 min [45–55], 48 min [45–55]), but the unit sum (7 + 46 + 53 + 48 + 30 + 9 = 193 min) exceeds the budget by 23 min (`check:depth-gate` exits with code 1). This is escalated to CurriculumOwner to either approve expanding the depth budget band in `specs/content/efmp-305/content-spec.md` (e.g. to 170–200 min) or specify targeted trimming.
2. **Resolved (Figures Placement)**: All 6 figures (fig-U6-1 through fig-U6-6) are placed as rendered `<Figure>` components in topic files, satisfying Article III.10 figure density floor and schematic archetype requirements. `check:figures` has 0 findings for EFMP-305 Unit 6.
3. **Uncertain (UNICEF Source Retrieval)**: Text verification file `specs/content/efmp-305/sources/texts/unicef2014.md` preserves prior-run provenance, but continuation retrieval returned HTTP 403. Reopen source verification when network conditions permit.
4. **Advisory (Research Context)**: Empirical studies cited (Fu et al., 2022; Álvarez-Couto et al., 2026; Khalid et al., 2021; Virani & Ali, 2022) are appropriately caveated in authored prose regarding sample sizes, qualitative methodology, and non-causal associations.
