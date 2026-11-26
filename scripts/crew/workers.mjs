/**
 * The crew's workers and stages (ops/crew/README.md).
 *
 * A worker is one headless agent CLI with its own subscription. A stage is one
 * pipeline step with a RANKED chain of workers, so a worker that is cooling on a
 * quota or session limit is skipped and the job goes to the next one instead of
 * waiting. openclaw is deliberately absent: it is the owner's message channel
 * (notify.mjs), not a worker.
 */

/**
 * Feature 034 (quota efficiency): the `claude` worker's model and effort per stage, so the weekly
 * Max quota goes further. Opus where judgement dominates (authoring, reviewing, planning,
 * surveying); Sonnet where the worker follows a written brief (repairs, translation, figures,
 * decks, media and maintenance chores). A stage not listed uses `default`. Override one stage
 * without a code change: CREW_CLAUDE_MODEL_<STAGE>=opus, CREW_CLAUDE_EFFORT_<STAGE>=high
 * (stage name upper-cased). Measure the effect with scripts/ops/claude-usage.mjs.
 */
export const CLAUDE_ROUTING = {
  default: { model: 'sonnet', effort: 'medium' },
  author: { model: 'opus', effort: 'high' },
  review_en: { model: 'opus', effort: 'high' },
  review_ur: { model: 'opus', effort: 'high' },
  plan_illustrations: { model: 'opus', effort: 'medium' },
  teaser_script: { model: 'opus', effort: 'medium' },
  intel_distill: { model: 'opus', effort: 'medium' },
  maint_survey: { model: 'opus', effort: 'high' },
  maint_adr: { model: 'opus', effort: 'medium' },
  maint_review: { model: 'opus', effort: 'high' },
};

export function claudeRouting(stage, env = process.env) {
  const base = { ...CLAUDE_ROUTING.default, ...(CLAUDE_ROUTING[stage] || {}) };
  const key = String(stage || '').toUpperCase();
  return {
    model: env[`CREW_CLAUDE_MODEL_${key}`] || base.model,
    effort: env[`CREW_CLAUDE_EFFORT_${key}`] || base.effort,
  };
}

/** `family` is the model family; review stages never use the author's family. */
export const WORKERS = {
  claude: {
    family: 'anthropic',
    maxConcurrent: 1,
    cmd: (prompt, stage) => {
      const { model, effort } = claudeRouting(stage);
      return ['claude', ['-p', prompt, '--dangerously-skip-permissions', '--model', model, '--effort', effort]];
    },
  },
  codex: {
    family: 'openai',
    maxConcurrent: 1,
    cmd: (prompt) => ['codex', ['exec', '--dangerously-bypass-approvals-and-sandbox', '--skip-git-repo-check', prompt]],
  },
  agy: {
    family: 'google',
    maxConcurrent: 1,
    cmd: (prompt) => ['agy', ['-p', prompt, '--dangerously-skip-permissions', '--print-timeout', '0s']],
  },
  // agy also serves Claude through a quota separate from its Gemini one, so it is its own worker
  // with its own health. It is anthropic family: a review never pairs it with claude's work.
  agy_claude: {
    family: 'anthropic',
    maxConcurrent: 1,
    cmd: (prompt) => ['agy', ['-p', prompt, '--model', process.env.CREW_AGY_CLAUDE_MODEL || 'claude-opus-4-6-thinking', '--dangerously-skip-permissions', '--print-timeout', '0s']],
  },
  claude_crew: {
    family: 'longcat',
    maxConcurrent: 2,
    cmd: (prompt) => ['claude-crew', ['-p', prompt, '--dangerously-skip-permissions']],
  },
};

/**
 * Stage -> ranked worker chain. `skill` is the repo skill the brief names
 * (.claude/skills/<skill>/SKILL.md); every worker can read it as a file.
 * `reviewOf` names the stage (or stages) whose producer family a review must exclude.
 */
export const STAGES = {
  salvage:    { chain: ['claude', 'agy_claude', 'codex', 'agy', 'claude_crew'], skill: null },
  author:     { chain: ['claude', 'agy_claude', 'codex', 'agy', 'claude_crew'], skill: 'author-unit' },
  repair_en:  { chain: ['claude', 'agy_claude', 'codex', 'agy', 'claude_crew'], skill: 'revise-topic' },
  figures:    { chain: ['codex', 'claude', 'agy_claude', 'agy', 'claude_crew'], skill: 'generate-figures' },
  // Claude owns raster prompts and alt text (ADR-0024); the skill reference is named in the task.
  plan_illustrations: { chain: ['claude', 'agy_claude'], skill: null },
  illustrate: { chain: ['agy', 'codex'], skill: 'generate-figures' },
  // Feature 032 phase D: redraw a unit's placed schematics to the improved SVG standard (owner switch `crew refresh on`).
  refresh_figures: { chain: ['claude', 'agy_claude', 'codex'], skill: 'generate-figures' },
  // Feature 032 phase C: author a unit's flashcard deck in specs/studio/flashcards/ (owner switch `crew flashcards on`).
  flashcards: { chain: ['claude', 'agy_claude', 'codex'], skill: null },
  review_en:  { chain: ['agy', 'codex', 'claude_crew', 'claude', 'agy_claude'], skill: 'review-unit', reviewOf: ['author', 'repair_en'] },
  translate:  { chain: ['codex', 'claude', 'agy_claude', 'agy', 'claude_crew'], skill: 'translate-unit' },
  review_ur:  { chain: ['claude', 'agy_claude', 'agy', 'claude_crew', 'codex'], skill: 'review-unit', reviewOf: 'translate' },
  fix:        { chain: ['claude_crew', 'codex', 'agy', 'claude', 'agy_claude'], skill: null },
  // Feature 032 phase B: a unit's slide outline, web deck and PowerPoint (owner switch `crew slides on`).
  slides: { chain: ['claude', 'agy_claude', 'codex'], skill: null },
  // Media Studio (Feature 030, scripts/crew/media.mjs). Clips, uploads and NotebookLM need the gflow,
  // youtube-uploader and gemini-notebook-studio MCP servers, which the claude and claude_crew workers
  // have (~/.claude-crew/.claude.json carries the same servers); a script draft needs none. claude_crew
  // stands in when claude is cooling, so one cooling worker no longer stalls media (2026-11-25).
  teaser_script:  { chain: ['claude', 'agy_claude'], skill: 'studio-teaser' },
  teaser_clips:   { chain: ['claude', 'claude_crew'], skill: 'studio-teaser' },
  media_assemble: { chain: ['claude', 'claude_crew'], skill: 'studio-teaser' },
  media_publish:  { chain: ['claude', 'claude_crew'], skill: 'studio-teaser' },
  // The roundup runs scripts and gh only (no MCP), so any worker can carry it.
  social_roundup: { chain: ['claude', 'agy_claude', 'claude_crew', 'codex'], skill: 'social-updates' },
  studio_media:   { chain: ['claude', 'claude_crew'], skill: 'studio-media' },
  studio_publish: { chain: ['claude', 'claude_crew'], skill: 'studio-media' },
  // The old name of studio_media, kept so board rows queued before the rename still launch.
  audio_overview: { chain: ['claude', 'claude_crew'], skill: 'studio-media' },
  // Self-maintenance (scripts/crew/maintenance.mjs, intel.mjs). The distill job leads with agy and
  // codex so the daily model call does not spend the Claude quota the weekly survey needs.
  intel_distill:  { chain: ['agy', 'codex', 'claude', 'agy_claude'], skill: 'intel-distill' },
  maint_survey:   { chain: ['claude', 'agy_claude', 'codex', 'agy', 'claude_crew'], skill: 'weekly-maintenance' },
  maint_refactor: { chain: ['codex', 'claude', 'agy_claude', 'claude_crew', 'agy'], skill: 'weekly-maintenance' },
  maint_docs:     { chain: ['claude', 'agy_claude', 'agy', 'codex', 'claude_crew'], skill: 'weekly-maintenance' },
  maint_adr:      { chain: ['claude', 'agy_claude', 'codex', 'agy'], skill: 'weekly-maintenance' },
  maint_skill:    { chain: ['claude', 'agy_claude', 'codex'], skill: 'weekly-maintenance' },
  // `reviewOf: 'parent'`: never the family of the job whose PR is under review.
  maint_review:   { chain: ['agy', 'codex', 'claude', 'agy_claude', 'claude_crew'], skill: 'weekly-maintenance', reviewOf: 'parent' },
};

/**
 * Launch order among queued jobs of equal course priority (crew.mjs queueOrder). Every key of
 * STAGES must appear here (tests/crew/stage-order.test.mjs): a stage left out sorts at index -1,
 * AHEAD of everything. That is how refresh_figures, flashcards and slides, added without an entry,
 * took the single claude slot every time it freed and starved the claude-only teaser_clips job
 * for a day (2026-11-23/24). Side work that can wait goes last.
 */
/** Stages whose workers call outside media services (Flow, Gemini, NotebookLM, YouTube, Meta);
 * crew.mjs launches them only in media hours (scripts/media/pacing.mjs, D-2026-0100). */
export const OUTSIDE_SERVICE_STAGES = ['illustrate', 'teaser_clips', 'audio_overview', 'studio_media', 'studio_publish', 'media_assemble', 'media_publish', 'social_roundup'];

export const STAGE_ORDER = ['salvage', 'fix', 'maint_review', 'maint_survey', 'maint_refactor', 'maint_docs', 'maint_adr', 'maint_skill', 'intel_distill',
  'repair_en', 'review_en', 'review_ur', 'translate', 'figures', 'plan_illustrations', 'illustrate', 'author',
  'media_publish', 'studio_publish', 'media_assemble', 'teaser_clips', 'studio_media', 'audio_overview', 'teaser_script', 'social_roundup',
  'refresh_figures', 'flashcards', 'slides'];

/** Text in a worker's log that means "out of quota", not "bad work". */
// "hit your weekly limit" (claude) and "model is at capacity" (codex) slipped past this on
// 2026-10-22, so eight jobs spent all three attempts on quota errors and went gate_red.
export const QUOTA_RE = /rate.?limit|quota|usage limit|session limit|weekly limit|too many requests|\b429\b|resource.?exhausted|insufficient (credits|balance)|hit your ([\w-]+ )?limit|limit reached|credit balance|at capacity/i;

/**
 * Text in a worker's log that means the provider refused the worker itself (a model name the
 * account cannot use, or an authentication failure), not "bad work". reapOne treats it like
 * QUOTA_RE: the worker cools and the attempt is refunded, so the job moves to the next worker.
 * 2026-W47 M3, from digests 2026-11-14 C1 (Claude "Failed to authenticate. API Error: 403" behind
 * Cloudflare) and 2026-11-19 C1 (Codex "model is not supported when using Codex with a ChatGPT
 * account" and agy "UNAUTHENTICATED (code 401)" spent all attempts of 3 jobs).
 */
export const PROVIDER_RE = /model is not supported|failed to authenticate|UNAUTHENTICATED \(code 401\)/i;

/**
 * An exhausted IMAGE quota (agy's Gemini image model), reported by scripts/generate-illustration.mjs
 * or retold by the worker. It is not the worker's text quota: the worker stays healthy for other
 * stages and only `illustrate` waits (scripts/lib/image-quota.mjs).
 */
export const IMAGE_QUOTA_RE = /QUOTA_EXHAUSTED|image[- ](generation )?quota[^\n]{0,80}(exhausted|reached|used up)/i;

/** The reset time an image-quota message names ("until 2026-11-17T11:00:06Z"), or null. */
export function imageQuotaReset(text) {
  const m = /(?:until|resets? at)\s+(\d{4}-\d\d-\d\dT\d\d:\d\d(?::\d\d(?:\.\d+)?)?Z)/i.exec(text);
  return m ? m[1] : null;
}

/**
 * Which image producer an image-quota message is about (scripts/lib/image-quota.mjs PRODUCERS).
 * generate-illustration.mjs names the producer first ("gflow image quota reached", "codex image
 * limit reached"); a worker retelling agy's limit names the Gemini image model, so agy is the default.
 */
export function imageQuotaProducer(text) {
  const t = String(text);
  if (/\bgflow\b|nano.?banana|RateLimitError|model quota reached/i.test(t)) return 'gflow';
  if (/\bcodex\b[^\n]{0,40}(image|limit)|image_gen/i.test(t)) return 'codex';
  return 'agy';
}

/**
 * Files a job produced that count as work. Its own PHR and crew scratch do not: an illustrate
 * job blocked by the image quota used to commit only its PHR, which passed as success and
 * shipped ~25 PHR-only batch PRs on 2026-11-15/16.
 */
export function workFiles(files) {
  return files.filter((f) => f && !f.startsWith('history/prompts/') && !f.startsWith('.crew/') && !f.startsWith('node_modules'));
}

/** Backoff ladder for a worker that keeps hitting its limit, in minutes. */
export const COOLDOWN_MIN = [30, 120, 360];

/** Relative provider reset duration in minutes, rounded up and capped at one week.
 * Clock times have no reliable date/timezone here, so retain strike backoff for those.
 */
export function resetMinutes(text) {
  const match = /\bresets?\s+in\s+(?:(\d+)h\s*)?(?:(\d+)m\s*)?(?:(\d+)s)?(?!\w)/i.exec(text);
  if (!match || !match.slice(1).some((part) => part !== undefined)) return null;
  const [, hours = '0', minutes = '0', seconds = '0'] = match;
  return Math.min(10080, Math.ceil(Number(hours) * 60 + Number(minutes) + Number(seconds) / 60));
}

/**
 * First worker in the stage's chain that is healthy, below its concurrency cap,
 * and not of an excluded family. Returns null when none is eligible, so the job
 * waits while jobs of other stages keep flowing.
 */
export function pickWorker(stage, { health, running, excludeFamilies = [], avoid = [] }) {
  const chain = STAGES[stage]?.chain;
  if (!chain) throw new Error(`unknown stage ${stage}`);
  const now = Date.now();
  for (const name of chain) {
    const w = WORKERS[name];
    const h = health[name] || {};
    if (h.state === 'down') continue;
    if (h.state === 'cooling' && h.until && Date.parse(h.until) > now) continue;
    if (excludeFamilies.includes(w.family) || avoid.includes(name)) continue;
    if (running.filter((j) => j.worker === name).length >= w.maxConcurrent) continue;
    return name;
  }
  return null;
}
