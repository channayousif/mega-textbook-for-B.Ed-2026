# Unit 6 English author repairs

Author pass: Codex crew `geng-301-u06-repair_en`, 2026-11-05. Findings source:
`G3/20261102T212207Z-g3-desk-f5b7ea25.json`. This note records repairs, not reviewer
acceptance or certification. No original report or reviewer identity has been changed.

F1: Topic 6.3 labels the Channa passage as original fictional exercise text. Its former
Johnson/Paine quotation now uses explicitly fictional Ali metadata instead of an unverified
real-author attribution. Topic 6.2 practice cards, assessment practice sentences and fig-U6-7
also carry fictional labels. `sources/unit-06.md` records dated retrieval attempts, actual
results and the existing owner authorisation D-2026-0001. Uninspected chapter claims in Further
reading are removed. The supplemental writing2015 record verifies none of these quotations.

F2: Topic 6.1 models catalogue keywords, a database Boolean search, filtering, abstract/full-text
inspection and a limited inference from a fictional result. Topic 6.2 models full APA and MLA
book entries and their construction before practice. Topic 6.3 models a signal phrase, a short
quotation, its locator and the writer's explanation before paraphrasing practice.

F3: Assessment RRQ 3 now supplies fictional homework source text and accepts only faithful
rewrites. RRQ 5 supplies the original and pupil text for comparison and accepts a justified
brief-summary interpretation. RRQ 10 accepts grouped citations and requires an actual author/year
audit rather than inferring four missing sources from occurrence counts. Models match the tasks.

F4: RRQ 2 now interprets currency/relevance limits; RRQ 7 adds a second evidence-based
source-evaluation question, preserving the 10/10/5 bank. Topic coverage is: 6.1 MCQ 1/6 and
RRQ 2/7; 6.2 MCQ 2/3/9 and RRQ 3/4/10; 6.3 MCQ 5/7 and RRQ 5/9; 6.4 MCQ 4/8/10 and
RRQ 1/6/8. RRQ 8 also tests paraphrasing. ERQ 2 now compares two defective integrations and
justifies repairs at Analyze. Topic 6.2 adds a citation-style mismatch analysis and a matching
rubric, while correctly labelling routine formatting Apply. Concept links follow the new items.

F5: Topic 6.1 and ERQ 3 provide fictional titles, dates, extracts, methods, scope limits and
purposes. Ratings require evidence and qualified judgements, not publisher or author status alone.
The 2015 card now consistently has a date. Topic 6.1's summative task explicitly compares evidence
and purpose; its rubric rewards that analysis.

F6: fig-U6-8 calls its descriptive column "Risk description" and retains prevention actions in
the last column. fig-U6-2 first tests common knowledge or personal original work, then requires
citation for borrowed material, including remembered ideas. Its arrow now enters the citation box.
The figure manifest records the meaning corrections; all three changed dark assets are regenerated.

F7: Topic 6.4 removes the unsupported trainee prevalence claim from explanation and formative
practice, and distinguishes attribution duties from intent-sensitive institutional sanctions.
ERQ 1 compares two supplied copying cases and rewards text-based diagnosis rather than prevalence.

F8: Teacher notes place the four topic stages within the approved Week 16 schedule. RRQ 2's
replacement rubric allocates 1 mark per explained criterion and 0.5 for a relevant named criterion
without its explanation, making its two-mark total explicit.

## Limits and handoff

No Urdu Unit 6 mirror exists under either docs translation plugin, and no licence copy exists.
These English changes were therefore not mirrored; no translation was invented. No item was
skipped as stale: the report findings were located in the current named files.

E1 remains with the parent/host: supply genuine author/reviewer provenance and a frozen bundle
before any acceptance. E2 remains with the host: supply fresh bound desktop, 360px and A4 print
renders for inspection. The brief forbids builds, dev servers and Playwright. Consequently
`scripts/measure-figure-text.mjs`, which imports Playwright and launches Chromium, was not run;
changed SVG text still requires host geometry measurement. Source checks and dark freshness do
not establish rendered accessibility. G3 remains in progress and unsigned. Respect ADR-0019's
cycle limit; the owner must authorise any further independent review if that limit is exhausted.

## Validation

- `scripts/heavy.sh npm test`: 31 files, 368 tests passed.
- Fresh G2 draft evidence: `G2/20261105T095511606Z-gates.json`, bound to committed
  author inputs `3998da8ed`; all eight draft commands passed. The tracker points to it.
  Direct `acceptGateEvidence` validation succeeds for the current Unit 6 bytes.
- `FIGURE_ROOT=static/img/figures/geng-301/unit-06 node scripts/build-figure-variants.mjs --check`:
  all eight figure pairs fresh.
- `git diff --check`: passed. Changed tracked files contain no forbidden dash characters.
- Clean `origin/main` baseline `99473fec3`: all 14 content gates passed after regenerating
  its missing ignored `static/content-status.json`. The repair checkout's ignored status cache
  is regenerated too; neither generated cache is committed.
- Final repaired checkout `npm run check:content`: all 14 gates passed. No new findings
  relative to the passing origin/main baseline.
