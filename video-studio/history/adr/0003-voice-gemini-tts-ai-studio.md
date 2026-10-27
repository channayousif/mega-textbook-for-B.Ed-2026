> Superseded for default-provider selection by VS-ADR-0009. Treat all Urdu-support and UI claims below as hypotheses until the owner validates audio and current terms.

# VS-ADR-0003 - Voice via Gemini TTS in Google AI Studio (manual export)
Status: Superseded by VS-ADR-0009 (kept as one candidate in the VS-003 benchmark) · Date: 2026-10-24 · Amended 2026-10-25

## Context
Urdu (ur-PK) is supported by Gemini TTS (preview). Constitution V forbids billing-enabled APIs.
Multi-speaker mode does not reliably keep two voices distinct.

## Decision
Default: owner generates each line in the Google AI Studio speech-generation UI using the
character's locked voice name and style prompt, one character at a time, and downloads WAVs.
The handoff file groups lines per character so each character is one paste session.
Optional: a Gemini API key on the **free tier with no billing account** may automate this
later; that change needs its own ADR because free-tier data terms differ.

## Spike and fallback (amended 2026-10-25)
Before casting, task T013b verifies that the AI Studio speech UI exports usable ur-PK audio,
that a fixed voice + style prompt sounds stable across sessions, and what its usage terms say.
If any check fails: fallback is a human narrator (the owner or a colleague) recording each line
with written consent, filed in `brand/consents/`. The puppet approach (VS-ADR-0002) works with
either source. Every audio file's origin and rights note goes into the asset manifest.

## Consequences
+ Zero cost; consistent voices via locked presets.
− ~5 minutes of manual work per episode; UI may change (only the handoff skill needs updating).
− Preview quality; pronunciation lexicon needed.

## Alternatives considered
ChatGPT voice (no file export workflow); paid TTS APIs (violates V); recording real voices
(possible future upgrade - would also fit the puppet approach).
