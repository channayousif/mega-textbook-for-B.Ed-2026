# EFMP-408 Unit 3 (Constructing Tests) - G3 English review summary (cycle 2)

- **Reviewer:** `agent:claude-g3-reviewer` (fresh session; did not author or
  translate this unit)
- **Author run:** `claude:crew-efmp-408-u03-repair_en` (repair of
  `agy:crew-efmp-408-u03-author`)
- **Reviewer run:** `crew-efmp-408-u03-review_en-r2`
- **Model:** Claude Code, model identity `LongCat-2.5` (exact deployment version
  unavailable)
- **Reviewed commit:** `467e2a0876a783e4c8649e4aad7f476f0ccf330a` (origin/main)
- **Disposition:** **escalate** (advisory; G3 remains open and unsigned)

## Cycle context

This is the second and final repair/review cycle under ADR-0019. The cycle-1
report (`specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r1.json`)
returned `revise` with findings A-1 to A-4, S-1 to S-3, R-1 and R-2. The repair
run applied commit `a00ba22cd164c69161f5a82bc50266426c43bdc4` ("apply Unit 3 G3
r1 repairs") plus the Urdu mirror, refreshed the G2 evidence
(`20261125T180358838Z-gates.json`) and recorded the repairs in
`specs/content/efmp-408/tasks.md:44`. This report verifies each cycle-1 finding
against the current bytes.

## What was checked

All seven English unit files, the approved content-spec Unit 3 section, the
coverage/sources/concepts/figures tables, the bound HEC guide text and the bound
Seifert & Sutton excerpt; the 10/10/5 bank solved independently before the
supplied answers were read; the 32 unit SVG variants (8 figures, EN and UR, with
derived dark twins); and the deterministic gate set. Render and print inspection
could not be performed (see below).

## Verdicts

| Criterion | Status | Headline |
|---|---|---|
| authority | pass | Guide Weeks 5-7 still map completely to U3-01..U3-12; the content-spec is `status: approved`. |
| sources | pass | The three cycle-1 attributions were regrounded; the remaining HEC/Seifert citations check out against the bound guide and excerpt. |
| coverage | pass | All 12 sub-topics keep a named teaching section and a coverage row; reading-minutes 98 inside 80-105. |
| assessment | pass | MCQ 10 rebuilt so the article clue fits the keyed option; RRQ 1/7/9 raised to Understand; formative bank cut to 12 (3 per topic); every derived MCQ key matches. |
| accessibility | **unverified** | `render-review` unavailable: the deployed build is not the reviewed input. Structural checks pass from source; 360px, print and clipping remain uninspected. |
| readability | pass | HSC register holds; terms defined at first use; no em dash; descriptive link text restored. |
| pedagogy | pass | Nine-part cycle intact; all approved misconceptions named and corrected; activities feasible in the stated Sindhi school context. |

## Cycle-1 findings: verification

| ID | Severity | Resolved | Verification |
|---|---|---|---|
| A-1 | advisory | yes | `unit-assessment.mdx:93-97,156` rebuilds MCQ 10 as "Taxila, Lahore, Amri, Peshawar"; "an" now cues the only vowel-initial option (Amri, keyed C), and the key rationale states exactly that. |
| A-2 | advisory | yes | RRQ 1, 7 and 9 are rewritten to Understand demand (`unit-assessment.mdx:101,107,109`) and the mark schemes at `:162`, `:186`, `:193` now require the explanation, not just recall. `blooms_summary` reads "RRQs Understand to Analyze". |
| A-3 | advisory | yes | 3 formative items per topic (topic-01:133-135, topic-02:128-130, topic-03:122-124, topic-04:144-146) = 12, matching `content-spec.md:193`. |
| A-4 | uncertain | yes | The `*(Analyze)*` formative item in topic-02 was removed; the remaining three are Understand/Understand/Remember, inside Remember-to-Apply. |
| S-1 | advisory | yes | `topic-01.mdx:61` now cites the HEC guide for content coverage, question types and marks distribution and labels the three weightage criteria "an author synthesis ... not a list stated in the HEC guide"; `:86` labels the 30/40/30 split a textbook suggestion, not an official rule. |
| S-2 | advisory | yes | `topic-02.mdx:94` now says "Teachers and examiners commonly observe ..." and ties the effect to the halo effect (Seifert & Sutton, 2009) instead of "Studies consistently show". |
| S-3 | advisory | yes | `topic-02.mdx:101` and `topic-04.mdx:86` now say "widely recommended as general professional practice" / "General professional practice in item writing advises"; no unsupported named body remains. |
| R-1 | advisory | yes | All four topic Further reading lists use descriptive link text (`topic-01.mdx:176-177`, `topic-02.mdx:173-174`, `topic-03.mdx:173-174`, `topic-04.mdx:191-192`). |
| R-2 | advisory | **no** | The unit key terms still have no `glossary.json` entry. Each is defined inline, so comprehension holds; the tracker records the deferral. |
| L-1 | advisory | yes | The cycle-1 `render-inspect` lazy-load false positive was resolved in that report and is not carried. |

## Residual findings

- **Render unavailable (uncertain, unresolved).** `render-review` is recorded as
  unavailable. The deployed SHA `7fb77de68f5d59bbc507e85c07a892a3cbf93eca`
  differs from HEAD `467e2a0876a783e4c8649e4aad7f476f0ccf330a` on the five English
  unit files, so the production build is not the reviewed input. No build, server
  or browser run is permitted by the crew brief.
- **Glossary entries (advisory, unresolved).** Carried from R-2.
- **ERQ 4 percentage labels (advisory, unresolved).** Carried from the cycle-1
  assessment evidence: `unit-assessment.mdx:253` prints 18 marks as 35% and 12
  marks as 25% (18/50 = 36%, 12/50 = 24%). The labels are the unrounded period
  shares and the marks still sum to 50, so this is presentational only.

## Render note

`scripts/render-inspect.mjs` was **not** run. The crew brief's precondition
failed:

```
$ git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- docs/semester-4/efmp-408/unit-03/ static/img/figures/efmp-408/unit-03/
exit=1
M docs/semester-4/efmp-408/unit-03/topic-01.mdx
M docs/semester-4/efmp-408/unit-03/topic-02.mdx
M docs/semester-4/efmp-408/unit-03/topic-03.mdx
M docs/semester-4/efmp-408/unit-03/topic-04.mdx
M docs/semester-4/efmp-408/unit-03/unit-assessment.mdx
```

The production site is therefore not the input under review, and changed images
can be served stale for up to 30 days. Visual accessibility is unverified, not
failed. Structural accessibility evidence (alt text, heading order, static
`overflow-x: auto` table CSS, descriptive links) is recorded under the
`accessibility` criterion.

## Deterministic checks

All cited commands exit 0: `validate:content`, `check:depth-gate`,
`check:figures`, `check:no-em-dash`, `check:no-answer-keys`, `check:docs-sync`,
`check:content`, `check:bloom-bands`, `check:concept-graph`, `check:svg-style`,
`measure-figure-text` (32 SVGs). `render-review` exits 1 by design (unavailable).
`npm run check:content` passes on HEAD, which is origin/main, so this job adds no
new gate finding.

## Limitations

- No parent-prepared frozen handoff or runtime provenance was supplied; the
  manifest was prepared locally over a clean tree and verified against a fresh
  `inputManifest()` computation (104 inputs, 0 missing, 0 extra, 0 mismatches).
- Render and print inspection not performed (see above).
- The Urdu mirror and `.ur.svg` variants are G5 scope; spot-checked for parity of
  the repair (3 formative items per topic, RRQ band, rebuilt MCQ 10) but not
  reviewed.
- This report is advisory. It does not certify the unit, qualify the reviewer, or
  write a done tracker row.
