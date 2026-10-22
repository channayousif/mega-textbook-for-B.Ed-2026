# GSOS-301 Unit 4 G4 blocked handoff

Date: 2026-10-22. Worker: Codex. Branch: `crew/gsos-301-u04-translate`.
English baseline: `e7a4fd6541dae138b1470afbee4daa4dee7e9e5b` (`origin/main` at task start).
The initial working tree and `git log origin/main..HEAD` were empty.

## Required stop before translation

The requested `.claude/skills/translate-unit/SKILL.md` says under Out of scope:
"if the English is wrong, say so and stop, do not silently improve it in translation".
The G2 row exists, but the G3 advisory report identifies actual errors still present in this baseline.
The minimum G2 prerequisite does not override this explicit stop instruction.

Confirmed directly in `docs/semester-2/gsos-301/unit-04/unit-assessment.mdx`:

- MCQ 2 option B is 68.00%, while its final marking guidance says B is 60.00%.
- All five ERQ rubric tables have a three-cell row beneath two-column headers.
- RRQs 1 and 2 require recall and are tagged Remember, below the approved Understand-to-Analyze band.

The separate G3 report at `../G3/20261022-codex/review.md` also requests coverage-map and source-declaration repairs and provenance/render evidence. Its disposition is advisory escalate, not accepted G3.

## Ownership and resumption

A separate English author must resolve the G3 content findings and freeze the corrected English baseline. The host must arrange provenance and permitted render evidence for fresh independent review. Then a translation worker can produce the complete five-file Urdu mirror, terminology working set and four Urdu SVG variants, and run draft and temporary reviewed parity checks. No English correction is made by this translation session.

No Urdu prose or figure files were created, no new terms were proposed, and no parity or render success is claimed. `translation_status` remains `draft`. G4 stays not-started with a blocker note on its existing row; G3 and G5 were not changed. Build, dev server and Playwright are prohibited by the crew brief, so rendered Urdu inspection must be assigned to a permitted host after translation exists.

## Validation

The clean starting HEAD equals origin/main, so the pre-edit check is the exact origin/main baseline. `main-content.log` records that run; `content.log` records the final run. Both run all 13 content gates. Baseline: 12 pass, only `check:content-status` fails because `static/content-status.json` is already stale. Final: the same 12 gates pass and only the same stale content-status check fails. Logs match exactly after normalising durations. No new finding was introduced. `git diff --check` passes. No build or render was run, as required by the brief.

## R1 prerequisite recheck (2026-10-22)

Worker: Codex. Branch: `crew/gsos-301-u04-translate-r1`.
Baseline: `4d0c843d80fba164dff399e82a8cf7a13b67e087`, equal to `origin/main`.
Initial working tree and `git log origin/main..HEAD` were empty.

The blockers remain in the current English assessment: option B at line 41 is
68.00%, but guidance at line 138 says 60.00%; lines 177, 185, 193, 202 and 210
have three cells beneath two-column headers; RRQs 1 and 2 at lines 97 and 99
still demand Remember rather than the approved Understand-to-Analyze range.
Coverage reinforcement still assigns MCQ 5 to U4-01 and MCQ 6 to U4-02.
The translate-unit stop rule still applies. No translation or English repair was
made. The existing blocked G4 tracker row remains accurate. A separate English
author owns repairs before translation can resume against a corrected baseline.
No G4 completion or G3/G5 review is claimed; translation_status remains draft.

R1 logs: `main-content-r1.log` records the clean baseline run and `content-r1.log`
records the final run. Build and rendering remain prohibited by the brief.
No parity probe is appropriate without an Urdu mirror.

Both R1 runs pass 12 of 13 gates and fail only the pre-existing stale
`static/content-status.json` check. Logs match after normalising durations.
No new finding was introduced. `git diff --check` passes.
