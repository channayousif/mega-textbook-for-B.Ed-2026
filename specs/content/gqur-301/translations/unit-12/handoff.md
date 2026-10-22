# Unit 12 translation prerequisite stop

Date: 2026-10-22. Translator session: Codex. No translation or review completion claimed.

## Baseline and decision

The checkout started clean at `8f5587c386715c5e6f8b97f29615b76f059756ff`, identical to `origin/main`, with no prior branch-only commits. The English unit has a G2 row, but its G3 advisory report escalates unresolved blocking findings F1-F6. Direct inspection confirms that Topic 12.2 promises a numerical table and plot absent from the page.

The translate-unit skill explicitly requires: "if the English is wrong, say so and stop, do not silently improve it in translation". Translation therefore did not start. Duplicating known defective assessment guidance into Urdu would preserve defects rather than produce a settled baseline for G5.

## Required next work

A separate English author must resolve F1-F6 in `specs/content/gqur-301/reviews/unit-12/G3/crew-20261022.json`: missing data/plot, underspecified questions and conditional outlier effects, scale-effect guidance, concept-map overlap, Analyze-level demand, and bivariate/nonlinear-strength explanations. The host must then arrange fresh independent G3 review with the provenance, authority/source and actual rendered evidence requested in F7-F9.

Once the baseline is settled, a translator should produce all four Urdu MDX mirrors and all four Urdu SVG variants, derive dark variants, verify terminology and conditional parity, and obtain authorised rendered Urdu inspection. No terms have been proposed because translation has not started.

## Status and constraints

All English `translation_status` values remain `draft`. G3 and G5 remain open. No G4 tracker row was appended: Step 7 of the current translate-unit skill expressly forbids it, despite the brief's inconsistent instruction to record one "as the skill says". The brief forbids builds, servers and Playwright, so no rendered inspection was attempted or claimed. No English content, figures, signed evidence or publication state was changed.

## Validation

`npm run check:content` initially passed 12/13 gates, failing only because ignored `static/content-status.json` was missing on the clean baseline identical to `origin/main`. After `npm run build:content-status`, the rerun passed all 13 gates. `git diff --check` passed. No build, browser or print evidence is claimed.

## Retry evidence repair

Continuation at `36552c13` confirms the English F1-F6 blockers persist. The prior handoff is itself a bound G2 input; adding it invalidated the old G2 manifest. Refresh deterministic evidence through the repository tool, preserving historical evidence and G3/G4/G5 status. G2 success does not resolve semantic findings. Compare full gates against isolated origin/main. Builds and browser inspection remain prohibited.
