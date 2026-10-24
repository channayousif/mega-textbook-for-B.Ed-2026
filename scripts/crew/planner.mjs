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
 * planned instead; translation follows once the repair lands. A `pass`, an `escalate` or no
 * G3 report at all still lets the draft mirror go ahead (English-first publication).
 */

/**
 * @param {object} u  content-status unit: { authored, gates: { G3, G5 }, figures }
 * @param {object} f  { bilingual, g3Report, g3Repaired, g5Report, mirrorComplete }
 */
export function stagesFor(u, f) {
  if (!u.authored) return ['author'];
  const need = [];
  if ((u.figures?.prompt_only || 0) > 0) need.push('figures');
  const unrepairedRevise = u.gates.G3 !== 'done' && f.g3Report?.disposition === 'revise' && !f.g3Repaired;
  if (u.gates.G3 !== 'done') {
    if (!f.g3Report) need.push('review_en');
    else if (unrepairedRevise) need.push('repair_en');
  }
  if (f.bilingual) {
    if (!f.mirrorComplete) {
      if (!unrepairedRevise) need.push('translate');
    } else if (u.gates.G3 === 'done' && u.gates.G5 !== 'done' && !f.g5Report) need.push('review_ur');
  }
  return need;
}

/** A unit the crew has finished reviewing that waits only for a person's G3 sign-off. */
export function awaitingG3(u, f) {
  if (!u.authored || u.gates.G3 === 'done' || !f.g3Report) return false;
  return f.g3Report.disposition !== 'revise' || f.g3Repaired;
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
  return { file: last.file, ...last.json };
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
