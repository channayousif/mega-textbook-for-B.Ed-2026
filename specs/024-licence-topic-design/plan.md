# Plan: Feature 024

Approved plan: `~/.claude/plans/check-if-the-semester-joyful-puffin.md` (2026-09-26).

## Phase 0 - platform (this PR)

| Change | File |
|---|---|
| Licence track `shape: 'topic-list'`; `walkCourses`/`walkUnits` skip it; `walkLicenceSubtopics`, `LICENCE_SECTION` | `scripts/lib/content-roots.mjs` |
| Objective registry (57, verbatim S1) | `catalog/licence-objectives.json` |
| Page schema + authoring contract | `contracts/licence-page.schema.json`, `contracts/licence-page.md` |
| Gate + pure helpers | `scripts/check-licence.mjs`, `scripts/lib/licence.mjs` |
| Reverse-link map + freshness | `scripts/build-licence-map.mjs` -> `src/data/licence-map.json` |
| Degree-page box, heading objective list | `src/components/LicenceRelevance.tsx` (in `DocItem/Footer`), `src/components/LicenceObjectives.tsx` (MDX global) |
| Rubric exception for licence pages | `scripts/check-no-answer-keys.mjs` |
| Redirects from a content file | `@docusaurus/plugin-client-redirects`, `catalog/licence-redirects.json` |
| Course codes removed | `catalog/courses.json` (licence `courses: []`), `scripts/check-add-course.mjs` |
| Gate tiers, CI, skill prose | `scripts/lib/gates.mjs`, `.github/workflows/ci.yml`, skill SKILL.md gate lines |
| Scaffold | `licence/index.mdx`, `licence/pedagogy/*/index.mdx` + `_category_.json`, UR mirrors, UR sidebar labels |

`check:licence` runs with `--allow-missing` until every heading lands. The flag is dropped in
the last heading PR.

## Phases 1-2 - one agent per heading

Waves of three. Wave 1 is C (EED-313 migration), D and A; wave 2 is B and E. Each agent works in
an isolated worktree on `024-licence-<heading>`, writes only inside its heading directory, and
follows `contracts/licence-page.md`.

## Decisions

- **Reverse links are generated, not authored.** Editing reviewed degree units would invalidate
  their hashed G3 evidence.
- **Licence is excluded from the unit gates at the walker.** One change in `content-roots`
  instead of eleven gate edits.
- **Redirects are content.** Adding one never needs a config edit.
