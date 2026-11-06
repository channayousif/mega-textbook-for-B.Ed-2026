# Unit 4 translation continuation validation

Worker: codex. Continuation of committed translation `20b399f7e`.

The existing five Urdu MDX mirrors and six localised schematic pairs were retained.
The English baseline and student-facing text are unchanged. Both index front matters
remain `translation_status: draft`. G3 and G5 remain open; this is translator validation,
not independent review. G4 records delivery in its existing open tracker row, following
translate-unit Step 7.

## Evidence repair

The old G2 manifest omitted the subsequently committed
`specs/content/gicp-400/translations/unit-04/handoff.md`. Comparing the current G3 input
manifest with the old G2 input manifest identified this as the only changed input.
The repository generator `node scripts/prepare-gate-evidence.mjs GICP-400 4` reran all
eight draft commands successfully and wrote fresh logs and evidence. Only Unit 4's
G2 tracker reference was repointed. No evidence hashes were manually patched.

## Checks

- Five paired filenames, heading-level vectors and counts of Figure, Glossary,
  PrintHandout, BloomTag, ObjectiveList and ActivityCard matched.
- `npm run figures:variants:check` passed for all 1181 figure sources.
- Temporary `reviewed` check: `validate:content` and `check:figures` passed, and the
  pipeline reported only the expected incomplete G4/G5 rows. No terminology finding.
  The content-status gate also reported its generated snapshot stale during this
  temporary lifecycle change. Both index files were restored to draft afterward;
  no generated publication snapshot or certification status was changed to satisfy it.
- Final draft `npm run check:content`: see `translation-validation/final-content.txt`.

## Remaining independent work

The brief prohibits build, dev server and Playwright runs. No browser or SVG geometry
run was performed in this continuation. The earlier handoff's measurement statement
is historical, not newly verified here. Desktop, 360px and A4 Urdu inspection remains
for a permitted independent session, as do G3's unresolved English provenance and
source-verification issues. G5 requires its accepted English dependency first.

The original handoff retains the proposed unbanked constitutional terms and baseline
identity. The frozen terminology bank was not changed. No push, PR or publication.
