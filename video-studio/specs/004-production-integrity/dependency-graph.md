# Content-addressed invalidation graph (proposed)

`source_snapshot + curriculum_claims -> script -> narration + visual plan -> assets -> caption timing + edit -> final render -> platform pack`

`brand assets + character version + voice card` feed asset and render nodes. `source route + CTA template` feed render and pack nodes. `platform caption/hashtags` feed only pack node.

Digest rules: SHA-256 of canonical UTF-8 JSON (sorted keys, normalized Unicode NFC, no transient timestamps) for structured objects, SHA-256 bytes for media; retain separate provenance events with timestamps. Never hash an absolute local path as identity. Each gate records reviewer identity, explicit decision timestamp, dependency digest and acceptance checklist. Reject approvals made by a model or copied between different digests.

Changes never silently delete original assets; mark descendants `stale`, preserve audit history and require fresh review. When hash mismatches are detected, fail closed.
