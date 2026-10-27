# VS-ADR-0008 - Provenance, hash-bound approvals and sample mode
Status: Accepted · Date: 2026-10-25

## Context
A separately prepared SDD-RI pack for the same goal (textbook-video-studio, Urdu-first) proposed
stronger audit features. Reviewed on 2026-10-25; the useful ones are adopted here.

## Decision
Adopt: (1) read-only discovery phase with an evidenced report and owner approval before code;
(2) non-destructive installer and "parent site first" isolation; (3) source snapshots with
SHA-256 and revision; (4) asset manifest with hash, tool, prompt, rights/consent note, reviewer;
(5) approvals bound to hashes and voided on change; (6) `sample` vs `production` mode - fixtures
never silently replace real content; (7) offline render proof as the first build milestone,
inspecting Urdu shaping on stills taken from the encoded MP4; (8) sidecar SRT/VTT subtitles;
(9) non-dollar usage accounting with metered cost fixed at 0; (10) human review checklist per gate;
(11) honest-reporting rule and a standard task report format; (12) explicit ban on scraping /
session cookies / browser automation of subscription sites; (13) voice strategy made provisional
with a test spike and a consented human-narrator fallback.

Not adopted: the pack's parallel `.sdd-ri/` folder layout (we map onto whatever the repo uses,
via discovery), its simpler episode schema and two-gate state machine (ours has three gates and
richer contracts), and deferring all UI (we keep the Studio, VS-ADR-0005).

## Consequences
+ Audit trail for every video; safe re-renders; earlier detection of Urdu rendering problems.
− A little more bookkeeping, done by code (hashing) and the Studio (checklists), not by hand.
