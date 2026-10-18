# GENG-300 Unit 3: G3 advisory preflight escalation

Disposition: **escalate**. This is an incomplete review, not a pass or certification.

The invoking brief states that this session did not write the unit. The host supplied no
actual author session identity, no parent-prepared manifest and no frozen-checkout handoff.
The recorded reviewer identity is the real CODEX_THREAD_ID. The author_run_id field explicitly
records unavailable provenance; it is not an invented author identity and cannot support acceptance.
The manifest here was prepared locally on clean commit
65d2428e170574f474b50d20cefdf722ef389d19, identical to origin/main at task start.
Its 96 bound digests were recomputed and matched; that verifies bytes, not independence.
No earlier branch commits or G3 reports were present. No author reasoning was supplied.

## Findings and locators

1. Uncertain, unresolved: author-run provenance is missing. `.crew/brief.md`, Task and
   Continue sections; `.claude/agents/g3-reviewer.md`, frozen handoff requirement.
   The parent must provide the real author run identity and frozen bundle to a fresh reviewer.
2. Uncertain, unresolved: authority needs owner clarification. `specs/decisions/log.md:744`
   and `:787` repeat D-2026-0019 with contradictory three-unit and four-unit partitions.
   `specs/content/geng-300/intake/evaluation.md`, Partition, still cites D-2026-00XX for
   owner confirmation. The approved content-spec has four units. Do not infer a settled
   partition or repair approved authority in a review run. These are escalation context,
   not a ruling that invalidates the existing approved spec.
3. Uncertain, unresolved: actual narrow-screen and A4 print inspection is absent.
   The brief prohibits builds and dev servers, while the G3 rubric requires rebuilding
   before inspection because existing build outputs can be stale. No browser was run and
   no rendered artifact or synthetic render-review success was created. The host must
   supply a permitted fresh render environment and input-bound artifacts.

## Criterion accounting

- authority: unverified for the provenance and authority limitations above.
- sources: unverified. `sources/unit-03.md`, Unverifiable sources, openly declares all three
  print monographs and D-2026-0001. Unavailability alone is not a failing source finding.
  No source passages or claim-to-source support were verified in this preflight.
- coverage: unverified. `coverage/unit-03.md` maps U3-01 through U3-06 to three topics;
  `content-spec.md`, Unit 3, contains eight leaf rows. No taught-passage audit was performed.
- readability: unverified. `docs/semester-1/geng-300/unit-03/index.mdx` was inspected for
  orientation only; no full topic readability judgment was made.
- pedagogy: unverified. No full learning-cycle or classroom-feasibility judgment was made.
- assessment: unverified. No assessment questions or supplied answers were inspected or solved.
  A fresh reviewer must solve every item before reading its answer guidance.
- accessibility: unverified. `figures/unit-03.md` lists six placed schematics, but passing
  check:figures does not verify glyph geometry, narrow view, print or screen-reader meaning.

## Checks and next owner

The six mandatory npm review checks passed; exact outputs and exit codes are saved beside
this summary and hashed in the JSON report. The first full check:content run failed only
because ignored static/content-status.json was missing. The generated file was restored using
npm run build:content-status, without building or serving the website.

The task explicitly requests an advisory tracker row, overriding the review skill's default
prohibition on reviewer tracker edits for this limited recording action. Only Unit 3 G3 is
recorded in progress, with an agent identity and an advisory path, not review: or provisional:.
No G3/G5 gate is completed, no signature is issued and no publication state is changed.

Owner/parent: settle authority and provide real provenance plus a fresh permitted render
handoff. A fresh reviewer then performs the full semantic and assessment review. This
preflight must not be reused as a passing review or an unchanged-input approval retry.

Final verification: all 13 content gates passed after the advisory tracker update.
Exact first-failure and final-pass logs are retained in this evidence directory.
