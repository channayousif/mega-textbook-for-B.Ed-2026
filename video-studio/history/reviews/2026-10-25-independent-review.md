# Independent package review and adoption - 2026-10-25

Reviewed input: `video-studio-sdd-ri.zip` (77 archive entries, primarily specifications and a static HTML prototype). The parent textbook repository was not provided, so integration and app implementation cannot yet be validated.

## Decision: adopt as upgraded design baseline, not as tested running software

| Feature | Decision | Reason / correction |
|---|---|---|
| Separate `video-studio/` sub-project + read-only discovery | ADOPT | Protect the parent website; adapt to actual existing SDD-RI hierarchy and do not impose guessed Docusaurus/i18n paths. |
| SDD constitution, two specs, tasks, ADRs, Claude skills and commands | ADOPT | Better than the earlier starter pack; use ONE canonical owner for each document, avoid dual specs under root and subproject. |
| Three human approval gates | ADOPT | Script, imported media, and final render. |
| Source/asset provenance, SHA-256, approval invalidation | ADOPT | Strong safeguard; also implement dependency graph: source→script→assets→render; invalidate downstream approvals and output on change. |
| `mode=sample` segregation | ADOPT | Production must block fixtures and placeholder assets. |
| Remotion-based puppet animation, captions, audio mixing | ADOPT | Reuses a consistent cast without video-model drift; mouth movement from amplitude is an approximation, not phoneme-level lip sync. |
| Local React/Hono console | DEFER implementation until CLI pilot | Static HTML is only a mockup, not a working console. Keep its specs and UI reference. |
| LongCat video avatar / API | DEFER | User's longcat.ai/chat subscription does not establish avatar-generation entitlement or API usage. |
| Google AI Studio as default reliable Urdu TTS | CHANGE | Urdu quality, export, free-tier and commercial rights require actual test; do not assume verified. See VS-ADR-0009. |
| Urdu text via whisper.cpp with true word timestamps | CHANGE | Urdu forced alignment may be inaccurate; add audited manual timing fallback and confidence flags. |
| Flow 'Veo 3.1 Fast' / 20 credits clip | CHANGE | Model availability and credit pricing are mutable; record from actual UI per session, not hard-coded. |
| Provider adapter abstractions / no subscription scraping | ADOPT | Human-assisted provider handoffs; automatic API usage disabled by default. |
| `claude -p` from localhost console | DEFER | Subscription/usage terms, resource limits, command injection and security require separate review. |
| Music/font/Remotion rights notes | ADOPT with verification | Rights depend on exact assets, organizational scale and platform; do not claim zero legal risk. |
| Automatic platform AI disclosure labels always applied | CHANGE | Create per-platform disclosure checklist; labels may need manual platform UI interaction and applicability can vary. |

## Gaps to close before real production
1. No production-ready Remotion implementation, package manager lockfile or executable tests in the supplied ZIP.
2. Demo sample and HTML design do not prove running render, Urdu shaping or voice quality.
3. No verified automatic TTS provider or actual recurring voice assets.
4. Source page paths and site route patterns are assumptions until parent-repo discovery.
5. Test secrets/security, upload limits and path traversal when implementing Studio.
6. Benchmarks must use a single approved Urdu test script and repeat across sessions.
7. Provider UI quotas, ToS and commercial rights must be reviewed before publishing.

## Required first integration task
Use `INTEGRATE-WITH-EXISTING-TEXTBOOK.md` and the `prompts/01-integration-audit.md` brief; approve the evidence-based mapping before installing. No automatic changes to the root repository.
