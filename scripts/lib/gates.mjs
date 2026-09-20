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
  'check:concept-graph',
  'check:bloom-bands',
  'check:docs-sync',
];

/** Everything CI runs, in CI's order. */
export const FULL_GATES = [
  ...CONTENT_GATES,
  'figures:variants:check',
  'check:add-course',
  'test',
  'test:review',
  'build',
  'check:no-service-key',
];

/**
 * npm scripts CI runs that deliberately sit OUTSIDE the tiers, each with the
 * reason it cannot be part of `npm run check:all`.
 *
 * WHY THIS EXISTS. `check-docs-sync.mjs` asserted only FULL_GATES subset-of CI,
 * so a step added to the workflow without a matching tier entry passed
 * silently - which is how `figures:variants:check`, `check:no-service-key` and
 * `test:review` all came to run in CI and nowhere else, reintroducing the
 * "green locally, red in CI" gap this file was written to close. The check now
 * runs both ways, and an intentional exception has to be declared here.
 */
export const CI_ONLY = {
  'check:content-status': 'advisory report; CI runs it with `|| echo ::warning::` and never blocks on it',
  'test:rls': 'needs live Supabase service credentials that only CI holds',
  'test:e2e': 'needs Playwright browsers and a served build; runs as its own CI job',
  serve: 'not a check; the static server Playwright drives via PW_WEBSERVER',
};

/** Render the documented one-liner for a tier. */
export function gateCommand(tier = 'content') {
  return tier === 'full' ? 'npm run check:all' : 'npm run check:content';
}
