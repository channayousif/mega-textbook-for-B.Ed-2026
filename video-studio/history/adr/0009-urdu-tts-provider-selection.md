# VS-ADR-0009 - Evidence-based Urdu narration selection
Status: Proposed, requires owner listening test · 2026-10-25

## Decision
Voice generation is provider-agnostic, and no cloud Urdu TTS is assumed to be functional or free just from a product page. The initial default is **manual audio import**. Trial order: (1) Urdu speech generation in the user's existing Gemini/Google interfaces IF supported by their active UI and terms, (2) open-source Urdu candidate on a free GPU environment, (3) original human narration with consent. Compare voice timbre across three runs, correct rendering of Urdu terminology, export WAV/MP3, commercial rights and time spent. Lock the approved source, model version, voice selection, style prompt and reference recordings in the brand bible.

## Candidate discovery (not endorsements)
- Dia-1.6B-Urdu, Smol Urdu TTS, Indic Parler-TTS, DeepSpeak-v1: examine *actual* model card, dependencies and full license chain (including codec). Hardware inference requirements and commercial permissions must be verified.
- Meta MMS Urdu research baseline only where model licensing forbids commercial content; do NOT distribute brand-promotional videos using noncommercial-only weights without permission.
- Kaggle GPU quota and session persistence are variable; save WAVs and provenance locally.

## Speech QA
One Urdu 30–45 second educational paragraph, three repeated takes on separate sessions. Score 1–5 on Urdu pronunciation, Pakistan-register naturalness, stable character voice, intelligibility, pacing and emotional tone. Require no severe terminology errors; owner passes or rejects. Save a pronunciation lexicon. If model output is poor, record a consenting human narrator.

## Operational constraint
No billing-enabled calls, hidden API usage or automation of authenticated UI workflows; provider manifests must distinguish manual subscription credit use and $0 **incremental billed API charges** from 'unlimited free' claims.
