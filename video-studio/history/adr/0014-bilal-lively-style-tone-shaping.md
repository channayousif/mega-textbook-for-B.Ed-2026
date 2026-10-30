# VS-ADR-0014 - Bilal: livelier style, tone shaping and a faster tempo
Status: Accepted (owner 2026-10-30: "select the D voice") · Date: 2026-10-30

## Context
In the V007 sample short the owner found Bilal "shallow and dull". VS-003 round 10 voiced six Bilal
lines with the locked reference in four Chatterbox styles. All read accurately (median CER 0 to
0.013); the strongest style (exaggeration 1.1) drifted in voice. More exaggeration lifted pitch
movement only from 3.34 to 3.81 semitones SD, because Chatterbox copies most of its delivery from
the reference. Four reels at equal loudness let the owner judge by ear: A current, B lively, C lively
with tone shaping, D the same 6% faster. The owner chose D. Changing a locked card needs an ADR.

## Decision
- Bilal generates in the `lively` style: `exaggeration` 0.75, `cfg_weight` 0.35. Eval sets name it
  in `character_styles`, which `kaggle/voice_bench.py` uses for that character's main takes.
- `npm run voice:import` applies the card's post-processing before loudness normalisation: preset
  `warm` (low shelf +4 dB at 160 Hz for body, peak +3 dB at 3 kHz for presence, high shelf +2 dB at
  8 kHz for air, 3:1 compression above -20 dBFS; `scripts/lib/voice-fx.ts`), then tempo x1.06
  (FFmpeg `atempo`, pitch kept), then -16 LUFS. The manifest entry records it in `voice.post`.
- Reference, engine, lexicon and consent (`narrator-01`) are unchanged. Ustani has no post-processing.

## Consequences
+ Bilal sounds fuller and livelier, as in reel D.
+ The shaping is deterministic code on the server, recorded per asset, so a take can be re-derived.
- Lines are about 6% shorter, so episodes run a little shorter; the pace estimate (T024) must use it.
- Remotion's FFmpeg has no EQ filter, so the EQ is our own code; any preset change needs an ADR.
- A livelier owner reference recording (`brand/recording/bilal-reference-script.md`) may still beat
  this; switching to it is a separate ADR.

## Alternatives considered
Exaggeration alone (B: too small a change by ear); tone shaping without tempo (C); exaggeration 1.1
(voice drift); a new reference recording (pending, not rejected).
