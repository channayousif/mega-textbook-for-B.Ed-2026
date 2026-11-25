# ADR-0038: Crew Media Producer Lanes and Per-Producer Parallel Generation

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted by owner instruction on 2026-11-25 ("we can use different media producers in parallel (eg notebook, flow, meta, agy, codex); each producer has max one slot in allotted time already decided"; "merge and turn on, run adr")
- **Date:** 2026-11-25
- **Feature:** Cross-cutting crew scheduling for Media Studio (Feature 030), raster illustrations (ADR-0029/0036), Study Studio (Feature 029) and social updates (Feature 031)
- **Amends:** [ADR-0036](0036-multi-producer-raster-illustrations-with-per-producer-quotas.md) point 6 ("one illustrate job and one generation lock at a time; no parallel producers for now") and [ADR-0037](0037-unified-media-studio.md) point 6 ("one A/V job runs at a time"), only as stated below. ADR-0029's acceptance rule, the producer contract, per-producer quotas, media hours and pacing (D-2026-0100) and every owner gate are unchanged.
- **Context:**
  - **Media hours are bounded.** Since D-2026-0100 (PR #762, 2026-11-24) every outside media call
    happens only in media hours, paced per channel. The first build read the owner's "9 to 3 office
    hours" as the media window (six hours); on 2026-11-25 the owner corrected it to every hour
    except 09:00-15:00 PKT (15:00-09:00, across midnight). Either way the window and the daily caps
    are the whole media budget.
  - **Media waited behind text.** Media jobs shared the crew's two slots (`CREW_MAX_PARALLEL=2`)
    with authoring, translation and review, which usually filled both. Raster images, teasers and
    Study Studio items queued for hours inside the only window they may run in.
  - **One producer at a time.** ADR-0036 kept one illustrate job and one generation lock, and
    ADR-0037 one A/V job, so idle producers (each with its own daily quota) sat unused while one
    worked; 120 illustration rows and the Study Studio backlog grew.
  - **Single-worker chains.** MCP media stages and the social roundup ran only on the `claude`
    worker; when it was cooling they could not run. On 2026-11-24 the roundup was skipped entirely
    (PHR 20261268), and EFMP-301 Unit 4's Study Studio items had been stuck at `qa2-pass` since
    2026-11-09 with no stage to resume them.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

The crew schedules media work on **producer lanes** (`scripts/crew/resources.mjs`, PR #787):

1. **Lanes.** `notebook` (NotebookLM), `flow` (gflow images and Veo, one browser session), `agy`
   (Gemini image), `codex` (image), `youtube` (uploads and publishing), `social` (Graph API posting)
   and `meta` (reserved for [specs/033](../../specs/033-meta-ai-producer/spec.md); no stage yet).
2. **One job per lane, lanes in parallel.** Each lane holds at most one running job; different lanes
   run at the same time. Stage to lane: `illustrate` -> a free image lane (agy, flow, codex);
   `teaser_clips` -> flow; `studio_media` -> notebook; `media_assemble`, `media_publish`,
   `studio_publish` -> youtube; `social_roundup` -> social.
3. **Outside the text slots.** Lane jobs do not count against `CREW_MAX_PARALLEL`; text and local
   stages keep those slots. The memory and disk floors, `scripts/heavy.sh` for ffmpeg, and worker
   capacity (each worker's `maxConcurrent`) still apply to every launch.
4. **Time and budget.** A lane takes a job only in media hours and only while its paced channel has
   room under today's cap (`paceCheck`/caps from `scripts/media/pacing.mjs`; limits unchanged) and,
   for images, while the producer is not out of quota.
5. **Worker priority in the window.** In media hours lane jobs pick a worker before text jobs, the
   day's social roundup first; outside the window text work has every worker.
6. **Per-producer generation (amends ADR-0036 point 6).** Each `illustrate` job is pinned to one
   producer (`generate-illustration.mjs --producer agy|gflow|codex`), which holds that producer's
   lock (`/tmp/mega-book-imagegen.<producer>.lock`). Up to three illustrate jobs run, one per image
   producer. An `auto` run (manual use) holds the shared lock and refuses while any pinned run is
   alive, and a pinned run refuses while an `auto` run is alive. A pinned job that hits its
   producer's quota is requeued without an attempt and its lane freed.
7. **Ledger safety (amends ADR-0037 point 6).** Jobs that write one ledger never overlap: one
   teaser-ledger job at a time, and one job per unit's Study Studio ledger. Different ledgers may
   run in parallel on their lanes.
8. **Worker fallbacks.** MCP media stages run on `claude`, then `claude_crew` (same gflow,
   youtube-uploader and gemini-notebook-studio MCP servers); the social roundup on claude,
   agy_claude, claude_crew or codex; illustrate keeps agy and codex (ADR-0029 roles).
9. **Visibility.** BOARD.md "Today's media plan" shows each lane's running job, its next job, why
   it waits (closed, budget, quota, ledger, worker) and channel use today.

## Consequences

### Positive

- Media work uses the whole media window on every producer with quota, instead of one producer
  at a time behind authoring; the dry run on 2026-11-25 queued three image units, the stuck Study
  Studio unit and the social roundup on separate lanes.
- Daily caps and media hours still bound every account, so parallelism does not raise any one
  account's rate (each producer is still serial and paced).
- One cooling worker no longer stops a whole medium.
- The board explains every idle lane, so the owner sees whether time, budget or workers are the limit.

### Negative

- Worker capacity becomes the binding constraint: agy and codex serve both text and image jobs,
  and claude/claude_crew serve text and all MCP lanes. A lane can be free with no worker to run it.
- More jobs run at once (up to two text plus several lanes), which uses more memory; the memory
  floor stops launches but does not stop jobs already running.
- claude_crew (LongCat model) may now run MCP media stages; its output quality on QG2 transcript
  checks is less proven than claude's, so owner spot-checks matter more.
- Parallel illustrate jobs on different units of one course share that course's `.staging/` folder
  (files are per figure id, so they do not collide, but cleanup must stay per file).
- Old wording in ADR-0036 and ADR-0037 ("serial", "one job at a time") now needs this ADR to be
  read alongside it.

## Alternatives Considered

- **A. Keep one media job at a time, reserve one of the two text slots for media in media hours.**
  Simple, no lock change; rejected because it still lets only one producer work at a time while the
  others' daily quotas go unused, and it takes a slot from authoring.
- **B. Raise `CREW_MAX_PARALLEL` and keep a single queue.** Rejected: the cap protects a 2-CPU, 12 GB
  production host (AGENTS.md); more text jobs would compete for memory, and media would still queue
  behind text in stage order.
- **C. Parallel producers inside one illustrate job (`auto` fanning out).** Rejected: one job would
  hold three quotas and one worker for hours, a failure would void work from every producer, and
  the crew could not see or schedule producers separately.
- **D. Separate crew process per medium.** Rejected: duplicates state, locks and owner commands,
  and the shared memory floor would need cross-process coordination.

## References

- Feature Spec: [specs/030-media-studio/spec.md](../../specs/030-media-studio/spec.md), [specs/033-meta-ai-producer/spec.md](../../specs/033-meta-ai-producer/spec.md)
- Implementation Plan: PR #787 (`scripts/crew/resources.mjs`, `scripts/crew/crew.mjs` `launchQueued`, `scripts/generate-illustration.mjs` per-producer lock, `.claude/skills/media-studio/SKILL.md` "Producer lanes")
- Related ADRs: [ADR-0029](0029-gemini-agy-raster-illustration-producer.md), [ADR-0036](0036-multi-producer-raster-illustrations-with-per-producer-quotas.md), [ADR-0037](0037-unified-media-studio.md); decision D-2026-0100 (media hours and pacing)
- Evaluator Evidence: [PHR 20261268](../prompts/general/20261268-crew-status-social-studio-raster-meta.general.prompt.md) (diagnosis), [PHR 20261269](../prompts/general/20261269-crew-media-lanes-studio-social-meta-spec.general.prompt.md) (200 crew tests, dry runs)
