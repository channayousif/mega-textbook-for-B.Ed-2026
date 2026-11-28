// One state vocabulary for every media job (Feature 030, FR-002, T005).
// Each kind walks a subset of STATES in order; REQUIRES lists the evidence a job must carry on entry.
// Do not import this file from any content gate (FR-018).

export const STATES = ['planned', 'scripted', 'approved', 'generating', 'generated', 'checked',
  'assembled', 'uploaded-private', 'owner-approved', 'public', 'placed'];

export const KINDS = ['video.teaser', 'audio.brief', 'audio.deeper', 'video.overview', 'doc.poster',
  'doc.mindmap', 'doc.brief', 'doc.studyguide', 'doc.slides', 'image.schematic', 'image.illustration',
  // Content Pack v2 (Feature 038, ADR-0040).
  'video.longform', 'video.short', 'doc.infographic'];

const VIDEO_UPLOAD = ['planned', 'generating', 'generated', 'checked', 'assembled', 'uploaded-private',
  'owner-approved', 'public', 'placed'];
const DOC = ['planned', 'generating', 'generated', 'checked', 'placed'];
// Pack videos spend credits and owner time, so a script and the owner's approval come first (FR-016).
const SCRIPTED_VIDEO = ['planned', 'scripted', 'approved', 'generating', 'generated', 'checked', 'assembled',
  'uploaded-private', 'owner-approved', 'public', 'placed'];

/** The states each kind uses, in order. Kinds skip what they do not need (images never upload). */
export const PATH = {
  // A teaser spends credits, so a script and the owner's approval come first (FR-012).
  'video.teaser': SCRIPTED_VIDEO,
  'video.longform': SCRIPTED_VIDEO,
  'video.short': SCRIPTED_VIDEO,
  'doc.infographic': DOC,
  'audio.brief': VIDEO_UPLOAD,
  'audio.deeper': VIDEO_UPLOAD,
  'video.overview': VIDEO_UPLOAD,
  'doc.poster': DOC,
  'doc.mindmap': DOC,
  'doc.brief': DOC,
  'doc.studyguide': DOC,
  'doc.slides': DOC,
  'image.illustration': DOC,
  'image.schematic': ['planned', 'generated', 'checked', 'placed'],
};

const PASS = ['pass', 'pass-with-notes', 'approve'];

/**
 * Evidence needed to enter a state, as dotted paths on the job after the update is merged.
 * `gates.<g>` entries must also carry a passing verdict.
 */
export const REQUIRES = {
  scripted: ['script_sha256', 'gates.qg0'],
  approved: ['gates.script'],
  generated: ['takes'],
  checked: ['gates.qg2'],
  assembled: ['outputs.encoded_file', 'gates.qg1'],
  'uploaded-private': ['outputs.youtube_id', 'outputs.uploaded_at'],
  'owner-approved': ['gates.owner'],
  public: ['outputs.published_at'],
  placed: ['outputs.placed_at'],
};

/** Gates whose verdict decides entry into a state. */
export const GATE_FOR = { scripted: 'qg0', approved: 'script', checked: 'qg2', assembled: 'qg1', 'owner-approved': 'owner' };

export const get = (o, path) => path.split('.').reduce((v, k) => (v == null ? v : v[k]), o);

export function pathFor(kind) {
  const p = PATH[kind];
  if (!p) throw new Error(`unknown media kind ${kind}`);
  return p;
}

/** The state after `state` for `kind`, or null at the end. */
export function nextState(kind, state) {
  const p = pathFor(kind);
  const i = p.indexOf(state);
  if (i < 0) throw new Error(`${kind} does not use state ${state}`);
  return p[i + 1] ?? null;
}

/** Reasons a job may not enter `to` (empty when it may). Pure: does not touch the job. */
export function entryProblems(job, to) {
  const out = [];
  for (const f of REQUIRES[to] ?? []) {
    const v = get(job, f);
    if (v == null || (Array.isArray(v) && v.length === 0)) out.push(`entering ${to} needs ${f}`);
  }
  const g = GATE_FOR[to];
  if (g) {
    const v = get(job, `gates.${g}.verdict`);
    if (v != null && !PASS.includes(v)) out.push(`gate ${g} verdict is ${v}, cannot enter ${to}`);
  }
  if (to === 'approved' && get(job, 'gates.script.by') !== 'owner') out.push('only the owner approves a script');
  if (to === 'owner-approved' && get(job, 'gates.owner.by') !== 'owner') out.push('only the owner approves a video for publication');
  return out;
}

export const isPass = (v) => PASS.includes(v);
