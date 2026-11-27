/**
 * Media Studio stages for the crew (Feature 030 US1, ADR-0037, D-2026-0094): the crew drafts, the
 * owner gates. Pure, so tests/crew/media-stages.test.mjs can exercise it; crew.mjs gathers the facts.
 *
 *   teaser_script   draft a recipe-v2 script, QG0, stop at `scripted` (never spends credits)
 *   teaser_clips    only after the owner's `crew approve-script` on the current script hash
 *   media_assemble  assemble, QG1, upload PRIVATE, QG3, stop at `qa3-pass`
 *   media_publish   only after the owner's `crew publish`; the one stage that may set a video public
 *   studio_media    Study Studio (NotebookLM audio and video) for one unit: plan, generate, check,
 *                   upload PRIVATE, stop at `qa3-pass` for the owner's spot-check (`crew studio on`)
 *   studio_publish  only after the owner's `crew approve-studio`: set public, place the links
 *   audio_overview  the old name of studio_media, kept so old board rows still launch
 *
 * Jobs that write one ledger never overlap (FR-016, and two PRs appending to one JSON ledger
 * conflict): one teaser-ledger job at a time, one job per unit's Study Studio ledger
 * (resources.mjs ledgerOf). Each runs on its producer lane (resources.mjs). Teasers are off until
 * the owner turns them on (`crew media on`); Study Studio has its own switch (`crew studio on`).
 */
import { ledgerOf } from './resources.mjs';

export const MEDIA_STAGES = ['teaser_script', 'teaser_clips', 'media_assemble', 'media_publish', 'audio_overview', 'studio_media', 'studio_publish'];
export const STUDIO_STAGES = ['studio_media', 'studio_publish', 'audio_overview'];
export const isMediaStage = (stage) => MEDIA_STAGES.includes(stage);
/** Scripts waiting for the owner, at most: drafting more only piles up review work. */
export const MAX_AWAITING_SCRIPTS = 6;
/** Finish what was started first: publish, then assemble, then clips, then new scripts. */
const PRIORITY = ['media_publish', 'studio_publish', 'media_assemble', 'teaser_clips', 'studio_media', 'audio_overview', 'teaser_script'];

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

/** Study Studio ledger states, in order (scripts/notebook-studio/media-ledger.mjs STATES). */
export const STUDIO_STATES = ['planned', 'generated', 'downloaded', 'qa1-pass', 'encoded', 'qa2-pass',
  'uploaded-private', 'qa3-pass', 'approved', 'public', 'placed'];
const before = (state, edge) => STUDIO_STATES.indexOf(state) < STUDIO_STATES.indexOf(edge);
export const studioKey = (course, unit) => `${course.toUpperCase()}#${Number(unit)}`;
/** Units whose private items may wait for the owner's spot-check before no new unit is planned. */
export const MAX_AWAITING_WATCH = 2;
/** Units in progress at once: one per NotebookLM account (notebook, notebook2; Feature 036). */
export const STUDIO_IN_PROGRESS = 2;

/**
 * What the Study Studio needs next (owner, 2026-11-25: the crew plans, schedules and manages it).
 * Per unit ledger: items before `qa3-pass` -> `studio_media` (resume from any state); items at
 * `qa3-pass` wait for the owner's `crew approve-studio` and then -> `studio_publish`, as do
 * approved or public items not yet placed. When no unit has work left before the owner, the next
 * candidate (certified units without a ledger, in the order given) is planned: one unit in progress
 * at a time, and none while MAX_AWAITING_WATCH units wait for the owner.
 * @param {{course: string, unit: number, items: object[]}[]} units   existing ledgers
 * @param {{ candidates?: {course: string, unit: number}[], approvals?: object }} opts
 */
export function studioNeeds(units, { candidates = [], approvals = {} } = {}) {
  const jobs = [];
  const owner = { watch: [] };
  const studio = approvals.studio ?? {};
  for (const u of units) {
    const live = u.items.filter((i) => !i.blocked);
    const key = studioKey(u.course, u.unit);
    const ok = new Set(studio[key]?.keys ?? []);
    const kept = new Set(studio[key]?.except ?? []);
    if (live.some((i) => before(i.state, 'qa3-pass'))) jobs.push({ course: u.course, unit: u.unit, stage: 'studio_media' });
    else if (live.some((i) => i.state === 'qa3-pass' && !ok.has(i.key) && !kept.has(i.key))) owner.watch.push(key);
    if (live.some((i) => ['approved', 'public'].includes(i.state) || (i.state === 'qa3-pass' && ok.has(i.key)))) {
      jobs.push({ course: u.course, unit: u.unit, stage: 'studio_publish' });
    }
  }
  // Plan a new unit only while fewer units are mid-way than there are NotebookLM accounts (one per
  // notebook lane, Feature 036) and few wait for the owner, so budgets finish units instead of
  // starting many, and the owner's watch list stays short.
  const working = jobs.filter((j) => j.stage === 'studio_media').length;
  if (working < STUDIO_IN_PROGRESS && owner.watch.length < MAX_AWAITING_WATCH) {
    const have = new Set(units.map((u) => studioKey(u.course, u.unit)));
    const next = candidates.find((c) => !have.has(studioKey(c.course, c.unit)));
    if (next) jobs.push({ course: next.course, unit: next.unit, stage: 'studio_media', plan: true });
  }
  return { jobs, owner };
}

/**
 * Jobs writing one ledger never overlap: one teaser-ledger job, and one job per unit's Study Studio
 * ledger, in flight at a time (finish first: publish, then assemble, then clips, then studio, then
 * new scripts). New scripts only while fewer than MAX_AWAITING_SCRIPTS wait for the owner.
 */
export function limitMedia(added, inFlight, { awaitingScripts = 0 } = {}) {
  const media = added.filter((j) => isMediaStage(j.stage)).sort((a, b) => PRIORITY.indexOf(a.stage) - PRIORITY.indexOf(b.stage));
  const busy = new Set(inFlight.filter((j) => isMediaStage(j.stage)).map(ledgerOf));
  const keep = new Set();
  for (const j of media) {
    const ledger = ledgerOf(j);
    if (busy.has(ledger)) continue;
    if (j.stage === 'teaser_script' && awaitingScripts >= MAX_AWAITING_SCRIPTS) continue;
    keep.add(j);
    busy.add(ledger);
  }
  return added.filter((j) => !isMediaStage(j.stage) || keep.has(j));
}

/**
 * Checked again just before launch (the ledger or the script may have changed since planning).
 * Returns why the job must not start, or null.
 */
export function mediaLaunchProblem(j, { item, approval, currentSha }) {
  if (j.stage === 'teaser_clips') { const c = clipsAllowed(item, approval, currentSha); return c.ok ? null : c.why; }
  if (j.stage === 'studio_publish') return approval ? null : 'no owner approve-studio';
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

/**
 * `crew approve-studio <course> <unit> [except <key>...]`: the owner watched the private Study Studio
 * items of a unit (the spot-check, studio-media step 9). Items named after `except` stay private
 * and are blocked for a redo with `crew reject-studio`.
 */
export function approveStudio(approvals, course, unit, { items, except = [], via, at }) {
  const ready = (items ?? []).filter((i) => i.state === 'qa3-pass' && !i.blocked);
  if (!ready.length) throw new Error(`${course} Unit ${unit} has no checked private item (qa3-pass) to approve`);
  const unknown = except.filter((k) => !ready.some((i) => i.key === k));
  if (unknown.length) throw new Error(`not a qa3-pass item of ${course} Unit ${unit}: ${unknown.join(', ')}`);
  const st = (approvals.studio ??= {});
  st[studioKey(course, unit)] = { at, via, except, keys: ready.filter((i) => !except.includes(i.key)).map((i) => i.key) };
  return `approved ${st[studioKey(course, unit)].keys.length} item(s) of ${course} Unit ${unit}${except.length ? ` (kept private: ${except.join(', ')})` : ''}; they go public and onto the unit page at the next media hours`;
}

/** `crew reject-studio <course> <unit> <key> <note>`: the item is blocked and remade with the note. */
export function rejectStudio(approvals, course, unit, key, note, { items, via, at }) {
  if (!key || !note) throw new Error('usage: crew reject-studio <course> <unit> <item key> <what must change>');
  if (!(items ?? []).some((i) => i.key === key)) throw new Error(`no item ${key} in ${course} Unit ${unit}`);
  const st = (approvals.studioRejects ??= {});
  (st[studioKey(course, unit)] ??= {})[key] = { note, at, via };
  return `${key} of ${course} Unit ${unit} will be blocked and remade with your note; it stays private`;
}

/** One line for the owner: what waits on them. */
export function ownerLine(owner) {
  const parts = [];
  if (owner.scripts.length) parts.push(`scripts to approve: ${owner.scripts.join(', ')}`);
  if (owner.spotCheck.length) parts.push(`private Shorts to watch: ${owner.spotCheck.join(', ')}`);
  if (owner.held?.length) parts.push(`held private by you: ${owner.held.join(', ')}`);
  if (owner.scheduled?.length) parts.push(`scheduled to go public: ${owner.scheduled.join(', ')}`);
  if (owner.voided.length) parts.push(`approval void (script changed): ${owner.voided.join(', ')}`);
  if (owner.watch?.length) parts.push(`Study Studio units to watch (private): ${owner.watch.join(', ')} - reply \`crew approve-studio <course> <unit>\``);
  return parts.join(' · ') || 'nothing';
}

// ------------------------------------------------------------ briefs

const T = 'node scripts/notebook-studio/teaser.mjs';
const NEVER_PUBLIC = 'Never make a video public, unlisted or scheduled: every upload is `privacy_status: private` and only the owner\'s `crew publish` starts the one job that may publish (FR-013).';
const NO_CREDITS = 'Never call gflow, Flow, Veo or any image or video generator in this job, and never record an approval: no credit may be spent before the owner approves the script (FR-012).';

/** The task text of a media stage's brief (scripts/crew/crew.mjs STAGE_TASK). */
/** YouTube uploads go through MCP, so the agent paces them with the CLI (D-2026-0100). */
export const PACE_UPLOAD = 'Before every YouTube upload run `node scripts/media/pacing.mjs check youtube.upload`: if it prints `hold`, upload nothing more, keep the ledger at the state reached, print one CREW-HANDOFF line with the next allowed time and stop. Right after each successful upload run `node scripts/media/pacing.mjs record youtube.upload`.';

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
      return `Assemble and upload the ${key} Short PRIVATE (studio-teaser skill, steps 8-10). From the ledger's chosen takes, run \`scripts/heavy.sh node scripts/notebook-studio/assemble-teaser.mjs ${id} ur ~/studio-media/teasers/${id}/ur/teaser.mp4 <shot1> ... <shot5>\` (its speed and length limit come from the script's recipe; a teaser@2 or teaser@3 Short over 30 s fails), then \`scripts/heavy.sh node scripts/notebook-studio/media-qa.mjs <out> --kind short --stage encoded\`, look at the end card and thumbnail, and advance to \`assembled\` and \`qa-pass\`. Upload with youtube-uploader \`upload_video\` using \`${T} meta ${key}\` (privacy_status private, the AI-content disclosure on), then \`update_video\` with the playlist and thumbnail, and advance to \`uploaded-private\`. ${PACE_UPLOAD} QG3: \`list_videos\` shows it private and processed, title and description intact; advance to \`qa3-pass\`. Continue from whatever state the item is in. The owner watches it and replies \`crew publish ${key}\` or \`crew reject ${key} <note>\`. ${NEVER_PUBLIC}`;
    case 'media_publish':
      if (!j.publish?.at) throw new Error(`${j.id}: media_publish needs the owner's crew publish approval`);
      return `The owner approved publishing ${key} (\`crew publish\` via ${j.publish.via} at ${j.publish.at}, video ${j.publish.youtube_id}). If the item is \`qa3-pass\`, advance it: \`${T} advance ${key} approved --json '{"gates":{"owner":{"verdict":"approve","by":"owner","date":"${j.publish.at.slice(0, 10)}","note":"crew publish via ${j.publish.via}"}}}'\`. Then set exactly that video (${j.publish.youtube_id}) public with youtube-uploader \`update_video\` (privacy_status public), confirm with \`list_videos\`, and advance to \`public\` with \`{"published_at":"<now ISO>"}\`. Then run \`node scripts/notebook-studio/teaser-stats.mjs\` and commit \`specs/studio/teaser-stats.json\` (the home page ranks teasers by it). Change no other video.`;
    case 'audio_overview':
    case 'studio_media':
      return studioTask(j);
    case 'studio_publish':
      return studioPublishTask(j);
    default:
      throw new Error(`not a media stage: ${j.stage}`);
  }
}

const L = 'node scripts/notebook-studio/media-ledger.mjs';
/** NotebookLM artifact creation goes through MCP too, so the agent paces it like uploads. */
export const paceNlm = (channel = 'nlm.studio') => `Before every NotebookLM \`studio_create\` run \`node scripts/media/pacing.mjs check ${channel}\`: on \`hold\`, create nothing more, print one CREW-HANDOFF line with the next allowed time and stop. Right after each successful creation run \`node scripts/media/pacing.mjs record ${channel}\`.`;
export const PACE_NLM = paceNlm();

/**
 * The NotebookLM account a studio job uses, from its lane (Feature 036): `notebook` is the first
 * Google account (nlm profile `default`), `notebook2` the second (profile `second`, channel nlm2.studio).
 */
export function nlmAccount(lane) {
  if (lane !== 'notebook2') return { profile: 'default', channel: 'nlm.studio', note: '' };
  return {
    profile: 'second', channel: 'nlm2.studio',
    note: 'This job holds the SECOND NotebookLM account (lane notebook2): pass `--profile second` to every `nlm` command, and if you use the NotebookLM MCP tools, first call `profile` with action `switch` and name `second` (never `make_default`). Create the notebook in that account; never use the default profile in this job. ',
  };
}

function studioTask(j) {
  const c = j.course, u = j.unit, pad = String(u).padStart(2, '0');
  const acct = nlmAccount(j.lane);
  const plan = j.plan
    ? `This unit has no Study Studio ledger yet: plan it first (studio-media skill, step 1) with the owner-approved LEAN recipe (\`specs/029-notebook-studio/rollout.md\`, 2026-11-27). For every topic of the unit, plan one audio brief (part 1) in English with \`${L} plan ${c} ${u} --json '...'\` (prompt \`specs/studio/prompts/audio.md\`, a title and alt text from the topic itself), and the same in Urdu when the topic's Urdu mirror exists. Plan ONE video per language for the whole unit, recorded on topic 1 (prompt \`specs/studio/prompts/video-unit.md\`, titled as the unit overview, with the whole unit as its source pack); Urdu only when every topic of the unit has its Urdu mirror. Plan no per-topic videos and no "go deeper" parts unless the owner names this unit for the full recipe. For every topic also plan one English mind map (kind \`mindmap\`, prompt \`specs/studio/prompts/mindmap.md\`), and plan ONE study guide per language for the whole unit on topic 1 (kind \`studyguide\`, prompt \`specs/studio/prompts/study-guide.md\`; Urdu only when every topic has its Urdu mirror). Build the source pack and the notebook as the skill says. `
    : '';
  const rejects = Object.entries(j.rejects ?? {}).map(([k, r]) => `${k}: "${r.note}"`);
  const redo = rejects.length ? `The owner asked for these items to be remade: ${rejects.join('; ')}. Block each with \`${L} block ${c} ${u} <key> "<the owner's words>"\`, regenerate it with a prompt that answers the note, then unblock it and carry it through the steps again. ` : '';
  return `Run the Study Studio of ${c} Unit ${u} (studio-media skill): audio, video, mind maps and study guides. ${acct.note}${plan}${redo}Read \`${L} status ${c} ${u}\` and carry every audio and video item that is not blocked from its current state up to \`qa3-pass\`: generate, download, QG1, encode, QG2 (your own transcript check against the topic text), upload PRIVATE, QG3. Mind maps and study guides take the short path \`planned\` -> \`generated\` -> \`downloaded\` -> \`qa2-pass\` -> \`placed\` and are never uploaded: create them with NotebookLM (\`nlm mindmap create <notebook> --title "<topic title>"\`; \`nlm report create <notebook> --format 'Study Guide'\` in English, \`--format 'Create Your Own' --prompt "<study-guide prompt + Urdu register suffix>"\` in Urdu), download them under ~/studio-media/${c.toLowerCase()}/unit-${pad}/, and for QG2 check every node or section against the topic text. For a mind map write \`specs/studio/${c.toLowerCase()}/unit-${pad}-topic-NN-mindmap-labels.json\` (\`en_fix\` for corrected labels, \`ur\` with an Urdu label for every node, \`ur_title\`). At \`qa2-pass\` run \`node scripts/notebook-studio/place-media.mjs ${c.toLowerCase()} ${u}\`, which cleans each study guide of answer and rubric sections, writes the files under \`static/studio/\`, adds the manifest rows and advances them to \`placed\`; then run \`node scripts/check-studio-manifest.mjs\`. Never edit the ledger by hand; every change goes through \`${L} advance\`. ${paceNlm(acct.channel)} ${PACE_UPLOAD} A hold is normal: commit what you advanced and stop with the CREW-HANDOFF line; the crew resumes in the next media hours. When every audio and video item is at \`qa3-pass\` (and every mind map and study guide \`placed\`), run \`${L} sheet ${c} ${u}\` and print one CREW-HANDOFF line with the private links the owner should watch and "reply \`crew approve-studio ${c} ${u}\`". If \`nlm\` reports expired cookies, stop and print one CREW-HANDOFF line asking the owner to run \`nlm login${acct.profile === 'second' ? ' --profile second' : ''}\`; commit nothing else. Commit \`specs/studio/${c.toLowerCase()}/media-unit-${pad}.json\`, any placed mind map and study guide files, their labels files and manifest rows, with your PHR. ${NEVER_PUBLIC}`;
}

function studioPublishTask(j) {
  if (!j.studioApproval?.at) throw new Error(`${j.id}: studio_publish needs the owner's crew approve-studio`);
  const a = j.studioApproval, c = j.course, u = j.unit;
  return `The owner watched the private Study Studio items of ${c} Unit ${u} and approved them with \`crew approve-studio\` (via ${a.via} at ${a.at}). Approved keys: ${a.keys.join(', ')}${a.except?.length ? `; kept private: ${a.except.join(', ')} (change nothing about them)` : ''}. For each approved key still at \`qa3-pass\`: \`${L} advance ${c} ${u} <key> approved --json '{"gates":{"owner":{"verdict":"approve","by":"owner","date":"${a.at.slice(0, 10)}","note":"crew approve-studio via ${a.via}"}}}'\`. Then for each approved item (and any already \`approved\` from an earlier run) set exactly that video public with youtube-uploader \`update_video\` (privacy_status public), confirm with \`list_videos\`, and \`${L} advance ${c} ${u} <key> public --json '{"published_at":"<now ISO>"}'\`. Then run \`node scripts/notebook-studio/place-media.mjs ${c} ${u}\`, \`node scripts/check-studio-manifest.mjs\` and \`node scripts/build-studio-index.mjs\`, and commit the ledger, the unit's Studio manifest and your PHR. Change no other video.`;
}

/** Files a media job may touch. */
export function mediaScope(j) {
  if (STUDIO_STAGES.includes(j.stage)) {
    const c = j.course.toLowerCase(), pad = String(j.unit).padStart(2, '0');
    return `${j.course} Unit ${j.unit} Study Studio only: \`specs/studio/${c}/media-unit-${pad}.json\`, the unit's manifest \`specs/studio/${c}/unit-${pad}.json\`, its mind map labels files \`specs/studio/${c}/unit-${pad}-topic-NN-mindmap-labels.json\` and the placed mind map and study guide files under \`static/studio/${c}/unit-${pad}/\`, plus your PHR. Audio and video files live under ~/studio-media and never enter git.`;
  }
  return `The ${j.course} teaser only: \`specs/studio/teasers/${j.course.toLowerCase()}.json\` and its own item in \`specs/studio/teasers/media-teasers.json\` (no other item), plus your PHR. Media files live under ~/studio-media and never enter git.`;
}

/** The MEDIA-HOLD line teaser-clips.mjs printed, as { kind, resetAt, reason }, or null. */
export function mediaHold(text) {
  const m = /MEDIA-HOLD: (quota|unavailable|held)(?: until (\S+))?(?: - (.*))?/.exec(String(text));
  return m ? { kind: m[1], resetAt: m[2] ?? null, reason: (m[3] ?? '').trim() } : null;
}
