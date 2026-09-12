# Review evidence contract v1

The executable contract is `scripts/lib/review-evidence.mjs`. Reports are JSON; detached
`.sig` files contain base64 Ed25519 signatures over exact JSON bytes, not reserialized data.
Unsigned reports support review and validation, but cannot satisfy a pipeline gate.

## Report

Required fields: `schema_version: 1`, `course_code`, integer `unit_no`, `stage: G3|G5`,
`disposition: pass|revise|escalate`, `reviewer_id: agent:<name>`, distinct `author_run_id`
and `reviewer_run_id`, `model`, ISO `started_at`/`completed_at`, `skill_digest`,
`input_manifest`, `criteria`, `findings`, `commands`, `evidence_manifest`.

The prepare command outputs `manifest.json` with input/configuration digests and criterion IDs.
It does not freeze a checkout, run commands or certify content. The invoking host supplies an
immutable checkout to a fresh reviewer. Report validation recomputes the exact current set of
inputs, so omitted or changed files fail. Source inspection findings cite locators and actual
support; successful HTTP retrieval alone is not source verification.

`criteria`: one entry per required ID, each `{id, status, evidence}`. Status is `pass`,
`fail` or `unverified`; evidence is a list of file/section or source locators. A pass has all
criteria passed. `findings` contains `{severity, message, resolved}` with severity `blocking`,
`uncertain` or `advisory`; unresolved blocking/uncertain findings forbid a pass.

`commands`: entries `{name, exit_code, log_path}` for real executions. A passing report needs
successful `validate:content`, `check:depth-gate`, `check:figures`, `check:no-em-dash`,
`check:no-answer-keys`, `check:docs-sync` and `render-review`. `render-review` is the host's
actual browser/print inspection, not an npm script; its log records how inspection ran.
The pipeline gate itself runs after the evidence-backed tracker transition, avoiding a cycle.

`evidence_manifest`: repository-relative evidence file paths mapped to SHA-256. Every command
log and at least one rendered PNG/WebP/JPG must be included for a pass. Keep evidence under
`specs/content/<course>/reviews/unit-NN/`. The signature authenticates these hashes but does
not prove the model interpreted the evidence correctly; qualification and audits address that.

G5 also needs `g3_report`, the path of an accepted, signed G3 report for the same unit and
current English inputs. Historical human G3 records remain valid for the ordinary human path;
automatic G5 currently requires a fresh signed G3 report for verifiable dependency binding.

Report path: `specs/content/<course>/reviews/unit-NN/<G3|G5>/<run-id>.json`.
Tracker Reviewer: exact `agent:<name>` identity. Suggestion: `review:<report-path>` only.
The existing last matching row remains authoritative. Draft-stage identities stay human.

## Trusted activation

`specs/reviewers/registry.json` has `schema_version: 1`, `reviewers: []` initially. To enable,
the owner provisions `CONTENT_REVIEW_PUBLIC_KEY` in CI and a separate protected signing host.
The private key must never be committed, given to reviewer/author agents, or exposed to PR code.
This implementation does not create or distribute a production private key.

Each signed registry entry requires `id`, `enabled: true`, `stage`, exact `model`,
`skill_digest`, `courses` allowlist and `qualification`: owner identity, `evidence_path`,
`evidence_sha256`, `blocking_false_passes: 0`, positive `clean_passes` and `defective_cases`.
The evidence document contains the complete owner-labelled, held-out evaluation and audits
required by ADR-0019. Those summary numbers are necessary but not sufficient qualification;
the trusted owner/signer must inspect the underlying results before signing the registry.

The protected host signs qualified reports and registry with a standard Ed25519 signer.
`accept` verifies both signatures, scope, configuration, evidence and fresh dependencies.
No automatic tracker writer is shipped: the trusted host records accepted output and appends
the tracker row. This deliberate separation avoids giving the reviewer commit/signing power.

Revocation: disable the affected entry and re-sign the registry. Existing agent rows for that
identity then fail until reviewed under the ADR's recovery procedure. Keep reports append-only.
Audit every fifth approved unit and all escalations as required by the constitution. Scheduling
those audits is an owner/host duty; this initial library does not claim to automate it.

## What the input manifest binds

Paths are enumerated from git's index (`ls-files --cached`), so the manifest is a function of
the commit, not of one machine's working tree. Contents are still read from disk, so editing a
tracked file after review still fails validation; an uncommitted scratch file no longer enters
the digest and no longer makes a bundle unreproducible on another host. `prepare` refuses to
build a manifest while any bound path is modified, staged or untracked, and a checkout git
cannot enumerate is rejected outright.

Bound: the unit's English directory (plus Urdu at G5), course overview, the course's
`specs/content/` tree, style guide, terminology, constitution, course catalogue, contracts,
course guides, the unit's figure assets, the review skill and agent configs.

Validator scripts are bound as a closure, not as a directory. The entry points are the six
validators a passing report must cite - `validate-content`, `check-unit-depth`,
`check-figures`, `check-no-em-dash`, `check-no-answer-keys`, `check-docs-sync` - plus
`check-pipeline-gate`, which consumes the evidence, and every relative module any of them
imports, transitively. A change to those invalidates outstanding reports; a change to a script
the review never runs does not. Renaming or deleting an entry point is a hard error, so the
digest set cannot shrink silently.

Exclude only course `tasks.md`, `reviews/` and `.staging/` from the traversal. Within MDX
frontmatter normalize an exact top-level `translation_status: draft|reviewed` line. Prose,
badge props, similarly named fields and all other bytes remain hashed. Changing rendered badge
props therefore requires a new review. Committing a new file changes the manifest.
