/**
 * Which stages a unit on main still needs, from facts crew.mjs gathers (content status,
 * review reports, tracker rows, files on disk). Pure, so tests/crew/ can exercise it.
 *
 * Two rules changed on 2026-10-19, when the crew went idle with 58 of 60 units unreviewed:
 *
 *  - Translation is done when every English page of the unit has its Urdu file. The planner
 *    used to wait for a ✅ on the unit's G4 tracker row, but the tracker legend makes ✅
 *    require reviewer initials, which no agent may add (ADR-0019). So `translate` was
 *    planned again and again for finished mirrors, until the two-merged-runs guard stopped
 *    it and the unit fell silent.
 *  - The Urdu review (G5) compares the mirror against the ACCEPTED G3 English version, so it
 *    is planned only once G3 is done. Until a person signs G3 off, a unit whose agent
 *    review is finished is "awaiting G3": listed for the owner, not worked on.
 *
 * On 2026-10-25 (maintenance M2 of 2026-W43): translation waits while the latest G3 report is a
 * `revise` that has not been repaired. Translate jobs queued behind open English defects only
 * wrote handoffs ("separate English author must resolve ... before translation resumes"), or
 * copied the defects into a mirror that then had to be redone (GSOS-301 U3). `repair_en` is
 * planned instead; translation follows once the repair lands. A `pass` or no G3 report at all
 * still lets the draft mirror go ahead (English-first publication).
 *
 * On 2026-11-01 (maintenance M3 of 2026-W44, GPKS-402 U6 evidence): translation also waits while
 * the latest G3 report is an unrepaired `escalate`. GPKS-402 U6 was translated and retried while
 * its G3 report was an `escalate` with blocking source and scoring findings; both jobs only wrote
 * stop handoffs. An escalated unit already waits for the owner, and `reReviewDue` treats an owner
 * send-back as `g3Repaired`, so holding translation until then loses nothing; `repair_en` is not
 * planned for an escalate (only a `revise` is repaired by the crew). Translation is planned again
 * once `g3Repaired` is true or G3 is done.
 *
 * On 2026-10-25, 31 of the 83 units "awaiting G3" were `revise` verdicts whose repairs had landed
 * but that no reviewer had checked, so the owner was asked to sign off unverified fixes. ADR-0019
 * allows two repair/review cycles per stage, so a repaired `revise` from the first cycle now gets a
 * fresh `review_en`, as does an `escalate` the owner sent back for repair. Only a unit whose
 * cycles are used up waits for the owner.
 *
 * On 2026-11-08 (maintenance M5 of 2026-W45, GICP-400 and EFMP-406 evidence): a course with no
 * course-overview.mdx and no unit on disk queues only its lowest missing unit's `author` job.
 * review-evidence binds `<course>/course-overview.mdx` as a required G2/G3 input, so sibling
 * author jobs stopped on "missing required input" and then collided on that file (GICP-400 Units
 * 1, 2 and 4, 2026-11-07 C6; EFMP-406 Units 2 to 5, 2026-11-03 C6). The first job writes the
 * overview, modelled on an existing course's, before its siblings are queued.
 */

/** ADR-0019: at most two repair/review cycles per stage per submission. */
export const MAX_REVIEW_CYCLES = 2;

/**
 * @param {object} u  content-status unit: { authored, gates: { G3, G5 }, figures }
 * @param {object} f  { bilingual, g3Report, g3Repaired, g3Cycles, g5Report, mirrorComplete }
 */
export function stagesFor(u, f) {
  if (!u.authored) return ['author'];
  const need = [];
  // Kind decides the producer (ADR-0024/0029): schematics go to `figures` (SVG), illustrations to
  // `illustrate` (raster). The content status counts prompt-only rows without Kind, so until
  // 2026-11-03 an illustration queued no-op `figures` jobs and `illustrate` never ran at all.
  const backlog = f.figureBacklog ?? { schematic: u.figures?.prompt_only || 0, illustration: 0 };
  if (backlog.schematic > 0) need.push('figures');
  if (backlog.illustration > 0) need.push('illustrate');
  if (needsIllustrationPlan(u, f)) need.push('plan_illustrations');
  const hold = illustrationsPending(u, f);
  const unrepairedRevise = u.gates.G3 !== 'done' && f.g3Report?.disposition === 'revise' && !f.g3Repaired;
  const unrepairedEscalate = u.gates.G3 !== 'done' && f.g3Report?.disposition === 'escalate' && !f.g3Repaired;
  if (u.gates.G3 !== 'done') {
    if (!f.g3Report) { if (!hold) need.push('review_en'); }
    else if (unrepairedRevise) need.push('repair_en');
    else if (!hold && (reReviewDue(f) || passStale(f))) need.push('review_en');
  }
  if (f.bilingual) {
    if (!f.mirrorComplete) {
      if (!unrepairedRevise && !unrepairedEscalate) need.push('translate');
    } else if (u.gates.G3 === 'done' && u.gates.G5 !== 'done' && !f.g5Report) need.push('review_ur');
  }
  return need;
}

/**
 * Unfinished figure rows split by producer. `rows` are parsed manifest rows (unit-NN.md plus the
 * unit-NN.banner.md sidecar, which carries the ADR-0029 unit banner). A row with no Kind is a
 * schematic: that is what the `figures` job draws. An illustration still at `generated` also
 * needs the illustrate job: the script never places, so a person or agent must inspect it first.
 */
export function figureBacklog(rows) {
  const out = { schematic: 0, illustration: 0 };
  for (const r of rows ?? []) {
    if (r.kind === 'illustration') {
      if (r.status === 'prompt-only' || r.status === 'generated') out.illustration++;
    } else if (r.status === 'prompt-only') out.schematic++;
  }
  return out;
}

/** Raster generation is serial (one lock, one image quota): keep one illustrate job in flight. */
export function limitIllustrate(added, inFlight) {
  let slot = !inFlight.some((j) => j.stage === 'illustrate');
  return added.filter((j) => {
    if (j.stage !== 'illustrate') return true;
    if (!slot) return false;
    slot = false;
    return true;
  });
}

/**
 * ADR-0029 backfill (owner ruling 2026-11-09). A unit authored before the author-unit skill
 * planned raster images (c74f8afb3, 2026-11-03) has no `unit-NN.banner.md`, and nothing queued
 * one: `illustrate` runs only for illustration rows that exist. GISS-401 Unit 1 reached the desk
 * as "Suggested: Certify" with no banner or scene; 98 of 120 units had no banner. A certified
 * unit is left alone, since placing images would change its certified inputs.
 * `hasBanner` is absent in callers that do not gather it, which keeps their old behaviour.
 */
export function needsIllustrationPlan(u, f) {
  return u.authored && u.gates.G3 !== 'done' && f.hasBanner === false;
}

/**
 * Owner ruling 2026-11-09: hold, do not certify, until a unit's raster images are planned and
 * placed. While this is true the crew does not review the unit and the desk does not offer it.
 */
export function illustrationsPending(u, f) {
  return needsIllustrationPlan(u, f) || (f.figureBacklog?.illustration ?? 0) > 0;
}

/**
 * Paths whose hash differs between a report's `input_manifest` and the current one, kept only
 * when they belong to this unit (`unit-NN` as a path segment or a `unit-NN.` file stem). Shared
 * inputs (gate scripts, the style guide, course guides) change every unit's manifest at once;
 * re-reviewing the corpus for those would be a wave, so only the unit's own changes count.
 */
export function unitScopedChanges(before, after, unit) {
  const nn = String(unit).padStart(2, '0');
  const mine = new RegExp(`(^|/)unit-${nn}(/|\\.|$)`);
  const keys = new Set([...Object.keys(before ?? {}), ...Object.keys(after ?? {})]);
  return [...keys].filter((k) => mine.test(k) && (before ?? {})[k] !== (after ?? {})[k]).sort();
}

/**
 * A `pass` whose unit files changed after the review (images placed, a later fix) describes
 * content the reviewer never saw. It gets a fresh review; a pass used no repair cycle, so the
 * ADR-0019 limit is untouched. `g3UnitChanges` is the unitScopedChanges list for the report.
 */
function passStale(f) {
  return f.g3Report?.disposition === 'pass' && (f.g3UnitChanges?.length ?? 0) > 0;
}

/**
 * Backfilling ~100 units at once would edit as many bound inputs in one tick and invalidate their
 * evidence in a burst (sibling jobs also collide on tasks.md). Keep at most two plan jobs in flight.
 */
export const MAX_PLAN_ILLUSTRATIONS = 2;
export function limitPlanIllustrations(added, inFlight) {
  let slots = MAX_PLAN_ILLUSTRATIONS - inFlight.filter((j) => j.stage === 'plan_illustrations').length;
  return added.filter((j) => j.stage !== 'plan_illustrations' || slots-- > 0);
}

/** A unit the crew has finished reviewing that waits only for a person's G3 sign-off. */
export function awaitingG3(u, f) {
  if (!u.authored || u.gates.G3 === 'done' || !f.g3Report || reReviewDue(f)) return false;
  if (illustrationsPending(u, f) || passStale(f)) return false;
  return f.g3Report.disposition !== 'revise' || f.g3Repaired;
}

/**
 * A repaired `revise` or `escalate` with a review cycle left: the crew re-reviews it before the
 * owner sees it. An escalation is repaired only when the owner queues `repair_en` for it.
 */
function reReviewDue(f) {
  const d = f.g3Report?.disposition;
  return (d === 'revise' || d === 'escalate') && f.g3Repaired && (f.g3Cycles ?? 1) < MAX_REVIEW_CYCLES;
}

/** True when every English page (.md/.mdx) has an Urdu file of the same name. */
export function mirrorComplete(enFiles, urFiles) {
  const pages = enFiles.filter((name) => /\.mdx?$/.test(name));
  if (!pages.length) return false;
  const ur = new Set(urFiles);
  return pages.every((name) => ur.has(name));
}

/**
 * The latest review report among a gate folder's parsed JSON files, or null. A report is
 * the file that carries a `disposition`; manifest.json and other evidence files do not.
 * Order is the report's own completion time, then its name. Picking the alphabetically
 * last file read manifest.json ("m" sorts after the timestamped reports), so the crew saw
 * no disposition and never planned the repair a `revise` verdict needs (2026-10-19).
 */
export function pickLatestReport(entries) {
  const reports = entries.filter((e) => e.json && typeof e.json.disposition === 'string');
  if (!reports.length) return null;
  const when = (e) => String(e.json.completed_at || e.json.started_at || '');
  reports.sort((a, b) => when(a).localeCompare(when(b)) || a.file.localeCompare(b.file));
  const last = reports.at(-1);
  // `cycles` counts the gate's reports: each is one review cycle under ADR-0019.
  return { file: last.file, ...last.json, cycles: reports.length };
}

/**
 * Unit numbers an approved content-spec defines (its `## Unit N` headings), or [] for a spec that
 * is not approved. The planner walked only units already on disk, so a unit that was specified but
 * never written was invisible and never got an `author` job: GQUR-301 sat at 2 of 16 units after
 * D-2026-0070 split it one unit per guide chapter (2026-10-20).
 */
export function specUnitNumbers(specText) {
  const fm = /^---\n([\s\S]*?)\n---/.exec(specText);
  if (!fm || !/^status:\s*approved\s*$/m.test(fm[1])) return [];
  return [...new Set([...specText.matchAll(/^## Unit (\d+)\b/gm)].map((m) => Number(m[1])))].sort((a, b) => a - b);
}

/**
 * Unit numbers to queue `author` for from an approved spec: every spec unit not on disk, except
 * that a course with no course-overview.mdx and no unit on disk gets only its lowest missing
 * unit. review-evidence binds `<course>/course-overview.mdx` as a required G2/G3 input, so the
 * first author job writes the overview before its siblings are queued (2026-W45 M5; GICP-400
 * Units 1, 2 and 4 stopped on the missing input, EFMP-406 Units 2 to 5 collided on the file).
 *
 * @param {number[]} unitsInSpec  sorted unit numbers the approved spec defines
 * @param {Set<number>|number[]} onDisk  unit numbers already written
 * @param {boolean} hasOverview  the course content root already has course-overview.mdx
 * @returns {number[]}
 */
export function authorQueue(unitsInSpec, onDisk, hasOverview) {
  const written = onDisk instanceof Set ? onDisk : new Set(onDisk);
  const missing = unitsInSpec.filter((n) => !written.has(n));
  if (!hasOverview && written.size === 0) return missing.slice(0, 1);
  return missing;
}

/** Job states that are crew work in flight. `gate_red` and `blocked` wait on a person, so they never hold the crew. */
export const IN_FLIGHT = ['queued', 'running', 'pr_open', 'ready', 'batched'];
export const isCorpusStage = (stage) => !/^(maint|intel)_/.test(stage);

/**
 * The one course the crew works on first (owner ruling 2026-10-28: finish what was started
 * before starting a new course). A course is started once it has an authored unit or crew work
 * on the board (its first author jobs are in flight before any unit lands), and it is finished
 * *for the crew* when no crew work is left on it; whatever remains waits on a person.
 *
 *  - Focus: the started course with crew work left and the fewest jobs remaining (the one
 *    nearest done), ties in catalog order.
 *  - With no started course left to work on, the first course in catalog order that has an
 *    approved spec but no authored unit becomes the focus. Only the focus may start: the
 *    planner withholds `author` jobs for every other unstarted course.
 *
 * @param {object} p
 * @param {Map<string, boolean>} p.started   course code -> started (see above)
 * @param {{course: string, stage: string, status?: string}[]} p.jobs  board jobs plus this pass's jobs for started courses
 * @param {string[]} p.newCourses            approved but unstarted courses
 * @param {string[]} p.catalogOrder          course codes in catalog order
 * @returns {{course: string, reason: string} | null}
 */
export function focusCourse({ started, jobs, newCourses, catalogOrder }) {
  const rank = (code) => { const i = catalogOrder.indexOf(code); return i < 0 ? catalogOrder.length : i; };
  const left = new Map();
  for (const j of jobs) {
    if (!isCorpusStage(j.stage) || !IN_FLIGHT.includes(j.status ?? 'queued')) continue;
    left.set(j.course, (left.get(j.course) || 0) + 1);
  }
  const open = [...left.keys()].filter((c) => started.get(c))
    .sort((a, b) => left.get(a) - left.get(b) || rank(a) - rank(b));
  if (open.length) return { course: open[0], reason: `finishing: ${left.get(open[0])} crew job(s) left` };
  const next = [...newCourses].sort((a, b) => rank(a) - rank(b))[0];
  return next ? { course: next, reason: 'new course: every started course is done for the crew' } : null;
}
