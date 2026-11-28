# ADR-0040: Content Pack v2 Supersedes the Teaser Model

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted by owner instruction on 2026-11-28 ("approve plan, stage 1, run adr")
- **Date:** 2026-11-28
- **Feature:** [038-content-pack-v2](../../specs/038-content-pack-v2/spec.md) (decision D-2026-0104)
- **Amends:** [ADR-0037](0037-unified-media-studio.md) points 1 (kinds), 4 (recipes, for new video
  work) and 8 (site), only as stated below. [ADR-0031](0031-video-studio-sub-project.md) is amended
  so that its Remotion project and Kaggle render job also serve pack compositions in any locale.
  ADR-0037's engine, producer registry, shared gates, crew drafting rule and review isolation, the
  producer lanes of [ADR-0038](0038-crew-media-producer-lanes-and-per-producer-parallel-generation.md),
  media hours and pacing (D-2026-0100) and every owner gate are unchanged.
- **Context:**
  - **Teasers are adverts.** Recipe teaser@3 makes a five-shot Veo Short under 30 s that ends on a
    call to action. It teaches nothing; viewers swipe away, platforms stop recommending, and almost
    every view comes from site visitors.
  - **Reach is capped.** D-2026-0083 made teasers Urdu-only, and the Study Studio prompts frame the
    audience as Sindh and Pakistan B.Ed students.
  - **Generic look.** NotebookLM overviews go out with their picture untouched
    (`scripts/notebook-studio/audio-to-video.mjs:9`), so its branded intro and outro frames stay in.
  - **State is spread out.** Media state lives only in JSON ledgers in git and host caches; the
    owner has no page to walk a multi-stage pack, upload files or confirm a cut.
  - **Two video systems.** The live Media Studio (Feature 030) and the video-studio sub-project
    (ADR-0031, Urdu puppet Shorts, console never built) overlap.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

New video and Study Studio work is organised as **one content pack per topic**, built on the existing
Media Studio.

1. **Pack model.** Each topic in `docs/` and `licence/` gets a long-form 16:9 lesson video (the hub),
   3-8 Shorts cut from it that each teach one thing, a slide deck, a mind map, an infographic, a
   site embed and a metadata pack. New kinds: `video.longform` and `video.short` (scripted path:
   script and owner approval before credits), `doc.infographic` (document path). Manifest kinds
   `longform`, `short`, `infographic`, `deck_pdf` with `playlist`, `related_video`, `chapters`,
   `captions` and `audio_tracks`. No new course teasers are planned; teaser@3 stays only for
   teasers already in flight, and published teasers stay as they are.
2. **Language and audience.** English first for an international audience of teachers and
   teacher-education students. Urdu is a second layer: an extra YouTube audio track, Urdu subtitles
   and Urdu versions of the best Shorts. Subtitles add 2-4 high-reach languages. D-2026-0083 no
   longer governs new work.
3. **One home.** The pipeline extends the Media Studio (`scripts/media/`, `scripts/notebook-studio/`);
   no new tree. Pack scripts live in `scripts/media/pack/`. Pack compositions (long-form frame,
   vertical Short, opener, closer, chapter card, infographic footer) live in the video-studio
   Remotion project with a `locale` prop and render on Kaggle, never on the host.
4. **Owner console on the site.** An admin-only page (`/app/admin/content-packs`) shows each pack's
   twelve stages with copy-ready prompts, upload slots, checklists, cut-point and highlight
   confirmation. State lives in Supabase: `content_packs` and `content_pack_events`, read through
   `is_admin()` RLS and written only through `security definer` RPCs logged in
   `admin_action_history` (the pattern of migration 0059), plus a private upload bucket. The page
   never runs heavy work. The JSON media ledgers stay the job record for producers and uploads;
   the table is the owner's stage tracker.
5. **De-branding and provenance.** NotebookLM output is trimmed of its intro and outro/logo frames
   at owner-confirmed cut points and re-wrapped in our brand frame. Visible watermarks are removed
   only through the producer's official setting or by regenerating. SynthID and C2PA Content
   Credentials are never removed or defeated, and no step aims at undetectability. Every upload
   carries the platform AI flag and the line "Created with AI-assisted tools; written and reviewed
   by textbook.com.pk teacher-education faculty."
6. **New cast.** A versioned character bible under `specs/studio/characters/` (style guide,
   profile, voice, a verbatim prompt block, a locked sheet per season) for 3-4 clearly stylised
   characters, never presented as credentialed experts. The Ustani Farzana and Bilal puppets are
   not used in new packs; their files and consents stay.
7. **Content stays bound to the page.** Templates control the look, never the content. Every claim
   traces to the topic page or a cited source listed in the pack's `metadata.json`. Pack text
   artefacts are committed under `specs/studio/packs/`; media binaries never enter git.

## Consequences

### Positive

- Every published video teaches something on its own, which is what recommendation systems reward;
  Shorts feed the long-form lesson and the topic page instead of advertising the site.
- English-first packs reach teachers outside Pakistan, while the Urdu track and subtitles keep the
  existing audience on the same video and its view count.
- Most plumbing is reused (ledger, pacing, producers, Workers AI transcription, uploader,
  StudioPanel), so new code is mainly kinds, a few scripts, templates and one page.
- The owner gets one place to drive and audit a pack, with an append-only event log.
- Provenance rules are explicit, so de-branding cannot drift into watermark or SynthID removal.

### Negative

- A pack costs far more than a teaser: 4 NotebookLM studio calls per topic against 6 a day
  (about 1.5 topics a day per account), plus Flow credits, Kaggle renders and owner review time.
- Two state stores (JSON ledgers for jobs, Supabase for owner stages) must be kept consistent.
- A new admin page, migration and RLS surface to test and maintain.
- English narration and global framing need new prompts and checks; Urdu voice tracks need their
  own production step.
- The video-studio sub-project now serves two purposes, and its Urdu-only schema must be widened.
- Retiring the puppets drops voice and rig work already done.

## Alternatives Considered

- **Keep teasers, tune them** (better hooks, English versions). Rejected: an advert is still an
  advert; it does not fix satisfaction or reach.
- **A new `video-pipeline/` tree, as the brief first named.** Rejected by the owner: it would
  duplicate the ledger, pacing, upload and placement code that already works.
- **Grow the video-studio sub-project to own everything.** Rejected: its constitution is Urdu-only,
  its console was never built, and the live producers and crew stages are in the parent repo.
- **Loopback console on the host (VS-002) with JSON state only.** Simpler, no schema change, but
  reached only by SSH tunnel and without an audited event log; the owner chose the admin page.
- **A private claude.ai artifact as the console.** Rejected: uploads and state would live outside
  the platform and the crew could not read them.
- **Separate Urdu and English channels.** Rejected: splits views and subscribers; YouTube
  multi-language audio keeps one video.
- **Hide or strip AI marks to look less generic.** Rejected outright: breaks platform policy and the
  disclosure standard.

## References

- Feature Spec: [specs/038-content-pack-v2/spec.md](../../specs/038-content-pack-v2/spec.md)
- Implementation Plan: [specs/038-content-pack-v2/PLAN-v2.md](../../specs/038-content-pack-v2/PLAN-v2.md)
- Related ADRs: ADR-0031 (video-studio sub-project), ADR-0037 (unified Media Studio), ADR-0038 (producer lanes), ADR-0019 (review independence, unchanged)
- Decisions: D-2026-0104 (this change), D-2026-0083 (Urdu-only teasers, superseded for new work), D-2026-0100 (media hours, unchanged)
- Evaluator Evidence: [PHR 20261313](../prompts/038-content-pack-v2/20261313-adr-0040-content-pack-v2.plan.prompt.md)
