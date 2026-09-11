/**
 * The authoritative gate lists (Spec 013, D6 / FR-013).
 *
 * WHY THIS EXISTS. Before Spec 013 the instruction "run the gates" appeared in
 * four places - author-unit/SKILL.md, generate-figures/SKILL.md, that skill's
 * placement.md, and revise-topic/SKILL.md - and all FOUR listed different
 * commands. One omitted `check:depth-gate`, another also omitted
 * `check:no-em-dash`, and NONE of them ran `check:pipeline-gate`. An author
 * could therefore run "the gates", see green, and still fail CI.
 *
 * The lists now live here, the prose is generated from them by
 * `check-docs-sync.mjs`, and `check-docs-sync.mjs` also asserts that the CI
 * workflow's own step list matches FULL_GATES - so a gate added here but
 * forgotten in CI fails the build rather than silently never running.
 *
 * TWO TIERS, deliberately. CONTENT_GATES is what a skill calls in its
 * fix-and-rerun loop, so it excludes the minutes-long `build`. A slow gate is a
 * skipped gate. FULL_GATES is the pre-merge superset.
 */

/** Fast enough to run after every edit. This is what the skills document. */
export const CONTENT_GATES = [
  'validate:content',
  'check:pipeline-gate',
  'check:depth-gate',
  'check:figures',
  'check:no-em-dash',
  'check:no-answer-keys',
  'check:docs-sync',
];

/** Everything CI runs, in CI's order. */
export const FULL_GATES = [
  ...CONTENT_GATES,
  'check:add-course',
  'test',
  'build',
];

/** Render the documented one-liner for a tier. */
export function gateCommand(tier = 'content') {
  return tier === 'full' ? 'npm run check:all' : 'npm run check:content';
}
