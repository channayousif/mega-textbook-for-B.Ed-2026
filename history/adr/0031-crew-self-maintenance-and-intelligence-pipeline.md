# ADR-0031: Crew Self-Maintenance and Intelligence Pipeline

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Proposed (owner design choices recorded 2026-10-19; accepted when PR #283 is merged by the owner)
- **Date:** 2026-10-19
- **Feature:** Cross-cutting crew orchestration (extends ADR-0030)
- **Context:** ADR-0030 made the crew (claude, codex, agy, opencode; `scripts/crew/`) the workforce
  for the corpus. It tends content but not the project: `scripts/crew/crew.mjs` grew about 1,000
  lines in three days, 29 ADRs carry amendments and supersessions that can only be found by reading
  each one, and README/ops/guides lag the code. Worse, the crew forgets what it learns. On
  2026-10-19 one failure (`static/content-status.json is missing`) recurred 25 times before a person
  found it, 17 retries were "exited without committing", the same handoff notes were written again
  and again, and a registry-merge defect reached main twice. The raw material to learn from already
  exists: board history and feedback, CREW-HANDOFF notes, 473 worker logs (41 MB in about 2.5 days),
  cron.log, 669 PHRs with reflection fields, 140 G3/G5 reports. The owner asked for a weekly,
  spec-driven, reusable-intelligence (SDD-RI) maintenance run by the same four workers, and for
  intelligence extraction on a researched cadence, and chose: mega-book only; auto-merge of safe
  areas on green CI plus an independent cross-family review; ADRs consolidated as a readable index
  with links, never rewritten; Sunday 02:00 PKT.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

The crew maintains the project and learns from its own work, as crew stages driven by the existing
15-minute tick, under these rules:

- **Cadence, from the tick in Asia/Karachi time** (`scripts/crew/maintenance.mjs`): no crontab entry
  and no daylight-saving handling; each slot runs once and a missed slot runs at the next tick.
  - Harvest every 12 h (00:00, 12:00 PKT), deterministic, **no model call**.
  - Distill once a day (03:00 PKT), **one model job** (`intel_distill`, agy first to spread quota).
  - Maintenance and promotion once a week (Sunday 02:00 PKT).
- **Intelligence pipeline** (`scripts/crew/intel.mjs`): new signals (board failures and handoff
  notes, worker-log and cron errors, PHR reflections, G3/G5 findings) are clustered by normalised
  signature in host state (`~/.crew/<project>/intel/`); a crew failure that turns hot is announced at
  once (at most five per harvest; the first harvest is a silent baseline). The distill job writes
  typed candidates with evidence to `specs/intelligence/daily/`. Only the weekly survey promotes a
  candidate, into a skill, gate, brief/planner fix or rule. Adopted items live in
  `specs/intelligence/registry.md` with the signature they target, and every harvest measures their
  effect ("worked", "no change", "worse"). Intelligence lives in the repo, which all four CLIs read,
  not in any one model's private memory.
- **Weekly SDD-RI cycle** (`maint_survey` then `maint_refactor|docs|adr|skill`): a survey writes
  `specs/maintenance/<YYYY-Www>/` spec, plan, tasks (at most six) and intelligence; each task row
  becomes one job and **its own PR**, never part of the hourly content batch.
- **Merge gate**: a maintenance PR merges automatically only when CI is green AND an independent
  `maint_review` from a different model family than the producer returned `CREW-VERDICT: pass` AND
  it touches no protected path. Protected means the existing crew list (scripts, ADRs, CLAUDE.md,
  AGENTS.md, catalog, CI, package files, approved specs) **plus `.claude/`** (skills and agents steer
  every worker); those go to the owner as a C-### question. A revise queues one fix with the
  reviewer's words; three rounds without a pass go to the lead.
- **Boundaries enforced by the dispatcher, not only by briefs**: a maintenance or intelligence diff
  that touches course content (`docs/`, `licence/`, the Urdu docs trees, `specs/content/`,
  `static/img/figures/`, `glossary.json`) fails; the shared-registry guard (#280) and the content
  gates apply as to any job; ADRs are summarised in a generated register (`history/adr/README.md`)
  and only hygiene-fixed (links, status lines recording later amendments), never rewritten; ADRs are
  still only suggested, never auto-created (CLAUDE.md).

## Consequences

### Positive

- Recurring failures surface within 12 hours instead of after dozens of repeats, at near-zero cost
  (no model call); the first live harvest put the week's real repeats at the top.
- Lessons become durable, reviewable changes with measured effect; the first measurement already
  showed #281's fix "worked" (25 failures in the slot before, 3 after).
- Code, docs and the decision record stay current without the owner starting it, through the same
  stage chains, quota failover and worktrees the corpus work uses.
- Every self-change is a small, reviewed PR; anything that steers the crew itself (skills, scripts,
  ADRs, rules) still needs the owner.
- Readers get every decision in one place (the register) with links to the authoritative ADRs.

### Negative

- The crew now merges some of its own changes without a person reading them. The guard is CI plus a
  model review from another family; a defect both miss can land (mitigated by small diffs, the
  content boundary, the registry guard, and protected paths staying owner-only).
- More moving parts in an already large dispatcher, and extra CI runs (each maintenance PR runs the
  full suite because it touches non-content files) on a shared, serialized database queue.
- Model spend: one distill job a day plus a weekly survey, up to six tasks and their reviews.
- Signatures are heuristic: some noise (one-off PHR reflections, log lines quoting code) still
  forms clusters, and undated sources (cron.log) cannot be back-filled, so early effect readings
  can say "too early".
- Owner workload shifts toward reviewing proposals for protected paths (skills, scripts, the ADR
  register) each week.

## Alternatives Considered

- **Report only, owner implements** (the survey writes findings, no code changes). Safest, but it
  leaves the owner as the bottleneck that ADR-0030 removed; rejected by the owner in favour of
  auto-merging safe areas.
- **Every maintenance PR needs the owner** (no auto-merge at all). Simple governance, but routine
  docs and small refactors would wait on a person every week; rejected for the same reason, while
  keeping owner approval for protected paths.
- **Model-only extraction on every tick or per job** (have an LLM read each finished job). Richer
  per-job judgement, but costs a model call every 15 minutes or per job across four quota-limited
  CLIs and duplicates the same lesson many times; rejected for a free deterministic harvest feeding
  one daily model job.
- **Weekly extraction only** (fold everything into the Sunday survey). Cheapest, but a burning
  failure could repeat for up to a week, as the 25x repeat did in under a day; rejected.
- **Store intelligence in Claude's private memory or a separate service** (vector store, wiki).
  Claude memory is invisible to codex, agy and opencode; a separate service adds infrastructure on
  a 2-CPU host that already serves production; rejected for repo files every worker reads.
- **Merge consolidated ADRs that supersede groups of old ones.** Fewer files, but rewrites decisions
  and needs owner consent per ADR; rejected for a generated register that summarises and links.
- **Separate crontab entries for each cadence.** Familiar, but adds host configuration, drifts with
  daylight saving, and cannot share the tick's lock and state; rejected for tick-driven slots.

## References

- Feature Spec: `specs/maintenance/README.md`, `specs/intelligence/registry.md`, `ops/crew/README.md` ("Weekly maintenance", "Intelligence")
- Implementation Plan: PR #283 (`ops/crew-weekly-maintenance`); skills `.claude/skills/weekly-maintenance/`, `.claude/skills/intel-distill/`
- Related ADRs: ADR-0030 (crew replaces Paperclip; this extends it), ADR-0019 (independent agents for G3/G5 review; same cross-family independence principle, G3/G5 sign-off unchanged), ADR-0026 (publish on deterministic gates), ADR-0021 (quality enforcement moves to review)
- Evaluator Evidence: `history/prompts/general/0535-crew-weekly-maintenance-and-intelligence.general.prompt.md` (46 crew tests, live harvest on a copied state, dry-run ticks, 13/13 content gates)
