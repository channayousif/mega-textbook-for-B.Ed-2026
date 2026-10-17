---
id: 0014
title: EFMP304 translation continuation
stage: misc
date: 2026-10-17
surface: agent
model: GPT-6
feature: 006-content-pipeline
branch: crew/efmp-304-u01-translate
user: board
command: Read .crew/brief.md and carry it out completely
labels: [board-direct, translation, efmp-304, blocked]
links:
  spec: specs/008-rich-unit-pedagogy/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-304/translations/unit-01/handoff.md (removed)
  - specs/content/efmp-304/translations/unit-01/check-content-baseline.log (removed)
  - specs/content/efmp-304/translations/unit-01/check-content-final.log (removed)
  - history/prompts/006-content-pipeline/0014-efmp304-translation-continuation.misc.prompt.md
tests:
  - npm run check:content (before and after repair)
  - npm run build:content-status
  - Python3 XML parse of fig-U1-3 light and dark variants
  - Exact comparison of current G3 input manifest with existing G2 evidence
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the earlier attempt. Reconfirmed unchanged English assessment and activity
contradictions and malformed fig-U1-3 SVGs. The required translate-unit skill says to
stop when English is wrong, so no translation was authored or certified. Located the
new stale-G2 failure: all three previous preflight artifacts were additional bound
inputs under the unit translation folder. Removed them and preserved the handoff
below in prompt history, outside the input manifest. Generated ignored content status
with npm run build:content-status; no site build or server ran.

## Outcome

- Impact: Removed the prior attempt's manifest regression; translation remains blocked.
- Tests: Initial check had 12 passes and stale-G2 failure; final run passed all 13 gates (exit 0).
- Files: Three earlier preflight files removed; this PHR preserves their handoff.
- Next prompts: English author repairs the baseline, then G4 resumes.
- Reflection: Operational notes inside the bound unit folder invalidate gate evidence.

## Handoff (for CEO and agents)

- Shipped / changed: Manifest regression fixed by relocating preflight notes here. No Urdu mirror delivered.
- Decisions the team must respect: Required translate-unit skill excludes English repair and explicitly says to stop if English is wrong. Its Step 7 says not to append a G4 row. No tracker gate or translation status changed. Brief prohibits builds and servers.
- Pending / next owner: English author / CurriculumOwner owns the contradictions and malformed SVG. Translator resumes after a settled baseline. Independent G3/G5 reviewers own review; rendered Urdu inspection remains pending.
- Paperclip issues affected: None assigned; no Paperclip operation performed.

## Evaluation notes (flywheel)

- Failure modes observed: Prior preflight notes were included in inputManifest and made G2 stale. English contradictions still prevent faithful assessment translation.
- Graders run and results (PASS/FAIL): Initial check:content FAIL on stale G2; content status generation PASS; both fig-U1-3 XML parses FAIL at column 1876 (pre-existing). Final check:content PASS 13/13; exact G2 manifest comparison PASS with zero differences; git diff --check PASS. A run before staging deletions failed because manifest enumeration uses git ls-files; staging the deletions resolved that intermediate error.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Authorised English repair before G4.

## Preserved earlier preflight handoff

# EFMP-304 Unit 1 translation preflight

Date: 2026-10-17. Branch: `crew/efmp-304-u01-translate`.
English baseline: `25a9f2b5bd152e72dc9278f7d8fe6175acc1179e` (also `origin/main` at preflight).

## Disposition

Blocked before translation. No Urdu mirror has been authored. The existing English
`translation_status` remains `draft`; G3, G4 and G5 have not been certified or closed.

The required `.claude/skills/translate-unit/SKILL.md` explicitly excludes English
repairs: "if the English is wrong, say so and stop, do not silently improve it in
translation". A faithful mirror would carry the contradictions below into Urdu;
repairing only Urdu would change the assessment and violate semantic parity.

## Concrete blockers for the English author

1. `docs/semester-2/efmp-304/unit-01/unit-assessment.mdx:113` supplies a reason
   ("they are too young") in RRQ 3. Its model response at line 166 says the text
   offers no reason. The English author must reconcile the item and marking
   guidance before either is translated. Translation cannot choose between them.
2. `docs/semester-2/efmp-304/unit-01/topic-04.mdx:91` asks for the conclusions and
   reasons of "the two that are arguments". The preceding activity presents an
   attendance explanation, an unsupported proposal, and a supported claim. This
   conflicts with the topic's own distinction between explanation and argument.
   The English author must settle the intended classification and instructions.
3. Existing G3 report
   `specs/content/efmp-304/reviews/unit-01/G3/agent-g3-efmp-304-u1-run5e4cc29c.json`
   has disposition `revise`, including figure XML, geometry and assessment
   distribution findings. This is historical advisory evidence, not accepted
   certification of the present English version. The current assessment and
   topic-04 hashes differ from its input manifest, so the report is not claimed
   fresh for those pages. Direct XML parsing in this preflight confirms that
   `fig-U1-3.svg` and `fig-U1-3.dark.svg` still fail at line 1, column 1876.
   The light SVG's hash still matches that report's bound input.

## Continuation

The curriculum owner / English author owns the baseline repair and a settled
English handoff. A subsequent translation session should resolve the unit with
`scripts/lib/content-roots.mjs`, translate all seven English pages and ten
schematics, check conditional parity temporarily, then restore draft status.
The frozen terminology bank must remain unchanged. No proposed Urdu terms were
introduced in this stopped preflight. Independent G5 and rendered RTL/print
inspection remain pending after translation; no build or server was run here,
as the crew brief forbids both.

No G4 row was appended: translate-unit Step 7 explicitly prohibits it. The
existing not-started row remains accurate. No publication state changed.

## Validation

The untouched checkout exactly matched `origin/main` before the baseline
`npm run check:content` run. The baseline run passed 12 of 13 gates; only `check:content-status` failed
because `static/content-status.json` is missing. This is an existing main
finding, recorded in `check-content-baseline.log`. The final run is recorded
in `check-content-final.log` and has the same 12 passes and the same single
failure. No new deterministic finding was introduced. These checks do not resolve the semantic defects
above, and a passing deterministic gate is not G3 or G5 acceptance.
