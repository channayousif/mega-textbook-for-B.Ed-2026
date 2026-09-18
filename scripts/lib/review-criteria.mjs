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

/**
 * The deterministic checks a G2 draft-stage gate manifest must cite.
 *
 * G2 asks a different question from G3. "Does a draft exist at standard" is a
 * machine-checkable property, so it is answered by gate exit codes rather than
 * by a reviewer's judgement, and needs no reviewer identity at all.
 *
 * Deliberately NOT `COMMANDS`: that list is the G3 pass contract and is also
 * imported by the Spec 017 browser certify form, so widening it would move UI.
 * This list may therefore include `check:concept-graph`, which G3 does not
 * require, without disturbing anything.
 *
 * `check:pipeline-gate` is deliberately absent. It is the gate this evidence
 * satisfies; requiring it here would be circular.
 */
export const DRAFT_COMMANDS = ['validate:content', 'check:depth-gate', 'check:figures',
  'check:concept-graph', 'check:no-em-dash', 'check:no-answer-keys', 'check:docs-sync'];
