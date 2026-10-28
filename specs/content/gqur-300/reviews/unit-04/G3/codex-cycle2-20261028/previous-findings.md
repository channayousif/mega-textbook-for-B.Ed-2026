# Cycle 1 findings rechecked against current inputs

Prior report: ../agent-g3-gqur300-u4-run001.json. Superseded as current assessment, retained unchanged for audit.

1. Inverted ERQ-4 analysis: specific inversion resolved in unit-assessment.mdx, ERQ rubric 4. Tile area is now constant and boundary identified as possibly sensitive. Residual geometry ambiguity is new finding C2-01; do not treat whole item as repaired.
2. Bunting false division: resolved in topic-01 Worked example, now 250/15=16.67 rounded to17. Teacher notes only says dividing before converting and introduces no new arithmetic contradiction.
3. Missing prose citations: resolved as a presence issue. topic-01 cites NCC in Units of measurement; topic-02 cites Marecek, Anthony-Smith and Mathis in Rectangle perimeter and area. Source-support limits remain C2-02.
4. Length/Mass/Capacity glossary: unresolved. No such strings in glossary.json; topic-01 names the ladder quantities without bilingual glossary entries. Advisory carried.
5. Topic4.3 single MCQ: unresolved distribution (3/6/1 by primary topic), but approved content-spec explicitly permits fewer for 4.3 when integrated. Advisory carried, not independently elevated to a blocker. Assessment frontmatter nonetheless claims at least two MCQs per topic.
6. Shapes single bank item: unresolved explicit defining-property assessment RRQ08; other shape computations exist but do not directly test classification. Advisory carried.
7. Concept graph unmapped RRQ06/MCQ06: unresolved; neither ID appears in concepts/unit-04.md. Advisory carried.
8. Render limitation: superseded by current limitation. No new current renders, desktop/narrow/A4 inspection or glyph measurements performed because brief forbids builds, servers and Playwright. Old report manifest differs from current bytes and old image artifacts are absent from this G3 folder. Accessibility is unverified.
9. Prior worktree concurrency: historical only. git status initially clean and HEAD equals origin/main 4285d7cb67c4ad4e5c70052dd95e12f7ea3bcd33. No concurrent input edit observed in this run; current manifest is checked again at completion.
