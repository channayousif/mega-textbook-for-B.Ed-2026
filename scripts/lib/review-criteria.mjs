/**
 * The review rubric, as data: what a stage's criteria are, and which
 * deterministic checks a report must cite.
 *
 * Extracted from `review-evidence.mjs` (Spec 017 T017) because two very
 * different consumers now need it and must not drift: the agent evidence
 * validator, which refuses a report whose criteria do not match exactly, and
 * the browser certify form, which renders one row per criterion and one
 * checkbox per command. A second copy in `src/` would be a silent divergence
 * the moment a criterion is added.
 *
 * Plain data, no imports, so a Docusaurus page can import it as readily as a
 * Node gate script can.
 */

export const CRITERIA = {
  G3: ['authority', 'sources', 'coverage', 'assessment', 'accessibility', 'readability', 'pedagogy'],
  G5: ['authority', 'sources', 'coverage', 'assessment', 'accessibility', 'completeness', 'semantics', 'terminology', 'register', 'rtl'],
};

export const COMMANDS = ['validate:content', 'check:depth-gate', 'check:figures', 'check:no-em-dash', 'check:no-answer-keys', 'check:docs-sync', 'render-review'];
