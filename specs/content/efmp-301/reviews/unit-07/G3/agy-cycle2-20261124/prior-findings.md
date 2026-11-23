# Prior findings verified against the current files

Review input: branch `crew/efmp-301-u07-review_en-r1` at HEAD
`ac3d5e2fcd1818492dd11bc9b72d8cfed9a25e8d`.
Latest prior report:
`specs/content/efmp-301/reviews/unit-07/G3/20261102T140729Z-g3-desk-e8869756.json`
(disposition pass, reviewer CMY) based on `agent-g3-efmp301-u7-run002.json`.
This is the second and last ADR-0019 cycle. The figure fix D-2026-0098 and
the placement of raster illustrations fig-U7-5, fig-U7-6, fig-U7-7 postdate that report,
so a fresh G3 run was required.

## Prior report findings (run002 & 20261102T140729Z-g3-desk-e8869756.json)

| # | Severity | Prior state | Verification at HEAD | State now |
|---|---|---|---|---|
| 1 | blocking | Sources: learning-styles evidence claim (Rohrer & Pashler 2012) | Cited inline at `topic-01.mdx:49-53` ("a thoughtful review of the data provides no support for style-based instruction"), registered in `sources/unit-07.md:16`, `coverage/unit-07.md:9`, and `topic-01.mdx:174-179` Further Reading. | Resolved |
| 2 | blocking | Assessment: blueprint spread across topics 7.1 and 7.2 | MCQs 1, 2, 3, 4, 9 test Topic 7.1 (5 items); 5, 6, 7, 8, 10 test Topic 7.2 (5 items). RRQs 1, 2, 3, 4, 5 test Topic 7.1 (5 items); 6, 7, 8, 9, 10 test Topic 7.2 (5 items). ERQs 1, 2 (Topic 7.1), 3, 4 (Topic 7.2), 5 (Integrative). Matches 5/5 blueprint spread. | Resolved |
| 3 | advisory | Authority framing of practical work in teacher notes | `unit-teacher-notes.mdx:86-90` qualifies the wheelchair walk as "the unit's instantiation of the course guide's course-generic group-assignment slot". | Resolved |
| 4 | advisory | Coverage reinforcement row U7-4 | In `topic-02.mdx:113`, fig-U7-4 comparison table compares slow, gifted, and disabled learners directly within the Inclusive education section, providing substantive reinforcement for gifted learners. | Resolved |
| 5 | advisory | Bound-excerpt metadata in spielman2020.md | Resolved in commit 067c2ff2 during round 1. | Resolved |
| 6 | advisory | MCQ option key clustering: 8 of 10 keys are option (b) | Verified at HEAD `unit-assessment.mdx:155-165`: items 1-5, 7, 8, 10 are b; item 6 is c, item 9 is d. Still clustered. | Unresolved, carried as advisory |

## New finding at HEAD

| # | Severity | Description | State now |
|---|---|---|---|
| 7 | uncertain | Render-review unavailable (exit 1): production build differs from reviewed input (deployed SHA `98fbbb0647d5e2c6040059edcaaccc1317b620a1` vs HEAD `ac3d5e2fcd1818492dd11bc9b72d8cfed9a25e8d` across unit prose and 3 illustration assets). Local build/server/browser runs prohibited by host limits and brief. Visual accessibility unverified. | Unresolved, drives escalate disposition |

## Carried forward

1. Advisory: MCQ option key clustering (8 of 10 keys remain option b). Distractor positions should be shuffled in a future maintenance pass.
2. Uncertain: Visual accessibility unverified due to production build staleness and host execution constraints.
