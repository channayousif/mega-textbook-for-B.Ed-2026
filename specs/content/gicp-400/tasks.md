# GICP-400 - Unit 4 authoring tracker

This file records Unit 4 only. The course content spec is approved. It does not certify
other units or repeat superseded intake findings. English-first draft; Urdu is a separate job.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 4 | G2 en-draft | ▣ | | English authored at 7e166617c; G2 evidence blocked by missing course-overview.mdx outside the Unit 4 scope |
| Unit 4 | G3 en-review | ▢ | | Independent qualified review pending; author has not certified this content |
| Unit 4 | G4 ur-translation | ▢ | | Separate job; no Urdu mirror authored |
| Unit 4 | G5 ur-review | ▢ | | Independent Urdu review pending |

## Figure handoff

Six English schematics are placed with generated dark variants. The separate banner remains
prompt-only for the raster job. Urdu figure localisation belongs to the translation job. Keep the original-versus-later distinction in fig-U4-4 and the
interruption-versus-survival distinction in fig-U4-5. No freehand territorial map is planned.

Browser geometry measurement remains for a permitted session: the crew brief prohibits
Playwright. Non-browser font-metric checks and light/dark preview inspection passed.

## Blocking dependency

`node scripts/prepare-gate-evidence.mjs GICP-400 4` refuses the committed bundle because
`docs/semester-3/gicp-400/course-overview.mdx` is absent. The crew brief confines edits to Unit 4;
authorisation to add the course-level prerequisite was requested on 2026-11-06 and remains
pending. A reviewable, MDX-compiled candidate is in the ignored worktree scratch directory
`.crew/gicp-400-course-overview.candidate.mdx`. The next authorised worker should add the
overview, commit it, prepare deterministic G2 evidence, point the Unit 4 G2 row to that evidence,
regenerate content status and rerun all content gates. Do not mark G3 or G5 done.
