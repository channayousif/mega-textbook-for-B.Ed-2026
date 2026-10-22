/**
 * The crew's workers and stages (ops/crew/README.md).
 *
 * A worker is one headless agent CLI with its own subscription. A stage is one
 * pipeline step with a RANKED chain of workers, so a worker that is cooling on a
 * quota or session limit is skipped and the job goes to the next one instead of
 * waiting. openclaw is deliberately absent: it is the owner's message channel
 * (notify.mjs), not a worker.
 */

/** `family` is the model family; review stages never use the author's family. */
export const WORKERS = {
  claude: {
    family: 'anthropic',
    maxConcurrent: 1,
    cmd: (prompt) => ['claude', ['-p', prompt, '--dangerously-skip-permissions']],
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
  opencode: {
    family: 'longcat',
    maxConcurrent: 2,
    cmd: (prompt) => ['opencode', ['run', '-m', process.env.CREW_LONGCAT_MODEL || 'longcat/LongCat-2.0', prompt]],
  },
};

/**
 * Stage -> ranked worker chain. `skill` is the repo skill the brief names
 * (.claude/skills/<skill>/SKILL.md); every worker can read it as a file.
 * `reviewOf` names the stage whose producer family a review must exclude.
 */
export const STAGES = {
  salvage:    { chain: ['claude', 'agy_claude', 'codex', 'agy', 'opencode'], skill: null },
  author:     { chain: ['claude', 'agy_claude', 'codex', 'agy', 'opencode'], skill: 'author-unit' },
  repair_en:  { chain: ['claude', 'agy_claude', 'codex', 'agy', 'opencode'], skill: 'revise-topic' },
  figures:    { chain: ['codex', 'claude', 'agy_claude', 'agy', 'opencode'], skill: 'generate-figures' },
  illustrate: { chain: ['agy', 'codex'], skill: 'generate-figures' },
  review_en:  { chain: ['agy', 'codex', 'opencode', 'claude', 'agy_claude'], skill: 'review-unit', reviewOf: 'author' },
  translate:  { chain: ['codex', 'claude', 'agy_claude', 'agy', 'opencode'], skill: 'translate-unit' },
  review_ur:  { chain: ['claude', 'agy_claude', 'agy', 'opencode', 'codex'], skill: 'review-unit', reviewOf: 'translate' },
  fix:        { chain: ['opencode', 'codex', 'agy', 'claude', 'agy_claude'], skill: null },
  // Self-maintenance (scripts/crew/maintenance.mjs, intel.mjs). The distill job leads with agy and
  // codex so the daily model call does not spend the Claude quota the weekly survey needs.
  intel_distill:  { chain: ['agy', 'codex', 'opencode', 'claude', 'agy_claude'], skill: 'intel-distill' },
  maint_survey:   { chain: ['claude', 'agy_claude', 'codex', 'agy', 'opencode'], skill: 'weekly-maintenance' },
  maint_refactor: { chain: ['codex', 'claude', 'agy_claude', 'opencode', 'agy'], skill: 'weekly-maintenance' },
  maint_docs:     { chain: ['claude', 'agy_claude', 'agy', 'codex', 'opencode'], skill: 'weekly-maintenance' },
  maint_adr:      { chain: ['claude', 'agy_claude', 'codex', 'agy'], skill: 'weekly-maintenance' },
  maint_skill:    { chain: ['claude', 'agy_claude', 'codex'], skill: 'weekly-maintenance' },
  // `reviewOf: 'parent'`: never the family of the job whose PR is under review.
  maint_review:   { chain: ['agy', 'codex', 'claude', 'agy_claude', 'opencode'], skill: 'weekly-maintenance', reviewOf: 'parent' },
};

/** Text in a worker's log that means "out of quota", not "bad work". */
// "hit your weekly limit" (claude) and "model is at capacity" (codex) slipped past this on
// 2026-10-22, so eight jobs spent all three attempts on quota errors and went gate_red.
export const QUOTA_RE = /rate.?limit|quota|usage limit|session limit|weekly limit|too many requests|\b429\b|resource.?exhausted|insufficient (credits|balance)|hit your (\w+ )?limit|limit reached|credit balance|at capacity/i;

/** Backoff ladder for a worker that keeps hitting its limit, in minutes. */
export const COOLDOWN_MIN = [30, 120, 360];

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
