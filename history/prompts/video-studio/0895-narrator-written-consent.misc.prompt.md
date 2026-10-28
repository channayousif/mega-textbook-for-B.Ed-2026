---
id: 0895
title: Narrator written consent, V006 voice import
stage: misc
date: 2026-10-28
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio-ustani
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "consent", "pi-08"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: video-studio/history/adr/0013-ustani-voice-consented-narrator.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/354
files:
 - video-studio/brand/voices/ustani.md
 - video-studio/history/adr/0013-ustani-voice-consented-narrator.md
 - video-studio/specs/003-urdu-voice-benchmark/spec.md (V005 note, V006 done)
 - video-studio/scripts/voice-import.ts, scripts/lib/voice-import.ts, scripts/lib/consent.ts, scripts/lib/audio.ts (new)
 - video-studio/tests/voice-import.test.ts (new)
 - video-studio/specs/001-urdu-shorts-pipeline/contracts/episode.schema.json (manifest provenance fields)
 - video-studio/specs/001-urdu-shorts-pipeline/tasks.md (T032b note)
 - video-studio/package.json (voice:import script)
 - $MEDIA_ROOT/consents/2026-10-narrator-02.md (not in git; SHA-256 bae013f40a64f5e5b4c8b1915f1e670305578e0c22296bf84bfe973150e23ce6)
tests:
 - npm test (video-studio): 17 pass, 5 new in tests/voice-import.test.ts
 - npm run typecheck: pass
 - real cards: ustani (narrator-02) and shagird (narrator-01) pass the consent scope check
---

## Prompt

i have the written consent, go on.

## Response snapshot

PR #347 had already been merged (merge commit, 2026-10-27 20:58Z) before the VS-ADR-0013 commit was
pushed, so that commit was moved to a new branch from main. The `narrator-02` record now notes the
owner's statement that written consent is held; the Ustani card, VS-ADR-0013 and the spec drop the
"verbal only" gap. The record asks the owner to store a copy and its SHA-256.

"go on": built V006, `npm run voice:import`. It validates the file (under MEDIA_ROOT, no symlink,
<= 50 MB, WAV/MP3 magic bytes, 0.3-120 s), the line's speaker, a cleared voice card and the PI-08
consent scope (names the character, Kaggle agreed, not withdrawn), normalises with Remotion's bundled
FFmpeg to PCM 48 kHz mono -16 LUFS, and records output, source, card, reference and consent digests
as a `pending` manifest entry. Replacements keep the old take and link both ways.

## Outcome

- Impact: Ustani's rights basis no longer rests on verbal consent alone; voice lines can now be imported with provenance.
- Tests: see `tests`.
- Files: see `files`. No media, names or consent text in git.
- Next prompts: owner stores the written copy; V007 (render one short with the chosen voices).
- Reflection: check a PR's state before pushing to its branch; #347 merged between two pushes.

## Handoff (for CEO and agents)

- Shipped / changed: VS-ADR-0013 (Ustani on the narrator's voice), the written-consent note, and V006 `npm run voice:import`. PR #354.
- Decisions to respect: voice audio enters an episode only through `voice:import` and stays `pending` until the owner's assets gate; both characters are cleared to publish; the narrator is cited only as `narrator-02`; any further voice card change needs an ADR.
- Pending: owner saves the written consent copy beside the `narrator-02` record; V007 (first short); T031 silence trim and clip/image import (T032b) are still open.
- Paperclip issues affected: none.
