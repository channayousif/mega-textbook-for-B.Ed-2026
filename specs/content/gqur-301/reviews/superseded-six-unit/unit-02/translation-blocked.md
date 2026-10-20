# Unit 2 translation prerequisite blocker

- Job: gqur-301-u02-translate, 2026-10-19, Codex.
- Inspected English baseline: `08da05778d49de8edd40949353bca256e956f3ed` (HEAD equals origin/main; no earlier branch commits or uncommitted work).
- G4 translation was not started. Existing translation_status remains draft. No G3/G5 certification or tracker completion is asserted.

## Required repair before translation

The translate-unit skill explicitly requires stopping when the English is wrong, rather than fixing it in translation. Its G2 minimum does not override that restriction.

The existing G3 escalation report at `G3/01a154ca-5b18-7000-872b-bb211ead24e7/summary.md` still applies to these observed passages:

1. `docs/semester-2/gqur-301/unit-02/unit-assessment.mdx:147-150` gives A's mean as 42 and B's as 38; its RRQ 10 guidance at line 230 says A includes zeros or a low outlier that B excludes. That explanation lowers A's mean and contradicts the stated ordering.
2. `topic-04.mdx:57-63` presents equality of mean, median and mode under symmetry and their skewness ordering as universal. Symmetric data 0, 0, 2, 2 have mean and median 1 but modes 0 and 2. The explanation and dependent assessment/figure material require an author repair.
3. The same G3 report records additional assessment, figure-alt, coverage and source defects. The author must address the full report, not just these two confirmed blockers.

A separate author owns English repairs. The host owns current source/provenance and rendered evidence. A fresh independent reviewer owns subsequent G3 review. Resume G4 against the repaired frozen English baseline, using the terminology bank and complete Urdu mirror contract. No proposed Urdu terminology was created in this stopped pass.

## Validation and limits

The brief prohibits a build, dev server and Playwright. No rendered Urdu inspection was attempted and no render success is claimed. No temporary reviewed-status flip was appropriate because no Urdu mirror was produced. Follow the skill's explicit handoff rule not to append a G4 tracker row until its workflow is resolved by the owner; leave the existing row unchanged.

Final `npm run check:content`: all 13 gates passed. The first run's sole failure was the missing ignored `static/content-status.json` cache at unchanged HEAD/origin/main; `npm run build:content-status` generated it before the successful rerun. No site build was run.

## Continuation check: gqur-301-u02-translate-r1

Rechecked on 2026-10-19 at `eedbf84bcfd74e5afb4e31f3bf60407dc4d28737`, equal to origin/main. The branch started clean with no commits ahead of main. RRQ 10 still states A = 42 and B = 38, while its guidance attributes A's result to including zeros or a very low score. Topic-04 still asserts universal equality under symmetry and universal skewness ordering. These are direct source checks, not a new G3 review.

The translate-unit skill's explicit stop-on-incorrect-English rule still applies. No translation or tracker status was changed. A separate English author must repair the full existing G3 report before G4 resumes. Step 7 explicitly says not to append a G4 row. Build and rendered inspection remain prohibited by the brief.

The initial content check passed 12 gates and failed only because the ignored static/content-status.json was missing, at unchanged HEAD equal to origin/main. Generated that cache with npm run build:content-status, without a site build, then reran all gates.

Final continuation validation: npm run check:content passed all 13 gates. git diff --check passed.
