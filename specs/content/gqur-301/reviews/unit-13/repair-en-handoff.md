# English repair handoff, 2026-11-05

Report addressed: G3/20261102T212207Z-g3-desk-ddaaaeb1.json (advisory revise).

- Four English SVG sources and dark twins now exist and all four manifest rows
  are placed, from the earlier asset job. See figure-validation/handoff.md for
  its actual raster QA. No assets were recreated by this repair.
- RRQ8 now explicitly tests the invariant coefficient under a display change;
  guidance awards the same-data response. Near-zero r, scale-dependent slope,
  sample inference and interpolation qualifications repaired. Raw escaped TeX
  replaced by readable plain notation because site maths rendering is unverified.
- Both topic summative tasks now require scored case-specific analysis. RRQ1
  requires comparison (Understand), RRQ10 analysis; ERQ1/2 demand alternative
  explanation/model transfer diagnosis. ERQ5 requires real, anonymous Pakistan
  college data collection or a permission-based lecturer dataset and analysis.
- Reinforcement mappings corrected; classification endpoints made disjoint in
  prose and labelled as a contextual classroom convention, not Lane's standard.
  Figure ranges remain approximate; the prose specifies the endpoint convention.
- Sources declaration corrected and a new passage-level source-notes input added.
  The next reviewer must bind it rather than reuse the old source manifest.
- No Urdu topic/assessment mirrors exist. Translation was not invented; the
  translation/G5 owner must mirror these repairs and recover the U+FFFD concept
  label flagged in concepts/unit-13.md. No Urdu review is claimed.

## Pending external evidence and owners

- Owner/independent evaluator: current G1 authority for the 16-unit partition.
  D-2026-0070 and guide lines 511-513 support scope, not unit certification.
- Review host: fresh frozen manifest, actual author/reviewer run identities and
  exact model configuration. Historical unavailable identities cannot be repaired
  by inventing them. This report cannot support acceptance or publication.
- Authorised engineering/review session: actual narrow-screen, light/dark and A4
  site inspection including mathematical notation and assets. This brief forbids
  build/server/Playwright, so no such evidence is claimed.
- Fresh independent G3 review remains required. G3/G5 are not marked done.

## Validation and scope blocker

- Baseline HEAD and origin/main were both c8cf9e9d7d80280e4bffca4a35ff443bacad4e1a;
  all 14 content gates passed before edits.
- Final scoped repair: 13 of 14 content gates pass. Only check:content-status
  fails because static/content-status.json hashes the required changed tracker.
  This is a new finding, not a baseline failure. The brief excludes that generated
  file from scope; an exception was requested and no approval has been received.
  Owner must authorise its regeneration to meet the full done criterion.
- Unit tests: 31 files, 368 tests passed through scripts/heavy.sh npm test.
  git diff --check passed. No build, server or browser run was performed.
- Fresh Unit 13 G2 evidence: G2/20261105T150901818Z-gates.json; all eight
  draft commands passed and the tracker points at it. G3 remains unticked.
