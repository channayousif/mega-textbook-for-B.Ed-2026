# VS-ADR-0012 - Bilal's voice clones the owner's own consented recording
Status: Accepted (owner 2026-10-27: "Complete and sign to use my voice") · Date: 2026-10-27

## Context
V005 locked Bilal on `chatterbox-hi` cloning `sample-male.mp3`, an ElevenLabs-generated voice
supplied for evaluation only, so the card blocked publishing until its rights were secured. The
owner then recorded their own voice with consent (two takes). VS-003 round 8 cloned both takes
against the locked reference: ElevenLabs centroid similarity 0.91 mean / 0.85 min, CER 0.023;
owner WhatsApp take 0.89 / 0.80, CER 0.027; owner WAV take 0.87 / 0.79, CER 0.011 and the closest
to its own reference (0.78). Changing a locked voice card needs an ADR (`brand/voices/README.md`).

## Decision
Bilal's card uses the owner's WAV take (`refs/ref-shagird-rec3.wav`, 0.5-13.95 s of
`owner-recordings/bilal-rec-3.wav`) with the same engine, settings and lexicon. Rights rest on
consent record `narrator-01` (`$MEDIA_ROOT/consents/`, PI-08), given in writing by the owner in
the session that PHR 0892 records: all platforms, promotional use, Kaggle processing; published
videos stay up on withdrawal.

## Consequences
+ Bilal is cleared to publish; no third-party voice rights remain for him.
+ Clearest clone in round 8 (lowest CER).
- Slightly less line-to-line steadiness than the ElevenLabs reference (0.87 vs 0.91 mean); the
  per-episode drift check (VS-003) still applies.
- Bilal now carries the owner's identifiable voice in public; withdrawal follows `narrator-01`.
- Ustani still clones an ElevenLabs voice and stays blocked from publishing until her rights are secured.

## Alternatives considered
Keep the ElevenLabs reference (rejected: no rights; an ElevenLabs plan would still need its terms
checked for cloning into another engine); the WhatsApp take (kept as a fallback reference, slightly
higher CER and one drift flag).
