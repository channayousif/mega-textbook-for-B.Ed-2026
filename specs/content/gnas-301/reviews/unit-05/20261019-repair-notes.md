# Unit 5 G3 repair notes, 2026-10-19

Author repair record, not independent review or acceptance. Reports remain immutable.

Report addressed: `G3/round-02/agent-g3-gnas301-u5-run002.json` (latest), carrying forward
`G3/20260924T001055Z-g3-attempt-01.json` named in the crew brief.

## Blocking findings verified in the starting checkout

- RRQ-02 already tests Topic 5.1's emission-to-effect chain in EN and UR. The fixed
  ten-item RRQ bank covers topics 5.1/5.2/5.3/5.4 with 2/2/3/3 questions. Corrected the
  concept graph's stale RRQ-02 link from 5.2 to 5.1 and linked RRQ-04 to the journey.
- Topic 5.1 and its source table already restrict the WHO claim to cardiovascular and
  respiratory disease and cancers; the unsupported translocation and ranking quotes are
  absent. Preserved those repairs rather than relocating stale quoted text.
- All four fig-U5-3 variants already place panels at x=26/216/406/596, width 178,
  with connecting arrows at x=204-218, 394-408 and 584-598. No panels overlap and
  each arrow reaches its next panel. Preserved these existing geometry repairs.
- Coverage already uses the exact SDG and environmental-law headings, un-sdgs for U5-06,
  and U5-05 for the teacher-notes MEA reinforcement. Corrected the remaining park-park
  mapping to U5-02 in topic-02, consistent with the source table's by-reference limitation.
- All four English alibhatti2017 bibliography occurrences already include Khuhawar, M. Y.
  Preserved the complete five-author citations.

## Advisory content repairs

- Distinguished Stockholm POPs adoption (2001) from entry into force (2004) in the sources
  table. No treaty date or source excerpt was rewritten.
- Replaced the remaining inaccurate "half" in both topic-04 summaries with seven of
  seventeen. The explanation paragraphs already said seven.
- The MCQ key was already spread across a/b/c/d (2/2/4/2) in both languages; preserved it.
- Linked every RRQ to its actual concept, including RRQ-04 and RRQ-07.
- Recast RRQ-03/04/05/06/09 as short situations rather than repeating formative questions.
  Mirrored every question change in Urdu. Their existing model answers still describe the
  same mechanisms and retain their marks.
- Replaced the redundant agreement-list RRQ-10 with a direct SDG 6 question about targets
  and indicators, with matching EN/UR model answers and concept link. The bank stays 10/10/5.

## Recorded divergence and bounded follow-ups

- MEA plan divergence is explicitly retained: the approved figure plan lists Kyoto 1997
  and Rotterdam 1998 in addition to the delivered six markers; the worked-example plan
  additionally names Montreal. The delivered six are Stockholm 1972, Basel 1989, Rio 1992,
  Stockholm POPs 2001, Minamata 2013 and Paris 2015. The reports call this advisory, not a
  coverage failure. The approved content-spec is outside this repair's editing authority.
- The three missing glossary entries (Toxicant, Risk management, Environmental law) belong
  in repository-wide `glossary.json`, outside Unit 5 scope. Existing inline prose definitions
  remain; the course glossary owner must handle this advisory in a separate scoped job.
- Historical input drift, author identity derivation and source-binding gaps are evidence
  provenance/tooling findings, not unit prose defects. Preserve original reports and
  manifests. The next authorized review must bind the three WHO/UN source excerpts and
  state the actual author and reviewer run identities; tooling changes belong to its owner.
- No fresh review was launched. G3 and G5 remain unticked, translation_status remains draft,
  and the two-cycle limit still requires owner authorization under G-2026-32.

## Validation

The clean starting checkout had no commits ahead of origin/main. Its check:content run
passed 12 gates and failed only because ignored static/content-status.json was missing.
Generated that local artifact with npm run build:content-status before rechecking.

After edits, check:content identified stale Unit 5 G2 input digests and the resulting stale
local status artifact. Committed the repaired inputs and regenerated deterministic G2
evidence with node scripts/prepare-gate-evidence.mjs GNAS-301 5 (all eight checks passed).
Updated only Unit 5's G2 evidence reference, then regenerated the ignored status artifact.

Final validation: npm run check:content passed all 13 gates. scripts/heavy.sh npm test
passed 26 test files and 314 tests. Direct XML checks confirmed nonoverlapping stage
panels and three connected arrows in all four fig-U5-3 variants; direct item counts
confirmed both EN and UR assessment banks remain 10/10/5. git diff --check passed.
