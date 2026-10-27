---
name: urdu-voice-benchmark
description: Evaluate Urdu voice narration for educational animated videos without paid APIs; generate a manual handoff and evidence-based scorecard.
---
# Urdu voice benchmark

Read `history/adr/0009-urdu-tts-provider-selection.md` and `specs/003-urdu-voice-benchmark/spec.md`.
Never claim verified Urdu support, stable voices, commercial rights or zero cost without direct evidence from current model documentation and owner listening samples.
1. Prepare a fixed Urdu paragraph with technical education terms, punctuation and borrowed words.
2. Provide manual handoff for available subscription UI or optional free open-source model test, never automate the logged-in UI.
3. Record provider/model version, voice ID or prompt, three audio takes, model/checkpoint and dependency licenses, hardware, commercial-use flags and hashes.
4. Run listening scorecard and leave acceptance to the owner.
5. On PASS, publish a locked voice card under `brand/voices/` and update `brand/brand-bible.yaml` only after owner approval.
6. Ensure prerecorded imported assets remain unchanged on every render.
