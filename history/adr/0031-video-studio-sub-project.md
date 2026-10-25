# ADR-0031: Video Studio Sub-project for Urdu Shorts

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted by owner instruction on 2026-10-26 ("start the work on plan", approving the
  video-studio integration plan of 2026-10-25)
- **Date:** 2026-10-26
- **Feature:** 027-video-studio (detailed specs VS-001 to VS-004 under `video-studio/specs/`)
- **Context:** Most of the audience finds content on YouTube, Instagram, Facebook and TikTok, not
  by searching the site. The owner supplied an SDD-RI package (`video-studio-sdd-ri`, v1.5) that
  specifies a human-in-the-loop pipeline turning one site page into one 45 to 60 second vertical
  Urdu short with recurring 2D characters and a CTA back to that page. Constitution Art. VI.3 put
  video in "Phase 3+" behind a new spec. The repo is public, and it is developed on the 2-CPU
  production host that serves the site, where heavy jobs have frozen the live site twice. A
  read-only evaluation (2026-10-25) found the package sound in design but wrong about this repo's
  content paths, routes, palette and term bank, in conflict with the repo's spec, ADR, PHR and
  em-dash conventions, and unsafe for a public repo (consents, media).

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

1. **Sub-project, not platform.** The pipeline lives in `video-studio/` with its own
   `package.json`, lockfile, `CLAUDE.md`, constitution (v1.2, subordinate to this repo's
   constitution), specs (`VS-001`..) and ADRs (`VS-ADR-0001`..). Bare `ADR-NNNN` and `Feature NNN`
   keep meaning this repo's records. Docusaurus, the deploy pipeline, the root `package.json` and
   the content gates are unchanged; `video-studio` is excluded from `tsconfig.json`.
2. **Read-only consumer of content.** The harvester reads units through
   `scripts/lib/content-roots.mjs` (ADR-0020), takes terminology from `specs/content/terminology.csv`
   and `glossary.json`, and only scripts units whose publication tier (`static/content-status.json`)
   is `certified` or `provisional`. It never edits content.
3. **Media never enters git** (owner rule, 2026-10-25). Output videos, audio, images, stills,
   subtitle files, consent records and Kaggle bundles live under `MEDIA_ROOT` outside the working
   tree. Enforced three ways: `video-studio/.gitignore`, a mirrored block in the root `.gitignore`,
   and a CI step running `scripts/check-no-media-in-video-studio.mjs` (locally `npm run check:no-media`),
   which reads git's index.
4. **Media compute runs on Kaggle** (owner direction, 2026-10-25), on the owner's free GPU quota
   (T4 x2), with private datasets and hash verification on both sides (`VS-ADR-0011`). The
   production host only packs, pushes, fetches and verifies; any local heavy job there obeys the
   `flock /tmp/mega-book-heavy.lock` rule.
5. **Owner-only approvals.** Script, asset and render gates are recorded only by the owner (Studio
   button with an in-memory owner token, or owner-typed `npm run approve`). Deny rules in
   `video-studio/.claude/settings.json` and the root `.claude/settings.json` guard against accidents;
   nothing is published automatically.
6. **Subscriptions and free tiers only**, 0 USD metered spend; any charge needs a new ADR.

## Consequences

### Positive
- A repeatable route from site pages to short videos, each linking back to a published page.
- The site, its gates and its deploy are untouched; rollback is reverting the video-studio commits.
- No heavy media work on the production host.

### Negative
- A second constitution and spec namespace to keep subordinate and consistent.
- Dependence on Kaggle's free quota and terms, which can change; `local` (the owner's own PC) stays
  a supported fallback.
- A Kaggle API token on the host is a new credential to protect.
- CI runs the em-dash gate a second time with `--scan-dir video-studio`. Neither gate script nor
  `scripts/lib/gates.mjs` was edited: both are bound review-evidence inputs
  (`scripts/lib/review-evidence.mjs`), and editing them would reopen every unit's G2/G3 evidence.
- **Constitution amendment deferred.** Art. VI.3 still reads "video ... Phase 3+ and require a new
  spec". Spec 027 is that spec, and this ADR records the owner's decision. The wording change
  (a MINOR bump to v5.1.0) waits for an owner-chosen moment, because `.specify/memory/constitution.md`
  is also a bound review input: amending it makes every unit's evidence stale at once.

## Alternatives considered
- **Render on the production host:** rejected (host limits, no system FFmpeg, live site risk).
- **Separate repository:** keeps isolation but loses direct read access to content, term bank and
  tiers, and splits PHRs; rejected for v1.
- **Fold the package specs into root numbering (`specs/027..030`):** rejected; the package's
  internal cross-references are dense, so one root spec (027) points to the `VS-` specs instead.
- **Keep video in the backlog (Art. VI.3 unchanged):** rejected by the owner's instruction.

## References
- Spec: `specs/027-video-studio/`; sub-project rules: `video-studio/CLAUDE.md`
- `video-studio/history/adr/0011-kaggle-media-runner.md` (VS-ADR-0011)
- Constitution v5.0.0 Art. VI.3 (amendment to v5.1.0 pending, see Consequences)
- Evaluation: PHR `history/prompts/video-studio/` (2026-10-25/26)
