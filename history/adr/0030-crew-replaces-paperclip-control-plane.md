# ADR-0030: Crew Replaces Paperclip Control Plane

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted by owner instruction on 2026-10-17 (PR #158 merged on the owner's instruction)
- **Date:** 2026-10-17
- **Feature:** Cross-cutting corpus production and orchestration
- **Context:** Paperclip (CEO agent "TEX" plus six ACP agents) was not finishing the corpus. By
  2026-10-17 about 19 draft PRs (#119 to #156) held unfinished Semester 2 work: EFMP-303, EFMP-305,
  GQUR-301, GENG-301, GSOS-301 and GPKS-402 existed only in drafts. Issues were cancelled without
  reason, cross-issue writes failed with run-binding 403s, quota monitors outlived adapter switches,
  delegation cycles returned 409, and runs aborted on session limits. Main itself was red on 44
  stale G2 manifests, so no PR could pass CI. The owner holds five separately-billed agent CLIs on
  the production host (Claude Code, Codex, agy/Gemini, opencode with LongCat, openclaw with LongCat),
  any of which can be out of quota at a given moment. The owner ruled: pause Paperclip and keep its
  data; salvage the draft PRs, then close them; auto-merge when CI is green; no single worker's quota
  may stall the work; use openclaw (WhatsApp and Discord) to keep the owner informed and to ask for
  directions while away.
- **Amends:** ADR-0024 point 1, only for who may author SVG schematics (see section 3). Every
  other ADR-0024 and ADR-0029 rule is unchanged.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

Replace the Paperclip control plane with **the crew**, a repo-native dispatcher (`scripts/crew/`,
documented in `ops/crew/README.md`). It is one integrated cluster:

### 1. Orchestration lives in the repo and on the host, not in a control plane

- **Driver:** `scripts/crew/tick.sh`, run by cron every 15 min under `flock -n`. Each tick fetches
  main, plans, applies owner messages, reaps finished workers, manages PRs, launches new jobs and
  writes `BOARD.md`. Any lead (a Claude session, Codex or agy following the `crew-lead` skill) runs
  the same command, so no chat context is load-bearing.
- **Unit of work:** one job is one course, one unit and one pipeline stage (`salvage`, `author`,
  `repair_en`, `figures`, `illustrate`, `review_en`, `translate`, `review_ur`, `fix`). Each job runs
  in its own git worktree (`~/crew-wt/<job>`) on its own branch, and at most one job per unit runs
  at a time.
- **Jobs are derived, not hand-typed.** `crew.mjs plan` reads main's own state
  (`report-content-status.mjs`, the course tracker, the review reports) and queues the stages each
  unit still lacks. A stage that merged twice without changing main's state is not requeued.
- **State** is host-local in `~/.crew/mega-book/` (board, health, decisions, owner IDs, logs) and is
  never committed: it changes every tick, and `owner.json` holds personal identifiers.
- **Concurrency:** at most 3 jobs at once, none launched while the host has under 3 GB available,
  heavy commands inside a job only through `scripts/heavy.sh`. The crew never builds locally;
  GitHub CI builds every PR.

### 2. Workers, ranked chains and quota failover

- Four workers in four model families: `claude` (anthropic), `codex` (openai), `agy` (google),
  `opencode` with `longcat/LongCat-2.0` (longcat). openclaw is not a worker (section 5).
- Every stage has a ranked chain over the workers (`scripts/crew/workers.mjs`). A run whose output
  matches quota, rate-limit or session-limit text puts that worker in `cooling` for 30 min, then
  2 h, then 6 h. The job is requeued at once to the next eligible worker, continuing from the
  commits already on its branch.
- A failed attempt is retried once with the gate output as feedback. The third attempt goes to a
  different worker, and after that the job is `gate_red` for the lead.

### 3. Rank-1 roles, and the ADR-0024 amendment

| Stage | Chain (rank 1 first) |
|---|---|
| author, repair_en, salvage | claude, codex, agy, opencode |
| figures (SVG schematics) | codex, claude, agy, opencode |
| illustrate (raster) | agy, codex |
| review_en (G3) | agy, codex, opencode, claude |
| translate (G4) | codex, claude, agy, opencode |
| review_ur (G5) | claude, agy, opencode, codex |
| fix (mechanical) | opencode, codex, agy, claude |

ADR-0024 point 1 gave Claude ownership of hand-authored SVG schematics. The `generate-figures`
skill already made Codex the primary SVG author with Claude as fallback (commit ceef2d14); this ADR
records that and adds agy and opencode as later quota fallbacks for SVG schematics only. Raster
production stays exactly as ADR-0024 and ADR-0029 define it (agy via
`scripts/generate-illustration.mjs`, or Codex). No other image generator is introduced.
Pedagogical acceptance of every figure stays with review (ADR-0024 point 4).

### 4. Done means "no new findings versus main", then a PR

- A worker's job passes when `npm run check:content` in its worktree reports no finding that main
  does not also report. A red main (a corpus-wide standard change, say) therefore cannot block every
  unit job.
- The dispatcher then writes the job's PHR (`history/prompts/<course>/crew-<job>...`), pushes the
  branch and opens one PR per job.

### 5. Owner channel over openclaw

- `scripts/crew/notify.mjs` sends through `openclaw message send`: Discord `#etextbook-platform` for
  everything, plus WhatsApp for urgent items and decision requests. If a send fails, it falls back
  to the other channel, then to `OUTBOX.md`.
- Inbound messages are read from the Discord channel API and from openclaw's own WhatsApp and
  Discord direct-message session logs. **Only messages authored by the owner IDs in `owner.json`
  count**, and only fixed verbs act: `C-### <option>` answers a decision, and `crew status`,
  `pause`, `resume`, `prioritise`, `stop` and `retry` control the queue. No message content is ever
  executed.

### 6. Merge policy

- Green CI is the merge gate: the crew merges with `gh pr merge --merge --admin`. Branch protection
  requires one approving review, and every PR is opened from the owner's own account, which cannot
  approve its own PR, so `--admin` is the only way the owner's "auto-merge when CI green" ruling
  can work.
- **Never auto-merged:** a PR touching the style guide, `.specify/` (constitution), `history/adr/`,
  `.github/`, `scripts/`, `catalog/`, `package*.json`, `CLAUDE.md`, `AGENTS.md`, an approved
  `content-spec.md` or an `intake` folder. The owner is asked over the channel instead.
- Red CI on a crew PR queues a `fix` job on the same branch (at most two), then escalates.

### 7. Unchanged

ADR-0019 independence holds and is tightened: a review job is never given to the model family that
produced the work it reviews. Units produced before the crew are treated as Claude-produced. No
worker ticks G3/G5, signs evidence or uses human initials. Paperclip is paused with its data kept
and is not run alongside the crew.

## Consequences

### Positive

- No single subscription is a point of failure. Measured in the 2026-10-17 dry-run, a cooling agy
  moved its reviews to Codex and opencode, and with only Claude healthy, reviews of
  Claude-authored units waited while translation kept running.
- Work state is derived from main, so a lost board can be rebuilt by `plan`; Paperclip's issue
  graph could drift from the repo.
- Four workers run in parallel on separate subscriptions, and the 2-CPU production host carries no
  local builds.
- The owner can steer and answer decisions from a phone, with every answer and the sender's channel
  recorded in `decisions.json`.
- Every crew PR carries its PHR automatically, which satisfies the CLAUDE.md rule mechanically.

### Negative

- `--admin` bypasses the review requirement for every crew merge, so CI is the only review of
  content before it auto-deploys. Mitigations: the protected-path list, the baseline-relative gates
  inside the job, and advisory G3/G5 that still precede certification.
- GitHub CI is serialized on one concurrency group (the shared Supabase test project), so merge
  throughput is bounded by CI run time rather than by the workers.
- Quota detection is a text regex. A CLI that fails silently, or prints a new message, can burn an
  attempt before it is classified, or be misread as a content failure.
- The baseline check compares normalised finding lines. A finding whose text changes slightly
  between main and the branch can count as "new" and cost a retry.
- State and cron live on one host. If the host is lost, so is the board, until `plan` rebuilds it
  from main (in-flight branches survive on GitHub).
- A stacked Paperclip PR cannot be merged or retargeted through the API. It has to be recreated by
  hand on a fresh branch, as #136 became #159.

## Alternatives Considered

**A. Keep Paperclip and repair it** (fresh issues for stuck ones, routine-driven CEO sweeps, model
swaps per agent). This was tried from 2026-10-05 to 2026-10-16 and is recorded in memory notes on
run binding, delegation cycles, stale quota monitors and the legacy execution blocker. Rejected:
every fix met a new control-plane failure, and the corpus stopped moving for days.

**B. One lead session doing all the work serially** (a single Claude session with `/loop`).
Simplest and fully coherent. Rejected: it uses one subscription, stops when that subscription hits
its limit, and leaves three paid subscriptions idle.

**C. Fixed owner per stage, no fallback chains** (the plan's first role matrix). Clear
responsibility, matching ADR-0024's original split. Rejected by the owner ("any one may be
unavailable due to quota/limit"): a stage would stall whenever its one owner was cooling.

**D. Commit the board to git** (state as PRs). It gives an audit trail on GitHub. Rejected: a commit
every 15 minutes would flood main with PRs, collide with protected branches, and expose owner
identifiers. PR history plus per-job PHRs carry the audit trail instead.

**E. Owner opens or approves every merge** (no `--admin`). It keeps a human gate. Rejected by the
owner's ruling: the owner becomes the throughput bottleneck and the corpus waits on their time.
Protected-path PRs keep this gate where it matters.

**F. openclaw as a fifth worker** (LongCat via `openclaw agent --local`). Rejected by the owner:
openclaw is needed as the communication channel, and LongCat is already covered by opencode.

## References

- Feature Spec: none (operations change)
- Implementation Plan: approved session plan, recorded in PHR 0143 (`history/prompts/general/0143-crew-replaces-paperclip-ceo.general.prompt.md`); runbook `ops/crew/README.md`
- Related ADRs: ADR-0019 (independent review, unchanged and tightened), ADR-0024 (amended, point 1),
  ADR-0026 (publication on deterministic gates), ADR-0029 (raster producer, unchanged)
- Evaluator Evidence: PHR 0143 (worker smoke test, planner dry-run, failover dry-run, notify test);
  PR #158 (crew system), PR #145 (main unblocked)
