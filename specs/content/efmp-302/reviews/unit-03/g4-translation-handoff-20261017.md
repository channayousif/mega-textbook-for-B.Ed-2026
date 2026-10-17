# G4 translation handoff: EFMP-302 Unit 3

English comparison baseline: `65d2428e170574f474b50d20cefdf722ef389d19` (`origin/main` at task start).

Continued the existing complete draft rather than retranslating it. The mirror contains
`index.mdx`, `topic-01.mdx` through `topic-05.mdx`, `unit-assessment.mdx` and
`unit-teacher-notes.mdx`. All eight pages retain `translation_status: draft`.

Corrected the opening's description of professional obligations, unnatural competing-definition
wording, trainee terminology, untranslated prose words, and typographical errors. Restored the
meaning of high-stakes appraisal in topic 3.1 and the assessment's objection that a school may
appear to close ranks to protect its staff. Preserved assessment order, scoring and cognitive
demands. Updated four figure descriptions to the Urdu colon/full-stop convention and synchronized
their light and derived dark SVG descriptions. No visible SVG labels or geometry changed.

## Terminology and remaining uncertainty

The index's Teacher Effectiveness, Verbal Communication and Non-verbal Communication entries
match the frozen bank. The glossary keys remain English lookup keys. No terminology-bank edits.
The seventeen unbanked concept labels already listed in `concepts/unit-03.md` remain proposals
for the curriculum owner, including professional image, conflict de-escalation, facilitator,
researcher, change agent and moral agent. This continuation adds no new proposed terms.

This is translation work, not an independent G5 assessment. Prior advisory review reports do
not certify these edited bytes. The existing G3 dependency and G5 acceptance remain for their
independent owners; no new review cycle was commissioned and no gate was marked done.

## Verification

- Baseline `npm run check:content` at unchanged `origin/main`: 12 of 13 gates pass; only
  `check:content-status` fails because ignored `static/content-status.json` is missing.
  Generated that local artifact with `npm run build:content-status`.
- Explicit source parity check: eight matching files, identical heading-level vectors,
  invariant metadata, component counts, figure IDs/kinds/dimensions and assessment numbering;
  all sixteen figure carriers have their assets, including ten light/dark Urdu SVG pairs.
- Temporary reviewed-status check: structural and terminology checks exercised; G4/G5 open-row
  findings are expected because neither gate is certified. Restored both indexes to draft.
- `npm run figures:variants:check`: all source-derived variants current.
- Final `npm run check:content`: all 13 gates pass with both indexes restored to draft.
- Build and rendered desktop/narrow/A4 inspection were not run: `.crew/brief.md` explicitly
  prohibits builds and dev servers, and this checkout has no existing build. Previous render
  claims in the tracker describe historical bytes only. A future independent G5 session must
  inspect current rendered Urdu; no new render success is claimed here.

## Handoff

The existing G4 tracker row stays in progress with this continuation noted. All English content,
G3/G5 statuses and publication state remain unchanged. Next owner: curriculum owner for unbanked
terms and G3 dependency, independent G5 reviewer for semantic acceptance and rendered inspection.
