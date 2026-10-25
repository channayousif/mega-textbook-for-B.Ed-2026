# Tasks - VS-004 Production integrity (not yet done)

Scheduled inside other features' phases so integrity is built in, not bolted on.

| Task | Built in | What |
|---|---|---|
| PI001 | 001 Phase 0 (with T007) | Canonical digest helper (sorted-key JSON, Unicode NFC, no timestamps or absolute paths; raw bytes for media) + cross-platform fixture tests |
| PI002 | 001 Phase 0 (with T007) | Dependency-graph invalidation + append-only `approvals.jsonl`; one test per upstream change (acceptance tests 1–2) |
| PI003 | 001 Phase 0 | `scripts/approve.ts`: owner-only (TTY + typed episode id), writes approval event with digests + checklist; `.claude/settings.json` deny rules verified |
| PI007 | 003 Voice benchmark | Audio provenance, consent scope (`brand/consents/`), lexicon + human correction history |
| PI004 | 001 Phase 5 (with T052) | Urdu RTL regression on frames from the encoded MP4, two caption layouts (acceptance test 5) |
| PI008 | 001 Phase 5 (with T051) | Output manifest: hashes, software versions, prompts, licences, source version, variants |
| PI005 | 001 Phase 6 (with T060) | URL/UTM builder: only verified lesson routes on textbook.com.pk; no open redirects (acceptance test 7) |
| PI006 | 002 Phase A (with S006) | Studio: loopback bind, path containment, MIME + signature checks, bounded uploads, shell allowlist (acceptance test 4) |
| PI009 | 001 Phase 6 | Publish hard gate: refuse sample mode, missing rights/consent, stale digests, failed QA, missing review (acceptance tests 3, 6) |
