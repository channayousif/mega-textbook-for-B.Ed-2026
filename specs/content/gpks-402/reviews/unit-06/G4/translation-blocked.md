# Unit 6 translation blocked by English baseline

Date: 2026-10-30
Agent: codex
English baseline: 2c39df710e4da102a403099f24feb610af306b17

No Urdu files or figures were authored. Translation status remains draft. G3 and G5 remain open. No G4 row was appended, as translate-unit Step 7 forbids appending one.

## Blocking dependency

The translate-unit skill explicitly says: "if the English is wrong, say so and stop, do not silently improve it in translation".

Confirmed in the current baseline:

- `docs/semester-2/gpks-402/unit-06/unit-assessment.mdx:107` asks ERQ 2 about population growth, poverty, youth unemployment and environmental vulnerability.
- Its rubric at line 177 additionally scores extremism and NAP frameworks, and line 179 scores government programme implementation evaluation beyond the explicit task.
- RRQ 8 at line 100 permits two policy or agricultural measures, but its marking scheme at line 151 requires one agricultural and one policy/catchment response.

These reproduce finding F05 in `specs/content/gpks-402/reviews/unit-06/G3/01a18ccb-4a8c-7c60-8ed2-7c546d08340e.json`. That report also records unresolved source support and vocabulary findings F02-F06. Translating faithfully would preserve the scoring defects; repairing them here would exceed the translation skill's scope.

## Validation and next owner

`npm run check:content`: all 13 gates passed. Structural success does not resolve semantic scoring defects. No build, server, browser or rendered inspection was run, per crew brief.

English author: repair the assessment and resolve the existing G3 findings, then supply a settled baseline for translation. Translator: rerun the full translate-unit workflow after repair, including terminology working set, five Urdu pages, six localized SVG pairs and conditional parity checks. Host: supply narrow/A4 rendered evidence when permitted. Independent G5 remains required; this record is not certification.

## Retry verification (gpks-402-u06-translate-r1)

On 2026-10-30, codex rechecked baseline `c64adf4cdcc1cd507b3412e0a8b9ee0b40cb0bb9`. The English unit and G3 report have no diff from origin/main. ERQ 2 still scores extremism/NAP and policy implementation beyond its stem, and RRQ 8 still restricts accepted measures beyond its stem. Earlier blockers remain active. No translation was started and no G4 completion row was added, following the skill's explicit stop rule and Step 7. The existing open G4 tracker row remains accurate.

The crew brief forbids builds, servers and Playwright, so rendered Urdu inspection cannot be supplied by this job. English author owns scoring, source and vocabulary repairs; translator resumes after repair; host owns permitted rendered evidence. G3/G5 remain open.

Retry validation: `npm run check:content` passed all 13 gates, with no findings. No build, server or browser was run. This does not clear the semantic English blockers or certify any gate.
