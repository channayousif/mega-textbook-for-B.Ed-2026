# GPKS-402 Unit 1 translation checks

Translator checks on 2026-10-28 against English commit `0bc193429b1b484ed1bcd9eb4d45fbbe1d28d14a`. These are deterministic/source checks, not G5 evidence or a rendering pass.

## Untouched origin/main baseline

```text
> bed-mega-textbook@0.1.0 check:content
> node scripts/run-gates.mjs content

Running 13 content gates

  validate:content        PASS  0.7s
  check:pipeline-gate     PASS  12.2s
  check:depth-gate        PASS  0.5s
  check:figures           PASS  0.8s
  check:no-em-dash        PASS  0.4s
  check:no-answer-keys    PASS  0.5s
  check:concept-graph     PASS  0.3s
  check:bloom-bands       PASS  0.3s
  check:source-floor      PASS  0.3s
  check:licence           PASS  0.5s
  licence:map:check       PASS  0.3s
  check:content-status    PASS  0.6s
  check:docs-sync         PASS  0.2s

All content gates passed.
```

## Final draft

```text
> bed-mega-textbook@0.1.0 check:content
> node scripts/run-gates.mjs content

Running 13 content gates

  validate:content        PASS  0.6s
  check:pipeline-gate     PASS  13.2s
  check:depth-gate        PASS  0.5s
  check:figures           PASS  0.9s
  check:no-em-dash        PASS  0.6s
  check:no-answer-keys    PASS  0.5s
  check:concept-graph     PASS  0.3s
  check:bloom-bands       PASS  0.3s
  check:source-floor      PASS  0.3s
  check:licence           PASS  0.5s
  licence:map:check       PASS  0.3s
  check:content-status    PASS  0.6s
  check:docs-sync         PASS  0.2s

All content gates passed.
```

## Source parity and terminology

```text
index.mdx: file, metadata, headings, components, item counts and figure descriptions match
topic-01.mdx: file, metadata, headings, components, item counts and figure descriptions match
topic-02.mdx: file, metadata, headings, components, item counts and figure descriptions match
unit-assessment.mdx: file, metadata, headings, components, item counts and figure descriptions match
All declared key_terms conform to frozen bank.
```

## Conditional reviewed parity

```text
> bed-mega-textbook@0.1.0 check:content
> node scripts/run-gates.mjs content

Running 13 content gates

  validate:content        PASS  0.5s
  check:pipeline-gate     FAIL  12.1s
  check:depth-gate        PASS  0.5s
  check:figures           PASS  0.7s
  check:no-em-dash        PASS  0.4s
  check:no-answer-keys    PASS  0.5s
  check:concept-graph     PASS  0.4s
  check:bloom-bands       PASS  0.2s
  check:source-floor      PASS  0.3s
  check:licence           PASS  0.4s
  licence:map:check       PASS  0.3s
  check:content-status    FAIL  0.6s
  check:docs-sync         PASS  0.2s

============================================================
check:pipeline-gate
============================================================

✗ Pipeline gate failed with 2 finding(s):

  - GPKS-402 Unit 1 (docs/semester-2/gpks-402/unit-01): 'G4 ur-translation' row for Unit 1 is not done (status: '▢')
  - GPKS-402 Unit 1 (docs/semester-2/gpks-402/unit-01): 'G5 ur-review' row for Unit 1 is not done (status: '▢')


============================================================
check:content-status
============================================================
✗ static/content-status.json is stale - it no longer describes the working tree.
  Every publication banner is derived from this file, so a stale report
  publishes units under the wrong tier. Run: npm run build:content-status

2 of 13 content gates failed: check:pipeline-gate, check:content-status.
```

## Dark variants

```text
> bed-mega-textbook@0.1.0 figures:variants:check
> node scripts/build-figure-variants.mjs --check

figures:variants --check OK (1022 figure(s))
```

## Additional source checks

- All four Urdu files compiled directly using `@mdx-js/mdx` without a Docusaurus build.
- XML parsing succeeded for all eight Urdu SVG variants; sizes range from 4867 to 6135 bytes.
- Numeric-token multisets match between English and Urdu bodies for each of the four files, including counts, dates, word limits, numbering and scoring.
- Both indexes and all Urdu pages end with `translation_status: draft`; no English content diff remains.
- During conditional parity testing, try/finally restored both index files. The only findings were the unfinished G4/G5 lifecycle rows and the temporary content-status mismatch. Those are not translation parity defects and were not bypassed with false completion rows.
- After the existing G4 note was updated, `npm run build:content-status` refreshed the ignored local report so its tracker digest matched. No report or lifecycle evidence is committed or certified by this translation job.
- Browser geometry, desktop/narrow/A4 rendering and independent semantic review remain pending under the brief's explicit prohibition on builds, servers and Playwright. No measured-fit or rendered-legibility claim is made.

The first post-commit check exposed that adding translator notes under `translations/` bound them into G2 input manifests. Both notes were moved to `reviews/unit-01/G4/`, the existing evidence-excluded location. No gate policy or existing review evidence was changed.
