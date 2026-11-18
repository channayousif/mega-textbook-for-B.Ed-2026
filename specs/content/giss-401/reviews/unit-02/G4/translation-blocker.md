# GISS-401 Unit 2 translation dependency

Date: 2026-11-06. Worker: codex. Job: giss-401-u02-translate.
English baseline: `fb951db039155ea2acb8f470eb1a5afa7eec05ab`, identical to
`origin/main` when this job started. No previous branch commits or uncommitted work existed.

## Outcome

Translation is blocked before authoring. No Urdu mirror or Urdu figures were produced.
The English `translation_status` remains `draft`; G3, G4 and G5 remain open.
This record is a dependency handoff, not translation or review acceptance.

## Verified source defect

The approved `specs/content/giss-401/content-spec.md:125` requires an Analyze-or-higher
summative item showing how Ijma or Qiyas is used when the Qur'an and Sunnah do not state
a ruling directly. The supplied analogy at
`docs/semester-3/giss-401/unit-02/topic-01.mdx:66` explicitly has general textual coverage.
The digital-register comparison at line 68 explicitly is not technical Qiyas.
The topic summative task and unit ERQ 1 reuse the first analogy; the other ERQs concern
classroom applications and attribution. They do not supply the required task.

This confirms finding 1 in
`specs/content/giss-401/reviews/unit-02/G3/codex-20261106/review.md`.
A green G2 row does not resolve this semantic assessment-alignment defect.

## Binding workflow

The invoked `.claude/skills/translate-unit/SKILL.md`, under "Out of scope", says:
"if the English is wrong, say so and stop, do not silently improve it in translation".
Accordingly, the translator did not repair the English, alter the approved blueprint,
or reproduce the defective assessment as a purported complete G4 deliverable.

The brief asks to record G4 "as the skill says". Step 7 explicitly says:
"Do not append a `G4 ur-translation` tracker row". The tracker therefore remains unchanged.
Builds and Playwright/browser inspection are also explicitly prohibited by the crew brief.
No rendered Urdu, SVG geometry, G5 or publication success is claimed.

## Next owner and resumption

A separate English author, with qualified Islamic Studies scholar input, must provide a
bounded, supported case and aligned assessment, or obtain owner approval for a blueprint
amendment. Preserve the existing caveat about general textual coverage.
Then freeze the repaired English baseline and rerun this translation job using the resolver
and frozen terminology bank. Independent G3 and G5 remain necessary; source verification,
independent assessment solving and permitted browser/print inspection remain outstanding.
No new Urdu terms are proposed because translation did not begin.

## Validation

See `check-content-baseline.log` and `check-content-final.log` in this folder for the actual
full content-gate results. Baseline HEAD equalled origin/main, so the baseline run directly
measures origin/main findings. No content, tracker, figure, gate or global metadata changed.
