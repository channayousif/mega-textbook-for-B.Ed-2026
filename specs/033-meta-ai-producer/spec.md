# Feature Specification: Meta AI as a media producer

**Feature Branch**: `033-meta-ai-producer`
**Created**: 2026-11-25
**Status**: Draft (spec only; nothing is built until the owner approves this spec)
**Input**: Owner, 2026-11-25: "do all three fixes" (the third: "draft a spec for Meta AI as an image and video maker"), and "we can use different media producers in parallel (eg notebook, flow, meta, agy, codex); each producer has max one slot in allotted time already decided".

## Context

The crew makes raster illustrations with agy (Gemini), gflow (Nano Banana via Flow) and Codex
(ADR-0029), teaser clips with gflow Veo, and Study Studio media with NotebookLM. Since 2026-11-24 a
Chrome profile on the davinci VNC desktop (`workspace-chrome`, DevTools on `127.0.0.1:9222`) is
signed in to meta.ai and Meta Business Suite (PHR 20261261, D-2026-0099). Facebook and Instagram
posting already works through the Graph API (`scripts/notebook-studio/social-post.mjs`). Meta AI
image and video generation has never been tried and nothing in the crew can call it.

The crew's producer lanes (`scripts/crew/resources.mjs`, 2026-11-25) already reserve a `meta`
lane with no stage, so a Meta producer, once approved, adds capacity in parallel with the others
instead of competing for their slots.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - The owner sees whether Meta AI output is usable (Priority: P1)

Before any automation, the owner (or Claude over the VNC desktop, with the owner watching) makes a
small fixed set of images on meta.ai from existing approved illustration prompts and compares them
with the agy/gflow images placed for the same rows.

**Why this priority**: there is no point automating a producer whose images fail the house style,
the cultural rules or the terms of use.

**Independent Test**: five prompts from placed rows of two courses are run by hand; each result is
scored with the illustrate checks (no text, correct dress and setting, no sacred figures, teaches
the row's point, matches the alt text) and saved outside git with the prompt and date.

**Acceptance Scenarios**:

1. **Given** five approved prompts, **When** they are run on meta.ai by hand, **Then** a one-page
   comparison (Meta vs the placed image, verdict per check) is written to
   `specs/033-meta-ai-producer/smoke-test.md`, and the owner decides go or no-go.
2. **Given** a result with readable text or a wrong setting, **When** it is scored, **Then** it is
   counted as a fail exactly as an agy image would be.

### User Story 2 - Meta AI makes illustrations on its own lane (Priority: P2)

With the owner's go, `generate-illustration.mjs --producer meta` makes images through the workspace
Chrome, so an `illustrate` job pinned to the `meta` lane runs in parallel with agy, gflow and Codex.

**Why this priority**: 120 illustrations are planned and each producer has a small daily cap; a
fourth producer shortens the backlog without raising any one account's rate.

**Independent Test**: one unit's prompt-only rows are produced with `--producer meta` in a dry
crew tick and a real run; the images pass the same checks and land in `.staging/` then WebP.

**Acceptance Scenarios**:

1. **Given** the `meta` lane is free and `meta.image` has room today, **When** an illustrate job is
   queued in media hours, **Then** the crew may pin it to `meta` (as for agy/gflow/codex).
2. **Given** meta.ai shows a sign-in page, a captcha or a rate message, **When** the producer runs,
   **Then** it returns `unavailable` or `quota` (never `failed`), the lane is freed and the job moves
   to another image lane.

### User Story 3 - Meta AI short video for social posts (Priority: P3)

Short animated clips (a few seconds) for social cards, made from an approved still, as an option
beside the existing figure animations.

**Why this priority**: useful but optional; teasers already use Veo.

**Independent Test**: one clip made by hand passes QG1 (`media-qa.mjs --kind clip`) and a person's
look; only then is a producer built.

### Edge Cases

- The workspace Chrome is closed, crashed, or davinci is down: `unavailable`, no attempt spent.
- The session expires mid-batch: `unavailable` with "owner must sign in on the VNC desktop".
- Meta changes the page: selectors fail, so the producer returns `unavailable` and a CREW-HANDOFF
  line; it never guesses or clicks elsewhere.
- Meta adds a visible watermark or "Imagined with AI" label: allowed only if the owner accepts it
  for course pages; otherwise the producer is limited to social use (decision below).
- Two crew jobs try the `meta` lane at once: impossible by design (one job per lane, plus a
  `/tmp/mega-book-imagegen.meta.lock` like the other producers).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (blocking)**: Before any code, record a terms review: Meta's terms for meta.ai and
  generated content (automated access, commercial and educational use of outputs, required AI
  labelling, account eligibility in Pakistan). If automated use of meta.ai is not allowed, the
  producer is not built and the `meta` lane stays reserved; the owner decides in
  `specs/decisions/log.md`.
- **FR-002**: The producer follows the contract in `scripts/media/producers/README.md`
  (`ok | quota | unavailable | failed | held`) and the image form in `scripts/lib/image-producers.mjs`;
  it is added to `PRODUCERS` and `--producer` in `scripts/generate-illustration.mjs` last in the
  fallback order (agy, gflow, codex, meta) unless the owner orders otherwise.
- **FR-003**: It drives only the existing davinci `workspace-chrome` over CDP through the media
  tunnel (like gflow's chrome strategy); it never stores Meta cookies or passwords in the repo or in
  logs, and never signs in by itself.
- **FR-004**: Every call is paced: new pacing channels `meta.image` (and `meta.video` for story 3)
  in `scripts/media/pacing.mjs` DEFAULTS, with a gap, hourly and daily caps no higher than
  `gflow.image` (proposed 90 s + jitter, 10 an hour, 30 a day), inside media hours only.
- **FR-005**: `scripts/crew/resources.mjs` maps `meta` to producer `meta` and channel `meta.image`,
  and adds it to `IMAGE_LANES` after codex; `MAX_ILLUSTRATE` in `planner.mjs` rises to 4.
- **FR-006**: Roles stay as ADR-0024/0029 set them: Claude owns prompts and alt text; the producer
  only renders; the `illustrate` job inspects every image with the same checks before placing it.
- **FR-007**: The house-style block and negative rules in `generate-illustration.mjs` apply
  unchanged; a Meta image with any text, logo, watermark (unless accepted) or sacred figure fails.
- **FR-008**: Meta Business Suite stays a manual tool; this feature automates no Business Suite step.
- **FR-009**: Tests: a fake CDP page for the producer (ok, sign-in page, rate message, selector
  missing), the pacing channel, and the lane mapping; nothing calls meta.ai in CI.

### Key Entities

- **Meta producer**: `scripts/media/producers/meta.mjs` (image; video later), CDP client to
  `127.0.0.1:9222` on davinci via the tunnel.
- **Pacing channels**: `meta.image`, `meta.video`.
- **Lane**: `meta` in `scripts/crew/resources.mjs`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The smoke test (story 1) is done and the owner's go/no-go is recorded before any code.
- **SC-002**: With go, at least 4 of 5 smoke-test images pass every illustrate check.
- **SC-003**: In production, Meta images fail the checks no more often than agy images over the
  first 30 rows (measured from the illustrate jobs' handoffs).
- **SC-004**: No Meta account warning or restriction in the first month (pacing works).

## Open questions for the owner

1. Is automated generation on meta.ai acceptable to you after the terms review (FR-001)?
2. Course pages or social only? (Matters if Meta adds a visible AI label or watermark.)
3. Fallback position: last after Codex (proposed), or before Codex to save Codex's 15 a day?
4. Story 3 (video) now, or only after images have run for a month?

## Not in scope

Meta Business Suite automation, Meta ads, Instagram/Facebook posting changes (already handled by
the Graph API), any change to existing producers' order or caps.
