# Baseline comparison

At the start git status was clean and git log origin/main..HEAD was empty. HEAD and origin/main both resolved to 7c3b51b0692dffc1e6ca62b351f7a82f9d73d69d. The first check:content run therefore used origin/main's exact tracked inputs, with only excluded review artifacts added. Its only failure was missing static/content-status.json. No content repair was made. The final run is recorded separately for comparison.

Manifest prepared locally because the parent supplied no prepared G3 bundle. This is an advisory snapshot, not a substitute for the required provenance handoff. The report validator recomputes the input set and digests. No earlier G3 reports or repair cycles were found for Unit 6. Real author session identity, reviewer session UUID and exact model build were not supplied. The reviewer is the current Codex worker on crew/geng-301-u06-review_en, did not author this unit in this session, and cannot independently attest the missing host provenance.
