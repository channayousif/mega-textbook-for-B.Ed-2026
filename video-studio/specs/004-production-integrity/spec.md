# VS-004 - Production Integrity and Urdu Accessibility

**Status:** adopted 2026-10-25 (VS-ADR-0010), not implemented. **Priority:** before public publishing.
**Role:** cross-cutting hardening of features 001–003. It is the single source for canonical
digests, the invalidation graph, owner-only approvals and the publish hard gate; other specs link
here instead of repeating the rules. Its tasks are scheduled inside the other features' phases
(see `tasks.md`).

## User stories and requirements
- PI-01: As an editor, I can trace every published claim to an approved Urdu source snapshot; when Urdu source is missing, cross-language adaptation is labelled (`source.language: en-adapted`) and reviewed, not silently substituted.
- PI-02: Approvals bind to exact canonical digests of script, source, assets, voice selection, subtitles, CTA, brand profile and final render. An upstream change invalidates dependent approvals and stops packaging.
- PI-03: Only explicit owner actions can approve script, assets, final video or publishing; model actions cannot impersonate owner consent. Mechanism: Studio gate button or owner-typed `npm run approve` (TTY + typed confirmation), append-only `approvals.jsonl`, and deny rules in `.claude/settings.json`.
- PI-04: Any generated asset has provider, date, input prompt/reference hash, licence/rights verification note, and identity/consent status when relevant.
- PI-05: A sample episode, missing rights note, placeholder, or failed QA cannot be packaged for upload.
- PI-06: Urdu captions render RTL with correct font shaping, proper punctuation and cross-device safe-zone margins; do not trust automated alignment without human check.
- PI-07: URLs and CTAs are derived from published verified lesson routes and track click attribution without redirecting to an arbitrary home page.
- PI-08: A recorded narration consent is specific to the intended use and must not be reused beyond its scope.
- PI-09: Daily operation is possible with no new recurring subscription or paid API; manual import of approved WAV/PNG/MP4 is always supported.
- PI-10: Studio is localhost-only, has bounded uploads, allows no arbitrary file access, no shell injection, no automatic paid job creation, and no unauthenticated external bind.

## Acceptance tests
1. Change script or voice ID: prior asset/render approvals become invalid and render output is marked stale.
2. Change only platform hashtag: media render approval remains valid; publish pack regenerates.
3. Attempt publish with `mode: sample` or missing signed-off rights: command exits nonzero.
4. Attempt path traversal (`../`), symlink upload, oversized media or remote dashboard access: rejected.
5. Render and visually inspect Urdu in at least two caption layouts; compare encoded frames, not only browser preview.
6. Simulate missing TTS availability and complete manual audio import successfully.
7. Confirm outbound link resolves to the approved source lesson route without exposing internal paths.

## Scope note
These requirements are **not** currently executed by the package. Build automated tests against production code as it is implemented.
