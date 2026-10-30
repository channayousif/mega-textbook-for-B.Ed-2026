---
id: 0901
title: Cast layers cut, Ustani without glasses
stage: misc
date: 2026-10-30
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio-cast-cut
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "cast", "t013", "ustani", "bilal", "puppet"]
links:
  spec: video-studio/specs/001-urdu-shorts-pipeline/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/380
files:
 - video-studio/brand/characters/ustani-farzana.md (no glasses, puppet layer list, progress)
 - video-studio/brand/characters/shagird-bilal.md (puppet layers cut)
 - video-studio/brand/handoff-cast.md (glasses removed, white background allowed, no grids, section F: Ustani mouth prompts)
 - video-studio/specs/001-urdu-shorts-pipeline/tasks.md (T013 progress note)
tests:
 - Alignment of every edit against its master by pixel difference (lower body unchanged, silhouette IoU 0.95-0.99)
 - Visual check of all 18 layers on magenta and dark backgrounds (check.jpg per character, media root)
---

## Prompt

character images are stored at @/home/a2ahs/video-studio-media/voice-benchmark/owner-recordings/bilal.zip @/home/a2ahs/video-studio-media/voice-benchmark/owner-recordings/ustani.zip

keep it without glasses, and i changes background to white instead, also generated the poses /home/a2ahs/video-studio-media/voice-benchmark/owner-recordings/ustani_remaining.zip, and [Image #1] (Teal_geometric_pattern_backgroun…_4f4b2748.jpg)

## Response snapshot

Evaluated both character zips: Bilal's set complete and aligned; Ustani missing distinct mouths and
single-frame gestures, no glasses, and a stray Bilal image. After the owner's ruling (no glasses,
white background) and the new poses, cut all usable layers with a gradient-aware border flood fill
onto the 1080x1440 puppet canvas: Bilal 10 layers (base, blink, mouth M/E/A/O, four poses), Ustani 8
(base, blink, mouth_A, think, point, explain x2, celebrate). The new teal studio backdrop has no
people and is accepted as `set-studio`. Docs updated; Ustani's three missing mouth prompts written.

## Outcome

- Impact: the T041 puppet can be built now; Ustani lip sync is two-state (closed/open) until mouth_M/E/O arrive.
- Tests: see `tests`.
- Files: see `files`. Layers, `layers.json` (source and output SHA-256) and `cast_cut.py` live in `$MEDIA_ROOT/brand-assets/cast/`; no media in git.
- Next prompts: owner generates Ustani mouth_M/E/O (handoff-cast.md F); T041 Puppet.tsx; licence episode 1 site section.
- Reflection: a busy or gradient backdrop breaks a single-colour flood fill; model the background per row.

## Handoff (for CEO and agents)

- Shipped / changed: Ustani look locked without glasses; cast layers cut (media root); prompts for her remaining mouths.
- Decisions to respect: Ustani never wears glasses; every cast image is an edit of its master on magenta or white, single image, never a grid.
- Pending: owner generates Ustani mouth_M, mouth_E, mouth_O; Claude builds T041 puppet; licence episode 1 plan approved 2026-10-30 (site section first).
- Paperclip issues affected: none.
