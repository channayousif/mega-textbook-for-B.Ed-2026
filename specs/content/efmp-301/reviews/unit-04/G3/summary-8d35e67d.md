# G3 English review summary - EFMP-301 Unit 4 (Cognitive Processes in Learning)

Cycle: Round 2 of 2 (ADR-0019) | Reviewer: agent:agy (Gemini 3.8 Flash (High), fresh session)
Reviewer run: 8d35e67d-a55f-4595-a37c-c29acbf04727 | Author run: commit:422be89bf9b6 | Reviewed at clean tree.
Report: specs/content/efmp-301/reviews/unit-04/G3/8d35e67d-a55f-4595-a37c-c29acbf04727.json
Advisory only - no gate marked done, no certification.

## DISPOSITION: ESCALATE

(0 blocking findings, 2 uncertain findings, 2 advisory findings)

## VERIFICATION OF EARLIER FINDINGS (ROUND 1 REPAIRS AT 422be89b)

All five blocking findings from round 1 (agent-g3-efmp301-u4-run001.json) were verified against current files and confirmed repaired:

1. **Seifert Chapter 9 citations (Blocking finding 1)**: RESOLVED. Passages covering algorithms, heuristics, functional fixedness, response sets, problem analysis, working backward, and analogical thinking have been bound in `specs/content/efmp-301/sources/texts/seifert2009.md` lines 428-452. Topic 4.3 citations are now supported by the bound excerpt.
2. **Study-strategy evidence (Blocking finding 2)**: RESOLVED. Ariel & Karpicke (2018, ERIC ED599268) was registered in `specs/content/efmp-301/sources/unit-04.md`, bound in `specs/content/efmp-301/sources/texts/ariel2018.md`, and cited with quoted findings in `docs/semester-1/efmp-301/unit-04/topic-02.mdx` lines 91-99 for spaced retrieval practice over restudying.
3. **Gorilla-study reporting (Blocking finding 3)**: RESOLVED. `topic-01.mdx` line 72 was corrected from "mostly failed" to "nearly half of the viewers counting basketball passes failed to notice", matching the bound OpenStax source.
4. **Assessment blueprint deviation (Blocking finding 4)**: RESOLVED. Blueprint rebalanced to the approved 4/3/3 MCQ spread (Q1-3, Q5 -> 4.1; Q4, Q6-7 -> 4.2; Q8-10 -> 4.3) and 3/4/3 RRQ spread (R1-2, R5 -> 4.1; R3-4, R6-7 -> 4.2; R8-10 -> 4.3). Concept graph assessment mappings updated accordingly.
5. **SLO 4-2 outcome trace (Blocking finding 5)**: RESOLVED. `topic-02.mdx` line 9 now declares `SLO:EFMP-301-4-2` and `specs/content/efmp-301/concepts/unit-04.md` maps CON:EFMP-301-4-4 through 4-7 to `SLO:EFMP-301-4-2`.
6. **"billi" unanchored reference (Advisory finding 9)**: RESOLVED. Changed to "cat" in `topic-03.mdx` line 151.
7. **"Rachel's solution" registry drift (Advisory finding 10)**: RESOLVED. Dropped from `sources/unit-04.md`.
8. **Attention-depletion claim (Advisory finding 11)**: RESOLVED. Softened to "Attention flags with sustained use" in `topic-01.mdx` line 69.

## UNRESOLVED FINDINGS CARRIED / ESCALATED

### Uncertain

1. **Visual browser and print inspection (crew job constraint)**: Visual inspection of the 360px small-screen layout, table horizontal scrolling containers, desktop layout, and A4 print PDF views could not be performed in this run because the crew job brief explicitly prohibits running `npm run build`, a dev server, or Playwright. Structural accessibility checks (alt text, heading hierarchy, link text, SVG role/title/desc, figure text measurement via `measure-figure-text.mjs`) all pass from source, but live visual layout remains unverified until inspected on an authorized environment.
2. **Registry/excerpt mismatch for vosniadou2001 (carried from run001)**: `specs/content/efmp-301/sources/unit-04.md` line 19 and `specs/content/efmp-301/coverage/unit-04.md` lines 12, 15 declare `vosniadou2001` supports U4-4 (prior knowledge, practice) and U4-5 (concept formation), but `specs/content/efmp-301/sources/texts/vosniadou2001.md` contains only Principle 11 ("used by Units 1-2"). No unit prose cites Vosniadou (Further Reading only in topic-02 and topic-03), so no learner-facing claim rests on it, but the declared support is unverifiable from the bound excerpt. Resolution requires either extending the excerpt with the booklet's prior-knowledge/practice principles or amending the coverage and sources rows.

### Advisory

3. **Capture factors vocabulary mismatch (carried from run001)**: `topic-01.mdx` lines 56-57 list capture factors as "novelty, contrast, movement, meaning and emotion", while fig-U4-2 presents six factors: "novelty, contrast, meaning, emotion, task demand, expectation" ("movement" is absent from the figure; "task demand" and "expectation" are absent from the prose list).
4. **MCQ option key balance (carried from run001)**: 8 of 10 keys sit on option b (Q1, Q2, Q3, Q4, Q5, Q7, Q9, Q10) and 2 on option c (Q6, Q8), with no keys on option a or d in `unit-assessment.mdx` lines 162-173.

## RUBRIC STATUS

- **Authority**: PASS. Weeks 8-9 Sindh guide scope taught; CLO 1 and 3 traces verified; SLO 4-1, 4-2, 4-3 correctly partitioned; Constitution Art. III.6 folding verified.
- **Sources**: PASS. OpenStax (spielman2020), Seifert Ch 9 (seifert2009), and Ariel & Karpicke (ariel2018) verified against claims. (Vosniadou mismatch tracked as uncertain finding).
- **Coverage**: PASS. All 8 sub-topics U4-1..U4-8 taught under exact mapped headings; depth budget 90 mins (target 90, band 82-105); 6 figures placed; concept graph consistent.
- **Assessment**: PASS. Independent solve matches key 10/10; approved 4/3/3 MCQ and 3/4/3 RRQ blueprint satisfied; ERQ rubrics include Analyze-or-higher criteria summing to 20; Bloom levels verified.
- **Accessibility**: UNVERIFIED. All 24 SVGs valid with role, title, desc and pass text geometry; live browser/print render unperformed due to job execution rules.
- **Readability**: PASS. HSC register held; terms defined at first use with Glossary components; Pakistan/Sindh classroom grounding; zero em dashes.
- **Pedagogy**: PASS. Full 9-part learning cycle in all 3 topics; feasible classroom activities; 5 misconceptions addressed.
