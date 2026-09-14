/**
 * The review queue and the certification artefact (Spec 017).
 *
 * Deliberately free of any `@site/...` VALUE import (only `import type`, erased
 * at compile time) so this module is unit-testable under vitest with a plain
 * relative import, the same discipline `src/lib/feedbackExport.ts` keeps.
 *
 * Everything here is pure. The page supplies the reviewer's inputs and takes
 * the two artefacts away as downloads; nothing in this file touches Supabase,
 * Git, or the filesystem, which is what makes FR-009's "no automatic writes"
 * a property of the code rather than a promise in the UI.
 */
import type { ContentStatusReport } from '@site/src/lib/contentStatus';
// The rubric, from the one module that defines it (Spec 017 T017). A second
// copy here would drift from the evidence validator the first time a criterion
// is added, and nothing would notice.
import {
  CRITERIA as CERTIFICATION_CRITERIA,
  COMMANDS as CERTIFICATION_COMMANDS,
} from '../../scripts/lib/review-criteria.mjs';

export { CERTIFICATION_CRITERIA, CERTIFICATION_COMMANDS };

export type ReviewStage = 'G3' | 'G5';

export type Disposition = 'pass' | 'revise' | 'escalate';

export type CriterionStatus = 'pass' | 'fail' | 'unverified';

export type FindingSeverity = 'blocking' | 'uncertain' | 'advisory';

export type CertificationCriterion = {
  id: string;
  status: CriterionStatus;
  evidence: string[];
};

export type CertificationFinding = {
  severity: FindingSeverity;
  message: string;
  resolved: boolean;
};

export type CertificationCommand = {
  name: string;
  exit_code: number;
};

export type Certification = {
  schema_version: 1;
  course_code: string;
  unit_no: number;
  stage: ReviewStage;
  reviewer_id: string;
  input_manifest: Record<string, string>;
  commands: CertificationCommand[];
  criteria: CertificationCriterion[];
  findings: CertificationFinding[];
  disposition: Disposition;
  started_at: string;
  completed_at: string;
  supersedes?: string;
  g3_report?: string;
};

export type ReviewQueueItem = {
  course_code: string;
  unit_no: number;
  stage: ReviewStage;
  /**
   * Null when the unit has no entry in `content-index.json` yet. The item still
   * appears - an authored-but-unindexed unit is a problem a reviewer should
   * see, not one the queue should hide by dropping the row.
   */
  en_route: string | null;
  ur_route: string | null;
};

/** One row of `static/content-index.json`, as much of it as the queue reads. */
export type ContentIndexEntry = {
  course_code: string;
  unit_no: number;
  permalink: string;
};

export type { ContentStatusReport };

/**
 * The unit's own route, taken from any indexed page beneath it: the index
 * carries topic and assessment permalinks but no bare unit entry, and every one
 * of them sits under `.../unit-NN/`. Derived rather than constructed, so a
 * change to the route scheme cannot leave this pointing somewhere that no
 * longer exists.
 */
function unitRoute(index: ContentIndexEntry[], courseCode: string, unitNo: number): string | null {
  const pad = `/unit-${String(unitNo).padStart(2, '0')}/`;
  for (const entry of index) {
    if (entry.course_code !== courseCode || entry.unit_no !== unitNo) continue;
    const at = entry.permalink.indexOf(pad);
    if (at !== -1) return entry.permalink.slice(0, at + pad.length - 1);
  }
  return null;
}

/**
 * Units awaiting a review, ordered by course then unit.
 *
 * Two rules carry the weight here:
 *
 * 1. **A unit whose G3 is open offers G3 only.** Art. VII §4 binds G5 to
 *    accepted G3 evidence for the same English version, so offering G5 first
 *    would invite a certification that `buildCertification` then refuses. This
 *    is the first of the binding's three enforcement points; the second is that
 *    refusal, and the third is the reviewer's own commit.
 * 2. **An unauthored unit is never queued.** A `coming_soon` scaffold has
 *    nothing to review, and its tracker rows are open precisely because the
 *    work has not started.
 */
export function buildReviewQueue(
  report: ContentStatusReport,
  index: ContentIndexEntry[] = [],
): ReviewQueueItem[] {
  const items: ReviewQueueItem[] = [];
  for (const course of report.courses) {
    for (const unit of course.units) {
      if (!unit.authored) continue;
      const gates = unit.gates;
      if (!gates) continue;
      const stage: ReviewStage | null =
        gates.G3 === 'open' ? 'G3' : gates.G5 === 'open' ? 'G5' : null;
      if (!stage) continue;
      const en = unitRoute(index, course.course_code, unit.unit_no);
      items.push({
        course_code: course.course_code,
        unit_no: unit.unit_no,
        stage,
        en_route: en,
        ur_route: en ? `/ur${en}` : null,
      });
    }
  }
  return items.sort(
    (a, b) => a.course_code.localeCompare(b.course_code) || a.unit_no - b.unit_no,
  );
}

// ---------------------------------------------------------------------------
// The certification artefact (contracts/certification.md)
// ---------------------------------------------------------------------------

const INITIALS = /^[A-Z]{1,5}$/;

const unitFolder = (unitNo: number) => `unit-${String(unitNo).padStart(2, '0')}`;

const reviewDir = (courseCode: string, unitNo: number, stage: ReviewStage) =>
  `specs/content/${courseCode.toLowerCase()}/reviews/${unitFolder(unitNo)}/${stage}/`;

export type BuildCertificationInput = {
  course_code: string;
  unit_no: number;
  stage: ReviewStage;
  reviewer_id: string;
  /** The digest map from `manifest.json`, carried through verbatim. */
  input_manifest: Record<string, string>;
  commands: CertificationCommand[];
  criteria: CertificationCriterion[];
  findings: CertificationFinding[];
  disposition: Disposition;
  started_at: string;
  completed_at: string;
  supersedes?: string;
  g3_report?: string;
};

/**
 * Build a certification, refusing anything that would be weaker evidence than
 * the agent path produces.
 *
 * Every refusal below has a counterpart in `scripts/lib/review-evidence.mjs`.
 * A human reviewer is trusted more than an agent in one respect only - their
 * identity is not forgeable in the way an agent's is, which is why there is no
 * signature - and in no other. The rules about what a `pass` may contain, and
 * about a G5 needing its G3, apply identically.
 */
export function buildCertification(input: BuildCertificationInput): Certification {
  const { course_code, unit_no, stage, reviewer_id } = input;

  // T026 - identity. `agent:` in a human artefact would mislead
  // `validateAgentTrackerRow` into a signature check that cannot pass, and
  // Art. VII §3 forbids the reverse impersonation just as firmly.
  if (reviewer_id.startsWith('agent:')) {
    throw new Error('reviewer_id must be human initials, never an agent identity');
  }
  if (!INITIALS.test(reviewer_id)) {
    throw new Error(`reviewer_id must match ${INITIALS} (1-5 capitals)`);
  }

  // `input_manifest` is the map, not a path to it: a path cannot be compared
  // against a freshly computed manifest, so it would make Art. VII §4's
  // freshness rule uncheckable and the two evidence formats undiffable.
  if (
    typeof input.input_manifest !== 'object'
    || input.input_manifest === null
    || Array.isArray(input.input_manifest)
    || Object.keys(input.input_manifest).length === 0
  ) {
    throw new Error('input_manifest must be the non-empty digest map from manifest.json, not a path');
  }

  const expected = CERTIFICATION_CRITERIA[stage];
  const ids = input.criteria.map((c) => c.id);
  if (ids.length !== expected.length || expected.some((id) => !ids.includes(id))) {
    throw new Error(`criteria must be exactly ${stage}'s: ${expected.join(', ')}`);
  }

  // T028 - the G5 binding. Art. VII §4: G5 binds to accepted G3 evidence for
  // the same English version. The agent path refuses a G5 report with no
  // `g3_report`; so does this one.
  if (stage === 'G5') {
    const g3 = input.g3_report;
    if (!g3) throw new Error('a G5 certification requires g3_report, the accepted G3 it binds to');
    if (!g3.startsWith(reviewDir(course_code, unit_no, 'G3'))) {
      throw new Error(`g3_report must sit under ${reviewDir(course_code, unit_no, 'G3')}`);
    }
  } else if (input.g3_report) {
    throw new Error('g3_report belongs only on a G5 certification');
  }

  // T027 - the pass invariant, mirroring review-evidence.mjs.
  if (input.disposition === 'pass') {
    const failed = input.criteria.find((c) => c.status !== 'pass');
    if (failed) throw new Error(`pass has a non-passing criterion: ${failed.id}`);
    const unresolved = input.findings.find((f) => f.severity !== 'advisory' && !f.resolved);
    if (unresolved) throw new Error(`pass has an unresolved ${unresolved.severity} finding`);
    const names = new Set(input.commands.map((c) => c.name));
    const missing = CERTIFICATION_COMMANDS.filter((name) => !names.has(name));
    if (missing.length) throw new Error(`pass is missing command records: ${missing.join(', ')}`);
    const nonZero = input.commands.find((c) => c.exit_code !== 0);
    if (nonZero) throw new Error(`pass has a failing command: ${nonZero.name}`);
  }

  const certification: Certification = {
    schema_version: 1,
    course_code,
    unit_no,
    stage,
    reviewer_id,
    input_manifest: input.input_manifest,
    commands: input.commands,
    criteria: input.criteria,
    findings: input.findings,
    disposition: input.disposition,
    started_at: input.started_at,
    completed_at: input.completed_at,
  };
  if (input.supersedes) certification.supersedes = input.supersedes;
  if (input.g3_report) certification.g3_report = input.g3_report;
  return certification;
}

/** Where a certification must be committed, given its own contents. */
export function certificationPath(certification: Certification, runId: string): string {
  return `${reviewDir(certification.course_code, certification.unit_no, certification.stage)}${runId}.json`;
}

/**
 * The tracker row that references a committed certification, in data-model.md's
 * `| Unit | Stage | Status | Reviewer | Suggestion |` shape.
 *
 * Only a `pass` produces a done row. A `revise` or `escalate` leaves the gate
 * open by design, which is also the whole of the escalation mechanism: the
 * owner sees it at the next gate run, because the gate still fails.
 */
export function buildTrackerRow(certification: Certification, reportPath: string): string {
  const prefix = reviewDir(certification.course_code, certification.unit_no, certification.stage);
  if (!reportPath.startsWith(prefix)) {
    throw new Error(`report path must sit under ${prefix}`);
  }
  const stageLabel = certification.stage === 'G3' ? 'G3 en-review' : 'G5 ur-review';
  const status = certification.disposition === 'pass' ? '✅' : '⏳';
  return `| Unit ${certification.unit_no} | ${stageLabel} | ${status} | ${certification.reviewer_id} | review:${reportPath} |`;
}
