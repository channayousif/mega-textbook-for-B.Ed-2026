# Unit 4 repairs for G3 run 002

Author repair record, 2026-10-19. This is not an independent review or certification.
Report: `agent-g3-gict300-u4-run002.json`. Baseline: `4400618b` (origin/main).

| Finding | Disposition |
|---|---|
| B1 | Already repaired in baseline: the exemplar is `Pk!9#mQ2vLxz` (12 characters) in EN/UR assessment items and rationales, all four SVG variants, and the manifest prompt. No remaining 11-character exemplar in these inputs. |
| B2 | Already repaired: source preamble limits prose citations to registry-verified keys and describes guide-required keys as bibliographic. |
| A1 | Already repaired: CIA triad maps only to MCQ-04; authentication factors map to MCQ-07 and RRQ-07; cloud maps to MCQ-08 and RRQ-08. |
| A2 | Already repaired: approved spec figure plan describes the pupil-record four-questions diagram in 4.4, matching the manifest and delivered figure. No spec edit needed. |
| A3 | Deferred to curriculum owner: approved spec course-wide reading list still omits Unit 4 for stairReynolds, while Unit 4 mapped readings and governance include it. The brief expressly forbids editing an approved content-spec. Retain the declared Unit 4 source pending owner reconciliation. |
| A4 | Replaced 11 bare reading URLs with descriptive link text in each locale, preserving URLs and citations. |
| A5 | ERQ-5 now requires a one-page school data-protection plan with three justified actions, responsible people and timing, retaining the integrative evaluation across unit concepts. Matching EN/UR rubric assesses these actions; 10/10/5 bank numbering and rubric total remain unchanged. ERQ-4 remains the topic-specific inventory task. |
| A6 | Deferred to review-tooling owner: `scripts/lib/review-evidence.mjs` still uses a lowercase-only citation-key regex. Tooling is outside this job's scope. Do not amend historical signed or advisory evidence; a future independent review must verify the camelCase source dependencies. |
| A7 | Source table now says the authors recommend cybersecurity education, matching the bound abstract, without claiming a measured educational effect. No learner-prose change needed. |
| A8 | Historical environment finding, checked against current content gates rather than changing another course. |

G3 remains unticked, with a new advisory repair row. Translation status and publication state
are unchanged. A fresh independent review is required; the curriculum owner must handle the
ADR-0019 repair-cycle limit before commissioning another cycle. No reviewer was invoked here.

## Validation

- `npm run check:content`: all 13 gates passed after refresh; zero remaining findings,
  so no finding exceeds the origin/main baseline. The first run exposed the missing ignored
  `static/content-status.json`; generated it with `npm run build:content-status`. The repair
  run exposed only Unit 4 stale G2 inputs; refreshed evidence rather than weakening checks.
- `node scripts/prepare-gate-evidence.mjs GICT-300 4`: all eight draft checks passed on
  committed repair `bd836c70`; append-only evidence and logs at
  `../G2/20261019T140725503Z-gates.json`. New G2 row references this evidence.
- `scripts/heavy.sh npm test`: 26 test files, 314 tests passed.
- `git diff --check`: passed. Assessment headings and topic self-assessment checklist
  wording, positions and counts preserved in EN/UR. No build or dev server run.
- The starting checkout matched origin/main. A temporary archive baseline attempt lacked
  Git metadata and was unsuitable for evidence comparison; it was discarded. Final checks
  ran against the real committed Git checkout and passed without an overlay.
