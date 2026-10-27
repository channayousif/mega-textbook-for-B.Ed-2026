---
id: 0877
title: Voiced sample demo with MMS-TTS
stage: misc
date: 2026-10-26
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "kaggle"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: video-studio/history/adr/0011-kaggle-media-runner.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/336
files:
 - video-studio/history/reviews/2026-10-26-licence-check.md
 - video-studio/kaggle/render.py, video-studio/kaggle/render-job.ts
 - video-studio/remotion/src/UrduShort.tsx, video-studio/remotion/src/props.ts
 - video-studio/scripts/kaggle-pack.ts, video-studio/scripts/kaggle-fetch.ts, video-studio/scripts/lib/sample.ts
 - video-studio/episodes/20261026-sample-voice-mms/episode.json
tests:
 - npm test 12/12; tsc clean; check:no-media PASS
 - Kaggle run on T4 x2 COMPLETE in 4.1 min; 13 outputs hash-verified
 - silencedetect on the encoded MP4: speech at 0.5-5.8 s and 6.6-16.4 s, matching the caption timings
---

## Prompt

it has no voice, yes confirm,

(Then, answering the follow-up question on the voice route: "Quick demo first".)

## Response snapshot

Explained that Phase 0 used a test tone by design and the voice is chosen by the VS-003 benchmark.
Recorded the owner's confirmation that the team is 3 people or fewer (free Remotion licence) and
noted MMS-TTS Urdu's CC-BY-NC-4.0 licence. Owner chose a quick demo: added a `--voice-mms` sample
that voices each line on the Kaggle GPU with facebook/mms-tts-urd-script_arabic (seed 555), retimes
captions to the real audio, records provenance in tts-report.json, and renders 18.9 s of video.

## Outcome

- ✅ Impact: a voiced Urdu sample short exists for the owner to hear; the per-line audio path the real pipeline needs is in place.
- 🧪 Tests: see `tests` above.
- 📁 Files: listed above; media stays in `$MEDIA_ROOT/20261026-sample-voice-mms/`.
- 🔁 Next prompts: owner listens; then the full VS-003 benchmark (AI Studio takes, narrator, blinded sheet) and Phase 1.
- 🧠 Reflection: same single MMS voice for both characters; it is a placeholder, not a casting choice.

## Handoff (for CEO and agents)

- Shipped / changed: voiced sample demo path (`npm run kaggle:pack -- --sample --voice-mms`), per-line audio in the composition, owner licence confirmation recorded.
- Decisions the team must respect: MMS-TTS is evaluation only (non-commercial licence) until the owner decides the channel's commercial status; no voice is locked without the VS-003 blinded benchmark.
- Pending / next owner: owner listening review of the demo; VS-003 benchmark.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: fixed still times missed the end card of a longer video (fixed: stills span the duration).
- Graders run and results (PASS/FAIL): unit tests PASS; hash verification PASS; speech presence PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): pitch or speed variation per character to tell the two voices apart in the demo.
