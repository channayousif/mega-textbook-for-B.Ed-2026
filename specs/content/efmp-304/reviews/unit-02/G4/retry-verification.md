## Retry verification: efmp-304-u02-translate-r1

Continued the existing branch on 2026-10-18 without restarting translation. All 44 recorded
input hashes still match, including the six English pages, six Urdu pages and recorded figure
assets. The mirror is unchanged from the recorded English baseline. This is translator
verification, not independent G3/G5 evidence or a semantic approval.

The previous retry left `static/content-status.json` missing. Ran
`npm run build:content-status` to generate this ignored checkout artifact, then ran
`npm run check:content`: all 13 gates passed. Do not force-add the generated report to Git.
A fresh checkout must generate it before checking content, including after tracker edits.

The existing mirror checker passed all six file/heading/metadata/component/import and MDX
compilation checks, nine declared bank-bound terms, all eight Urdu figure paths and alts,
10/10/5 assessment counts, 40 option labels in original order and the final answers section.
`npm run figures:variants:check` passed for all 796 repository figures.

Repeated the temporary `reviewed` check with automatic byte-for-byte restoration in `finally`.
File/heading parity, figures and terminology had no findings. The only temporary failures
were the unfinished G4/G5 tracker rows and content-status becoming stale under the temporary
flag. Both indexes were restored to `draft`. The G4 row remains in progress, with no initials;
G3/G5 are unchanged. Full-page RTL/print inspection and English repairs remain pending under
the owners named in `specs/content/efmp-304/translations/unit-02/handoff.md`. No build, dev server or new review was run.

The existing translation handoff is itself a bound G2 input. Updating it caused a stale
manifest finding. Restored it byte-for-byte and recorded this retry separately under
`reviews/unit-02/G4/` so no English gate evidence needs regeneration. The existing G4
progress row is preserved.
