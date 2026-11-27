# ADR-0039: Crew Model Routing and a Second Antigravity Account

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted by owner instruction on 2026-11-27 ("yes record/run adr", after approving the Feature 034 quota plan: "Configure Claude for efficiency, use different models for different kind of tasks ... The objective is to get more out of the same weekly Claude quota ... extend crew worker with agy2 and agy2-claude")
- **Date:** 2026-11-27
- **Feature:** 034-backlog-tracking (quota efficiency, plan parts B and C); PRs #901 and #902
- **Context:** One Claude Max subscription serves both the owner's interactive sessions and the
  crew's `claude` worker. The crew launched `claude -p` with no `--model`, so every stage ran on the
  default model. A usage report from local transcripts (`scripts/ops/claude-usage.mjs`, 7 days to
  2026-11-27) showed Opus carrying 99.9% of weighted usage: interactive sessions 70%, crew 30%. Many
  crew stages follow a written brief (repairs, translation, figures, decks, media, maintenance
  chores) and do not need the strongest model, while authoring and review quality must not drop. The
  owner also holds a second Antigravity account. agy has no profile switch, and the owner suggested a
  container. The host is a 2-CPU, 12 GB production server whose crew runs inside a memory-capped
  systemd slice (AGENTS.md host limits).
- **Builds on:** [ADR-0030](0030-crew-replaces-paperclip-control-plane.md) (the crew, ranked worker
  chains, per-worker cooldowns, family separation for reviews). No earlier decision is changed.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

1. **Per-stage Claude routing in the crew.** The `claude` worker passes `--model` and `--effort`
   from `CLAUDE_ROUTING` in `scripts/crew/workers.mjs`:
   - Opus, effort high: `author`, `review_en`, `review_ur`, `maint_survey`, `maint_review`.
   - Opus, effort medium: `plan_illustrations`, `teaser_script`, `intel_distill`, `maint_adr`.
   - Sonnet, effort medium: every other stage (the `default`).
   - Per-stage override on the host, with no code change: `CREW_CLAUDE_MODEL_<STAGE>` and
     `CREW_CLAUDE_EFFORT_<STAGE>`.
   - Other workers (`agy_claude`, `claude_crew`, `codex`, `agy`) keep their own model settings.
2. **Interactive routing by delegation, not by changing reviewer inputs.**
   - Project subagents `implementer` (Sonnet, edits and light checks only), `scout` (Haiku,
     read-only) and `content-checker` (Sonnet, advisory).
   - The `quota-wise` skill holds the routing table; AGENTS.md carries a short pointer and
     compaction instructions.
   - `.claude/agents/g3-reviewer.md` and `g5-reviewer.md` are not edited for this: they are bound
     review inputs (`scripts/lib/review-evidence.mjs`), and editing them would invalidate every
     G3/G5 manifest.
   - User-level `opusplan` and a Sonnet default for unnamed subagents are applied only after
     routing is live, because the crew shares `~/.claude/settings.json`.
3. **Measure before and after.** `scripts/ops/claude-usage.mjs` totals tokens by model, kind
   (interactive, crew, subagent), day and project. `/usage` remains the authority for the plan
   limit.
4. **Second Antigravity account isolated by HOME, not a container.**
   - agy reads `~/.gemini` through `$HOME`; this was verified by running it against an empty HOME.
   - `ops/crew/bin/agy2` runs agy with `HOME=~/.agy2`. That profile (mode 700) has its own
     `.gemini` login and links `.gitconfig`, `.ssh`, `.nvm`, `.local` and `~/.config/{gh,git}`
     back to the real home.
   - Without a login, the wrapper exits with `UNAUTHENTICATED (code 401)`, which `PROVIDER_RE`
     already treats as a refusal, so the worker cools down instead of a job hanging on a login
     prompt.
5. **Two new workers.**
   - `agy2` (family google) follows `agy`, and `agy2_claude` (family anthropic) follows
     `agy_claude`, in every chain except `illustrate`.
   - The image lane calls agy through `scripts/generate-illustration.mjs`, not the worker table,
     so it keeps one agy account until that script learns a second producer.
   - Amended 2026-11-28 (owner-approved plan of 2026-11-27, Feature 036): that script now has an
     `agy2` image producer (same wrapper and HOME, own quota record, pacing channel `agy2.image`
     and crew lane), right after `agy`.
   - Each worker has its own health and cooldown.

## Consequences

### Positive

- Brief-following crew stages (most crew runs) move from Opus to Sonnet, while authoring and
  review keep Opus at high effort. The weekly quota stretches without lowering content quality
  where judgement matters.
- Routing is data, testable (`tests/crew/claude-routing.test.mjs`) and overridable per stage from
  the host, so a stage that degrades on Sonnet can go back to Opus in one environment variable.
- The effect is measured, not assumed. The same report can track interactive use and subagent use.
- The crew gains a second Gemini quota and a second agy-served Claude quota. When `agy` cools, its
  job moves to `agy2` before leaving the family, keeping G3 reviews on Gemini more often.
- HOME isolation needs no image, daemon or extra memory. The workers stay inside the crew's capped
  systemd slice, which a Docker container would escape.
- Review independence is unchanged: `agy2` is google and `agy2_claude` is anthropic, so the
  existing family exclusion still governs who may review whose work.

### Negative

- Sonnet may need more repair cycles on some stages. Watch red-job and fix rates per stage, and
  move a stage back to Opus by override if they rise.
- Per-stage routing adds a table to keep in step when stages are added; an unlisted stage silently
  gets the Sonnet default.
- The HOME profile shares git, gh, ssh and node configuration with the main account by symlink.
  It isolates the agy login only, not the operating-system user. A compromised agy2 session has
  the same file access as agy.
- If a future agy release stops honouring HOME, the profile breaks. The fallback is a container
  with its own memory and CPU caps, under a separate approval.
- Two agy accounts on one host share its CPU and memory; `CREW_MAX_PARALLEL` still bounds the total.

## Alternatives Considered

- **Leave every crew stage on the default (Opus).** This is the simplest option and keeps
  quality uniform, but it spends Opus on mechanical work and keeps the quota at its present limit.
  Rejected: the baseline showed Opus at 99.9%.
- **Set `opusplan` (or Sonnet) globally for the crew.** One switch with no code. Rejected:
  `opusplan` is unconfirmed under `claude -p`, and a global Sonnet would also downgrade authoring
  and reviews.
- **Route reviewer sessions by editing `g3-reviewer.md` and `g5-reviewer.md` (`model: opus`).**
  Rejected: those files are bound review inputs, so the edit would invalidate all G3/G5 evidence.
  Crew reviews already get Opus through routing.
- **Docker container for the second agy account (the owner's first suggestion).** This gives full
  isolation of files, network and processes. Rejected for now: agy honours HOME, so a container
  adds an image to maintain (agy, node 22, git, gh), same-path bind mounts and memory caps outside
  the crew slice on a production host. It remains the fallback if HOME isolation ever fails.
- **A second operating-system user for agy2.** This is strong isolation, but it needs its own git,
  gh and ssh credentials, file permissions on worktrees and sudo plumbing for the crew. Rejected
  as heavier than the risk warrants.

## References

- Feature plan: `specs/034-backlog-tracking/plan.md`; session plan approved 2026-11-26.
- Code: `scripts/crew/workers.mjs` (`CLAUDE_ROUTING`, `claudeRouting`, `agy2`, `agy2_claude`),
  `scripts/crew/crew.mjs` (`launch` passes the stage), `ops/crew/bin/agy2`, `ops/crew/README.md`.
- Tooling: `scripts/ops/claude-usage.mjs`, `.claude/agents/{implementer,scout,content-checker}.md`,
  `.claude/skills/quota-wise/SKILL.md`, AGENTS.md "Model routing and context".
- Tests: `tests/crew/claude-routing.test.mjs`, `tests/crew/worker-chains.test.mjs`,
  `tests/unit/claude-usage.test.mjs`.
- PRs: #901 (routing, subagents, usage meter), #902 (agy2 workers), #903 (AGENTS.md).
- PHRs: `history/prompts/034-backlog-tracking/20261287-claude-quota-routing.green.prompt.md`,
  `20261288-agy2-crew-workers.green.prompt.md`.
- Related ADRs: [0030](0030-crew-replaces-paperclip-control-plane.md),
  [0019](0019-independent-agents-for-g3-g5-review.md) (review independence).
