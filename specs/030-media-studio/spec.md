# Feature Specification: Media Studio

**Feature Branch**: `030-media-studio`
**Created**: 2026-11-20
**Status**: Draft
**Input**: User description: "Media Studio: consolidate the three media pipelines (course teaser Shorts, Notebook Studio audio/video/documents, crew SVG and raster figures) into one system with a single job model, one state vocabulary, a producer registry, versioned recipes, shared quality gates and owner gates. Crew drafts, owner gates. Private uploads first. Fix or work around undetected finished clips. Public teasers embed on course overview pages and course cards. Existing pipelines keep working; no gate script may depend on the new shared core."

## Background

Three separate systems make media for the textbook today:

1. **Course teasers.** These are 30-40 s Urdu Shorts, one per course. Veo makes the clips through
   Google Flow on the owner's PC. They are uploaded to YouTube.
2. **Notebook Studio** (Feature 029). Per topic, it makes:
   - audio briefs and video overviews through NotebookLM, published on YouTube;
   - posters, mind maps, briefs and study guides on the site;
   - slides on Drive.

   The owner runs it.
3. **Crew figures.** These are SVG schematics and raster illustrations, made by the crew's agents
   and placed in course pages.

Each system has its own ledger, states, checks and conventions. Only images can fall back from one
producer to another when quota runs out, and only images are made by the crew. Teasers never appear
on the site.

Owner rulings of 2026-11-20 set the direction:
- one system for image, audio and video;
- the crew drafts, and the owner approves scripts before credits are spent, spot-checks, and
  decides what goes public;
- uploads are private first;
- energetic teasers;
- teasers on the site.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - The crew drafts a course teaser and the owner approves it (Priority: P1)

The crew notices a course without a teaser. It drafts a five-shot Urdu script from the course pages
using the current teaser recipe, checks it, and puts it in the owner's approval queue. No credits
are spent at this point. After the owner approves, the crew generates the clips. If one producer is
out of quota or offline, it uses the next one. It then checks every take and assembles the Short.
It uploads the Short as private and queues it for the owner's spot-check. The owner watches it and
publishes it.

**Why this priority**: Teasers are the most manual pipeline today. Each one needs hours of the
owner's and Claude's time, so automating them while keeping the owner in control gives the largest
gain.

**Independent Test**: Pick one course without a teaser and let the crew run.
- It stops at "awaiting script approval".
- After approval, it ends at "awaiting spot-check" with a private Short.
- No credits are spent before approval.

**Acceptance Scenarios**:

1. **Given** a course with no teaser, **When** the crew runs, **Then** a script passes the script
   check and waits for the owner's approval, with zero credits spent.
2. **Given** an approved script and a reachable video producer, **When** the crew runs, **Then**
   each shot gets a take, every take passes or fails the technical and meaning checks with a recorded
   reason, and a failed take is retried at most twice.
3. **Given** every shot has a passing take, **When** assembly completes, **Then** the Short passes
   the encoded check and is uploaded private with the AI-disclosure flag, a thumbnail from the
   course's own shots and the teaser playlist.
4. **Given** a private Short awaiting spot-check, **When** the owner approves it, **Then** it becomes
   public and its state is recorded. The crew never makes a video public.

---

### User Story 2 - Energetic teasers from a versioned recipe (Priority: P1)

The owner found the first teasers flat, slow and visually static. The teaser recipe is now written
down and versioned:
- **Shots 1 and 5:** an on-screen presenter, the same face and preset voice every time, attached as a
  Flow "ingredient".
- **Shots 2-4:** off-screen voice-over on action scenes. Each is one concrete 8-second situation with
  movement and a named camera move.
- **Narration:** short Urdu lines, at most 18 words per shot.
- **Pace:** the final voice is sped up to about 1.25×.

Every new teaser names the recipe version it used.

**Why this priority**: Every new teaser is held until it looks and sounds energetic. A recipe makes
that quality repeatable for any producer or agent.

**Independent Test**: Make a two-shot pilot (presenter plus one action shot) under the recipe. The
owner judges the energy, and the speech check still hears every word at the faster pace.

**Acceptance Scenarios**:

1. **Given** the recipe, **When** a script is drafted, **Then** shots 1 and 5 are presenter shots,
   shots 2-4 name an action and a camera move, and no Urdu line exceeds 18 words.
2. **Given** an assembled teaser, **When** it is checked, **Then** it runs under 30 s and every
   narrated word is still recognised by the speech check.
3. **Given** a recipe change, **When** later teasers are made, **Then** each records the new recipe
   version, and earlier teasers keep their original version.

---

### User Story 3 - One place to see and steer all media (Priority: P2)

The owner and the crew lead see every media job in one queue, whatever its type:
- teaser, audio brief, video overview, poster, mind map, slides, schematic or illustration;
- its state, its producer and its next owner action.

Owner actions are listed together: scripts to approve, Shorts to spot-check, videos to publish.

**Why this priority**: Today the owner must remember three systems with three vocabularies.
One view removes missed approvals and duplicated work.

**Independent Test**: With jobs of at least four kinds in progress, one status report lists all
of them with a common state name and the pending owner actions.

**Acceptance Scenarios**:

1. **Given** jobs of several kinds, **When** the status is requested, **Then** every job shows one
   state from the shared vocabulary.
2. **Given** jobs waiting on the owner, **When** the status is requested, **Then** they appear in an
   owner-action list grouped by action.
3. **Given** a producer out of quota or offline, **When** the status is requested, **Then** its
   availability and reset time are shown.

---

### User Story 4 - Producers fall back and recover without lost credits (Priority: P2)

When a producer runs out of quota, goes offline, or finishes a clip without reporting it, the job
moves on and nothing is paid for twice:
- **Out of quota:** the producer is held until its reset, and the same item moves to the next
  producer.
- **Offline:** the producer is skipped (for example, the owner's PC is off during a power cut).
- **Finished but not reported:** a clip Flow finished but never reported is recovered from Flow or
  from the owner's download folder; it is not generated again.

**Why this priority**: On 2026-11-18 and 19, 40 credits were spent on clips the system never saw,
and power cuts stopped work for hours.

**Independent Test**: Simulate each condition (quota message, closed connection, finished clip not
reported). Check that the job takes the next route, records the reason, and that no second paid
generation happens for the same shot.

**Acceptance Scenarios**:

1. **Given** a quota message from a producer, **When** an item is attempted, **Then** the producer is
   held until its reset and the item goes to the next producer in order.
2. **Given** an offline producer, **When** jobs are scheduled, **Then** jobs that need it wait
   without spending an attempt, and other jobs continue.
3. **Given** a clip that finished in Flow but was not reported, **When** recovery runs, **Then** the
   clip is fetched without a new generation and recorded as that shot's take.
4. **Given** the owner makes clips by hand in Flow (manual route), **When** the files arrive in the
   download folder, **Then** each is matched to its shot. Clips joined into one file are split at
   speech pauses.

---

### User Story 5 - Public teasers on the site (Priority: P3)

A visitor sees a course's public teaser:
- on its overview page;
- on its card on the home and catalogue pages, behind a play button.

Private or unpublished teasers never appear.

**Why this priority**: Teasers drive enrolment only if people see them. The site is where students
already are.

**Independent Test**: After one teaser is public, the built site shows a player on that course's
overview page and a play button on its card. A course whose teaser is private shows neither.

**Acceptance Scenarios**:

1. **Given** a public teaser, **When** its course overview page loads, **Then** a vertical player
   shows the teaser, in Urdu on both locales while English teasers are closed.
2. **Given** a public teaser, **When** a visitor taps the play button on a course card, **Then** the
   player opens. The video loads only after the tap.
3. **Given** a private teaser, **When** any page loads, **Then** no player or button for it appears.

---

### User Story 6 - Existing work keeps working during the move (Priority: P1)

While the systems are merged:
- the current teaser, Notebook Studio and figure tools, ledgers and published media keep working;
- no accepted content review becomes stale because of this feature.

**Why this priority**: Corpus work, reviews and publishing cannot stop for a refactor.

**Independent Test**: After each phase:
- the existing test suites pass;
- existing ledgers load unchanged;
- the review evidence reports no newly stale reviews.

**Acceptance Scenarios**:

1. **Given** existing ledgers and manifests, **When** the shared core is introduced, **Then** they
   load and advance exactly as before.
2. **Given** accepted reviews, **When** any phase merges, **Then** none become stale because of
   files this feature changed.

### Edge Cases

- **Speech slips.** The video producer repeats or drops a word in Urdu. The meaning check records
  it as pass-with-notes or fail, and the owner sees the note in the spot-check list.
- **Joined clips.** A long joined clip has no pause near a picture cut. The split uses the nearest
  pause, and the picture cut may shift by up to about one second.
- **Shared shots.** Every teaser uses the same closing shot. It is made once and reused, and it is
  never used for a thumbnail.
- **Daily upload cap.** The channel's daily upload limit is reached. Uploads stop for the day and
  resume the next day without failing jobs.
- **Expired sign-in.** The meaning check falls back to local speech recognition. The audio/video
  overview producer reports itself unavailable instead of failing jobs.
- **Script changes.** A script changes after approval. Approval is void, and the job returns to
  awaiting approval.
- **Content limits.** Generated imagery shows text, sacred figures or real-place maps. The meaning
  check fails the take under existing content rules.

## Requirements *(mandatory)*

### Functional Requirements

**Job model and states**
- **FR-001**: Every media item is a job with:
  - a kind: teaser, audio brief, audio deep-dive, video overview, poster, mind map, brief, study
    guide, slides, schematic or illustration;
  - its course, unit, topic and locale as applicable;
  - a recipe version, a producer order, a state, gate records, takes and outputs.
- **FR-002**: All jobs use one state vocabulary: planned, scripted, approved, generating, generated,
  checked, assembled, uploaded-private, owner-approved, public, placed. Each kind declares which
  states it skips and what evidence each state needs.
- **FR-003**: Existing teaser ledgers, Notebook Studio ledgers and manifests, and figure manifests
  remain readable and are mapped to the shared vocabulary without rewriting their history.

**Producers**
- **FR-004**: Producers are registered per medium:
  - images: Gemini via agy, Nano Banana via gflow, Codex;
  - video clips: Veo via gflow, manual Flow;
  - audio and video overviews: NotebookLM;
  - schematics: Codex, Claude.
- **FR-005**: Every producer reports one of four outcomes: success, out of quota (with a reset time
  when known), unavailable, or failed take. Out-of-quota producers are held per producer until
  reset; unavailable producers are skipped for the run.
- **FR-006**: A clip that a producer finished but did not report must be recovered without paying
  again, before any retake of that shot is allowed.
- **FR-007**: A manual route lets the owner generate clips in Flow from a prompt page. Arriving files
  are matched to shots, and joined clips are split at speech pauses.
- **FR-008**: Images keep a single entry point, and generation never runs in CI or the site build.

**Recipes**
- **FR-009**: Prompt templates and pacing are versioned recipes, and each job records the recipe
  version it used.
- **FR-010**: The teaser recipe v2 contains:
  - presenter shots 1 and 5 with one saved presenter and preset voice;
  - action shots 2-4, each naming a situation and a camera move;
  - Urdu lines of at most 18 words;
  - a final voice pace of about 1.25×, with the teaser under 30 s;
  - one shared closing shot, made once.

**Checks and owner gates**
- **FR-011**: The checks are shared across kinds:
  - QG0: the script check against the course pages;
  - QG1: technical bounds per kind;
  - QG2: meaning, by speech transcript and frame review for video and audio, or by comparison with
    the topic for documents;
  - QG3: post-upload, confirming the private upload is on the channel.
- **FR-012**: No credits are spent on a job before the owner approves its script.
- **FR-013**: Every upload is private first. Only the owner makes a video public.
- **FR-014**: The owner-action list shows scripts to approve, items to spot-check and items to
  publish, with notes from the checks.

**Crew**
- **FR-015**: The crew may draft scripts, generate, check, assemble and upload as private for every
  kind, but only when the needed producer is reachable.
- **FR-016**: Media jobs follow the crew's existing pacing and limits:
  - one audio/video job at a time;
  - held when no producer is available;
  - requeued without spending an attempt when a quota stops it;
  - the host's heavy-job limits apply.

**Site**
- **FR-017**: Public teasers appear on the course overview page in a vertical player, and behind a
  play button on home and catalogue course cards.
  - The video loads only on demand.
  - Private items never appear.
  - The Urdu teaser serves both locales while English teasers are closed.

**Safety of the move**
- **FR-018**: No content gate, and nothing a content gate depends on, may depend on the new shared
  core. Accepted reviews must not become stale because of this feature.
- **FR-019**: Each phase leaves the existing tools working, so the move can stop after any phase.

### Key Entities

- **Media job**: kind, scope (course, unit, topic, locale), recipe version, producer order, state,
  gate records, takes, outputs, and owner notes.
- **Take**: one generated attempt for one part of a job (for example a shot), with producer, model,
  credits, source (generated, recovered, manual or shared), and check results.
- **Producer**: a named way to make one medium, with its availability, quota hold and reset time.
- **Recipe**: a versioned template of prompts, voice and presenter settings, word budgets and pacing
  for one kind.
- **Gate record**: a check result (QG0-QG3) or an owner decision, with verdict, actor, date and
  notes.
- **Owner action**: a pending approval, spot-check or publish decision derived from job states.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new course teaser needs at most two owner interactions (script approval and
  spot-check or publish), and no other manual steps when producers are reachable.
- **SC-002**: Zero credits are spent before script approval, and zero shots are paid for twice
  because a finished clip went undetected.
- **SC-003**: New teasers run under 30 seconds, and the owner rates the energy acceptable on the
  pilot before any batch.
- **SC-004**: One status view lists 100% of media jobs across all kinds with a shared state name,
  plus every pending owner action.
- **SC-005**: The crew completes media work during producer outages by falling back or waiting.
  No job is marked failed only because a producer was offline or out of quota.
- **SC-006**: Every public teaser appears on its course overview page and course card within one
  site deploy of going public, and no private teaser ever appears.
- **SC-007**: After every phase, existing media tests pass and no accepted content review becomes
  stale because of this feature.

## Assumptions

- Generation still depends on services that work only through the owner's accounts and PC: Google
  Flow and NotebookLM. When those are unreachable, the system waits; it does not fail.
- The owner keeps the final say on publishing. Any later change to that needs a new owner ruling.
- English teasers stay closed (D-2026-0083) until the owner reopens them. The site serves the Urdu
  teaser on both locales.
- One saved Flow presenter character and one preset voice are created once by the owner in Flow.
- Local speech recognition is accurate enough for Urdu meaning checks, as it was in batch 2
  (2026-11-20).
- The channel's daily upload cap and current hosting choices (YouTube for audio and video, Drive for
  slides) stay as they are.

## Dependencies and constraints

- Owner rulings D-2026-0081 to D-2026-0085 and the 2026-11-20 rulings. A new decision-log entry and
  an ADR amend D-2026-0082 and Feature 029's "never in the crew" rule, for drafting only.
- ADR-0029 and ADR-0036: images keep one entry point and acceptance by inspection. ADR-0019: agents
  never sign as the owner.
- The review evidence binding and the `unit-NN.` naming rule for figure manifests (ADR-0027).
- Host limits: at most two heavy jobs at a time, and no heavy work in subagents.

## Out of scope

- Re-making or re-publishing existing media (the EFMP-301 teaser, batch 2, the Unit 4 pilot media).
- English teasers.
- Cross-posting changes beyond what D-2026-0084 already allows.
- Replacing gflow with another Flow automation tool. The alternatives were checked and none
  supports the agent-first Flow interface the owner's account uses.
