/**
 * Media Studio stages for the crew (Feature 030 US1, ADR-0037, D-2026-0094): the crew drafts, the
 * owner gates. Pure, so tests/crew/media-stages.test.mjs can exercise it; crew.mjs gathers the facts.
 *
 *   teaser_script   draft a recipe-v2 script, QG0, stop at `scripted` (never spends credits)
 *   teaser_clips    only after the owner's `crew approve-script` on the current script hash
 *   media_assemble  assemble, QG1, upload PRIVATE, QG3, stop at `qa3-pass`
 *   media_publish   only after the owner's `crew publish`; the one stage that may set a video public
 *   audio_overview  NotebookLM audio for a planned Notebook Studio ledger item
 *
 * Every stage writes the shared teaser or media ledger, so at most one media job is in flight
 * (FR-016, and two PRs appending to one JSON ledger conflict). The stages are off until the owner
 * turns them on (`crew media on`).
 */

export const MEDIA_STAGES = ['teaser_script', 'teaser_clips', 'media_assemble', 'media_publish', 'audio_overview'];
export const isMediaStage = (stage) => MEDIA_STAGES.includes(stage);
/** Scripts waiting for the owner, at most: drafting more only piles up review work. */
export const MAX_AWAITING_SCRIPTS = 6;
/** Finish what was started first: publish, then assemble, then clips, then new scripts. */
const PRIORITY = ['media_publish', 'media_assemble', 'teaser_clips', 'audio_overview', 'teaser_script'];

export const teaserKey = (code) => `${code.toLowerCase()}-ur`;
const newer = (a, b) => Date.parse(a ?? 0) > Date.parse(b ?? 0);

/**
 * FR-012: clips only for a script the owner approved, and only while the file is still the one
 * approved. `approval` is the crew's record of `crew approve-script` ({ sha256, at, via }).
 */
export function clipsAllowed(item, approval, currentSha) {
  if (!item) return { ok: false, why: 'no ledger item' };
  if (!currentSha) return { ok: false, why: 'script file missing' };
  if (item.state === 'scripted') {
    if (!approval?.script) return { ok: false, why: 'awaiting the owner\'s script approval' };
    if (approval.script.sha256 !== currentSha || item.script_sha256 !== currentSha) {
      return { ok: false, void: true, why: 'the script changed after the owner approved it; approval void, ask again' };
    }
    return { ok: true };
  }
  if (['script-approved', 'clips-generated'].includes(item.state)) {
    const g = item.gates?.script;
    if (g?.verdict !== 'approve' || g.by !== 'owner') return { ok: false, why: 'ledger approval is not the owner\'s' };
    if (item.script_sha256 !== currentSha) return { ok: false, void: true, why: 'the script changed after approval; it goes back to the owner' };
    return { ok: true };
  }
  return { ok: false, why: `state ${item.state}` };
}

/**
 * What the teaser ledger needs next, per course with an overview page.
 * @param {object} p
 * @param {{code: string}[]} p.courses           courses that have a course-overview.mdx
 * @param {Record<string, object>} p.items       teaser ledger items by key
 * @param {Record<string, object>} p.approvals   crew approvals by key ({ script, publish, reject })
 * @param {(id: string) => string|undefined} p.shaOf   current script sha256, undefined when missing
 * @returns {{ jobs: {course, stage, key, note?}[], owner: { scripts: string[], spotCheck: string[], voided: string[], held: string[], scheduled: string[] } }}
 */
export function teaserNeeds({ courses, items, approvals = {}, shaOf }) {
  const jobs = [];
  const owner = { scripts: [], spotCheck: [], voided: [], held: [], scheduled: [] };
  for (const { code } of courses) {
    const key = teaserKey(code);
    const id = code.toLowerCase();
    const item = items[key];
    const ap = approvals[key] ?? {};
    const add = (stage, extra = {}) => jobs.push({ course: code, stage, key, ...extra });
    if (!item || item.state === 'planned') { add('teaser_script'); continue; }
    if (item.blocked) continue;
    const sha = shaOf(id);
    switch (item.state) {
      case 'scripted': {
        if (ap.reject && ap.reject.sha256 === sha && !newer(ap.script?.at, ap.reject.at)) { add('teaser_script', { note: ap.reject.note }); break; }
        const c = clipsAllowed(item, ap, sha);
        if (c.ok) add('teaser_clips');
        else if (c.void) owner.voided.push(key);
        else owner.scripts.push(key);
        break;
      }
      case 'script-approved':
      case 'clips-generated': {
        const c = clipsAllowed(item, ap, sha);
        if (c.ok) add('teaser_clips'); else owner.voided.push(key);
        break;
      }
      case 'clips-qa': case 'assembled': case 'qa-pass': case 'uploaded-private':
        add('media_assemble');
        break;
      case 'qa3-pass':
        if (ap.reject?.state) owner.held.push(key);
        else if (ap.publish) add('media_publish'); else owner.spotCheck.push(key);
        break;
      case 'approved':
        // The owner scheduled it in YouTube (publish_at): YouTube makes it public, no job may.
        if (item.scheduled_publish_at) owner.scheduled.push(`${key} ${item.scheduled_publish_at}`);
        else add('media_publish');
        break;
      default: break;
    }
  }
  return { jobs, owner };
}

/** Notebook Studio ledger items still `planned` (audio briefs): one audio_overview per unit. */
export function audioNeeds(units) {
  return units.filter((u) => u.items.some((i) => i.kind === 'audio' && i.state === 'planned'))
    .map((u) => ({ course: u.course, unit: u.unit, stage: 'audio_overview' }));
}

/** One media job in flight; new scripts only while fewer than MAX_AWAITING_SCRIPTS wait for the owner. */
export function limitMedia(added, inFlight, { awaitingScripts = 0 } = {}) {
  const media = added.filter((j) => isMediaStage(j.stage)).sort((a, b) => PRIORITY.indexOf(a.stage) - PRIORITY.indexOf(b.stage));
  let slot = !inFlight.some((j) => isMediaStage(j.stage));
  const keep = new Set();
  for (const j of media) {
    if (!slot) break;
    if (j.stage === 'teaser_script' && awaitingScripts >= MAX_AWAITING_SCRIPTS) continue;
    keep.add(j);
    slot = false;
  }
  return added.filter((j) => !isMediaStage(j.stage) || keep.has(j));
}

/**
 * Checked again just before launch (the ledger or the script may have changed since planning).
 * Returns why the job must not start, or null.
 */
export function mediaLaunchProblem(j, { item, approval, currentSha }) {
  if (j.stage === 'teaser_clips') { const c = clipsAllowed(item, approval, currentSha); return c.ok ? null : c.why; }
  if (j.stage === 'media_publish') {
    if (!approval?.publish) return 'no owner publish approval';
    if (!['qa3-pass', 'approved'].includes(item?.state)) return `state ${item?.state ?? 'missing'}`;
  }
  return null;
}

// ------------------------------------------------------------ owner commands (pure)

/** `crew approve-script <key>`: records the owner's approval of the script as it is now. */
export function approveScript(approvals, key, { item, sha, via, at }) {
  if (!item) throw new Error(`no teaser ${key} in the ledger`);
  if (item.state !== 'scripted') throw new Error(`${key} is ${item.state}, not waiting for script approval`);
  if (!sha || item.script_sha256 !== sha) throw new Error(`${key}: the script file does not match its recorded hash; the crew must rehash it first`);
  const rec = approvals[key] ?? {};
  rec.script = { sha256: sha, at, via };
  delete rec.reject;
  approvals[key] = rec;
  return `approved the ${key} script (sha ${sha.slice(0, 12)}); clips are generated when a clip producer is free`;
}

/** `crew reject <key> <note>`: the script is redrafted with the note; or a private Short is held. */
export function rejectMedia(approvals, key, note, { item, sha, via, at }) {
  if (!item) throw new Error(`no teaser ${key} in the ledger`);
  if (!note) throw new Error('usage: crew reject <key> <what must change>');
  const rec = approvals[key] ?? {};
  if (item.state === 'scripted') {
    rec.reject = { note, sha256: sha, at, via };
    delete rec.script;
    approvals[key] = rec;
    return `rejected the ${key} script; the crew redrafts it with your note`;
  }
  if (['uploaded-private', 'qa3-pass'].includes(item.state)) {
    rec.reject = { note, at, via, state: item.state };
    delete rec.publish;
    approvals[key] = rec;
    return `held ${key}; it stays private. Your note is kept for the redo`;
  }
  throw new Error(`${key} is ${item.state}; nothing to reject`);
}

/** `crew publish <key>`: the owner watched the private Short; the crew may make it public. */
export function approvePublish(approvals, key, { item, via, at }) {
  if (!item) throw new Error(`no teaser ${key} in the ledger`);
  if (item.state !== 'qa3-pass') throw new Error(`${key} is ${item.state}; only a checked private Short (qa3-pass) can be published`);
  const rec = approvals[key] ?? {};
  rec.publish = { at, via, youtube_id: item.youtube_id };
  approvals[key] = rec;
  return `publishing ${key} (https://youtube.com/shorts/${item.youtube_id}) at the next tick`;
}

/** One line for the owner: what waits on them. */
export function ownerLine(owner) {
  const parts = [];
  if (owner.scripts.length) parts.push(`scripts to approve: ${owner.scripts.join(', ')}`);
  if (owner.spotCheck.length) parts.push(`private Shorts to watch: ${owner.spotCheck.join(', ')}`);
  if (owner.held?.length) parts.push(`held private by you: ${owner.held.join(', ')}`);
  if (owner.scheduled?.length) parts.push(`scheduled to go public: ${owner.scheduled.join(', ')}`);
  if (owner.voided.length) parts.push(`approval void (script changed): ${owner.voided.join(', ')}`);
  return parts.join(' · ') || 'nothing';
}

// ------------------------------------------------------------ briefs

const T = 'node scripts/notebook-studio/teaser.mjs';
const NEVER_PUBLIC = 'Never make a video public, unlisted or scheduled: every upload is `privacy_status: private` and only the owner\'s `crew publish` starts the one job that may publish (FR-013).';
const NO_CREDITS = 'Never call gflow, Flow, Veo or any image or video generator in this job, and never record an approval: no credit may be spent before the owner approves the script (FR-012).';

/** The task text of a media stage's brief (scripts/crew/crew.mjs STAGE_TASK). */
export function mediaTask(j) {
  const id = j.course.toLowerCase();
  const key = j.key ?? teaserKey(j.course);
  switch (j.stage) {
    case 'teaser_script':
      return `${j.note ? `The owner rejected the current ${key} script: "${j.note}". Revise \`specs/studio/teasers/${id}.json\` to answer that note (keep what was not criticised), run \`${T} check ${id}\` until it passes, then \`${T} rehash ${key}\`.`
        : `Draft the Urdu course teaser script for ${j.course} (studio-teaser skill, steps 1-3) at \`specs/studio/teasers/${id}.json\`, following recipe teaser@3 (\`specs/studio/recipes/teaser@3.json\`, \`"recipe": { "name": "teaser", "version": 3 }\`): an on-screen presenter speaks to the camera in shots 1 and 5, an unseen woman narrator speaks over action in shots 2-4, each with a named camera move (push-in, crane, dolly, tracking, whip-pan...), at most 18 Urdu words a line, no maps, flags, emblems or readable text, Pakistani school settings and modest dress. Take every fact from the course overview and \`catalog/courses.json\` only, and model the structure on an existing script in \`specs/studio/teasers/\`. Run \`${T} check ${id}\` until it passes, then \`${T} plan ${id} ur\` (unless the item exists) and \`${T} advance ${key} scripted --json '{"script_sha256":"<sha256sum of the file>","gates":{"qg0":{"verdict":"pass","by":"teaser.mjs"}}}'\`.`} Stop at \`scripted\`: the owner approves with \`crew approve-script ${key}\`. ${NO_CREDITS} ${NEVER_PUBLIC}`;
    case 'teaser_clips':
      return `The owner approved the ${key} script with \`crew approve-script\`${j.approval ? ` (via ${j.approval.via} at ${j.approval.at}, script sha256 ${j.approval.sha256})` : ''}. If the ledger item is still \`scripted\`, record it first: \`${T} advance ${key} script-approved --json '{"gates":{"script":{"verdict":"approve","by":"owner","date":"${(j.approval?.at ?? '').slice(0, 10)}","note":"crew approve-script via ${j.approval?.via ?? 'owner'}"}}}'\` (it refuses if the script changed). Then run \`node scripts/media/teaser-clips.mjs ${id}\`: it makes every missing shot through gflow (recovering a clip Flow finished but did not report, never paying twice), records each take, and prints the QG1 result and the QG2 transcript match with a 3-frame strip. Read every strip image and transcript: fail a take with a drawn camera interface, readable text, a map or flag, wrong dress, or speech that misses the line; record each verdict with \`${T} clipqa ${key} <shot> <take> --json '{"verdict":"pass|pass-with-notes|fail","by":"claude","notes":"..."}'\`. Retake a failed shot once with \`node scripts/media/teaser-clips.mjs ${id} --shots <n>\` (at most two retakes per shot; never retake a shot because gflow timed out, the script recovers it). When every shot has a passing take, advance to \`clips-generated\` and then \`clips-qa\` with \`{"gates":{"clips":{"verdict":"pass","by":"claude"}}}\`. If teaser-clips.mjs exits 3, 4 or 5 (MEDIA-HOLD: quota, no producer, or held for the owner), stop: commit any takes it recorded, print its MEDIA-HOLD line as a CREW-HANDOFF line, and exit. ${NEVER_PUBLIC}`;
    case 'media_assemble':
      return `Assemble and upload the ${key} Short PRIVATE (studio-teaser skill, steps 8-10). From the ledger's chosen takes, run \`scripts/heavy.sh node scripts/notebook-studio/assemble-teaser.mjs ${id} ur ~/studio-media/teasers/${id}/ur/teaser.mp4 <shot1> ... <shot5>\` (its speed and length limit come from the script's recipe; a teaser@2 or teaser@3 Short over 30 s fails), then \`scripts/heavy.sh node scripts/notebook-studio/media-qa.mjs <out> --kind short --stage encoded\`, look at the end card and thumbnail, and advance to \`assembled\` and \`qa-pass\`. Upload with youtube-uploader \`upload_video\` using \`${T} meta ${key}\` (privacy_status private, the AI-content disclosure on), then \`update_video\` with the playlist and thumbnail, and advance to \`uploaded-private\`. QG3: \`list_videos\` shows it private and processed, title and description intact; advance to \`qa3-pass\`. Continue from whatever state the item is in. The owner watches it and replies \`crew publish ${key}\` or \`crew reject ${key} <note>\`. ${NEVER_PUBLIC}`;
    case 'media_publish':
      if (!j.publish?.at) throw new Error(`${j.id}: media_publish needs the owner's crew publish approval`);
      return `The owner approved publishing ${key} (\`crew publish\` via ${j.publish.via} at ${j.publish.at}, video ${j.publish.youtube_id}). If the item is \`qa3-pass\`, advance it: \`${T} advance ${key} approved --json '{"gates":{"owner":{"verdict":"approve","by":"owner","date":"${j.publish.at.slice(0, 10)}","note":"crew publish via ${j.publish.via}"}}}'\`. Then set exactly that video (${j.publish.youtube_id}) public with youtube-uploader \`update_video\` (privacy_status public), confirm with \`list_videos\`, and advance to \`public\` with \`{"published_at":"<now ISO>"}\`. Then run \`node scripts/notebook-studio/teaser-stats.mjs\` and commit \`specs/studio/teasers/teaser-stats.json\` (the home page ranks teasers by it). Change no other video.`;
    case 'audio_overview':
      return `Make the planned NotebookLM audio briefs of ${j.course} Unit ${j.unit} (studio-media skill: generate, download, QG1, QG2, encode, upload PRIVATE, QG3), recording every step in its media ledger. If \`nlm\` reports expired cookies, stop and print one CREW-HANDOFF line asking the owner to run \`nlm login\`; commit nothing else. ${NEVER_PUBLIC}`;
    default:
      throw new Error(`not a media stage: ${j.stage}`);
  }
}

/** Files a media job may touch. */
export function mediaScope(j) {
  if (j.stage === 'audio_overview') return `${j.course} Unit ${j.unit} Study Studio only: \`specs/studio/${j.course.toLowerCase()}/media-unit-${String(j.unit).padStart(2, '0')}.json\` and its manifest row, plus your PHR. Media files live under ~/studio-media and never enter git.`;
  return `The ${j.course} teaser only: \`specs/studio/teasers/${j.course.toLowerCase()}.json\` and its own item in \`specs/studio/teasers/media-teasers.json\` (no other item), plus your PHR. Media files live under ~/studio-media and never enter git.`;
}

/** The MEDIA-HOLD line teaser-clips.mjs printed, as { kind, resetAt, reason }, or null. */
export function mediaHold(text) {
  const m = /MEDIA-HOLD: (quota|unavailable|held)(?: until (\S+))?(?: - (.*))?/.exec(String(text));
  return m ? { kind: m[1], resetAt: m[2] ?? null, reason: (m[3] ?? '').trim() } : null;
}
