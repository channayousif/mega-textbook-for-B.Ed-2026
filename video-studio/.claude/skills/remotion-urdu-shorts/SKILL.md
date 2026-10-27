---
name: remotion-urdu-shorts
description: Build and maintain the UrduShort Remotion composition - puppet characters with amplitude lip-flap, Nastaliq RTL word-timed captions, animated diagram beats, B-roll, end card with QR - and render episodes. Use with the official remotion-dev skills for any work in video-studio/remotion/ or for /video-render.
---

# Remotion - UrduShort composition

Load the official Remotion best-practices skill too; this skill adds project-specific rules.

## Composition contract
`UrduShort` props = `{ episode, script, captions, assets, brand }` built by `scripts/render.ts`.
Duration from `calculateMetadata`: sting + Σ(line audio + gap) + end card hold (≥3 s).
1080×1920 @ 30 fps. Never hard-code colours/fonts - import from generated `src/brand.ts`.

## Layout (top → bottom)
- y 0–250: safe margin (platform UI). Title text sits at y≈280.
- Middle: visual area (diagram / illustration / B-roll), 1080×980.
- Character puppet: bottom third, left for ustani, right for shagird; active speaker scales 1.0, the other 0.92 and dims 15%.
- Captions: above y = 1920−420, centred, RTL.

## Puppet
- Layers stacked: body → arm(gesture) → head → eyes → mouth. Gentle idle: 2 px breathing sine, 4 s period.
- Blink: seeded random interval 3–5 s, 4 frames closed.
- Mouth: per frame, RMS amplitude of the current line's audio (`useWindowedAudioData`/`visualizeAudio` from `@remotion/media-utils`); thresholds (tune once): <0.05 rest, <0.15 M, <0.3 E, <0.5 O, else A. Hold each shape ≥2 frames to avoid jitter.
- Gesture from `line.gesture`, swapped with a 4-frame ease.

## Captions (Urdu)
- Font: Noto Nastaliq Urdu, loaded with `@remotion/fonts` `loadFont` from `public/fonts`; wait for load (`delayRender`) before first frame.
- `direction: rtl; unicode-bidi: plaintext;` Nastaliq needs generous line-height (1.9) and top padding - clipping of descenders is the #1 bug.
- Chunk ≤4 words/line, 2 lines; never split a word; keep English/URL tokens LTR inside an isolate (`<bdi>`).
- Active word: accent colour + slight scale; past words ink; future words 60% opacity.
- Text = script text exactly; timings from `captions.json`.

## Diagram beats (`Beat.tsx`)
Types list/steps/compare/cycle/pyramid/definition. Items enter with `spring` staggered 6 frames, synced to the line start. Max 6 items. Urdu text right-aligned; numbering in brand digits.

## Audio
Voice lines `<Audio>` sequenced; music bed with volume callback ducking to `music_duck_db` while any line plays; sting at frame 0. Final loudness corrected in `scripts/render.ts` with an FFmpeg loudnorm two-pass after render (−14 LUFS, −1 dBTP).

## Render
Before rendering: verify approval hashes (constitution X); refuse `mode: sample` unless `--sample`.
Never generate or download anything during render - only approved local files.
Also write `render/captions.ur.srt` and `captions.ur.vtt` from `captions.json` (same chunks as burned-in captions; UTF-8; RLM mark at line start if a line begins with Latin text).
Stills for reviewers are extracted from the ENCODED file: `ffmpeg -ss <t> -i render/final.mp4 -frames:v 1 render/stills/<n>.png`.
`npx remotion render src/index.ts UrduShort render/final.mp4 --props=<json> --codec=h264 --crf=18 --x264-preset=veryfast`. Then run `npm run audit -- <id>`.

## Debugging checklist
Black first frame → fonts not loaded before render. Caption drift → regenerate captions.json after any audio change. Puppet jitter → raise hold frames. Large files → crf 20.
