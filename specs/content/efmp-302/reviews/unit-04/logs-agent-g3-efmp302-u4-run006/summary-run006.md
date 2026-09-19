# G3 review summary - EFMP-302 Unit 4, run 006 (confirming run)

Reviewer `agent:g3-reviewer`, run `agent-g3-efmp302-u4-run006`, model `claude-opus-5`.
Author run `commit:fa9510f`. Frozen bundle: commit `b131081`, tree clean before and after.
Manifest `specs/content/efmp-302/reviews/unit-04/G3-run006/manifest.json` recomputed with
`inputManifest()`: 137 declared, 137 live, 0 missing, 0 extra, 0 digest mismatches; skill digest
matches. Not refreshed.

**Disposition: escalate.** Six of seven criteria pass. `assessment` fails on one defect introduced
by the run-005 repair itself. The defect is `revise`-class and precisely located, but this is the
sixth G3 cycle against a stated limit of two, and the sounder of the two available remedies changes
taught prose and a committed figure. Both of those are owner decisions.

## Criteria

| Criterion | Status |
|---|---|
| authority | pass |
| sources | pass |
| coverage | pass |
| assessment | **fail** |
| accessibility | pass |
| readability | pass |
| pedagogy | pass |

## The one blocking finding

RRQ-05's rewritten clause asks candidates to "explain why only the performance level yields
indicators an observer can check". The unit never teaches that, its taught architecture says the
opposite (topic-02.mdx:64-66), and the item's own mark scheme asserts both propositions at once
(unit-assessment.mdx:227-230). Full derivation in `assessment-analysis-run006.md`.

## Run-005 items closed this run

- Blocking `check:no-answer-keys` failure: **resolved**, re-run at exit 0 and confirmed in both
  directions with synthetic positive/negative controls (`answer-key-gate-control-run006.log`).
- Bloom floor on RRQ-03/05/08: closed at the tag level; RRQ-03 and RRQ-08 are honest rewrites;
  RRQ-05's rewrite introduced the blocking defect above.
- Isore frequency claim, Topic 4.4 RRQ distribution, `hurst2009` dropped reading, figure scroll
  affordance: all re-verified as resolved (the last one partially - see advisories).

## Evidence

MCQ keys derived blind from prose before the answer key was opened: 10/10 agreement.
Six mandatory gates at exit 0. Render inspection at 375x780 narrow, 1280x900 desktop and A4 print
emulation over the pre-built `build/` tree served on :3104 (not rebuilt), Chromium 149.0.7827.0.
