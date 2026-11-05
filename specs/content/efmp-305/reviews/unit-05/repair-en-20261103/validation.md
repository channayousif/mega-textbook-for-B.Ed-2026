# Repair validation, 2026-11-03

- Baseline was clean at `origin/main` (`20e4781d3a841e28c75914fe171da55d6d9e1ab7`),
  with no branch-only commits. All 13 `check:content` gates passed.
- `scripts/heavy.sh npm test`: 29 test files and 353 tests passed. Memory was
  checked first (5969 MB available). No build, dev server or browser was run.
- `node scripts/measure-figure-text.mjs static/img/figures/efmp-305/unit-05/fig-U5-4*.svg`:
  all four variants passed. This is geometry evidence, not browser/print inspection.
- Fresh G2 evidence for repaired English inputs:
  `../G2/20261103T131119616Z-gates.json`, prepared with the repository tool
  after committing the content repair. All eight draft checks passed.
- Final `npm run check:content`: 12 of 13 passed, including pipeline freshness.
  Only `check:content-status` failed. The generated `static/content-status.json`
  reflects the old tracker and is outside the crew brief's scope. Approval was
  requested to refresh it; no approval had been received when this record was
  written. The file was left untouched. This is a new remaining failure relative
  to main, so the brief's all-gates completion condition remains unmet.
- `git diff --check`: passed. No push or PR.

Logs alongside this record are actual command output. F1 provenance and rendering,
fresh independent G3 and the independent MCQ re-solve remain with the owner/host.
No reviewed translation, human initials or certification was supplied by this author.
