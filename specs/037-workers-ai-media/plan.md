# Plan: Feature 037 - Workers AI for media checks and drafts

| Part | File |
|---|---|
| Client: credentials, UTC ledger and cap, error mapping, whisper and text calls | `scripts/media/producers/cfai.mjs` |
| QG2 engine choice and fallback (`qg2()` is now async; `--engine cfai\|local`) | `scripts/media/qg2.mjs`, caller `scripts/media/teaser-clips.mjs` (records `qg2_engine`) |
| Draft CLI | `scripts/media/cfai-text.mjs` |
| Tests | `tests/unit/media-cfai.test.mjs` |

Costs measured 2026-11-28: whisper about 47 neurons per audio minute (an 8 s clip is 6); a Gemma draft
with thinking off 2 to 4 neurons (with thinking on about 140, and it sometimes ran out before answering).
