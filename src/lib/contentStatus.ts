/**
 * Content-status snapshot reader (Spec 010, T030). File-based, not a database
 * table (data-model.md's "Content-status snapshot") - `scripts/report-content-status.mjs`
 * writes `static/content-status.json` at build time; this just `fetch()`s it, the same
 * `static/*.json` convention as `content-index.json` (Spec 003).
 */

export type ContentStatusFigureCounts = { prompt_only: number; generated: number; placed: number };

export type ContentStatusFigurePending = {
  course_code: string;
  unit_no: number;
  topic: string;
  figure_id: string;
};

/**
 * Spec 017 T018/T019 - per-unit review-gate state, derived from the course
 * tracker at build time. The review queue is built from this, which is why
 * Postgres needs no queue table and learns nothing about a gate outcome.
 */
export type ContentStatusGateState = 'open' | 'provisional' | 'done';

/**
 * `provisional` (Constitution Art. VII.7) is agent-reviewed and published under
 * a "Final Review Pending" notice, but NOT certified. Ask `=== 'done'` for
 * "is this finished" and `!== 'done'` for "does a human still owe this a pass".
 * Reading provisional as either extreme is a bug in both directions.
 */
export type ContentStatusGates = {
  G2: ContentStatusGateState;
  G3: ContentStatusGateState;
  G5: ContentStatusGateState;
};

/**
 * The unit's PUBLICATION tier (Art. VII.7 as amended by ADR-0026), derived from
 * the gate states by `publicationState` in `scripts/lib/tracker-rows.mjs`.
 *
 * The same discipline as `ContentStatusGateState` applies: ask the exact value.
 * `gated` means published with NO reviewer having read it, which is weaker than
 * `provisional`, not stronger - testing `!== 'unpublished'` to mean "trustworthy"
 * gets it exactly backwards.
 */
export type ContentStatusPublication = 'unpublished' | 'gated' | 'provisional' | 'certified';

export type ContentStatusUnit = {
  unit_no: number;
  authored: boolean;
  translation_status: string | null;
  depth_check: 'pass' | 'fail' | 'not_applicable';
  gates: ContentStatusGates;
  publication: ContentStatusPublication;
  figures: ContentStatusFigureCounts;
  figures_pending: ContentStatusFigurePending[];
};

export type ContentStatusCourse = {
  course_code: string;
  units: ContentStatusUnit[];
};

export type ContentStatusReport = {
  generated_at: string;
  courses: ContentStatusCourse[];
};

/** research.md R10 - re-fetches the build-time artifact; never triggers a live rebuild. */
export async function fetchContentStatus(): Promise<ContentStatusReport | null> {
  const res = await fetch('/content-status.json');
  if (!res.ok) return null;
  return (await res.json()) as ContentStatusReport;
}
