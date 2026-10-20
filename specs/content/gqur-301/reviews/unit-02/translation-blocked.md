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
