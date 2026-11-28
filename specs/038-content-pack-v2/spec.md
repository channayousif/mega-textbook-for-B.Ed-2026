# Feature 038: Content Pack v2 (one topic, one content pack)

**Status**: approved 2026-11-28 (ADR-0040) | **Created**: 2026-11-28 | **Owner**: curriculum owner (board-direct)

The owner's brief, "textbook.com.pk Video & Content Pipeline v2", is recorded verbatim in the PHR
`history/prompts/038-content-pack-v2/20261312-content-pack-v2-plan.plan.prompt.md`. Where the brief
and older media docs disagree, the brief wins (D-2026-0104).

## Why

- Teasers and Shorts are adverts (recipe teaser@3: five Veo shots, a call to action end card). They
  teach nothing, viewers swipe away, platforms stop recommending them, and almost every view comes
  from site visitors.
- Urdu-only teasers (D-2026-0083) and a Pakistan-only audience line cap the reach.
- NotebookLM videos are published with their picture untouched
  (`scripts/notebook-studio/audio-to-video.mjs:9`), so the NotebookLM intro, outro and logo frames
  make the channel look generic.

## What

Every topic in `docs/` and `licence/` gets a **content pack**, about 90% teaching value and 10% brand:

| # | Asset | Format |
|---|-------|--------|
| 1 | Long-form lesson video, the hub | 16:9, 8-20 min, chapters |
| 2 | Shorts cut from the long video, 3-8 per topic | 9:16, 20-60 s, each teaches one thing completely |
| 3 | Slide deck | PDF plus editable |
| 4 | Mind map | PNG/SVG, interactive where possible |
| 5 | Infographic | portrait PNG plus square crop |
| 6 | Site embed | manifest rows rendered by `StudioPanel` on the topic page |
| 7 | Metadata pack | titles, chapters, tags, SRT plus translations, thumbnail text, pinned comment, per-platform captions, AI disclosure |

## Requirements

- FR-001 English is the primary production language, in clear international English. Urdu is a second
  layer: an extra YouTube audio track, Urdu subtitles, and Urdu versions of the best Shorts.
- FR-002 Subtitles in English plus Urdu and 2-4 high-reach languages, generated from the English SRT
  and spot-checked.
- FR-003 Global search framing for titles; Pakistani and South Asian classrooms appear as examples, not
  as the frame. Pakistan-specific topics say so in the title.
- FR-004 Long-form structure: a hook within 30 s, no logo before the hook, a roadmap that becomes the
  chapters, self-contained teaching blocks (explain, example, classroom application, common mistake)
  tagged `[SHORT-CANDIDATE]`, a pattern interrupt every 60-90 s, a recap, and one soft call to action
  of at most 15 s.
- FR-005 Shorts: a hook in the first 1-2 s, one idea each, loop-friendly, motion graphics (small
  corner logo bug, kinetic captions, site screenshots, callouts, progress bar, character cut-ins)
  inside 9:16 safe zones, and the long video as the Related Video.
- FR-006 A new recurring cast of 3-4 clearly stylised, non-photoreal characters with a versioned
  character bible (profile, voice, verbatim prompt block, locked sheet). Characters are never
  presented as credentialed experts. The Ustani Farzana and Bilal puppets are not used in new packs.
- FR-007 NotebookLM output is de-branded by **trimming** its intro and outro/logo frames. Cut points
  are detected automatically and confirmed by the owner before rendering. Our own opener goes after
  the hook.
- FR-008 Visible third-party watermarks are removed only by the producer's official setting (Flow
  Media Watermark) or by regenerating. Nothing blurs, inpaints or paints over a watermark.
- FR-009 **SynthID and C2PA Content Credentials are never removed, altered or defeated**, and no step
  aims to make AI content undetectable.
- FR-010 AI disclosure on every upload: the platform's AI/altered-content flag plus the line "Created
  with AI-assisted tools; written and reviewed by textbook.com.pk teacher-education faculty."
- FR-011 Every factual claim traces to the topic page or a cited source listed in the metadata pack.
  Templates control the look, never the content.
- FR-012 Pack progress is tracked on an admin-only page on the site with one panel per stage (inputs,
  copy-ready prompt, upload slots, checklist, mark done), backed by Supabase with admin-only RLS.
- FR-013 Existing subscriptions only (Claude, Google AI Pro, ChatGPT Plus, free Workers AI allowance).
  Each stage has an input/output contract so an API can replace a manual step later.
- FR-014 Host limits: renders run on Kaggle; local heavy jobs go through `scripts/heavy.sh`; the admin
  page never runs heavy work.
- FR-015 Media binaries never enter git. Small text artefacts (script, angle, metadata, shot list) are
  committed under `specs/studio/packs/`.
- FR-016 Existing owner gates stay: script approval before any credits are spent, a spot-check of each
  private upload before it goes public.

## Out of scope

- Re-cutting published teasers (they stay as they are) and changing existing Study Studio rows.
- Paid APIs, new OCI resources, or anything that alters provenance marks.

## Success criteria

- SC-001 One real topic produces a complete pack end to end, uploaded private, with time, credits and
  remaining manual steps reported.
- SC-002 No NotebookLM intro, outro or logo frame remains in a de-branded video (frame check at the cut
  points).
- SC-003 Per pack after 28 days: Shorts average viewed above 70% and a rising share of views from
  outside Pakistan, tracked in `performance.csv`.
