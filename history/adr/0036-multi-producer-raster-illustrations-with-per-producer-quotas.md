# ADR-0036: Multi-Producer Raster Illustrations with Per-Producer Quotas

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted by owner instruction on 2026-11-18 (decision D-2026-0085); amended by [ADR-0037](0037-unified-media-studio.md) (2026-11-20), whose producer contract covers every medium
- **Date:** 2026-11-18
- **Feature:** Cross-cutting figure production (ADR-0029 raster illustrations, crew `illustrate` stage)
- **Amends:** [ADR-0029](0029-gemini-agy-raster-illustration-producer.md) points 1 and 4, only as
  stated below. ADR-0029's acceptance rule (point 3), placements (point 5) and asset contracts
  (point 6) are unchanged.
- **Context:**
  - **The backlog.** About 158 illustration rows were still `prompt-only` across 11 courses.
  - **One quota did all the work.** Only agy's `gemini-3.1-flash-image` quota produced images, and it
    runs out for a day at a time.
  - **The PHR-only loop.** On 2026-11-15/16 agy's quota ran out, and the crew merged about 25 batch
    PRs (#604-#628) that held only a PHR. PR #629 stopped that loop by holding every illustrate job
    until agy's quota reset, so the pipeline then sat idle.
  - **The Codex fallback never worked.** The crew's `illustrate` chain listed Codex as a fallback
    worker, but `generate-illustration.mjs` always called agy. Changing the worker never changed who
    made the image.
  - **Other producers were already approved or available.** Codex's built-in `image_gen` was already
    an approved producer (ADR-0029 point 1) and had placed images in 8 crew jobs. The owner's Google
    Flow account, driven through the community `gflow-cli` on the owner's Windows PC over an SSH
    tunnel (D-2026-0082), offers Nano Banana 2.1 or Pro image generation on a separate daily quota;
    so far its images have cost about 0 credits, but that is observed, not guaranteed.
  - **opencode cannot help.** None of its models can output images.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

Raster illustrations are produced by an ordered set of producers behind the single generation
script. Each producer has its own quota state.

1. **Producers and order.**
   1. **agy** (Gemini, `generate_image`).
   2. **gflow** (Nano Banana 2.1, `nano2`, through Google Flow on the owner's PC). Used only while
      both tunnel ends answer: 18800 for MCP and 18801 for the file server.
   3. **Codex** (built-in `image_gen` via `codex exec`).

   opencode is not a producer.
2. **One entry point.**
   - `scripts/generate-illustration.mjs` stays the single repository script that calls an image
     service. This restates ADR-0029 point 4, which now covers three services.
   - The producer code lives in `scripts/lib/image-producers.mjs`, which only that script imports.
   - Workers never call `generate_image` or `image_gen` themselves.
   - Every producer receives the same house-style brief.
3. **Producer contract.**
   - A producer writes one staged PNG, or raises one of three outcomes:
     - **quota exhausted:** record it and move the same row to the next producer;
     - **unavailable:** skip that producer for this run;
     - **failed image:** count a failure for that row.
   - `--producer auto|agy|gflow|codex` selects the producer; `auto` is the default.
   - Exit code 3 means every producer is out.
4. **Per-producer quota state.**
   - `~/.cache/mega-book/image-quota.json` holds `{ agy, gflow, codex }` records with reset times.
   - When a producer names no reset time, the hold is 6 h for agy and Codex and 24 h for gflow.
   - A successful image clears that producer's record.
   - The crew holds `illustrate` jobs only when no producer is available. It reports per-producer
     status on BOARD.md.
   - A job that hits a quota and makes nothing is requeued without spending an attempt.
5. **gflow transport.** The script speaks Streamable HTTP MCP directly over `node:http`, with no new
   dependency and no client timeout. The call uses `count` 1, `ui_mode` classic and `wait` true, and
   its prompt never invites a question from Flow's agent. The script fetches the JPEG over the 18801
   file server and stages it as PNG.
6. **Serial and provenance.**
   - One illustrate job and one generation lock at a time; no parallel producers for now.
   - Each image's producer and model are printed on its log line, so they reach the job log and the
     PHR. This meets ADR-0029's provenance duty.
7. **Unchanged.**
   - Claude still owns prompts, alt text and pedagogical acceptance; every image is inspected before
     it reaches `placed`.
   - G3/G5 independence is unchanged.
   - Claude does not itself call Codex or gflow image generation. ADR-0029 point 2 opened only the
     agy route to Claude; crew workers (agy, Codex) run the script.

## Consequences

### Positive

- **Three separate quota pools instead of one.** Illustration work continues while agy is out, and
  the 158-row backlog no longer waits for one daily reset.
- **The worker chain and the image producer are decoupled.** Whichever worker drives the job, the
  image comes from the first available producer, which fixes the fallback that never worked.
- **Quota exhaustion is a recorded, typed state, not a failure.** It no longer produces PHR-only PRs,
  spends job attempts or cools a worker whose text quota is fine.
- **Small to reverse.** The design adds no new dependency, API key, service or file format. The
  manifest lifecycle, optimiser and gates are reused, and a producer can be removed by deleting one
  map entry.
- **Provenance per image** is visible in logs for later audit or style review.

### Negative

- **gflow depends on the owner's PC.** The PC, Chrome session and SSH tunnel must be up, so gflow's
  availability is irregular.
- **gflow carries account risk.** It automates a consumer web app through a community tool, which may
  breach Google's terms; that risk stays the owner's (D-2026-0082, D-2026-0085). It can also break
  when Flow's UI changes.
- **gflow cost is not guaranteed.** Images look free, but that is observed only; Flow could start
  charging credits.
- **House style can drift.** Three models can produce three looks from one brief, so inspection must
  watch for visual inconsistency within a unit.
- **Codex shares its quota with Codex text work.** Its image quota is the same ChatGPT plan as its
  SVG and translation stages, so heavy image use can slow those.
- **Untested paths.** The gflow and Codex paths were verified only against local stubs and dry runs
  before merge. The first live runs confirm the exact Flow output path and the Codex limit messages.

## Alternatives Considered

### A. agy only, held until reset (PR #629 as merged)
- **For:** simplest; one house style.
- **Against:** leaves the pipeline idle for about a day each time the quota runs out.
- **Verdict:** rejected; the backlog is too large.

### B. Fix the worker chain only (Codex worker runs Codex `image_gen`, agy worker runs agy)
- **For:** smaller change.
- **Against:** puts the producer choice in each worker's prompt rather than in code. Quota state
  stays invisible to the script, and house style and provenance depend on the worker following
  instructions.
- **Verdict:** rejected in favour of one entry point that owns producer selection.

### C. Parallel producers (two illustrate jobs at once, one per producer, separate locks)
- **For:** roughly double throughput while both quotas last.
- **Against:** more code, more host load on the 2-CPU host, and more merge contention on shared
  tracker files.
- **Verdict:** deferred by the owner ("Fallback"); revisit if gflow proves reliable.

### D. Gemini API with an AI Studio key (`google-genai` or the nanobanana MCP)
- **For:** deterministic models and a documented API.
- **Against:** needs a new key and billing, and adds a dependency.
- **Verdict:** kept as the fallback if agy and Flow both lose image support (as in ADR-0029,
  Alternative B).

### E. opencode as a producer
- **Verdict:** not possible; its models have no image output.

### F. gflow first (agy, then Codex, last)
- **For:** saves agy's quota.
- **Against:** depends most on the owner's PC.
- **Verdict:** owner chose agy, then gflow, then Codex.

## References

- Feature Spec: none (cross-cutting); decision record D-2026-0085 in `specs/decisions/log.md`
- Implementation Plan: PR #639 description; PHR `history/prompts/general/20261213-illustrate-multi-producer-gflow-codex.general.prompt.md`
- Related ADRs: [0024](0024-capability-based-claude-and-codex-visual-authoring.md), amended by [0029](0029-gemini-agy-raster-illustration-producer.md), which this amends; [0030](0030-crew-replaces-paperclip-control-plane.md) (crew worker chains); D-2026-0082 (gflow on the owner's PC)
- Evaluator Evidence: `npm run test:crew` 138/138 including `tests/crew/image-producers.test.mjs` (gflow MCP stub: success, rate limit, closed tunnel) and `tests/crew/image-quota.test.mjs`; PR #629 and its PHR 20261201 for the quota incident
