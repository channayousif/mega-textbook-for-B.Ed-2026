# ADR-0037: Unified Media Studio

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted by owner instruction on 2026-11-20 (decision D-2026-0094)
- **Date:** 2026-11-20
- **Feature:** [030-media-studio](../../specs/030-media-studio/spec.md)
- **Amends:**
  - [ADR-0036](0036-multi-producer-raster-illustrations-with-per-producer-quotas.md): its producer
    contract and quota records now cover every medium, not only raster images. Its image order
    (agy, gflow, Codex) is unchanged.
  - [ADR-0029](0029-gemini-agy-raster-illustration-producer.md) point 4: the producer code moves
    from `scripts/lib/` to `scripts/media/producers/`. `scripts/generate-illustration.mjs` stays the
    single image entry point.
  - Feature 029 ("local, serial, owner-run, never in CI or the crew") and D-2026-0082 point 1
    ("Nothing runs in CI or the crew"): the crew may now draft audio and video, under the owner
    gates below. Nothing runs in CI.
- **Context:**
  - **Three pipelines, three engines.**
    - Course teasers: the `studio-teaser` skill, `scripts/notebook-studio/teaser.mjs` and Veo through
      gflow.
    - Notebook Studio: the `studio-media` skill, `media-ledger.mjs` and NotebookLM through `nlm`.
    - Crew figures: `generate-illustration.mjs` with `scripts/lib/image-producers.mjs`.
  - **Duplication.** Two ledger engines (`advance` and `advanceTeaser`, each with its own `REQUIRES`
    map, load and save), copied brand constants and `clean()`, and two status vocabularies.
  - **Uneven resilience.** Only images have producer fallback and per-producer quotas.
  - **Teasers depend on the owner.** gflow timed out at 600 s on every batch-2 shot (2026-11-18 to
    2026-11-20), although Flow finished each clip within minutes and charged for it. All 30 shots
    were recovered by owner download or made by hand from a prompt page.
  - **Not on the site.** Teasers never appear on textbook.com.pk.
  - **Owner rulings, 2026-11-20:**
    - consolidate audio, video and image creation;
    - "Crew drafts, owner gates";
    - "Spec + ADR, then phases";
    - teaser energy rules (1.25x voice, presenter ingredient in shots 1 and 5, off-screen voice over
      action in shots 2-4);
    - embed public teasers on course overview pages and course cards.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

One Media Studio makes images, audio and video, with one job model, one ledger engine, one producer
registry and shared gates. The crew drafts; the owner gates.

1. **Job model and states.**
   - Every media item is a job: `{ kind, course, unit?, topic?, locale, recipe, producer chain,
     state, gates, takes[], outputs[] }`.
   - Kinds:
     - images: `image.schematic`, `image.illustration`;
     - audio and video: `audio.brief`, `audio.deeper`, `video.overview`, `video.teaser`;
     - documents: `doc.poster`, `doc.mindmap`, `doc.brief`, `doc.studyguide`, `doc.slides`.
   - One state vocabulary, in order: planned, scripted, approved, generating, generated, qa-pass,
     assembled, uploaded-private, owner-approved, public, placed. Each kind skips the steps it does
     not need.
2. **One engine, thin adapters.**
   - `scripts/media/ledger.mjs` holds load, save, `advance` with a per-kind `REQUIRES` map,
     `recordTake`, the sha256 duplicate check and the upload-quota guard. One JSON schema covers
     every ledger.
   - `teaser.mjs` and `media-ledger.mjs` keep their CLIs as adapters over it. Existing ledgers load
     unchanged.
   - Figure manifests keep format v2 and `unit-NN.` naming (ADR-0027).
3. **Producer registry for every medium.**
   - Every producer reports one of four outcomes:
     - success;
     - out of quota, with a reset time;
     - unavailable;
     - failed.
   - Producers by medium:
     - image: agy, gflow nano, Codex;
     - video clip: `gflow.video`, then `manual.flow`;
     - audio and video overview: `nlm`;
     - SVG: Codex, then Claude.
   - Quota state is recorded per producer.
   - A clip that was made but never reported is recovered without paying again: first by its media
     id, then from the PC's download folder over 18801.
4. **Versioned recipes.**
   - Prompt templates and pacing live in `specs/studio/recipes/<name>@<version>.json`, and every job
     records the recipe version it used.
   - Teaser recipe v2 holds the owner's energy rules:
     - a presenter ingredient and a preset voice in shots 1 and 5;
     - off-screen voice over action, with a named camera move, in shots 2-4;
     - at most 18 Urdu words a shot;
     - voice at 1.25x.
5. **Shared gates.**
   - Quality gates:
     - QG0: script check;
     - QG1: technical check (`media-qa.mjs`);
     - QG2: meaning (local whisper and a frame look, or a topic comparison for documents);
     - QG3: post-upload check.
   - Owner gates, which only the owner passes:
     - script approval before any credit is spent;
     - spot-check of every private upload;
     - making a video public.
6. **The crew drafts.**
   - New planner stages:
     - `teaser_script`: stops at `scripted`;
     - `teaser_clips`: runs only when the job is approved and a producer answers;
     - `media_assemble`: under `scripts/heavy.sh`;
     - `audio_overview`.
   - One A/V job runs at a time, with the same hold and requeue rules as `illustrate`.
   - The crew may upload as private. BOARD.md lists the owner's queues.
7. **Review isolation.** No content gate, and nothing in `scripts/lib/gates.mjs`'s import closure,
   may import `scripts/media/`. Otherwise every accepted review would go stale
   (`scripts/review-evidence.mjs`).
8. **Site.**
   - A build-time index lists only `public` teasers.
   - `TeaserPlayer` (youtube-nocookie, lazy 9:16 iframe) appears on course overview pages, and as a
     click-to-load button on catalogue cards.
9. **Phased.** Each of the six phases in the [plan](../../specs/030-media-studio/plan.md) leaves the
   old tools working, so the move can stop after any phase.

## Consequences

### Positive

- **One job model.** One way to see, resume and audit every media job, and one status list for the
  owner.
- **Fallback for audio and video.** Audio and video gain the same fallback and quota handling as
  images. A gflow outage or expired `nlm` cookies hold work instead of failing it.
- **No double charges.** Clips that were made but not reported are recovered rather than paid for
  twice.
- **Less owner work per teaser.** Only script approval, the spot-check and publishing remain.
- **Recipes make energy and style changes reviewable and reversible,** and every output carries the
  recipe version that produced it.
- **No new dependency, service or key.** Old CLIs keep working, and existing ledgers need no
  migration.

### Negative

- **More crew use of the owner's Google account** (Flow and NotebookLM through community tools).
  This raises account risk, which stays the owner's (D-2026-0082). Producers break when Google
  changes its UIs.
- **Availability depends on the owner's PC and the tunnel.** The crew will hold teaser work for
  long stretches.
- **Bigger blast radius.** One engine for three pipelines means a bug in it reaches all three; it
  needs adapter tests before each move.
- **Moving the producers touches ADR-0036 code** that was merged only on 2026-11-18 and has had
  little live use.
- **Upkeep.** Isolating the gates is a standing rule that someone must keep checking, and the
  recipes and schema add files to maintain.

## Alternatives Considered

### A. Keep three pipelines, patch each
- **For:**
  - the smallest change each time;
  - no risk to working pipelines.
- **Against:**
  - the duplication stays;
  - audio and video still get no fallback;
  - every fix is made three times;
  - the owner keeps three status views.
- **Verdict:** rejected by the owner ("i want to consolidate the systems").

### B. Merge everything into the crew, with the crew also publishing
- **For:** the most automation.
- **Against:**
  - removes the owner's spot-check before public release (Art. VII.8);
  - credits could be spent without approval.
- **Verdict:** rejected. The owner chose "Crew drafts, owner gates".

### C. Owner-run Studio, kept out of the crew (Feature 029 as written)
- **For:**
  - the least account exposure;
  - no crew changes.
- **Against:**
  - every step waits on the owner;
  - batch 2 showed this is the bottleneck.
- **Verdict:** rejected for drafting. It stays the manual fallback (`manual.flow`).

### D. Replace gflow with another Flow MCP (GTAI-1/flow-mcp, google-flow-mcp forks)
- **For:** might detect finished clips.
- **Against:**
  - GTAI-1 has open issue #24 ("agent-first UI breaks every generation");
  - the others are stale.
- **Verdict:** keep gflow behind the registry. Fix or work around its detection, and swap it later
  through the registry if needed.

### E. Paid APIs (Gemini/Veo API, ElevenLabs) instead of consumer accounts
- **For:**
  - documented and stable;
  - no browser automation.
- **Against:**
  - new keys and billing;
  - Veo API cost per clip is far above the Flow plan already paid.
- **Verdict:** deferred. The registry lets one be added as a producer later.

## References

- Feature Spec: [specs/030-media-studio/spec.md](../../specs/030-media-studio/spec.md)
- Implementation Plan: [specs/030-media-studio/plan.md](../../specs/030-media-studio/plan.md)
- Related ADRs: ADR-0024, ADR-0027, ADR-0029, ADR-0031, ADR-0036
- Decisions: D-2026-0082, D-2026-0083, D-2026-0084, D-2026-0085, D-2026-0094
- Evaluator Evidence: [history/prompts/029-notebook-studio/20261220-teaser-batch2-six-private-uploads.green.prompt.md](../prompts/029-notebook-studio/20261220-teaser-batch2-six-private-uploads.green.prompt.md) (on PR #668)
