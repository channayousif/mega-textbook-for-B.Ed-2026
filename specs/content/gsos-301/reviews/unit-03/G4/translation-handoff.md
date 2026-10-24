# GSOS-301 Unit 3 G4 blocked handoff

Date: 2026-10-24. Worker: Codex. Branch: crew/gsos-301-u03-translate.
English baseline: `d064fe72144f24a544de194cda53f8632ffc98d2`, equal to origin/main. Initial working tree and branch-only log were empty.

## Required stop

The translate-unit skill says: "if the English is wrong, say so and stop, do not silently improve it in translation". The existing G2 row meets the minimum prerequisite but cannot override this stop rule.

Confirmed in the current English assessment: MCQ 3 (lines 44-48) describes conflicting daughter-in-law and teacher demands, omits role conflict from its options, and incorrectly keys role strain at line 138. Topic 3.1 line 36 and teacher notes lines 25-29 repeat this conflation. RRQ 3 marking guidance at line 153 incorrectly defines conflict by abandonment of shared rules. RRQs 1 and 2 remain Remember tasks. These are unresolved findings from the existing G3 escalation, not translation choices.

Full repair set: `../G3/crew-review-20261023/summary.md`, `independent-assessment.md`, and `source-inspection.md`. The four figure manifest rows also remain prompt-only with absent assets.

## Ownership and resumption

A separate English author owns G3 repairs and freezing a corrected baseline. The curriculum owner owns any approved-spec correction. Visual production requires corrected figure briefs. The review host owns provenance and permitted rendered evidence for fresh independent review.

After repair, resume translate-unit, assemble the frozen terminology working set and translate all five files against the new English commit. No Urdu prose or figure files were created; no new terms are proposed. Translation status remains draft, G4 remains not-started with a blocker on its existing row, and G3/G5 are unchanged. No certification is claimed. No temporary reviewed parity probe is appropriate without a mirror.

The brief forbids build, server and Playwright, so a permitted host must inspect Urdu desktop, narrow and A4 rendering after translation exists.

## Validation

`main-content.log` records a separate detached origin/main run; `content.log` records the final branch run. Both pass all 13 content gates after refreshing the generated content-status report for the tracker change. The intermediate run reported only that derived-report staleness; `npm run build:content-status` resolved it. No new finding is introduced. `git diff --check` passes. No build, server or browser ran.
