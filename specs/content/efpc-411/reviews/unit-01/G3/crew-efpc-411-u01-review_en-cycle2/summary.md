# EFPC-411 Unit 1 - G3 English review summary (cycle 2 of 2)

- **Disposition: escalate.** The ADR-0019 two-cycle limit is reached, render-review could not be
  obtained for the reviewed bytes, and one blocking source-evidence defect remains.
- **Reviewer:** agent:claude-crew, Claude Code session 9a479aa1-e6df-4574-8257-5d44142f3c0f. Model
  claude-opus-5-5 (Claude Opus 5.5). Did not author, translate or repair this unit.
- **Author runs:** crew-efpc-411-u01-author; repairs crew-efpc-411-u01-repair_en.
- **Reviewed commit:** 7254e6a3917a1f7c5a052daa88ee40a728f6cb82. Deployed SHA
  956c4ba9149ccc34e41e7d1dc31c624f7709d1b6 predates the repairs.
- **Report:** `specs/content/efpc-411/reviews/unit-01/G3/crew-efpc-411-u01-review_en-cycle2.json`.
  Supersedes `crew-efpc-411-u01-review_en-r1.json`.

## Criteria

| Criterion | Status | Headline |
|---|---|---|
| authority | pass | Guide Weeks 1-4 leaves map to U1-01..U1-13; spec approved; weighting note added (F9). |
| sources | **fail** | Prose citations now hold (F1, F2, F4 fixed). Bound source notes and the U1-04 coverage map claim content the works lack (F11); Schön attributed without a reference (F10). |
| coverage | pass | All 13 sub-topics taught; concept map corrected (F6). |
| assessment | pass | Blind MCQ key 10/10; RRQ 9 and ERQ 4 fixed (F7). |
| accessibility | **unverified** | Source-level alt/desc/link checks pass; no render of the reviewed bytes exists. |
| readability | pass | HSC register holds; one contradictory sentence on the cycle (F12, advisory). |
| pedagogy | pass | Nine-part cycles complete; activities feasible in Sindh schools. |

## Cycle-1 findings

All nine (F1-F9) are resolved in the current files (`prior-findings-verification.md`). F8 is
resolved at source only. F9's course-overview residual is outside the unit's scope.

## Open findings

1. **F11 sources (blocking):** `sources/texts/hec-2013-practicum.md` notes 1, 2, 3 and 6, and
   `sources/texts/teach-primary-2021.md` notes 3 and 4, describe content or page ranges the works do
   not contain. The HEC handbook has no ethics content at all, yet `coverage/unit-01.md` maps U1-04
   (ethics) only to it. The Teach manual never mentions halo, leniency or severity. The prose is not
   wrong, but its recorded evidence is false. Repair the notes from the works and re-source U1-04, or
   record that section as author guidance.
2. **F10 sources (advisory):** `topic-04.mdx:67` attributes reflection-in/on-action to "teacher
   education scholar Donald Schön" with no citation or reference. Cite Schön (1983) and describe him
   accurately.
3. **F12 readability (advisory):** `topic-03.mdx:85` says "The final phase of the observation cycle
   is post-observation reflection". fig-U1-5, the topic summary (line 115) and the assessment summary
   all make collaborative feedback the fourth stage. Reword line 85 (for example "The third phase
   ...; the cycle closes with the feedback conference in Topic 1.4").
4. **F13 accessibility (uncertain):** render-review unavailable. The live site serves 956c4ba91,
   which lacks the repaired alt text and link text. No desktop, 360px or A4 print evidence exists
   for the reviewed bytes.

## Verification highlights

- Gates: validate:content, check:depth-gate, check:figures, check:no-em-dash, check:no-answer-keys,
  check:docs-sync, check:svg-style, check:concept-graph and check:bloom-bands all exit 0 (`logs/`).
- `measure-figure-text` exits 0 on all 16 EN SVG variants.
- Page alt == manifest alt == SVG desc == dark SVG desc for fig-U1-1..8. The banner alt matches its sidecar manifest.
- Teach manual and HEC practicum handbook retrieved and searched (`source-verification.md`).

## Limitations and escalation

- This is the second and last repair/review cycle. A third cycle needs owner authorisation recorded
  in `specs/decisions/log.md` (ADR-0019).
- Rendered and print inspection needs a deploy that contains commit edaed1188, then a fresh
  render-inspect against https://textbook.com.pk.
- Advisory report only. It does not certify the unit, qualify the reviewer, tick G3, or write a
  tracker row.
